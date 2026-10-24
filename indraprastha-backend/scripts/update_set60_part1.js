// scripts/update_set60_part1.js
// Update Set 60 (Wave Optics) Part 1: Q1 to Q23 (IDs 374 to 490)

const questions = [
  {
    id: 374,
    similarQuestion: {
      question: "Which of the following physical phenomena is exhibited by both sound waves in air and light waves in dielectric media?",
      option_a: "Transverse polarization",
      option_b: "Ability to propagate in vacuum",
      option_c: "Interference and diffraction",
      option_d: "Identical propagation speed in all media",
      correct_option: "C",
      explanation: "Step 1: Wave interference and diffraction are fundamental wave phenomena that occur in all types of waves, whether longitudinal (such as sound waves in air) or transverse (such as electromagnetic light waves).\nStep 2: In contrast, polarization is unique to transverse waves and cannot occur in longitudinal sound waves. Furthermore, sound waves require a material medium and cannot travel through a vacuum.\nTherefore, Option (C) is the correct answer."
    }
  },
  {
    id: 375,
    similarQuestion: {
      question: "Two coherent harmonic waves are given by y₁ = 2A sin(ωt) and y₂ = 2A cos(ωt + π/6). The amplitude of the resultant wave is:",
      option_a: "2A",
      option_b: "2√3 A",
      option_c: "4A",
      option_d: "2√2 A",
      correct_option: "A",
      explanation: "Step 1: Express both waves in terms of sine:\ny₁ = 2A sin(ωt)\ny₂ = 2A cos(ωt + π/6) = 2A sin(ωt + π/6 + π/2) = 2A sin(ωt + 2π/3).\nStep 2: The phase difference between the two waves is:\nΔϕ = 2π/3 = 120°.\nStep 3: The resultant amplitude of two interfering waves of equal amplitude A₀ = 2A is:\nA_res = √(A₀² + A₀² + 2A₀² cos Δϕ)\nA_res = √((2A)² + (2A)² + 2(2A)² cos(120°))\nSince cos(120°) = -1/2:\nA_res = √(4A² + 4A² - 4A²) = √(4A²) = 2A.\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 376,
    similarQuestion: {
      question: "In a Young's double slit experiment, the ratio of maximum to minimum intensity in the interference pattern is 16. What is the ratio of the amplitudes of the two interfering waves and the ratio of their individual intensities?",
      option_a: "Amplitude ratio is 5/3 and intensity ratio is 25/9",
      option_b: "Amplitude ratio is 3/1 and intensity ratio is 9/1",
      option_c: "Amplitude ratio is 4/1 and intensity ratio is 16/1",
      option_d: "Amplitude ratio is 2/1 and intensity ratio is 4/1",
      correct_option: "A",
      explanation: "Step 1: The relation between maximum intensity, minimum intensity, and wave amplitudes (A₁ and A₂) is:\n√(Iₘₐₓ / Iₘᵢₙ) = (A₁ + A₂) / (A₁ - A₂).\nGiven Iₘₐₓ / Iₘᵢₙ = 16:\n(A₁ + A₂) / (A₁ - A₂) = √16 = 4.\nStep 2: Solve for the amplitude ratio:\nA₁ + A₂ = 4(A₁ - A₂) = 4A₁ - 4A₂\n5A₂ = 3A₁ ⇒ A₁ / A₂ = 5/3.\nStep 3: The ratio of their individual intensities is:\nI₁ / I₂ = (A₁ / A₂)² = (5/3)² = 25/9.\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 377,
    similarQuestion: {
      question: "In a Young's double slit experiment, the fringe width observed in air is 0.8 mm. When the entire apparatus is immersed in a liquid of refractive index 4/3, the new fringe width will be:",
      option_a: "0.8 mm",
      option_b: "0.6 mm",
      option_c: "1.06 mm",
      option_d: "0.4 mm",
      correct_option: "B",
      explanation: "Step 1: Fringe width in air is given by:\nβ = λD / d.\nStep 2: When the entire apparatus is immersed in a liquid of refractive index μ, the wavelength of light becomes:\nλ' = λ / μ.\nThe slit separation d and screen distance D remain unchanged.\nStep 3: Therefore, the new fringe width is:\nβ' = λ'D / d = β / μ.\nSubstituting β = 0.8 mm and μ = 4/3:\nβ' = 0.8 / (4/3) = 0.8 × 3 / 4 = 0.6 mm.\nTherefore, Option (B) is the correct answer."
    }
  },
  {
    id: 378,
    similarQuestion: {
      question: "In two separate setups of Young's double slit experiment, interference fringes of equal width are observed. The wavelengths of light used are in the ratio 2 : 3, and the slit separations are in the ratio 3 : 2. What is the ratio of the distances between the slit plane and the screen (D₁ : D₂) in the two setups?",
      option_a: "9 : 4",
      option_b: "4 : 9",
      option_c: "1 : 1",
      option_d: "3 : 2",
      correct_option: "A",
      explanation: "Step 1: Fringe width is defined as:\nβ = λD / d.\nGiven that the fringe widths are equal (β₁ = β₂):\nλ₁D₁ / d₁ = λ₂D₂ / d₂.\nStep 2: Rearranging for the ratio D₁ / D₂:\nD₁ / D₂ = (d₁ / d₂) × (λ₂ / λ₁).\nStep 3: Given d₁ / d₂ = 3/2 and λ₁ / λ₂ = 2/3 (so λ₂ / λ₁ = 3/2):\nD₁ / D₂ = (3/2) × (3/2) = 9/4 = 9 : 4.\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 379,
    similarQuestion: {
      question: "In a Young's double slit experiment, the distance between the two slits is 0.2 mm and the screen is placed at a distance of 1.2 m from the slits. If the distance of the 4th bright fringe from the central maximum is 1.2 cm, the wavelength of the light used is:",
      option_a: "4500 Å",
      option_b: "5000 Å",
      option_c: "6000 Å",
      option_d: "5500 Å",
      correct_option: "B",
      explanation: "Step 1: The position of the n-th bright fringe from the central maximum is:\nyₙ = n λ D / d.\nHere n = 4, y₄ = 1.2 cm = 1.2 × 10⁻² m, d = 0.2 mm = 2 × 10⁻⁴ m, D = 1.2 m.\nStep 2: Solve for the wavelength λ:\nλ = (y₄ × d) / (n × D)\nλ = (1.2 × 10⁻² m × 2 × 10⁻⁴ m) / (4 × 1.2 m)\nλ = (2.4 × 10⁻⁶) / 4.8 = 0.5 × 10⁻⁶ m = 5000 × 10⁻¹⁰ m = 5000 Å.\nTherefore, Option (B) is the correct answer."
    }
  },
  {
    id: 380,
    similarQuestion: {
      question: "A thin transparent sheet of refractive index 1.6 and thickness 2.0 × 10⁻⁵ m is placed in front of one of the slits in a Young's double slit setup. The slit separation is 0.4 mm and the screen is at a distance of 1.0 m. What is the linear displacement of the fringe pattern on the screen?",
      option_a: "1.5 cm",
      option_b: "3.0 cm",
      option_c: "2.0 cm",
      option_d: "4.5 cm",
      correct_option: "B",
      explanation: "Step 1: When a transparent sheet of thickness t and refractive index μ is placed across one slit, the optical path difference introduced is Δx = (μ - 1)t.\nStep 2: The lateral shift of the entire interference fringe pattern on the screen is given by:\nΔy = (D / d) × (μ - 1)t.\nStep 3: Substitute the given parameters:\nμ = 1.6, t = 2.0 × 10⁻⁵ m, d = 0.4 mm = 4 × 10⁻⁴ m, D = 1.0 m.\nΔy = (1.0 / (4 × 10⁻⁴)) × (1.6 - 1) × (2.0 × 10⁻⁵)\nΔy = (1 / (4 × 10⁻⁴)) × 0.6 × 2.0 × 10⁻⁵\nΔy = 1.2 × 10⁻⁵ / (4 × 10⁻⁴) = 0.3 × 10⁻¹ m = 0.03 m = 3.0 cm.\nTherefore, Option (B) is the correct answer."
    }
  },
  {
    id: 381,
    similarQuestion: {
      question: "In an interference experiment, the 4th bright fringe is observed at a specific point on the screen using light of wavelength 600 nm. What wavelength of light should be used to obtain the 6th bright fringe at that exact same position?",
      option_a: "400 nm",
      option_b: "450 nm",
      option_c: "500 nm",
      option_d: "350 nm",
      correct_option: "A",
      explanation: "Step 1: The position of the n-th bright fringe from the central maximum is:\ny = n λ D / d.\nSince the fringe is formed at the same point on the screen:\ny = n₁ λ₁ D / d = n₂ λ₂ D / d.\nStep 2: Equating the two expressions:\nn₁ λ₁ = n₂ λ₂.\nStep 3: Given n₁ = 4, λ₁ = 600 nm, and n₂ = 6:\n4 × 600 nm = 6 × λ₂\nλ₂ = (2400) / 6 = 400 nm.\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 382,
    similarQuestion: {
      question: "In a Young's double slit setup, two slits separated by 0.8 mm are illuminated by monochromatic light of wavelength 6.0 × 10⁻⁷ m. The screen is placed at a distance of 1.2 m from the slits. The distance between the 2nd dark fringe and the 4th bright fringe on the same side of the central maximum is:",
      option_a: "1.125 mm",
      option_b: "2.25 mm",
      option_c: "1.80 mm",
      option_d: "2.70 mm",
      correct_option: "B",
      explanation: "Step 1: The fringe width β is given by:\nβ = λD / d\nβ = (6.0 × 10⁻⁷ m × 1.2 m) / (0.8 × 10⁻³ m) = 7.2 × 10⁻⁷ / (8 × 10⁻⁴) = 9 × 10⁻⁴ m = 0.9 mm.\nStep 2: The position of the 4th bright fringe is:\ny_4B = 4β.\nThe position of the 2nd dark fringe on the same side is:\ny_2D = (2 - 1/2)β = 1.5β.\nStep 3: The separation between them is:\nΔy = y_4B - y_2D = 4β - 1.5β = 2.5β\nΔy = 2.5 × 0.9 mm = 2.25 mm.\nTherefore, Option (B) is the correct answer."
    }
  },
  {
    id: 383,
    similarQuestion: {
      question: "In a Young's double-slit experiment, the fringe width is measured to be 0.45 mm. If the wavelength of light used is increased by 20% while the separation between the slits is also increased by 20%, the new fringe width will be:",
      option_a: "0.45 mm",
      option_b: "0.54 mm",
      option_c: "0.36 mm",
      option_d: "0.65 mm",
      correct_option: "A",
      explanation: "Step 1: The formula for fringe width in Young's double slit experiment is:\nβ = λD / d.\nStep 2: If the wavelength λ increases by 20%, λ' = 1.20 λ.\nIf the slit separation d also increases by 20%, d' = 1.20 d.\nThe distance to screen D remains unchanged.\nStep 3: The new fringe width is:\nβ' = λ' D / d' = (1.20 λ × D) / (1.20 d) = λD / d = β.\nThus, the fringe width remains completely unchanged at 0.45 mm.\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 384,
    similarQuestion: {
      question: "In a Young's double slit experiment, the slit separation is 0.2 mm and the wavelength of light used is 6000 Å. What is the angular position (in degrees) of the first dark fringe from the central maximum?",
      option_a: "0.043°",
      option_b: "0.086°",
      option_c: "0.172°",
      option_d: "0.258°",
      correct_option: "B",
      explanation: "Step 1: The angular position of the first dark fringe (minimum) is given by:\nθ = (1/2) × (λ / d).\nStep 2: Given λ = 6000 Å = 6 × 10⁻⁷ m and d = 0.2 mm = 2 × 10⁻⁴ m:\nθ = 0.5 × (6 × 10⁻⁷ m) / (2 × 10⁻⁴ m) = 1.5 × 10⁻³ radians.\nStep 3: Convert the angle from radians to degrees:\nθ (in degrees) = 1.5 × 10⁻³ × (180° / π)\nθ = (1.5 × 180 × 10⁻³) / 3.1416 ≈ 0.270 / 3.1416 ≈ 0.086°.\nTherefore, Option (B) is the correct answer."
    }
  },
  {
    id: 385,
    similarQuestion: {
      question: "In a Fresnel's biprism (refractive index μ = 1.5) experiment, the distance between the source and the biprism is 0.2 m and that between the biprism and the screen is 0.8 m. The refracting angle of the biprism is 1.5°. If monochromatic light of wavelength 5000 Å is used, the fringe width on the screen is approximately:",
      option_a: "0.0095 cm",
      option_b: "0.019 cm",
      option_c: "0.038 cm",
      option_d: "0.0048 cm",
      correct_option: "A",
      explanation: "Step 1: In a Fresnel biprism arrangement, the effective distance between the two coherent virtual sources is:\nd = 2u(μ - 1)α,\nwhere u is the distance between the source and the biprism (0.2 m), μ = 1.5, and α is the refracting angle in radians:\nα = 1.5° = 1.5 × (π / 180) radians.\nStep 2: Calculate d:\nd = 2 × 0.2 × (1.5 - 1) × (1.5 × π / 180) = 0.4 × 0.5 × (1.5 × 3.1416 / 180)\nd = 0.2 × 0.02618 m = 5.236 × 10⁻³ m.\nStep 3: The total distance from source to screen is D = u + v = 0.2 m + 0.8 m = 1.0 m.\nThe fringe width β is:\nβ = λD / d = (5000 × 10⁻¹⁰ m × 1.0 m) / (5.236 × 10⁻³ m)\nβ = 5 × 10⁻⁷ / (5.236 × 10⁻³) ≈ 0.955 × 10⁻⁴ m = 0.00955 cm.\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 386,
    similarQuestion: {
      question: "What happens to the fringe width in a Fresnel's biprism experiment if the entire apparatus is immersed in water (μ = 4/3) instead of air?",
      option_a: "It decreases",
      option_b: "It increases",
      option_c: "It remains unchanged",
      option_d: "Interference pattern disappears completely",
      correct_option: "B",
      explanation: "Step 1: In Fresnel's biprism, fringe width is β = λD / d, where d = 2u(μ_g - 1)α.\nStep 2: In water:\n(i) The wavelength decreases to λ' = λ / μ_w (a factor of 3/4 = 0.75).\n(ii) The deviation produced by the biprism depends on (μ_g/μ_w - 1) = (1.5/1.33 - 1) = (9/8 - 1) = 1/8 = 0.125, whereas in air it was (1.5 - 1) = 0.5.\nHence the slit separation d decreases by a factor of 4: d' = d / 4.\nStep 3: The new fringe width is:\nβ' = λ' D / d' = (3/4 λ D) / (d / 4) = 3 (λD / d) = 3β.\nSince β' > β, the fringe width increases.\nTherefore, Option (B) is the correct answer."
    }
  },
  {
    id: 387,
    similarQuestion: {
      question: "A distant star emitting light at a wavelength of 6000 Å is moving towards Earth with a radial speed of 1.2 × 10⁶ m/s. What is the Doppler shift (change in wavelength) observed on Earth?",
      option_a: "24 Å",
      option_b: "12 Å",
      option_c: "48 Å",
      option_d: "36 Å",
      correct_option: "A",
      explanation: "Step 1: For a source moving towards the observer with velocity v << c, the fractional change in wavelength (Doppler shift) is given by:\nΔλ / λ = v / c.\nStep 2: Rearranging for the change in wavelength Δλ:\nΔλ = (v / c) × λ.\nStep 3: Substituting v = 1.2 × 10⁶ m/s, c = 3.0 × 10⁸ m/s, and λ = 6000 Å:\nΔλ = (1.2 × 10⁶ / 3.0 × 10⁸) × 6000 Å\nΔλ = (0.4 × 10⁻²) × 6000 Å = 24 Å.\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 388,
    similarQuestion: {
      question: "In a single-slit diffraction arrangement with a slit width of 0.5 mm using visible red light, distinct diffraction bands are formed on a screen. If the red light source is replaced by an X-ray source (λ ≈ 0.1 nm), what will be observed on the screen?",
      option_a: "Very wide central maximum",
      option_b: "No observable diffraction pattern",
      option_c: "The fringes become significantly brighter and broader",
      option_d: "An infinite number of sharp bright fringes",
      correct_option: "B",
      explanation: "Step 1: Significant diffraction occurs only when the wavelength of the wave is comparable to the size of the aperture or obstacle (λ ≈ a).\nStep 2: For visible light, λ ≈ 6 × 10⁻⁷ m is within a measurable fraction of the slit width a = 0.5 mm = 5 × 10⁻⁴ m, yielding observable diffraction with angular width 2λ/a ≈ 2.4 × 10⁻³ rad.\nStep 3: For X-rays, the wavelength is of the order of 10⁻¹⁰ m (0.1 nm), which is nearly a million times smaller than 0.5 mm. The angular spread 2λ/a ≈ 4 × 10⁻⁷ rad is imperceptibly small, so rectilinear propagation dominates and no diffraction pattern is observable.\nTherefore, Option (B) is the correct answer."
    }
  },
  {
    id: 413,
    similarQuestion: {
      question: "A plane wavefront of light with wavelength λ = 5 × 10⁻⁷ m is incident normally on a single slit of width 0.2 mm. A convex lens of focal length 1.0 m placed immediately behind the slit focuses the diffraction pattern on a screen. What is the separation between the second secondary maxima situated on either side of the central maximum?",
      option_a: "12.5 mm",
      option_b: "6.25 mm",
      option_c: "2.5 mm",
      option_d: "5.0 mm",
      correct_option: "A",
      explanation: "Step 1: The condition for secondary maxima in single slit diffraction is:\na sin θ = (2n + 1) λ / 2, where n = 2 for the second secondary maximum.\nSo sin θ₂ ≈ θ₂ = (5/2)(λ / a).\nStep 2: The linear distance of the 2nd secondary maximum from the central peak is:\ny₂ = θ₂ × D = (5/2) × (λD / a).\nGiven λ = 5 × 10⁻⁷ m, a = 0.2 mm = 2 × 10⁻⁴ m, and D = f = 1.0 m:\ny₂ = 2.5 × (5 × 10⁻⁷ × 1.0 / (2 × 10⁻⁴)) = 2.5 × 2.5 × 10⁻³ m = 6.25 mm.\nStep 3: The separation between the two symmetric second secondary maxima on either side of the central maximum is:\n2 × y₂ = 2 × 6.25 mm = 12.5 mm.\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 416,
    similarQuestion: {
      question: "The polarizing angle for a transparent optical medium is tan⁻¹(√2) ≈ 54.74°. What is the critical angle for total internal reflection at the medium-air boundary?",
      option_a: "45°",
      option_b: "30°",
      option_c: "60°",
      option_d: "sin⁻¹(1/3)",
      correct_option: "A",
      explanation: "Step 1: According to Brewster's law, the refractive index of the medium is related to the polarizing angle θ_p by:\nμ = tan(θ_p).\nGiven θ_p = tan⁻¹(√2):\nμ = √2.\nStep 2: The critical angle θ_c for total internal reflection is related to the refractive index by:\nsin(θ_c) = 1 / μ.\nStep 3: Substituting μ = √2:\nsin(θ_c) = 1 / √2 ⇒ θ_c = 45°.\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 418,
    similarQuestion: {
      question: "Which of the following waves cannot be polarized under any circumstances?",
      option_a: "Microwaves",
      option_b: "X-rays",
      option_c: "Infrasonic waves",
      option_d: "Infrared rays",
      correct_option: "C",
      explanation: "Step 1: Polarization is a phenomenon characteristic only of transverse waves, in which the wave oscillations occur in a plane perpendicular to the direction of propagation.\nStep 2: Electromagnetic waves such as microwaves, X-rays, and infrared rays are transverse waves and can therefore be polarized.\nStep 3: Infrasonic waves (like all acoustic sound waves in fluids) are longitudinal waves, where particle vibrations occur parallel to the direction of propagation. Hence, they cannot be polarized.\nTherefore, Option (C) is the correct answer."
    }
  },
  {
    id: 428,
    similarQuestion: {
      question: "The polarizing angle for a particular transparent block is 57°30'. If a beam of unpolarized light is incident at this Brewster angle, what is the angle of refraction inside the block?",
      option_a: "57°30'",
      option_b: "32°30'",
      option_c: "42°30'",
      option_d: "90°",
      correct_option: "B",
      explanation: "Step 1: According to Brewster's Law, when light is incident at the polarizing angle i_p, the reflected ray and refracted ray are mutually perpendicular (angle between them is 90°).\nStep 2: From geometry at the interface:\ni_p + r = 90°, where r is the angle of refraction.\nStep 3: Substituting i_p = 57°30':\nr = 90° - 57°30' = 89°60' - 57°30' = 32°30'.\nTherefore, Option (B) is the correct answer."
    }
  },
  {
    id: 429,
    similarQuestion: {
      question: "An unpolarized light beam of intensity 64 W/m² passes through three successive polarizing sheets. The transmission axis of the second sheet is at 30° to that of the first, and the axis of the third sheet is perpendicular (90°) to that of the first. What is the intensity of the light emerging from the third polarizer?",
      option_a: "12 W/m²",
      option_b: "6 W/m²",
      option_c: "16 W/m²",
      option_d: "8 W/m²",
      correct_option: "B",
      explanation: "Step 1: When unpolarized light of intensity I₀ = 64 W/m² passes through the first polarizer (P₁), the transmitted intensity is:\nI₁ = I₀ / 2 = 64 / 2 = 32 W/m².\nStep 2: By Malus's law, after passing through the second polarizer (P₂), whose axis is oriented at θ₁ = 30° relative to P₁:\nI₂ = I₁ cos²(30°) = 32 × (√3/2)² = 32 × 3/4 = 24 W/m².\nStep 3: Since the third polarizer (P₃) is crossed with P₁ (at 90° to P₁), the angle between the transmission axis of P₂ and P₃ is:\nθ₂ = 90° - 30° = 60°.\nApplying Malus's law again:\nI₃ = I₂ cos²(60°) = 24 × (1/2)² = 24 × 1/4 = 6 W/m².\nTherefore, Option (B) is the correct answer."
    }
  },
  {
    id: 431,
    similarQuestion: {
      question: "When light traveling in air is incident on the surface of a dielectric liquid at an angle of incidence of 60°, the reflected beam is completely polarized. If the speed of light in vacuum is 3 × 10⁸ m/s, what is the speed of the refracted light inside the liquid?",
      option_a: "1.5 × 10⁸ m/s",
      option_b: "2.0 × 10⁸ m/s",
      option_c: "√3 × 10⁸ m/s ≈ 1.732 × 10⁸ m/s",
      option_d: "3 × 10⁸ m/s",
      correct_option: "C",
      explanation: "Step 1: According to Brewster's law, when light incident at Brewster's angle i_p produces completely polarized reflected light, the refractive index of the medium is:\nμ = tan(i_p).\nStep 2: Given i_p = 60°:\nμ = tan(60°) = √3.\nStep 3: The speed of light inside the medium v is related to the speed of light in vacuum c by:\nv = c / μ.\nSubstituting c = 3 × 10⁸ m/s and μ = √3:\nv = (3 × 10⁸) / √3 = √3 × 10⁸ m/s ≈ 1.732 × 10⁸ m/s.\nTherefore, Option (C) is the correct answer."
    }
  },
  {
    id: 433,
    similarQuestion: {
      question: "Two interfering light waves produced by division of amplitude have intensities in the ratio I₁ : I₂ = 9 : 4. What is the ratio of maximum to minimum intensity in their interference pattern (Iₘₐₓ / Iₘᵢₙ)?",
      option_a: "5 : 1",
      option_b: "13 : 5",
      option_c: "25 : 1",
      option_d: "9 : 4",
      correct_option: "C",
      explanation: "Step 1: The maximum and minimum intensities resulting from the interference of two coherent beams with intensities I₁ and I₂ are given by:\nIₘₐₓ = (√I₁ + √I₂)²\nIₘᵢₙ = (√I₁ - √I₂)².\nStep 2: Let I₁ = 9I and I₂ = 4I.\n√I₁ = 3√I, and √I₂ = 2√I.\nStep 3: Calculate the ratio:\nIₘₐₓ / Iₘᵢₙ = (3√I + 2√I)² / (3√I - 2√I)² = (5√I)² / (1√I)² = 25 / 1 = 25 : 1.\nTherefore, Option (C) is the correct answer."
    }
  },
  {
    id: 490,
    similarQuestion: {
      question: "In an ideal Young's double slit experiment, a transparent thin glass plate of refractive index μ = 1.6 is introduced in the path of one of the interfering beams of wavelength λ. If the intensity at the position where the central maximum was originally located remains maximum (unchanged), what is the minimum non-zero thickness of the glass plate?",
      option_a: "5λ / 3",
      option_b: "3λ / 5",
      option_c: "λ / 0.6",
      option_d: "2λ",
      correct_option: "A",
      explanation: "Step 1: When a transparent sheet of refractive index μ and thickness t is introduced in one beam, it introduces an additional optical path difference of:\nΔx = (μ - 1)t.\nStep 2: For the intensity at the central position to remain a maximum, this additional path difference must be an integer multiple of the wavelength:\nΔx = nλ, where n = 1, 2, 3...\nStep 3: For the minimum non-zero thickness, take n = 1:\n(μ - 1)t_min = λ.\nGiven μ = 1.6:\n(1.6 - 1)t_min = λ ⇒ 0.6 t_min = λ ⇒ t_min = λ / 0.6 = 10λ / 6 = 5λ / 3.\nTherefore, Option (A) is the correct answer."
    }
  }
];

async function main() {
  const loginRes = await fetch("https://api.indraprasthaneetacademy.com/api/admin/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      username: "indraprasthaadmin",
      password: "indraprastha@123"
    })
  });
  const loginData = await loginRes.json();
  const token = loginData.token;
  if (!token) {
    console.error("Login failed:", loginData);
    process.exit(1);
  }
  console.log("Login successful for Set 60 Part 1.");

  for (let i = 0; i < questions.length; i++) {
    const q = questions[i];
    const updateRes = await fetch(`https://api.indraprasthaneetacademy.com/api/admin/practice-questions/${q.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
      body: JSON.stringify({
        similarQuestion: q.similarQuestion
      })
    });
    const updateData = await updateRes.json();
    if (!updateRes.ok) {
      console.error(`Error updating Q ID ${q.id}:`, updateData);
    } else {
      console.log(`Updated question ${i + 1}/${questions.length} (ID: ${q.id})`);
    }
    await new Promise(r => setTimeout(r, 100));
  }
  console.log("Set 60 Part 1 completed successfully!");
}

main().catch(console.error);
