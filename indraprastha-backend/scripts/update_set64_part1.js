const API_URL = 'https://api.indraprasthaneetacademy.com/api';

const questions = [
  {
    id: 2991,
    similarQuestion: {
      question: "As the temperature of an intrinsic semiconductor is increased, its electrical resistivity:",
      option_a: "Increases linearly",
      option_b: "Decreases exponentially",
      option_c: "Remains unchanged",
      option_d: "First increases and then decreases",
      correct_option: "B",
      explanation: "In semiconductors, raising the temperature thermally excites covalent electrons across the band gap into the conduction band, creating electron-hole pairs. The charge carrier concentration n increases exponentially as n ∝ e^(-E_g / (2 k_B T)). As a result, the electrical conductivity increases and resistivity ρ = 1/σ decreases exponentially with temperature. Therefore, semiconductors have a negative temperature coefficient of resistance. Therefore, Option (B) is the correct answer."
    }
  },
  {
    id: 2992,
    similarQuestion: {
      question: "An n-type semiconductor crystal contains a large number of free conduction electrons. The net electrical charge on the crystal is:",
      option_a: "Net negative",
      option_b: "Net positive",
      option_c: "Zero (electrically neutral)",
      option_d: "Dependent on the magnitude of the bias voltage",
      correct_option: "C",
      explanation: "Although electrons are the majority carriers in an n-type semiconductor, each free conduction electron originates from an electrically neutral donor atom that becomes a fixed positive donor ion after donation. The total number of positive charges (protons in lattice and donor ions) precisely equals the total number of negative charges (bound and free electrons). Thus, the extrinsic semiconductor remains strictly electrically neutral. Therefore, Option (C) is the correct answer."
    }
  },
  {
    id: 2993,
    similarQuestion: {
      question: "Which of the following statements regarding semiconductors is INCORRECT?",
      option_a: "The resistivity of an intrinsic semiconductor decreases with increasing temperature",
      option_b: "Doping pure silicon with trivalent impurities produces a p-type semiconductor",
      option_c: "In an n-type semiconductor, holes are the majority charge carriers",
      option_d: "A p-n junction can be used as a rectifier diode",
      correct_option: "C",
      explanation: "In an n-type semiconductor, pentavalent donor impurities supply free electrons; hence, electrons are the majority charge carriers and holes are the minority charge carriers. Therefore, statement (C) is incorrect. Therefore, Option (C) is the correct answer."
    }
  },
  {
    id: 2994,
    similarQuestion: {
      question: "A p-n junction diode is in the reverse-biased condition when:",
      option_a: "The p-side is connected to a higher potential than the n-side",
      option_b: "The p-side is connected to a lower potential than the n-side",
      option_c: "The p-side and n-side are grounded at zero potential",
      option_d: "A large forward diffusion current flows through the junction",
      correct_option: "B",
      explanation: "A p-n junction diode is reverse-biased when its p-region (anode) is connected to a lower potential (or negative battery terminal) and its n-region (cathode) is connected to a higher potential (or positive battery terminal). This applied field aids the barrier potential, widens the depletion layer, and opposes majority carrier diffusion. Therefore, Option (B) is the correct answer."
    }
  },
  {
    id: 2995,
    similarQuestion: {
      question: "The energy band gap of pure silicon is 1.1 eV, and its intrinsic Fermi level lies at the center of the gap (0.55 eV below the conduction band). When doped with pentavalent donors to form an n-type semiconductor, the Fermi energy level:",
      option_a: "Remains at 0.55 eV below the conduction band",
      option_b: "Shifts closer to the conduction band (distance < 0.55 eV)",
      option_c: "Shifts closer to the valence band",
      option_d: "Enters inside the valence band",
      correct_option: "B",
      explanation: "Pentavalent donor atoms create donor energy levels just below the conduction band (typically ~0.05 eV below CB). The introduction of a large density of donor electrons pushes the Fermi level upward, positioning it very close to the bottom of the conduction band, so its distance from the conduction band becomes less than 0.55 eV. Therefore, Option (B) is the correct answer."
    }
  },
  {
    id: 2996,
    similarQuestion: {
      question: "In electronic schematic diagrams, a photodiode is symbolically represented by a p-n diode symbol with:",
      option_a: "Two arrows pointing away from the junction",
      option_b: "Two arrows pointing inward toward the junction",
      option_c: "A circular gate terminal added to the cathode",
      option_d: "A wavy line drawn across the anode terminal",
      correct_option: "B",
      explanation: "The standard circuit symbol for a photodiode consists of a p-n junction diode symbol accompanied by two arrows pointing toward the junction, indicating that incoming optical radiation (light photons) falls onto the photosensitive depletion region. (In contrast, an LED has arrows pointing away). Therefore, Option (B) is the correct answer."
    }
  },
  {
    id: 2997,
    similarQuestion: {
      question: "The barrier potential across a silicon p-n junction is 0.7 V and the thickness of the depletion layer is 0.5 μm. The average electric field existing in the depletion layer is:",
      option_a: "1.4 × 10⁴ V/m",
      option_b: "3.5 × 10⁵ V/m",
      option_c: "1.4 × 10⁶ V/m",
      option_d: "7.0 × 10⁶ V/m",
      correct_option: "C",
      explanation: "The magnitude of the internal electric field across the depletion region is given by E = V / d. Substituting the barrier voltage V = 0.7 V and width d = 0.5 μm = 0.5 × 10⁻⁶ m: E = 0.7 / (0.5 × 10⁻⁶) = 1.4 × 10⁶ V/m. Therefore, Option (C) is the correct answer."
    }
  },
  {
    id: 2998,
    similarQuestion: {
      question: "An ideal p-n junction diode is connected in series with a 50 Ω resistor and a 5 V DC source. If the p-side of the diode is connected to the negative terminal and the n-side to the positive terminal of the source, the current flowing through the circuit is:",
      option_a: "0.1 A",
      option_b: "0.05 A",
      option_c: "Zero",
      option_d: "1.0 A",
      correct_option: "C",
      explanation: "With the p-terminal connected to the negative supply voltage and the n-terminal connected to the positive supply voltage, the diode is reverse-biased. Since an ideal diode has infinite resistance in reverse bias, no current can flow in the circuit (I = 0). Therefore, Option (C) is the correct answer."
    }
  },
  {
    id: 2999,
    similarQuestion: {
      question: "A half-wave rectifier and a full-wave rectifier are both powered by a 60 Hz AC mains supply. The fundamental ripple frequencies of the output voltages for the half-wave and full-wave rectifiers are respectively:",
      option_a: "60 Hz and 60 Hz",
      option_b: "60 Hz and 120 Hz",
      option_c: "120 Hz and 60 Hz",
      option_d: "30 Hz and 60 Hz",
      correct_option: "B",
      explanation: "For a half-wave rectifier, only one half of each AC cycle is conducted, so the output pulse frequency equals the input frequency: f_ripple = f_in = 60 Hz. For a full-wave rectifier, both half-cycles are rectified into output pulses in the same direction, doubling the frequency: f_ripple = 2 f_in = 2 × 60 Hz = 120 Hz. Therefore, Option (B) is the correct answer."
    }
  },
  {
    id: 3000,
    similarQuestion: {
      question: "In an n-p-n transistor, 90% of the electrons emitted by the emitter reach the collector. If the collector current is 18 mA, what is the base current?",
      option_a: "1.8 mA",
      option_b: "2.0 mA",
      option_c: "0.9 mA",
      option_d: "3.6 mA",
      correct_option: "B",
      explanation: "The collector current is 90% of the emitter current: I_C = 0.90 I_E ⇒ I_E = I_C / 0.90 = 18 mA / 0.90 = 20 mA. Using the transistor terminal current relationship I_E = I_B + I_C: I_B = I_E - I_C = 20 mA - 18 mA = 2.0 mA. Therefore, Option (B) is the correct answer."
    }
  },
  {
    id: 3001,
    similarQuestion: {
      question: "If the common-base current amplification factor α of a transistor is 0.95, what is its common-emitter current gain β?",
      option_a: "19",
      option_b: "24",
      option_c: "49",
      option_d: "95",
      correct_option: "A",
      explanation: "The relationship between the common-emitter current gain β and the common-base current gain α is: β = α / (1 - α). Substituting α = 0.95: β = 0.95 / (1 - 0.95) = 0.95 / 0.05 = 19. Therefore, Option (A) is the correct answer."
    }
  },
  {
    id: 3002,
    similarQuestion: {
      question: "A transistor connected in common-base configuration has a current amplification factor α = 0.98. If the emitter current is 5.0 mA, the base current is:",
      option_a: "0.05 mA",
      option_b: "0.10 mA",
      option_c: "0.20 mA",
      option_d: "0.49 mA",
      correct_option: "B",
      explanation: "The collector current is given by I_C = α I_E = 0.98 × 5.0 mA = 4.90 mA. Using I_E = I_B + I_C, the base current is: I_B = I_E - I_C = 5.0 mA - 4.90 mA = 0.10 mA (or directly I_B = (1 - α) I_E = 0.02 × 5.0 mA = 0.10 mA). Therefore, Option (B) is the correct answer."
    }
  },
  {
    id: 3003,
    similarQuestion: {
      question: "In the physical fabrication of a bipolar junction transistor, the relative widths of the collector (W_C), emitter (W_E), and base (W_B) regions follow the inequality:",
      option_a: "W_B < W_E < W_C",
      option_b: "W_E < W_B < W_C",
      option_c: "W_C < W_E < W_B",
      option_d: "W_B = W_E = W_C",
      correct_option: "A",
      explanation: "In a junction transistor, the base region is made extremely thin (typically ~1 to 2 μm) to minimize carrier recombination. The collector region is made physically largest to dissipate the heat generated by collecting energetic charge carriers, and the emitter is of intermediate size. Thus, W_B < W_E < W_C. Therefore, Option (A) is the correct answer."
    }
  },
  {
    id: 3004,
    similarQuestion: {
      question: "Which semiconductor element is most predominantly used in modern integrated circuits and commercial bipolar transistors due to its thermal stability and stable oxide formation?",
      option_a: "Germanium",
      option_b: "Silicon",
      option_c: "Carbon (diamond)",
      option_d: "Selenium",
      correct_option: "B",
      explanation: "Silicon (Si) is the material of choice for transistors and integrated circuits because it has an optimal band gap (1.1 eV), exhibits much lower reverse saturation current than germanium, operates stably up to higher temperatures (~150°C), and easily forms high-quality native dielectric oxide (SiO₂) layers. Therefore, Option (B) is the correct answer."
    }
  },
  {
    id: 3005,
    similarQuestion: {
      question: "What is the phase difference between the input AC signal voltage and output signal voltage in: (i) a Common-Base (CB) amplifier and (ii) a Common-Emitter (CE) amplifier?",
      option_a: "0° in CB and 180° in CE",
      option_b: "180° in CB and 0° in CE",
      option_c: "90° in CB and 90° in CE",
      option_d: "0° in CB and 0° in CE",
      correct_option: "A",
      explanation: "In a Common-Base (CB) amplifier, an increase in emitter voltage decreases forward bias, decreasing collector current and resulting in an output voltage that is in phase with the input (phase difference = 0°). In a Common-Emitter (CE) amplifier, an increase in base voltage increases collector current, which drops the collector potential, introducing a 180° (π radians) phase inversion. Therefore, Option (A) is the correct answer."
    }
  },
  {
    id: 3006,
    similarQuestion: {
      question: "If two inputs A and B are inverted by NOT gates and then fed into a two-input NAND gate, the overall Boolean output Y = (A' · B')' is equivalent to which logic gate?",
      option_a: "AND gate",
      option_b: "OR gate",
      option_c: "NOR gate",
      option_d: "XOR gate",
      correct_option: "B",
      explanation: "Applying De Morgan's theorem to the expression: Y = (A' · B')' = (A')' + (B')' = A + B. This is precisely the logic function of a standard 2-input OR gate. Therefore, Option (B) is the correct answer."
    }
  },
  {
    id: 3007,
    similarQuestion: {
      question: "A two-input logic gate produces a HIGH output (Y = 1) when both inputs are identical (A = B = 0 or A = B = 1), and a LOW output (Y = 0) when the inputs are distinct. This truth table defines an:",
      option_a: "XOR gate",
      option_b: "XNOR gate (Equivalence gate)",
      option_c: "NAND gate",
      option_d: "NOR gate",
      correct_option: "B",
      explanation: "An Exclusive-NOR (XNOR) gate has the Boolean expression Y = A ⊙ B = A·B + A'·B'. Its truth table gives Y = 1 for inputs (0,0) and (1,1), and Y = 0 for inputs (0,1) and (1,0). It acts as an equality/coincidence detector. Therefore, Option (B) is the correct answer."
    }
  },
  {
    id: 3008,
    similarQuestion: {
      question: "What is the minimum number of two-input universal NAND gates required to construct a standard two-input AND gate?",
      option_a: "1",
      option_b: "2",
      option_c: "3",
      option_d: "4",
      correct_option: "B",
      explanation: "An AND gate has the function Y = A · B. A first NAND gate produces (A · B)'. A second NAND gate configured as an inverter (both inputs tied together) inverts this output to ((A · B)')' = A · B. Thus, exactly 2 NAND gates are required. Therefore, Option (B) is the correct answer."
    }
  },
  {
    id: 3009,
    similarQuestion: {
      question: "For the Boolean logic expression (A + B)' = 1, what must be the values of input variables A and B?",
      option_a: "A = 0, B = 0",
      option_b: "A = 0, B = 1",
      option_c: "A = 1, B = 0",
      option_d: "A = 1, B = 1",
      correct_option: "A",
      explanation: "The NOR output (A + B)' equals 1 only when A + B = 0. In binary logic, the OR sum of two binary variables is 0 if and only if both variables are simultaneously 0: A = 0 and B = 0. Therefore, Option (A) is the correct answer."
    }
  },
  {
    id: 3010,
    similarQuestion: {
      question: "A silicon crystal with an atomic density of 5.0 × 10²⁸ atoms/m³ is doped with boron at a ratio of one boron atom for every 10⁶ silicon atoms. What is the concentration of acceptor atoms per cubic centimetre (cm⁻³)?",
      option_a: "5.0 × 10¹⁶ cm⁻³",
      option_b: "5.0 × 10²² cm⁻³",
      option_c: "5.0 × 10¹⁴ cm⁻³",
      option_d: "2.5 × 10¹⁸ cm⁻³",
      correct_option: "A",
      explanation: "The concentration of acceptor atoms per cubic metre is: N_A = (5.0 × 10²⁸ atoms/m³) / 10⁶ = 5.0 × 10²² atoms/m³. Converting to cm⁻³ (since 1 m³ = 10⁶ cm³): N_A = 5.0 × 10²² / 10⁶ = 5.0 × 10¹⁶ atoms/cm³. Therefore, Option (A) is the correct answer."
    }
  },
  {
    id: 3011,
    similarQuestion: {
      question: "A silicon p-n junction diode with a forward voltage drop of 0.7 V is connected in series with a 1.5 kΩ current-limiting resistor across a 5.2 V DC source in forward bias. What is the current flowing in the circuit?",
      option_a: "2.0 mA",
      option_b: "3.0 mA",
      option_c: "3.5 mA",
      option_d: "4.5 mA",
      correct_option: "B",
      explanation: "Applying Kirchhoff's voltage law to the series loop: V_supply - V_diode - I R = 0 ⇒ 5.2 V - 0.7 V = I × 1500 Ω ⇒ 4.5 V = I × 1500 Ω ⇒ I = 4.5 / 1500 = 3.0 × 10⁻³ A = 3.0 mA. Therefore, Option (B) is the correct answer."
    }
  },
  {
    id: 3012,
    similarQuestion: {
      question: "In a p-type semiconductor, an acceptor energy level lies 62 meV (0.062 eV) above the top of the valence band. What is the maximum wavelength of electromagnetic radiation capable of ionizing an acceptor atom to create a hole? (Take h c ≈ 12400 eV·Å)",
      option_a: "2.0 × 10⁵ Å",
      option_b: "1.5 × 10⁴ Å",
      option_c: "6.2 × 10³ Å",
      option_d: "2.0 × 10⁶ Å",
      correct_option: "A",
      explanation: "The minimum energy required to excite an electron from the valence band to the acceptor level is ΔE = 0.062 eV. The maximum threshold wavelength is given by λ_max = h c / ΔE. Substituting h c = 12400 eV·Å: λ_max = 12400 / 0.062 = 200,000 Å = 2.0 × 10⁵ Å. Therefore, Option (A) is the correct answer."
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
  console.log(`Set 64 Part 1 Complete: ${success}/${questions.length} updated successfully.`);
}

main().catch(console.error);
