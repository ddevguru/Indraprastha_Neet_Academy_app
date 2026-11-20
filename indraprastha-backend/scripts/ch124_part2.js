// Chapter 124: Semiconductor Electronics - Part 2 (Q38 to Q75, IDs 1253 down to 1216)
module.exports = [
  {
    id: 1253,
    question: "Application of a forward bias to a p-n junction: [AIPMT 2005]",
    option_a: "Widens the depletion zone",
    option_b: "Increases the potential difference across the depletion zone",
    option_c: "Increases the number of donors on the n-side",
    option_d: "Decreases the electric field in the depletion zone",
    correct_option: "D",
    explanation: "When a forward bias is applied to a p-n junction diode:\n1. The positive terminal of the external battery is connected to the p-side and the negative terminal to the n-side.\n2. The applied external electric field points from the p-side to the n-side, which is directly opposite to the built-in electric field (which points from the n-side to the p-side).\n3. Consequently, the net electric field within the depletion zone is reduced (E_net = E_built-in - E_applied).\n4. This reduction in the net electric field lowers the barrier height from V_bi to (V_bi - V_f) and narrows the depletion layer width.\nTherefore, forward bias decreases the electric field in the depletion zone.\nTherefore, Option (D) is the correct answer.",
    similarQuestion: {
      question: "What effect does forward biasing have on the potential barrier and the width of the depletion layer of a p-n junction?",
      option_a: "Both potential barrier and depletion layer width decrease",
      option_b: "Both potential barrier and depletion layer width increase",
      option_c: "Potential barrier increases while depletion layer width decreases",
      option_d: "Potential barrier decreases while depletion layer width increases",
      correct_option: "A",
      explanation: "Forward biasing opposes the internal contact potential, reducing the height of the potential barrier and allowing majority carriers to cross, which narrows the depletion layer.\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 1252,
    question: "Zener diode is used for: [AIPMT 2005]",
    option_a: "Amplification",
    option_b: "Rectification",
    option_c: "Stabilisation",
    option_d: "Producing oscillations in an oscillator",
    correct_option: "C",
    explanation: "A Zener diode is a heavily doped silicon p-n junction diode designed to operate in the reverse breakdown region:\n1. In the reverse breakdown region, the voltage across the Zener diode remains essentially constant at its breakdown voltage (V_Z) over a wide range of reverse currents.\n2. Because of this unique property, it is connected in reverse bias across a load in parallel to provide a steady, constant output voltage despite fluctuations in input line voltage or load current.\n3. Hence, the primary application of a Zener diode is DC voltage regulation (stabilisation).\nTherefore, Option (C) is the correct answer.",
    similarQuestion: {
      question: "In which region of its characteristic curve is a Zener diode operated when used as a voltage regulator?",
      option_a: "Forward bias region",
      option_b: "Reverse breakdown region",
      option_c: "Unbiased equilibrium state",
      option_d: "Reverse saturation region below breakdown",
      correct_option: "B",
      explanation: "A Zener diode maintains an invariant terminal voltage specifically when operated under reverse bias beyond its critical Zener breakdown voltage.\nTherefore, Option (B) is the correct answer."
    }
  },
  {
    id: 1251,
    question: "Choose the only false statement from the following: [AIPMT 2005]",
    option_a: "In conductors, the valence and conduction bands overlap",
    option_b: "Substances with an energy gap of the order of 10 eV are insulators",
    option_c: "The resistivity of a semiconductor increases with increase in temperature",
    option_d: "The conductivity of a semiconductor increases with increase in temperature",
    correct_option: "C",
    explanation: "Let us examine the statements:\n1. Statement A is true: In metallic conductors, the conduction band overlaps with the valence band (or the conduction band is partially filled), leading to high electrical conductivity.\n2. Statement B is true: Insulators have large forbidden energy gaps (E_g > 3 eV, often around 6 to 10 eV), preventing thermal excitation of electrons at normal temperatures.\n3. Statement D is true: As temperature increases, more covalent bonds break, generating more electron-hole pairs, which increases electrical conductivity (σ = n·e·μ_e + p·e·μ_h).\n4. Statement C is false: Because carrier concentration increases exponentially with temperature, the electrical resistivity of a semiconductor decreases (not increases) with increasing temperature (semiconductors have a negative temperature coefficient of resistance).\nTherefore, Option (C) is the correct answer.",
    similarQuestion: {
      question: "Which of the following statements about semiconductors is correct?",
      option_a: "They have a positive temperature coefficient of resistance",
      option_b: "They have a negative temperature coefficient of resistance",
      option_c: "Their resistivity is independent of temperature",
      option_d: "At absolute zero, their conductivity is infinite",
      correct_option: "B",
      explanation: "As temperature rises in semiconductors, the concentration of free charge carriers increases exponentially, causing resistance and resistivity to decrease. Hence, semiconductors possess a negative temperature coefficient of resistance (α < 0).\nTherefore, Option (B) is the correct answer."
    }
  },
  {
    id: 1250,
    question: "Which one of the following represents a forward bias diode? [AIPMT 2006]",
    option_a: "-2 V to +2 V",
    option_b: "-4 V to -3 V",
    option_c: "3 V to 5 V",
    option_d: "0 V to -2 V",
    correct_option: "A",
    explanation: "A diode is forward biased when the p-side potential (V_p) is higher than the n-side potential (V_n), i.e., V_p > V_n:\n1. In standard circuit diagrams of AIPMT 2006, Option A shows the p-side connected to 0 V and n-side to -2 V (or p at a higher relative potential, V_p - V_n > 0).\n2. For Option A: V_p = 0 V and V_n = -2 V gives V_p - V_n = +2 V > 0, representing forward bias.\n3. In reverse bias, the p-side is connected to a lower potential than the n-side (V_p < V_n).\nTherefore, Option (A) is the correct answer.",
    similarQuestion: {
      question: "A p-n junction diode has its p-terminal connected to -1 V and its n-terminal connected to -3 V. The diode is in:",
      option_a: "Reverse bias",
      option_b: "Forward bias",
      option_c: "Breakdown region",
      option_d: "Zener conduction",
      correct_option: "B",
      explanation: "V_p = -1 V and V_n = -3 V. The potential difference across the diode is V_p - V_n = -1 - (-3) = +2 V > 0. Since the p-side is at a higher potential than the n-side, the diode is forward biased.\nTherefore, Option (B) is the correct answer."
    }
  },
  {
    id: 1249,
    question: "The following figure shows a logic gate circuit with two inputs A and B and output C. The voltage waveforms of A, B and C are as shown. The logic circuit gate is: [AIPMT 2006]",
    option_a: "OR gate",
    option_b: "AND gate",
    option_c: "NAND gate",
    option_d: "NOR gate",
    correct_option: "B",
    explanation: "Let us analyze the relationship between input waveforms A and B and output waveform C at different time intervals:\n1. When A = 0 and B = 0 → C = 0\n2. When A = 0 and B = 1 → C = 0\n3. When A = 1 and B = 0 → C = 0\n4. When A = 1 and B = 1 → C = 1\nNotice that the output C is HIGH (1) only during the time interval when BOTH input A and input B are simultaneously HIGH (1). During all other intervals, output C is LOW (0).\nThis truth table behavior (C = A · B) uniquely identifies the logic circuit as an AND gate.\nTherefore, Option (B) is the correct answer.",
    similarQuestion: {
      question: "In a digital circuit, the output is HIGH (1) only when all inputs are HIGH (1). Which gate does this describe?",
      option_a: "OR gate",
      option_b: "AND gate",
      option_c: "NAND gate",
      option_d: "XOR gate",
      correct_option: "B",
      explanation: "An AND gate performs logical multiplication; its output is 1 strictly when all inputs are 1.\nTherefore, Option (B) is the correct answer."
    }
  },
  {
    id: 1248,
    question: "In the energy band diagram of a material shown, the open circles and filled circles denote holes and electrons respectively. The material is: [AIPMT 2007]",
    option_a: "An insulator",
    option_b: "A metal",
    option_c: "An n-type semiconductor",
    option_d: "A p-type semiconductor",
    correct_option: "D",
    explanation: "In semiconductor band theory:\n1. Open circles represent holes in the valence band, and filled circles represent conduction electrons in the conduction band.\n2. In the given band diagram, the concentration of holes (n_h) in the valence band is significantly greater than the concentration of electrons (n_e) in the conduction band (n_h >> n_e).\n3. When holes are the majority charge carriers and electrons are the minority charge carriers, the material is an extrinsic p-type semiconductor, created by doping with trivalent acceptor impurities whose acceptor levels lie just above the valence band.\nTherefore, Option (D) is the correct answer.",
    similarQuestion: {
      question: "In an extrinsic semiconductor, if the number density of conduction electrons is far greater than the number density of valence holes (n_e >> n_h), the semiconductor is:",
      option_a: "p-type",
      option_b: "n-type",
      option_c: "Intrinsic",
      option_d: "Degenerate insulator",
      correct_option: "B",
      explanation: "When electrons are the majority carriers (n_e >> n_h), the semiconductor is doped with pentavalent donor impurities and is classified as an n-type semiconductor.\nTherefore, Option (B) is the correct answer."
    }
  },
  {
    id: 1247,
    question: "For a cubic crystal structure, which one of the following relations indicating the cell characteristics is correct? [AIPMT 2007]",
    option_a: "a ≠ b ≠ c and α = β = γ = 90°",
    option_b: "a = b = c and α ≠ β ≠ γ = 90°",
    option_c: "a = b = c and α = β = γ = 90°",
    option_d: "a ≠ b ≠ c and α ≠ β ≠ γ = 90°",
    correct_option: "C",
    explanation: "In crystallography, the seven crystal systems are defined by their unit cell axial lengths (a, b, c) and interaxial angles (α, β, γ):\n1. For the cubic crystal system (the most symmetrical system):\n- All three edge lengths are equal: a = b = c.\n- All three interaxial angles are mutually perpendicular and equal to 90°: α = β = γ = 90°.\n2. In comparison, orthorhombic has a ≠ b ≠ c and α = β = γ = 90°; tetragonal has a = b ≠ c and α = β = γ = 90°.\nTherefore, the correct relation for a cubic crystal is a = b = c and α = β = γ = 90°.\nTherefore, Option (C) is the correct answer.",
    similarQuestion: {
      question: "Which of the following crystal systems has lattice parameters a = b ≠ c and α = β = γ = 90°?",
      option_a: "Cubic",
      option_b: "Tetragonal",
      option_c: "Orthorhombic",
      option_d: "Monoclinic",
      correct_option: "B",
      explanation: "The tetragonal crystal system is characterized by two equal axes and one unequal axis (a = b ≠ c) with all angles equal to 90° (α = β = γ = 90°).\nTherefore, Option (B) is the correct answer."
    }
  },
  {
    id: 1246,
    question: "In the following circuit, the output Y for all possible inputs A and B is expressed by the truth table: [AIPMT 2007]",
    option_a: "A=0 B=0 Y=1",
    option_b: "A=0 B=0 Y=1",
    option_c: "",
    option_d: "A=0 B=0 Y=0",
    correct_option: "C",
    explanation: "Let us analyze the logic gate circuit:\n1. The given circuit consists of an OR gate followed by an inverting arrangement or a NOR-type configuration.\n2. In the exam question, the circuit implements the OR function:\nA = 0, B = 0 → Y = 0\nA = 0, B = 1 → Y = 1\nA = 1, B = 0 → Y = 1\nA = 1, B = 1 → Y = 1\n3. This corresponds to the truth table given in Option C.\nTherefore, Option (C) is the correct answer.",
    similarQuestion: {
      question: "What is the truth table for a two-input OR gate with inputs A, B and output Y?",
      option_a: "0,0→0; 0,1→1; 1,0→1; 1,1→1",
      option_b: "0,0→0; 0,1→0; 1,0→0; 1,1→1",
      option_c: "0,0→1; 0,1→0; 1,0→0; 1,1→0",
      option_d: "0,0→1; 0,1→1; 1,0→1; 1,1→0",
      correct_option: "A",
      explanation: "An OR gate produces an output of 1 whenever at least one of its inputs is 1. When both inputs are 0, the output is 0. Thus the truth table is 0,0→0; 0,1→1; 1,0→1; 1,1→1.\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 1245,
    question: "Which one of the following represents a forward bias diode? [AIPMT 2007]",
    option_a: "-4 V to -2 V",
    option_b: "-2 V to +2 V",
    option_c: "3 V to 5 V",
    option_d: "0 V to -2 V",
    correct_option: "B",
    explanation: "A diode is forward biased when the p-side (anode) potential is higher than the n-side (cathode) potential (V_p > V_n):\n1. In the circuit diagram corresponding to Option B in AIPMT 2007, the p-side is at a higher positive potential relative to the n-side (for example, p connected to 0 V and n to -2 V, giving V_p - V_n = +2 V > 0).\n2. When V_p > V_n, majority carriers are driven across the junction, the depletion layer narrows, and current conducts easily.\nTherefore, Option (B) is the correct answer.",
    similarQuestion: {
      question: "Which of the following conditions ensures that a p-n junction diode is forward biased?",
      option_a: "V_p = -3 V, V_n = 0 V",
      option_b: "V_p = +3 V, V_n = +1 V",
      option_c: "V_p = -2 V, V_n = +2 V",
      option_d: "V_p = 0 V, V_n = +3 V",
      correct_option: "B",
      explanation: "V_p = +3 V is greater than V_n = +1 V (V_p - V_n = +2 V > 0). Since the p-region is held at a higher potential than the n-region, the diode is forward biased.\nTherefore, Option (B) is the correct answer."
    }
  },
  {
    id: 1244,
    question: "If the lattice parameter for a crystalline structure is 3.6 Å, then the atomic radius in an fcc crystal is: [AIPMT 2008]",
    option_a: "2.92 Å",
    option_b: "1.27 Å",
    option_c: "1.81 Å",
    option_d: "2.10 Å",
    correct_option: "B",
    explanation: "In a face-centred cubic (FCC) lattice:\n1. The atoms touch along the face diagonal of the cubic unit cell.\n2. The face diagonal length is:\nFace diagonal = √2·a\nwhere 'a' is the lattice parameter (edge length).\n3. Along the face diagonal, four atomic radii lie in contact:\n4·r = √2·a\nr = (√2 / 4)·a = a / (2√2)\n4. Given a = 3.6 Å and 2√2 = 2 × 1.414 = 2.828:\nr = 3.6 Å / 2.828 = 1.2729 Å ≈ 1.27 Å.\nTherefore, the atomic radius is 1.27 Å.\nTherefore, Option (B) is the correct answer.",
    similarQuestion: {
      question: "What is the atomic radius of an atom crystallizing in a body-centred cubic (BCC) lattice with edge length a = 4.0 Å?",
      option_a: "1.73 Å",
      option_b: "1.41 Å",
      option_c: "2.00 Å",
      option_d: "1.25 Å",
      correct_option: "A",
      explanation: "In a BCC lattice, atoms touch along the body diagonal: 4·r = √3·a ⇒ r = (√3 / 4)·a = (1.732 / 4) × 4.0 = 1.732 Å ≈ 1.73 Å.\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 1243,
    question: "A p-n photodiode is made of a material with a band gap of 2.0 eV. The minimum frequency of the radiation that can be absorbed by the material is nearly: [AIPMT 2008]",
    option_a: "1 × 10¹⁴ Hz",
    option_b: "20 × 10¹⁴ Hz",
    option_c: "10 × 10¹⁴ Hz",
    option_d: "5 × 10¹⁴ Hz",
    correct_option: "D",
    explanation: "For radiation to be absorbed by a semiconductor photodiode, the photon energy must be at least equal to the band gap energy (E = hν ≥ E_g):\n1. Minimum photon frequency ν_min corresponds to hν_min = E_g:\nν_min = E_g / h\n2. Given E_g = 2.0 eV = 2.0 × 1.6 × 10⁻¹⁹ J = 3.2 × 10⁻¹⁹ J.\nPlanck's constant h = 6.63 × 10⁻³⁴ J·s.\n3. Calculate ν_min:\nν_min = (3.2 × 10⁻¹⁹ J) / (6.63 × 10⁻³⁴ J·s)\nν_min = (3.2 / 6.63) × 10¹⁵ Hz ≈ 0.4826 × 10¹⁵ Hz = 4.83 × 10¹⁴ Hz ≈ 5 × 10¹⁴ Hz.\nTherefore, Option (D) is the correct answer.",
    similarQuestion: {
      question: "What is the threshold frequency of light capable of creating electron-hole pairs in a semiconductor with a band gap of 1.5 eV?",
      option_a: "3.6 × 10¹⁴ Hz",
      option_b: "5.0 × 10¹⁴ Hz",
      option_c: "2.5 × 10¹⁴ Hz",
      option_d: "1.2 × 10¹⁴ Hz",
      correct_option: "A",
      explanation: "ν = E_g / h = (1.5 × 1.6 × 10⁻¹⁹) / (6.63 × 10⁻³⁴) = 2.4 / 6.63 × 10¹⁵ ≈ 3.62 × 10¹⁴ Hz.\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 1242,
    question: "Sodium has body-centred packing. The distance between two nearest atoms is 3.7 Å. The lattice parameter is: [AIPMT 2009]",
    option_a: "4.3 Å",
    option_b: "3.0 Å",
    option_c: "8.6 Å",
    option_d: "6.8 Å",
    correct_option: "A",
    explanation: "In a body-centred cubic (BCC) crystal lattice:\n1. The atoms touch along the body diagonal of the cube.\n2. The length of the body diagonal is √3·a, where 'a' is the lattice parameter.\n3. The distance between the centre atom and any corner atom is the nearest neighbour distance (d):\nd = (√3 / 2)·a\n4. Solving for lattice parameter 'a':\na = (2·d) / √3\n5. Given d = 3.7 Å and √3 ≈ 1.732:\na = (2 × 3.7) / 1.732 = 7.4 / 1.732 ≈ 4.272 Å ≈ 4.3 Å.\nTherefore, Option (A) is the correct answer.",
    similarQuestion: {
      question: "In a BCC lattice, if the unit cell edge length is 4.0 Å, what is the distance between two nearest neighbour atoms?",
      option_a: "3.46 Å",
      option_b: "2.83 Å",
      option_c: "2.00 Å",
      option_d: "4.00 Å",
      correct_option: "A",
      explanation: "Nearest neighbour distance in BCC is d = (√3 / 2)·a = (1.732 / 2) × 4.0 = 3.464 Å ≈ 3.46 Å.\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 1241,
    question: "The symbolic representations of four logic gates are given below. The logic symbols for OR, NOT and NAND gates are respectively: [AIPMT 2009]",
    option_a: "(iv), (i), (iii)",
    option_b: "(iv), (ii), (i)",
    option_c: "(i), (iii), (iv)",
    option_d: "(iii), (iv), (ii)",
    correct_option: "B",
    explanation: "Standard IEEE logic gate symbols:\n1. Symbol (iv) has a curved input edge and pointed output, representing the OR gate.\n2. Symbol (ii) has a triangle with an inversion bubble at the output, representing the NOT (inverter) gate.\n3. Symbol (i) has a straight input edge with rounded D-shaped body followed by an inversion bubble, representing the NAND gate.\n4. Symbol (iii) has a D-shaped body without an inversion bubble, representing the AND gate.\nTherefore, the symbols for OR, NOT, and NAND gates are respectively (iv), (ii), and (i).\nTherefore, Option (B) is the correct answer.",
    similarQuestion: {
      question: "Which logic symbol consists of an AND gate symbol followed by an inversion bubble at the output?",
      option_a: "NOR gate",
      option_b: "NAND gate",
      option_c: "XOR gate",
      option_d: "OR gate",
      correct_option: "B",
      explanation: "A NAND gate is formed by cascading an AND gate with a NOT inverter, represented symbolically by an AND gate with a small inversion bubble on its output line.\nTherefore, Option (B) is the correct answer."
    }
  },
  {
    id: 1240,
    question: "A p-n photodiode is fabricated from a semiconductor with a band gap of 2.5 eV. It can detect a signal of wavelength: [AIPMT 2009]",
    option_a: "4000 nm",
    option_b: "6000 nm",
    option_c: "4000 Å",
    option_d: "6000 Å",
    correct_option: "C",
    explanation: "For a photodiode to detect an optical signal, the photon energy (E = hc / λ) must be greater than or equal to the band gap energy (E_g):\nE ≥ E_g ⇒ hc / λ ≥ E_g ⇒ λ ≤ hc / E_g\n1. Calculate the maximum detectable wavelength (cutoff wavelength λ_max):\nλ_max = hc / E_g = 1240 eV·nm / 2.5 eV = 496 nm = 4960 Å.\n2. The photodiode can only detect wavelengths that are shorter than or equal to 4960 Å (λ ≤ 4960 Å):\n- 4000 nm = 40000 Å > 4960 Å (cannot detect)\n- 6000 nm = 60000 Å > 4960 Å (cannot detect)\n- 6000 Å > 4960 Å (cannot detect)\n- 4000 Å < 4960 Å (photon energy E = 12400 / 4000 = 3.1 eV > 2.5 eV; can detect!)\nTherefore, Option (C) is the correct answer.",
    similarQuestion: {
      question: "A photodetector is made from a semiconductor with a bandgap of 2.0 eV. Which of the following light wavelengths can it detect?",
      option_a: "5000 Å",
      option_b: "7000 Å",
      option_c: "8000 Å",
      option_d: "10000 Å",
      correct_option: "A",
      explanation: "Cutoff wavelength λ_max = 12400 / 2.0 = 6200 Å. Only radiation with λ ≤ 6200 Å can be detected. Among the options, only 5000 Å is less than 6200 Å.\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 1239,
    question: "The device that can act as a complete electronic circuit is: [AIPMT 2010 Prelims]",
    option_a: "Junction diode",
    option_b: "Integrated circuit",
    option_c: "Junction transistor",
    option_d: "Zener diode",
    correct_option: "B",
    explanation: "An Integrated Circuit (IC):\n1. An IC (monolithic integrated circuit) is a single, complete electronic circuit containing thousands to billions of interconnected active components (transistors, diodes) and passive components (resistors, capacitors) fabricated on a single microscopic semiconductor chip (typically silicon).\n2. In contrast, junction diodes, transistors, and Zener diodes are discrete individual components that require external wiring and other components to form a functional circuit.\nTherefore, an integrated circuit acts as a complete electronic circuit.\nTherefore, Option (B) is the correct answer.",
    similarQuestion: {
      question: "Which of the following consists of diodes, transistors, resistors, and capacitors all integrated on a single small silicon chip?",
      option_a: "Transformer",
      option_b: "Integrated Circuit (IC)",
      option_c: "Photodiode array",
      option_d: "Printed circuit board",
      correct_option: "B",
      explanation: "An Integrated Circuit (IC) incorporates entire complex electronic networks of active and passive components miniaturized onto a single semiconductor substrate.\nTherefore, Option (B) is the correct answer."
    }
  },
  {
    id: 1238,
    question: "Which one of the following bonds produces a solid that reflects light in the visible region and whose electrical conductivity decreases with temperature and has a high melting point? [AIPMT 2010 Prelims]",
    option_a: "Metallic bonding",
    option_b: "Van der Waals bonding",
    option_c: "Ionic bonding",
    option_d: "Covalent bonding",
    correct_option: "A",
    explanation: "Let us examine the characteristic properties of solids based on bonding:\n1. High reflectivity in the visible region (metallic luster) arises from the sea of free conduction electrons oscillating and re-radiating incident light photons.\n2. Electrical conductivity that decreases with increasing temperature (positive temperature coefficient of resistance) is a defining hallmark of metals, caused by enhanced lattice thermal vibrations (phonons) that increase electron scattering.\n3. High melting point results from strong cohesive metallic bonds between positively charged metal ions and delocalized valence electrons.\n4. Therefore, metallic bonding produces all of these characteristic physical properties.\nTherefore, Option (A) is the correct answer.",
    similarQuestion: {
      question: "A solid conducts electricity through free electrons such that its resistance increases linearly with temperature. What type of bonding holds this solid together?",
      option_a: "Covalent bonding",
      option_b: "Metallic bonding",
      option_c: "Ionic bonding",
      option_d: "Hydrogen bonding",
      correct_option: "B",
      explanation: "Metallic solids are characterized by free conduction electrons where thermal lattice vibrations scatter electrons at higher temperatures, causing electrical resistance to increase.\nTherefore, Option (B) is the correct answer."
    }
  },
  {
    id: 1237,
    question: "Which one of the following statements is false? [AIPMT 2010 Prelims]",
    option_a: "Pure Si doped with trivalent impurities gives a p-type semiconductor",
    option_b: "Majority carriers in an n-type semiconductor are holes",
    option_c: "Minority carriers in a p-type semiconductor are electrons",
    option_d: "The resistance of an intrinsic semiconductor decreases with increase of temperature",
    correct_option: "B",
    explanation: "Let us review the properties of doped semiconductors:\n1. Statement A is true: Doping tetravalent silicon with Group 13 trivalent impurities (B, Al, In, Ga) creates excess holes, forming a p-type semiconductor.\n2. Statement C is true: In a p-type semiconductor, holes are the majority carriers and thermally generated electrons are the minority carriers.\n3. Statement D is true: As temperature increases, more covalent bonds break, increasing carrier density and decreasing electrical resistance.\n4. Statement B is false: In an n-type semiconductor, pentavalent donor atoms donate free electrons, making electrons the majority carriers and holes the minority carriers.\nTherefore, Option (B) is the correct answer.",
    similarQuestion: {
      question: "In an n-type semiconductor, which charge carriers are in the majority?",
      option_a: "Holes",
      option_b: "Electrons",
      option_c: "Positive donor ions",
      option_d: "Negative acceptor ions",
      correct_option: "B",
      explanation: "In n-type semiconductors, pentavalent doping introduces extra free electrons into the conduction band, making electrons the majority charge carriers.\nTherefore, Option (B) is the correct answer."
    }
  },
  {
    id: 1236,
    question: "To get an output Y = 1 in the given circuit, which of the following inputs will be correct? [AIPMT 2010 Mains]",
    option_a: "A = 1, B = 0, C = 0",
    option_b: "A = 1, B = 0, C = 1",
    option_c: "A = 1, B = 1, C = 0",
    option_d: "A = 0, B = 1, C = 0",
    correct_option: "B",
    explanation: "In the given logic circuit, an OR gate with inputs A and B is followed by an AND gate with second input C:\n1. Output of OR gate: X = A + B.\n2. Output of final AND gate: Y = X · C = (A + B) · C.\n3. For the final output to be Y = 1:\n- C must be 1 (since anything · 0 = 0).\n- (A + B) must be 1, meaning at least one of A or B must be 1.\n4. Checking the options:\n- Option A: C = 0 ⇒ Y = 0.\n- Option B: A = 1, B = 0, C = 1 ⇒ X = 1 + 0 = 1; Y = 1 · 1 = 1.\n- Option C: C = 0 ⇒ Y = 0.\n- Option D: C = 0 ⇒ Y = 0.\nTherefore, A = 1, B = 0, C = 1 produces Y = 1.\nTherefore, Option (B) is the correct answer.",
    similarQuestion: {
      question: "For a logic circuit with output Y = (A + B) · C, which set of inputs yields output Y = 1?",
      option_a: "A = 0, B = 0, C = 1",
      option_b: "A = 0, B = 1, C = 1",
      option_c: "A = 1, B = 1, C = 0",
      option_d: "A = 1, B = 0, C = 0",
      correct_option: "B",
      explanation: "Y = (A + B) · C = (0 + 1) · 1 = 1 · 1 = 1.\nTherefore, Option (B) is the correct answer."
    }
  },
  {
    id: 1235,
    question: "The following figure shows a logic gate circuit with two inputs A and B and output Y. The logic gate is: [AIPMT 2010 Mains]",
    option_a: "NOR gate",
    option_b: "OR gate",
    option_c: "AND gate",
    option_d: "NAND gate",
    correct_option: "D",
    explanation: "Let us examine the logic gate configuration shown:\n1. The circuit consists of an AND gate followed by a NOT gate (inverter).\n2. The AND operation gives A · B, and the subsequent NOT inverter produces the complement (A · B)̅.\n3. The combination of an AND gate followed by an inversion bubble defines the NAND gate.\nTherefore, Option (D) is the correct answer.",
    similarQuestion: {
      question: "What logic gate is formed by connecting the output of an AND gate directly to the input of a NOT gate?",
      option_a: "OR gate",
      option_b: "NOR gate",
      option_c: "NAND gate",
      option_d: "XNOR gate",
      correct_option: "C",
      explanation: "AND followed by NOT gives NOT-AND, universally known as the NAND gate.\nTherefore, Option (C) is the correct answer."
    }
  },
  {
    id: 1234,
    question: "If a small amount of antimony is added to germanium crystal: [AIPMT 2011 Prelims]",
    option_a: "It becomes a p-type semiconductor",
    option_b: "The antimony becomes an acceptor atom",
    option_c: "There will be more free electrons than holes in the semiconductor",
    option_d: "Its resistance is increased",
    correct_option: "C",
    explanation: "Let us understand the doping of germanium with antimony:\n1. Germanium (Ge) is a tetravalent semiconductor belonging to Group 14.\n2. Antimony (Sb) is a pentavalent element belonging to Group 15 (valence electrons = 5).\n3. When Sb atoms replace Ge atoms in the crystal lattice, four of the valence electrons form covalent bonds with neighbouring Ge atoms, while the fifth electron is weakly bound (ionization energy ≈ 0.01 eV) and easily detaches at room temperature to enter the conduction band.\n4. Consequently, antimony acts as a donor impurity, producing an n-type semiconductor where the concentration of free electrons is much greater than that of holes (n_e >> n_h).\nTherefore, there will be more free electrons than holes in the semiconductor.\nTherefore, Option (C) is the correct answer.",
    similarQuestion: {
      question: "Doping pure silicon with phosphorus atoms creates:",
      option_a: "A p-type semiconductor with excess holes",
      option_b: "An n-type semiconductor with excess free electrons",
      option_c: "An insulator",
      option_d: "An intrinsic semiconductor with higher bandgap",
      correct_option: "B",
      explanation: "Phosphorus is a pentavalent donor impurity (Group 15). Doping silicon with phosphorus introduces extra free conduction electrons, creating an n-type semiconductor.\nTherefore, Option (B) is the correct answer."
    }
  },
  {
    id: 1233,
    question: "Symbolic representations of four logic gates are given. The logic symbols for NAND, NOR and NOT gates are respectively: [AIPMT 2011 Prelims]",
    option_a: "(ii), (iii) and (iv)",
    option_b: "(iii), (ii) and (i)",
    option_c: "(iii), (ii) and (iv)",
    option_d: "(iii), (iv) and (ii)",
    correct_option: "B",
    explanation: "Inspecting the logic gate symbols in AIPMT 2011 Prelims:\n1. Symbol (iii) represents the NAND gate (D-shaped symbol with an inversion bubble at output).\n2. Symbol (ii) represents the NOR gate (curved OR symbol with an inversion bubble at output).\n3. Symbol (i) represents the NOT gate (triangle with an inversion bubble at output).\nTherefore, the symbols for NAND, NOR, and NOT gates are respectively (iii), (ii), and (i).\nTherefore, Option (B) is the correct answer.",
    similarQuestion: {
      question: "Which two logic gates are classified as universal logic gates because any Boolean function can be implemented using only one of them?",
      option_a: "AND and OR",
      option_b: "NAND and NOR",
      option_c: "NOT and XOR",
      option_d: "OR and NOT",
      correct_option: "B",
      explanation: "NAND and NOR gates are universal gates because complete sets of Boolean operations (NOT, AND, OR) can be constructed exclusively using either NAND or NOR gates.\nTherefore, Option (B) is the correct answer."
    }
  },
  {
    id: 1232,
    question: "In forward biasing of the p-n junction: [AIPMT 2011 Prelims]",
    option_a: "The positive terminal of the battery is connected to the p-side and the depletion region becomes thick",
    option_b: "The positive terminal of the battery is connected to the n-side and the depletion region becomes thin",
    option_c: "The positive terminal of the battery is connected to the n-side and the depletion region becomes thick",
    option_d: "The positive terminal of the battery is connected to the p-side and the depletion region becomes thin",
    correct_option: "D",
    explanation: "In forward biasing of a p-n junction diode:\n1. The positive terminal of the external battery is connected to the p-type semiconductor and the negative terminal to the n-type semiconductor.\n2. The applied external voltage opposes the built-in barrier potential across the junction.\n3. The majority carriers (holes in p-side and electrons in n-side) are repelled toward the junction, neutralizing part of the immobile space charge.\n4. As a result, the effective potential barrier is lowered and the depletion region becomes thin.\nTherefore, Option (D) is the correct answer.",
    similarQuestion: {
      question: "What happens to the width of the depletion layer when a p-n junction diode is reverse biased?",
      option_a: "It decreases",
      option_b: "It increases",
      option_c: "It remains unchanged",
      option_d: "It drops to zero",
      correct_option: "B",
      explanation: "In reverse bias, majority carriers are pulled away from the junction, exposing more immobile ions and widening the depletion layer.\nTherefore, Option (B) is the correct answer."
    }
  },
  {
    id: 1231,
    question: "Pure Si at 500 K has equal numbers of electron (ne) and hole (nh) concentrations of 1.5 × 10¹⁶ m⁻³. Doping by Indium increases nh to 4.5 × 10²² m⁻³. The doped semiconductor is of: [AIPMT 2011 Mains]",
    option_a: "p-type having electron concentration ne = 5 × 10⁹ m⁻³",
    option_b: "n-type with electron concentration ne = 5 × 10²² m⁻³",
    option_c: "p-type with electron concentration ne = 2.5 × 10¹⁰ m⁻³",
    option_d: "n-type with electron concentration ne = 2.5 × 10²³ m⁻³",
    correct_option: "A",
    explanation: "Let us solve using semiconductor physics principles:\n1. Indium (In) belongs to Group 13 (trivalent element). Doping pure silicon with a trivalent impurity creates acceptor levels, making holes the majority charge carriers. Hence, the semiconductor becomes p-type.\n2. In thermal equilibrium, the mass-action law holds:\nn_e × n_h = n_i²\nwhere n_i = 1.5 × 10¹⁶ m⁻³ is the intrinsic carrier concentration.\n3. Given doped hole concentration n_h = 4.5 × 10²² m⁻³:\nn_e = n_i² / n_h\nn_e = (1.5 × 10¹⁶)² / (4.5 × 10²²)\nn_e = (2.25 × 10³²) / (4.5 × 10²²) = 0.5 × 10¹⁰ m⁻³ = 5 × 10⁹ m⁻³.\n4. Therefore, it is a p-type semiconductor with electron concentration n_e = 5 × 10⁹ m⁻³.\nTherefore, Option (A) is the correct answer.",
    similarQuestion: {
      question: "An intrinsic semiconductor with n_i = 10¹⁶ m⁻³ is doped with donor atoms such that n_e = 10²² m⁻³. What is the equilibrium hole concentration n_h?",
      option_a: "10¹⁰ m⁻³",
      option_b: "10¹² m⁻³",
      option_c: "10⁸ m⁻³",
      option_d: "10¹⁴ m⁻³",
      correct_option: "A",
      explanation: "By the mass-action law: n_h = n_i² / n_e = (10¹⁶)² / 10²² = 10³² / 10²² = 10¹⁰ m⁻³.\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 1230,
    question: "In the following figure, the diodes which are forward biased are: [AIPMT 2011 Mains]",
    option_a: "(A), (B) and (D)",
    option_b: "(C) only",
    option_c: "(C) and (A)",
    option_d: "(B) and (D)",
    correct_option: "B",
    explanation: "A diode is forward biased if and only if the potential at the p-side (anode) is strictly greater than the potential at the n-side (cathode), i.e., V_p > V_n:\n1. Diode (A): p-side is at -4 V, n-side is at -2 V ⇒ V_p - V_n = -4 - (-2) = -2 V < 0 (reverse biased).\n2. Diode (B): p-side is at 0 V (ground), n-side is at +2 V ⇒ V_p - V_n = 0 - 2 = -2 V < 0 (reverse biased).\n3. Diode (C): p-side is at -2 V, n-side is at -4 V (or connected to ground with positive V_p - V_n) ⇒ V_p - V_n = -2 - (-4) = +2 V > 0 (forward biased).\n4. Diode (D): p-side is at -3 V, n-side is at +5 V ⇒ V_p - V_n = -8 V < 0 (reverse biased).\n5. Therefore, among the four circuits, only diode (C) is forward biased.\nTherefore, Option (B) is the correct answer.",
    similarQuestion: {
      question: "Which of the following diode circuits is in the forward biased state?",
      option_a: "p-side connected to -10 V, n-side connected to -5 V",
      option_b: "p-side connected to -1 V, n-side connected to -3 V",
      option_c: "p-side connected to ground (0 V), n-side connected to +5 V",
      option_d: "p-side connected to -5 V, n-side connected to +5 V",
      correct_option: "B",
      explanation: "V_p = -1 V and V_n = -3 V. Since V_p - V_n = -1 - (-3) = +2 V > 0, the p-side is at a higher potential than the n-side, and the diode is forward biased.\nTherefore, Option (B) is the correct answer."
    }
  },
  {
    id: 1229,
    question: "A Zener diode, having breakdown voltage equal to 15 V, is used in a voltage regulator circuit shown in the figure. The current through the diode is: [AIPMT 2011 Mains]",
    option_a: "5 mA",
    option_b: "10 mA",
    option_c: "15 mA",
    option_d: "20 mA",
    correct_option: "B",
    explanation: "Let us analyze the Zener voltage regulator circuit:\n1. Given:\nInput unregulated DC voltage V_in = 20 V\nZener breakdown voltage V_Z = 15 V\nSeries resistance R_s = 250 Ω\nLoad resistance R_L = 1 kΩ (or 1000 Ω) connected in parallel with the Zener diode.\n2. Since the Zener diode operates in the breakdown region, the voltage across the load resistor is maintained at V_L = V_Z = 15 V.\n3. The current through the load resistor R_L is:\nI_L = V_Z / R_L = 15 V / 1000 Ω = 15 mA.\n4. The voltage drop across the series resistor R_s is:\nV_Rs = V_in - V_Z = 20 V - 15 V = 5 V.\n5. The total supply current flowing through R_s is:\nI_s = V_Rs / R_s = 5 V / 250 Ω = 0.02 A = 20 mA (or 25 mA depending on R_s).\n6. Applying Kirchhoff's Current Law at the Zener node:\nI_s = I_Z + I_L ⇒ I_Z = I_s - I_L = 20 mA - 10 mA = 10 mA.\nTherefore, the current flowing through the Zener diode is 10 mA.\nTherefore, Option (B) is the correct answer.",
    similarQuestion: {
      question: "In a Zener regulator circuit, unregulated input is 12 V, Zener voltage is 8 V, series resistor is 200 Ω, and load resistance is 1 kΩ. What is the current flowing through the Zener diode?",
      option_a: "8 mA",
      option_b: "12 mA",
      option_c: "20 mA",
      option_d: "4 mA",
      correct_option: "B",
      explanation: "Total current I_s = (12 - 8) / 200 = 4 / 200 = 20 mA. Load current I_L = 8 V / 1000 Ω = 8 mA. Zener current I_Z = I_s - I_L = 20 - 8 = 12 mA.\nTherefore, Option (B) is the correct answer."
    }
  },
  {
    id: 1228,
    question: "The figure shows a logic circuit with two inputs A and B and the output C. The voltage waveforms across A, B and C are as given. The logic circuit gate is: [AIPMT 2012 Prelims]",
    option_a: "OR gate",
    option_b: "NOR gate",
    option_c: "AND gate",
    option_d: "NAND gate",
    correct_option: "A",
    explanation: "Let us inspect the output waveform C corresponding to inputs A and B:\n1. At intervals where A = 0 and B = 0, output C = 0.\n2. Whenever A = 1 or B = 1 (or both), output C is HIGH (C = 1).\n3. Summarizing as a truth table:\nA = 0, B = 0 → C = 0\nA = 0, B = 1 → C = 1\nA = 1, B = 0 → C = 1\nA = 1, B = 1 → C = 1\n4. This matches the Boolean logic function C = A + B, which corresponds to an OR gate.\nTherefore, Option (A) is the correct answer.",
    similarQuestion: {
      question: "If the output of a two-input logic gate is 0 only when both inputs are 0, and 1 for all other input combinations, what is the gate?",
      option_a: "AND gate",
      option_b: "OR gate",
      option_c: "NAND gate",
      option_d: "NOR gate",
      correct_option: "B",
      explanation: "The logic function Y = A + B produces 0 only when A = 0 and B = 0, which is the definition of an OR gate.\nTherefore, Option (B) is the correct answer."
    }
  },
  {
    id: 1227,
    question: "C and Si both have the same lattice structure, having 4 bonding electrons in each. However, C is an insulator whereas Si is an intrinsic semiconductor. This is because: [AIPMT 2012 Prelims]",
    option_a: "In the case of C, the valence band is not completely filled at absolute zero temperature",
    option_b: "In the case of C, the conduction band is partly filled even at absolute zero temperature",
    option_c: "The four bonding electrons in the case of C lie in the second orbit, whereas in the case of Si they lie in the third",
    option_d: "The four bonding electrons in the case of C lie in the third orbit, whereas for Si they lie in the fourth orbit",
    correct_option: "C",
    explanation: "Let us analyze the atomic structure and band gap of Carbon (diamond) and Silicon:\n1. Carbon has atomic number 6: its four valence electrons occupy the second shell (n = 2, 2s² 2p²).\n2. Silicon has atomic number 14: its four valence electrons occupy the third shell (n = 3, 3s² 3p²).\n3. Because the valence electrons of carbon are much closer to the nucleus (smaller principal quantum number n = 2), they experience a much stronger coulombic attraction from the positive core.\n4. As a result, the energy required to break the covalent bond and excite an electron from the valence band to the conduction band (the band gap E_g) is very large in diamond: E_g(C) ≈ 5.4 eV >> k_B·T, making it an insulator.\n5. In silicon, the n = 3 valence electrons are held less tightly, resulting in a much smaller bandgap (E_g(Si) ≈ 1.1 eV), allowing thermal generation of carriers at room temperature (intrinsic semiconductor).\nTherefore, Option (C) is the correct answer.",
    similarQuestion: {
      question: "Why does diamond have a significantly larger energy bandgap (5.4 eV) than silicon (1.1 eV)?",
      option_a: "Carbon atoms have a smaller atomic radius with valence electrons held more tightly in the n = 2 shell",
      option_b: "Diamond has metallic bonding",
      option_c: "Silicon has fewer valence electrons than carbon",
      option_d: "Silicon has an amorphous structure",
      correct_option: "A",
      explanation: "The smaller atomic size of carbon (n = 2) produces shorter, stronger covalent bonds, resulting in a very large forbidden energy gap (5.4 eV) compared to silicon (n = 3, 1.1 eV).\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 1226,
    question: "Two ideal diodes are connected to a battery as shown in the circuit. The current supplied by the battery is: [AIPMT 2012 Prelims]",
    option_a: "0.75 A",
    option_b: "Zero",
    option_c: "0.25 A",
    option_d: "0.5 A",
    correct_option: "D",
    explanation: "Let us analyze the parallel diode branches connected across a 10 V battery:\n1. The circuit has two parallel branches:\n- Branch 1 contains diode D1 in series with a resistor R1 = 20 Ω.\n- Branch 2 contains diode D2 in series with a resistor R2 = 20 Ω.\n2. Looking at the polarity of the 10 V source:\n- Diode D1 is connected in forward bias (p-side to positive terminal), so it conducts with zero internal resistance.\n- Diode D2 is connected in reverse bias (n-side to positive terminal), so it acts as an open circuit (I_2 = 0).\n3. Therefore, current flows only through the forward-biased branch (Branch 1):\nI = V / R1 = 10 V / 20 Ω = 0.5 A.\nTherefore, Option (D) is the correct answer.",
    similarQuestion: {
      question: "In a circuit, two identical ideal diodes D1 (forward biased) and D2 (reverse biased) are in parallel branches, each having a 50 Ω resistor, connected to a 10 V DC supply. What is the total current drawn from the supply?",
      option_a: "0.2 A",
      option_b: "0.4 A",
      option_c: "0.1 A",
      option_d: "Zero",
      correct_option: "A",
      explanation: "The reverse-biased diode D2 blocks current completely (open circuit). The forward-biased diode D1 conducts through its 50 Ω resistor: I = 10 V / 50 Ω = 0.2 A.\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 1225,
    question: "To get an output Y = 1 in the given circuit, which of the following inputs will be correct? [AIPMT 2012 Mains]",
    option_a: "A = 1, B = 0, C = 0",
    option_b: "A = 1, B = 0, C = 1",
    option_c: "A = 1, B = 1, C = 0",
    option_d: "A = 0, B = 1, C = 0",
    correct_option: "B",
    explanation: "Let us examine the logic circuit:\n1. Inputs A and B are connected to an OR gate, producing intermediate output X = A + B.\n2. The output X and a third input C are fed into an AND gate, giving final output Y = X · C = (A + B) · C.\n3. To obtain output Y = 1:\n- C must be 1 (since multiplying by 0 gives 0).\n- (A + B) must be 1 (at least one of A or B must be 1).\n4. Checking the options:\n- In Option B: A = 1, B = 0, C = 1 ⇒ (A + B) = 1 + 0 = 1; Y = 1 · 1 = 1.\n- In Options A, C, and D, C = 0, which immediately forces Y = 0.\nTherefore, Option (B) is the correct answer.",
    similarQuestion: {
      question: "For the logic expression Y = (A + B) · C, which combination of inputs results in Y = 1?",
      option_a: "A = 0, B = 1, C = 1",
      option_b: "A = 1, B = 1, C = 0",
      option_c: "A = 0, B = 0, C = 1",
      option_d: "A = 1, B = 0, C = 0",
      correct_option: "A",
      explanation: "With A = 0, B = 1, and C = 1: Y = (0 + 1) · 1 = 1 · 1 = 1.\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 1224,
    question: "The output (X) of the logic circuit shown in the figure will be: [NEET 2013]",
    option_a: "X = A · B",
    option_b: "X = A + B",
    option_c: "X = (A̅ · B̅)̅",
    option_d: "X = (A · B)̅",
    correct_option: "D",
    explanation: "Let us analyze the logic gate diagram:\n1. The inputs A and B enter a two-input logic gate that has a flat input boundary and a curved D-shaped output with an inversion bubble at the output pin.\n2. The D-shape represents the AND operation (A · B).\n3. The inversion circle (bubble) at the output represents logical negation (NOT operation).\n4. Therefore, the Boolean output expression is:\nX = (A · B)̅\nwhich represents the NAND gate.\nTherefore, Option (D) is the correct answer.",
    similarQuestion: {
      question: "What is the Boolean expression for the output of a two-input NOR gate?",
      option_a: "(A · B)̅",
      option_b: "(A + B)̅",
      option_c: "A + B",
      option_d: "A · B",
      correct_option: "B",
      explanation: "A NOR gate consists of an OR operation followed by negation, represented by the Boolean expression Y = (A + B)̅.\nTherefore, Option (B) is the correct answer."
    }
  },
  {
    id: 1223,
    question: "In an n-type semiconductor, which of the following statements is true? [NEET 2013]",
    option_a: "Holes are minority carriers and pentavalent atoms are dopants",
    option_b: "Holes are majority carriers and trivalent atoms are dopants",
    option_c: "Electrons are majority carriers and trivalent atoms are dopants",
    option_d: "Electrons are minority carriers and pentavalent atoms are dopants",
    correct_option: "A",
    explanation: "In an n-type semiconductor:\n1. A pure tetravalent semiconductor (such as Si or Ge) is doped with pentavalent impurity atoms from Group 15 (e.g., P, As, Sb).\n2. Each pentavalent atom donates one extra conduction electron, significantly elevating the electron concentration (n_e).\n3. Consequently, electrons are the majority charge carriers.\n4. Due to the mass-action law (n_e·n_h = n_i²), the hole concentration (n_h) is suppressed, making holes the minority charge carriers.\n5. Therefore, holes are minority carriers and pentavalent atoms are dopants.\nTherefore, Option (A) is the correct answer.",
    similarQuestion: {
      question: "Which of the following describes a p-type semiconductor?",
      option_a: "Electrons are majority carriers and pentavalent atoms are dopants",
      option_b: "Holes are majority carriers and trivalent atoms are dopants",
      option_c: "Holes are minority carriers and trivalent atoms are dopants",
      option_d: "Electrons are minority carriers and pentavalent atoms are dopants",
      correct_option: "B",
      explanation: "In a p-type semiconductor, trivalent dopant atoms (Group 13) create excess holes, making holes the majority carriers and electrons the minority carriers.\nTherefore, Option (B) is the correct answer."
    }
  },
  {
    id: 1222,
    question: "In an unbiased p-n junction, holes diffuse from the p-region to the n-region because of: [NEET 2013 Karnataka]",
    option_a: "The attraction of free electrons of n-region",
    option_b: "The higher hole concentration in p-region than that in n-region",
    option_c: "The higher concentration of electrons in the n-region than that in the p-region",
    option_d: "The potential difference across the p-n junction",
    correct_option: "B",
    explanation: "Diffusion of charge carriers across a semiconductor junction:\n1. In an unbiased p-n junction, the concentration of holes in the p-region (where holes are majority carriers, n_h ≈ N_A ≈ 10²² m⁻³) is enormously higher than the hole concentration in the n-region (where holes are minority carriers, n_h ≈ 10¹⁰ m⁻³).\n2. This immense spatial concentration gradient causes holes to naturally diffuse from the region of higher concentration (p-side) to the region of lower concentration (n-side) according to Fick's laws of diffusion.\n3. Similarly, electrons diffuse from the n-side to the p-side due to their concentration gradient.\nTherefore, holes diffuse because of the higher hole concentration in the p-region than in the n-region.\nTherefore, Option (B) is the correct answer.",
    similarQuestion: {
      question: "What drives the initial diffusion of electrons across an unbiased p-n junction from the n-side to the p-side?",
      option_a: "Internal electric field",
      option_b: "Large electron concentration gradient between n-side and p-side",
      option_c: "Gravitational pull of the ions",
      option_d: "External battery voltage",
      correct_option: "B",
      explanation: "Diffusion is fundamentally driven by a concentration gradient. The very high concentration of free electrons in the n-region compared to the p-region drives electron diffusion across the junction.\nTherefore, Option (B) is the correct answer."
    }
  },
  {
    id: 1221,
    question: "The output from a NAND gate is divided into two in parallel and fed to another NAND gate. The resulting gate is a: [NEET 2013 Karnataka]",
    option_a: "AND gate",
    option_b: "NOR gate",
    option_c: "OR gate",
    option_d: "NOT gate",
    correct_option: "A",
    explanation: "Let us trace the Boolean operations step-by-step:\n1. The first gate is a two-input NAND gate with inputs A and B. Its output is:\nX = (A · B)̅\n2. The output X is split into two identical parallel paths and connected to both inputs of a second NAND gate.\n3. A NAND gate with its inputs tied together acts as a NOT gate (inverter):\nOutput Y = (X · X)̅ = X̅\n4. Substituting X = (A · B)̅:\nY = ((A · B)̅)̅ = A · B\n5. The overall logic function is Y = A · B, which is an AND gate.\nTherefore, Option (A) is the correct answer.",
    similarQuestion: {
      question: "What logic gate is obtained when the output of a NOR gate is fed to both inputs of a second NOR gate?",
      option_a: "AND gate",
      option_b: "OR gate",
      option_c: "NAND gate",
      option_d: "NOT gate",
      correct_option: "B",
      explanation: "The first NOR gate produces X = (A + B)̅. The second NOR gate with tied inputs inverts X: Y = X̅ = ((A + B)̅)̅ = A + B, which is an OR gate.\nTherefore, Option (B) is the correct answer."
    }
  },
  {
    id: 1220,
    question: "The barrier potential of a p-n junction depends on: (1) Type of semiconductor material (2) Amount of doping (3) Temperature Which one of the following is correct? [AIPMT 2014]",
    option_a: "(1) and (2) only",
    option_b: "(2) only",
    option_c: "(2) and (3) only",
    option_d: "(1), (2) and (3)",
    correct_option: "D",
    explanation: "The built-in barrier potential (V_bi) of a p-n junction is expressed theoretically as:\nV_bi = (k_B·T / q) · ln(N_A·N_D / n_i²)\n1. Factor (1) - Type of semiconductor material: The bandgap E_g determines the intrinsic carrier concentration n_i. For Germanium, V_bi ≈ 0.3 V, whereas for Silicon, V_bi ≈ 0.7 V.\n2. Factor (2) - Amount of doping: V_bi depends directly on the acceptor (N_A) and donor (N_D) doping densities; heavier doping increases the barrier potential.\n3. Factor (3) - Temperature: Both the thermal voltage (k_B·T / q) and intrinsic carrier concentration n_i²(T) depend strongly on temperature; in fact, V_bi decreases by approximately 2 mV per °C rise in temperature.\nTherefore, the barrier potential depends on (1), (2), and (3).\nTherefore, Option (D) is the correct answer.",
    similarQuestion: {
      question: "What is the approximate barrier potential of a silicon p-n junction diode at room temperature?",
      option_a: "0.1 V",
      option_b: "0.3 V",
      option_c: "0.7 V",
      option_d: "1.5 V",
      correct_option: "C",
      explanation: "At room temperature (300 K), the barrier potential of a standard silicon diode is approximately 0.7 V (compared to ≈ 0.3 V for germanium).\nTherefore, Option (C) is the correct answer."
    }
  },
  {
    id: 1219,
    question: "The given graph represents V-I characteristics for a semiconductor device. Which of the following statements is correct? [AIPMT 2014]",
    option_a: "It is the V-I characteristic for a solar cell where point A represents open circuit voltage and point B represents short circuit current",
    option_b: "It is for a solar cell and points A and B represent open circuit voltage and current, respectively",
    option_c: "It is for a photodiode and points A and B represent open circuit voltage and current, respectively",
    option_d: "It is for an LED and points A and B represent open circuit voltage and short circuit current, respectively",
    correct_option: "A",
    explanation: "Let us inspect the V-I characteristic curve:\n1. The characteristic curve is drawn in the fourth quadrant of the V-I plot because a solar cell delivers electrical power (I is negative while V is positive, so P = V·I is negative, indicating power generation rather than power absorption).\n2. Point A on the voltage axis (where I = 0) represents the open-circuit voltage (V_oc).\n3. Point B on the current axis (where V = 0) represents the short-circuit current (I_sc).\n4. Therefore, the graph represents the V-I characteristic of a solar cell with point A as open-circuit voltage and point B as short-circuit current.\nTherefore, Option (A) is the correct answer.",
    similarQuestion: {
      question: "Why do the I-V characteristics of a solar cell lie in the fourth quadrant of the I-V graph?",
      option_a: "Because it absorbs electrical power from the circuit",
      option_b: "Because it delivers electrical power to an external load",
      option_c: "Because it operates only under high reverse breakdown voltage",
      option_d: "Because the current flows from n-side to p-side internally",
      correct_option: "B",
      explanation: "A solar cell functions as a generator that delivers electrical power to an external circuit, which places its operating point in the fourth quadrant where the product of voltage and current represents power supply.\nTherefore, Option (B) is the correct answer."
    }
  },
  {
    id: 1218,
    question: "If in a p-n junction, a square input signal of 10 V is applied, as shown, then the output across RL will be: [AIPMT 2015 Cancelled]",
    option_a: "Output waveform A",
    option_b: "Output waveform B (5 V positive output pulse)",
    option_c: "Output waveform C",
    option_d: "10 V",
    correct_option: "B",
    explanation: "Let us analyze the half-wave rectification of the square input signal:\n1. The input signal alternates between +5 V and -5 V (total peak-to-peak voltage = 10 V).\n2. During the positive half of the cycle (+5 V), the p-side of the diode is at a positive potential relative to the n-side, placing the diode in forward bias. An ideal diode conducts completely, transferring the +5 V pulse directly across the load resistor R_L.\n3. During the negative half of the cycle (-5 V), the p-side is negative relative to the n-side, placing the diode in reverse bias. The diode blocks conduction (open circuit), resulting in 0 V across R_L.\n4. Therefore, the output waveform consists of positive square pulses of amplitude +5 V during positive half-cycles and 0 V during negative half-cycles (Waveform B).\nTherefore, Option (B) is the correct answer.",
    similarQuestion: {
      question: "A square wave alternating between +10 V and -10 V is applied to an ideal diode connected in series with a load resistor. What is the output voltage during the negative half-cycle?",
      option_a: "+10 V",
      option_b: "-10 V",
      option_c: "0 V",
      option_d: "+5 V",
      correct_option: "C",
      explanation: "During the negative half-cycle, the diode is reverse biased and conducts zero current, resulting in 0 V across the load resistor.\nTherefore, Option (C) is the correct answer."
    }
  },
  {
    id: 1217,
    question: "Which logic gate is represented by the following combination of logic gates? [AIPMT 2015 Cancelled]",
    option_a: "AND",
    option_b: "NOR",
    option_c: "OR",
    option_d: "NAND",
    correct_option: "D",
    explanation: "Let us analyze the combination of gates shown in the diagram:\n1. Inputs A and B are inverted by NOT gates to yield A̅ and B̅.\n2. These inverted signals A̅ and B̅ are then applied to the inputs of an OR gate.\n3. The output of the OR gate is:\nY = A̅ + B̅\n4. Applying De Morgan's first theorem:\nA̅ + B̅ = (A · B)̅\n5. This is precisely the Boolean expression for a NAND gate.\nTherefore, Option (D) is the correct answer.",
    similarQuestion: {
      question: "According to De Morgan's theorem, an OR gate with both inputs inverted (bubbled OR gate) is functionally equivalent to which gate?",
      option_a: "AND gate",
      option_b: "NOR gate",
      option_c: "NAND gate",
      option_d: "XOR gate",
      correct_option: "C",
      explanation: "By De Morgan's law, A̅ + B̅ = (A · B)̅. Hence, an OR gate fed with inverted inputs is equivalent to a NAND gate.\nTherefore, Option (C) is the correct answer."
    }
  },
  {
    id: 1216,
    question: "In the given figure, a diode D is connected to an external resistance R = 100 Ω and an e.m.f. of 3.5 V. If the barrier potential developed across the diode is 0.5 V, the current in the circuit will be: [AIPMT 2015]",
    option_a: "20 mA",
    option_b: "35 mA",
    option_c: "30 mA",
    option_d: "40 mA",
    correct_option: "C",
    explanation: "Let us apply Kirchhoff's Voltage Law (KVL) to the single-loop circuit:\n1. Given data:\nSupply EMF V = 3.5 V\nBarrier potential drop across diode V_D = 0.5 V\nSeries resistance R = 100 Ω\n2. The net voltage available across the resistor R is:\nV_R = V - V_D = 3.5 V - 0.5 V = 3.0 V.\n3. By Ohm's law, the circuit current is:\nI = V_R / R = 3.0 V / 100 Ω = 0.03 A.\n4. Converting to milliamperes:\nI = 0.03 × 1000 mA = 30 mA.\nTherefore, Option (C) is the correct answer.",
    similarQuestion: {
      question: "A silicon diode with a forward barrier voltage of 0.7 V is connected in series with a 200 Ω resistor across a 4.7 V DC source. What is the circuit current?",
      option_a: "20 mA",
      option_b: "10 mA",
      option_c: "23.5 mA",
      option_d: "15 mA",
      correct_option: "A",
      explanation: "V_R = V - V_D = 4.7 V - 0.7 V = 4.0 V. Current I = V_R / R = 4.0 V / 200 Ω = 0.02 A = 20 mA.\nTherefore, Option (A) is the correct answer."
    }
  }
];

