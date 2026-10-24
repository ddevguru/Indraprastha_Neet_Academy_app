const BASE_URL = 'https://api.indraprasthaneetacademy.com/api';

const questionsPart4 = [
  {
    id: 5951,
    similarQuestion: {
      question: "Two identical thin plano-convex lenses each of focal length 20 cm are placed in coaxial contact with their curved surfaces touching. The focal length of the combination is:",
      option_a: "10 cm",
      option_b: "20 cm",
      option_c: "40 cm",
      option_d: "5 cm",
      correct_option: "A",
      explanation: "Step 1: The equivalent focal length F of two thin lenses in contact is given by:\n1 / F = 1 / f₁ + 1 / f₂\n\nStep 2: Here f₁ = f₂ = 20 cm:\n1 / F = 1/20 + 1/20 = 2/20 = 1/10.\n\nStep 3: Solve for F:\nF = 10 cm.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 5952,
    similarQuestion: {
      question: "For a thin converging lens of focal length f, the minimum physical distance between a real object and its real image is:",
      option_a: "2 f",
      option_b: "f",
      option_c: "4 f",
      option_d: "f / 2",
      correct_option: "C",
      explanation: "Step 1: Let the separation between real object and real image be D = u + v.\n\nStep 2: Using the lens formula, u² - D u + D f = 0. For real roots of u, the discriminant must satisfy D² - 4 D f ≥ 0.\n\nStep 3: Hence, D ≥ 4 f. The minimum distance is achieved when u = 2f and v = 2f, giving D_min = 4 f.\n\nTherefore, Option (C) is the correct answer."
    }
  },
  {
    id: 5953,
    similarQuestion: {
      question: "An object and a screen are separated by a fixed distance of 100 cm. A convex lens forms a sharp image on the screen at two positions separated by a displacement of 40 cm. The focal length of the lens is:",
      option_a: "25.0 cm",
      option_b: "18.5 cm",
      option_c: "21.0 cm",
      option_d: "15.0 cm",
      correct_option: "C",
      explanation: "Step 1: In the lens displacement method, the focal length is related to the object-screen distance D and lens displacement d by:\nf = (D² - d²) / (4 D)\n\nStep 2: Substitute D = 100 cm and d = 40 cm:\nf = (100² - 40²) / (4 × 100) = (10000 - 1600) / 400 = 8400 / 400 = 21.0 cm.\n\nTherefore, Option (C) is the correct answer."
    }
  },
  {
    id: 5954,
    similarQuestion: {
      question: "A thin symmetric biconvex lens of focal length 50 cm is cut into two equal halves by a plane perpendicular to its principal axis. The focal length of each resulting plano-convex half lens is:",
      option_a: "25 cm",
      option_b: "50 cm",
      option_c: "75 cm",
      option_d: "100 cm",
      correct_option: "D",
      explanation: "Step 1: For the original biconvex lens, 1/f = (μ - 1) (1/R - (-1/R)) = 2(μ - 1)/R.\n\nStep 2: When cut transverse to the principal axis, each half becomes a plano-convex lens with radii R₁ = R and R₂ = ∞:\n1/f' = (μ - 1) (1/R - 0) = (μ - 1)/R = (1/2) × (1/f).\n\nStep 3: Therefore, f' = 2 f = 2 × 50 cm = 100 cm.\n\nTherefore, Option (D) is the correct answer."
    }
  },
  {
    id: 5955,
    similarQuestion: {
      question: "Two identical thin plano-convex lenses each of focal length f are placed in contact. The equivalent focal length of the combination:",
      option_a: "Is f / 2 only when curved faces touch",
      option_b: "Is f / 2 only when flat faces touch",
      option_c: "Is 2 f in all configurations",
      option_d: "Is strictly equal to f / 2 in all possible contact arrangements",
      correct_option: "D",
      explanation: "Step 1: For thin lenses in coaxial contact with negligible separation, the equivalent power is P_eq = P₁ + P₂ regardless of orientation.\n\nStep 2: Since each lens has power P = 1 / f, the total power is P_eq = 1/f + 1/f = 2/f.\n\nStep 3: Therefore, the equivalent focal length is F = 1 / P_eq = f / 2 in all configurations.\n\nTherefore, Option (D) is the correct answer."
    }
  },
  {
    id: 5956,
    similarQuestion: {
      question: "Two thin converging lenses of focal lengths 10 cm and 20 cm are placed coaxially such that an incident parallel beam of light emerges from the second lens as a parallel beam. The separation between the two lenses is:",
      option_a: "10 cm",
      option_b: "20 cm",
      option_c: "15 cm",
      option_d: "30 cm",
      correct_option: "D",
      explanation: "Step 1: The incident parallel beam focuses at the second focal point of the first lens, at distance f₁ = 10 cm behind it.\n\nStep 2: For the emerging light from the second lens to be parallel, this focal point must coincide with the first focal point of the second lens (at distance f₂ = 20 cm in front of it).\n\nStep 3: The separation between the two lenses must be:\nd = f₁ + f₂ = 10 cm + 20 cm = 30 cm.\n\nTherefore, Option (D) is the correct answer."
    }
  },
  {
    id: 5957,
    similarQuestion: {
      question: "A meniscus glass lens (refractive index μ = 1.5) has a concave surface of radius of curvature 20 cm and a convex surface of radius of curvature 30 cm. Its focal length is:",
      option_a: "+60 cm",
      option_b: "-120 cm",
      option_c: "+120 cm",
      option_d: "-60 cm",
      correct_option: "B",
      explanation: "Step 1: With light incident from the concave side, R₁ = -20 cm and R₂ = -30 cm (both centres on same side).\n\nStep 2: Apply the Lens Maker's formula:\n1/f = (μ - 1) × (1/R₁ - 1/R₂)\n\nStep 3: Substitute the parameters:\n1/f = (1.5 - 1) × [1/(-20) - 1/(-30)] = 0.5 × [-1/20 + 1/30] = 0.5 × [(-3 + 2) / 60] = 0.5 × (-1/60) = -1 / 120.\n\nStep 4: Solve for f:\nf = -120 cm.\n\nTherefore, Option (B) is the correct answer."
    }
  },
  {
    id: 5958,
    similarQuestion: {
      question: "An achromatic doublet lens system consists of a convex lens and a concave lens placed in contact. Its primary optical purpose is to:",
      option_a: "Eliminate spherical aberration completely",
      option_b: "Increase optical magnification indefinitely",
      option_c: "Eliminate coma and astigmatism",
      option_d: "Bring two chosen colors of light to a common focus, thereby minimizing chromatic aberration",
      correct_option: "D",
      explanation: "Step 1: Chromatic aberration arises because glass disperses white light into colors with different focal lengths.\n\nStep 2: By pairing a converging lens of crown glass with a diverging lens of flint glass of appropriate powers, the dispersions cancel while retaining a net converging power.\n\nStep 3: This focuses two selected colors (usually red and blue) at the same focal point, minimizing chromatic aberration.\n\nTherefore, Option (D) is the correct answer."
    }
  },
  {
    id: 5959,
    similarQuestion: {
      question: "When a real object is placed 20 cm to the left of a single thin plano-convex lens, a real image appears 40 cm to the right of the lens. If two such identical plano-convex lenses are placed back-to-back in contact, the image of an object placed 20 cm to the left of the new combination will form at:",
      option_a: "6.7 cm to the right",
      option_b: "10.0 cm to the right",
      option_c: "20.0 cm to the right",
      option_d: "40.0 cm to the right",
      correct_option: "B",
      explanation: "Step 1: For the single plano-convex lens with u = -20 cm and v = +40 cm:\n1/f = 1/v - 1/u = 1/40 - 1/(-20) = 1/40 + 2/40 = 3/40 => f = 40/3 cm.\n\nStep 2: When two identical lenses are placed in contact, the equivalent focal length is:\n1/F = 1/f + 1/f = 2/f = 2 / (40/3) = 6/40 = 3/20 => F = 20/3 cm.\n\nStep 3: With the object at u = -20 cm from this combined double convex lens:\n1/v = 1/F + 1/u = 3/20 - 1/20 = 2/20 = 1/10 => v = +10 cm.\nTherefore, the image is formed 10 cm to the right of the combination.\n\nTherefore, Option (B) is the correct answer."
    }
  },
  {
    id: 5960,
    similarQuestion: {
      question: "When light rays travel from an optically denser medium into an optically rarer medium, which of the following physical phenomena can occur depending on the angle of incidence?",
      option_a: "Refraction with deviation away from the normal, or total internal reflection if angle of incidence exceeds the critical angle",
      option_b: "Refraction towards the normal only",
      option_c: "Complete absorption with zero transmission",
      option_d: "Dispersion into infrared rays only",
      correct_option: "A",
      explanation: "Step 1: Light passing from a denser medium (higher index) to a rarer medium (lower index) bends away from the normal (r > i).\n\nStep 2: As the angle of incidence increases, the angle of refraction reaches 90° at the critical angle C.\n\nStep 3: For any angle of incidence i > C, no refracted light enters the second medium, and the entire light is totally reflected back into the denser medium.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 5961,
    similarQuestion: {
      question: "A thick plano-convex glass lens has radius of curvature R, refractive index μ, and thickness t. Parallel light rays incident on the plane surface converge at distance x from that surface, while parallel rays incident on the curved surface converge at distance y from the curved surface. Then:",
      option_a: "x = y",
      option_b: "x < y",
      option_c: "x > y",
      option_d: "x and y cannot be compared",
      correct_option: "C",
      explanation: "Step 1: When light strikes the plane face first, refraction occurs only at the exit curved face after travelling through thickness t of glass.\n\nStep 2: When light strikes the curved face first, refraction occurs immediately at the front surface and the rays converge while travelling through the glass thickness t.\n\nStep 3: Because the refractive index of glass is greater than air (μ > 1), the apparent path through glass shifts the focal distance outward when entering the plane surface first, yielding x > y.\n\nTherefore, Option (C) is the correct answer."
    }
  },
  {
    id: 5962,
    similarQuestion: {
      question: "An equiconvex glass lens of refractive index μ_g is immersed in an ambient optical medium of refractive index μ_m. The lens will behave as a diverging lens if:",
      option_a: "μ_m < μ_g",
      option_b: "μ_m > μ_g",
      option_c: "μ_m = μ_g",
      option_d: "μ_m = 1",
      correct_option: "B",
      explanation: "Step 1: The focal length in the medium is given by 1/f = [(μ_g / μ_m) - 1] × (2 / R).\n\nStep 2: If the surrounding medium has a higher refractive index than the lens material (μ_m > μ_g), the term [(μ_g / μ_m) - 1] becomes negative.\n\nStep 3: A negative focal length means the lens diverges light rays, acting as a concave/diverging lens.\n\nTherefore, Option (B) is the correct answer."
    }
  },
  {
    id: 5963,
    similarQuestion: {
      question: "Which of the following optical combinations correctly matches an optical instrument with the nature of its final image?",
      option_a: "Simple magnifying glass: Virtual, erect, and magnified image formed at the near point",
      option_b: "Astronomical telescope: Real, erect, and highly magnified image",
      option_c: "Compound microscope: Real, erect, and diminished image",
      option_d: "Terrestrial telescope: Virtual, inverted image",
      correct_option: "A",
      explanation: "Step 1: A simple magnifying glass consists of a single converging lens.\n\nStep 2: When an object is held within its focal length (u < f), the lens forms an erect, virtual, and magnified image on the same side as the object.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 5964,
    similarQuestion: {
      question: "A paraxial ray of light travelling parallel to the principal axis at a perpendicular distance h from the axis strikes a thin lens of focal length f (where h << f). The angular deviation δ produced by the lens is approximately:",
      option_a: "180° - h / f",
      option_b: "h / f",
      option_c: "2 h / f",
      option_d: "f / h",
      correct_option: "B",
      explanation: "Step 1: The ray parallel to the axis refracts through the lens and passes through the principal focus F at distance f on the axis.\n\nStep 2: In the right triangle formed by the lens centre, the incident point at height h, and the focus at distance f, the angle of deviation δ satisfies:\ntan δ = h / f\n\nStep 3: For paraxial rays (h << f), the angle δ is very small, so tan δ ≈ δ = h / f radians.\n\nTherefore, Option (B) is the correct answer."
    }
  },
  {
    id: 5965,
    similarQuestion: {
      question: "A diverging lens of focal length 25 cm is placed 15 cm in front of a converging lens of focal length 20 cm. A parallel beam of light falls on the diverging lens. The final image formed by the system is:",
      option_a: "Real and at a distance of 40 cm from the divergent lens",
      option_b: "Real and at a distance of 6 cm from the convergent lens",
      option_c: "Real and at a distance of 40 cm behind the convergent lens",
      option_d: "Virtual and at a distance of 40 cm behind the convergent lens",
      correct_option: "C",
      explanation: "Step 1: The parallel beam entering the diverging lens (f₁ = -25 cm) forms a virtual image 25 cm in front of it.\n\nStep 2: This virtual image acts as a real object for the converging lens (f₂ = +20 cm) located 15 cm behind the first lens.\nObject distance for the converging lens is u₂ = -(25 cm + 15 cm) = -40 cm.\n\nStep 3: Apply the lens formula 1/v₂ - 1/u₂ = 1/f₂:\n1/v₂ = 1/20 + 1/(-40) = 2/40 - 1/40 = 1/40 => v₂ = +40 cm.\nThus, the final image is real and formed 40 cm behind the convergent lens.\n\nTherefore, Option (C) is the correct answer."
    }
  },
  {
    id: 5966,
    similarQuestion: {
      question: "A thin convex lens of focal length 20 cm in air is constructed such that its upper half is immersed in a medium of refractive index 1.2 and its lower half is in a medium of refractive index 2.5. For an object at infinity, the separation between the two images formed along the principal axis is:",
      option_a: "15 cm",
      option_b: "40 cm",
      option_c: "25 cm",
      option_d: "65 cm",
      correct_option: "D",
      explanation: "Step 1: The focal length of a lens in any medium is given by 1/f_med = [(μ_lens / μ_med) - 1] × (1/R₁ - 1/R₂).\n\nStep 2: In air (μ = 1.0, f_air = 20 cm): (1/R₁ - 1/R₂) = 1 / [(1.5 - 1) × 20] = 1 / 10 cm⁻¹.\n\nStep 3: For the upper half in medium μ₁ = 1.2:\n1/f₁ = (1.5 / 1.2 - 1) × (1/10) = (1.25 - 1) / 10 = 0.25 / 10 = 1 / 40 => f₁ = +40 cm.\n\nStep 4: For the lower half in medium μ₂ = 2.5:\n1/f₂ = (1.5 / 2.5 - 1) × (1/10) = (0.6 - 1) / 10 = -0.4 / 10 = -1 / 25 => f₂ = -25 cm.\n\nStep 5: The separation between the two images formed along the axis is:\nΔx = |f₁ - f₂| = 40 cm - (-25 cm) = 65 cm.\n\nTherefore, Option (D) is the correct answer."
    }
  },
  {
    id: 5967,
    similarQuestion: {
      question: "An object approaches a thin converging lens from a large distance with a uniform speed v and stops at the focus. The real image formed on the other side:",
      option_a: "Moves away from the lens with a uniform speed v",
      option_b: "Moves away with uniform acceleration",
      option_c: "Moves away from the lens with non-uniform acceleration towards infinity",
      option_d: "Moves towards the lens with uniform speed",
      correct_option: "C",
      explanation: "Step 1: Differentiating the lens formula 1/v - 1/u = 1/f with respect to time gives the image velocity:\nv_image = (v / u)² × v_object = m² × v_object\n\nStep 2: As the object approaches the focus (u → f), the linear magnification m = f / (u - f) increases without bound towards infinity.\n\nStep 3: Therefore, the image velocity v_image increases non-linearly, meaning the image recedes with non-uniform acceleration towards infinity.\n\nTherefore, Option (C) is the correct answer."
    }
  },
  {
    id: 5968,
    similarQuestion: {
      question: "Two point light sources S₁ and S₂ are separated by 24 cm. Where should a convex lens of focal length 9 cm be placed between them so that the images of both sources are formed at the exact same location?",
      option_a: "6 cm from S₁",
      option_b: "15 cm from S₁",
      option_c: "10 cm from S₁",
      option_d: "12 cm from S₁",
      correct_option: "A",
      explanation: "Step 1: One image must be real (formed by rays from S₁) and the other image must be virtual (formed by rays from S₂), both coinciding at the same position.\n\nStep 2: Let the lens be at distance x from S₁ (real object u₁ = -x) and distance (24 - x) from S₂ (u₂ = -(24 - x)).\nReal image distance: 1/v₁ = 1/9 - 1/x = (x - 9) / (9x).\nVirtual image distance: -1/v₁ = 1/9 - 1/(24 - x) => 1/v₁ = 1/(24 - x) - 1/9 = (x - 15) / [9(24 - x)].\n\nStep 3: Equate the two expressions:\n(x - 9) / x = (x - 15) / (24 - x)\n(x - 9)(24 - x) = x(x - 15)\n24x - x² - 216 + 9x = x² - 15x\n2x² - 48x + 216 = 0 => x² - 24x + 108 = 0\n(x - 6)(x - 18) = 0 => x = 6 cm or 18 cm.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 5969,
    similarQuestion: {
      question: "An equiconvex lens of refractive index μ and radius of curvature R has one of its convex faces silvered. A point object placed on the axis in front of the unsilvered face forms an image that coincides with the object itself when the object distance is:",
      option_a: "R / (μ - 1)",
      option_b: "2 R / (μ - 1)",
      option_c: "R / (2μ - 1)",
      option_d: "2 R / (2μ - 1)",
      correct_option: "C",
      explanation: "Step 1: The silvered lens acts as an equivalent concave mirror of focal length F given by:\nP_eq = 2 P_lens + P_mirror\n\nStep 2: For the equiconvex lens, 1/f_l = 2(μ - 1)/R. For the silvered mirror surface, 1/f_m = 2/R.\nP_eq = 2 × [2(μ - 1)/R] + 2/R = [4(μ - 1) + 2] / R = (4μ - 2) / R = 2(2μ - 1) / R.\n\nStep 3: The equivalent focal length is F = R / [2(2μ - 1)].\n\nStep 4: For the image to coincide with the object, the object must be at the centre of curvature of the equivalent mirror: u = 2 F = R / (2μ - 1).\n\nTherefore, Option (C) is the correct answer."
    }
  },
  {
    id: 5970,
    similarQuestion: {
      question: "Two identical thin plano-convex lenses of radius of curvature r and refractive index 1.5 are placed in contact with their curved surfaces touching. The focal length of the combination is:",
      option_a: "2 r",
      option_b: "r",
      option_c: "r / 2",
      option_d: "-r",
      correct_option: "B",
      explanation: "Step 1: The focal length of a single plano-convex lens of radius r and index μ = 1.5 is:\n1/f = (μ - 1) / r = (1.5 - 1) / r = 0.5 / r = 1 / (2r) => f = 2r.\n\nStep 2: When two such lenses are placed in contact:\n1/F = 1/f + 1/f = 1/(2r) + 1/(2r) = 2 / (2r) = 1 / r.\n\nStep 3: Solve for equivalent focal length F:\nF = r.\n\nTherefore, Option (B) is the correct answer."
    }
  },
  {
    id: 5971,
    similarQuestion: {
      question: "When a convergent beam of light passes through a thin diverging (concave) lens, the transmitted beam:",
      option_a: "May be converging",
      option_b: "May be diverging",
      option_c: "May be parallel",
      option_d: "All of the above are possible depending on the position of the point of convergence",
      correct_option: "D",
      explanation: "Step 1: The converging incident beam forms a virtual object at distance +u behind the lens.\n\nStep 2: By the lens formula 1/v = 1/u - 1/f:\n- If u < f: 1/v > 0, so rays converge to form a real image.\n- If u = f: 1/v = 0, so rays emerge as a parallel beam.\n- If u > f: 1/v < 0, so rays diverge from a virtual image.\n\nStep 3: Therefore, all three outcomes are physically possible.\n\nTherefore, Option (D) is the correct answer."
    }
  },
  {
    id: 5972,
    similarQuestion: {
      question: "A symmetric double convex lens of optical power +4.0 D is cut into two equal halves along a plane containing its principal axis. The optical power of each half lens is:",
      option_a: "+2.0 D",
      option_b: "+3.0 D",
      option_c: "+4.0 D",
      option_d: "+8.0 D",
      correct_option: "C",
      explanation: "Step 1: By the Lens Maker's formula, optical power depends only on the refractive index and the radii of curvature of the refracting surfaces:\nP = (μ - 1) × (1/R₁ - 1/R₂)\n\nStep 2: Cutting a lens along its principal axis (longitudinally) does not alter the curvature of either surface or the refractive index.\n\nStep 3: Therefore, the focal length and optical power of each half remain identical to the original lens: P' = +4.0 D.\n\nTherefore, Option (C) is the correct answer."
    }
  },
  {
    id: 5973,
    similarQuestion: {
      question: "A transparent glass lens of refractive index μ_g = 1.50 is immersed in a clear liquid and becomes completely invisible. This occurs because:",
      option_a: "The liquid absorbs all incident light completely",
      option_b: "Light undergoes total internal reflection at the liquid surface",
      option_c: "The refractive index of the liquid is exactly equal to that of the glass lens (μ_l = 1.50)",
      option_d: "The lens dissolves completely in the liquid",
      correct_option: "C",
      explanation: "Step 1: Light undergoes reflection and refraction at the boundary between two media due to a difference in their refractive indices.\n\nStep 2: When the liquid has the exact same refractive index as the glass lens (μ_l = μ_g = 1.50), no reflection or refraction takes place at the boundary.\n\nStep 3: Light passes straight through without deviation or scattering, making the lens completely invisible.\n\nTherefore, Option (C) is the correct answer."
    }
  },
  {
    id: 5974,
    similarQuestion: {
      question: "A simple magnifying glass uses a thin converging lens of focal length 10 cm. For a person with normal vision (near point D = 25 cm), which of the following statements is correct?",
      option_a: "The maximum possible magnification is 3.5",
      option_b: "The minimum possible magnification is 2.5",
      option_c: "Both the maximum magnification is 3.5 and minimum magnification is 2.5, depending on eye accommodation",
      option_d: "The magnification cannot exceed 1.0",
      correct_option: "C",
      explanation: "Step 1: Maximum magnification occurs when the image is formed at the near point (strained eye):\nM_max = 1 + D / f = 1 + 25 / 10 = 1 + 2.5 = 3.5.\n\nStep 2: Minimum magnification occurs when the image is formed at infinity (relaxed eye):\nM_min = D / f = 25 / 10 = 2.5.\n\nStep 3: Hence, the magnifying power can be adjusted between 2.5 and 3.5 depending on eye accommodation.\n\nTherefore, Option (C) is the correct answer."
    }
  },
  {
    id: 5975,
    similarQuestion: {
      question: "Which of the following statements regarding the optical correction of human eye defects is INCORRECT?",
      option_a: "Myopia (nearsightedness) is corrected using a converging convex lens",
      option_b: "Hypermetropia (farsightedness) is corrected using a converging convex lens",
      option_c: "Myopia is corrected using a diverging concave lens",
      option_d: "Astigmatism is corrected using a cylindrical lens",
      correct_option: "A",
      explanation: "Step 1: In a myopic eye, the eyeball is elongated, causing parallel rays to focus in front of the retina.\n\nStep 2: A diverging (concave) lens is required to diverge the rays slightly so that they focus on the retina.\n\nStep 3: Therefore, claiming that myopia is corrected using a convex lens is completely incorrect.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 5976,
    similarQuestion: {
      question: "A person suffering from defective vision has an uncorrected far point of 40 cm. The optical power of the corrective lens required to enable clear distant vision is:",
      option_a: "-4.0 D",
      option_b: "+2.5 D",
      option_c: "-2.5 D",
      option_d: "-0.25 D",
      correct_option: "C",
      explanation: "Step 1: For distant objects at u = -∞, the corrective lens must form a virtual image at the person's far point (v = -40 cm = -0.40 m).\n\nStep 2: Apply the lens formula 1/f = 1/v - 1/u:\n1/f = 1/(-0.40 m) - 1/(-∞) = -1 / 0.40 = -2.5 m⁻¹.\n\nStep 3: The optical power is P = 1 / f = -2.5 D.\n\nTherefore, Option (C) is the correct answer."
    }
  },
  {
    id: 5977,
    similarQuestion: {
      question: "An astronomical telescope consists of two thin lenses of focal lengths 0.3 m and 3.0 cm respectively. It is focused on the Moon, which subtends an angle of 0.5° at the objective lens. The angle subtended at the observer's eye by the final image in normal adjustment is:",
      option_a: "5.0°",
      option_b: "0.25°",
      option_c: "0.50°",
      option_d: "1.5°",
      correct_option: "A",
      explanation: "Step 1: Convert objective focal length to cm: f_o = 0.3 m = 30 cm.\nEyepiece focal length is f_e = 3.0 cm.\n\nStep 2: The angular magnifying power in normal adjustment is:\nM = f_o / f_e = 30 cm / 3.0 cm = 10.\n\nStep 3: The angle subtended by the final image at the eye is:\nβ = M × α = 10 × 0.5° = 5.0°.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 5978,
    similarQuestion: {
      question: "An astronomical telescope in normal adjustment receives parallel light from a distant star. If the tube length of the telescope is decreased slightly, the final image formed by the eyepiece will be:",
      option_a: "A virtual image formed at a finite distance in front of the eyepiece",
      option_b: "Completely destroyed (no image formed)",
      option_c: "A small real image formed behind the eyepiece close to it",
      option_d: "A large real image formed behind the eyepiece far away",
      correct_option: "A",
      explanation: "Step 1: In normal adjustment, the real intermediate image from the objective falls exactly at the focal point of the eyepiece (u_e = f_e), forming a final image at infinity.\n\nStep 2: When the tube length is decreased slightly, the eyepiece moves closer to the intermediate image, so u_e < f_e.\n\nStep 3: When an object is within the focal length of a converging lens, the lens produces an erect, virtual image at a finite distance in front of it.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 5979,
    similarQuestion: {
      question: "An astronomical telescope has an objective lens of optical power 0.5 D and an eyepiece of optical power 20.0 D. The magnifying power of the telescope in normal adjustment is:",
      option_a: "30",
      option_b: "10",
      option_c: "40",
      option_d: "20",
      correct_option: "C",
      explanation: "Step 1: The focal lengths of the objective and eyepiece are:\nf_o = 1 / P_o = 1 / 0.5 = 2.0 m = 200 cm\nf_e = 1 / P_e = 1 / 20.0 = 0.05 m = 5 cm\n\nStep 2: The magnifying power in normal adjustment is:\nM = f_o / f_e = P_e / P_o = 20.0 D / 0.5 D = 40.\n\nTherefore, Option (C) is the correct answer."
    }
  },
  {
    id: 5980,
    similarQuestion: {
      question: "The intermediate image formed by the objective lens of an astronomical telescope for a distant object is:",
      option_a: "Virtual and diminished",
      option_b: "Real, inverted, and diminished",
      option_c: "Real, inverted, and enlarged",
      option_d: "Virtual and enlarged",
      correct_option: "B",
      explanation: "Step 1: For a distant object (u → -∞), parallel light rays strike the large convex objective lens.\n\nStep 2: The objective lens focuses these rays in its focal plane (v = f_o).\n\nStep 3: The intermediate image formed is real, inverted, and diminished in linear size compared to the astronomical object.\n\nTherefore, Option (B) is the correct answer."
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
    console.log('Login successful for Set 59 Part 4.');

    for (let i = 0; i < questionsPart4.length; i++) {
      const q = questionsPart4[i];
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
      console.log(`Updated question ${i + 91}/${questionsPart4.length + 90} (ID: ${q.id})`);
    }
    console.log('Set 59 Part 4 completed successfully!');
  } catch (err) {
    console.error('Error updating Set 59 Part 4:', err.message);
  }
}

run();
