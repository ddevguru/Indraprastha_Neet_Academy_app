module.exports = [
  {
    id: 1138,
    question: "A capacitor of capacity C has reactance X. If capacitance and frequency become double, then reactance will be: [AIPMT 2001]",
    optionA: "4X",
    optionB: "X/2",
    optionC: "X/4",
    optionD: "2X",
    correctOption: "C",
    explanation: "Step 1: Formula for capacitive reactance X:\nX = 1 / (2π f C) = 1 / (ω C).\n\nStep 2: Calculate new capacitive reactance X' when C' = 2C and f' = 2f:\nX' = 1 / [2π (2f) (2C)] = 1 / [4 (2π f C)] = X / 4.\n\nTherefore, the new reactance is X/4.\n\nTherefore, Option (C) is the correct answer.",
    similarQuestion: {
      question: "If the capacitance of a capacitor is halved and the frequency of the AC source is doubled, its capacitive reactance will:",
      option_a: "Remain unchanged",
      option_b: "Be doubled",
      option_c: "Be halved",
      option_d: "Become four times",
      correct_option: "A",
      explanation: "Step 1: X = 1 / (2π f C).\n\nStep 2: X' = 1 / [2π (2f) (C/2)] = 1 / (2π f C) = X.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 1137,
    question: "For a series LCR circuit, the power loss at resonance is: [AIPMT 2002]",
    optionA: "V²/[ωL - 1/(ωC)]",
    optionB: "I²Lω",
    optionC: "I²R",
    optionD: "V²/(Cω)",
    correctOption: "C",
    explanation: "Step 1: Understand resonance condition in a series LCR circuit:\nAt resonance, the inductive reactance equals the capacitive reactance (X_L = X_C).\nThe net reactance is zero, and the circuit impedance is purely resistive: Z = R.\n\nStep 2: Calculate average power dissipated:\nAverage power loss is P = I_rms² Z cos φ.\nSince φ = 0° (power factor cos φ = 1) and Z = R:\nP = I² R (or V² / R).\n\nTherefore, the power loss at resonance is I²R.\n\nTherefore, Option (C) is the correct answer.",
    similarQuestion: {
      question: "In a series LCR circuit at electrical resonance, the power factor is equal to:",
      option_a: "1.0",
      option_b: "Zero",
      option_c: "0.5",
      option_d: "0.707",
      correct_option: "A",
      explanation: "Step 1: At resonance, X_L = X_C, so phase difference φ = 0°. Power factor cos φ = cos(0°) = 1.0.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 1136,
    question: "A coil of 40 henry inductance is connected in series with a resistance of 8 ohm and the combination is joined to the terminals of a 2 volt battery. The time constant of the circuit is: [AIPMT 2004]",
    optionA: "5 seconds",
    optionB: "1/5 seconds",
    optionC: "40 seconds",
    optionD: "20 seconds",
    correctOption: "A",
    explanation: "Step 1: Recall the definition of inductive time constant (τ) for an LR circuit:\nIn a series LR circuit connected to a DC source, the growth of current is given by I(t) = I₀(1 − e^(−t/τ)).\nThe time constant τ is defined as:\nτ = L / R.\n\nStep 2: Substitute the given numerical values:\nL = 40 H\nR = 8 Ω\nτ = 40 / 8 = 5 seconds.\n\nTherefore, Option (A) is the correct answer.",
    similarQuestion: {
      question: "An inductor of 50 H is connected in series with a resistor of 10 Ω across a DC source. The time constant of the circuit is:",
      option_a: "5 s",
      option_b: "0.2 s",
      option_c: "500 s",
      option_d: "25 s",
      correct_option: "A",
      explanation: "Step 1: Time constant τ = L / R = 50 / 10 = 5 s.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 1135,
    question: "In a circuit, L, C and R are connected in series with an alternating voltage source of frequency f. The current leads the voltage by 45°. The value of C is: [AIPMT 2005]",
    optionA: "1/[πf(2πfL - R)]",
    optionB: "1/[2πf(2πfL - R)]",
    optionC: "1/[πf(2πfL + R)]",
    optionD: "1/[2πf(2πfL + R)]",
    correctOption: "D",
    explanation: "Step 1: Set up the phase relation in a series LCR circuit:\nWhen the current leads the voltage by angle φ = 45°, the circuit is capacitive (X_C > X_L).\ntan φ = (X_C − X_L) / R\ntan 45° = 1 ⇒ (X_C − X_L) / R = 1\nX_C − X_L = R\nX_C = X_L + R.\n\nStep 2: Substitute reactance expressions:\nX_C = 1 / (ω C) = 1 / (2π f C)\nX_L = ω L = 2π f L.\n1 / (2π f C) = 2π f L + R.\n\nStep 3: Solve for capacitance C:\n2π f C = 1 / (2π f L + R)\nC = 1 / [2π f (2π f L + R)].\n\nTherefore, Option (D) is the correct answer.",
    similarQuestion: {
      question: "In a series LCR circuit, current leads voltage by 45°. If angular frequency is ω, the capacitance C is:",
      option_a: "1 / [ω(ωL + R)]",
      option_b: "1 / [ω(ωL − R)]",
      option_c: "ω / (ωL + R)",
      option_d: "(ωL + R) / ω",
      correct_option: "A",
      explanation: "Step 1: tan 45° = 1 = (X_C − X_L) / R ⇒ 1/(ωC) = ωL + R ⇒ C = 1 / [ω(ωL + R)].\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 1134,
    question: "A transistor oscillator using a resonant circuit with an inductor L (of negligible resistance) and a capacitor C in series produces oscillations of frequency f. If L is doubled and C is changed to 4C, the frequency will be: [AIPMT 2006]",
    optionA: "f/2",
    optionB: "f/4",
    optionC: "8f",
    optionD: "f/(2√2)",
    correctOption: "D",
    explanation: "Step 1: Formula for resonant frequency of an LC circuit:\nf = 1 / [2π √(LC)].\n\nStep 2: Calculate new frequency f' when L' = 2L and C' = 4C:\nf' = 1 / [2π √(L' C')] = 1 / [2π √(2L × 4C)] = 1 / [2π √(8 LC)]\nf' = 1 / [√8 × 2π √(LC)] = f / √8 = f / (2√2).\n\nTherefore, Option (D) is the correct answer.",
    similarQuestion: {
      question: "In an LC tank circuit, if inductance is made 4 times and capacitance is made 9 times, the new oscillating frequency becomes:",
      option_a: "f / 6",
      option_b: "f / 36",
      option_c: "6f",
      option_d: "f / 13",
      correct_option: "A",
      explanation: "Step 1: f' = 1 / [2π √(4L × 9C)] = 1 / [6 × 2π √(LC)] = f / 6.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 1133,
    question: "The core of a transformer is laminated because: [AIPMT 2006]",
    optionA: "The ratio of voltage in primary and secondary may be increased.",
    optionB: "Energy losses due to eddy currents may be minimised.",
    optionC: "The weight of the transformer may be reduced.",
    optionD: "Rusting of the core may be prevented.",
    correctOption: "B",
    explanation: "Step 1: Understand eddy currents in transformer cores:\nThe alternating magnetic flux in the iron core induces circulating currents (eddy currents) in the bulk metallic core according to Faraday's law. These currents cause substantial I²R Joule heating energy loss.\n\nStep 2: Role of laminations:\nThe core is constructed from thin sheets (laminations) of silicon steel, insulated from each other by varnish. This breaks up the continuous conduction loops, greatly increasing electrical resistance across the laminations and minimising eddy current losses.\n\nTherefore, Option (B) is the correct answer.",
    similarQuestion: {
      question: "Eddy current loss in a magnetic core is proportional to which power of the lamination thickness t?",
      option_a: "t²",
      option_b: "t",
      option_c: "t³",
      option_d: "1/t",
      correct_option: "A",
      explanation: "Step 1: Eddy current power loss per unit volume is proportional to the square of lamination thickness (P_e ∝ t²).\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 1132,
    question: "A coil of inductive reactance 31 Ω has a resistance of 8 Ω. It is placed in series with a condenser of capacitive reactance 25 Ω. The combination is connected to an AC source of 110 V. The power factor of the circuit is: [AIPMT 2006]",
    optionA: "0.33",
    optionB: "0.56",
    optionC: "0.64",
    optionD: "0.80",
    correctOption: "D",
    explanation: "Step 1: Identify given parameters:\nR = 8 Ω\nX_L = 31 Ω\nX_C = 25 Ω\n\nStep 2: Calculate net reactance X:\nX = X_L − X_C = 31 − 25 = 6 Ω.\n\nStep 3: Calculate impedance Z of the series LCR circuit:\nZ = √[R² + (X_L − X_C)²] = √[8² + 6²] = √[64 + 36] = √100 = 10 Ω.\n\nStep 4: Calculate power factor cos φ:\ncos φ = R / Z = 8 / 10 = 0.80.\n\nTherefore, Option (D) is the correct answer.",
    similarQuestion: {
      question: "A circuit contains R = 12 Ω, X_L = 15 Ω and X_C = 10 Ω connected in series to an AC source. The power factor is:",
      option_a: "0.92",
      option_b: "0.80",
      option_c: "0.50",
      option_d: "0.71",
      correct_option: "A",
      explanation: "Step 1: Z = √[12² + (15 − 10)²] = √[144 + 25] = √169 = 13 Ω.\n\nStep 2: cos φ = R / Z = 12 / 13 ≈ 0.923 ≈ 0.92.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 1131,
    question: "What is the value of inductance L for which the current is maximum in a series LCR circuit with C = 10 μF and ω = 1000 s⁻¹? [AIPMT 2007]",
    optionA: "1 mH",
    optionB: "Cannot be calculated unless R is known",
    optionC: "10 mH",
    optionD: "100 mH",
    correctOption: "D",
    explanation: "Step 1: Condition for maximum current in series LCR circuit:\nCurrent I = V / Z is maximum when impedance Z is minimum, which occurs at resonance (X_L = X_C).\n\nStep 2: Apply the resonance formula:\nω L = 1 / (ω C)\nL = 1 / (ω² C).\n\nStep 3: Substitute the numerical values:\nω = 1000 rad/s ⇒ ω² = 10⁶ s⁻²\nC = 10 μF = 10 × 10⁻⁶ F = 10⁻⁵ F\nL = 1 / (10⁶ × 10⁻⁵) = 1 / 10 = 0.1 H = 100 mH.\n\nTherefore, Option (D) is the correct answer.",
    similarQuestion: {
      question: "Find the resonant frequency in rad/s for an LCR circuit having L = 200 mH and C = 50 μF:",
      option_a: "316 rad/s",
      option_b: "100 rad/s",
      option_c: "500 rad/s",
      option_d: "1000 rad/s",
      correct_option: "A",
      explanation: "Step 1: ω = 1 / √(LC) = 1 / √(0.2 × 50 × 10⁻⁶) = 1 / √(10⁻⁵) = 1 / (3.162 × 10⁻³) ≈ 316 rad/s.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 1130,
    question: "A transformer is used to light a 100 W, 110 V lamp from a 220 V mains supply. If the mains current is 0.5 amp, the efficiency of the transformer is approximately: [AIPMT 2007]",
    optionA: "50%",
    optionB: "90%",
    optionC: "10%",
    optionD: "30%",
    correctOption: "B",
    explanation: "Step 1: Identify given parameters:\nOutput power delivered to lamp P_out = 100 W.\nPrimary (mains) supply voltage V_p = 220 V.\nPrimary (mains) current I_p = 0.5 A.\n\nStep 2: Calculate input power supplied to the primary:\nP_in = V_p × I_p = 220 V × 0.5 A = 110 W.\n\nStep 3: Calculate efficiency η:\nη = (P_out / P_in) × 100% = (100 / 110) × 100% = 1000 / 11 % ≈ 90.9% ≈ 90%.\n\nTherefore, Option (B) is the correct answer.",
    similarQuestion: {
      question: "A transformer operating from 240 V mains supplies 120 W power to a device. If primary current is 0.6 A, the efficiency is:",
      option_a: "83.3%",
      option_b: "90%",
      option_c: "75%",
      option_d: "95%",
      correct_option: "A",
      explanation: "Step 1: P_in = 240 × 0.6 = 144 W.\n\nStep 2: η = (120 / 144) × 100% = (5/6) × 100% ≈ 83.3%.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 1129,
    question: "The primary and secondary coils of a transformer have 50 and 1500 turns, respectively. If the magnetic flux linked with the primary coil is given by φ = φ₀ + 4t, where φ is in webers, t is time in seconds and φ₀ is a constant, the output voltage across the secondary coil is: [AIPMT 2007]",
    optionA: "120 volt",
    optionB: "220 volts",
    optionC: "30 volts",
    optionD: "90 volts",
    correctOption: "A",
    explanation: "Step 1: Calculate induced electromotive force in the primary coil:\nFlux through primary is φ = φ₀ + 4t.\nRate of change of magnetic flux per turn is dφ/dt = 4 Wb/s.\nPrimary voltage per turn is dφ/dt = 4 V.\nPrimary emf across N_p turns is E_p = N_p (dφ/dt) or directly:\n\nStep 2: Relate secondary voltage to turns ratio:\nFor an ideal transformer, the voltage ratio equals the turns ratio:\nE_s / E_p = N_s / N_p\nSince each turn experiences dφ/dt = 4 V:\nE_s = N_s × (dφ/dt) = 1500 × 4 / (turns factor)? Wait, let's verify:\nIf φ is the flux linked with each turn of primary coil: dφ/dt = 4 V/turn.\nTotal flux linked with primary coil = φ = φ₀ + 4t ⇒ E_p = dφ/dt = 4 V.\nThen E_s = (N_s / N_p) × E_p = (1500 / 50) × 4 = 30 × 4 = 120 V.\n\nTherefore, Option (A) is the correct answer.",
    similarQuestion: {
      question: "A transformer has N_p = 100 and N_s = 2000. If the primary emf is 5 V, the secondary output voltage is:",
      option_a: "100 V",
      option_b: "50 V",
      option_c: "200 V",
      option_d: "10 V",
      correct_option: "A",
      explanation: "Step 1: E_s = (N_s / N_p) × E_p = (2000 / 100) × 5 = 20 × 5 = 100 V.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 1128,
    question: "In an AC circuit, the emf (ε) and the current (i) at any instant are given respectively by: ε = E₀ sin ωt i = I₀ sin(ωt - φ) The average power in the circuit over one cycle of AC is: [AIPMT 2008]",
    optionA: "(E₀I₀/2) cos φ",
    optionB: "E₀I₀",
    optionC: "E₀I₀/2",
    optionD: "(E₀I₀/2) sin φ",
    correctOption: "A",
    explanation: "Step 1: Write instantaneous power expression:\nP(t) = ε(t) × i(t) = [E₀ sin ωt] [I₀ sin(ωt − φ)]\n= E₀ I₀ sin ωt [sin ωt cos φ − cos ωt sin φ]\n= E₀ I₀ [sin² ωt cos φ − sin ωt cos ωt sin φ].\n\nStep 2: Take average over a complete cycle:\nAverage of sin² ωt is 1/2.\nAverage of sin ωt cos ωt = (1/2) sin(2ωt) is 0.\nP_avg = E₀ I₀ [(1/2) cos φ − 0] = (E₀ I₀ / 2) cos φ.\n(Alternatively, P_avg = E_rms I_rms cos φ = (E₀ / √2) (I₀ / √2) cos φ = (E₀ I₀ / 2) cos φ).\n\nTherefore, Option (A) is the correct answer.",
    similarQuestion: {
      question: "If peak voltage is 100 V and peak current is 4 A with phase lag of 60°, the average power consumed over a cycle is:",
      option_a: "100 W",
      option_b: "200 W",
      option_c: "50 W",
      option_d: "400 W",
      correct_option: "A",
      explanation: "Step 1: P_avg = (E₀ I₀ / 2) cos φ = (100 × 4 / 2) cos 60° = 200 × 0.5 = 100 W.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 1127,
    question: "Power dissipated in an LCR series circuit connected to an AC source of emf ε is: [AIPMT 2009]",
    optionA: "ε²[R² + (Lω - 1/Cω)²]/R",
    optionB: "ε²√[R² + (Lω - 1/Cω)²]/R",
    optionC: "ε²R/√[R² + (Lω - 1/Cω)²]",
    optionD: "ε²R/[R² + (Lω - 1/Cω)²]",
    correctOption: "D",
    explanation: "Step 1: Write formula for average power in an AC circuit:\nP = I_rms² R\nwhere I_rms is the RMS current through the resistor.\n\nStep 2: Express RMS current in terms of source emf ε and impedance Z:\nI_rms = ε / Z\nImpedance Z = √[R² + (ωL − 1/ωC)²].\n\nStep 3: Substitute I_rms into the power formula:\nP = (ε / Z)² R = ε² R / Z²\nP = ε² R / [R² + (Lω − 1/Cω)²].\n\nTherefore, Option (D) is the correct answer.",
    similarQuestion: {
      question: "In a series LCR circuit connected to AC source of rms voltage V, the average power dissipated is given by:",
      option_a: "V² R / Z²",
      option_b: "V² Z / R²",
      option_c: "V² / Z",
      option_d: "V² / R",
      correct_option: "A",
      explanation: "Step 1: P = I² R = (V / Z)² R = V² R / Z².\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 1126,
    question: "A 220 volt input is supplied to a transformer. The output circuit draws a current of 2.0 ampere at 440 volts. If the efficiency of the transformer is 80%, the current drawn by the primary windings of the transformer is: [AIPMT 2010 Prelims]",
    optionA: "3.6 ampere",
    optionB: "2.8 ampere",
    optionC: "2.5 ampere",
    optionD: "5.0 ampere",
    correctOption: "D",
    explanation: "Step 1: Identify given parameters:\nPrimary voltage V_p = 220 V\nSecondary voltage V_s = 440 V\nSecondary current I_s = 2.0 A\nEfficiency η = 80% = 0.80\n\nStep 2: Calculate output power P_out:\nP_out = V_s × I_s = 440 V × 2.0 A = 880 W.\n\nStep 3: Relate output power and input power via efficiency:\nη = P_out / P_in ⇒ P_in = P_out / η = 880 / 0.80 = 1100 W.\n\nStep 4: Calculate current drawn by primary winding I_p:\nP_in = V_p × I_p\n1100 W = 220 V × I_p\nI_p = 1100 / 220 = 5.0 A.\n\nTherefore, Option (D) is the correct answer.",
    similarQuestion: {
      question: "A transformer with 90% efficiency steps down 200 V to 20 V to draw 9 A current in secondary. The primary current is:",
      option_a: "1.0 A",
      option_b: "0.9 A",
      option_c: "2.0 A",
      option_d: "0.5 A",
      correct_option: "A",
      explanation: "Step 1: P_out = 20 × 9 = 180 W.\n\nStep 2: P_in = 180 / 0.9 = 200 W ⇒ I_p = 200 / 200 = 1.0 A.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 1125,
    question: "In the given circuit, the readings of voltmeters V₁ and V₂ are 300 volts each. The readings of voltmeter V₃ and ammeter A are, respectively: [AIPMT 2010 Prelims]",
    optionA: "150 V, 2.2 A",
    optionB: "220 V, 2.2 A",
    optionC: "220 V, 2.0 A",
    optionD: "100 V, 2.0 A",
    correctOption: "B",
    explanation: "Step 1: Analyze voltmeter readings in the series LCR circuit:\nV₁ measures potential difference across inductor L (V_L = 300 V).\nV₂ measures potential difference across capacitor C (V_C = 300 V).\nV₃ measures potential difference across resistor R (V_R).\nSource voltage is 220 V (50 Hz), with R = 100 Ω.\n\nStep 2: Recognize electrical resonance:\nSince V_L = V_C = 300 V, inductive and capacitive voltages are equal in magnitude and 180° out of phase, so they cancel out completely:\nV_net = √[V_R² + (V_L − V_C)²] = √[V_R² + 0] = V_R.\nTherefore, the entire applied source voltage appears across the resistor:\nV₃ = V_R = 220 V.\n\nStep 3: Calculate ammeter reading (current I):\nI = V_R / R = 220 V / 100 Ω = 2.2 A.\n\nStep 4: Combine results:\nVoltmeter V₃ reads 220 V and ammeter reads 2.2 A.\n\nTherefore, Option (B) is the correct answer.",
    similarQuestion: {
      question: "In a series LCR circuit connected to a 200 V AC source, V_L = 150 V and V_C = 150 V. If R = 50 Ω, the current is:",
      option_a: "4.0 A",
      option_b: "3.0 A",
      option_c: "2.0 A",
      option_d: "1.0 A",
      correct_option: "A",
      explanation: "Step 1: At resonance V_L = V_C, so V_R = V_source = 200 V.\n\nStep 2: I = V_R / R = 200 / 50 = 4.0 A.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 1124,
    question: "A condenser of capacity C is charged to a potential difference of V₁. The plates of the condenser are then connected to an ideal inductor of inductance L. The current through the inductor when the potential difference across the condenser reduces to V₂ is: [AIPMT 2010 Mains]",
    optionA: "[C(V₁ - V₂)²/L]¹ᐟ²",
    optionB: "C(V₁² - V₂²)/L",
    optionC: "C(V₁² + V₂²)/L",
    optionD: "[C(V₁² - V₂²)/L]¹ᐟ²",
    correctOption: "D",
    explanation: "Step 1: Apply law of conservation of electromagnetic energy in an ideal LC circuit:\nInitial electrostatic energy stored in the capacitor:\nU_initial = (1/2) C V₁².\nWhen potential difference across the capacitor drops to V₂ and current in the inductor is I:\nTotal energy = (1/2) C V₂² + (1/2) L I².\n\nStep 2: Equate initial and final energy:\n(1/2) C V₁² = (1/2) C V₂² + (1/2) L I²\n(1/2) L I² = (1/2) C (V₁² − V₂²)\nL I² = C (V₁² − V₂²)\nI² = [C (V₁² − V₂²)] / L\nI = [C(V₁² − V₂²) / L]¹ᐟ².\n\nTherefore, Option (D) is the correct answer.",
    similarQuestion: {
      question: "A capacitor C charged to V₀ is discharged through an inductor L. The peak current through the inductor is:",
      option_a: "V₀ √(C / L)",
      option_b: "V₀ √(L / C)",
      option_c: "V₀² C / L",
      option_d: "V₀ / √(LC)",
      correct_option: "A",
      explanation: "Step 1: All electric energy converts to magnetic energy: (1/2)CV₀² = (1/2)LI_max² ⇒ I_max = V₀√(C/L).\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 1123,
    question: "In the AC circuit, an alternating voltage e = 200√2 sin(100t) volts is connected to a capacitor of capacity 1 μF. The RMS value of the current in the circuit is: [AIPMT 2011 Prelims]",
    optionA: "10 mA",
    optionB: "100 mA",
    optionC: "200 mA",
    optionD: "20 mA",
    correctOption: "D",
    explanation: "Step 1: Extract voltage parameters from the given equation:\ne = 200√2 sin(100t) V\nPeak voltage E₀ = 200√2 V\nRMS voltage E_rms = E₀ / √2 = (200√2) / √2 = 200 V\nAngular frequency ω = 100 rad/s\nCapacitance C = 1 μF = 10⁻⁶ F.\n\nStep 2: Calculate capacitive reactance X_C:\nX_C = 1 / (ω C) = 1 / (100 × 10⁻⁶) = 10⁴ Ω = 10,000 Ω.\n\nStep 3: Calculate RMS current I_rms:\nI_rms = E_rms / X_C = 200 V / 10,000 Ω = 0.02 A = 20 mA.\n\nTherefore, Option (D) is the correct answer.",
    similarQuestion: {
      question: "An AC voltage V = 100√2 sin(200t) V is applied across a 5 μF capacitor. The RMS current is:",
      option_a: "100 mA",
      option_b: "50 mA",
      option_c: "20 mA",
      option_d: "200 mA",
      correct_option: "A",
      explanation: "Step 1: V_rms = 100 V, X_C = 1 / (200 × 5 × 10⁻⁶) = 1000 Ω.\n\nStep 2: I_rms = 100 / 1000 = 0.1 A = 100 mA.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 1122,
    question: "An AC voltage is applied to a resistance R and an inductor L in series. If R and the inductive reactance are both equal to 3 Ω, the phase difference between the applied voltage and the current in the circuit is: [AIPMT 2011 Prelims]",
    optionA: "π/6",
    optionB: "π/4",
    optionC: "π/2",
    optionD: "Zero",
    correctOption: "B",
    explanation: "Step 1: Write the formula for phase angle φ in a series LR circuit:\ntan φ = X_L / R\nwhere X_L is the inductive reactance and R is the resistance.\n\nStep 2: Substitute the given values:\nX_L = 3 Ω\nR = 3 Ω\ntan φ = 3 / 3 = 1.\n\nStep 3: Determine phase difference φ:\nφ = arctan(1) = 45° = π/4 radian.\n\nTherefore, Option (B) is the correct answer.",
    similarQuestion: {
      question: "In an LR series circuit, if inductive reactance is √3 times the resistance, the phase difference between voltage and current is:",
      option_a: "π/3",
      option_b: "π/6",
      option_c: "π/4",
      option_d: "π/2",
      correct_option: "A",
      explanation: "Step 1: tan φ = X_L / R = √3 ⇒ φ = 60° = π/3.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 1121,
    question: "A coil has resistance 30 Ω and inductive reactance 20 Ω at 50 Hz frequency. If an AC source of 200 Volt, 100 Hz is connected across the coil, the current in the coil will be: [AIPMT 2011 Mains]",
    optionA: "2.0 A",
    optionB: "4.0 A",
    optionC: "8.0 A",
    optionD: "20/√13 A",
    correctOption: "B",
    explanation: "Step 1: Determine new inductive reactance at 100 Hz:\nInductive reactance is X_L = 2π f L ∝ f.\nAt f₁ = 50 Hz, X_L1 = 20 Ω.\nAt f₂ = 100 Hz (frequency doubled):\nX_L2 = 2 × 20 = 40 Ω.\n\nStep 2: Calculate impedance Z at 100 Hz:\nResistance R = 30 Ω (independent of frequency).\nZ = √[R² + X_L2²] = √[30² + 40²] = √[900 + 1600] = √2500 = 50 Ω.\n\nStep 3: Calculate current in the coil:\nI = V / Z = 200 V / 50 Ω = 4.0 A.\n\nTherefore, Option (B) is the correct answer.",
    similarQuestion: {
      question: "A coil has R = 6 Ω and X_L = 4 Ω at 50 Hz. When connected to a 100 V, 100 Hz supply, the impedance is:",
      option_a: "10 Ω",
      option_b: "14 Ω",
      option_c: "8 Ω",
      option_d: "12 Ω",
      correct_option: "A",
      explanation: "Step 1: At 100 Hz, X_L' = 2 × 4 = 8 Ω.\n\nStep 2: Z = √(6² + 8²) = 10 Ω.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 1120,
    question: "The RMS value of potential difference V shown in the figure (square wave of magnitude V₀ from 0 to T/2 and -V₀ from T/2 to T) is: [AIPMT 2011 Mains]",
    optionA: "V₀/√3",
    optionB: "V₀",
    optionC: "V₀/√2",
    optionD: "V₀/2",
    correctOption: "B",
    explanation: "Step 1: Define Root Mean Square (RMS) value of a periodic voltage V(t):\nV_rms = √[(1/T) ∫₀ᵀ V(t)² dt].\n\nStep 2: Evaluate the integral for the square wave:\nFor 0 ≤ t < T/2: V(t) = +V₀ ⇒ V(t)² = V₀².\nFor T/2 ≤ t < T: V(t) = −V₀ ⇒ V(t)² = (−V₀)² = V₀².\nThus, throughout the entire cycle from 0 to T, V(t)² = V₀².\n\nStep 3: Calculate the mean square value and square root:\nMean square = (1/T) ∫₀ᵀ V₀² dt = (1/T) × (V₀² T) = V₀².\nV_rms = √(V₀²) = V₀.\n\nTherefore, Option (B) is the correct answer.",
    similarQuestion: {
      question: "For a periodic square wave voltage alternating symmetrically between +10 V and −10 V, the RMS value is:",
      option_a: "10 V",
      option_b: "7.07 V",
      option_c: "5 V",
      option_d: "Zero",
      correct_option: "A",
      explanation: "Step 1: Since V² = (±10)² = 100 at all instants, V_rms = √100 = 10 V.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 1119,
    question: "The current (I) in the inductance is varying with time according to the plot shown in the figure (triangular wave from 0 to T). Which one of the following is the correct variation of voltage with time in the coil? [AIPMT 2012 Prelims]",
    optionA: "Triangular wave",
    optionB: "Triangular wave in opposite phase",
    optionC: "Sinusoidal wave",
    optionD: "Square wave with +V for 0 < t < T/2 and -V for T/2 < t < T",
    correctOption: "D",
    explanation: "Step 1: Relate voltage across an inductor to current:\nV_L(t) = L (dI/dt).\n\nStep 2: Differentiate the triangular current waveform:\n- From t = 0 to t = T/2, current increases linearly with constant positive slope: dI/dt = +k ⇒ V_L = +L k (constant positive voltage).\n- From t = T/2 to t = T, current decreases linearly with constant negative slope: dI/dt = −k ⇒ V_L = −L k (constant negative voltage).\n\nStep 3: Deduce the resulting voltage waveform:\nThe derivative of a symmetric triangular wave is a square wave with equal positive and negative plateaus.\n\nTherefore, Option (D) is the correct answer.",
    similarQuestion: {
      question: "If current in an inductor increases at a constant rate of 2 A/s, the voltage across an inductor of 3 H is:",
      option_a: "Constant 6 V",
      option_b: "Linearly increasing voltage",
      option_c: "Sinusoidal voltage",
      option_d: "Zero",
      correct_option: "A",
      explanation: "Step 1: V = L (dI/dt) = 3 × 2 = 6 V (constant).\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 1118,
    question: "In an electrical circuit, R, L, C and an AC voltage source are all connected in series. When L is removed from the circuit, the phase difference between the voltage and the current in the circuit is π/3. If instead C is removed from the circuit, the phase difference is again π/3. The power factor of the circuit is: [AIPMT 2012 Prelims]",
    optionA: "1/2",
    optionB: "1/√2",
    optionC: "1",
    optionD: "√3/2",
    correctOption: "C",
    explanation: "Step 1: Analyze circuit when L is removed (series RC circuit):\nPhase difference is φ = π/3 (current leads voltage):\ntan(π/3) = X_C / R ⇒ X_C / R = √3 ⇒ X_C = R √3.\n\nStep 2: Analyze circuit when C is removed (series RL circuit):\nPhase difference is φ = π/3 (voltage leads current):\ntan(π/3) = X_L / R ⇒ X_L / R = √3 ⇒ X_L = R √3.\n\nStep 3: Analyze complete series LCR circuit:\nSince X_L = R √3 and X_C = R √3, we have X_L = X_C.\nThe net reactance is X_L − X_C = 0, meaning the complete circuit operates at resonance.\nImpedance Z = R, and phase difference φ = 0.\n\nStep 4: Calculate power factor:\nPower factor = cos φ = cos(0) = 1.\n\nTherefore, Option (C) is the correct answer.",
    similarQuestion: {
      question: "In an LCR circuit, removing L gives phase angle 45°, and removing C also gives phase angle 45°. The power factor of the complete circuit is:",
      option_a: "1",
      option_b: "0.5",
      option_c: "0.707",
      option_d: "Zero",
      correct_option: "A",
      explanation: "Step 1: When both removals give equal phase angles, X_L = X_C, placing the full circuit at resonance with power factor cos 0° = 1.\n\nTherefore, Option (A) is the correct answer."
    }
  }
];

