const BASE_URL = 'https://api.indraprasthaneetacademy.com/api';

const questionsPart1 = [
  {
    id: 3036,
    similarQuestion: {
      question: "An alternating current circuit consists of an ohmic resistance of 6 Ω connected in series with a net inductive reactance of 8 Ω. The total impedance of the circuit is:",
      option_a: "14 Ω",
      option_b: "10 Ω",
      option_c: "7 Ω",
      option_d: "2 Ω",
      correct_option: "B",
      explanation: "Step 1: In a series AC circuit containing resistance R and reactance X, the impedance Z is given by:\nZ = √(R² + X²)\n\nStep 2: Substitute R = 6 Ω and X = 8 Ω:\nZ = √(6² + 8²) = √(36 + 64) = √100 = 10 Ω.\n\nTherefore, Option (B) is the correct answer."
    }
  },
  {
    id: 3037,
    similarQuestion: {
      question: "An alternating voltage source is connected across a parallel combination of an ideal resistor R and an ideal capacitor C. The total current drawn from the AC source:",
      option_a: "Is in phase with the applied voltage",
      option_b: "Lags behind the applied voltage by an acute angle",
      option_c: "Leads the applied voltage by an acute angle between 0° and 90°",
      option_d: "Lags behind the applied voltage by 90°",
      correct_option: "C",
      explanation: "Step 1: In a parallel RC circuit, the same voltage V is applied across both branches.\n\nStep 2: The current through the resistor I_R = V / R is strictly in phase with V.\n\nStep 3: The current through the capacitor I_C = V / X_C leads the applied voltage by 90°.\n\nStep 4: The total current vector is the vector sum I⃗_total = I_R + j I_C, which leads the voltage by a phase angle φ = tan⁻¹(I_C / I_R) between 0° and 90°.\n\nTherefore, Option (C) is the correct answer."
    }
  },
  {
    id: 3038,
    similarQuestion: {
      question: "In a series LCR AC circuit, the resistance is 12 Ω, the inductive reactance is 25 Ω, and the capacitive reactance is 16 Ω. The total impedance of the circuit is:",
      option_a: "15 Ω",
      option_b: "21 Ω",
      option_c: "13 Ω",
      option_d: "17 Ω",
      correct_option: "A",
      explanation: "Step 1: The impedance of a series LCR circuit is given by:\nZ = √[R² + (X_L - X_C)²]\n\nStep 2: Substitute the given values:\nR = 12 Ω\nX_L = 25 Ω\nX_C = 16 Ω\n\nStep 3: Calculate Z:\nZ = √[12² + (25 - 16)²] = √[144 + 9²] = √[144 + 81] = √225 = 15 Ω.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 3039,
    similarQuestion: {
      question: "A series resonant LCR circuit has self-inductance L = 2.0 H, capacitance C = 32 μF, and ohmic resistance R = 10 Ω. The quality factor (Q-factor) of the circuit is:",
      option_a: "25",
      option_b: "50",
      option_c: "12.5",
      option_d: "100",
      correct_option: "A",
      explanation: "Step 1: The quality factor Q of a series LCR resonant circuit is defined by:\nQ = (1 / R) × √(L / C)\n\nStep 2: Substitute the numerical values:\nL = 2.0 H\nC = 32 μF = 32 × 10⁻⁶ F\nR = 10 Ω\n\nStep 3: Compute Q:\nQ = (1 / 10) × √[2.0 / (32 × 10⁻⁶)] = (1 / 10) × √(10⁶ / 16) = (1 / 10) × (1000 / 4) = 250 / 10 = 25.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 3040,
    similarQuestion: {
      question: "In a series LCR circuit, the root-mean-square voltages measured across the resistor, inductor, and capacitor are V_R = 40 V, V_L = 90 V, and V_C = 60 V respectively. The rms voltage of the connected AC supply is:",
      option_a: "70 V",
      option_b: "190 V",
      option_c: "50 V",
      option_d: "30 V",
      correct_option: "C",
      explanation: "Step 1: In a series AC circuit, voltage vectors across components add vectorially (phasor addition):\nV_rms = √[V_R² + (V_L - V_C)²]\n\nStep 2: Substitute the given component voltages:\nV_R = 40 V\nV_L = 90 V\nV_C = 60 V\n\nStep 3: Calculate V_rms:\nV_rms = √[40² + (90 - 60)²] = √[40² + 30²] = √(1600 + 900) = √2500 = 50 V.\n\nTherefore, Option (C) is the correct answer."
    }
  },
  {
    id: 3041,
    similarQuestion: {
      question: "As the frequency of an alternating current circuit increases towards very high values, the capacitive reactance X_C of an ideal capacitor:",
      option_a: "Increases towards infinity",
      option_b: "Decreases towards zero (offers very low impedance)",
      option_c: "Remains constant",
      option_d: "First decreases and then increases",
      correct_option: "B",
      explanation: "Step 1: The capacitive reactance of a capacitor of capacitance C in an AC circuit of frequency f is:\nX_C = 1 / (2π × f × C)\n\nStep 2: Since X_C is inversely proportional to frequency (X_C ∝ 1/f):\nAs f → ∞, X_C → 0.\n\nStep 3: Hence, at high frequencies, an ideal capacitor acts virtually as a short circuit, offering very little reactance.\n\nTherefore, Option (B) is the correct answer."
    }
  },
  {
    id: 3042,
    similarQuestion: {
      question: "A series LCR resonant circuit with R = 50 Ω is connected across an AC voltage source of 220 V (rms). Under resonant conditions, the average electrical power dissipated in the circuit is:",
      option_a: "968 W",
      option_b: "484 W",
      option_c: "242 W",
      option_d: "1936 W",
      correct_option: "A",
      explanation: "Step 1: At resonance in a series LCR circuit, inductive reactance cancels capacitive reactance (X_L = X_C), making the total impedance purely resistive: Z = R = 50 Ω.\n\nStep 2: The power factor at resonance is unity: cos φ = 1.0.\n\nStep 3: The average power dissipated is:\nP = V_rms² / R = (220 V)² / 50 Ω = 48400 / 50 = 968 W.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 3043,
    similarQuestion: {
      question: "In a series LCR circuit connected to an alternating voltage source of constant amplitude and variable frequency f, the current amplitude in the circuit reaches its absolute maximum when:",
      option_a: "f = 0 (DC conditions)",
      option_b: "f → ∞ (infinite frequency)",
      option_c: "The inductive reactance is double the capacitive reactance",
      option_d: "The driving frequency equals the natural resonant frequency f₀ = 1 / [2π √(LC)]",
      correct_option: "D",
      explanation: "Step 1: The current amplitude in a series LCR circuit is I₀ = V₀ / Z, where Z = √[R² + (ωL - 1/ωC)²].\n\nStep 2: Current is maximum when impedance Z is at its minimum possible value.\n\nStep 3: Z is minimized when the net reactance vanishes:\nωL - 1/ωC = 0 => ω₀ = 1 / √(LC) => f₀ = 1 / [2π √(LC)].\nAt this resonant frequency, Z = R and current is maximum.\n\nTherefore, Option (D) is the correct answer."
    }
  },
  {
    id: 3044,
    similarQuestion: {
      question: "In a series LCR circuit, the angular resonance frequency ω₀ at which the impedance of the circuit is minimum and the current is maximum is given by:",
      option_a: "ω₀ = √(L / C)",
      option_b: "ω₀ = √(C / L)",
      option_c: "ω₀ = 1 / (L C)",
      option_d: "ω₀ = 1 / √(L C)",
      correct_option: "D",
      explanation: "Step 1: Resonance occurs in a series LCR circuit when the inductive reactance equals the capacitive reactance:\nX_L = X_C\n\nStep 2: Substitute X_L = ω₀ L and X_C = 1 / (ω₀ C):\nω₀ L = 1 / (ω₀ C)\n\nStep 3: Solve for ω₀:\nω₀² = 1 / (L C) => ω₀ = 1 / √(L C).\n\nTherefore, Option (D) is the correct answer."
    }
  },
  {
    id: 3045,
    similarQuestion: {
      question: "An alternating voltage given by V(t) = 100√2 sin(200 t) V is applied across an ideal capacitor of capacitance C = 5 μF. The reading of an AC ammeter connected in series in the circuit is:",
      option_a: "50 mA",
      option_b: "100 mA",
      option_c: "200 mA",
      option_d: "10 mA",
      correct_option: "B",
      explanation: "Step 1: An AC ammeter measures the root-mean-square (rms) current I_rms.\nFrom V(t) = 100√2 sin(200 t), peak voltage is V₀ = 100√2 V and angular frequency is ω = 200 rad/s.\nThus, V_rms = V₀ / √2 = 100 V.\n\nStep 2: Calculate the capacitive reactance X_C:\nX_C = 1 / (ω × C) = 1 / [200 × (5 × 10⁻⁶ F)] = 1 / (10⁻³ Ω⁻¹) = 1000 Ω.\n\nStep 3: Calculate the rms current:\nI_rms = V_rms / X_C = 100 V / 1000 Ω = 0.1 A = 100 mA.\n\nTherefore, Option (B) is the correct answer."
    }
  },
  {
    id: 3046,
    similarQuestion: {
      question: "The instantaneous voltage and current in an AC circuit are given by e(t) = 100 sin(ωt) V and i(t) = 4 sin(ωt - π/3) A. The average power consumed in the circuit per cycle is:",
      option_a: "100 W",
      option_b: "200 W",
      option_c: "400 W",
      option_d: "50 W",
      correct_option: "A",
      explanation: "Step 1: The average power in an AC circuit is given by:\nP_avg = V_rms × I_rms × cos φ\nwhere V_rms = V₀ / √2, I_rms = I₀ / √2, and φ is the phase angle.\n\nStep 2: Thus, P_avg = (1/2) × V₀ × I₀ × cos φ.\nGiven V₀ = 100 V, I₀ = 4 A, and φ = π/3 = 60°:\n\nStep 3: Calculate P_avg:\nP_avg = (1/2) × 100 × 4 × cos 60° = 200 × 0.5 = 100 W.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 3047,
    similarQuestion: {
      question: "An alternating current has a frequency of 50 Hz. The minimum time taken by the current to rise from zero to its peak value is:",
      option_a: "10 ms",
      option_b: "5 ms",
      option_c: "2.5 ms",
      option_d: "20 ms",
      correct_option: "B",
      explanation: "Step 1: The time period of the 50 Hz alternating current is:\nT = 1 / f = 1 / 50 s = 0.02 s = 20 ms.\n\nStep 2: A sinusoidal wave i(t) = I₀ sin(ωt) reaches its first peak at ωt = π/2, which corresponds to one-fourth of a complete cycle:\nt = T / 4\n\nStep 3: Calculate t:\nt = 20 ms / 4 = 5 ms = 5 × 10⁻³ s.\n\nTherefore, Option (B) is the correct answer."
    }
  },
  {
    id: 3048,
    similarQuestion: {
      question: "In a standard domestic AC mains supply rated at 220 V, 50 Hz, the stated voltage of 220 V represents the:",
      option_a: "Peak (maximum) voltage",
      option_b: "Average voltage over half a cycle",
      option_c: "Instantaneous voltage at t = 0",
      option_d: "Root-mean-square (rms) voltage",
      correct_option: "D",
      explanation: "Step 1: All standard AC measuring instruments (voltmeters and ammeters) are calibrated to read root-mean-square (effective) values based on Joule heating effect.\n\nStep 2: Therefore, when an AC line is specified as 220 V, it refers exclusively to the rms voltage V_rms.\n(The corresponding peak voltage is V₀ = √2 × 220 V ≈ 311 V).\n\nTherefore, Option (D) is the correct answer."
    }
  },
  {
    id: 3049,
    similarQuestion: {
      question: "An alternating current is given by the expression i(t) = 6 sin(ωt) + 8 cos(ωt) A. The phase constant φ of the resultant current relative to sin(ωt) is:",
      option_a: "tan⁻¹(4/3)",
      option_b: "tan⁻¹(3/4)",
      option_c: "tan⁻¹(1)",
      option_d: "tan⁻¹(2)",
      correct_option: "A",
      explanation: "Step 1: Express the linear combination in the form i(t) = I_net sin(ωt + φ):\nI_net sin(ωt + φ) = I_net cos φ sin(ωt) + I_net sin φ cos(ωt)\n\nStep 2: Equate coefficients:\nI_net cos φ = 6\nI_net sin φ = 8\n\nStep 3: Divide the two expressions:\ntan φ = (I_net sin φ) / (I_net cos φ) = 8 / 6 = 4 / 3\nThus, φ = tan⁻¹(4/3).\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 3050,
    similarQuestion: {
      question: "An incandescent light bulb is connected in series with a capacitor across an AC mains supply. If the capacitance of the capacitor is increased, the brightness of the bulb:",
      option_a: "Increases",
      option_b: "Decreases",
      option_c: "Remains strictly the same",
      option_d: "Fluctuates at double the mains frequency",
      correct_option: "A",
      explanation: "Step 1: The capacitive reactance is given by X_C = 1 / (2π f C).\n\nStep 2: When capacitance C is increased, the reactance X_C decreases.\n\nStep 3: The total circuit impedance Z = √(R² + X_C²) decreases, causing the circuit current I_rms = V_rms / Z to increase.\n\nStep 4: Since bulb brightness depends on power dissipation P = I_rms² R_bulb, the brightness of the bulb increases.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 3051,
    similarQuestion: {
      question: "In an AC circuit, the applied voltage is E(t) = E₀ sin(ωt) and the resulting electric current is i(t) = I₀ sin(ωt - π/2). The average power dissipated in the circuit per cycle is:",
      option_a: "E₀ I₀ / 2",
      option_b: "Zero",
      option_c: "E₀ I₀ / √2",
      option_d: "E₀ I₀",
      correct_option: "B",
      explanation: "Step 1: The phase difference between the voltage and current is φ = π/2 = 90°.\n\nStep 2: The power factor of the circuit is:\ncos φ = cos 90° = 0.\n\nStep 3: The average power dissipated per cycle is:\nP_avg = V_rms × I_rms × cos φ = V_rms × I_rms × 0 = 0 W.\n(This is known as wattless current in a purely inductive circuit).\n\nTherefore, Option (B) is the correct answer."
    }
  },
  {
    id: 3052,
    similarQuestion: {
      question: "In an alternating current circuit, the power factor is mathematically defined as:",
      option_a: "The cosine of the phase angle between voltage and current (cos φ = R / Z)",
      option_b: "The sine of the phase angle between voltage and current (sin φ = X / Z)",
      option_c: "The ratio of inductive reactance to capacitive reactance",
      option_d: "The tangent of the phase angle (tan φ = X / R)",
      correct_option: "A",
      explanation: "Step 1: In AC circuit analysis, average power is given by P_avg = V_rms × I_rms × cos φ, where φ is the phase difference between voltage and current.\n\nStep 2: The multiplier cos φ is known as the power factor of the circuit.\n\nStep 3: From the impedance triangle, cos φ = R / Z, which represents the ratio of true resistance to total impedance.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 3053,
    similarQuestion: {
      question: "In a series LCR circuit driven at an operating frequency higher than its natural resonant frequency (f > f₀), the circuit exhibits:",
      option_a: "Purely resistive behavior",
      option_b: "Predominantly inductive behavior with current lagging behind voltage",
      option_c: "Predominantly capacitive behavior with current leading voltage",
      option_d: "Infinite impedance",
      correct_option: "B",
      explanation: "Step 1: At resonant frequency f₀, X_L = X_C.\n\nStep 2: Since X_L = 2π f L ∝ f and X_C = 1 / (2π f C) ∝ 1/f:\nWhen f > f₀, X_L > X_C.\n\nStep 3: The net reactance X = X_L - X_C > 0 is inductive. Consequently, the circuit behaves inductively, and current lags behind the applied voltage.\n\nTherefore, Option (B) is the correct answer."
    }
  },
  {
    id: 3054,
    similarQuestion: {
      question: "A graph plotted between inductive reactance X_L on the vertical axis and the frequency f of an AC voltage on the horizontal axis is:",
      option_a: "A straight line passing through the origin with positive slope",
      option_b: "A rectangular hyperbola asymptotic to both axes",
      option_c: "A horizontal straight line",
      option_d: "A parabola opening along the vertical axis",
      correct_option: "A",
      explanation: "Step 1: Inductive reactance is given by the formula:\nX_L = 2π × L × f\n\nStep 2: Comparing with the linear equation y = m x:\ny = X_L, x = f, and slope m = 2π L = constant.\n\nStep 3: Since there is no intercept (c = 0), the graph is a straight line passing through the origin.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 3055,
    similarQuestion: {
      question: "In a series LCR circuit, when the inductor is removed, the phase difference between current and voltage is 45°. When the capacitor is removed instead, the phase difference is again 45°. The power factor of the complete original LCR circuit is:",
      option_a: "1.0 (unity)",
      option_b: "1 / √2",
      option_c: "1 / 2",
      option_d: "Zero",
      correct_option: "A",
      explanation: "Step 1: When L is removed, the circuit is an RC circuit:\ntan φ₁ = X_C / R = tan 45° = 1 => X_C = R.\n\nStep 2: When C is removed instead, the circuit is an LR circuit:\ntan φ₂ = X_L / R = tan 45° = 1 => X_L = R.\n\nStep 3: Comparing the two results:\nX_L = X_C = R.\nSince X_L = X_C, the complete original LCR circuit is in resonance!\n\nStep 4: At resonance, net reactance is zero, phase difference is φ = 0°, and the power factor is:\ncos φ = cos 0° = 1.0 (unity).\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 3056,
    similarQuestion: {
      question: "The phase difference between the alternating current and applied voltage across a circuit is exactly 90° (π/2). Which of the following CANNOT be present in the circuit?",
      option_a: "Pure capacitance C alone",
      option_b: "Pure inductance L alone",
      option_c: "A non-zero ohmic resistance R",
      option_d: "An ideal combination of inductance and capacitance (L and C)",
      correct_option: "C",
      explanation: "Step 1: In any circuit containing a non-zero resistance R, the phase difference φ satisfies:\ntan φ = |X_L - X_C| / R\n\nStep 2: For φ to be exactly 90°, tan φ must be infinite, which is possible only if R = 0.\n\nStep 3: If R > 0, the phase angle is strictly less than 90° (0 ≤ φ < 90°).\nTherefore, a circuit containing resistance R cannot have a 90° phase difference.\n\nTherefore, Option (C) is the correct answer."
    }
  },
  {
    id: 3057,
    similarQuestion: {
      question: "In a series LCR AC circuit, the ohmic resistance is R = 25 Ω and the total impedance is Z = 25 Ω. The phase difference between the current and the applied voltage is:",
      option_a: "0°",
      option_b: "30°",
      option_c: "45°",
      option_d: "90°",
      correct_option: "A",
      explanation: "Step 1: The power factor of a series LCR circuit is:\ncos φ = R / Z\n\nStep 2: Substitute R = 25 Ω and Z = 25 Ω:\ncos φ = 25 / 25 = 1.0\n\nStep 3: The angle whose cosine is 1 is:\nφ = cos⁻¹(1.0) = 0°.\n(The circuit is at resonance, where current and voltage are in phase).\n\nTherefore, Option (A) is the correct answer."
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
    console.log('Login successful for Set 57 Part 1.');

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
    console.log('Set 57 Part 1 completed successfully!');
  } catch (err) {
    console.error('Error updating Set 57 Part 1:', err.message);
  }
}

run();
