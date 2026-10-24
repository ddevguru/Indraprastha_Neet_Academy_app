const API_URL = 'https://api.indraprasthaneetacademy.com/api';

const questions = [
  {
    id: 3013,
    similarQuestion: {
      question: "In an extrinsic semiconductor, the electron concentration is n_e = 6.0 × 10¹⁸ m⁻³ and the hole concentration is n_h = 3.0 × 10¹⁸ m⁻³. The mobilities of electrons and holes are μ_e = 2.0 m²/(V·s) and μ_h = 0.02 m²/(V·s) respectively. The type of semiconductor and its electrical resistivity ρ are: (Take e = 1.6 × 10⁻¹⁹ C)",
      option_a: "n-type and ρ ≈ 0.52 Ω·m",
      option_b: "p-type and ρ ≈ 0.52 Ω·m",
      option_c: "n-type and ρ ≈ 0.052 Ω·m",
      option_d: "p-type and ρ ≈ 5.2 Ω·m",
      correct_option: "A",
      explanation: "Since the electron concentration exceeds the hole concentration (n_e > n_h), the semiconductor is n-type. Electrical conductivity is σ = e (n_e μ_e + n_h μ_h) = 1.6 × 10⁻¹⁹ × [(6.0 × 10¹⁸ × 2.0) + (3.0 × 10¹⁸ × 0.02)] = 1.6 × 10⁻¹⁹ × [12.0 × 10¹⁸ + 0.06 × 10¹⁸] = 1.6 × 10⁻¹⁹ × 12.06 × 10¹⁸ ≈ 1.93 S/m. Electrical resistivity ρ = 1 / σ = 1 / 1.93 ≈ 0.518 Ω·m ≈ 0.52 Ω·m. Therefore, Option (A) is the correct answer."
    }
  },
  {
    id: 3014,
    similarQuestion: {
      question: "An alternating sinusoidal AC voltage with a peak value of V₀ = 140 V is fed into a half-wave rectifier circuit with an ideal diode. The root-mean-square (RMS) value of the rectified output voltage across the load resistor is:",
      option_a: "140 V",
      option_b: "99 V",
      option_c: "70 V",
      option_d: "44.5 V",
      correct_option: "C",
      explanation: "For a half-wave rectified sinusoidal wave, the output voltage waveform exists only during one half-cycle: v(t) = V₀ sin(ωt) for 0 ≤ t ≤ T/2 and v(t) = 0 for T/2 < t < T. The RMS value is V_rms = V₀ / 2. Given V₀ = 140 V: V_rms = 140 / 2 = 70 V. (In contrast, for an unrectified sine wave or full-wave rectifier, V_rms = V₀ / √2). Therefore, Option (C) is the correct answer."
    }
  },
  {
    id: 3015,
    similarQuestion: {
      question: "A 12 V battery is connected across two parallel branches, each containing an ideal diode and a resistor in series. Branch 1 has a forward-biased diode with a 200 Ω resistor, while Branch 2 has a reverse-biased diode with a 200 Ω resistor. A 100 Ω resistor is in series with the whole combination. The total current drawn from the battery is:",
      option_a: "Zero",
      option_b: "0.04 A",
      option_c: "0.06 A",
      option_d: "0.12 A",
      correct_option: "B",
      explanation: "The reverse-biased diode in Branch 2 has infinite resistance, so Branch 2 carries zero current. The forward-biased ideal diode in Branch 1 conducts with zero resistance. Thus, only Branch 1 is active, offering a resistance of 200 Ω. The total resistance in the circuit is R_total = 200 Ω + 100 Ω = 300 Ω. By Ohm's law, total current is I = V / R_total = 12 V / 300 Ω = 0.04 A. Therefore, Option (B) is the correct answer."
    }
  },
  {
    id: 3016,
    similarQuestion: {
      question: "In a circuit, two identical silicon diodes (each with forward knee voltage 0.7 V) are connected in parallel with the same polarity across a DC branch. If a current of 20 mA flows through the branch, the potential difference across the parallel diode combination is:",
      option_a: "0.7 V",
      option_b: "1.4 V",
      option_c: "0.35 V",
      option_d: "Zero",
      correct_option: "A",
      explanation: "When identical diodes are connected in parallel in the forward direction, they both turn on and clamp the potential difference across the combination to their common forward knee voltage, which is 0.7 V. Therefore, Option (A) is the correct answer."
    }
  },
  {
    id: 3017,
    similarQuestion: {
      question: "A germanium diode (knee voltage 0.3 V) and a silicon diode (knee voltage 0.7 V) are connected in parallel with the same forward polarity in series with a resistor and a 10 V DC supply. If the germanium diode is removed from the circuit, by how much does the forward voltage drop across the diode branch change?",
      option_a: "0.2 V",
      option_b: "0.4 V",
      option_c: "0.7 V",
      option_d: "1.0 V",
      correct_option: "B",
      explanation: "With both diodes connected in parallel in forward bias, the germanium diode turns on first at 0.3 V and clamps the branch voltage to 0.3 V, preventing the silicon diode from conducting. When the germanium diode is removed, the silicon diode conducts, clamping the branch voltage at 0.7 V. The change in voltage across the diode branch is ΔV = 0.7 V - 0.3 V = 0.4 V. Therefore, Option (B) is the correct answer."
    }
  },
  {
    id: 3018,
    similarQuestion: {
      question: "In a common-emitter n-p-n transistor circuit, V_CC = 12 V, R_C = 2 kΩ, and the base is supplied through R_B = 100 kΩ from a 2.7 V source. If V_BE = 0.7 V and β = 50, what is the collector-emitter voltage V_CE?",
      option_a: "2 V",
      option_b: "6 V",
      option_c: "8 V",
      option_d: "10 V",
      correct_option: "D",
      explanation: "Base current I_B = (V_BB - V_BE) / R_B = (2.7 V - 0.7 V) / 100 kΩ = 2.0 V / 10⁵ Ω = 0.02 mA = 20 μA. Collector current I_C = β I_B = 50 × 0.02 mA = 1.0 mA. Collector-emitter loop equation gives: V_CE = V_CC - I_C R_C = 12 V - (1.0 mA × 2 kΩ) = 12 V - 2 V = 10 V. Therefore, Option (D) is the correct answer."
    }
  },
  {
    id: 3019,
    similarQuestion: {
      question: "From the forward dynamic characteristic of a p-n junction diode, the current changes from 10 mA to 30 mA when the forward voltage is increased from 0.70 V to 0.74 V. What is the dynamic resistance of the diode?",
      option_a: "1.0 Ω",
      option_b: "2.0 Ω",
      option_c: "4.0 Ω",
      option_d: "10.0 Ω",
      correct_option: "B",
      explanation: "Dynamic resistance r_d is defined as the ratio of a small change in forward voltage to the resulting change in forward current: r_d = ΔV / ΔI. Here, ΔV = 0.74 V - 0.70 V = 0.04 V, and ΔI = 30 mA - 10 mA = 20 mA = 0.02 A. Therefore, r_d = 0.04 V / 0.02 A = 2.0 Ω. Therefore, Option (B) is the correct answer."
    }
  },
  {
    id: 3020,
    similarQuestion: {
      question: "Which of the following best describes the output voltage waveform across the load of a single-diode half-wave rectifier supplied with a sinusoidal AC voltage without a filter capacitor?",
      option_a: "A pure steady DC line",
      option_b: "A series of positive half-sine pulses separated by zero-voltage intervals",
      option_c: "A continuous sequence of rectified positive half-sine pulses with no gap",
      option_d: "An inverted sinusoidal alternating voltage",
      correct_option: "B",
      explanation: "In an unfiltered half-wave rectifier, the diode conducts only during the positive half-cycles and blocks current during the negative half-cycles. Consequently, the output voltage consists of unidirectional positive half-sine wave pulses separated by zero-voltage gaps of duration T/2. Therefore, Option (B) is the correct answer."
    }
  },
  {
    id: 3021,
    similarQuestion: {
      question: "If an increase of 0.1 V in the forward bias across a p-n junction diode increases the forward current by 25 mA, the dynamic resistance of the junction is:",
      option_a: "2.5 Ω",
      option_b: "4.0 Ω",
      option_c: "0.4 Ω",
      option_d: "25 Ω",
      correct_option: "B",
      explanation: "The dynamic resistance of a p-n junction is given by r = ΔV / ΔI. Given ΔV = 0.1 V and ΔI = 25 mA = 0.025 A: r = 0.1 / 0.025 = 4.0 Ω. Therefore, Option (B) is the correct answer."
    }
  },
  {
    id: 3022,
    similarQuestion: {
      question: "For a two-input logic gate, the output Y is recorded as HIGH (1) only during the time intervals when both inputs A and B are simultaneously HIGH (1), and is LOW (0) at all other times. This operation corresponds to:",
      option_a: "An AND gate",
      option_b: "An OR gate",
      option_c: "A NOR gate",
      option_d: "A NAND gate",
      correct_option: "A",
      explanation: "By definition, an AND gate yields a HIGH output (1) if and only if all of its input signals are simultaneously HIGH (A = 1 and B = 1). In timing diagrams, Y goes high only in overlapping High pulses of A and B. Therefore, Option (A) is the correct answer."
    }
  },
  {
    id: 3023,
    similarQuestion: {
      question: "An amplifier has an open-loop voltage gain of A = 20. If 4% positive feedback (β = 0.04) is applied to the amplifier, what is the resulting closed-loop voltage gain A_f?",
      option_a: "25",
      option_b: "50",
      option_c: "100",
      option_d: "200",
      correct_option: "C",
      explanation: "The voltage gain of an amplifier with positive feedback is given by: A_f = A / (1 - A β). Here open-loop gain A = 20 and feedback factor β = 4% = 0.04. The loop gain product A β = 20 × 0.04 = 0.8. Thus, A_f = 20 / (1 - 0.8) = 20 / 0.2 = 100. Therefore, Option (C) is the correct answer."
    }
  },
  {
    id: 3024,
    similarQuestion: {
      question: "Germanium crystal P is doped with antimony (Group 15, pentavalent), and crystal Q is doped with gallium (Group 13, trivalent). The two crystals are joined to form a p-n junction. If the positive terminal of an external DC source is connected to P and the negative terminal to Q, the junction is:",
      option_a: "P is p-type, Q is n-type, forward biased",
      option_b: "P is n-type, Q is p-type, forward biased",
      option_c: "P is p-type, Q is n-type, reverse biased",
      option_d: "P is n-type, Q is p-type, reverse biased",
      correct_option: "D",
      explanation: "Doping with pentavalent antimony (Group 15) provides donor electrons, making P an n-type semiconductor. Doping with trivalent gallium (Group 13) provides acceptor holes, making Q a p-type semiconductor. When the positive terminal of the battery is connected to n-type (P) and the negative terminal to p-type (Q), the junction is reverse-biased. Therefore, Option (D) is the correct answer."
    }
  },
  {
    id: 3025,
    similarQuestion: {
      question: "In a common-emitter transistor amplifier circuit, V_CC = 12 V, collector resistance R_C = 3 kΩ, and current gain β = 120. If the quiescent collector-emitter voltage is V_CE = 6 V, what is the base current I_B?",
      option_a: "12.5 μA",
      option_b: "16.7 μA",
      option_c: "20.0 μA",
      option_d: "25.0 μA",
      correct_option: "B",
      explanation: "From the collector-emitter output loop: V_CC - I_C R_C - V_CE = 0 ⇒ I_C R_C = V_CC - V_CE = 12 V - 6 V = 6 V. The collector current is: I_C = 6 V / 3000 Ω = 2.0 × 10⁻³ A = 2.0 mA = 2000 μA. Since I_C = β I_B, the base current is: I_B = I_C / β = 2000 μA / 120 ≈ 16.67 μA. Therefore, Option (B) is the correct answer."
    }
  },
  {
    id: 3026,
    similarQuestion: {
      question: "In a common-emitter transistor circuit, a base bias resistor R_B is connected between the base and a 9.0 V DC power supply. Assuming the base-emitter voltage drop V_BE is negligible, what value of R_B is required to establish a base current of 30 μA?",
      option_a: "100 kΩ",
      option_b: "200 kΩ",
      option_c: "300 kΩ",
      option_d: "450 kΩ",
      correct_option: "C",
      explanation: "In the base circuit loop: V_BB - I_B R_B - V_BE = 0. With V_BE ≈ 0: R_B = V_BB / I_B = 9.0 V / (30 × 10⁻⁶ A) = 300,000 Ω = 300 kΩ. Therefore, Option (C) is the correct answer."
    }
  },
  {
    id: 3027,
    similarQuestion: {
      question: "An ideal diode is connected in series with a load resistor across an AC signal source v_in(t) = V₀ sin(ωt). If the diode conducts only when the input terminal is positive with respect to ground, the output voltage waveform across the load resistor represents:",
      option_a: "A full sinusoidal AC wave",
      option_b: "Only the negative half-cycles of the AC wave",
      option_c: "Zero output at all times",
      option_d: "Only the positive half-cycles of the AC wave (half-wave rectified)",
      correct_option: "D",
      explanation: "Because the ideal diode conducts with zero resistance during positive half-cycles (forward bias) and completely blocks conduction during negative half-cycles (reverse bias), current flows through the load resistor only during positive half-cycles, producing a positive half-wave rectified waveform. Therefore, Option (D) is the correct answer."
    }
  },
  {
    id: 3028,
    similarQuestion: {
      question: "In a common-emitter transistor amplifier, the input resistance is 500 Ω, the load resistance in the collector circuit is 4.0 kΩ, and the current gain is β = 60. The voltage gain of the amplifier is:",
      option_a: "120",
      option_b: "240",
      option_c: "480",
      option_d: "600",
      correct_option: "C",
      explanation: "The voltage gain A_v in common-emitter configuration is given by: A_v = β × (R_L / R_in). Substituting β = 60, R_L = 4000 Ω, and R_in = 500 Ω: A_v = 60 × (4000 / 500) = 60 × 8 = 480. Therefore, Option (C) is the correct answer."
    }
  },
  {
    id: 3029,
    similarQuestion: {
      question: "Two identical ideal diodes D₁ and D₂ are connected in parallel between terminals A and B, but in opposite directions (anode of D₁ connected to cathode of D₂ at terminal A). A 50 Ω resistor is placed in series with D₁, and a 100 Ω resistor is in series with D₂. If terminal A is at +10 V and terminal B is at 0 V, what is the equivalent resistance between A and B?",
      option_a: "33.3 Ω",
      option_b: "50 Ω",
      option_c: "100 Ω",
      option_d: "150 Ω",
      correct_option: "B",
      explanation: "When terminal A is at +10 V and B is at 0 V: Diode D₁ (anode at A) is forward-biased and acts as a short circuit with zero resistance. Diode D₂ (cathode at A) is reverse-biased and acts as an open circuit with infinite resistance. Thus, current flows solely through the branch containing D₁ and the 50 Ω resistor. The equivalent resistance between A and B is 50 Ω. Therefore, Option (B) is the correct answer."
    }
  },
  {
    id: 3030,
    similarQuestion: {
      question: "In the energy band diagram of an extrinsic semiconductor at room temperature, the concentration of holes in the valence band is significantly greater than the concentration of electrons in the conduction band. This material is identified as:",
      option_a: "An n-type semiconductor",
      option_b: "A p-type semiconductor",
      option_c: "An intrinsic semiconductor",
      option_d: "A perfect insulator",
      correct_option: "B",
      explanation: "In a p-type semiconductor, trivalent acceptor doping creates a dominant majority of holes in the valence band (n_h >> n_e). Since holes in the valence band far outnumber conduction electrons, the material is a p-type semiconductor. Therefore, Option (B) is the correct answer."
    }
  },
  {
    id: 3031,
    similarQuestion: {
      question: "In a common-emitter amplifier, changing the base current by 40 μA produces a corresponding change of 3.2 mA in the collector current at constant collector-emitter voltage. The AC current gain β_ac of the transistor is:",
      option_a: "40",
      option_b: "60",
      option_c: "80",
      option_d: "120",
      correct_option: "C",
      explanation: "The AC current gain in common-emitter configuration is given by: β_ac = ΔI_C / ΔI_B. Substituting ΔI_C = 3.2 mA = 3200 μA and ΔI_B = 40 μA: β_ac = 3200 / 40 = 80. Therefore, Option (C) is the correct answer."
    }
  },
  {
    id: 3032,
    similarQuestion: {
      question: "A 10 V Zener diode is used in a voltage regulator circuit with an unregulated input DC voltage of V_in = 16 V, a series resistance of R_s = 200 Ω, and a load resistance of R_L = 1.0 kΩ. What is the current flowing through the Zener diode?",
      option_a: "10 mA",
      option_b: "20 mA",
      option_c: "30 mA",
      option_d: "40 mA",
      correct_option: "B",
      explanation: "The voltage across load is regulated at V_Z = 10 V. Load current I_L = V_Z / R_L = 10 V / 1000 Ω = 10 mA. Voltage drop across series resistor is V_s = V_in - V_Z = 16 V - 10 V = 6 V. Total supply current through R_s is I_s = V_s / R_s = 6 V / 200 Ω = 30 mA. By Kirchhoff's current law at the node: I_s = I_Z + I_L ⇒ I_Z = I_s - I_L = 30 mA - 10 mA = 20 mA. Therefore, Option (B) is the correct answer."
    }
  },
  {
    id: 3033,
    similarQuestion: {
      question: "An intrinsic semiconductor has an intrinsic carrier concentration of n_i = 1.5 × 10¹⁶ m⁻³ at room temperature. After doping with acceptor impurities, the hole concentration becomes n_h = 4.5 × 10²² m⁻³. What is the resulting electron concentration n_e?",
      option_a: "5.0 × 10⁹ m⁻³",
      option_b: "1.5 × 10¹⁰ m⁻³",
      option_c: "2.25 × 10¹¹ m⁻³",
      option_d: "3.0 × 10¹² m⁻³",
      correct_option: "A",
      explanation: "According to the mass action law for semiconductors in thermal equilibrium: n_e × n_h = n_i². Rearranging gives: n_e = n_i² / n_h = (1.5 × 10¹⁶ m⁻³)² / (4.5 × 10²² m⁻³) = (2.25 × 10³²) / (4.5 × 10²²) = 0.5 × 10¹⁰ m⁻³ = 5.0 × 10⁹ m⁻³. Therefore, Option (A) is the correct answer."
    }
  },
  {
    id: 3034,
    similarQuestion: {
      question: "In a circuit containing a 10 V DC battery in series with a 4 Ω resistor and an ideal p-n junction diode connected in forward bias, what is the current flowing through the circuit?",
      option_a: "Zero",
      option_b: "1.25 A",
      option_c: "2.5 A",
      option_d: "5.0 A",
      correct_option: "C",
      explanation: "For an ideal diode in forward bias, the internal resistance is zero and the forward voltage drop is 0 V. Therefore, the entire battery voltage appears across the resistor: I = V / R = 10 V / 4 Ω = 2.5 A. Therefore, Option (C) is the correct answer."
    }
  },
  {
    id: 3035,
    similarQuestion: {
      question: "For an ideal p-n junction diode, which of the following statements correctly describes its theoretical V-I characteristic curve?",
      option_a: "A linear Ohm's law line passing through the origin",
      option_b: "Zero current (I = 0) for all negative voltages (V < 0) and zero forward voltage drop (V = 0) for any forward current (I ≥ 0)",
      option_c: "Constant saturation current in both forward and reverse directions",
      option_d: "Exponential growth in both quadrants",
      correct_option: "B",
      explanation: "An ideal diode behaves as a perfect unilateral switch: in forward bias (V ≥ 0), it acts as a short circuit with zero resistance, so the forward voltage drop remains 0 while any forward current can flow (represented by the vertical positive I-axis). In reverse bias (V < 0), it acts as a perfect open circuit with infinite resistance, so the reverse current is strictly zero (represented by the negative V-axis). Therefore, Option (B) is the correct answer."
    }
  }
];

async function main() {
  const loginRes = await fetch(`${API_URL}/admin/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username: 'indraprasthaadmin', password: 'indraprastha@123' })
  });
  const loginData = await loginRes.json();
  const token = loginData.token;
  console.log('Logged in successfully, token received.');

  let success = 0;
  for (const q of questions) {
    const res = await fetch(`${API_URL}/admin/practice-questions/${q.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({ similarQuestion: q.similarQuestion })
    });
    if (res.ok) {
      success++;
      console.log(`[SUCCESS] Updated question ${q.id} (${success}/${questions.length})`);
    } else {
      const err = await res.text();
      console.error(`[ERROR] Question ${q.id}: ${err}`);
    }
  }
  console.log(`Set 64 Part 2 Complete: ${success}/${questions.length} updated successfully.`);
}

main().catch(console.error);
