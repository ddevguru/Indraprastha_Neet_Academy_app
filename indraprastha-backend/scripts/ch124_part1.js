// Chapter 124: Semiconductor Electronics - Part 1 (Q0 to Q37, IDs 1291 down to 1254)
module.exports = [
  {
    id: 1291,
    question: "An n-p-n transistor conducts when: [AIPMT 2003]",
    option_a: "Both collector and emitter are positive with respect to the base",
    option_b: "Collector is positive and emitter is negative with respect to the base",
    option_c: "Collector is positive and emitter is at the same potential as the base",
    option_d: "Both collector and emitter are negative with respect to the base",
    correct_option: "B",
    explanation: "For an n-p-n transistor to conduct normally in active mode:\n1. The emitter-base junction must be forward biased. Since the emitter is n-type and the base is p-type, the emitter must be at a lower (negative) potential relative to the base.\n2. The collector-base junction must be reverse biased. Since the collector is n-type, it must be at a higher (positive) potential relative to the base.\n3. Under these bias conditions, electrons are injected from the emitter into the base and efficiently swept across into the collector, establishing normal transistor conduction.\nTherefore, the collector is positive and the emitter is negative with respect to the base.\nTherefore, Option (B) is the correct answer.",
    similarQuestion: {
      question: "In order for a p-n-p transistor to operate in the active amplification region, what should be the biasing condition?",
      option_a: "Emitter positive and collector negative with respect to the base",
      option_b: "Emitter negative and collector positive with respect to the base",
      option_c: "Both emitter and collector positive with respect to the base",
      option_d: "Both emitter and collector negative with respect to the base",
      correct_option: "A",
      explanation: "For a p-n-p transistor in active mode, the p-type emitter must be forward biased (positive relative to the n-type base), and the p-type collector must be reverse biased (negative relative to the n-type base).\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 1290,
    question: "Base current changes from 100 μA to 150 μA, collector current changes from 5 mA to 10 mA. Current gain β is: [AIPMT 2006]",
    option_a: "50",
    option_b: "67",
    option_c: "75",
    option_d: "100",
    correct_option: "D",
    explanation: "The common emitter small-signal AC current gain (β) is given by the ratio of change in collector current to change in base current at constant collector-emitter voltage:\nβ = ΔI_C / ΔI_B\n1. Change in base current:\nΔI_B = 150 μA - 100 μA = 50 μA = 50 × 10⁻⁶ A = 0.05 mA\n2. Change in collector current:\nΔI_C = 10 mA - 5 mA = 5 mA = 5 × 10⁻³ A\n3. Calculate β:\nβ = 5 mA / 0.05 mA = 5000 μA / 50 μA = 100.\nTherefore, Option (D) is the correct answer.",
    similarQuestion: {
      question: "In a common emitter transistor circuit, the base current changes by 40 μA, resulting in a collector current change of 4 mA. What is the current amplification factor β?",
      option_a: "80",
      option_b: "100",
      option_c: "120",
      option_d: "150",
      correct_option: "B",
      explanation: "Current gain β = ΔI_C / ΔI_B = (4 × 10⁻³ A) / (40 × 10⁻⁶ A) = 4000 / 40 = 100.\nTherefore, Option (B) is the correct answer."
    }
  },
  {
    id: 1289,
    question: "Voltage gain of an amplifier with 9% negative feedback is 10. Voltage gain without feedback will be: [AIPMT 2008]",
    option_a: "1.25",
    option_b: "100",
    option_c: "90",
    option_d: "10",
    correct_option: "B",
    explanation: "The relation between the voltage gain with negative feedback (A_f) and the open-loop voltage gain without feedback (A) is given by:\nA_f = A / (1 + β·A)\nwhere β is the feedback fraction.\n1. Here, A_f = 10 and β = 9% = 9 / 100 = 0.09.\n2. Substituting the values into the formula:\n10 = A / (1 + 0.09·A)\n3. Cross-multiplying:\n10·(1 + 0.09·A) = A\n10 + 0.9·A = A\n10 = A - 0.9·A\n0.1·A = 10\nA = 10 / 0.1 = 100.\nTherefore, the voltage gain without feedback is 100.\nTherefore, Option (B) is the correct answer.",
    similarQuestion: {
      question: "An amplifier has an open-loop voltage gain of 200. If 4% negative feedback is applied, what will be the voltage gain with feedback?",
      option_a: "22.2",
      option_b: "25.0",
      option_c: "50.0",
      option_d: "8.0",
      correct_option: "A",
      explanation: "Voltage gain with feedback A_f = A / (1 + β·A). Here A = 200 and β = 0.04. A_f = 200 / (1 + 0.04 × 200) = 200 / (1 + 8) = 200 / 9 ≈ 22.22.\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 1288,
    question: "Base current changes from 100 μA to 200 μA, collector current changes from 5 mA to 10 mA. Current gain is: [AIPMT 2009]",
    option_a: "100",
    option_b: "150",
    option_c: "50",
    option_d: "75",
    correct_option: "C",
    explanation: "The current amplification factor β in a common emitter configuration is given by:\nβ = ΔI_C / ΔI_B\n1. Change in base current:\nΔI_B = 200 μA - 100 μA = 100 μA = 0.1 mA\n2. Change in collector current:\nΔI_C = 10 mA - 5 mA = 5 mA\n3. Calculate β:\nβ = 5 mA / 0.1 mA = 50.\nTherefore, Option (C) is the correct answer.",
    similarQuestion: {
      question: "When the base current in a transistor changes from 50 μA to 150 μA, the collector current increases from 2 mA to 7 mA. What is the common emitter current gain β?",
      option_a: "25",
      option_b: "50",
      option_c: "75",
      option_d: "100",
      correct_option: "B",
      explanation: "ΔI_B = 150 μA - 50 μA = 100 μA = 0.1 mA. ΔI_C = 7 mA - 2 mA = 5 mA. Current gain β = ΔI_C / ΔI_B = 5 mA / 0.1 mA = 50.\nTherefore, Option (B) is the correct answer."
    }
  },
  {
    id: 1287,
    question: "A common emitter amplifier has a voltage gain of 50, input impedance = 100 Ω, output impedance = 200 Ω. Power gain is: [AIPMT 2010 Prelims]",
    option_a: "500",
    option_b: "1000",
    option_c: "1250",
    option_d: "50",
    correct_option: "C",
    explanation: "Let us calculate the power gain of the common emitter amplifier:\n1. The voltage gain A_v is related to current gain β and impedance ratio by:\nA_v = β × (R_out / R_in)\nGiven A_v = 50, R_in = 100 Ω, R_out = 200 Ω:\n50 = β × (200 / 100) = 2·β ⇒ β = 50 / 2 = 25.\n2. The power gain A_p is the product of voltage gain and current gain:\nA_p = A_v × β\nA_p = 50 × 25 = 1250.\n(Alternatively: A_p = A_v² × (R_in / R_out) = 50² × (100 / 200) = 2500 × 0.5 = 1250).\nTherefore, Option (C) is the correct answer.",
    similarQuestion: {
      question: "A transistor amplifier in CE configuration has a voltage gain of 40, input resistance of 200 Ω, and load resistance of 1000 Ω. What is the power gain of the amplifier?",
      option_a: "320",
      option_b: "160",
      option_c: "480",
      option_d: "640",
      correct_option: "A",
      explanation: "Voltage gain A_v = β × (R_L / R_in) ⇒ 40 = β × (1000 / 200) = 5·β ⇒ β = 8. Power gain A_p = A_v × β = 40 × 8 = 320.\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 1286,
    question: "For transistor action: (1) Base, emitter and collector regions should have similar sizes and doping concentrations. (2) The base region must be very thin and lightly doped. (3) The emitter-base junction is forward biased and the base-collector junction is reverse biased. (4) Both the emitter-base junction as well as the base-collector junction are forward biased. Which pair is correct? [AIPMT 2010 Mains]",
    option_a: "(4) and (1)",
    option_b: "(1) and (2)",
    option_c: "(2) and (3)",
    option_d: "(3) and (4)",
    correct_option: "C",
    explanation: "Let us examine the structural and operating conditions for normal transistor action:\n1. Condition (1) is incorrect: The emitter is heavily doped and moderately sized; the base is very thin and lightly doped; the collector is moderately doped and largest in physical size to dissipate heat.\n2. Condition (2) is correct: The base must be extremely thin (a few micrometres) and lightly doped so that only a small percentage (≈ 1% to 5%) of injected carriers recombine, allowing nearly all carriers to pass through to the collector.\n3. Condition (3) is correct: For normal transistor action (active amplification mode), the emitter-base junction must be forward biased and the base-collector junction must be reverse biased.\n4. Condition (4) is incorrect: Biasing both junctions in forward bias puts the transistor into saturation, not active transistor action.\nTherefore, statements (2) and (3) are the correct pair.\nTherefore, Option (C) is the correct answer.",
    similarQuestion: {
      question: "Which of the following conditions is essential for active mode operation of a bipolar junction transistor?",
      option_a: "Emitter-base junction reverse biased and collector-base junction forward biased",
      option_b: "Emitter-base junction forward biased and collector-base junction reverse biased",
      option_c: "Both junctions reverse biased",
      option_d: "Both junctions forward biased",
      correct_option: "B",
      explanation: "Active mode operation requires the input (emitter-base) junction to be forward biased to inject majority carriers into the base, and the output (collector-base) junction to be reverse biased to collect them efficiently.\nTherefore, Option (B) is the correct answer."
    }
  },
  {
    id: 1285,
    question: "A transistor is operated in CE configuration at VC = 2 V. Base current changes from 100 μA to 300 μA, collector current changes from 10 mA to 20 mA. Current gain is: [AIPMT 2011 Prelims]",
    option_a: "50",
    option_b: "75",
    option_c: "100",
    option_d: "25",
    correct_option: "A",
    explanation: "The current gain β in common emitter configuration at constant collector-emitter voltage is:\nβ = ΔI_C / ΔI_B\n1. Change in base current:\nΔI_B = 300 μA - 100 μA = 200 μA = 0.2 mA\n2. Change in collector current:\nΔI_C = 20 mA - 10 mA = 10 mA\n3. Calculate β:\nβ = 10 mA / 0.2 mA = 10 / 0.2 = 50.\nTherefore, Option (A) is the correct answer.",
    similarQuestion: {
      question: "In a common emitter amplifier, when the base current is increased by 50 μA, the collector current rises by 3.5 mA. The current gain β of the transistor is:",
      option_a: "35",
      option_b: "50",
      option_c: "70",
      option_d: "140",
      correct_option: "C",
      explanation: "β = ΔI_C / ΔI_B = (3.5 × 10⁻³ A) / (50 × 10⁻⁶ A) = 3500 / 50 = 70.\nTherefore, Option (C) is the correct answer."
    }
  },
  {
    id: 1284,
    question: "The transfer characteristics for a base-biased transistor in CE configuration are given. For using the transistor as a switch, it is used: [AIPMT 2012 Prelims]",
    option_a: "In region III",
    option_b: "Both in regions I and III",
    option_c: "In region II",
    option_d: "In region I",
    correct_option: "B",
    explanation: "The transfer characteristic of a base-biased transistor in common emitter configuration consists of three distinct operating regions:\n1. Region I (Cut-off region): The input voltage V_i is lower than the barrier voltage (V_i < 0.6 V for Si). The base current is zero, the transistor is OFF, and output voltage V_o ≈ V_CC.\n2. Region II (Active region): V_o decreases linearly with increasing V_i. This region is used when the transistor operates as an amplifier.\n3. Region III (Saturation region): Both junctions are forward biased, V_o drops to a very small saturation voltage (V_o ≈ 0.2 V), and the transistor is fully ON.\nTo operate as an electronic switch, the transistor toggles between the non-conducting OFF state (Region I, cut-off) and the fully conducting ON state (Region III, saturation).\nTherefore, Option (B) is the correct answer.",
    similarQuestion: {
      question: "When a junction transistor is used as an electronic switch, its two operating states correspond to which regions of its characteristics?",
      option_a: "Active region and cut-off region",
      option_b: "Cut-off region and saturation region",
      option_c: "Active region and saturation region",
      option_d: "Active region only",
      correct_option: "B",
      explanation: "An electronic switch has two operational states: OFF (cut-off region, open switch) and ON (saturation region, closed switch).\nTherefore, Option (B) is the correct answer."
    }
  },
  {
    id: 1283,
    question: "In a CE transistor amplifier, audio signal voltage across collector resistance of 2 kΩ is 2 V. Base resistance = 1 kΩ, current amplification = 100. Input signal voltage is: [AIPMT 2012 Prelims]",
    option_a: "0.1 V",
    option_b: "1.0 V",
    option_c: "1 mV",
    option_d: "10 mV",
    correct_option: "D",
    explanation: "Let us calculate the input signal voltage:\n1. Given data:\nCollector load resistance R_C = 2 kΩ = 2000 Ω\nOutput signal voltage V_o = 2 V\nBase input resistance R_B = 1 kΩ = 1000 Ω\nCurrent amplification factor β = 100\n2. Voltage gain A_v is given by:\nA_v = β × (R_C / R_B) = 100 × (2000 / 1000) = 100 × 2 = 200.\n3. Input signal voltage V_i is related to output voltage by:\nV_i = V_o / A_v\nV_i = 2 V / 200 = 0.01 V = 10 × 10⁻³ V = 10 mV.\nTherefore, Option (D) is the correct answer.",
    similarQuestion: {
      question: "In a common emitter amplifier, the output audio signal voltage across a 5 kΩ collector load is 5 V. If the transistor has current gain β = 50 and base resistance 1 kΩ, what is the input signal voltage?",
      option_a: "10 mV",
      option_b: "20 mV",
      option_c: "50 mV",
      option_d: "5 mV",
      correct_option: "B",
      explanation: "Voltage gain A_v = β × (R_C / R_B) = 50 × (5000 / 1000) = 250. Input voltage V_i = V_o / A_v = 5 V / 250 = 0.02 V = 20 mV.\nTherefore, Option (B) is the correct answer."
    }
  },
  {
    id: 1282,
    question: "The input resistance of a silicon transistor is 100 Ω. Base current change = 40 μA, collector current change = 2 mA. Load resistance = 4 kΩ. Voltage gain is: [AIPMT 2012 Mains]",
    option_a: "2000",
    option_b: "3000",
    option_c: "4000",
    option_d: "1000",
    correct_option: "A",
    explanation: "Let us determine the voltage gain of the amplifier:\n1. Current gain β:\nβ = ΔI_C / ΔI_B = (2 × 10⁻³ A) / (40 × 10⁻⁶ A) = 2000 / 40 = 50.\n2. Resistance gain:\nResistance gain = R_L / R_in = 4 kΩ / 100 Ω = 4000 Ω / 100 Ω = 40.\n3. Voltage gain A_v:\nA_v = Current gain × Resistance gain\nA_v = β × (R_L / R_in) = 50 × 40 = 2000.\nTherefore, Option (A) is the correct answer.",
    similarQuestion: {
      question: "A silicon transistor in CE configuration has an input resistance of 500 Ω and a collector load resistance of 5 kΩ. If a base current change of 20 μA causes a collector current change of 2 mA, what is the voltage gain?",
      option_a: "500",
      option_b: "1000",
      option_c: "2000",
      option_d: "1500",
      correct_option: "B",
      explanation: "β = ΔI_C / ΔI_B = (2 × 10⁻³ A) / (20 × 10⁻⁶ A) = 100. Resistance gain = R_L / R_in = 5000 / 500 = 10. Voltage gain A_v = β × (R_L / R_in) = 100 × 10 = 1000.\nTherefore, Option (B) is the correct answer."
    }
  },
  {
    id: 1281,
    question: "In a common emitter (CE) amplifier having a voltage gain G, the transistor used has transconductance 0.03 mho and current gain 25. If replaced with transconductance 0.02 mho and current gain 20, the voltage gain will be: [NEET 2013]",
    option_a: "(1/3)G",
    option_b: "(5/4)G",
    option_c: "(2/3)G",
    option_d: "1.5G",
    correct_option: "C",
    explanation: "The voltage gain of a common emitter amplifier is related to transconductance g_m and load resistance R_L by the equation:\nVoltage gain = g_m × R_L\n1. In the first case:\nG = g_m1 × R_L = 0.03 × R_L\n2. In the second case, with the same load resistance R_L, the new voltage gain G' is:\nG' = g_m2 × R_L = 0.02 × R_L\n3. Taking the ratio:\nG' / G = (g_m2 × R_L) / (g_m1 × R_L) = 0.02 / 0.03 = 2 / 3\nG' = (2/3)·G.\nTherefore, Option (C) is the correct answer.",
    similarQuestion: {
      question: "The voltage gain of a CE amplifier is G when a transistor with transconductance 0.05 S is used. If the transistor is replaced with another one having transconductance 0.04 S under identical load resistance, what is the new voltage gain?",
      option_a: "0.8 G",
      option_b: "1.25 G",
      option_c: "0.5 G",
      option_d: "0.6 G",
      correct_option: "A",
      explanation: "Voltage gain is directly proportional to transconductance: G' / G = g_m' / g_m = 0.04 / 0.05 = 4/5 = 0.8 G.\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 1280,
    question: "One way in which the operation of an n-p-n transistor differs from that of a p-n-p transistor is: [NEET 2013 Karnataka]",
    option_a: "The emitter junction injects minority carriers into the base region of the p-n-p",
    option_b: "The emitter injects holes into the base of the p-n-p and electrons into the base region of the n-p-n",
    option_c: "The emitter injects holes into the base of the n-p-n",
    option_d: "The emitter junction is reverse biased in the n-p-n",
    correct_option: "B",
    explanation: "Let us understand the carrier injection mechanism in both transistor types:\n1. In a p-n-p transistor, the emitter is composed of p-type semiconductor where holes are the majority carriers. When the emitter-base junction is forward biased, the emitter injects holes into the base region.\n2. In an n-p-n transistor, the emitter is composed of n-type semiconductor where electrons are the majority carriers. Under forward bias, the emitter injects electrons into the base region.\n3. In both types, the injected carriers are the majority carriers of the emitter that become minority carriers once inside the base region.\nTherefore, the emitter injects holes into the base of the p-n-p and electrons into the base region of the n-p-n.\nTherefore, Option (B) is the correct answer.",
    similarQuestion: {
      question: "Why do n-p-n transistors generally have better high-frequency performance than p-n-p transistors?",
      option_a: "Electrons have higher mobility than holes",
      option_b: "Holes move faster in silicon than electrons",
      option_c: "n-p-n transistors do not require biasing",
      option_d: "p-n-p transistors have higher thermal noise",
      correct_option: "A",
      explanation: "In n-p-n transistors, the majority charge carriers participating in conduction are conduction band electrons. Because the mobility of electrons is significantly higher than that of holes in silicon (μ_e ≈ 3 μ_h), n-p-n transistors exhibit shorter transit times and superior high-frequency response.\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 1279,
    question: "The input signal given to a CE amplifier having a voltage gain of 150 is Vi = 2 cos(15t + π/3). The corresponding output signal will be: [AIPMT 2015]",
    option_a: "2 cos(15t + 5π/6)",
    option_b: "300 cos(15t + 4π/3)",
    option_c: "300 cos(15t + π/3)",
    option_d: "75 cos(15t + 2π/3)",
    correct_option: "B",
    explanation: "A common emitter (CE) amplifier has two key operational characteristics:\n1. Amplitude amplification: The output signal amplitude equals the input signal amplitude multiplied by the voltage gain A_v:\nV_o(peak) = A_v × V_i(peak) = 150 × 2 = 300 V.\n2. Phase reversal: A common emitter amplifier inherently introduces a 180° (or π radians) phase difference between the input and output voltages:\nPhase of output = Phase of input + π = (15t + π/3) + π = 15t + 4π/3.\n3. Therefore, the complete expression for the output voltage is:\nV_o = 300 cos(15t + 4π/3).\nTherefore, Option (B) is the correct answer.",
    similarQuestion: {
      question: "An input signal V_i = 4 sin(100t + π/4) is fed to a common emitter amplifier with a voltage gain of 50. What is the output voltage signal?",
      option_a: "200 sin(100t + 5π/4)",
      option_b: "200 sin(100t + π/4)",
      option_c: "12.5 sin(100t + 3π/4)",
      option_d: "50 sin(100t + π/2)",
      correct_option: "A",
      explanation: "Output amplitude = 50 × 4 = 200. The CE amplifier introduces a phase reversal of π radians, so the phase becomes (100t + π/4) + π = 100t + 5π/4. Hence V_o = 200 sin(100t + 5π/4).\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 1278,
    question: "An npn transistor is connected in common emitter configuration. Load resistance RL = 800 Ω, voltage drop = 0.8 V. Current amplification factor = 0.96, input resistance = 192 Ω. Voltage gain and power gain are: [NEET 2016 Phase 1]",
    option_a: "4, 4",
    option_b: "4, 3.69",
    option_c: "4, 3.84",
    option_d: "3.69, 3.84",
    correct_option: "C",
    explanation: "In this question from NEET 2016 Phase 1:\n1. The current amplification factor given is 0.96 (representing the common base current transfer ratio α = 0.96).\n2. Using the standard formula applied in the exam key:\nVoltage gain A_v = α × (R_L / R_in) = 0.96 × (800 / 192) = 0.96 × 4.167 = 4.\n3. Power gain A_p = Voltage gain × Current gain = A_v × α = 4 × 0.96 = 3.84.\n4. Therefore, the voltage gain is 4 and the power gain is 3.84.\nTherefore, Option (C) is the correct answer.",
    similarQuestion: {
      question: "A transistor amplifier has a voltage gain of 5 and a current gain of 0.95. What is the power gain of the amplifier?",
      option_a: "4.75",
      option_b: "5.25",
      option_c: "25.0",
      option_d: "2.38",
      correct_option: "A",
      explanation: "Power gain = Voltage gain × Current gain = 5 × 0.95 = 4.75.\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 1277,
    question: "For a CE transistor amplifier, the audio signal voltage across the collector resistance of 2 kΩ is 4 V. If the current amplification factor of the transistor is 100 and the base resistance is 1 kΩ, then the input signal voltage is: [NEET 2016 Phase 2]",
    option_a: "10 mV",
    option_b: "20 mV",
    option_c: "30 mV",
    option_d: "15 mV",
    correct_option: "B",
    explanation: "Let us calculate the input signal voltage:\n1. Given:\nCollector load resistance R_C = 2 kΩ = 2000 Ω\nOutput signal voltage V_o = 4 V\nBase resistance R_B = 1 kΩ = 1000 Ω\nCurrent gain β = 100\n2. Voltage gain A_v:\nA_v = β × (R_C / R_B) = 100 × (2000 / 1000) = 100 × 2 = 200.\n3. Input signal voltage V_i:\nV_i = V_o / A_v = 4 V / 200 = 0.02 V = 20 mV.\nTherefore, Option (B) is the correct answer.",
    similarQuestion: {
      question: "In a common emitter amplifier circuit, the voltage across a 4 kΩ collector resistance is 8 V. If the transistor current gain β is 100 and the base resistance is 2 kΩ, what is the input signal voltage?",
      option_a: "40 mV",
      option_b: "20 mV",
      option_c: "80 mV",
      option_d: "10 mV",
      correct_option: "A",
      explanation: "Voltage gain A_v = β × (R_C / R_B) = 100 × (4000 / 2000) = 200. Input voltage V_i = V_o / A_v = 8 V / 200 = 0.04 V = 40 mV.\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 1276,
    question: "In a common emitter transistor amplifier, the audio signal voltage across the collector resistance of 3 kΩ is 3 V. If current gain is 100 and base resistance is 2 kΩ, the voltage and power gain are: [NEET 2017]",
    option_a: "15 and 200",
    option_b: "150 and 15000",
    option_c: "20 and 2000",
    option_d: "200 and 1000",
    correct_option: "B",
    explanation: "Let us compute the voltage gain and power gain of the CE amplifier:\n1. Given data:\nCollector resistance R_C = 3 kΩ = 3000 Ω\nBase resistance R_B = 2 kΩ = 2000 Ω\nCurrent gain β = 100\n2. Voltage gain A_v:\nA_v = β × (R_C / R_B) = 100 × (3000 / 2000) = 100 × 1.5 = 150.\n3. Power gain A_p:\nA_p = Voltage gain × Current gain = A_v × β = 150 × 100 = 15000.\nTherefore, the voltage gain is 150 and the power gain is 15000.\nTherefore, Option (B) is the correct answer.",
    similarQuestion: {
      question: "In a CE amplifier, the collector load resistance is 4 kΩ, base input resistance is 1 kΩ, and current gain β is 50. What are the voltage gain and power gain?",
      option_a: "200 and 10000",
      option_b: "100 and 5000",
      option_c: "50 and 2500",
      option_d: "250 and 12500",
      correct_option: "A",
      explanation: "Voltage gain A_v = β × (R_C / R_B) = 50 × (4000 / 1000) = 200. Power gain A_p = A_v × β = 200 × 50 = 10000.\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 1275,
    question: "In the circuit shown in the figure, the input voltage Vi is 20 V, VBE = 0 and VCE = 0. The values of IB, IC and β are given by: [NEET 2018]",
    option_a: "IB = 40 μA, IC = 10 mA, β = 250",
    option_b: "IB = 25 μA, IC = 5 mA, β = 200",
    option_c: "IB = 20 μA, IC = 5 mA, β = 250",
    option_d: "IB = 40 μA, IC = 5 mA, β = 125",
    correct_option: "D",
    explanation: "Let us analyze the common emitter circuit parameters with R_B = 500 kΩ, R_C = 4 kΩ, and V_CC = 20 V:\n1. In the base-emitter input loop:\nV_i = I_B·R_B + V_BE\nGiven V_i = 20 V and V_BE = 0 V:\nI_B = (V_i - V_BE) / R_B = 20 V / (500 × 10³ Ω) = 40 × 10⁻⁶ A = 40 μA.\n2. In the collector-emitter output loop:\nV_CC = I_C·R_C + V_CE\nGiven V_CC = 20 V and V_CE = 0 V:\nI_C = (V_CC - V_CE) / R_C = 20 V / (4 × 10³ Ω) = 5 × 10⁻³ A = 5 mA.\n3. Common emitter current gain β:\nβ = I_C / I_B = (5 × 10⁻³ A) / (40 × 10⁻⁶ A) = 5000 / 40 = 125.\nTherefore, I_B = 40 μA, I_C = 5 mA, and β = 125.\nTherefore, Option (D) is the correct answer.",
    similarQuestion: {
      question: "In a transistor circuit with V_CC = 10 V, V_CE = 0, R_C = 2 kΩ, and input base current I_B = 25 μA, what is the value of collector current I_C and current gain β?",
      option_a: "I_C = 5 mA, β = 200",
      option_b: "I_C = 10 mA, β = 400",
      option_c: "I_C = 2.5 mA, β = 100",
      option_d: "I_C = 5 mA, β = 125",
      correct_option: "A",
      explanation: "I_C = (V_CC - V_CE) / R_C = 10 V / 2000 Ω = 5 mA. β = I_C / I_B = 5 mA / 25 μA = 5000 / 25 = 200.\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 1274,
    question: "For transistor action, which of the following statements is correct? [NEET 2020 Phase 1]",
    option_a: "Base, emitter and collector regions should have the same size",
    option_b: "Both emitter junction as well as the collector junction are forward biased",
    option_c: "The base region must be very thin and lightly doped",
    option_d: "Base, emitter and collector regions should have the same doping concentrations",
    correct_option: "C",
    explanation: "For proper transistor action:\n1. The base region must be made extremely thin (typically a fraction of a micrometre) and very lightly doped.\n2. Light doping and narrow base width ensure that nearly all charge carriers injected by the emitter pass straight across the base into the collector with minimal carrier recombination in the base (< 2% to 5%).\n3. The emitter is heavily doped to inject a large number of carriers, and the collector is moderately doped and physically largest to dissipate heat.\nTherefore, Option (C) is the correct answer.",
    similarQuestion: {
      question: "Why is the base region of a bipolar junction transistor made very thin and lightly doped?",
      option_a: "To maximize electron-hole recombination in the base",
      option_b: "To minimize charge carrier recombination and allow most carriers to reach the collector",
      option_c: "To increase base resistance to infinity",
      option_d: "To prevent collector current from flowing",
      correct_option: "B",
      explanation: "A thin and lightly doped base region minimizes the probability of electron-hole recombination, ensuring that over 95% to 99% of injected carriers diffuse across the base and are collected by the collector.\nTherefore, Option (B) is the correct answer."
    }
  },
  {
    id: 1273,
    question: "The collector current in a common base amplifier using an n-p-n transistor is 24 mA. If 80% of the electrons released by the emitter are accepted by the collector, then the base current is numerically: [NEET 2022 Phase 2]",
    option_a: "3 mA and entering the base",
    option_b: "6 mA and leaving the base",
    option_c: "3 mA and leaving the base",
    option_d: "6 mA and entering the base",
    correct_option: "D",
    explanation: "Let us calculate the currents in the n-p-n transistor:\n1. Given collector current I_C = 24 mA.\n2. 80% of the emitted electrons reach the collector, which means:\nI_C = 0.80 × I_E\nI_E = I_C / 0.80 = 24 mA / 0.80 = 30 mA.\n3. Base current is the difference between emitter and collector currents:\nI_B = I_E - I_C = 30 mA - 24 mA = 6 mA.\n4. Current direction: In an n-p-n transistor, conventional current leaves the emitter terminal (I_E flows outward), while both collector current (I_C) and base current (I_B) enter into the transistor terminals (I_E = I_B + I_C). Hence, the base current is 6 mA and enters the base.\nTherefore, Option (D) is the correct answer.",
    similarQuestion: {
      question: "In an n-p-n transistor, the emitter current is 50 mA. If 90% of the emitted electrons reach the collector, what is the base current?",
      option_a: "5 mA",
      option_b: "10 mA",
      option_c: "45 mA",
      option_d: "2.5 mA",
      correct_option: "A",
      explanation: "I_C = 0.90 × I_E = 0.90 × 50 mA = 45 mA. Base current I_B = I_E - I_C = 50 mA - 45 mA = 5 mA.\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 1272,
    question: "The above figure shows the circuit symbol of a transistor. Select the correct statements: (A) The transistor has two segments of p-type semiconductor separated by a segment of n-type semiconductor (B) The emitter is of moderate size and heavily doped (C) The central segment is thin and lightly doped (D) The emitter-base junction is reverse biased in a common emitter amplifier circuit Options: [NEET 2023 Manipur]",
    option_a: "(C) and (D)",
    option_b: "(A) and (D)",
    option_c: "(A) and (B)",
    option_d: "(B) and (C)",
    correct_option: "D",
    explanation: "Let us evaluate each statement according to semiconductor physics:\n1. Statement (B) is correct: In any bipolar junction transistor, the emitter region is of moderate physical size and heavily doped to supply a large density of majority carriers.\n2. Statement (C) is correct: The central segment (the base) is made extremely thin and lightly doped to reduce recombination.\n3. Statement (D) is incorrect: In an amplifier circuit, the emitter-base junction must be forward biased, not reverse biased.\n4. Therefore, statements (B) and (C) are the correct statements.\nTherefore, Option (D) is the correct answer.",
    similarQuestion: {
      question: "Which segment of a bipolar junction transistor has the largest physical size?",
      option_a: "Emitter",
      option_b: "Base",
      option_c: "Collector",
      option_d: "All three have identical sizes",
      correct_option: "C",
      explanation: "The collector is physically the largest region among the three segments to facilitate the dissipation of heat generated by the collection of energetic charge carriers.\nTherefore, Option (C) is the correct answer."
    }
  },
  {
    id: 1271,
    question: "From the following diode circuit, which diode is in forward biased condition? [AIPMT 2000]",
    option_a: "0 V to -2 V",
    option_b: "-5 V to 2 V",
    option_c: "5 V to 12 V",
    option_d: "-3 V to -5 V",
    correct_option: "A",
    explanation: "A p-n junction diode is forward biased when the potential at the p-side (anode, V_p) is higher than the potential at the n-side (cathode, V_n), i.e., V_p > V_n:\n1. Option A: V_p = 0 V and V_n = -2 V. Potential difference V_p - V_n = 0 - (-2) = +2 V > 0. The diode is forward biased.\n2. Option B: V_p = -5 V and V_n = +2 V. V_p - V_n = -5 - 2 = -7 V < 0 (reverse biased).\n3. Option C: V_p = +5 V and V_n = +12 V. V_p - V_n = 5 - 12 = -7 V < 0 (reverse biased).\n4. Therefore, the diode in Option A is in forward biased condition.\nTherefore, Option (A) is the correct answer.",
    similarQuestion: {
      question: "In which of the following cases is a p-n junction diode forward biased?",
      option_a: "p-side at -3 V and n-side at -1 V",
      option_b: "p-side at +2 V and n-side at -2 V",
      option_c: "p-side at -5 V and n-side at 0 V",
      option_d: "p-side at +1 V and n-side at +4 V",
      correct_option: "B",
      explanation: "Forward bias requires V_p > V_n. In option B, V_p = +2 V is greater than V_n = -2 V (V_p - V_n = +4 V), so the diode is forward biased.\nTherefore, Option (B) is the correct answer."
    }
  },
  {
    id: 1270,
    question: "The cations and anions are arranged in alternate form in: [AIPMT 2000]",
    option_a: "Metallic crystal",
    option_b: "Ionic crystal",
    option_c: "Covalent crystal",
    option_d: "Semiconductor crystal",
    correct_option: "B",
    explanation: "In solid state physics and chemistry:\n1. An ionic crystal (such as NaCl, CsCl, or MgO) is composed of positively charged cations and negatively charged anions held together by strong electrostatic coulombic forces.\n2. To maximize attractive electrostatic interactions and minimize repulsive forces, cations and anions arrange themselves in an alternating, periodic three-dimensional lattice where each cation is surrounded by anions and vice versa.\n3. In metallic crystals, positive metal ions reside in a sea of delocalized electrons; in covalent crystals, neutral atoms share electron pairs.\nTherefore, cations and anions are arranged in alternate form in ionic crystals.\nTherefore, Option (B) is the correct answer.",
    similarQuestion: {
      question: "Which type of crystal lattice is formed by electrostatic attraction between alternating positive and negative ions?",
      option_a: "Covalent crystal",
      option_b: "Ionic crystal",
      option_c: "Molecular crystal",
      option_d: "Metallic crystal",
      correct_option: "B",
      explanation: "Ionic crystals are built from three-dimensional alternating arrays of cations and anions bound by non-directional coulombic electrostatic forces.\nTherefore, Option (B) is the correct answer."
    }
  },
  {
    id: 1269,
    question: "The current in the circuit will be: [AIPMT 2001]",
    option_a: "5/40 A",
    option_b: "5/50 A",
    option_c: "5/10 A",
    option_d: "5/20 A",
    correct_option: "B",
    explanation: "Let us analyze the given diode circuit:\n1. An ideal p-n junction diode is connected in series with resistors totaling 50 Ω (for example, 20 Ω and 30 Ω in series) across a 5 V DC supply.\n2. The battery polarity connects the positive terminal to the p-side and the negative terminal to the n-side, placing the ideal diode in forward bias.\n3. An ideal forward-biased diode exhibits zero forward resistance (short circuit: R_diode = 0).\n4. The total circuit resistance is R_total = 50 Ω.\n5. By Ohm's law, the circuit current is:\nI = V / R_total = 5 / 50 A = 0.1 A.\nTherefore, Option (B) is the correct answer.",
    similarQuestion: {
      question: "An ideal diode is connected in series with a 100 Ω resistor across a 10 V battery in forward bias. What is the current flowing in the circuit?",
      option_a: "0.1 A",
      option_b: "0.2 A",
      option_c: "0.05 A",
      option_d: "Zero",
      correct_option: "A",
      explanation: "An ideal diode in forward bias acts as a closed switch with zero resistance. Current I = V / R = 10 V / 100 Ω = 0.1 A.\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 1268,
    question: "The given truth table is for which logic gate?  [AIPMT 2001]",
    option_a: "NAND",
    option_b: "XOR",
    option_c: "NOR",
    option_d: "OR",
    correct_option: "C",
    explanation: "The truth table shown has inputs A and B and output Y:\nA = 0, B = 0 → Y = 1\nA = 0, B = 1 → Y = 0\nA = 1, B = 0 → Y = 0\nA = 1, B = 1 → Y = 0\n1. For an OR gate, output is 0 only when both inputs are 0, and 1 otherwise (0, 1, 1, 1).\n2. The output in this table is the exact logical inversion of the OR gate output:\nY = (A + B)̅\n3. This Boolean operation corresponds to the NOR gate.\nTherefore, Option (C) is the correct answer.",
    similarQuestion: {
      question: "Which logic gate produces an output of 1 only when all of its inputs are 0?",
      option_a: "AND gate",
      option_b: "NAND gate",
      option_c: "NOR gate",
      option_d: "XOR gate",
      correct_option: "C",
      explanation: "The NOR gate gives output Y = (A + B)̅. When both A = 0 and B = 0, Y = (0 + 0)̅ = 1. For any other input combination, the output is 0.\nTherefore, Option (C) is the correct answer."
    }
  },
  {
    id: 1267,
    question: "For the given circuit of a p-n junction diode, which is correct? [AIPMT 2002]",
    option_a: "In forward bias, the voltage across R is V",
    option_b: "In reverse bias, the voltage across R is V",
    option_c: "In forward bias, the voltage across R is 2V",
    option_d: "In reverse bias, the voltage across R is 2V",
    correct_option: "A",
    explanation: "Consider an ideal p-n junction diode connected in series with a resistor R across a source voltage V:\n1. In forward bias, the ideal diode has zero internal resistance and acts as a short circuit (zero voltage drop across the diode).\n2. Consequently, the entire source voltage V appears across the load resistor R: V_R = V.\n3. In reverse bias, the ideal diode has infinite resistance and acts as an open circuit (zero current flows, so V_R = 0).\nTherefore, in forward bias, the voltage across R is V.\nTherefore, Option (A) is the correct answer.",
    similarQuestion: {
      question: "What is the voltage drop across an ideal p-n junction diode when it is operated in the forward biased state?",
      option_a: "Equal to source voltage",
      option_b: "Zero",
      option_c: "Infinite",
      option_d: "Negative",
      correct_option: "B",
      explanation: "An ideal diode in forward bias conducts current with zero internal barrier resistance, producing zero voltage drop across itself.\nTherefore, Option (B) is the correct answer."
    }
  },
  {
    id: 1266,
    question: "The given truth table is for which logic gate?  [AIPMT 2002]",
    option_a: "NAND",
    option_b: "XOR",
    option_c: "NOR",
    option_d: "OR",
    correct_option: "C",
    explanation: "Let us inspect the truth table:\nInput A = 0, Input B = 0 → Output Y = 1\nInput A = 0, Input B = 1 → Output Y = 0\nInput A = 1, Input B = 0 → Output Y = 0\nInput A = 1, Input B = 1 → Output Y = 0\n1. The output is HIGH (1) if and only if both inputs are LOW (0).\n2. If either input is HIGH (1), the output is LOW (0).\n3. This Boolean function is Y = (A + B)̅, which defines the NOR gate.\nTherefore, Option (C) is the correct answer.",
    similarQuestion: {
      question: "What is the output of a two-input NOR gate when inputs are A = 1 and B = 0?",
      option_a: "1",
      option_b: "0",
      option_c: "High impedance",
      option_d: "Undefined",
      correct_option: "B",
      explanation: "For a NOR gate, Y = (A + B)̅. With A = 1 and B = 0, Y = (1 + 0)̅ = (1)̅ = 0.\nTherefore, Option (B) is the correct answer."
    }
  },
  {
    id: 1265,
    question: "In a p-n junction: [AIPMT 2002]",
    option_a: "High potential at n-side and low potential at p-side",
    option_b: "High potential at p-side and low potential at n-side",
    option_c: "p and n both are at the same potential",
    option_d: "Undetermined",
    correct_option: "A",
    explanation: "At an unbiased p-n junction:\n1. Electrons diffuse from the n-region into the p-region, leaving behind uncompensated, immobile positive donor ions (N_D⁺) near the junction on the n-side.\n2. Holes diffuse from the p-region into the n-region, leaving behind uncompensated, immobile negative acceptor ions (N_A⁻) near the junction on the p-side.\n3. This spatial separation of fixed ions creates a space charge (depletion) region and sets up a built-in electric field pointing from the positive n-side to the negative p-side.\n4. Consequently, the electric potential on the n-side is higher than that on the p-side, forming a barrier potential that opposes further diffusion of majority carriers.\nTherefore, Option (A) is the correct answer.",
    similarQuestion: {
      question: "What is the direction of the built-in electric field across the depletion layer of a p-n junction diode?",
      option_a: "From p-side to n-side",
      option_b: "From n-side to p-side",
      option_c: "Parallel to the junction plane",
      option_d: "Alternating with time",
      correct_option: "B",
      explanation: "The depletion layer contains positive ionized donor cores on the n-side and negative ionized acceptor cores on the p-side. The resulting internal electric field points from the positive n-region toward the negative p-region.\nTherefore, Option (B) is the correct answer."
    }
  },
  {
    id: 1264,
    question: "Number of atoms per unit cell in BCC is: [AIPMT 2002]",
    option_a: "9",
    option_b: "4",
    option_c: "2",
    option_d: "1",
    correct_option: "C",
    explanation: "For a body-centred cubic (BCC) unit cell:\n1. Corner atoms: There are 8 atoms located at the 8 corners of the cube. Each corner atom is shared equally among 8 adjacent unit cells, contributing:\n8 × (1/8) = 1 atom.\n2. Body-centre atom: There is 1 complete atom located at the exact centre of the cube, completely enclosed within the unit cell and not shared:\n1 × 1 = 1 atom.\n3. Total number of effective atoms per unit cell:\nZ = 1 (from corners) + 1 (from centre) = 2 atoms.\nTherefore, Option (C) is the correct answer.",
    similarQuestion: {
      question: "What is the number of effective atoms per unit cell in a face-centred cubic (FCC) crystal structure?",
      option_a: "1",
      option_b: "2",
      option_c: "4",
      option_d: "6",
      correct_option: "C",
      explanation: "In FCC: 8 corners × (1/8) = 1 atom, plus 6 face centres × (1/2) = 3 atoms. Total = 1 + 3 = 4 atoms per unit cell.\nTherefore, Option (C) is the correct answer."
    }
  },
  {
    id: 1263,
    question: "The barrier potential of a p-n junction diode does not depend on: [AIPMT 2003]",
    option_a: "Diode design",
    option_b: "Temperature",
    option_c: "Forward bias",
    option_d: "Doping density",
    correct_option: "A",
    explanation: "The built-in barrier potential (V_bi) of a p-n junction diode is given by semiconductor physics as:\nV_bi = (k_B·T / q) · ln(N_A·N_D / n_i²)\n1. It depends on the semiconductor material because the intrinsic carrier concentration n_i depends on the bandgap E_g.\n2. It depends on temperature T directly and through n_i(T).\n3. It depends on the doping density of acceptor atoms (N_A) and donor atoms (N_D).\n4. When external bias is applied, the effective barrier height is modified directly.\n5. It is independent of diode design (the physical geometric shape, cross-sectional area, or encapsulation packaging of the diode).\nTherefore, Option (A) is the correct answer.",
    similarQuestion: {
      question: "Which of the following factors does NOT affect the built-in potential barrier of an unbiased p-n junction?",
      option_a: "Nature of the semiconductor material",
      option_b: "Doping concentration of p and n regions",
      option_c: "Cross-sectional area of the junction",
      option_d: "Temperature of the junction",
      correct_option: "C",
      explanation: "Built-in potential is an intensive physical property governed by doping concentrations, temperature, and material bandgap. It does not depend on the cross-sectional area of the junction.\nTherefore, Option (C) is the correct answer."
    }
  },
  {
    id: 1262,
    question: "If a full-wave rectifier circuit is operating from 50 Hz mains, the fundamental frequency in the ripple will be: [AIPMT 2003]",
    option_a: "25 Hz",
    option_b: "50 Hz",
    option_c: "70.7 Hz",
    option_d: "100 Hz",
    correct_option: "D",
    explanation: "Let us compare half-wave and full-wave rectification:\n1. In a half-wave rectifier, only one half of each input AC cycle is conducted, so the output pulses repeat at the same frequency as the input AC mains: f_ripple = f_in = 50 Hz.\n2. In a full-wave rectifier, both positive and negative half-cycles of the AC input are rectified into unidirectional pulses in the same direction.\n3. Thus, for each single input cycle of time period T, two output pulses appear (period of ripple = T / 2).\n4. Fundamental ripple frequency:\nf_ripple = 2 × f_in = 2 × 50 Hz = 100 Hz.\nTherefore, Option (D) is the correct answer.",
    similarQuestion: {
      question: "A half-wave rectifier is fed from a 60 Hz AC power line. What is the fundamental ripple frequency of the output voltage?",
      option_a: "30 Hz",
      option_b: "60 Hz",
      option_c: "120 Hz",
      option_d: "0 Hz",
      correct_option: "B",
      explanation: "For a half-wave rectifier, the output repeats once per input AC cycle, so the fundamental ripple frequency is identical to the input AC line frequency: f_ripple = f_in = 60 Hz.\nTherefore, Option (B) is the correct answer."
    }
  },
  {
    id: 1261,
    question: "Reverse bias applied to a junction diode: [AIPMT 2003]",
    option_a: "Lowers the potential barrier",
    option_b: "Raises the potential barrier",
    option_c: "Increases the majority carrier current",
    option_d: "Increases the minority carrier current",
    correct_option: "B",
    explanation: "When a reverse bias is applied to a p-n junction diode:\n1. The positive terminal of the battery is connected to the n-region and the negative terminal to the p-region.\n2. The applied external electric field is in the same direction as the built-in electric field across the depletion region.\n3. This increases the total potential barrier across the junction from V_bi to (V_bi + V_R), widening the depletion layer and further impeding the diffusion of majority carriers.\n4. Therefore, reverse bias raises the potential barrier.\nTherefore, Option (B) is the correct answer.",
    similarQuestion: {
      question: "What happens to the width of the depletion layer and the potential barrier when a forward bias is applied to a p-n junction?",
      option_a: "Depletion layer widens and barrier height increases",
      option_b: "Depletion layer narrows and barrier height decreases",
      option_c: "Depletion layer widens and barrier height decreases",
      option_d: "Depletion layer narrows and barrier height increases",
      correct_option: "B",
      explanation: "Forward bias opposes the built-in electric field, reducing the net potential barrier to (V_bi - V_F) and narrowing the depletion layer.\nTherefore, Option (B) is the correct answer."
    }
  },
  {
    id: 1260,
    question: "Of the diodes shown in the following diagrams, which one is reverse biased? [AIPMT 2004]",
    option_a: "-12 V to -5 V",
    option_b: "Grounded to grounded",
    option_c: "+5 V to +10 V",
    option_d: "-10 V to grounded",
    correct_option: "C",
    explanation: "A diode is reverse biased when the anode (p-side) potential V_p is strictly less than the cathode (n-side) potential V_n, i.e., V_p < V_n:\n1. Option A: V_p = -5 V and V_n = -12 V ⇒ V_p - V_n = -5 - (-12) = +7 V > 0 (forward biased).\n2. Option C: V_p = +5 V and V_n = +10 V. Here V_p < V_n (V_p - V_n = 5 - 10 = -5 V < 0). The diode is reverse biased.\n3. Option D: If p is grounded (0 V) and n is at -10 V, V_p > V_n (forward biased).\nTherefore, the diode in Option C is reverse biased.\nTherefore, Option (C) is the correct answer.",
    similarQuestion: {
      question: "Which of the following terminal voltage pairs places a p-n junction diode in reverse bias?",
      option_a: "p-side at +4 V, n-side at +1 V",
      option_b: "p-side at -2 V, n-side at -6 V",
      option_c: "p-side at -3 V, n-side at +3 V",
      option_d: "p-side at 0 V, n-side at -5 V",
      correct_option: "C",
      explanation: "In option C, V_p = -3 V and V_n = +3 V. Because V_p < V_n (V_p - V_n = -6 V), the p-n junction is reverse biased.\nTherefore, Option (C) is the correct answer."
    }
  },
  {
    id: 1259,
    question: "The output of an OR gate is 1: [AIPMT 2004]",
    option_a: "If both inputs are zero",
    option_b: "If either or both inputs are 1",
    option_c: "Only if both inputs are 1",
    option_d: "If either input is zero",
    correct_option: "B",
    explanation: "The Boolean logic equation for an OR gate with inputs A and B is:\nY = A + B\nLet us evaluate the truth table:\n- When A = 0, B = 0 → Y = 0\n- When A = 0, B = 1 → Y = 1\n- When A = 1, B = 0 → Y = 1\n- When A = 1, B = 1 → Y = 1\nThus, the output Y is 1 whenever either input A is 1, input B is 1, or both inputs are 1.\nTherefore, Option (B) is the correct answer.",
    similarQuestion: {
      question: "Under what input condition is the output of a two-input AND gate equal to 1?",
      option_a: "Only when both inputs are 1",
      option_b: "If either input is 1",
      option_c: "Only when both inputs are 0",
      option_d: "When one input is 1 and the other is 0",
      correct_option: "A",
      explanation: "For an AND gate, Y = A · B. The output is HIGH (1) if and only if both input A and input B are simultaneously HIGH (1).\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 1258,
    question: "The peak voltage in the output of a half-wave diode rectifier fed with a sinusoidal signal without a filter is 10 V. The DC component of the output voltage is: [AIPMT 2004]",
    option_a: "(10/√2) V",
    option_b: "(10/π) V",
    option_c: "10 V",
    option_d: "(20/π) V",
    correct_option: "B",
    explanation: "For a half-wave rectifier without a filter, the output voltage waveform conducts only during one half-cycle:\n1. The DC component of the output voltage is its average value over a complete cycle of period T = 2π:\nV_dc = (1 / 2π) ∫[0 to π] V_m·sin(ωt) d(ωt)\nV_dc = (V_m / 2π) [-cos(ωt)][0 to π] = (V_m / 2π) [1 - (-1)] = 2·V_m / 2π = V_m / π.\n2. Given the peak voltage V_m = 10 V:\nV_dc = 10 / π V.\n(For comparison, a full-wave rectifier yields V_dc = 2·V_m / π).\nTherefore, Option (B) is the correct answer.",
    similarQuestion: {
      question: "What is the average DC output voltage of a full-wave rectifier if the peak sinusoidal output voltage across the load is 20 V?",
      option_a: "(20/π) V",
      option_b: "(40/π) V",
      option_c: "(10/π) V",
      option_d: "20 V",
      correct_option: "B",
      explanation: "For a full-wave rectifier, V_dc = 2·V_m / π. With V_m = 20 V, V_dc = 2 × 20 / π = 40 / π V.\nTherefore, Option (B) is the correct answer."
    }
  },
  {
    id: 1257,
    question: "In semiconductors at room temperature: [AIPMT 2004]",
    option_a: "The valence band is partially empty and the conduction band is partially filled",
    option_b: "The valence band is completely filled and the conduction band is partially filled",
    option_c: "The valence band is completely filled",
    option_d: "The conduction band is completely empty",
    correct_option: "A",
    explanation: "Let us examine the energy band occupancy in semiconductors:\n1. At absolute zero (T = 0 K), all valence electrons occupy the lowest available energy states, so the valence band is completely filled and the conduction band is completely empty (semiconductor behaves as an insulator).\n2. At room temperature (T > 0 K), thermal energy (k_B·T ≈ 0.026 eV) is sufficient to excite a small fraction of valence electrons across the bandgap (E_g ≈ 1.1 eV for Si) into the conduction band.\n3. Consequently, electrons in the conduction band leave behind vacant energy states (holes) in the valence band.\n4. Therefore, at room temperature, the valence band is partially empty and the conduction band is partially filled.\nTherefore, Option (A) is the correct answer.",
    similarQuestion: {
      question: "At 0 K temperature, an intrinsic semiconductor acts as a/an:",
      option_a: "Superconductor",
      option_b: "Perfect conductor",
      option_c: "Perfect insulator",
      option_d: "p-type semiconductor",
      correct_option: "C",
      explanation: "At 0 K, thermal excitation is absent; the conduction band has zero electrons and the valence band is completely full. With no charge carriers available, it acts as a perfect insulator.\nTherefore, Option (C) is the correct answer."
    }
  },
  {
    id: 1256,
    question: "In a p-n junction photocell, the value of the photo-electromotive force produced by monochromatic light is proportional to: [AIPMT 2005]",
    option_a: "The barrier voltage at the p-n junction",
    option_b: "The intensity of the light falling on the cell",
    option_c: "The frequency of the light falling on the cell",
    option_d: "The voltage applied at the p-n junction",
    correct_option: "B",
    explanation: "In a photocell (photovoltaic cell / solar cell):\n1. Monochromatic light with photon energy hν > E_g strikes the p-n junction, generating electron-hole pairs in and around the depletion region.\n2. The number of electron-hole pairs generated per second is directly proportional to the photon flux (number of incident photons per second), which is defined as the light intensity.\n3. The built-in electric field sweeps electrons to the n-side and holes to the p-side, setting up a photo-electromotive force (open-circuit voltage).\n4. Under low to moderate illumination, the generated photocurrent and resultant photo-emf are directly proportional to the intensity of the incident light.\nTherefore, Option (B) is the correct answer.",
    similarQuestion: {
      question: "In a photovoltaic solar cell, the short-circuit current (I_sc) produced under illumination is directly proportional to:",
      option_a: "Wavelength of incident light only",
      option_b: "Intensity of incident light",
      option_c: "Load resistance",
      option_d: "Thickness of glass cover",
      correct_option: "B",
      explanation: "Short-circuit current is directly proportional to the rate of photogeneration of electron-hole pairs, which varies linearly with the intensity of incident solar radiation.\nTherefore, Option (B) is the correct answer."
    }
  },
  {
    id: 1255,
    question: "Copper has a face-centred cubic (fcc) lattice with interatomic spacing equal to 2.54 Å. The value of the lattice constant for this lattice is: [AIPMT 2005]",
    option_a: "2.54 Å",
    option_b: "3.59 Å",
    option_c: "1.27 Å",
    option_d: "5.08 Å",
    correct_option: "B",
    explanation: "In a face-centred cubic (FCC) crystal lattice:\n1. The atoms touch along the face diagonal of the cubic unit cell. The length of the face diagonal is:\nFace diagonal = √2·a\nwhere 'a' is the lattice constant (edge length of the unit cell).\n2. Along the face diagonal, there are two atomic radii at the corners plus one full atomic diameter at the face centre:\n√2·a = 4·r = 2·(2r) = 2·d\nwhere d = 2r is the nearest neighbour interatomic spacing (distance between centres of two touching atoms).\n3. Solving for the lattice constant 'a':\na = (2·d) / √2 = √2·d\n4. Given d = 2.54 Å and √2 ≈ 1.414:\na = 1.414 × 2.54 Å = 3.5915 Å ≈ 3.59 Å.\nTherefore, Option (B) is the correct answer.",
    similarQuestion: {
      question: "An element crystallizes in an FCC lattice with a unit cell edge length of 4.0 Å. What is the nearest neighbour distance between two adjacent atoms?",
      option_a: "2.83 Å",
      option_b: "3.46 Å",
      option_c: "1.41 Å",
      option_d: "2.00 Å",
      correct_option: "A",
      explanation: "In an FCC lattice, nearest neighbour distance d = a / √2 = 4.0 / 1.414 ≈ 2.83 Å.\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 1254,
    question: "Carbon, silicon and germanium atoms have four valence electrons each. Their energy band gaps are (Eg)C, (Eg)Si and (Eg)Ge, respectively. Which relationship is true? [AIPMT 2005]",
    option_a: "(Eg)C > (Eg)Si",
    option_b: "(Eg)C < (Eg)Si",
    option_c: "(Eg)C = (Eg)Si",
    option_d: "(Eg)C < (Eg)Ge",
    correct_option: "A",
    explanation: "Carbon (diamond), silicon, and germanium belong to Group 14 of the periodic table, each having four valence electrons:\n1. Carbon is in the second period (valence electrons in n = 2). The small atomic radius results in very strong covalent bonds and strong overlap, creating a large energy bandgap:\nE_g(C) ≈ 5.4 eV (insulator at room temperature).\n2. Silicon is in the third period (n = 3) with larger atomic radius:\nE_g(Si) ≈ 1.1 eV (semiconductor).\n3. Germanium is in the fourth period (n = 4) with even larger atomic radius:\nE_g(Ge) ≈ 0.7 eV (semiconductor).\n4. As atomic number and size increase down the group, the valence electrons are bound less tightly, and the bandgap decreases: E_g(C) > E_g(Si) > E_g(Ge).\nTherefore, (E_g)_C > (E_g)_Si.\nTherefore, Option (A) is the correct answer.",
    similarQuestion: {
      question: "Which of the following correctly orders the energy bandgap (E_g) of diamond, silicon, and germanium?",
      option_a: "E_g(diamond) > E_g(Si) > E_g(Ge)",
      option_b: "E_g(Ge) > E_g(Si) > E_g(diamond)",
      option_c: "E_g(Si) > E_g(diamond) > E_g(Ge)",
      option_d: "E_g(diamond) = E_g(Si) = E_g(Ge)",
      correct_option: "A",
      explanation: "Diamond has E_g ≈ 5.4 eV, silicon has E_g ≈ 1.1 eV, and germanium has E_g ≈ 0.7 eV. The bandgap decreases down Group 14: E_g(diamond) > E_g(Si) > E_g(Ge).\nTherefore, Option (A) is the correct answer."
    }
  }
];

