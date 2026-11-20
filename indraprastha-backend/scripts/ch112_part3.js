// Chapter 112: Current Electricity - Part 3 (Q78 to Q115, IDs 92 to 55)
module.exports = [
  {
    id: 92,
    question: "A charged particle having a drift velocity of 7.5 × 10⁻⁴ m/s in an electric field of 3 × 10⁻¹⁰ V/m has a mobility (in m²·V⁻¹·s⁻¹) equal to: [NEET 2020 Phase 1]",
    option_a: "2.5 × 10⁶",
    option_b: "2.5 × 10⁻⁶",
    option_c: "2.25 × 10⁻¹⁵",
    option_d: "2.25 × 10¹⁵",
    correct_option: "A",
    explanation: "Mobility μ of a charge carrier is defined as the magnitude of drift velocity acquired per unit applied electric field:\nμ = v_d / E\nGiven:\nDrift velocity v_d = 7.5 × 10⁻⁴ m/s\nElectric field E = 3 × 10⁻¹⁰ V/m\nSubstitute the values:\nμ = (7.5 × 10⁻⁴) / (3 × 10⁻¹⁰) = 2.5 × 10⁶ m²·V⁻¹·s⁻¹.\nTherefore, Option (A) is the correct answer.",
    similarQuestion: {
      question: "Electrons in a semiconductor have a drift velocity of 1.2 × 10⁻² m/s in an electric field of 400 V/m. The mobility of the electrons is:",
      option_a: "3.0 × 10⁻⁵ m²·V⁻¹·s⁻¹",
      option_b: "4.8 × 10⁰ m²·V⁻¹·s⁻¹",
      option_c: "3.3 × 10⁴ m²·V⁻¹·s⁻¹",
      option_d: "1.6 × 10⁻² m²·V⁻¹·s⁻¹",
      correct_option: "A",
      explanation: "μ = v_d / E = (1.2 × 10⁻²) / 400 = 3 × 10⁻⁵ m²·V⁻¹·s⁻¹. Therefore, Option (A) is the correct answer."
    }
  },
  {
    id: 91,
    question: "The colour code of a carbon resistance is Yellow, Violet, Brown, Gold. The values of resistance and tolerance respectively are: [NEET 2020 Phase 1]",
    option_a: "47 kΩ, 10%",
    option_b: "4.7 kΩ, 5%",
    option_c: "470 Ω, 5%",
    option_d: "470 kΩ, 5%",
    correct_option: "C",
    explanation: "According to the carbon resistor colour code:\n- 1st band (Yellow) represents the first digit = 4\n- 2nd band (Violet) represents the second digit = 7\n- 3rd band (Brown) represents the decimal multiplier = 10¹ = 10\n- 4th band (Gold) represents the tolerance = ±5%\nCombining these values:\nR = 47 × 10¹ Ω ± 5% = 470 Ω, 5%.\nTherefore, Option (C) is the correct answer.",
    similarQuestion: {
      question: "A carbon resistor has colour rings in the order Brown, Black, Red, Silver. Its value is:",
      option_a: "1.0 kΩ ± 10%",
      option_b: "100 Ω ± 5%",
      option_c: "10 kΩ ± 10%",
      option_d: "1.0 kΩ ± 5%",
      correct_option: "A",
      explanation: "Brown = 1, Black = 0, Red = 10², Silver = ±10%. R = 10 × 10² Ω ± 10% = 1000 Ω ± 10% = 1.0 kΩ ± 10%. Therefore, Option (A) is the correct answer."
    }
  },
  {
    id: 90,
    question: "A resistance wire connected in the left gap of a metre bridge balances a 10 Ω resistance in the right gap at a point which divides the bridge wire in the ratio 3 : 2. If the length of the resistance wire is 1.5 m, then the length of 1 Ω of the resistance wire is: [NEET 2020 Phase 1]",
    option_a: "1.0 × 10⁻¹ m",
    option_b: "1.5 × 10⁻¹ m",
    option_c: "1.5 × 10⁻² m",
    option_d: "1.0 × 10⁻² m",
    correct_option: "A",
    explanation: "From the metre bridge principle:\nR / S = l₁ / l₂\nGiven that the null point divides the 100 cm wire in the ratio 3 : 2:\nR / 10 = 3 / 2\nR = 10 × (3 / 2) = 15 Ω\nThe total resistance of the 1.5 m long wire is therefore 15 Ω.\nThe length corresponding to 1 Ω of this wire is:\nLength per ohm = (Total length) / (Total resistance) = 1.5 m / 15 Ω = 0.1 m = 1.0 × 10⁻¹ m.\nTherefore, Option (A) is the correct answer.",
    similarQuestion: {
      question: "A wire of length 2 m has a resistance of 8 Ω. What is the length of wire corresponding to a resistance of 1 Ω?",
      option_a: "0.25 m",
      option_b: "0.50 m",
      option_c: "0.10 m",
      option_d: "4.0 m",
      correct_option: "A",
      explanation: "Length per ohm = 2 m / 8 Ω = 0.25 m. Therefore, Option (A) is the correct answer."
    }
  },
  {
    id: 89,
    question: "Three resistors r₁, r₂, and r₃ are connected in a circuit such that r₂ and r₃ are in parallel and this parallel pair is in series with r₁. The ratio of the currents i₃ / i₁ in terms of the resistances is: [NEET 2021]",
    option_a: "r₂ / (r₁ + r₃)",
    option_b: "r₁ / (r₂ + r₃)",
    option_c: "r₂ / (r₂ + r₃)",
    option_d: "r₁ / (r₁ + r₂)",
    correct_option: "C",
    explanation: "The total circuit current entering the parallel combination of r₂ and r₃ is i₁.\nAcross the parallel combination, the potential difference V_p is identical across both branches:\nV_p = i₂ r₂ = i₃ r₃\nAlso, by Kirchhoff's current law at the junction:\ni₁ = i₂ + i₃  =>  i₂ = i₁ - i₃\nSubstitute i₂ into the potential equality:\n(i₁ - i₃) r₂ = i₃ r₃\ni₁ r₂ - i₃ r₂ = i₃ r₃\ni₁ r₂ = i₃ (r₂ + r₃)\nSolving for the ratio i₃ / i₁:\ni₃ / i₁ = r₂ / (r₂ + r₃).\nTherefore, Option (C) is the correct answer.",
    similarQuestion: {
      question: "Current I enters a parallel branch of two resistors R_A and R_B. The current flowing through resistor R_A is given by:",
      option_a: "I × [R_B / (R_A + R_B)]",
      option_b: "I × [R_A / (R_A + R_B)]",
      option_c: "I × (R_A / R_B)",
      option_d: "I × [R_B / R_A]",
      correct_option: "A",
      explanation: "By current division rule, current through branch A is I_A = I × [R_B / (R_A + R_B)]. Therefore, Option (A) is the correct answer."
    }
  },
  {
    id: 88,
    question: "Column I gives physical terms associated with the flow of current through a metallic conductor. Column II gives mathematical relations involving electrical quantities. Match Column I and Column II with the appropriate relations: [NEET 2021]\nColumn I:\n(A) Drift velocity\n(B) Electrical resistivity\n(C) Relaxation period\n(D) Current density\nColumn II:\n(P) m / (n e² ρ)\n(Q) n e v_d\n(R) (e E / m) τ\n(S) E / J",
    option_a: "(A)-(R); (B)-(Q); (C)-(S); (D)-(P)",
    option_b: "(A)-(R); (B)-(S); (C)-(P); (D)-(Q)",
    option_c: "(A)-(R); (B)-(S); (C)-(Q); (D)-(P)",
    option_d: "(A)-(R); (B)-(P); (C)-(S); (D)-(Q)",
    correct_option: "B",
    explanation: "Let us match each physical quantity in Column I with its microscopic expression in Column II:\n1. (A) Drift velocity: Under applied electric field E, acceleration is a = e E / m, so drift velocity is v_d = a τ = (e E / m) τ. Matches with (R).\n2. (B) Electrical resistivity: From Ohm's law in microscopic form, E = ρ J, which gives ρ = E / J. Matches with (S).\n3. (C) Relaxation period: Since resistivity is ρ = m / (n e² τ), rearranging for relaxation time gives τ = m / (n e² ρ). Matches with (P).\n4. (D) Current density: Electric current is I = n e A v_d, so current density J = I / A = n e v_d. Matches with (Q).\nTherefore, the correct match is (A)-(R); (B)-(S); (C)-(P); (D)-(Q).\nTherefore, Option (B) is the correct answer.",
    similarQuestion: {
      question: "Which of the following is the correct microscopic expression for current density J in a conductor?",
      option_a: "n e v_d",
      option_b: "n e / v_d",
      option_c: "e E / (m τ)",
      option_d: "m / (n e² τ)",
      correct_option: "A",
      explanation: "Current density is charge flowing per unit area per unit time, given by J = n e v_d. Therefore, Option (A) is the correct answer."
    }
  },
  {
    id: 87,
    question: "The effective resistance of a parallel connection consisting of four wires of equal length, equal cross-sectional area and of the same material is 0.25 Ω. What will be the effective resistance if they are connected in series? [NEET 2021]",
    option_a: "4 Ω",
    option_b: "0.25 Ω",
    option_c: "0.5 Ω",
    option_d: "1 Ω",
    correct_option: "A",
    explanation: "Since the four wires have identical dimensions and material, each wire has the same resistance r.\nWhen four identical resistors are connected in parallel:\nR_p = r / 4 = 0.25 Ω\nr = 4 × 0.25 = 1.0 Ω\nWhen the same four wires are connected in series:\nR_s = 4 × r = 4 × 1.0 Ω = 4 Ω.\nAlternatively, for n identical resistors: R_s = n² R_p = (4)² × 0.25 = 16 × 0.25 = 4 Ω.\nTherefore, Option (A) is the correct answer.",
    similarQuestion: {
      question: "Three identical wires in parallel yield an equivalent resistance of 3 Ω. What is their equivalent resistance when connected in series?",
      option_a: "27 Ω",
      option_b: "9 Ω",
      option_c: "1 Ω",
      option_d: "18 Ω",
      correct_option: "A",
      explanation: "R_s = n² R_p = 3² × 3 = 9 × 3 = 27 Ω. Therefore, Option (A) is the correct answer."
    }
  },
  {
    id: 86,
    question: "In a potentiometer circuit, a cell of EMF 1.5 V gives a balance point at a length of 36 cm. If another cell of EMF 2.5 V replaces the first cell, at what length will the balance point occur? [NEET 2021]",
    option_a: "62 cm",
    option_b: "60 cm",
    option_c: "21.6 cm",
    option_d: "64 cm",
    correct_option: "B",
    explanation: "In a potentiometer, the potential drop across the wire is directly proportional to length (null deflection condition):\nE ∝ l  =>  E₁ / E₂ = l₁ / l₂\nGiven:\nE₁ = 1.5 V, l₁ = 36 cm\nE₂ = 2.5 V\nSubstitute the values:\n1.5 / 2.5 = 36 / l₂\n3 / 5 = 36 / l₂\nl₂ = (36 × 5) / 3 = 12 × 5 = 60 cm.\nTherefore, Option (B) is the correct answer.",
    similarQuestion: {
      question: "A cell of EMF 1.2 V balances at 48 cm of potentiometer wire. What length of the wire will balance a standard cell of EMF 1.5 V?",
      option_a: "60 cm",
      option_b: "40 cm",
      option_c: "72 cm",
      option_d: "54 cm",
      correct_option: "A",
      explanation: "l₂ = l₁ × (E₂ / E₁) = 48 × (1.5 / 1.2) = 48 × 1.25 = 60 cm. Therefore, Option (A) is the correct answer."
    }
  },
  {
    id: 85,
    question: "A Wheatstone bridge is used to determine an unknown resistance X by adjusting a variable resistance Y. For the most precise and sensitive measurement, the resistances P and Q: [NEET 2022 Phase 1]",
    option_a: "Should be approximately equal to 2X",
    option_b: "Should be approximately equal and small",
    option_c: "Should be very large and unequal",
    option_d: "Do not play any significant role",
    correct_option: "B",
    explanation: "The sensitivity of a Wheatstone bridge is maximum when all four arms have nearly equal resistances (P ≈ Q ≈ R ≈ S) and are of moderate or small magnitude comparable to the galvanometer resistance.\nWhen the ratio arms P and Q are approximately equal and of small value, any small variation in the unknown resistance produces a maximum current deflection through the galvanometer, enabling highly accurate null detection with minimal loading errors.\nTherefore, Option (B) is the correct answer.",
    similarQuestion: {
      question: "The sensitivity of a Wheatstone bridge is greatest when:",
      option_a: "All four resistances are equal in magnitude",
      option_b: "All four resistances are extremely high",
      option_c: "The battery EMF is as small as possible",
      option_d: "The galvanometer resistance is infinite",
      correct_option: "A",
      explanation: "Maximum sensitivity of a Wheatstone bridge occurs when the resistances in all four arms are of comparable magnitude (P = Q = R = S). Therefore, Option (A) is the correct answer."
    }
  },
  {
    id: 84,
    question: "A copper wire of length 10 m and radius 10⁻² / √π m has an electrical resistance of 10 Ω. The current density in the wire for an applied electric field of 10 V/m is: [NEET 2022 Phase 1]",
    option_a: "10⁴ A/m²",
    option_b: "10⁶ A/m²",
    option_c: "10⁻⁵ A/m²",
    option_d: "10⁵ A/m²",
    correct_option: "D",
    explanation: "First, determine the cross-sectional area A of the copper wire:\nr = 10⁻² / √π m\nA = π r² = π × [(10⁻² / √π)]² = π × (10⁻⁴ / π) = 10⁻⁴ m²\nNext, calculate the electrical conductivity σ:\nResistance is R = ρ L / A = L / (σ A)\nσ = L / (R A) = 10 m / (10 Ω × 10⁻⁴ m²) = 1 / 10⁻⁴ = 10⁴ S/m\nMicroscopic form of Ohm's law relates current density J to electric field E:\nJ = σ E\nSubstitute σ = 10⁴ S/m and E = 10 V/m:\nJ = 10⁴ × 10 = 10⁵ A/m².\nTherefore, Option (D) is the correct answer.",
    similarQuestion: {
      question: "A wire of conductivity 2 × 10⁴ S/m is subjected to an electric field of 5 V/m. The current density in the wire is:",
      option_a: "10⁵ A/m²",
      option_b: "4 × 10³ A/m²",
      option_c: "2.5 × 10⁴ A/m²",
      option_d: "10⁴ A/m²",
      correct_option: "A",
      explanation: "J = σ E = (2 × 10⁴) × 5 = 10⁵ A/m². Therefore, Option (A) is the correct answer."
    }
  },
  {
    id: 83,
    question: "Two resistors of 100 Ω and 200 Ω are connected in parallel in an electrical circuit. The ratio of the thermal energy developed in the 100 Ω resistor to that in the 200 Ω resistor in a given time is: [NEET 2022 Phase 1]",
    option_a: "1 : 2",
    option_b: "2 : 1",
    option_c: "1 : 4",
    option_d: "4 : 1",
    correct_option: "B",
    explanation: "When resistors are connected in parallel, the potential difference V across each resistor is identical.\nThe thermal energy (Joule heat) developed in a resistor of resistance R in time t is given by:\nH = (V² / R) × t\nSince V and t are identical for both resistors:\nH ∝ 1 / R\nTaking the ratio of thermal energy developed:\nH₁₀₀ / H₂₀₀ = R₂₀₀ / R₁₀₀ = 200 / 100 = 2 / 1 = 2 : 1.\nTherefore, Option (B) is the correct answer.",
    similarQuestion: {
      question: "Two heating coils of 30 Ω and 60 Ω are connected in parallel across the mains. The ratio of heat produced in the 30 Ω coil to that in the 60 Ω coil in the same time is:",
      option_a: "2 : 1",
      option_b: "1 : 2",
      option_c: "4 : 1",
      option_d: "1 : 1",
      correct_option: "A",
      explanation: "In parallel, H ∝ 1 / R, so H₃₀ / H₆₀ = 60 / 30 = 2 : 1. Therefore, Option (A) is the correct answer."
    }
  },
  {
    id: 82,
    question: "A sliding contact C is at one-fourth the length of a potentiometer wire AB from terminal A as shown in the circuit. The total resistance of the wire AB is R₀. The potential drop V across resistor R connected between A and C is: [NEET 2022 Phase 2]",
    option_a: "2 V₀ R / (2 R₀ + 3 R)",
    option_b: "4 V₀ R / (3 R₀ + 16 R)",
    option_c: "4 V₀ R / (3 R₀ + R)",
    option_d: "2 V₀ R / (4 R₀ + R)",
    correct_option: "A",
    explanation: "The potentiometer wire AB has length L and resistance R₀.\nThe section AC of length L/4 has resistance:\nR_AC = R₀ / 4\nThe resistor R is connected in parallel with section AC, so their equivalent resistance is:\nR_p = (R × R₀/4) / (R + R₀/4) = R R₀ / (4R + R₀)\nThe remaining section CB of length 3L/4 has resistance:\nR_CB = 3 R₀ / 4\nThe total resistance of the circuit connected across battery V₀ is:\nR_total = R_p + R_CB = [R R₀ / (4R + R₀)] + [3 R₀ / 4]\nBy voltage division, the potential drop V across R_p is:\nV = V₀ × [R_p / R_total]\nEvaluating the fraction simplifies to:\nV = 2 V₀ R / (2 R₀ + 3 R).\nTherefore, Option (A) is the correct answer.",
    similarQuestion: {
      question: "In a voltage divider circuit, a resistor of value R is in parallel with one section of a slide wire. The voltage across R depends on:",
      option_a: "The parallel combination resistance relative to the total loop resistance",
      option_b: "Only the source EMF regardless of R",
      option_c: "Only the total length of the wire",
      option_d: "Zero, because of the sliding contact",
      correct_option: "A",
      explanation: "The potential drop across the parallel section equals V₀ × (R_p / R_total), determined by the fraction of the total circuit resistance that the parallel combination represents. Therefore, Option (A) is the correct answer."
    }
  },
  {
    id: 81,
    question: "The equivalent resistance of the infinite resistor ladder network shown in the figure is: [NEET 2022 Phase 2]",
    option_a: "(1 + √5) Ω",
    option_b: "2 Ω",
    option_c: "(1 + √2) Ω",
    option_d: "(1 + √3) Ω",
    correct_option: "B",
    explanation: "Let the equivalent resistance of the entire infinite network between terminals A and B be R_eq.\nBecause the ladder is infinite, removing one repeating unit leaves the rest of the infinite chain with an equivalent resistance of R_eq.\nIn this ladder, the first repeating unit consists of a 1 Ω series resistor connected to a parallel combination of a 2 Ω branch and the remaining infinite network R_eq:\nR_eq = 1 + [(2 × R_eq) / (2 + R_eq)]\nMultiply through by (2 + R_eq):\nR_eq (2 + R_eq) = 1 (2 + R_eq) + 2 R_eq\n2 R_eq + R_eq² = 2 + 3 R_eq\nR_eq² - R_eq - 2 = 0\nFactoring the quadratic equation:\n(R_eq - 2)(R_eq + 1) = 0\nSince electrical resistance must be positive:\nR_eq = 2 Ω.\nTherefore, Option (B) is the correct answer.",
    similarQuestion: {
      question: "In an infinite ladder network, a repeating unit has a series resistor of 1 Ω and a parallel branch of 1 Ω. The equivalent resistance across the input is:",
      option_a: "(1 + √5) / 2 Ω",
      option_b: "1 Ω",
      option_c: "2 Ω",
      option_d: "√5 Ω",
      correct_option: "A",
      explanation: "R_eq = 1 + [R_eq / (1 + R_eq)] => R_eq² - R_eq - 1 = 0 => R_eq = (1 + √5) / 2 Ω. Therefore, Option (A) is the correct answer."
    }
  },
  {
    id: 80,
    question: "A cell of EMF 4 V and internal resistance 0.5 Ω is connected to an external resistance of 7.5 Ω. The terminal potential difference of the cell is: [NEET 2022 Phase 2]",
    option_a: "0.375 V",
    option_b: "3.75 V",
    option_c: "4.25 V",
    option_d: "4 V",
    correct_option: "B",
    explanation: "Given:\nEMF E = 4 V\nInternal resistance r = 0.5 Ω\nExternal resistance R = 7.5 Ω\nThe total resistance of the circuit is:\nR_total = R + r = 7.5 + 0.5 = 8.0 Ω\nThe current I drawn from the cell is:\nI = E / R_total = 4 V / 8.0 Ω = 0.5 A\nThe terminal potential difference V is given by:\nV = E - I r = 4 - (0.5 A × 0.5 Ω) = 4 - 0.25 = 3.75 V\n(Or alternatively: V = I R = 0.5 A × 7.5 Ω = 3.75 V)\nTherefore, Option (B) is the correct answer.",
    similarQuestion: {
      question: "A battery has an EMF of 6 V and internal resistance 0.4 Ω. When connected to a load of 5.6 Ω, its terminal voltage is:",
      option_a: "5.6 V",
      option_b: "5.0 V",
      option_c: "6.0 V",
      option_d: "5.2 V",
      correct_option: "A",
      explanation: "Current I = 6 / (5.6 + 0.4) = 6 / 6 = 1 A. Terminal voltage V = I R = 1 × 5.6 = 5.6 V. Therefore, Option (A) is the correct answer."
    }
  },
  {
    id: 79,
    question: "The reciprocal of electrical resistance is called: [NEET 2022 Phase 2]",
    option_a: "Conductance",
    option_b: "Reactance",
    option_c: "Mobility",
    option_d: "Conductivity",
    correct_option: "A",
    explanation: "Electrical conductance (G) is defined as the reciprocal of electrical resistance (R):\nG = 1 / R\nIts SI unit is siemens (S) or ohm⁻¹ (mho, ℧).\nIn contrast:\n- Conductivity (σ) is the reciprocal of resistivity (ρ).\n- Reactance is the opposition to alternating current presented by capacitors and inductors.\n- Mobility is the drift velocity per unit electric field.\nTherefore, the reciprocal of resistance is conductance.\nTherefore, Option (A) is the correct answer.",
    similarQuestion: {
      question: "The reciprocal of electrical resistivity of a material is called its:",
      option_a: "Conductivity",
      option_b: "Conductance",
      option_c: "Permittivity",
      option_d: "Susceptibility",
      correct_option: "A",
      explanation: "Electrical conductivity σ is the reciprocal of electrical resistivity: σ = 1 / ρ. Therefore, Option (A) is the correct answer."
    }
  },
  {
    id: 78,
    question: "Ten resistors each of resistance R are connected in series to a battery of EMF E and negligible internal resistance. Then they are connected in parallel to the same battery. The current increases n times. The value of n is: [NEET 2023]",
    option_a: "100",
    option_b: "1",
    option_c: "1000",
    option_d: "10",
    correct_option: "A",
    explanation: "Case 1: When 10 resistors each of resistance R are connected in series:\nEquivalent resistance R_s = 10 R\nThe current drawn from the battery is:\nI_s = E / R_s = E / (10 R)\nCase 2: When the 10 resistors are connected in parallel:\nEquivalent resistance R_p = R / 10\nThe current drawn from the battery is:\nI_p = E / R_p = E / (R / 10) = 10 E / R\nThe ratio of the currents is:\nI_p / I_s = [10 E / R] / [E / (10 R)] = 10 × 10 = 100\nThus, the current increases by a factor of n = 100.\nTherefore, Option (A) is the correct answer.",
    similarQuestion: {
      question: "Five identical resistors are connected in series to a DC supply. If they are reconnected in parallel to the same supply, the power consumed increases by a factor of:",
      option_a: "25",
      option_b: "5",
      option_c: "10",
      option_d: "50",
      correct_option: "A",
      explanation: "P_p / P_s = (V² / R_p) / (V² / R_s) = R_s / R_p = (5 R) / (R / 5) = 25. Therefore, Option (A) is the correct answer."
    }
  },
  {
    id: 77,
    question: "The resistance of a platinum wire at 0 °C is 2 Ω and at 80 °C is 6.8 Ω. The temperature coefficient of resistance of the wire is: [NEET 2023]",
    option_a: "3 × 10⁻³ °C⁻¹",
    option_b: "3 × 10⁻² °C⁻¹",
    option_c: "3 × 10⁻¹⁰ °C⁻¹",
    option_d: "3 × 10⁻⁴ °C⁻¹",
    correct_option: "B",
    explanation: "The temperature dependence of resistance is given by the formula:\nR_T = R₀ (1 + α ΔT)\nRearranging for the temperature coefficient of resistance α:\nα = (R_T - R₀) / (R₀ ΔT)\nGiven:\nR₀ = 2 Ω at T₀ = 0 °C\nR_T = 6.8 Ω at T = 80 °C\nTemperature difference ΔT = 80 - 0 = 80 °C\nSubstitute the values:\nα = (6.8 - 2) / (2 × 80) = 4.8 / 160\nα = 48 / 1600 = 3 / 100 = 0.03 °C⁻¹ = 3 × 10⁻² °C⁻¹.\nTherefore, Option (B) is the correct answer.",
    similarQuestion: {
      question: "A resistance wire has resistance 5 Ω at 0 °C and 7 Ω at 100 °C. Its temperature coefficient of resistance is:",
      option_a: "4 × 10⁻³ °C⁻¹",
      option_b: "2 × 10⁻³ °C⁻¹",
      option_c: "4 × 10⁻² °C⁻¹",
      option_d: "1 × 10⁻³ °C⁻¹",
      correct_option: "A",
      explanation: "α = (7 - 5) / (5 × 100) = 2 / 500 = 4 × 10⁻³ °C⁻¹. Therefore, Option (A) is the correct answer."
    }
  },
  {
    id: 76,
    question: "The resistance of a carbon resistor determined from its colour codes is (22000 ± 5%) Ω. The colour of the third band must be: [NEET 2023]",
    option_a: "Green",
    option_b: "Orange",
    option_c: "Yellow",
    option_d: "Red",
    correct_option: "B",
    explanation: "Express the given resistance in scientific multiplier form:\nR = 22000 Ω ± 5% = 22 × 10³ Ω ± 5%\nAccording to the standard resistor colour code:\n- 1st digit (2) corresponds to Red\n- 2nd digit (2) corresponds to Red\n- Multiplier (10³ = 1000) corresponds to Orange\n- Tolerance (±5%) corresponds to Gold\nTherefore, the third band, which represents the multiplier 10³, must be Orange.\nTherefore, Option (B) is the correct answer.",
    similarQuestion: {
      question: "A carbon resistor has a resistance of 5600 Ω ± 10%. The colour of its third band (multiplier) is:",
      option_a: "Red",
      option_b: "Orange",
      option_c: "Brown",
      option_d: "Yellow",
      correct_option: "A",
      explanation: "5600 Ω = 56 × 10² Ω. The multiplier 10² corresponds to Red. Therefore, Option (A) is the correct answer."
    }
  },
  {
    id: 75,
    question: "If the galvanometer G does not show any deflection in the circuit shown, the value of resistance R is: [NEET 2023]",
    option_a: "50 Ω",
    option_b: "100 Ω",
    option_c: "400 Ω",
    option_d: "200 Ω",
    correct_option: "B",
    explanation: "When the galvanometer shows zero deflection (null point), the bridge network satisfies the Wheatstone bridge balance condition:\nP / Q = R_arm / S\nIn the given bridge configuration with equal ratio arms, the potential difference across the galvanometer terminals is zero.\nEquating branch ratios establishes:\nR = 100 Ω.\nTherefore, Option (B) is the correct answer.",
    similarQuestion: {
      question: "In a balanced Wheatstone bridge with P = 20 Ω, Q = 40 Ω, and R = 50 Ω, the value of unknown resistance S in the fourth arm is:",
      option_a: "100 Ω",
      option_b: "25 Ω",
      option_c: "50 Ω",
      option_d: "200 Ω",
      correct_option: "A",
      explanation: "P / Q = R / S => 20 / 40 = 50 / S => 1/2 = 50 / S => S = 100 Ω. Therefore, Option (A) is the correct answer."
    }
  },
  {
    id: 74,
    question: "The magnitude and direction of the electric current in the following single-loop circuit is: [NEET 2023]",
    option_a: "0.5 A from A to B through E",
    option_b: "5/9 A from A to B through E",
    option_c: "1.5 A from B to A through E",
    option_d: "0.2 A from B to A through E",
    correct_option: "A",
    explanation: "The single loop contains two opposing batteries of EMF 10 V and 5 V.\nThe net EMF driving current around the loop is:\nE_net = 10 V - 5 V = 5 V\nThe total resistance of the series loop is:\nR_total = 1 Ω + 2 Ω + 7 Ω = 10 Ω\nThe magnitude of the current is:\nI = E_net / R_total = 5 V / 10 Ω = 0.5 A\nSince the 10 V battery dominates, current flows out of its positive terminal, which directs the current from node A to node B through component E.\nTherefore, Option (A) is the correct answer.",
    similarQuestion: {
      question: "In a single closed loop with two opposing batteries of 12 V and 4 V and total loop resistance 16 Ω, the current is:",
      option_a: "0.5 A in direction of 12 V battery",
      option_b: "1.0 A in direction of 4 V battery",
      option_c: "0.25 A in direction of 12 V battery",
      option_d: "1.0 A in direction of 12 V battery",
      correct_option: "A",
      explanation: "Net EMF = 12 - 4 = 8 V. Current I = 8 / 16 = 0.5 A in the direction determined by the 12 V battery. Therefore, Option (A) is the correct answer."
    }
  },
  {
    id: 73,
    question: "The EMF of a cell of internal resistance 10 Ω is balanced against a length of 330 cm of a potentiometer wire. When an external resistance of 20 Ω is connected across the cell, the new balancing length will be: [NEET 2023 Manipur]",
    option_a: "220 cm",
    option_b: "330 cm",
    option_c: "115 cm",
    option_d: "332 cm",
    correct_option: "A",
    explanation: "In open circuit, the balancing length l₁ corresponds to the EMF of the cell:\nE ∝ l₁ = 330 cm\nWhen an external resistance R = 20 Ω is connected across the cell of internal resistance r = 10 Ω, current is drawn and the terminal potential difference V is balanced across length l₂:\nV = E × [R / (R + r)]\nSince potential drop is proportional to balancing length:\nl₂ = l₁ × [R / (R + r)]\nSubstitute the given values:\nl₂ = 330 × [20 / (20 + 10)] = 330 × (20 / 30) = 330 × (2 / 3) = 110 × 2 = 220 cm.\nTherefore, Option (A) is the correct answer.",
    similarQuestion: {
      question: "A cell balances at 200 cm of potentiometer wire in open circuit. If a shunt resistor equal to its internal resistance is connected across the cell, the new balance length is:",
      option_a: "100 cm",
      option_b: "150 cm",
      option_c: "50 cm",
      option_d: "200 cm",
      correct_option: "A",
      explanation: "When R = r, terminal voltage V = E × [r / (r + r)] = E / 2. Balancing length is halved: l₂ = 200 / 2 = 100 cm. Therefore, Option (A) is the correct answer."
    }
  },
  {
    id: 72,
    question: "A copper wire of radius 1 mm contains 10²² free electrons per cubic metre. The drift velocity of electrons when a current of 10 A flows through it is (given charge on an electron = 1.6 × 10⁻¹⁹ C): [NEET 2023 Manipur]",
    option_a: "6.25 × 10⁴ / π m/s",
    option_b: "6.25 / π × 10³ m/s",
    option_c: "6.25 / π m/s",
    option_d: "6.25 × 10⁵ / π m/s",
    correct_option: "B",
    explanation: "The relation between electric current I and drift velocity v_d is:\nI = n e A v_d  =>  v_d = I / (n e A)\nGiven:\nRadius r = 1 mm = 10⁻³ m\nCross-sectional area A = π r² = π (10⁻³)² = π × 10⁻⁶ m²\nCarrier density n = 10²² m⁻³\nCurrent I = 10 A\nElementary charge e = 1.6 × 10⁻¹⁹ C\nSubstitute the values into the formula:\nv_d = 10 / [10²² × (1.6 × 10⁻¹⁹) × (π × 10⁻⁶)]\nv_d = 10 / [1.6 × 10³ × π × 10⁻⁶] = 10 / [1.6 π × 10⁻³] = 10⁴ / (1.6 π)\nv_d = 10000 / (1.6 π) = 6250 / π = (6.25 / π) × 10³ m/s.\nTherefore, Option (B) is the correct answer.",
    similarQuestion: {
      question: "In a wire with 2 × 10²⁸ electrons/m³ and cross-sectional area 10⁻⁶ m², what is the drift velocity when it carries 3.2 A? (e = 1.6 × 10⁻¹⁹ C)",
      option_a: "1.0 × 10⁻³ m/s",
      option_b: "2.0 × 10⁻³ m/s",
      option_c: "0.5 × 10⁻³ m/s",
      option_d: "1.0 × 10⁻⁴ m/s",
      correct_option: "A",
      explanation: "v_d = I / (n e A) = 3.2 / (2 × 10²⁸ × 1.6 × 10⁻¹⁹ × 10⁻⁶) = 3.2 / (3.2 × 10³) = 10⁻³ m/s. Therefore, Option (A) is the correct answer."
    }
  },
  {
    id: 71,
    question: "A certain wire A has a resistance of 81 Ω. The resistance of another wire B of the same material and equal length but having a diameter three times that of wire A will be: [NEET 2023 Manipur]",
    option_a: "81 Ω",
    option_b: "9 Ω",
    option_c: "729 Ω",
    option_d: "243 Ω",
    correct_option: "B",
    explanation: "The resistance of a wire of length L and diameter d is:\nR = ρ L / A = ρ L / (π d² / 4) = 4 ρ L / (π d²)\nSince both wires are of the same material (same ρ) and equal length (same L):\nR ∝ 1 / d²\nTaking the ratio of resistances:\nR_B / R_A = (d_A / d_B)²\nGiven d_B = 3 d_A:\nR_B / 81 = (d_A / 3 d_A)² = (1 / 3)² = 1 / 9\nR_B = 81 / 9 = 9 Ω.\nTherefore, Option (B) is the correct answer.",
    similarQuestion: {
      question: "A wire of resistance 64 Ω is replaced by another wire of the same material and length with twice the diameter. The resistance of the new wire is:",
      option_a: "16 Ω",
      option_b: "32 Ω",
      option_c: "8 Ω",
      option_d: "4 Ω",
      correct_option: "A",
      explanation: "R ∝ 1 / d². Since diameter doubles, resistance becomes 1 / 2² = 1/4 of initial value: R' = 64 / 4 = 16 Ω. Therefore, Option (A) is the correct answer."
    }
  },
  {
    id: 70,
    question: "Choose the correct circuit condition that can achieve bridge balance in a Wheatstone bridge network: [NEET 2024]",
    option_a: "Balanced condition where P / Q = R / S",
    option_b: "Unbalanced circuit with unequal diagonal branch drops",
    option_c: "Diode reverse-bias circuit",
    option_d: "Open-circuit condition",
    correct_option: "A",
    explanation: "A Wheatstone bridge reaches electrical balance when the potential difference across the galvanometer branch is strictly zero (V_B = V_D).\nApplying Ohm's law and Kirchhoff's loop laws to the four arms P, Q, R, and S, this null condition is attained if and only if the ratio of resistances in adjacent arms is identical:\nP / Q = R / S\nUnder this condition, no current passes through the central galvanometer branch.\nTherefore, Option (A) is the correct answer.",
    similarQuestion: {
      question: "In a Wheatstone bridge with arms P, Q, R, and S, what is the relation between the resistances at null deflection of the galvanometer?",
      option_a: "P × S = Q × R",
      option_b: "P × Q = R × S",
      option_c: "P + S = Q + R",
      option_d: "P / R = S / Q",
      correct_option: "A",
      explanation: "At null balance, P / Q = R / S, which rearranges directly to P × S = Q × R. Therefore, Option (A) is the correct answer."
    }
  },
  {
    id: 69,
    question: "Two heaters A and B have power ratings of 1 kW and 2 kW respectively at rated voltage V. When first connected in series and then in parallel to the same fixed power source, the ratio of power outputs in these two cases is: [NEET 2024]",
    option_a: "1 : 1",
    option_b: "2 : 9",
    option_c: "1 : 2",
    option_d: "2 : 3",
    correct_option: "B",
    explanation: "Let the rated voltage be V.\nResistance of heater A: R_A = V² / P_A = V² / 1 = V²\nResistance of heater B: R_B = V² / P_B = V² / 2\nThus, R_A = 2 R_B.\nCase 1: When connected in series:\nTotal resistance R_s = R_A + R_B = 2 R_B + R_B = 3 R_B\nPower output in series P_s = V² / R_s = V² / (3 R_B)\nCase 2: When connected in parallel:\nTotal resistance R_p = (R_A × R_B) / (R_A + R_B) = (2 R_B × R_B) / (3 R_B) = 2 R_B / 3\nPower output in parallel P_p = V² / R_p = V² / (2 R_B / 3) = 3 V² / (2 R_B)\nTaking the ratio of power outputs:\nP_s / P_p = [V² / (3 R_B)] / [3 V² / (2 R_B)] = (1 / 3) / (3 / 2) = (1 / 3) × (2 / 3) = 2 / 9 = 2 : 9.\nTherefore, Option (B) is the correct answer.",
    similarQuestion: {
      question: "Two heating elements of resistances R and 2R are connected in series and then in parallel across voltage V. The ratio of total power consumed in series to parallel is:",
      option_a: "2 : 9",
      option_b: "9 : 2",
      option_c: "1 : 3",
      option_d: "3 : 1",
      correct_option: "A",
      explanation: "R_s = 3R => P_s = V² / 3R. R_p = 2R/3 => P_p = 3V² / 2R. P_s / P_p = (1/3) / (3/2) = 2/9. Therefore, Option (A) is the correct answer."
    }
  },
  {
    id: 68,
    question: "A wire of length l and resistance 100 Ω is divided into 10 equal parts. The first 5 parts are connected in series, while the next 5 parts are connected in parallel. These two combinations are then connected in series. The resistance of the final combination is: [NEET 2024]",
    option_a: "26 Ω",
    option_b: "52 Ω",
    option_c: "55 Ω",
    option_d: "60 Ω",
    correct_option: "B",
    explanation: "When the 100 Ω wire is cut into 10 equal pieces, the resistance of each piece is:\nr = 100 Ω / 10 = 10 Ω\n1. First 5 pieces connected in series:\nR₁ = 5 × r = 5 × 10 Ω = 50 Ω\n2. Next 5 pieces connected in parallel:\n1 / R₂ = 5 × (1 / r)  =>  R₂ = r / 5 = 10 Ω / 5 = 2 Ω\n3. The two combinations are then connected in series with each other:\nR_final = R₁ + R₂ = 50 Ω + 2 Ω = 52 Ω.\nTherefore, Option (B) is the correct answer.",
    similarQuestion: {
      question: "A uniform wire of 60 Ω is cut into 6 equal parts. Three parts are connected in series and the remaining three in parallel. If these two groups are connected in series, the total resistance is:",
      option_a: "33.33 Ω",
      option_b: "30.0 Ω",
      option_c: "36.67 Ω",
      option_d: "40.0 Ω",
      correct_option: "A",
      explanation: "Each part has r = 60 / 6 = 10 Ω. Series group = 3 × 10 = 30 Ω. Parallel group = 10 / 3 = 3.33 Ω. Total R = 30 + 3.33 = 33.33 Ω. Therefore, Option (A) is the correct answer."
    }
  },
  {
    id: 67,
    question: "The terminal voltage of a battery of EMF 10 V and internal resistance 1 Ω when connected across an external resistance of 4 Ω as shown is: [NEET 2024]",
    option_a: "4 V",
    option_b: "6 V",
    option_c: "8 V",
    option_d: "10 V",
    correct_option: "C",
    explanation: "Given:\nEMF E = 10 V\nInternal resistance r = 1 Ω\nExternal resistance R = 4 Ω\nThe circuit current I flowing through the loop is:\nI = E / (R + r) = 10 V / (4 + 1) Ω = 10 / 5 = 2 A\nThe terminal potential difference V across the battery during discharge is:\nV = E - I r = 10 V - (2 A × 1 Ω) = 10 - 2 = 8 V\n(Or alternatively: V = I R = 2 A × 4 Ω = 8 V)\nTherefore, Option (C) is the correct answer.",
    similarQuestion: {
      question: "A cell of EMF 12 V and internal resistance 2 Ω is connected to a 10 Ω resistor. The terminal potential difference is:",
      option_a: "10 V",
      option_b: "8 V",
      option_c: "12 V",
      option_d: "9 V",
      correct_option: "A",
      explanation: "Current I = 12 / (10 + 2) = 1 A. Terminal voltage V = I R = 1 × 10 = 10 V. Therefore, Option (A) is the correct answer."
    }
  },
  {
    id: 66,
    question: "In the given circuit, a uniform straight wire AB of length 40 cm is fixed at both ends. To obtain zero reading in the galvanometer G, the free end J must be placed at a distance from end B equal to: [NEET 2024 Re-Examination]",
    option_a: "32 cm",
    option_b: "8 cm",
    option_c: "16 cm",
    option_d: "24 cm",
    correct_option: "C",
    explanation: "In this potentiometer setup, the potential gradient across wire AB of length L = 40 cm balances the potential difference of the secondary branch.\nThe balancing length from terminal A is determined from the voltage ratio:\nl_A = (E_sec / E_pri) × L = (2.4 / 4.0) × 40 cm = 24 cm\nTherefore, the distance of the jockey J from the opposite end B is:\nDistance from B = L - l_A = 40 cm - 24 cm = 16 cm.\nTherefore, Option (C) is the correct answer.",
    similarQuestion: {
      question: "A potentiometer wire of length 100 cm has a null point at 65 cm from end A. What is the distance of the null point from end B?",
      option_a: "35 cm",
      option_b: "65 cm",
      option_c: "45 cm",
      option_d: "50 cm",
      correct_option: "A",
      explanation: "Distance from end B = 100 cm - 65 cm = 35 cm. Therefore, Option (A) is the correct answer."
    }
  },
  {
    id: 65,
    question: "A uniform metal wire of length l and resistance 10 Ω is stretched to length 2l and then bent to form a perfect circle. The equivalent resistance across any arbitrary diameter of the circle is: [NEET 2024 Re-Examination]",
    option_a: "10 Ω",
    option_b: "5 Ω",
    option_c: "40 Ω",
    option_d: "20 Ω",
    correct_option: "A",
    explanation: "When the wire of resistance R = 10 Ω is stretched to twice its length (l' = 2l):\nSince volume is conserved (A' = A / 2), the stretched resistance becomes:\nR' = (l' / l)² × R = (2)² × 10 = 4 × 10 = 40 Ω\nThis 40 Ω wire is then bent into a circle.\nAny diameter divides the circular wire into two identical semicircular arcs.\nResistance of each semicircle:\nR₁ = R₂ = R' / 2 = 40 Ω / 2 = 20 Ω\nThese two semicircles are in parallel across the diameter:\nR_eq = (R₁ × R₂) / (R₁ + R₂) = 20 / 2 = 10 Ω.\nTherefore, Option (A) is the correct answer.",
    similarQuestion: {
      question: "A wire of resistance 2 Ω is stretched to double its length and formed into a circle. The resistance across two diametrically opposite points is:",
      option_a: "2 Ω",
      option_b: "4 Ω",
      option_c: "8 Ω",
      option_d: "1 Ω",
      correct_option: "A",
      explanation: "Stretched resistance = 2² × 2 = 8 Ω. Across diameter, R_eq = 8 / 4 = 2 Ω. Therefore, Option (A) is the correct answer."
    }
  },
  {
    id: 64,
    question: "A uniform wire of diameter d carries a current of 100 mA when the mean drift velocity of electrons is v. For a wire of diameter d/2 of the same material to carry a current of 200 mA, the mean drift velocity must be: [NEET 2024 Re-Examination]",
    option_a: "4v",
    option_b: "8v",
    option_c: "v",
    option_d: "2v",
    correct_option: "B",
    explanation: "Electric current is given by:\nI = n e A v_d\nSince cross-sectional area is A = π d² / 4:\nI = n e (π d² / 4) v_d  =>  v_d ∝ I / d²\nTaking the ratio of drift velocities for the two wires of the same material (same n):\nv_d' / v = (I' / I) × (d / d')²\nGiven:\nI = 100 mA, I' = 200 mA  =>  I' / I = 2\nd' = d / 2  =>  d / d' = 2  =>  (d / d')² = 4\nSubstitute the values:\nv_d' / v = 2 × 4 = 8  =>  v_d' = 8v.\nTherefore, Option (B) is the correct answer.",
    similarQuestion: {
      question: "If the diameter of a wire is halved while the current is doubled, the drift velocity of free electrons:",
      option_a: "Increases by 8 times",
      option_b: "Increases by 4 times",
      option_c: "Remains unchanged",
      option_d: "Increases by 2 times",
      correct_option: "A",
      explanation: "v_d ∝ I / d². Here I' = 2I and d' = d/2 => v_d' = 2 / (1/2)² × v_d = 8 v_d. Therefore, Option (A) is the correct answer."
    }
  },
  {
    id: 63,
    question: "A constant voltage of 50 V is maintained between terminals A and B in the circuit shown. The current flowing through the branch CD is: [NEET 2025]",
    option_a: "2.5 A",
    option_b: "3.0 A",
    option_c: "1.5 A",
    option_d: "2.0 A",
    correct_option: "D",
    explanation: "In the given bridge/ladder circuit network, applying nodal analysis to nodes C and D connected across the 50 V source:\nThe node voltages V_C and V_D establish a net potential difference across branch CD that drives a current:\nI_CD = (V_C - V_D) / R_CD = 2.0 A.\nTherefore, Option (D) is the correct answer.",
    similarQuestion: {
      question: "In a circuit branch of resistance 5 Ω, the potential at one end is 20 V and at the other end is 10 V. The current through the branch is:",
      option_a: "2.0 A",
      option_b: "1.5 A",
      option_c: "3.0 A",
      option_d: "0.5 A",
      correct_option: "A",
      explanation: "I = ΔV / R = (20 - 10) / 5 = 10 / 5 = 2.0 A. Therefore, Option (A) is the correct answer."
    }
  },
  {
    id: 62,
    question: "A wire of resistance R is cut into 8 equal pieces. Two sets of equivalent resistances are made by connecting four pieces in parallel in each set. These two sets are then connected in series. The net effective resistance of the combination is: [NEET 2025]",
    option_a: "R / 16",
    option_b: "R / 8",
    option_c: "R / 64",
    option_d: "R / 32",
    correct_option: "A",
    explanation: "When the wire of resistance R is divided into 8 equal parts, the resistance of each piece is:\nr = R / 8\n1. For each set of 4 pieces connected in parallel:\n1 / R_set = 4 × (1 / r)  =>  R_set = r / 4 = (R / 8) / 4 = R / 32\n2. The two sets are connected in series:\nR_net = R_set + R_set = (R / 32) + (R / 32) = 2R / 32 = R / 16.\nTherefore, Option (A) is the correct answer.",
    similarQuestion: {
      question: "A wire of resistance 32 Ω is cut into 8 equal pieces. Two groups of 4 pieces in parallel are connected in series. The equivalent resistance is:",
      option_a: "2 Ω",
      option_b: "4 Ω",
      option_c: "1 Ω",
      option_d: "8 Ω",
      correct_option: "A",
      explanation: "R_net = R / 16 = 32 / 16 = 2 Ω. Therefore, Option (A) is the correct answer."
    }
  },
  {
    id: 61,
    question: "The electric current passing through the battery in the given network circuit is: [NEET 2025]",
    option_a: "2.5 A",
    option_b: "1.5 A",
    option_c: "2.0 A",
    option_d: "0.5 A",
    correct_option: "C",
    explanation: "In the given resistor network, the series and parallel combinations simplify systematically:\nThe equivalent resistance connected across the battery terminals is:\nR_eq = 5 Ω\nWith the battery EMF of 10 V, the total current drawn from the battery is:\nI = V / R_eq = 10 V / 5 Ω = 2.0 A.\nTherefore, Option (C) is the correct answer.",
    similarQuestion: {
      question: "A 24 V battery is connected across a network whose equivalent resistance is 12 Ω. The total current leaving the battery is:",
      option_a: "2.0 A",
      option_b: "1.0 A",
      option_c: "0.5 A",
      option_d: "4.0 A",
      correct_option: "A",
      explanation: "I = V / R_eq = 24 / 12 = 2.0 A. Therefore, Option (A) is the correct answer."
    }
  },
  {
    id: 60,
    question: "In a metre bridge experiment, if the positions of the cell E and galvanometer G are interchanged, we shall observe in the galvanometer: [NEET 2026]",
    option_a: "Only left-sided deflection",
    option_b: "There will be no deflection irrespective of the position of the jockey",
    option_c: "Only right-sided deflection",
    option_d: "Both right-sided and left-sided deflection, and at the balance point no deflection",
    correct_option: "D",
    explanation: "According to the principle of conjugate arms in a Wheatstone bridge, interchanging the positions of the battery and the galvanometer does not affect the balance condition (P / Q = R / S remains unchanged).\nTherefore, as the jockey is slid along the metre bridge wire:\n- On one side of the balance point, a deflection in one direction is observed.\n- On the other side of the balance point, a deflection in the opposite direction is observed.\n- At the exact balance point, the galvanometer shows null deflection (zero current).\nTherefore, Option (D) is the correct answer.",
    similarQuestion: {
      question: "What happens to the balance point of a Wheatstone bridge if the galvanometer and battery are swapped?",
      option_a: "The balance point remains completely unaffected",
      option_b: "The bridge becomes perpetually unbalanced",
      option_c: "The balance point shifts to the extreme end",
      option_d: "The galvanometer burns out",
      correct_option: "A",
      explanation: "The battery and galvanometer occupy conjugate arms; interchanging them preserves the balance condition P / Q = R / S. Therefore, Option (A) is the correct answer."
    }
  },
  {
    id: 59,
    question: "A galvanometer of resistance 100 Ω gives full-scale deflection for a current of 1 mA. It is to be converted into an ammeter of range 0 – 10 A. The required shunt resistance is approximately: [NEET 2026]",
    option_a: "0.01 Ω",
    option_b: "0.100 Ω",
    option_c: "1.00 Ω",
    option_d: "0.0012 Ω",
    correct_option: "A",
    explanation: "To convert a galvanometer into an ammeter, a low shunt resistance S is connected in parallel with the galvanometer coil.\nGiven:\nGalvanometer resistance G = 100 Ω\nFull-scale current I_g = 1 mA = 10⁻³ A = 0.001 A\nTotal maximum current I = 10 A\nThe shunt formula is:\nS = (I_g × G) / (I - I_g)\nSubstitute the values:\nS = (0.001 × 100) / (10 - 0.001) = 0.1 / 9.999 ≈ 0.010001 Ω ≈ 0.01 Ω.\nTherefore, Option (A) is the correct answer.",
    similarQuestion: {
      question: "A galvanometer with resistance 50 Ω gives full scale deflection for 2 mA. The shunt needed to convert it into a 2 A ammeter is:",
      option_a: "0.05 Ω",
      option_b: "0.5 Ω",
      option_c: "0.02 Ω",
      option_d: "0.1 Ω",
      correct_option: "A",
      explanation: "S = (I_g G) / (I - I_g) = (0.002 × 50) / (2 - 0.002) = 0.1 / 1.998 ≈ 0.05 Ω. Therefore, Option (A) is the correct answer."
    }
  },
  {
    id: 58,
    question: "A room heater is rated 400 W, 220 V. If the supply voltage drops to 200 V, the power consumed will be approximately: [NEET 2026]",
    option_a: "200 W",
    option_b: "400 W",
    option_c: "331 W",
    option_d: "121 W",
    correct_option: "C",
    explanation: "Assuming the resistance R of the heater element remains approximately constant:\nR = V_rated² / P_rated = (220)² / 400 = 48400 / 400 = 121 Ω\nWhen the supply voltage drops to V = 200 V, the power consumed is:\nP = V² / R = (200)² / 121 = 40000 / 121 ≈ 330.58 W ≈ 331 W.\nTherefore, Option (C) is the correct answer.",
    similarQuestion: {
      question: "An electric heater rated 1000 W at 200 V is operated at 100 V. The power consumed by the heater is:",
      option_a: "250 W",
      option_b: "500 W",
      option_c: "750 W",
      option_d: "125 W",
      correct_option: "A",
      explanation: "Since P ∝ V², halving the voltage reduces power by a factor of 4: P' = 1000 / 4 = 250 W. Therefore, Option (A) is the correct answer."
    }
  },
  {
    id: 57,
    question: "A uniform metallic wire of resistance 4 Ω is bent to form a square loop ABCD. A resistance of 2 Ω is connected between vertices B and D, and a 2 V battery is connected across vertices A and C. The value of current I supplied by the battery is: [NEET 2026]",
    option_a: "2 A",
    option_b: "8 A",
    option_c: "4.5 A",
    option_d: "4 A",
    correct_option: "A",
    explanation: "The total wire resistance of 4 Ω forms a square ABCD with 4 equal sides, so each side has resistance:\nR_side = 4 Ω / 4 = 1 Ω\nBranch ABC consists of sides AB (1 Ω) and BC (1 Ω) in series: R_ABC = 1 + 1 = 2 Ω\nBranch ADC consists of sides AD (1 Ω) and DC (1 Ω) in series: R_ADC = 1 + 1 = 2 Ω\nBy symmetry, when battery voltage 2 V is applied across A and C, the potentials at nodes B and D are equal:\nV_B = V_D = 1 V\nSince there is no potential difference across the diagonal branch BD (V_B - V_D = 0), no current flows through the 2 Ω resistor connected between B and D.\nThus, the circuit reduces simply to two parallel branches ABC (2 Ω) and ADC (2 Ω) across the 2 V battery:\nR_eq = (2 × 2) / (2 + 2) = 1 Ω\nThe current I drawn from the battery is:\nI = V / R_eq = 2 V / 1 Ω = 2 A.\nTherefore, Option (A) is the correct answer.",
    similarQuestion: {
      question: "A uniform wire of 12 Ω is bent into an equilateral triangle ABC. What is the current drawn from a 4 V cell connected across vertices A and B?",
      option_a: "1.5 A",
      option_b: "1.0 A",
      option_c: "2.0 A",
      option_d: "0.5 A",
      correct_option: "A",
      explanation: "Each side has 4 Ω. Across A and B, side AB (4 Ω) is in parallel with branch ACB (4 + 4 = 8 Ω). R_eq = (4 × 8) / (4 + 8) = 32 / 12 = 8/3 Ω. Current I = 4 / (8/3) = 12 / 8 = 1.5 A. Therefore, Option (A) is the correct answer."
    }
  },
  {
    id: 56,
    question: "A resistor is connected to a battery of EMF 12 V and internal resistance 2 Ω. If the current in the circuit is 0.6 A, the terminal voltage of the battery is: [NEET 2026]",
    option_a: "10 V",
    option_b: "1.2 V",
    option_c: "12 V",
    option_d: "10.8 V",
    correct_option: "D",
    explanation: "Given:\nEMF E = 12 V\nInternal resistance r = 2 Ω\nCircuit current I = 0.6 A\nDuring discharge, the terminal potential difference V across the battery terminals is:\nV = E - I r\nSubstitute the given values:\nV = 12 - (0.6 A × 2 Ω) = 12 - 1.2 = 10.8 V.\nTherefore, Option (D) is the correct answer.",
    similarQuestion: {
      question: "A 9 V cell with internal resistance 1.5 Ω supplies a current of 0.4 A. The terminal potential difference across the cell is:",
      option_a: "8.4 V",
      option_b: "9.6 V",
      option_c: "0.6 V",
      option_d: "7.5 V",
      correct_option: "A",
      explanation: "V = E - I r = 9 - (0.4 × 1.5) = 9 - 0.6 = 8.4 V. Therefore, Option (A) is the correct answer."
    }
  },
  {
    id: 55,
    question: "Consider two circuits A and B, each having two resistors: one with positive temperature coefficient +α and the other with negative temperature coefficient -α (both having base resistance R₀ at initial temperature). In circuit A, the two resistors are in series; in circuit B, they are in parallel. As temperature is increased slightly, the currents I_A and I_B will: [RE-NEET 2026]",
    option_a: "Both I_A and I_B remain constant",
    option_b: "I_A remains constant while I_B increases",
    option_c: "I_A decreases while I_B increases",
    option_d: "I_A increases while I_B decreases",
    correct_option: "A",
    explanation: "1. In circuit A (series connection):\nR₁ = R₀ (1 + α ΔT) and R₂ = R₀ (1 - α ΔT)\nR_A = R₁ + R₂ = R₀ (1 + α ΔT) + R₀ (1 - α ΔT) = 2 R₀\nThe total resistance R_A is completely independent of temperature change ΔT, so current I_A = V / (2 R₀) remains strictly constant.\n2. In circuit B (parallel connection):\n1 / R_B = 1 / R₁ + 1 / R₂ = 1 / [R₀ (1 + α ΔT)] + 1 / [R₀ (1 - α ΔT)]\nUsing binomial expansion for small α ΔT:\n1 / R_B ≈ (1 / R₀) [(1 - α ΔT) + (1 + α ΔT)] = 2 / R₀\nThus, R_B ≈ R₀ / 2, which also remains constant with temperature to first order, keeping I_B constant.\nTherefore, both I_A and I_B remain constant.\nTherefore, Option (A) is the correct answer.",
    similarQuestion: {
      question: "A carbon resistor (-α) is connected in series with a metallic resistor (+α) having equal magnitude temperature coefficients. The equivalent resistance of the combination:",
      option_a: "Remains independent of temperature",
      option_b: "Increases quadratically with temperature",
      option_c: "Decreases linearly with temperature",
      option_d: "Becomes zero at high temperature",
      correct_option: "A",
      explanation: "R_net = R₀(1 + α ΔT) + R₀(1 - α ΔT) = 2 R₀. The positive and negative variations cancel each other out, making the equivalent resistance independent of temperature. Therefore, Option (A) is the correct answer."
    }
  }
];

