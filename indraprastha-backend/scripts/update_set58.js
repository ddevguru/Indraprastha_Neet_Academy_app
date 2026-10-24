const BASE_URL = 'https://api.indraprasthaneetacademy.com/api';

const questions = [
  {
    id: 3269,
    similarQuestion: {
      question: "The average electric energy density stored in an electromagnetic wave propagating through vacuum with peak electric field amplitude E₀ is given by:",
      option_a: "(1/2) × ε₀ × E₀²",
      option_b: "E₀² / (2 ε₀)",
      option_c: "ε₀ × E₀²",
      option_d: "(1/4) × ε₀ × E₀²",
      correct_option: "D",
      explanation: "Step 1: The instantaneous electric energy density in an electric field E is u_E = (1/2) ε₀ E².\n\nStep 2: For an electromagnetic wave E(t) = E₀ sin(ωt - kx), the average of sin²(ωt) over a full cycle is 1/2.\n\nStep 3: Therefore, the time-averaged electric energy density is:\nu_E,avg = (1/2) × ε₀ × (E₀² / 2) = (1/4) × ε₀ × E₀².\n\nTherefore, Option (D) is the correct answer."
    }
  },
  {
    id: 3270,
    similarQuestion: {
      question: "The speed of propagation of all electromagnetic waves in vacuum (from high-energy gamma rays to long radio waves):",
      option_a: "Increases continuously with increasing wavelength",
      option_b: "Decreases continuously with increasing wavelength",
      option_c: "Is strictly constant and identical for all wavelengths (c ≈ 3 × 10⁸ m/s)",
      option_d: "Depends directly on the temperature of the source",
      correct_option: "C",
      explanation: "Step 1: In vacuum (free space), the speed of any electromagnetic wave is determined purely by universal electromagnetic constants:\nc = 1 / √(μ₀ × ε₀) ≈ 3.0 × 10⁸ m/s\n\nStep 2: It is completely independent of frequency, wavelength, intensity, or source properties.\n\nStep 3: Hence, gamma rays, X-rays, light, and radio waves all travel at the exact same speed in vacuum.\n\nTherefore, Option (C) is the correct answer."
    }
  },
  {
    id: 3271,
    similarQuestion: {
      question: "Which of the following components of the electromagnetic spectrum has the shortest wavelength (highest photon energy)?",
      option_a: "X-rays",
      option_b: "Ultraviolet rays",
      option_c: "Gamma (γ) rays",
      option_d: "Infrared rays",
      correct_option: "C",
      explanation: "Step 1: In the electromagnetic spectrum, photon energy and frequency are inversely proportional to wavelength (E = h c / λ).\n\nStep 2: The sequence of wavelengths in increasing order is:\nGamma rays (< 10⁻¹² m) < X-rays (10⁻¹⁰ m) < Ultraviolet (10⁻⁸ m) < Visible < Infrared < Microwaves < Radio waves.\n\nStep 3: Therefore, gamma rays have the shortest wavelength among all listed radiations.\n\nTherefore, Option (C) is the correct answer."
    }
  },
  {
    id: 3272,
    similarQuestion: {
      question: "Which portion of the solar electromagnetic spectrum is primarily trapped by atmospheric greenhouse gases, causing the greenhouse effect?",
      option_a: "Ultraviolet radiation",
      option_b: "Infrared radiation",
      option_c: "X-ray radiation",
      option_d: "Gamma radiation",
      correct_option: "B",
      explanation: "Step 1: The Earth's surface absorbs short-wavelength solar radiation and re-radiates energy back into space as longer-wavelength thermal radiation.\n\nStep 2: This thermal radiation lies predominantly in the infrared region of the electromagnetic spectrum.\n\nStep 3: Atmospheric greenhouse gases (CO₂, H₂O vapor, methane) strongly absorb this infrared radiation, preventing it from escaping and warming the lower atmosphere.\n\nTherefore, Option (B) is the correct answer."
    }
  },
  {
    id: 3273,
    similarQuestion: {
      question: "For a plane electromagnetic wave travelling in vacuum, the peak amplitude of the electric field is E₀ = 60 V/m. The peak amplitude of the associated magnetic field B₀ is:",
      option_a: "2.0 × 10⁻⁷ T",
      option_b: "1.8 × 10¹⁰ T",
      option_c: "5.0 × 10⁻⁹ T",
      option_d: "3.0 × 10⁻⁶ T",
      correct_option: "A",
      explanation: "Step 1: The ratio of the electric field amplitude to the magnetic field amplitude in an electromagnetic wave in free space equals the speed of light:\nE₀ / B₀ = c\n\nStep 2: Solve for B₀:\nB₀ = E₀ / c\n\nStep 3: Substitute E₀ = 60 V/m and c = 3.0 × 10⁸ m/s:\nB₀ = (60 V/m) / (3.0 × 10⁸ m/s) = 2.0 × 10⁻⁷ T.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 3274,
    similarQuestion: {
      question: "Let E_UV, E_micro, and E_radio denote the photon energies of Ultraviolet rays, Microwaves, and Radio waves respectively. Which of the following relationships is correct?",
      option_a: "E_UV < E_micro < E_radio",
      option_b: "E_UV > E_micro > E_radio",
      option_c: "E_micro > E_UV > E_radio",
      option_d: "E_radio > E_micro > E_UV",
      correct_option: "B",
      explanation: "Step 1: The quantum energy of an electromagnetic photon is E = h f = h c / λ.\n\nStep 2: Shorter wavelengths correspond to higher frequencies and greater photon energies.\n\nStep 3: Comparing wavelengths: λ_UV < λ_micro < λ_radio.\nTherefore, the photon energies follow: E_UV > E_micro > E_radio.\n\nTherefore, Option (B) is the correct answer."
    }
  },
  {
    id: 3275,
    similarQuestion: {
      question: "The magnetic field component of a plane electromagnetic wave in vacuum is given by B(x, t) = B₀ sin(2 × 10⁴ x - ω t) (in SI units). The wavelength λ of the wave is:",
      option_a: "6.28 mm",
      option_b: "3.14 mm",
      option_c: "0.314 mm",
      option_d: "1.57 mm",
      correct_option: "C",
      explanation: "Step 1: Compare B(x, t) = B₀ sin(k x - ω t) with the given wave equation to find the propagation wave number k:\nk = 2 × 10⁴ m⁻¹\n\nStep 2: The wavelength λ is related to wave number k by:\nλ = 2π / k\n\nStep 3: Substitute k = 2 × 10⁴ m⁻¹:\nλ = (2 × 3.1416) / (2 × 10⁴) = 3.1416 × 10⁻⁴ m = 0.314 mm.\n\nTherefore, Option (C) is the correct answer."
    }
  },
  {
    id: 3276,
    similarQuestion: {
      question: "The intensity of a parallel beam of monochromatic light in vacuum is 2.5 W/m². The peak amplitude of the electric field E₀ in the beam is approximately: (Take ε₀ = 8.85 × 10⁻¹² C²/N·m², c = 3.0 × 10⁸ m/s)",
      option_a: "30.2 V/m",
      option_b: "43.4 V/m",
      option_c: "61.4 V/m",
      option_d: "50.0 V/m",
      correct_option: "B",
      explanation: "Step 1: The intensity I of an electromagnetic wave in free space is given by:\nI = (1/2) × ε₀ × c × E₀²\n\nStep 2: Solve for E₀:\nE₀ = √[(2 I) / (ε₀ × c)]\n\nStep 3: Compute the product ε₀ × c:\nε₀ × c = (8.85 × 10⁻¹²) × (3.0 × 10⁸) = 2.655 × 10⁻³ A/V\n\nStep 4: Calculate E₀:\nE₀ = √[(2 × 2.5) / (2.655 × 10⁻³)] = √[5.0 / (2.655 × 10⁻³)] = √1883 ≈ 43.4 V/m.\n\nTherefore, Option (B) is the correct answer."
    }
  },
  {
    id: 3277,
    similarQuestion: {
      question: "According to Maxwell's electromagnetic theory, a time-varying electric field generates:",
      option_a: "An electrostatic field",
      option_b: "A mechanical pressure gradient",
      option_c: "A magnetic field",
      option_d: "Electric charge monopoles",
      correct_option: "C",
      explanation: "Step 1: Maxwell showed that a changing electric flux through a surface gives rise to a displacement current I_d = ε₀ (dΦ_E / dt).\n\nStep 2: By the Ampere-Maxwell law: ∮ B⃗ · dl⃗ = μ₀ (I_c + ε₀ dΦ_E / dt).\n\nStep 3: This demonstrates that a changing electric field produces an induced magnetic field in surrounding space, completing electromagnetic symmetry with Faraday's law.\n\nTherefore, Option (C) is the correct answer."
    }
  },
  {
    id: 3278,
    similarQuestion: {
      question: "If c is the speed of light in vacuum, the speed of an electromagnetic wave in a non-magnetic medium (μ_r = 1) of dielectric constant K is:",
      option_a: "c × √K",
      option_b: "c / K",
      option_c: "c / √K",
      option_d: "c × K",
      correct_option: "C",
      explanation: "Step 1: The speed of light in a medium is v = 1 / √(μ × ε).\n\nStep 2: For a non-magnetic medium, μ = μ₀ and ε = K × ε₀:\nv = 1 / √(μ₀ × K ε₀) = [1 / √(μ₀ ε₀)] × (1 / √K) = c / √K.\n\nTherefore, Option (C) is the correct answer."
    }
  },
  {
    id: 3279,
    similarQuestion: {
      question: "According to Maxwell's equations, the speed of light in a material medium of magnetic permeability μ and electric permittivity ε is given by:",
      option_a: "1 / √(μ₀ ε₀)",
      option_b: "1 / √(μ ε)",
      option_c: "√(μ / ε)",
      option_d: "√(ε / μ)",
      correct_option: "B",
      explanation: "Step 1: From Maxwell's wave equation for electromagnetic waves propagating in a homogeneous, isotropic medium:\n∇² E⃗ = μ ε (∂² E⃗ / ∂t²)\n\nStep 2: Comparing with the standard three-dimensional wave equation ∇² E⃗ = (1 / v²) (∂² E⃗ / ∂t²), we identify:\n1 / v² = μ ε => v = 1 / √(μ ε).\n\nTherefore, Option (B) is the correct answer."
    }
  },
  {
    id: 3280,
    similarQuestion: {
      question: "In a plane propagating electromagnetic wave travelling in free space:",
      option_a: "Only an electric field vector exists",
      option_b: "Only a magnetic field vector exists",
      option_c: "Electric and magnetic field vectors oscillate mutually perpendicular to each other and perpendicular to the direction of wave propagation",
      option_d: "Electric and magnetic field vectors are parallel to the direction of propagation",
      correct_option: "C",
      explanation: "Step 1: Electromagnetic waves are purely transverse waves.\n\nStep 2: The electric field E⃗ and magnetic field B⃗ oscillate in phase, perpendicular to one another.\n\nStep 3: The direction of energy propagation is given by the Poynting vector S⃗ ∝ E⃗ × B⃗, which is perpendicular to both E⃗ and B⃗.\n\nTherefore, Option (C) is the correct answer."
    }
  },
  {
    id: 3281,
    similarQuestion: {
      question: "A beam of electromagnetic radiation carrying total energy E is incident normally on a perfectly reflecting mirror. The total momentum transferred to the mirror is:",
      option_a: "E / c",
      option_b: "2 E / c",
      option_c: "E × c",
      option_d: "E / c²",
      correct_option: "B",
      explanation: "Step 1: The linear momentum of an electromagnetic radiation packet of energy E is p = E / c.\n\nStep 2: Initial momentum incident on the surface: p_initial = +E / c.\nFor a perfectly reflecting surface, the radiation is reversed with equal magnitude: p_final = -E / c.\n\nStep 3: The change in momentum transferred to the surface is:\nΔp = p_initial - p_final = (E / c) - (-E / c) = 2 E / c.\n\nTherefore, Option (B) is the correct answer."
    }
  },
  {
    id: 3282,
    similarQuestion: {
      question: "An isotropic point source of electromagnetic radiation radiates uniformly in all directions with an average power output of 500 W. The intensity of radiation at a distance of 5.0 m from the source is approximately:",
      option_a: "3.18 W/m²",
      option_b: "5.00 W/m²",
      option_c: "0.80 W/m²",
      option_d: "1.59 W/m²",
      correct_option: "D",
      explanation: "Step 1: An isotropic point source distributes its power uniformly over the surface of a concentric sphere of radius r.\n\nStep 2: The intensity I at distance r is given by the inverse-square law:\nI = P / (4π r²)\n\nStep 3: Substitute P = 500 W and r = 5.0 m:\nI = 500 W / [4π × (5.0 m)²] = 500 / (100π) = 5 / π ≈ 5 / 3.1416 ≈ 1.59 W/m².\n\nTherefore, Option (D) is the correct answer."
    }
  },
  {
    id: 3283,
    similarQuestion: {
      question: "The electric field of a plane electromagnetic wave in vacuum is represented by E_z(x, t) = E₀ cos(2π × 10¹⁴ (t - x/c)), with E_x = 0 and E_y = 0. The direction of propagation of this electromagnetic wave is:",
      option_a: "Along the +y-direction",
      option_b: "Along the +z-direction",
      option_c: "Along the +x-direction",
      option_d: "Along the -x-direction",
      correct_option: "C",
      explanation: "Step 1: A one-dimensional travelling wave function has the general form f(t - x/v) for propagation in the positive x-direction.\n\nStep 2: Here the argument of the cosine is ω (t - x/c) = ω t - k x.\n\nStep 3: The negative sign between t and x/c indicates that the wave is propagating in the forward direction along the +x-axis.\n\nTherefore, Option (C) is the correct answer."
    }
  },
  {
    id: 3284,
    similarQuestion: {
      question: "A plane electromagnetic wave travels in free space along the +z-direction. If at a given instant the electric field vector E⃗ is oriented along the +x-direction, the magnetic field vector B⃗ at that instant is oriented along the:",
      option_a: "-x-direction",
      option_b: "-y-direction",
      option_c: "+y-direction",
      option_d: "+z-direction",
      correct_option: "C",
      explanation: "Step 1: The direction of wave propagation is given by the unit vector along the Poynting vector S⃗ ∝ E⃗ × B⃗.\n\nStep 2: Propagation is along the +z-direction (k̂), and the electric field E⃗ is along the +x-direction (î):\nî × B̂ = k̂\n\nStep 3: From vector cross products of Cartesian unit vectors:\nî × ĵ = k̂\nTherefore, the unit vector along B⃗ must be +ĵ, which corresponds to the +y-direction.\n\nTherefore, Option (C) is the correct answer."
    }
  },
  {
    id: 3285,
    similarQuestion: {
      question: "A parallel beam of electromagnetic radiation of intensity 1.2 W/m² falls normally on a completely absorbing surface. The radiation pressure exerted on the surface is:",
      option_a: "4.0 × 10⁻⁹ N/m²",
      option_b: "8.0 × 10⁻⁹ N/m²",
      option_c: "2.4 × 10⁻⁸ N/m²",
      option_d: "1.2 × 10⁻⁹ N/m²",
      correct_option: "A",
      explanation: "Step 1: The radiation pressure P exerted by an electromagnetic wave of intensity I on a perfectly absorbing surface at normal incidence is:\nP = I / c\n\nStep 2: Substitute I = 1.2 W/m² and c = 3.0 × 10⁸ m/s:\nP = (1.2 W/m²) / (3.0 × 10⁸ m/s) = 4.0 × 10⁻⁹ N/m².\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 3286,
    similarQuestion: {
      question: "A parallel-plate capacitor of capacitance C = 2.0 μF is connected across a power supply such that the potential difference across its plates increases at a rate of 100 V/s. The displacement current flowing between the plates of the capacitor is:",
      option_a: "50 μA",
      option_b: "100 μA",
      option_c: "200 μA",
      option_d: "20 μA",
      correct_option: "C",
      explanation: "Step 1: The displacement current I_d is defined by I_d = ε₀ (dΦ_E / dt).\nFor a parallel plate capacitor, Φ_E = E × A = (V / d) × A = V × (A / d).\n\nStep 2: Thus, I_d = ε₀ (A / d) × (dV / dt) = C × (dV / dt).\n\nStep 3: Substitute C = 2.0 μF = 2.0 × 10⁻⁶ F and dV/dt = 100 V/s:\nI_d = (2.0 × 10⁻⁶ F) × (100 V/s) = 2.0 × 10⁻⁴ A = 200 μA.\n\nTherefore, Option (C) is the correct answer."
    }
  },
  {
    id: 3287,
    similarQuestion: {
      question: "To establish an instantaneous displacement current of 0.5 A across the plates of a 5.0 μF capacitor, the potential difference across the plates must change at a rate of:",
      option_a: "2.5 × 10⁵ V/s",
      option_b: "1.0 × 10⁵ V/s",
      option_c: "1.0 × 10⁶ V/s",
      option_d: "5.0 × 10⁴ V/s",
      correct_option: "B",
      explanation: "Step 1: The displacement current in a capacitor of capacitance C is:\nI_d = C × (dV / dt)\n\nStep 2: Solve for the rate of change of potential difference (dV / dt):\ndV / dt = I_d / C\n\nStep 3: Substitute I_d = 0.5 A and C = 5.0 μF = 5.0 × 10⁻⁶ F:\ndV / dt = 0.5 A / (5.0 × 10⁻⁶ F) = 0.1 × 10⁶ V/s = 1.0 × 10⁵ V/s.\n\nTherefore, Option (B) is the correct answer."
    }
  },
  {
    id: 3288,
    similarQuestion: {
      question: "If ε₀ and μ₀ are the electric permittivity and magnetic permeability of vacuum, and ε and μ are those of a material medium, the refractive index n of the medium is given by:",
      option_a: "(ε μ) / (ε₀ μ₀)",
      option_b: "√[(ε μ) / (ε₀ μ₀)]",
      option_c: "√[(ε₀ μ₀) / (ε μ)]",
      option_d: "(ε₀ μ₀) / (ε μ)",
      correct_option: "B",
      explanation: "Step 1: By definition, the refractive index of a medium is n = c / v, where c is the speed of light in vacuum and v is the speed of light in the medium.\n\nStep 2: From Maxwell's relations: c = 1 / √(ε₀ μ₀) and v = 1 / √(ε μ).\n\nStep 3: Taking their ratio:\nn = c / v = [1 / √(ε₀ μ₀)] / [1 / √(ε μ)] = √[(ε μ) / (ε₀ μ₀)].\n\nTherefore, Option (B) is the correct answer."
    }
  },
  {
    id: 3289,
    similarQuestion: {
      question: "Which of the following physical quantities is strictly identical for all electromagnetic waves (from gamma rays to radio waves) propagating in free space?",
      option_a: "Photon energy",
      option_b: "Speed of propagation",
      option_c: "Wavelength",
      option_d: "Frequency",
      correct_option: "B",
      explanation: "Step 1: In vacuum, all electromagnetic waves travel at the universal invariant speed of light:\nc = 299,792,458 m/s ≈ 3.0 × 10⁸ m/s.\n\nStep 2: Their frequencies, wavelengths, and individual photon energies vary over vast orders of magnitude across the spectrum, but their speed in vacuum is strictly identical.\n\nTherefore, Option (B) is the correct answer."
    }
  },
  {
    id: 3290,
    similarQuestion: {
      question: "Which of the following statements correctly compares the wavelengths of different regions of the electromagnetic spectrum?",
      option_a: "Microwaves have shorter wavelengths than Ultraviolet rays",
      option_b: "Infrared rays have shorter wavelengths than X-rays",
      option_c: "Gamma rays have longer wavelengths than Radio waves",
      option_d: "Radio waves have longer wavelengths than Infrared rays, and Gamma rays have the shortest wavelengths",
      correct_option: "D",
      explanation: "Step 1: The electromagnetic spectrum in order of increasing wavelength is:\nGamma rays < X-rays < Ultraviolet < Visible light < Infrared < Microwaves < Radio waves.\n\nStep 2: Gamma rays possess the shortest wavelength and highest frequency.\nRadio waves possess the longest wavelength and lowest frequency.\n\nTherefore, Option (D) is the correct answer."
    }
  },
  {
    id: 3291,
    similarQuestion: {
      question: "In a plane electromagnetic wave propagating in free space, the peak amplitudes of the electric field and magnetic intensity are E₀ = 120 V/m and H₀ = 0.318 A/m respectively. The maximum instantaneous rate of energy flow per unit area (Poynting vector magnitude S_max) is:",
      option_a: "38.16 W/m²",
      option_b: "19.08 W/m²",
      option_c: "76.32 W/m²",
      option_d: "12.00 W/m²",
      correct_option: "A",
      explanation: "Step 1: The Poynting vector represents the instantaneous directional energy flux per unit area:\nS⃗ = E⃗ × H⃗\n\nStep 2: The maximum magnitude of the Poynting vector occurs when E and H are at their peaks:\nS_max = E₀ × H₀\n\nStep 3: Substitute E₀ = 120 V/m and H₀ = 0.318 A/m:\nS_max = 120 V/m × 0.318 A/m = 38.16 W/m².\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 3292,
    similarQuestion: {
      question: "Which of the following electromagnetic radiations has the longest wavelength in the complete electromagnetic spectrum?",
      option_a: "Infrared radiation",
      option_b: "Visible light",
      option_c: "Radio waves",
      option_d: "Ultraviolet waves",
      correct_option: "C",
      explanation: "Step 1: The electromagnetic spectrum spans wavelengths from below 10⁻¹² m (gamma rays) up to thousands of kilometres.\n\nStep 2: Radio waves occupy the region with the longest wavelengths (from 1 mm to > 100 km) and correspondingly the lowest frequencies.\n\nTherefore, Option (C) is the correct answer."
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
    console.log('Login successful for Set 58.');

    for (let i = 0; i < questions.length; i++) {
      const q = questions[i];
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
      console.log(`Updated question ${i + 1}/${questions.length} (ID: ${q.id})`);
    }
    console.log('Set 58 completed successfully!');
  } catch (err) {
    console.error('Error updating Set 58:', err.message);
  }
}

run();
