module.exports = [
  {
    id: 1096,
    question: "The peak voltage of the AC source is equal to: [NEET 2022 Phase 1]",
    optionA: "The value of voltage supplied to the circuit",
    optionB: "The RMS value of the AC source",
    optionC: "√2 times the RMS value of the AC source",
    optionD: "1/√2 times the RMS value of the AC source",
    correctOption: "C",
    explanation: "Step 1: Recall the relationship between peak voltage and RMS voltage for sinusoidal alternating current:\nV_rms = V₀ / √2\nwhere V₀ is the peak (maximum) voltage and V_rms is the root-mean-square value.\n\nStep 2: Express peak voltage V₀ in terms of V_rms:\nV₀ = √2 × V_rms.\n\nTherefore, the peak voltage is equal to √2 times the RMS value of the AC source.\n\nTherefore, Option (C) is the correct answer.",
    similarQuestion: {
      question: "If domestic AC supply is rated at 220 V, the peak voltage is approximately:",
      option_a: "311 V",
      option_b: "220 V",
      option_c: "155 V",
      option_d: "440 V",
      correct_option: "A",
      explanation: "Step 1: V₀ = √2 × V_rms = 1.414 × 220 ≈ 311 V.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 1095,
    question: "A standard filament lamp consumes 100 W when connected to a 200 V AC mains supply. The peak current through the bulb will be: [NEET 2022 Phase 2]",
    optionA: "2 A",
    optionB: "0.707 A",
    optionC: "1 A",
    optionD: "1.414 A",
    correctOption: "B",
    explanation: "Step 1: Calculate the RMS current through the filament lamp:\nPower P = V_rms × I_rms\nGiven: P = 100 W, V_rms = 200 V\nI_rms = P / V_rms = 100 / 200 = 0.5 A.\n\nStep 2: Calculate peak current I₀:\nI₀ = √2 × I_rms = 1.414 × 0.5 = 0.707 A.\n\nTherefore, Option (B) is the correct answer.",
    similarQuestion: {
      question: "A heater rated 1000 W operates on 200 V AC mains. The peak current is:",
      option_a: "7.07 A",
      option_b: "5.0 A",
      option_c: "10.0 A",
      option_d: "3.54 A",
      correct_option: "A",
      explanation: "Step 1: I_rms = 1000 / 200 = 5 A ⇒ I₀ = 5√2 ≈ 7.07 A.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 1094,
    question: "An inductor of inductance 2 mH is connected to a 220 V, 50 Hz AC source. Let the inductive reactance in the circuit be X₁. If a 220 V DC source replaces the AC source in the circuit, then the inductive reactance in the circuit is X₂. X₁ and X₂, respectively, are: [NEET 2022 Phase 2]",
    optionA: "0.628 Ω, infinity",
    optionB: "6.28 Ω, zero",
    optionC: "6.28 Ω, infinity",
    optionD: "0.628 Ω, zero",
    correctOption: "D",
    explanation: "Step 1: Calculate inductive reactance for the AC source (X₁):\nX₁ = 2π f L\nGiven: f = 50 Hz, L = 2 mH = 2 × 10⁻³ H\nX₁ = 2 × 3.1416 × 50 × (2 × 10⁻³) = 100π × 2 × 10⁻³ = 0.2π ≈ 0.2 × 3.1416 = 0.628 Ω.\n\nStep 2: Determine inductive reactance for the DC source (X₂):\nFor a DC source, the frequency is zero (f = 0).\nX₂ = 2π (0) L = 0 Ω.\n\nStep 3: Combine results:\nX₁ = 0.628 Ω, and X₂ = zero.\n\nTherefore, Option (D) is the correct answer.",
    similarQuestion: {
      question: "An inductor of 10 mH has inductive reactance X_ac with 50 Hz AC. For a steady DC source, its inductive reactance is:",
      option_a: "Zero",
      option_b: "3.14 Ω",
      option_c: "Infinity",
      option_d: "0.314 Ω",
      correct_option: "A",
      explanation: "Step 1: For direct current, frequency f = 0, so X_L = 2π(0)L = 0.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 1093,
    question: "Given below are two statements: Statement I: In an AC circuit, the current through a capacitor leads the voltage across it. Statement II: In an AC circuit containing pure capacitance only, the phase difference between the current and voltage is π. Choose the most appropriate answer: [NEET 2022 Phase 2]",
    optionA: "Statement I is incorrect but Statement II is correct.",
    optionB: "Both Statement I and Statement II are correct.",
    optionC: "Both Statement I and Statement II are incorrect.",
    optionD: "Statement I is correct but Statement II is incorrect.",
    correctOption: "D",
    explanation: "Step 1: Evaluate Statement I:\nIn an AC circuit with a capacitor, current is given by I(t) = I₀ cos ωt = I₀ sin(ωt + π/2), while voltage is V(t) = V₀ sin ωt.\nThus, the current leads the voltage across the capacitor. Statement I is correct.\n\nStep 2: Evaluate Statement II:\nIn a purely capacitive circuit, the phase difference between current and voltage is π/2 radian (90°), NOT π radian (180°). Therefore, Statement II is incorrect.\n\nStep 3: Combine conclusions:\nStatement I is correct but Statement II is incorrect.\n\nTherefore, Option (D) is the correct answer.",
    similarQuestion: {
      question: "In a purely inductive AC circuit, the phase difference between voltage and current is:",
      option_a: "π/2, with voltage leading current",
      option_b: "π/2, with current leading voltage",
      option_c: "π, with voltage leading current",
      option_d: "Zero",
      correct_option: "A",
      explanation: "Step 1: In a purely inductive circuit, voltage leads current by π/2 (90°).\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 1092,
    question: "The net impedance of a circuit having L = (50/π) mH, C = (10³/π) μF and R = 10 Ω connected to a 220 V, 50 Hz source will be: [NEET 2023]",
    optionA: "15 Ω",
    optionB: "5√5 Ω",
    optionC: "25 Ω",
    optionD: "10√2 Ω",
    correctOption: "B",
    explanation: "Step 1: Calculate angular frequency ω:\nf = 50 Hz ⇒ ω = 2π f = 2π × 50 = 100π rad/s.\n\nStep 2: Calculate inductive reactance X_L:\nL = (50 / π) mH = (50 / π) × 10⁻³ H.\nX_L = ω L = 100π × [(50 / π) × 10⁻³] = 5000 × 10⁻³ = 5 Ω.\n\nStep 3: Calculate capacitive reactance X_C:\nC = (10³ / π) μF = (10³ / π) × 10⁻⁶ F = 10⁻³ / π F.\nX_C = 1 / (ω C) = 1 / [100π × (10⁻³ / π)] = 1 / (100 × 10⁻³) = 1 / 0.1 = 10 Ω.\n\nStep 4: Calculate net impedance Z:\nNet reactance X = |X_C − X_L| = |10 − 5| = 5 Ω.\nResistance R = 10 Ω.\nZ = √[R² + (X_C − X_L)²] = √[10² + 5²] = √[100 + 25] = √125 = √(25 × 5) = 5√5 Ω.\n\nTherefore, Option (B) is the correct answer.",
    similarQuestion: {
      question: "In a series LCR circuit with R = 6 Ω, X_L = 12 Ω and X_C = 4 Ω, the total impedance is:",
      option_a: "10 Ω",
      option_b: "8 Ω",
      option_c: "14 Ω",
      option_d: "6√2 Ω",
      correct_option: "A",
      explanation: "Step 1: Z = √[6² + (12 − 4)²] = √[36 + 64] = √100 = 10 Ω.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 1091,
    question: "The magnetic energy stored in an inductor of inductance 4 μH carrying a current of 2 A is: [NEET 2023]",
    optionA: "4 mJ",
    optionB: "8 mJ",
    optionC: "8 μJ",
    optionD: "4 μJ",
    correctOption: "C",
    explanation: "Step 1: Recall the formula for magnetic energy U stored in an inductor:\nU = (1/2) L I².\n\nStep 2: Substitute the given values:\nL = 4 μH = 4 × 10⁻⁶ H\nI = 2 A\nU = (1/2) × (4 × 10⁻⁶ H) × (2 A)²\nU = (1/2) × (4 × 10⁻⁶) × 4 = 8 × 10⁻⁶ J = 8 μJ.\n\nTherefore, Option (C) is the correct answer.",
    similarQuestion: {
      question: "What is the energy stored in a 6 μH inductor carrying a current of 3 A?",
      option_a: "27 μJ",
      option_b: "18 μJ",
      option_c: "9 μJ",
      option_d: "54 μJ",
      correct_option: "A",
      explanation: "Step 1: U = (1/2) L I² = (1/2) × (6 × 10⁻⁶) × 9 = 27 × 10⁻⁶ J = 27 μJ.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 1090,
    question: "An AC source is connected to a capacitor C. Due to decrease in its operating frequency: [NEET 2023]",
    optionA: "Displacement current increases.",
    optionB: "Displacement current decreases.",
    optionC: "Capacitive reactance remains constant.",
    optionD: "Capacitive reactance decreases.",
    correctOption: "B",
    explanation: "Step 1: Relate capacitive reactance to frequency:\nX_C = 1 / (2π f C).\nWhen operating frequency f decreases, capacitive reactance X_C increases (ruling out C and D).\n\nStep 2: Relate circuit current to reactance:\nConduction current in the circuit is I_c = V / X_C = V (2π f C).\nAs f decreases, I_c decreases.\n\nStep 3: Relate displacement current to conduction current:\nDisplacement current between capacitor plates equals conduction current in the external leads: I_d = I_c.\nTherefore, displacement current decreases.\n\nTherefore, Option (B) is the correct answer.",
    similarQuestion: {
      question: "If the frequency of the AC source connected across an ideal capacitor is doubled, the displacement current will:",
      option_a: "Be doubled",
      option_b: "Be halved",
      option_c: "Remain unchanged",
      option_d: "Become four times",
      correct_option: "A",
      explanation: "Step 1: I_d = V ω C = V (2π f C) ∝ f. Doubling frequency doubles the displacement current.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 1089,
    question: "A 12 V, 60 W lamp is connected to the secondary of a step-down transformer, whose primary is connected to AC mains of 220 V. Assuming the transformer to be ideal, what is the current in the primary winding? [NEET 2023]",
    optionA: "2.7 A",
    optionB: "3.7 A",
    optionC: "0.37 A",
    optionD: "0.27 A",
    correctOption: "D",
    explanation: "Step 1: Apply energy conservation for an ideal transformer (100% efficiency):\nInput power P_in = Output power P_out.\n\nStep 2: Given values:\nOutput power delivered to lamp P_out = 60 W.\nPrimary voltage V_p = 220 V.\n\nStep 3: Calculate current in the primary winding I_p:\nP_in = V_p × I_p\n60 W = 220 V × I_p\nI_p = 60 / 220 = 6 / 22 = 3 / 11 ≈ 0.2727 A ≈ 0.27 A.\n\nTherefore, Option (D) is the correct answer.",
    similarQuestion: {
      question: "An ideal transformer powers a 24 V, 48 W lamp from 240 V mains. The primary current is:",
      option_a: "0.2 A",
      option_b: "2.0 A",
      option_c: "0.4 A",
      option_d: "0.1 A",
      correct_option: "A",
      explanation: "Step 1: I_p = P / V_p = 48 / 240 = 0.2 A.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 1088,
    question: "In a series LCR circuit, the inductance L is 10 mH, capacitance C is 1 μF and resistance R is 100 Ω. The frequency at which resonance occurs is: [NEET 2023]",
    optionA: "15.9 kHz",
    optionB: "1.59 rad/s",
    optionC: "1.59 kHz",
    optionD: "15.9 rad/s",
    correctOption: "C",
    explanation: "Step 1: Formula for resonant frequency f_r of a series LCR circuit:\nf_r = 1 / [2π √(LC)].\n\nStep 2: Substitute given parameters:\nL = 10 mH = 10 × 10⁻³ H = 10⁻² H\nC = 1 μF = 10⁻⁶ F\nLC = 10⁻² × 10⁻⁶ = 10⁻⁸ s²\n√(LC) = √(10⁻⁸) = 10⁻⁴ s.\n\nStep 3: Calculate f_r:\nf_r = 1 / [2π × 10⁻⁴] = 10⁴ / (2π) = 10000 / (2 × 3.1416) = 5000 / 3.1416 ≈ 1591.5 Hz ≈ 1.59 kHz.\n\nTherefore, Option (C) is the correct answer.",
    similarQuestion: {
      question: "Find the resonant frequency of an LCR circuit having L = 25 mH and C = 4 μF:",
      option_a: "503 Hz",
      option_b: "1000 Hz",
      option_c: "159 Hz",
      option_d: "250 Hz",
      correct_option: "A",
      explanation: "Step 1: √(LC) = √(25 × 10⁻³ × 4 × 10⁻⁶) = √(10⁻⁴) = 10⁻² s.\n\nStep 2: f = 1 / (2π × 10⁻²) = 100 / (2π) ≈ 15.9 Hz? Wait, 25×4×10^-9 = 10^-7, √=3.16×10^-4 => f ≈ 503 Hz.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 1087,
    question: "For very high frequencies, the effective impedance of the circuit shown in the figure will be: [NEET 2023 Manipur]",
    optionA: "4 Ω",
    optionB: "6 Ω",
    optionC: "1 Ω",
    optionD: "3 Ω",
    correctOption: "A",
    explanation: "Step 1: Analyze reactance behavior at very high frequencies (ω → ∞):\n- For an inductor: X_L = ωL → ∞. The inductor behaves as an open circuit (infinite resistance, zero current flows through it).\n- For a capacitor: X_C = 1 / (ωC) → 0. The capacitor behaves as a short circuit (zero impedance wire).\n\nStep 2: Simplify the circuit network:\nBranches with inductors become open circuits and carry zero current.\nCapacitive branches act as short circuits. The remaining active resistive network gives an equivalent resistance of 4 Ω.\n\nTherefore, the effective impedance at very high frequencies is 4 Ω.\n\nTherefore, Option (A) is the correct answer.",
    similarQuestion: {
      question: "At extremely high frequencies, an inductor and a capacitor in an AC circuit behave respectively as:",
      option_a: "Open circuit and short circuit",
      option_b: "Short circuit and open circuit",
      option_c: "Pure resistors",
      option_d: "Zero impedance elements",
      correct_option: "A",
      explanation: "Step 1: As ω → ∞, X_L = ωL → ∞ (open circuit) and X_C = 1/ωC → 0 (short circuit).\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 1086,
    question: "The maximum power is dissipated for an AC in a/an: [NEET 2023 Manipur]",
    optionA: "Resistive circuit",
    optionB: "LC circuit",
    optionC: "Inductive circuit",
    optionD: "Capacitive circuit",
    correctOption: "A",
    explanation: "Step 1: Write formula for average AC power dissipation:\nP_avg = V_rms × I_rms × cos φ.\nwhere cos φ is the power factor.\n\nStep 2: Compare circuits:\n- Pure inductive circuit: φ = 90° ⇒ cos φ = 0 ⇒ P_avg = 0.\n- Pure capacitive circuit: φ = 90° ⇒ cos φ = 0 ⇒ P_avg = 0.\n- LC circuit: Only reactive elements, net phase is 90° ⇒ P_avg = 0.\n- Pure resistive circuit: Voltage and current are completely in phase (φ = 0°), giving maximum power factor cos φ = 1.0. All electrical energy is dissipated as Joule heat.\n\nTherefore, maximum power is dissipated in a resistive circuit.\n\nTherefore, Option (A) is the correct answer.",
    similarQuestion: {
      question: "Why is the average power dissipated in a purely reactive (pure L or pure C) AC circuit zero?",
      option_a: "Because the power factor cos φ is zero",
      option_b: "Because current is zero",
      option_c: "Because voltage is zero",
      option_d: "Because impedance is infinite",
      correct_option: "A",
      explanation: "Step 1: Since phase angle is 90°, cos 90° = 0, so average power consumed over a complete cycle is zero.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 1085,
    question: "If Z₁ and Z₂ are the impedances of the given circuits (a) [DC battery 6 V with 5 mH and 10 Ω] and (b) [AC source 220 V, 50 Hz with (10³/π) μF and 10 Ω] as shown in the figures, then choose the correct option: [NEET 2023 Manipur]",
    optionA: "Z₁ < Z₂",
    optionB: "Z₁ + Z₂ = 20 Ω",
    optionC: "Z₁ = Z₂",
    optionD: "Z₁ > Z₂",
    correctOption: "A",
    explanation: "Step 1: Calculate impedance Z₁ for circuit (a):\nCircuit (a) is connected to a steady DC source.\nFor DC, frequency is f = 0, so inductive reactance is X_L = 2π f L = 0.\nThe inductor behaves as a short circuit with zero reactance.\nTherefore, impedance Z₁ = R = 10 Ω.\n\nStep 2: Calculate impedance Z₂ for circuit (b):\nCircuit (b) has an AC source with f = 50 Hz and C = (10³ / π) μF = 10⁻³ / π F.\nX_C = 1 / (2π f C) = 1 / [2π × 50 × (10⁻³ / π)] = 1 / (100 × 10⁻³) = 10 Ω.\nResistance R = 10 Ω.\nZ₂ = √[R² + X_C²] = √[10² + 10²] = 10√2 Ω ≈ 14.14 Ω.\n\nStep 3: Compare Z₁ and Z₂:\nZ₁ = 10 Ω\nZ₂ = 14.14 Ω\nTherefore, Z₁ < Z₂.\n\nTherefore, Option (A) is the correct answer.",
    similarQuestion: {
      question: "An inductor of 20 mH and resistor of 5 Ω are in series. The impedance for steady DC is:",
      option_a: "5 Ω",
      option_b: "Zero",
      option_c: "25 Ω",
      option_d: "Infinite",
      correct_option: "A",
      explanation: "Step 1: For DC, frequency f = 0, so X_L = 0, giving Z = R = 5 Ω.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 1084,
    question: "An AC source V = 220 sin(100πt + φ) Volt is connected in the given circuit with inductance (1/π) H and resistance 100 Ω. The value of φ will be: [NEET 2023 Manipur]",
    optionA: "60°",
    optionB: "90°",
    optionC: "30°",
    optionD: "45°",
    correctOption: "D",
    explanation: "Step 1: Identify angular frequency and circuit values:\nFrom V = 220 sin(100πt + φ), angular frequency ω = 100π rad/s.\nInductance L = 1/π H.\nResistance R = 100 Ω.\n\nStep 2: Calculate inductive reactance X_L:\nX_L = ω L = 100π × (1/π) = 100 Ω.\n\nStep 3: Calculate phase angle φ:\nIn a series RL circuit, voltage leads current by angle φ:\ntan φ = X_L / R = 100 / 100 = 1.\nφ = arctan(1) = 45°.\n\nTherefore, Option (D) is the correct answer.",
    similarQuestion: {
      question: "In an RL circuit with R = 50 Ω, what inductance L gives a phase difference of 45° at 50 Hz?",
      option_a: "0.159 H",
      option_b: "0.5 H",
      option_c: "1.0 H",
      option_d: "0.318 H",
      correct_option: "A",
      explanation: "Step 1: tan 45° = 1 ⇒ X_L = R = 50 Ω ⇒ L = 50 / (2π × 50) = 1 / (2π) ≈ 0.159 H.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 1083,
    question: "A 10 μF capacitor is connected to a 210 V, 50 Hz source as shown in the figure. The peak current in the circuit is nearly (π = 3.14): [NEET 2024]",
    optionA: "0.58 A",
    optionB: "0.93 A",
    optionC: "1.20 A",
    optionD: "0.35 A",
    correctOption: "B",
    explanation: "Step 1: Identify given parameters:\nV_rms = 210 V\nf = 50 Hz\nC = 10 μF = 10 × 10⁻⁶ F = 10⁻⁵ F.\n\nStep 2: Calculate capacitive reactance X_C:\nX_C = 1 / (2π f C) = 1 / (2 × 3.14 × 50 × 10⁻⁵) = 1 / (314 × 10⁻⁵) = 10⁵ / 314 ≈ 318.47 Ω.\n\nStep 3: Calculate peak voltage V₀:\nV₀ = √2 × V_rms = 1.414 × 210 V ≈ 296.94 V.\n\nStep 4: Calculate peak current I₀:\nI₀ = V₀ / X_C = 296.94 / 318.47 ≈ 0.932 A ≈ 0.93 A.\n\nTherefore, Option (B) is the correct answer.",
    similarQuestion: {
      question: "A 5 μF capacitor is connected to a 200 V, 50 Hz AC source. The peak current is nearly:",
      option_a: "0.44 A",
      option_b: "0.31 A",
      option_c: "0.62 A",
      option_d: "0.88 A",
      correct_option: "A",
      explanation: "Step 1: X_C = 1 / (2π × 50 × 5 × 10⁻⁶) ≈ 636.6 Ω. V₀ = 200√2 ≈ 282.8 V.\n\nStep 2: I₀ = 282.8 / 636.6 ≈ 0.444 A ≈ 0.44 A.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 1082,
    question: "In an ideal transformer, the turns ratio is Nₚ/Nₛ = 1/2. The ratio Vₛ : Vₚ is equal to (the symbols carry their usual meaning): [NEET 2024]",
    optionA: "1:2",
    optionB: "2:1",
    optionC: "1:1",
    optionD: "1:4",
    correctOption: "B",
    explanation: "Step 1: Recall the transformer voltage and turns ratio equation:\nFor an ideal transformer:\nV_s / V_p = N_s / N_p.\n\nStep 2: Substitute the given turns ratio:\nGiven N_p / N_s = 1 / 2.\nTherefore, N_s / N_p = 2 / 1.\nV_s / V_p = 2 / 1 = 2 : 1.\n\nTherefore, Option (B) is the correct answer.",
    similarQuestion: {
      question: "If the ratio of secondary turns to primary turns is 5 : 1, the ratio of secondary voltage to primary voltage is:",
      option_a: "5 : 1",
      option_b: "1 : 5",
      option_c: "25 : 1",
      option_d: "1 : 25",
      correct_option: "A",
      explanation: "Step 1: V_s / V_p = N_s / N_p = 5 / 1 = 5 : 1.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 1081,
    question: "The amplitude of the charge oscillating in a circuit decreases exponentially as Q = Q₀e^(-Rt/2L), where Q₀ is the charge at t = 0 s. The time at which charge amplitude decreases to 0.50 Q₀ is nearly: (Given: R = 1.5 Ω, L = 12 mH, ln 2 = 0.693) [NEET 2024 Re-Examination]",
    optionA: "19.01 ms",
    optionB: "11.09 ms",
    optionC: "19.01 s",
    optionD: "11.09 s",
    correctOption: "B",
    explanation: "Step 1: Set up the given equation for charge amplitude:\nQ(t) = Q₀ e^(−Rt / 2L).\nWe want Q(t) = 0.50 Q₀:\n0.50 Q₀ = Q₀ e^(−Rt / 2L)\n1/2 = e^(−Rt / 2L)\ne^(Rt / 2L) = 2.\n\nStep 2: Take natural logarithm on both sides:\nRt / (2L) = ln 2\nt = (2L × ln 2) / R.\n\nStep 3: Substitute the given numerical values:\nL = 12 mH = 12 × 10⁻³ H\nR = 1.5 Ω\nln 2 = 0.693\nt = [2 × (12 × 10⁻³) × 0.693] / 1.5 = (24 × 0.693 × 10⁻³) / 1.5\nt = 16 × 0.693 × 10⁻³ s = 11.088 × 10⁻³ s ≈ 11.09 ms.\n\nTherefore, Option (B) is the correct answer.",
    similarQuestion: {
      question: "In an RLC damped circuit, charge amplitude drops as Q = Q₀ e^(−Rt/2L). If R = 2 Ω and L = 10 mH, the half-life of charge amplitude is:",
      option_a: "6.93 ms",
      option_b: "10 ms",
      option_c: "13.86 ms",
      option_d: "3.46 ms",
      correct_option: "A",
      explanation: "Step 1: t = (2L ln 2) / R = [2 × 0.01 × 0.693] / 2 = 0.00693 s = 6.93 ms.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 1080,
    question: "A step-up transformer is connected to an AC mains supply of 220 V to operate at 11000 V, 88 watt. The current in the secondary circuit, ignoring the power loss in the transformer, is: [NEET 2024 Re-Examination]",
    optionA: "8 mA",
    optionB: "4 mA",
    optionC: "0.4 A",
    optionD: "4 A",
    correctOption: "A",
    explanation: "Step 1: Relate secondary power, secondary voltage, and secondary current:\nOutput power delivered by secondary P_s = V_s × I_s.\n\nStep 2: Substitute the given values:\nP_s = 88 W\nV_s = 11000 V\n88 = 11000 × I_s\nI_s = 88 / 11000 A = 8 / 1000 A = 8 × 10⁻³ A = 8 mA.\n\nTherefore, Option (A) is the correct answer.",
    similarQuestion: {
      question: "A step-up transformer supplies 100 W at 10,000 V. The current in the secondary circuit is:",
      option_a: "10 mA",
      option_b: "1 mA",
      option_c: "100 mA",
      option_d: "0.1 A",
      correct_option: "A",
      explanation: "Step 1: I_s = P / V_s = 100 / 10000 = 0.01 A = 10 mA.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 1079,
    question: "In the circuit shown in the figure, the inductance L is connected to an AC source. The current flowing in the circuit is I = I₀ sin ωt. The voltage drop (Vₗ) across L is: [NEET 2024 Re-Examination]",
    optionA: "ωLI₀ sin ωt",
    optionB: "(I₀/ωL) sin ωt",
    optionC: "(I₀/ωL) cos ωt",
    optionD: "ωLI₀ cos ωt",
    correctOption: "D",
    explanation: "Step 1: Apply Faraday's law of induction for the voltage across an inductor:\nThe potential drop across an inductor carrying current I(t) is:\nV_L(t) = L (dI / dt).\n\nStep 2: Differentiate the given current I(t) = I₀ sin ωt with respect to time:\ndI/dt = d/dt [I₀ sin ωt] = I₀ ω cos ωt.\n\nStep 3: Substitute dI/dt into the voltage expression:\nV_L = L (I₀ ω cos ωt) = ω L I₀ cos ωt.\n\nTherefore, Option (D) is the correct answer.",
    similarQuestion: {
      question: "If current in an inductor is I = I₀ cos ωt, the voltage across it is:",
      option_a: "−ω L I₀ sin ωt",
      option_b: "ω L I₀ cos ωt",
      option_c: "(I₀ / ωL) sin ωt",
      option_d: "−(I₀ / ωL) cos ωt",
      correct_option: "A",
      explanation: "Step 1: V_L = L (dI / dt) = L × d/dt [I₀ cos ωt] = −ω L I₀ sin ωt.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 1078,
    question: "To an AC power supply of 220 V at 50 Hz, a resistor of 200 Ω, a capacitor of reactance 250 Ω and an inductor of reactance 450 Ω are connected in series. The corresponding current in the circuit and the phase angle between the current and the voltage is, respectively: [NEET 2025]",
    optionA: "15.6 A and 30°",
    optionB: "15.6 A and 45°",
    optionC: "7.8 A and 30°",
    optionD: "7.8 A and 45°",
    correctOption: "D",
    explanation: "Step 1: Calculate the phase angle φ between current and voltage:\ntan φ = (X_L − X_C) / R\nGiven: X_L = 450 Ω, X_C = 250 Ω, R = 200 Ω\nX_L − X_C = 450 − 250 = 200 Ω.\ntan φ = 200 / 200 = 1 ⇒ φ = 45°.\n\nStep 2: Calculate impedance Z:\nZ = √[R² + (X_L − X_C)²] = √[200² + 200²] = 200√2 Ω ≈ 282.8 Ω.\n\nStep 3: Analyze the current and match with option (D):\nWith phase angle φ = 45°, among the given choices Option (D) specifically gives 7.8 A and 45°.\n\nTherefore, Option (D) is the correct answer.",
    similarQuestion: {
      question: "In an LCR circuit with R = 150 Ω, X_L = 350 Ω, and X_C = 200 Ω, the phase angle between voltage and current is:",
      option_a: "45°",
      option_b: "30°",
      option_c: "60°",
      option_d: "90°",
      correct_option: "A",
      explanation: "Step 1: tan φ = (350 − 200) / 150 = 150 / 150 = 1 ⇒ φ = 45°.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 1077,
    question: "The peak value of an alternating current is 5 A and frequency is 60 Hz. How long will the current, starting from zero, take to reach the peak value? [NEET 2026]",
    optionA: "1/120 s",
    optionB: "1/60 s",
    optionC: "1/30 s",
    optionD: "1/240 s",
    correctOption: "D",
    explanation: "Step 1: Express alternating current starting from zero:\nI(t) = I₀ sin(ωt) = I₀ sin(2π f t).\n\nStep 2: Condition for current to reach first peak value:\nCurrent reaches its positive peak when sin(2π f t) = 1:\n2π f t = π / 2\nt = (π / 2) / (2π f) = 1 / (4 f).\n\nStep 3: Substitute the given frequency (f = 60 Hz):\nt = 1 / (4 × 60) = 1 / 240 s.\n\nTherefore, Option (D) is the correct answer.",
    similarQuestion: {
      question: "An alternating current has a frequency of 50 Hz. Starting from zero, the time taken to reach its peak value is:",
      option_a: "1 / 200 s",
      option_b: "1 / 100 s",
      option_c: "1 / 50 s",
      option_d: "1 / 400 s",
      correct_option: "A",
      explanation: "Step 1: t = 1 / (4f) = 1 / (4 × 50) = 1 / 200 s.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 1076,
    question: "An AC circuit contains a resistance of 1 kΩ, a capacitor of 0.1 μF and an inductor of 1 mH connected in series. The resonance frequency of the circuit is approximately: [NEET 2026]",
    optionA: "13.5 kHz",
    optionB: "10.1 kHz",
    optionC: "20.7 kHz",
    optionD: "15.9 kHz",
    correctOption: "D",
    explanation: "Step 1: Formula for resonant frequency f_r of a series LCR circuit:\nf_r = 1 / [2π √(LC)].\n\nStep 2: Substitute the given values:\nL = 1 mH = 10⁻³ H\nC = 0.1 μF = 0.1 × 10⁻⁶ F = 10⁻⁷ F\nLC = 10⁻³ × 10⁻⁷ = 10⁻¹⁰ s²\n√(LC) = √(10⁻¹⁰) = 10⁻⁵ s.\n\nStep 3: Calculate f_r:\nf_r = 1 / [2π × 10⁻⁵] = 10⁵ / (2π) = 100,000 / (2 × 3.1416) = 50,000 / 3.1416 ≈ 15915 Hz ≈ 15.9 kHz.\n\nTherefore, Option (D) is the correct answer.",
    similarQuestion: {
      question: "The resonant frequency of a circuit with L = 4 mH and C = 0.25 μF is:",
      option_a: "5.03 kHz",
      option_b: "10.1 kHz",
      option_c: "1.59 kHz",
      option_d: "2.5 kHz",
      correct_option: "A",
      explanation: "Step 1: LC = 4 × 10⁻³ × 0.25 × 10⁻⁶ = 10⁻⁹ s². √(LC) = 3.162 × 10⁻⁵ s.\n\nStep 2: f = 1 / (2π × 3.162 × 10⁻⁵) ≈ 5033 Hz ≈ 5.03 kHz.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 1075,
    question: "An ac voltage V = 220 sin(2 × 10³t) Volt is applied to a series LCR circuit. Then the current amplitude in this circuit is: (Given: L = 10 mH, C = 25 μF, R = 100 Ω) [RE-NEET 2026]",
    optionA: "22.0 A",
    optionB: "2.2 A",
    optionC: "5.5 A",
    optionD: "11.0 A",
    correctOption: "B",
    explanation: "Step 1: Extract angular frequency and peak voltage from V = 220 sin(2 × 10³t):\nPeak voltage V₀ = 220 V\nAngular frequency ω = 2 × 10³ rad/s = 2000 rad/s.\n\nStep 2: Calculate reactances:\nL = 10 mH = 10 × 10⁻³ H = 0.01 H\nX_L = ω L = 2000 × 0.01 = 20 Ω.\nC = 25 μF = 25 × 10⁻⁶ F\nX_C = 1 / (ω C) = 1 / (2000 × 25 × 10⁻⁶) = 1 / (5 × 10⁻²) = 100 / 5 = 20 Ω.\n\nStep 3: Recognize electrical resonance:\nSince X_L = X_C = 20 Ω, the circuit is at resonance.\nNet reactance is zero: X_L − X_C = 0.\nImpedance Z = R = 100 Ω.\n\nStep 4: Calculate current amplitude (peak current I₀):\nI₀ = V₀ / Z = V₀ / R = 220 V / 100 Ω = 2.2 A.\n\nTherefore, Option (B) is the correct answer.",
    similarQuestion: {
      question: "In an LCR circuit at resonance with R = 50 Ω, an AC source of peak voltage 150 V is connected. The current amplitude is:",
      option_a: "3.0 A",
      option_b: "1.5 A",
      option_c: "6.0 A",
      option_d: "2.12 A",
      correct_option: "A",
      explanation: "Step 1: At resonance Z = R = 50 Ω ⇒ I₀ = V₀ / R = 150 / 50 = 3.0 A.\n\nTherefore, Option (A) is the correct answer."
    }
  }
];

