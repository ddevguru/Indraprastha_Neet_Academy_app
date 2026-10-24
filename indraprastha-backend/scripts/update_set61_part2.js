// scripts/update_set61_part2.js
// Update Set 61 (Dual Nature & Atoms) Part 2: Q23 to Q43 (IDs 592 to 612)

const questions = [
  {
    id: 592,
    similarQuestion: {
      question: "Consider the transition from n = 3 to n = 1 in hydrogen (H, Z = 1), singly ionized helium (He⁺, Z = 2), and doubly ionized lithium (Li²⁺, Z = 3). If the emitted wavelengths are λ_H, λ_He, and λ_Li, respectively, which of the following relations holds true?",
      option_a: "λ_H = 4 λ_He = 9 λ_Li",
      option_b: "9 λ_H = 4 λ_He = λ_Li",
      option_c: "λ_H = 2 λ_He = 3 λ_Li",
      option_d: "3 λ_H = 2 λ_He = λ_Li",
      correct_option: "A",
      explanation: "Step 1: The Rydberg formula for a single-electron ion of atomic number Z is:\n1 / λ = R Z² (1 / n₁² - 1 / n₂²).\nStep 2: For fixed initial and final states n₁ and n₂, the emitted wavelength varies inversely with Z²:\nλ ∝ 1 / Z² ⇒ λ × Z² = constant.\nStep 3: For H (Z = 1): λ_H × 1² = λ_H.\nFor He⁺ (Z = 2): λ_He × 2² = 4 λ_He.\nFor Li²⁺ (Z = 3): λ_Li × 3² = 9 λ_Li.\nEquating these:\nλ_H = 4 λ_He = 9 λ_Li.\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 593,
    similarQuestion: {
      question: "An α-particle of kinetic energy 800 keV is directed head-on towards a gold nucleus (Z = 79). What is the distance of closest approach of the α-particle to the gold nucleus? (1 / 4πε₀ = 9 × 10⁹ N·m²/C², e = 1.6 × 10⁻¹⁹ C)",
      option_a: "0.284 pm",
      option_b: "2.84 pm",
      option_c: "28.4 pm",
      option_d: "0.0284 pm",
      correct_option: "A",
      explanation: "Step 1: At closest approach, the initial kinetic energy of the α-particle is entirely converted into electrostatic potential energy:\nE_k = (1 / 4πε₀) × (q₁ q₂ / r_min).\nStep 2: Here q₁ = 2e (α-particle), q₂ = 79e (gold nucleus), and E_k = 800 keV = 800 × 10³ × 1.6 × 10⁻¹⁹ J:\nr_min = (9 × 10⁹ × 2 × 79 × (1.6 × 10⁻¹⁹)²) / (8 × 10⁵ × 1.6 × 10⁻¹⁹).\nStep 3: Simplifying:\nr_min = (9 × 10⁹ × 158 × 1.6 × 10⁻¹⁹) / (8 × 10⁵)\nr_min = (2275.2 × 10⁻¹⁰) / (8 × 10⁵) = 284.4 × 10⁻¹⁵ m = 0.2844 pm.\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 594,
    similarQuestion: {
      question: "In a hypothetical atom, the potential between the electron and the nucleus is given by V(r) = C r, where C is a positive constant. Applying Bohr's quantization condition, how does the orbital radius rₙ depend on the principal quantum number n?",
      option_a: "rₙ ∝ n^(2/3)",
      option_b: "rₙ ∝ n",
      option_c: "rₙ ∝ n²",
      option_d: "rₙ ∝ n^(1/2)",
      correct_option: "A",
      explanation: "Step 1: The attractive central force is F = -e (dV / dr) = e C.\nStep 2: Equating centripetal force to the attractive force:\nm v² / r = e C ⇒ v = √(e C r / m).\nStep 3: Bohr's quantization condition states that:\nm v r = n ℏ ⇒ m √(e C r / m) × r = n ℏ\n√(m e C) × r^(3/2) = n ℏ.\nStep 4: Solving for r:\nr^(3/2) ∝ n ⇒ rₙ ∝ n^(2/3).\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 595,
    similarQuestion: {
      question: "Two electrons in an atom revolve around the nucleus in circular orbits of radii R and 9R, respectively. What is the ratio of their orbital time periods (T₁ : T₂)?",
      option_a: "1 : 27",
      option_b: "27 : 1",
      option_c: "1 : 3",
      option_d: "1 : 9",
      correct_option: "A",
      explanation: "Step 1: The orbital period of an electron in a circular orbit of radius r is:\nT = 2πr / v.\nStep 2: From Coulomb attraction, m v² / r = k Z e² / r² ⇒ v ∝ 1 / √r.\nStep 3: Substituting v into the period expression:\nT ∝ r / (1 / √r) = r^(3/2).\nStep 4: Taking the ratio for radii R and 9R:\nT₁ / T₂ = (R / 9R)^(3/2) = (1 / 9)^(3/2) = (1 / 3)³ = 1 / 27 = 1 : 27.\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 596,
    similarQuestion: {
      question: "A hydrogen atom (mass = 1.67 × 10⁻²⁷ kg) initially moving at 2 m/s comes to a complete rest after absorbing a photon head-on. What is the wavelength of the absorbed photon? (h = 6.63 × 10⁻³⁴ J·s)",
      option_a: "2000 Å",
      option_b: "1000 Å",
      option_c: "4000 Å",
      option_d: "500 Å",
      correct_option: "A",
      explanation: "Step 1: By conservation of linear momentum, the momentum of the absorbed photon must equal the initial momentum of the hydrogen atom:\np_photon = m_H × v.\nStep 2: Substitute m_H = 1.67 × 10⁻²⁷ kg and v = 2 m/s:\np_photon = 1.67 × 10⁻²⁷ × 2 = 3.34 × 10⁻²⁷ kg·m/s.\nStep 3: The photon wavelength is given by de Broglie relation:\nλ = h / p_photon = (6.63 × 10⁻³⁴ J·s) / (3.34 × 10⁻²⁷ kg·m/s)\nλ ≈ 1.985 × 10⁻⁷ m ≈ 2000 Å.\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 597,
    similarQuestion: {
      question: "Suppose the potential energy between an electron and a proton at distance r varies as U(r) = -C / r⁴, where C is a positive constant. Applying Bohr's model, how does the radius of the n-th orbit depend on the principal quantum number n?",
      option_a: "rₙ ∝ n⁻¹",
      option_b: "rₙ ∝ n²",
      option_c: "rₙ ∝ n",
      option_d: "rₙ ∝ n⁻²",
      correct_option: "A",
      explanation: "Step 1: The central force is F = -dU / dr = -4C / r⁵.\nStep 2: Equating centripetal force to the central force:\nm v² / r = 4C / r⁵ ⇒ v² = 4C / (m r⁴) ⇒ v = 2√(C / m) / r².\nStep 3: Apply Bohr's angular momentum quantization:\nm v r = n ℏ ⇒ m × [2√(C / m) / r²] × r = n ℏ\n2√(m C) / r = n ℏ.\nStep 4: Solving for r:\nr = 2√(m C) / (n ℏ) ∝ 1 / n = n⁻¹.\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 598,
    similarQuestion: {
      question: "The total energy of an electron in a particular stationary state of a hydrogen atom is -1.51 eV. What are its kinetic energy and potential energy in this state?",
      option_a: "KE = +1.51 eV, PE = -3.02 eV",
      option_b: "KE = -1.51 eV, PE = +3.02 eV",
      option_c: "KE = +3.02 eV, PE = -1.51 eV",
      option_d: "KE = +1.51 eV, PE = -1.51 eV",
      correct_option: "A",
      explanation: "Step 1: By the virial theorem for a 1/r potential, the kinetic energy (KE), potential energy (PE), and total energy (TE) are related by:\nKE = -TE\nPE = 2 × TE.\nStep 2: Given TE = -1.51 eV:\nKE = -(-1.51 eV) = +1.51 eV.\nPE = 2 × (-1.51 eV) = -3.02 eV.\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 599,
    similarQuestion: {
      question: "X-rays were discovered in 1895 by which Nobel laureate physicist?",
      option_a: "Wilhelm Conrad Röntgen",
      option_b: "Henri Becquerel",
      option_c: "Ernest Rutherford",
      option_d: "J. J. Thomson",
      correct_option: "A",
      explanation: "Step 1: Wilhelm Conrad Röntgen discovered X-rays in 1895 while experimenting with cathode ray discharge tubes.\nStep 2: He was awarded the very first Nobel Prize in Physics in 1901 for this ground-breaking discovery.\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 600,
    similarQuestion: {
      question: "An X-ray tube operates at an accelerating potential difference of 50 kV. Which of the following wavelengths will be absent from the continuous X-ray spectrum emitted by the tube?",
      option_a: "0.20 Å",
      option_b: "0.30 Å",
      option_c: "0.45 Å",
      option_d: "0.60 Å",
      correct_option: "A",
      explanation: "Step 1: The Duane-Hunt law gives the minimum (cutoff) wavelength in the continuous X-ray spectrum:\nλ_min = hc / (e V) ≈ 12400 / V (in Å, with V in volts).\nStep 2: For V = 50 kV = 50,000 V:\nλ_min = 12400 / 50000 = 0.248 Å.\nStep 3: Photons cannot be emitted with wavelength shorter than λ_min. Since 0.20 Å < 0.248 Å, radiation of 0.20 Å cannot be produced and is completely absent.\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 601,
    similarQuestion: {
      question: "What is the momentum of an X-ray photon having a wavelength of 0.020 Å (2.0 × 10⁻¹² m)? (h = 6.626 × 10⁻³⁴ J·s)",
      option_a: "3.313 × 10⁻²² kg·m/s",
      option_b: "6.626 × 10⁻²² kg·m/s",
      option_c: "1.325 × 10⁻²¹ kg·m/s",
      option_d: "3.313 × 10⁻²⁴ kg·m/s",
      correct_option: "A",
      explanation: "Step 1: The de Broglie relation for photon momentum is:\np = h / λ.\nStep 2: Substitute h = 6.626 × 10⁻³⁴ J·s and λ = 0.020 Å = 2.0 × 10⁻¹² m:\np = (6.626 × 10⁻³⁴ J·s) / (2.0 × 10⁻¹² m) = 3.313 × 10⁻²² kg·m/s.\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 602,
    similarQuestion: {
      question: "An X-ray beam passes through a region of uniform magnetic and electric fields simultaneously. The path of the X-ray beam will:",
      option_a: "Remain completely undeflected",
      option_b: "Deflect towards the positive plate",
      option_c: "Bend into a circular arc",
      option_d: "Deflect towards the north magnetic pole",
      correct_option: "A",
      explanation: "Step 1: X-rays are electromagnetic waves composed of uncharged photons.\nStep 2: The Lorentz force acting on a particle of charge q in electric field E and magnetic field B is F = q(E + v × B).\nStep 3: Since photons have zero electric charge (q = 0), they experience zero electromagnetic force and pass through both electric and magnetic fields completely undeflected.\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 603,
    similarQuestion: {
      question: "X-ray diffraction is an essential technique for determining the crystal structure of solids primarily because:",
      option_a: "The wavelength of X-rays is of the same order of magnitude as interatomic spacing (~1 Å)",
      option_b: "X-rays ionize all atoms uniformly",
      option_c: "X-rays have the speed of sound in solids",
      option_d: "X-rays are completely absorbed by atomic nuclei",
      correct_option: "A",
      explanation: "Step 1: Observable diffraction requires that the wavelength of incident radiation be comparable to the spacing of the diffracting obstacles or apertures (λ ≈ d).\nStep 2: Interatomic distances in crystalline lattices are typically 1 to a few angstroms (10⁻¹⁰ m).\nStep 3: Because X-rays have wavelengths in this exact range (~0.1 to 10 Å), the regular planes of crystal atoms act as a natural three-dimensional diffraction grating.\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 604,
    similarQuestion: {
      question: "Consider the following statements regarding X-ray production:\n(I) The characteristic X-ray frequencies depend on the atomic number of the target anode material.\n(II) The minimum cutoff wavelength of continuous X-rays is inversely proportional to the tube voltage.\nWhich of the statements is/are correct?",
      option_a: "Both (I) and (II) are correct",
      option_b: "Only (I) is correct",
      option_c: "Only (II) is correct",
      option_d: "Neither is correct",
      correct_option: "A",
      explanation: "Step 1: Characteristic X-rays are produced by transitions between inner atomic shells of the anode material, and according to Moseley's law (√ν = a(Z - b)), their frequencies depend uniquely on the atomic number Z of the target.\nStep 2: Continuous X-rays (bremsstrahlung) have a minimum cutoff wavelength given by the Duane-Hunt law: λ_min = hc / (e V), which is inversely proportional to accelerating voltage V.\nStep 3: Hence, both statements (I) and (II) are scientifically correct.\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 605,
    similarQuestion: {
      question: "If the accelerating voltage applied across an X-ray tube is increased while keeping the filament current constant, what happens to the total intensity (number of photons per second) and the cutoff wavelength λ_min of the emitted X-rays?",
      option_a: "Total intensity is determined primarily by filament current while cutoff wavelength decreases",
      option_b: "Cutoff wavelength increases",
      option_c: "Total intensity drops to zero",
      option_d: "Both intensity and cutoff wavelength remain completely unchanged",
      correct_option: "A",
      explanation: "Step 1: The intensity of X-rays (rate of photon emission) depends primarily on the tube current, which is controlled by the filament heating current (electron emission rate).\nStep 2: Increasing the accelerating voltage increases the kinetic energy of each bombarding electron, which decreases the cutoff wavelength: λ_min = hc / (e V).\nStep 3: Thus, cutoff wavelength decreases while photon production rate remains governed by filament current.\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 606,
    similarQuestion: {
      question: "A stationary hydrogen atom in its ground state absorbs a photon of energy 10.2 eV and undergoes excitation. Shortly thereafter, the excited atom absorbs a second photon of energy 14.0 eV. What particles will be observed emerging from the atom?",
      option_a: "A de-excitation photon of 10.2 eV and a photoelectron of kinetic energy 0.4 eV",
      option_b: "Two photons of 10.2 eV",
      option_c: "An electron of kinetic energy 14.0 eV",
      option_d: "Two electrons of energy 10.2 eV",
      correct_option: "A",
      explanation: "Step 1: The energy difference between n = 1 and n = 2 in hydrogen is ΔE = -3.4 eV - (-13.6 eV) = 10.2 eV. Absorption of a 10.2 eV photon excites the electron to n = 2, from which spontaneous de-excitation emits a 10.2 eV photon.\nStep 2: The second photon has an energy of 14.0 eV, which exceeds the ground state ionization potential (13.6 eV).\nStep 3: Photoionization occurs, ejecting the electron with kinetic energy KE = 14.0 eV - 13.6 eV = 0.4 eV.\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 607,
    similarQuestion: {
      question: "Which graph correctly represents the relationship between the minimum cutoff wavelength (λ_min) of continuous X-rays and the accelerating potential (V) across an X-ray tube?",
      option_a: "Rectangular hyperbola (λ_min ∝ 1/V)",
      option_b: "Straight line through origin",
      option_c: "Parabola opening upwards",
      option_d: "Horizontal straight line",
      correct_option: "A",
      explanation: "Step 1: The Duane-Hunt relation states that λ_min = hc / (e V).\nStep 2: This can be written as λ_min × V = constant.\nStep 3: A graph of λ_min versus V where their product is constant is a rectangular hyperbola.\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 608,
    similarQuestion: {
      question: "An electron in a hydrogen atom jumps from the n = 4 state to the ground state n = 1. The emitted photon is incident on a photosensitive metal of work function 4.75 eV. What is the stopping potential for the emitted photoelectrons?",
      option_a: "8.0 V",
      option_b: "12.75 V",
      option_c: "4.75 V",
      option_d: "6.25 V",
      correct_option: "A",
      explanation: "Step 1: The energy of the photon emitted in the n = 4 → n = 1 transition is:\nE = 13.6 (1 / 1² - 1 / 4²) = 13.6 × (15 / 16) = 12.75 eV.\nStep 2: By Einstein's photoelectric equation, the maximum kinetic energy of the photoelectrons is:\nKEₘₐₓ = E - Φ = 12.75 eV - 4.75 eV = 8.0 eV.\nStep 3: The stopping potential V₀ is given by e V₀ = KEₘₐₓ:\ne V₀ = 8.0 eV ⇒ V₀ = 8.0 V.\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 609,
    similarQuestion: {
      question: "If the energy difference between the second and third Bohr orbits of a hydrogen-like atom is ΔE, what is the ionization energy of that atom from its ground state?",
      option_a: "(36 / 5) ΔE",
      option_b: "(5 / 36) ΔE",
      option_c: "(9 / 4) ΔE",
      option_d: "(4 / 9) ΔE",
      correct_option: "A",
      explanation: "Step 1: The energy in the n-th orbit is Eₙ = -E_ion / n², where E_ion is the ionization energy.\nStep 2: The energy difference between n = 2 and n = 3 is:\nΔE = E₃ - E₂ = E_ion (1 / 2² - 1 / 3²) = E_ion (1 / 4 - 1 / 9) = (5 / 36) E_ion.\nStep 3: Rearranging for ionization energy:\nE_ion = (36 / 5) ΔE.\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 610,
    similarQuestion: {
      question: "Consider an electron in the first excited state (n = 2) of a hydrogen atom (H), singly ionized helium (He⁺), and doubly ionized lithium (Li²⁺). What is the relation between their orbital angular momenta L_H, L_He, and L_Li?",
      option_a: "L_H = L_He = L_Li",
      option_b: "L_H < L_He < L_Li",
      option_c: "L_H > L_He > L_Li",
      option_d: "L_Li = 3 L_H",
      correct_option: "A",
      explanation: "Step 1: In Bohr's atomic model, the orbital angular momentum of an electron in any stationary orbit is quantized as:\nL = n (h / 2π).\nStep 2: This value depends solely on the principal quantum number n and is completely independent of the nuclear charge Z.\nStep 3: Since all three species are in the n = 2 state:\nL_H = L_He = L_Li = 2(h / 2π) = h / π.\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 611,
    similarQuestion: {
      question: "For a hydrogen-like atom, let Aₙ be the area enclosed by the n-th circular Bohr orbit. A plot of ln(Aₙ / A₁) versus ln(n) is a straight line with slope equal to:",
      option_a: "4",
      option_b: "2",
      option_c: "1",
      option_d: "3",
      correct_option: "A",
      explanation: "Step 1: The radius of the n-th Bohr orbit is rₙ = r₁ n².\nStep 2: The area enclosed by the circular orbit is:\nAₙ = π rₙ² = π (r₁ n²)² = π r₁² n⁴ = A₁ n⁴.\nStep 3: Taking the natural logarithm of the ratio:\nln(Aₙ / A₁) = ln(n⁴) = 4 ln(n).\nStep 4: This is of the linear form y = m x with x = ln(n) and y = ln(Aₙ / A₁), giving a slope m = 4.\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 612,
    similarQuestion: {
      question: "If the potential energy of a hydrogen atom in its ground state (n = 1) is chosen to be zero as a reference, what will be the total energy of the atom in the second excited state (n = 3)?",
      option_a: "25.69 eV",
      option_b: "12.09 eV",
      option_c: "27.20 eV",
      option_d: "13.60 eV",
      correct_option: "A",
      explanation: "Step 1: In the standard convention (zero at infinity):\nGround state (n = 1): PE₁ = -27.2 eV, KE₁ = +13.6 eV, TE₁ = -13.6 eV.\nSecond excited state (n = 3): TE₃ = -13.6 / 3² = -1.51 eV.\nStep 2: To make ground state potential energy equal to zero, a constant shift of +27.2 eV is added to all potential and total energies:\nShift = +27.2 eV.\nStep 3: The new total energy in the n = 3 state is:\nTE₃' = TE₃ + 27.2 eV = -1.51 eV + 27.2 eV = 25.69 eV.\nTherefore, Option (A) is the correct answer."
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
  console.log("Login successful for Set 61 Part 2.");

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
  console.log("Set 61 Part 2 completed successfully!");
}

main().catch(console.error);
