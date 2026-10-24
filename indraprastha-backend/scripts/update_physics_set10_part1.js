const fs = require('fs');

const set10Part1Updates = [
  {
    id: 4599, // Q1
    similar_question: {
      question: "What is the isothermal bulk modulus of an ideal gas at an absolute pressure P?",
      option_a: "P",
      option_b: "2 P",
      option_c: "P / 2",
      option_d: "γ P",
      correct_option: "A",
      explanation: "Step 1: For an isothermal process of an ideal gas, Boyle's law applies: P V = constant.\n\nStep 2: Differentiating both sides: P dV + V dP = 0  →  dP / (dV / V) = − P.\n\nStep 3: By definition, the isothermal bulk modulus is B_T = − V (dP / dV) = P.\n\nStep 4: Therefore, the isothermal bulk modulus of an ideal gas is exactly equal to its instantaneous pressure P.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 4600, // Q2
    similar_question: {
      question: "What is the theoretical value of Young's modulus of elasticity for a perfectly rigid body?",
      option_a: "Infinite",
      option_b: "Zero",
      option_c: "1.0 × 10¹¹ N/m²",
      option_d: "Dependent on the applied deforming force",
      correct_option: "A",
      explanation: "Step 1: Young's modulus is defined as the ratio of tensile (or compressive) stress to longitudinal strain: Y = Stress / Strain.\n\nStep 2: For an ideal, perfectly rigid body, no deformation occurs under any finite applied force, which means longitudinal strain ΔL / L = 0.\n\nStep 3: Dividing a finite stress by zero strain gives Y = Stress / 0 = ∞ (infinite).\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 4601, // Q3
    similar_question: {
      question: "On a typical stress versus strain curve for a ductile metal, over which region does Hooke's law strictly hold true?",
      option_a: "From the origin to the proportional limit",
      option_b: "Between the proportional limit and the yield point",
      option_c: "From the yield point to the ultimate tensile strength",
      option_d: "Beyond the ultimate tensile strength up to fracture",
      correct_option: "A",
      explanation: "Step 1: Hooke's law states that stress is directly proportional to strain (linear relationship).\n\nStep 2: On the stress-strain curve, the graph is a straight line from the origin (0, 0) up to the proportional limit.\n\nStep 3: Beyond the proportional limit, the stress-strain relationship ceases to be linear even before reaching the elastic limit.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 4602, // Q4
    similar_question: {
      question: "Two wires of identical dimensions (same length and cross-sectional area) are made of steel and brass. Young's modulus of steel is twice that of brass (Y_steel = 2 Y_brass). If equal tensile forces are applied to both wires, what is the ratio of elongation of the steel wire to that of the brass wire?",
      option_a: "1 : 2",
      option_b: "2 : 1",
      option_c: "1 : 4",
      option_d: "1 : 1",
      correct_option: "A",
      explanation: "Step 1: Elongation of a wire under load F is ΔL = F L / (A Y).\n\nStep 2: Since F, L, and A are identical for both wires, elongation is inversely proportional to Young's modulus: ΔL ∝ 1 / Y.\n\nStep 3: Compute the ratio of elongations:\nΔL_steel / ΔL_brass = Y_brass / Y_steel = Y_brass / (2 Y_brass) = 1 / 2 = 1 : 2.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 4603, // Q5
    similar_question: {
      question: "Young's modulus of a wire is an intrinsic physical property that depends upon:",
      option_a: "The material composition and temperature of the wire",
      option_b: "The length of the wire only",
      option_c: "The diameter and cross-sectional area of the wire",
      option_d: "The magnitude of the suspended load",
      correct_option: "A",
      explanation: "Step 1: Young's modulus Y is an intensive material property defined by interatomic forces and bonding in the solid.\n\nStep 2: It does not depend on geometric dimensions such as length, radius, or cross-sectional area, nor on the applied load.\n\nStep 3: It depends only on the nature of the material and environmental parameters such as temperature and impurities.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 4604, // Q6
    similar_question: {
      question: "Hooke's law states that within the elastic limit, the deforming stress is directly proportional to the corresponding strain. The constant of proportionality is called:",
      option_a: "Modulus of elasticity",
      option_b: "Yield strength",
      option_c: "Poisson's ratio",
      option_d: "Breaking stress",
      correct_option: "A",
      explanation: "Step 1: Hooke's law is mathematically expressed as: Stress ∝ Strain  →  Stress = E × Strain.\n\nStep 2: Here, the proportionality constant E is called the modulus of elasticity of the material.\n\nStep 3: Depending on the type of strain, it corresponds to Young's modulus (linear), Shear modulus (shape), or Bulk modulus (volume).\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 4605, // Q7
    similar_question: {
      question: "The stress-strain graphs for two materials P and Q are straight lines making angles of 60° and 30° respectively with the strain axis. What is the ratio of their Young's moduli Y_P : Y_Q?",
      option_a: "3 : 1",
      option_b: "1 : 3",
      option_c: "√3 : 1",
      option_d: "1 : √3",
      correct_option: "A",
      explanation: "Step 1: On a stress (vertical axis) versus strain (horizontal axis) graph, Young's modulus equals the slope of the linear portion: Y = Stress / Strain = tan θ.\n\nStep 2: For material P, θ_P = 60°  →  Y_P = tan 60° = √3.\nFor material Q, θ_Q = 30°  →  Y_Q = tan 30° = 1 / √3.\n\nStep 3: Compute the ratio:\nY_P / Y_Q = √3 / (1 / √3) = 3 / 1 = 3 : 1.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 4606, // Q8
    similar_question: {
      question: "A material has a large plastic deformation range between its elastic limit and fracture point. Such a material is classified as:",
      option_a: "Ductile",
      option_b: "Brittle",
      option_c: "Elastomer",
      option_d: "Rigid",
      correct_option: "A",
      explanation: "Step 1: Materials that undergo substantial plastic deformation before rupturing can be drawn into thin wires without snapping.\n\nStep 2: Such materials (like copper, aluminum, and mild steel) are termed ductile materials.\n\nStep 3: In contrast, brittle materials fracture almost immediately after passing the elastic limit.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 4607, // Q9
    similar_question: {
      question: "Four cylindrical wires made of the same metal are stretched by the same tensile force. Which wire will experience the greatest elongation?",
      option_a: "Length L = 3.0 m, diameter d = 0.5 mm",
      option_b: "Length L = 1.0 m, diameter d = 0.5 mm",
      option_c: "Length L = 2.0 m, diameter d = 1.0 mm",
      option_d: "Length L = 3.0 m, diameter d = 2.0 mm",
      correct_option: "A",
      explanation: "Step 1: Elongation is given by ΔL = F L / (A Y) = F L / [ (π d² / 4) Y ] ∝ L / d².\n\nStep 2: Compare the factor L / d² for each wire (with d in mm and L in m):\nOption A: 3.0 / (0.5)² = 3.0 / 0.25 = 12.0\nOption B: 1.0 / (0.5)² = 1.0 / 0.25 = 4.0\nOption C: 2.0 / (1.0)² = 2.0 / 1.0 = 2.0\nOption D: 3.0 / (2.0)² = 3.0 / 4.0 = 0.75\n\nStep 3: Option A gives the maximum value of L / d², producing the greatest elongation.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 4608, // Q10
    similar_question: {
      question: "Which of the following statements concerning elastic moduli is INCORRECT?",
      option_a: "Young's modulus of a perfectly rigid body is zero",
      option_b: "Bulk modulus is applicable to solids, liquids, and gases",
      option_c: "Steel is more elastic than rubber because it requires greater stress for the same strain",
      option_d: "Shear modulus is meaningful primarily for solids that can sustain tangential stress",
      correct_option: "A",
      explanation: "Step 1: For a perfectly rigid body, strain is zero under any finite stress: Strain = 0.\n\nStep 2: Young's modulus is Y = Stress / Strain = Stress / 0 = ∞ (infinite), not zero.\n\nStep 3: Hence, the statement that Young's modulus of a perfectly rigid body is zero is incorrect.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 4609, // Q11
    similar_question: {
      question: "The modulus of elasticity of a substance has the same SI dimensions as:",
      option_a: "Pressure and stress",
      option_b: "Surface tension",
      option_c: "Strain",
      option_d: "Force",
      correct_option: "A",
      explanation: "Step 1: Modulus of elasticity is defined as Stress / Strain.\n\nStep 2: Strain is a dimensionless quantity (ratio of lengths, areas, or volumes).\n\nStep 3: Stress is force per unit area: [Stress] = [F / A] = [M L T⁻²] / [L²] = [M L⁻¹ T⁻²].\n\nStep 4: Pressure is also force per unit area and has the identical dimensions [M L⁻¹ T⁻²] and SI unit N/m² (Pascal).\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 4610, // Q12
    similar_question: {
      question: "A wire of length L and radius r is stretched by a force F, producing an elongation ΔL. Another wire of the same material has length 3L and radius 3r, and is subjected to a stretching force of 3F. What is the elongation of this second wire?",
      option_a: "ΔL / 3",
      option_b: "ΔL",
      option_c: "3 ΔL",
      option_d: "9 ΔL",
      correct_option: "A",
      explanation: "Step 1: Elongation is ΔL = F L / (π r² Y).\n\nStep 2: For the second wire:\nΔL' = (3F)(3L) / [ π (3r)² Y ] = (9 F L) / [ 9 π r² Y ] = F L / (π r² Y) ... wait!\n(3F)(3L) / [9 π r² Y] = 9 / 9 = 1! That equals ΔL!\nLet's check: If F' = 3F, L' = 3L, r' = 3r, then ΔL' = (3)(3) / (3)² ΔL = 9/9 ΔL = ΔL.\nLet's set: length 4L, radius 2r, force 2F:\nΔL' = (2F)(4L) / [ π (2r)² Y ] = 8 / 4 ΔL = 2 ΔL.\nLet's keep the question clean:\n\"A wire of length L and radius r is stretched by a force F, producing an elongation e. Another wire of the same material has length 2L and radius 2r, and is stretched by a force 4F. What is the elongation of this second wire?\"\nΔL' = (4F)(2L) / [ π (2r)² Y ] = (8 / 4) [ F L / (π r² Y) ] = 2 e.\nOption A: 2 e, Option B: e, Option C: 4 e, Option D: e / 2.\n\nTherefore, Option (A) is the correct answer.",
      option_a: "2 e",
      option_b: "e",
      option_c: "4 e",
      option_d: "e / 2",
      correct_option: "A",
      explanation: "Step 1: Elongation for the first wire is e = F L / (π r² Y).\n\nStep 2: For the second wire with length 2L, radius 2r, and stretching force 4F:\ne' = (4F)(2L) / [ π (2r)² Y ] = (8 F L) / (4 π r² Y) = 2 [ F L / (π r² Y) ] = 2 e.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 4611, // Q13
    similar_question: {
      question: "Which of the following materials possesses the highest Young's modulus of elasticity among steel, copper, rubber, and glass?",
      option_a: "Steel",
      option_b: "Copper",
      option_c: "Glass",
      option_d: "Rubber",
      correct_option: "A",
      explanation: "Step 1: Elasticity in physics is defined by the resistance to deforming stress, measured by Young's modulus (Y = Stress / Strain).\n\nStep 2: Typical values of Young's modulus:\nSteel: ~2.0 × 10¹¹ N/m²\nCopper: ~1.2 × 10¹¹ N/m²\nGlass: ~0.7 × 10¹¹ N/m²\nRubber: ~10⁶ to 10⁷ N/m²\n\nStep 3: Steel requires the largest stress to produce a given strain, so it has the highest elasticity.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 4612, // Q14
    similar_question: {
      question: "Two wires made of the same metal have lengths in the ratio 2 : 3 and radii in the ratio 1 : 2. When stretched by equal forces, what is the ratio of their respective extensions ΔL₁ : ΔL₂?",
      option_a: "8 : 3",
      option_b: "3 : 8",
      option_c: "4 : 3",
      option_d: "1 : 6",
      correct_option: "A",
      explanation: "Step 1: Extension is ΔL = F L / (π r² Y) ∝ L / r² (for same force F and same material Y).\n\nStep 2: Compute the ratio of extensions:\nΔL₁ / ΔL₂ = (L₁ / L₂) × (r₂ / r₁)².\n\nStep 3: Given L₁ / L₂ = 2 / 3 and r₁ / r₂ = 1 / 2 (so r₂ / r₁ = 2 / 1):\nΔL₁ / ΔL₂ = (2 / 3) × (2 / 1)² = (2 / 3) × 4 = 8 / 3 = 8 : 3.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 4613, // Q15
    similar_question: {
      question: "A copper wire of length 2.0 m and cross-sectional area 0.5 cm² is stretched by a tensile force of 3.0 × 10³ N. If Young's modulus of copper is 1.2 × 10¹¹ N/m², what is the increase in the length of the wire?",
      option_a: "1.0 mm",
      option_b: "0.5 mm",
      option_c: "2.0 mm",
      option_d: "0.1 mm",
      correct_option: "A",
      explanation: "Step 1: Convert units:\nL = 2.0 m\nA = 0.5 cm² = 0.5 × 10⁻⁴ m²\nF = 3.0 × 10³ N\nY = 1.2 × 10¹¹ N/m².\n\nStep 2: Compute elongation:\nΔL = F L / (A Y) = (3.0 × 10³ × 2.0) / (0.5 × 10⁻⁴ × 1.2 × 10¹¹).\n\nStep 3: Evaluate denominator and numerator:\nNumerator = 6.0 × 10³\nDenominator = 6.0 × 10⁶\nΔL = (6.0 × 10³) / (6.0 × 10⁶) = 1.0 × 10⁻³ m = 1.0 mm.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 4614, // Q16
    similar_question: {
      question: "What is the ratio of adiabatic bulk modulus (B_s) to isothermal bulk modulus (B_T) for an ideal gas with ratio of specific heats γ?",
      option_a: "γ",
      option_b: "1 / γ",
      option_c: "γ − 1",
      option_d: "γ / (γ − 1)",
      correct_option: "A",
      explanation: "Step 1: For an ideal gas undergoing an adiabatic process, P V^γ = constant. The adiabatic bulk modulus is B_s = − V (dP / dV)_s = γ P.\n\nStep 2: For an isothermal process, P V = constant. The isothermal bulk modulus is B_T = − V (dP / dV)_T = P.\n\nStep 3: Compute the ratio:\nB_s / B_T = (γ P) / P = γ.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 4615, // Q17
    similar_question: {
      question: "What is the shear modulus (modulus of rigidity) of an ideal static liquid?",
      option_a: "Zero",
      option_b: "Infinite",
      option_c: "Equal to its hydrostatic pressure",
      option_d: "Equal to its bulk modulus",
      correct_option: "A",
      explanation: "Step 1: Shear modulus η is the ratio of tangential shearing stress to shear strain: η = Shearing Stress / Shear Strain.\n\nStep 2: A static fluid cannot support any static tangential (shear) stress; any applied shear causes continuous deformation (flow).\n\nStep 3: Hence, the restoring shear stress in a static liquid is zero, making its modulus of rigidity identically zero.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 4616, // Q18
    similar_question: {
      question: "Two wires A and B of the same length and material are subjected to the same tensile load. If the radius of wire A is 3 times the radius of wire B, what is the ratio of the elongation of wire A to that of wire B?",
      option_a: "1 : 9",
      option_b: "9 : 1",
      option_c: "1 : 3",
      option_d: "3 : 1",
      correct_option: "A",
      explanation: "Step 1: Elongation is given by ΔL = F L / (π r² Y).\n\nStep 2: Since F, L, and Y are identical for both wires, elongation is inversely proportional to the square of the radius: ΔL ∝ 1 / r².\n\nStep 3: Given r_A = 3 r_B:\nΔL_A / ΔL_B = (r_B / r_A)² = (r_B / 3r_B)² = 1 / 9 = 1 : 9.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 4617, // Q19
    similar_question: {
      question: "A solid cube is subjected to uniform hydrostatic pressure. If each edge of the cube decreases in length by 0.5%, what is the resulting volumetric (bulk) strain?",
      option_a: "0.015 (or 1.5%)",
      option_b: "0.005 (or 0.5%)",
      option_c: "0.010 (or 1.0%)",
      option_d: "0.020 (or 2.0%)",
      correct_option: "A",
      explanation: "Step 1: The volume of a cube of edge length a is V = a³.\n\nStep 2: Differentiating gives the fractional change in volume:\nΔV / V = 3 (Δa / a).\n\nStep 3: Given that linear strain is Δa / a = −0.5% = −0.005:\nVolumetric strain = |ΔV / V| = 3 × 0.5% = 1.5% = 0.015.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 4618, // Q20
    similar_question: {
      question: "A uniform wire of length L and radius r has Young's modulus Y. If the wire is cut into two equal halves, what is Young's modulus for each piece?",
      option_a: "Y",
      option_b: "Y / 2",
      option_c: "2 Y",
      option_d: "4 Y",
      correct_option: "A",
      explanation: "Step 1: Young's modulus is an intensive material property that depends strictly on the chemical composition, lattice structure, and bonding of the substance.\n\nStep 2: It does not depend on macroscopic dimensions such as length or radius.\n\nStep 3: Therefore, cutting the wire in half leaves Young's modulus completely unchanged at Y.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 4619, // Q21
    similar_question: {
      question: "According to Hooke's law, when a deforming force is applied to an elastic material within its proportional limit, the ratio of stress to strain:",
      option_a: "Remains constant",
      option_b: "Increases linearly with stress",
      option_c: "Decreases inversely with strain",
      option_d: "Becomes zero",
      correct_option: "A",
      explanation: "Step 1: Hooke's law states that within the proportional limit, stress is directly proportional to strain: Stress ∝ Strain.\n\nStep 2: Consequently, Stress / Strain = constant = E (modulus of elasticity).\n\nStep 3: Thus, increasing the stress produces a proportional increase in strain, keeping their ratio strictly constant.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 4620, // Q22
    similar_question: {
      question: "A metal wire of diameter d breaks when subjected to a minimum tensile force F_b. If another wire of the same material has diameter 3d, what is the minimum breaking force for this thicker wire?",
      option_a: "9 F_b",
      option_b: "3 F_b",
      option_c: "6 F_b",
      option_d: "27 F_b",
      correct_option: "A",
      explanation: "Step 1: Breaking stress is a material constant independent of the wire's dimensions:\nBreaking Stress = F_breaking / A = constant.\n\nStep 2: Cross-sectional area of a wire of diameter d is A = π d² / 4.\n\nStep 3: Hence, the breaking force is proportional to the square of the diameter: F_breaking ∝ d².\n\nStep 4: For diameter 3d, the breaking force is (3)² F_b = 9 F_b.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 4621, // Q23
    similar_question: {
      question: "As the temperature of a solid metal increases, what generally happens to its Young's modulus of elasticity?",
      option_a: "It decreases because thermal agitation weakens interatomic bonding",
      option_b: "It increases because atoms vibrate with higher energy",
      option_c: "It remains completely constant",
      option_d: "It first increases and then decreases sharply",
      correct_option: "A",
      explanation: "Step 1: At higher temperatures, atoms vibrate with greater amplitudes about their mean equilibrium positions.\n\nStep 2: This increases the average interatomic spacing, which decreases the curvature (stiffness) of the interatomic potential energy well.\n\nStep 3: As a result, the restoring force for a given deformation weakens, causing Young's modulus to decrease as temperature rises.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 4622, // Q24
    similar_question: {
      question: "A solid rubber ball is taken to a depth of 100 m in a lake, where its volume decreases by 0.05%. Taking the density of water to be 1000 kg/m³ and g = 10 m/s², what is the bulk modulus of the rubber?",
      option_a: "2.0 × 10⁹ N/m²",
      option_b: "1.0 × 10⁹ N/m²",
      option_c: "4.0 × 10⁹ N/m²",
      option_d: "5.0 × 10⁸ N/m²",
      correct_option: "A",
      explanation: "Step 1: Gauge pressure at depth h = 100 m is:\nΔP = ρ g h = 1000 kg/m³ × 10 m/s² × 100 m = 1.0 × 10⁶ N/m².\n\nStep 2: Volumetric strain is:\n|ΔV / V| = 0.05% = 0.05 / 100 = 5.0 × 10⁻⁴.\n\nStep 3: Bulk modulus is defined as:\nB = ΔP / |ΔV / V| = (1.0 × 10⁶ N/m²) / (5.0 × 10⁻⁴) = 2.0 × 10⁹ N/m².\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 4623, // Q25
    similar_question: {
      question: "If E_T and E_s represent the isothermal and adiabatic elasticities of an ideal gas respectively, which relation is correct for any ideal gas?",
      option_a: "E_T / E_s < 1 (since E_s = γ E_T with γ > 1)",
      option_b: "E_T / E_s > 1",
      option_c: "E_T / E_s = 1",
      option_d: "E_T / E_s = γ",
      correct_option: "A",
      explanation: "Step 1: Isothermal elasticity of an ideal gas is E_T = P.\nAdiabatic elasticity of an ideal gas is E_s = γ P.\n\nStep 2: For any real or ideal gas, the adiabatic index γ = C_p / C_v > 1.\n\nStep 3: Therefore, E_T / E_s = P / (γ P) = 1 / γ < 1.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 4624, // Q26
    similar_question: {
      question: "What is the isothermal bulk modulus of air at standard atmospheric pressure (1 atm ≈ 1.013 × 10⁵ N/m²)?",
      option_a: "1.013 × 10⁵ N/m²",
      option_b: "1.418 × 10⁵ N/m²",
      option_c: "2.026 × 10⁵ N/m²",
      option_d: "0.506 × 10⁵ N/m²",
      correct_option: "A",
      explanation: "Step 1: For an ideal gas undergoing an isothermal change, the bulk modulus is B_T = P.\n\nStep 2: Atmospheric pressure is P = 1.013 × 10⁵ N/m².\n\nStep 3: Therefore, the isothermal bulk modulus of air at standard atmospheric pressure is 1.013 × 10⁵ N/m².\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 4625, // Q27
    similar_question: {
      question: "A uniform metal rod of length L, density ρ, and Young's modulus Y hangs vertically from a rigid ceiling under its own weight. What is the total elongation produced in the rod solely due to its own weight?",
      option_a: "ρ g L² / (2 Y)",
      option_b: "ρ g L² / Y",
      option_c: "ρ g L / (2 Y)",
      option_d: "2 ρ g L² / Y",
      correct_option: "A",
      explanation: "Step 1: At a distance x from the lower free end, the weight of the segment below is W(x) = A x ρ g.\n\nStep 2: The tension at this cross-section is T(x) = A x ρ g, so stress is σ(x) = T(x) / A = ρ g x.\n\nStep 3: The elongation of an element dx is d(ΔL) = [ σ(x) / Y ] dx = (ρ g x / Y) dx.\n\nStep 4: Integrate from x = 0 to x = L:\nΔL = ∫₀^L (ρ g x / Y) dx = (ρ g / Y) [ x² / 2 ]₀^L = ρ g L² / (2 Y).\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 4626, // Q28
    similar_question: {
      question: "A wire of length L and cross-sectional area A is fixed at one end and loaded with a weight W at the other, producing an elongation e. If the same wire is instead draped symmetrically over a frictionless light pulley and loaded with a weight W at each of its two hanging ends, what is the total elongation of the wire?",
      option_a: "e",
      option_b: "2 e",
      option_c: "e / 2",
      option_d: "4 e",
      correct_option: "A",
      explanation: "Step 1: In the first case, a single hanging weight W creates a tension T = W throughout the wire of length L, resulting in elongation e = W L / (A Y).\n\nStep 2: In the second case, with weight W at each end, the tension throughout the draped wire is still T = W.\n\nStep 3: Since the total length L and cross-sectional area A remain the same, the total elongation is ΔL = T L / (A Y) = W L / (A Y) = e.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 4627, // Q29
    similar_question: {
      question: "Two wires X and Y of the same material are subjected to the same tensile load. If the radius of wire X is 1/3 of the radius of wire Y, what is the ratio of the tensile stress in wire X to that in wire Y?",
      option_a: "9 : 1",
      option_b: "3 : 1",
      option_c: "1 : 3",
      option_d: "1 : 9",
      correct_option: "A",
      explanation: "Step 1: Tensile stress is defined as force per unit area: σ = F / A = F / (π r²).\n\nStep 2: For equal tensile load F, stress is inversely proportional to the square of the radius: σ ∝ 1 / r².\n\nStep 3: Given r_X = r_Y / 3:\nσ_X / σ_Y = (r_Y / r_X)² = (r_Y / (r_Y / 3))² = (3)² = 9 / 1 = 9 : 1.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 4628, // Q30
    similar_question: {
      question: "Within the proportional limit of an elastic solid, how are the restoring stress and the resulting strain related?",
      option_a: "Stress is directly proportional to strain",
      option_b: "Stress is inversely proportional to strain",
      option_c: "Stress is proportional to the square of strain",
      option_d: "Stress is independent of strain",
      correct_option: "A",
      explanation: "Step 1: Hooke's law fundamentally states that within the elastic proportional limit, stress is directly proportional to strain.\n\nStep 2: Mathematically, Stress = E × Strain, where E is the modulus of elasticity.\n\nStep 3: Thus, stress varies linearly with strain.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 4629, // Q31
    similar_question: {
      question: "A steel alloy has Young's modulus Y = 2.0 × 10¹¹ N/m². If its maximum allowable strain before breaking is 0.12, what is the breaking stress of this alloy?",
      option_a: "2.4 × 10¹⁰ N/m²",
      option_b: "1.67 × 10¹² N/m²",
      option_c: "2.4 × 10¹¹ N/m²",
      option_d: "1.2 × 10¹⁰ N/m²",
      correct_option: "A",
      explanation: "Step 1: Using Hooke's relation up to fracture: Breaking Stress = Y × Breaking Strain.\n\nStep 2: Substitute Y = 2.0 × 10¹¹ N/m² and Breaking Strain = 0.12:\nBreaking Stress = 2.0 × 10¹¹ × 0.12 = 0.24 × 10¹¹ = 2.4 × 10¹⁰ N/m².\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 4630, // Q32
    similar_question: {
      question: "A metal cube of edge length 50 mm has its bottom face rigidly fixed. A horizontal shearing force of 10 kN applied to the top face displaces it by 0.2 mm parallel to itself. What is the shear modulus (modulus of rigidity) of the metal?",
      option_a: "1.0 × 10¹⁰ N/m²",
      option_b: "2.0 × 10¹⁰ N/m²",
      option_c: "5.0 × 10⁹ N/m²",
      option_d: "4.0 × 10¹⁰ N/m²",
      correct_option: "A",
      explanation: "Step 1: Edge length a = 50 mm = 0.05 m.\nArea of top face A = a² = (0.05 m)² = 2.5 × 10⁻³ m².\nShear force F = 10 kN = 10⁴ N.\nShear stress = F / A = 10⁴ / (2.5 × 10⁻³) = 4.0 × 10⁶ N/m².\n\nStep 2: Shear strain = lateral displacement / height = Δx / a = 0.2 mm / 50 mm = 4.0 × 10⁻⁴.\n\nStep 3: Shear modulus η is:\nη = Shear Stress / Shear Strain = (4.0 × 10⁶ N/m²) / (4.0 × 10⁻⁴) = 1.0 × 10¹⁰ N/m².\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 4631, // Q33
    similar_question: {
      question: "Which of the following substances exhibits the greatest elasticity (highest value of Young's modulus) and least elastic fatigue among steel, copper, glass, and quartz?",
      option_a: "Quartz",
      option_b: "Steel",
      option_c: "Copper",
      option_d: "Glass",
      correct_option: "A",
      explanation: "Step 1: Quartz fibers exhibit virtually zero elastic after-effect and minimal elastic hysteresis, making quartz nearly perfectly elastic.\n\nStep 2: In precision scientific instruments (such as galvanometers), quartz fibers are preferred because they recover instantaneously and completely from twisting.\n\nStep 3: Hence, quartz is recognized as having the highest elastic performance with least fatigue.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 4632, // Q34
    similar_question: {
      question: "Which of the following statements comparing the elastic properties of materials is INCORRECT?",
      option_a: "All alloys have smaller Young's moduli than pure metals",
      option_b: "Metals generally have much larger Young's moduli than elastomers",
      option_c: "Bulk modulus is physically meaningful for solids, liquids, and gases",
      option_d: "Shear modulus and Young's modulus are meaningful only for solids",
      correct_option: "A",
      explanation: "Step 1: Alloying often increases the yield strength and stiffness of metals by introducing lattice strains that hinder dislocation motion.\n\nStep 2: Many alloys (such as various high-strength steels and titanium alloys) have comparable or even greater Young's moduli and mechanical resistance than pure base metals.\n\nStep 3: Therefore, stating that all alloys have smaller Young's moduli than pure metals is incorrect.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 4633, // Q35
    similar_question: {
      question: "A steel cable has a breaking stress of 8.0 × 10⁷ N/m² and a density of 8.0 × 10³ kg/m³. What is the maximum length of this cable that can hang vertically under its own weight without snapping? (Take g = 10 m/s²)",
      option_a: "1000 m",
      option_b: "800 m",
      option_c: "500 m",
      option_d: "1250 m",
      correct_option: "A",
      explanation: "Step 1: Maximum tension in a hanging cable of length L and cross-sectional area A occurs at the top support: T_max = M g = A L ρ g.\n\nStep 2: Maximum tensile stress at the top is σ_max = T_max / A = L ρ g.\n\nStep 3: For the cable not to break, σ_max ≤ Breaking Stress:\nL_max ρ g = Breaking Stress  →  L_max = Breaking Stress / (ρ g).\n\nStep 4: Substitute the given values:\nL_max = (8.0 × 10⁷ N/m²) / (8.0 × 10³ kg/m³ × 10 m/s²) = (8.0 × 10⁷) / (8.0 × 10⁴) = 1000 m.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 4634, // Q36
    similar_question: {
      question: "A rubber cord of length 10 cm, density 1.2 × 10³ kg/m³, and Young's modulus 6.0 × 10⁶ N/m² is suspended vertically from a ceiling. Taking g = 10 m/s², what is the extension produced in the cord solely due to its own weight?",
      option_a: "1.0 × 10⁻⁴ m (or 0.1 mm)",
      option_b: "2.0 × 10⁻⁴ m",
      option_c: "5.0 × 10⁻⁵ m",
      option_d: "1.0 × 10⁻³ m",
      correct_option: "A",
      explanation: "Step 1: The elongation of a uniform elastic cord of length L hanging under its own weight is:\nΔL = ρ g L² / (2 Y).\n\nStep 2: Convert units: L = 10 cm = 0.1 m, ρ = 1.2 × 10³ kg/m³, Y = 6.0 × 10⁶ N/m², g = 10 m/s².\n\nStep 3: Substitute values:\nΔL = [ 1.2 × 10³ × 10 × (0.1)² ] / [ 2 × 6.0 × 10⁶ ]\nΔL = [ 1.2 × 10⁴ × 0.01 ] / [ 1.2 × 10⁷ ] = 120 / (1.2 × 10⁷) = 1.0 × 10⁻⁴ m = 0.1 mm.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 4635, // Q37
    similar_question: {
      question: "A tensile load of 5.0 kg hung from a wire of length 2.0 m and diameter 1.0 mm produces an elongation of 0.5 mm. Taking g = 9.8 m/s², what is the Young's modulus of the wire material?",
      option_a: "2.5 × 10¹¹ N/m²",
      option_b: "1.25 × 10¹¹ N/m²",
      option_c: "5.0 × 10¹¹ N/m²",
      option_d: "7.8 × 10¹⁰ N/m²",
      correct_option: "A",
      explanation: "Step 1: Given values:\nMass m = 5.0 kg  →  F = m g = 5.0 × 9.8 = 49 N.\nLength L = 2.0 m.\nRadius r = d / 2 = 0.5 mm = 5.0 × 10⁻⁴ m.\nArea A = π r² = π (5.0 × 10⁻⁴)² = 25π × 10⁻⁸ m² ≈ 7.85 × 10⁻⁷ m².\nElongation ΔL = 0.5 mm = 5.0 × 10⁻⁴ m.\n\nStep 2: Young's modulus formula:\nY = F L / (A ΔL) = (49 × 2.0) / (7.85 × 10⁻⁷ × 5.0 × 10⁻⁴) = 98 / (3.927 × 10⁻¹⁰) ≈ 2.5 × 10¹¹ N/m².\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 4636, // Q38
    similar_question: {
      question: "A steel wire of cross-sectional area 0.2 cm² has Young's modulus Y = 2.0 × 10¹¹ N/m². What tensile force would theoretically be required to stretch the wire to double its original length (assuming Hooke's law remains valid)?",
      option_a: "4.0 × 10⁶ N",
      option_b: "2.0 × 10⁶ N",
      option_c: "4.0 × 10¹¹ N",
      option_d: "2.0 × 10¹¹ N",
      correct_option: "A",
      explanation: "Step 1: When a wire is stretched to double its original length (L' = 2L), the elongation is ΔL = L' − L = L.\n\nStep 2: The longitudinal strain is Strain = ΔL / L = L / L = 1.\n\nStep 3: From Hooke's law, Stress = Y × Strain = Y × 1 = Y.\n\nStep 4: The required tensile force is F = Stress × A = Y × A.\nSubstitute Y = 2.0 × 10¹¹ N/m² and A = 0.2 cm² = 0.2 × 10⁻⁴ m² = 2.0 × 10⁻⁵ m²:\nF = 2.0 × 10¹¹ × 2.0 × 10⁻⁵ = 4.0 × 10⁶ N.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 4637, // Q39
    similar_question: {
      question: "Two wires of the same length and material have radii r₁ and r₂ respectively. When equal tensile loads are hung from them, what is the ratio of tensile stress in the second wire to that in the first wire?",
      option_a: "r₁² / r₂²",
      option_b: "r₂² / r₁²",
      option_c: "r₁ / r₂",
      option_d: "r₂ / r₁",
      correct_option: "A",
      explanation: "Step 1: Tensile stress is defined as force per unit area: σ = F / (π r²).\n\nStep 2: With equal tensile force F applied to both wires, stress is inversely proportional to r²: σ ∝ 1 / r².\n\nStep 3: The ratio of stress in the second wire to that in the first wire is:\nσ₂ / σ₁ = (1 / r₂²) / (1 / r₁²) = r₁² / r₂².\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 4638, // Q40
    similar_question: {
      question: "What increase in pressure is required to decrease the volume of a liquid sample by 0.005% if its bulk modulus is 2000 MPa?",
      option_a: "100 kPa",
      option_b: "50 kPa",
      option_c: "200 kPa",
      option_d: "10 kPa",
      correct_option: "A",
      explanation: "Step 1: Bulk modulus is defined as B = ΔP / |ΔV / V|  →  ΔP = B × |ΔV / V|.\n\nStep 2: Given B = 2000 MPa = 2.0 × 10⁹ N/m².\nFractional volume decrease |ΔV / V| = 0.005% = 0.005 / 100 = 5.0 × 10⁻⁵.\n\nStep 3: Compute the required pressure increase:\nΔP = 2.0 × 10⁹ N/m² × 5.0 × 10⁻⁵ = 1.0 × 10⁵ N/m² = 100 kPa.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 4639, // Q41
    similar_question: {
      question: "Under a constant applied hydraulic pressure ΔP, how does the fractional change in volume |ΔV / V| of a material depend on its bulk modulus B?",
      option_a: "|ΔV / V| ∝ 1 / B",
      option_b: "|ΔV / V| ∝ B",
      option_c: "|ΔV / V| ∝ 1 / B²",
      option_d: "|ΔV / V| ∝ B²",
      correct_option: "A",
      explanation: "Step 1: Bulk modulus is defined by B = ΔP / (|ΔV / V|).\n\nStep 2: Rearranging for volumetric strain gives:\n|ΔV / V| = ΔP / B.\n\nStep 3: For a fixed hydraulic pressure ΔP, the fractional volume change is inversely proportional to the bulk modulus: |ΔV / V| ∝ 1 / B.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 4640, // Q42
    similar_question: {
      question: "A hanging mass suspended from a long uniform wire causes it to elongate by 2.0 mm. If the same mass is suspended from another wire of the same material and length, but with 1/3 of the diameter, what will be the elongation of this second wire?",
      option_a: "18.0 mm",
      option_b: "6.0 mm",
      option_c: "9.0 mm",
      option_d: "2.0 mm",
      correct_option: "A",
      explanation: "Step 1: Elongation is ΔL = F L / (π r² Y) = 4 F L / (π d² Y).\n\nStep 2: Since F, L, and Y are identical, elongation is inversely proportional to the square of the diameter: ΔL ∝ 1 / d².\n\nStep 3: If the diameter is reduced to d / 3, the new elongation is:\nΔL' = ΔL × (d / (d / 3))² = ΔL × (3)² = 9 ΔL.\n\nStep 4: Substitute ΔL = 2.0 mm:\nΔL' = 9 × 2.0 mm = 18.0 mm.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 4641, // Q43
    similar_question: {
      question: "A steel wire of length 2.0 m and cross-sectional area 2.0 mm² is suspended vertically and loaded with a mass of 4.0 kg. If Young's modulus of steel is 2.0 × 10¹¹ N/m² and g = 10 m/s², what is the elongation of the wire?",
      option_a: "0.20 mm",
      option_b: "0.10 mm",
      option_c: "0.40 mm",
      option_d: "0.05 mm",
      correct_option: "A",
      explanation: "Step 1: Tension force F = m g = 4.0 kg × 10 m/s² = 40 N.\n\nStep 2: Cross-sectional area A = 2.0 mm² = 2.0 × 10⁻⁶ m².\nLength L = 2.0 m, Young's modulus Y = 2.0 × 10¹¹ N/m².\n\nStep 3: Compute elongation:\nΔL = F L / (A Y) = (40 × 2.0) / (2.0 × 10⁻⁶ × 2.0 × 10¹¹) = 80 / (4.0 × 10⁵) = 2.0 × 10⁻⁴ m = 0.20 mm.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 4642, // Q44
    similar_question: {
      question: "A spherical lead shot is lowered to a depth of 500 m in the ocean (density of seawater = 1020 kg/m³). If the fractional volume decrease is 0.01% and g = 9.8 m/s², what is the bulk modulus of lead?",
      option_a: "5.0 × 10¹⁰ N/m²",
      option_b: "2.5 × 10¹⁰ N/m²",
      option_c: "1.0 × 10¹¹ N/m²",
      option_d: "5.0 × 10⁹ N/m²",
      correct_option: "A",
      explanation: "Step 1: Pressure increase at depth h = 500 m is:\nΔP = ρ g h = 1020 × 9.8 × 500 = 4.998 × 10⁶ N/m² ≈ 5.0 × 10⁶ N/m².\n\nStep 2: Fractional volume decrease is |ΔV / V| = 0.01% = 1.0 × 10⁻⁴.\n\nStep 3: Bulk modulus is:\nB = ΔP / |ΔV / V| = (5.0 × 10⁶ N/m²) / (1.0 × 10⁻⁴) = 5.0 × 10¹⁰ N/m².\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 4643, // Q45
    similar_question: {
      question: "What is the theoretical value of the bulk modulus of an ideally incompressible liquid?",
      option_a: "Infinite",
      option_b: "Zero",
      option_c: "1.0 × 10⁹ N/m²",
      option_d: "Negative",
      correct_option: "A",
      explanation: "Step 1: An incompressible liquid undergoes zero volume change under any applied external pressure: ΔV = 0.\n\nStep 2: The volumetric strain is therefore |ΔV / V| = 0.\n\nStep 3: By definition, Bulk Modulus B = ΔP / (|ΔV / V|) = ΔP / 0 = ∞ (infinite).\n\nStep 4: Equivalently, its compressibility k = 1 / B = 0.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 4644, // Q46
    similar_question: {
      question: "Two solid rods A and B of the same metal have lengths in the ratio 1 : 3 and radii in the ratio 2 : 1. What is the ratio of their shear moduli (modulus of rigidity) η_A : η_B?",
      option_a: "1 : 1",
      option_b: "4 : 1",
      option_c: "2 : 3",
      option_d: "12 : 1",
      correct_option: "A",
      explanation: "Step 1: The shear modulus (modulus of rigidity) η is an intensive material property determined purely by atomic bonding and composition.\n\nStep 2: It is completely independent of the macroscopic dimensions (length, radius, shape) of the sample.\n\nStep 3: Because rods A and B are made of the exact same metal, their shear moduli are identical: η_A / η_B = 1 : 1.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 4645, // Q47
    similar_question: {
      question: "Two circular shafts A and B of the same length and material have radii r₁ and r₂ respectively. If equal twisting couples (torques) are applied to both shafts, what is the ratio of the angle of twist θ₁ of shaft A to θ₂ of shaft B?",
      option_a: "r₂⁴ / r₁⁴",
      option_b: "r₁⁴ / r₂⁴",
      option_c: "r₂² / r₁²",
      option_d: "r₁² / r₂²",
      correct_option: "A",
      explanation: "Step 1: The twisting couple required for an angle of twist θ is τ = C θ, where torsional rigidity is C = π η r⁴ / (2 L).\n\nStep 2: For a given torque τ, the angle of twist is θ = τ / C = 2 τ L / (π η r⁴).\n\nStep 3: Since τ, L, and η are identical for both shafts, the angle of twist is inversely proportional to r⁴: θ ∝ 1 / r⁴.\n\nStep 4: Therefore, the ratio of angles of twist is θ₁ / θ₂ = r₂⁴ / r₁⁴.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 4646, // Q48
    similar_question: {
      question: "A cylindrical metal rod of length L = 1.5 m and radius r = 1.5 cm has one end rigidly clamped. When a twisting couple is applied to the free end, it twists through an angle θ = 0.4 radians. What is the shear strain at the outer surface of the rod?",
      option_a: "0.004",
      option_b: "0.008",
      option_c: "0.002",
      option_d: "0.016",
      correct_option: "A",
      explanation: "Step 1: The shear strain φ at the outer surface of a twisted cylindrical rod of radius r and length L is given by:\nφ = r θ / L.\n\nStep 2: Substitute r = 1.5 cm = 0.015 m, L = 1.5 m, and θ = 0.4 rad:\nφ = (0.015 m × 0.4 rad) / 1.5 m.\n\nStep 3: Simplify:\nφ = (0.015 / 1.5) × 0.4 = 0.01 × 0.4 = 0.004.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 4647, // Q49
    similar_question: {
      question: "A wire of length 3.0 m is suspended vertically. When loaded with a mass of 5.0 kg, it stretches by 4.0 mm. Taking g = 10 m/s², what is the elastic potential energy stored in the stretched wire?",
      option_a: "0.10 J",
      option_b: "0.20 J",
      option_c: "0.50 J",
      option_d: "1.00 J",
      correct_option: "A",
      explanation: "Step 1: Tension force applied by the hanging mass is F = m g = 5.0 kg × 10 m/s² = 50 N.\n\nStep 2: Elongation is ΔL = 4.0 mm = 4.0 × 10⁻³ m.\n\nStep 3: Elastic potential energy stored in a stretched wire under load F is:\nU = (1/2) F ΔL = (1/2) × 50 N × (4.0 × 10⁻³ m) = 25 × 4.0 × 10⁻³ = 0.10 J.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 4648, // Q50
    similar_question: {
      question: "A metal wire of initial length L, cross-sectional area A, and Young's modulus Y is stretched elastically by an amount x within its Hookean limit. What is the total work done in stretching the wire?",
      option_a: "Y A x² / (2 L)",
      option_b: "Y A x² / L",
      option_c: "2 Y A x² / L",
      option_d: "Y L x² / (2 A)",
      correct_option: "A",
      explanation: "Step 1: The restoring tensile force in a wire stretched by amount y is F(y) = (Y A / L) y.\n\nStep 2: Work done by an external agent to stretch the wire from y = 0 to y = x is:\nW = ∫₀^x F(y) dy = ∫₀^x (Y A / L) y dy = (Y A / L) [ y² / 2 ]₀^x.\n\nStep 3: Evaluating the integral yields:\nW = Y A x² / (2 L).\n\nTherefore, Option (A) is the correct answer."
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

    console.log(`Starting update of Set 10 Part 1 (${set10Part1Updates.length} questions)...`);
    let successCount = 0;
    for (const item of set10Part1Updates) {
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
        console.log(`[${successCount}/${set10Part1Updates.length}] Updated Question ID ${item.id}: SUCCESS`);
      } else {
        console.error(`Failed Question ID ${item.id}:`, data);
      }
    }
    console.log(`Set 10 Part 1 complete: ${successCount} questions committed.`);
  } catch (err) {
    console.error('Update failed:', err);
  }
}

updatePart1();
