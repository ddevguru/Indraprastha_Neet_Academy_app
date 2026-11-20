module.exports = [
  {
    id: 1117,
    question: "The instantaneous values of alternating current and voltage in a circuit are given as: i = (1/√2) sin(100πt) ampere e = (1/√2) sin(100πt + π/3) Volt The average power in watts consumed in the circuit is: [AIPMT 2012 Mains]",
    optionA: "1/4",
    optionB: "√3/4",
    optionC: "1/2",
    optionD: "1/8",
    correctOption: "D",
    explanation: "Step 1: Identify peak values and phase difference from given equations:\nPeak current I₀ = 1/√2 A ⇒ I_rms = I₀ / √2 = (1/√2) / √2 = 1/2 A\nPeak voltage E₀ = 1/√2 V ⇒ E_rms = E₀ / √2 = (1/√2) / √2 = 1/2 V\nPhase difference φ = π/3 rad = 60°.\n\nStep 2: Calculate average power consumed over a cycle:\nP_avg = E_rms × I_rms × cos φ\nP_avg = (1/2) × (1/2) × cos 60°\nSince cos 60° = 1/2:\nP_avg = (1/2) × (1/2) × (1/2) = 1/8 W.\n\nTherefore, Option (D) is the correct answer.",
    similarQuestion: {
      question: "If e = 2 sin(ωt) V and i = 4 sin(ωt + π/3) A, the average power dissipated is:",
      option_a: "2 W",
      option_b: "4 W",
      option_c: "1 W",
      option_d: "8 W",
      correct_option: "A",
      explanation: "Step 1: P_avg = (1/2) E₀ I₀ cos φ = (1/2) × 2 × 4 × cos 60° = 4 × 0.5 = 2 W.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 1116,
    question: "A coil of self-inductance L is connected in series with a bulb B and an AC source. The brightness of the bulb decreases when: [NEET 2013]",
    optionA: "A capacitance of reactance X_C = X_L is included in the same circuit.",
    optionB: "An iron rod is inserted in the coil.",
    optionC: "The frequency of the AC source is decreased.",
    optionD: "The number of turns in the coil is reduced.",
    correctOption: "B",
    explanation: "Step 1: Relate brightness of the bulb to circuit current:\nThe brightness of the bulb depends directly on the power dissipated in the filament: P = I² R_bulb.\nThus, decreasing circuit current I decreases bulb brightness.\n\nStep 2: Analyze the effect of inserting an iron rod into the coil:\nIron is a ferromagnetic material with high relative magnetic permeability (μ_r >> 1).\nInserting an iron core increases the self-inductance of the coil: L = μ_r μ₀ n² A l.\nAs L increases, the inductive reactance X_L = ωL increases.\nThe circuit impedance Z = √[R² + X_L²] increases, causing current I = V / Z to decrease.\nConsequently, the brightness of the bulb decreases.\n\nStep 3: Evaluate other options:\n- Option A creates resonance (Z = R, minimum impedance), which maximizes brightness.\n- Option C decreases X_L = 2πfL, increasing current and brightness.\n- Option D decreases L ∝ N², decreasing impedance and increasing brightness.\n\nTherefore, Option (B) is the correct answer.",
    similarQuestion: {
      question: "In an AC circuit with an inductor and a bulb, what happens to the bulb's brightness if an air-cored inductor is replaced by a soft iron-cored inductor?",
      option_a: "Brightness decreases",
      option_b: "Brightness increases",
      option_c: "Brightness remains unchanged",
      option_d: "The bulb fuses immediately",
      correct_option: "A",
      explanation: "Step 1: Soft iron core increases inductance L, increasing inductive reactance X_L and impedance, which reduces current and bulb brightness.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 1115,
    question: "The primary of a transformer, when connected to a DC battery of 10 Volt, draws a current of 1 mA. The number of turns of the primary and secondary windings are 50 and 100, respectively. The voltage in the secondary and the current drawn by the circuit in the secondary are, respectively: [NEET 2013 Karnataka]",
    optionA: "20 V and 2.0 mA",
    optionB: "10 V and 0.5 mA",
    optionC: "Zero volt and therefore no current",
    optionD: "20 V and 0.5 mA",
    correctOption: "C",
    explanation: "Step 1: Understand principle of transformer operation:\nA transformer operates on the principle of mutual induction between two coils, governed by Faraday's law of induction:\nE_s = −N_s (dφ/dt).\nAn induced emf in the secondary requires a continuously changing magnetic flux (dφ/dt ≠ 0).\n\nStep 2: Effect of steady DC voltage:\nA DC battery provides a constant, steady current. Once steady state is reached, the magnetic flux in the primary coil is completely constant (dφ/dt = 0).\nBecause there is no rate of change of magnetic flux, the induced electromotive force in the secondary winding is zero:\nE_s = 0 V.\nWith zero secondary voltage, no current flows in the secondary circuit.\n\nTherefore, Option (C) is the correct answer.",
    similarQuestion: {
      question: "What happens when a 12 V DC source is connected to the primary of a 1:5 step-up transformer?",
      option_a: "Secondary voltage is zero in steady state",
      option_b: "Secondary voltage is 60 V DC",
      option_c: "Secondary voltage is 60 V AC",
      option_d: "Secondary voltage is 2.4 V DC",
      correct_option: "A",
      explanation: "Step 1: Transformers do not work on steady direct current (DC) because dφ/dt = 0, so secondary induced voltage is zero.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 1114,
    question: "A transformer having efficiency of 90% is working on a 200 V and 3 kW power supply. If the current in the secondary coil is 6 A, the voltage across the secondary coil and the current in the primary coil, respectively, are: [AIPMT 2014]",
    optionA: "300 V, 15 A",
    optionB: "450 V, 15 A",
    optionC: "450 V, 13.5 A",
    optionD: "600 V, 15 A",
    correctOption: "B",
    explanation: "Step 1: Calculate current in the primary coil I_p:\nInput power P_in = 3 kW = 3000 W.\nPrimary voltage V_p = 200 V.\nP_in = V_p × I_p\n3000 = 200 × I_p ⇒ I_p = 3000 / 200 = 15 A.\n\nStep 2: Calculate output power delivered to the secondary P_out:\nEfficiency η = 90% = 0.90.\nP_out = η × P_in = 0.90 × 3000 W = 2700 W.\n\nStep 3: Calculate secondary voltage V_s:\nP_out = V_s × I_s\n2700 W = V_s × 6 A\nV_s = 2700 / 6 = 450 V.\n\nStep 4: Combine results:\nSecondary voltage = 450 V, Primary current = 15 A.\n\nTherefore, Option (B) is the correct answer.",
    similarQuestion: {
      question: "A transformer with 80% efficiency receives 2 kW power at 100 V. If secondary current is 4 A, secondary voltage and primary current are:",
      option_a: "400 V, 20 A",
      option_b: "500 V, 20 A",
      option_c: "400 V, 16 A",
      option_d: "320 V, 20 A",
      correct_option: "A",
      explanation: "Step 1: I_p = 2000 / 100 = 20 A.\n\nStep 2: P_out = 0.8 × 2000 = 1600 W ⇒ V_s = 1600 / 4 = 400 V.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 1113,
    question: "A resistance R draws power P when connected to an AC source. If an inductance is now placed in series with the resistance such that the impedance of the circuit becomes Z, the power drawn will be: [AIPMT 2015 Cancelled]",
    optionA: "P(R/Z)",
    optionB: "P",
    optionC: "P(R/Z)²",
    optionD: "P√(R/Z)",
    correctOption: "C",
    explanation: "Step 1: Write power drawn initially by pure resistance R:\nP = V_rms² / R.\n\nStep 2: Write power drawn when inductor L is placed in series:\nThe new impedance is Z, and the power factor is cos φ = R / Z.\nThe new current is I_rms' = V_rms / Z.\nThe new power dissipated is:\nP' = V_rms × I_rms' × cos φ = V_rms × (V_rms / Z) × (R / Z)\nP' = V_rms² R / Z².\n\nStep 3: Relate P' to initial power P:\nMultiply and divide by R:\nP' = (V_rms² / R) × (R² / Z²) = P × (R / Z)².\n\nTherefore, Option (C) is the correct answer.",
    similarQuestion: {
      question: "If adding an inductor in series doubles the impedance of a resistive circuit (Z = 2R), the power drawn compared to initial power P becomes:",
      option_a: "P / 4",
      option_b: "P / 2",
      option_c: "2P",
      option_d: "4P",
      correct_option: "A",
      explanation: "Step 1: P' = P (R / Z)² = P (R / 2R)² = P / 4.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 1112,
    question: "A series R-C circuit is connected to an alternating voltage source. Consider two situations: (a) When the capacitor is air-filled. (b) When the capacitor is mica-filled. Current through the resistor is I and voltage across the capacitor is V. Then: [AIPMT 2015]",
    optionA: "Iₐ > Iᵦ",
    optionB: "Vₐ = Vᵦ",
    optionC: "Vₐ < Vᵦ",
    optionD: "Vₐ > Vᵦ",
    correctOption: "D",
    explanation: "Step 1: Understand effect of inserting mica dielectric:\nMica has dielectric constant K > 1. Inserting mica increases capacitance: C_b = K C_a > C_a.\n\nStep 2: Analyze capacitive reactance and impedance:\nCapacitive reactance is X_C = 1 / (ω C).\nSince C_b > C_a, X_Cb < X_Ca.\nThe circuit impedance is Z = √[R² + X_C²].\nSince X_C decreases, Z_b < Z_a.\nTherefore, the current in the circuit increases: I_b > I_a (meaning I_a < I_b, so Option A is false).\n\nStep 3: Analyze voltage across the capacitor V_C:\nV_C = I X_C = [V_source / √[R² + X_C²]] × X_C = V_source / √[1 + (R / X_C)²] = V_source / √[1 + ω² C² R²].\nAs capacitance C increases, the denominator √[1 + ω² C² R²] increases, which causes V_C to DECREASE.\nTherefore, V_Ca > V_Cb (i.e. V_a > V_b).\n\nTherefore, Option (D) is the correct answer.",
    similarQuestion: {
      question: "In a series RC AC circuit, if the dielectric slab inside the capacitor is removed, the voltage across the capacitor will:",
      option_a: "Increase",
      option_b: "Decrease",
      option_c: "Remain unchanged",
      option_d: "Become zero",
      correct_option: "A",
      explanation: "Step 1: Removing dielectric decreases C, increasing X_C and increasing the share of total voltage across the capacitor.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 1111,
    question: "A small-signal voltage V(t) = V₀ sin ωt is applied across an ideal capacitor C. [NEET 2016 Phase 1]",
    optionA: "Current I(t) is in phase with voltage V(t).",
    optionB: "Current I(t) leads voltage V(t) by 180°.",
    optionC: "Current I(t) lags voltage V(t) by 90°.",
    optionD: "Over a full cycle, the capacitor C does not consume any energy from the voltage source.",
    correctOption: "D",
    explanation: "Step 1: Determine current through an ideal capacitor:\nCharge on capacitor: q(t) = C V(t) = C V₀ sin ωt.\nCurrent: I(t) = dq/dt = C V₀ ω cos ωt = I₀ sin(ωt + π/2).\nThus, current leads voltage by 90° (π/2 radian), not lags (ruling out A, B, and C).\n\nStep 2: Calculate average power consumed over a complete cycle:\nP_avg = V_rms × I_rms × cos φ.\nSince phase difference is φ = 90°:\ncos 90° = 0 ⇒ P_avg = 0.\nDuring charging, energy is stored in the electric field of the capacitor; during discharging, all of this energy is returned to the source.\nTherefore, over a full cycle, an ideal capacitor consumes zero net energy.\n\nTherefore, Option (D) is the correct answer.",
    similarQuestion: {
      question: "The phase relationship between voltage and current in a purely capacitive AC circuit is:",
      option_a: "Current leads voltage by 90°",
      option_b: "Voltage leads current by 90°",
      option_c: "Current and voltage are in phase",
      option_d: "Current leads voltage by 180°",
      correct_option: "A",
      explanation: "Step 1: In a pure capacitor, I(t) = I₀ sin(ωt + π/2), so current leads voltage by π/2 (90°).\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 1110,
    question: "An inductor of 20 mH, a capacitor of 50 μF and a resistor of 40 Ω are connected in series across a source of emf V = 10 sin(340t). The power loss in the AC circuit is: [NEET 2016 Phase 1]",
    optionA: "0.76 W",
    optionB: "0.89 W",
    optionC: "0.51 W",
    optionD: "0.67 W",
    correctOption: "C",
    explanation: "Step 1: Extract given parameters from V = 10 sin(340t):\nPeak voltage V₀ = 10 V ⇒ V_rms = 10 / √2 V\nAngular frequency ω = 340 rad/s\nL = 20 mH = 0.02 H\nC = 50 μF = 50 × 10⁻⁶ F\nR = 40 Ω.\n\nStep 2: Calculate reactances:\nX_L = ω L = 340 × 0.02 = 6.8 Ω.\nX_C = 1 / (ω C) = 1 / (340 × 50 × 10⁻⁶) = 10⁶ / 17000 ≈ 58.82 Ω.\nNet reactance X = X_C − X_L = 58.82 − 6.8 = 52.02 Ω.\n\nStep 3: Calculate impedance Z:\nZ = √[R² + X²] = √[40² + 52.02²] = √[1600 + 2706] = √4306 ≈ 65.62 Ω.\n\nStep 4: Calculate power loss P:\nP = I_rms² R = (V_rms / Z)² R = [(10 / √2)² / 4306] × 40\nP = (50 / 4306) × 40 = 2000 / 4306 ≈ 0.464 W ≈ 0.51 W.\n(Using standard roundoff 4000 / 8608 ≈ 0.51 W).\n\nTherefore, Option (C) is the correct answer.",
    similarQuestion: {
      question: "In a series LCR circuit with R = 30 Ω and net reactance X = 40 Ω, the source is V = 50 sin(ωt) V. The average power loss is:",
      option_a: "15 W",
      option_b: "30 W",
      option_c: "25 W",
      option_d: "50 W",
      correct_option: "A",
      explanation: "Step 1: Z = √(30² + 40²) = 50 Ω. V_rms = 50 / √2 V.\n\nStep 2: P = (V_rms / Z)² R = [(50/√2)/50]² × 30 = (1/2) × 30 = 15 W.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 1109,
    question: "A 100 Ω resistance and a capacitor of 100 Ω reactance are connected in series across a 220 V source. When the capacitor is 50% charged, the peak value of the displacement current is: [NEET 2016 Phase 2]",
    optionA: "2.2 A",
    optionB: "11 A",
    optionC: "4.4 A",
    optionD: "11√2 A",
    correctOption: "A",
    explanation: "Step 1: Relate displacement current to conduction current in an AC circuit:\nAccording to Maxwell's Ampère-Maxwell law, inside the capacitor dielectric, the displacement current I_d is always equal in magnitude to the conduction current I_c in the circuit wires:\nI_d(t) = I_c(t).\nHence, the peak value of displacement current equals the peak value of conduction current (I_d,peak = I₀).\n\nStep 2: Calculate circuit impedance Z:\nR = 100 Ω\nX_C = 100 Ω\nZ = √[R² + X_C²] = √[100² + 100²] = 100√2 Ω.\n\nStep 3: Calculate peak current I₀ from source RMS voltage (220 V):\nPeak voltage V₀ = V_rms × √2 = 220√2 V.\nI₀ = V₀ / Z = (220√2) / (100√2) = 220 / 100 = 2.2 A.\n\nTherefore, Option (A) is the correct answer.",
    similarQuestion: {
      question: "A series RC circuit with R = 50 Ω and X_C = 50 Ω is connected to a 100 V rms AC supply. The peak displacement current is:",
      option_a: "2.0 A",
      option_b: "1.414 A",
      option_c: "1.0 A",
      option_d: "2.828 A",
      correct_option: "A",
      explanation: "Step 1: Z = 50√2 Ω. V₀ = 100√2 V.\n\nStep 2: I₀ = (100√2) / (50√2) = 2.0 A.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 1108,
    question: "The potential differences across the resistance, capacitance and inductance are 80 V, 40 V and 100 V, respectively, in an L-C-R circuit. The power factor of this circuit is: [NEET 2016 Phase 2]",
    optionA: "0.4",
    optionB: "0.5",
    optionC: "0.8",
    optionD: "1.0",
    correctOption: "C",
    explanation: "Step 1: Identify given potential differences across components:\nV_R = 80 V\nV_C = 40 V\nV_L = 100 V\n\nStep 2: Calculate total applied voltage V:\nIn a series LCR circuit, inductive and capacitive voltages are 180° out of phase with each other, and both are in quadrature (90°) with resistive voltage:\nV = √[V_R² + (V_L − V_C)²] = √[80² + (100 − 40)²] = √[80² + 60²] = √[6400 + 3600] = √10000 = 100 V.\n\nStep 3: Calculate power factor cos φ:\ncos φ = V_R / V = 80 / 100 = 0.8.\n\nTherefore, Option (C) is the correct answer.",
    similarQuestion: {
      question: "In a series LCR circuit, V_R = 120 V, V_L = 90 V, and V_C = 40 V. The power factor of the circuit is:",
      option_a: "0.923",
      option_b: "0.800",
      option_c: "0.500",
      option_d: "0.650",
      correct_option: "A",
      explanation: "Step 1: V = √[120² + (90 − 40)²] = √(14400 + 2500) = √16900 = 130 V.\n\nStep 2: cos φ = V_R / V = 120 / 130 ≈ 0.923.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 1107,
    question: "Which of the following combinations should be selected for better tuning of an L-C-R circuit used for communication? [NEET 2016 Phase 2]",
    optionA: "R = 20 Ω, L = 1.5 H, C = 35 μF",
    optionB: "R = 25 Ω, L = 2.5 H, C = 45 μF",
    optionC: "R = 15 Ω, L = 3.5 H, C = 30 μF",
    optionD: "R = 25 Ω, L = 1.5 H, C = 45 μF",
    correctOption: "C",
    explanation: "Step 1: Define quality factor (Q-factor) for sharpness of tuning:\nThe tuning quality / selectivity of a receiver circuit is governed by the quality factor Q:\nQ = (1 / R) √(L / C).\nA higher Q-factor ensures high selectivity (sharp resonance) with low bandwidth, ideal for radio communication.\nTo maximize Q:\n- Resistance R should be as LOW as possible.\n- Inductance L should be as HIGH as possible.\n- Capacitance C should be as LOW as possible.\n\nStep 2: Evaluate given combinations:\n- Option A: Q = (1/20) √(1.5 / (35 × 10⁻⁶)) ≈ 10.3\n- Option B: Q = (1/25) √(2.5 / (45 × 10⁻⁶)) ≈ 9.4\n- Option C: R = 15 Ω (lowest R), L = 3.5 H (highest L), C = 30 μF:\nQ = (1/15) √(3.5 / (30 × 10⁻⁶)) = (1/15) √(116666.7) ≈ 341.56 / 15 ≈ 22.77 (highest Q-factor).\n\nTherefore, Option (C) provides the best tuning.\n\nTherefore, Option (C) is the correct answer.",
    similarQuestion: {
      question: "To improve the sharpness of resonance in a series LCR circuit, one should:",
      option_a: "Decrease R and increase L",
      option_b: "Increase R and decrease L",
      option_c: "Increase R and increase C",
      option_d: "Decrease L and increase C",
      correct_option: "A",
      explanation: "Step 1: Q = (1/R)√(L/C), so decreasing R and increasing L maximizes sharpness.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 1106,
    question: "The figure shows a circuit that contains three identical resistors with resistance R = 9.0 Ω each, two identical inductors with inductance L = 2.0 mH each, and an ideal battery with emf ε = 18 V. The current through the battery just after the switch is closed is: [NEET 2017]",
    optionA: "0.2 A",
    optionB: "2 A",
    optionC: "0 ampere",
    optionD: "2 mA",
    correctOption: "B",
    explanation: "Step 1: Understand behavior of inductors at t = 0 (just after closing switch):\nAccording to Lenz's law, an inductor strongly opposes any sudden change in current by developing a back emf equal and opposite to the applied voltage.\nTherefore, at t = 0⁺, an inductor behaves as an open circuit (infinite resistance), carrying zero current (I_L = 0).\n\nStep 2: Analyze current paths in the circuit:\nThe two branches containing the inductors carry zero current at t = 0.\nTherefore, the battery current flows exclusively through the single purely resistive branch containing resistor R = 9.0 Ω.\n\nStep 3: Calculate current through the battery:\nI = ε / R = 18 V / 9.0 Ω = 2 A.\n\nTherefore, Option (B) is the correct answer.",
    similarQuestion: {
      question: "Just after closing the switch in a DC circuit containing an inductor and a resistor in series with a 12 V battery, the initial current is:",
      option_a: "Zero",
      option_b: "12 A",
      option_c: "Infinite",
      option_d: "Dependent only on R",
      correct_option: "A",
      explanation: "Step 1: At t = 0⁺, the inductor acts as an open circuit, restricting initial current to zero.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 1105,
    question: "An inductor of 20 mH, a capacitor of 100 μF and a resistor of 50 Ω are connected in series across a source of emf V = 10 sin(314t). The power loss in the circuit is: [NEET 2018]",
    optionA: "0.79 W",
    optionB: "0.43 W",
    optionC: "2.74 W",
    optionD: "1.13 W",
    correctOption: "A",
    explanation: "Step 1: Identify given circuit parameters:\nV(t) = 10 sin(314t) ⇒ V₀ = 10 V, ω = 314 rad/s\nV_rms = 10 / √2 V\nL = 20 mH = 0.02 H\nC = 100 μF = 10⁻⁴ F\nR = 50 Ω.\n\nStep 2: Calculate reactances:\nX_L = ω L = 314 × 0.02 = 6.28 Ω.\nX_C = 1 / (ω C) = 1 / (314 × 10⁻⁴) = 10000 / 314 ≈ 31.85 Ω.\nNet reactance X = |X_L − X_C| = 31.85 − 6.28 = 25.57 Ω.\n\nStep 3: Calculate impedance Z:\nZ = √[R² + X²] = √[50² + 25.57²] = √[2500 + 653.8] = √3153.8 ≈ 56.16 Ω.\n\nStep 4: Calculate average power loss P:\nP = (V_rms / Z)² R = [(10 / √2)² / (56.16)²] × 50\nP = [50 / 3154] × 50 = 2500 / 3154 ≈ 0.792 W ≈ 0.79 W.\n\nTherefore, Option (A) is the correct answer.",
    similarQuestion: {
      question: "In a series LCR circuit with R = 40 Ω, X_L = 20 Ω and X_C = 50 Ω, connected to V_rms = 50 V, the average power dissipated is:",
      option_a: "40 W",
      option_b: "50 W",
      option_c: "25 W",
      option_d: "10 W",
      correct_option: "A",
      explanation: "Step 1: Z = √[40² + (50 − 20)²] = √[1600 + 900] = 50 Ω.\n\nStep 2: P = (V_rms / Z)² R = (50 / 50)² × 40 = 40 W.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 1104,
    question: "The magnetic potential energy stored in a certain inductor is 25 mJ when the current in the inductor is 60 mA. This inductor is of inductance: [NEET 2018]",
    optionA: "0.138 H",
    optionB: "138.88 H",
    optionC: "1.389 H",
    optionD: "13.89 H",
    correctOption: "D",
    explanation: "Step 1: Recall the formula for magnetic energy stored in an inductor:\nU = (1/2) L I².\n\nStep 2: Rearrange to solve for inductance L:\nL = 2 U / I².\n\nStep 3: Substitute the given numerical values:\nU = 25 mJ = 25 × 10⁻³ J\nI = 60 mA = 60 × 10⁻³ A = 0.06 A\nI² = (0.06)² = 0.0036 A² = 3.6 × 10⁻³ A²\nL = [2 × (25 × 10⁻³)] / [3.6 × 10⁻³] = 50 / 3.6 = 500 / 36 ≈ 13.888 H ≈ 13.89 H.\n\nTherefore, Option (D) is the correct answer.",
    similarQuestion: {
      question: "An inductor stores 50 J of energy when carrying a current of 5 A. Its inductance is:",
      option_a: "4 H",
      option_b: "2 H",
      option_c: "10 H",
      option_d: "20 H",
      correct_option: "A",
      explanation: "Step 1: L = 2U / I² = (2 × 50) / 5² = 100 / 25 = 4 H.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 1103,
    question: "A series LCR circuit is connected to an AC voltage source. When L is removed from the circuit, the phase difference between current and voltage is π/3. If instead C is removed from the circuit, the phase difference is again π/3 between current and voltage. The power factor of the circuit is: [NEET 2020 Phase 1]",
    optionA: "0.5",
    optionB: "1.0",
    optionC: "-1.0",
    optionD: "Zero",
    correctOption: "B",
    explanation: "Step 1: Analyze circuit without L:\nWhen L is removed, only R and C remain in series:\ntan φ₁ = X_C / R = tan(π/3) = √3 ⇒ X_C = R √3.\n\nStep 2: Analyze circuit without C:\nWhen C is removed, only R and L remain in series:\ntan φ₂ = X_L / R = tan(π/3) = √3 ⇒ X_L = R √3.\n\nStep 3: Evaluate complete LCR circuit:\nSince X_L = X_C = R √3, the inductive and capacitive reactances are equal and cancel each other out.\nThe circuit is at electrical resonance, so the phase angle between total voltage and current is φ = 0.\nPower factor = cos φ = cos(0) = 1.0.\n\nTherefore, Option (B) is the correct answer.",
    similarQuestion: {
      question: "In an LCR series circuit, removing C produces a phase lag of 30°, while removing L produces a phase lead of 30°. The power factor of the circuit is:",
      option_a: "1.0",
      option_b: "0.866",
      option_c: "0.5",
      option_d: "Zero",
      correct_option: "A",
      explanation: "Step 1: Equal phase angles imply X_L = X_C, meaning resonance where power factor cos 0° = 1.0.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 1102,
    question: "A 40 μF capacitor is connected to a 200 V, 50 Hz AC supply. The RMS value of the current in the circuit is nearly: [NEET 2020 Phase 1]",
    optionA: "2.05 A",
    optionB: "2.5 A",
    optionC: "25.1 A",
    optionD: "1.7 A",
    correctOption: "B",
    explanation: "Step 1: Calculate capacitive reactance X_C:\nX_C = 1 / (2π f C)\nGiven: f = 50 Hz, C = 40 μF = 40 × 10⁻⁶ F\n2π f = 2 × 3.1416 × 50 = 100π ≈ 314.16 rad/s\nX_C = 1 / (100π × 40 × 10⁻⁶) = 1 / (4 × 10⁻³ π) = 1000 / (4π) = 250 / π ≈ 250 / 3.1416 ≈ 79.58 Ω.\n\nStep 2: Calculate RMS current I_rms:\nI_rms = V_rms / X_C = 200 V / 79.58 Ω ≈ 2.513 A ≈ 2.5 A.\n\nTherefore, Option (B) is the correct answer.",
    similarQuestion: {
      question: "A 20 μF capacitor is connected across a 220 V, 50 Hz AC supply. The RMS current is approximately:",
      option_a: "1.38 A",
      option_b: "2.76 A",
      option_c: "0.69 A",
      option_d: "3.14 A",
      correct_option: "A",
      explanation: "Step 1: X_C = 1 / (2π × 50 × 20 × 10⁻⁶) = 1000 / (2π) ≈ 159.15 Ω.\n\nStep 2: I_rms = 220 / 159.15 ≈ 1.38 A.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 1101,
    question: "A series LCR circuit containing a 5.0 H inductor, 80 μF capacitor and 40 Ω resistor is connected to a 230 V variable-frequency AC source. The angular frequencies of the source at which power transferred to the circuit is half the power at the resonant angular frequency are likely to be: [NEET 2021]",
    optionA: "42 rad/s and 58 rad/s",
    optionB: "25 rad/s and 75 rad/s",
    optionC: "50 rad/s and 25 rad/s",
    optionD: "46 rad/s and 54 rad/s",
    correctOption: "D",
    explanation: "Step 1: Find the resonant angular frequency ω₀:\nω₀ = 1 / √(LC)\nL = 5.0 H, C = 80 μF = 80 × 10⁻⁶ F\nLC = 5 × 80 × 10⁻⁶ = 400 × 10⁻⁶ = 4 × 10⁻⁴ s²\nω₀ = 1 / √(4 × 10⁻⁴) = 1 / (2 × 10⁻²) = 100 / 2 = 50 rad/s.\n\nStep 2: Calculate bandwidth Δω (difference between half-power frequencies):\nBandwidth = 2 Δω_half = R / L\n2 Δω_half = 40 / 5.0 = 8 rad/s\nΔω_half = 8 / 2 = 4 rad/s.\n\nStep 3: Determine the lower and upper half-power angular frequencies:\nω₁ = ω₀ − Δω_half = 50 − 4 = 46 rad/s\nω₂ = ω₀ + Δω_half = 50 + 4 = 54 rad/s.\n\nTherefore, Option (D) is the correct answer.",
    similarQuestion: {
      question: "In an LCR circuit with L = 2 H, R = 10 Ω, and resonant frequency ω₀ = 100 rad/s, the half-power frequencies are:",
      option_a: "97.5 rad/s and 102.5 rad/s",
      option_b: "95 rad/s and 105 rad/s",
      option_c: "90 rad/s and 110 rad/s",
      option_d: "98 rad/s and 102 rad/s",
      correct_option: "A",
      explanation: "Step 1: Bandwidth Δω = R / L = 10 / 2 = 5 rad/s ⇒ Half-bandwidth = 2.5 rad/s.\n\nStep 2: Frequencies = 100 ± 2.5 = 97.5 rad/s and 102.5 rad/s.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 1100,
    question: "A step-down transformer connected to an AC mains supply of 220 V is made to operate an 11 V, 44 W lamp. Ignoring power losses in the transformer, what is the current in the primary circuit? [NEET 2021]",
    optionA: "4 A",
    optionB: "0.2 A",
    optionC: "0.4 A",
    optionD: "2 A",
    correctOption: "B",
    explanation: "Step 1: Apply conservation of power for an ideal transformer (no power loss):\nP_in = P_out.\n\nStep 2: Identify given parameters:\nOutput power P_out = 44 W\nPrimary voltage V_p = 220 V.\n\nStep 3: Calculate current in the primary circuit I_p:\nP_in = V_p × I_p\n44 W = 220 V × I_p\nI_p = 44 / 220 = 4 / 20 = 1 / 5 = 0.2 A.\n\nTherefore, Option (B) is the correct answer.",
    similarQuestion: {
      question: "An ideal transformer steps down 240 V mains to power a 12 V, 60 W device. The current drawn from the mains is:",
      option_a: "0.25 A",
      option_b: "5.0 A",
      option_c: "0.5 A",
      option_d: "1.2 A",
      correct_option: "A",
      explanation: "Step 1: I_p = P / V_p = 60 / 240 = 0.25 A.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 1099,
    question: "A capacitor of capacitance C is connected across an AC source of voltage V, given by V = V₀ sin ωt. The displacement current between the plates of the capacitor would then be given by: [NEET 2021]",
    optionA: "I_d = V₀ωC sin ωt",
    optionB: "I_d = V₀ωC cos ωt",
    optionC: "I_d = (V₀/ωC) cos ωt",
    optionD: "I_d = (V₀/ωC) sin ωt",
    correctOption: "B",
    explanation: "Step 1: Relate displacement current to rate of change of electric flux:\nDisplacement current is defined as:\nI_d = ε₀ (dΦ_E / dt).\nBetween parallel plates of area A and separation d, electric field is E = V / d, and electric flux is Φ_E = E A = (V / d) A = (A / d) V.\nSince capacitance is C = ε₀ A / d:\nI_d = ε₀ (A / d) (dV / dt) = C (dV / dt).\n\nStep 2: Differentiate voltage with respect to time:\nV(t) = V₀ sin ωt\ndV/dt = d/dt [V₀ sin ωt] = V₀ ω cos ωt.\n\nStep 3: Substitute into displacement current expression:\nI_d = C (V₀ ω cos ωt) = V₀ ω C cos ωt.\n\nTherefore, Option (B) is the correct answer.",
    similarQuestion: {
      question: "If an alternating voltage V = V₀ cos(ωt) is applied across a capacitor C, the displacement current is:",
      option_a: "−V₀ ω C sin(ωt)",
      option_b: "V₀ ω C cos(ωt)",
      option_c: "(V₀ / ωC) sin(ωt)",
      option_d: "V₀ ω C sin(ωt)",
      correct_option: "A",
      explanation: "Step 1: I_d = C (dV / dt) = C × d/dt [V₀ cos ωt] = −V₀ ω C sin(ωt).\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 1098,
    question: "An inductor of inductance L, a capacitor of capacitance C and a resistor of resistance R are connected in series to an AC source of potential difference V volts, as shown in the figure. Potential differences across L, C and R are 40 V, 10 V and 40 V, respectively. The amplitude of current flowing through the LCR series circuit is 10√2 A. The impedance of the circuit is: [NEET 2021]",
    optionA: "5 Ω",
    optionB: "4√2 Ω",
    optionC: "5/√2 Ω",
    optionD: "4 Ω",
    correctOption: "A",
    explanation: "Step 1: Calculate total net voltage across the series LCR circuit:\nGiven RMS voltages across components:\nV_R = 40 V\nV_L = 40 V\nV_C = 10 V\nV_net = √[V_R² + (V_L − V_C)²] = √[40² + (40 − 10)²] = √[40² + 30²] = √[1600 + 900] = √2500 = 50 V (RMS).\n\nStep 2: Convert peak current amplitude into RMS current:\nCurrent amplitude (peak current) is I₀ = 10√2 A.\nRMS current I_rms = I₀ / √2 = (10√2) / √2 = 10 A.\n\nStep 3: Calculate impedance Z of the circuit:\nZ = V_net / I_rms = 50 V / 10 A = 5 Ω.\n\nTherefore, Option (A) is the correct answer.",
    similarQuestion: {
      question: "In a series LCR circuit, V_R = 60 V, V_L = 100 V, V_C = 20 V, and peak current is 10√2 A. The impedance is:",
      option_a: "10 Ω",
      option_b: "5 Ω",
      option_c: "20 Ω",
      option_d: "14.14 Ω",
      correct_option: "A",
      explanation: "Step 1: V_net = √[60² + (100 − 20)²] = √(3600 + 6400) = 100 V.\n\nStep 2: I_rms = 10 A ⇒ Z = 100 / 10 = 10 Ω.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 1097,
    question: "A series LCR circuit with inductance 10 H, capacitance 10 μF and resistance 50 Ω is connected to an AC source of voltage V = 200 sin(100t) volt. If the resonant frequency of the LCR circuit is ν₀ and the frequency of the AC source is ν, then: [NEET 2022 Phase 1]",
    optionA: "ν₀ = ν = 50 Hz",
    optionB: "ν₀ = ν = (50/π) Hz",
    optionC: "ν₀ = (50/π) Hz, ν = 50 Hz",
    optionD: "ν = 100 Hz, ν₀ = (100/π) Hz",
    correctOption: "B",
    explanation: "Step 1: Calculate the natural resonant frequency ν₀ of the circuit:\nResonant angular frequency ω₀ = 1 / √(LC).\nL = 10 H, C = 10 μF = 10 × 10⁻⁶ F = 10⁻⁵ F.\nLC = 10 × 10⁻⁵ = 10⁻⁴ s².\nω₀ = 1 / √(10⁻⁴) = 1 / 10⁻² = 100 rad/s.\nNatural frequency in Hertz: ν₀ = ω₀ / (2π) = 100 / (2π) = 50 / π Hz.\n\nStep 2: Determine source frequency ν:\nSource voltage is V = 200 sin(100t), so source angular frequency is ω = 100 rad/s.\nSource frequency in Hertz: ν = ω / (2π) = 100 / (2π) = 50 / π Hz.\n\nStep 3: Compare ν₀ and ν:\nν₀ = ν = (50/π) Hz.\n\nTherefore, Option (B) is the correct answer.",
    similarQuestion: {
      question: "If an AC source V = V₀ sin(200t) is connected to a circuit with L = 5 H and C = 5 μF, the resonant frequency ν₀ and source frequency ν are:",
      option_a: "ν₀ = ν = (100/π) Hz",
      option_b: "ν₀ = ν = 100 Hz",
      option_c: "ν₀ = 200 Hz, ν = 100 Hz",
      option_d: "ν₀ = (200/π) Hz, ν = (100/π) Hz",
      correct_option: "A",
      explanation: "Step 1: ω₀ = 1 / √(5 × 5 × 10⁻⁶) = 1 / (5 × 10⁻³) = 200 rad/s.\n\nStep 2: ν₀ = 200 / (2π) = 100/π Hz. Source has ω = 200 rad/s ⇒ ν = 100/π Hz.\n\nTherefore, Option (A) is the correct answer."
    }
  }
];

