const fs = require('fs');

const set10Part2Updates = [
  {
    id: 4649, // Q51
    similar_question: {
      question: "If a wire is subjected to a tensile stress σ and its material has Young's modulus Y, what is the elastic potential energy stored per unit volume (energy density) of the wire?",
      option_a: "σ² / (2 Y)",
      option_b: "σ² / Y",
      option_c: "σ / (2 Y)",
      option_d: "2 σ² Y",
      correct_option: "A",
      explanation: "Step 1: Energy stored per unit volume is u = (1/2) × Stress × Strain.\n\nStep 2: By Hooke's law, Strain = Stress / Y = σ / Y.\n\nStep 3: Substitute strain into the energy density formula:\nu = (1/2) × σ × (σ / Y) = σ² / (2 Y).\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 4650, // Q52
    similar_question: {
      question: "The elastic potential energy stored in an ideal spring when stretched by 3.0 cm is U₀. What will be the potential energy stored when it is stretched by 9.0 cm from its natural length?",
      option_a: "9 U₀",
      option_b: "3 U₀",
      option_c: "27 U₀",
      option_d: "6 U₀",
      correct_option: "A",
      explanation: "Step 1: Elastic potential energy in a spring stretched by distance x is U = (1/2) k x².\n\nStep 2: Since k is constant, U is directly proportional to x²: U ∝ x².\n\nStep 3: When x increases from 3.0 cm to 9.0 cm (a 3-fold increase):\nU' / U₀ = (9.0 / 3.0)² = (3)² = 9  →  U' = 9 U₀.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 4651, // Q53
    similar_question: {
      question: "Two wires of the same material and same cross-sectional area have lengths L and 3L. If both are stretched by the same tensile force F, what is the ratio of work done in stretching the first wire to that in stretching the second wire?",
      option_a: "1 : 3",
      option_b: "3 : 1",
      option_c: "1 : 9",
      option_d: "1 : 1",
      correct_option: "A",
      explanation: "Step 1: Work done in stretching a wire under load F is W = (1/2) F ΔL.\n\nStep 2: Elongation is ΔL = F L / (A Y), so W = (1/2) F² L / (A Y).\n\nStep 3: With F, A, and Y constant, work done is directly proportional to length: W ∝ L.\n\nStep 4: Compute the ratio: W₁ / W₂ = L / (3L) = 1 / 3 = 1 : 3.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 4652, // Q54
    similar_question: {
      question: "An elastic cord has force constant k. What is the mechanical work required to increase its extension from x to 2x?",
      option_a: "(3/2) k x²",
      option_b: "(1/2) k x²",
      option_c: "2 k x²",
      option_d: "k x²",
      correct_option: "A",
      explanation: "Step 1: Work done equals the change in elastic potential energy:\nW = U(2x) − U(x).\n\nStep 2: Potential energy formula is U = (1/2) k x²:\nU(2x) = (1/2) k (2x)² = (1/2) k (4 x²) = 2 k x².\nU(x) = (1/2) k x².\n\nStep 3: Compute difference:\nW = 2 k x² − (1/2) k x² = (3/2) k x².\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 4653, // Q55
    similar_question: {
      question: "A metal rod of length 0.5 m and cross-sectional area 2.0 cm² is compressed along its length by a load of mass 10 kg. If Young's modulus of the metal is 1.0 × 10¹¹ N/m² and g = 10 m/s², what is the increase in the elastic potential energy of the rod?",
      option_a: "1.25 × 10⁻⁵ J",
      option_b: "2.50 × 10⁻⁵ J",
      option_c: "5.00 × 10⁻⁵ J",
      option_d: "1.25 × 10⁻⁴ J",
      correct_option: "A",
      explanation: "Step 1: Compressive force F = m g = 10 kg × 10 m/s² = 100 N.\nArea A = 2.0 cm² = 2.0 × 10⁻⁴ m².\nLength L = 0.5 m, Y = 1.0 × 10¹¹ N/m².\n\nStep 2: Elastic energy stored is U = F² L / (2 A Y).\n\nStep 3: Substitute the numerical values:\nU = [ (100)² × 0.5 ] / [ 2 × (2.0 × 10⁻⁴) × (1.0 × 10¹¹) ]\nU = [ 10⁴ × 0.5 ] / [ 4.0 × 10⁷ ] = 5000 / (4.0 × 10⁷) = 1.25 × 10⁻⁴ ... wait, 5000 / 40,000,000 = 1.25 × 10⁻⁴ J!\nLet's check: 5 × 10³ / 4 × 10⁷ = 1.25 × 10⁻⁴ J.\nLet's set option_a: 1.25 × 10⁻⁴ J, option_b: 2.50 × 10⁻⁴ J, option_c: 1.25 × 10⁻⁵ J, option_d: 5.00 × 10⁻⁴ J.\n\nTherefore, Option (A) is the correct answer.",
      option_a: "1.25 × 10⁻⁴ J",
      option_b: "2.50 × 10⁻⁴ J",
      option_c: "1.25 × 10⁻⁵ J",
      option_d: "5.00 × 10⁻⁴ J",
      correct_option: "A",
      explanation: "Step 1: Compressive force is F = m g = 10 kg × 10 m/s² = 100 N.\nCross-sectional area A = 2.0 cm² = 2.0 × 10⁻⁴ m².\nLength L = 0.5 m, Y = 1.0 × 10¹¹ N/m².\n\nStep 2: Elastic energy stored in the compressed rod is:\nU = F² L / (2 A Y).\n\nStep 3: Substitute the values:\nU = [ (100)² × 0.5 ] / [ 2 × (2.0 × 10⁻⁴) × (1.0 × 10¹¹) ] = 5000 / (4.0 × 10⁷) = 1.25 × 10⁻⁴ J.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 4654, // Q56
    similar_question: {
      question: "If u is the elastic potential energy stored per unit volume in a stretched wire of Young's modulus Y, what is the tensile strain in the wire?",
      option_a: "√[ 2 u / Y ]",
      option_b: "√[ u / (2 Y) ]",
      option_c: "2 u / Y",
      option_d: "u / Y",
      correct_option: "A",
      explanation: "Step 1: Energy density is u = (1/2) × Stress × Strain.\n\nStep 2: Using Hooke's law, Stress = Y × Strain:\nu = (1/2) Y (Strain)².\n\nStep 3: Solve for Strain:\n(Strain)² = 2 u / Y  →  Strain = √[ 2 u / Y ].\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 4655, // Q57
    similar_question: {
      question: "Two wires have Young's moduli in the ratio 3 : 4. If both wires are subjected to the same tensile stress, what is the ratio of their elastic energy densities (energy stored per unit volume)?",
      option_a: "4 : 3",
      option_b: "3 : 4",
      option_c: "9 : 16",
      option_d: "16 : 9",
      correct_option: "A",
      explanation: "Step 1: Energy density expressed in terms of stress σ is u = σ² / (2 Y).\n\nStep 2: For equal tensile stress σ, energy density is inversely proportional to Young's modulus: u ∝ 1 / Y.\n\nStep 3: Compute the ratio of energy densities:\nu₁ / u₂ = Y₂ / Y₁ = 4 / 3 = 4 : 3.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 4656, // Q58
    similar_question: {
      question: "An ideal spring of stiffness constant k is stretched by an amount x by an applied tension force T. The elastic potential energy stored in the spring can be expressed as:",
      option_a: "T x / 2",
      option_b: "T x",
      option_c: "T² / (4 k)",
      option_d: "2 T x",
      correct_option: "A",
      explanation: "Step 1: In a stretched spring, the restoring tension is T = k x.\n\nStep 2: The elastic potential energy is U = (1/2) k x².\n\nStep 3: Substitute k x = T into the energy expression:\nU = (1/2) (k x) x = (1/2) T x = T x / 2.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 4657, // Q59
    similar_question: {
      question: "A copper wire has a breaking stress of 3.0 × 10⁸ N/m² and a density of 8.9 × 10³ kg/m³. What is the maximum length of this wire that can hang vertically under its own weight without breaking? (Take g = 10 m/s²)",
      option_a: "3.37 × 10³ m",
      option_b: "6.74 × 10³ m",
      option_c: "1.68 × 10³ m",
      option_d: "3.37 × 10⁴ m",
      correct_option: "A",
      explanation: "Step 1: Maximum stress in a hanging vertical wire occurs at the top suspension point: σ_max = L ρ g.\n\nStep 2: Setting σ_max = Breaking Stress gives:\nL_max = Breaking Stress / (ρ g).\n\nStep 3: Substitute values:\nL_max = (3.0 × 10⁸ N/m²) / (8.9 × 10³ kg/m³ × 10 m/s²) = (3.0 × 10⁸) / (8.9 × 10⁴) ≈ 3.37 × 10³ m.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 4658, // Q60
    similar_question: {
      question: "A steel wire of diameter 4.0 mm has a breaking strength (maximum breaking force) of 8.0 × 10⁴ N. What is the breaking force for another steel wire of the same material having a diameter of 2.0 mm?",
      option_a: "2.0 × 10⁴ N",
      option_b: "4.0 × 10⁴ N",
      option_c: "1.0 × 10⁴ N",
      option_d: "8.0 × 10³ N",
      correct_option: "A",
      explanation: "Step 1: Breaking force is related to breaking stress by F_break = σ_break × A = σ_break × (π d² / 4).\n\nStep 2: Since breaking stress is a material constant, breaking force is proportional to the square of the diameter: F_break ∝ d².\n\nStep 3: When the diameter is halved (from 4.0 mm to 2.0 mm), the breaking force becomes:\nF' = F / (2)² = F / 4 = (8.0 × 10⁴ N) / 4 = 2.0 × 10⁴ N.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 4659, // Q61
    similar_question: {
      question: "The breaking stress (ultimate tensile strength) of a uniform wire depends solely on:",
      option_a: "The material of the wire and its temperature",
      option_b: "The length of the wire",
      option_c: "The cross-sectional radius of the wire",
      option_d: "The shape of the cross-section",
      correct_option: "A",
      explanation: "Step 1: Breaking stress is defined as the maximum force per unit area that a material can withstand before rupture: σ_break = F_break / A.\n\nStep 2: It is an intrinsic property of the material dependent on interatomic bond strength, microstructure, and temperature.\n\nStep 3: It is completely independent of geometric dimensions like length, radius, or cross-sectional shape.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 4660, // Q62
    similar_question: {
      question: "A tensile force F is required to break a copper wire of radius R. What force is required to break another copper wire of radius 3R?",
      option_a: "9 F",
      option_b: "3 F",
      option_c: "6 F",
      option_d: "27 F",
      correct_option: "A",
      explanation: "Step 1: Breaking force is F_break = σ_break × A = σ_break × (π R²).\n\nStep 2: Breaking stress σ_break is constant for a given material.\n\nStep 3: Therefore, breaking force scales with R²: F_break ∝ R².\nFor radius 3R, the required breaking force is (3)² F = 9 F.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 4661, // Q63
    similar_question: {
      question: "When a load of 6.0 kg is suspended from a vertical steel wire, its length increases by 3.0 mm. Taking g = 9.8 m/s², what is the effective force constant (stiffness) of the wire?",
      option_a: "1.96 × 10⁴ N/m",
      option_b: "0.98 × 10⁴ N/m",
      option_c: "3.92 × 10⁴ N/m",
      option_d: "5.88 × 10⁴ N/m",
      correct_option: "A",
      explanation: "Step 1: Tensile force applied by the hanging mass is F = m g = 6.0 kg × 9.8 m/s² = 58.8 N.\n\nStep 2: Elongation produced is x = 3.0 mm = 3.0 × 10⁻³ m.\n\nStep 3: The effective force constant is:\nk = F / x = 58.8 N / (3.0 × 10⁻³ m) = 19.6 × 10³ N/m = 1.96 × 10⁴ N/m.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 4662, // Q64
    similar_question: {
      question: "A steel cable has Young's modulus Y = 2.0 × 10¹¹ N/m². If the cable ruptures at a breaking strain of 0.20, what is its breaking stress?",
      option_a: "4.0 × 10¹⁰ N/m²",
      option_b: "2.0 × 10¹⁰ N/m²",
      option_c: "1.0 × 10¹² N/m²",
      option_d: "4.0 × 10¹¹ N/m²",
      correct_option: "A",
      explanation: "Step 1: By definition of Hookean elasticity up to fracture, Stress = Y × Strain.\n\nStep 2: Breaking Stress = Y × Breaking Strain.\n\nStep 3: Substitute the given values:\nBreaking Stress = 2.0 × 10¹¹ N/m² × 0.20 = 4.0 × 10¹⁰ N/m².\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 4663, // Q65
    similar_question: {
      question: "A solid cube has its lower face rigidly cemented to the floor. When a uniform tangential force is applied across its top face parallel to the surface, the cube undergoes a change in its:",
      option_a: "Shape only, while its volume remains constant",
      option_b: "Volume only, while its shape remains constant",
      option_c: "Both shape and volume",
      option_d: "Neither shape nor volume",
      correct_option: "A",
      explanation: "Step 1: A tangential force applied parallel to a face produces shear stress.\n\nStep 2: Shear stress alters the angular orientation of the faces (changing right angles to oblique angles), altering the body's geometric shape.\n\nStep 3: Pure shear produces zero volumetric strain (ΔV = 0), so the volume remains strictly unchanged.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 4664, // Q66
    similar_question: {
      question: "Two wires A and B of identical dimensions are tested in tension. In the load (vertical axis) versus extension (horizontal axis) graph, the straight line for wire A has a steeper slope than that for wire B. What does this indicate about their Young's moduli Y_A and Y_B?",
      option_a: "Y_A > Y_B",
      option_b: "Y_A < Y_B",
      option_c: "Y_A = Y_B",
      option_d: "Y_A = 2 Y_B / 3",
      correct_option: "A",
      explanation: "Step 1: Load F and extension ΔL are related by F = (Y A / L) ΔL.\n\nStep 2: On a load versus extension graph, the slope is Slope = F / ΔL = Y A / L.\n\nStep 3: Since the dimensions (A and L) are identical for both wires, the slope is directly proportional to Young's modulus: Slope ∝ Y.\n\nStep 4: Because wire A has a steeper slope, it has a larger Young's modulus: Y_A > Y_B.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 4665, // Q67
    similar_question: {
      question: "When a material is subjected to heavy mechanical working (such as cold hammering or drawing) which closes micro-voids and slightly increases its density, its Young's modulus generally:",
      option_a: "Increases slightly",
      option_b: "Decreases to zero",
      option_c: "Remains strictly unaffected under all conditions",
      option_d: "Alternates unpredictably",
      correct_option: "A",
      explanation: "Step 1: Closing microscopic pores and increasing mass density brings atoms closer together and tightens atomic packing.\n\nStep 2: Closer atomic packing steepens the interatomic potential energy well, requiring greater deforming stress for a given strain.\n\nStep 3: Consequently, denser packing in a given material leads to a higher effective Young's modulus.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 4666, // Q68
    similar_question: {
      question: "A fixed volume V of copper is drawn into a wire of length L. When a constant stretching force F is applied, the elongation ΔL produced in the wire is proportional to:",
      option_a: "L²",
      option_b: "L",
      option_c: "1 / L",
      option_d: "1 / L²",
      correct_option: "A",
      explanation: "Step 1: The volume of the wire is V = A L, which gives cross-sectional area A = V / L.\n\nStep 2: Elongation under tensile force F is ΔL = F L / (A Y).\n\nStep 3: Substitute A = V / L into the elongation formula:\nΔL = F L / [ (V / L) Y ] = (F / (V Y)) L².\n\nStep 4: For constant force F, volume V, and material Y, the elongation is proportional to L²: ΔL ∝ L².\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 4667, // Q69
    similar_question: {
      question: "A wire of length L fixed at the ceiling elongates by ΔL when a weight W is suspended from its lower end. If the wire is passed over a frictionless light pulley and a weight W is hung at each of its two ends, what is the elongation of the wire?",
      option_a: "ΔL",
      option_b: "2 ΔL",
      option_c: "ΔL / 2",
      option_d: "Zero",
      correct_option: "A",
      explanation: "Step 1: In the first case, the tension in the wire throughout its length is T = W, giving elongation ΔL = W L / (A Y).\n\nStep 2: In the pulley arrangement with two hanging weights W, the tension in every segment of the wire remains T = W.\n\nStep 3: Since the total length of the wire is L and the tension is W everywhere, the total elongation remains ΔL.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 4668, // Q70
    similar_question: {
      question: "Young's modulus of a given solid substance is primarily dependent on:",
      option_a: "Temperature and the nature of the material",
      option_b: "The magnitude of the applied deforming stress",
      option_c: "The cross-sectional area and length of the specimen",
      option_d: "The shape of the cross-section",
      correct_option: "A",
      explanation: "Step 1: Young's modulus is an intrinsic, intensive physical constant of a material determined by interatomic bond stiffness.\n\nStep 2: It is independent of geometry (length, cross-sectional area, shape) and applied stress.\n\nStep 3: It varies with temperature (decreasing as temperature increases) and chemical composition.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 4669, // Q71
    similar_question: {
      question: "Stress-strain curves for materials A and B are plotted to the same scale. The curve for material A has a larger initial slope and a long plastic region between the yield point and breaking point, whereas material B has a shorter plastic region. Which statement is correct?",
      option_a: "Material A has a higher Young's modulus and is more ductile than material B",
      option_b: "Material B has a higher Young's modulus than material A",
      option_c: "Material A is brittle while material B is ductile",
      option_d: "Both materials have the same elasticity and ductility",
      correct_option: "A",
      explanation: "Step 1: Young's modulus equals the initial slope (Stress / Strain). Since material A has a larger slope, Y_A > Y_B.\n\nStep 2: Ductility is measured by the extent of plastic deformation between the yield point and fracture. A wide plastic region characterizes a ductile material.\n\nStep 3: Hence, material A has greater Young's modulus and is more ductile.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 4670, // Q72
    similar_question: {
      question: "A steel wire of length 1.0 m and cross-sectional area 1.0 mm² requires a tensile force of 200 N to stretch by 1.0 mm. What force is required to stretch another wire of the same steel, having the same diameter but a natural length of 5.0 m, by an amount of 5.0 mm?",
      option_a: "200 N",
      option_b: "1000 N",
      option_c: "400 N",
      option_d: "100 N",
      correct_option: "A",
      explanation: "Step 1: Elongation is related to force by F = (Y A / L) ΔL = Y A (ΔL / L).\n\nStep 2: The strain in the first wire is Strain₁ = 1.0 mm / 1.0 m = 1.0 × 10⁻³.\n\nStep 3: The strain in the second wire is Strain₂ = 5.0 mm / 5.0 m = 1.0 × 10⁻³.\n\nStep 4: Since both wires have identical strain, cross-sectional area, and material (Y), the required force is identical: F₂ = F₁ = 200 N.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 4671, // Q73
    similar_question: {
      question: "A wire of diameter 2.0 mm is subjected to a tensile force of 50 kg·wt. If Young's modulus of the wire material is 1.0 × 10¹¹ N/m² and g = 9.8 m/s², what is the percentage increase in the length of the wire?",
      option_a: "0.156%",
      option_b: "0.312%",
      option_c: "0.078%",
      option_d: "0.500%",
      correct_option: "A",
      explanation: "Step 1: Tensile force F = 50 kg × 9.8 m/s² = 490 N.\nRadius r = d / 2 = 1.0 mm = 1.0 × 10⁻³ m.\nCross-sectional area A = π r² = π (1.0 × 10⁻³)² = π × 10⁻⁶ m² ≈ 3.1416 × 10⁻⁶ m².\n\nStep 2: Longitudinal strain is:\nStrain = F / (A Y) = 490 / (3.1416 × 10⁻⁶ × 1.0 × 10¹¹) = 490 / (3.1416 × 10⁵) = 1.56 × 10⁻³.\n\nStep 3: Percentage increase in length:\n% increase = Strain × 100% = 1.56 × 10⁻³ × 100% ≈ 0.156%.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 4672, // Q74
    similar_question: {
      question: "Two wires of identical dimensions, one of steel and one of copper, are connected in series and subjected to a common tensile force. The total elongation produced is 3.2 cm. If Y_steel = 2.0 × 10¹¹ N/m² and Y_copper = 1.2 × 10¹¹ N/m², what are the individual elongations of the steel and copper wires respectively?",
      option_a: "1.2 cm for steel, 2.0 cm for copper",
      option_b: "2.0 cm for steel, 1.2 cm for copper",
      option_c: "1.6 cm for steel, 1.6 cm for copper",
      option_d: "0.8 cm for steel, 2.4 cm for copper",
      correct_option: "A",
      explanation: "Step 1: For wires of equal length and area under the same tension F, elongation is inversely proportional to Young's modulus: ΔL ∝ 1 / Y.\n\nStep 2: Ratio of elongations:\nΔL_steel / ΔL_copper = Y_copper / Y_steel = (1.2 × 10¹¹) / (2.0 × 10¹¹) = 1.2 / 2.0 = 3 / 5.\n\nStep 3: Let ΔL_steel = 3x and ΔL_copper = 5x.\nTotal elongation: 3x + 5x = 8x = 3.2 cm  →  x = 0.4 cm.\n\nStep 4: Compute individual elongations:\nΔL_steel = 3 × 0.4 cm = 1.2 cm.\nΔL_copper = 5 × 0.4 cm = 2.0 cm.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 4673, // Q75
    similar_question: {
      question: "For an elastomer such as vulcanized rubber or the tissue of the aorta, the stress-strain curve is characterized by:",
      option_a: "A non-linear relationship over large strains without a well-defined plastic yield region",
      option_b: "A perfectly linear relationship obeying Hooke's law up to fracture",
      option_c: "A very sharp yield point followed by large plastic necking",
      option_d: "A negative slope everywhere from the origin",
      correct_option: "A",
      explanation: "Step 1: Elastomers can undergo extremely large elastic strains (often several hundred percent) and return to their original shape.\n\nStep 2: However, their stress-strain curve does not obey Hooke's law; it is distinctly non-linear and exhibits elastic hysteresis.\n\nStep 3: They lack a pronounced plastic yield region and do not obey a simple linear proportional modulus.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 4674, // Q76
    similar_question: {
      question: "A brass rod has a diameter of 2.0 mm and Young's modulus Y = 9.0 × 10¹⁰ N/m². What tensile force is required to produce an elongation of 0.2% in the rod?",
      option_a: "565.5 N",
      option_b: "282.7 N",
      option_c: "1131 N",
      option_d: "180 N",
      correct_option: "A",
      explanation: "Step 1: Radius r = d / 2 = 1.0 mm = 1.0 × 10⁻³ m.\nArea A = π r² = π (1.0 × 10⁻³)² = π × 10⁻⁶ m².\n\nStep 2: Strain is 0.2% = 0.002 = 2.0 × 10⁻³.\n\nStep 3: By Hooke's law, Stress = Y × Strain = 9.0 × 10¹⁰ × 2.0 × 10⁻³ = 1.8 × 10⁸ N/m².\n\nStep 4: Required tensile force is:\nF = Stress × A = 1.8 × 10⁸ N/m² × (π × 10⁻⁶ m²) = 180 π ≈ 565.5 N.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 4675, // Q77
    similar_question: {
      question: "Materials that fracture immediately after passing their elastic limit with little to no plastic deformation are called:",
      option_a: "Brittle materials",
      option_b: "Ductile materials",
      option_c: "Malleable materials",
      option_d: "Elastomers",
      correct_option: "A",
      explanation: "Step 1: Brittle materials (like cast iron, glass, and ceramics) have almost no plastic range on their stress-strain curve.\n\nStep 2: When the applied tensile stress exceeds the elastic limit, catastrophic fracture occurs abruptly without significant necking.\n\nStep 3: Hence, substances with negligible plastic regions are brittle.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 4676, // Q78
    similar_question: {
      question: "Which of the following pairs correctly relates an elastic property to its physical definition?",
      option_a: "Compressibility — Reciprocal of Bulk modulus",
      option_b: "Longitudinal strain — Change in volume per unit original volume",
      option_c: "Shear strain — Change in length per unit original length",
      option_d: "Bulk modulus — Ratio of shearing stress to shear strain",
      correct_option: "A",
      explanation: "Step 1: Compressibility k is defined as the fractional change in volume per unit increase in pressure: k = 1 / B.\n\nStep 2: Therefore, compressibility is mathematically and physically the exact reciprocal of the bulk modulus.\n\nStep 3: All other listed pairings mismatch the strain types and moduli.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 4677, // Q79
    similar_question: {
      question: "Two wires A and B of the same material have lengths in the ratio 1 : 3 and diameters in the ratio 3 : 1. When stretched by the same tensile force, what is the ratio of the extension of wire A to that of wire B?",
      option_a: "1 : 27",
      option_b: "1 : 9",
      option_c: "3 : 1",
      option_d: "27 : 1",
      correct_option: "A",
      explanation: "Step 1: Extension is ΔL = 4 F L / (π d² Y) ∝ L / d² (for same force F and material Y).\n\nStep 2: Ratio of extensions:\nΔL_A / ΔL_B = (L_A / L_B) × (d_B / d_A)².\n\nStep 3: Given L_A / L_B = 1 / 3 and d_A / d_B = 3 / 1 (so d_B / d_A = 1 / 3):\nΔL_A / ΔL_B = (1 / 3) × (1 / 3)² = (1 / 3) × (1 / 9) = 1 / 27 = 1 : 27.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 4678, // Q80
    similar_question: {
      question: "A copper wire of length 3.0 m and cross-sectional area 1.5 cm² is stretched by a force of 6.0 × 10³ N. If Young's modulus of copper is 1.2 × 10¹¹ N/m², what is the increase in the length of the wire?",
      option_a: "1.0 mm",
      option_b: "0.5 mm",
      option_c: "2.0 mm",
      option_d: "1.5 mm",
      correct_option: "A",
      explanation: "Step 1: Convert units:\nL = 3.0 m\nA = 1.5 cm² = 1.5 × 10⁻⁴ m²\nF = 6.0 × 10³ N\nY = 1.2 × 10¹¹ N/m².\n\nStep 2: Compute elongation:\nΔL = F L / (A Y) = (6.0 × 10³ × 3.0) / (1.5 × 10⁻⁴ × 1.2 × 10¹¹).\n\nStep 3: Evaluate:\nNumerator = 1.8 × 10⁴\nDenominator = 1.8 × 10⁷\nΔL = 1.8 × 10⁴ / 1.8 × 10⁷ = 1.0 × 10⁻³ m = 1.0 mm.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 4679, // Q81
    similar_question: {
      question: "According to Hooke's law for a linear elastic spring or wire, the restoring force is directly proportional to:",
      option_a: "Displacement (extension or compression) from equilibrium",
      option_b: "Square of the displacement",
      option_c: "Square root of the displacement",
      option_d: "Rate of change of displacement",
      correct_option: "A",
      explanation: "Step 1: Hooke's law states that within the elastic limit, the magnitude of the restoring force is directly proportional to the displacement x from equilibrium.\n\nStep 2: Mathematically, F_restoring = − k x, so |F| ∝ x.\n\nStep 3: Thus, force varies linearly with extension or compression.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 4680, // Q82
    similar_question: {
      question: "In animal breeding, interspecific hybridization involves crossing individuals of two different related species. Which of the following is a classic example of interspecific hybridization?",
      option_a: "Mule (cross between a male donkey and a female horse)",
      option_b: "Hisardale (cross between Bikaneri ewes and Merino rams)",
      option_c: "Jersey cow",
      option_d: "Leghorn chicken",
      correct_option: "A",
      explanation: "Step 1: Interspecific hybridization is the mating of animals of two different species within the same genus.\n\nStep 2: A mule is produced by breeding a male donkey (Equus asinus) and a female horse (Equus caballus).\n\nStep 3: In contrast, Hisardale is a new sheep breed developed by outcrossing/cross-breeding within the same species.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 4681, // Q83
    similar_question: {
      question: "A steel wire and an aluminum wire of the same initial length and cross-sectional area are stretched by the same load. If Y_steel = 2.1 × 10¹¹ N/m² and Y_aluminum = 7.0 × 10¹⁰ N/m², what is the ratio of elongation of the steel wire to that of the aluminum wire?",
      option_a: "1 : 3",
      option_b: "3 : 1",
      option_c: "1 : 9",
      option_d: "1 : 1",
      correct_option: "A",
      explanation: "Step 1: Elongation is ΔL = F L / (A Y).\n\nStep 2: Since F, L, and A are the same for both wires, elongation is inversely proportional to Young's modulus: ΔL ∝ 1 / Y.\n\nStep 3: Ratio of elongations:\nΔL_steel / ΔL_aluminum = Y_aluminum / Y_steel = (7.0 × 10¹⁰) / (2.1 × 10¹¹) = 1 / 3 = 1 : 3.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 4682, // Q84
    similar_question: {
      question: "A wire of Young's modulus Y is stretched by a load. To decrease the value of Young's modulus of the wire, one should:",
      option_a: "Increase the temperature of the wire",
      option_b: "Increase the length of the wire",
      option_c: "Decrease the radius of the wire",
      option_d: "Increase the suspended load",
      correct_option: "A",
      explanation: "Step 1: Young's modulus Y is an intrinsic material property that does not depend on dimensions (length, radius) or the suspended load.\n\nStep 2: Increasing the temperature enhances thermal vibrations, expanding the lattice and weakening interatomic restoring forces.\n\nStep 3: This causes Young's modulus to decrease.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 4683, // Q85
    similar_question: {
      question: "On a stress-strain diagram for a metallic wire, Hooke's law is valid strictly in the region:",
      option_a: "Between the origin and the proportional limit",
      option_b: "Between the proportional limit and the yield point",
      option_c: "Between the yield point and the ultimate tensile strength",
      option_d: "Throughout the entire plastic deformation region",
      correct_option: "A",
      explanation: "Step 1: Hooke's law specifies a linear relationship between stress and strain.\n\nStep 2: The stress-strain graph is a straight line only from the origin up to the proportional limit.\n\nStep 3: Beyond this point, the curve bends and Hooke's law no longer holds.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 4684, // Q86
    similar_question: {
      question: "On a strain versus stress plot for three materials P, Q, and R, the line for material P has the smallest slope with the stress axis (i.e. smallest strain for a given stress). This implies that:",
      option_a: "Material P has the largest Young's modulus",
      option_b: "Material P is the most ductile",
      option_c: "Material P has the smallest elasticity",
      option_d: "Material P is an elastomer",
      correct_option: "A",
      explanation: "Step 1: Young's modulus is Y = Stress / Strain.\n\nStep 2: If a material produces the smallest strain for a given stress, the ratio Stress / Strain is highest.\n\nStep 3: Therefore, material P has the maximum Young's modulus among the three.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 4685, // Q87
    similar_question: {
      question: "Stress versus strain graphs for two materials A and B are straight lines making angles of 45° and 30° respectively with the strain axis. What is the relation between their Young's moduli Y_A and Y_B?",
      option_a: "Y_A = √3 Y_B",
      option_b: "Y_B = √3 Y_A",
      option_c: "Y_A = 3 Y_B",
      option_d: "Y_A = Y_B",
      correct_option: "A",
      explanation: "Step 1: Young's modulus equals the slope of the stress versus strain line: Y = tan θ.\n\nStep 2: Y_A = tan 45° = 1.\nY_B = tan 30° = 1 / √3.\n\nStep 3: Therefore:\nY_A / Y_B = 1 / (1 / √3) = √3  →  Y_A = √3 Y_B.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 4686, // Q88
    similar_question: {
      question: "In a load (F) versus elongation (ΔL) graph for four wires of the same material and same length, the wire with the largest diameter is represented by the line with:",
      option_a: "The maximum slope (steepest line)",
      option_b: "The minimum slope",
      option_c: "A slope of zero",
      option_d: "An exponential curve",
      correct_option: "A",
      explanation: "Step 1: Load and elongation are related by F = (Y A / L) ΔL.\n\nStep 2: The slope of the F versus ΔL graph is Slope = Y A / L = Y (π d² / 4) / L.\n\nStep 3: Since Y and L are identical for all four wires, the slope is directly proportional to d² (the square of diameter).\n\nStep 4: The thickest wire (largest d) will have the largest slope (steepest line).\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 4687, // Q89
    similar_question: {
      question: "Why is the shear modulus (modulus of rigidity) of an ideal static liquid identically equal to zero?",
      option_a: "Because a static liquid cannot support any shear stress and flows under tangential force",
      option_b: "Because a liquid is completely incompressible",
      option_c: "Because surface tension counteracts shear",
      option_d: "Because liquid molecules are non-polar",
      correct_option: "A",
      explanation: "Step 1: Modulus of rigidity is defined as Shearing Stress / Shear Strain.\n\nStep 2: Liquids lack fixed relative atomic positions and cannot sustain static shearing stresses; they flow when any tangential force is applied.\n\nStep 3: Since the static shearing stress is zero, the modulus of rigidity of any static liquid is zero.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 4688, // Q90
    similar_question: {
      question: "When a shearing stress is applied to an elastic solid, it causes a change in the body's:",
      option_a: "Shape without changing its volume",
      option_b: "Volume without changing its shape",
      option_c: "Both shape and volume",
      option_d: "Mass and density",
      correct_option: "A",
      explanation: "Step 1: Shearing stress acts tangentially along the surface of a body.\n\nStep 2: It slides parallel layers relative to one another, changing the angles of the faces and thus modifying the geometric shape.\n\nStep 3: However, the volume and cross-sectional area of layers remain unchanged during pure shear.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 4689, // Q91
    similar_question: {
      question: "When an elastic material is deformed within its elastic limit, the work done by the external deforming force is converted into:",
      option_a: "Elastic potential energy of the deformed lattice, increasing internal energy",
      option_b: "Kinetic energy of overall translation",
      option_c: "Thermal radiation completely lost to the surroundings",
      option_d: "Zero energy change",
      correct_option: "A",
      explanation: "Step 1: Deforming an elastic solid alters interatomic separations from their equilibrium values.\n\nStep 2: Work done against internal interatomic restoring forces is stored as elastic strain potential energy in the lattice.\n\nStep 3: This increases the internal mechanical energy of the body, which is fully recovered upon releasing the load.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 4690, // Q92
    similar_question: {
      question: "A copper wire has a breaking stress of 2.2 × 10⁸ N/m² and a density of 8.8 × 10³ kg/m³. What is the maximum length of this wire that can hang freely under gravity without breaking? (Take g = 10 m/s²)",
      option_a: "2.5 × 10³ m",
      option_b: "5.0 × 10³ m",
      option_c: "1.25 × 10³ m",
      option_d: "2.5 × 10⁴ m",
      correct_option: "A",
      explanation: "Step 1: The maximum stress at the top of a vertically hanging wire of length L is σ_max = L ρ g.\n\nStep 2: For the wire not to snap, L_max = Breaking Stress / (ρ g).\n\nStep 3: Substitute the given numbers:\nL_max = (2.2 × 10⁸ N/m²) / (8.8 × 10³ kg/m³ × 10 m/s²) = (2.2 × 10⁸) / (8.8 × 10⁴) = 2.5 × 10³ m.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 4691, // Q93
    similar_question: {
      question: "A steel cable of diameter 10 mm has a breaking strength of 5.0 × 10⁵ N. What is the breaking force for another cable of the same steel having a diameter of 6.0 mm?",
      option_a: "1.8 × 10⁵ N",
      option_b: "3.0 × 10⁵ N",
      option_c: "2.5 × 10⁵ N",
      option_d: "1.2 × 10⁵ N",
      correct_option: "A",
      explanation: "Step 1: Breaking force is proportional to the cross-sectional area: F_break ∝ d².\n\nStep 2: Ratio of breaking forces:\nF₂ / F₁ = (d₂ / d₁)² = (6.0 mm / 10 mm)² = (0.6)² = 0.36.\n\nStep 3: Compute F₂:\nF₂ = 0.36 × (5.0 × 10⁵ N) = 1.8 × 10⁵ N.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 4692, // Q94
    similar_question: {
      question: "Which of the following physical factors does the breaking stress of a material depend upon?",
      option_a: "Nature of the material and temperature",
      option_b: "Length of the specimen",
      option_c: "Cross-sectional radius of the specimen",
      option_d: "Shape of the cross-section",
      correct_option: "A",
      explanation: "Step 1: Breaking stress is an intensive property defined as the maximum stress a material can withstand before fracture.\n\nStep 2: It is independent of specimen dimensions (length, area, shape).\n\nStep 3: It depends only on the material composition, crystal structure, and temperature.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 4693, // Q95
    similar_question: {
      question: "A force F is required to break a copper wire of radius r. What minimum force is needed to break a copper wire of radius 4r?",
      option_a: "16 F",
      option_b: "4 F",
      option_c: "8 F",
      option_d: "64 F",
      correct_option: "A",
      explanation: "Step 1: Breaking force is F_break = σ_break × A = σ_break × π r².\n\nStep 2: Breaking stress σ_break is constant for copper.\n\nStep 3: Thus, F_break ∝ r². For radius 4r, the required force is (4)² F = 16 F.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 4694, // Q96
    similar_question: {
      question: "When a mass of 12 kg is suspended from a vertical wire, its extension is 6.0 mm. Taking g = 9.8 m/s², what is the effective spring constant (force constant) of the wire?",
      option_a: "1.96 × 10⁴ N/m",
      option_b: "0.98 × 10⁴ N/m",
      option_c: "3.92 × 10⁴ N/m",
      option_d: "2.45 × 10⁴ N/m",
      correct_option: "A",
      explanation: "Step 1: Applied load force is F = m g = 12 kg × 9.8 m/s² = 117.6 N.\n\nStep 2: Extension produced is x = 6.0 mm = 6.0 × 10⁻³ m.\n\nStep 3: Effective force constant is:\nk = F / x = 117.6 N / (6.0 × 10⁻³ m) = 19.6 × 10³ N/m = 1.96 × 10⁴ N/m.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 4695, // Q97
    similar_question: {
      question: "A structural steel wire has Young's modulus Y = 2.0 × 10¹¹ N/m². If the wire ruptures at an ultimate strain of 0.18, what is its ultimate breaking stress?",
      option_a: "3.6 × 10¹⁰ N/m²",
      option_b: "1.8 × 10¹⁰ N/m²",
      option_c: "3.6 × 10¹¹ N/m²",
      option_d: "1.11 × 10¹² N/m²",
      correct_option: "A",
      explanation: "Step 1: Breaking stress is calculated from Hooke's relation up to failure: Breaking Stress = Y × Breaking Strain.\n\nStep 2: Given Y = 2.0 × 10¹¹ N/m² and Breaking Strain = 0.18:\nBreaking Stress = 2.0 × 10¹¹ × 0.18 = 0.36 × 10¹¹ = 3.6 × 10¹⁰ N/m².\n\nTherefore, Option (A) is the correct answer."
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

    console.log(`Starting update of Set 10 Part 2 (${set10Part2Updates.length} questions)...`);
    let successCount = 0;
    for (const item of set10Part2Updates) {
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
        console.log(`[${successCount}/${set10Part2Updates.length}] Updated Question ID ${item.id}: SUCCESS`);
      } else {
        console.error(`Failed Question ID ${item.id}:`, data);
      }
    }
    console.log(`Set 10 Part 2 complete: ${successCount} questions committed.`);
  } catch (err) {
    console.error('Update failed:', err);
  }
}

updatePart2();
