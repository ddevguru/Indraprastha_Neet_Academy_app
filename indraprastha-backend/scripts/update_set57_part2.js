const BASE_URL = 'https://api.indraprasthaneetacademy.com/api';

const questionsPart2 = [
  {
    id: 3058,
    similarQuestion: {
      question: "The rectified output current of a full-wave rectifier has a peak amplitude I₀. The average (DC) value of this full-wave rectified current over a complete cycle is:",
      option_a: "I₀ / 2",
      option_b: "I₀ / π",
      option_c: "(2 I₀) / π",
      option_d: "Zero",
      correct_option: "C",
      explanation: "Step 1: In a full-wave rectifier, both positive and negative half-cycles are rectified into unidirectional current pulses.\n\nStep 2: The average value over a full cycle is given by:\nI_avg = (1 / π) ∫₀^π I₀ sin θ dθ = (I₀ / π) [-cos θ]₀^π = (I₀ / π) [1 - (-1)] = (2 I₀) / π.\n\nTherefore, Option (C) is the correct answer."
    }
  },
  {
    id: 3059,
    similarQuestion: {
      question: "An LC resonant circuit has an inductor L and capacitor C that oscillate at a resonant frequency f. If the inductance is doubled (2L) and the capacitance is quadrupled (4C), the new resonant frequency becomes:",
      option_a: "f / (2√2)",
      option_b: "f / 2",
      option_c: "f / 4",
      option_d: "8 f",
      correct_option: "A",
      explanation: "Step 1: The natural resonant frequency of an LC oscillator is:\nf = 1 / [2π √(L C)]\n\nStep 2: When L' = 2L and C' = 4C:\nL' C' = 2L × 4C = 8 L C\n\nStep 3: The new frequency f' is:\nf' = 1 / [2π √(8 L C)] = (1 / √8) × [1 / (2π √(LC))] = f / (2√2).\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 3060,
    similarQuestion: {
      question: "In a series LCR circuit driven by an alternating current of angular frequency ω, the total electrical impedance Z of the circuit is given by:",
      option_a: "√[R² + (ω L + 1 / ω C)²]",
      option_b: "√[R² + (ω L - 1 / ω C)²]",
      option_c: "R + ω L - 1 / (ω C)",
      option_d: "√[(R ω)² + (ω L - 1 / ω C)²]",
      correct_option: "B",
      explanation: "Step 1: In a series LCR circuit, inductive reactance is X_L = ω L and capacitive reactance is X_C = 1 / (ω C).\n\nStep 2: Net reactance is X = X_L - X_C = ω L - 1 / (ω C).\n\nStep 3: From the phasor diagram, impedance is the hypotenuse of the right triangle formed with resistance R and net reactance X:\nZ = √[R² + (ω L - 1 / ω C)²].\n\nTherefore, Option (B) is the correct answer."
    }
  },
  {
    id: 3061,
    similarQuestion: {
      question: "In a purely inductive AC circuit, a graph plotted between frequency f on the horizontal axis and the reciprocal of inductive reactance (1 / X_L) on the vertical axis is:",
      option_a: "A straight line passing through the origin",
      option_b: "A horizontal straight line",
      option_c: "A rectangular hyperbola",
      option_d: "A parabola opening along the vertical axis",
      correct_option: "C",
      explanation: "Step 1: Inductive reactance is X_L = 2π f L.\n\nStep 2: The reciprocal of inductive reactance is:\n1 / X_L = 1 / (2π L f) = [1 / (2π L)] × (1 / f)\n\nStep 3: Since (1 / X_L) ∝ 1/f, the relationship is inversely proportional, which represents a rectangular hyperbola.\n\nTherefore, Option (C) is the correct answer."
    }
  },
  {
    id: 3062,
    similarQuestion: {
      question: "The peak (maximum) voltage of an alternating sinusoidal supply is 282.8 V. The effective (rms) voltage of this AC supply is:",
      option_a: "200 V",
      option_b: "141.4 V",
      option_c: "400 V",
      option_d: "282.8 V",
      correct_option: "A",
      explanation: "Step 1: The effective (rms) voltage of a sinusoidal alternating voltage is related to the peak voltage V₀ by:\nV_rms = V₀ / √2\n\nStep 2: Substitute V₀ = 282.8 V and √2 ≈ 1.414:\nV_rms = 282.8 V / 1.414 = 200 V.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 3063,
    similarQuestion: {
      question: "A resistor of 30 Ω, an inductor of reactance 10 Ω, and a capacitor of reactance 10 Ω are connected in series across an AC voltage source e(t) = 300√2 sin(ωt) V. The rms current in the circuit is:",
      option_a: "10√2 A",
      option_b: "10 A",
      option_c: "30 A",
      option_d: "5 A",
      correct_option: "B",
      explanation: "Step 1: Identify resonance:\nX_L = 10 Ω and X_C = 10 Ω, so X_L = X_C.\nThe circuit is in resonance, and the total impedance is purely resistive:\nZ = R = 30 Ω.\n\nStep 2: Find the rms voltage of the supply:\nV_rms = V₀ / √2 = (300√2 V) / √2 = 300 V.\n\nStep 3: Calculate the rms current:\nI_rms = V_rms / Z = 300 V / 30 Ω = 10 A.\n\nTherefore, Option (B) is the correct answer."
    }
  },
  {
    id: 3064,
    similarQuestion: {
      question: "The sharpness of resonance and the quality factor (Q-factor) of a series LCR circuit can be increased by choosing a coil having:",
      option_a: "Large self-inductance and small ohmic resistance",
      option_b: "Small self-inductance and large ohmic resistance",
      option_c: "Large self-inductance and large ohmic resistance",
      option_d: "Small self-inductance and small ohmic resistance",
      correct_option: "A",
      explanation: "Step 1: The quality factor of a series LCR circuit is given by:\nQ = (1 / R) × √(L / C)\n\nStep 2: To make Q as large as possible:\n- The resistance R should be as small as possible.\n- The self-inductance L should be as large as possible.\n\nStep 3: Hence, a coil of large inductance and small ohmic resistance maximizes the Q-factor.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 3065,
    similarQuestion: {
      question: "An alternating voltage is represented by E(t) = 20 sin(300 t) V. The average value of this voltage evaluated over one full cycle is:",
      option_a: "Zero",
      option_b: "10 V",
      option_c: "20 / √2 V",
      option_d: "20 V",
      correct_option: "A",
      explanation: "Step 1: A symmetrical alternating sinusoidal voltage has equal positive and negative areas under its curve over one complete cycle.\n\nStep 2: Mathematically:\nV_avg = (1 / T) ∫₀^T 20 sin(300 t) dt = (20 / T) [-cos(300 t) / 300]₀^T = 0.\n\nStep 3: Therefore, the mean (average) value of any symmetrical AC voltage over a full cycle is always strictly zero.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 3066,
    similarQuestion: {
      question: "If an alternating voltage across an ideal inductor is represented by V(t) = V₀ sin(ωt), which of the following expressions represents the resulting electric current i(t)?",
      option_a: "i(t) = I₀ sin(ωt)",
      option_b: "i(t) = I₀ sin(ωt + π/2)",
      option_c: "i(t) = I₀ sin(ωt + π)",
      option_d: "i(t) = I₀ sin(ωt - π/2)",
      correct_option: "D",
      explanation: "Step 1: In a purely inductive circuit, the self-induced back emf opposes current growth, causing current to lag behind voltage by a phase angle of 90° (π/2 radians).\n\nStep 2: If the applied voltage is V(t) = V₀ sin(ωt), the current equation is:\ni(t) = I₀ sin(ωt - π/2) = -I₀ cos(ωt).\n\nTherefore, Option (D) is the correct answer."
    }
  },
  {
    id: 3067,
    similarQuestion: {
      question: "In an AC circuit, the component of current that is out of phase by 90° with the applied voltage and consumes zero net electrical power over a cycle is termed:",
      option_a: "Convection current",
      option_b: "Wattless current",
      option_c: "Displacement current",
      option_d: "Eddy current",
      correct_option: "B",
      explanation: "Step 1: The current in an AC circuit can be resolved into two orthogonal components:\n- I_rms cos φ in phase with voltage (active or power component).\n- I_rms sin φ in quadrature (90° out of phase) with voltage.\n\nStep 2: The power dissipated by the quadrature component is:\nP = V_rms × (I_rms sin φ) × cos 90° = 0.\n\nStep 3: This component consumes zero average power and is referred to as the wattless (or reactive) current.\n\nTherefore, Option (B) is the correct answer."
    }
  },
  {
    id: 3068,
    similarQuestion: {
      question: "In an alternating current circuit containing only a pure ohmic resistance R, the electric current:",
      option_a: "Lags behind the applied emf by 90°",
      option_b: "Is strictly in phase with the applied emf",
      option_c: "Leads the applied emf by 90°",
      option_d: "Lags behind the applied emf by 45°",
      correct_option: "B",
      explanation: "Step 1: For a pure resistor, Ohm's law holds instantaneously at every moment: i(t) = v(t) / R.\n\nStep 2: If v(t) = V₀ sin(ωt), then i(t) = (V₀ / R) sin(ωt) = I₀ sin(ωt).\n\nStep 3: There is no phase difference between the voltage and current waveforms (φ = 0°); they oscillate precisely in phase.\n\nTherefore, Option (B) is the correct answer."
    }
  },
  {
    id: 3069,
    similarQuestion: {
      question: "An alternating voltage source is connected in series with a resistor R and an inductor L. If the potential difference across the resistor is 200 V and that across the inductor is 150 V, the applied supply voltage is:",
      option_a: "350 V",
      option_b: "250 V",
      option_c: "500 V",
      option_d: "300 V",
      correct_option: "B",
      explanation: "Step 1: In a series RL circuit, the voltage across the inductor leads the current by 90°, while the voltage across the resistor is in phase with current.\n\nStep 2: Therefore, V_R and V_L are perpendicular in the phasor diagram and must be added vectorially:\nV = √(V_R² + V_L²)\n\nStep 3: Substitute V_R = 200 V and V_L = 150 V:\nV = √(200² + 150²) = √(40000 + 22500) = √62500 = 250 V.\n\nTherefore, Option (B) is the correct answer."
    }
  },
  {
    id: 3070,
    similarQuestion: {
      question: "A series LCR circuit is at resonance with an rms voltage of 10 V measured across each of L, C, and R. If the resistance R is halved while maintaining the same applied source voltage, the new voltages across L, C, and R are respectively:",
      option_a: "10 V, 10 V, and 5 V",
      option_b: "10 V, 10 V, and 10 V",
      option_c: "20 V, 20 V, and 5 V",
      option_d: "20 V, 20 V, and 10 V",
      correct_option: "D",
      explanation: "Step 1: At resonance, V_L and V_C cancel out, so the source voltage equals V_R = 10 V.\n\nStep 2: If the resistance is halved to R' = R / 2, the new circuit current at resonance is:\nI' = V / R' = V / (R / 2) = 2 × (V / R) = 2 I.\n\nStep 3: Since current has doubled:\n- V_L' = I' × X_L = 2 × (I X_L) = 2 × 10 V = 20 V\n- V_C' = I' × X_C = 2 × (I X_C) = 2 × 10 V = 20 V\n- V_R' = I' × R' = (2 I) × (R / 2) = I R = 10 V (still equals the supply voltage).\n\nStep 4: Thus, the voltages become 20 V, 20 V, and 10 V.\n\nTherefore, Option (D) is the correct answer."
    }
  },
  {
    id: 3071,
    similarQuestion: {
      question: "If L denotes self-inductance and R denotes electrical resistance, the dimensional formula of the ratio L / R is:",
      option_a: "[M¹ L¹ T⁰]",
      option_b: "[M⁰ L⁰ T¹]",
      option_c: "[M⁰ L⁰ T⁻¹]",
      option_d: "[M¹ L² T⁻²]",
      correct_option: "B",
      explanation: "Step 1: The ratio L / R represents the inductive time constant of a circuit.\n\nStep 2: Since it has the dimensions of time, its dimensional formula is:\n[L / R] = [M⁰ L⁰ T¹].\n\nTherefore, Option (B) is the correct answer."
    }
  },
  {
    id: 3072,
    similarQuestion: {
      question: "In a series LCR circuit connected across an AC supply of 200 V (rms), the inductive reactance and capacitive reactance are equal (X_L = X_C = 50 Ω) and R = 20 Ω. An ideal AC voltmeter connected across the combined LC branch will read:",
      option_a: "200 V",
      option_b: "100 V",
      option_c: "50 V",
      option_d: "Zero",
      correct_option: "D",
      explanation: "Step 1: In a series circuit, the voltage across the inductor leads current by 90°, while the voltage across the capacitor lags current by 90°.\n\nStep 2: The phase difference between V_L and V_C is 180° (they are directly anti-parallel phasors).\n\nStep 3: The potential difference across the combined LC branch is:\nV_LC = |V_L - V_C| = |I X_L - I X_C| = I × |X_L - X_C|\n\nStep 4: Since X_L = X_C, V_LC = 0 V.\n\nTherefore, Option (D) is the correct answer."
    }
  },
  {
    id: 3073,
    similarQuestion: {
      question: "A wire coil has an ohmic resistance R when measured with direct current (DC). When connected to an alternating current (AC) source of the same voltage, the total opposition to the current (impedance):",
      option_a: "Remains strictly equal to R",
      option_b: "Increases because of inductive reactance",
      option_c: "Decreases to zero",
      option_d: "Becomes purely capacitive",
      correct_option: "B",
      explanation: "Step 1: Under DC conditions, frequency is zero (f = 0), so the coil offers only its ohmic resistance R.\n\nStep 2: Under AC conditions, the changing current induces a back emf, producing an inductive reactance X_L = 2π f L.\n\nStep 3: The total opposition to the current is the impedance Z = √(R² + X_L²).\nSince X_L > 0, Z > R, meaning the opposition to AC increases.\n\nTherefore, Option (B) is the correct answer."
    }
  },
  {
    id: 3074,
    similarQuestion: {
      question: "When a series LCR circuit is operating at resonance, which of the following statements is correct?",
      option_a: "The phase difference between voltage and current is 90°",
      option_b: "The impedance of the circuit is purely resistive and at its minimum value",
      option_c: "The circuit impedance is infinite",
      option_d: "The current in the circuit is zero",
      correct_option: "B",
      explanation: "Step 1: At resonance, inductive reactance equals capacitive reactance: X_L = X_C.\n\nStep 2: The net reactance is X = X_L - X_C = 0.\n\nStep 3: The total impedance becomes Z = √[R² + 0²] = R, which is purely resistive and attains its minimum possible value, resulting in maximum circuit current.\n\nTherefore, Option (B) is the correct answer."
    }
  },
  {
    id: 3075,
    similarQuestion: {
      question: "In a series LCR AC circuit, which voltmeter connected across a section of the circuit will read zero when the circuit is in resonance?",
      option_a: "A voltmeter connected across the resistor R",
      option_b: "A voltmeter connected across the whole circuit",
      option_c: "A voltmeter connected across the series combination of L and C",
      option_d: "A voltmeter connected across the inductor L alone",
      correct_option: "C",
      explanation: "Step 1: At resonance, V_L = I X_L and V_C = I X_C.\nSince X_L = X_C at resonance, V_L = V_C.\n\nStep 2: Because the voltage phasors across L and C are 180° out of phase, their net resultant across the combined LC pair is:\nV_LC = V_L - V_C = 0.\n\nStep 3: Hence, a voltmeter connected across both L and C reads exactly zero.\n\nTherefore, Option (C) is the correct answer."
    }
  },
  {
    id: 3076,
    similarQuestion: {
      question: "In an alternating current circuit, the inductive reactance of a coil is √3 times its resistance (X_L = √3 R). The phase difference between the voltage across the coil and the current through it is:",
      option_a: "π / 3 (60°)",
      option_b: "π / 2 (90°)",
      option_c: "π / 4 (45°)",
      option_d: "π / 6 (30°)",
      correct_option: "A",
      explanation: "Step 1: The phase angle φ between voltage and current in an LR circuit is given by:\ntan φ = X_L / R\n\nStep 2: Given X_L = √3 R:\ntan φ = (√3 R) / R = √3\n\nStep 3: Find φ:\nφ = tan⁻¹(√3) = 60° = π / 3 radians.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 3077,
    similarQuestion: {
      question: "In an AC circuit containing an ideal inductor only (purely inductive circuit), the alternating current:",
      option_a: "Leads the alternating voltage by 90°",
      option_b: "Lags behind the alternating voltage by 90°",
      option_c: "Is in phase with the alternating voltage",
      option_d: "Lags behind the alternating voltage by 45°",
      correct_option: "B",
      explanation: "Step 1: In a pure inductor, the voltage-current relationship is v = L (di/dt).\n\nStep 2: If v(t) = V₀ sin(ωt), then integrating gives:\ni(t) = (V₀ / ωL) sin(ωt - π/2) = I₀ sin(ωt - π/2).\n\nStep 3: This shows that the current lags behind the applied voltage by a phase angle of 90° (π/2 radians).\n\nTherefore, Option (B) is the correct answer."
    }
  },
  {
    id: 3078,
    similarQuestion: {
      question: "In a series LR circuit, the resistance is 8 Ω and the inductive reactance is 6 Ω. The total impedance of the circuit is:",
      option_a: "2 Ω",
      option_b: "14 Ω",
      option_c: "4 Ω",
      option_d: "10 Ω",
      correct_option: "D",
      explanation: "Step 1: The impedance of a series LR circuit is given by:\nZ = √(R² + X_L²)\n\nStep 2: Substitute R = 8 Ω and X_L = 6 Ω:\nZ = √(8² + 6²) = √(64 + 36) = √100 = 10 Ω.\n\nTherefore, Option (D) is the correct answer."
    }
  },
  {
    id: 3079,
    similarQuestion: {
      question: "A series LCR circuit has an inductor L = 0.5 H, a capacitor C = 80 μF, and a resistor R = 40 Ω. The resonant angular frequency ω₀ of the circuit is:",
      option_a: "100 rad/s",
      option_b: "158 rad/s",
      option_c: "200 rad/s",
      option_d: "50 rad/s",
      correct_option: "B",
      explanation: "Step 1: The formula for resonant angular frequency is:\nω₀ = 1 / √(L × C)\n\nStep 2: Substitute L = 0.5 H and C = 80 μF = 80 × 10⁻⁶ F:\nL × C = 0.5 × 80 × 10⁻⁶ = 40 × 10⁻⁶ = 4 × 10⁻⁵\n\nStep 3: Compute ω₀:\nω₀ = 1 / √(4 × 10⁻⁵) = 1 / (2 × 10⁻² × √10) = 100 / (2 × 3.162) = 100 / 6.324 ≈ 158 rad/s.\n\nTherefore, Option (B) is the correct answer."
    }
  },
  {
    id: 3080,
    similarQuestion: {
      question: "An AC voltage source of variable angular frequency ω and fixed amplitude V₀ is connected in series with a capacitor C and an electric light bulb of resistance R. When the angular frequency ω is increased, the brightness of the bulb:",
      option_a: "Glows dimmer",
      option_b: "Glows brighter",
      option_c: "Remains strictly unchanged",
      option_d: "Extinguishes completely",
      correct_option: "B",
      explanation: "Step 1: The capacitive reactance is X_C = 1 / (ω C).\n\nStep 2: When angular frequency ω increases, capacitive reactance X_C decreases.\n\nStep 3: The circuit impedance Z = √(R² + X_C²) decreases, allowing a larger alternating current I_rms = V_rms / Z to pass through the circuit.\n\nStep 4: Since power dissipated in the bulb filament is P = I_rms² R, the bulb glows brighter.\n\nTherefore, Option (B) is the correct answer."
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
    console.log('Login successful for Set 57 Part 2.');

    for (let i = 0; i < questionsPart2.length; i++) {
      const q = questionsPart2[i];
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
      console.log(`Updated question ${i + 23}/${questionsPart2.length + 22} (ID: ${q.id})`);
    }
    console.log('Set 57 Part 2 completed successfully!');
  } catch (err) {
    console.error('Error updating Set 57 Part 2:', err.message);
  }
}

run();
