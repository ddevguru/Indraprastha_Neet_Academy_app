// scripts/update_set60_part2.js
// Update Set 60 (Wave Optics) Part 2: Q24 to Q45 (IDs 491 to 512)

const questions = [
  {
    id: 491,
    similarQuestion: {
      question: "In a Young's double slit setup using light of wavelength 6000 Å, one slit is covered by a thin transparent plate of refractive index 1.4 and the other slit is covered by a plate of equal thickness but of refractive index 1.7. As a result, the central bright fringe shifts to the position originally occupied by the 4th bright fringe. What is the thickness of each plate?",
      option_a: "8 μm",
      option_b: "6 μm",
      option_c: "10 μm",
      option_d: "4 μm",
      correct_option: "A",
      explanation: "Step 1: When two plates of thicknesses t and refractive indices μ₁ and μ₂ are placed on the two slits, the net optical path difference introduced is:\nΔx = |μ₂ - μ₁| t.\nStep 2: Since the central fringe shifts by 4 fringe widths, the net path difference must equal 4λ:\n|μ₂ - μ₁| t = 4λ.\nStep 3: Substituting μ₁ = 1.4, μ₂ = 1.7, and λ = 6000 Å = 6 × 10⁻⁷ m:\n(1.7 - 1.4) t = 4 × (6 × 10⁻⁷ m)\n0.3 t = 2.4 × 10⁻⁶ m\nt = (2.4 × 10⁻⁶) / 0.3 = 8 × 10⁻⁶ m = 8 μm.\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 492,
    similarQuestion: {
      question: "Two coherent monochromatic point sources S₁ and S₂ emit light of wavelength λ. S₁ leads S₂ in initial phase by 45°. At a point P on the screen, the path difference S₂P - S₁P = λ/4. What is the total phase difference between the two waves arriving at P?",
      option_a: "135°",
      option_b: "45°",
      option_c: "90°",
      option_d: "180°",
      correct_option: "A",
      explanation: "Step 1: The phase difference arising from the path difference Δx = S₂P - S₁P = λ/4 is:\nΔϕ_path = (2π / λ) × Δx = (2π / λ) × (λ / 4) = π / 2 = 90°.\nStep 2: Since the path S₁P is shorter, wave 1 arrives ahead in phase by 90° due to the path difference.\nStep 3: Additionally, S₁ is already ahead of S₂ by an initial phase of 45°.\nTotal phase difference at P:\nΔϕ_total = 90° + 45° = 135°.\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 493,
    similarQuestion: {
      question: "In a Young's double-slit experiment, two wavelengths λ₁ = 400 nm and λ₂ = 560 nm are used with slit separation d = 0.2 mm and screen distance D = 1 m. What is the minimum distance between two successive regions of complete darkness on the screen?",
      option_a: "7 mm",
      option_b: "14 mm",
      option_c: "21 mm",
      option_d: "28 mm",
      correct_option: "B",
      explanation: "Step 1: For complete darkness, both wavelengths must produce minima at the same position:\n(2n₁ - 1) λ₁ / 2 = (2n₂ - 1) λ₂ / 2 ⇒ (2n₁ - 1) / (2n₂ - 1) = λ₂ / λ₁ = 560 / 400 = 7 / 5.\nStep 2: Since 7 and 5 are both odd integers, the smallest odd values satisfying this are 2n₁ - 1 = 7 and 2n₂ - 1 = 5.\nThe next pair of odd integers in this ratio is obtained by multiplying by 3: 21 and 15.\nStep 3: The difference in optical path difference between successive darkness regions is:\nΔ(Δx) = (21/2 - 7/2) λ₁ = 7 λ₁ = 7 × (400 × 10⁻⁹ m) = 2800 nm.\nThe corresponding linear separation on the screen is:\nΔy = Δ(Δx) × (D / d) = (2.8 × 10⁻⁶ m × 1 m) / (2 × 10⁻⁴ m) = 1.4 × 10⁻² m = 14 mm.\nTherefore, Option (B) is the correct answer."
    }
  },
  {
    id: 494,
    similarQuestion: {
      question: "When a plane wavefront is incident normally on a thin converging (convex) lens, the shape of the emergent wavefront after passing through the lens is:",
      option_a: "Plane wavefront",
      option_b: "Converging spherical wavefront",
      option_c: "Diverging spherical wavefront",
      option_d: "Cylindrical wavefront",
      correct_option: "B",
      explanation: "Step 1: A convex lens is thicker at the center than at the edges. Since light travels slower in glass than in air, the central portion of the wavefront undergoes a greater time delay than the peripheral portions.\nStep 2: Consequently, the emergent wavefront is curved inwards, forming a spherical wavefront that converges towards the principal focus of the lens.\nTherefore, Option (B) is the correct answer."
    }
  },
  {
    id: 495,
    similarQuestion: {
      question: "For cylindrical waves originating from a continuous linear line source, the wave amplitude (A) varies with the radial distance (r) from the line source as:",
      option_a: "A ∝ 1/r",
      option_b: "A ∝ 1/√r",
      option_c: "A ∝ 1/r²",
      option_d: "A is independent of r",
      correct_option: "B",
      explanation: "Step 1: For a line source of length L, energy spreads uniformly over a cylindrical surface area S = 2πr L at radial distance r.\nStep 2: By conservation of energy, the intensity I varies inversely with the area:\nI ∝ 1 / r.\nStep 3: Since intensity is proportional to the square of amplitude (I ∝ A²):\nA² ∝ 1 / r ⇒ A ∝ 1 / √r.\nTherefore, Option (B) is the correct answer."
    }
  },
  {
    id: 496,
    similarQuestion: {
      question: "A plane monochromatic wavefront enters from air into a transparent medium. The perpendicular distance between two successive wavefronts in air is 1.2 m, while inside the medium the distance between two successive wavefronts is 0.8 m. What is the refractive index of the medium?",
      option_a: "1.5",
      option_b: "1.33",
      option_c: "1.67",
      option_d: "1.25",
      correct_option: "A",
      explanation: "Step 1: The separation between two consecutive wavefronts of identical phase corresponds to the wavelength λ of the wave in that medium.\nStep 2: In air, λ_air = 1.2 m. In the medium, λ_med = 0.8 m.\nStep 3: The refractive index μ of the medium is given by:\nμ = λ_air / λ_med = 1.2 / 0.8 = 3 / 2 = 1.5.\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 497,
    similarQuestion: {
      question: "Two coherent light rays 1 and 2 traverse the same geometrical distance d = 3λ₀, where ray 1 travels in vacuum and ray 2 travels through a glass slab of refractive index μ = 1.5. The phase difference between the two rays after traversing this distance is:",
      option_a: "π",
      option_b: "2π",
      option_c: "3π",
      option_d: "4π",
      correct_option: "C",
      explanation: "Step 1: Optical path traversed by ray 1 in vacuum is Δx₁ = d = 3λ₀.\nOptical path traversed by ray 2 in glass is Δx₂ = μ d = 1.5 × 3λ₀ = 4.5λ₀.\nStep 2: Optical path difference between the two rays is:\nΔx = Δx₂ - Δx₁ = 4.5λ₀ - 3λ₀ = 1.5λ₀.\nStep 3: The corresponding phase difference is:\nΔϕ = (2π / λ₀) × Δx = (2π / λ₀) × 1.5λ₀ = 3π radians.\nTherefore, Option (C) is the correct answer."
    }
  },
  {
    id: 498,
    similarQuestion: {
      question: "Two coherent light beams having intensities 4I and 9I interfere on a screen. If the phase difference between the beams is π/2 at point P and 0 (or 2π) at point Q, what is the difference between the resultant intensities at points Q and P?",
      option_a: "13I",
      option_b: "12I",
      option_c: "6I",
      option_d: "25I",
      correct_option: "B",
      explanation: "Step 1: Resultant intensity of two interfering coherent waves is:\nI_res = I₁ + I₂ + 2√(I₁ I₂) cos ϕ.\nGiven I₁ = 4I and I₂ = 9I:\nI_res = 4I + 9I + 2√(36I²) cos ϕ = 13I + 12I cos ϕ.\nStep 2: At point P, ϕ = π/2:\nI_P = 13I + 12I cos(π/2) = 13I + 0 = 13I.\nStep 3: At point Q, ϕ = 2π (or 0):\nI_Q = 13I + 12I cos(2π) = 13I + 12I = 25I.\nStep 4: The difference between the resultant intensities is:\nI_Q - I_P = 25I - 13I = 12I.\nTherefore, Option (B) is the correct answer."
    }
  },
  {
    id: 499,
    similarQuestion: {
      question: "Four independent light sources produce light waves described by equations y₁ = a₁ sin ωt, y₂ = a₂ sin ωt, y₃ = a₃ cos ωt, and y₄ = a₄ sin(ωt + π/4). Which pair among them can produce sustained interference fringes?",
      option_a: "1 and 2",
      option_b: "1 and 3",
      option_c: "2 and 4",
      option_d: "None of them",
      correct_option: "D",
      explanation: "Step 1: Sustained interference requires two coherent sources that maintain a constant phase relationship over time.\nStep 2: Two independent sources emit light via spontaneous emissions from independent atoms. Their phases change abruptly and randomly on timescales of ~10⁻⁸ s.\nStep 3: Consequently, the phase difference between any two independent sources fluctuates rapidly, washing out the interference pattern into uniform average illumination. Hence, none of the pairs can produce sustained interference.\nTherefore, Option (D) is the correct answer."
    }
  },
  {
    id: 500,
    similarQuestion: {
      question: "In a Young's double slit experiment, the slit separation is d = 3λ. What is the total number of interference minima that can be observed on an infinitely wide screen placed in front of the slits?",
      option_a: "4",
      option_b: "6",
      option_c: "5",
      option_d: "8",
      correct_option: "B",
      explanation: "Step 1: The condition for interference minima is:\nd sin θ = (2m + 1) λ / 2, where m = 0, 1, 2...\nStep 2: Given d = 3λ:\n3λ sin θ = (2m + 1) λ / 2 ⇒ sin θ = (2m + 1) / 6.\nStep 3: Since |sin θ| < 1:\n(2m + 1) / 6 < 1 ⇒ 2m + 1 < 6.\nThe possible positive odd integers are 1, 3, and 5 (corresponding to m = 0, 1, 2).\nStep 4: Because fringes occur symmetrically on both sides of the central maximum (±θ), each value gives two minima:\nTotal number of minima = 3 × 2 = 6.\nTherefore, Option (B) is the correct answer."
    }
  },
  {
    id: 501,
    similarQuestion: {
      question: "In a Young's double slit experiment with two identical slits, at what path difference is the intensity at a point on the screen equal to 75% of the maximum intensity?",
      option_a: "λ / 4",
      option_b: "λ / 6",
      option_c: "λ / 8",
      option_d: "λ / 3",
      correct_option: "B",
      explanation: "Step 1: The intensity distribution in YDSE with identical slits is:\nI = Iₘₐₓ cos²(ϕ / 2).\nStep 2: Given I = 0.75 Iₘₐₓ = 3/4 Iₘₐₓ:\ncos²(ϕ / 2) = 3/4 ⇒ cos(ϕ / 2) = √3 / 2 ⇒ ϕ / 2 = π / 6 ⇒ ϕ = π / 3.\nStep 3: The relationship between phase difference ϕ and path difference Δx is:\nΔx = (λ / 2π) × ϕ = (λ / 2π) × (π / 3) = λ / 6.\nTherefore, Option (B) is the correct answer."
    }
  },
  {
    id: 502,
    similarQuestion: {
      question: "Two coherent in-phase point sources S₁ and S₂ emitting waves of wavelength λ are separated by a distance d = 3λ. On a straight line passing through S₂ and perpendicular to the line S₁S₂, what is the distance from S₂ to the first point of minimum intensity encountered as one moves outward from S₂?",
      option_a: "11λ / 20",
      option_b: "7λ / 12",
      option_c: "5λ / 8",
      option_d: "9λ / 16",
      correct_option: "A",
      explanation: "Step 1: Let P be a point at distance y from S₂ along the perpendicular to S₁S₂. The path difference is:\nΔx = S₁P - S₂P = √(d² + y²) - y.\nStep 2: At y = 0, the maximum possible path difference is d = 3λ. As y increases, Δx decreases monotonically towards 0.\nStep 3: Minima occur at Δx = (2n - 1)λ / 2 = 5λ/2, 3λ/2, λ/2. The first minimum encountered moving outward from y = 0 occurs at the largest allowed path difference:\nΔx = 5λ / 2.\nStep 4: Solve for y:\n√(d² + y²) = y + 5λ / 2\nd² + y² = y² + 5λy + 25λ² / 4\n(3λ)² - 25λ² / 4 = 5λy\n9λ² - 6.25λ² = 2.75λ² = (11/4)λ² = 5λy\ny = 11λ / 20.\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 503,
    similarQuestion: {
      question: "Two coherent in-phase sources S₁ and S₂ separated by a distance d = 3.4λ are situated symmetrically about the center of a circle of very large radius. How many points of maximum intensity are encountered in making one complete revolution along this circular path?",
      option_a: "10",
      option_b: "14",
      option_c: "12",
      option_d: "16",
      correct_option: "B",
      explanation: "Step 1: The path difference to a point on the circle making an angle θ with the line joining S₁S₂ is:\nΔx = d cos θ = 3.4λ cos θ.\nStep 2: Maxima occur when Δx = mλ, where m is an integer:\n3.4λ cos θ = mλ ⇒ cos θ = m / 3.4.\nStep 3: Since |cos θ| ≤ 1, allowed values of m are integers from -3 to +3:\nm = -3, -2, -1, 0, 1, 2, 3.\nStep 4: For each non-zero value of m, there are 2 values of θ in [0, π) and 2 in [π, 2π), giving 4 points per |m|:\nFor |m| = 1, 2, 3: 3 × 4 = 12 points.\nFor m = 0: cos θ = 0 gives exactly 2 points (θ = 90° and 270°).\nTotal number of maxima = 12 + 2 = 14 points.\nTherefore, Option (B) is the correct answer."
    }
  },
  {
    id: 504,
    similarQuestion: {
      question: "In a Young's double-slit experiment, light is incident at an angle θ with the slit axis. A thin transparent plate of thickness t and refractive index μ is placed in front of one of the slits. The location of the central bright fringe (zero net path difference):",
      option_a: "Always lies at the geometric center of the screen",
      option_b: "Is always shifted towards the upper slit",
      option_c: "Is always shifted towards the lower slit",
      option_d: "Can lie at, above, or below the geometric center depending on the relative values of θ, t, and μ",
      correct_option: "D",
      explanation: "Step 1: Oblique incidence introduces an initial path difference Δx₁ = d sin θ before the light reaches the slits.\nStep 2: The transparent sheet of thickness t and index μ introduces an additional optical path difference Δx₂ = (μ - 1)t at that slit.\nStep 3: For the central bright fringe, the net path difference must be zero. Depending on whether Δx₁ is greater than, equal to, or less than Δx₂, the central bright fringe can be positioned above, exactly at, or below the geometric center O.\nTherefore, Option (D) is the correct answer."
    }
  },
  {
    id: 505,
    similarQuestion: {
      question: "The spectral line emitted by a distant receding galaxy is observed on Earth to have an apparent wavelength that is 0.02% greater than its laboratory wavelength. What is the speed of recession of the galaxy?",
      option_a: "30 km/s",
      option_b: "60 km/s",
      option_c: "150 km/s",
      option_d: "15 km/s",
      correct_option: "B",
      explanation: "Step 1: The fractional increase in wavelength for a receding source with velocity v << c is:\nΔλ / λ = v / c.\nStep 2: Given Δλ / λ = 0.02% = 0.02 / 100 = 2 × 10⁻⁴:\nv = (Δλ / λ) × c.\nStep 3: Substituting c = 3.0 × 10⁸ m/s:\nv = (2 × 10⁻⁴) × (3.0 × 10⁸ m/s) = 6 × 10⁴ m/s = 60 km/s.\nTherefore, Option (B) is the correct answer."
    }
  },
  {
    id: 506,
    similarQuestion: {
      question: "If N identical waves each of intensity I₀ interfere, what is the ratio of maximum intensity when they interfere coherently to the intensity observed when they superpose incoherently?",
      option_a: "N",
      option_b: "N²",
      option_c: "1/N",
      option_d: "√N",
      correct_option: "A",
      explanation: "Step 1: For coherent constructive interference in phase, the amplitudes add linearly:\nA_coherent = N A₀.\nSince intensity is proportional to amplitude squared:\nI_coherent = (N A₀)² = N² I₀.\nStep 2: For incoherent superposition, the phases are random, so intensities add directly:\nI_incoherent = N I₀.\nStep 3: The ratio of the two intensities is:\nI_coherent / I_incoherent = (N² I₀) / (N I₀) = N.\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 507,
    similarQuestion: {
      question: "Two coherent light sources have an intensity ratio of 9 : 1. What is the fringe visibility (contrast) V = (Iₘₐₓ - Iₘᵢₙ) / (Iₘₐₓ + Iₘᵢₙ) of the resulting interference fringes?",
      option_a: "3 / 5 = 0.6",
      option_b: "4 / 5 = 0.8",
      option_c: "9 / 10 = 0.9",
      option_d: "1 / 3",
      correct_option: "A",
      explanation: "Step 1: Fringe visibility is defined as:\nV = (Iₘₐₓ - Iₘᵢₙ) / (Iₘₐₓ + Iₘᵢₙ) = 2√(I₁ I₂) / (I₁ + I₂).\nStep 2: Given I₁ / I₂ = 9 / 1, let I₁ = 9 and I₂ = 1:\n√(I₁ I₂) = √(9 × 1) = 3\nI₁ + I₂ = 9 + 1 = 10.\nStep 3: Calculate V:\nV = 2 × 3 / 10 = 6 / 10 = 3/5 = 0.6.\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 508,
    similarQuestion: {
      question: "In a Young's double slit experiment, what is the phase difference between the two interfering light waves arriving at the position of the 4th bright fringe from the central maximum?",
      option_a: "4π",
      option_b: "8π",
      option_c: "2π",
      option_d: "6π",
      correct_option: "B",
      explanation: "Step 1: The condition for bright fringes (maxima) is that the path difference must be an integer multiple of the wavelength:\nΔx = nλ.\nStep 2: For the 4th bright fringe, n = 4:\nΔx = 4λ.\nStep 3: The relation between phase difference Δϕ and path difference Δx is:\nΔϕ = (2π / λ) × Δx = (2π / λ) × 4λ = 8π radians.\nTherefore, Option (B) is the correct answer."
    }
  },
  {
    id: 509,
    similarQuestion: {
      question: "In a Young's double slit experiment, the 5th bright fringe is formed at a distance y from the central bright fringe. What is the distance between this 5th bright fringe and the 2nd dark fringe on the same side of the central maximum?",
      option_a: "7y / 10",
      option_b: "3y / 5",
      option_c: "5y / 8",
      option_d: "4y / 5",
      correct_option: "A",
      explanation: "Step 1: The position of the 5th bright fringe is:\ny = 5β ⇒ β = y / 5, where β is the fringe width.\nStep 2: The position of the 2nd dark fringe on the same side of the central maximum is:\ny_2D = (2 - 1/2)β = 1.5β.\nStep 3: The distance between the 5th bright fringe and the 2nd dark fringe is:\nΔy = y - y_2D = 5β - 1.5β = 3.5β.\nSubstituting β = y / 5:\nΔy = 3.5 × (y / 5) = 7y / 10.\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 510,
    similarQuestion: {
      question: "Two thin transparent films of mica and glass are placed in front of the two slits in a Young's experiment. Their thicknesses are 4t and 2t, respectively. If the refractive index of the glass is 1.6, what must be the refractive index of the mica so that the central maximum remains at the geometric center of the screen?",
      option_a: "1.30",
      option_b: "1.25",
      option_c: "1.35",
      option_d: "1.40",
      correct_option: "A",
      explanation: "Step 1: For the central maximum to remain at the geometric center of the screen, the extra optical paths introduced in the two beams must be equal:\n(μ_mica - 1) × t_mica = (μ_glass - 1) × t_glass.\nStep 2: Substituting t_mica = 4t, t_glass = 2t, and μ_glass = 1.6:\n(μ_mica - 1) × 4t = (1.6 - 1) × 2t\n4(μ_mica - 1) = 0.6 × 2 = 1.2\nμ_mica - 1 = 1.2 / 4 = 0.30\nμ_mica = 1.30.\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 511,
    similarQuestion: {
      question: "White light is incident normally on a thin soap film of thickness 4 × 10⁻⁵ cm. The reflected light shows constructive interference (maximum intensity) at a wavelength of 6400 Å in the visible spectrum. What is the refractive index of the film?",
      option_a: "1.33",
      option_b: "1.20",
      option_c: "1.50",
      option_d: "1.60",
      correct_option: "B",
      explanation: "Step 1: Due to phase reversal (π shift) at the top surface, the condition for constructive interference in reflected light from a thin film is:\n2μt = (2m - 1) λ / 2, where m = 1, 2, 3...\nStep 2: Given t = 4 × 10⁻⁵ cm = 4 × 10⁻⁷ m and λ = 6400 Å = 6.4 × 10⁻⁷ m:\n2μ (4 × 10⁻⁷) = (2m - 1) × (6.4 × 10⁻⁷ / 2)\n8 × 10⁻⁷ μ = (2m - 1) × 3.2 × 10⁻⁷\nμ = (2m - 1) × 0.4.\nStep 3: For refractive index of a soap film in visible range (around 1.2 - 1.4), test m = 2:\nμ = (2 × 2 - 1) × 0.4 = 3 × 0.4 = 1.20.\nTherefore, Option (B) is the correct answer."
    }
  },
  {
    id: 512,
    similarQuestion: {
      question: "In a single-slit Fraunhofer diffraction pattern, the angular position of the first secondary maximum is 0.75°. What is the angular position of the first diffraction minimum?",
      option_a: "0.50°",
      option_b: "0.25°",
      option_c: "0.375°",
      option_d: "0.60°",
      correct_option: "A",
      explanation: "Step 1: The angular position of the first secondary maximum in single slit diffraction is:\nθ_max1 = (3/2) × (λ / a).\nStep 2: The angular position of the first minimum in single slit diffraction is:\nθ_min1 = λ / a.\nStep 3: Dividing the two expressions:\nθ_min1 / θ_max1 = (λ / a) / ((3/2)(λ / a)) = 2/3.\nStep 4: Substituting θ_max1 = 0.75°:\nθ_min1 = (2/3) × 0.75° = 0.50°.\nTherefore, Option (A) is the correct answer."
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
  console.log("Login successful for Set 60 Part 2.");

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
  console.log("Set 60 Part 2 completed successfully!");
}

main().catch(console.error);
