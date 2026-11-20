// Chapter 112: Current Electricity - Part 2 (Q39 to Q77, IDs 131 to 93)
module.exports = [
  {
    id: 131,
    question: "Consider the following two statements:\n(A) Kirchhoff's junction law follows from the conservation of electric charge.\n(B) Kirchhoff's loop law follows from the conservation of energy.\nWhich of the following is correct? [AIPMT 2010 Prelims]",
    option_a: "Both (A) and (B) are wrong",
    option_b: "(A) is correct and (B) is wrong",
    option_c: "(A) is wrong and (B) is correct",
    option_d: "Both (A) and (B) are correct",
    correct_option: "D",
    explanation: "1. Statement (A): Kirchhoff's junction law (current law, Σ I = 0) states that the total current entering a junction equals the total current leaving it. Since electric charge cannot accumulate at a junction under steady state conditions, it is a direct statement of conservation of electric charge. Thus, statement (A) is correct.\n2. Statement (B): Kirchhoff's loop law (voltage law, Σ ΔV = 0) states that the sum of all potential differences in a closed loop is zero. Since electric potential is work done per unit charge and electrostatic forces are conservative, the net energy change of a unit charge traversing a complete closed loop must be zero. This is a direct statement of conservation of energy. Thus, statement (B) is correct.\nTherefore, both (A) and (B) are correct.\nTherefore, Option (D) is the correct answer.",
    similarQuestion: {
      question: "Which of the following physical principles serves as the foundation for Kirchhoff's first law (junction rule)?",
      option_a: "Conservation of electric charge",
      option_b: "Conservation of energy",
      option_c: "Conservation of linear momentum",
      option_d: "Conservation of angular momentum",
      correct_option: "A",
      explanation: "Kirchhoff's first law states that the rate at which charge enters a node must equal the rate at which it leaves, which is based directly on the principle of conservation of electric charge. Therefore, Option (A) is the correct answer."
    }
  },
  {
    id: 130,
    question: "If the power dissipated in the 9 Ω resistor in the circuit shown is 36 W, the potential difference across the 2 Ω resistor is: [AIPMT 2011 Prelims]",
    option_a: "4 V",
    option_b: "8 V",
    option_c: "10 V",
    option_d: "2 V",
    correct_option: "C",
    explanation: "In the circuit network, the 9 Ω resistor is in parallel with a 6 Ω resistor, and this parallel combination is connected in series with the 2 Ω resistor.\nFor the 9 Ω resistor:\nP = V_p² / 9 = 36 W  =>  V_p² = 324  =>  V_p = 18 V\nSince the 9 Ω and 6 Ω resistors are in parallel, the potential difference across both is V_p = 18 V.\nCurrent through 9 Ω resistor: I₁ = 18 / 9 = 2 A\nCurrent through 6 Ω resistor: I₂ = 18 / 6 = 3 A\nTotal main circuit current passing through the 2 Ω series resistor is:\nI = I₁ + I₂ = 2 + 3 = 5 A\nThe potential difference across the 2 Ω resistor is:\nV₂ = I × R = 5 A × 2 Ω = 10 V.\nTherefore, Option (C) is the correct answer.",
    similarQuestion: {
      question: "In a circuit, a 12 Ω resistor and a 4 Ω resistor are in parallel, connected in series with a 3 Ω resistor. If 48 W is dissipated in the 12 Ω resistor, the potential difference across the 3 Ω resistor is:",
      option_a: "24 V",
      option_b: "12 V",
      option_c: "18 V",
      option_d: "36 V",
      correct_option: "A",
      explanation: "P₁₂ = V² / 12 = 48 => V² = 576 => V = 24 V. Current in 12 Ω is 24 / 12 = 2 A; current in 4 Ω is 24 / 4 = 6 A. Total current I = 2 + 6 = 8 A. Potential difference across 3 Ω is V = 8 × 3 = 24 V. Therefore, Option (A) is the correct answer."
    }
  },
  {
    id: 129,
    question: "A current of 2 A flows through a 2 Ω resistor when connected across a battery. The same battery supplies a current of 0.5 A when connected across a 9 Ω resistor. The internal resistance of the battery is: [AIPMT 2011 Prelims]",
    option_a: "0.5 Ω",
    option_b: "1/3 Ω",
    option_c: "1/4 Ω",
    option_d: "1 Ω",
    correct_option: "B",
    explanation: "Let the battery have EMF E and internal resistance r.\nThe current supplied to an external resistor R is:\nI = E / (R + r)  =>  E = I (R + r)\nCase 1: When R₁ = 2 Ω and I₁ = 2 A:\nE = 2 (2 + r) = 4 + 2r   ...(Equation 1)\nCase 2: When R₂ = 9 Ω and I₂ = 0.5 A:\nE = 0.5 (9 + r) = 4.5 + 0.5r   ...(Equation 2)\nEquating (1) and (2):\n4 + 2r = 4.5 + 0.5r\n2r - 0.5r = 4.5 - 4\n1.5r = 0.5\nr = 0.5 / 1.5 = 1/3 Ω.\nTherefore, Option (B) is the correct answer.",
    similarQuestion: {
      question: "A battery supplies a current of 1 A through an external resistor of 5 Ω, and a current of 0.6 A through an external resistor of 9 Ω. The internal resistance of the battery is:",
      option_a: "1.0 Ω",
      option_b: "0.5 Ω",
      option_c: "2.0 Ω",
      option_d: "1.5 Ω",
      correct_option: "A",
      explanation: "E = 1(5 + r) = 5 + r, and E = 0.6(9 + r) = 5.4 + 0.6r. Equating: 5 + r = 5.4 + 0.6r => 0.4r = 0.4 => r = 1.0 Ω. Therefore, Option (A) is the correct answer."
    }
  },
  {
    id: 128,
    question: "A thermocouple of negligible resistance produces an EMF of 40 μV/°C in the linear range of temperature. A galvanometer of resistance 10 Ω and sensitivity 1 μA/division is used with the thermocouple. The smallest temperature difference that can be detected by this setup is: [AIPMT 2011 Mains]",
    option_a: "1 °C",
    option_b: "0.5 °C",
    option_c: "0.1 °C",
    option_d: "0.25 °C",
    correct_option: "D",
    explanation: "The minimum current that the galvanometer can detect is one division:\nI_min = 1 μA = 10⁻⁶ A\nThe resistance of the galvanometer is G = 10 Ω.\nSince thermocouple resistance is negligible, the minimum voltage detectable across the galvanometer is:\nV_min = I_min × G = 10⁻⁶ A × 10 Ω = 10 × 10⁻⁶ V = 10 μV\nThe thermoelectric EMF per degree Celsius is:\nS = 40 μV/°C\nTherefore, the smallest detectable temperature difference ΔT_min is:\nΔT_min = V_min / S = 10 μV / (40 μV/°C) = 1/4 °C = 0.25 °C.\nTherefore, Option (D) is the correct answer.",
    similarQuestion: {
      question: "A thermocouple generates 50 μV/°C. A galvanometer of resistance 20 Ω and current sensitivity 1 μA/division is connected to it. The smallest temperature change it can measure is:",
      option_a: "0.4 °C",
      option_b: "0.2 °C",
      option_c: "0.5 °C",
      option_d: "1.0 °C",
      correct_option: "A",
      explanation: "Minimum voltage V_min = 1 μA × 20 Ω = 20 μV. ΔT_min = 20 μV / (50 μV/°C) = 0.4 °C. Therefore, Option (A) is the correct answer."
    }
  },
  {
    id: 127,
    question: "In the circuit shown in the figure, if the potential at point A is taken to be zero (V_A = 0), the potential at point B (V_B) is: [AIPMT 2011 Mains]",
    option_a: "+1 V",
    option_b: "-1 V",
    option_c: "+2 V",
    option_d: "-2 V",
    correct_option: "B",
    explanation: "Let us trace the path from node A to node B using Kirchhoff's potential loop analysis.\nIn the branch, moving in the direction from A to B:\nNet loop current and potential drops across the 1 Ω and 2 Ω resistors combined with the 2 V and 3 V opposing EMF sources establish:\nV_A - 1(1) - 2 + 2(1) = V_B\nWith V_A = 0 V:\n0 - 1 = V_B  =>  V_B = -1 V.\nTherefore, Option (B) is the correct answer.",
    similarQuestion: {
      question: "Moving along a branch from point X to point Y, one traverses a 3 V battery from positive to negative terminal and a 2 Ω resistor carrying 1 A current in the direction of traversal. If V_X = 10 V, then V_Y is:",
      option_a: "5 V",
      option_b: "7 V",
      option_c: "9 V",
      option_d: "3 V",
      correct_option: "A",
      explanation: "V_X - 3 - (1 × 2) = V_Y => 10 - 3 - 2 = V_Y => V_Y = 5 V. Therefore, Option (A) is the correct answer."
    }
  },
  {
    id: 126,
    question: "If the voltage across a bulb rated 220 V, 100 W drops by 2.5% of its rated value, the percentage by which the power decreases from its rated value is: [AIPMT 2012 Prelims]",
    option_a: "20%",
    option_b: "2.5%",
    option_c: "5%",
    option_d: "10%",
    correct_option: "C",
    explanation: "The power consumed by a bulb of constant resistance R is:\nP = V² / R\nTaking the natural logarithm on both sides:\nln P = 2 ln V - ln R\nDifferentiating with respect to voltage V (assuming filament resistance R remains constant for small changes):\nΔP / P ≈ 2 (ΔV / V)\nGiven that the voltage drops by 2.5%:\n(ΔV / V) × 100 = 2.5%\nTherefore, the fractional decrease in power is:\n(ΔP / P) × 100 ≈ 2 × 2.5% = 5%.\nTherefore, Option (C) is the correct answer.",
    similarQuestion: {
      question: "The voltage across an electric heating resistor drops by 1.5%. The percentage decrease in power consumed is approximately:",
      option_a: "3.0%",
      option_b: "1.5%",
      option_c: "2.25%",
      option_d: "4.5%",
      correct_option: "A",
      explanation: "Since P = V² / R, for small changes %ΔP = 2 × %ΔV = 2 × 1.5% = 3.0%. Therefore, Option (A) is the correct answer."
    }
  },
  {
    id: 125,
    question: "A ring is made of a wire having resistance R₀ = 12 Ω. Find the points A and B as shown in the figure at which a current-carrying conductor should be connected so that the resistance R of the subcircuit between these points is equal to 8/3 Ω: [AIPMT 2012 Prelims]",
    option_a: "l₁ / l₂ = 5/8",
    option_b: "l₁ / l₂ = 1/3",
    option_c: "l₁ / l₂ = 3/8",
    option_d: "l₁ / l₂ = 1/2",
    correct_option: "D",
    explanation: "Let the points A and B divide the circular wire of total resistance R₀ = 12 Ω into two arcs of lengths l₁ and l₂ with resistances R₁ and R₂ respectively.\nSince total resistance is 12 Ω:\nR₁ + R₂ = 12 Ω   ...(Equation 1)\nThe two arcs are connected in parallel between points A and B, so their equivalent resistance is:\nR = (R₁ × R₂) / (R₁ + R₂) = 8/3 Ω\nSubstitute R₁ + R₂ = 12:\n(R₁ × R₂) / 12 = 8/3\nR₁ × R₂ = 12 × (8/3) = 32 Ω²   ...(Equation 2)\nSolving Equations (1) and (2) for R₁ and R₂:\n(R₁ - R₂)² = (R₁ + R₂)² - 4 R₁ R₂ = (12)² - 4(32) = 144 - 128 = 16\nR₁ - R₂ = 4 Ω\nAdding with R₁ + R₂ = 12 gives:\n2 R₁ = 16  =>  R₁ = 8 Ω (or 4 Ω), and R₂ = 4 Ω (or 8 Ω)\nSince resistance is directly proportional to length for a uniform wire:\nl₁ / l₂ = R₁ / R₂ = 4 / 8 = 1/2.\nTherefore, Option (D) is the correct answer.",
    similarQuestion: {
      question: "A uniform circular wire of resistance 20 Ω has two contact points dividing it into two arcs. The equivalent resistance across the points is 4.8 Ω. The ratio of the shorter arc length to the longer arc length is:",
      option_a: "2 : 3",
      option_b: "1 : 4",
      option_c: "1 : 2",
      option_d: "3 : 5",
      correct_option: "A",
      explanation: "R₁ + R₂ = 20, and (R₁ R₂) / 20 = 4.8 => R₁ R₂ = 96. Solving: R₁ = 8 Ω and R₂ = 12 Ω. Ratio l₁ / l₂ = 8 / 12 = 2/3. Therefore, Option (A) is the correct answer."
    }
  },
  {
    id: 124,
    question: "In the circuit shown, the cells A and B have negligible internal resistance. For V_A = 12 V, R₁ = 500 Ω, and R = 100 Ω, the galvanometer G shows no deflection. The value of V_B is: [AIPMT 2012 Prelims]",
    option_a: "4 V",
    option_b: "2 V",
    option_c: "12 V",
    option_d: "6 V",
    correct_option: "B",
    explanation: "The primary circuit consists of cell V_A = 12 V in series with resistors R₁ = 500 Ω and R = 100 Ω.\nThe current I flowing through the primary circuit is:\nI = V_A / (R₁ + R) = 12 / (500 + 100) = 12 / 600 = 0.02 A\nThe potential difference across resistor R is:\nV_R = I × R = 0.02 A × 100 Ω = 2 V\nThe secondary circuit contains cell V_B connected in opposition across resistor R with a galvanometer G.\nWhen the galvanometer shows null deflection (zero current), the EMF of cell B must exactly balance the potential difference across resistor R:\nV_B = V_R = 2 V.\nTherefore, Option (B) is the correct answer.",
    similarQuestion: {
      question: "A 10 V battery is connected in series with a 40 Ω and a 10 Ω resistor. A cell connected across the 10 Ω resistor produces zero galvanometer deflection in a potentiometer setup. The EMF of the cell is:",
      option_a: "2 V",
      option_b: "1 V",
      option_c: "5 V",
      option_d: "4 V",
      correct_option: "A",
      explanation: "Current in primary loop = 10 / (40 + 10) = 0.2 A. Potential across 10 Ω = 0.2 × 10 = 2 V. For null deflection, EMF = 2 V. Therefore, Option (A) is the correct answer."
    }
  },
  {
    id: 123,
    question: "The power dissipated in the circuit shown in the figure is 30 W. The value of R is: [AIPMT 2012 Mains]",
    option_a: "20 Ω",
    option_b: "15 Ω",
    option_c: "10 Ω",
    option_d: "30 Ω",
    correct_option: "C",
    explanation: "The circuit is powered by a 10 V source and consists of resistor R in parallel with a 5 Ω resistor.\nThe total power dissipated by the circuit is:\nP = V² / R_eq = 30 W\nSubstitute V = 10 V:\n(10)² / R_eq = 30  =>  100 / R_eq = 30  =>  R_eq = 100 / 30 = 10/3 Ω\nFor two resistors R and 5 Ω in parallel:\n1 / R_eq = 1 / R + 1 / 5\n3 / 10 = 1 / R + 2 / 10\n1 / R = 3 / 10 - 2 / 10 = 1 / 10\nR = 10 Ω.\nTherefore, Option (C) is the correct answer.",
    similarQuestion: {
      question: "A 12 V battery delivers 36 W of power to a parallel combination of a 6 Ω resistor and an unknown resistor R. The value of R is:",
      option_a: "12 Ω",
      option_b: "6 Ω",
      option_c: "4 Ω",
      option_d: "8 Ω",
      correct_option: "A",
      explanation: "R_eq = V² / P = (12)² / 36 = 144 / 36 = 4 Ω. 1/R_eq = 1/6 + 1/R => 1/4 - 1/6 = 1/12 => R = 12 Ω. Therefore, Option (A) is the correct answer."
    }
  },
  {
    id: 122,
    question: "A cell having EMF ε and internal resistance r is connected across a variable external resistance R. As resistance R is increased, the plot of potential difference V across R is given by: [AIPMT 2012 Mains]",
    option_a: "A graph decreasing exponentially",
    option_b: "A linear graph decreasing to zero",
    option_c: "A graph starting from zero and asymptotically approaching ε",
    option_d: "A straight line passing through the origin",
    correct_option: "C",
    explanation: "The current I supplied by the cell of EMF ε and internal resistance r through an external resistance R is:\nI = ε / (R + r)\nThe terminal potential difference V across R is:\nV = I R = ε R / (R + r) = ε / [1 + (r / R)]\nAnalyzing this function:\n1. When R = 0 (short circuit): V = 0\n2. As R increases, the term (r / R) decreases, so [1 + (r / R)] decreases towards 1, which means V increases.\n3. As R -> ∞ (open circuit): V -> ε / [1 + 0] = ε\nThus, the curve starts at the origin (0, 0), rises smoothly, and asymptotically approaches the horizontal line V = ε.\nTherefore, Option (C) is the correct answer.",
    similarQuestion: {
      question: "When a cell of EMF E and internal resistance r is connected to an infinite external resistance (open circuit), its terminal potential difference is:",
      option_a: "E",
      option_b: "0",
      option_c: "E / 2",
      option_d: "Infinity",
      correct_option: "A",
      explanation: "In an open circuit, current I = 0, so the internal potential drop Ir = 0. The terminal voltage V = E - Ir = E. Therefore, Option (A) is the correct answer."
    }
  },
  {
    id: 121,
    question: "A wire of resistance 4 Ω is stretched to twice its original length. The resistance of the stretched wire will be: [NEET 2013]",
    option_a: "8 Ω",
    option_b: "16 Ω",
    option_c: "2 Ω",
    option_d: "4 Ω",
    correct_option: "B",
    explanation: "When a wire of length L and cross-sectional area A is stretched, its volume V = A × L remains constant.\nWhen length is doubled:\nL' = 2 L\nSince volume is constant:\nA' L' = A L  =>  A' = A (L / L') = A / 2\nThe new resistance R' is:\nR' = ρ L' / A' = ρ (2 L) / (A / 2) = 4 (ρ L / A) = 4 R\nGiven initial resistance R = 4 Ω:\nR' = 4 × 4 = 16 Ω.\nTherefore, Option (B) is the correct answer.",
    similarQuestion: {
      question: "A wire of resistance 5 Ω is drawn out such that its length increases to 3 times its initial length. The new resistance is:",
      option_a: "45 Ω",
      option_b: "15 Ω",
      option_c: "25 Ω",
      option_d: "50 Ω",
      correct_option: "A",
      explanation: "When stretched n times, R' = n² R. Here n = 3, so R' = (3)² × 5 = 9 × 5 = 45 Ω. Therefore, Option (A) is the correct answer."
    }
  },
  {
    id: 120,
    question: "The internal resistance of a 2.1 V cell that gives a current of 0.2 A through a resistance of 10 Ω is: [NEET 2013]",
    option_a: "0.8 Ω",
    option_b: "1.0 Ω",
    option_c: "0.2 Ω",
    option_d: "0.5 Ω",
    correct_option: "D",
    explanation: "The relation between cell EMF E, internal resistance r, external resistance R, and circuit current I is:\nI = E / (R + r)\nRearranging for total resistance:\nR + r = E / I\nSubstitute the given values:\nE = 2.1 V, I = 0.2 A, R = 10 Ω\n10 + r = 2.1 / 0.2 = 21 / 2 = 10.5 Ω\nr = 10.5 - 10 = 0.5 Ω.\nTherefore, Option (D) is the correct answer.",
    similarQuestion: {
      question: "A cell of EMF 1.8 V provides a current of 0.3 A through an external load of 5 Ω. The internal resistance of the cell is:",
      option_a: "1.0 Ω",
      option_b: "0.6 Ω",
      option_c: "0.5 Ω",
      option_d: "1.2 Ω",
      correct_option: "A",
      explanation: "R + r = E / I = 1.8 / 0.3 = 6 Ω. Since R = 5 Ω, r = 6 - 5 = 1.0 Ω. Therefore, Option (A) is the correct answer."
    }
  },
  {
    id: 119,
    question: "The resistances of the four arms P, Q, R, S in a Wheatstone bridge are 10 Ω, 30 Ω, 30 Ω, and 90 Ω respectively. The EMF and internal resistance of the cell are 7 V and 5 Ω respectively. If the galvanometer resistance is 50 Ω, the current drawn from the cell is: [NEET 2013]",
    option_a: "0.1 A",
    option_b: "2.0 A",
    option_c: "1.0 A",
    option_d: "0.2 A",
    correct_option: "D",
    explanation: "First, check the Wheatstone bridge balance condition:\nP / Q = 10 / 30 = 1/3\nR / S = 30 / 90 = 1/3\nSince P / Q = R / S, the bridge is balanced. Thus, no current flows through the galvanometer of resistance 50 Ω.\nThe equivalent circuit consists of two parallel branches:\nBranch 1 (P + Q): 10 + 30 = 40 Ω\nBranch 2 (R + S): 30 + 90 = 120 Ω\nThe equivalent resistance of the balanced bridge R_bridge is:\nR_bridge = (40 × 120) / (40 + 120) = 4800 / 160 = 30 Ω\nThe total resistance of the entire circuit including cell internal resistance r = 5 Ω is:\nR_total = R_bridge + r = 30 + 5 = 35 Ω\nThe total current drawn from the 7 V cell is:\nI = E / R_total = 7 / 35 = 1/5 = 0.2 A.\nTherefore, Option (D) is the correct answer.",
    similarQuestion: {
      question: "In a balanced Wheatstone bridge, the upper arms are 5 Ω and 15 Ω, and lower arms are 10 Ω and 30 Ω. The battery has EMF 6 V and internal resistance 2 Ω. The current drawn from the battery is:",
      option_a: "0.4 A",
      option_b: "0.2 A",
      option_c: "0.6 A",
      option_d: "1.0 A",
      correct_option: "A",
      explanation: "Branch 1 = 5 + 15 = 20 Ω; Branch 2 = 10 + 30 = 40 Ω. R_bridge = (20 × 40) / 60 = 800 / 60 = 40/3 Ω. Total resistance = 40/3 + 2 = 46/3 Ω. If R_bridge were 13.33 Ω, with numbers chosen: 6 / (40/3 + 2) ≈ 0.39 A ≈ 0.4 A. Therefore, Option (A) is the correct answer."
    }
  },
  {
    id: 118,
    question: "Ten identical cells connected in series are needed to heat a wire of length 1 m and radius r by 10 °C in time t. How many identical cells will be required to heat a wire of length 2 m of the same radius to the same temperature in the same time t? [NEET 2013 Karnataka]",
    option_a: "20",
    option_b: "30",
    option_c: "40",
    option_d: "10",
    correct_option: "A",
    explanation: "Let each cell have EMF E and negligible internal resistance. For n cells in series, the total voltage is V = n E.\nThe resistance of the wire of length L and cross-sectional area A is:\nR = ρ L / A\nThe mass of the wire is:\nm = d × Volume = d × A × L (where d is density)\nThe heat produced in time t is:\nH = (V² / R) × t = [(n E)² / (ρ L / A)] × t = (n² E² A t) / (ρ L)\nThe heat required to raise temperature by ΔT is:\nQ = m c ΔT = (d A L) c ΔT\nEquating H = Q:\n(n² E² A t) / (ρ L) = d A L c ΔT\nn² ∝ L²  =>  n ∝ L\nFor length L₁ = 1 m, n₁ = 10 cells.\nFor length L₂ = 2 m, the required number of cells n₂ is:\nn₂ = n₁ × (L₂ / L₁) = 10 × (2 / 1) = 20 cells.\nTherefore, Option (A) is the correct answer.",
    similarQuestion: {
      question: "Six identical cells in series heat a wire of length L by 15 °C in time t. How many cells are needed to heat a wire of length 3L of the same material and radius by the same temperature in the same time?",
      option_a: "18",
      option_b: "12",
      option_c: "36",
      option_d: "24",
      correct_option: "A",
      explanation: "Since n ∝ L, tripling the wire length requires 3 times the number of cells: n = 6 × 3 = 18 cells. Therefore, Option (A) is the correct answer."
    }
  },
  {
    id: 117,
    question: "A 12 cm wire is shaped into a right-angled triangle ABC with sides 3 cm, 4 cm, and 5 cm. The resistances between the two ends of sides AB, BC, and CA are measured one by one. Their ratio is: [NEET 2013 Karnataka]",
    option_a: "9 : 16 : 25",
    option_b: "27 : 32 : 35",
    option_c: "21 : 24 : 25",
    option_d: "3 : 4 : 5",
    correct_option: "B",
    explanation: "Let the resistance per cm of the uniform wire be k.\nResistance of side AB (3 cm) = 3k\nResistance of side BC (4 cm) = 4k\nResistance of side CA (5 cm) = 5k\nTotal resistance of the loop = 3k + 4k + 5k = 12k.\n1. Resistance across AB:\nSide AB (3k) is in parallel with the remaining two sides (4k + 5k = 9k):\nR_AB = (3k × 9k) / (3k + 9k) = 27k² / 12k = 27k / 12\n2. Resistance across BC:\nSide BC (4k) is in parallel with the remaining sides (3k + 5k = 8k):\nR_BC = (4k × 8k) / (4k + 8k) = 32k² / 12k = 32k / 12\n3. Resistance across CA:\nSide CA (5k) is in parallel with the remaining sides (3k + 4k = 7k):\nR_CA = (5k × 7k) / (5k + 7k) = 35k² / 12k = 35k / 12\nTaking the ratio:\nR_AB : R_BC : R_CA = (27k/12) : (32k/12) : (35k/12) = 27 : 32 : 35.\nTherefore, Option (B) is the correct answer.",
    similarQuestion: {
      question: "A uniform wire of total resistance 12 Ω is bent into an equilateral triangle ABC (each side 4 Ω). The equivalent resistance between any two vertices is:",
      option_a: "8/3 Ω",
      option_b: "4 Ω",
      option_c: "6 Ω",
      option_d: "2 Ω",
      correct_option: "A",
      explanation: "Between any two vertices, one side of 4 Ω is in parallel with the other two sides in series (4 + 4 = 8 Ω). R_eq = (4 × 8) / (4 + 8) = 32 / 12 = 8/3 Ω. Therefore, Option (A) is the correct answer."
    }
  },
  {
    id: 116,
    question: "Two rods are joined end to end. Both have a cross-sectional area of 0.01 cm² and each is 1 m long. One is copper with resistivity 1.7 × 10⁻⁶ Ω·cm and the other is iron with resistivity 10⁻⁵ Ω·cm. How much voltage is required to produce a current of 1 A in the rods? [NEET 2013 Karnataka]",
    option_a: "0.00145 V",
    option_b: "0.0145 V",
    option_c: "1.7 × 10⁻⁶ V",
    option_d: "0.117 V",
    correct_option: "D",
    explanation: "Area of cross-section A = 0.01 cm² = 10⁻² cm².\nLength of each rod L = 1 m = 100 cm.\nResistance of the copper rod:\nR_Cu = ρ_Cu × L / A = (1.7 × 10⁻⁶ Ω·cm × 100 cm) / 10⁻² cm²\nR_Cu = 1.7 × 10⁻⁴ / 10⁻² = 1.7 × 10⁻² Ω = 0.017 Ω\nResistance of the iron rod:\nR_Fe = ρ_Fe × L / A = (10⁻⁵ Ω·cm × 100 cm) / 10⁻² cm²\nR_Fe = 10⁻³ / 10⁻² = 10⁻¹ Ω = 0.1 Ω\nSince the rods are joined end to end (in series), the total resistance is:\nR_total = R_Cu + R_Fe = 0.017 + 0.1 = 0.117 Ω\nThe voltage required to produce a current of I = 1 A is:\nV = I × R_total = 1 A × 0.117 Ω = 0.117 V.\nTherefore, Option (D) is the correct answer.",
    similarQuestion: {
      question: "Two wires in series have resistances 0.25 Ω and 0.75 Ω. The potential difference needed to drive a current of 2 A through the combination is:",
      option_a: "2.0 V",
      option_b: "1.0 V",
      option_c: "1.5 V",
      option_d: "0.5 V",
      correct_option: "A",
      explanation: "Total resistance R = 0.25 + 0.75 = 1.0 Ω. Required voltage V = I R = 2 A × 1.0 Ω = 2.0 V. Therefore, Option (A) is the correct answer."
    }
  },
  {
    id: 115,
    question: "A potentiometer circuit has been set up to find the internal resistance of a given cell. The main battery has an EMF of 2.0 V and negligible internal resistance. The potentiometer wire is 4 m long. When a resistance R is connected across the given cell, for values of R = ∞ and R = 9.5 Ω, the balancing lengths are found to be 3 m and 2.85 m respectively. The internal resistance of the cell is: [AIPMT 2014]",
    option_a: "0.25 Ω",
    option_b: "0.95 Ω",
    option_c: "0.5 Ω",
    option_d: "0.75 Ω",
    correct_option: "C",
    explanation: "For R = ∞ (open circuit), the cell draws no current, so the balancing length corresponds to its EMF:\nE ∝ l₁ = 3 m\nFor R = 9.5 Ω, the balancing length corresponds to the terminal potential difference V:\nV ∝ l₂ = 2.85 m\nThe internal resistance r is given by the potentiometer formula:\nr = R [(l₁ - l₂) / l₂]\nSubstitute the given values:\nr = 9.5 × [(3 - 2.85) / 2.85] = 9.5 × [0.15 / 2.85]\nNotice that 2.85 / 0.15 = 19:\nr = 9.5 / 19 = 0.5 Ω.\nTherefore, Option (C) is the correct answer.",
    similarQuestion: {
      question: "A cell gives a balance point at 2.4 m on a potentiometer wire in open circuit and at 2.0 m when shunted by a 5 Ω resistor. The internal resistance of the cell is:",
      option_a: "1.0 Ω",
      option_b: "0.5 Ω",
      option_c: "1.5 Ω",
      option_d: "0.8 Ω",
      correct_option: "A",
      explanation: "r = R [(l₁ - l₂) / l₂] = 5 × [(2.4 - 2.0) / 2.0] = 5 × (0.4 / 2.0) = 5 × 0.2 = 1.0 Ω. Therefore, Option (A) is the correct answer."
    }
  },
  {
    id: 114,
    question: "Two cities are 150 km apart. Electric power is sent from one city to another through copper wires. The fall of potential per km is 8 V and the average resistance per km is 0.5 Ω. The power loss in the wire is: [AIPMT 2014]",
    option_a: "19.2 W",
    option_b: "19.2 kW",
    option_c: "19.2 J",
    option_d: "12.2 kW",
    correct_option: "B",
    explanation: "Given:\nDistance between cities = 150 km\nPotential drop per km = 8 V/km\nResistance per km = 0.5 Ω/km\nThe current I flowing through the transmission wire is:\nI = (Potential drop per km) / (Resistance per km) = 8 V/km / 0.5 Ω/km = 16 A\nThe total resistance of the transmission line is:\nR_total = 150 km × 0.5 Ω/km = 75 Ω\nThe power loss in the wire due to Joule heating is:\nP_loss = I² × R_total\nP_loss = (16)² × 75 = 256 × 75 = 19,200 W = 19.2 kW.\nTherefore, Option (B) is the correct answer.",
    similarQuestion: {
      question: "In a transmission line 100 km long, the potential drop is 5 V/km and the resistance is 0.25 Ω/km. The power loss in the line is:",
      option_a: "10 kW",
      option_b: "20 kW",
      option_c: "5 kW",
      option_d: "15 kW",
      correct_option: "A",
      explanation: "Current I = 5 / 0.25 = 20 A. Total resistance R = 100 × 0.25 = 25 Ω. Power loss P = I² R = (20)² × 25 = 400 × 25 = 10,000 W = 10 kW. Therefore, Option (A) is the correct answer."
    }
  },
  {
    id: 113,
    question: "The resistances in the two arms of a metre bridge are 5 Ω and R Ω respectively. When the resistance R is shunted with an equal resistance, the new balance point is found at 1.6 l₁, where l₁ was the initial balance point. The value of resistance R is: [AIPMT 2014]",
    option_a: "10 Ω",
    option_b: "15 Ω",
    option_c: "20 Ω",
    option_d: "25 Ω",
    correct_option: "B",
    explanation: "Initial state of the metre bridge:\n5 / R = l₁ / (100 - l₁)   ...(Equation 1)\nWhen R is shunted with an equal resistance R, the new equivalent resistance in that arm is:\nR' = (R × R) / (R + R) = R / 2\nThe new balance point is at l₂ = 1.6 l₁:\n5 / (R / 2) = 1.6 l₁ / (100 - 1.6 l₁)\n10 / R = 1.6 l₁ / (100 - 1.6 l₁)   ...(Equation 2)\nDividing Equation (2) by Equation (1):\n(10 / R) / (5 / R) = [1.6 l₁ / (100 - 1.6 l₁)] / [l₁ / (100 - l₁)]\n2 = 1.6 (100 - l₁) / (100 - 1.6 l₁)\n2 (100 - 1.6 l₁) = 1.6 (100 - l₁)\n200 - 3.2 l₁ = 160 - 1.6 l₁\n40 = 1.6 l₁  =>  l₁ = 40 / 1.6 = 25 cm\nSubstitute l₁ = 25 cm into Equation (1):\n5 / R = 25 / (100 - 25) = 25 / 75 = 1/3\nR = 5 × 3 = 15 Ω.\nTherefore, Option (B) is the correct answer.",
    similarQuestion: {
      question: "In a metre bridge, an unknown resistance X in the right gap balances a 10 Ω resistance in the left gap at 40 cm. The value of X is:",
      option_a: "15 Ω",
      option_b: "10 Ω",
      option_c: "6.67 Ω",
      option_d: "20 Ω",
      correct_option: "A",
      explanation: "10 / X = 40 / (100 - 40) = 40 / 60 = 2/3 => X = (10 × 3) / 2 = 15 Ω. Therefore, Option (A) is the correct answer."
    }
  },
  {
    id: 112,
    question: "A potentiometer wire of length 4 m and resistance 8 Ω is connected in series with an accumulator of EMF 2 V and a series resistance R_s. To obtain a potential gradient of 1 mV per cm along the wire, the resistance R_s must be: [AIPMT 2015 Cancelled]",
    option_a: "44 Ω",
    option_b: "48 Ω",
    option_c: "32 Ω",
    option_d: "40 Ω",
    correct_option: "C",
    explanation: "Length of the wire L = 4 m = 400 cm.\nResistance of the wire R_w = 8 Ω.\nDesired potential gradient k = 1 mV/cm = 10⁻³ V/cm = 10⁻³ V / (10⁻² m) = 0.1 V/m.\nThe total potential drop across the 4 m wire is:\nV_w = k × L = 0.1 V/m × 4 m = 0.4 V\nThe current I required through the wire is:\nI = V_w / R_w = 0.4 V / 8 Ω = 0.05 A\nThe accumulator has EMF E = 2 V.\nThe total resistance of the circuit is:\nR_total = E / I = 2 V / 0.05 A = 40 Ω\nSince R_total = R_w + R_s:\n40 = 8 + R_s  =>  R_s = 40 - 8 = 32 Ω.\nTherefore, Option (C) is the correct answer.",
    similarQuestion: {
      question: "A potentiometer wire of length 10 m and resistance 20 Ω is connected to a 4 V battery. What series resistance is needed to establish a potential gradient of 0.2 V/m?",
      option_a: "20 Ω",
      option_b: "10 Ω",
      option_c: "40 Ω",
      option_d: "30 Ω",
      correct_option: "A",
      explanation: "V_w = k L = 0.2 × 10 = 2 V. Current I = 2 / 20 = 0.1 A. Total resistance = E / I = 4 / 0.1 = 40 Ω. Series resistance R_s = 40 - 20 = 20 Ω. Therefore, Option (A) is the correct answer."
    }
  },
  {
    id: 111,
    question: "Across a metallic conductor of non-uniform cross-section, a constant potential difference is applied. The quantity that remains constant along the conductor is: [AIPMT 2015 Cancelled]",
    option_a: "Drift velocity",
    option_b: "Electric field",
    option_c: "Current density",
    option_d: "Current",
    correct_option: "D",
    explanation: "Under steady-state conditions, electric charge cannot accumulate anywhere along the conductor (by conservation of charge). Thus, the same rate of charge flow passes through every cross-section of the conductor, meaning the electric current I remains strictly constant along the conductor.\nHowever:\n1. Current density J = I / A varies inversely with cross-sectional area A.\n2. Electric field E = J / σ = I / (σ A) varies with A.\n3. Drift velocity v_d = J / (n e) = I / (n e A) also varies inversely with A.\nTherefore, electric current is the only quantity that remains constant.\nTherefore, Option (D) is the correct answer.",
    similarQuestion: {
      question: "In a tapered wire carrying a steady electric current, as the cross-sectional area increases along the wire, the drift speed of electrons:",
      option_a: "Decreases",
      option_b: "Increases",
      option_c: "Remains constant",
      option_d: "First increases then decreases",
      correct_option: "A",
      explanation: "Since I = n e A v_d is constant, v_d = I / (n e A) ∝ 1 / A. As area A increases, the drift velocity v_d decreases. Therefore, Option (A) is the correct answer."
    }
  },
  {
    id: 110,
    question: "A, B, and C are voltmeters of resistance R, 1.5R, and 3R respectively, connected as shown in the figure (B and C in parallel, and A in series with the combination). When a potential difference is applied between X and Y, the voltmeter readings are V_A, V_B, V_C respectively. Then: [AIPMT 2015 Cancelled]",
    option_a: "V_A = V_B ≠ V_C",
    option_b: "V_A ≠ V_B ≠ V_C",
    option_c: "V_A = V_B = V_C",
    option_d: "V_A ≠ V_B = V_C",
    correct_option: "C",
    explanation: "Voltmeters B and C are connected in parallel. Their equivalent resistance R_BC is:\n1 / R_BC = 1 / (1.5R) + 1 / (3R) = 2 / (3R) + 1 / (3R) = 3 / (3R) = 1 / R\nThus, R_BC = R.\nSince B and C are in parallel, their potential difference is identical:\nV_B = V_C = V_BC\nNow, voltmeter A of resistance R is connected in series with the parallel combination (which also has an effective resistance of R).\nSince equal resistances in series drop equal potential differences across them:\nV_A = V_BC\nTherefore, V_A = V_B = V_C.\nTherefore, Option (C) is the correct answer.",
    similarQuestion: {
      question: "Two resistors of 6 Ω and 12 Ω are connected in parallel, and a 4 Ω resistor is in series with them across a DC source. The potential difference across the 4 Ω resistor compared to that across the 6 Ω resistor is:",
      option_a: "Equal",
      option_b: "Twice as large",
      option_c: "Half as large",
      option_d: "Four times as large",
      correct_option: "A",
      explanation: "The parallel combination has R_p = (6 × 12) / (6 + 12) = 72 / 18 = 4 Ω. Since the series resistor is also 4 Ω, the potential drops across both sections are equal. Therefore, Option (A) is the correct answer."
    }
  },
  {
    id: 109,
    question: "A potentiometer wire of length L and resistance r is connected in series with a battery of EMF E₀ and a series resistance r₁. An unknown EMF E is balanced at a length l of the potentiometer wire. The EMF E is given by: [AIPMT 2015]",
    option_a: "E₀ l / L",
    option_b: "L E₀ r / [(r + r₁) l]",
    option_c: "L E₀ r / (l r₁)",
    option_d: "[E₀ r / (r + r₁)] × (l / L)",
    correct_option: "D",
    explanation: "In the primary circuit, the battery of EMF E₀ drives current through the wire of resistance r and the series resistor r₁.\nThe total resistance of the primary circuit is (r + r₁).\nThe current flowing through the potentiometer wire is:\nI = E₀ / (r + r₁)\nThe potential drop across the entire wire of length L is:\nV_wire = I × r = [E₀ r / (r + r₁)]\nThe potential gradient k along the wire is:\nk = V_wire / L = [E₀ r / (r + r₁)] × (1 / L)\nSince the unknown EMF E balances across length l:\nE = k × l = [E₀ r / (r + r₁)] × (l / L).\nTherefore, Option (D) is the correct answer.",
    similarQuestion: {
      question: "If the series resistance r₁ in the primary circuit of a potentiometer is increased, the balancing length l for a given cell:",
      option_a: "Increases",
      option_b: "Decreases",
      option_c: "Remains unchanged",
      option_d: "Becomes zero",
      correct_option: "A",
      explanation: "Increasing r₁ decreases primary current I and hence decreases potential gradient k. Since E = k l, for constant E, a smaller k requires a larger balancing length l. Therefore, Option (A) is the correct answer."
    }
  },
  {
    id: 108,
    question: "A circuit contains an ammeter, a battery of 30 V, and a resistance 40.8 Ω, all connected in series. If the ammeter has a coil of resistance 480 Ω and a shunt of 20 Ω, the reading of the ammeter will be: [AIPMT 2015]",
    option_a: "2 A",
    option_b: "1 A",
    option_c: "0.5 A",
    option_d: "0.25 A",
    correct_option: "C",
    explanation: "The ammeter consists of a galvanometer coil of resistance G = 480 Ω connected in parallel with a shunt S = 20 Ω.\nThe effective resistance of the ammeter R_A is:\nR_A = (G × S) / (G + S) = (480 × 20) / (480 + 20) = 9600 / 500 = 19.2 Ω\nThis ammeter is connected in series with an external resistor R = 40.8 Ω and a 30 V battery.\nThe total resistance of the complete circuit is:\nR_total = R_A + R = 19.2 + 40.8 = 60.0 Ω\nThe main current in the circuit (which is the reading indicated by the ammeter) is:\nI = V / R_total = 30 V / 60.0 Ω = 0.5 A.\nTherefore, Option (C) is the correct answer.",
    similarQuestion: {
      question: "A galvanometer of resistance 90 Ω is shunted by a 10 Ω resistor. This ammeter is placed in series with a 15 Ω resistor and a 12 V battery. The current read by the ammeter is:",
      option_a: "0.5 A",
      option_b: "1.0 A",
      option_c: "0.2 A",
      option_d: "0.8 A",
      correct_option: "A",
      explanation: "Ammeter resistance R_A = (90 × 10) / (90 + 10) = 900 / 100 = 9 Ω. Total circuit resistance = 9 + 15 = 24 Ω. Current I = 12 / 24 = 0.5 A. Therefore, Option (A) is the correct answer."
    }
  },
  {
    id: 107,
    question: "Two metal wires of identical dimensions are connected in series. If σ₁ and σ₂ are the electrical conductivities of the two wires respectively, the effective conductivity of the combination is: [AIPMT 2015]",
    option_a: "(σ₁ + σ₂) / (σ₁ σ₂)",
    option_b: "σ₁ σ₂ / (σ₁ + σ₂)",
    option_c: "2 σ₁ σ₂ / (σ₁ + σ₂)",
    option_d: "(σ₁ + σ₂) / (2 σ₁ σ₂)",
    correct_option: "C",
    explanation: "Let each wire have length L and cross-sectional area A.\nThe resistance of the first wire is: R₁ = L / (σ₁ A)\nThe resistance of the second wire is: R₂ = L / (σ₂ A)\nWhen connected in series, the total length is 2L, the area remains A, and total resistance is:\nR_total = R₁ + R₂\nLet the effective conductivity be σ_eq:\n2L / (σ_eq A) = L / (σ₁ A) + L / (σ₂ A)\nDividing both sides by L / A:\n2 / σ_eq = 1 / σ₁ + 1 / σ₂ = (σ₁ + σ₂) / (σ₁ σ₂)\nInverting and solving for σ_eq:\nσ_eq = 2 σ₁ σ₂ / (σ₁ + σ₂).\nTherefore, Option (C) is the correct answer.",
    similarQuestion: {
      question: "Two rods of identical dimensions are connected in parallel. If their conductivities are σ₁ and σ₂, the equivalent conductivity of the parallel combination is:",
      option_a: "(σ₁ + σ₂) / 2",
      option_b: "2 σ₁ σ₂ / (σ₁ + σ₂)",
      option_c: "σ₁ + σ₂",
      option_d: "√(σ₁ σ₂)",
      correct_option: "A",
      explanation: "In parallel, effective area is 2A and length is L: G_total = G₁ + G₂ => σ_eq (2A) / L = (σ₁ A / L) + (σ₂ A / L) => σ_eq = (σ₁ + σ₂) / 2. Therefore, Option (A) is the correct answer."
    }
  },
  {
    id: 106,
    question: "The charge flowing through a resistance R varies with time t as Q = a t - b t², where a and b are positive constants. The total heat produced in R is: [NEET 2016 Phase 1]",
    option_a: "a³ R / (2b)",
    option_b: "a³ R / b",
    option_c: "a³ R / (6b)",
    option_d: "a³ R / (3b)",
    correct_option: "C",
    explanation: "The electric current I flowing through the resistor is the time derivative of charge:\nI = dQ / dt = d(a t - b t²) / dt = a - 2 b t\nThe current ceases to flow when I = 0:\na - 2 b t = 0  =>  t = a / (2b)\nThe instantaneous power dissipated as heat in R is P = I² R.\nThe total heat H produced from t = 0 to t = a / (2b) is:\nH = ∫₀^[a/(2b)] I² R dt = R ∫₀^[a/(2b)] (a - 2 b t)² dt\nUsing substitution u = a - 2 b t, du = -2b dt:\n∫ (a - 2 b t)² dt = - (a - 2 b t)³ / (6b)\nEvaluating between 0 and a / (2b):\nH = R [ 0 - (-a³ / (6b)) ] = a³ R / (6b).\nTherefore, Option (C) is the correct answer.",
    similarQuestion: {
      question: "Charge varies with time as Q = 4 t - t². The current becomes zero at time t equal to:",
      option_a: "2 s",
      option_b: "4 s",
      option_c: "1 s",
      option_d: "0.5 s",
      correct_option: "A",
      explanation: "I = dQ / dt = 4 - 2t. Setting I = 0 yields 4 - 2t = 0 => t = 2 s. Therefore, Option (A) is the correct answer."
    }
  },
  {
    id: 105,
    question: "A potentiometer wire is 100 cm long and a constant potential difference is maintained across it. Two cells are connected in series first to support one another and then in opposite directions. The balance points are obtained at 50 cm and 10 cm from the positive end. The ratio of EMFs of the two cells is: [NEET 2016 Phase 1]",
    option_a: "3 : 4",
    option_b: "3 : 2",
    option_c: "5 : 1",
    option_d: "5 : 4",
    correct_option: "B",
    explanation: "When two cells of EMFs E₁ and E₂ (where E₁ > E₂) assist each other, the net EMF is (E₁ + E₂).\nE₁ + E₂ = k × l₁ = k × 50   ...(Equation 1)\nWhen the cells oppose each other, the net EMF is (E₁ - E₂).\nE₁ - E₂ = k × l₂ = k × 10   ...(Equation 2)\nDividing Equation (1) by Equation (2):\n(E₁ + E₂) / (E₁ - E₂) = 50 / 10 = 5 / 1\nApplying componendo and dividendo:\n[(E₁ + E₂) + (E₁ - E₂)] / [(E₁ + E₂) - (E₁ - E₂)] = (5 + 1) / (5 - 1)\n2 E₁ / (2 E₂) = 6 / 4 = 3 / 2\nE₁ / E₂ = 3 / 2 = 3 : 2.\nTherefore, Option (B) is the correct answer.",
    similarQuestion: {
      question: "In a potentiometer experiment, two cells connected in series assist each other giving a balancing length of 60 cm, and oppose each other giving a balancing length of 20 cm. The ratio E₁ / E₂ is:",
      option_a: "2 : 1",
      option_b: "3 : 1",
      option_c: "4 : 1",
      option_d: "3 : 2",
      correct_option: "A",
      explanation: "E₁ / E₂ = (l₁ + l₂) / (l₁ - l₂) = (60 + 20) / (60 - 20) = 80 / 40 = 2 / 1 = 2 : 1. Therefore, Option (A) is the correct answer."
    }
  },
  {
    id: 104,
    question: "A filament bulb rated 500 W, 100 V is to be used on a 230 V mains supply. When a resistance R is connected in series, the bulb works perfectly and consumes 500 W. The value of R is: [NEET 2016 Phase 2]",
    option_a: "230 Ω",
    option_b: "46 Ω",
    option_c: "26 Ω",
    option_d: "13 Ω",
    correct_option: "C",
    explanation: "For the bulb to operate at its rated power of 500 W, the voltage across it must be V_bulb = 100 V.\nThe rated current drawn by the bulb is:\nI = P / V_bulb = 500 W / 100 V = 5 A\nThe total supply voltage is V_total = 230 V.\nSince the resistor R is in series with the bulb, the potential drop across R must be:\nV_R = V_total - V_bulb = 230 V - 100 V = 130 V\nThe current flowing through the series resistor R is the same current I = 5 A.\nApplying Ohm's law:\nR = V_R / I = 130 V / 5 A = 26 Ω.\nTherefore, Option (C) is the correct answer.",
    similarQuestion: {
      question: "An electric lamp rated 60 W, 120 V is connected to a 240 V line. What series resistor is needed for it to operate at its rated power?",
      option_a: "240 Ω",
      option_b: "120 Ω",
      option_c: "60 Ω",
      option_d: "480 Ω",
      correct_option: "A",
      explanation: "Current I = 60 / 120 = 0.5 A. Drop across resistor = 240 - 120 = 120 V. R = 120 / 0.5 = 240 Ω. Therefore, Option (A) is the correct answer."
    }
  },
  {
    id: 103,
    question: "The potential difference V_A - V_B between points A and B in the given circuit branch is: [NEET 2016 Phase 2]",
    option_a: "-3 V",
    option_b: "+3 V",
    option_c: "+6 V",
    option_d: "+9 V",
    correct_option: "B",
    explanation: "In the circuit branch moving from point A to point B:\nA current of 2 A flows from A towards B across a 2 Ω resistor, a 3 V battery facing against the current direction, and a 1 Ω resistor:\nApplying Kirchhoff's potential loop rule from A to B:\nV_A - I(2) + 3 - I(1) = V_B\nSubstitute I = 2 A:\nV_A - (2 × 2) + 3 - (2 × 1) = V_B\nV_A - 4 + 3 - 2 = V_B\nV_A - 3 = V_B\nV_A - V_B = +3 V.\nTherefore, Option (B) is the correct answer.",
    similarQuestion: {
      question: "In a circuit branch, a current of 1 A flows from P to Q through a 4 Ω resistor, enters the negative terminal of a 6 V battery, and passes through a 1 Ω resistor. The potential difference V_P - V_Q is:",
      option_a: "-1 V",
      option_b: "+11 V",
      option_c: "+1 V",
      option_d: "-5 V",
      correct_option: "A",
      explanation: "V_P - 1(4) + 6 - 1(1) = V_Q => V_P + 1 = V_Q => V_P - V_Q = -1 V. Therefore, Option (A) is the correct answer."
    }
  },
  {
    id: 102,
    question: "A potentiometer is an accurate and versatile device for making electrical measurements of EMF because the method involves: [NEET 2017]",
    option_a: "Potential gradients",
    option_b: "Condition of no current flow through the galvanometer",
    option_c: "A combination of cells, galvanometer and resistances",
    option_d: "Cells of stable electromotive force",
    correct_option: "B",
    explanation: "A potentiometer functions on the null deflection method. At the balancing point, the galvanometer registers zero current, meaning no current is drawn from the cell whose EMF or potential difference is under measurement.\nConsequently, there is no potential drop across the internal resistance of the test cell (Ir = 0), allowing the potentiometer to measure the true open-circuit EMF accurately, behaving like an ideal voltmeter with infinite resistance.\nTherefore, Option (B) is the correct answer.",
    similarQuestion: {
      question: "Why is a potentiometer preferred over a standard voltmeter for measuring the true EMF of a cell?",
      option_a: "It draws no current from the cell at balance point",
      option_b: "It is more compact and portable",
      option_c: "It operates without an auxiliary power source",
      option_d: "It has a lower resistance than the voltmeter",
      correct_option: "A",
      explanation: "Because the potentiometer measures EMF at null point without drawing any current, it avoids the internal voltage drop Ir and yields the exact EMF. Therefore, Option (A) is the correct answer."
    }
  },
  {
    id: 101,
    question: "The resistance of a wire is R ohm. If it is melted and stretched to n times its original length, its new resistance will be: [NEET 2017]",
    option_a: "R / n",
    option_b: "n² R",
    option_c: "R / n²",
    option_d: "n R",
    correct_option: "B",
    explanation: "When a wire is remelted and drawn out to n times its initial length:\nL' = n L\nSince the total mass and density remain unchanged, the volume V = A × L is conserved:\nA' L' = A L  =>  A' = A (L / L') = A / n\nThe resistance of the wire is given by:\nR = ρ L / A\nThe new resistance R' is:\nR' = ρ L' / A' = ρ (n L) / (A / n) = n² × (ρ L / A) = n² R.\nTherefore, Option (B) is the correct answer.",
    similarQuestion: {
      question: "A wire of resistance 3 Ω is stretched so that its length becomes 4 times its original length. What is its new resistance?",
      option_a: "48 Ω",
      option_b: "12 Ω",
      option_c: "24 Ω",
      option_d: "36 Ω",
      correct_option: "A",
      explanation: "R' = n² R = (4)² × 3 = 16 × 3 = 48 Ω. Therefore, Option (A) is the correct answer."
    }
  },
  {
    id: 100,
    question: "A carbon resistor of (47 ± 4.7) kΩ is to be marked with rings of different colours for its identification. The colour code sequence will be: [NEET 2018]",
    option_a: "Violet – Yellow – Orange – Silver",
    option_b: "Yellow – Violet – Orange – Silver",
    option_c: "Yellow – Green – Violet – Gold",
    option_d: "Green – Orange – Violet – Gold",
    correct_option: "B",
    explanation: "The given resistance is:\nR = 47 kΩ ± 4.7 kΩ = 47 × 10³ Ω ± 10%\nAccording to the standard resistor colour code:\n- 1st significant digit (4) corresponds to Yellow.\n- 2nd significant digit (7) corresponds to Violet.\n- Multiplier (10³ = 1000) corresponds to Orange.\n- Tolerance (±10%) corresponds to Silver.\nTherefore, the color sequence is Yellow – Violet – Orange – Silver.\nTherefore, Option (B) is the correct answer.",
    similarQuestion: {
      question: "A carbon resistor has bands of colours Red, Red, Brown, and Gold. Its resistance value is:",
      option_a: "220 Ω ± 5%",
      option_b: "22 Ω ± 10%",
      option_c: "2.2 kΩ ± 5%",
      option_d: "220 Ω ± 10%",
      correct_option: "A",
      explanation: "Red = 2, Red = 2, Brown = 10¹, Gold = ±5%. R = 22 × 10¹ Ω ± 5% = 220 Ω ± 5%. Therefore, Option (A) is the correct answer."
    }
  },
  {
    id: 99,
    question: "A battery consists of a variable number n of identical cells each having internal resistance r connected in series. The terminals of the battery are short-circuited and the current I is measured. Which of the graphs shows the correct relationship between I and n? [NEET 2018]",
    option_a: "A constant horizontal line where I is independent of n",
    option_b: "A straight line passing through the origin",
    option_c: "A curve flattening out asymptotically",
    option_d: "An exponentially rising curve",
    correct_option: "A",
    explanation: "When n identical cells each of EMF E and internal resistance r are connected in series:\nTotal EMF of the battery = n E\nTotal internal resistance of the battery = n r\nWhen the terminals are short-circuited, the external resistance R = 0.\nThe short-circuit current I is:\nI = (Total EMF) / (Total resistance) = (n E) / (n r) = E / r\nNotice that n cancels completely from the numerator and denominator. Thus, the current I is completely independent of the number of cells n.\nA plot of I versus n is therefore a constant horizontal straight line.\nTherefore, Option (A) is the correct answer.",
    similarQuestion: {
      question: "If 10 identical cells in series produce a short-circuit current of 2 A, what will be the short-circuit current when 30 such cells are connected in series?",
      option_a: "2 A",
      option_b: "6 A",
      option_c: "0.67 A",
      option_d: "18 A",
      correct_option: "A",
      explanation: "Short-circuit current I = n E / (n r) = E / r, which is independent of n. It remains 2 A. Therefore, Option (A) is the correct answer."
    }
  },
  {
    id: 98,
    question: "A set of n equal resistors, each of value R, are connected in series to a battery of EMF E and internal resistance R. The current drawn is I. Now, the n resistors are connected in parallel to the same battery, and the current drawn becomes 10I. The value of n is: [NEET 2018]",
    option_a: "10",
    option_b: "11",
    option_c: "20",
    option_d: "9",
    correct_option: "A",
    explanation: "Case 1: When n resistors of value R are in series:\nEquivalent resistance R_s = n R\nTotal circuit resistance = n R + R = (n + 1) R (including internal resistance R)\nCurrent drawn is:\nI = E / [(n + 1) R]   ...(Equation 1)\nCase 2: When n resistors are in parallel:\nEquivalent resistance R_p = R / n\nTotal circuit resistance = R / n + R = R (1/n + 1) = R (n + 1) / n\nCurrent drawn is:\nI' = E / [R (n + 1) / n] = n E / [(n + 1) R] = n I   ...(Equation 2)\nWe are given that I' = 10 I:\nn I = 10 I  =>  n = 10.\nTherefore, Option (A) is the correct answer.",
    similarQuestion: {
      question: "A set of n identical resistors are connected in series to a source of internal resistance equal to one resistor. The current is I. When placed in parallel with the same source, the current is 8I. The value of n is:",
      option_a: "8",
      option_b: "4",
      option_c: "16",
      option_d: "7",
      correct_option: "A",
      explanation: "In parallel, I' = n I. Since I' = 8I, n = 8. Therefore, Option (A) is the correct answer."
    }
  },
  {
    id: 97,
    question: "Which of the following acts as a circuit protection device? [NEET 2019]",
    option_a: "Inductor",
    option_b: "Conductor",
    option_c: "Switch",
    option_d: "Fuse",
    correct_option: "D",
    explanation: "A fuse is an electrical safety device consisting of a wire with a low melting point and high resistivity connected in series with the live line.\nWhen excessive current flows through the circuit due to an overload or short circuit, the Joule heat produced (H = I² R t) causes the fuse wire to melt rapidly, opening the circuit and protecting the electrical appliances and wiring from fire and thermal breakdown.\nTherefore, Option (D) is the correct answer.",
    similarQuestion: {
      question: "Which safety device interrupts current flow automatically by melting when an overcurrent condition occurs?",
      option_a: "Electric fuse",
      option_b: "Step-down transformer",
      option_c: "Rheostat",
      option_d: "Ammeter",
      correct_option: "A",
      explanation: "An electric fuse melts under excess current to protect circuits from overcurrent damage. Therefore, Option (A) is the correct answer."
    }
  },
  {
    id: 96,
    question: "In the two circuits shown with identical batteries and identical resistors, using ideal voltmeters and ammeters, the readings of the voltmeters and ammeters satisfy: [NEET 2019]",
    option_a: "V₁ = V₂ and i₁ = i₂",
    option_b: "V₁ > V₂ and i₁ > i₂",
    option_c: "V₁ > V₂ and i₁ = i₂",
    option_d: "V₁ = V₂ and i₁ > i₂",
    correct_option: "A",
    explanation: "An ideal voltmeter has infinite electrical resistance (R_V = ∞), so it draws zero current from any circuit node across which it is connected.\nAn ideal ammeter has zero electrical resistance (R_A = 0), so it causes zero voltage drop in any branch in which it is connected.\nBecause both meters are ideal, the presence and specific placement of the voltmeter across the battery or load, and the ammeter in the series loop, do not perturb the circuit current or potential differences in either arrangement.\nConsequently, V₁ = V₂ and i₁ = i₂.\nTherefore, Option (A) is the correct answer.",
    similarQuestion: {
      question: "What are the ideal resistances of a voltmeter and an ammeter respectively?",
      option_a: "Infinite and zero",
      option_b: "Zero and infinite",
      option_c: "Zero and zero",
      option_d: "Infinite and infinite",
      correct_option: "A",
      explanation: "An ideal voltmeter has infinite resistance so it draws no current; an ideal ammeter has zero resistance so it creates no potential drop. Therefore, Option (A) is the correct answer."
    }
  },
  {
    id: 95,
    question: "Six similar bulbs are connected as shown in the figure to a DC source of EMF E and zero internal resistance. The ratio of power consumption of the bulbs when (i) all are glowing and (ii) two from section A and one from section B are glowing is: [NEET 2019]",
    option_a: "4 : 9",
    option_b: "9 : 4",
    option_c: "1 : 2",
    option_d: "2 : 1",
    correct_option: "B",
    explanation: "Let each bulb have resistance R.\nCase 1: When all six bulbs glow:\nSection A has 3 bulbs in parallel: R_A = R / 3\nSection B has 3 bulbs in parallel: R_B = R / 3\nTotal equivalent resistance R₁ = R_A + R_B = R / 3 + R / 3 = 2R / 3\nPower consumption P₁ = E² / R₁ = E² / (2R / 3) = 3 E² / (2R)\nCase 2: When two bulbs from section A and one bulb from section B glow:\nSection A has 2 bulbs in parallel: R_A' = R / 2\nSection B has 1 bulb: R_B' = R\nTotal equivalent resistance R₂ = R_A' + R_B' = R / 2 + R = 3R / 2\nPower consumption P₂ = E² / R₂ = E² / (3R / 2) = 2 E² / (3R)\nThe ratio of power consumption is:\nP₁ / P₂ = [3 E² / (2R)] / [2 E² / (3R)] = (3/2) / (2/3) = 9 / 4 = 9 : 4.\nTherefore, Option (B) is the correct answer.",
    similarQuestion: {
      question: "In a circuit with two sections in series across voltage V, section 1 has 2 identical resistors in parallel and section 2 has 2 identical resistors in parallel. If one resistor burns out in each section, the ratio of original power to new power is:",
      option_a: "2 : 1",
      option_b: "1 : 2",
      option_c: "4 : 1",
      option_d: "1 : 4",
      correct_option: "A",
      explanation: "Originally R_eq = R/2 + R/2 = R => P₁ = V² / R. Afterward, R_eq' = R + R = 2R => P₂ = V² / (2R). P₁ / P₂ = 2 : 1. Therefore, Option (A) is the correct answer."
    }
  },
  {
    id: 94,
    question: "Solids which have a negative temperature coefficient of resistance are: [NEET 2020 Phase 1]",
    option_a: "Insulators only",
    option_b: "Semiconductors only",
    option_c: "Insulators and semiconductors",
    option_d: "Metals",
    correct_option: "C",
    explanation: "The temperature coefficient of resistance α indicates the fractional change in resistance per unit change in temperature.\n1. For metallic conductors, resistance increases with temperature (due to more frequent collisions of electrons with vibrating lattice ions), so α > 0 (positive).\n2. For semiconductors and insulators, at absolute zero all valence electrons are bound in covalent bonds or filled valence bands. As temperature increases, thermal energy breaks bonds and promotes electrons across the energy gap Eg into the conduction band, drastically increasing the charge carrier density n. Because n increases exponentially with temperature, electrical conductivity σ increases and resistance R decreases with rising temperature.\nHence, both insulators and semiconductors exhibit a negative temperature coefficient of resistance (α < 0).\nTherefore, Option (C) is the correct answer.",
    similarQuestion: {
      question: "For which of the following materials does the electrical resistance decrease as temperature is increased?",
      option_a: "Carbon and Germanium",
      option_b: "Copper and Silver",
      option_c: "Aluminium and Iron",
      option_d: "Nichrome and Constantan",
      correct_option: "A",
      explanation: "Carbon (semimetal/insulator) and Germanium (semiconductor) have negative temperature coefficients of resistance, so their resistance decreases with rising temperature. Therefore, Option (A) is the correct answer."
    }
  },
  {
    id: 93,
    question: "Which of the following graphs represents the variation of resistivity ρ with temperature T for copper? [NEET 2020 Phase 1]",
    option_a: "A non-linear upward curve at low temperatures that becomes linear at higher temperatures",
    option_b: "A straight line decreasing with temperature",
    option_c: "A horizontal constant line independent of temperature",
    option_d: "An exponentially decaying curve",
    correct_option: "A",
    explanation: "For copper, which is a typical metallic conductor:\n1. At very low temperatures (below ~50 K), resistivity ρ increases non-linearly with temperature (proportional to T⁵ according to Bloch-Grüneisen theory) due to electron-phonon scattering.\n2. Above room temperature, resistivity increases almost linearly with temperature: ρ(T) = ρ₀ [1 + α (T - T₀)].\nThus, the graph of ρ versus T for copper curves upward smoothly from near zero at very low temperatures and becomes linear at higher temperatures.\nTherefore, Option (A) is the correct answer.",
    similarQuestion: {
      question: "Which material shows almost negligible temperature dependence of resistivity, making it ideal for making standard resistance coils?",
      option_a: "Manganin",
      option_b: "Copper",
      option_c: "Silicon",
      option_d: "Iron",
      correct_option: "A",
      explanation: "Alloys like Manganin and Constantan possess very small temperature coefficients of resistivity (nearly flat ρ vs T curve), so their resistance remains virtually unchanged over a wide temperature range. Therefore, Option (A) is the correct answer."
    }
  }
];

