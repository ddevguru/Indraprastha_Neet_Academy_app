module.exports = [
  {
    id: 678,
    originalQuestion: {
      question: "Black body has maximum wavelength λm at 2000 K. Its corresponding maximum wavelength at 3000 K will be? [AIPMT 2000]",
      option_a: "(2/3)λm",
      option_b: "(3/2)λm",
      option_c: "(81/16)λm",
      option_d: "(16/81)λm",
      correct_option: "A",
      explanation: "According to Wien's displacement law, the wavelength λ_m corresponding to maximum spectral emissive power of a black body is inversely proportional to its absolute temperature T:\nλ_m · T = b = constant\nTherefore:\nλ_m1 · T₁ = λ_m2 · T₂\nGiven:\nT₁ = 2000 K, λ_m1 = λ_m\nT₂ = 3000 K\nλ_m2 = λ_m1 · (T₁ / T₂) = λ_m · (2000 K / 3000 K) = (2/3) λ_m\nTherefore, Option (A) is the correct answer."
    },
    similarQuestion: {
      question: "The wavelength corresponding to maximum energy emission from a black body at 4000 K is 600 nm. At what wavelength will the emission be maximum if the temperature is reduced to 2000 K?",
      option_a: "1200 nm",
      option_b: "300 nm",
      option_c: "900 nm",
      option_d: "1500 nm",
      correct_option: "A",
      explanation: "By Wien's displacement law:\nλ_m1 · T₁ = λ_m2 · T₂\n(600 nm) × (4000 K) = λ_m2 × (2000 K)\nλ_m2 = 600 × 2 = 1200 nm\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 677,
    originalQuestion: {
      question: "Cylindrical rod has temperatures T1 and T2 at its ends. Rate heat flow Q1 cal/s. If all linear dimensions doubled while keeping temperature difference constant new rate heat flow Q2 will be? [AIPMT 2001]",
      option_a: "4Q1",
      option_b: "2Q1",
      option_c: "Q1/4",
      option_d: "Q1/2",
      correct_option: "B",
      explanation: "The steady-state rate of heat conduction through a cylindrical rod of length L and cross-sectional area A = π r² is given by Fourier's law:\nQ = (K · A · ΔT) / L = (K · π r² · ΔT) / L\nThus, for a given material and constant temperature difference ΔT:\nQ ∝ r² / L\nWhen all linear dimensions are doubled:\nNew radius r' = 2r\nNew length L' = 2L\nThe new rate of heat flow is:\nQ₂ = Q₁ · [(r'/r)² / (L'/L)] = Q₁ · [(2)² / (2)] = Q₁ · (4 / 2) = 2 Q₁\nTherefore, Option (B) is the correct answer."
    },
    similarQuestion: {
      question: "If all linear dimensions of a metal rod conducting heat between two fixed temperatures are halved, how does the rate of heat flow change?",
      option_a: "Becomes halved (Q / 2)",
      option_b: "Becomes one-fourth (Q / 4)",
      option_c: "Doubles (2Q)",
      option_d: "Remains unchanged",
      correct_option: "A",
      explanation: "Rate of heat flow Q ∝ A / L ∝ r² / L.\nWhen linear dimensions are scaled by factor f = 1/2:\nQ' = Q · (1/2)² / (1/2) = Q / 2.\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 676,
    originalQuestion: {
      question: "Wien's displacement law expresses relation between? [AIPMT 2002]",
      option_a: "Wavelength corresponding maximum energy and temperature",
      option_b: "Radiation energy and wavelength",
      option_c: "Temperature and wavelength",
      option_d: "Colour light and temperature",
      correct_option: "A",
      explanation: "Wien's displacement law states that the wavelength λ_m at which the spectral emissive power of a black body is maximum is inversely proportional to the absolute temperature T of the black body:\nλ_m · T = b\nwhere b is Wien's displacement constant (b ≈ 2.898 × 10⁻³ m K).\nThus, it directly expresses the fundamental quantitative relationship between the wavelength corresponding to maximum radiant energy emission and the thermodynamic temperature of the black body.\nTherefore, Option (A) is the correct answer."
    },
    similarQuestion: {
      question: "Wien's displacement constant has the SI unit of:",
      option_a: "m K",
      option_b: "m / K",
      option_c: "W m⁻² K⁻⁴",
      option_d: "J K⁻¹",
      correct_option: "A",
      explanation: "From λ_m · T = b, where λ_m is in metres (m) and T is in kelvin (K), the unit of b is metre-kelvin (m K).\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 675,
    originalQuestion: {
      question: "Which following closest to ideal black body? [AIPMT 2002]",
      option_a: "Black lamp",
      option_b: "Cavity maintained at constant temperature",
      option_c: "Platinum black",
      option_d: "Lump charcoal heated to high temperature",
      correct_option: "B",
      explanation: "An ideal black body is defined as an object that absorbs 100% of all incident electromagnetic radiation of all wavelengths, without reflecting or transmitting any radiation.\nA practical, near-perfect realization of an ideal black body is an isothermal cavity (such as Ferry's or Wien's black body) having a tiny pinhole aperture and maintained at a constant uniform temperature.\nAny radiation entering the small aperture undergoes multiple internal diffuse reflections from the cavity walls, getting completely absorbed so that virtually no radiation escapes back out.\nTherefore, a cavity maintained at constant temperature is the closest physical approximation to an ideal black body.\nTherefore, Option (B) is the correct answer."
    },
    similarQuestion: {
      question: "In Ferry's black body, what prevents the incident radiation from reflecting directly back out through the entrance hole?",
      option_a: "A conical projection placed directly opposite the aperture",
      option_b: "A high-vacuum pump maintaining zero pressure",
      option_c: "A concave lens placed at the aperture",
      option_d: "A thick layer of silver plating on the outside",
      correct_option: "A",
      explanation: "A pointed conical projection is positioned on the inner wall directly opposite the narrow hole to ensure incident rays suffer oblique reflection and cannot retrace their path back out.\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 674,
    originalQuestion: {
      question: "For black body at 727°C its radiating power 60W and surrounding temperature 227°C. If temperature black body changed to 1227°C its radiating power will be? [AIPMT 2002]",
      option_a: "304 W",
      option_b: "320 W",
      option_c: "240 W",
      option_d: "120 W",
      correct_option: "B",
      explanation: "According to Stefan-Boltzmann law, the net rate of thermal radiant energy loss by a black body at temperature T surrounded by an environment at temperature T₀ is:\nP = σ · A · (T⁴ − T₀⁴)\n1) First state:\nBody temperature T₁ = 727°C = 727 + 273 = 1000 K\nSurrounding temperature T₀ = 227°C = 227 + 273 = 500 K\nRadiating power P₁ = 60 W\nP₁ = σ A · (1000⁴ − 500⁴) = σ A · 500⁴ · (2⁴ − 1⁴) = σ A · 500⁴ · (16 − 1) = 15 · σ A · 500⁴ = 60 W\nThus, σ A · 500⁴ = 60 / 15 = 4 W\n2) Second state:\nBody temperature T₂ = 1227°C = 1227 + 273 = 1500 K\nP₂ = σ A · (1500⁴ − 500⁴) = σ A · 500⁴ · (3⁴ − 1⁴) = σ A · 500⁴ · (81 − 1) = 80 · σ A · 500⁴\nSubstitute σ A · 500⁴ = 4 W:\nP₂ = 80 × 4 W = 320 W\nTherefore, Option (B) is the correct answer."
    },
    similarQuestion: {
      question: "A black body at 300 K radiates 5 W in an enclosure at 0 K. How much power will it radiate at 600 K in the same enclosure?",
      option_a: "80 W",
      option_b: "40 W",
      option_c: "20 W",
      option_d: "160 W",
      correct_option: "A",
      explanation: "P = σ A T⁴.\nWhen T doubles from 300 K to 600 K:\nP₂ = P₁ × (600 / 300)⁴ = 5 W × 2⁴ = 5 × 16 = 80 W.\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 673,
    originalQuestion: {
      question: "Two rods same length but different specific heats S1 and S2 thermal conductivities K1 and K2 and cross-sectional areas A1 and A2. Both have temperatures T1 and T2 at ends. If rates heat loss due conduction equal then? [AIPMT 2002]",
      option_a: "K1A1=K2A2",
      option_b: "S1K1A1=S2K2A2",
      option_c: "K2A1=K1A2",
      option_d: "S2K2A1=S1K1A2",
      correct_option: "A",
      explanation: "The steady-state rate of heat conduction through a rod of length L, cross-sectional area A, and thermal conductivity K under end temperature difference ΔT = T₁ − T₂ is given by Fourier's law:\ndQ/dt = (K · A · ΔT) / L\nIn steady state, no heat is absorbed or released to change the temperature of the rod elements, so the specific heat S of the material plays no role whatsoever in heat conduction rate.\nGiven that the two rods have the same length L and same temperature difference ΔT between their ends, their rates of heat conduction are:\n(dQ/dt)₁ = (K₁ · A₁ · ΔT) / L\n(dQ/dt)₂ = (K₂ · A₂ · ΔT) / L\nSince the rates are equal ((dQ/dt)₁ = (dQ/dt)₂):\n(K₁ · A₁ · ΔT) / L = (K₂ · A₂ · ΔT) / L\nK₁ A₁ = K₂ A₂\nTherefore, Option (A) is the correct answer."
    },
    similarQuestion: {
      question: "Two rods of identical length conduct heat at the same rate under the same temperature difference. If the ratio of their thermal conductivities is K₁ / K₂ = 3 / 2, what is the ratio of their cross-sectional areas A₁ / A₂?",
      option_a: "2 / 3",
      option_b: "3 / 2",
      option_c: "9 / 4",
      option_d: "4 / 9",
      correct_option: "A",
      explanation: "For equal conduction rate: K₁ A₁ = K₂ A₂ ⇒ A₁ / A₂ = K₂ / K₁ = 2 / 3.\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 672,
    originalQuestion: {
      question: "Unit Stefan's constant is? [AIPMT 2002]",
      option_a: "W m² K⁴",
      option_b: "W m² K⁻⁴",
      option_c: "W m⁻² K",
      option_d: "W m⁻² K⁻⁴",
      correct_option: "D",
      explanation: "According to Stefan-Boltzmann law, the radiant energy emitted per unit time (power P in Watts) by a black body of surface area A (in m²) at absolute temperature T (in K) is given by:\nP = σ · A · T⁴\nRearranging to express Stefan's constant σ:\nσ = P / (A · T⁴)\nSubstituting the SI units of each quantity:\n[σ] = W / (m² · K⁴) = W m⁻² K⁻⁴\nIn fundamental SI units:\n1 W = 1 J s⁻¹ = 1 kg m² s⁻³\n[σ] = (kg m² s⁻³) / (m² K⁴) = kg s⁻³ K⁻⁴\nTherefore, Option (D) is the correct answer."
    },
    similarQuestion: {
      question: "What are the dimensional formula of Stefan's constant σ?",
      option_a: "[M¹ L⁰ T⁻³ K⁻⁴]",
      option_b: "[M¹ L² T⁻³ K⁻⁴]",
      option_c: "[M¹ L¹ T⁻² K⁻⁴]",
      option_d: "[M⁰ L² T⁻³ K⁻⁴]",
      correct_option: "A",
      explanation: "[σ] = [Power] / ([Area] [T]⁴) = [M L² T⁻³] / ([L²] [K⁴]) = [M¹ L⁰ T⁻³ K⁻⁴].\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 671,
    originalQuestion: {
      question: "Compound slab consists two different materials equal thicknesses thermal conductivities K and 2K respectively. Equivalent thermal conductivity slab? [AIPMT 2003]",
      option_a: "3K/2",
      option_b: "2K",
      option_c: "3K",
      option_d: "4K/3",
      correct_option: "D",
      explanation: "Let each slab have thickness d and cross-sectional area A.\nThe two slabs are placed in series combination, so the total thickness of the compound slab is:\nd_total = d + d = 2d\nThermal resistances in series add algebraically:\nR_eq = R₁ + R₂\nThermal resistance of a slab is R = d / (K · A).\n2d / (K_eq · A) = d / (K · A) + d / (2K · A)\nDividing throughout by d / A:\n2 / K_eq = 1 / K + 1 / (2K) = (2 + 1) / (2K) = 3 / (2K)\nInverting and solving for K_eq:\nK_eq / 2 = 2K / 3\nK_eq = 4K / 3\nTherefore, Option (D) is the correct answer."
    },
    similarQuestion: {
      question: "Two slabs of equal thickness and cross-sectional area have thermal conductivities K₁ and K₂. When joined in series, what is their effective thermal conductivity?",
      option_a: "2 K₁ K₂ / (K₁ + K₂)",
      option_b: "(K₁ + K₂) / 2",
      option_c: "K₁ K₂ / (K₁ + K₂)",
      option_d: "√(K₁ K₂)",
      correct_option: "A",
      explanation: "For two slabs in series of equal thickness d: 2d / (K_eq A) = d / (K₁ A) + d / (K₂ A) ⇒ 2 / K_eq = (K₁ + K₂) / (K₁ K₂) ⇒ K_eq = 2 K₁ K₂ / (K₁ + K₂).\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 670,
    originalQuestion: {
      question: "If λm denotes wavelength at which radiation emitted by black body at temperature T K maximum then? [AIPMT 2004]",
      option_a: "λm∝T⁴",
      option_b: "λm independent T",
      option_c: "λm∝T",
      option_d: "λm∝T⁻¹",
      correct_option: "D",
      explanation: "According to Wien's displacement law, the wavelength λ_m at which a black body emits radiation of maximum intensity is inversely proportional to its absolute temperature T:\nλ_m · T = constant = b\nRearranging:\nλ_m = b / T = b · T⁻¹\nThus, λ_m ∝ T⁻¹.\nAs the temperature of the black body increases, the peak of its radiation spectrum shifts (is displaced) toward shorter wavelengths (higher frequencies).\nTherefore, Option (D) is the correct answer."
    },
    similarQuestion: {
      question: "According to Wien's displacement law, if the absolute temperature of a radiating black body is tripled, its peak emission wavelength becomes:",
      option_a: "One-third (λ_m / 3)",
      option_b: "Three times (3 λ_m)",
      option_c: "Nine times (9 λ_m)",
      option_d: "One-ninth (λ_m / 9)",
      correct_option: "A",
      explanation: "Since λ_m ∝ 1/T, tripling the temperature reduces the wavelength of maximum emission to 1/3 of its original value.\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 669,
    originalQuestion: {
      question: "Which following rods each made same material and ends maintained same temperature difference will conduct most heat? Rods have radius r and length l as specified? [AIPMT 2005]",
      option_a: "r=r0,l=l0",
      option_b: "r=2r0,l=l0",
      option_c: "r=r0,l=2l0",
      option_d: "r=2r0,l=2l0",
      correct_option: "B",
      explanation: "The rate of heat conduction through a cylindrical rod of thermal conductivity K, radius r, and length l under temperature difference ΔT is:\ndQ/dt = (K · A · ΔT) / l = (K · π r² · ΔT) / l\nFor rods made of the same material (K = constant) under the same temperature difference ΔT:\ndQ/dt ∝ r² / l\nLet us evaluate the ratio r² / l for each option in units of r₀² / l₀:\nOption A: r₀² / l₀ = 1\nOption B: (2r₀)² / l₀ = 4 r₀² / l₀ = 4\nOption C: r₀² / (2l₀) = 0.5 r₀² / l₀ = 0.5\nOption D: (2r₀)² / (2l₀) = 4 r₀² / (2l₀) = 2 r₀² / l₀ = 2\nThe ratio r² / l is maximum for Option B (value = 4), which conducts the most heat per unit time.\nTherefore, Option (B) is the correct answer."
    },
    similarQuestion: {
      question: "Which of the following cylindrical rods of the same material will have the minimum rate of heat conduction under a given temperature difference across its ends?",
      option_a: "r = r₀, l = 2l₀",
      option_b: "r = 2r₀, l = l₀",
      option_c: "r = r₀, l = l₀",
      option_d: "r = 2r₀, l = 2l₀",
      correct_option: "A",
      explanation: "Rate of conduction ∝ r² / l. For r = r₀, l = 2l₀, the factor is 1/2 = 0.5, which is the smallest among all options.\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 668,
    originalQuestion: {
      question: "Black body at 1227°C emits radiation maximum intensity at wavelength 5000 Å. If temperature body increased by 1000°C maximum intensity will be observed at? [AIPMT 2006]",
      option_a: "3000 Å",
      option_b: "4000 Å",
      option_c: "5000 Å",
      option_d: "6000 Å",
      correct_option: "A",
      explanation: "Using Wien's displacement law:\nλ_m · T = constant\nλ_m1 · T₁ = λ_m2 · T₂\nInitial state:\nTemperature T₁ = 1227°C = 1227 + 273 = 1500 K\nPeak wavelength λ_m1 = 5000 Å\nFinal state:\nTemperature is increased by 1000°C:\nT₂ = T₁ + 1000 = 1500 K + 1000 K = 2500 K\nSolving for λ_m2:\nλ_m2 = λ_m1 · (T₁ / T₂) = (5000 Å) × (1500 K / 2500 K) = 5000 × (3 / 5) = 3000 Å\nTherefore, Option (A) is the correct answer."
    },
    similarQuestion: {
      question: "A black body at 2000 K emits peak radiation at 1500 nm. If its temperature is raised to 3000 K, what is the new peak wavelength?",
      option_a: "1000 nm",
      option_b: "750 nm",
      option_c: "2250 nm",
      option_d: "500 nm",
      correct_option: "A",
      explanation: "λ₂ = λ₁ · (T₁ / T₂) = 1500 nm × (2000 / 3000) = 1500 × (2/3) = 1000 nm.\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 667,
    originalQuestion: {
      question: "Black body at 727°C emits energy rate proportional to? [AIPMT 2007]",
      option_a: "(1000)⁴",
      option_b: "(1000)²",
      option_c: "(727)⁴",
      option_d: "(727)²",
      correct_option: "A",
      explanation: "According to the Stefan-Boltzmann law, the total rate of radiant energy emitted per unit surface area by a black body is directly proportional to the fourth power of its absolute thermodynamic temperature T (measured in kelvin):\nE = σ · T⁴\nGiven temperature in Celsius:\nt = 727°C\nConverting to the absolute temperature scale (kelvin):\nT = t + 273 = 727 + 273 = 1000 K\nTherefore, the rate of energy emission is proportional to T⁴ = (1000)⁴.\nTherefore, Option (A) is the correct answer."
    },
    similarQuestion: {
      question: "A black body is maintained at 27°C. The rate of total energy emission from its surface is proportional to:",
      option_a: "(300)⁴",
      option_b: "(27)⁴",
      option_c: "(300)²",
      option_d: "(27)²",
      correct_option: "A",
      explanation: "Absolute temperature T = 27 + 273 = 300 K. By Stefan's law, emissive power E ∝ T⁴ = (300)⁴.\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 666,
    originalQuestion: {
      question: "Assuming Sun has spherical outer surface radius r radiating like black body temperature t°C power received by unit surface normal to incident rays at distance R from centre Sun is? [AIPMT 2007]",
      option_a: "4πR²σr²(t+273)⁴",
      option_b: "16π²r²σt⁴/R²",
      option_c: "σr²(t+273)⁴/R²",
      option_d: "4πr²σt⁴/R²",
      correct_option: "C",
      explanation: "The Sun is a spherical black body of radius r and absolute temperature T = (t + 273) K.\n1) Total surface area of the Sun is A = 4π r².\nBy Stefan's law, the total radiant power (luminosity) emitted by the Sun into space is:\nL = σ · A · T⁴ = σ · (4π r²) · (t + 273)⁴\n2) This total radiant power spreads uniformly over an imaginary concentric sphere of radius R (distance from the centre of the Sun):\nArea of sphere of radius R is A_sphere = 4π R².\n3) The radiant power received per unit area normal to the rays (solar constant/flux) at distance R is:\nS = L / A_sphere = [4π σ r² (t + 273)⁴] / [4π R²] = σ r² (t + 273)⁴ / R²\nTherefore, Option (C) is the correct answer."
    },
    similarQuestion: {
      question: "If a star of radius R_s and surface temperature T radiates as a black body, what is the radiant energy flux received at distance d from the star?",
      option_a: "σ R_s² T⁴ / d²",
      option_b: "4π σ R_s² T⁴ / d²",
      option_c: "σ R_s T⁴ / d",
      option_d: "σ R_s⁴ T⁴ / d²",
      correct_option: "A",
      explanation: "Total power L = 4π R_s² σ T⁴. Flux at distance d is F = L / (4π d²) = σ R_s² T⁴ / d².\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 665,
    originalQuestion: {
      question: "On new linear temperature scale called W scale freezing and boiling points water are 39°W and 239°W respectively. What temperature on new scale corresponds to 39°C? [AIPMT 2008]",
      option_a: "200°W",
      option_b: "139°W",
      option_c: "78°W",
      option_d: "117°W",
      correct_option: "D",
      explanation: "For any linear temperature scale, the reading is related to the Celsius scale by the general linear relation:\n(Reading − Lower Fixed Point) / (Upper Fixed Point − Lower Fixed Point) = (C − 0) / (100 − 0)\nFor the W scale:\nLower Fixed Point (freezing point of water) = 39°W\nUpper Fixed Point (boiling point of water) = 239°W\nNumber of divisions on W scale = 239 − 39 = 200°W\nSetting up the proportionality:\n(W − 39) / (239 − 39) = C / 100\n(W − 39) / 200 = C / 100\nW − 39 = 2 · C\nFor C = 39°C:\nW − 39 = 2 × 39 = 78\nW = 78 + 39 = 117°W\nTherefore, Option (D) is the correct answer."
    },
    similarQuestion: {
      question: "On a hypothetical temperature scale X, the freezing point of water is −10°X and the boiling point is 90°X. What is the reading on this scale corresponding to 50°C?",
      option_a: "40°X",
      option_b: "50°X",
      option_c: "35°X",
      option_d: "45°X",
      correct_option: "A",
      explanation: "(X − (−10)) / (90 − (−10)) = C / 100 ⇒ (X + 10) / 100 = 50 / 100 ⇒ X + 10 = 50 ⇒ X = 40°X.\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 664,
    originalQuestion: {
      question: "Two ends rod length L uniform cross-sectional area A kept temperatures T1 and T2 T1>T2. Rate heat transfer through rod steady state? [AIPMT 2009]",
      option_a: "dQ/dt=kLA(T1-T2)",
      option_b: "dQ/dt=k(T1-T2)/(LA)",
      option_c: "dQ/dt=kA(T1-T2)/L",
      option_d: "dQ/dt=kL(T1-T2)/A",
      correct_option: "C",
      explanation: "According to Fourier's law of thermal conduction, in steady state, the rate of heat flow dQ/dt through a homogeneous rod of length L and cross-sectional area A whose ends are maintained at constant temperatures T₁ and T₂ (with T₁ > T₂) is:\n1) Directly proportional to the cross-sectional area A.\n2) Directly proportional to the temperature difference (T₁ − T₂).\n3) Inversely proportional to the length of the rod L.\nCombining these relations:\ndQ/dt = k · A · (T₁ − T₂) / L\nwhere k is the thermal conductivity of the material of the rod.\nTherefore, Option (C) is the correct answer."
    },
    similarQuestion: {
      question: "What is the thermal resistance of a conducting bar of length L, cross-sectional area A, and thermal conductivity K?",
      option_a: "L / (K A)",
      option_b: "K A / L",
      option_c: "K L / A",
      option_d: "A / (K L)",
      correct_option: "A",
      explanation: "Thermal current is H = ΔT / R_th = K A ΔT / L. Comparing with Ohm's law, R_th = L / (K A).\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 663,
    originalQuestion: {
      question: "Black body at 227°C radiates heat rate 7 cal cm⁻² s⁻¹. At temperature 727°C rate heat radiated same units will be? [AIPMT 2009]",
      option_a: "50",
      option_b: "112",
      option_c: "80",
      option_d: "60",
      correct_option: "B",
      explanation: "According to Stefan-Boltzmann law, the rate of heat radiated per unit surface area of a black body is proportional to the fourth power of its absolute thermodynamic temperature:\nE = σ · T⁴\nInitial temperature:\nT₁ = 227°C = 227 + 273 = 500 K\nInitial rate E₁ = 7 cal cm⁻² s⁻¹\nFinal temperature:\nT₂ = 727°C = 727 + 273 = 1000 K\nTaking the ratio of emissive powers:\nE₂ / E₁ = (T₂ / T₁)⁴ = (1000 K / 500 K)⁴ = (2)⁴ = 16\nSolving for E₂:\nE₂ = 16 × E₁ = 16 × 7 cal cm⁻² s⁻¹ = 112 cal cm⁻² s⁻¹\nTherefore, Option (B) is the correct answer."
    },
    similarQuestion: {
      question: "A black body radiates heat at a rate of 10 W/m² at 200 K. What will be its rate of radiation at 400 K?",
      option_a: "160 W/m²",
      option_b: "40 W/m²",
      option_c: "80 W/m²",
      option_d: "320 W/m²",
      correct_option: "A",
      explanation: "E₂ = E₁ × (T₂ / T₁)⁴ = 10 × (400 / 200)⁴ = 10 × 2⁴ = 10 × 16 = 160 W/m².\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 662,
    originalQuestion: {
      question: "Assuming Sun has spherical outer surface radius r radiating like black body temperature t°C power received by unit surface normal to incident rays at distance R from centre Sun is? [AIPMT 2010 Prelims]",
      option_a: "σr²(t+273)⁴/R²",
      option_b: "16π²r²σt⁴/R²",
      option_c: "4πR²σr²(t+273)⁴",
      option_d: "4πr²σt⁴/R²",
      correct_option: "A",
      explanation: "Surface temperature of the Sun in kelvin is T = (t + 273) K.\nRadius of the Sun = r.\nTotal power emitted by the Sun (luminosity):\nL = (Surface area) × σ T⁴ = (4π r²) · σ · (t + 273)⁴\nAt a radial distance R from the centre of the Sun, this total energy passes normally through a sphere of area 4π R².\nThe power received per unit surface area normal to the rays is:\nI = L / (4π R²) = [4π r² σ (t + 273)⁴] / [4π R²] = σ r² (t + 273)⁴ / R²\nTherefore, Option (A) is the correct answer."
    },
    similarQuestion: {
      question: "If the radius of the Sun is doubled while its surface temperature remains unchanged, by what factor does the solar constant at the Earth increase?",
      option_a: "4",
      option_b: "2",
      option_c: "16",
      option_d: "8",
      correct_option: "A",
      explanation: "Solar constant S ∝ r² / R². Doubling the solar radius r increases the flux by a factor of 2² = 4.\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 661,
    originalQuestion: {
      question: "Total radiant energy per unit area normal to direction incidence received at distance R from centre star radius r whose outer surface radiates as black body temperature T K is? [AIPMT 2010 Prelims]",
      option_a: "σr²T⁴/R²",
      option_b: "4πR²σr²T⁴",
      option_c: "σr²T⁴/R⁵",
      option_d: "4πσr²T⁴/R²",
      correct_option: "A",
      explanation: "A star of radius r radiating as a black body at absolute temperature T has a total surface area of 4π r².\nBy Stefan's law, the total radiant power emitted by the star is:\nL = 4π r² · σ · T⁴\nAt distance R from the centre of the star, this radiant power is distributed uniformly over the surface of a sphere of area 4π R².\nThe radiant energy received per unit area per unit time (radiant flux) normal to the incidence is:\nFlux = L / (4π R²) = (4π r² σ T⁴) / (4π R²) = σ r² T⁴ / R²\nTherefore, Option (A) is the correct answer."
    },
    similarQuestion: {
      question: "Two stars have radii in the ratio 1 : 2 and temperatures in the ratio 2 : 1. What is the ratio of radiant energy flux received from them at equal distances?",
      option_a: "4 : 1",
      option_b: "1 : 1",
      option_c: "2 : 1",
      option_d: "16 : 1",
      correct_option: "A",
      explanation: "Flux F ∝ r² T⁴. F₁ / F₂ = (r₁ / r₂)² × (T₁ / T₂)⁴ = (1/2)² × (2/1)⁴ = (1/4) × 16 = 4 : 1.\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 660,
    originalQuestion: {
      question: "Cylindrical metallic rod thermal contact two heat reservoirs at ends conducts amount heat Q in time t. Rod melted and its material formed into rod half original radius. When placed thermal contact same reservoirs for time t amount heat conducted by new rod? [AIPMT 2010 Prelims]",
      option_a: "Q/4",
      option_b: "Q/16",
      option_c: "2Q",
      option_d: "Q/2",
      correct_option: "B",
      explanation: "When the metallic rod is melted and recast into a new rod, its total mass and volume V remain constant:\nV = A · L = π r² · L = constant\nIf the new radius is half the original radius (r' = r / 2):\nNew cross-sectional area A' = π (r')² = π (r/2)² = A / 4\nSince volume is conserved (A' L' = A L):\n(A / 4) · L' = A · L ⇒ L' = 4L (length quadruples)\nThe rate of heat conduction is given by Fourier's law:\nQ / t = (K · A · ΔT) / L ∝ A / L\nFor the recast rod under the same temperature difference ΔT and time t:\nQ' = Q · [(A'/A) / (L'/L)] = Q · [(1/4) / 4] = Q / 16\nTherefore, the amount of heat conducted by the new rod is Q / 16.\nTherefore, Option (B) is the correct answer."
    },
    similarQuestion: {
      question: "A uniform metal rod conducting heat Q in time t is melted and recapped into a rod of three times its original length. Under the same thermal conditions, how much heat does the new rod conduct in time t?",
      option_a: "Q / 9",
      option_b: "Q / 3",
      option_c: "3Q",
      option_d: "Q / 27",
      correct_option: "A",
      explanation: "Volume V = A L is constant. If L' = 3L, then A' = A / 3. Heat conducted Q ∝ A / L ∝ (1/3) / 3 = 1/9. Thus Q' = Q / 9.\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 659,
    originalQuestion: {
      question: "If radius star R and it acts as black body what would be its temperature if rate energy production Q? [AIPMT 2012 Prelims]",
      option_a: "Q/(4πR²σ)",
      option_b: "(Q/(4πR²σ))⁻¹ᐟ²",
      option_c: "(σ/(4πR²Q))¹ᐟ⁴",
      option_d: "(Q/(4πR²σ))¹ᐟ⁴",
      correct_option: "D",
      explanation: "For a spherical star of radius R radiating as an ideal black body at surface absolute temperature T:\nThe total surface area of the star is A = 4π R².\nAccording to Stefan-Boltzmann law, the total rate of energy emission (power) Q is:\nQ = σ · A · T⁴ = 4π R² · σ · T⁴\nRearranging this equation to solve for T⁴:\nT⁴ = Q / (4π R² σ)\nTaking the fourth root of both sides:\nT = [Q / (4π R² σ)]^(1/4)\nTherefore, Option (D) is the correct answer."
    },
    similarQuestion: {
      question: "A spherical black body of radius r radiates power P. What is its surface temperature in terms of Stefan's constant σ?",
      option_a: "[P / (4π r² σ)]^(1/4)",
      option_b: "[P / (4π r² σ)]^(1/2)",
      option_c: "[P / (σ r²)]^(1/4)",
      option_d: "[4π r² P / σ]^(1/4)",
      correct_option: "A",
      explanation: "P = 4π r² σ T⁴ ⇒ T = [P / (4π r² σ)]^(1/4).\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 658,
    originalQuestion: {
      question: "Stone slab area 0.36 m² thickness 0.1m exposed lower surface to steam at 100°C. Block ice at 0°C rests upper surface. In one hour 4.8kg ice melts. Thermal conductivity slab latent heat fusion ice 3.36×10⁵ J kg⁻¹? [AIPMT 2012 Mains]",
      option_a: "1.24 J m⁻¹ s⁻¹ °C⁻¹",
      option_b: "1.29 J m⁻¹ s⁻¹ °C⁻¹",
      option_c: "2.05 J m⁻¹ s⁻¹ °C⁻¹",
      option_d: "1.02 J m⁻¹ s⁻¹ °C⁻¹",
      correct_option: "A",
      explanation: "Given parameters:\nArea of slab A = 0.36 m²\nThickness of slab d = 0.1 m\nTemperature difference ΔT = 100°C − 0°C = 100°C\nTime t = 1 hour = 3600 s\nMass of ice melted m = 4.8 kg\nLatent heat of fusion of ice L_f = 3.36 × 10⁵ J kg⁻¹\n1) Total heat conducted through the slab to melt the ice is:\nQ = m · L_f = 4.8 kg × (3.36 × 10⁵ J kg⁻¹) = 16.128 × 10⁵ J = 1.6128 × 10⁶ J\n2) Rate of heat conduction through the slab by Fourier's law:\nQ = (K · A · ΔT · t) / d\nSolving for thermal conductivity K:\nK = (Q · d) / (A · ΔT · t)\nSubstitute the numerical values:\nK = (1.6128 × 10⁶ J × 0.1 m) / (0.36 m² × 100°C × 3600 s)\nK = 161280 / (36 × 3600) = 161280 / 129600 = 1.244 J m⁻¹ s⁻¹ °C⁻¹ ≈ 1.24 J m⁻¹ s⁻¹ °C⁻¹\nTherefore, Option (A) is the correct answer."
    },
    similarQuestion: {
      question: "A metal plate of area 0.5 m² and thickness 0.05 m has its two faces maintained at 100°C and 0°C. If 2 kg of ice melts at the colder face in 10 minutes, what is the thermal conductivity of the metal? (L_f = 3.36 × 10⁵ J/kg)",
      option_a: "1.12 J m⁻¹ s⁻¹ °C⁻¹",
      option_b: "2.24 J m⁻¹ s⁻¹ °C⁻¹",
      option_c: "0.56 J m⁻¹ s⁻¹ °C⁻¹",
      option_d: "3.36 J m⁻¹ s⁻¹ °C⁻¹",
      correct_option: "A",
      explanation: "Q = m L_f = 2 × 3.36 × 10⁵ = 6.72 × 10⁵ J. t = 600 s.\nK = (Q d) / (A ΔT t) = (6.72 × 10⁵ × 0.05) / (0.5 × 100 × 600) = 33600 / 30000 = 1.12 J m⁻¹ s⁻¹ °C⁻¹.\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 657,
    originalQuestion: {
      question: "Molar specific heats ideal gas at constant pressure and constant volume denoted Cp and Cv respectively. If γ=Cp/Cv and R universal gas constant then Cv equal to? [NEET 2013]",
      option_a: "R/(γ-1)",
      option_b: "γR",
      option_c: "(1-γ)/(1+γ)",
      option_d: "R/(γ-1)",
      correct_option: "A",
      explanation: "By Mayer's relation for an ideal gas:\nC_p − C_v = R\nGiven the adiabatic ratio:\nγ = C_p / C_v ⇒ C_p = γ · C_v\nSubstituting C_p into Mayer's relation:\nγ · C_v − C_v = R\nC_v (γ − 1) = R\nSolving for C_v:\nC_v = R / (γ − 1)\n(Similarly, C_p = γ R / (γ − 1)).\nTherefore, Option (A) is the correct answer."
    },
    similarQuestion: {
      question: "For a gas having adiabatic index γ, what is the molar heat capacity at constant pressure C_p in terms of R and γ?",
      option_a: "γ R / (γ − 1)",
      option_b: "R / (γ − 1)",
      option_c: "(γ − 1) R",
      option_d: "R / γ",
      correct_option: "A",
      explanation: "Since C_p = γ C_v and C_v = R / (γ − 1), we have C_p = γ R / (γ − 1).\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 656,
    originalQuestion: {
      question: "Following four wires same material. Which will have largest extension when same tension applied? [NEET 2013]",
      option_a: "Length=200cm diameter=2mm",
      option_b: "Length=300cm diameter=3mm",
      option_c: "Length=50cm diameter=0.5mm",
      option_d: "Length=100cm diameter=1mm",
      correct_option: "C",
      explanation: "The extension ΔL of a wire of length L, cross-sectional area A = π d² / 4, and Young's modulus Y under tension F is given by Hooke's law:\nΔL = (F · L) / (A · Y) = (4 F L) / (π d² Y)\nSince all four wires are made of the same material (Y = constant) and subjected to the same tension F:\nΔL ∝ L / d²\nLet us calculate the ratio L / d² for each option (converting length to cm and diameter to mm):\nOption A: L = 200 cm, d = 2 mm ⇒ L / d² = 200 / 2² = 200 / 4 = 50\nOption B: L = 300 cm, d = 3 mm ⇒ L / d² = 300 / 3² = 300 / 9 = 33.33\nOption C: L = 50 cm, d = 0.5 mm ⇒ L / d² = 50 / (0.5)² = 50 / 0.25 = 200\nOption D: L = 100 cm, d = 1 mm ⇒ L / d² = 100 / 1² = 100\nThe value of L / d² is greatest for Option C (value = 200).\nTherefore, Option (C) produces the largest extension.\nTherefore, Option (C) is the correct answer."
    },
    similarQuestion: {
      question: "Four copper wires have dimensions (length L, radius r) as given below. Which wire will have the minimum elongation under a given load?",
      option_a: "L = 50 cm, r = 2 mm",
      option_b: "L = 100 cm, r = 1 mm",
      option_c: "L = 200 cm, r = 2 mm",
      option_d: "L = 50 cm, r = 0.5 mm",
      correct_option: "A",
      explanation: "Elongation ΔL ∝ L / r².\nFor Option A: 50 / 4 = 12.5 (smallest value).\nThus, wire A experiences the minimum elongation.\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 655,
    originalQuestion: {
      question: "Wettability surface by liquid depends primarily on? [NEET 2013]",
      option_a: "Density",
      option_b: "Angle contact between surface and liquid",
      option_c: "Viscosity",
      option_d: "Surface tension",
      correct_option: "B",
      explanation: "Wettability describes the ability of a liquid to maintain contact with and spread across a solid surface.\nIt is governed by the balance of adhesive forces (between liquid and solid molecules) and cohesive forces (between liquid molecules themselves), which uniquely determines the angle of contact θ at the three-phase contact line:\n1) When the angle of contact is acute (0° ≤ θ < 90°), adhesive forces dominate, and the liquid wets the solid surface (e.g., pure water on clean glass, θ ≈ 0°).\n2) When the angle of contact is obtuse (90° < θ ≤ 180°), cohesive forces dominate, and the liquid does not wet the surface (e.g., mercury on glass, θ ≈ 138°).\nTherefore, the wettability of a surface by a liquid depends primarily on the angle of contact between the surface and the liquid.\nTherefore, Option (B) is the correct answer."
    },
    similarQuestion: {
      question: "A liquid forms an obtuse angle of contact (θ > 90°) with a clean solid surface. Which of the following is true?",
      option_a: "The liquid does not wet the surface and forms a convex meniscus in a capillary tube",
      option_b: "The liquid completely wets the surface and rises in a capillary tube",
      option_c: "Adhesive forces are greater than cohesive forces",
      option_d: "The angle of contact becomes zero with increased temperature",
      correct_option: "A",
      explanation: "When θ > 90°, cohesive forces dominate adhesive forces, so the liquid does not wet the solid, and in a capillary tube, it gets depressed with a convex meniscus.\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 654,
    originalQuestion: {
      question: "Piece iron heated in flame. It first becomes dull red then reddish yellow and finally white hot. Correct explanation for this observation based on? [NEET 2013]",
      option_a: "Kirchhoff's law",
      option_b: "Newton's law cooling",
      option_c: "Stefan's law",
      option_d: "Wien's displacement law",
      correct_option: "D",
      explanation: "According to Wien's displacement law:\nλ_m · T = b = constant\nAs the temperature T of the heated iron piece progressively increases:\nThe wavelength λ_m at which maximum radiation intensity is emitted shifts continuously towards shorter wavelengths (higher frequencies and higher photon energies):\n1) At lower temperatures (around 500°C–700°C), peak emission lies in the infrared, with only the long-wavelength tail extending into the visible spectrum, making the iron appear dull red.\n2) At higher temperatures (around 900°C–1100°C), the peak shifts into the yellow-orange region, appearing reddish-yellow.\n3) At very high temperatures (>1200°C), the emission covers all visible wavelengths from red to violet, making the body appear white hot.\nThis progressive shift in perceived colour with rising temperature is explained directly by Wien's displacement law.\nTherefore, Option (D) is the correct answer."
    },
    similarQuestion: {
      question: "The temperature of an incandescent lamp filament is increased. The color of the emitted light changes from yellow to white because of:",
      option_a: "Wien's displacement law",
      option_b: "Stefan's law",
      option_c: "Fourier's law",
      option_d: "Newton's law of cooling",
      correct_option: "A",
      explanation: "As temperature rises, the peak emission wavelength λ_max shifts toward shorter wavelengths (blue end) in accordance with Wien's displacement law (λ_max T = constant), blending all visible colors into white light.\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 653,
    originalQuestion: {
      question: "Density water at 20°C 998 kg m⁻³ and at 40°C 992 kg m⁻³. Coefficient volume expansion water? [NEET 2013 Karnataka]",
      option_a: "3×10⁻⁴ °C⁻¹",
      option_b: "2×10⁻⁴ °C⁻¹",
      option_c: "6×10⁻⁴ °C⁻¹",
      option_d: "10×10⁻⁴ °C⁻¹",
      correct_option: "A",
      explanation: "The variation of density ρ with temperature change ΔT is given by:\nρ₂ = ρ₁ / (1 + γ ΔT) ≈ ρ₁ (1 − γ ΔT)\nRearranging for the coefficient of volume expansion γ:\nγ = (ρ₁ − ρ₂) / (ρ₁ · ΔT)\nGiven:\nρ₁ = 998 kg m⁻³ at T₁ = 20°C\nρ₂ = 992 kg m⁻³ at T₂ = 40°C\nTemperature difference ΔT = 40°C − 20°C = 20°C\nSubstitute the values:\nγ = (998 − 992) / (998 × 20) = 6 / (19960) ≈ 6 / 20000 = 3 × 10⁻⁴ °C⁻¹\nTherefore, Option (A) is the correct answer."
    },
    similarQuestion: {
      question: "A liquid has density 1000 kg/m³ at 0°C and 980 kg/m³ at 100°C. What is its coefficient of volume expansion?",
      option_a: "2.0 × 10⁻⁴ °C⁻¹",
      option_b: "1.0 × 10⁻⁴ °C⁻¹",
      option_c: "4.0 × 10⁻⁴ °C⁻¹",
      option_d: "5.0 × 10⁻⁵ °C⁻¹",
      correct_option: "A",
      explanation: "γ = (ρ₀ − ρ_t) / (ρ₀ · ΔT) = (1000 − 980) / (1000 × 100) = 20 / 100000 = 2 × 10⁻⁴ °C⁻¹.\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 652,
    originalQuestion: {
      question: "Fluid is streamline flow through horizontal pipe variable cross-sectional area. Which statement correct? [NEET 2013 Karnataka]",
      option_a: "Velocity maximum at narrowest part pipe and pressure maximum at widest part",
      option_b: "Velocity and pressure both maximum at narrowest part",
      option_c: "Velocity and pressure both maximum at widest part",
      option_d: "Velocity minimum at narrowest part and pressure minimum at widest part",
      correct_option: "A",
      explanation: "Let us apply fluid dynamics principles to streamline flow in a horizontal pipe:\n1) By the equation of continuity:\nA · v = constant\nWhere the cross-sectional area A is smallest (narrowest part of the pipe), the flow velocity v must be maximum.\nWhere A is largest (widest part of the pipe), the velocity v is minimum.\n2) By Bernoulli's equation for horizontal flow (constant height h):\nP + (1/2) ρ v² = constant\nWhere velocity v is maximum (at the narrowest part), the kinetic energy density (1/2) ρ v² is maximum, so the static pressure P must be minimum.\nWhere velocity v is minimum (at the widest part), the static pressure P must be maximum.\nTherefore, the velocity is maximum at the narrowest part and the pressure is maximum at the widest part.\nTherefore, Option (A) is the correct answer."
    },
    similarQuestion: {
      question: "According to Bernoulli's theorem, in a horizontal constriction (Venturi tube), as fluid flows into a narrow throat:",
      option_a: "Speed increases and pressure decreases",
      option_b: "Speed decreases and pressure increases",
      option_c: "Both speed and pressure increase",
      option_d: "Both speed and pressure decrease",
      correct_option: "A",
      explanation: "By continuity A₁v₁ = A₂v₂, narrowing increases speed (v₂ > v₁). By Bernoulli's equation P + (1/2)ρv² = constant, higher speed results in lower static pressure.\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 651,
    originalQuestion: {
      question: "Two metal rods 1 and 2 same length have same temperature difference between ends. Their thermal conductivities K1 and K2 and cross-sectional areas A1 and A2 respectively. If rate heat conduction in rod1 four times that in rod2 then? [NEET 2013 Karnataka]",
      option_a: "K1A1=4K2A2",
      option_b: "K1A1=2K2A2",
      option_c: "4K1A1=K2A2",
      option_d: "K1A1=K2A2",
      correct_option: "A",
      explanation: "The rate of heat conduction through a rod of length L, cross-sectional area A, and thermal conductivity K under temperature difference ΔT is:\nQ = (K · A · ΔT) / L\nFor rod 1: Q₁ = (K₁ · A₁ · ΔT) / L\nFor rod 2: Q₂ = (K₂ · A₂ · ΔT) / L\nGiven that the length L and temperature difference ΔT are identical for both rods, and Q₁ = 4 Q₂:\n(K₁ · A₁ · ΔT) / L = 4 · [(K₂ · A₂ · ΔT) / L]\nCancelling (ΔT / L) from both sides:\nK₁ A₁ = 4 K₂ A₂\nTherefore, Option (A) is the correct answer."
    },
    similarQuestion: {
      question: "Two rods of equal length under the same temperature difference have thermal conductivities and areas such that K₁ A₁ = 9 K₂ A₂. What is the ratio of their heat currents H₁ / H₂?",
      option_a: "9 : 1",
      option_b: "3 : 1",
      option_c: "1 : 9",
      option_d: "1 : 3",
      correct_option: "A",
      explanation: "H₁ / H₂ = (K₁ A₁) / (K₂ A₂) = 9 / 1 = 9 : 1.\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 650,
    originalQuestion: {
      question: "If ratios diameters lengths and Young's moduli steel and copper wires shown figure are p,q and s respectively then corresponding ratio increase lengths? [NEET 2013 Karnataka]",
      option_a: "5q/(7sp²)",
      option_b: "7q/(5sp²)",
      option_c: "2q/(5sp)",
      option_d: "7q/(5sp)",
      correct_option: "B",
      explanation: "In the standard configuration with two masses suspended:\nLet suspended masses be m₁ = 2m and m₂ = 5m (or 2 kg and 3 kg, giving tensions T_steel = (2 + 5)g = 7g and T_copper = 5g):\nT_steel / T_copper = 7 / 5\nElongation of a wire under tension T is:\nΔL = (T · L) / (A · Y) = (4 T L) / (π d² Y)\nTaking the ratio of elongations for steel (s) and copper (c):\nΔL_s / ΔL_c = (T_s / T_c) · (L_s / L_c) · (d_c / d_s)² · (Y_c / Y_s)\nGiven ratios:\nd_s / d_c = p ⇒ d_c / d_s = 1 / p\nL_s / L_c = q\nY_s / Y_c = s ⇒ Y_c / Y_s = 1 / s\nSubstituting these into the elongation ratio:\nΔL_s / ΔL_c = (7 / 5) · q · (1 / p)² · (1 / s) = (7q) / (5 s p²)\nTherefore, Option (B) is the correct answer."
    },
    similarQuestion: {
      question: "Two wires A and B support loads such that T_A / T_B = 3 / 2. If L_A / L_B = 2, d_A / d_B = 2, and Y_A / Y_B = 1, what is the ratio of elongation ΔL_A / ΔL_B?",
      option_a: "3 / 4",
      option_b: "3 / 2",
      option_c: "4 / 3",
      option_d: "6",
      correct_option: "A",
      explanation: "ΔL_A / ΔL_B = (T_A / T_B) · (L_A / L_B) · (d_B / d_A)² · (Y_B / Y_A) = (3/2) × 2 × (1/2)² × 1 = 3 × (1/4) = 3/4.\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 649,
    originalQuestion: {
      question: "Certain quantity water cools from 70°C to 60°C in first 5 minutes and to 54°C in next 5 minutes. Temperature surroundings? [AIPMT 2014]",
      option_a: "45°C",
      option_b: "20°C",
      option_c: "42°C",
      option_d: "10°C",
      correct_option: "A",
      explanation: "According to Newton's law of cooling:\n(θ₁ − θ₂) / t = K · [(θ₁ + θ₂) / 2 − θ₀]\nwhere θ₀ is the temperature of the surroundings.\n1) First 5-minute interval (from 70°C to 60°C in t = 5 min):\n(70 − 60) / 5 = K · [(70 + 60) / 2 − θ₀]\n10 / 5 = K · (65 − θ₀)\n2 = K · (65 − θ₀)  --- (Equation 1)\n2) Second 5-minute interval (from 60°C to 54°C in t = 5 min):\n(60 − 54) / 5 = K · [(60 + 54) / 2 − θ₀]\n6 / 5 = 1.2 = K · (57 − θ₀)  --- (Equation 2)\n3) Dividing Equation 1 by Equation 2:\n2 / 1.2 = (65 − θ₀) / (57 − θ₀)\n5 / 3 = (65 − θ₀) / (57 − θ₀)\nCross-multiplying:\n5 (57 − θ₀) = 3 (65 − θ₀)\n285 − 5 θ₀ = 195 − 3 θ₀\n285 − 195 = 5 θ₀ − 3 θ₀\n90 = 2 θ₀\nθ₀ = 45°C\nTherefore, the temperature of the surroundings is 45°C.\nTherefore, Option (A) is the correct answer."
    },
    similarQuestion: {
      question: "A liquid cools from 80°C to 70°C in 5 minutes, and from 70°C to 62°C in the next 5 minutes. What is the ambient temperature of the surroundings?",
      option_a: "30°C",
      option_b: "25°C",
      option_c: "20°C",
      option_d: "40°C",
      correct_option: "A",
      explanation: "(80 − 70)/5 = K (75 − θ₀) ⇒ 2 = K(75 − θ₀).\n(70 − 62)/5 = K (66 − θ₀) ⇒ 1.6 = K(66 − θ₀).\nRatio 2 / 1.6 = 5 / 4 = (75 − θ₀) / (66 − θ₀) ⇒ 5(66 − θ₀) = 4(75 − θ₀) ⇒ 330 − 5θ₀ = 300 − 4θ₀ ⇒ θ₀ = 30°C.\nTherefore, Option (A) is the correct answer."
    }
  }
];

