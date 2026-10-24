const BASE_URL = 'https://api.indraprasthaneetacademy.com/api';

const questionsPart1 = [
  {
    id: 328,
    similarQuestion: {
      question: "The speed of light in a diamond having a refractive index of 2.42 is: (Take speed of light in vacuum c = 3.0 × 10⁸ m/s)",
      option_a: "2.00 × 10⁸ m/s",
      option_b: "1.50 × 10⁸ m/s",
      option_c: "1.24 × 10⁸ m/s",
      option_d: "0.81 × 10⁸ m/s",
      correct_option: "C",
      explanation: "Step 1: The refractive index of a medium is defined as n = c / v.\n\nStep 2: Solve for the speed of light in the medium v:\nv = c / n\n\nStep 3: Substitute c = 3.0 × 10⁸ m/s and n = 2.42:\nv = (3.0 × 10⁸ m/s) / 2.42 ≈ 1.24 × 10⁸ m/s.\n\nTherefore, Option (C) is the correct answer."
    }
  },
  {
    id: 329,
    similarQuestion: {
      question: "A beam of monochromatic light has a frequency of 5.0 × 10¹⁴ Hz in air. What is its frequency when it enters a glass block of refractive index 1.50?",
      option_a: "3.33 × 10¹⁴ Hz",
      option_b: "7.50 × 10¹⁴ Hz",
      option_c: "5.0 × 10¹⁴ Hz",
      option_d: "2.50 × 10¹⁴ Hz",
      correct_option: "C",
      explanation: "Step 1: The frequency of an optical wave is determined exclusively by the source of radiation that emits it.\n\nStep 2: When light travels from one medium to another, its speed and wavelength change, but its frequency remains strictly invariant.\n\nStep 3: Therefore, the frequency in glass remains 5.0 × 10¹⁴ Hz.\n\nTherefore, Option (C) is the correct answer."
    }
  },
  {
    id: 330,
    similarQuestion: {
      question: "To an astronaut standing on the surface of the Moon during the daytime, the lunar sky appears:",
      option_a: "Bright blue",
      option_b: "Completely dark and black",
      option_c: "Deep red",
      option_d: "Milky white",
      correct_option: "B",
      explanation: "Step 1: The blue color of the daytime sky on Earth is caused by Rayleigh scattering of sunlight by atmospheric gas molecules.\n\nStep 2: The Moon has no atmosphere, meaning there are no particles to scatter sunlight in the daytime sky.\n\nStep 3: Consequently, space appears completely dark and black, and stars remain visible even when the Sun is shining.\n\nTherefore, Option (B) is the correct answer."
    }
  },
  {
    id: 331,
    similarQuestion: {
      question: "Total internal reflection can occur when light passes from an optically dense glass prism into air. The critical angle is smallest for which of the following visible colors?",
      option_a: "Red",
      option_b: "Yellow",
      option_c: "Green",
      option_d: "Violet",
      correct_option: "D",
      explanation: "Step 1: The critical angle C for a boundary is given by:\nsin C = 1 / μ\nwhere μ is the refractive index of the medium relative to air.\n\nStep 2: By Cauchy's dispersion formula, refractive index increases with decreasing wavelength (μ_v > μ_r).\n\nStep 3: Since violet light has the shortest wavelength and largest refractive index, sin C is smallest, which means the critical angle C is minimum for violet light.\n\nTherefore, Option (D) is the correct answer."
    }
  },
  {
    id: 332,
    similarQuestion: {
      question: "The wavelengths of a light ray in two transparent media A and B are 400 nm and 800 nm respectively. The critical angle for total internal reflection at the interface between the two media is:",
      option_a: "45°",
      option_b: "60°",
      option_c: "30°",
      option_d: "90°",
      correct_option: "C",
      explanation: "Step 1: The refractive index of a medium is inversely proportional to the wavelength of light in it (μ ∝ 1/λ).\nThus: μ_A / μ_B = λ_B / λ_A = 800 nm / 400 nm = 2.\nMedium A is the denser medium.\n\nStep 2: The critical angle C for a ray travelling from the denser medium A into medium B is given by:\nsin C = μ_B / μ_A = λ_A / λ_B\n\nStep 3: Substitute the wavelengths:\nsin C = 400 / 800 = 1 / 2\nC = sin⁻¹(1/2) = 30°.\n\nTherefore, Option (C) is the correct answer."
    }
  },
  {
    id: 334,
    similarQuestion: {
      question: "The high-speed transmission of optical data signals through glass optical fibers is based on the optical principle of:",
      option_a: "Diffraction of light",
      option_b: "Interference of light",
      option_c: "Polarization by reflection",
      option_d: "Total internal reflection",
      correct_option: "D",
      explanation: "Step 1: An optical fiber consists of a high refractive index core surrounded by a lower refractive index cladding.\n\nStep 2: Light signals launched into the core strike the core-cladding boundary at angles greater than the critical angle.\n\nStep 3: Consequently, light undergoes successive total internal reflections without escaping, propagating along the fiber with minimal attenuation.\n\nTherefore, Option (D) is the correct answer."
    }
  },
  {
    id: 335,
    similarQuestion: {
      question: "A dentist uses a concave mirror of focal length 15 cm to examine a patient's tooth. To produce an erect, virtual image magnified to 3 times the object's height, the mirror must be held at a distance from the tooth of:",
      option_a: "5 cm",
      option_b: "10 cm",
      option_c: "20 cm",
      option_d: "30 cm",
      correct_option: "B",
      explanation: "Step 1: For an erect virtual image in a spherical mirror, linear magnification is positive: m = +3.\nFor a concave mirror, focal length is negative: f = -15 cm.\n\nStep 2: Use the magnification formula in terms of f and u:\nm = f / (f - u)\n\nStep 3: Substitute the known values:\n3 = -15 / (-15 - u)\n3 × (-15 - u) = -15\n-15 - u = -5\n-u = -5 + 15 = 10 => u = -10 cm.\nTherefore, the object distance from the mirror is 10 cm.\n\nTherefore, Option (B) is the correct answer."
    }
  },
  {
    id: 336,
    similarQuestion: {
      question: "The Moon subtends an angular diameter of 0.6° at the objective lens of an astronomical telescope of focal length 1.5 m. The diameter of the real image of the Moon formed in the focal plane of the objective is:",
      option_a: "0.52 cm",
      option_b: "0.78 cm",
      option_c: "1.57 cm",
      option_d: "3.14 cm",
      correct_option: "C",
      explanation: "Step 1: Convert the angular diameter θ into radians:\nθ = 0.6° = 0.6 × (π / 180) rad = (0.6 × 3.1416) / 180 ≈ 0.01047 rad.\n\nStep 2: A distant object forms its real image in the focal plane at distance v = f = 1.5 m.\n\nStep 3: The linear diameter d of the image is:\nd = f × θ = 1.5 m × 0.01047 rad = 0.0157 m = 1.57 cm.\n\nTherefore, Option (C) is the correct answer."
    }
  },
  {
    id: 337,
    similarQuestion: {
      question: "A concave mirror has a radius of curvature of 40 cm. An image magnified to twice the height of the real object can be obtained when the object is placed at a distance from the mirror of:",
      option_a: "10 cm only",
      option_b: "30 cm only",
      option_c: "20 cm only",
      option_d: "Either 10 cm or 30 cm",
      correct_option: "D",
      explanation: "Step 1: The focal length of the concave mirror is f = -R / 2 = -40 / 2 = -20 cm.\n\nStep 2: Case 1 - Virtual and erect image (m = +2):\nm = f / (f - u) => 2 = -20 / (-20 - u) => -20 - u = -10 => u = -10 cm.\n\nStep 3: Case 2 - Real and inverted image (m = -2):\nm = f / (f - u) => -2 = -20 / (-20 - u) => -20 - u = +10 => u = -30 cm.\nHence, the object can be placed at either 10 cm or 30 cm.\n\nTherefore, Option (D) is the correct answer."
    }
  },
  {
    id: 338,
    similarQuestion: {
      question: "For a triangular glass prism, the angle of minimum deviation δ_m is equal to its refracting angle A. If the refractive index of the prism material is √3, the refracting angle A of the prism is:",
      option_a: "30°",
      option_b: "45°",
      option_c: "60°",
      option_d: "90°",
      correct_option: "C",
      explanation: "Step 1: The prism formula for refractive index is:\nμ = sin[(A + δ_m) / 2] / sin(A / 2)\n\nStep 2: Given δ_m = A:\nμ = sin[(A + A) / 2] / sin(A / 2) = sin A / sin(A / 2)\n\nStep 3: Using the trigonometric identity sin A = 2 sin(A/2) cos(A/2):\nμ = [2 sin(A/2) cos(A/2)] / sin(A/2) = 2 cos(A / 2)\n\nStep 4: Substitute μ = √3:\n√3 = 2 cos(A / 2) => cos(A / 2) = √3 / 2\nA / 2 = 30° => A = 60°.\n\nTherefore, Option (C) is the correct answer."
    }
  },
  {
    id: 339,
    similarQuestion: {
      question: "The human eye exhibits its maximum luminous sensitivity under normal daylight (photopic vision) for light having a wavelength of approximately:",
      option_a: "4000 Å",
      option_b: "5550 Å (555 nm)",
      option_c: "7000 Å",
      option_d: "6500 Å",
      correct_option: "B",
      explanation: "Step 1: Photopic human vision relies predominantly on retinal cone photoreceptors.\n\nStep 2: The standard CIE photopic luminosity function peaks in the yellow-green region of the visible spectrum.\n\nStep 3: This peak sensitivity occurs at a wavelength of approximately 555 nm (5550 Å).\n\nTherefore, Option (B) is the correct answer."
    }
  },
  {
    id: 340,
    similarQuestion: {
      question: "To produce dispersion without average deviation using a combination of a crown glass prism (angle A, mean index μ) and a flint glass prism (angle A', mean index μ'), the required condition is:",
      option_a: "(μ - 1) A + (μ' - 1) A' = 0",
      option_b: "(μ - 1) A = (μ' - 1) A'",
      option_c: "A / A' = (μ' - 1) / (μ - 1)",
      option_d: "μ A = μ' A'",
      correct_option: "A",
      explanation: "Step 1: The net angular deviation produced by two thin prisms placed in opposition is:\nδ_net = δ + δ' = (μ - 1) A + (μ' - 1) A'\n\nStep 2: For dispersion without deviation, the net deviation must be zero:\nδ_net = 0 => (μ - 1) A + (μ' - 1) A' = 0.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 341,
    similarQuestion: {
      question: "The minimum possible physical distance between a real object and its real image formed by a concave spherical mirror is:",
      option_a: "f",
      option_b: "2 f",
      option_c: "4 f",
      option_d: "Zero",
      correct_option: "D",
      explanation: "Step 1: For a concave mirror of focal length f, when a real object is placed at the centre of curvature (u = -2f):\n1/v = 1/f - 1/u = -1/f - 1/(-2f) = -1/2f => v = -2f.\n\nStep 2: The real image is formed at the exact same location as the object (at the centre of curvature C).\n\nStep 3: Hence, the separation between the object and its real image is |u - v| = 0.\n\nTherefore, Option (D) is the correct answer."
    }
  },
  {
    id: 342,
    similarQuestion: {
      question: "Two transparent blocks of media A and B have thicknesses in the ratio 3 : 2. If the same number of complete wavelengths of a monochromatic light are contained in both blocks, the ratio of their refractive indices (μ_A : μ_B) is:",
      option_a: "3 : 2",
      option_b: "2 : 3",
      option_c: "9 : 4",
      option_d: "4 : 9",
      correct_option: "B",
      explanation: "Step 1: The number of wavelengths N contained in a thickness t of a medium of refractive index μ is:\nN = t / λ = t / (λ₀ / μ) = (μ × t) / λ₀\nwhere λ₀ is the wavelength in vacuum.\n\nStep 2: Since N is identical in both blocks:\nμ_A × t_A = μ_B × t_B\n\nStep 3: Solve for the ratio of refractive indices:\nμ_A / μ_B = t_B / t_A = 2 / 3 = 2 : 3.\n\nTherefore, Option (B) is the correct answer."
    }
  },
  {
    id: 343,
    similarQuestion: {
      question: "A farsighted person has a near point of 100 cm. What optical power of spectacles lens is required to enable him to read a book comfortably at the standard near point of 25 cm?",
      option_a: "+2.0 D",
      option_b: "+3.0 D",
      option_c: "-3.0 D",
      option_d: "+4.0 D",
      correct_option: "B",
      explanation: "Step 1: The corrective lens must form a virtual image of the book (placed at u = -25 cm) at the person's actual near point (v = -100 cm).\n\nStep 2: Use the lens formula 1/f = 1/v - 1/u:\n1/f = 1/(-100) - 1/(-25) = -1/100 + 4/100 = +3/100 cm⁻¹ = +3 m⁻¹.\n\nStep 3: The optical power is P = 1 / f(in m):\nP = +3.0 D.\n\nTherefore, Option (B) is the correct answer."
    }
  },
  {
    id: 344,
    similarQuestion: {
      question: "A student wears corrective eyeglasses of power -2.5 D. The visual defect of the eye and the uncorrected far point of the eye are:",
      option_a: "Myopia, and far point is 40 cm",
      option_b: "Hypermetropia, and near point is 40 cm",
      option_c: "Myopia, and far point is 25 cm",
      option_d: "Astigmatism, and far point is 50 cm",
      correct_option: "A",
      explanation: "Step 1: A negative power (P = -2.5 D) corresponds to a diverging (concave) lens, which is used to correct myopia (nearsightedness).\n\nStep 2: For distant objects (u = -∞), the lens must form an image at the defective eye's far point (v = -d):\n1/f = 1/v - 1/u => P = -1 / d\n\nStep 3: Solve for far point d:\nd = 1 / |P| = 1 / 2.5 m = 0.40 m = 40 cm.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 345,
    similarQuestion: {
      question: "A camera lens requires an exposure time of 1/100 s when its aperture diameter is 20 mm. If the aperture diameter is stopped down to 10 mm, the required exposure time to capture the same total light energy is:",
      option_a: "1/400 s",
      option_b: "1/50 s",
      option_c: "1/200 s",
      option_d: "1/25 s",
      correct_option: "D",
      explanation: "Step 1: The total light energy admitted to the film or sensor is proportional to (Aperture Area) × (Exposure Time):\nEnergy ∝ (π d² / 4) × t ∝ d² × t = constant\n\nStep 2: Halving the diameter from 20 mm to 10 mm reduces the aperture area by a factor of (10/20)² = 1/4.\n\nStep 3: To keep the total admitted light constant, the exposure time must be increased by 4 times:\nt' = 4 × (1/100 s) = 1/25 s.\n\nTherefore, Option (D) is the correct answer."
    }
  },
  {
    id: 346,
    similarQuestion: {
      question: "In hypermetropia (farsightedness), light rays from an object situated at the normal near point (25 cm):",
      option_a: "Converge and focus behind the retina, and this defect is corrected by using a convex lens",
      option_b: "Converge and focus in front of the retina, and this defect is corrected by using a concave lens",
      option_c: "Focus precisely on the blind spot",
      option_d: "Are dispersed completely without forming an image",
      correct_option: "A",
      explanation: "Step 1: In hypermetropia, the eyeball is either too short or the converging power of the eye lens is insufficient.\n\nStep 2: Consequently, rays from a nearby object focus behind the retina instead of directly on it.\n\nStep 3: A converging (convex) lens provides additional positive refractive power to converge rays onto the retina.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 347,
    similarQuestion: {
      question: "A compound microscope has an objective lens of focal length 1.0 cm and an eyepiece of focal length 5.0 cm. The objective produces a real intermediate image at a distance of 10 cm from itself. What is the overall magnifying power of the microscope for normal near-point vision (D = 25 cm)?",
      option_a: "30",
      option_b: "54",
      option_c: "45",
      option_d: "60",
      correct_option: "B",
      explanation: "Step 1: Find the object distance u_o for the objective lens (f_o = 1.0 cm, v_o = 10 cm):\n1/u_o = 1/v_o - 1/f_o = 1/10 - 1/1 = -9/10 => u_o = -10/9 cm.\n\nStep 2: Linear magnification of the objective is:\nm_o = v_o / |u_o| = 10 / (10/9) = 9.\n\nStep 3: Angular magnification of the eyepiece for near-point viewing is:\nm_e = 1 + D / f_e = 1 + 25 / 5 = 1 + 5 = 6.\n\nStep 4: The total magnifying power is:\nM = m_o × m_e = 9 × 6 = 54.\n\nTherefore, Option (B) is the correct answer."
    }
  },
  {
    id: 348,
    similarQuestion: {
      question: "In a standard compound microscope, the intermediate image formed by the objective lens before the eyepiece is:",
      option_a: "Virtual, erect, and magnified",
      option_b: "Real, inverted, and diminished",
      option_c: "Real, inverted, and magnified",
      option_d: "Virtual, inverted, and magnified",
      correct_option: "C",
      explanation: "Step 1: The object to be examined is placed just beyond the principal focus of the short-focal-length objective lens (f_o < u < 2f_o).\n\nStep 2: The objective lens produces a real, inverted, and magnified image inside the focal length of the eyepiece.\n\nStep 3: The eyepiece then acts as a simple magnifying glass to produce an enlarged virtual final image.\n\nTherefore, Option (C) is the correct answer."
    }
  },
  {
    id: 349,
    similarQuestion: {
      question: "According to the Abbe criterion, the limit of resolution (minimum resolvable separation d) of an optical microscope using illumination of wavelength λ is given by:",
      option_a: "d = (2 μ sin θ) / λ",
      option_b: "d = λ / (2 μ sin θ)",
      option_c: "d = (1.22 λ) / μ",
      option_d: "d = λ / (μ sin θ)",
      correct_option: "B",
      explanation: "Step 1: The limit of resolution of a microscope is the minimum distance between two point objects such that their diffraction patterns are just distinguishable.\n\nStep 2: Ernst Abbe derived the formula:\nd = λ / (2 μ sin θ) = λ / (2 NA)\nwhere μ sin θ is the numerical aperture (NA) of the objective lens.\n\nTherefore, Option (B) is the correct answer."
    }
  },
  {
    id: 350,
    similarQuestion: {
      question: "An observer views a 20 m tall flagpole using binoculars with an angular magnification of 8×. The apparent angular size of the flagpole:",
      option_a: "Appears smaller by a factor of 8",
      option_b: "Remains identical to the naked-eye view",
      option_c: "Is 8 times larger than when viewed with the naked eye",
      option_d: "Is 64 times larger than when viewed with the naked eye",
      correct_option: "C",
      explanation: "Step 1: By definition, the angular magnifying power M of an optical telescope or binoculars is:\nM = β / α\nwhere β is the angle subtended at the eye by the image, and α is the angle subtended by the object at the unaided eye.\n\nStep 2: Rearranging gives β = M × α = 8 × α.\n\nStep 3: Thus, the object subtends an angle 8 times larger at the eye, appearing 8 times closer.\n\nTherefore, Option (C) is the correct answer."
    }
  },
  {
    id: 351,
    similarQuestion: {
      question: "In a terrestrial telescope, an intermediate erecting lens of focal length f is inserted between the objective and the eyepiece to produce an erect image without changing magnification. The extra length added to the telescope tube by this erecting lens is:",
      option_a: "f",
      option_b: "2 f",
      option_c: "3 f",
      option_d: "4 f",
      correct_option: "D",
      explanation: "Step 1: To invert the image without changing its size, the real image from the objective must fall at distance 2f in front of the erecting lens (u = 2f).\n\nStep 2: The erecting lens then forms an upright real image at distance 2f behind it (v = 2f) with linear magnification m = -v/u = -1.\n\nStep 3: The total distance from the first intermediate image to the erected image is 2f + 2f = 4f.\nTherefore, the tube length is increased by 4f.\n\nTherefore, Option (D) is the correct answer."
    }
  },
  {
    id: 352,
    similarQuestion: {
      question: "An astronomical telescope in normal adjustment (image at infinity) has a magnifying power of 15, and the distance between the objective and eyepiece is 80 cm. The focal lengths of the objective and eyepiece are:",
      option_a: "f_o = 60 cm, f_e = 20 cm",
      option_b: "f_o = 70 cm, f_e = 10 cm",
      option_c: "f_o = 75 cm, f_e = 5 cm",
      option_d: "f_o = 50 cm, f_e = 30 cm",
      correct_option: "C",
      explanation: "Step 1: In normal adjustment, the magnifying power is M = f_o / f_e = 15 => f_o = 15 f_e.\n\nStep 2: The tube length for normal adjustment is L = f_o + f_e = 80 cm.\n\nStep 3: Substitute f_o = 15 f_e:\n15 f_e + f_e = 80\n16 f_e = 80 => f_e = 5 cm.\n\nStep 4: Find f_o:\nf_o = 15 × 5 = 75 cm.\n\nTherefore, Option (C) is the correct answer."
    }
  },
  {
    id: 353,
    similarQuestion: {
      question: "A Galilean telescope has a converging objective lens of focal length 30 cm and a diverging concave eyepiece of focal length 5 cm. For normal adjustment (final image at infinity), the tube length of the telescope is:",
      option_a: "25 cm",
      option_b: "35 cm",
      option_c: "30 cm",
      option_d: "6 cm",
      correct_option: "A",
      explanation: "Step 1: In a Galilean telescope, the eyepiece is a concave diverging lens (f_e is negative).\n\nStep 2: For the final image to be at infinity, the real intermediate image formed by the objective must coincide with the virtual focal point of the concave eyepiece.\n\nStep 3: The separation between the lenses is:\nL = f_o - |f_e| = 30 cm - 5 cm = 25 cm.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 354,
    similarQuestion: {
      question: "According to Cauchy's empirical dispersion formula, how does the refractive index μ of a transparent optical material vary with the wavelength λ of incident light?",
      option_a: "μ decreases monotonically with increasing wavelength as μ(λ) ≈ A + B / λ²",
      option_b: "μ increases linearly with wavelength as μ(λ) ∝ λ",
      option_c: "μ is completely independent of wavelength",
      option_d: "μ increases with the square of wavelength as μ(λ) ∝ λ²",
      correct_option: "A",
      explanation: "Step 1: Cauchy's dispersion equation is:\nμ(λ) = A + B / λ² + C / λ⁴\nwhere A, B, and C are positive material constants.\n\nStep 2: As wavelength λ increases, the terms B / λ² decrease.\n\nStep 3: Thus, refractive index decreases monotonically as wavelength increases (normal dispersion).\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 355,
    similarQuestion: {
      question: "A ray of light enters from air into a transparent medium with an angle of incidence i = 45° and refracts at an angle of refraction r = 30°. The speed of light in the medium is: (Take c = 3.0 × 10⁸ m/s)",
      option_a: "3.00 × 10⁸ m/s",
      option_b: "1.50 × 10⁸ m/s",
      option_c: "2.45 × 10⁸ m/s",
      option_d: "2.12 × 10⁸ m/s",
      correct_option: "D",
      explanation: "Step 1: By Snell's Law, the refractive index of the medium is:\nμ = sin i / sin r = sin 45° / sin 30° = (1 / √2) / (1 / 2) = 2 / √2 = √2 ≈ 1.414.\n\nStep 2: The speed of light in the medium is v = c / μ:\nv = (3.0 × 10⁸ m/s) / 1.414 ≈ 2.12 × 10⁸ m/s.\n\nTherefore, Option (D) is the correct answer."
    }
  },
  {
    id: 356,
    similarQuestion: {
      question: "For a concave spherical mirror forming an erect, virtual image of a real object placed between the pole and the principal focus (0 < u < f), the linear magnification m:",
      option_a: "Remains constant at m = 1",
      option_b: "Starts at m = 1 at the pole (u = 0) and increases asymptotically towards infinity as u approaches f",
      option_c: "Decreases from 1 to 0",
      option_d: "Is negative and decreasing",
      correct_option: "B",
      explanation: "Step 1: For a concave mirror (f = -f₀) forming a virtual image (u = -x, where 0 < x < f₀):\nm = f / (f - u) = -f₀ / (-f₀ - (-x)) = -f₀ / (x - f₀) = f₀ / (f₀ - x).\n\nStep 2: At the pole (x = 0):\nm = f₀ / f₀ = 1.\n\nStep 3: As the object moves towards the focus (x → f₀):\nThe denominator (f₀ - x) approaches 0, so m increases without bound towards +∞.\n\nTherefore, Option (B) is the correct answer."
    }
  },
  {
    id: 357,
    similarQuestion: {
      question: "A glass prism of refracting angle A = 30° and refractive index μ = √2 has its second refracting face silvered. A ray of light incident on the first face at angle i reflects from the silvered face and retraces its exact path. The angle of incidence i is:",
      option_a: "45°",
      option_b: "30°",
      option_c: "60°",
      option_d: "0°",
      correct_option: "A",
      explanation: "Step 1: For the ray to retrace its path upon reflection from the silvered second face, it must strike that face normally:\nr₂ = 0°.\n\nStep 2: In any prism, r₁ + r₂ = A:\nr₁ + 0 = 30° => r₁ = 30°.\n\nStep 3: Apply Snell's law at the first refracting face:\nsin i = μ × sin r₁ = √2 × sin 30° = √2 × (1 / 2) = 1 / √2.\n\nStep 4: Solve for i:\ni = sin⁻¹(1 / √2) = 45°.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 358,
    similarQuestion: {
      question: "A glass prism has a refracting angle A = 60° and refractive index μ = √2. For a light ray incident on the first face at angle i to just experience grazing emergence (angle of emergence e = 90°) at the second face, the angle of incidence i must be:",
      option_a: "sin⁻¹[(√3 - 1) / 2]",
      option_b: "30°",
      option_c: "45°",
      option_d: "60°",
      correct_option: "A",
      explanation: "Step 1: At grazing emergence (e = 90°), the angle of incidence at the second face equals the critical angle C:\nsin r₂ = sin C = 1 / μ = 1 / √2 => r₂ = 45°.\n\nStep 2: Using the prism relation r₁ + r₂ = A:\nr₁ = A - r₂ = 60° - 45° = 15°.\n\nStep 3: Apply Snell's law at the first face:\nsin i = μ × sin r₁ = √2 × sin 15°.\n\nStep 4: Since sin 15° = (√6 - √2) / 4:\nsin i = √2 × [(√6 - √2) / 4] = (√12 - 2) / 4 = (2√3 - 2) / 4 = (√3 - 1) / 2\ni = sin⁻¹[(√3 - 1) / 2].\n\nTherefore, Option (A) is the correct answer."
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
    console.log('Login successful for Set 59 Part 1.');

    for (let i = 0; i < questionsPart1.length; i++) {
      const q = questionsPart1[i];
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
      console.log(`Updated question ${i + 1}/${questionsPart1.length} (ID: ${q.id})`);
    }
    console.log('Set 59 Part 1 completed successfully!');
  } catch (err) {
    console.error('Error updating Set 59 Part 1:', err.message);
  }
}

run();
