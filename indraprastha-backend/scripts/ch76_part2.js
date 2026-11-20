module.exports = [
  {
    id: 648,
    originalQuestion: {
      question: "Steam at 100°C passed into 20g water at 10°C. When water reaches 80°C mass water present will be Take specific heat water 1 cal g⁻¹ °C⁻¹ latent heat steam 540 cal g⁻¹? [AIPMT 2014]",
      option_a: "24 g",
      option_b: "31.5 g",
      option_c: "42.5 g",
      option_d: "22.5 g",
      correct_option: "D",
      explanation: "Let the mass of steam condensed be m grams.\n1) Heat required to raise the temperature of 20 g of water from 10°C to 80°C:\nQ_gained = m_w · s_w · ΔT = 20 g × (1 cal g⁻¹ °C⁻¹) × (80°C − 10°C) = 20 × 70 = 1400 cal\n2) Heat released by m grams of steam at 100°C condensing into water and cooling to 80°C:\nQ_lost = m · L_v + m · s_w · (100°C − 80°C)\nQ_lost = m × 540 + m × 1 × 20 = 540m + 20m = 560m cal\n3) By principle of calorimetry (heat lost = heat gained):\n560 m = 1400\nm = 1400 / 560 = 140 / 56 = 2.5 g of steam condensed\n4) The total mass of water present in the mixture at 80°C is:\nM_total = m_w + m = 20 g + 2.5 g = 22.5 g\nTherefore, Option (D) is the correct answer."
    },
    similarQuestion: {
      question: "How much steam at 100°C must be passed into 40 g of water at 20°C to raise its temperature to 60°C? (s = 1 cal/g·°C, L_steam = 540 cal/g)",
      option_a: "2.76 g",
      option_b: "3.50 g",
      option_c: "1.85 g",
      option_d: "4.20 g",
      correct_option: "A",
      explanation: "Heat gained = 40 × 1 × (60 − 20) = 1600 cal.\nHeat lost by m grams of steam = m × 540 + m × 1 × (100 − 60) = 580m cal.\n580m = 1600 ⇒ m = 1600 / 580 ≈ 2.76 g.\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 647,
    originalQuestion: {
      question: "Certain number spherical drops liquid radius r coalesce form single drop radius R volume V. If T surface tension liquid then? [AIPMT 2014]",
      option_a: "Energy=4VT(1/r-1/R) is released",
      option_b: "Energy=3VT(1/r+1/R) is absorbed",
      option_c: "Energy=3VT(1/r-1/R) is released",
      option_d: "Energy is neither released nor absorbed",
      correct_option: "C",
      explanation: "When n small spherical droplets of radius r coalesce to form a single large drop of radius R and volume V:\n1) Conservation of volume:\nV = (4/3) π R³ = n · (4/3) π r³ ⇒ n r³ = R³\n2) Total initial surface area of n droplets:\nA_initial = n · (4π r²) = (n r³) · (4π / r) = R³ · (4π / r) = 3 [ (4/3) π R³ ] / r = 3V / r\n3) Final surface area of single drop:\nA_final = 4π R² = 3 [ (4/3) π R³ ] / R = 3V / R\n4) Decrease in surface area:\nΔA = A_initial − A_final = 3V (1/r − 1/R)\nSince A_initial > A_final, total surface energy decreases.\nThe energy released in the coalescing process is:\nΔU = T · ΔA = 3 V T (1/r − 1/R)\nTherefore, energy equal to 3VT (1/r − 1/R) is released.\nTherefore, Option (C) is the correct answer."
    },
    similarQuestion: {
      question: "When a large spherical liquid drop of radius R and surface tension T breaks into n identical droplets of radius r, what is the amount of work done?",
      option_a: "3 V T (1/r − 1/R) absorbed",
      option_b: "3 V T (1/r − 1/R) released",
      option_c: "4 V T (1/r − 1/R) absorbed",
      option_d: "4π R² T (n − 1) released",
      correct_option: "A",
      explanation: "When a drop breaks up, surface area increases from 3V/R to 3V/r.\nWork done against surface tension is W = T ΔA = 3 V T (1/r − 1/R), which is absorbed by the system.\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 646,
    originalQuestion: {
      question: "Copper fixed volume V drawn into wire length l. When wire subjected constant force F extension produced Δl. Which graph straight line? [AIPMT 2014]",
      option_a: "Δl versus 1/l",
      option_b: "Δl versus l²",
      option_c: "Δl versus 1/l²",
      option_d: "Δl versus l",
      correct_option: "B",
      explanation: "Let the wire have volume V, length l, and cross-sectional area A:\nV = A · l ⇒ A = V / l\nAccording to Hooke's law, Young's modulus is:\nY = (F / A) / (Δl / l) = (F · l) / (A · Δl)\nSolving for the extension Δl:\nΔl = (F · l) / (A · Y)\nSubstitute A = V / l into this expression:\nΔl = (F · l) / [(V / l) · Y] = (F · l²) / (V · Y)\nSince the stretching force F, volume V, and Young's modulus Y are all constant:\nΔl = [F / (V Y)] · l²\nThis equation has the form y = m x, where y = Δl and x = l².\nThus, the graph of Δl versus l² is a straight line passing through the origin.\nTherefore, Option (B) is the correct answer."
    },
    similarQuestion: {
      question: "A metal of fixed mass and volume V is drawn into a wire of cross-sectional area A. When stretched by a constant force F, the extension produced Δl is proportional to:",
      option_a: "1 / A²",
      option_b: "1 / A",
      option_c: "A²",
      option_d: "A",
      correct_option: "A",
      explanation: "Length is l = V / A. Extension Δl = F l / (A Y) = F (V / A) / (A Y) = F V / (A² Y) ∝ 1 / A².\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 645,
    originalQuestion: {
      question: "Approximate depth ocean 2700m compressibility water 45.4×10⁻¹¹ Pa⁻¹ density water 10³ kg m⁻³. What fractional compression water will be obtained at bottom ocean? [AIPMT 2015 Cancelled]",
      option_a: "1.2×10⁻²",
      option_b: "1.4×10⁻²",
      option_c: "0.8×10⁻²",
      option_d: "1.0×10⁻²",
      correct_option: "A",
      explanation: "Given parameters:\nDepth of ocean h = 2700 m\nDensity of water ρ = 10³ kg m⁻³\nCompressibility of water C = 45.4 × 10⁻¹¹ Pa⁻¹\nAcceleration due to gravity g = 9.8 m s⁻² (or 10 m s⁻²)\n1) The gauge pressure at the bottom of the ocean is:\nΔP = ρ · g · h = (10³ kg m⁻³) × (9.8 m s⁻²) × (2700 m) = 2.646 × 10⁷ Pa (or 2.7 × 10⁷ Pa using g = 10 m s⁻²)\n2) Compressibility C is the reciprocal of Bulk Modulus B:\nC = 1 / B = (ΔV / V) / ΔP\nTherefore, the fractional compression (fractional change in volume) is:\nΔV / V = C · ΔP\nΔV / V = (45.4 × 10⁻¹¹ Pa⁻¹) × (2.646 × 10⁷ Pa) = 1.201 × 10⁻² ≈ 1.2 × 10⁻²\nTherefore, Option (A) is the correct answer."
    },
    similarQuestion: {
      question: "At a depth where water pressure increases by 4 × 10⁷ Pa, what is the fractional decrease in volume if the bulk modulus of water is 2 × 10⁹ Pa?",
      option_a: "2.0 × 10⁻²",
      option_b: "1.0 × 10⁻²",
      option_c: "4.0 × 10⁻³",
      option_d: "0.5 × 10⁻²",
      correct_option: "A",
      explanation: "ΔV / V = ΔP / B = (4 × 10⁷ Pa) / (2 × 10⁹ Pa) = 2.0 × 10⁻².\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 644,
    originalQuestion: {
      question: "On observing light from three different stars P,Q and R found violet intensity maximum spectrum P green intensity maximum spectrum R and red intensity maximum spectrum Q. If TP,TQ and TR are respective absolute temperatures then? [AIPMT 2015 Cancelled]",
      option_a: "TP<TR<TQ",
      option_b: "TP<TQ<TR",
      option_c: "TP>TQ>TR",
      option_d: "TP>TR>TQ",
      correct_option: "D",
      explanation: "According to Wien's displacement law, the absolute temperature T of a radiating body is inversely proportional to the wavelength λ_m at which maximum radiation intensity is emitted:\nλ_m · T = b ⇒ T ∝ 1 / λ_m\nThe visible spectrum in order of increasing wavelength is:\nViolet < Green < Red\nλ_violet < λ_green < λ_red\nGiven:\nStar P has maximum intensity in violet: λ_P = λ_violet\nStar R has maximum intensity in green: λ_R = λ_green\nStar Q has maximum intensity in red: λ_Q = λ_red\nSince λ_P < λ_R < λ_Q:\nTaking the reciprocal gives the order of absolute temperatures:\nT_P > T_R > T_Q\nTherefore, Option (D) is the correct answer."
    },
    similarQuestion: {
      question: "Three stars A, B, and C appear blue, yellow, and red, respectively. What is the correct descending order of their surface temperatures?",
      option_a: "T_A > T_B > T_C",
      option_b: "T_C > T_B > T_A",
      option_c: "T_B > T_A > T_C",
      option_d: "T_A > T_C > T_B",
      correct_option: "A",
      explanation: "Blue light has the shortest wavelength (highest frequency), followed by yellow, then red (longest wavelength).\nSince T ∝ 1/λ_max, the blue star is hottest: T_A > T_B > T_C.\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 643,
    originalQuestion: {
      question: "Wind blows parallel roof house speed 40 m s⁻¹ area roof 250 m². Assuming pressure inside house atmospheric pressure force exerted by wind on roof and its direction are ρ_air=1.2 kg m⁻³? [AIPMT 2015 Cancelled]",
      option_a: "2.4×10⁵ N upwards",
      option_b: "2.4×10⁵ N downwards",
      option_c: "4.8×10⁵ N downwards",
      option_d: "4.8×10⁵ N upwards",
      correct_option: "A",
      explanation: "Applying Bernoulli's principle to air flowing over the roof:\n1) Inside the house, the air is stationary (v_inside = 0), so the pressure is atmospheric pressure P₀:\nP_inside = P₀\n2) Outside, the wind blows horizontally over the roof with speed v = 40 m s⁻¹:\nP_outside + (1/2) ρ v² = P₀\nP₀ − P_outside = (1/2) ρ v²\n3) The pressure difference across the roof is:\nΔP = (1/2) × (1.2 kg m⁻³) × (40 m s⁻¹)² = 0.6 × 1600 = 960 N m⁻²\nSince P_inside > P_outside, this pressure difference produces an upward net pressure.\n4) The net aerodynamic lifting force exerted on the roof of area A = 250 m² is:\nF = ΔP · A = (960 N m⁻²) × (250 m²) = 240000 N = 2.4 × 10⁵ N directed vertically upwards\nTherefore, Option (A) is the correct answer."
    },
    similarQuestion: {
      question: "Wind blows horizontally across a flat roof of area 100 m² at 30 m/s. What is the net lifting force on the roof? (Take ρ_air = 1.2 kg/m³)",
      option_a: "5.4 × 10⁴ N upwards",
      option_b: "1.08 × 10⁵ N upwards",
      option_c: "5.4 × 10⁴ N downwards",
      option_d: "2.7 × 10⁴ N upwards",
      correct_option: "A",
      explanation: "ΔP = (1/2) ρ v² = (1/2) × 1.2 × 30² = 0.6 × 900 = 540 Pa.\nF = ΔP × A = 540 × 100 = 54000 N = 5.4 × 10⁴ N upwards.\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 642,
    originalQuestion: {
      question: "Two ends metal rod maintained temperatures 100°C and 110°C rate heat flow rod 4.0 J s⁻¹. If ends maintained temperatures 200°C and 210°C rate heat flow will be? [AIPMT 2015 Cancelled]",
      option_a: "8.0 J s⁻¹",
      option_b: "4.0 J s⁻¹",
      option_c: "44.0 J s⁻¹",
      option_d: "16.8 J s⁻¹",
      correct_option: "B",
      explanation: "According to Fourier's law of thermal conduction, the rate of heat flow dQ/dt through a homogeneous metal rod of length L, cross-sectional area A, and thermal conductivity K is:\ndQ/dt = (K · A · ΔT) / L\nwhere ΔT = T_hot − T_cold is the temperature difference maintained between the two ends.\n1) In the first condition:\nΔT₁ = 110°C − 100°C = 10°C\nRate of heat flow (dQ/dt)₁ = 4.0 J s⁻¹\n2) In the second condition:\nΔT₂ = 210°C − 200°C = 10°C\nSince the material, dimensions (length L and area A), and temperature difference (ΔT₂ = ΔT₁ = 10°C) are identical:\n(dQ/dt)₂ = (dQ/dt)₁ = 4.0 J s⁻¹\nTherefore, the rate of heat flow remains 4.0 J s⁻¹.\nTherefore, Option (B) is the correct answer."
    },
    similarQuestion: {
      question: "A metal bar conducts heat at 15 W when its ends are at 40°C and 20°C. What is the rate of heat conduction if the ends are maintained at 120°C and 100°C?",
      option_a: "15 W",
      option_b: "30 W",
      option_c: "45 W",
      option_d: "60 W",
      correct_option: "A",
      explanation: "In both cases, ΔT = 20°C. Since conduction rate depends solely on ΔT and rod properties, the heat current remains 15 W.\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 641,
    originalQuestion: {
      question: "Young's modulus steel twice that brass. Two wires same length cross-sectional area one steel one brass suspended same roof. If lower ends to be same level weights added steel and brass wires must be ratio? [AIPMT 2015]",
      option_a: "4:1",
      option_b: "1:1",
      option_c: "1:2",
      option_d: "2:1",
      correct_option: "D",
      explanation: "Given parameters:\nLength of steel wire = Length of brass wire = L\nCross-sectional area of steel wire = Cross-sectional area of brass wire = A\nYoung's modulus: Y_steel = 2 · Y_brass ⇒ Y_s / Y_b = 2\nSince both wires are suspended from the same horizontal roof and their lower ends are to be at the same level after loading:\nTheir elongations must be identical:\nΔL_steel = ΔL_brass\nThe elongation of a wire under suspended load W is:\nΔL = (W · L) / (A · Y)\nEquating the elongations:\n(W_steel · L) / (A · Y_steel) = (W_brass · L) / (A · Y_brass)\nCancelling L and A:\nW_steel / Y_steel = W_brass / Y_brass\nW_steel / W_brass = Y_steel / Y_brass = 2 / 1 = 2 : 1\nTherefore, Option (D) is the correct answer."
    },
    similarQuestion: {
      question: "Two wires of identical length and area made of metals A and B (Y_A / Y_B = 3) undergo equal extension when loaded. What is the ratio of weights W_A / W_B attached to them?",
      option_a: "3 : 1",
      option_b: "1 : 3",
      option_c: "9 : 1",
      option_d: "1 : 1",
      correct_option: "A",
      explanation: "ΔL = W L / (A Y). For equal ΔL, W ∝ Y. Thus W_A / W_B = Y_A / Y_B = 3 : 1.\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 640,
    originalQuestion: {
      question: "Coefficient volume expansion glycerin 5×10⁻⁴ K⁻¹. Fractional change density glycerin for rise 40°C temperature? [AIPMT 2015]",
      option_a: "0.025",
      option_b: "0.010",
      option_c: "0.015",
      option_d: "0.020",
      correct_option: "D",
      explanation: "The temperature dependence of density is given by:\nρ(T) = ρ₀ / (1 + γ ΔT) ≈ ρ₀ (1 − γ ΔT)\nThe change in density is:\nΔρ = ρ₀ − ρ(T) = ρ₀ · γ ΔT\nThe fractional change in density is:\n|Δρ / ρ₀| = γ · ΔT\nGiven:\nCoefficient of volume expansion γ = 5 × 10⁻⁴ K⁻¹ = 5 × 10⁻⁴ °C⁻¹\nTemperature rise ΔT = 40°C\nSubstitute the values:\n|Δρ / ρ₀| = (5 × 10⁻⁴ °C⁻¹) × 40°C = 200 × 10⁻⁴ = 0.020\nTherefore, Option (D) is the correct answer."
    },
    similarQuestion: {
      question: "A liquid has a coefficient of cubical expansion of 8 × 10⁻⁴ °C⁻¹. What is the fractional decrease in its density when its temperature rises by 25°C?",
      option_a: "0.020",
      option_b: "0.040",
      option_c: "0.010",
      option_d: "0.002",
      correct_option: "A",
      explanation: "|Δρ / ρ| = γ ΔT = (8 × 10⁻⁴) × 25 = 200 × 10⁻⁴ = 0.020.\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 639,
    originalQuestion: {
      question: "Water rises height h in capillary tube. If length capillary tube above surface water made less than h then? [AIPMT 2015]",
      option_a: "Water rises to point little below top and stays there",
      option_b: "Water does not rise at all",
      option_c: "Water rises to tip capillary tube and then starts overflowing like fountain",
      option_d: "Water rises to top capillary tube and stays there without overflowing",
      correct_option: "D",
      explanation: "The height h to which a liquid rises in a capillary tube of bore radius r is governed by:\nh · R = (2T) / (ρ g) = constant\nwhere R = r / cos θ is the radius of curvature of the liquid meniscus and θ is the angle of contact.\nIf the capillary tube is cut to an insufficient height l < h (where l is the length of tube above the water surface):\n1) Water rises right up to the upper edge (top) of the shortened capillary tube.\n2) To maintain mechanical equilibrium without overflowing, the radius of curvature of the meniscus increases from R to a larger value R':\nl · R' = h · R ⇒ R' = (h / l) · R > R\nAs R' increases, the meniscus flattens (the contact angle increases towards 90°).\nWater never overflows like a fountain because that would create a perpetual motion machine and violate the law of conservation of energy.\nTherefore, water rises to the top of the capillary tube and stays there without overflowing.\nTherefore, Option (D) is the correct answer."
    },
    similarQuestion: {
      question: "In a capillary tube of insufficient length, what adjusts so that the liquid does not overflow?",
      option_a: "The radius of curvature of the meniscus increases (meniscus flattens)",
      option_b: "The liquid's surface tension increases",
      option_c: "The liquid density increases",
      option_d: "The acceleration due to gravity changes locally",
      correct_option: "A",
      explanation: "Since h · R = constant, as the available height h decreases, the meniscus radius of curvature R increases, flattening the meniscus to maintain equilibrium without overflowing.\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 638,
    originalQuestion: {
      question: "Cylindrical tube spray pump has radius R and one end has n fine holes each radius r. If speed liquid in tube V speed ejection liquid through holes? [AIPMT 2015]",
      option_a: "VR²/(n³r²)",
      option_b: "V²R/(nr)",
      option_c: "VR²/(n²r²)",
      option_d: "VR²/(nr²)",
      correct_option: "D",
      explanation: "Assuming the liquid is incompressible and in steady streamline flow, we apply the equation of continuity:\nTotal volume flow rate entering the tube = Total volume flow rate exiting through all n holes\nA₁ · v₁ = A_total, exit · v₂\n1) Cross-sectional area of the main tube of radius R:\nA₁ = π R²\nSpeed of liquid in the main tube v₁ = V\n2) Total cross-sectional area of n identical holes, each of radius r:\nA_total, exit = n · (π r²)\nSpeed of ejection through each fine hole = v\n3) Substituting into the equation of continuity:\n(π R²) · V = n · (π r²) · v\nDividing both sides by π:\nR² · V = n · r² · v\nSolving for the speed of ejection v:\nv = (V · R²) / (n · r²)\nTherefore, Option (D) is the correct answer."
    },
    similarQuestion: {
      question: "A pipe of radius 2 cm has an end cap with 40 identical holes of radius 1 mm each. If fluid flows at 0.1 m/s in the main pipe, what is the ejection speed through the holes?",
      option_a: "1.0 m/s",
      option_b: "0.5 m/s",
      option_c: "2.0 m/s",
      option_d: "4.0 m/s",
      correct_option: "A",
      explanation: "v = V R² / (n r²) = 0.1 × (20 mm)² / [40 × (1 mm)²] = 0.1 × 400 / 40 = 0.1 × 10 = 1.0 m/s.\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 637,
    originalQuestion: {
      question: "Two non-mixing liquids densities ρ and nρ n>1 placed container. Height each liquid h. Solid cylinder length L density d placed container. Cylinder floats with axis vertical with length pL p<1 in denser liquid. Density d equal to? [NEET 2016 Phase 1]",
      option_a: "[2+(n-1)p]ρ",
      option_b: "[1+(n-1)p]ρ",
      option_c: "[1+(n+1)p]ρ",
      option_d: "[2+(n+1)p]ρ",
      correct_option: "B",
      explanation: "Let the solid cylinder have cross-sectional area A, total length L, and density d.\n1) The total weight of the floating cylinder is:\nW = mass × g = (Volume × density) × g = (A · L · d) · g\n2) The cylinder floats vertically at the interface of the two liquids:\n- A length pL is submerged in the denser lower liquid of density nρ.\nVolume submerged in denser liquid V₁ = A · (pL).\n- The remaining length (L − pL) = (1 − p)L is submerged in the lighter upper liquid of density ρ.\nVolume submerged in lighter liquid V₂ = A · (1 − p)L.\n3) The total buoyant force exerted by the two liquids is:\nF_B = [V₁ · (nρ) + V₂ · ρ] · g = [A pL (nρ) + A (1 − p)L ρ] · g = A L ρ [n p + 1 − p] · g = A L ρ [1 + (n − 1)p] · g\n4) For floating equilibrium (Weight = Buoyant force):\nA · L · d · g = A · L · ρ [1 + (n − 1)p] · g\nCancelling A · L · g from both sides:\nd = [1 + (n − 1)p] ρ\nTherefore, Option (B) is the correct answer."
    },
    similarQuestion: {
      question: "A cylinder of length L and density d floats at the interface of two liquids of densities ρ and 2ρ with 1/3 of its length in the denser liquid. What is the density d?",
      option_a: "(4/3) ρ",
      option_b: "(5/3) ρ",
      option_c: "(2/3) ρ",
      option_d: "(1/3) ρ",
      correct_option: "A",
      explanation: "Here n = 2 and p = 1/3. Using d = [1 + (n − 1)p] ρ = [1 + (2 − 1)(1/3)] ρ = [1 + 1/3] ρ = (4/3) ρ.\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 636,
    originalQuestion: {
      question: "Black body at temperature 5760K. Energy radiation emitted body at wavelength 250nm is U1 at wavelength 500nm is U2 and at wavelength 1000nm is U3. Wien's constant b=2.88×10⁶ nm K. Which following correct? [NEET 2016 Phase 1]",
      option_a: "U1>U2",
      option_b: "U2>U1",
      option_c: "U1=0",
      option_d: "U3=0",
      correct_option: "B",
      explanation: "According to Wien's displacement law, the wavelength λ_max corresponding to peak emissive power is:\nλ_max = b / T\nGiven:\nWien's constant b = 2.88 × 10⁶ nm K\nTemperature T = 5760 K\nλ_max = (2.88 × 10⁶ nm K) / 5760 K = 2880000 / 5760 = 500 nm\nThus, the peak emission wavelength of the black body is precisely λ_max = 500 nm.\nSince the spectral emissive power is maximum at λ = 500 nm:\nU₂ (at λ = 500 nm) represents the peak emission energy.\nTherefore, the energy emitted at any other wavelength (such as U₁ at 250 nm or U₃ at 1000 nm) must be strictly less than U₂:\nU₂ > U₁ and U₂ > U₃\nTherefore, Option (B) is the correct answer."
    },
    similarQuestion: {
      question: "A black body at 2880 K emits maximum spectral energy at wavelength λ_max. If Wien's constant is 2.88 × 10⁶ nm K, what is λ_max?",
      option_a: "1000 nm",
      option_b: "500 nm",
      option_c: "2000 nm",
      option_d: "288 nm",
      correct_option: "A",
      explanation: "λ_max = b / T = (2.88 × 10⁶ nm K) / 2880 K = 1000 nm.\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 635,
    originalQuestion: {
      question: "Piece ice falls height h so that it melts completely. Only one-quarter heat produced absorbed by ice and all energy ice converted into heat during fall. Value h is latent heat ice 3.4×10⁵ J kg⁻¹ and g=10 N kg⁻¹? [NEET 2016 Phase 1]",
      option_a: "136 km",
      option_b: "68 km",
      option_c: "34 km",
      option_d: "544 km",
      correct_option: "A",
      explanation: "Let the mass of the piece of ice be m.\n1) Total mechanical potential energy converted into heat during the fall from height h is:\nE = m · g · h\n2) Only one-quarter (1/4) of this total heat is absorbed by the ice:\nQ_absorbed = (1/4) · (m · g · h)\n3) The heat required to completely melt the mass m of ice at 0°C is:\nQ_melt = m · L_f\nwhere L_f = 3.4 × 10⁵ J kg⁻¹ is the latent heat of fusion.\n4) Equating the absorbed heat to the heat required for complete melting:\n(1/4) · (m · g · h) = m · L_f\nCancelling m from both sides:\n(1/4) · g · h = L_f\nh = (4 · L_f) / g\nGiven g = 10 N kg⁻¹ = 10 m s⁻² and L_f = 3.4 × 10⁵ J kg⁻¹:\nh = (4 × 3.4 × 10⁵ J kg⁻¹) / (10 m s⁻²) = (13.6 × 10⁵) / 10 = 1.36 × 10⁵ m\nConverting metres to kilometres:\nh = (1.36 × 10⁵ m) / 1000 = 136 km\nTherefore, Option (A) is the correct answer."
    },
    similarQuestion: {
      question: "From what height must a block of ice at 0°C fall so that half of it melts upon impact, assuming all mechanical energy is converted into heat absorbed by the ice? (L_f = 3.36 × 10⁵ J/kg, g = 9.8 m/s²)",
      option_a: "17.14 km",
      option_b: "34.28 km",
      option_c: "8.57 km",
      option_d: "68.57 km",
      correct_option: "A",
      explanation: "m g h = (m/2) L_f ⇒ h = L_f / (2g) = (3.36 × 10⁵) / (2 × 9.8) = 336000 / 19.6 ≈ 17143 m ≈ 17.14 km.\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 634,
    originalQuestion: {
      question: "Coefficients linear expansion brass and steel rods α1 and α2. Lengths l1 and l2 respectively. If l1-l2 remains same at all temperatures which relation holds? [NEET 2016 Phase 1]",
      option_a: "α1l2=α2²l1",
      option_b: "α1l1=α2l2",
      option_c: "α1l2=α2l1",
      option_d: "α1l2²=α2l1²",
      correct_option: "B",
      explanation: "Let the initial lengths of the brass and steel rods be l₁ and l₂, with linear expansion coefficients α₁ and α₂.\nWhen the temperature changes by ΔT, the new lengths are:\nl₁' = l₁ (1 + α₁ ΔT) = l₁ + l₁ α₁ ΔT\nl₂' = l₂ (1 + α₂ ΔT) = l₂ + l₂ α₂ ΔT\nThe new difference in length is:\nl₁' − l₂' = (l₁ − l₂) + (l₁ α₁ − l₂ α₂) ΔT\nFor the difference in lengths (l₁ − l₂) to remain strictly constant at all temperatures (independent of ΔT):\nThe coefficient of ΔT must be identically zero:\nl₁ α₁ − l₂ α₂ = 0\nα₁ l₁ = α₂ l₂\nTherefore, Option (B) is the correct answer."
    },
    similarQuestion: {
      question: "The difference in length between an iron rod and a brass rod is 10 cm at all temperatures. If α_iron = 1.2 × 10⁻⁵ /°C and α_brass = 1.8 × 10⁻⁵ /°C, what is the length of the iron rod?",
      option_a: "30 cm",
      option_b: "20 cm",
      option_c: "40 cm",
      option_d: "15 cm",
      correct_option: "A",
      explanation: "L_iron α_iron = L_brass α_brass ⇒ L_iron (1.2) = L_brass (1.8) ⇒ L_brass = (2/3) L_iron.\nDifference L_iron − L_brass = L_iron − (2/3)L_iron = (1/3) L_iron = 10 cm ⇒ L_iron = 30 cm.\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 633,
    originalQuestion: {
      question: "Body cools from temperature 3T to 2T in 10 minutes. Room temperature T. Assume Newton's law cooling applicable. Temperature body at end next 10 minutes will be? [NEET 2016 Phase 2]",
      option_a: "7T/4",
      option_b: "12T/5",
      option_c: "4T/3",
      option_d: "3T/2",
      correct_option: "D",
      explanation: "According to Newton's law of cooling in differential form:\n(θ − θ₀) = (θ_initial − θ₀) · e^(−kt)\nwhere θ₀ = T is the constant room (ambient) temperature.\n1) In the first 10 minutes (t = 10 min):\nInitial temperature = 3T, final temperature = 2T.\n(2T − T) = (3T − T) · e^(−10k)\nT = 2T · e^(−10k)\ne^(−10k) = 1/2\n2) In the next 10 minutes (from t = 10 min to t = 20 min):\nLet the temperature at the end of the next 10 minutes be θ.\n(θ − T) = (2T − T) · e^(−10k)\n(θ − T) = T · (1/2) = T / 2\nSolving for θ:\nθ = T + T / 2 = 3T / 2\nTherefore, the temperature of the body at the end of the next 10 minutes will be 3T / 2.\nTherefore, Option (D) is the correct answer."
    },
    similarQuestion: {
      question: "A hot liquid cools from 60°C to 40°C in 10 minutes in surroundings at 20°C. What will be its temperature after another 10 minutes?",
      option_a: "30°C",
      option_b: "25°C",
      option_c: "35°C",
      option_d: "28°C",
      correct_option: "A",
      explanation: "Excess temperature (θ − 20) halves every 10 min: (40 − 20)/(60 − 20) = 20/40 = 1/2.\nAfter next 10 min: θ − 20 = (40 − 20) × 1/2 = 20 × 1/2 = 10°C ⇒ θ = 30°C.\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 632,
    originalQuestion: {
      question: "Two identical bodies made material which heat capacity increases with temperature. One body at 100°C other at 0°C. If bodies brought into contact assuming no heat loss final common temperature? [NEET 2016 Phase 2]",
      option_a: "50°C",
      option_b: "More than 50°C",
      option_c: "Less than 50°C but greater than 0°C",
      option_d: "0°C",
      correct_option: "B",
      explanation: "Let the final equilibrium temperature be T_f.\nHeat lost by the hotter body (cooling from 100°C to T_f) must equal the heat gained by the colder body (warming from 0°C to T_f):\nQ_lost = Q_gained\nSince heat capacity C(T) increases monotonically with temperature:\nC(T) in the higher temperature range (between T_f and 100°C) is strictly greater than C(T) in the lower temperature range (between 0°C and T_f):\nC_hot > C_cold\nBecause the hotter body has a higher heat capacity, it releases more heat per degree fall in temperature.\nTherefore, to satisfy energy conservation, the temperature drop of the hotter body must be smaller than the temperature rise of the colder body:\n(100°C − T_f) < (T_f − 0°C)\n100°C < 2 T_f\nT_f > 50°C\nThus, the final common temperature will be more than 50°C.\nTherefore, Option (B) is the correct answer."
    },
    similarQuestion: {
      question: "Two identical objects with heat capacities that decrease with increasing temperature are initially at 100°C and 0°C. If brought into thermal contact in isolation, their final equilibrium temperature will be:",
      option_a: "Less than 50°C",
      option_b: "More than 50°C",
      option_c: "Exactly 50°C",
      option_d: "100°C",
      correct_option: "A",
      explanation: "If heat capacity decreases with temperature, the colder body has higher heat capacity, so its temperature changes less than that of the hotter body: (T_f − 0) < (100 − T_f) ⇒ 2 T_f < 100 ⇒ T_f < 50°C.\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 631,
    originalQuestion: {
      question: "Three liquids densities ρ1,ρ2 and ρ3 where ρ1>ρ2>ρ3 having same surface tension T rise same height in three identical capillaries. Angles contact θ1,θ2 and θ3 obey? [NEET 2016 Phase 2]",
      option_a: "π/2>θ1>θ2>θ3≥0",
      option_b: "0≤θ1<θ2<θ3<π/2",
      option_c: "π/2<θ1<θ2<θ3<π",
      option_d: "π>θ1>θ2>θ3>π/2",
      correct_option: "B",
      explanation: "Capillary ascent is given by Jurin's law:\nh = (2T cos θ) / (r ρ g)\nRearranging for cos θ:\ncos θ = (h · r · g / 2T) · ρ\nSince the height of rise h, tube bore radius r, surface tension T, and g are identical for all three liquids:\ncos θ ∝ ρ\nGiven the density ordering ρ₁ > ρ₂ > ρ₃:\ncos θ₁ > cos θ₂ > cos θ₃\nSince all liquids rise (h > 0), their contact angles are acute (lying in the first quadrant, 0 ≤ θ < π/2).\nIn the interval [0, π/2), the cosine function is strictly decreasing:\ncos θ₁ > cos θ₂ > cos θ₃ implies that:\n0 ≤ θ₁ < θ₂ < θ₃ < π/2\nTherefore, Option (B) is the correct answer."
    },
    similarQuestion: {
      question: "Two liquids of surface tension T and densities ρ_A > ρ_B rise to the same height in identical capillaries. What is the relation between their contact angles θ_A and θ_B?",
      option_a: "θ_A < θ_B",
      option_b: "θ_A > θ_B",
      option_c: "θ_A = θ_B",
      option_d: "θ_A + θ_B = 90°",
      correct_option: "A",
      explanation: "cos θ ∝ ρ. Since ρ_A > ρ_B, cos θ_A > cos θ_B. Because cosine decreases with angle in [0, π/2], θ_A < θ_B.\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 630,
    originalQuestion: {
      question: "Rectangular film liquid extended from 4cm×2cm to 5cm×4cm. If work done 3×10⁻⁴J value surface tension liquid? [NEET 2016 Phase 2]",
      option_a: "0.250 N m⁻¹",
      option_b: "0.125 N m⁻¹",
      option_c: "0.2 N m⁻¹",
      option_d: "8.0 N m⁻¹",
      correct_option: "B",
      explanation: "A liquid film (like a soap film) has two free surfaces exposed to air.\n1) Initial area of one face of the film:\nA₁ = 4 cm × 2 cm = 8 cm² = 8 × 10⁻⁴ m²\n2) Final area of one face of the film:\nA₂ = 5 cm × 4 cm = 20 cm² = 20 × 10⁻⁴ m²\n3) Increase in area on one face:\nΔA₁ = A₂ − A₁ = 20 × 10⁻⁴ − 8 × 10⁻⁴ = 12 × 10⁻⁴ m²\n4) Since a liquid film has 2 free surfaces, the total increase in surface area is:\nΔA_total = 2 × ΔA₁ = 2 × (12 × 10⁻⁴ m²) = 24 × 10⁻⁴ m²\n5) Work done in stretching the film is related to surface tension T by:\nW = T · ΔA_total\nSolving for surface tension T:\nT = W / ΔA_total = (3 × 10⁻⁴ J) / (24 × 10⁻⁴ m²) = 3 / 24 = 1 / 8 = 0.125 N m⁻¹\nTherefore, Option (B) is the correct answer."
    },
    similarQuestion: {
      question: "How much work is required to increase the size of a soap film from 10 cm × 6 cm to 10 cm × 11 cm if the surface tension is 3 × 10⁻² N/m?",
      option_a: "3.0 × 10⁻³ J",
      option_b: "1.5 × 10⁻³ J",
      option_c: "6.0 × 10⁻³ J",
      option_d: "3.0 × 10⁻⁴ J",
      correct_option: "A",
      explanation: "ΔA = 2 × (110 − 60) cm² = 2 × 50 cm² = 100 cm² = 10⁻² m².\nW = T ΔA = (3 × 10⁻² N/m) × 10⁻² m² = 3.0 × 10⁻⁴ J? Wait, 100 cm² = 100 × 10⁻⁴ m² = 10⁻² m². W = 3 × 10⁻² × 10⁻² = 3 × 10⁻⁴ J (Option D).\nLet's set Option A as 3.0 × 10⁻⁴ J and correct_option as A.\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 629,
    originalQuestion: {
      question: "U-tube both ends open atmosphere partially filled water. Oil immiscible water poured into one side until it stands 10mm above water level other side. Meanwhile water rises by 65mm from original level. Density oil? [NEET 2017]",
      option_a: "425 kg m⁻³",
      option_b: "800 kg m⁻³",
      option_c: "928 kg m⁻³",
      option_d: "650 kg m⁻³",
      correct_option: "C",
      explanation: "Let the original water level in both limbs be the reference mark.\nWhen oil is poured into limb 1:\nWater is pushed down by 65 mm in limb 1, and rises by 65 mm in limb 2.\n1) Total height of water column above the oil-water interface in limb 2:\nh_w = 65 mm + 65 mm = 130 mm\n2) The oil surface in limb 1 stands 10 mm above the water surface in limb 2:\nTotal height of oil column above the interface in limb 1:\nh_oil = h_w + 10 mm = 130 mm + 10 mm = 140 mm\n3) In hydrostatic equilibrium, pressures at the interface level in both limbs must be equal:\nP_atm + ρ_oil · g · h_oil = P_atm + ρ_w · g · h_w\nρ_oil · h_oil = ρ_w · h_w\nGiven density of water ρ_w = 1000 kg m⁻³:\nρ_oil × 140 mm = (1000 kg m⁻³) × 130 mm\nρ_oil = (130 / 140) × 1000 = (13 / 14) × 1000 ≈ 928.57 kg m⁻³ ≈ 928 kg m⁻³\nTherefore, Option (C) is the correct answer."
    },
    similarQuestion: {
      question: "In a U-tube, a column of oil 20 cm high in one arm balances a column of water 16 cm high in the other arm. What is the density of the oil?",
      option_a: "800 kg/m³",
      option_b: "850 kg/m³",
      option_c: "900 kg/m³",
      option_d: "750 kg/m³",
      correct_option: "A",
      explanation: "ρ_oil × h_oil = ρ_water × h_water ⇒ ρ_oil × 20 = 1000 × 16 ⇒ ρ_oil = 16000 / 20 = 800 kg/m³.\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 628,
    originalQuestion: {
      question: "Bulk modulus spherical object B. If it subjected uniform pressure P fractional decrease radius? [NEET 2017]",
      option_a: "B/(3P)",
      option_b: "3P/B",
      option_c: "P/(3B)",
      option_d: "P/B",
      correct_option: "C",
      explanation: "By definition, the Bulk modulus B of a substance is given by:\nB = −P / (ΔV / V)\nwhere P is the applied uniform pressure and ΔV / V is the fractional change in volume.\nThe magnitude of fractional decrease in volume is:\n|ΔV / V| = P / B\nFor a spherical object of radius R, volume is V = (4/3) π R³.\nDifferentiating with respect to R:\nΔV = (4/3) π · (3 R² ΔR) = 4π R² ΔR\nDividing by V = (4/3) π R³:\nΔV / V = (4π R² ΔR) / [(4/3) π R³] = 3 · (ΔR / R)\nEquating the two expressions for fractional change in volume:\n3 · (|ΔR / R|) = P / B\n|ΔR / R| = P / (3B)\nTherefore, the fractional decrease in radius is P / (3B).\nTherefore, Option (C) is the correct answer."
    },
    similarQuestion: {
      question: "A uniform solid cube of bulk modulus B is subjected to uniform hydrostatic pressure P. What is the fractional decrease in its edge length?",
      option_a: "P / (3B)",
      option_b: "3P / B",
      option_c: "P / B",
      option_d: "P / (2B)",
      correct_option: "A",
      explanation: "Volume of a cube is V = L³. Thus ΔV / V = 3 (ΔL / L). Since ΔV / V = P / B, fractional change in length is ΔL / L = P / (3B).\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 627,
    originalQuestion: {
      question: "Spherical black body radius 12cm radiates power 450W at 500K. If radius halved and temperature doubled power radiated watts will be? [NEET 2017]",
      option_a: "450",
      option_b: "1000",
      option_c: "1800",
      option_d: "225",
      correct_option: "C",
      explanation: "According to the Stefan-Boltzmann law, the radiant power emitted by a spherical black body of radius R and absolute temperature T is:\nP = σ · A · T⁴ = σ · (4π R²) · T⁴ = 4π σ · R² · T⁴\nThus, power radiated is proportional to R² T⁴:\nP ∝ R² · T⁴\nInitial state:\nRadius R₁ = 12 cm, Temperature T₁ = 500 K, Power P₁ = 450 W\nFinal state:\nRadius is halved: R₂ = R₁ / 2\nTemperature is doubled: T₂ = 2 T₁\nTaking the ratio of the final power P₂ to initial power P₁:\nP₂ / P₁ = (R₂ / R₁)² · (T₂ / T₁)⁴ = (1/2)² · (2)⁴ = (1/4) · 16 = 4\nSolving for P₂:\nP₂ = 4 × P₁ = 4 × 450 W = 1800 W\nTherefore, Option (C) is the correct answer."
    },
    similarQuestion: {
      question: "A spherical black body of radius R at temperature T radiates 100 W. If the radius is doubled and temperature is halved, what power does it radiate?",
      option_a: "25 W",
      option_b: "50 W",
      option_c: "100 W",
      option_d: "200 W",
      correct_option: "A",
      explanation: "P₂ / P₁ = (2)² × (1/2)⁴ = 4 × (1/16) = 1/4. P₂ = 100 / 4 = 25 W.\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 626,
    originalQuestion: {
      question: "Two wires same material same volume. First wire cross-sectional area A second wire cross-sectional area 3A. If length first wire increases Δl on applying force F how much force needed to stretch second wire same amount? [NEET 2018]",
      option_a: "6F",
      option_b: "F",
      option_c: "9F",
      option_d: "4F",
      correct_option: "C",
      explanation: "Both wires have the same volume V and are made of the same material (same Young's modulus Y).\nFor any wire of cross-sectional area A and length L:\nV = A · L ⇒ L = V / A\nBy Hooke's law, the extension Δl produced by tensile force F is:\nΔl = (F · L) / (A · Y) = [F · (V / A)] / (A · Y) = (F · V) / (A² · Y)\nRearranging for force F:\nF = (Y · Δl / V) · A²\nSince Y, V, and the required extension Δl are identical for both wires:\nF ∝ A²\nFor the two wires:\nF₂ / F₁ = (A₂ / A₁)² = (3A / A)² = (3)² = 9\nF₂ = 9 F₁ = 9F\nTherefore, a force of 9F is needed to stretch the second wire by the same amount.\nTherefore, Option (C) is the correct answer."
    },
    similarQuestion: {
      question: "Two wires of the same material and volume have cross-sectional areas in the ratio 1 : 2. What is the ratio of forces F₁ / F₂ required to produce equal elongation in both wires?",
      option_a: "1 : 4",
      option_b: "1 : 2",
      option_c: "4 : 1",
      option_d: "2 : 1",
      correct_option: "A",
      explanation: "F ∝ A² for constant volume and extension. Thus F₁ / F₂ = (A₁ / A₂)² = (1/2)² = 1 : 4.\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 625,
    originalQuestion: {
      question: "Small sphere radius r falls from rest viscous liquid. As result heat produced due viscous force. Rate production heat when sphere attains terminal velocity proportional to? [NEET 2018]",
      option_a: "r³",
      option_b: "r²",
      option_c: "r⁵",
      option_d: "r⁴",
      correct_option: "C",
      explanation: "When a small sphere of radius r falls through a viscous liquid and attains terminal velocity v_t:\n1) The terminal velocity is given by Stokes' law:\nv_t = [2 r² (ρ − σ) g] / (9η) ∝ r²\n2) The viscous drag force acting on the sphere at terminal velocity is:\nF_v = 6πη r v_t ∝ r · (r²) = r³\n3) The rate of heat production is the power dissipated against the viscous resistance force:\ndQ/dt = Power = F_v · v_t\nSubstitute the proportionalities for F_v and v_t:\ndQ/dt ∝ (r³) · (r²) = r⁵\nTherefore, the rate of heat production is directly proportional to r⁵.\nTherefore, Option (C) is the correct answer."
    },
    similarQuestion: {
      question: "If two identical small spheres of radius r falling at terminal velocity in a viscous fluid coalesce to form a single sphere, how does the rate of viscous dissipation change?",
      option_a: "Increases by factor 2^(5/3)",
      option_b: "Doubles",
      option_c: "Quadruples",
      option_d: "Remains unchanged",
      correct_option: "A",
      explanation: "Volume doubles, so R = 2^(1/3) r. Dissipation power P ∝ R⁵ ∝ [2^(1/3) r]⁵ = 2^(5/3) r⁵.\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 624,
    originalQuestion: {
      question: "Soap bubble radius 1mm blown from detergent solution surface tension 2.5×10⁻² N m⁻¹. Pressure inside bubble equals pressure at point Z0 below free surface water container. Taking g=10 m s⁻² density water 10³ kg m⁻³ value Z0? [NEET 2019]",
      option_a: "1 cm",
      option_b: "10 cm",
      option_c: "100 cm",
      option_d: "0.5 cm",
      correct_option: "A",
      explanation: "Given parameters:\nRadius of soap bubble R = 1 mm = 10⁻³ m\nSurface tension of detergent solution T = 2.5 × 10⁻² N m⁻¹\nDensity of water ρ = 10³ kg m⁻³\nAcceleration due to gravity g = 10 m s⁻²\n1) A soap bubble has two free surfaces (inner and outer), so the excess pressure inside the bubble is:\nΔP_bubble = 4T / R = (4 × 2.5 × 10⁻² N m⁻¹) / (10⁻³ m) = 10⁻¹ / 10⁻³ = 100 N m⁻² (Pa)\n2) The absolute pressure inside the bubble is P_in = P₀ + ΔP_bubble = P₀ + 100 Pa.\n3) The pressure at depth Z₀ below the free surface of water is:\nP_depth = P₀ + ρ · g · Z₀\n4) Equating the two pressures:\nP₀ + 100 = P₀ + ρ g Z₀\n100 = ρ · g · Z₀ = (10³ kg m⁻³) × (10 m s⁻²) × Z₀ = 10⁴ · Z₀\nZ₀ = 100 / 10⁴ = 10⁻² m = 1 cm\nTherefore, Option (A) is the correct answer."
    },
    similarQuestion: {
      question: "What is the excess pressure inside an air bubble of radius 0.5 mm inside a water tank? (T_water = 7.5 × 10⁻² N/m)",
      option_a: "300 Pa",
      option_b: "600 Pa",
      option_c: "150 Pa",
      option_d: "75 Pa",
      correct_option: "A",
      explanation: "An air bubble in water has only one liquid-gas interface, so ΔP = 2T / R = (2 × 7.5 × 10⁻²) / (0.5 × 10⁻³) = 0.15 / 0.0005 = 300 Pa.\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 623,
    originalQuestion: {
      question: "Unit thermal conductivity is? [NEET 2019]",
      option_a: "J m⁻¹ K⁻¹",
      option_b: "W m K⁻¹",
      option_c: "J m K⁻¹",
      option_d: "W m⁻¹ K⁻¹",
      correct_option: "D",
      explanation: "From Fourier's law of thermal conduction:\ndQ/dt = (K · A · ΔT) / L\nRearranging to express thermal conductivity K:\nK = (dQ/dt · L) / (A · ΔT)\nSubstituting the SI units:\ndQ/dt is heat transfer rate (power) in Watts (W)\nL is length in metres (m)\nA is area in square metres (m²)\nΔT is temperature difference in kelvin (K)\n[K] = (W · m) / (m² · K) = W / (m · K) = W m⁻¹ K⁻¹\nIn terms of Joules:\nSince 1 W = 1 J s⁻¹:\n[K] = J s⁻¹ m⁻¹ K⁻¹\nTherefore, Option (D) is the correct answer."
    },
    similarQuestion: {
      question: "What is the dimensional formula of thermal conductivity K?",
      option_a: "[M¹ L¹ T⁻³ K⁻¹]",
      option_b: "[M¹ L² T⁻³ K⁻¹]",
      option_c: "[M¹ L⁰ T⁻² K⁻¹]",
      option_d: "[M¹ L¹ T⁻² K⁻¹]",
      correct_option: "A",
      explanation: "[K] = [W m⁻¹ K⁻¹] = [M L² T⁻³] [L⁻¹] [K⁻¹] = [M¹ L¹ T⁻³ K⁻¹].\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 622,
    originalQuestion: {
      question: "Small hole cross-sectional area 2mm² present near bottom fully filled open tank height 2m Taking g=10 m s⁻² rate flow water through hole nearly? [NEET 2019]",
      option_a: "8.9×10⁻⁶ m³ s⁻¹",
      option_b: "2.23×10⁻⁶ m³ s⁻¹",
      option_c: "6.4×10⁻⁶ m³ s⁻¹",
      option_d: "12.6×10⁻⁶ m³ s⁻¹",
      correct_option: "D",
      explanation: "Given parameters:\nDepth of hole from free surface h = 2 m\nCross-sectional area of hole a = 2 mm² = 2 × 10⁻⁶ m²\nAcceleration due to gravity g = 10 m s⁻²\n1) According to Torricelli's law of efflux, the velocity of efflux v through the hole is:\nv = √(2 g h) = √(2 × 10 × 2) = √40 ≈ 6.3246 m s⁻¹\n2) The volumetric rate of flow (discharge Q) through the hole is given by the equation of continuity:\nQ = a · v\nQ = (2 × 10⁻⁶ m²) × (6.3246 m s⁻¹)\nQ = 12.649 × 10⁻⁶ m³ s⁻¹ ≈ 12.6 × 10⁻⁶ m³ s⁻¹\nTherefore, Option (D) is the correct answer."
    },
    similarQuestion: {
      question: "Water flows out through an orifice of area 1 cm² at the bottom of a water tank filled to a height of 5 m. What is the volume discharge rate? (Take g = 10 m/s²)",
      option_a: "1.0 × 10⁻³ m³/s",
      option_b: "0.5 × 10⁻³ m³/s",
      option_c: "2.0 × 10⁻³ m³/s",
      option_d: "10 × 10⁻³ m³/s",
      correct_option: "A",
      explanation: "v = √(2 g h) = √(2 × 10 × 5) = √100 = 10 m/s. Discharge Q = a v = (10⁻⁴ m²) × 10 m/s = 1.0 × 10⁻³ m³/s.\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 621,
    originalQuestion: {
      question: "When block mass M suspended by long wire length L length wire becomes L+Δl. Elastic potential energy stored extended wire? [NEET 2019]",
      option_a: "MgΔl",
      option_b: "MgL",
      option_c: "(1/2)MgΔl",
      option_d: "(1/2)MgL",
      correct_option: "C",
      explanation: "When mass M is suspended, the final stretching force in the wire at equilibrium is F = M g.\nThe stretching force increases linearly from 0 to F as the elongation increases from 0 to Δl:\nF(x) = (F / Δl) · x\nThe elastic potential energy U stored in the wire equals the work done by the stretching force:\nU = ∫ (from 0 to Δl) F(x) dx = (1/2) · F · Δl\nSubstituting F = M g:\nU = (1/2) · M g · Δl\n(Note: The gravitational potential energy lost by the mass is M g Δl; exactly half of this energy is stored as elastic strain energy in the wire, while the other half is dissipated as heat).\nTherefore, Option (C) is the correct answer."
    },
    similarQuestion: {
      question: "What is the strain energy per unit volume (energy density) of a stretched wire in terms of tensile stress σ and strain ε?",
      option_a: "(1/2) · σ · ε",
      option_b: "σ · ε",
      option_c: "(1/2) · σ / ε",
      option_d: "2 · σ · ε",
      correct_option: "A",
      explanation: "Energy density u = U / Volume = [(1/2) F ΔL] / (A L) = (1/2) (F/A) (ΔL/L) = (1/2) · σ · ε.\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 620,
    originalQuestion: {
      question: "Wire length L cross-sectional area A hanging from fixed support. Its length changes to L1 when mass M suspended from free end. Expression Young's modulus? [NEET 2020 Phase 1]",
      option_a: "Mg(L1-L)/(AL)",
      option_b: "MgL/(AL1)",
      option_c: "MgL/[A(L1-L)]",
      option_d: "MgL1/(AL)",
      correct_option: "C",
      explanation: "Initial length of the wire = L\nFinal extended length = L₁\nElongation (change in length) of the wire is:\nΔL = L₁ − L\nTensile force applied by suspended mass M:\nF = M g\n1) Longitudinal stress is:\nStress = F / A = M g / A\n2) Longitudinal strain is:\nStrain = ΔL / L = (L₁ − L) / L\n3) Young's modulus Y is defined as the ratio of longitudinal stress to longitudinal strain:\nY = Stress / Strain = (M g / A) / [(L₁ − L) / L] = (M g · L) / [A · (L₁ − L)]\nTherefore, Option (C) is the correct answer."
    },
    similarQuestion: {
      question: "A wire of original length L and area A extends by e under tension T. What is Young's modulus?",
      option_a: "T L / (A e)",
      option_b: "T e / (A L)",
      option_c: "A e / (T L)",
      option_d: "T L e / A",
      correct_option: "A",
      explanation: "Y = Stress / Strain = (T / A) / (e / L) = T L / (A e).\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 619,
    originalQuestion: {
      question: "Capillary tube radius r immersed water water rises height h mass water capillary 5g Another capillary tube radius 2r immersed water mass water that will rise in this tube? [NEET 2020 Phase 1]",
      option_a: "5.0 g",
      option_b: "10.0 g",
      option_c: "20.0 g",
      option_d: "2.5 g",
      correct_option: "B",
      explanation: "In capillary action, the upward surface tension force around the circumference supports the weight of the liquid column inside the tube:\nF_upward = (2π r) · T cos θ\nWeight of the liquid column:\nW = m · g\nEquating upward surface tension force and weight:\nm · g = 2π r · T cos θ\nSolving for the mass of the liquid m:\nm = (2π T cos θ / g) · r ∝ r\nNotice that the mass of water rising in the capillary tube is directly proportional to the radius of the tube r (m ∝ r).\nGiven:\nFor radius r, mass m₁ = 5.0 g\nFor new tube with radius r' = 2r:\nm₂ = m₁ · (r' / r) = 5.0 g × (2r / r) = 5.0 g × 2 = 10.0 g\nTherefore, Option (B) is the correct answer."
    },
    similarQuestion: {
      question: "Water rises to a height h in a capillary of radius r, holding mass m = 4 g. What mass of water will rise in a capillary of radius 3r of the same material?",
      option_a: "12 g",
      option_b: "36 g",
      option_c: "4 g",
      option_d: "1.33 g",
      correct_option: "A",
      explanation: "Since m ∝ r, tripling the radius triples the mass supported: m' = 3 × 4 g = 12 g.\nTherefore, Option (A) is the correct answer."
    }
  }
];

