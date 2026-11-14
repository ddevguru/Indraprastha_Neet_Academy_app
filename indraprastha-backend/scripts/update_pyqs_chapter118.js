const https = require('https');

async function request(url, options = {}, body = null) {
  return new Promise((resolve, reject) => {
    const req = https.request(url, options, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try {
          resolve({ status: res.statusCode, data: JSON.parse(data) });
        } catch (e) {
          resolve({ status: res.statusCode, data });
        }
      });
    });
    req.on('error', reject);
    if (body) req.write(JSON.stringify(body));
    req.end();
  });
}

const pyqsData = [
  {
    id: 1177,
    question: "The frequency order for gamma rays (a), X-rays (b) and UV rays (c) is: [AIPMT 2000]",
    optionA: "b > a > c",
    optionB: "a > b > c",
    optionC: "c > b > a",
    optionD: "a > c > b",
    correctOption: "B",
    explanation: "In the electromagnetic spectrum, frequency (ν) is inversely proportional to wavelength (λ) according to the relation ν = c / λ.\nArranging electromagnetic waves in order of decreasing frequency (or increasing wavelength):\nGamma rays (ν ≈ 10¹⁹ to 10²³ Hz) > X-rays (ν ≈ 10¹⁶ to 10²⁰ Hz) > Ultraviolet rays (ν ≈ 8 × 10¹⁴ to 3 × 10¹⁶ Hz) > Visible light > Infrared > Microwaves > Radio waves.\nHere:\na = Gamma rays\nb = X-rays\nc = UV rays\nTherefore, the correct frequency order is: a > b > c.\nTherefore, Option (B) is the correct answer.",
    similarQuestion: {
      question: "Which of the following arrangements correctly depicts electromagnetic radiations in order of increasing frequency?",
      option_a: "Radio waves < Microwaves < Infrared < Ultraviolet",
      option_b: "Ultraviolet < Infrared < Microwaves < Radio waves",
      option_c: "Gamma rays < X-rays < Ultraviolet < Visible",
      option_d: "Microwaves < Radio waves < Infrared < Visible",
      correct_option: "A",
      explanation: "The electromagnetic spectrum in order of increasing frequency is:\nRadio waves (lowest frequency) < Microwaves < Infrared < Visible < Ultraviolet < X-rays < Gamma rays (highest frequency).\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 1176,
    question: "The biological importance of the ozone layer is: [AIPMT 2001]",
    optionA: "It stops ultraviolet rays.",
    optionB: "The ozone layer reduces the greenhouse effect.",
    optionC: "The ozone layer reflects radio waves.",
    optionD: "The ozone layer controls the O₂/H₂ ratio in the atmosphere.",
    correctOption: "A",
    explanation: "The ozone layer located in the stratosphere absorbs high-energy, harmful ultraviolet (UV) radiation emitted by the Sun (specifically UV-B and UV-C with wavelengths below 310 nm).\nIf these high-energy ultraviolet rays reached the surface of the Earth, they would cause severe biological damage including skin cancer, cataract, photochemical mutations, and destruction of cellular proteins and DNA in living organisms.\nThus, the primary biological role of the stratospheric ozone layer is to absorb and prevent harmful ultraviolet rays from reaching the Earth.\nTherefore, Option (A) is the correct answer.",
    similarQuestion: {
      question: "Stratospheric ozone protects living systems on Earth primarily by absorbing which part of the solar electromagnetic spectrum?",
      option_a: "Ultraviolet (UV) radiation",
      option_b: "Infrared radiation",
      option_c: "Microwaves",
      option_d: "Cosmic rays",
      correct_option: "A",
      explanation: "The ozone layer in the stratosphere specifically absorbs lethal, short-wavelength solar ultraviolet (UV) radiation, protecting biological systems from DNA damage and cellular degeneration.\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 1175,
    question: "What is the cause of the greenhouse effect? [AIPMT 2002]",
    optionA: "Infra-red rays",
    optionB: "Ultra-violet rays",
    optionC: "X-rays",
    optionD: "Radio waves",
    correctOption: "A",
    explanation: "The greenhouse effect is caused by the trapping of heat by greenhouse gases (such as CO₂, CH₄, water vapour) in the Earth's lower atmosphere.\nSolar radiation (predominantly visible and short-wavelength light) penetrates the atmosphere and heats the Earth's surface.\nThe warmed surface re-radiates thermal energy at much longer wavelengths, primarily in the infrared region.\nGreenhouse gas molecules strongly absorb these outgoing infrared (heat) rays and re-radiate them in all directions, trapping heat and maintaining the average surface temperature of the Earth.\nTherefore, Option (A) is the correct answer.",
    similarQuestion: {
      question: "Which electromagnetic radiation is primarily absorbed by greenhouse gases like carbon dioxide and water vapour to warm the Earth's atmosphere?",
      option_a: "Infrared radiation",
      option_b: "Ultraviolet radiation",
      option_c: "Visible light",
      option_d: "Gamma radiation",
      correct_option: "A",
      explanation: "Greenhouse gases absorb long-wavelength infrared (thermal) radiation re-emitted by the Earth's warmed surface, thereby trapping thermal energy in the atmosphere.\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 1174,
    question: "The velocity of an electromagnetic wave is parallel to: [AIPMT 2002]",
    optionA: "B⃗ × E⃗",
    optionB: "E⃗ × B⃗",
    optionC: "E⃗",
    optionD: "B⃗",
    correctOption: "B",
    explanation: "In an electromagnetic wave propagating through space, the electric field vector E⃗ and magnetic field vector B⃗ are mutually perpendicular and both are perpendicular to the direction of wave propagation.\nAccording to Maxwell's electromagnetic theory and the Poynting vector S⃗ = (1/μ₀)(E⃗ × B⃗), the direction of energy transport and wave velocity v⃗ is given by the cross product E⃗ × B⃗.\nTherefore, the velocity vector of an electromagnetic wave is parallel to E⃗ × B⃗.\nTherefore, Option (B) is the correct answer.",
    similarQuestion: {
      question: "If the electric field of an EM wave oscillates along the +y-axis and the magnetic field oscillates along the +z-axis, the direction of wave propagation is along the:",
      option_a: "+x-axis",
      option_b: "−x-axis",
      option_c: "+y-axis",
      option_d: "−z-axis",
      correct_option: "A",
      explanation: "The direction of wave propagation is along the vector product Ê × B̂.\nHere, Ê = ĵ and B̂ = k̂.\nÊ × B̂ = ĵ × k̂ = î (along the positive x-axis).\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 1173,
    question: "Which of the following rays are not electromagnetic waves? [AIPMT 2003]",
    optionA: "X-rays",
    optionB: "Gamma rays",
    optionC: "Beta rays",
    optionD: "Heat rays",
    correctOption: "C",
    explanation: "Electromagnetic waves are self-propagating oscillating electric and magnetic fields traveling at the speed of light in vacuum and carrying no rest mass or net electric charge.\n- X-rays, gamma rays, and heat rays (infrared radiation) are all parts of the electromagnetic spectrum.\n- Beta rays (β-rays) are streams of energetic electrons (β⁻) or positrons (β⁺), which are charged material particles possessing mass and charge.\nHence, beta rays are particle radiation, not electromagnetic waves.\nTherefore, Option (C) is the correct answer.",
    similarQuestion: {
      question: "Which of the following is NOT an electromagnetic wave?",
      option_a: "Cathode rays",
      option_b: "X-rays",
      option_c: "Infrared rays",
      option_d: "Microwaves",
      correct_option: "A",
      explanation: "Cathode rays are streams of fast-moving electrons produced in a discharge tube and have mass and negative charge. They are material particles and not electromagnetic waves.\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 1172,
    question: "We consider the radiation emitted by the human body. Which one of the following statements is true? [AIPMT 2003]",
    optionA: "The radiation emitted is in the infra-red region.",
    optionB: "The radiation is emitted only during the day.",
    optionC: "The radiation is emitted during the summers and absorbed during the winters.",
    optionD: "The radiation emitted lies in the ultraviolet region and hence is not visible.",
    correctOption: "A",
    explanation: "The human body maintains an internal temperature of approximately 37 °C (310 K).\nAccording to Wien's displacement law:\nλₘₐₓ × T = b, where b ≈ 2.898 × 10⁻³ m K.\nλₘₐₓ = (2.898 × 10⁻³ m K) / (310 K) ≈ 9.35 × 10⁻⁶ m = 9.35 μm = 9350 nm.\nThe wavelength of peak thermal emission (9.35 μm) lies squarely in the infrared region of the electromagnetic spectrum (infrared spans from ~700 nm to 1 mm).\nBecause every object above absolute zero continuously radiates thermal energy regardless of daytime or season, the human body constantly emits infrared radiation.\nTherefore, Option (A) is the correct answer.",
    similarQuestion: {
      question: "Thermal imaging cameras used for nocturnal surveillance and fever screening work by detecting radiation emitted by bodies in which region?",
      option_a: "Infrared region",
      option_b: "Ultraviolet region",
      option_c: "X-ray region",
      option_d: "Microwave region",
      correct_option: "A",
      explanation: "Objects at room and body temperature radiate electromagnetic energy primarily in the infrared spectrum. Thermal imaging cameras detect these infrared emissions to produce thermal images.\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 1171,
    question: "If λᵥ, λₓ and λₘ represent the wavelengths of visible light, X-rays and microwaves, respectively, then: [AIPMT 2005]",
    optionA: "λₘ > λₓ > λᵥ",
    optionB: "λₘ > λᵥ > λₓ",
    optionC: "λᵥ > λₓ > λₘ",
    optionD: "λᵥ > λₘ > λₓ",
    correctOption: "B",
    explanation: "The typical wavelength ranges in the electromagnetic spectrum are:\n- Microwaves (λₘ): 1 mm to 0.1 m (10⁻³ m to 10⁻¹ m)\n- Visible light (λᵥ): 400 nm to 700 nm (4 × 10⁻⁷ m to 7 × 10⁻⁷ m)\n- X-rays (λₓ): 10⁻¹² m to 10⁻⁸ m (0.01 nm to 10 nm)\nComparing these values:\nλₘ > λᵥ > λₓ.\nTherefore, Option (B) is the correct answer.",
    similarQuestion: {
      question: "Arrange the following radiations in order of decreasing wavelength: Radiowaves (λᵣ), Infrared (λᵢ), Ultraviolet (λᵤ), Gamma rays (λᵧ).",
      option_a: "λᵣ > λᵢ > λᵤ > λᵧ",
      option_b: "λᵧ > λᵤ > λᵢ > λᵣ",
      option_c: "λᵣ > λᵤ > λᵢ > λᵧ",
      option_d: "λᵢ > λᵣ > λᵤ > λᵧ",
      correct_option: "A",
      explanation: "The order of decreasing wavelength across the spectrum is:\nRadio waves > Microwaves > Infrared > Visible > Ultraviolet > X-rays > Gamma rays.\nThus, λᵣ > λᵢ > λᵤ > λᵧ.\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 1170,
    question: "The electric and magnetic fields of an electromagnetic wave are: [AIPMT 2007]",
    optionA: "In opposite phase and perpendicular to each other",
    optionB: "In opposite phase and parallel to each other",
    optionC: "In phase and perpendicular to each other",
    optionD: "In phase and parallel to each other",
    correctOption: "C",
    explanation: "In a plane electromagnetic wave propagating through vacuum or a dielectric medium:\n1. The electric field vector E⃗ and the magnetic field vector B⃗ are mutually perpendicular to each other, and both are perpendicular to the direction of propagation (transverse nature).\n2. Both E⃗ and B⃗ reach their maxima, zero values, and minima simultaneously at the same point in space and at the same instant of time.\nMathematically:\nE = E₀ sin(kx − ωt)\nB = B₀ sin(kx − ωt)\nBecause they have identical phase arguments (kx − ωt), they oscillate in phase (phase difference Δφ = 0).\nTherefore, the electric and magnetic fields are in phase and perpendicular to each other.\nTherefore, Option (C) is the correct answer.",
    similarQuestion: {
      question: "What is the phase difference between the oscillating electric field and magnetic field vectors in a linearly polarized plane electromagnetic wave in free space?",
      option_a: "0 rad (in phase)",
      option_b: "π/2 rad",
      option_c: "π rad",
      option_d: "π/4 rad",
      correct_option: "A",
      explanation: "In a propagating plane electromagnetic wave, both fields vary sinusoidally with the same argument (kx − ωt), reaching their peaks and zeroes at identical times, so the phase difference is zero.\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 1169,
    question: "The velocity of electromagnetic radiation in a medium of permittivity ε₀ and permeability μ₀ is given by: [AIPMT 2008]",
    optionA: "1/√(μ₀ε₀)",
    optionB: "√(μ₀/ε₀)",
    optionC: "√(ε₀/μ₀)",
    optionD: "√(μ₀ε₀)",
    correctOption: "A",
    explanation: "From Maxwell's electromagnetic equations, the wave equation for an electromagnetic wave in free space yields the propagation speed c as:\nc = 1 / √(μ₀ε₀).\nSubstituting the fundamental constants:\nμ₀ = 4π × 10⁻⁷ T m A⁻¹\nε₀ ≈ 8.854 × 10⁻¹² C² N⁻¹ m⁻²\nc = 1 / √((4π × 10⁻⁷)(8.854 × 10⁻¹²)) ≈ 3.0 × 10⁸ m s⁻¹.\nTherefore, the velocity in vacuum is 1/√(μ₀ε₀).\nTherefore, Option (A) is the correct answer.",
    similarQuestion: {
      question: "The speed of an electromagnetic wave in a non-magnetic medium of dielectric constant K = 4 is:",
      option_a: "1.5 × 10⁸ m s⁻¹",
      option_b: "3.0 × 10⁸ m s⁻¹",
      option_c: "0.75 × 10⁸ m s⁻¹",
      option_d: "6.0 × 10⁸ m s⁻¹",
      correct_option: "A",
      explanation: "The velocity of an EM wave in a dielectric medium is v = c / √(εᵣ μᵣ).\nFor a non-magnetic medium, μᵣ = 1 and εᵣ = 4:\nv = c / √4 = c / 2 = (3 × 10⁸) / 2 = 1.5 × 10⁸ m s⁻¹.\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 1168,
    question: "The electric field part of an electromagnetic wave in a medium is represented by: Eₓ = 0, Eᵧ = 2.5 N/C cos[(2π × 10⁶ rad/s)t − (π × 10⁻² rad/m)x], E𝓏 = 0. The wave is: [AIPMT 2009]",
    optionA: "Moving along x direction with frequency 10⁶ Hz and wavelength 100 m.",
    optionB: "Moving along x direction with frequency 10⁶ Hz and wavelength 200 m.",
    optionC: "Moving along −x direction with frequency 10⁶ Hz and wavelength 200 m.",
    optionD: "Moving along y direction with frequency 2π × 10⁶ Hz and wavelength 200 m.",
    correctOption: "B",
    explanation: "Comparing the given electric field equation:\nEᵧ = 2.5 cos(ωt − kx) with standard wave parameters:\n1. Angular frequency: ω = 2π × 10⁶ rad/s\nFrequency: ν = ω / (2π) = (2π × 10⁶) / (2π) = 10⁶ Hz.\n2. Wave number: k = π × 10⁻² rad/m\nWavelength: λ = 2π / k = (2π) / (π × 10⁻²) = 2 / 10⁻² = 200 m.\n3. Direction of propagation:\nThe argument is of the form (ωt − kx), which represents a wave propagating in the positive x-direction (+x).\nHence, the wave is moving along the positive x-direction with frequency 10⁶ Hz and wavelength 200 m.\nTherefore, Option (B) is the correct answer.",
    similarQuestion: {
      question: "An electromagnetic wave has an electric field E = 120 sin[(6 × 10⁸)t − 2x] ĵ V m⁻¹. The speed and wavelength of this wave are:",
      option_a: "v = 3 × 10⁸ m s⁻¹, λ = π m",
      option_b: "v = 3 × 10⁸ m s⁻¹, λ = 2π m",
      option_c: "v = 1.5 × 10⁸ m s⁻¹, λ = π m",
      option_d: "v = 6 × 10⁸ m s⁻¹, λ = 0.5 m",
      correct_option: "A",
      explanation: "From the wave equation, ω = 6 × 10⁸ rad/s and k = 2 rad/m.\nSpeed v = ω / k = (6 × 10⁸) / 2 = 3 × 10⁸ m s⁻¹.\nWavelength λ = 2π / k = 2π / 2 = π m.\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 1167,
    question: "Which of the following statements is false for the properties of electromagnetic waves? [AIPMT 2010 Prelims]",
    optionA: "Both electric and magnetic field vectors attain their maxima and minima at the same place and same time.",
    optionB: "The energy in an electromagnetic wave is divided equally between electric and magnetic vectors.",
    optionC: "Both electric and magnetic field vectors are parallel to each other and perpendicular to the direction of propagation of the wave.",
    optionD: "These waves do not require any material medium for propagation.",
    correctOption: "C",
    explanation: "Let us evaluate each statement:\n- Statement A: E⃗ and B⃗ oscillate in phase, reaching their maxima and minima simultaneously at the same space and time. (True)\n- Statement B: The average energy density is shared equally: u_e = (1/4)ε₀E₀² and u_m = (1/4)B₀²/μ₀, and since E₀ = cB₀, u_e = u_m. (True)\n- Statement D: Electromagnetic waves consist of oscillating electromagnetic fields and can travel through vacuum without requiring a material medium. (True)\n- Statement C: Electric and magnetic field vectors are mutually perpendicular to each other (E⃗ ⟂ B⃗), NOT parallel.\nTherefore, statement C is false.\nTherefore, Option (C) is the correct answer.",
    similarQuestion: {
      question: "Which of the following properties of electromagnetic waves is INCORRECT?",
      option_a: "Electric and magnetic field vectors oscillate parallel to each other.",
      option_b: "They carry momentum and exert radiation pressure on surfaces.",
      option_c: "They are transverse waves and undergo polarization.",
      option_d: "Their speed in vacuum is independent of frequency.",
      correct_option: "A",
      explanation: "In an electromagnetic wave, the electric and magnetic fields are always mutually perpendicular (orthogonal) to each other and perpendicular to the direction of wave propagation.\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 1166,
    question: "The electric field of an electromagnetic wave in free space is given by E⃗ = 10 cos(10⁷t + kx) ĵ V/m, where t and x are in seconds and metres, respectively. It can be inferred that: (1) The wavelength is 188.4 m. (2) The wave number k is 0.33 rad/m. (3) The wave amplitude is 10 V/m. (4) The wave is propagating along +x direction. Which one of the following pairs of statements is correct? [AIPMT 2010 Mains]",
    optionA: "(3) and (4)",
    optionB: "(1) and (2)",
    optionC: "(2) and (3)",
    optionD: "(1) and (3)",
    correctOption: "D",
    explanation: "Given equation: E⃗ = 10 cos(10⁷t + kx) ĵ V/m.\n1. Amplitude E₀ = 10 V/m. (Statement 3 is correct)\n2. Angular frequency ω = 10⁷ rad/s.\nIn free space, speed of light c = 3 × 10⁸ m/s.\nWave number k = ω / c = 10⁷ / (3 × 10⁸) = 1/30 ≈ 0.033 rad/m. (Statement 2 is incorrect, it says 0.33)\n3. Wavelength λ = 2π / k = 2π × 30 = 60π ≈ 60 × 3.1416 = 188.4 m. (Statement 1 is correct)\n4. The argument has the form (ωt + kx), which corresponds to wave propagation along the negative x-direction (−x), NOT +x. (Statement 4 is incorrect)\nHence, statements (1) and (3) are the correct statements.\nTherefore, Option (D) is the correct answer.",
    similarQuestion: {
      question: "An electromagnetic wave in vacuum is described by E = 30 sin(1.5 × 10⁷t + kx) k̂ V m⁻¹. The wavelength λ and direction of propagation are:",
      option_a: "λ = 40π m ≈ 125.7 m, along −x direction",
      option_b: "λ = 20π m ≈ 62.8 m, along +x direction",
      option_c: "λ = 40π m, along +x direction",
      option_d: "λ = 100 m, along −x direction",
      correct_option: "A",
      explanation: "ω = 1.5 × 10⁷ rad/s.\nk = ω / c = (1.5 × 10⁷) / (3 × 10⁸) = 0.05 rad/m = 1/20 rad/m.\nλ = 2π / k = 40π m ≈ 125.7 m.\nThe argument (ωt + kx) indicates propagation along the −x direction.\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 1165,
    question: "The decreasing order of wavelength of infrared, microwave, ultraviolet and gamma rays is: [AIPMT 2011 Prelims]",
    optionA: "Microwave, infrared, ultraviolet, gamma rays",
    optionB: "Gamma rays, ultraviolet, infrared, microwaves",
    optionC: "Microwaves, gamma rays, infrared, ultraviolet",
    optionD: "Infrared, microwave, ultraviolet, gamma rays",
    correctOption: "A",
    explanation: "The order of electromagnetic waves from longest to shortest wavelength (decreasing order of wavelength):\nRadio waves > Microwaves > Infrared > Visible > Ultraviolet > X-rays > Gamma rays.\nComparing the given four types:\n- Microwaves (λ ~ 1 mm to 0.1 m)\n- Infrared (λ ~ 700 nm to 1 mm)\n- Ultraviolet (λ ~ 10 nm to 400 nm)\n- Gamma rays (λ < 10⁻¹² m)\nThus, the decreasing order of wavelength is: Microwave, infrared, ultraviolet, gamma rays.\nTherefore, Option (A) is the correct answer.",
    similarQuestion: {
      question: "Which of the following lists electromagnetic radiations in order of decreasing frequency?",
      option_a: "Gamma rays, X-rays, Visible light, Microwaves",
      option_b: "Microwaves, Visible light, X-rays, Gamma rays",
      option_c: "X-rays, Gamma rays, Microwaves, Visible light",
      option_d: "Visible light, X-rays, Gamma rays, Microwaves",
      correct_option: "A",
      explanation: "Frequency order from highest to lowest:\nGamma rays > X-rays > Ultraviolet > Visible light > Infrared > Microwaves > Radio waves.\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 1164,
    question: "The electric and magnetic fields associated with an EM wave propagating along the +z-axis can be represented by: [AIPMT 2011 Prelims]",
    optionA: "E⃗ = E₀î, B⃗ = B₀ĵ",
    optionB: "E⃗ = E₀k̂, B⃗ = B₀î",
    optionC: "E⃗ = E₀ĵ, B⃗ = B₀î",
    optionD: "E⃗ = E₀ĵ, B⃗ = B₀k̂",
    correctOption: "A",
    explanation: "For a transverse electromagnetic wave propagating along the +z-axis:\n1. Both E⃗ and B⃗ must lie in the plane perpendicular to the direction of propagation (i.e., in the xy-plane). Therefore, neither field can have a non-zero z-component (k̂ component). This eliminates options B and D.\n2. The direction of propagation is given by the cross product Ê × B̂.\nTesting Option A:\nE⃗ = E₀î and B⃗ = B₀ĵ.\nÊ × B̂ = î × ĵ = +k̂ (along the positive z-axis). This matches propagation along the +z-axis.\nTesting Option C:\nE⃗ = E₀ĵ and B⃗ = B₀î.\nÊ × B̂ = ĵ × î = −k̂ (along the −z axis).\nHence, only Option A correctly represents wave propagation along the +z-axis.\nTherefore, Option (A) is the correct answer.",
    similarQuestion: {
      question: "If an electromagnetic wave is propagating along the −y-axis, which of the following represents a valid pair of electric and magnetic fields?",
      option_a: "E⃗ = E₀î, B⃗ = B₀k̂",
      option_b: "E⃗ = E₀k̂, B⃗ = B₀î",
      option_c: "E⃗ = E₀ĵ, B⃗ = B₀î",
      option_d: "E⃗ = E₀î, B⃗ = B₀ĵ",
      correct_option: "A",
      explanation: "Direction of propagation is Ê × B̂.\nFor E⃗ = E₀î and B⃗ = B₀k̂:\nÊ × B̂ = î × k̂ = −ĵ (along the negative y-axis).\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 1163,
    question: "The electric field associated with an EM wave in vacuum is given by E⃗ = î 40 cos(kz − 6 × 10⁸t), where E, z and t are in volt/m, metre and seconds, respectively. The value of wave vector k is: [AIPMT 2012 Prelims]",
    optionA: "2 m⁻¹",
    optionB: "0.5 m⁻¹",
    optionC: "6 m⁻¹",
    optionD: "3 m⁻¹",
    correctOption: "A",
    explanation: "Comparing the given electric field equation:\nE = 40 cos(kz − ωt) î\nWe identify:\nω = 6 × 10⁸ rad/s.\nIn vacuum, the propagation speed of an electromagnetic wave is c = 3 × 10⁸ m/s.\nThe wave vector k is related to the angular frequency ω and speed c by:\nk = ω / c.\nSubstituting the values:\nk = (6 × 10⁸ rad/s) / (3 × 10⁸ m/s) = 2 m⁻¹ (or rad/m).\nTherefore, Option (A) is the correct answer.",
    similarQuestion: {
      question: "An electromagnetic wave propagating in vacuum has an angular frequency ω = 9 × 10⁸ rad s⁻¹. The propagation constant (wave number) k is:",
      option_a: "3 m⁻¹",
      option_b: "1.5 m⁻¹",
      option_c: "0.33 m⁻¹",
      option_d: "6 m⁻¹",
      correct_option: "A",
      explanation: "k = ω / c = (9 × 10⁸ rad s⁻¹) / (3 × 10⁸ m s⁻¹) = 3 m⁻¹.\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 1162,
    question: "The ratio of amplitude of magnetic field to the amplitude of electric field for an electromagnetic wave propagating in vacuum is equal to: [AIPMT 2012 Mains]",
    optionA: "The speed of light in vacuum",
    optionB: "Reciprocal of speed of light in vacuum",
    optionC: "The ratio of magnetic permeability to the electric susceptibility of vacuum",
    optionD: "Unity",
    correctOption: "B",
    explanation: "For an electromagnetic wave propagating in vacuum, the relation between the amplitude of the electric field (E₀) and the amplitude of the magnetic field (B₀) is given by:\nE₀ / B₀ = c,\nwhere c is the speed of light in vacuum.\nTaking the ratio of the amplitude of the magnetic field to that of the electric field:\nB₀ / E₀ = 1 / c.\nThus, this ratio is equal to the reciprocal of the speed of light in vacuum.\nTherefore, Option (B) is the correct answer.",
    similarQuestion: {
      question: "If the amplitude of the oscillating electric field in an EM wave is 150 V m⁻¹, what is the amplitude of the oscillating magnetic field in vacuum?",
      option_a: "5 × 10⁻⁷ T",
      option_b: "5 × 10⁻⁸ T",
      option_c: "4.5 × 10¹⁰ T",
      option_d: "2 × 10⁻⁶ T",
      correct_option: "A",
      explanation: "B₀ = E₀ / c = 150 / (3 × 10⁸) = 5 × 10⁻⁷ T.\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 1161,
    question: "The condition under which a microwave oven heats up a food item containing water molecules most efficiently is: [NEET 2013]",
    optionA: "Microwaves are heat waves, so always produce heating.",
    optionB: "Infra-red waves produce heating in a microwave oven.",
    optionC: "The frequency of the microwaves must match the resonant frequency of the water molecules.",
    optionD: "The frequency of the microwaves has no relation with the natural frequency of water molecules.",
    correctOption: "C",
    explanation: "A microwave oven operates at a frequency of approximately 2.45 GHz.\nWater molecules are polar dipoles possessing a permanent electric dipole moment.\nWhen the frequency of the oscillating microwave electric field matches the resonant rotational frequency of the water molecules, resonance occurs.\nThe water molecules absorb energy from the microwave radiation with maximum efficiency and begin to rotate vigorously.\nThis rapid rotational motion increases the rotational kinetic energy of the water molecules, which quickly dissipates into random thermal motion through molecular collisions, heating the food rapidly and uniformly.\nTherefore, Option (C) is the correct answer.",
    similarQuestion: {
      question: "The frequency of microwaves in a domestic microwave oven is chosen such that it efficiently excites the rotational motion of which of the following molecules in food?",
      option_a: "Water molecules",
      option_b: "Nitrogen molecules",
      option_c: "Carbon dioxide molecules",
      option_d: "Oxygen molecules",
      correct_option: "A",
      explanation: "Water molecules are permanent electric dipoles. The oscillating electric field of microwaves torques these dipoles back and forth at their resonant rotational frequency, generating heat.\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 1160,
    question: "An electromagnetic wave of frequency ν = 3.0 MHz passes from vacuum into a dielectric medium with relative permittivity εᵣ = 4.0. Then: [NEET 2013 Karnataka]",
    optionA: "Wavelength is doubled and frequency becomes half.",
    optionB: "Wavelength is halved and frequency remains unchanged.",
    optionC: "Wavelength and frequency both remain unchanged.",
    optionD: "Wavelength is doubled and frequency remains unchanged.",
    correctOption: "B",
    explanation: "1. When a wave enters another medium, its frequency (ν) is determined solely by the source of radiation and remains strictly unchanged:\nν' = ν = 3.0 MHz.\n2. The velocity of the electromagnetic wave in a non-magnetic medium (μᵣ = 1) is:\nv = c / √(εᵣ μᵣ) = c / √4.0 = c / 2.\n3. Wavelength in the medium is related to velocity and frequency by:\nλ' = v / ν = (c / 2) / ν = (1/2)(c / ν) = λ / 2.\nThus, the wavelength is halved while the frequency remains unchanged.\nTherefore, Option (B) is the correct answer.",
    similarQuestion: {
      question: "When an electromagnetic wave travels from air into glass of refractive index n = 1.5, what happens to its frequency and wavelength?",
      option_a: "Frequency remains unchanged, wavelength becomes (2/3) of its initial value.",
      option_b: "Frequency becomes 1.5 times, wavelength remains unchanged.",
      option_c: "Both frequency and wavelength decrease by a factor of 1.5.",
      option_d: "Frequency remains unchanged, wavelength increases by 1.5 times.",
      correct_option: "A",
      explanation: "Frequency is invariant across media boundaries: ν' = ν.\nWavelength inside a medium of refractive index n is λ' = λ / n = λ / 1.5 = 2λ/3.\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 1159,
    question: "Light with an energy flux of 25 × 10⁴ W m⁻² falls on a perfectly reflecting surface at normal incidence. If the surface area is 15 cm², the average force exerted on the surface is: [AIPMT 2014]",
    optionA: "1.25 × 10⁻⁶ N",
    optionB: "2.50 × 10⁻⁶ N",
    optionC: "1.20 × 10⁻⁶ N",
    optionD: "3.0 × 10⁻⁶ N",
    correctOption: "B",
    explanation: "1. For normal incidence on a perfectly reflecting surface, each photon of energy E transfers a momentum Δp = 2E/c.\n2. The radiation pressure P exerted is:\nP = 2I / c, where I is the energy flux (intensity).\n3. The average force exerted on a surface of area A is:\nF = P × A = 2 I A / c.\nGiven:\nI = 25 × 10⁴ W m⁻²\nA = 15 cm² = 15 × 10⁻⁴ m²\nc = 3 × 10⁸ m s⁻¹\nTotal power incident: I × A = (25 × 10⁴) × (15 × 10⁻⁴) = 375 W.\nF = (2 × 375 W) / (3 × 10⁸ m s⁻¹) = 750 / (3 × 10⁸) = 2.50 × 10⁻⁶ N.\nTherefore, Option (B) is the correct answer.",
    similarQuestion: {
      question: "A laser beam of power 60 W is completely absorbed by a target. The force exerted on the target is:",
      option_a: "2.0 × 10⁻⁷ N",
      option_b: "4.0 × 10⁻⁷ N",
      option_c: "1.0 × 10⁻⁷ N",
      option_d: "6.0 × 10⁻⁸ N",
      correct_option: "A",
      explanation: "For complete absorption, momentum transferred per unit time is F = P_power / c.\nF = 60 / (3 × 10⁸) = 2.0 × 10⁻⁷ N.\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 1158,
    question: "A radiation of energy E falls normally on a perfectly reflecting surface. The momentum transferred to the surface is (c = velocity of light): [AIPMT 2015 Cancelled]",
    optionA: "2E/c²",
    optionB: "E/c²",
    optionC: "E/c",
    optionD: "2E/c",
    correctOption: "D",
    explanation: "A beam of radiation of energy E has an initial momentum:\npᵢ = E / c (directed towards the surface).\nUpon perfect reflection, the magnitude of the momentum remains unchanged, but its direction is reversed:\np_f = −E / c (directed away from the surface).\nBy the law of conservation of linear momentum, the momentum transferred to the surface (Δp) is the change in momentum of the radiation:\nΔp = pᵢ − p_f = (E / c) − (−E / c) = 2E / c.\nTherefore, Option (D) is the correct answer.",
    similarQuestion: {
      question: "A radiation of total energy U falls normally on a completely absorbing surface. The momentum transferred to the surface is:",
      option_a: "U / c",
      option_b: "2U / c",
      option_c: "U / (2c)",
      option_d: "Zero",
      correct_option: "A",
      explanation: "When radiation is completely absorbed, final momentum is zero:\nΔp = pᵢ − p_f = (U/c) − 0 = U/c.\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 1157,
    question: "The energy of the EM waves is of the order of 15 keV. To which part of the spectrum does it belong? [AIPMT 2015]",
    optionA: "Ultraviolet rays",
    optionB: "Gamma rays",
    optionC: "X-rays",
    optionD: "Infra-red rays",
    correctOption: "C",
    explanation: "Let us calculate the wavelength corresponding to a photon energy of E = 15 keV:\nE = 15 × 10³ eV = 15,000 eV.\nUsing the relation:\nλ (in Å) ≈ 12400 / E (in eV)\nλ ≈ 12400 / 15000 ≈ 0.827 Å = 0.0827 nm ≈ 8.27 × 10⁻¹¹ m.\nThe wavelength range of X-rays spans from about 0.01 nm to 10 nm (0.1 Å to 100 Å), with corresponding photon energies typically ranging from ~100 eV to 100 keV.\nTherefore, radiation with an energy of 15 keV falls directly into the X-ray region.\nTherefore, Option (C) is the correct answer.",
    similarQuestion: {
      question: "A photon has an energy of 3.1 eV. To which region of the electromagnetic spectrum does it belong?",
      option_a: "Visible light",
      option_b: "X-rays",
      option_c: "Microwaves",
      option_d: "Radio waves",
      correct_option: "A",
      explanation: "Visible light photons have energies between approximately 1.8 eV (red, ~700 nm) and 3.1 eV (violet, ~400 nm).\nTherefore, a photon of 3.1 eV lies at the violet edge of the visible spectrum.\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 1156,
    question: "Out of the following options, which one can be used to produce a propagating electromagnetic wave? [NEET 2016 Phase 1]",
    optionA: "A chargeless particle",
    optionB: "An accelerating charge",
    optionC: "A charge moving at constant velocity",
    optionD: "A stationary charge",
    correctOption: "B",
    explanation: "1. A stationary charge produces only a static electric field (Coulomb field).\n2. A charge moving with uniform velocity (zero acceleration) produces both a steady electric field and a steady (time-invariant) magnetic field, but no electromagnetic radiation is emitted because no energy is decoupled from the particle.\n3. A chargeless particle cannot interact with or produce electromagnetic fields.\n4. An accelerating charge (e.g., an oscillating charge in an LC circuit or antenna) creates time-varying electric and magnetic fields.\nAccording to Maxwell's equations, a changing electric field produces a changing magnetic field, and vice versa, resulting in self-sustaining electromagnetic wave propagation through space.\nTherefore, Option (B) is the correct answer.",
    similarQuestion: {
      question: "Which of the following physical systems radiates electromagnetic energy into space?",
      option_a: "An electric dipole oscillating sinusoidally with time",
      option_b: "A constant direct current flowing in a straight superconducting wire",
      option_c: "A stationary point charge in vacuum",
      option_d: "A neutron moving with uniform velocity",
      correct_option: "A",
      explanation: "An oscillating electric dipole contains accelerating charges that continuously generate time-varying electric and magnetic fields, radiating electromagnetic waves.\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 1155,
    question: "In an electromagnetic wave in free space, the root mean square value of the electric field is Eᵣₘₛ = 6 V m⁻¹. The peak value of the magnetic field is: [NEET 2017]",
    optionA: "2.83 × 10⁻⁸ T",
    optionB: "0.70 × 10⁻⁸ T",
    optionC: "4.23 × 10⁻⁸ T",
    optionD: "1.41 × 10⁻⁸ T",
    correctOption: "A",
    explanation: "Step 1: Calculate the peak (maximum) value of the electric field (E₀):\nE₀ = √2 × Eᵣₘₛ = 1.414 × 6 V m⁻¹ ≈ 8.485 V m⁻¹.\nStep 2: Relate the peak electric field to the peak magnetic field (B₀) in free space using the speed of light c:\nB₀ = E₀ / c.\nGiven c = 3 × 10⁸ m s⁻¹:\nB₀ = (8.485 V m⁻¹) / (3 × 10⁸ m s⁻¹) = 2.828 × 10⁻⁸ T ≈ 2.83 × 10⁻⁸ T.\nTherefore, Option (A) is the correct answer.",
    similarQuestion: {
      question: "In a plane electromagnetic wave, the peak value of the electric field is 30 V m⁻¹. The root mean square (rms) value of the magnetic field is:",
      option_a: "7.07 × 10⁻⁸ T",
      option_b: "1.0 × 10⁻⁷ T",
      option_c: "1.41 × 10⁻⁷ T",
      option_d: "3.53 × 10⁻⁸ T",
      correct_option: "A",
      explanation: "Peak magnetic field B₀ = E₀ / c = 30 / (3 × 10⁸) = 1.0 × 10⁻⁷ T.\nBᵣₘₛ = B₀ / √2 = (1.0 × 10⁻⁷) / 1.414 ≈ 0.707 × 10⁻⁷ T = 7.07 × 10⁻⁸ T.\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 1154,
    question: "An EM wave is propagating in a medium with a velocity v⃗ = vî. The instantaneous oscillating electric field of this EM wave is along the +y-axis. Then the direction of the oscillating magnetic field of the EM wave will be along: [NEET 2018]",
    optionA: "−z direction",
    optionB: "+z direction",
    optionC: "−y direction",
    optionD: "−x direction",
    correctOption: "B",
    explanation: "The direction of propagation of an electromagnetic wave is parallel to the cross product E⃗ × B⃗:\nv̂ = Ê × B̂.\nGiven:\nv̂ = î (along +x)\nÊ = ĵ (along +y)\nLet B̂ be the unit vector along the magnetic field.\nWe know the standard unit vector cross products:\nî = ĵ × k̂.\nTherefore, B̂ must be along the positive z-direction (+k̂, +z direction).\nIf B̂ were along −k̂, ĵ × (−k̂) = −î, which would correspond to propagation in the −x direction.\nHence, the oscillating magnetic field is along the +z direction.\nTherefore, Option (B) is the correct answer.",
    similarQuestion: {
      question: "If an electromagnetic wave travels along the +y-direction and its magnetic field oscillates along the +x-direction, the oscillating electric field is along:",
      option_a: "+z direction",
      option_b: "−z direction",
      option_c: "+x direction",
      option_d: "−x direction",
      correct_option: "A",
      explanation: "Propagation direction v̂ = Ê × B̂ = ĵ.\nGiven B̂ = î.\nSince k̂ × î = +ĵ, Ê must be along the positive z-direction (+k̂).\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 1153,
    question: "Which colour of light has the longest wavelength? [NEET 2019]",
    optionA: "Blue",
    optionB: "Violet",
    optionC: "Red",
    optionD: "Green",
    correctOption: "C",
    explanation: "Within the visible spectrum, the mnemonic VIBGYOR represents colors in order of increasing wavelength:\n- Violet (λ ≈ 400 nm) - shortest wavelength, highest frequency.\n- Indigo (λ ≈ 425 nm)\n- Blue (λ ≈ 470 nm)\n- Green (λ ≈ 520 nm)\n- Yellow (λ ≈ 570 nm)\n- Orange (λ ≈ 610 nm)\n- Red (λ ≈ 700 nm) - longest wavelength, lowest frequency.\nTherefore, red light has the longest wavelength in the visible spectrum.\nTherefore, Option (C) is the correct answer.",
    similarQuestion: {
      question: "Which visible color of light undergoes the maximum deviation when white light passes through a glass prism?",
      option_a: "Violet",
      option_b: "Red",
      option_c: "Yellow",
      option_d: "Green",
      correct_option: "A",
      explanation: "According to Cauchy's dispersion formula, refractive index μ increases as wavelength λ decreases.\nViolet light has the shortest wavelength in the visible spectrum, so it experiences the highest refractive index and undergoes maximum deviation (δ = (μ − 1)A).\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 1152,
    question: "The ratio of contributions made by the electric field and magnetic field components to the intensity of an electromagnetic wave is (c = speed of electromagnetic waves): [NEET 2020 Phase 1]",
    optionA: "1 : 1",
    optionB: "1 : c",
    optionC: "1 : c²",
    optionD: "c : 1",
    correctOption: "A",
    explanation: "The energy density associated with the electric field in vacuum is:\nu_e = (1/2) ε₀ Eᵣₘₛ² = (1/4) ε₀ E₀².\nThe energy density associated with the magnetic field in vacuum is:\nu_m = (1/2) (Bᵣₘₛ² / μ₀) = (1/4) (B₀² / μ₀).\nSince E₀ = c B₀ and c² = 1 / (μ₀ ε₀):\nu_e = (1/4) ε₀ (c B₀)² = (1/4) ε₀ c² B₀² = (1/4) ε₀ [1 / (μ₀ ε₀)] B₀² = (1/4) (B₀² / μ₀) = u_m.\nSince the intensity of a wave is directly proportional to its energy density (I = u × c), and u_e = u_m:\nIntensity contribution of electric field / Intensity contribution of magnetic field = u_e / u_m = 1 : 1.\nTherefore, the electric and magnetic fields contribute equally to the total wave intensity.\nTherefore, Option (A) is the correct answer.",
    similarQuestion: {
      question: "In a plane electromagnetic wave of total average intensity I, the average intensity carried by the electric field is:",
      option_a: "I / 2",
      option_b: "I",
      option_c: "I / 4",
      option_d: "Zero",
      correct_option: "A",
      explanation: "Because the total energy density and intensity are split equally between the electric and magnetic fields (u_e = u_m), the electric field carries exactly half of the total intensity: I_e = I / 2.\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 1151,
    question: "For a plane electromagnetic wave propagating in the x-direction, which one of the following combinations gives the correct possible directions for electric field (E) and magnetic field (B), respectively? [NEET 2021]",
    optionA: "−ĵ + k̂, −ĵ + k̂",
    optionB: "ĵ + k̂, ĵ + k̂",
    optionC: "−ĵ + k̂, −ĵ − k̂",
    optionD: "ĵ + k̂, −ĵ − k̂",
    correctOption: "C",
    explanation: "For a wave propagating in the positive x-direction (+î):\n1. Transverse condition: E⃗ and B⃗ must be perpendicular to the direction of propagation (î). In all options, the components are along ĵ and k̂, so E⃗ · î = 0 and B⃗ · î = 0.\n2. Mutual orthogonality: E⃗ and B⃗ must be mutually perpendicular: E⃗ · B⃗ = 0.\nFor Option C:\nE⃗ = −ĵ + k̂\nB⃗ = −ĵ − k̂\nE⃗ · B⃗ = (−1)(−1) + (1)(−1) = 1 − 1 = 0. (Orthogonal)\n3. Propagation direction must be along +î:\nE⃗ × B⃗ = (−ĵ + k̂) × (−ĵ − k̂)\n= (−ĵ × −ĵ) + (−ĵ × −k̂) + (k̂ × −ĵ) + (k̂ × −k̂)\n= 0 + (ĵ × k̂) − (k̂ × ĵ) + 0\n= î − (−î) = 2î.\nBecause 2î points along the positive x-axis (+î), this combination correctly produces wave propagation in the x-direction.\nTherefore, Option (C) is the correct answer.",
    similarQuestion: {
      question: "For an electromagnetic wave propagating along the +z-direction, which of the following pairs of electric and magnetic fields is physically allowed?",
      option_a: "E⃗ = E₀(î + ĵ), B⃗ = B₀(−î + ĵ)",
      option_b: "E⃗ = E₀î, B⃗ = B₀î",
      option_c: "E⃗ = E₀k̂, B⃗ = B₀î",
      option_d: "E⃗ = E₀(î + ĵ), B⃗ = B₀(î + ĵ)",
      correct_option: "A",
      explanation: "E⃗ · B⃗ = (1)(−1) + (1)(1) = 0 (mutually perpendicular).\nÊ × B̂ = (î + ĵ) × (−î + ĵ) = (î × ĵ) − (ĵ × î) = k̂ − (−k̂) = 2k̂ (along +z axis).\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 1150,
    question: "When light propagates through a material medium of relative permittivity εᵣ and relative permeability μᵣ, the velocity of light v is given by (c is the velocity of light in vacuum): [NEET 2022 Phase 1]",
    optionA: "v = c",
    optionB: "v = √(μᵣ/εᵣ)",
    optionC: "v = √(εᵣ/μᵣ)",
    optionD: "v = c/√(εᵣμᵣ)",
    correctOption: "D",
    explanation: "In vacuum, the speed of light is:\nc = 1 / √(μ₀ε₀).\nIn a material medium with permittivity ε = ε₀εᵣ and permeability μ = μ₀μᵣ, the speed of light v is:\nv = 1 / √(με) = 1 / √(μ₀μᵣ ε₀εᵣ) = 1 / [√(μ₀ε₀) √(μᵣεᵣ)] = c / √(εᵣμᵣ).\nTherefore, Option (D) is the correct answer.",
    similarQuestion: {
      question: "The refractive index n of a non-magnetic medium (μᵣ = 1) having relative permittivity εᵣ is equal to:",
      option_a: "√εᵣ",
      option_b: "εᵣ",
      option_c: "1 / √εᵣ",
      option_d: "εᵣ²",
      correct_option: "A",
      explanation: "Refractive index n = c / v = √(μᵣεᵣ). For a non-magnetic medium where μᵣ = 1, n = √εᵣ.\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 1149,
    question: "Match List-I with List-II. List-I (Electromagnetic waves) | List-II (Wavelength): (a) AM radio waves | (i) 10⁻¹⁰ m; (b) Microwaves | (ii) 10² m; (c) Infrared radiations | (iii) 10⁻² m; (d) X-rays | (iv) 10⁻⁴ m. Choose the correct answer: [NEET 2022 Phase 1]",
    optionA: "(a)-(iv), (b)-(iii), (c)-(ii), (d)-(i)",
    optionB: "(a)-(iii), (b)-(ii), (c)-(i), (d)-(iv)",
    optionC: "(a)-(iii), (b)-(iv), (c)-(ii), (d)-(i)",
    optionD: "(a)-(ii), (b)-(iii), (c)-(iv), (d)-(i)",
    correctOption: "D",
    explanation: "Matching each electromagnetic wave with its characteristic wavelength:\n- (a) AM radio waves: Typically have long wavelengths on the order of hundreds of metres ~ 10² m → (ii).\n- (b) Microwaves: Typical wavelength range ~ 1 mm to 0.1 m, representative value ~ 10⁻² m (1 cm) → (iii).\n- (c) Infrared radiations: Typical wavelength range ~ 700 nm to 1 mm, representative value ~ 10⁻⁴ m → (iv).\n- (d) X-rays: Typical wavelength range ~ 0.01 nm to 10 nm, representative value ~ 10⁻¹⁰ m (1 Å) → (i).\nTherefore, the correct matching is: (a)-(ii), (b)-(iii), (c)-(iv), (d)-(i).\nTherefore, Option (D) is the correct answer.",
    similarQuestion: {
      question: "Match the electromagnetic wave in Column I with its typical wavelength in Column II: Column I: (A) Ultraviolet, (B) Gamma rays, (C) FM radio waves. Column II: (1) ~3 m, (2) ~10⁻⁸ m, (3) ~10⁻¹² m.",
      option_a: "(A)-(2), (B)-(3), (C)-(1)",
      option_b: "(A)-(1), (B)-(2), (C)-(3)",
      option_c: "(A)-(3), (B)-(2), (C)-(1)",
      option_d: "(A)-(2), (B)-(1), (C)-(3)",
      correct_option: "A",
      explanation: "Ultraviolet rays have wavelengths around 10⁻⁸ m (10-400 nm).\nGamma rays have sub-picometer wavelengths around 10⁻¹² m.\nFM radio waves (~100 MHz) have wavelengths of c/ν = (3 × 10⁸)/(10⁸) = 3 m.\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 1148,
    question: "The ratio of the magnitude of the magnetic field and electric field intensity of a plane electromagnetic wave in free space of permeability μ₀ and permittivity ε₀ is (Given that c is the velocity of light in free space): [NEET 2022 Phase 2]",
    optionA: "√(μ₀ε₀)/c",
    optionB: "c",
    optionC: "1/c",
    optionD: "c/√(μ₀ε₀)",
    correctOption: "C",
    explanation: "In a plane electromagnetic wave propagating through free space, the ratio of the amplitude (magnitude) of the electric field E to the magnetic field B at any instant is:\nE / B = c.\nThe question asks for the ratio of the magnitude of the magnetic field (B) to the electric field (E):\nB / E = 1 / c.\nTherefore, Option (C) is the correct answer.",
    similarQuestion: {
      question: "The ratio E₀ / B₀ for an electromagnetic wave propagating in free space has the dimension of which physical quantity?",
      option_a: "Velocity",
      option_b: "Acceleration",
      option_c: "Force",
      option_d: "Energy",
      correct_option: "A",
      explanation: "E₀ / B₀ = c, which is the speed of light in vacuum. It has the dimensions of velocity [M⁰ L¹ T⁻¹] and SI unit m s⁻¹.\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 1147,
    question: "The magnetic field of a plane electromagnetic wave is given by B⃗ = 3 × 10⁻⁸ cos(1.6 × 10³x + 48 × 10¹⁰t) ĵ T. Then the associated electric field will be: [NEET 2022 Phase 2]",
    optionA: "9 cos(1.6 × 10³x + 48 × 10¹⁰t) k̂ V/m",
    optionB: "3 × 10⁻⁸ cos(1.6 × 10³x + 48 × 10¹⁰t) î V/m",
    optionC: "3 × 10⁻⁸ sin(1.6 × 10³x + 48 × 10¹⁰t) î V/m",
    optionD: "9 sin(1.6 × 10³x − 48 × 10¹⁰t) k̂ V/m",
    correctOption: "A",
    explanation: "1. Given magnetic field:\nB⃗ = 3 × 10⁻⁸ cos(1.6 × 10³x + 48 × 10¹⁰t) ĵ T.\nHere, B₀ = 3 × 10⁻⁸ T, k = 1.6 × 10³ m⁻¹, and ω = 48 × 10¹⁰ rad/s.\n2. The wave speed is:\nv = ω / k = (48 × 10¹⁰) / (1.6 × 10³) = 3 × 10⁸ m s⁻¹ = c.\n3. The amplitude of the associated electric field is:\nE₀ = c B₀ = (3 × 10⁸ m s⁻¹) × (3 × 10⁻⁸ T) = 9 V m⁻¹.\n4. The argument (kx + ωt) indicates that the wave is travelling in the negative x-direction (−î).\nThe direction of wave propagation is given by Ê × B̂ = −î.\nGiven B̂ = ĵ:\nIf Ê = k̂, then Ê × B̂ = k̂ × ĵ = −î, which exactly matches the direction of propagation!\nThus, E⃗ = 9 cos(1.6 × 10³x + 48 × 10¹⁰t) k̂ V/m.\nTherefore, Option (A) is the correct answer.",
    similarQuestion: {
      question: "The electric field of an EM wave is given by E⃗ = 60 cos(2 × 10⁶z − 6 × 10¹⁴t) î V m⁻¹. The associated magnetic field B⃗ is:",
      option_a: "2 × 10⁻⁷ cos(2 × 10⁶z − 6 × 10¹⁴t) ĵ T",
      option_b: "2 × 10⁻⁷ cos(2 × 10⁶z − 6 × 10¹⁴t) k̂ T",
      option_c: "60 cos(2 × 10⁶z − 6 × 10¹⁴t) ĵ T",
      option_d: "−2 × 10⁻⁷ cos(2 × 10⁶z − 6 × 10¹⁴t) ĵ T",
      correct_option: "A",
      explanation: "Propagation direction is +z (+k̂).\nB₀ = E₀ / c = 60 / (3 × 10⁸) = 2 × 10⁻⁷ T.\nÊ × B̂ = î × ĵ = +k̂ (along +z).\nThus, B⃗ = 2 × 10⁻⁷ cos(2 × 10⁶z − 6 × 10¹⁴t) ĵ T.\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 1146,
    question: "In a plane electromagnetic wave travelling in free space, the electric field component oscillates sinusoidally at a frequency of 2.0 × 10¹⁰ Hz and amplitude 48 V m⁻¹. Then the amplitude of oscillating magnetic field is (Speed of light in free space = 3 × 10⁸ m s⁻¹): [NEET 2023]",
    optionA: "1.6 × 10⁻⁸ T",
    optionB: "1.6 × 10⁻⁷ T",
    optionC: "1.6 × 10⁻⁶ T",
    optionD: "1.6 × 10⁻⁹ T",
    correctOption: "B",
    explanation: "In free space, the relationship between the peak amplitude of the electric field (E₀) and the peak amplitude of the magnetic field (B₀) is given by:\nE₀ / B₀ = c,\nwhere c is the speed of light in free space.\nRearranging for B₀:\nB₀ = E₀ / c.\nGiven:\nE₀ = 48 V m⁻¹\nc = 3 × 10⁸ m s⁻¹\nB₀ = 48 / (3 × 10⁸) = 16 × 10⁻⁸ T = 1.6 × 10⁻⁷ T.\nTherefore, Option (B) is the correct answer.",
    similarQuestion: {
      question: "The magnetic field amplitude of a plane EM wave is B₀ = 2.0 × 10⁻⁷ T. What is the electric field amplitude E₀ in free space?",
      option_a: "60 V m⁻¹",
      option_b: "30 V m⁻¹",
      option_c: "120 V m⁻¹",
      option_d: "6.0 V m⁻¹",
      correct_option: "A",
      explanation: "E₀ = c × B₀ = (3 × 10⁸ m s⁻¹) × (2.0 × 10⁻⁷ T) = 60 V m⁻¹.\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 1145,
    question: "The property which is not of an electromagnetic wave travelling in free space is that: [NEET 2024]",
    optionA: "They are transverse in nature.",
    optionB: "The energy density in electric field is equal to energy density in magnetic field.",
    optionC: "They travel with a speed equal to 1/√(μ₀ε₀).",
    optionD: "They originate from charges moving with uniform speed.",
    correctOption: "D",
    explanation: "Let us analyze each statement:\n- Statement A: Electromagnetic waves are transverse waves because both E⃗ and B⃗ oscillate perpendicularly to the direction of wave propagation. (Correct property)\n- Statement B: The time-averaged energy density of the electric field u_e = (1/4)ε₀E₀² is exactly equal to that of the magnetic field u_m = (1/4)B₀²/μ₀. (Correct property)\n- Statement C: In vacuum, electromagnetic waves propagate with speed c = 1/√(μ₀ε₀) ≈ 3 × 10⁸ m s⁻¹. (Correct property)\n- Statement D: Charges moving with uniform speed (constant velocity) produce steady electric and magnetic fields but do NOT radiate electromagnetic waves. Electromagnetic waves are produced ONLY by accelerating or decelerating charges.\nTherefore, statement D is NOT a property of electromagnetic waves.\nTherefore, Option (D) is the correct answer.",
    similarQuestion: {
      question: "Electromagnetic waves CANNOT be produced by which of the following?",
      option_a: "A charge moving in a circular path at constant speed",
      option_b: "An electron oscillating in an LC circuit",
      option_c: "A stationary electric charge",
      option_d: "A proton undergoing linear deceleration",
      correct_option: "C",
      explanation: "A stationary charge creates only an electrostatic field and does not radiate electromagnetic waves. A charge in uniform circular motion accelerates centripetally and hence radiates.\nTherefore, Option (C) is the correct answer."
    }
  },
  {
    id: 1144,
    question: "If the ratio of relative permeability and relative permittivity of a uniform medium is 1 : 4, the ratio of the magnitudes of electric field intensity (E) to the magnetic field intensity (H) of an EM wave propagating in that medium is (Given that √(μ₀/ε₀) = 120π): [NEET 2024 Re-Examination]",
    optionA: "30π : 1",
    optionB: "1 : 120π",
    optionC: "60π : 1",
    optionD: "120π : 1",
    correctOption: "C",
    explanation: "The ratio of the magnitude of the electric field intensity E to the magnetic field intensity H is the intrinsic wave impedance (η) of the medium:\nη = E / H = √(μ / ε) = √( (μ₀ μᵣ) / (ε₀ εᵣ) ) = √(μ₀ / ε₀) × √(μᵣ / εᵣ).\nGiven:\n√(μ₀ / ε₀) = 120π Ω\nμᵣ / εᵣ = 1 / 4\nSubstituting these values:\nη = 120π × √(1 / 4) = 120π × (1 / 2) = 60π.\nTherefore, the ratio E : H is 60π : 1.\nTherefore, Option (C) is the correct answer.",
    similarQuestion: {
      question: "What is the intrinsic wave impedance (E/H) of free space, given μ₀ = 4π × 10⁻⁷ H m⁻¹ and ε₀ = 8.85 × 10⁻¹² F m⁻¹?",
      option_a: "377 Ω (≈ 120π Ω)",
      option_b: "120 Ω",
      option_c: "3 × 10⁸ Ω",
      option_d: "60π Ω",
      correct_option: "A",
      explanation: "In free space, intrinsic wave impedance η₀ = √(μ₀ / ε₀) ≈ √( (4π × 10⁻⁷) / (8.854 × 10⁻¹²) ) ≈ 376.7 Ω ≈ 120π Ω.\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 1143,
    question: "The electromagnetic radiation which has the smallest wavelength is: [NEET 2024 Re-Examination]",
    optionA: "X-rays",
    optionB: "Gamma rays",
    optionC: "Ultraviolet rays",
    optionD: "Microwaves",
    correctOption: "B",
    explanation: "In the electromagnetic spectrum, as frequency increases, wavelength decreases according to λ = c / ν.\nComparing the given types of electromagnetic radiation:\n- Microwaves: λ ~ 10⁻³ m to 10⁻¹ m\n- Ultraviolet rays: λ ~ 10⁻⁸ m to 4 × 10⁻⁷ m\n- X-rays: λ ~ 10⁻¹¹ m to 10⁻⁸ m\n- Gamma rays: λ < 10⁻¹¹ m (down to 10⁻¹⁴ m or smaller)\nBecause gamma rays have the highest frequency and photon energy in the electromagnetic spectrum, they possess the smallest (shortest) wavelength.\nTherefore, Option (B) is the correct answer.",
    similarQuestion: {
      question: "Which electromagnetic radiation has the greatest penetrating power and highest photon energy?",
      option_a: "Gamma rays",
      option_b: "X-rays",
      option_c: "Ultraviolet rays",
      option_d: "Infrared rays",
      correct_option: "A",
      explanation: "Gamma rays possess the highest frequency (ν > 10¹⁹ Hz) and photon energy (E = hν), which gives them the greatest penetrating ability through matter.\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 1142,
    question: "The electric field in a plane electromagnetic wave is given by E_z = 60 cos(5x + 1.5 × 10⁹t) V/m. Then the expression for the corresponding magnetic field is (here subscripts denote the direction of the field): [NEET 2025]",
    optionA: "B_z = 60 cos(5x + 1.5 × 10⁹t) T",
    optionB: "B_y = 60 sin(5x + 1.5 × 10⁹t) T",
    optionC: "B_y = 2 × 10⁻⁷ cos(5x + 1.5 × 10⁹t) T",
    optionD: "B_x = 2 × 10⁻⁷ cos(5x + 1.5 × 10⁹t) T",
    correctOption: "C",
    explanation: "1. Given electric field:\nE_z = 60 cos(5x + 1.5 × 10⁹t) V/m (along the z-axis, k̂).\nHere, E₀ = 60 V/m, k = 5 rad/m, and ω = 1.5 × 10⁹ rad/s.\n2. Wave speed: v = ω / k = (1.5 × 10⁹) / 5 = 3 × 10⁸ m/s = c.\n3. The amplitude of the magnetic field:\nB₀ = E₀ / c = 60 / (3 × 10⁸) = 2 × 10⁻⁷ T.\n4. The wave argument is (kx + ωt), so the wave propagates in the negative x-direction (−î).\nThe direction of wave propagation is given by Ê × B̂ = −î.\nSince Ê = k̂:\nWe test B̂ = ĵ:\nk̂ × ĵ = −î.\nThis points exactly along the −x direction!\nThus, the oscillating magnetic field is along the y-axis with the same phase:\nB_y = 2 × 10⁻⁷ cos(5x + 1.5 × 10⁹t) T.\nTherefore, Option (C) is the correct answer.",
    similarQuestion: {
      question: "An electromagnetic wave has an electric field E_y = 90 cos(3x + 9 × 10⁸t) V/m. The corresponding magnetic field expression is:",
      option_a: "B_z = −3 × 10⁻⁷ cos(3x + 9 × 10⁸t) T",
      option_b: "B_z = 3 × 10⁻⁷ cos(3x + 9 × 10⁸t) T",
      option_c: "B_x = 3 × 10⁻⁷ cos(3x + 9 × 10⁸t) T",
      option_d: "B_y = 90 cos(3x + 9 × 10⁸t) T",
      correct_option: "A",
      explanation: "Wave propagates along −î. Ê = ĵ.\nWe need Ê × B̂ = −î.\nSince ĵ × k̂ = +î, ĵ × (−k̂) = −î.\nSo B̂ must be along −k̂!\nB₀ = E₀ / c = 90 / (3 × 10⁸) = 3 × 10⁻⁷ T.\nThus, B_z = −3 × 10⁻⁷ cos(3x + 9 × 10⁸t) T.\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 1141,
    question: "Match List I with List II. List-I (Electromagnetic wave) | List-II (Production): A. Microwave | I. Electrons in atoms emit light when they move from a higher energy level to a lower energy level; B. Visible light | II. Radioactive decay of nucleus; C. Gamma rays | III. Vibration of atoms and molecules; D. Infra-red rays | IV. Klystron valve or magnetron valve. Choose the correct answer from the options given below: [NEET 2026]",
    optionA: "A-III, B-I, C-II, D-IV",
    optionB: "A-III, B-IV, C-I, D-II",
    optionC: "A-IV, B-I, C-II, D-III",
    optionD: "A-IV, B-III, C-II, D-I",
    correctOption: "C",
    explanation: "Matching each electromagnetic wave with its mechanism of production:\n- A. Microwaves: Produced by special vacuum tubes like klystron, magnetron valves, or Gunn diodes → IV.\n- B. Visible light: Emitted when electrons in atoms transition from higher excited energy levels to lower energy levels → I.\n- C. Gamma rays: Produced in radioactive decay and nuclear transitions within an atomic nucleus → II.\n- D. Infra-red rays: Produced by the thermal vibration and rotation of atoms and molecules in hot bodies → III.\nTherefore, the correct matching is: A-IV, B-I, C-II, D-III.\nTherefore, Option (C) is the correct answer.",
    similarQuestion: {
      question: "X-rays are primarily produced when:",
      option_a: "High-energy electrons decelerate upon striking a metal target of high atomic number (bremsstrahlung)",
      option_b: "Molecules vibrate thermally at room temperature",
      option_c: "Unstable atomic nuclei undergo radioactive decay",
      option_d: "Rapidly accelerating electrons oscillate in an LC circuit",
      correct_option: "A",
      explanation: "X-rays are produced in an X-ray tube when high-speed cathode electrons bombard a heavy metal target (such as tungsten or molybdenum), undergoing sudden deceleration (bremsstrahlung) and inner-shell electron transitions.\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 1140,
    question: "An electromagnetic wave travelling in a lossless dielectric medium having a dielectric constant εᵣ = 9, has the electric field Eₓ = E₀ sin(kz − 2π × 10⁶t) V m⁻¹, where E₀ is the amplitude and k is the wave vector. Among the following options, the incorrect choice is: [RE-NEET 2026]",
    optionA: "The direction of propagation of the electromagnetic wave is along +z.",
    optionB: "The speed of the electromagnetic wave inside the medium is 10⁸ m s⁻¹.",
    optionC: "The wavelength of the electromagnetic wave inside the medium is 300 m.",
    optionD: "The magnetic field is given by the relation Bᵧ = (B₀/v) sin(kz − 2π × 10⁶t), where v is the speed of the electromagnetic wave inside the medium.",
    correctOption: "C",
    explanation: "Let us analyze the given wave equation:\nEₓ = E₀ sin(kz − ωt), with ω = 2π × 10⁶ rad/s and εᵣ = 9 (non-magnetic, μᵣ = 1).\n1. Propagation direction: The argument (kz − ωt) represents wave propagation along the positive z-direction (+z). (Statement A is correct)\n2. Refractive index of medium:\nn = √(εᵣ μᵣ) = √9 = 3.\nWave speed inside the medium:\nv = c / n = (3 × 10⁸ m s⁻¹) / 3 = 10⁸ m s⁻¹. (Statement B is correct)\n3. Frequency of the wave:\nν = ω / 2π = (2π × 10⁶) / (2π) = 10⁶ Hz = 1 MHz.\nWavelength inside the medium:\nλ = v / ν = (10⁸ m s⁻¹) / (10⁶ Hz) = 100 m.\nStatement C asserts that the wavelength is 300 m, which is factually false (it would be 300 m in vacuum, but inside this medium with εᵣ = 9, it is compressed to 100 m).\nTherefore, Statement C is the incorrect choice.\nTherefore, Option (C) is the correct answer.",
    similarQuestion: {
      question: "An electromagnetic wave of frequency 5 × 10¹⁴ Hz enters a medium of dielectric constant K = 4. What is its wavelength inside the medium?",
      option_a: "300 nm",
      option_b: "600 nm",
      option_c: "150 nm",
      option_d: "1200 nm",
      correct_option: "A",
      explanation: "Speed inside the medium v = c / √K = (3 × 10⁸) / 2 = 1.5 × 10⁸ m s⁻¹.\nWavelength λ = v / ν = (1.5 × 10⁸) / (5 × 10¹⁴) = 3 × 10⁻⁷ m = 300 nm.\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 1139,
    question: "The following table presents the part of the electromagnetic spectrum and their corresponding major applications. Part of the electromagnetic spectrum | Applications: P. Microwave | I. For purifying the water; Q. UV rays | II. For warming the food; R. Gamma rays | III. For AM and FM communication systems; S. Radio wave | IV. For treating the cancer cells. The correct option is: [RE-NEET 2026]",
    optionA: "P-II, Q-IV, R-III, S-I",
    optionB: "P-I, Q-II, R-III, S-IV",
    optionC: "P-I, Q-IV, R-II, S-III",
    optionD: "P-II, Q-I, R-IV, S-III",
    correctOption: "D",
    explanation: "Matching each electromagnetic radiation with its key practical application:\n- P. Microwaves: Used in microwave ovens for warming and cooking food (by exciting water dipoles) → II.\n- Q. UV rays: Possess germicidal properties and are widely used in water purifiers (RO-UV systems) to kill bacteria and pathogens → I.\n- R. Gamma rays: High-energy ionizing radiation used in radiation therapy (radiotherapy) to destroy cancer cells and tumors → IV.\n- S. Radio waves: Used extensively in telecommunication including AM and FM radio broadcast systems → III.\nTherefore, the correct matching is: P-II, Q-I, R-IV, S-III.\nTherefore, Option (D) is the correct answer.",
    similarQuestion: {
      question: "Match the electromagnetic waves with their medical applications: (A) X-rays, (B) Ultraviolet rays, (C) Infrared rays. Applications: (1) Physical therapy for muscle aches, (2) LASIK eye surgery, (3) Diagnostic imaging of bone fractures.",
      option_a: "(A)-(3), (B)-(2), (C)-(1)",
      option_b: "(A)-(1), (B)-(2), (C)-(3)",
      option_c: "(A)-(2), (B)-(3), (C)-(1)",
      option_d: "(A)-(3), (B)-(1), (C)-(2)",
      correct_option: "A",
      explanation: "X-rays are used for diagnostic bone radiography.\nExcimer lasers in the ultraviolet range are used in LASIK eye surgery.\nInfrared radiation (heat lamps) provides soothing deep-tissue warmth in physical therapy.\nTherefore, Option (A) is the correct answer."
    }
  }
];

async function run() {
  console.log('Logging in to live API...');
  const loginRes = await request('https://api.indraprasthaneetacademy.com/api/admin/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' }
  }, { username: 'indraprasthaadmin', password: 'indraprastha@123' });

  if (!loginRes.data || !loginRes.data.token) {
    console.error('Login failed:', loginRes);
    process.exit(1);
  }

  const token = loginRes.data.token;
  console.log(`Login successful! Updating ${pyqsData.length} PYQs in Chapter 118 (Electromagnetic Waves)...`);

  for (let i = 0; i < pyqsData.length; i++) {
    const item = pyqsData[i];
    console.log(`[${i + 1}/${pyqsData.length}] Updating PYQ ID ${item.id}...`);

    const updatePayload = {
      question: item.question,
      optionA: item.optionA,
      optionB: item.optionB,
      optionC: item.optionC,
      optionD: item.optionD,
      correctOption: item.correctOption,
      explanation: item.explanation,
      similarQuestion: item.similarQuestion
    };

    const res = await request(`https://api.indraprasthaneetacademy.com/api/admin/pyqs/${item.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    }, updatePayload);

    if (res.data && res.data.success) {
      console.log(`  -> PYQ ${item.id} updated successfully with high-yield Similar Question!`);
    } else {
      console.error(`  -> Failed to update PYQ ${item.id}:`, res);
      process.exit(1);
    }
  }

  console.log(`\n🎉 COMPLETED: ${pyqsData.length}/${pyqsData.length} PYQs in Chapter 118 (Electromagnetic Waves) updated live!`);
}

run().catch(console.error);
