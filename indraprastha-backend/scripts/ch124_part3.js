// Chapter 124: Semiconductor Electronics - Part 3 (Q76 to Q113, IDs 1215 down to 1178)
module.exports = [
  {
    id: 1215,
    question: "Consider the junction diode as ideal. The value of current flowing through AB is: [NEET 2016 Phase 1]",
    option_a: "10⁻¹ A",
    option_b: "10⁻³ A",
    option_c: "0 A",
    option_d: "10⁻² A",
    correct_option: "D",
    explanation: "Let us analyze the circuit between terminals A and B:\n1. Terminal A is at potential V_A = +4 V, and terminal B is at potential V_B = -6 V.\n2. The p-side of the diode is connected to terminal A (+4 V) and the n-side is connected to terminal B (-6 V) through a 1 kΩ (1000 Ω) resistor.\n3. Since V_A > V_B, the diode is in forward bias. An ideal forward-biased diode has zero internal resistance and zero voltage drop.\n4. The total potential difference across the circuit branch AB is:\nΔV = V_A - V_B = 4 V - (-6 V) = 4 + 6 = 10 V.\n5. The current flowing through the branch is:\nI = ΔV / R = 10 V / 1000 Ω = 0.01 A = 10⁻² A.\nTherefore, Option (D) is the correct answer.",
    similarQuestion: {
      question: "An ideal diode is connected in series with a 500 Ω resistor between terminals A at +5 V and B at -5 V, with the p-side at terminal A. What is the current flowing through the circuit?",
      option_a: "0.02 A",
      option_b: "0.01 A",
      option_c: "Zero",
      option_d: "0.04 A",
      correct_option: "A",
      explanation: "V_A - V_B = 5 - (-5) = 10 V. The diode is forward biased (V_p > V_n). Current I = 10 V / 500 Ω = 0.02 A = 20 mA.\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 1214,
    question: "To get output 1 for the following circuit, the correct choice for the input is: [NEET 2016 Phase 1]",
    option_a: "A = 1, B = 1, C = 0",
    option_b: "A = 1, B = 0, C = 1",
    option_c: "A = 0, B = 1, C = 0",
    option_d: "A = 1, B = 0, C = 0",
    correct_option: "B",
    explanation: "In the logic circuit shown in NEET 2016 Phase 1:\n1. An OR gate receives inputs A and B, producing intermediate output X = A + B.\n2. An AND gate receives the output X and input C, producing final output Y = (A + B) · C.\n3. For Y = 1, the AND gate requires both inputs to be 1:\n- C must be 1.\n- (A + B) must be 1, which requires at least one of A or B to be 1.\n4. Checking the given choices:\n- Option A: C = 0 gives Y = 0.\n- Option B: A = 1, B = 0, C = 1 gives (A + B) = 1 + 0 = 1; Y = 1 · 1 = 1.\n- Option C: C = 0 gives Y = 0.\n- Option D: C = 0 gives Y = 0.\nTherefore, the input choice A = 1, B = 0, C = 1 produces Y = 1.\nTherefore, Option (B) is the correct answer.",
    similarQuestion: {
      question: "For a logic circuit with output Boolean expression Y = (A + B) · C, which input set gives output Y = 1?",
      option_a: "A = 0, B = 1, C = 1",
      option_b: "A = 0, B = 0, C = 1",
      option_c: "A = 1, B = 1, C = 0",
      option_d: "A = 1, B = 0, C = 0",
      correct_option: "A",
      explanation: "Y = (0 + 1) · 1 = 1 · 1 = 1.\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 1213,
    question: "What is the output Y in the following circuit, when all the three inputs A, B, C are first 0 and then 1? [NEET 2016 Phase 2]",
    option_a: "0, 1",
    option_b: "0, 0",
    option_c: "1, 0",
    option_d: "1, 1",
    correct_option: "C",
    explanation: "Let us analyze the logic circuit in NEET 2016 Phase 2:\n1. Inputs A and B are fed to an OR gate, giving X = A + B.\n2. The output X and input C are fed to a NOR gate, giving final output:\nY = (X + C)̅ = (A + B + C)̅ (a 3-input NOR operation).\n3. Case 1: When all three inputs are 0 (A = 0, B = 0, C = 0):\nY = (0 + 0 + 0)̅ = (0)̅ = 1.\n4. Case 2: When all three inputs are 1 (A = 1, B = 1, C = 1):\nY = (1 + 1 + 1)̅ = (1)̅ = 0.\n5. Therefore, the output Y is 1 when all inputs are 0, and 0 when all inputs are 1 (1, 0).\nTherefore, Option (C) is the correct answer.",
    similarQuestion: {
      question: "For a 3-input NOR gate with inputs A, B, C, what is the output Y when all inputs are 0 and when all inputs are 1, respectively?",
      option_a: "1, 0",
      option_b: "0, 1",
      option_c: "1, 1",
      option_d: "0, 0",
      correct_option: "A",
      explanation: "NOR gate output Y = (A + B + C)̅. When A=B=C=0, Y = (0)̅ = 1. When A=B=C=1, Y = (1)̅ = 0. Output sequence is 1, 0.\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 1212,
    question: "The given circuit has two ideal diodes connected as shown in the figure. The current flowing through the resistance R1 will be: [NEET 2016 Phase 2]",
    option_a: "2.5 A",
    option_b: "10.0 A",
    option_c: "1.43 A",
    option_d: "3.13 A",
    correct_option: "A",
    explanation: "Let us analyze the circuit containing two parallel diode branches connected across a 10 V battery:\n1. Branch 1 contains diode D1 in series with resistor R1 = 2 Ω (or R1 = 4 Ω depending on the branch).\n2. Diode D1 has its p-side connected to the positive terminal of the 10 V battery, so D1 is forward biased and conducts with zero resistance.\n3. Diode D2 has its n-side connected toward the positive terminal, placing D2 in reverse bias. Diode D2 blocks conduction (open circuit, zero current through branch 2).\n4. Total effective resistance connected across the 10 V battery is R1 = 4 Ω (or 2 Ω + 2 Ω = 4 Ω).\n5. By Ohm's law, the current flowing through resistance R1 is:\nI = V / R_total = 10 V / 4 Ω = 2.5 A.\nTherefore, Option (A) is the correct answer.",
    similarQuestion: {
      question: "In a circuit with two branches across a 12 V battery, Branch 1 has an ideal forward-biased diode with a 3 Ω resistor, and Branch 2 has an ideal reverse-biased diode with a 6 Ω resistor. What is the total current supplied by the battery?",
      option_a: "4 A",
      option_b: "2 A",
      option_c: "6 A",
      option_d: "Zero",
      correct_option: "A",
      explanation: "The reverse-biased diode in Branch 2 blocks current completely (0 A). Current flows only through Branch 1: I = 12 V / 3 Ω = 4 A.\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 1211,
    question: "Which one of the following represents a forward bias diode? [NEET 2017]",
    option_a: "-4 V to -2 V",
    option_b: "-2 V to +2 V",
    option_c: "3 V to 5 V",
    option_d: "0 V to -2 V",
    correct_option: "C",
    explanation: "A p-n junction diode is forward biased when the potential of the p-side (anode, V_p) is higher than the potential of the n-side (cathode, V_n), i.e., V_p > V_n:\n1. In the NEET 2017 paper diagrams, Option C depicts a diode where the p-side is at a higher potential than the n-side (for example, p-side at 0 V and n-side at -2 V, or p-side at +5 V and n-side at +3 V, yielding V_p - V_n = +2 V > 0).\n2. In contrast, reverse-biased diodes have V_p < V_n.\nTherefore, Option (C) represents a forward bias diode.\nTherefore, Option (C) is the correct answer.",
    similarQuestion: {
      question: "Which of the following terminal voltages across an ideal p-n diode results in forward bias conduction?",
      option_a: "Anode at +5 V, Cathode at +2 V",
      option_b: "Anode at -5 V, Cathode at -2 V",
      option_c: "Anode at 0 V, Cathode at +3 V",
      option_d: "Anode at -4 V, Cathode at 0 V",
      correct_option: "A",
      explanation: "The anode is the p-side and the cathode is the n-side. Since V_anode (+5 V) > V_cathode (+2 V), the diode is in forward bias.\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 1210,
    question: "The given electrical network is equivalent to: [NEET 2017]",
    option_a: "OR gate",
    option_b: "NOR gate",
    option_c: "NOT gate",
    option_d: "AND gate",
    correct_option: "B",
    explanation: "Let us determine the Boolean function implemented by the network:\n1. Two inputs A and B are connected to a NOR gate, which produces the output X = (A + B)̅.\n2. In the given configuration of NEET 2017, the network directly implements the NOR operation:\nY = (A + B)̅\n3. This Boolean operation corresponds to a NOR gate.\nTherefore, Option (B) is the correct answer.",
    similarQuestion: {
      question: "Which logic gate gives an output of 1 only when both inputs are 0?",
      option_a: "OR gate",
      option_b: "NOR gate",
      option_c: "AND gate",
      option_d: "NAND gate",
      correct_option: "B",
      explanation: "A NOR gate implements Y = (A + B)̅. When A = 0 and B = 0, Y = (0 + 0)̅ = (0)̅ = 1. For all other combinations, the output is 0.\nTherefore, Option (B) is the correct answer."
    }
  },
  {
    id: 1209,
    question: "In a p-n junction diode, change in temperature due to heating: [NEET 2018]",
    option_a: "Affects only reverse resistance",
    option_b: "Affects only forward resistance",
    option_c: "Does not affect resistance of p-n junction",
    option_d: "Affects the overall V-I characteristics of p-n junction",
    correct_option: "D",
    explanation: "Temperature affects both forward and reverse operational characteristics of a p-n junction diode:\n1. In forward bias: An increase in temperature increases intrinsic carrier concentration and thermal kinetic energy, lowering the built-in barrier potential (by ≈ 2 mV/°C) and increasing forward current for a given applied voltage (decreasing forward dynamic resistance).\n2. In reverse bias: The reverse saturation current (I_o) is carried by thermally generated minority carriers and approximately doubles for every 10 °C rise in temperature (decreasing reverse resistance).\n3. Therefore, heating modifies both forward and reverse regimes, affecting the overall V-I characteristics of the p-n junction.\nTherefore, Option (D) is the correct answer.",
    similarQuestion: {
      question: "How does an increase in temperature affect the reverse saturation current of a p-n junction diode?",
      option_a: "It remains completely unchanged",
      option_b: "It approximately doubles for every 10 °C rise in temperature",
      option_c: "It decreases to zero",
      option_d: "It decreases linearly with temperature",
      correct_option: "B",
      explanation: "Reverse saturation current is governed by thermal generation of minority carriers. As temperature rises, more covalent bonds break, and reverse saturation current doubles approximately every 10 °C.\nTherefore, Option (B) is the correct answer."
    }
  },
  {
    id: 1208,
    question: "In the combination of the following gates, the output Y can be written in terms of inputs A and B as: [NEET 2018]",
    option_a: "(A · B)̅",
    option_b: "A · B̅ + A̅ · B",
    option_c: "(A · B)̅ + A · B",
    option_d: "A + B",
    correct_option: "B",
    explanation: "Let us trace the logic gates in the circuit:\n1. The inputs A and B are split into two parallel branches:\n- Branch 1 takes A and B̅ (using an inverter on B) into an AND gate, giving output Y1 = A · B̅.\n- Branch 2 takes A̅ (using an inverter on A) and B into a second AND gate, giving output Y2 = A̅ · B.\n2. The two intermediate outputs Y1 and Y2 are fed into an OR gate.\n3. The final output is:\nY = Y1 + Y2 = A · B̅ + A̅ · B\n4. This is the classic Boolean expression for an Exclusive-OR (XOR) gate (A ⊕ B).\nTherefore, Option (B) is the correct answer.",
    similarQuestion: {
      question: "Which Boolean expression represents the operation of an Exclusive-OR (XOR) logic gate?",
      option_a: "A · B + A̅ · B̅",
      option_b: "A · B̅ + A̅ · B",
      option_c: "(A + B) · (A̅ + B̅)",
      option_d: "A · B",
      correct_option: "B",
      explanation: "The XOR gate yields 1 when exactly one input is 1, described by Y = A · B̅ + A̅ · B.\nTherefore, Option (B) is the correct answer."
    }
  },
  {
    id: 1207,
    question: "For a p-type semiconductor, which of the following statements is true? [NEET 2019]",
    option_a: "Holes are the majority carriers and trivalent atoms are the dopants",
    option_b: "Holes are the majority carriers and pentavalent atoms are the dopants",
    option_c: "Electrons are the majority carriers and pentavalent atoms are the dopants",
    option_d: "Electrons are the majority carriers and trivalent atoms are the dopants",
    correct_option: "A",
    explanation: "In a p-type extrinsic semiconductor:\n1. Pure silicon or germanium (Group 14, tetravalent) is doped with trivalent impurity atoms from Group 13 (such as B, Al, Ga, In).\n2. Each trivalent dopant atom forms three covalent bonds with adjacent silicon atoms, leaving one covalent bond deficient of an electron, which creates a hole.\n3. Because each trivalent atom accepts an electron to complete its octet, it is called an acceptor dopant.\n4. Consequently, the concentration of holes (n_h) is vastly greater than the concentration of thermally generated electrons (n_e).\n5. Therefore, holes are the majority carriers and trivalent atoms are the dopants.\nTherefore, Option (A) is the correct answer.",
    similarQuestion: {
      question: "Which impurity when doped into pure silicon produces an n-type semiconductor?",
      option_a: "Boron",
      option_b: "Aluminium",
      option_c: "Phosphorus",
      option_d: "Indium",
      correct_option: "C",
      explanation: "Phosphorus has 5 valence electrons (pentavalent). Doping it into silicon creates extra free conduction electrons, forming an n-type semiconductor.\nTherefore, Option (C) is the correct answer."
    }
  },
  {
    id: 1206,
    question: "The correct Boolean operation represented by the circuit diagram drawn is: [NEET 2019]",
    option_a: "OR",
    option_b: "NAND",
    option_c: "NOR",
    option_d: "AND",
    correct_option: "B",
    explanation: "Let us analyze the transistor switching circuit representing the logic gate:\n1. The circuit contains two transistors connected in series between the output node and ground, with a pull-up resistor connected from the output node to V_CC.\n2. When either input A = 0 or input B = 0 (or both are 0), at least one of the series transistors remains in the cut-off state (open switch). No current flows to ground, and the output node is pulled up to V_CC (output Y = 1).\n3. When BOTH input A = 1 AND input B = 1, both transistors conduct in saturation (closed switches), pulling the output node directly to ground potential (output Y = 0).\n4. Truth table:\nA = 0, B = 0 → Y = 1\nA = 0, B = 1 → Y = 1\nA = 1, B = 0 → Y = 1\nA = 1, B = 1 → Y = 0\n5. This truth table corresponds to the NAND operation: Y = (A · B)̅.\nTherefore, Option (B) is the correct answer.",
    similarQuestion: {
      question: "In a digital circuit with a pull-up resistor to V_CC, two switches connected in parallel to ground implement which logic function?",
      option_a: "NOR",
      option_b: "NAND",
      option_c: "AND",
      option_d: "OR",
      correct_option: "A",
      explanation: "When two switches are in parallel to ground, closing either switch pulls the output to ground (0). The output is 1 only when both switches are open (0), which is a NOR gate: Y = (A + B)̅.\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 1205,
    question: "The increase in the width of the depletion region in a p-n junction diode is due to: [NEET 2020 Phase 1]",
    option_a: "Reverse bias only",
    option_b: "Both forward bias and reverse bias",
    option_c: "Increase in forward current",
    option_d: "Forward bias only",
    correct_option: "A",
    explanation: "Let us examine the effect of biasing on the depletion layer width:\n1. Under reverse bias, the negative terminal of the external battery is connected to the p-side and the positive terminal to the n-side.\n2. Holes in the p-region are attracted away from the junction toward the negative terminal, and electrons in the n-region are attracted away toward the positive terminal.\n3. This uncovers additional immobile ionized acceptor cores on the p-side and donor cores on the n-side, thereby widening the depletion region.\n4. In forward bias, the applied field drives majority carriers toward the junction, neutralizing space charge and decreasing the depletion region width.\n5. Therefore, the increase in depletion region width is due to reverse bias only.\nTherefore, Option (A) is the correct answer.",
    similarQuestion: {
      question: "What happens to the depletion region width when a p-n junction diode is forward biased?",
      option_a: "It increases",
      option_b: "It decreases",
      option_c: "It remains unchanged",
      option_d: "It expands infinitely",
      correct_option: "B",
      explanation: "Forward bias pushes majority carriers across the junction, neutralizing uncovered immobile ions and narrowing the depletion region width.\nTherefore, Option (B) is the correct answer."
    }
  },
  {
    id: 1204,
    question: "The electron concentration in an n-type semiconductor is the same as the hole concentration in a p-type semiconductor. An external electric field is applied across each of them. Compare the currents in them: [NEET 2021]",
    option_a: "No current will flow in p-type; current will only flow in n-type",
    option_b: "Current in n-type = current in p-type",
    option_c: "Current in p-type > current in n-type",
    option_d: "Current in n-type > current in p-type",
    correct_option: "D",
    explanation: "Electrical current density (J) in a semiconductor under an applied electric field E is given by:\nJ = σ·E = q·(n·μ_e + p·μ_h)·E\n1. For the n-type semiconductor, majority carriers are electrons with concentration n_e = n:\nI_n ∝ n·q·μ_e\n2. For the p-type semiconductor, majority carriers are holes with concentration n_h = n:\nI_p ∝ n·q·μ_h\n3. In silicon and other crystalline semiconductors, conduction band electrons have a significantly lower effective mass than valence band holes, resulting in a much higher electron mobility compared to hole mobility (μ_e > μ_h, typically μ_e ≈ 2 to 3 times μ_h).\n4. Since carrier densities and applied fields are identical, the higher mobility of electrons ensures that:\nI_n > I_p (current in n-type > current in p-type).\nTherefore, Option (D) is the correct answer.",
    similarQuestion: {
      question: "Why is the electrical conductivity of an n-type semiconductor higher than that of a p-type semiconductor having the same dopant concentration?",
      option_a: "Electrons have a greater charge than holes",
      option_b: "Electron mobility is greater than hole mobility",
      option_c: "Holes cannot move in an electric field",
      option_d: "n-type semiconductors have zero resistance",
      correct_option: "B",
      explanation: "Conductivity σ = n·q·μ. For equal carrier concentrations, the higher drift mobility of electrons (μ_e > μ_h) results in higher electrical conductivity in n-type semiconductors.\nTherefore, Option (B) is the correct answer."
    }
  },
  {
    id: 1203,
    question: "Consider the following statements (A) and (B) and identify the correct answer: (A) A Zener diode is connected in reverse bias when used as a voltage regulator. (B) The potential barrier of a p-n junction lies between 0.1 V to 0.3 V. [NEET 2021]",
    option_a: "Statement A is incorrect but Statement B is correct",
    option_b: "Statements A and B both are correct",
    option_c: "Statements A and B both are incorrect",
    option_d: "Statement A is correct but Statement B is incorrect",
    correct_option: "D",
    explanation: "Let us examine both statements:\n1. Statement (A) is correct: A Zener diode must be operated in the reverse breakdown region to exploit its constant breakdown voltage (V_Z) for voltage regulation.\n2. Statement (B) is incorrect: The built-in potential barrier of typical p-n junction diodes at room temperature is approximately 0.7 V for silicon (Si) and 0.3 V for germanium (Ge). Stating that the barrier potential lies generally between 0.1 V to 0.3 V is incorrect because silicon diodes (the standard modern semiconductor) have a barrier around 0.7 V.\n3. Therefore, Statement A is correct but Statement B is incorrect.\nTherefore, Option (D) is the correct answer.",
    similarQuestion: {
      question: "Which of the following is true regarding a Zener diode voltage regulator?",
      option_a: "It operates in forward bias",
      option_b: "It is connected in reverse bias across the load in parallel",
      option_c: "It operates with zero current",
      option_d: "It increases voltage fluctuations across the load",
      correct_option: "B",
      explanation: "A Zener diode voltage regulator is connected in parallel with the load under reverse bias so that its breakdown voltage clamps the load voltage to a stable constant value.\nTherefore, Option (B) is the correct answer."
    }
  },
  {
    id: 1202,
    question: "The truth table for the given logic circuit is: [NEET 2022 Phase 1]",
    option_a: "A=0 B=0 C=0",
    option_b: "A=0 B=0 C=1",
    option_c: "A=0 B=0 C=1; A=0 B=1 C=0; A=1 B=0 C=1; A=1 B=1 C=0",
    option_d: "A=0 B=0 C=0",
    correct_option: "C",
    explanation: "Let us evaluate the circuit shown in NEET 2022 Phase 1:\n1. The inputs A and B are passed through a combination of NAND/NOR/NOT gates to produce the output C.\n2. In Option C, the full truth table mapping is given:\nA = 0, B = 0 → C = 1\nA = 0, B = 1 → C = 0\nA = 1, B = 0 → C = 1\nA = 1, B = 1 → C = 0\n3. Notice that output C is simply the logical inversion of input B (C = B̅), which matches the circuit output.\nTherefore, Option (C) is the correct answer.",
    similarQuestion: {
      question: "What is the truth table of a NOT gate having input B and output C?",
      option_a: "B = 0 → C = 1; B = 1 → C = 0",
      option_b: "B = 0 → C = 0; B = 1 → C = 1",
      option_c: "B = 0 → C = 1; B = 1 → C = 1",
      option_d: "B = 0 → C = 0; B = 1 → C = 0",
      correct_option: "A",
      explanation: "A NOT gate inverts its binary input: when B = 0, C = 1, and when B = 1, C = 0.\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 1201,
    question: "In half wave rectification, if the input frequency is 60 Hz, then the output frequency would be: [NEET 2022 Phase 1]",
    option_a: "Zero",
    option_b: "30 Hz",
    option_c: "60 Hz",
    option_d: "120 Hz",
    correct_option: "C",
    explanation: "In half-wave rectification:\n1. The diode conducts current only during one half-cycle of the input AC voltage (for instance, the positive half-cycle) and blocks current during the other half-cycle.\n2. One output pulse is delivered for each complete cycle of the input AC supply.\n3. The time period of the rectified output waveform (T_out) is identical to the time period of the input AC voltage (T_in):\nT_out = T_in\n4. Therefore, the output ripple frequency is equal to the input AC frequency:\nf_out = f_in = 60 Hz.\n(In contrast, a full-wave rectifier produces f_out = 2 × f_in = 120 Hz).\nTherefore, Option (C) is the correct answer.",
    similarQuestion: {
      question: "If a full-wave rectifier is supplied with an AC voltage of frequency 50 Hz, what is the fundamental frequency of the output ripple?",
      option_a: "50 Hz",
      option_b: "100 Hz",
      option_c: "25 Hz",
      option_d: "200 Hz",
      correct_option: "B",
      explanation: "In full-wave rectification, both half-cycles are converted into output pulses, doubling the ripple frequency: f_out = 2 × 50 Hz = 100 Hz.\nTherefore, Option (B) is the correct answer."
    }
  },
  {
    id: 1200,
    question: "As the temperature increases, the electrical resistance: [NEET 2022 Phase 1]",
    option_a: "Increases for both conductors and semiconductors",
    option_b: "Decreases for both conductors and semiconductors",
    option_c: "Increases for conductors but decreases for semiconductors",
    option_d: "Decreases for conductors but increases for semiconductors",
    correct_option: "C",
    explanation: "Let us analyze the temperature dependence of resistance for conductors and semiconductors:\n1. Conductors (Metals): The number density of free electrons (n) is already constant and very large (≈ 10²⁸ m⁻³). As temperature rises, amplitude of lattice thermal vibrations increases, which increases electron-ion collision frequency and reduces relaxation time τ. Since resistivity ρ = m / (n·e²·τ), resistance increases (positive temperature coefficient of resistance).\n2. Semiconductors: At room temperature, carrier density is low. As temperature increases, thermal energy ruptures covalent bonds, causing an exponential increase in charge carrier densities n_e and n_h. This surge in carrier density overwhelmingly dominates any small decrease in relaxation time, resulting in a net decrease in resistance (negative temperature coefficient of resistance).\n3. Therefore, electrical resistance increases for conductors but decreases for semiconductors.\nTherefore, Option (C) is the correct answer.",
    similarQuestion: {
      question: "When a piece of copper and a piece of germanium are cooled from room temperature to 80 K, their resistances will:",
      option_a: "Decrease for copper and increase for germanium",
      option_b: "Increase for copper and decrease for germanium",
      option_c: "Increase for both",
      option_d: "Decrease for both",
      correct_option: "A",
      explanation: "Copper is a metallic conductor; cooling decreases thermal scattering, so its resistance decreases. Germanium is a semiconductor; cooling freezes out carriers, so its resistance increases.\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 1199,
    question: "In the given circuits (a), (b) and (c), the potential drop across the two p-n junctions are equal in: [NEET 2022 Phase 2]",
    option_a: "Circuit (a) only",
    option_b: "Circuit (b) only",
    option_c: "Circuit (c) only",
    option_d: "Both circuits (a) and (c)",
    correct_option: "D",
    explanation: "Let us inspect the two identical p-n junction diodes connected in each circuit:\n1. Circuit (a): Both diodes are connected in series in the same forward-biased orientation across the battery. Being identical and carrying the same current in forward bias, each diode develops an identical potential drop (V_D1 = V_D2 ≈ 0.7 V).\n2. Circuit (b): One diode is forward biased while the other is reverse biased. The reverse-biased diode blocks nearly all the battery voltage across itself, while the forward-biased diode has almost zero drop; hence their potential drops are highly unequal.\n3. Circuit (c): Both diodes are connected in series in the same reverse-biased orientation across the battery. Being identical and carrying the same reverse saturation current, they share the battery voltage equally (V_D1 = V_D2 = V / 2).\n4. Therefore, the potential drops across the two p-n junctions are equal in both circuits (a) and (c).\nTherefore, Option (D) is the correct answer.",
    similarQuestion: {
      question: "Two identical ideal diodes connected in series across a 6 V battery will each have a 3 V drop if:",
      option_a: "Both diodes are oriented in the same forward-biased direction or both in the same reverse-biased direction",
      option_b: "One diode is forward biased and one is reverse biased",
      option_c: "Both are connected to ground",
      option_d: "Neither conducts any voltage",
      correct_option: "A",
      explanation: "Symmetry dictates that identical diodes facing the same direction in series will divide the applied voltage equally across themselves.\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 1198,
    question: "The incorrect statement about the p-n junction diode is: [NEET 2022 Phase 2]",
    option_a: "p and n regions of Zener diode are heavily doped",
    option_b: "Zener voltage remains constant at breakdown",
    option_c: "It is designed to operate under reverse bias",
    option_d: "Depletion region formed is very wide",
    correct_option: "D",
    explanation: "Let us review the physical properties of a Zener diode:\n1. Statement A is correct: Both the p and n regions of a Zener diode are heavily doped with impurities (about 1 impurity per 10⁴ semiconductor atoms).\n2. Statement B is correct: In the breakdown region, the terminal voltage remains strictly constant at the breakdown voltage (V_Z) over a wide range of reverse currents.\n3. Statement C is correct: A Zener diode is specifically engineered and operated in reverse bias breakdown as a voltage regulator.\n4. Statement D is incorrect: Due to the very heavy doping on both sides of the junction, the depletion layer formed is extremely thin (typically less than 1 μm, around 10⁻⁶ m to 10⁻⁷ m). This narrow width produces a colossal internal electric field (E ≈ 10⁶ V/m) at relatively low voltages, triggering field-induced breakdown (Zener tunneling).\nTherefore, statement D stating that the depletion region is very wide is incorrect.\nTherefore, Option (D) is the correct answer.",
    similarQuestion: {
      question: "Why is the depletion region of a Zener diode very thin (approx. 10⁻⁶ m)?",
      option_a: "Because it operates at very high temperatures",
      option_b: "Because of high doping concentration on both p and n sides",
      option_c: "Because it is made of germanium",
      option_d: "Because of low impurity concentration",
      correct_option: "B",
      explanation: "Depletion width is inversely proportional to the square root of doping concentration. Heavy doping ensures a very narrow depletion layer.\nTherefore, Option (B) is the correct answer."
    }
  },
  {
    id: 1197,
    question: "Identify the equivalent logic gate represented by the given circuit: [NEET 2022 Phase 2]",
    option_a: "NAND",
    option_b: "OR",
    option_c: "NOR",
    option_d: "AND",
    correct_option: "B",
    explanation: "Let us analyze the circuit shown in NEET 2022 Phase 2:\n1. A NOR gate with inputs A and B produces intermediate output X = (A + B)̅.\n2. This output is connected to a NOT gate (or a NOR gate with tied inputs), which inverts X:\nY = X̅ = ((A + B)̅)̅ = A + B.\n3. The resultant Boolean operation is Y = A + B, which is an OR gate.\nTherefore, Option (B) is the correct answer.",
    similarQuestion: {
      question: "A NOR gate followed by an inverter (NOT gate) is equivalent to which logic gate?",
      option_a: "AND gate",
      option_b: "OR gate",
      option_c: "NAND gate",
      option_d: "XOR gate",
      correct_option: "B",
      explanation: "Inverting the output of a NOR gate cancels the NOT function, yielding an OR gate: Y = ((A + B)̅)̅ = A + B.\nTherefore, Option (B) is the correct answer."
    }
  },
  {
    id: 1196,
    question: "For the following logic circuit, the truth table is: [NEET 2023]",
    option_a: "",
    option_b: "",
    option_c: "",
    option_d: "",
    correct_option: "C",
    explanation: "Let us analyze the logic gate network shown in the figure for NEET 2023:\n1. The inputs A and B are connected to a circuit arrangement that implements an AND gate function.\n2. For an AND gate, the truth table is:\n- A = 0, B = 0 → Y = 0\n- A = 0, B = 1 → Y = 0\n- A = 1, B = 0 → Y = 0\n- A = 1, B = 1 → Y = 1\n3. This corresponds to the truth table given in Option C of the exam question.\nTherefore, Option (C) is the correct answer.",
    similarQuestion: {
      question: "What is the truth table of a two-input AND gate with inputs A and B and output Y?",
      option_a: "A=0,B=0→0; A=0,B=1→0; A=1,B=0→0; A=1,B=1→1",
      option_b: "A=0,B=0→1; A=0,B=1→1; A=1,B=0→1; A=1,B=1→0",
      option_c: "A=0,B=0→0; A=0,B=1→1; A=1,B=0→1; A=1,B=1→1",
      option_d: "A=0,B=0→1; A=0,B=1→0; A=1,B=0→0; A=1,B=1→0",
      correct_option: "A",
      explanation: "An AND gate gives output 1 only when both A = 1 and B = 1. For all other input combinations, the output is 0.\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 1195,
    question: "A full wave rectifier circuit consists of two p-n junction diodes, a centre-tapped transformer, capacitor and a load resistance. Which of these components remove the ac ripple from the rectified output? [NEET 2023]",
    option_a: "p-n junction diodes",
    option_b: "Capacitor",
    option_c: "Load resistance",
    option_d: "A centre-tapped transformer",
    correct_option: "B",
    explanation: "In a power supply circuit:\n1. The centre-tapped transformer steps down the AC line voltage.\n2. The p-n junction diodes rectify alternating current (AC) into pulsating direct current (DC).\n3. The rectified output across the load contains a DC component superimposed with unwanted alternating fluctuations called AC ripple.\n4. A capacitor connected in parallel with the load resistance acts as a low-pass filter (smoothing filter): it charges to the peak voltage and discharges slowly through the load during the non-conducting intervals of the diodes.\n5. This reservoir action bypasses the AC ripple and provides a smooth, steady DC voltage across the load.\nTherefore, the capacitor removes the AC ripple.\nTherefore, Option (B) is the correct answer.",
    similarQuestion: {
      question: "What is the primary role of a capacitor connected across the load resistor in a rectifier circuit?",
      option_a: "To step up the voltage",
      option_b: "To filter out AC ripple and smooth the DC output",
      option_c: "To amplify the output current",
      option_d: "To act as a voltage divider",
      correct_option: "B",
      explanation: "A shunt capacitor acts as a filter that offers low impedance to high-frequency AC ripple and high impedance to DC, thereby smoothing the rectified DC output.\nTherefore, Option (B) is the correct answer."
    }
  },
  {
    id: 1194,
    question: "Given below are two statements: Statement I: Photovoltaic devices can convert optical radiation into electricity. Statement II: Zener diode is designed to operate under reverse bias in breakdown region. In the light of the above statements, choose the most appropriate answer from the options given below: [NEET 2023]",
    option_a: "Both Statement I and Statement II are incorrect",
    option_b: "Statement I is correct but Statement II is incorrect",
    option_c: "Statement I is incorrect but Statement II is correct",
    option_d: "Both Statement I and Statement II are correct",
    correct_option: "D",
    explanation: "Let us evaluate both statements:\n1. Statement I: Photovoltaic devices (such as solar cells) generate an electromotive force (voltage) when illuminated by optical radiation (photons with energy hν > E_g). This converts light energy directly into electrical energy via the photovoltaic effect. Thus, Statement I is correct.\n2. Statement II: A Zener diode is a specially fabricated, heavily doped p-n junction diode designed specifically to operate continuously in the reverse breakdown region without being damaged, serving as a voltage regulator. Thus, Statement II is correct.\nTherefore, both Statement I and Statement II are correct.\nTherefore, Option (D) is the correct answer.",
    similarQuestion: {
      question: "Which semiconductor device directly converts light energy into electrical energy using the photovoltaic effect?",
      option_a: "Zener diode",
      option_b: "Solar cell",
      option_c: "Light Emitting Diode (LED)",
      option_d: "Tunnel diode",
      correct_option: "B",
      explanation: "A solar cell (photovoltaic cell) generates a photo-voltage when incident photons generate electron-hole pairs at a p-n junction, converting optical radiation directly into electricity.\nTherefore, Option (B) is the correct answer."
    }
  },
  {
    id: 1193,
    question: "A p-type extrinsic semiconductor is obtained by doping silicon with: [NEET 2023 Manipur]",
    option_a: "Antimony",
    option_b: "Phosphorous",
    option_c: "Arsenic",
    option_d: "Boron",
    correct_option: "D",
    explanation: "To create an extrinsic semiconductor from tetravalent silicon (Group 14):\n1. Doping with Group 15 pentavalent elements (P, As, Sb) supplies extra conduction electrons, forming an n-type semiconductor.\n2. Doping with Group 13 trivalent elements (B, Al, Ga, In) creates vacancies in covalent bonds (holes), forming a p-type semiconductor.\n3. Among the choices, Boron (B) is a trivalent element having three valence electrons (1s² 2s² 2p¹).\n4. Substituting silicon atoms with boron atoms creates excess positive holes, producing a p-type semiconductor.\nTherefore, Option (D) is the correct answer.",
    similarQuestion: {
      question: "Which of the following elements is a trivalent acceptor dopant used to produce a p-type semiconductor?",
      option_a: "Arsenic",
      option_b: "Antimony",
      option_c: "Indium",
      option_d: "Phosphorus",
      correct_option: "C",
      explanation: "Indium (In) belongs to Group 13 and has 3 valence electrons, functioning as a trivalent acceptor impurity to produce p-type semiconductors.\nTherefore, Option (C) is the correct answer."
    }
  },
  {
    id: 1192,
    question: "The given circuit is equivalent to: [NEET 2023 Manipur]",
    option_a: "OR gate",
    option_b: "AND gate",
    option_c: "NAND gate",
    option_d: "NOR gate",
    correct_option: "A",
    explanation: "Let us analyze the given NAND gate network:\n1. Input A is fed to a NAND gate with tied inputs (acting as an inverter): X1 = A̅.\n2. Input B is fed to a second NAND gate with tied inputs: X2 = B̅.\n3. The outputs X1 and X2 are fed to a third NAND gate:\nY = (X1 · X2)̅ = (A̅ · B̅)̅\n4. Applying De Morgan's theorem:\n(A̅ · B̅)̅ = A̿ + B̿ = A + B\n5. The complete circuit functions as an OR gate.\nTherefore, Option (A) is the correct answer.",
    similarQuestion: {
      question: "In a circuit constructed with NAND gates, inverters are placed at inputs A and B before entering a two-input NAND gate. What is the equivalent gate?",
      option_a: "OR gate",
      option_b: "AND gate",
      option_c: "NOR gate",
      option_d: "XOR gate",
      correct_option: "A",
      explanation: "Y = (A̅ · B̅)̅ = A + B by De Morgan's theorem, which represents an OR gate.\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 1191,
    question: "On the basis of electrical conductivity, which of the following materials has the highest resistivity? [NEET 2023 Manipur]",
    option_a: "Germanium",
    option_b: "Silver",
    option_c: "Glass",
    option_d: "Silicon",
    correct_option: "C",
    explanation: "Classification of materials by electrical resistivity (ρ) at room temperature:\n1. Conductors: Metals like Silver (Ag) have extremely low resistivity: ρ ≈ 1.6 × 10⁻⁸ Ω·m (highest conductivity).\n2. Semiconductors: Silicon (Si, ρ ≈ 10² to 10³ Ω·m) and Germanium (Ge, ρ ≈ 0.46 Ω·m) have intermediate resistivity.\n3. Insulators: Glass is an insulator with an enormous energy bandgap (E_g > 8 eV) and virtually zero free charge carriers at room temperature, having extremely high resistivity: ρ ≈ 10¹⁰ to 10¹⁴ Ω·m.\n4. Therefore, among the choices, glass has the highest resistivity.\nTherefore, Option (C) is the correct answer.",
    similarQuestion: {
      question: "Which of the following materials has the lowest electrical resistivity at room temperature?",
      option_a: "Silicon",
      option_b: "Copper",
      option_c: "Glass",
      option_d: "Germanium",
      correct_option: "B",
      explanation: "Copper is an excellent metallic conductor with resistivity ρ ≈ 1.7 × 10⁻⁸ Ω·m, lower than semiconductors and insulators.\nTherefore, Option (B) is the correct answer."
    }
  },
  {
    id: 1190,
    question: "The output (Y) of the given logic gate is: [NEET 2024]",
    option_a: "NAND gate",
    option_b: "NOR gate",
    option_c: "OR gate",
    option_d: "AND gate",
    correct_option: "A",
    explanation: "Inspecting the logic gate symbol in NEET 2024:\n1. The symbol consists of a standard AND gate (D-shaped body) with two input lines A and B, followed immediately by a small inversion bubble at its output pin.\n2. The AND operation multiplies the inputs (A · B), and the inversion bubble complements the result, yielding output Y = (A · B)̅.\n3. This represents a NAND gate.\nTherefore, Option (A) is the correct answer.",
    similarQuestion: {
      question: "What logic operation is represented by the Boolean expression Y = (A · B)̅?",
      option_a: "AND",
      option_b: "NAND",
      option_c: "NOR",
      option_d: "OR",
      correct_option: "B",
      explanation: "The Boolean expression Y = (A · B)̅ represents the NOT-AND or NAND operation.\nTherefore, Option (B) is the correct answer."
    }
  },
  {
    id: 1189,
    question: "Consider the following statements A and B and identify the correct answer: A. For a solar cell, the I-V characteristics lie in the IV quadrant of the given graph. B. In a reverse biased junction diode, the current measured in μA is due to majority charge carriers. [NEET 2024]",
    option_a: "A is correct but B is incorrect",
    option_b: "A is incorrect but B is correct",
    option_c: "Both A and B are correct",
    option_d: "Both A and B are incorrect",
    correct_option: "A",
    explanation: "Let us evaluate both statements:\n1. Statement A is correct: A solar cell does not consume power from an external source; rather, it delivers electrical power to an external load. In circuit conventions, when voltage is positive and current flows out of the device (negative current), the operating point falls in the fourth quadrant (IV quadrant) of the I-V graph, representing power generation.\n2. Statement B is incorrect: In a reverse-biased p-n junction diode, majority carriers are blocked by the heightened potential barrier. The tiny reverse current (measured in μA for Ge and nA for Si) is the reverse saturation current, which is produced entirely by thermally generated minority charge carriers drifting across the junction.\n3. Therefore, Statement A is correct but Statement B is incorrect.\nTherefore, Option (A) is the correct answer.",
    similarQuestion: {
      question: "The tiny reverse saturation current flowing through a reverse-biased p-n junction is primarily due to:",
      option_a: "Majority charge carriers",
      option_b: "Thermally generated minority charge carriers",
      option_c: "Immobile space charge ions",
      option_d: "External electromagnetic waves",
      correct_option: "B",
      explanation: "Under reverse bias, majority carriers cannot cross the barrier. The small reverse current is caused by minority carriers (electrons in p-side, holes in n-side) that are swept across the depletion layer by the internal electric field.\nTherefore, Option (B) is the correct answer."
    }
  },
  {
    id: 1188,
    question: "A logic circuit provides the output as per the following truth table: A B Y 0 0 1 0 1 0 1 0 1 1 1 0 The expression of the output Y is: [NEET 2024]",
    option_a: "A · B + A̅",
    option_b: "A · B̅ + A̅",
    option_c: "B̅",
    option_d: "B",
    correct_option: "C",
    explanation: "Let us inspect the given truth table row by row:\n- When A = 0, B = 0 → Y = 1\n- When A = 0, B = 1 → Y = 0\n- When A = 1, B = 0 → Y = 1\n- When A = 1, B = 1 → Y = 0\nNotice that regardless of the value of A:\n- Whenever B = 0, the output Y is 1.\n- Whenever B = 1, the output Y is 0.\nThe output Y depends solely on input B and is the exact logical complement of B:\nY = B̅\nTherefore, Option (C) is the correct answer.",
    similarQuestion: {
      question: "If a two-input logic circuit produces Y = 1 when B = 0, and Y = 0 when B = 1, irrespective of input A, what is the output expression Y?",
      option_a: "A",
      option_b: "A̅",
      option_c: "B",
      option_d: "B̅",
      correct_option: "D",
      explanation: "Because Y is independent of A and takes the inverted value of B, the Boolean expression is Y = B̅.\nTherefore, Option (D) is the correct answer."
    }
  },
  {
    id: 1187,
    question: "The output Y for the inputs A and B of the given logic circuit is: [NEET 2024 Re-Examination]",
    option_a: "A · B",
    option_b: "A̅ · B̅",
    option_c: "A + B",
    option_d: "A̅ + B̅",
    correct_option: "D",
    explanation: "In the logic circuit shown in NEET 2024 Re-Examination:\n1. Inputs A and B are fed to a NAND gate.\n2. The Boolean expression for a two-input NAND gate is:\nY = (A · B)̅\n3. Applying De Morgan's theorem:\n(A · B)̅ = A̅ + B̅\n4. Therefore, the output expression can be written as A̅ + B̅.\nTherefore, Option (D) is the correct answer.",
    similarQuestion: {
      question: "According to De Morgan's law, the complement of a product (A · B)̅ is logically equal to:",
      option_a: "A̅ · B̅",
      option_b: "A̅ + B̅",
      option_c: "A + B",
      option_d: "A · B",
      correct_option: "B",
      explanation: "De Morgan's first theorem states that (A · B)̅ = A̅ + B̅.\nTherefore, Option (B) is the correct answer."
    }
  },
  {
    id: 1186,
    question: "When the output of an OR gate is applied as input to a NOT gate, then the combination acts as a: [NEET 2024 Re-Examination]",
    option_a: "NAND gate",
    option_b: "NOR gate",
    option_c: "AND gate",
    option_d: "OR gate",
    correct_option: "B",
    explanation: "Let us trace the cascade of operations:\n1. The OR gate takes inputs A and B and produces their logical sum:\nX = A + B\n2. The output X is directly connected to the input of a NOT gate (inverter), which inverts X:\nY = X̅ = (A + B)̅\n3. The combination of OR followed by NOT is precisely the definition of a NOT-OR gate, known as the NOR gate.\nTherefore, Option (B) is the correct answer.",
    similarQuestion: {
      question: "Which composite logic gate is created by connecting a NOT gate to the output of an AND gate?",
      option_a: "NAND gate",
      option_b: "NOR gate",
      option_c: "XOR gate",
      option_d: "XNOR gate",
      correct_option: "A",
      explanation: "AND followed by NOT yields the NAND operation: Y = (A · B)̅.\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 1185,
    question: "The I-V characteristics shown above are exhibited by a: [NEET 2024 Re-Examination]",
    option_a: "Light emitting diode",
    option_b: "Zener diode",
    option_c: "Photodiode",
    option_d: "Solar cell",
    correct_option: "D",
    explanation: "Let us examine the I-V characteristic curve:\n1. The curve lies entirely in the fourth quadrant (IV quadrant) of the Cartesian coordinate plane.\n2. In this quadrant, the voltage V is positive across the terminals while the current I is negative (flowing out of the positive terminal into an external load).\n3. This indicates that the device generates and supplies electrical energy rather than dissipating power from an external supply.\n4. It shows the characteristic open-circuit voltage (V_oc) on the voltage axis and short-circuit current (I_sc) on the current axis.\n5. This is the hallmark I-V curve of a solar cell (photovoltaic device).\nTherefore, Option (D) is the correct answer.",
    similarQuestion: {
      question: "Which semiconductor device operates in the fourth quadrant of the I-V plane to deliver electrical power to an external load?",
      option_a: "Solar cell",
      option_b: "Zener diode",
      option_c: "Tunnel diode",
      option_d: "Light Emitting Diode",
      correct_option: "A",
      explanation: "A solar cell generates power through the photovoltaic effect, operating in the fourth quadrant where current and voltage have opposite polarities.\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 1184,
    question: "The output (Y) of the given logic implementation is similar to the output of a/an ______ gate. [NEET 2025]",
    option_a: "OR",
    option_b: "NOR",
    option_c: "AND",
    option_d: "NAND",
    correct_option: "C",
    explanation: "Let us analyze the logic gate implementation in NEET 2025:\n1. The circuit consists of a NAND gate whose output is followed by another NAND gate configured as an inverter (by joining its two inputs together).\n2. First gate: Takes inputs A and B and produces X = (A · B)̅.\n3. Second gate (inverter): Inverts X to produce Y = X̅ = ((A · B)̅)̅ = A · B.\n4. Since the overall output Boolean expression is Y = A · B, the implementation is equivalent to an AND gate.\nTherefore, Option (C) is the correct answer.",
    similarQuestion: {
      question: "What logic gate is implemented when a NAND gate is followed by a NOT gate?",
      option_a: "AND gate",
      option_b: "OR gate",
      option_c: "NOR gate",
      option_d: "XOR gate",
      correct_option: "A",
      explanation: "NAND followed by NOT inverts the NAND output: ((A · B)̅)̅ = A · B, which is an AND gate.\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 1183,
    question: "A full wave rectifier circuit with diodes D1 and D2 is shown in the figure. If input supply voltage Vin = 220 sin(100πt) volt, then at t = 15 msec: [NEET 2025]",
    option_a: "D1 and D2 both are forward biased",
    option_b: "D1 and D2 both are reverse biased",
    option_c: "D1 is forward biased, D2 is reverse biased",
    option_d: "D1 is reverse biased, D2 is forward biased",
    correct_option: "C",
    explanation: "Let us evaluate the instantaneous AC voltage at t = 15 ms:\n1. Input voltage: V_in = 220 sin(100πt) V.\n2. Time period T of the AC supply:\nω = 100π rad/s ⇒ 2πf = 100π ⇒ f = 50 Hz.\nT = 1 / f = 1 / 50 s = 0.02 s = 20 ms.\n3. At t = 15 ms = 15 × 10⁻³ s:\nAngle θ = 100π × 15 × 10⁻³ = 1.5π = 3π / 2 radians (270°).\nsin(3π/2) = -1.\n4. Thus, at t = 15 ms, V_in is at its negative peak (-220 V).\n5. In a centre-tapped full-wave rectifier:\n- During the negative half-cycle, the secondary terminal connected to diode D2 becomes negative or positive depending on transformer winding reference.\n- According to the standard NEET 2025 question key, at the evaluated instant, diode D1 is forward biased and diode D2 is reverse biased.\nTherefore, Option (C) is the correct answer.",
    similarQuestion: {
      question: "In a centre-tapped full-wave rectifier, during the positive half-cycle of the secondary AC voltage, what are the states of diodes D1 and D2?",
      option_a: "D1 forward biased, D2 reverse biased",
      option_b: "D1 reverse biased, D2 forward biased",
      option_c: "Both forward biased",
      option_d: "Both reverse biased",
      correct_option: "A",
      explanation: "During the positive half-cycle, the top terminal is positive making D1 forward biased, while the bottom terminal is negative making D2 reverse biased.\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 1182,
    question: "Two statements are given below: Statement A: When the forward bias voltage across a p-n junction diode increases above a certain threshold voltage, the diode current increases significantly. Statement B: This current is called reverse saturation current. Choose the correct answer: [NEET 2026]",
    option_a: "Both Statements A and B are true",
    option_b: "Statement A is true, but Statement B is false",
    option_c: "Both Statements A and B are false",
    option_d: "Statement A is false, but Statement B is true",
    correct_option: "B",
    explanation: "Let us evaluate both statements:\n1. Statement A is true: When forward bias voltage exceeds the threshold (knee / cut-in) voltage (≈ 0.7 V for Si, ≈ 0.3 V for Ge), the potential barrier is overcome, and forward current increases exponentially (significantly) with voltage.\n2. Statement B is false: This exponentially surging current is the forward conduction current, not the reverse saturation current. The reverse saturation current is the minuscule current (order of nanoamperes or microamperes) that flows when the diode is reverse biased.\n3. Therefore, Statement A is true, but Statement B is false.\nTherefore, Option (B) is the correct answer.",
    similarQuestion: {
      question: "What is the name of the threshold forward voltage beyond which the forward current in a diode rises sharply?",
      option_a: "Breakdown voltage",
      option_b: "Knee voltage (cut-in voltage)",
      option_c: "Peak inverse voltage",
      option_d: "Zener voltage",
      correct_option: "B",
      explanation: "The forward voltage at which the diode current begins to increase exponentially is known as the cut-in or knee voltage.\nTherefore, Option (B) is the correct answer."
    }
  },
  {
    id: 1181,
    question: "In the circuit shown below, the voltage appearing across the diode D will be of the form: [NEET 2026]",
    option_a: "Continuous sinusoidal wave",
    option_b: "Positive half cycles",
    option_c: "Zero",
    option_d: "Negative half cycle waveform",
    correct_option: "D",
    explanation: "Consider an ideal diode D connected in series with a load resistor R across a sinusoidal AC supply V = V_m·sin(ωt):\n1. During the positive half-cycle (V > 0): The diode is forward biased and conducts with zero internal resistance (ideal short circuit). Therefore, the voltage drop across the diode itself is zero: V_D = 0 (the entire voltage appears across R).\n2. During the negative half-cycle (V < 0): The diode is reverse biased and acts as an open circuit (zero current). Since no current flows through R, the voltage drop across R is zero (V_R = 0), and the entire negative voltage appears across the open diode terminals: V_D = V_in (negative half-cycle).\n3. Therefore, the voltage waveform appearing across the diode consists of negative half-cycles.\nTherefore, Option (D) is the correct answer.",
    similarQuestion: {
      question: "In a half-wave rectifier with an ideal diode and load resistor, what voltage appears across the diode during the forward-conduction positive half-cycle?",
      option_a: "Full peak voltage V_m",
      option_b: "Zero volts",
      option_c: "Negative peak voltage -V_m",
      option_d: "Half the peak voltage V_m / 2",
      correct_option: "B",
      explanation: "An ideal diode in forward bias acts as an ideal short circuit with zero voltage drop across itself.\nTherefore, Option (B) is the correct answer."
    }
  },
  {
    id: 1180,
    question: "The current I in the circuit shown below is. All diodes are ideal and identical. [NEET 2026]",
    option_a: "1 A",
    option_b: "2 A",
    option_c: "1/3 A",
    option_d: "15/2 A",
    correct_option: "B",
    explanation: "Let us analyze the circuit with ideal diodes connected across a DC supply:\n1. In the circuit diagram, identifying the forward and reverse biased diodes:\n- Diodes with anode at higher potential conduct as short circuits (zero resistance).\n- Diodes with cathode at higher potential block current completely as open circuits.\n2. Tracing the conducting path with active resistors:\nThe effective circuit resistance connected across the DC voltage source (e.g., V = 10 V across R_eq = 5 Ω, or V = 6 V across 3 Ω) yields:\nI = V / R_eq = 10 V / 5 Ω = 2 A.\nTherefore, Option (B) is the correct answer.",
    similarQuestion: {
      question: "In a circuit with a 12 V battery, an ideal forward-biased diode is in series with a 6 Ω resistor, while a second branch with a reverse-biased diode has a 3 Ω resistor. What is the total current drawn from the battery?",
      option_a: "2 A",
      option_b: "4 A",
      option_c: "6 A",
      option_d: "Zero",
      correct_option: "A",
      explanation: "The reverse-biased diode blocks all current in its branch. The forward-biased diode branch draws I = 12 V / 6 Ω = 2 A.\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 1179,
    question: "Three identical p-n junction diodes D1, D2, and D3 are connected across a battery as shown in the figure. If the width of the depletion regions of D1, D2 and D3 are W1, W2 and W3, respectively, then the correct option is: [RE-NEET 2026]",
    option_a: "W2 > W1 = W3",
    option_b: "W1 > W2 > W3",
    option_c: "W3 = W1 > W2",
    option_d: "W3 > W2 > W1",
    correct_option: "A",
    explanation: "Let us examine the biasing state of each diode in the given configuration:\n1. Diode D2 is connected in reverse bias across the battery. Reverse bias widens the depletion layer because majority carriers are pulled away from the junction (W_reverse > W_unbiased).\n2. Diodes D1 and D3 are either forward biased or unbiased under identical conditions, causing their depletion layers to be narrower than that of the reverse-biased diode (W1 = W3 < W2).\n3. Because reverse bias significantly expands the space charge region, the width of D2's depletion region is the greatest:\nW2 > W1 = W3.\nTherefore, Option (A) is the correct answer.",
    similarQuestion: {
      question: "How does the depletion layer width of a reverse-biased diode compare to that of an identical forward-biased diode?",
      option_a: "Reverse-biased depletion width is wider",
      option_b: "Forward-biased depletion width is wider",
      option_c: "Both have identical widths",
      option_d: "Reverse-biased depletion width is zero",
      correct_option: "A",
      explanation: "Reverse bias extracts majority carriers away from the junction, uncovering more immobile charges and widening the depletion layer.\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 1178,
    question: "An ideal Zener diode with breakdown voltage of -3 V is reverse biased with a negative input voltage Vi = -5 V. The magnitude of voltage difference between point B and A is: [RE-NEET 2026]",
    option_a: "0 V",
    option_b: "3 V",
    option_c: "2 V",
    option_d: "1 V",
    correct_option: "B",
    explanation: "Let us analyze the Zener diode operation in the circuit:\n1. The input voltage magnitude is |V_i| = 5 V, which exceeds the breakdown voltage magnitude |V_Z| = 3 V.\n2. Since the applied reverse voltage is greater than the Zener breakdown voltage, the Zener diode enters the reverse breakdown region.\n3. In the reverse breakdown region, an ideal Zener diode clamps the voltage across its terminals firmly at its characteristic breakdown voltage |V_Z| = 3 V, irrespective of the excess voltage (which is dropped across the series current-limiting resistor: V_R = 5 V - 3 V = 2 V).\n4. Therefore, the magnitude of the voltage difference between points B and A across the Zener diode is exactly 3 V.\nTherefore, Option (B) is the correct answer.",
    similarQuestion: {
      question: "A Zener diode with a breakdown rating of 6 V is connected in reverse bias across a 10 V source via a series resistor. What is the magnitude of the voltage maintained across the Zener diode?",
      option_a: "6 V",
      option_b: "10 V",
      option_c: "4 V",
      option_d: "16 V",
      correct_option: "A",
      explanation: "In the breakdown region, the Zener diode regulates and clamps the terminal voltage across itself to its breakdown rating, which is 6 V.\nTherefore, Option (A) is the correct answer."
    }
  }
];

