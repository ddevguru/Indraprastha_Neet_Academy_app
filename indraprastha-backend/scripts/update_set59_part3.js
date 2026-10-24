const BASE_URL = 'https://api.indraprasthaneetacademy.com/api';

const questionsPart3 = [
  {
    id: 5921,
    similarQuestion: {
      question: "For a triangular optical prism of refractive index μ, any light ray incident on the first face will fail to emerge from the second face (undergoing total internal reflection at the second face for all angles of incidence) if the refracting angle A of the prism satisfies:",
      option_a: "A < C",
      option_b: "A = C",
      option_c: "A < 2 C",
      option_d: "A ≥ 2 C (where C = sin⁻¹(1/μ) is the critical angle)",
      correct_option: "D",
      explanation: "Step 1: The condition for total internal reflection at the second face is r₂ > C.\n\nStep 2: From the prism relation r₁ + r₂ = A, we have r₂ = A - r₁.\n\nStep 3: The minimum possible value of r₂ occurs when r₁ is at its maximum (which is the critical angle C for grazing incidence i = 90°).\nThus, r₂,min = A - C.\n\nStep 4: For total internal reflection to occur for all incident rays, even the minimum r₂ must exceed C:\nA - C ≥ C => A ≥ 2 C.\n\nTherefore, Option (D) is the correct answer."
    }
  },
  {
    id: 5922,
    similarQuestion: {
      question: "When a monochromatic ray of light undergoes minimum deviation through an equilateral triangular glass prism (A = 60°), the angle of refraction inside the prism at the first face is:",
      option_a: "30°",
      option_b: "45°",
      option_c: "60°",
      option_d: "15°",
      correct_option: "A",
      explanation: "Step 1: At the position of minimum deviation, symmetry dictates that the angles of refraction at the two faces are equal: r₁ = r₂ = r.\n\nStep 2: From the prism relation r₁ + r₂ = A, we have:\n2 r = A => r = A / 2\n\nStep 3: For an equilateral prism, A = 60°:\nr = 60° / 2 = 30°.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 5923,
    similarQuestion: {
      question: "A thin glass prism having a small apex angle A = 6.0° and refractive index μ = 1.50 produces a minimum angular deviation of:",
      option_a: "3.0°",
      option_b: "4.5°",
      option_c: "6.0°",
      option_d: "1.5°",
      correct_option: "A",
      explanation: "Step 1: For a thin prism (apex angle A ≤ 10°), the angular deviation is given by:\nδ = (μ - 1) × A\n\nStep 2: Substitute μ = 1.50 and A = 6.0°:\nδ = (1.50 - 1) × 6.0° = 0.50 × 6.0° = 3.0°.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 5924,
    similarQuestion: {
      question: "In the atmospheric formation of primary and secondary rainbows by spherical raindrops, the optical paths involve:",
      option_a: "Two refractions and one internal reflection for primary; two refractions and two internal reflections for secondary",
      option_b: "One refraction and two internal reflections for primary; two refractions and one internal reflection for secondary",
      option_c: "Two internal reflections for primary and three for secondary",
      option_d: "Total internal reflection only without any refraction",
      correct_option: "A",
      explanation: "Step 1: In a primary rainbow, sunlight enters a drop (refraction 1), reflects off the back inner surface (internal reflection 1), and exits the drop (refraction 2).\n\nStep 2: In a secondary rainbow, sunlight enters the drop (refraction 1), undergoes two consecutive internal reflections, and emerges (refraction 2).\n\nStep 3: The extra reflection in the secondary rainbow inverts the color sequence and reduces its brightness.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 5925,
    similarQuestion: {
      question: "A ray of light enters a solid transparent glass sphere of radius R and refractive index μ = √3 at an angle of incidence of 60°. The angle of refraction inside the sphere is:",
      option_a: "45°",
      option_b: "30°",
      option_c: "60°",
      option_d: "15°",
      correct_option: "B",
      explanation: "Step 1: By Snell's Law at the spherical surface:\n1 × sin i = μ × sin r\n\nStep 2: Substitute i = 60° and μ = √3:\nsin 60° = √3 × sin r\n√3 / 2 = √3 × sin r\nsin r = 1 / 2\n\nStep 3: Solve for r:\nr = sin⁻¹(1/2) = 30°.\n\nTherefore, Option (B) is the correct answer."
    }
  },
  {
    id: 5926,
    similarQuestion: {
      question: "An achromatic combination of two thin prisms made of different glasses with dispersive powers ω₁ and ω₂ produces zero net angular dispersion. The ratio of their mean angular deviations (δ₁ / δ₂) must be:",
      option_a: "ω₁ / ω₂",
      option_b: "-ω₂ / ω₁",
      option_c: "ω₁ × ω₂",
      option_d: "-(ω₁ + ω₂)",
      correct_option: "B",
      explanation: "Step 1: The angular dispersion produced by a thin prism of mean deviation δ and dispersive power ω is θ = ω × δ.\n\nStep 2: For an achromatic combination producing no net dispersion:\nθ₁ + θ₂ = 0 => ω₁ δ₁ + ω₂ δ₂ = 0\n\nStep 3: Solve for the ratio of mean deviations:\nδ₁ / δ₂ = -ω₂ / ω₁.\n\nTherefore, Option (B) is the correct answer."
    }
  },
  {
    id: 5927,
    similarQuestion: {
      question: "A point source of light in air (μ₁ = 1.0) is placed in front of a convex spherical glass surface of radius of curvature R = 20 cm and refractive index μ₂ = 1.5. If the source is at distance u = -40 cm, the image distance v inside the glass is:",
      option_a: "+60 cm",
      option_b: "Infinity (rays emerge parallel)",
      option_c: "+40 cm",
      option_d: "+30 cm",
      correct_option: "B",
      explanation: "Step 1: Apply the refraction formula for a single spherical surface:\nμ₂ / v - μ₁ / u = (μ₂ - μ₁) / R\n\nStep 2: Substitute μ₁ = 1.0, μ₂ = 1.5, u = -40 cm, and R = +20 cm:\n1.5 / v - 1.0 / (-40) = (1.5 - 1.0) / (+20)\n1.5 / v + 1 / 40 = 0.5 / 20 = 1 / 40\n\nStep 3: Solve for v:\n1.5 / v = 1/40 - 1/40 = 0 => v = ∞.\nThus, the refracted rays form a parallel beam travelling to infinity.\n\nTherefore, Option (B) is the correct answer."
    }
  },
  {
    id: 5928,
    similarQuestion: {
      question: "A parallel beam of light in air strikes a convex spherical glass surface of radius R = 20 cm and refractive index μ = 1.5. The distance from the surface where the rays focus is:",
      option_a: "40 cm",
      option_b: "60 cm",
      option_c: "30 cm",
      option_d: "20 cm",
      correct_option: "B",
      explanation: "Step 1: For an incident parallel beam, object distance is u = -∞.\n\nStep 2: Using the spherical surface refraction equation:\nμ / v - 1 / u = (μ - 1) / R\n\nStep 3: Substitute μ = 1.5, u = -∞, and R = +20 cm:\n1.5 / v - 0 = (1.5 - 1.0) / 20 = 0.5 / 20 = 1 / 40\n\nStep 4: Solve for v:\nv = 1.5 × 40 = 60 cm.\n\nTherefore, Option (B) is the correct answer."
    }
  },
  {
    id: 5929,
    similarQuestion: {
      question: "A spherical air bubble (refractive index μ = 1.0) trapped inside a container of water (refractive index μ = 4/3) acts on an incident parallel beam of light as a:",
      option_a: "Diverging lens",
      option_b: "Converging lens",
      option_c: "Plane mirror",
      option_d: "Glass slab with zero deviation",
      correct_option: "A",
      explanation: "Step 1: By the Lens Maker's formula, the focal length of a lens of index n₁ in a medium of index n₂ is proportional to [(n₁ / n₂) - 1].\n\nStep 2: For the air bubble in water, n₁ = 1.0 and n₂ = 4/3:\n(n₁ / n₂) - 1 = (1 / (4/3)) - 1 = 3/4 - 1 = -1/4 < 0.\n\nStep 3: Since the convex curvature is combined with a negative relative refractive factor, the bubble behaves as a diverging (concave) lens.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 5930,
    similarQuestion: {
      question: "A plano-convex glass lens of refractive index μ = 1.5 has its curved surface silvered. The system will act as a:",
      option_a: "Convex mirror",
      option_b: "Plane mirror",
      option_c: "Concave mirror",
      option_d: "Converging lens",
      correct_option: "C",
      explanation: "Step 1: Silvering the curved surface creates a spherical concave mirror of focal length f_m = R / 2.\n\nStep 2: Light passes through the flat refracting surface twice and reflects off the curved silvered surface once.\n\nStep 3: The equivalent power is P_eq = 2 P_lens + P_mirror > 0, which corresponds to a converging optical system (a concave mirror).\n\nTherefore, Option (C) is the correct answer."
    }
  },
  {
    id: 5931,
    similarQuestion: {
      question: "A point source of light in air is placed at a distance of 30 cm in front of a convex spherical glass surface of radius of curvature R = 15 cm and refractive index μ = 1.5. The position of the image formed inside the glass is:",
      option_a: "+30 cm",
      option_b: "+60 cm",
      option_c: "Infinity (emerges as a parallel beam)",
      option_d: "+45 cm",
      correct_option: "C",
      explanation: "Step 1: Apply the spherical surface refraction equation:\nμ₂ / v - μ₁ / u = (μ₂ - μ₁) / R\n\nStep 2: Substitute μ₁ = 1.0, μ₂ = 1.5, u = -30 cm, and R = +15 cm:\n1.5 / v - 1.0 / (-30) = (1.5 - 1.0) / 15\n1.5 / v + 1 / 30 = 0.5 / 15 = 1 / 30\n\nStep 3: Solve for v:\n1.5 / v = 1/30 - 1/30 = 0 => v = ∞.\nThus, the rays emerge parallel to the axis.\n\nTherefore, Option (C) is the correct answer."
    }
  },
  {
    id: 5932,
    similarQuestion: {
      question: "The fundamental relation governing the refraction of light from an optical medium of refractive index n₁ into another medium of refractive index n₂ at a spherical boundary of radius R is:",
      option_a: "n₂ / v - n₁ / u = (n₂ - n₁) / R",
      option_b: "n₁ / v - n₂ / u = (n₂ - n₁) / R",
      option_c: "n₂ / v + n₁ / u = (n₂ + n₁) / R",
      option_d: "1 / v - 1 / u = (n₂ - n₁) / R",
      correct_option: "A",
      explanation: "Step 1: By applying Snell's law in the paraxial approximation to a spherical refracting surface, we relate the object distance u, image distance v, and radius of curvature R.\n\nStep 2: The standard Cartesian equation is:\nn₂ / v - n₁ / u = (n₂ - n₁) / R.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 5933,
    similarQuestion: {
      question: "A convex spherical refracting interface of radius R = 20 cm separates medium 1 (n₁ = 1.8) from medium 2 (n₂ = 2.0). The optical power of this single spherical surface is:",
      option_a: "+1.0 D",
      option_b: "+2.0 D",
      option_c: "+0.5 D",
      option_d: "+5.0 D",
      correct_option: "A",
      explanation: "Step 1: The optical power P of a single spherical refracting surface in diopters is:\nP = (n₂ - n₁) / R(in metres)\n\nStep 2: Substitute n₁ = 1.8, n₂ = 2.0, and R = 20 cm = 0.20 m:\nP = (2.0 - 1.8) / 0.20 m = 0.2 / 0.20 = +1.0 D.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 5934,
    similarQuestion: {
      question: "A converging beam of light is incident upon a thin diverging (concave) lens of focal length f. If the beam converges towards a point located at a distance greater than f behind the lens, the transmitted beam:",
      option_a: "Converges to form a real image",
      option_b: "Becomes a diverging beam that appears to diverge from a virtual image",
      option_c: "Emerges as a perfectly parallel beam",
      option_d: "Is completely reflected back",
      correct_option: "B",
      explanation: "Step 1: The incident converging beam forms a virtual object behind the lens at distance u = +x > 0.\n\nStep 2: Using the lens formula 1/v - 1/u = 1/f for a concave lens (f = -f₀):\n1/v = 1/u - 1/f₀ = 1/x - 1/f₀ = (f₀ - x) / (x f₀)\n\nStep 3: When the point of convergence is beyond the focal length (x > f₀):\nThe numerator (f₀ - x) is negative, so v is negative, meaning the emerging rays diverge from a virtual image in front of the lens.\n\nTherefore, Option (B) is the correct answer."
    }
  },
  {
    id: 5935,
    similarQuestion: {
      question: "A plano-convex lens made of glass (μ = 1.5) has a curved surface of radius of curvature R = 30 cm. If its flat plane surface is silvered, the combination behaves as a concave mirror of focal length:",
      option_a: "30 cm",
      option_b: "15 cm",
      option_c: "60 cm",
      option_d: "45 cm",
      correct_option: "A",
      explanation: "Step 1: The focal length of the plano-convex lens before silvering is:\n1 / f_l = (μ - 1) / R = (1.5 - 1) / 30 = 0.5 / 30 = 1 / 60 => f_l = 60 cm.\n\nStep 2: Silvering the plane surface gives a plane mirror of power P_m = 0.\n\nStep 3: The effective power of the silvered lens system is:\nP_eq = 2 P_l + P_m = 2 / f_l = 2 / 60 = 1 / 30 cm⁻¹.\n\nStep 4: The equivalent focal length of the concave mirror is:\nF = 1 / P_eq = 30 cm.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 5936,
    similarQuestion: {
      question: "In the ray tracing rules for a thin diverging (concave) lens, an incident light ray whose path is directed straight towards the principal focus on the opposite side of the lens will emerge:",
      option_a: "Passing undeviated through the optical centre",
      option_b: "Parallel to the principal axis",
      option_c: "Diverging through the first focus",
      option_d: "Retracing its exact path",
      correct_option: "B",
      explanation: "Step 1: By the definition of the principal focus of a diverging lens, rays that are aimed towards the second focal point F₂ are bent by refraction such that they emerge parallel to the principal axis.\n\nStep 2: This is the exact time-reversed counterpart of a ray incident parallel to the principal axis which diverges as if originating from the first focus.\n\nTherefore, Option (B) is the correct answer."
    }
  },
  {
    id: 5937,
    similarQuestion: {
      question: "Three thin converging lenses of focal lengths 10 cm, 20 cm, and 25 cm are placed in coaxial contact with each other. The equivalent optical power of the combination is:",
      option_a: "+10.0 D",
      option_b: "+15.0 D",
      option_c: "+14.0 D",
      option_d: "+19.0 D",
      correct_option: "D",
      explanation: "Step 1: The optical power of a thin lens in diopters is P = 1 / f(in metres) = 100 / f(in cm).\n\nStep 2: Calculate the power of each lens:\nP₁ = 100 / 10 = +10.0 D\nP₂ = 100 / 20 = +5.0 D\nP₃ = 100 / 25 = +4.0 D\n\nStep 3: The net optical power of thin lenses in contact is the algebraic sum:\nP_eq = P₁ + P₂ + P₃ = 10.0 + 5.0 + 4.0 = +19.0 D.\n\nTherefore, Option (D) is the correct answer."
    }
  },
  {
    id: 5938,
    similarQuestion: {
      question: "For a thin convex lens of focal length f = 15.0 cm, the minimum distance D between a real object and a screen on which a real sharp image can be formed is:",
      option_a: "60.0 cm",
      option_b: "30.0 cm",
      option_c: "45.0 cm",
      option_d: "15.0 cm",
      correct_option: "A",
      explanation: "Step 1: For a convex lens, let the distance between object and screen be D = u + v.\nFrom the lens formula 1/v + 1/u = 1/f => D / (u v) = 1/f => u² - D u + D f = 0.\n\nStep 2: For real roots of object distance u, the discriminant must be non-negative:\nD² - 4 D f ≥ 0 => D ≥ 4 f.\n\nStep 3: Hence, the minimum separation is:\nD_min = 4 f = 4 × 15.0 cm = 60.0 cm.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 5939,
    similarQuestion: {
      question: "An opaque black paper card is placed over the lower half of a converging camera lens. What happens to the image of an object formed on the screen?",
      option_a: "Only the upper half of the image is formed",
      option_b: "Only the lower half of the image is formed",
      option_c: "The complete image is formed, but its brightness (intensity) is reduced by half",
      option_d: "The image is completely lost",
      correct_option: "C",
      explanation: "Step 1: Every portion of the lens surface receives light from every point of the object and refracts it to the corresponding image point.\n\nStep 2: Covering half the lens blocks half of the total incoming light rays, reducing the collected light power by 50%.\n\nStep 3: However, the remaining unobstructed half of the lens still focuses rays from every point of the object.\nTherefore, the complete image is still formed, but with half the original brightness.\n\nTherefore, Option (C) is the correct answer."
    }
  },
  {
    id: 5940,
    similarQuestion: {
      question: "A point object is placed on the principal axis at a distance of 30 cm in front of a thin equiconvex lens of focal length 20 cm. The distance of the real image formed behind the lens is:",
      option_a: "20 cm",
      option_b: "40 cm",
      option_c: "50 cm",
      option_d: "60 cm",
      correct_option: "D",
      explanation: "Step 1: By the thin lens formula: 1/v - 1/u = 1/f.\n\nStep 2: Substitute u = -30 cm and f = +20 cm:\n1/v - 1/(-30) = 1/20\n1/v + 1/30 = 1/20\n1/v = 1/20 - 1/30 = (3 - 2) / 60 = 1 / 60.\n\nStep 3: Solve for v:\nv = +60 cm.\nTherefore, a real image is formed 60 cm behind the lens.\n\nTherefore, Option (D) is the correct answer."
    }
  },
  {
    id: 5941,
    similarQuestion: {
      question: "A converging lens forms a sharp real image on a screen that has twice the height of the object. If the distance between the object and the screen is 90 cm, the focal length of the lens is:",
      option_a: "15 cm",
      option_b: "30 cm",
      option_c: "20 cm",
      option_d: "25 cm",
      correct_option: "C",
      explanation: "Step 1: For a real image on a screen, linear magnification is m = -v / u = -2 => v = 2 u.\n\nStep 2: The total separation between object and screen is D = u + v = 90 cm:\nu + 2 u = 90 => 3 u = 90 => u = 30 cm.\nThus, v = 2 × 30 = 60 cm.\n\nStep 3: Apply the lens formula 1/f = 1/v - 1/u (with u = -30 cm, v = +60 cm):\n1/f = 1/60 - 1/(-30) = 1/60 + 2/60 = 3/60 = 1/20 => f = 20 cm.\n\nTherefore, Option (C) is the correct answer."
    }
  },
  {
    id: 5942,
    similarQuestion: {
      question: "For a thin convex lens of focal length f, a real object is placed at a distance a from the first focus, and its real image is formed at a distance b from the second focus. Newton's lens equation states that:",
      option_a: "a + b = f",
      option_b: "a / b = f²",
      option_c: "a × b = f²",
      option_d: "a² + b² = f²",
      correct_option: "C",
      explanation: "Step 1: Measuring distances from the respective focal points: object distance from the lens is u = -(f + a) and image distance is v = +(f + b).\n\nStep 2: Substitute into the lens formula 1/v - 1/u = 1/f:\n1/(f + b) - 1/(-(f + a)) = 1/f\n1/(f + b) + 1/(f + a) = 1/f\n\nStep 3: Simplify the fractions:\n(2f + a + b) / (f² + a f + b f + a b) = 1 / f\n2f² + a f + b f = f² + a f + b f + a b => a × b = f².\n\nTherefore, Option (C) is the correct answer."
    }
  },
  {
    id: 5943,
    similarQuestion: {
      question: "For a spherical refracting surface separating two optical media of refractive indices μ₁ and μ₂, the ratio of the first focal length f₁ to the second focal length f₂ is:",
      option_a: "μ₂ / μ₁",
      option_b: "-μ₁ / μ₂",
      option_c: "μ₁ / μ₂",
      option_d: "-(μ₂ / μ₁)",
      correct_option: "B",
      explanation: "Step 1: The first focal length f₁ is the object distance when image is at infinity (v = ∞):\nμ₂ / ∞ - μ₁ / f₁ = (μ₂ - μ₁) / R => f₁ = -μ₁ R / (μ₂ - μ₁).\n\nStep 2: The second focal length f₂ is the image distance when object is at infinity (u = -∞):\nμ₂ / f₂ - μ₁ / (-∞) = (μ₂ - μ₁) / R => f₂ = μ₂ R / (μ₂ - μ₁).\n\nStep 3: Compute the ratio f₁ / f₂:\nf₁ / f₂ = [-μ₁ R / (μ₂ - μ₁)] / [μ₂ R / (μ₂ - μ₁)] = -μ₁ / μ₂.\n\nTherefore, Option (B) is the correct answer."
    }
  },
  {
    id: 5944,
    similarQuestion: {
      question: "When a real object is placed at a distance greater than 2f in front of a thin converging lens of focal length f, the nature and position of the image formed is:",
      option_a: "Virtual, erect, and magnified, located in front of the lens",
      option_b: "Real, inverted, and magnified, located beyond 2f",
      option_c: "Real, inverted, and diminished, located between f and 2f on the other side",
      option_d: "Real, erect, and of the same size, located at 2f",
      correct_option: "C",
      explanation: "Step 1: From the lens formula 1/v = 1/f + 1/u, when u < -2f:\n1/v lies strictly between 1/(2f) and 1/f, so f < v < 2f.\n\nStep 2: The magnification is m = v / u.\nSince |v| < |u|, |m| < 1 (diminished).\n\nStep 3: Because v is positive, the image is real and inverted, located between f and 2f on the other side of the lens.\n\nTherefore, Option (C) is the correct answer."
    }
  },
  {
    id: 5945,
    similarQuestion: {
      question: "An upright object is placed at a distance of 2f in front of a converging lens of focal length f. The image formed by the lens is:",
      option_a: "Virtual, erect, and magnified",
      option_b: "Real, inverted, and of the same size as the object",
      option_c: "Real, inverted, and diminished",
      option_d: "Real, erect, and magnified",
      correct_option: "B",
      explanation: "Step 1: Set u = -2f in the thin lens equation:\n1/v = 1/f + 1/u = 1/f - 1/(2f) = 1/(2f) => v = +2f.\n\nStep 2: The linear magnification is:\nm = v / u = (+2f) / (-2f) = -1.\n\nStep 3: The negative sign indicates an inverted image, and the magnitude |m| = 1 indicates that the image is identical in size to the object.\n\nTherefore, Option (B) is the correct answer."
    }
  },
  {
    id: 5946,
    similarQuestion: {
      question: "A convex lens is constructed by cementing three horizontal parallel layers of glass having different refractive indices μ₁, μ₂, and μ₃. How many distinct images of a single point object placed on the principal axis will be formed by this lens?",
      option_a: "1",
      option_b: "2",
      option_c: "6",
      option_d: "3",
      correct_option: "D",
      explanation: "Step 1: By the Lens Maker's formula, the focal length of each layer is 1/f = (μ - 1) (1/R₁ - 1/R₂).\n\nStep 2: Since each of the three layers has a different refractive index (μ₁, μ₂, μ₃), each layer possesses a distinct focal length (f₁, f₂, f₃).\n\nStep 3: Consequently, light rays passing through each respective layer converge to form three separate real images along the principal axis.\n\nTherefore, Option (D) is the correct answer."
    }
  },
  {
    id: 5947,
    similarQuestion: {
      question: "Two thin converging lenses of focal lengths 20 cm and 30 cm are placed in coaxial contact with each other. The equivalent focal length of the combined lens system is:",
      option_a: "50 cm",
      option_b: "12 cm",
      option_c: "25 cm",
      option_d: "10 cm",
      correct_option: "B",
      explanation: "Step 1: The equivalent focal length F of two thin lenses in contact is given by:\n1 / F = 1 / f₁ + 1 / f₂\n\nStep 2: Substitute f₁ = 20 cm and f₂ = 30 cm:\n1 / F = 1/20 + 1/30 = (3 + 2) / 60 = 5 / 60 = 1 / 12.\n\nStep 3: Solve for F:\nF = 12 cm.\n\nTherefore, Option (B) is the correct answer."
    }
  },
  {
    id: 5948,
    similarQuestion: {
      question: "In a displacement method experiment, the distance between the object and the screen is D = 96 cm. If the ratio of the heights of the two images formed at the two lens positions is 4, the focal length of the lens is:",
      option_a: "20.0 cm",
      option_b: "18.5 cm",
      option_c: "15.0 cm",
      option_d: "21.3 cm",
      correct_option: "D",
      explanation: "Step 1: The ratio of the magnifications at the two conjugate positions is m₁ / m₂ = (v₁ / u₁)² = 4 => v₁ / u₁ = 2.\n\nStep 2: Since u₁ + v₁ = D = 96 cm:\nu₁ + 2 u₁ = 96 => 3 u₁ = 96 => u₁ = 32 cm.\nThus, v₁ = 2 × 32 = 64 cm.\n\nStep 3: Calculate the focal length f:\nf = (u₁ × v₁) / (u₁ + v₁) = (32 × 64) / 96 = 2048 / 96 ≈ 21.33 cm.\n\nTherefore, Option (D) is the correct answer."
    }
  },
  {
    id: 5949,
    similarQuestion: {
      question: "In a displacement method experiment using a convex lens, an object and screen are separated by a distance D = 90 cm. Sharp images are obtained on the screen for two positions of the lens separated by a displacement d = 30 cm. The focal length of the lens is:",
      option_a: "25.0 cm",
      option_b: "15.0 cm",
      option_c: "30.0 cm",
      option_d: "20.0 cm",
      correct_option: "D",
      explanation: "Step 1: In the displacement method, the focal length is related to the object-screen separation D and lens displacement d by:\nf = (D² - d²) / (4 D)\n\nStep 2: Substitute D = 90 cm and d = 30 cm:\nf = (90² - 30²) / (4 × 90) = (8100 - 900) / 360 = 7200 / 360 = 20.0 cm.\n\nTherefore, Option (D) is the correct answer."
    }
  },
  {
    id: 5950,
    similarQuestion: {
      question: "A thin convex lens of focal length 15 cm is placed coaxially in front of a flat plane mirror. A point object is placed on the principal axis in front of the lens. The reflected rays retrace their path and form an image that coincides exactly with the object when the object is placed at a distance from the lens of:",
      option_a: "15 cm",
      option_b: "30 cm",
      option_c: "10 cm",
      option_d: "60 cm",
      correct_option: "A",
      explanation: "Step 1: For the light rays to retrace their path after reflecting from the plane mirror, they must strike the plane mirror normally (as a parallel beam perpendicular to the mirror surface).\n\nStep 2: A convex lens converts rays diverging from a point object into a parallel beam if and only if the object is located at its principal focus (u = f).\n\nStep 3: Therefore, the object must be placed at a distance equal to the focal length: u = 15 cm.\n\nTherefore, Option (A) is the correct answer."
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
    console.log('Login successful for Set 59 Part 3.');

    for (let i = 0; i < questionsPart3.length; i++) {
      const q = questionsPart3[i];
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
      console.log(`Updated question ${i + 61}/${questionsPart3.length + 60} (ID: ${q.id})`);
    }
    console.log('Set 59 Part 3 completed successfully!');
  } catch (err) {
    console.error('Error updating Set 59 Part 3:', err.message);
  }
}

run();
