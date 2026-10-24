const BASE_URL = 'https://api.indraprasthaneetacademy.com/api';

const questionsPart2 = [
  {
    id: 359,
    similarQuestion: {
      question: "A solid glass light pipe of refractive index μ = √2 is surrounded by air. The maximum angle of incidence θ at the flat entrance face for which light undergoes total internal reflection at the cylindrical outer surface is:",
      option_a: "30°",
      option_b: "45°",
      option_c: "60°",
      option_d: "90°",
      correct_option: "D",
      explanation: "Step 1: The condition for total internal reflection along the cylindrical wall is sin θ_max = √(μ² - 1).\n\nStep 2: Substitute μ = √2:\nsin θ_max = √((√2)² - 1) = √(2 - 1) = 1.\n\nStep 3: Solve for θ_max:\nθ_max = sin⁻¹(1) = 90°.\n(All rays entering the flat front face will undergo total internal reflection regardless of incidence angle).\n\nTherefore, Option (D) is the correct answer."
    }
  },
  {
    id: 360,
    similarQuestion: {
      question: "In a displacement method experiment using a converging lens, the heights of the sharp images formed on a fixed screen at two conjugate positions of the lens are 4 cm and 9 cm. The actual height of the object is:",
      option_a: "5.0 cm",
      option_b: "6.5 cm",
      option_c: "6.0 cm",
      option_d: "13.0 cm",
      correct_option: "C",
      explanation: "Step 1: In the displacement method, the magnifications at the two conjugate positions are m₁ = h₁ / h_o and m₂ = h₂ / h_o.\n\nStep 2: By the principle of reversibility of light, m₁ × m₂ = 1:\n(h₁ / h_o) × (h₂ / h_o) = 1 => h_o² = h₁ × h₂\n\nStep 3: Solve for object height h_o:\nh_o = √(h₁ × h₂) = √(4 cm × 9 cm) = √36 = 6.0 cm.\n\nTherefore, Option (C) is the correct answer."
    }
  },
  {
    id: 361,
    similarQuestion: {
      question: "The pupil of a human eye has an aperture diameter of 3.0 mm. For light of wavelength 600 nm, what is the minimum angular separation of two distant point sources that the eye can resolve according to Rayleigh's criterion?",
      option_a: "1.22 × 10⁻⁴ rad",
      option_b: "1.83 × 10⁻⁴ rad",
      option_c: "2.44 × 10⁻⁴ rad",
      option_d: "4.88 × 10⁻⁴ rad",
      correct_option: "C",
      explanation: "Step 1: Rayleigh's criterion for resolution by a circular aperture of diameter a is:\nθ_min = 1.22 × λ / a\n\nStep 2: Substitute λ = 600 nm = 6.0 × 10⁻⁷ m and a = 3.0 mm = 3.0 × 10⁻³ m:\nθ_min = 1.22 × (6.0 × 10⁻⁷ m) / (3.0 × 10⁻³ m) = 1.22 × 2.0 × 10⁻⁴ = 2.44 × 10⁻⁴ rad.\n\nTherefore, Option (C) is the correct answer."
    }
  },
  {
    id: 362,
    similarQuestion: {
      question: "A parallel beam of light falls on a diverging lens of focal length 25 cm. A converging lens of focal length 20 cm is placed coaxially 15 cm behind the diverging lens. The distance of the final real image from the converging lens is:",
      option_a: "20 cm",
      option_b: "30 cm",
      option_c: "40 cm",
      option_d: "15 cm",
      correct_option: "C",
      explanation: "Step 1: The parallel beam entering the diverging lens (f₁ = -25 cm) forms a virtual image at its focus, 25 cm in front of the diverging lens.\n\nStep 2: This virtual image acts as a real object for the second converging lens (f₂ = +20 cm).\nObject distance for the converging lens is u₂ = -(25 cm + 15 cm) = -40 cm.\n\nStep 3: Apply the lens formula 1/v₂ - 1/u₂ = 1/f₂:\n1/v₂ = 1/f₂ + 1/u₂ = 1/20 - 1/40 = 2/40 - 1/40 = 1/40 => v₂ = +40 cm.\nTherefore, the final image is formed 40 cm behind the converging lens.\n\nTherefore, Option (C) is the correct answer."
    }
  },
  {
    id: 363,
    similarQuestion: {
      question: "Which of the following statements is always strictly TRUE for image formation of a real object by a convex spherical mirror?",
      option_a: "The linear magnification is always positive and strictly less than 1 (0 < m < 1)",
      option_b: "The image is always real and inverted",
      option_c: "The image is virtual and magnified (m > 1)",
      option_d: "The image distance is always greater than the radius of curvature",
      correct_option: "A",
      explanation: "Step 1: For a convex mirror, the focal length is positive (+f) and the real object distance is negative (-u).\n\nStep 2: The magnification formula gives:\nm = f / (f - u) = f / (f + |u|)\n\nStep 3: Since |u| > 0, the denominator (f + |u|) is always strictly greater than the numerator f.\nTherefore, 0 < m < 1, meaning the image is always virtual, erect, and diminished.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 364,
    similarQuestion: {
      question: "A microscope is focused on a mark at the bottom of an empty beaker. A transparent liquid of refractive index 1.5 is poured into the beaker to a depth of 6.0 cm. By what vertical distance must the microscope be shifted upwards to refocus on the mark?",
      option_a: "4.0 cm",
      option_b: "3.0 cm",
      option_c: "1.5 cm",
      option_d: "2.0 cm",
      correct_option: "D",
      explanation: "Step 1: Due to refraction, an object placed under a layer of thickness t and refractive index μ appears shifted upwards by:\nΔy = t × (1 - 1 / μ)\n\nStep 2: Substitute t = 6.0 cm and μ = 1.5 = 3/2:\nΔy = 6.0 cm × (1 - 2/3) = 6.0 × (1/3) = 2.0 cm.\n\nStep 3: Therefore, the microscope must be raised vertically by 2.0 cm to bring the image back into focus.\n\nTherefore, Option (D) is the correct answer."
    }
  },
  {
    id: 365,
    similarQuestion: {
      question: "A thin glass prism having a small refracting angle A = 4° and refractive index μ = 1.5 produces an angular deviation of:",
      option_a: "4.0°",
      option_b: "1.5°",
      option_c: "6.0°",
      option_d: "2.0°",
      correct_option: "D",
      explanation: "Step 1: For a thin prism (apex angle A ≤ 10°), the deviation δ for small angles of incidence is:\nδ = (μ - 1) × A\n\nStep 2: Substitute μ = 1.5 and A = 4°:\nδ = (1.5 - 1) × 4° = 0.5 × 4° = 2.0°.\n\nTherefore, Option (D) is the correct answer."
    }
  },
  {
    id: 366,
    similarQuestion: {
      question: "For a spherical mirror of focal length f, a real object is placed at a distance x₁ from the principal focus, and its real image is formed at a distance x₂ from the principal focus. Newton's relation states that:",
      option_a: "x₁ + x₂ = f",
      option_b: "x₁ × x₂ = f²",
      option_c: "x₁ / x₂ = f²",
      option_d: "x₁² + x₂² = f²",
      correct_option: "B",
      explanation: "Step 1: In Newton's formulation, distances are measured from the focus rather than the pole: u = -(f + x₁) and v = -(f + x₂).\n\nStep 2: Substitute into the mirror formula 1/v + 1/u = 1/f:\n-1/(f + x₂) - 1/(f + x₁) = -1/f\n1/(f + x₁) + 1/(f + x₂) = 1/f\n\nStep 3: Simplifying yields:\n(2f + x₁ + x₂) / (f² + f x₁ + f x₂ + x₁ x₂) = 1 / f\n2f² + f x₁ + f x₂ = f² + f x₁ + f x₂ + x₁ x₂ => x₁ × x₂ = f².\n\nTherefore, Option (B) is the correct answer."
    }
  },
  {
    id: 367,
    similarQuestion: {
      question: "A bird dives vertically downward in air towards the surface of a calm lake with a speed of 12 m/s. To a fish resting underwater (water refractive index μ = 4/3), the apparent speed of the approaching bird is:",
      option_a: "16 m/s",
      option_b: "9 m/s",
      option_c: "12 m/s",
      option_d: "15 m/s",
      correct_option: "A",
      explanation: "Step 1: When an object in a rarer medium (air) is viewed from a denser medium (water), its apparent height is greater than its real height:\ny_apparent = μ × y_real\n\nStep 2: Differentiating with respect to time gives the apparent velocity:\nv_apparent = μ × (dy_real / dt) = μ × v_actual\n\nStep 3: Substitute μ = 4/3 and v_actual = 12 m/s:\nv_apparent = (4 / 3) × 12 m/s = 16 m/s.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 368,
    similarQuestion: {
      question: "Two thin lenses in contact form an achromatic combination of equivalent focal length +20 cm. If the ratio of the dispersive powers of their materials is ω₁ / ω₂ = 2 : 3, the individual focal lengths f₁ and f₂ of the two lenses are:",
      option_a: "+10 cm and -15 cm",
      option_b: "+6.67 cm and -10 cm",
      option_c: "+20 cm and -30 cm",
      option_d: "+15 cm and -25 cm",
      correct_option: "B",
      explanation: "Step 1: The condition for an achromatic doublet of two lenses in contact is:\nω₁ / f₁ + ω₂ / f₂ = 0 => f₁ / f₂ = -ω₁ / ω₂ = -2 / 3 => f₂ = -1.5 f₁.\n\nStep 2: The equivalent focal length is given by 1/F = 1/f₁ + 1/f₂:\n1/20 = 1/f₁ - 1/(1.5 f₁) = 0.5 / (1.5 f₁) = 1 / (3 f₁)\n3 f₁ = 20 => f₁ = 20 / 3 ≈ +6.67 cm.\n\nStep 3: Find f₂:\nf₂ = -1.5 × (20 / 3) = -10 cm.\n\nTherefore, Option (B) is the correct answer."
    }
  },
  {
    id: 369,
    similarQuestion: {
      question: "A ray of light in air strikes the upper surface of a parallel-sided glass slab of refractive index μ = √3 at an angle of incidence i = 60°. The angle of refraction r inside the slab is:",
      option_a: "45°",
      option_b: "60°",
      option_c: "30°",
      option_d: "15°",
      correct_option: "C",
      explanation: "Step 1: Apply Snell's Law at the upper air-glass interface:\n1 × sin i = μ × sin r\n\nStep 2: Substitute i = 60° and μ = √3:\nsin 60° = √3 × sin r\n√3 / 2 = √3 × sin r\nsin r = 1 / 2\n\nStep 3: Solve for r:\nr = sin⁻¹(1/2) = 30°.\n\nTherefore, Option (C) is the correct answer."
    }
  },
  {
    id: 370,
    similarQuestion: {
      question: "A plane mirror is inclined at an angle of 30° to the horizontal. A ray of light directed vertically downwards strikes the mirror. The angle that the reflected ray makes with the horizontal is:",
      option_a: "60°",
      option_b: "45°",
      option_c: "30°",
      option_d: "90°",
      correct_option: "C",
      explanation: "Step 1: The normal to the mirror is inclined at 30° to the vertical.\nTherefore, the angle of incidence between the vertical incident ray and the normal is i = 30°.\n\nStep 2: By the law of reflection, the angle of reflection is r = 30° on the other side of the normal.\n\nStep 3: The angle between the incident ray and the reflected ray is 2i = 60°.\nSince the incident ray is vertical (90° to the horizontal), the reflected ray makes an angle of 90° - 60° = 30° with the horizontal.\n\nTherefore, Option (C) is the correct answer."
    }
  },
  {
    id: 371,
    similarQuestion: {
      question: "A real object moves with a velocity of 6 m/s towards a stationary plane mirror along the normal to the mirror. The velocity of the image relative to the object is:",
      option_a: "6 m/s",
      option_b: "12 m/s towards the object",
      option_c: "Zero",
      option_d: "3 m/s",
      correct_option: "B",
      explanation: "Step 1: For a stationary plane mirror, the image moves with velocity equal in magnitude and opposite in direction to the object: v_image = -v_object = -6 m/s.\n\nStep 2: The relative velocity of the image with respect to the object is:\nv_rel = v_image - v_object = -6 m/s - (+6 m/s) = -12 m/s.\n\nStep 3: Hence, the image approaches the object at a speed of 12 m/s.\n\nTherefore, Option (B) is the correct answer."
    }
  },
  {
    id: 372,
    similarQuestion: {
      question: "A ray of light propagates from flint glass of refractive index 1.60 into air. The critical angle for total internal reflection is:",
      option_a: "30.0°",
      option_b: "38.7°",
      option_c: "45.0°",
      option_d: "51.3°",
      correct_option: "B",
      explanation: "Step 1: The critical angle C for a glass-air boundary is given by:\nsin C = 1 / μ\n\nStep 2: Substitute μ = 1.60 = 8/5:\nsin C = 1 / 1.60 = 5 / 8 = 0.625.\n\nStep 3: Compute C:\nC = sin⁻¹(0.625) ≈ 38.68° ≈ 38.7°.\n\nTherefore, Option (B) is the correct answer."
    }
  },
  {
    id: 373,
    similarQuestion: {
      question: "A biconvex glass lens of refractive index n₁ = 1.50 is immersed completely in a liquid of refractive index n₂ = 1.65. In this liquid, the lens will behave as a:",
      option_a: "Converging lens of shorter focal length",
      option_b: "Converging lens of longer focal length",
      option_c: "Plane glass plate of infinite focal length",
      option_d: "Diverging (concave) lens",
      correct_option: "D",
      explanation: "Step 1: Lens Maker's formula in a surrounding medium is:\n1 / f_liquid = [(n₁ / n₂) - 1] × (1/R₁ - 1/R₂)\n\nStep 2: For a biconvex lens, (1/R₁ - 1/R₂) > 0.\n\nStep 3: When immersed in a medium where n₂ > n₁ (surrounding medium is denser than the lens material):\n(n₁ / n₂) < 1 => [(n₁ / n₂) - 1] < 0.\n\nStep 4: Consequently, the focal length f_liquid becomes negative, transforming the converging lens into a diverging lens.\n\nTherefore, Option (D) is the correct answer."
    }
  },
  {
    id: 5906,
    similarQuestion: {
      question: "A ray of light passes across the flat interface between medium a (refractive index μ_a) and medium b (refractive index μ_b). If the angle of incidence is θ_a and angle of refraction is θ_b, then by Snell's law:",
      option_a: "μ_a × cos θ_a = μ_b × cos θ_b",
      option_b: "μ_a / sin θ_a = μ_b / sin θ_b",
      option_c: "μ_a × tan θ_a = μ_b × tan θ_b",
      option_d: "μ_a × sin θ_a = μ_b × sin θ_b",
      correct_option: "D",
      explanation: "Step 1: Snell's law governs the refraction of light across a planar boundary between two isotropic dielectric media.\n\nStep 2: It states that the product of the refractive index and the sine of the angle to the normal is constant across the interface:\nμ_a × sin θ_a = μ_b × sin θ_b.\n\nTherefore, Option (D) is the correct answer."
    }
  },
  {
    id: 5907,
    similarQuestion: {
      question: "A mark on a table is viewed normally through two stacked transparent plates: Plate 1 has thickness 3.0 cm and refractive index 1.5, while Plate 2 has thickness 4.0 cm and refractive index 4/3. The total apparent upward shift of the mark is:",
      option_a: "1.0 cm",
      option_b: "2.0 cm",
      option_c: "3.5 cm",
      option_d: "0.5 cm",
      correct_option: "B",
      explanation: "Step 1: The apparent upward shift produced by multiple stacked plates is the sum of the individual shifts:\nΔy = t₁ (1 - 1/μ₁) + t₂ (1 - 1/μ₂)\n\nStep 2: Calculate the shift for each plate:\nΔy₁ = 3.0 × (1 - 1/1.5) = 3.0 × (1/3) = 1.0 cm\nΔy₂ = 4.0 × (1 - 3/4) = 4.0 × (1/4) = 1.0 cm\n\nStep 3: Total shift is:\nΔy = 1.0 cm + 1.0 cm = 2.0 cm.\n\nTherefore, Option (B) is the correct answer."
    }
  },
  {
    id: 5908,
    similarQuestion: {
      question: "A light ray in air strikes a glass slab of thickness t = 5√3 cm and refractive index μ = √3 at an angle of incidence i = 60°. The lateral displacement (shift) of the emergent ray is:",
      option_a: "2.5 cm",
      option_b: "7.5 cm",
      option_c: "10.0 cm",
      option_d: "5.0 cm",
      correct_option: "D",
      explanation: "Step 1: Find the angle of refraction r using Snell's law:\nsin r = sin 60° / μ = (√3 / 2) / √3 = 1 / 2 => r = 30°.\n\nStep 2: The lateral displacement formula is:\nd = [t × sin(i - r)] / cos r\n\nStep 3: Substitute the known values:\ni - r = 60° - 30° = 30°\nt = 5√3 cm\ncos 30° = √3 / 2\nsin 30° = 1 / 2\n\nd = [5√3 × (1/2)] / (√3 / 2) = 5.0 cm.\n\nTherefore, Option (D) is the correct answer."
    }
  },
  {
    id: 5909,
    similarQuestion: {
      question: "A thin cylindrical rod of actual length L is submerged vertically in a liquid of refractive index μ. When viewed from air directly above the liquid surface, the apparent length of the rod is:",
      option_a: "μ × L",
      option_b: "L / μ",
      option_c: "L × (1 - 1/μ)",
      option_d: "L / (μ - 1)",
      correct_option: "B",
      explanation: "Step 1: For near-normal viewing from a rarer into a denser medium, the apparent depth y' of any submerged point at true depth y is given by y' = y / μ.\n\nStep 2: The top end of the rod at depth y₁ appears at y₁ / μ, and the bottom end at depth y₂ appears at y₂ / μ.\n\nStep 3: The apparent length of the rod is:\nL' = (y₂ - y₁) / μ = L / μ.\n\nTherefore, Option (B) is the correct answer."
    }
  },
  {
    id: 5910,
    similarQuestion: {
      question: "A light ray travelling in a medium of refractive index √2 strikes a planar interface with air at an angle of incidence of 30°. The angle of refraction in air is:",
      option_a: "45°",
      option_b: "60°",
      option_c: "30°",
      option_d: "90°",
      correct_option: "A",
      explanation: "Step 1: By Snell's Law:\nμ × sin i = 1 × sin r\n\nStep 2: Substitute μ = √2 and i = 30°:\n√2 × sin 30° = sin r\n√2 × (1 / 2) = sin r\nsin r = 1 / √2\n\nStep 3: Solve for r:\nr = sin⁻¹(1 / √2) = 45°.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 5911,
    similarQuestion: {
      question: "A ray of light is incident normally on one face of a 30° glass prism of refractive index μ = √2. The total angular deviation suffered by the ray upon emerging into air is:",
      option_a: "30°",
      option_b: "45°",
      option_c: "15°",
      option_d: "60°",
      correct_option: "C",
      explanation: "Step 1: Because the ray enters the first face normally, angle of incidence is 0°, so r₁ = 0°.\n\nStep 2: At the second face, the angle of incidence is:\nr₂ = A - r₁ = 30° - 0° = 30°.\n\nStep 3: Apply Snell's law at the second face:\nμ × sin r₂ = 1 × sin e\n√2 × sin 30° = sin e => sin e = √2 × (1/2) = 1 / √2 => e = 45°.\n\nStep 4: The angular deviation is:\nδ = e - r₂ = 45° - 30° = 15°.\n\nTherefore, Option (C) is the correct answer."
    }
  },
  {
    id: 5912,
    similarQuestion: {
      question: "In the characteristic plot of angular deviation δ versus angle of incidence i for a triangular optical prism, the angle of minimum deviation occurs when:",
      option_a: "The angle of incidence is 0°",
      option_b: "The angle of emergence is 90°",
      option_c: "The angle of refraction at the first face is zero",
      option_d: "The angle of incidence equals the angle of emergence (i = e)",
      correct_option: "D",
      explanation: "Step 1: The deviation produced by a prism is δ = i + e - A.\n\nStep 2: By the principle of reversibility of light, exchanging i and e gives the same deviation δ.\n\nStep 3: Therefore, the minimum of the U-shaped curve occurs at the point of symmetry where i = e and r₁ = r₂ = A / 2.\n\nTherefore, Option (D) is the correct answer."
    }
  },
  {
    id: 5913,
    similarQuestion: {
      question: "A thin glass prism (μ = 1.5) produces a minimum deviation δ₁ in air. When completely immersed in water (μ = 4/3), it produces a minimum deviation δ₂. The ratio δ₁ / δ₂ is:",
      option_a: "2 : 1",
      option_b: "4 : 1",
      option_c: "1 : 4",
      option_d: "9 : 8",
      correct_option: "B",
      explanation: "Step 1: The deviation for a thin prism in air is:\nδ₁ = (μ_g - 1) × A = (1.5 - 1) × A = 0.5 A.\n\nStep 2: The deviation when immersed in water is:\nδ₂ = [(μ_g / μ_w) - 1] × A = [(1.5 / (4/3)) - 1] × A = [(9/8) - 1] × A = (1/8) A.\n\nStep 3: Compute their ratio:\nδ₁ / δ₂ = (0.5 A) / [(1/8) A] = (1/2) / (1/8) = 8 / 2 = 4 : 1.\n\nTherefore, Option (B) is the correct answer."
    }
  },
  {
    id: 5914,
    similarQuestion: {
      question: "When white light passes through a dispersive glass prism, which visible spectral color travels with the greatest speed inside the glass?",
      option_a: "Red light",
      option_b: "Violet light",
      option_c: "Green light",
      option_d: "Yellow light",
      correct_option: "A",
      explanation: "Step 1: By Cauchy's dispersion formula, refractive index decreases with increasing wavelength: μ_red < μ_violet.\n\nStep 2: The speed of light in a medium is v = c / μ.\n\nStep 3: Since red light has the lowest refractive index in the visible spectrum, it travels with the highest speed.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 5915,
    similarQuestion: {
      question: "Light travelling in air falls at an angle of incidence of 2.0° on one face of a thin glass prism of apex angle 4.0° and refractive index 1.5. The angular deviation produced by the prism is:",
      option_a: "4.0°",
      option_b: "1.0°",
      option_c: "2.0°",
      option_d: "0.5°",
      correct_option: "C",
      explanation: "Step 1: For small angles of incidence on a thin prism, the angular deviation is practically independent of incidence angle and is given by:\nδ = (μ - 1) × A\n\nStep 2: Substitute μ = 1.5 and A = 4.0°:\nδ = (1.5 - 1) × 4.0° = 0.5 × 4.0° = 2.0°.\n\nTherefore, Option (C) is the correct answer."
    }
  },
  {
    id: 5916,
    similarQuestion: {
      question: "At the position of minimum deviation for an equilateral triangular prism (A = 60°), the angle of refraction inside the prism at the first face is:",
      option_a: "60°",
      option_b: "30°",
      option_c: "45°",
      option_d: "15°",
      correct_option: "B",
      explanation: "Step 1: At the condition of minimum deviation, symmetry dictates that r₁ = r₂ = r.\n\nStep 2: From the prism geometry relation r₁ + r₂ = A:\n2r = A => r = A / 2\n\nStep 3: For an equilateral prism, A = 60°:\nr = 60° / 2 = 30°.\n\nTherefore, Option (B) is the correct answer."
    }
  },
  {
    id: 5917,
    similarQuestion: {
      question: "When a monochromatic ray of light undergoes minimum deviation through an isosceles triangular glass prism, the refracted ray inside the prism travels:",
      option_a: "Parallel to the base of the prism",
      option_b: "Perpendicular to the base of the prism",
      option_c: "Along the normal to the first face",
      option_d: "Towards the apex of the prism",
      correct_option: "A",
      explanation: "Step 1: At minimum deviation, the angles of incidence and emergence are equal (i = e), which means r₁ = r₂ = A / 2.\n\nStep 2: By geometric symmetry, the ray passes through the prism symmetrically.\n\nStep 3: In an isosceles or equilateral prism with equal base angles, this symmetrical path is strictly parallel to the base of the prism.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 5918,
    similarQuestion: {
      question: "A ray of light is incident at an angle of 60° on a glass prism of refracting angle A = 30°. If the ray emerges into air at an angle of 30°, the total angular deviation suffered by the ray is:",
      option_a: "60°",
      option_b: "30°",
      option_c: "45°",
      option_d: "90°",
      correct_option: "A",
      explanation: "Step 1: The general formula for angular deviation produced by any prism is:\nδ = i + e - A\n\nStep 2: Substitute i = 60°, e = 30°, and A = 30°:\nδ = 60° + 30° - 30° = 60°.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 5919,
    similarQuestion: {
      question: "A ray of light is incident perpendicularly on one face of an equilateral prism (A = 60°) and just grazes the opposite face upon emergence. The refractive index of the prism material is:",
      option_a: "√3 / 2",
      option_b: "1.5",
      option_c: "√2",
      option_d: "2 / √3",
      correct_option: "D",
      explanation: "Step 1: Normal incidence on the first face means r₁ = 0°.\n\nStep 2: From r₁ + r₂ = A, we have r₂ = A = 60°.\n\nStep 3: Grazing emergence means the emergence angle is e = 90°, so the angle of incidence at the second face equals the critical angle C:\nC = r₂ = 60°.\n\nStep 4: By definition of critical angle, sin C = 1 / μ:\nμ = 1 / sin 60° = 1 / (√3 / 2) = 2 / √3.\n\nTherefore, Option (D) is the correct answer."
    }
  },
  {
    id: 5920,
    similarQuestion: {
      question: "Two plane mirrors are inclined at an angle θ. A light ray incident on one mirror parallel to the second mirror retraces its path after two successive reflections. The angle θ between the mirrors is:",
      option_a: "60°",
      option_b: "30°",
      option_c: "90°",
      option_d: "45°",
      correct_option: "D",
      explanation: "Step 1: For the ray to retrace its path after two reflections, it must strike the second mirror perpendicularly (normal incidence, angle of incidence = 0°).\n\nStep 2: From the geometry of the triangle formed by the two mirror surfaces and the reflected ray path:\nθ + 90° + (90° - θ) gives θ = 45° for parallel entrance and normal second reflection.\n\nTherefore, Option (D) is the correct answer."
    }
  }
];

async function run() {
  try {
    const loginRes = await fetch(`${BASE_URL}/admin/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        username: 'indraprasthaadmin',
        password: 'indraprastha@123'
      })
    });
    const loginData = await loginRes.json();
    const token = loginData.token;
    console.log('Login successful for Set 59 Part 2.');

    for (let i = 0; i < questionsPart2.length; i++) {
      const q = questionsPart2[i];
      const res = await fetch(`${BASE_URL}/admin/practice-questions/${q.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ similarQuestion: q.similarQuestion })
      });
      if (!res.ok) {
        const text = await res.text();
        throw new Error(`Failed on ID ${q.id} [${res.status}]: ${text}`);
      }
      console.log(`Updated question ${i + 31}/${questionsPart2.length + 30} (ID: ${q.id})`);
    }
    console.log('Set 59 Part 2 completed successfully!');
  } catch (err) {
    console.error('Error updating Set 59 Part 2:', err.message);
  }
}

run();
