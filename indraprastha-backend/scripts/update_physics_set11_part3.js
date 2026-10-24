const fs = require('fs');

const set11Part3Updates = [
  {
    id: 4776, // Q81
    similar_question: {
      question: "The hydrostatic pressure exerted at the bottom of an open tank containing a stationary liquid does NOT depend upon:",
      option_a: "The surface area of the bottom of the tank",
      option_b: "The depth of the liquid column",
      option_c: "The density of the liquid",
      option_d: "The local acceleration due to gravity",
      correct_option: "A",
      explanation: "Step 1: The hydrostatic pressure at depth h is given by P = P₀ + ρ g h.\n\nStep 2: This pressure depends strictly on atmospheric pressure P₀, liquid density ρ, acceleration due to gravity g, and depth h.\n\nStep 3: It is completely independent of the bottom surface area or shape of the container.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 4777, // Q82
    similar_question: {
      question: "Two metal blocks of different shapes and densities are completely submerged in the same liquid and experience equal buoyant forces. This proves that:",
      option_a: "Both blocks have the same displaced volume",
      option_b: "Both blocks have the same mass",
      option_c: "Both blocks have the same density",
      option_d: "Both blocks have the same surface area",
      correct_option: "A",
      explanation: "Step 1: Archimedes' principle states that buoyant force F_b = V_submerged × ρ_liquid × g.\n\nStep 2: Since both blocks are completely submerged in the same liquid, ρ_liquid and g are identical.\n\nStep 3: For F_b to be equal, their volumes must be identical: V₁ = V₂.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 4778, // Q83
    similar_question: {
      question: "In steady laminar flow of a viscous liquid through a pipe, what is the speed of the fluid layer in direct contact with the stationary solid pipe walls?",
      option_a: "Zero (due to the no-slip boundary condition)",
      option_b: "Maximum",
      option_c: "Equal to the average velocity",
      option_d: "Equal to critical velocity",
      correct_option: "A",
      explanation: "Step 1: Due to intermolecular adhesion between the liquid molecules and the solid pipe wall, fluid molecules immediately adjacent to the wall adhere to it.\n\nStep 2: This is known as the 'no-slip boundary condition' in fluid dynamics.\n\nStep 3: Consequently, the relative flow speed of the liquid layer directly touching the wall is identically zero.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 4779, // Q84
    similar_question: {
      question: "A falling raindrop tends to assume an almost perfect spherical shape primarily because of:",
      option_a: "Surface tension, which minimizes the surface area for a given volume",
      option_b: "Atmospheric pressure pushing uniformly from all directions",
      option_c: "Gravitational attraction between water molecules",
      option_d: "Viscous drag of the air",
      correct_option: "A",
      explanation: "Step 1: Surface tension imparts an excess surface energy U = T × A to any liquid droplet.\n\nStep 2: A system in stable equilibrium seeks to minimize its potential energy, which requires minimizing its total surface area.\n\nStep 3: For a given volume of liquid, a sphere is the geometric shape with the minimum possible surface area. Hence, raindrops form spheres.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 4780, // Q85
    similar_question: {
      question: "A light horizontal glass plate having a total perimeter of 4.0 m is in contact with the surface of water (surface tension T = 0.075 N/m). What is the minimum upward force required to pull the plate cleanly off the water surface?",
      option_a: "0.30 N",
      option_b: "0.15 N",
      option_c: "0.60 N",
      option_d: "0.075 N",
      correct_option: "A",
      explanation: "Step 1: When lifting a plate from water, surface tension acts downward along the entire perimeter P of contact.\n\nStep 2: Downward surface tension force is F = T × P.\n\nStep 3: Substitute T = 0.075 N/m and perimeter P = 4.0 m:\nF = 0.075 N/m × 4.0 m = 0.30 N.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 4781, // Q86
    similar_question: {
      question: "The excess pressure inside soap bubble A is three times that inside soap bubble B. What is the ratio of the volume of bubble A to that of bubble B?",
      option_a: "1 : 27",
      option_b: "1 : 9",
      option_c: "1 : 3",
      option_d: "27 : 1",
      correct_option: "A",
      explanation: "Step 1: Excess pressure inside a soap bubble is ΔP = 4 T / R  →  R ∝ 1 / ΔP.\n\nStep 2: Ratio of radii: R_A / R_B = ΔP_B / ΔP_A = 1 / 3.\n\nStep 3: Volume of a sphere is V = (4/3) π R³ ∝ R³.\n\nStep 4: Ratio of volumes: V_A / V_B = (R_A / R_B)³ = (1 / 3)³ = 1 / 27.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 4782, // Q87
    similar_question: {
      question: "Assertion (A): When a capillary tube of insufficient length is dipped in water, water rises to the top end but does not overflow.\nReason (R): At the top of an insufficient capillary tube, the radius of curvature of the meniscus increases so that the product (h × R) remains constant.\nWhich of the following is correct?",
      option_a: "Both Assertion and Reason are true, and Reason is the correct explanation of Assertion",
      option_b: "Both Assertion and Reason are true, but Reason is not the correct explanation of Assertion",
      option_c: "Assertion is true, but Reason is false",
      option_d: "Both Assertion and Reason are false",
      correct_option: "A",
      explanation: "Step 1: In capillary rise, the equilibrium condition is h × R = 2 T / (ρ g) = constant, where R is the radius of curvature of the meniscus.\n\nStep 2: If the tube height l is less than the normal rise height h (insufficient length), water reaches the top and its meniscus flattens, increasing R such that l × R' = h × R.\n\nStep 3: This prevents water from overflowing. Thus, Assertion and Reason are true, and Reason explains the Assertion.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 4783, // Q88
    similar_question: {
      question: "Assertion (A): In steady fluid flow, the velocity of fluid particles at any fixed spatial point remains constant in time.\nReason (R): In steady flow, fluid streamlines do not change their shape or intersect each other.\nWhich of the following is correct?",
      option_a: "Both Assertion and Reason are true, and Reason is the correct explanation of Assertion",
      option_b: "Both Assertion and Reason are true, but Reason is not the correct explanation of Assertion",
      option_c: "Assertion is true, but Reason is false",
      option_d: "Both Assertion and Reason are false",
      correct_option: "A",
      explanation: "Step 1: By definition of steady flow, the velocity vector at any fixed coordinate (x, y, z) is constant in time: ∂v⃗ / ∂t = 0. Thus, Assertion is true.\n\nStep 2: Because the velocity field is steady and unique at every point, trajectories followed by fluid particles (streamlines) are stationary and cannot intersect, as an intersection would imply two different velocities at the same point. Thus, Reason is true and explains the Assertion.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 4784, // Q89
    similar_question: {
      question: "A square metal plate of side 0.2 m moves parallel to a fixed plate at a speed of 0.2 m/s in water (viscosity η = 0.01 poise = 1.0 × 10⁻³ Pa·s). If the viscous drag force on the plate is 0.008 N, what is the separation distance between the plates?",
      option_a: "0.001 m (or 1.0 mm)",
      option_b: "0.002 m",
      option_c: "0.005 m",
      option_d: "0.0005 m",
      correct_option: "A",
      explanation: "Step 1: Convert units: η = 0.01 poise = 1.0 × 10⁻³ Pa·s.\nArea of square plate: A = (0.2 m)² = 0.04 m².\nSpeed v = 0.2 m/s, Viscous force F = 0.008 N = 8.0 × 10⁻³ N.\n\nStep 2: Newton's viscosity law: F = η A (v / d).\n\nStep 3: Solve for d:\nd = η A v / F = (1.0 × 10⁻³ × 0.04 × 0.2) / (8.0 × 10⁻³) = 0.008 / 8.0 = 0.001 m = 1.0 mm.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 4785, // Q90
    similar_question: {
      question: "A small plastic sphere of density 0.5 × 10³ kg/m³ is dropped from a height of 10 cm above the surface of a deep pool of water (density 1.0 × 10³ kg/m³). Neglecting viscous drag and splash effects, what maximum depth will the sphere reach before momentarily stopping?",
      option_a: "10 cm",
      option_b: "20 cm",
      option_c: "5 cm",
      option_d: "15 cm",
      correct_option: "A",
      explanation: "Step 1: The sphere falls freely through air from height h = 10 cm, acquiring kinetic energy K = m g h.\n\nStep 2: Inside water, the net upward retarding force is F_net = F_buoyant − m g = (V ρ_water g) − (V ρ_sphere g) = m g (ρ_water / ρ_sphere − 1).\n\nStep 3: Since ρ_water = 2 ρ_sphere, the net upward force is F_net = m g (2 − 1) = m g.\n\nStep 4: By work-energy theorem, work done by net upward force over depth d equals initial kinetic energy:\nF_net × d = m g h  →  (m g) d = m g h  →  d = h = 10 cm.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 4786, // Q91
    similar_question: {
      question: "In steady streamline flow of an incompressible fluid through a horizontal pipe of varying cross-section, the volume rate of flow Q = A v:",
      option_a: "Remains strictly constant at all cross-sections along the pipe",
      option_b: "Is larger at wider sections than at narrower sections",
      option_c: "Is larger at narrower sections than at wider sections",
      option_d: "Fluctuates sinusoidally with distance",
      correct_option: "A",
      explanation: "Step 1: By the principle of conservation of mass, for steady flow of an incompressible fluid, the mass entering any section per unit time equals the mass exiting: dm / dt = ρ A v = constant.\n\nStep 2: Since density ρ is constant, the volumetric discharge rate Q = A v is strictly uniform at all cross-sections.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 4787, // Q92
    similar_question: {
      question: "Even under turbulent flow conditions in a conduit, what is the instantaneous relative velocity of the fluid layer in direct contact with the solid boundary wall?",
      option_a: "Zero (adhering to the wall due to the no-slip condition)",
      option_b: "Equal to the turbulent eddy velocity",
      option_c: "Equal to the maximum core velocity",
      option_d: "Infinite",
      correct_option: "A",
      explanation: "Step 1: In all viscous fluid flows (both laminar and turbulent), strong intermolecular adhesive forces bind the immediate contact layer of fluid to the solid surface.\n\nStep 2: A very thin laminar sublayer exists right at the solid boundary.\n\nStep 3: Therefore, the relative flow velocity at the solid boundary wall is strictly zero (no-slip condition).\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 4788, // Q93
    similar_question: {
      question: "A piece of ice floats in a liquid of density 1.25 g/cm³ contained in a beaker. When the ice melts completely, the level of the liquid in the beaker:",
      option_a: "Rises",
      option_b: "Lowers",
      option_c: "Remains unchanged",
      option_d: "First lowers and then remains constant",
      correct_option: "A",
      explanation: "Step 1: Let the mass of the ice block be M. While floating, it displaces a volume of liquid V_disp = M / ρ_liquid.\n\nStep 2: When the ice melts completely into water, its mass M remains unchanged, but it turns into water of density ρ_water = 1.0 g/cm³, occupying volume V_water = M / ρ_water.\n\nStep 3: Since ρ_liquid = 1.25 g/cm³ > ρ_water = 1.0 g/cm³, the volume of melted water added is greater than the original displaced volume: V_water > V_disp.\n\nStep 4: Therefore, the total liquid level in the beaker rises.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 4789, // Q94
    similar_question: {
      question: "A square wire frame of side length L is dipped in a soap solution and taken out so that a soap film is formed across it. If T is the surface tension of the solution, what is the total inward surface tension force exerted on all four sides of the frame?",
      option_a: "8 T L",
      option_b: "4 T L",
      option_c: "2 T L",
      option_d: "16 T L",
      correct_option: "A",
      explanation: "Step 1: A square frame of side L has 4 wire edges, giving a total perimeter of 4L.\n\nStep 2: A soap film has two free surfaces (front and back), each exerting an inward force along the entire boundary.\n\nStep 3: Therefore, the total force exerted by the film on the frame is:\nF = 2 × (T × 4L) = 8 T L.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 4790, // Q95
    similar_question: {
      question: "In a vertical U-tube containing mercury, a column of liquid A of density 2.72 g/cm³ is poured into one arm, and a column of liquid B is poured into the other arm until the upper surfaces of both liquids are at the same horizontal level. If the height of both liquid columns is 10 cm and the mercury levels in both arms remain identical, what is the density of liquid B?",
      option_a: "2.72 g/cm³",
      option_b: "1.36 g/cm³",
      option_c: "5.44 g/cm³",
      option_d: "0.80 g/cm³",
      correct_option: "A",
      explanation: "Step 1: Since the mercury levels in both arms are at the same horizontal height, the hydrostatic pressures exerted at the mercury interfaces by both liquid columns must be equal.\n\nStep 2: Hydrostatic pressure of liquid A: P_A = ρ_A g h_A.\nHydrostatic pressure of liquid B: P_B = ρ_B g h_B.\n\nStep 3: Since h_A = h_B = 10 cm, we have ρ_A g (10) = ρ_B g (10)  →  ρ_B = ρ_A = 2.72 g/cm³.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 4791, // Q96
    similar_question: {
      question: "A vertical U-tube of uniform cross-section contains mercury (density 13.6 g/cm³). Water (density 1.0 g/cm³) is poured into one arm until a column of height 13.6 cm is formed. What is the difference in mercury levels in the two arms?",
      option_a: "1.0 cm",
      option_b: "2.0 cm",
      option_c: "0.5 cm",
      option_d: "13.6 cm",
      correct_option: "A",
      explanation: "Step 1: The pressure at the mercury-water interface in the first arm equals the pressure at the same horizontal level in the second arm:\nρ_water g h_water = ρ_Hg g h_Hg.\n\nStep 2: Solve for the height of the displaced mercury column h_Hg:\nh_Hg = (ρ_water / ρ_Hg) × h_water = (1.0 / 13.6) × 13.6 cm = 1.0 cm.\n\nStep 3: Hence, the difference in mercury levels between the two arms is 1.0 cm.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 4792, // Q97
    similar_question: {
      question: "Bernoulli's theorem for fluid flow is fundamentally an application of which basic conservation law?",
      option_a: "Conservation of energy",
      option_b: "Conservation of linear momentum",
      option_c: "Conservation of angular momentum",
      option_d: "Conservation of mass",
      correct_option: "A",
      explanation: "Step 1: Bernoulli's equation is derived by applying the work-energy theorem to a non-viscous fluid element moving along a streamline.\n\nStep 2: It equates the work done by pressure forces to the changes in kinetic and gravitational potential energy.\n\nStep 3: Therefore, it represents the law of conservation of mechanical energy in fluid dynamics.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 4793, // Q98
    similar_question: {
      question: "Two very wide vertical glass plates are separated by a small gap of width d and dipped into water of surface tension T. Taking the contact angle to be 0° and atmospheric pressure P₀, what is the pressure in the water just beneath the curved meniscus in the gap?",
      option_a: "P₀ − 2 T / d",
      option_b: "P₀ + 2 T / d",
      option_c: "P₀ − T / d",
      option_d: "P₀ + 4 T / d",
      correct_option: "A",
      explanation: "Step 1: Between two parallel plates separated by distance d with contact angle 0°, the cylindrical meniscus has radius of curvature R = d / 2.\n\nStep 2: The excess pressure across a single cylindrical interface is ΔP = T / R = T / (d / 2) = 2 T / d.\n\nStep 3: Because the meniscus is concave on the air side, the pressure on the water side is lower than atmospheric pressure P₀ by ΔP:\nP_water = P₀ − 2 T / d.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 4794, // Q99
    similar_question: {
      question: "An open tank is filled with a liquid of density 1000 kg/m³. If the gauge pressure at the bottom of the tank is 1.8 × 10⁵ Pa, what is the speed of efflux of liquid through a small hole at the bottom? (Take g = 10 m/s²)",
      option_a: "18.97 m/s (or ~19 m/s)",
      option_b: "13.4 m/s",
      option_c: "30 m/s",
      option_d: "9.5 m/s",
      correct_option: "A",
      explanation: "Step 1: By Bernoulli's equation, the kinetic energy per unit volume of the efflux jet equals the gauge pressure at the orifice:\n(1/2) ρ v² = P_gauge.\n\nStep 2: Solve for v:\nv = √[ 2 P_gauge / ρ ].\n\nStep 3: Substitute P_gauge = 1.8 × 10⁵ Pa and ρ = 1000 kg/m³:\nv = √[ 2 × (1.8 × 10⁵) / 1000 ] = √[ 3.6 × 10² ] = √360 ≈ 18.97 m/s.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 4795, // Q100
    similar_question: {
      question: "When thousands of tiny microscopic water droplets coalesce into a single larger raindrop at constant ambient temperature, heat energy is:",
      option_a: "Liberated, causing a slight rise in temperature",
      option_b: "Absorbed, causing a slight drop in temperature",
      option_c: "Neither liberated nor absorbed",
      option_d: "Completely converted into gravitational potential energy",
      correct_option: "A",
      explanation: "Step 1: When small droplets merge into a larger drop, the total surface area decreases.\n\nStep 2: Since total surface energy is U = T × A, a decrease in surface area corresponds to a release of surface energy.\n\nStep 3: This released surface energy is converted into internal thermal energy, raising the temperature of the coalesced drop and liberating heat.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 4796, // Q101
    similar_question: {
      question: "The flow speed of the surface layer of a 5.0 m deep river is 2.0 m/s. Assuming a linear velocity gradient down to the riverbed where velocity is zero, and taking the viscosity of water to be 1.0 × 10⁻³ Pa·s, what is the shearing stress between horizontal layers of water?",
      option_a: "4.0 × 10⁻⁴ N/m²",
      option_b: "2.0 × 10⁻⁴ N/m²",
      option_c: "1.0 × 10⁻³ N/m²",
      option_d: "5.0 × 10⁻³ N/m²",
      correct_option: "A",
      explanation: "Step 1: The velocity gradient across the depth h = 5.0 m is:\ndv / dz = (2.0 m/s − 0) / 5.0 m = 0.4 s⁻¹.\n\nStep 2: By Newton's law of viscosity, the shear stress is:\nτ = η (dv / dz).\n\nStep 3: Substitute η = 1.0 × 10⁻³ Pa·s and dv / dz = 0.4 s⁻¹:\nτ = 1.0 × 10⁻³ × 0.4 = 4.0 × 10⁻⁴ N/m².\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 6190, // Q102
    similar_question: {
      question: "A solid sphere of volume V and density ρ₀ falls through a fluid of density ρ (where ρ < ρ₀). If the fluid exerts a quadratic retarding drag force F_drag = k v² (with k > 0), what is the terminal speed v_t of the sphere?",
      option_a: "√[ V (ρ₀ − ρ) g / k ]",
      option_b: "V (ρ₀ − ρ) g / k",
      option_c: "√[ V (ρ₀ + ρ) g / k ]",
      option_d: "√[ k / (V (ρ₀ − ρ) g) ]",
      correct_option: "A",
      explanation: "Step 1: Net downward force under gravity and buoyancy is F_net = W − F_b = V ρ₀ g − V ρ g = V (ρ₀ − ρ) g.\n\nStep 2: At terminal velocity, this effective downward gravitational force is balanced by the upward viscous drag:\nk v_t² = V (ρ₀ − ρ) g.\n\nStep 3: Solve for v_t:\nv_t = √[ V (ρ₀ − ρ) g / k ].\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 6191, // Q103
    similar_question: {
      question: "Two identical spherical liquid drops of radius r fall through air with terminal velocity v_t = 10 cm/s. If they coalesce into a single spherical drop, what is the new terminal velocity?",
      option_a: "10 × 2^(2/3) cm/s (approximately 15.87 cm/s)",
      option_b: "20 cm/s",
      option_c: "14.14 cm/s",
      option_d: "5 cm/s",
      correct_option: "A",
      explanation: "Step 1: By volume conservation: (4/3) π R³ = 2 × (4/3) π r³  →  R = 2^(1/3) r.\n\nStep 2: In Stokes' flow, terminal velocity scales with the square of the radius: v_terminal ∝ r².\n\nStep 3: For the combined drop:\nv_terminal' = v_t × (R / r)² = v_t × [ 2^(1/3) ]² = v_t × 2^(2/3).\n\nStep 4: Substitute v_t = 10 cm/s:\nv_terminal' = 10 × 2^(2/3) ≈ 15.87 cm/s.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 6192, // Q104
    similar_question: {
      question: "A viscous fluid of density ρ and dynamic viscosity η flows steadily downwards under gravity between two wide vertical parallel plates separated by a gap d. What is the magnitude of the velocity gradient at the surface of the plates?",
      option_a: "ρ g d / (2 η)",
      option_b: "ρ g d / η",
      option_c: "2 ρ g d / η",
      option_d: "ρ g d² / (4 η)",
      correct_option: "A",
      explanation: "Step 1: Balancing gravity and viscous shear in the fluid layer gives: η (d²v / dx²) = − ρ g.\n\nStep 2: Integrating with no-slip boundary conditions v(0) = v(d) = 0 gives the velocity profile:\nv(x) = [ ρ g / (2 η) ] x (d − x).\n\nStep 3: The velocity gradient is dv / dx = [ ρ g / (2 η) ] (d − 2x).\nAt the wall x = 0 (or x = d), the magnitude is |dv / dx| = ρ g d / (2 η).\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 6193, // Q105
    similar_question: {
      question: "A small solid sphere has a terminal velocity of 10 m/s in air where g = 10 m/s². The sphere is transported to an experimental chamber where effective gravity is reduced to g' = 5 m/s² and projected downwards with an initial speed of 30 m/s. Neglecting buoyancy, what is its initial acceleration?",
      option_a: "25 m/s² upwards",
      option_b: "25 m/s² downwards",
      option_c: "5 m/s² downwards",
      option_d: "Zero",
      correct_option: "A",
      explanation: "Step 1: In the first location, terminal velocity is v_t = 10 m/s under g = 10 m/s²:\n6π η r (10) = m (10)  →  6π η r / m = 1.0 s⁻¹.\n\nStep 2: In the chamber where g' = 5 m/s², the sphere is pushed downwards with v = 30 m/s.\nDownward gravitational force: F_g = m g' = 5 m.\nUpward viscous drag: F_v = 6π η r v = (1.0 m) × 30 = 30 m.\n\nStep 3: Net upward force is F_net = F_v − F_g = 30 m − 5 m = 25 m.\nAcceleration is a = F_net / m = 25 m/s² directed upwards.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 6194, // Q106
    similar_question: {
      question: "A sphere falls with terminal velocity v_t = 20 m/s in air under gravity g = 10 m/s². The sphere is taken into a gravity-free spacecraft (g = 0) and pushed into the air with initial speed 20 m/s. What is its initial deceleration?",
      option_a: "10 m/s² retarding its motion",
      option_b: "20 m/s²",
      option_c: "Zero",
      option_d: "5 m/s²",
      correct_option: "A",
      explanation: "Step 1: In normal gravity, at terminal velocity v_t = 20 m/s, viscous drag equals weight:\n6π η r (20) = m g = 10 m  →  (6π η r / m) = 10 / 20 = 0.5 s⁻¹.\n\nStep 2: In zero gravity (g = 0), the only force acting on the moving sphere is the opposing viscous drag:\nF_drag = 6π η r (20) = m (0.5 × 20) = 10 m.\n\nStep 3: The initial deceleration is a = F_drag / m = 10 m/s² opposing motion.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 6195, // Q107
    similar_question: {
      question: "When a small solid sphere of radius r falls through a viscous fluid at its terminal velocity, heat is generated due to fluid friction. How does the rate of heat production dQ / dt depend on the radius r of the sphere?",
      option_a: "dQ / dt ∝ r⁵",
      option_b: "dQ / dt ∝ r²",
      option_c: "dQ / dt ∝ r³",
      option_d: "dQ / dt ∝ r⁴",
      correct_option: "A",
      explanation: "Step 1: The rate of work done by viscous forces (which converts into heat) at terminal velocity is:\ndQ / dt = F_viscous × v_t.\n\nStep 2: Viscous force is F_viscous = 6π η r v_t, and terminal velocity is v_t = (2/9) r² (ρ − σ) g / η ∝ r².\n\nStep 3: Therefore, F_viscous ∝ r × v_t ∝ r × r² = r³.\n\nStep 4: Rate of heat production is:\ndQ / dt ∝ F_viscous × v_t ∝ r³ × r² = r⁵.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 6196, // Q108
    similar_question: {
      question: "Water flows in streamline laminar flow through a capillary tube of radius a under pressure difference P at a volumetric rate Q. If the radius of the tube is halved to a / 2 while the pressure difference is doubled to 2P, what is the new volumetric flow rate?",
      option_a: "Q / 8",
      option_b: "Q / 4",
      option_c: "Q / 2",
      option_d: "Q / 16",
      correct_option: "A",
      explanation: "Step 1: According to Poiseuille's formula, the volumetric flow rate through a capillary tube of radius r under pressure difference ΔP is:\nQ = π ΔP r⁴ / (8 η L)  →  Q ∝ ΔP r⁴.\n\nStep 2: For the new parameters ΔP' = 2P and r' = a / 2:\nQ' / Q = (ΔP' / P) × (r' / a)⁴ = (2) × (1 / 2)⁴ = 2 × (1 / 16) = 1 / 8.\n\nStep 3: Hence, the new flow rate is Q' = Q / 8.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 6197, // Q109
    similar_question: {
      question: "A thin soap film formed on a U-shaped wire frame supports a light slider wire of length 25 cm. The slider supports a total hanging weight of 1.25 × 10⁻² N in equilibrium. What is the surface tension of the soap solution?",
      option_a: "2.5 × 10⁻² N/m",
      option_b: "5.0 × 10⁻² N/m",
      option_c: "1.25 × 10⁻² N/m",
      option_d: "3.75 × 10⁻² N/m",
      correct_option: "A",
      explanation: "Step 1: A soap film has two surfaces, so the upward surface tension force on the slider of length L is F = 2 T L.\n\nStep 2: In equilibrium, F = W  →  2 T L = 1.25 × 10⁻² N.\n\nStep 3: Substitute L = 25 cm = 0.25 m:\n2 T (0.25 m) = 1.25 × 10⁻² N  →  0.50 T = 1.25 × 10⁻²  →  T = 2.5 × 10⁻² N/m.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 6198, // Q110
    similar_question: {
      question: "When N identical spherical liquid droplets each of radius r coalesce to form a single larger drop of radius R, what is the rise in temperature Δθ of the liquid? (T = surface tension, ρ = density, s = specific heat capacity, J = mechanical equivalent of heat)",
      option_a: "3 T / (ρ s J) [ 1/r − 1/R ]",
      option_b: "3 T / (ρ s J) [ 1/R − 1/r ]",
      option_c: "2 T / (ρ s J) [ 1/r − 1/R ]",
      option_d: "T / (ρ s J) [ 1/r − 1/R ]",
      correct_option: "A",
      explanation: "Step 1: Volume of single drop V = (4/3) π R³ = N (4/3) π r³.\nMass of liquid is M = V ρ = (4/3) π R³ ρ.\n\nStep 2: Loss in surface area when N drops coalesce:\nΔA = N (4π r²) − 4π R² = 4π [ N r² − R² ] = 4π [ (R³ / r³) r² − R² ] = 4π R³ [ 1/r − 1/R ] = 3 V [ 1/r − 1/R ].\n\nStep 3: Energy released is ΔU = T ΔA = 3 V T [ 1/r − 1/R ].\n\nStep 4: This energy raises the temperature: M s J Δθ = ΔU  →  (V ρ) s J Δθ = 3 V T [ 1/r − 1/R ].\nSolving for Δθ gives: Δθ = 3 T / (ρ s J) [ 1/r − 1/R ].\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 6199, // Q111
    similar_question: {
      question: "A thin horizontal wire of mass per unit length 8.0 g/m floats on the surface of water across a channel of width 2.0 m. The water surface is depressed by 1.0 cm at the middle under the weight of the wire. What is the surface tension of the water?",
      option_a: "3.92 N/m (or ~4.0 N/m)",
      option_b: "7.84 N/m",
      option_c: "1.96 N/m",
      option_d: "0.075 N/m",
      correct_option: "A",
      explanation: "Step 1: Total weight of the wire of length L and linear mass density λ is W = λ L g.\n\nStep 2: Surface tension acts on both sides of the wire at an angle θ with the horizontal, where sin θ ≈ tan θ = h / (L / 2) = 2h / L.\n\nStep 3: Vertical component of surface tension: 2 (T L sin θ) = W  →  2 T L (2h / L) = λ L g  →  4 T h = λ L g.\n\nStep 4: Solve for T:\nT = λ L g / (4 h) = (0.008 kg/m × 2.0 m × 9.8 m/s²) / (4 × 0.01 m) = 0.1568 / 0.04 = 3.92 N/m.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 6200, // Q112
    similar_question: {
      question: "Grease and oil stains are washed away much more effectively by hot water mixed with detergent than by cold pure water because the detergent and heat:",
      option_a: "Significantly reduce the surface tension and decrease the contact angle, enabling the solution to wet and emulsify the grease",
      option_b: "Increase the density of the water",
      option_c: "Make the contact angle between water and grease obtuse",
      option_d: "Cause water molecules to chemically decompose",
      correct_option: "A",
      explanation: "Step 1: Detergent molecules have hydrophobic and hydrophilic ends that act as surfactants, sharply reducing water's surface tension.\n\nStep 2: Lower surface tension and higher temperature reduce the contact angle, allowing the soapy water to spread across the greasy surface (complete wetting).\n\nStep 3: The surfactant forms micelles around grease particles, lifting them into the emulsion to be rinsed away.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 6201, // Q113
    similar_question: {
      question: "Why do molecules residing in the surface layer of a liquid exhibit different physical properties from molecules deep in the bulk?",
      option_a: "Surface molecules experience an unbalanced net inward attractive force toward the bulk liquid",
      option_b: "Surface molecules have lower mass than bulk molecules",
      option_c: "Surface molecules carry electrostatic net charge",
      option_d: "Surface molecules are constantly evaporating and condensing simultaneously",
      correct_option: "A",
      explanation: "Step 1: In the bulk liquid, each molecule is surrounded symmetrically by other liquid molecules, resulting in zero net cohesive force.\n\nStep 2: Molecules in the surface layer are bounded by air on one side and liquid on the other. Because air molecule density is negligible, there is an unbalanced net attractive force pulling surface molecules inward toward the bulk.\n\nStep 3: This creates extra potential energy per unit area, giving rise to surface tension.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 6202, // Q114
    similar_question: {
      question: "A spherical soap bubble is blown at the open end of a glass tube of radius 1.0 cm. The surface tension of the soap solution is 0.04 N/m. If the bubble forms a hemisphere of radius R = 1.0 cm at the end of the tube, what is the excess air pressure inside the tube?",
      option_a: "16 Pa",
      option_b: "8 Pa",
      option_c: "4 Pa",
      option_d: "32 Pa",
      correct_option: "A",
      explanation: "Step 1: A soap bubble has two free surfaces (inner and outer).\n\nStep 2: The excess pressure across a spherical soap bubble of radius R is:\nΔP = 4 T / R.\n\nStep 3: Substitute T = 0.04 N/m and R = 1.0 cm = 0.01 m:\nΔP = (4 × 0.04 N/m) / (0.01 m) = 0.16 / 0.01 = 16 Pa.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 6203, // Q115
    similar_question: {
      question: "An air bubble of radius r is blown at the bottom tip of a capillary tube immersed in a liquid. The excess pressure required to maintain the bubble is measured using an open U-tube manometer containing liquid of density ρ, showing a height difference h. What is the surface tension T of the liquid?",
      option_a: "ρ g h r / 2",
      option_b: "ρ g h r / 4",
      option_c: "2 ρ g h r",
      option_d: "ρ g h / (2r)",
      correct_option: "A",
      explanation: "Step 1: An air bubble inside a liquid has only one liquid-gas interface. The excess pressure across the bubble is ΔP = 2 T / r.\n\nStep 2: The manometer measures the pressure difference: ΔP = ρ g h.\n\nStep 3: Equate the two expressions:\n2 T / r = ρ g h  →  T = ρ g h r / 2.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 6204, // Q116
    similar_question: {
      question: "A glass capillary tube of radius 0.1 cm is dipped vertically into a beaker containing a liquid of density 1.0 g/cm³. If the liquid rises to a height of 4.0 cm with a contact angle of 60°, what is the surface tension of the liquid? (Take g = 980 cm/s²)",
      option_a: "392 dyne/cm",
      option_b: "196 dyne/cm",
      option_c: "98 dyne/cm",
      option_d: "49 dyne/cm",
      correct_option: "A",
      explanation: "Step 1: Capillary rise formula: h = 2 T cos θ / (r ρ g).\n\nStep 2: Rearrange for surface tension T:\nT = h r ρ g / (2 cos θ).\n\nStep 3: In CGS units: h = 4.0 cm, r = 0.1 cm, ρ = 1.0 g/cm³, g = 980 cm/s², θ = 60° (cos 60° = 0.5):\nT = (4.0 × 0.1 × 1.0 × 980) / (2 × 0.5) = 392 / 1.0 = 392 dyne/cm.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 6205, // Q117
    similar_question: {
      question: "A vertical capillary tube of length 15 cm is dipped in water, and water rises to a height of 6.0 cm under normal gravity. If the entire apparatus is placed in a freely falling elevator (g_eff = 0), what will be the length of the water column in the capillary tube?",
      option_a: "15 cm (fills the entire length of the tube)",
      option_b: "6.0 cm",
      option_c: "12.0 cm",
      option_d: "Zero",
      correct_option: "A",
      explanation: "Step 1: Under normal conditions, water rises until hydrostatic weight balances surface tension: h = 2 T cos θ / (r ρ g).\n\nStep 2: In free fall, effective gravity becomes zero: g_eff = 0.\n\nStep 3: With zero opposing gravity, water ascends to the upper tip of the tube (15 cm). The meniscus then adjusts its radius of curvature so that it does not overflow.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 6206, // Q118
    similar_question: {
      question: "When a capillary tube is dipped into a particular liquid, the liquid neither rises nor falls inside the tube. What can be concluded about the angle of contact θ between the liquid and the tube wall?",
      option_a: "The angle of contact is exactly 90°",
      option_b: "The angle of contact is 0°",
      option_c: "The angle of contact is 180°",
      option_d: "The surface tension of the liquid must be zero",
      correct_option: "A",
      explanation: "Step 1: By Jurin's law, capillary height is h = 2 T cos θ / (r ρ g).\n\nStep 2: For h = 0 with non-zero surface tension T, density ρ, and radius r, we must have cos θ = 0.\n\nStep 3: Since cos 90° = 0, the contact angle between the liquid and solid must be exactly 90°.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 6207, // Q119
    similar_question: {
      question: "A tank containing oil is mounted on a truck accelerating horizontally with a constant acceleration 'a'. The free surface of the oil tilts at an angle θ with the horizontal. What is the expression for θ?",
      option_a: "tan⁻¹(a / g)",
      option_b: "tan⁻¹(g / a)",
      option_c: "sin⁻¹(a / g)",
      option_d: "cos⁻¹(a / g)",
      correct_option: "A",
      explanation: "Step 1: In the accelerating frame of the truck, every fluid element experiences a fictitious horizontal pseudo force per unit mass of magnitude 'a' directed backwards, and downward gravity 'g'.\n\nStep 2: The effective gravitational field vector is g⃗_eff = −a î − g k̂.\n\nStep 3: The free liquid surface always aligns perpendicular to the effective gravity vector.\n\nStep 4: The slope of the free surface with the horizontal is tan θ = a / g  →  θ = tan⁻¹(a / g).\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 6208, // Q120
    similar_question: {
      question: "Air flows steadily through a horizontal tube with three sections: entrance (wide), throat (constriction), and exit (wide). Vertical manometer tubes open to liquid are attached at each section. Where does the liquid rise to the greatest height in the manometer tubes?",
      option_a: "At the constricted throat, because higher air speed produces the lowest static pressure",
      option_b: "At the wide entrance",
      option_c: "At the wide exit",
      option_d: "Liquid heights are identical in all tubes",
      correct_option: "A",
      explanation: "Step 1: By the continuity equation, air speed is highest in the constricted throat (v_throat > v_wide).\n\nStep 2: By Bernoulli's equation, higher air speed results in lower static pressure: P_throat < P_wide.\n\nStep 3: The lower air pressure above the manometer tube sucks the liquid column to a greater height (h = (P_atm − P) / ρg).\n\nStep 4: Hence, the liquid rises highest at the constricted throat.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 6209, // Q121
    similar_question: {
      question: "A large closed tank contains liquid of density ρ up to height y₂ from the bottom. The air in the space above the liquid is pressurized to pressure P. A small orifice of area A is located in the side wall at height y₁ from the bottom (where y₁ < y₂). If atmospheric pressure is P₀, what is the speed of efflux of liquid from the orifice?",
      option_a: "√[ 2 (P − P₀) / ρ + 2 g (y₂ − y₁) ]",
      option_b: "√[ 2 (P + P₀) / ρ + 2 g (y₂ − y₁) ]",
      option_c: "√[ 2 g (y₂ − y₁) ]",
      option_d: "√[ (P − P₀) / ρ + g (y₂ − y₁) ]",
      correct_option: "A",
      explanation: "Step 1: Apply Bernoulli's equation between the top liquid surface (point 2) and the orifice (point 1):\nP + (1/2) ρ v₂² + ρ g y₂ = P₀ + (1/2) ρ v₁² + ρ g y₁.\n\nStep 2: Since the tank cross-section is very large compared to the orifice, v₂ ≈ 0:\nP + ρ g y₂ = P₀ + (1/2) ρ v₁² + ρ g y₁.\n\nStep 3: Rearrange to solve for v₁:\n(1/2) ρ v₁² = (P − P₀) + ρ g (y₂ − y₁).\n\nStep 4: Multiply by 2 / ρ and take the square root:\nv₁ = √[ 2 (P − P₀) / ρ + 2 g (y₂ − y₁) ].\n\nTherefore, Option (A) is the correct answer."
    }
  }
];

async function updatePart3() {
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

    console.log(`Starting update of Set 11 Part 3 (${set11Part3Updates.length} questions)...`);
    let successCount = 0;
    for (const item of set11Part3Updates) {
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
        console.log(`[${successCount}/${set11Part3Updates.length}] Updated Question ID ${item.id}: SUCCESS`);
      } else {
        console.error(`Failed Question ID ${item.id}:`, data);
      }
    }
    console.log(`Set 11 Part 3 complete: ${successCount} questions committed.`);
  } catch (err) {
    console.error('Update failed:', err);
  }
}

updatePart3();
