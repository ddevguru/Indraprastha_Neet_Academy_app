// ch121_part1.js - Questions 0 to 29 (IDs 1378 down to 1349)
module.exports = [
  {
    id: 1378,
    originalQuestion: {
      question: "In the Davisson and Germer experiment, the velocity of electrons emitted from the electron gun can be increased by: [AIPMT 2011 Prelims]",
      option_a: "Increasing the potential difference between the anode and filament",
      option_b: "Increasing the filament current",
      option_c: "Decreasing the filament current",
      option_d: "Decreasing the potential difference between the anode and filament",
      correct_option: "A",
      explanation: "1. In an electron gun, electrons produced by thermionic emission from a heated tungsten filament are accelerated towards a cylindrical anode having a fine hole along its axis.\n2. The kinetic energy gained by an electron of charge e and mass m when accelerated through a potential difference V between the filament and the anode is:\nK = 1/2 m v² = e V\n3. Solving for the velocity v of the electrons:\nv = √(2 e V / m)\n4. From this relation, the velocity of the electrons is directly proportional to the square root of the accelerating potential difference (v ∝ √V).\n5. Therefore, the velocity can be increased by increasing the potential difference between the anode and the filament. (Filament current only alters the rate of thermionic emission and intensity of the beam, not the velocity).\n\nTherefore, Option (A) is the correct answer."
    },
    similarQuestion: {
      question: "In an electron microscope, the accelerating voltage is increased from 25 kV to 100 kV. By what factor does the de Broglie wavelength of the electrons change?",
      option_a: "Decreases by a factor of 2",
      option_b: "Increases by a factor of 2",
      option_c: "Decreases by a factor of 4",
      option_d: "Remains unchanged",
      correct_option: "A",
      explanation: "1. The de Broglie wavelength of an accelerated electron is given by λ = h / √(2 m e V) = 1.227 / √V nm.\n2. When V increases from 25 kV to 100 kV (4 times), √V increases by √4 = 2.\n3. Consequently, the de Broglie wavelength decreases by a factor of 2.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 1377,
    originalQuestion: {
      question: "The photoelectric threshold wavelength of silver is 3250 × 10⁻¹⁰ m. The velocity of the electron ejected from a silver surface by ultraviolet light of wavelength 2536 × 10⁻¹⁰ m is: Given h = 4.14 × 10⁻¹⁵ eV s and c = 3 × 10⁸ m s⁻¹. [NEET 2017]",
      option_a: "Approximately 0.6 × 10⁶ m s⁻¹",
      option_b: "Approximately 61 × 10³ m s⁻¹",
      option_c: "Approximately 0.3 × 10⁶ m s⁻¹",
      option_d: "Approximately 6 × 10⁵ m s⁻¹",
      correct_option: "D",
      explanation: "1. The work function of silver is:\nΦ = h c / λ₀\nGiven h c = (4.14 × 10⁻¹⁵ eV s) × (3 × 10⁸ m s⁻¹) = 1.242 × 10⁻⁶ eV m = 1242 eV nm = 12420 eV Å.\nλ₀ = 3250 Å  ⇒  Φ = 12420 / 3250 ≈ 3.82 eV.\n\n2. The energy of the incident photon is:\nE = h c / λ = 12420 / 2536 ≈ 4.897 eV.\n\n3. The maximum kinetic energy of the ejected photoelectrons is:\nK_max = E - Φ = 4.897 - 3.82 ≈ 1.077 eV.\nIn Joules: K_max = 1.077 × 1.6 × 10⁻¹⁹ J ≈ 1.723 × 10⁻¹⁹ J.\n\n4. Velocity of the fastest photoelectrons:\n1/2 m v² = K_max  ⇒  v = √(2 K_max / m)\nUsing electron mass m = 9.1 × 10⁻³¹ kg:\nv = √((2 × 1.723 × 10⁻¹⁹) / (9.1 × 10⁻³¹)) = √(3.787 × 10¹¹) ≈ 6.15 × 10⁵ m s⁻¹ ≈ 6 × 10⁵ m s⁻¹.\n\nTherefore, Option (D) is the correct answer."
    },
    similarQuestion: {
      question: "Light of wavelength 3000 Å falls on a metal surface with work function 2.14 eV. What is the maximum kinetic energy of the ejected photoelectrons? (Take hc = 12400 eV Å)",
      option_a: "1.99 eV",
      option_b: "4.13 eV",
      option_c: "0.55 eV",
      option_d: "3.20 eV",
      correct_option: "A",
      explanation: "1. Incident photon energy: E = hc / λ = 12400 / 3000 = 4.133 eV.\n2. Work function: Φ = 2.14 eV.\n3. Maximum kinetic energy: K_max = E - Φ = 4.133 - 2.14 = 1.993 eV ≈ 1.99 eV.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 1376,
    originalQuestion: {
      question: "Who evaluated the mass of the electron indirectly with the help of its charge? [AIPMT 2000]",
      option_a: "Thomson",
      option_b: "Millikan",
      option_c: "Rutherford",
      option_d: "Newton",
      correct_option: "A",
      explanation: "1. J. J. Thomson experimentally determined the specific charge (charge-to-mass ratio, e/m) of the cathode-ray particles (electrons) in 1897 using crossed electric and magnetic fields.\n2. Later, when the fundamental elementary charge e was measured in Millikan's oil drop experiment (and Thomson's earlier cloud chamber determinations), the mass of the electron m was calculated from the known e/m ratio: m = e / (e/m).\n3. In historical physics curricula, J. J. Thomson is credited with determining the mass of the electron indirectly through his e/m discovery.\n\nTherefore, Option (A) is the correct answer."
    },
    similarQuestion: {
      question: "The charge-to-mass ratio (e/m) of an electron was experimentally determined by:",
      option_a: "J. J. Thomson",
      option_b: "R. A. Millikan",
      option_c: "Ernest Rutherford",
      option_d: "James Chadwick",
      correct_option: "A",
      explanation: "1. J. J. Thomson used a discharge tube with perpendicular electric and magnetic fields to balance electric and magnetic forces.\n2. By measuring deflections, he obtained the specific charge e/m = 1.76 × 10¹¹ C kg⁻¹ for electrons.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 1375,
    originalQuestion: {
      question: "By the photoelectric effect, Einstein proved: [AIPMT 2000]",
      option_a: "E = hν",
      option_b: "K.E. = ½mv²",
      option_c: "E = mc²",
      option_d: "E = −Rhc²/n²",
      correct_option: "A",
      explanation: "1. Classical wave theory failed to explain the instantaneous emission of electrons and the existence of a threshold frequency in the photoelectric effect.\n2. In 1905, Albert Einstein extended Max Planck's quantum hypothesis to electromagnetic radiation, proposing that light propagates as discrete localized packets of energy called photons or quanta.\n3. The energy of each individual photon is directly proportional to the frequency of light: E = hν.\n4. By demonstrating that one incident photon collides with and transfers its entire energy hν to a single bound electron, Einstein proved the validity of E = hν and established the corpuscular (particle) nature of light.\n\nTherefore, Option (A) is the correct answer."
    },
    similarQuestion: {
      question: "Which equation represents Einstein's photoelectric equation describing the maximum kinetic energy of ejected photoelectrons?",
      option_a: "K_max = hν - Φ",
      option_b: "K_max = hν + Φ",
      option_c: "K_max = hν / Φ",
      option_d: "K_max = Φ - hν",
      correct_option: "A",
      explanation: "1. Energy conservation for a single photon-electron collision: hν = Φ + K_max.\n2. Rearranging gives Einstein's photoelectric equation: K_max = hν - Φ.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 1374,
    originalQuestion: {
      question: "A photocell is illuminated by a source of light placed at a distance d from the cell. If the distance becomes d/2, then the number of electrons emitted per second will: [AIPMT 2001]",
      option_a: "Remain the same",
      option_b: "Become four times",
      option_c: "Become two times",
      option_d: "Become one-fourth",
      correct_option: "B",
      explanation: "1. The intensity (I) of light emitted by a point source varies inversely with the square of the distance (d) from the source according to the inverse square law:\nI ∝ 1 / d²\n\n2. When the distance is reduced to d' = d / 2:\nI' / I = (d / d')² = (d / (d/2))² = 2² = 4.\nThe intensity of illumination on the photocell increases by a factor of 4.\n\n3. The number of photoelectrons emitted per second (photoelectric current) is directly proportional to the intensity of incident light:\nN ∝ I\n\n4. Therefore, the number of photoelectrons emitted per second becomes 4 times the initial value.\n\nTherefore, Option (B) is the correct answer."
    },
    similarQuestion: {
      question: "If the distance between a point light source and a photocathode is tripled (3d), the photoelectric saturation current will:",
      option_a: "Decrease to 1/9 of its original value",
      option_b: "Decrease to 1/3 of its original value",
      option_c: "Increase by 9 times",
      option_d: "Remain unaffected",
      correct_option: "A",
      explanation: "1. By the inverse square law, intensity I ∝ 1/r².\n2. When distance becomes 3d, intensity becomes 1/3² = 1/9 of its original value.\n3. Since saturation current is proportional to intensity, it decreases to 1/9 of its initial value.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 1373,
    originalQuestion: {
      question: "In a Thomson mass spectrograph, when E⃗ ⟂ B⃗, the velocity of the electron beam will be: [AIPMT 2001]",
      option_a: "E/B",
      option_b: "E⃗ × B⃗",
      option_c: "B/E",
      option_d: "E²/B²",
      correct_option: "A",
      explanation: "1. In crossed electric and magnetic fields (velocity selector), the electric field E⃗ and magnetic field B⃗ are mutually perpendicular and oriented perpendicular to the velocity v⃗ of the electron beam.\n2. The electrostatic force acting on an electron of charge e is:\nF_e = e E\n3. The magnetic Lorentz force acting on the electron is:\nF_b = e v B (since v⃗ ⟂ B⃗, sin 90° = 1)\n4. When the electric and magnetic forces are adjusted to be equal and opposite, the net force on the electrons is zero, allowing them to pass undeflected along a straight path:\nF_e = F_b  ⇒  e E = e v B\n5. Solving for velocity v:\nv = E / B.\n\nTherefore, Option (A) is the correct answer."
    },
    similarQuestion: {
      question: "An electron beam passes undeflected through crossed fields where E = 2.0 × 10⁴ V m⁻¹ and B = 0.5 T. The velocity of the electrons is:",
      option_a: "4.0 × 10⁴ m s⁻¹",
      option_b: "1.0 × 10⁴ m s⁻¹",
      option_c: "2.5 × 10⁴ m s⁻¹",
      option_d: "8.0 × 10⁴ m s⁻¹",
      correct_option: "A",
      explanation: "1. In a velocity selector, v = E / B.\n2. v = (2.0 × 10⁴ V m⁻¹) / (0.5 T) = 4.0 × 10⁴ m s⁻¹.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 1372,
    originalQuestion: {
      question: "Which one among the following shows the particle nature of light? [AIPMT 2001]",
      option_a: "Photoelectric effect",
      option_b: "Interference",
      option_c: "Refraction",
      option_d: "Polarization",
      correct_option: "A",
      explanation: "1. Optical phenomena such as interference, diffraction, and polarization are successfully explained only by treating light as a continuous electromagnetic wave.\n2. In contrast, the photoelectric effect involves instantaneous localized collisions between a single light quantum (photon) and an individual electron, transferring energy and momentum in discrete packets.\n3. The existence of a threshold frequency, the lack of time lag, and the linear dependence of kinetic energy on frequency directly demonstrate that light behaves as localized corpuscular particles (photons).\n4. Therefore, the photoelectric effect exhibits the particle nature of light.\n\nTherefore, Option (A) is the correct answer."
    },
    similarQuestion: {
      question: "Which of the following optical phenomena conclusively proves the transverse wave nature of light?",
      option_a: "Polarization",
      option_b: "Photoelectric effect",
      option_c: "Interference",
      option_d: "Diffraction",
      correct_option: "A",
      explanation: "1. Interference and diffraction occur for both longitudinal waves (sound) and transverse waves.\n2. Polarization can only occur in transverse waves where vibrations are perpendicular to the direction of propagation.\n3. Therefore, polarization conclusively proves that light waves are transverse.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 1371,
    originalQuestion: {
      question: "Which of the following is not a property of cathode rays? [AIPMT 2002]",
      option_a: "They produce a heating effect.",
      option_b: "They do not deflect in an electric field.",
      option_c: "They cast a shadow.",
      option_d: "They produce fluorescence.",
      correct_option: "B",
      explanation: "Properties of cathode rays:\n1. Cathode rays are streams of fast-moving, negatively charged subatomic particles (electrons).\n2. Because they carry a negative electric charge, they are readily deflected towards the positive plate in an electric field and deflected by magnetic fields. Hence, the statement that 'they do not deflect in an electric field' is false.\n3. They travel in straight lines and cast sharp shadows of opaque objects placed in their path.\n4. When they strike heavy metal targets, their kinetic energy converts into heat (heating effect).\n5. They induce bright fluorescence when striking glass walls or phosphors like ZnS.\n\nTherefore, Option (B) is the correct answer."
    },
    similarQuestion: {
      question: "Which of the following rays are not deflected by electric or magnetic fields?",
      option_a: "Cathode rays",
      option_b: "Alpha rays",
      option_c: "Beta rays",
      option_d: "Gamma rays",
      correct_option: "D",
      explanation: "1. Gamma rays are neutral electromagnetic radiation of high frequency carrying no net electric charge.\n2. Because their charge is zero, they experience no Lorentz force and pass undeflected through electric and magnetic fields.\n\nTherefore, Option (D) is the correct answer."
    }
  },
  {
    id: 1370,
    originalQuestion: {
      question: "When ultraviolet rays incident on a metal plate do not produce the photoelectric effect, it can occur by the incidence of: [AIPMT 2002]",
      option_a: "Infrared rays",
      option_b: "X-rays",
      option_c: "Radio waves",
      option_d: "Microwaves",
      correct_option: "B",
      explanation: "1. For the photoelectric effect to occur, the frequency (ν) of incident radiation must be greater than or equal to the threshold frequency (ν₀) of the metal: ν ≥ ν₀ (or photon energy E ≥ Φ).\n2. If ultraviolet (UV) light fails to produce the photoelectric effect, the photon energy of UV radiation is less than the metal's work function (E_UV < Φ).\n3. To trigger emission, radiation with a frequency higher than UV (and a shorter wavelength) must be used.\n4. Arranging the electromagnetic spectrum in order of increasing frequency:\nRadio waves < Microwaves < Infrared < Visible < Ultraviolet < X-rays < Gamma rays\n5. Among the given options, only X-rays have a higher frequency and higher photon energy than ultraviolet rays.\n\nTherefore, Option (B) is the correct answer."
    },
    similarQuestion: {
      question: "If green light causes photoelectric emission from a metal surface, which of the following radiations will definitely cause photoelectric emission from the same surface?",
      option_a: "Red light",
      option_b: "Infrared light",
      option_c: "Blue light",
      option_d: "Microwaves",
      correct_option: "C",
      explanation: "1. In the visible spectrum (VIBGYOR), frequency increases from red to violet.\n2. Blue light has a higher frequency (and shorter wavelength) than green light.\n3. Since green light already exceeds the threshold frequency, blue light has even higher photon energy and will definitely eject photoelectrons.\n\nTherefore, Option (C) is the correct answer."
    }
  },
  {
    id: 1369,
    originalQuestion: {
      question: "If particles are moving with the same velocity, then which has the maximum de Broglie wavelength? [AIPMT 2002]",
      option_a: "Proton",
      option_b: "Alpha particle",
      option_c: "Neutron",
      option_d: "Beta particle",
      correct_option: "D",
      explanation: "1. According to de Broglie's hypothesis, the matter wavelength of a particle of mass m moving with velocity v is:\nλ = h / p = h / (m v)\n\n2. When all particles move with the same velocity v, the de Broglie wavelength is inversely proportional to the mass of the particle:\nλ ∝ 1 / m\n\n3. Comparing masses of the given particles:\n- Beta particle (electron): m_e ≈ 9.1 × 10⁻³¹ kg\n- Proton: m_p ≈ 1.673 × 10⁻²⁷ kg\n- Neutron: m_n ≈ 1.675 × 10⁻²⁷ kg\n- Alpha particle (He nucleus): m_α ≈ 4 m_p ≈ 6.64 × 10⁻²⁷ kg\n\n4. Since the beta particle (electron) has the smallest mass by a factor of nearly 1836, it possesses the maximum de Broglie wavelength.\n\nTherefore, Option (D) is the correct answer."
    },
    similarQuestion: {
      question: "An electron, a proton, and an alpha particle all have the same kinetic energy. Which particle has the shortest de Broglie wavelength?",
      option_a: "Electron",
      option_b: "Proton",
      option_c: "Alpha particle",
      option_d: "All have identical wavelengths",
      correct_option: "C",
      explanation: "1. In terms of kinetic energy K, de Broglie wavelength is λ = h / √(2 m K).\n2. For the same K, λ is inversely proportional to the square root of mass (λ ∝ 1/√m).\n3. Since the alpha particle has the largest mass (m_α ≈ 4 u), it has the shortest de Broglie wavelength.\n\nTherefore, Option (C) is the correct answer."
    }
  },
  {
    id: 1368,
    originalQuestion: {
      question: "The value of Planck's constant is: [AIPMT 2002]",
      option_a: "6.63 × 10⁻³⁴ J/sec",
      option_b: "6.63 × 10⁻³⁴ kg m²/sec",
      option_c: "6.63 × 10⁻³⁴ kg m²",
      option_d: "6.63 × 10⁻³⁴ J sec",
      correct_option: "D",
      explanation: "1. Planck's constant (h) is the fundamental physical constant relating the energy of a photon (E) to its electromagnetic frequency (ν):\nE = h ν  ⇒  h = E / ν\n\n2. Dimensions of Planck's constant:\n- Units of energy E: Joules (J)\n- Units of frequency ν: s⁻¹\n- Therefore, unit of h = J / s⁻¹ = J s (Joule-second).\n- In SI base units: 1 J = 1 kg m² s⁻², so h = kg m² s⁻¹.\n\n3. Numerical value:\nh ≈ 6.626 × 10⁻³⁴ J s ≈ 6.63 × 10⁻³⁴ J s (or J sec).\n\nTherefore, Option (D) is the correct answer."
    },
    similarQuestion: {
      question: "The dimensions of Planck's constant (h) are identical to the dimensions of which physical quantity?",
      option_a: "Linear momentum",
      option_b: "Angular momentum",
      option_c: "Energy",
      option_d: "Power",
      correct_option: "B",
      explanation: "1. Dimensions of Planck's constant: [h] = [E] / [ν] = [M L² T⁻²] / [T⁻¹] = [M L² T⁻¹].\n2. Angular momentum L = m v r: [L] = [M][L T⁻¹][L] = [M L² T⁻¹].\n3. Thus, Planck's constant has the exact dimensions of angular momentum (action).\n\nTherefore, Option (B) is the correct answer."
    }
  },
  {
    id: 1367,
    originalQuestion: {
      question: "J. J. Thomson's cathode-ray tube experiment demonstrated that: [AIPMT 2003]",
      option_a: "Cathode rays are streams of negatively charged ions",
      option_b: "All the mass of an atom is essentially in the nucleus",
      option_c: "The e/m ratio of electrons is much greater than the e/m ratio of protons",
      option_d: "The e/m ratio of cathode-ray particles changes when a different gas is placed in the discharge tube",
      correct_option: "C",
      explanation: "1. In 1897, J. J. Thomson measured the specific charge (charge-to-mass ratio, e/m) of cathode rays using crossed electric and magnetic fields.\n2. He discovered that e/m for cathode-ray particles was independent of the cathode metal and the gas present in the tube, establishing the universal nature of the electron.\n3. The value of e/m for the electron was approximately 1.76 × 10¹¹ C kg⁻¹, which is roughly 1836 times larger than the e/m ratio of the lightest known ion (the hydrogen ion / proton, ~9.58 × 10⁷ C kg⁻¹).\n4. Because both carry elementary charge e, this proved that the mass of the electron is thousands of times smaller than that of the atom, identifying electrons as fundamental subatomic constituents.\n\nTherefore, Option (C) is the correct answer."
    },
    similarQuestion: {
      question: "Why is the specific charge (e/m) of cathode rays constant for all gases, whereas for anode rays (canal rays) it depends on the nature of the gas?",
      option_a: "Cathode rays consist of fundamental electrons, while anode rays consist of positive residual gas ions of differing masses",
      option_b: "Cathode rays are electromagnetic waves while anode rays are material particles",
      option_c: "Anode rays have a constant mass regardless of the gas",
      option_d: "Cathode rays have no electric charge",
      correct_option: "A",
      explanation: "1. Cathode rays are composed of electrons, which are universal constituents identical for all atoms.\n2. Anode rays consist of positive ions formed when gas molecules lose electrons; since different gases have different atomic/molecular masses, their e/m ratio varies with the gas.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 1366,
    originalQuestion: {
      question: "A photoelectric cell is illuminated by a point source of light 1 m away. When the source is shifted to 2 m, then: [AIPMT 2003]",
      option_a: "Each emitted electron carries one-quarter of the initial energy",
      option_b: "The number of electrons emitted is half the initial number",
      option_c: "Each emitted electron carries half the initial energy",
      option_d: "The number of electrons emitted is one-quarter of the initial number",
      correct_option: "D",
      explanation: "1. For a point isotropic light source, intensity (I) obeys the inverse square law:\nI ∝ 1 / r²\n\n2. When the distance from the point source increases from r₁ = 1 m to r₂ = 2 m:\nI₂ / I₁ = (r₁ / r₂)² = (1 / 2)² = 1/4.\nThe intensity of light incident on the photocell decreases to one-quarter of its initial value.\n\n3. The rate of emission of photoelectrons (photoelectric current) is directly proportional to incident light intensity:\nN ∝ I  ⇒  N₂ = N₁ / 4.\n\n4. The kinetic energy of individual emitted photoelectrons depends exclusively on the frequency of light (K_max = hν - Φ), which does not change with distance.\n\nTherefore, the number of electrons emitted becomes one-quarter of the initial number.\n\nTherefore, Option (D) is the correct answer."
    },
    similarQuestion: {
      question: "If a light source illuminating a photoelectric cell is brought closer from 4 m to 1 m, what happens to the stopping potential and the saturation current?",
      option_a: "Stopping potential remains unchanged; saturation current increases by 16 times",
      option_b: "Stopping potential increases by 16 times; saturation current remains unchanged",
      option_c: "Both stopping potential and saturation current increase by 4 times",
      option_d: "Stopping potential increases by 4 times; saturation current decreases",
      correct_option: "A",
      explanation: "1. Stopping potential depends strictly on light frequency: eV₀ = hν - Φ. Since frequency does not change with distance, V₀ remains constant.\n2. Intensity I ∝ 1/r²: bringing the source from 4 m to 1 m increases intensity by (4/1)² = 16 times.\n3. Saturation current is proportional to intensity and increases by 16 times.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 1365,
    originalQuestion: {
      question: "According to Einstein's photoelectric equation, the graph between the kinetic energy of photoelectrons ejected and the frequency of incident radiation is: [AIPMT 2004]",
      option_a: "Decreasing linear curve",
      option_b: "Straight line with positive y-intercept",
      option_c: "Straight line passing through the origin",
      option_d: "Straight line starting from threshold frequency (ν₀) on the x-axis with positive slope",
      correct_option: "D",
      explanation: "1. Einstein's photoelectric equation is:\nK_max = h ν - Φ = h ν - h ν₀\nwhere h is Planck's constant, ν is the incident frequency, and ν₀ is the threshold frequency.\n\n2. Comparing with the equation of a straight line, y = m x + c:\n- y-axis: K_max\n- x-axis: ν\n- Slope (m): h (Planck's constant, a universal positive constant)\n- x-intercept (where K_max = 0): ν = ν₀ (threshold frequency)\n- y-intercept (extrapolated to ν = 0): -Φ (negative work function)\n\n3. Photoelectric emission cannot occur for ν < ν₀ (where K would be negative). Hence, the physical curve starts on the frequency axis at ν₀ and extends linearly into the first quadrant with a positive slope h.\n\nTherefore, Option (D) is the correct answer."
    },
    similarQuestion: {
      question: "In a plot of stopping potential (V₀) versus frequency of incident radiation (ν) for a given photosensitive metal, what does the slope of the straight line represent?",
      option_a: "h / e",
      option_b: "h e",
      option_c: "Work function Φ",
      option_d: "Planck's constant h",
      correct_option: "A",
      explanation: "1. Einstein's equation in terms of stopping potential: e V₀ = h ν - Φ  ⇒  V₀ = (h / e) ν - (Φ / e).\n2. This is of the form y = m x + c, where slope m = h / e.\n3. The slope h/e is a universal constant for all photosensitive metals.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 1364,
    originalQuestion: {
      question: "A photosensitive metallic surface has work function hν₀. If photons of energy 2hν₀ fall on this surface, the electrons come out with a maximum velocity of 4 × 10⁶ m/s. When the photon energy is increased to 5hν₀, the maximum velocity of photoelectrons will be: [AIPMT 2005]",
      option_a: "2 × 10⁷ m/s",
      option_b: "2 × 10⁶ m/s",
      option_c: "8 × 10⁶ m/s",
      option_d: "8 × 10⁵ m/s",
      correct_option: "C",
      explanation: "1. According to Einstein's photoelectric equation:\nK_max = 1/2 m v² = E - Φ\n\n2. Case 1:\nPhoton energy E₁ = 2hν₀, work function Φ = hν₀.\nK₁ = 1/2 m v₁² = 2hν₀ - hν₀ = hν₀\nGiven v₁ = 4 × 10⁶ m/s.\n\n3. Case 2:\nPhoton energy E₂ = 5hν₀, work function Φ = hν₀.\nK₂ = 1/2 m v₂² = 5hν₀ - hν₀ = 4hν₀\n\n4. Taking the ratio of kinetic energies:\nK₂ / K₁ = (1/2 m v₂²) / (1/2 m v₁²) = 4hν₀ / hν₀ = 4\n(v₂ / v₁)² = 4  ⇒  v₂ / v₁ = 2.\n\n5. Calculating v₂:\nv₂ = 2 × v₁ = 2 × (4 × 10⁶ m/s) = 8 × 10⁶ m/s.\n\nTherefore, Option (C) is the correct answer."
    },
    similarQuestion: {
      question: "When light of energy 3Φ falls on a metal of work function Φ, the maximum velocity of emitted photoelectrons is v. If the incident energy is increased to 9Φ, the new maximum velocity will be:",
      option_a: "2v",
      option_b: "3v",
      option_c: "√3 v",
      option_d: "4v",
      correct_option: "A",
      explanation: "1. K₁ = 3Φ - Φ = 2Φ = 1/2 m v².\n2. K₂ = 9Φ - Φ = 8Φ = 1/2 m v'².\n3. K₂ / K₁ = 8Φ / 2Φ = 4 ⇒ (v' / v)² = 4 ⇒ v' = 2v.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 1363,
    originalQuestion: {
      question: "The work functions for metals A, B and C are 1.92 eV, 2.0 eV and 5 eV, respectively. According to Einstein's equation, the metals which will emit photoelectrons for radiation of wavelength 4100 Å are: [AIPMT 2005]",
      option_a: "A only",
      option_b: "A and B only",
      option_c: "All the three metals",
      option_d: "None",
      correct_option: "B",
      explanation: "1. The energy of a photon of wavelength λ is given by:\nE = h c / λ\nUsing h c ≈ 12400 eV Å:\nE = 12400 / 4100 Å ≈ 3.024 eV.\n\n2. For photoelectric emission to take place from a metal surface, the incident photon energy must be greater than or equal to the metal's work function (E ≥ Φ):\n- Metal A: Φ_A = 1.92 eV. Since 3.024 eV > 1.92 eV, photoelectrons are emitted.\n- Metal B: Φ_B = 2.0 eV. Since 3.024 eV > 2.0 eV, photoelectrons are emitted.\n- Metal C: Φ_C = 5.0 eV. Since 3.024 eV < 5.0 eV, no photoelectrons are emitted.\n\n3. Therefore, photoelectric emission will occur from metals A and B only.\n\nTherefore, Option (B) is the correct answer."
    },
    similarQuestion: {
      question: "Light of wavelength 500 nm falls on three metals with work functions Φ₁ = 2.2 eV, Φ₂ = 2.8 eV, and Φ₃ = 3.5 eV. Photoelectric emission will occur from which metal(s)?",
      option_a: "Metal 1 only",
      option_b: "Metals 1 and 2 only",
      option_c: "All three metals",
      option_d: "None of the metals",
      correct_option: "A",
      explanation: "1. Photon energy: E = 1240 eV nm / 500 nm = 2.48 eV.\n2. Compare E with work functions:\n- Metal 1: 2.48 eV > 2.2 eV (emission occurs).\n- Metal 2: 2.48 eV < 2.8 eV (no emission).\n- Metal 3: 2.48 eV < 3.5 eV (no emission).\n3. Hence, emission occurs only from Metal 1.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 1362,
    originalQuestion: {
      question: "The momentum of a photon of energy 1 MeV in kg m/s will be: [AIPMT 2006]",
      option_a: "5 × 10⁻²²",
      option_b: "0.33 × 10⁻⁶",
      option_c: "7 × 10⁻²⁴",
      option_d: "10⁻²²",
      correct_option: "A",
      explanation: "1. The momentum (p) of a photon is related to its energy (E) and the speed of light (c) by:\np = E / c\n\n2. Given:\n- Energy E = 1 MeV = 1 × 10⁶ eV\n- Converting to Joules: E = 10⁶ × 1.6 × 10⁻¹⁹ J = 1.6 × 10⁻¹³ J\n- Speed of light c = 3 × 10⁸ m s⁻¹\n\n3. Calculating momentum p:\np = (1.6 × 10⁻¹³ J) / (3 × 10⁸ m s⁻¹) = 0.533 × 10⁻²¹ kg m s⁻¹ = 5.33 × 10⁻²² kg m s⁻¹ ≈ 5 × 10⁻²² kg m/s.\n\nTherefore, Option (A) is the correct answer."
    },
    similarQuestion: {
      question: "What is the momentum of a photon having an energy of 3.3 × 10⁻¹⁹ J in kg m s⁻¹?",
      option_a: "1.1 × 10⁻²⁷ kg m s⁻¹",
      option_b: "3.3 × 10⁻²⁷ kg m s⁻¹",
      option_c: "9.9 × 10⁻¹¹ kg m s⁻¹",
      option_d: "1.1 × 10⁻²⁸ kg m s⁻¹",
      correct_option: "A",
      explanation: "1. Formula: p = E / c.\n2. p = (3.3 × 10⁻¹⁹ J) / (3.0 × 10⁸ m s⁻¹) = 1.1 × 10⁻²⁷ kg m s⁻¹.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 1361,
    originalQuestion: {
      question: "In a discharge tube, ionization of the enclosed gas is produced due to collisions between: [AIPMT 2006]",
      option_a: "Neutral gas atoms/molecules",
      option_b: "Positive ions and neutral atoms/molecules",
      option_c: "Negative electrons and neutral atoms/molecules",
      option_d: "Photons and neutral atoms/molecules",
      correct_option: "C",
      explanation: "1. Inside a discharge tube operating at low pressure under high potential difference, residual free electrons are strongly accelerated towards the positive anode by the intense electric field.\n2. Due to their high kinetic energy and small cross-section, these accelerated electrons undergo inelastic collisions with neutral gas atoms or molecules.\n3. The energy transferred during these collisions knocks valence electrons out of the neutral atoms (collisional ionization), generating more free electrons and positive ions.\n4. This continuous avalanche ionization sustains the electrical conduction and discharge phenomenon in the tube.\n\nTherefore, Option (C) is the correct answer."
    },
    similarQuestion: {
      question: "The positive ions formed in a discharge tube are accelerated towards the cathode and produce which type of rays?",
      option_a: "Canal rays (Anode rays)",
      option_b: "Cathode rays",
      option_c: "X-rays",
      option_d: "Gamma rays",
      correct_option: "A",
      explanation: "1. Positive ions created by electron-atom collisions accelerate towards the perforated cathode.\n2. Passing through the perforations (canals) in the cathode, they form streams of positively charged ions known as canal rays or anode rays.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 1360,
    originalQuestion: {
      question: "When photons of energy hν fall on an aluminium plate of work function E₀, photoelectrons of maximum kinetic energy K are ejected. If the frequency of radiation is doubled, the maximum kinetic energy of the ejected photoelectrons will be: [AIPMT 2006]",
      option_a: "K + hν",
      option_b: "K + E₀",
      option_c: "2K",
      option_d: "K",
      correct_option: "A",
      explanation: "1. In the initial state, according to Einstein's photoelectric equation:\nK = hν - E₀\nFrom this, we can express the initial photon energy as:\nhν = K + E₀\n\n2. When the frequency of the incident radiation is doubled (ν' = 2ν), the new photon energy is 2hν.\nThe new maximum kinetic energy K' is:\nK' = 2hν - E₀\n\n3. We can rewrite K' by splitting 2hν into (hν + hν):\nK' = hν + (hν - E₀)\nSubstituting (hν - E₀) = K:\nK' = K + hν.\n\n4. (Alternatively: K' = 2(K + E₀) - E₀ = 2K + E₀).\n\nTherefore, Option (A) is the correct answer."
    },
    similarQuestion: {
      question: "A metal with work function Φ emits electrons with maximum kinetic energy K when irradiated with frequency ν. If frequency is tripled (3ν), what is the new maximum kinetic energy?",
      option_a: "2hν + K",
      option_b: "3K",
      option_c: "3K + Φ",
      option_d: "K + 3hν",
      correct_option: "A",
      explanation: "1. Initial: K = hν - Φ ⇒ hν = K + Φ.\n2. New: K' = 3hν - Φ = 2hν + (hν - Φ) = 2hν + K.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 1359,
    originalQuestion: {
      question: "A photocell employs the photoelectric effect to convert: [AIPMT 2006]",
      option_a: "Change in the frequency of light into a change in the electric current",
      option_b: "Change in the frequency of light into a change in electric voltage",
      option_c: "Change in the intensity of illumination into a change in photoelectric current",
      option_d: "Change in the intensity of illumination into a change in the work function of the photocathode",
      correct_option: "C",
      explanation: "1. A photoelectric cell (photocell) consists of a photosensitive cathode and an anode sealed inside an evacuated glass bulb.\n2. When incident light falls on the cathode, photoelectrons are liberated. The number of photoelectrons emitted per unit time is directly proportional to the intensity of incident light (provided frequency ν ≥ ν₀).\n3. When these electrons are collected by the anode, they produce a measurable electric current (photoelectric current) through an external circuit.\n4. Therefore, a photocell directly converts changes in the intensity of light illumination into proportional changes in electric current, operating as a light-controlled transducer.\n\nTherefore, Option (C) is the correct answer."
    },
    similarQuestion: {
      question: "Which of the following devices relies directly on the photoelectric effect for automatic door opening and burglar alarm systems?",
      option_a: "Photoelectric cell",
      option_b: "Cathode ray oscilloscope",
      option_c: "Cyclotron",
      option_d: "Transformer",
      correct_option: "A",
      explanation: "1. In burglar alarms and automatic doors, an invisible light beam continuously shines on a photoelectric cell, maintaining an electric circuit.\n2. When an object or intruder intercepts the light beam, the light intensity drops to zero, interrupting the photoelectric current and triggering an alarm relay.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 1358,
    originalQuestion: {
      question: "A 5 watt source emits monochromatic light of wavelength 5000 Å. When placed 0.5 m away, it liberates photoelectrons from a photosensitive metallic surface. When the source is moved to a distance of 1.0 m, the number of photoelectrons liberated will be reduced by a factor of: [AIPMT 2007]",
      option_a: "8",
      option_b: "16",
      option_c: "2",
      option_d: "4",
      correct_option: "D",
      explanation: "1. For a point source of light, the intensity (I) of radiation falling on a surface obeys the inverse square law:\nI ∝ 1 / r²\nwhere r is the distance between the source and the photosensitive surface.\n\n2. Given:\n- Initial distance r₁ = 0.5 m\n- Final distance r₂ = 1.0 m\n\n3. Ratio of intensities:\nI₂ / I₁ = (r₁ / r₂)² = (0.5 / 1.0)² = (1/2)² = 1/4.\n\n4. The number of photoelectrons liberated per second is directly proportional to the intensity of incident radiation:\nN ∝ I  ⇒  N₂ / N₁ = I₂ / I₁ = 1/4.\n\n5. Therefore, the number of photoelectrons liberated is reduced by a factor of 4.\n\nTherefore, Option (D) is the correct answer."
    },
    similarQuestion: {
      question: "When a lamp placed 2 m from a photocell is moved to a distance of 6 m, the saturation photoelectric current decreases by a factor of:",
      option_a: "9",
      option_b: "3",
      option_c: "6",
      option_d: "12",
      correct_option: "A",
      explanation: "1. Intensity ratio: I₂ / I₁ = (r₁ / r₂)² = (2 / 6)² = (1/3)² = 1/9.\n2. Since photoelectric current is proportional to intensity, it decreases by a factor of 9.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 1357,
    originalQuestion: {
      question: "Monochromatic light of frequency 6.0 × 10¹⁴ Hz is produced by a laser. The power emitted is 2 × 10⁻³ W. The number of photons emitted, on average, by the source per second is: [AIPMT 2007]",
      option_a: "5 × 10¹⁶",
      option_b: "5 × 10¹⁷",
      option_c: "5 × 10¹⁴",
      option_d: "5 × 10¹⁵",
      correct_option: "D",
      explanation: "1. The energy (E) of a single photon of frequency ν is:\nE = h ν\nGiven:\n- h = 6.63 × 10⁻³⁴ J s\n- ν = 6.0 × 10¹⁴ Hz\nE = (6.63 × 10⁻³⁴ J s) × (6.0 × 10¹⁴ s⁻¹) = 3.978 × 10⁻¹⁹ J.\n\n2. The power (P) emitted by the laser represents the total energy emitted per second:\nP = n E\nwhere n is the number of photons emitted per second.\n\n3. Given P = 2 × 10⁻³ W:\nn = P / E = (2 × 10⁻³ J s⁻¹) / (3.978 × 10⁻¹⁹ J)\n= 0.5028 × 10¹⁶ ≈ 5.03 × 10¹⁵ photons s⁻¹ ≈ 5 × 10¹⁵.\n\nTherefore, Option (D) is the correct answer."
    },
    similarQuestion: {
      question: "A laser emits light of wavelength 600 nm with an output power of 3.3 mW. How many photons does the laser emit per second? (Take h = 6.6 × 10⁻³⁴ J s, c = 3 × 10⁸ m s⁻¹)",
      option_a: "1.0 × 10¹⁶",
      option_b: "2.0 × 10¹⁶",
      option_c: "1.0 × 10¹⁵",
      option_d: "3.3 × 10¹⁵",
      correct_option: "A",
      explanation: "1. Photon energy: E = hc / λ = (6.6 × 10⁻³⁴ × 3 × 10⁸) / (600 × 10⁻⁹) = 3.3 × 10⁻¹⁹ J.\n2. Photons per second: n = P / E = (3.3 × 10⁻³ W) / (3.3 × 10⁻¹⁹ J) = 1.0 × 10¹⁶.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 1356,
    originalQuestion: {
      question: "A beam of electrons passes undeflected through mutually perpendicular electric and magnetic fields. If the electric field is switched off and the same magnetic field is maintained, the electrons move: [AIPMT 2007]",
      option_a: "In a circular orbit",
      option_b: "Along a parabolic path",
      option_c: "Along a straight line",
      option_d: "In an elliptical orbit",
      correct_option: "A",
      explanation: "1. When both fields are present and perpendicular (E⃗ ⟂ B⃗), the electric force F_e = eE and magnetic force F_b = evB balance each other, allowing the electron beam to pass undeflected.\n2. When the electric field is switched off, only the magnetic field B⃗ remains, which is perpendicular to the electron's velocity vector v⃗.\n3. The magnetic Lorentz force on an electron is given by:\nF⃗ = -e (v⃗ × B⃗)\n4. Since v⃗ is perpendicular to B⃗, the magnitude of the force is constant (F = evB) and its direction is always perpendicular to the instantaneous velocity vector.\n5. A force of constant magnitude acting continuously perpendicular to the velocity does zero work and acts as a centripetal force:\ne v B = m v² / r  ⇒  r = m v / (e B)\n6. Therefore, the electrons undergo uniform circular motion in a plane perpendicular to B⃗.\n\nTherefore, Option (A) is the correct answer."
    },
    similarQuestion: {
      question: "If a charged particle enters a region of uniform magnetic field at an angle of 45° with the magnetic field lines, its resulting trajectory will be:",
      option_a: "Helical with uniform pitch",
      option_b: "Circular",
      option_c: "Straight line",
      option_d: "Parabolic",
      correct_option: "A",
      explanation: "1. The velocity component parallel to B (v cos 45°) remains unaffected, giving linear translation.\n2. The velocity component perpendicular to B (v sin 45°) causes circular motion.\n3. The combination of linear translation and uniform circular motion produces a helical path.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 1355,
    originalQuestion: {
      question: "In the phenomenon of electric discharge through gases at low pressure, the coloured glow in the tube appears as a result of: [AIPMT 2008]",
      option_a: "Collisions between the charged particles emitted from the cathode and the atoms of the gas",
      option_b: "Collision between different electrons of the atoms of the gas",
      option_c: "Excitation of electrons in the atoms",
      option_d: "Collision between the atoms of the gas",
      correct_option: "A",
      explanation: "1. In an electric discharge tube at low pressure (~0.01 mm of Hg), electrons emitted from the cathode are accelerated by the electric field to high velocities.\n2. These energetic electrons collide violently with neutral gas atoms/molecules in the tube, transferring energy and knocking orbital electrons into excited quantum states (or ionising them).\n3. When these excited electrons drop back to lower energy levels, they emit photons of specific discrete wavelengths characteristic of the gas.\n4. The collective emission of these photons produces the characteristic coloured glow in the discharge tube.\n\nTherefore, Option (A) is the correct answer."
    },
    similarQuestion: {
      question: "The colour of the glow emitted in a discharge tube depends primarily on:",
      option_a: "The nature of the gas inside the tube",
      option_b: "The metal used for the cathode",
      option_c: "The length of the discharge tube",
      option_d: "The shape of the glass tube",
      correct_option: "A",
      explanation: "1. The emitted spectral lines originate from electronic de-excitations between energy levels unique to the specific gas.\n2. For instance, neon glows red-orange, while argon glows pale blue.\n3. Therefore, the colour is characteristic of the gas present.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 1354,
    originalQuestion: {
      question: "A particle of mass 1 mg has the same wavelength as an electron moving with a velocity of 3 × 10⁶ m s⁻¹. The velocity of the particle is: [AIPMT 2008]",
      option_a: "3 × 10⁻³¹ m s⁻¹",
      option_b: "2.7 × 10⁻²¹ m s⁻¹",
      option_c: "2.7 × 10⁻¹⁸ m s⁻¹",
      option_d: "9 × 10⁻² m s⁻¹",
      correct_option: "C",
      explanation: "1. According to de Broglie's hypothesis, the wavelength of a matter wave is:\nλ = h / p = h / (m v)\n\n2. Since the particle and the electron have the same de Broglie wavelength (λ_p = λ_e):\nh / (m_p v_p) = h / (m_e v_e)  ⇒  m_p v_p = m_e v_e\n\n3. Solving for the velocity of the particle v_p:\nv_p = (m_e v_e) / m_p\n\n4. Given:\n- Mass of particle: m_p = 1 mg = 1 × 10⁻³ g = 1 × 10⁻⁶ kg\n- Mass of electron: m_e = 9.1 × 10⁻³¹ kg\n- Velocity of electron: v_e = 3 × 10⁶ m s⁻¹\n\n5. Calculating v_p:\nv_p = (9.1 × 10⁻³¹ kg × 3 × 10⁶ m s⁻¹) / (1 × 10⁻⁶ kg)\n= (27.3 × 10⁻²⁵) / (10⁻⁶) = 2.73 × 10⁻¹⁸ m s⁻¹ ≈ 2.7 × 10⁻¹⁸ m s⁻¹.\n\nTherefore, Option (C) is the correct answer."
    },
    similarQuestion: {
      question: "A dust particle of mass 1.0 × 10⁻⁹ kg moves with a speed of 6.63 m s⁻¹. What is its de Broglie wavelength? (h = 6.63 × 10⁻³⁴ J s)",
      option_a: "1.0 × 10⁻²⁵ m",
      option_b: "1.0 × 10⁻²⁴ m",
      option_c: "6.63 × 10⁻²⁵ m",
      option_d: "1.0 × 10⁻²² m",
      correct_option: "A",
      explanation: "1. Formula: λ = h / (m v).\n2. λ = (6.63 × 10⁻³⁴ J s) / (1.0 × 10⁻⁹ kg × 6.63 m s⁻¹) = 1.0 × 10⁻²⁵ m.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 1353,
    originalQuestion: {
      question: "The work function of a surface of a photosensitive material is 6.2 eV. The wavelength of the incident radiation for which the stopping potential is 5 V lies in the: [AIPMT 2008]",
      option_a: "Infrared region",
      option_b: "X-ray region",
      option_c: "Ultraviolet region",
      option_d: "Visible region",
      correct_option: "C",
      explanation: "1. According to Einstein's photoelectric equation:\nE = Φ + K_max = Φ + e V₀\n\n2. Given:\n- Work function: Φ = 6.2 eV\n- Stopping potential: V₀ = 5 V  ⇒  e V₀ = 5 eV\n- Energy of incident photon: E = 6.2 + 5.0 = 11.2 eV\n\n3. Calculating the wavelength of incident radiation:\nλ = h c / E\nUsing h c ≈ 1240 eV nm:\nλ = 1240 eV nm / 11.2 eV ≈ 110.7 nm ≈ 1107 Å.\n\n4. Wavelength classification:\n- Visible light: ~400 nm to 750 nm\n- Ultraviolet (UV) radiation: ~10 nm to 400 nm\n- X-rays: ~0.01 nm to 10 nm\n\n5. Since λ = 110.7 nm falls in the 10 nm to 400 nm range, it lies in the ultraviolet region.\n\nTherefore, Option (C) is the correct answer."
    },
    similarQuestion: {
      question: "A metal surface with work function 4.14 eV is irradiated with light. If the stopping potential is 2.07 V, what is the wavelength of the incident radiation? (Take hc = 1242 eV nm)",
      option_a: "200 nm",
      option_b: "400 nm",
      option_c: "600 nm",
      option_d: "100 nm",
      correct_option: "A",
      explanation: "1. Photon energy: E = Φ + eV₀ = 4.14 + 2.07 = 6.21 eV.\n2. Wavelength: λ = hc / E = 1242 / 6.21 = 200 nm.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 1352,
    originalQuestion: {
      question: "Monochromatic light of wavelength 667 nm is produced by a helium-neon laser. The power emitted is 9 mW. The number of photons arriving per second, on average, at a target irradiated by this beam is: [AIPMT 2009]",
      option_a: "3 × 10¹⁶",
      option_b: "9 × 10¹⁵",
      option_c: "3 × 10¹⁹",
      option_d: "9 × 10¹⁷",
      correct_option: "A",
      explanation: "1. The energy (E) of a single photon of wavelength λ is:\nE = h c / λ\nGiven:\n- λ = 667 nm = 667 × 10⁻⁹ m\n- h = 6.63 × 10⁻³⁴ J s\n- c = 3.0 × 10⁸ m s⁻¹\n\nE = (6.63 × 10⁻³⁴ × 3.0 × 10⁸) / (667 × 10⁻⁹) ≈ 2.982 × 10⁻¹⁹ J.\n\n2. Power (P) emitted by the laser is the total energy arriving per second:\nP = 9 mW = 9 × 10⁻³ W = 9 × 10⁻³ J s⁻¹.\n\n3. Number of photons arriving per second (n):\nn = P / E = (9 × 10⁻³ J s⁻¹) / (2.982 × 10⁻¹⁹ J) ≈ 3.018 × 10¹⁶ ≈ 3 × 10¹⁶ photons s⁻¹.\n\nTherefore, Option (A) is the correct answer."
    },
    similarQuestion: {
      question: "A sodium vapor lamp emits yellow light of wavelength 589 nm at a power rating of 100 W. How many photons does it emit each second?",
      option_a: "2.96 × 10²⁰",
      option_b: "1.50 × 10²⁰",
      option_c: "3.37 × 10¹⁹",
      option_d: "5.89 × 10²⁰",
      correct_option: "A",
      explanation: "1. Photon energy: E = hc / λ = (6.63 × 10⁻³⁴ × 3 × 10⁸) / (589 × 10⁻⁹) ≈ 3.377 × 10⁻¹⁹ J.\n2. Photons per second: n = P / E = 100 / (3.377 × 10⁻¹⁹) ≈ 2.96 × 10²⁰ photons s⁻¹.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 1351,
    originalQuestion: {
      question: "The figure shows a plot of photocurrent versus anode potential for a photosensitive surface for three different radiations. Which one of the following is a correct statement? [AIPMT 2009]",
      option_a: "Curves (a) and (b) represent incident radiations of the same frequency but of different intensities.",
      option_b: "Curves (b) and (c) represent incident radiations of different frequencies and different intensities.",
      option_c: "Curves (b) and (c) represent incident radiations of the same frequency having the same intensity.",
      option_d: "Curves (a) and (b) represent incident radiations of different frequencies and different intensities.",
      correct_option: "A",
      explanation: "1. In photoelectric characteristic curves:\n- The stopping potential (V₀, the negative retarding potential where current drops to zero) depends strictly on the frequency of incident radiation (e V₀ = h ν - Φ).\n- The saturation photocurrent (the plateau value at high positive potential) is directly proportional to the intensity of incident radiation.\n\n2. In the plot:\n- Curves (a) and (b) both intersect the negative potential axis at the exact same stopping potential (V₀₁). This indicates that the incident radiations for (a) and (b) have identical frequencies (ν_a = ν_b).\n- However, curve (a) levels off at a higher saturation current than curve (b), indicating that radiation (a) has a higher intensity than radiation (b) (I_a > I_b).\n\n3. Therefore, curves (a) and (b) represent incident radiations of the same frequency but of different intensities.\n\nTherefore, Option (A) is the correct answer."
    },
    similarQuestion: {
      question: "If two light beams of different intensities but identical frequencies illuminate the same photocell, what feature is shared by their photocurrent vs collector potential curves?",
      option_a: "They have identical stopping potentials",
      option_b: "They have identical saturation currents",
      option_c: "They have identical currents at all potentials",
      option_d: "Their work functions differ by a factor of 2",
      correct_option: "A",
      explanation: "1. Stopping potential depends only on frequency: eV₀ = hν - Φ.\n2. Since the frequency and cathode material are identical, both curves terminate at the exact same stopping potential on the negative voltage axis.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 1350,
    originalQuestion: {
      question: "The number of photoelectrons emitted for light of frequency ν, higher than the threshold frequency ν₀, is proportional to: [AIPMT 2009]",
      option_a: "Threshold frequency (ν₀)",
      option_b: "Intensity of light",
      option_c: "Frequency of light (ν)",
      option_d: "ν − ν₀",
      correct_option: "B",
      explanation: "1. According to the photon theory of the photoelectric effect, the process is a one-to-one interaction: one incident photon of frequency ν ≥ ν₀ is absorbed by one conduction electron, leading to its emission.\n2. The intensity of light (I) at a fixed frequency is directly proportional to the photon flux (the number of photons incident on the surface per unit area per unit time):\nI = N_photons × h ν\n3. Therefore, increasing the intensity increases the number of incident photons per second, which in turn increases the number of photoelectrons emitted per second in direct proportion.\n4. (The frequency ν determines the kinetic energy of each electron, not the rate of emission).\n\nTherefore, Option (B) is the correct answer."
    },
    similarQuestion: {
      question: "If the intensity of light incident on a metal surface is doubled while keeping its frequency constant above the threshold, what happens to the maximum kinetic energy and the saturation photocurrent?",
      option_a: "Kinetic energy remains unchanged; photocurrent doubles",
      option_b: "Both kinetic energy and photocurrent double",
      option_c: "Kinetic energy doubles; photocurrent remains unchanged",
      option_d: "Both kinetic energy and photocurrent remain unchanged",
      correct_option: "A",
      explanation: "1. K_max depends only on frequency: K_max = hν - Φ (unchanged).\n2. Saturation photocurrent is proportional to light intensity and therefore doubles.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 1349,
    originalQuestion: {
      question: "The potential difference that must be applied to stop the fastest photoelectrons emitted by a nickel surface, having work function 5.01 eV, when ultraviolet light of 200 nm falls on it, must be: [AIPMT 2010 Prelims]",
      option_a: "2.4 V",
      option_b: "1.2 V",
      option_c: "−2.4 V",
      option_d: "−1.2 V",
      correct_option: "B",
      explanation: "1. The energy of an incident photon of wavelength λ = 200 nm is:\nE = h c / λ = 1240 eV nm / 200 nm = 6.20 eV.\n\n2. According to Einstein's photoelectric equation, the maximum kinetic energy of the emitted photoelectrons is:\nK_max = E - Φ\nGiven work function Φ = 5.01 eV:\nK_max = 6.20 - 5.01 = 1.19 eV.\n\n3. The stopping potential (V₀) is the potential difference required to reduce the kinetic energy of the fastest electrons to zero:\ne V₀ = K_max  ⇒  V₀ = K_max / e\nV₀ = 1.19 eV / e = 1.19 V ≈ 1.2 V.\n\n4. Thus, a stopping potential magnitude of 1.2 V (applied as a retarding potential) is required.\n\nTherefore, Option (B) is the correct answer."
    },
    similarQuestion: {
      question: "When ultraviolet light of wavelength 250 nm is incident on a metal surface of work function 3.96 eV, what retarding potential is required to stop the fastest electrons? (Take hc = 1240 eV nm)",
      option_a: "1.0 V",
      option_b: "2.0 V",
      option_c: "0.5 V",
      option_d: "3.96 V",
      correct_option: "A",
      explanation: "1. Incident photon energy: E = 1240 / 250 = 4.96 eV.\n2. K_max = E - Φ = 4.96 - 3.96 = 1.00 eV.\n3. Stopping potential V₀ = 1.00 V.\n\nTherefore, Option (A) is the correct answer."
    }
  }
];

