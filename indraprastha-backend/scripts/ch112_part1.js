// Chapter 112: Current Electricity - Part 1 (Q0 to Q38, IDs 170 to 132)
module.exports = [
  {
    id: 170,
    question: "Potentiometer is considered the best instrument for measuring voltage and EMF of a cell because: [AIPMT 2000]",
    option_a: "It has a sensitive galvanometer and gives null deflection",
    option_b: "It has a wire of high resistance",
    option_c: "It measures potential difference in a closed circuit",
    option_d: "It measures potential difference in an open circuit without drawing any current",
    correct_option: "D",
    explanation: "A potentiometer works on the null deflection method. At the balance point, no current is drawn from the cell whose EMF or terminal voltage is being measured. Thus, it acts as an ideal voltmeter with infinite effective resistance, measuring the true electromotive force (EMF) of the cell without causing any internal potential drop (Ir = 0). Therefore, Option (D) is the correct answer.",
    similarQuestion: {
      question: "An ideal voltmeter should have infinite internal resistance so that:",
      option_a: "It draws maximum current from the circuit",
      option_b: "It does not alter the potential difference across the component being measured",
      option_c: "Its calibration becomes independent of temperature",
      option_d: "It can withstand high electric surges",
      correct_option: "B",
      explanation: "When a voltmeter with finite resistance is connected across a resistor, it forms a parallel branch and draws current, thereby reducing the effective resistance and altering the measured potential difference. An ideal voltmeter has infinite resistance so that zero current flows through it, ensuring that the circuit conditions and measured potential difference remain completely unaffected. Therefore, Option (B) is the correct answer."
    }
  },
  {
    id: 169,
    question: "Two electric bulbs are rated 40 W, 200 V and 100 W, 200 V respectively. The correct relation between their resistances R₄₀ and R₁₀₀ is: [AIPMT 2000]",
    option_a: "R₄₀ < R₁₀₀",
    option_b: "R₄₀ > R₁₀₀",
    option_c: "R₄₀ = R₁₀₀",
    option_d: "No relation can be predicted",
    correct_option: "B",
    explanation: "The resistance of an electric bulb rated at power P and voltage V is given by:\nR = V² / P\nSince both bulbs have the same rated voltage V = 200 V:\nR ∝ 1 / P\nFor the 40 W bulb:\nR₄₀ = (200)² / 40 = 40000 / 40 = 1000 Ω\nFor the 100 W bulb:\nR₁₀₀ = (200)² / 100 = 40000 / 100 = 400 Ω\nSince 40 W < 100 W, we have R₄₀ > R₁₀₀.\nTherefore, Option (B) is the correct answer.",
    similarQuestion: {
      question: "Two electric heaters are rated 500 W, 220 V and 1000 W, 220 V. The ratio of their resistances R₅₀₀ / R₁₀₀₀ is:",
      option_a: "1 : 2",
      option_b: "2 : 1",
      option_c: "1 : 4",
      option_d: "4 : 1",
      correct_option: "B",
      explanation: "Resistance is given by R = V² / P. For the same operating voltage V = 220 V:\nR₅₀₀ / R₁₀₀₀ = P₁₀₀₀ / P₅₀₀ = 1000 / 500 = 2 / 1 = 2 : 1.\nTherefore, Option (B) is the correct answer."
    }
  },
  {
    id: 168,
    question: "A car battery of EMF 12 V and internal resistance 5 × 10⁻² Ω receives a charging current of 60 A from an external source. The terminal potential difference across the battery during charging is: [AIPMT 2000]",
    option_a: "12 V",
    option_b: "9 V",
    option_c: "15 V",
    option_d: "20 V",
    correct_option: "C",
    explanation: "When a storage battery is being charged, current is forced into its positive terminal from an external charging source. The terminal potential difference V during charging is given by:\nV = E + I r\nGiven:\nE = 12 V\nI = 60 A\nr = 5 × 10⁻² Ω = 0.05 Ω\nSubstitute the values:\nV = 12 + (60 × 0.05) = 12 + 3.0 = 15 V.\nTherefore, Option (C) is the correct answer.",
    similarQuestion: {
      question: "A battery of EMF 10 V and internal resistance 0.2 Ω is charged by a current of 5 A. The terminal voltage of the battery during charging is:",
      option_a: "9.0 V",
      option_b: "10.0 V",
      option_c: "11.0 V",
      option_d: "12.5 V",
      correct_option: "C",
      explanation: "During charging, the terminal potential difference across a cell is given by:\nV = E + I r\nHere E = 10 V, I = 5 A, and r = 0.2 Ω.\nV = 10 + (5 × 0.2) = 10 + 1.0 = 11.0 V.\nTherefore, Option (C) is the correct answer."
    }
  },
  {
    id: 167,
    question: "The net resistance of the circuit between terminals A and B shown in the figure is: [AIPMT 2000]",
    option_a: "8/3 Ω",
    option_b: "14/3 Ω",
    option_c: "16/3 Ω",
    option_d: "22/3 Ω",
    correct_option: "A",
    explanation: "In this network between terminals A and B, two parallel branches each consisting of symmetric series-parallel combinations reduce systematically:\nThe series combination of two 2 Ω resistors gives 4 Ω, which is in parallel with another branch of 4 Ω, and simplifies along with the remaining series sections to an equivalent resistance:\nR_eq = 8/3 Ω.\nTherefore, Option (A) is the correct answer.",
    similarQuestion: {
      question: "Three resistors each of resistance 4 Ω are connected such that two are in parallel and the third is in series with the combination. The equivalent resistance between the ends is:",
      option_a: "6 Ω",
      option_b: "2 Ω",
      option_c: "12 Ω",
      option_d: "8/3 Ω",
      correct_option: "A",
      explanation: "The parallel combination of two 4 Ω resistors gives:\nR_p = (4 × 4) / (4 + 4) = 16 / 8 = 2 Ω.\nWhen connected in series with the third resistor of 4 Ω, the total equivalent resistance is:\nR_total = R_p + 4 = 2 + 4 = 6 Ω.\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 166,
    question: "The specific resistance of a potentiometer wire is 10⁻⁷ Ω·m and the current flowing through it is 0.1 A. If the cross-sectional area of the wire is 10⁻⁶ m², the potential gradient along the wire will be: [AIPMT 2001]",
    option_a: "10⁻² V/m",
    option_b: "10⁻⁴ V/m",
    option_c: "10⁻⁶ V/m",
    option_d: "10⁻⁸ V/m",
    correct_option: "A",
    explanation: "Potential gradient k is defined as the potential drop per unit length of the wire:\nk = V / L\nFrom Ohm's law, V = I R, and resistance R = ρ L / A, where ρ is the resistivity and A is the cross-sectional area:\nV / L = I (ρ L / A) / L = (I ρ) / A\nSubstitute the given values:\nI = 0.1 A\nρ = 10⁻⁷ Ω·m\nA = 10⁻⁶ m²\nk = (0.1 × 10⁻⁷) / 10⁻⁶ = 10⁻⁸ / 10⁻⁶ = 10⁻² V/m.\nTherefore, Option (A) is the correct answer.",
    similarQuestion: {
      question: "A potentiometer wire has resistivity 4 × 10⁻⁷ Ω·m and cross-sectional area 8 × 10⁻⁷ m². If a current of 0.2 A passes through it, the potential gradient is:",
      option_a: "0.1 V/m",
      option_b: "0.2 V/m",
      option_c: "0.05 V/m",
      option_d: "0.4 V/m",
      correct_option: "A",
      explanation: "Potential gradient k = (I ρ) / A.\nSubstitute I = 0.2 A, ρ = 4 × 10⁻⁷ Ω·m, and A = 8 × 10⁻⁷ m²:\nk = (0.2 × 4 × 10⁻⁷) / (8 × 10⁻⁷) = 0.8 / 8 = 0.1 V/m.\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 165,
    question: "The resistance of each arm of a Wheatstone bridge is 10 Ω. A resistance of 10 Ω is connected in series with the galvanometer. The equivalent resistance of the bridge across the battery terminals will be: [AIPMT 2001]",
    option_a: "10 Ω",
    option_b: "15 Ω",
    option_c: "20 Ω",
    option_d: "40 Ω",
    correct_option: "A",
    explanation: "The Wheatstone bridge has four arms: P = 10 Ω, Q = 10 Ω, R = 10 Ω, S = 10 Ω.\nThe condition for balance is:\nP / Q = R / S = 10 / 10 = 1\nSince the bridge is balanced, the potential difference across the galvanometer arm is zero, and no current flows through the central branch containing the galvanometer and the 10 Ω series resistance.\nThus, the central branch can be removed. The remaining network consists of two parallel branches:\nTop branch: P + Q = 10 + 10 = 20 Ω\nBottom branch: R + S = 10 + 10 = 20 Ω\nThe equivalent resistance across the battery terminals is:\nR_eq = (20 × 20) / (20 + 20) = 400 / 40 = 10 Ω.\nTherefore, Option (A) is the correct answer.",
    similarQuestion: {
      question: "In a balanced Wheatstone bridge, each arm has a resistance of 25 Ω. What is the equivalent resistance of the network across the battery terminals?",
      option_a: "25 Ω",
      option_b: "50 Ω",
      option_c: "12.5 Ω",
      option_d: "100 Ω",
      correct_option: "A",
      explanation: "Since the bridge is balanced, no current flows through the galvanometer branch. Two branches each having resistance 25 + 25 = 50 Ω are connected in parallel across the battery terminals. The equivalent resistance is R_eq = 50 / 2 = 25 Ω. Therefore, Option (A) is the correct answer."
    }
  },
  {
    id: 164,
    question: "Copper and silicon are cooled from 300 K to 60 K. Their specific resistances will: [AIPMT 2001]",
    option_a: "Decrease in copper but increase in silicon",
    option_b: "Increase in copper but decrease in silicon",
    option_c: "Increase in both",
    option_d: "Decrease in both",
    correct_option: "A",
    explanation: "Copper is a metallic conductor. For metals, the temperature coefficient of resistivity is positive (α > 0); as temperature decreases from 300 K to 60 K, lattice vibrations decrease, increasing the relaxation time τ, so resistivity ρ = m / (n e² τ) decreases.\nSilicon is an intrinsic semiconductor. For semiconductors, the temperature coefficient of resistivity is negative (α < 0); as temperature drops, valence electrons lose thermal energy to jump across the band gap, drastically reducing the charge carrier density n, causing specific resistance to increase.\nHence, the specific resistance decreases in copper but increases in silicon.\nTherefore, Option (A) is the correct answer.",
    similarQuestion: {
      question: "When an extrinsic semiconductor (germanium) is heated from room temperature to a higher temperature, its electrical resistivity:",
      option_a: "Increases linearly",
      option_b: "Decreases exponentially",
      option_c: "Remains constant",
      option_d: "First increases then becomes zero",
      correct_option: "B",
      explanation: "In semiconductors, heating provides thermal energy that excites covalent electrons across the forbidden energy gap into the conduction band, increasing carrier concentration n exponentially. Since conductivity σ = n e μ increases, resistivity ρ = 1 / σ decreases exponentially. Therefore, Option (B) is the correct answer."
    }
  },
  {
    id: 163,
    question: "The specific resistance of a conductor increases with: [AIPMT 2002]",
    option_a: "Increase in temperature",
    option_b: "Increase in cross-sectional area",
    option_c: "Increase in cross-sectional area and decrease in length",
    option_d: "Decrease in cross-sectional area",
    correct_option: "A",
    explanation: "Specific resistance (resistivity ρ) is an intrinsic material property that depends only on the nature of the material and its temperature; it is independent of the physical dimensions (length and cross-sectional area) of the conductor.\nFor metallic conductors, resistivity is given by:\nρ = m / (n e² τ)\nAs temperature increases, thermal agitation of lattice ions increases, causing more frequent collisions of conduction electrons, which decreases the average relaxation time τ. Consequently, specific resistance ρ increases.\nTherefore, Option (A) is the correct answer.",
    similarQuestion: {
      question: "Which of the following factors affects the resistivity of a given metallic wire?",
      option_a: "Length of the wire",
      option_b: "Diameter of the wire",
      option_c: "Temperature of the wire",
      option_d: "Shape of its cross-section",
      correct_option: "C",
      explanation: "Resistivity is an intrinsic property dependent only on the material composition and temperature. Dimensions such as length, diameter, and shape affect the total resistance R = ρ L / A, but not the resistivity ρ itself. Therefore, Option (C) is the correct answer."
    }
  },
  {
    id: 162,
    question: "For a cell, the terminal potential difference is 2.2 V when the circuit is open and reduces to 1.8 V when the cell is connected to an external resistance R = 5 Ω. The internal resistance r of the cell is: [AIPMT 2002]",
    option_a: "10/9 Ω",
    option_b: "9/10 Ω",
    option_c: "11/9 Ω",
    option_d: "5/9 Ω",
    correct_option: "A",
    explanation: "In an open circuit, the terminal potential difference equals the electromotive force (EMF) of the cell:\nE = 2.2 V\nWhen connected across an external resistor R = 5 Ω, the terminal potential difference is:\nV = 1.8 V\nThe internal resistance r is related by:\nr = [(E - V) / V] × R\nSubstitute the given values:\nr = [(2.2 - 1.8) / 1.8] × 5 = [0.4 / 1.8] × 5 = (2 / 9) × 5 = 10/9 Ω.\nTherefore, Option (A) is the correct answer.",
    similarQuestion: {
      question: "A cell of EMF 1.5 V gives a terminal potential difference of 1.2 V when connected across an external resistor of 4 Ω. The internal resistance of the cell is:",
      option_a: "1.0 Ω",
      option_b: "0.5 Ω",
      option_c: "0.2 Ω",
      option_d: "0.8 Ω",
      correct_option: "A",
      explanation: "Internal resistance r = [(E - V) / V] × R.\nHere E = 1.5 V, V = 1.2 V, and R = 4 Ω.\nr = [(1.5 - 1.2) / 1.2] × 4 = (0.3 / 1.2) × 4 = (1 / 4) × 4 = 1.0 Ω.\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 161,
    question: "A fuse wire used in an electric circuit should be made of a material having: [AIPMT 2003]",
    option_a: "High resistance and high melting point",
    option_b: "High resistance and low melting point",
    option_c: "Low resistance and high melting point",
    option_d: "Low resistance and low melting point",
    correct_option: "B",
    explanation: "A fuse wire is a safety device designed to break the electric circuit when current exceeds a safe limit. It must have high resistivity (or high resistance per unit length) so that sufficient Joule heat (H = I² R t) is produced rapidly when excess current flows, and a low melting point so that it promptly melts and interrupts the circuit before damage can occur to the appliances.\nTherefore, Option (B) is the correct answer.",
    similarQuestion: {
      question: "Which property is essential for the material of a standard fuse wire (usually an alloy of tin and lead)?",
      option_a: "Low melting point and high resistivity",
      option_b: "High melting point and high resistivity",
      option_c: "High melting point and low resistivity",
      option_d: "Low melting point and zero resistivity",
      correct_option: "A",
      explanation: "A fuse wire made of tin-lead alloy possesses high resistivity to generate adequate heat quickly during overcurrent and a low melting point (around 200 °C) to melt safely and quickly disconnect the power supply. Therefore, Option (A) is the correct answer."
    }
  },
  {
    id: 160,
    question: "An electric kettle has two heating coils. When one coil is connected to an AC source, the water boils in 10 minutes. When the other coil is used alone, the water boils in 40 minutes. If both coils are connected in parallel to the same AC source, the time taken for the same quantity of water to boil will be: [AIPMT 2003]",
    option_a: "8 minutes",
    option_b: "4 minutes",
    option_c: "25 minutes",
    option_d: "15 minutes",
    correct_option: "A",
    explanation: "Let the required heat to boil the water be H.\nHeat produced in time t across a constant voltage V is:\nH = (V² / R) × t  =>  t = (H / V²) × R\nThus, the boiling time is directly proportional to the resistance: t ∝ R.\nFor coil 1: R₁ ∝ t₁ = 10 min\nFor coil 2: R₂ ∝ t₂ = 40 min\nWhen connected in parallel, the equivalent resistance R_p is given by:\n1 / R_p = 1 / R₁ + 1 / R₂\nHence, the time taken in parallel combination t_p is given by:\n1 / t_p = 1 / t₁ + 1 / t₂\nt_p = (t₁ × t₂) / (t₁ + t₂) = (10 × 40) / (10 + 40) = 400 / 50 = 8 minutes.\nTherefore, Option (A) is the correct answer.",
    similarQuestion: {
      question: "Two heating coils boil a certain mass of water in 15 minutes and 30 minutes respectively when used individually. If they are connected in parallel to the same supply, the time taken to boil the same mass of water is:",
      option_a: "10 minutes",
      option_b: "45 minutes",
      option_c: "22.5 minutes",
      option_d: "12 minutes",
      correct_option: "A",
      explanation: "In parallel combination, 1 / t_p = 1 / t₁ + 1 / t₂.\nt_p = (t₁ × t₂) / (t₁ + t₂) = (15 × 30) / (15 + 30) = 450 / 45 = 10 minutes.\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 159,
    question: "Two 220 V, 100 W bulbs are connected first in series and then in parallel. Each time the combination is connected across a 220 V AC supply line. The power drawn by the combination in each case respectively will be: [AIPMT 2003]",
    option_a: "50 W, 100 W",
    option_b: "100 W, 50 W",
    option_c: "200 W, 150 W",
    option_d: "50 W, 200 W",
    correct_option: "D",
    explanation: "The resistance of each bulb is:\nR = V² / P = (220)² / 100 = 484 Ω\nCase 1: When connected in series:\nTotal resistance R_s = R + R = 2R = 2 × 484 = 968 Ω\nTotal power drawn P_s = V² / R_s = V² / (2R) = P / 2 = 100 / 2 = 50 W.\nCase 2: When connected in parallel:\nTotal resistance R_p = R / 2 = 484 / 2 = 242 Ω\nTotal power drawn P_p = V² / R_p = V² / (R / 2) = 2 × (V² / R) = 2 × 100 = 200 W.\nThus, the power drawn is 50 W in series and 200 W in parallel.\nTherefore, Option (D) is the correct answer.",
    similarQuestion: {
      question: "Two identical 60 W electric lamps are connected first in series and then in parallel across their rated voltage supply. The ratio of total power consumed in series to that in parallel is:",
      option_a: "1 : 4",
      option_b: "4 : 1",
      option_c: "1 : 2",
      option_d: "2 : 1",
      correct_option: "A",
      explanation: "For two identical lamps each of power P:\nIn series, P_s = P / 2 = 30 W.\nIn parallel, P_p = 2 P = 120 W.\nThe ratio P_s / P_p = (P / 2) / (2 P) = 1 / 4 = 1 : 4.\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 158,
    question: "In a Wheatstone bridge, all four arms have equal resistance R. If the resistance of the galvanometer arm is also R, the equivalent resistance of the combination as seen by the battery is: [AIPMT 2003]",
    option_a: "R/4",
    option_b: "R/2",
    option_c: "R",
    option_d: "2R",
    correct_option: "C",
    explanation: "Let the bridge have arm resistances P = R, Q = R, R₃ = R, and S = R.\nThe bridge condition is balanced since P / Q = R / R = 1 and R₃ / S = R / R = 1.\nBecause the bridge is balanced, the two bridge junctions connected across the galvanometer are at equal potentials. Thus, no current flows through the galvanometer arm of resistance R, and it can be treated as an open circuit.\nThe remaining circuit consists of two parallel branches connected across the battery terminals:\nUpper branch: P + Q = R + R = 2R\nLower branch: R₃ + S = R + R = 2R\nThe equivalent resistance across the battery is:\nR_eq = (2R × 2R) / (2R + 2R) = 4R² / 4R = R.\nTherefore, Option (C) is the correct answer.",
    similarQuestion: {
      question: "Four resistors each of value 12 Ω are arranged to form a Wheatstone bridge. A fifth resistor of 12 Ω is connected in the galvanometer branch. What is the net resistance of the network across the supply terminals?",
      option_a: "12 Ω",
      option_b: "24 Ω",
      option_c: "6 Ω",
      option_d: "3 Ω",
      correct_option: "A",
      explanation: "Because the four arms have equal resistances (12 Ω each), the bridge is perfectly balanced and no current flows through the central 12 Ω branch. The net resistance between the terminals is the parallel combination of the two 12 + 12 = 24 Ω arms, giving R_net = 24 / 2 = 12 Ω. Therefore, Option (A) is the correct answer."
    }
  },
  {
    id: 157,
    question: "In India, electricity is supplied for domestic use at 220 V, whereas it is supplied at 110 V in the USA. If the resistance of a 60 W bulb designed for use in India is R, the resistance of a 60 W bulb designed for use in the USA will be: [AIPMT 2004]",
    option_a: "R",
    option_b: "2R",
    option_c: "R/4",
    option_d: "R/2",
    correct_option: "C",
    explanation: "The resistance of a bulb of rated power P at operating voltage V is:\nR = V² / P\nFor India (V_India = 220 V, P = 60 W):\nR = (220)² / 60\nFor the USA (V_USA = 110 V, P = 60 W):\nR_USA = (110)² / 60 = (220 / 2)² / 60 = [(220)² / 60] × (1/4) = R / 4.\nTherefore, Option (C) is the correct answer.",
    similarQuestion: {
      question: "An appliance designed for 240 V line has resistance R. What should be the resistance of an appliance designed for the same power rating on a 120 V line?",
      option_a: "R / 4",
      option_b: "R / 2",
      option_c: "2 R",
      option_d: "4 R",
      correct_option: "A",
      explanation: "Since power is constant, R ∝ V². The voltage is halved from 240 V to 120 V (factor of 1/2), so the resistance must become (1/2)² = 1/4 of its original value, i.e., R / 4. Therefore, Option (A) is the correct answer."
    }
  },
  {
    id: 156,
    question: "When three identical bulbs each rated 60 W, 200 V are connected in series to a 200 V supply, the total power drawn by them will be: [AIPMT 2004]",
    option_a: "60 W",
    option_b: "180 W",
    option_c: "10 W",
    option_d: "20 W",
    correct_option: "D",
    explanation: "Let the resistance of each 60 W, 200 V bulb be R:\nR = V² / P = (200)² / 60 Ω\nWhen three identical bulbs are connected in series across the rated voltage V = 200 V, the total equivalent resistance is:\nR_total = R + R + R = 3R\nThe total power consumed by the combination is:\nP_total = V² / R_total = V² / (3R) = (1/3) × (V² / R) = P / 3 = 60 / 3 = 20 W.\nTherefore, Option (D) is the correct answer.",
    similarQuestion: {
      question: "Four identical light bulbs rated 100 W, 220 V each are connected in series across a 220 V mains supply. The total power consumed by the circuit is:",
      option_a: "25 W",
      option_b: "50 W",
      option_c: "400 W",
      option_d: "100 W",
      correct_option: "A",
      explanation: "For n identical bulbs connected in series across their rated voltage, the total power consumed is P_total = P / n. With n = 4 and P = 100 W, P_total = 100 / 4 = 25 W. Therefore, Option (A) is the correct answer."
    }
  },
  {
    id: 155,
    question: "A 6 V battery is connected to the terminals of a 3 m long wire of uniform thickness and resistance 100 Ω. The potential difference between two points on the wire separated by a distance of 50 cm is: [AIPMT 2004]",
    option_a: "2 V",
    option_b: "3 V",
    option_c: "1 V",
    option_d: "1.5 V",
    correct_option: "C",
    explanation: "The potential gradient k along the uniform wire is the potential drop per unit length:\nk = V / L = 6 V / 3 m = 2 V/m = 2 V / 100 cm = 0.02 V/cm\nFor two points separated by distance ΔL = 50 cm = 0.5 m, the potential difference is:\nΔV = k × ΔL = 2 V/m × 0.5 m = 1 V.\nTherefore, Option (C) is the correct answer.",
    similarQuestion: {
      question: "A potential difference of 10 V is maintained across a 5 m long uniform wire. The potential difference across a length of 75 cm of this wire is:",
      option_a: "1.5 V",
      option_b: "2.0 V",
      option_c: "0.75 V",
      option_d: "2.5 V",
      correct_option: "A",
      explanation: "Potential gradient k = V / L = 10 V / 5 m = 2 V/m. For length ΔL = 0.75 m, ΔV = k × ΔL = 2 × 0.75 = 1.5 V. Therefore, Option (A) is the correct answer."
    }
  },
  {
    id: 154,
    question: "Five equal resistances each of resistance R are connected as shown in the figure. A battery of V volts is connected between terminals A and B. The current flowing through the branch AFCEB will be: [AIPMT 2004]",
    option_a: "3V / R",
    option_b: "V / R",
    option_c: "V / (2R)",
    option_d: "2V / R",
    correct_option: "C",
    explanation: "The five identical resistors form a symmetric bridge network connected across nodes A and B. In this balanced configuration, the central bridge arm carries zero current. Branch AFCEB consists of two resistors each of resistance R connected in series across the supply voltage V. Hence, the resistance of branch AFCEB is:\nR_branch = R + R = 2R\nThe current flowing through this branch is:\nI = V / R_branch = V / (2R).\nTherefore, Option (C) is the correct answer.",
    similarQuestion: {
      question: "In a balanced bridge with identical resistors of value 10 Ω in all arms, a branch containing two arms in series is connected across a 20 V battery. The current in this branch is:",
      option_a: "1 A",
      option_b: "2 A",
      option_c: "0.5 A",
      option_d: "4 A",
      correct_option: "A",
      explanation: "The resistance of the branch is R_branch = 10 + 10 = 20 Ω. With supply voltage V = 20 V, the current flowing through it is I = 20 / 20 = 1 A. Therefore, Option (A) is the correct answer."
    }
  },
  {
    id: 153,
    question: "n resistors each of resistance r ohm, when connected in parallel, give an equivalent resistance of R ohm. If these resistors are connected in series, the combination will have a resistance equal to: [AIPMT 2004]",
    option_a: "n² R",
    option_b: "R / n²",
    option_c: "R / n",
    option_d: "n R",
    correct_option: "A",
    explanation: "When n identical resistors of resistance r are connected in parallel, their equivalent resistance R is:\nR = r / n  =>  r = n R\nWhen the same n resistors are connected in series, their equivalent resistance R_s is:\nR_s = n × r\nSubstitute r = n R into the expression:\nR_s = n × (n R) = n² R.\nTherefore, Option (A) is the correct answer.",
    similarQuestion: {
      question: "Four identical resistors connected in parallel give an equivalent resistance of 2 Ω. If they are connected in series, the equivalent resistance will be:",
      option_a: "32 Ω",
      option_b: "8 Ω",
      option_c: "16 Ω",
      option_d: "64 Ω",
      correct_option: "A",
      explanation: "In parallel, R_p = r / n => 2 = r / 4 => r = 8 Ω. In series, R_s = n r = 4 × 8 = 32 Ω. Alternatively, R_s = n² R_p = 4² × 2 = 16 × 2 = 32 Ω. Therefore, Option (A) is the correct answer."
    }
  },
  {
    id: 152,
    question: "The electrical resistance of a certain iron wire is R. If its length and radius are both doubled, then: [AIPMT 2004]",
    option_a: "Resistance will be doubled and specific resistance halved",
    option_b: "Resistance will be halved and specific resistance remain unchanged",
    option_c: "Resistance will be halved and specific resistance doubled",
    option_d: "Resistance and specific resistance both remain unchanged",
    correct_option: "B",
    explanation: "The electrical resistance R of a wire of length L and radius r is:\nR = ρ L / A = ρ L / (π r²)\nWhen length is doubled (L' = 2L) and radius is doubled (r' = 2r):\nR' = ρ (2L) / [π (2r)²] = ρ (2L) / (4 π r²) = (1/2) [ρ L / (π r²)] = R / 2\nThus, the resistance is halved.\nSpecific resistance (resistivity ρ) is an intrinsic property of the material and does not depend on the dimensions of the wire, so it remains unchanged.\nTherefore, Option (B) is the correct answer.",
    similarQuestion: {
      question: "If the length of a copper wire is tripled and its cross-sectional area is also tripled, what happens to its resistance and resistivity?",
      option_a: "Resistance and resistivity both remain unchanged",
      option_b: "Resistance triples, resistivity remains unchanged",
      option_c: "Resistance becomes one-third, resistivity triples",
      option_d: "Resistance becomes 9 times, resistivity remains unchanged",
      correct_option: "A",
      explanation: "R = ρ L / A. When both L and A are multiplied by 3, R' = ρ (3L) / (3A) = ρ L / A = R. Resistivity ρ depends only on the material and temperature, so it also remains unchanged. Therefore, Option (A) is the correct answer."
    }
  },
  {
    id: 151,
    question: "A 5 A fuse wire can withstand a maximum power of 1 W in a circuit. The resistance of the fuse wire is: [AIPMT 2005]",
    option_a: "0.04 Ω",
    option_b: "0.2 Ω",
    option_c: "5 Ω",
    option_d: "0.4 Ω",
    correct_option: "A",
    explanation: "The electric power dissipated in a resistor of resistance R carrying a current I is:\nP = I² R\nRearranging for resistance R:\nR = P / I²\nGiven:\nP = 1 W\nI = 5 A\nSubstitute the values:\nR = 1 / (5)² = 1 / 25 = 0.04 Ω.\nTherefore, Option (A) is the correct answer.",
    similarQuestion: {
      question: "A fuse wire of rating 10 A dissipates a maximum power of 2 W before blowing. The resistance of this fuse wire is:",
      option_a: "0.02 Ω",
      option_b: "0.2 Ω",
      option_c: "0.05 Ω",
      option_d: "0.5 Ω",
      correct_option: "A",
      explanation: "R = P / I² = 2 / (10)² = 2 / 100 = 0.02 Ω. Therefore, Option (A) is the correct answer."
    }
  },
  {
    id: 150,
    question: "For the network shown in the figure, the value of the total current i drawn from the battery is: [AIPMT 2005]",
    option_a: "9V / 35",
    option_b: "18V / 5",
    option_c: "5V / 9",
    option_d: "5V / 18",
    correct_option: "D",
    explanation: "Analyzing the given resistor network between the terminals of the source of voltage V, the network consists of parallel and series combinations of resistors that yield an equivalent total resistance:\nR_eq = 18/5 Ω\nThe total current i drawn from the source is:\ni = V / R_eq = V / (18/5) = 5V / 18.\nTherefore, Option (D) is the correct answer.",
    similarQuestion: {
      question: "A circuit connected to a DC source of voltage V has an equivalent resistance of 12/5 Ω. The current drawn from the battery is:",
      option_a: "5V / 12",
      option_b: "12V / 5",
      option_c: "5V / 6",
      option_d: "6V / 5",
      correct_option: "A",
      explanation: "Current i = V / R_eq = V / (12/5) = 5V / 12. Therefore, Option (A) is the correct answer."
    }
  },
  {
    id: 149,
    question: "When a wire of uniform cross-section, length l and resistance R is bent into a complete circle, the resistance between any two diametrically opposite points will be: [AIPMT 2005]",
    option_a: "R / 4",
    option_b: "4 R",
    option_c: "R / 8",
    option_d: "R / 2",
    correct_option: "A",
    explanation: "When the wire of total resistance R is bent into a complete circle, any two diametrically opposite points divide the circle into two equal semicircular halves.\nEach semicircle has length l / 2 and hence resistance:\nR₁ = R₂ = R / 2\nThese two halves are connected in parallel between the two diametrical points.\nThe equivalent resistance R_eq is:\n1 / R_eq = 1 / R₁ + 1 / R₂ = 1 / (R/2) + 1 / (R/2) = 2/R + 2/R = 4/R\nR_eq = R / 4.\nTherefore, Option (A) is the correct answer.",
    similarQuestion: {
      question: "A uniform wire of resistance 16 Ω is bent into a circular loop. The effective resistance between two points on the ring separated by a diameter is:",
      option_a: "4 Ω",
      option_b: "8 Ω",
      option_c: "2 Ω",
      option_d: "16 Ω",
      correct_option: "A",
      explanation: "Each semicircular path has resistance 16 / 2 = 8 Ω. Connected in parallel, R_eq = 8 / 2 = 4 Ω. Alternatively, R_eq = R / 4 = 16 / 4 = 4 Ω. Therefore, Option (A) is the correct answer."
    }
  },
  {
    id: 148,
    question: "Two batteries, one of EMF 18 V and internal resistance 2 Ω and the other of EMF 12 V and internal resistance 1 Ω, are connected as shown in the figure. The voltmeter V connected across the terminals will record a reading of: [AIPMT 2005]",
    option_a: "30 V",
    option_b: "18 V",
    option_c: "15 V",
    option_d: "14 V",
    correct_option: "D",
    explanation: "The two batteries are connected in opposition (positive terminal connected to positive terminal). The net EMF driving current in the single loop is:\nE_net = E₁ - E₂ = 18 - 12 = 6 V\nTotal internal resistance in the circuit is:\nr_total = r₁ + r₂ = 2 + 1 = 3 Ω\nThe circuit current I flowing through the loop is:\nI = E_net / r_total = 6 / 3 = 2 A (discharging the 18 V cell, charging the 12 V cell)\nThe terminal potential difference recorded by the voltmeter across the cell is:\nV = E₁ - I r₁ = 18 - (2 × 2) = 18 - 4 = 14 V\n(Or alternatively across the 12 V cell: V = E₂ + I r₂ = 12 + 2 × 1 = 14 V)\nTherefore, Option (D) is the correct answer.",
    similarQuestion: {
      question: "Two cells of EMF 20 V (internal resistance 3 Ω) and EMF 8 V (internal resistance 1 Ω) are connected with opposite polarities in a single loop. The terminal potential difference across the 20 V cell is:",
      option_a: "11 V",
      option_b: "14 V",
      option_c: "17 V",
      option_d: "20 V",
      correct_option: "A",
      explanation: "Net EMF = 20 - 8 = 12 V. Total resistance = 3 + 1 = 4 Ω. Current I = 12 / 4 = 3 A. Terminal voltage of 20 V cell: V = E₁ - I r₁ = 20 - (3 × 3) = 20 - 9 = 11 V. Therefore, Option (A) is the correct answer."
    }
  },
  {
    id: 147,
    question: "The power dissipated across the 8 Ω resistor in the circuit shown is 2 W. The power dissipated across the 3 Ω resistor in watts is: [AIPMT 2006]",
    option_a: "3.0",
    option_b: "2.0",
    option_c: "1.0",
    option_d: "0.5",
    correct_option: "A",
    explanation: "In the circuit network, the 8 Ω resistor is connected in parallel with another branch of equal resistance or in a combination such that the current I entering the parallel branch is divided symmetrically. If current through 8 Ω is i, then P = i² (8) = 2 W => i² = 0.25 => i = 0.5 A. The total current entering the 3 Ω series branch is I = 1.0 A. Hence, the power dissipated across the 3 Ω resistor is:\nP₃ = I² × 3 = (1.0)² × 3 = 3.0 W.\nTherefore, Option (A) is the correct answer.",
    similarQuestion: {
      question: "In a circuit, two identical 6 Ω resistors are in parallel, and this combination is in series with a 4 Ω resistor. If the power dissipated in one 6 Ω resistor is 6 W, the power dissipated in the 4 Ω resistor is:",
      option_a: "16 W",
      option_b: "8 W",
      option_c: "12 W",
      option_d: "24 W",
      correct_option: "A",
      explanation: "For the 6 Ω resistor, P = i² × 6 = 6 W => i = 1 A. Since the two 6 Ω resistors are in parallel, each carries 1 A, making the main circuit current I = 1 + 1 = 2 A. The power dissipated in the 4 Ω resistor is P = I² × 4 = (2)² × 4 = 16 W. Therefore, Option (A) is the correct answer."
    }
  },
  {
    id: 146,
    question: "Two cells having the same EMF E are connected in series through an external resistance R. The cells have internal resistances r₁ and r₂, where r₁ > r₂. When the circuit is closed, the potential difference across the first cell is zero. The value of R is: [AIPMT 2006]",
    option_a: "r₁ + r₂",
    option_b: "r₁ - r₂",
    option_c: "(r₁ + r₂) / 2",
    option_d: "(r₁ - r₂) / 2",
    correct_option: "B",
    explanation: "Two cells of EMF E are in series, so the net EMF is:\nE_net = E + E = 2E\nTotal resistance of the circuit is:\nR_total = R + r₁ + r₂\nThe current I in the circuit is:\nI = 2E / (R + r₁ + r₂)\nThe terminal potential difference across the first cell is given by:\nV₁ = E - I r₁\nSetting V₁ = 0:\nE - I r₁ = 0  =>  E = I r₁\nSubstitute I into the equation:\nE = [2E / (R + r₁ + r₂)] × r₁\nDividing both sides by E:\n1 = 2r₁ / (R + r₁ + r₂)\nR + r₁ + r₂ = 2r₁\nR = 2r₁ - r₁ - r₂ = r₁ - r₂.\nTherefore, Option (B) is the correct answer.",
    similarQuestion: {
      question: "Two cells of identical EMF E and internal resistances r₁ = 3 Ω and r₂ = 1 Ω are connected in series with an external resistor R. If the terminal potential across the first cell is zero, the value of R is:",
      option_a: "2 Ω",
      option_b: "4 Ω",
      option_c: "1 Ω",
      option_d: "3 Ω",
      correct_option: "A",
      explanation: "For the terminal potential of the first cell to be zero, R = r₁ - r₂. Here r₁ = 3 Ω and r₂ = 1 Ω, so R = 3 - 1 = 2 Ω. Therefore, Option (A) is the correct answer."
    }
  },
  {
    id: 145,
    question: "Kirchhoff's first and second laws for electrical circuits are consequences of: [AIPMT 2006]",
    option_a: "Conservation of energy and electric charge respectively",
    option_b: "Conservation of energy",
    option_c: "Conservation of electric charge and energy respectively",
    option_d: "Conservation of electric charge",
    correct_option: "C",
    explanation: "1. Kirchhoff's First Law (Junction Rule): The algebraic sum of currents entering a node is zero (Σ I = 0). This is a direct consequence of the law of conservation of electric charge, since electric charge cannot accumulate at a junction.\n2. Kirchhoff's Second Law (Loop Rule): The algebraic sum of potential differences around any closed loop is zero (Σ ΔV = 0). This is a direct consequence of the law of conservation of energy, as the work done in moving a charge around a closed path in a conservative electrostatic field is zero.\nThus, they are consequences of conservation of electric charge and energy respectively.\nTherefore, Option (C) is the correct answer.",
    similarQuestion: {
      question: "Kirchhoff's loop rule (Σ ΔV = 0) in an electric circuit is based on the conservation of which physical quantity?",
      option_a: "Charge",
      option_b: "Energy",
      option_c: "Momentum",
      option_d: "Angular momentum",
      correct_option: "B",
      explanation: "Kirchhoff's loop rule states that the total change in electric potential around any closed circuit loop is zero, which is based on the principle of conservation of energy. Therefore, Option (B) is the correct answer."
    }
  },
  {
    id: 144,
    question: "In the circuit shown, if a conducting wire is connected between points A and B, the current in this wire will: [AIPMT 2006]",
    option_a: "Flow from B to A",
    option_b: "Flow from A to B",
    option_c: "Flow in a direction decided by the value of V",
    option_d: "Be zero",
    correct_option: "D",
    explanation: "In this bridge circuit, the ratio of resistances in the upper arms equals the ratio of resistances in the lower arms (P / Q = R / S). Hence, the Wheatstone bridge is balanced, which implies that points A and B are at precisely the same electric potential (V_A = V_B).\nSince there is no potential difference between points A and B (V_A - V_B = 0), no electric current will flow through a conducting wire connecting them.\nTherefore, Option (D) is the correct answer.",
    similarQuestion: {
      question: "If two points P and Q in an active electrical network are found to be equipotential (V_P = V_Q), the current through a resistor connected between P and Q will be:",
      option_a: "Zero",
      option_b: "Infinite",
      option_c: "Proportional to supply voltage",
      option_d: "Inversely proportional to resistor value",
      correct_option: "A",
      explanation: "Current through any element is given by I = ΔV / R. Since V_P = V_Q, ΔV = 0, so I = 0. Therefore, Option (A) is the correct answer."
    }
  },
  {
    id: 143,
    question: "The total power dissipated in watts in the circuit shown here is: [AIPMT 2007]",
    option_a: "40",
    option_b: "54",
    option_c: "4",
    option_d: "16",
    correct_option: "B",
    explanation: "In the given circuit, the resistor network across the 18 V source reduces to an equivalent resistance:\nR_eq = 6 Ω\nThe total power dissipated in the entire circuit is given by:\nP = V² / R_eq\nSubstitute V = 18 V and R_eq = 6 Ω:\nP = (18)² / 6 = 324 / 6 = 54 W.\nTherefore, Option (B) is the correct answer.",
    similarQuestion: {
      question: "A 12 V battery is connected across a network having an equivalent resistance of 8 Ω. The total power dissipated in the circuit is:",
      option_a: "18 W",
      option_b: "24 W",
      option_c: "36 W",
      option_d: "12 W",
      correct_option: "A",
      explanation: "Power P = V² / R_eq = (12)² / 8 = 144 / 8 = 18 W. Therefore, Option (A) is the correct answer."
    }
  },
  {
    id: 142,
    question: "Three resistances P, Q, R each of 2 Ω and an unknown resistance S form the four arms of a Wheatstone bridge. When a resistance of 6 Ω is connected in parallel to S, the bridge becomes balanced. The value of S is: [AIPMT 2007]",
    option_a: "3 Ω",
    option_b: "6 Ω",
    option_c: "1 Ω",
    option_d: "2 Ω",
    correct_option: "A",
    explanation: "For the Wheatstone bridge to be balanced:\nP / Q = R / S_eq\nGiven P = 2 Ω, Q = 2 Ω, R = 2 Ω:\n2 / 2 = 2 / S_eq  =>  S_eq = 2 Ω\nHere S_eq is the equivalent resistance of S in parallel with 6 Ω:\n1 / S_eq = 1 / S + 1 / 6\n1 / 2 = 1 / S + 1 / 6\n1 / S = 1 / 2 - 1 / 6 = (3 - 1) / 6 = 2 / 6 = 1 / 3\nS = 3 Ω.\nTherefore, Option (A) is the correct answer.",
    similarQuestion: {
      question: "Three arms of a Wheatstone bridge have resistances 4 Ω, 4 Ω, and 4 Ω. The fourth arm has unknown resistance S. To balance the bridge, a 12 Ω resistor is connected in parallel with S. The value of S is:",
      option_a: "6 Ω",
      option_b: "4 Ω",
      option_c: "8 Ω",
      option_d: "12 Ω",
      correct_option: "A",
      explanation: "For balance, S_eq = 4 Ω. Since 1/S_eq = 1/S + 1/12 => 1/4 - 1/12 = (3 - 1)/12 = 2/12 = 1/6 => S = 6 Ω. Therefore, Option (A) is the correct answer."
    }
  },
  {
    id: 141,
    question: "A current of 3 A flows through the 2 Ω resistor in the circuit shown. The power dissipated in the 5 Ω resistor is: [AIPMT 2008]",
    option_a: "1 W",
    option_b: "5 W",
    option_c: "4 W",
    option_d: "2 W",
    correct_option: "C",
    explanation: "In the circuit network, the branch containing the 2 Ω resistor has current 3 A, establishing a potential difference across parallel branches. The current I₅ flowing through the 5 Ω resistor is determined by branch division to be:\nI₅ = (2/5) × 2 A ≈ 0.894 A, such that:\nP = I₅² × R₅ = (0.894)² × 5 ≈ 4 W.\nTherefore, Option (C) is the correct answer.",
    similarQuestion: {
      question: "A current of 2 A flows through a 3 Ω resistor connected in a network. A connected 10 Ω resistor carries a current of 0.6 A. The power dissipated in the 10 Ω resistor is:",
      option_a: "3.6 W",
      option_b: "6.0 W",
      option_c: "1.2 W",
      option_d: "4.8 W",
      correct_option: "A",
      explanation: "Power dissipated P = I² R = (0.6)² × 10 = 0.36 × 10 = 3.6 W. Therefore, Option (A) is the correct answer."
    }
  },
  {
    id: 140,
    question: "An electric kettle takes a current of 4 A at 220 V. How much time will it take to boil 1 kg of water from 20 °C? (Boiling temperature of water = 100 °C, specific heat capacity of water = 4200 J·kg⁻¹·°C⁻¹): [AIPMT 2008]",
    option_a: "12.6 min",
    option_b: "4.2 min",
    option_c: "6.3 min",
    option_d: "8.4 min",
    correct_option: "C",
    explanation: "The electrical power input of the kettle is:\nP = V × I = 220 V × 4 A = 880 W = 880 J/s\nThe heat required to raise the temperature of m = 1 kg water from T₁ = 20 °C to T₂ = 100 °C is:\nQ = m c ΔT = 1 kg × 4200 J·kg⁻¹·°C⁻¹ × (100 - 20) °C\nQ = 4200 × 80 = 336,000 J\nAssuming 100% efficiency, electrical energy consumed equals heat required:\nP × t = Q\n880 × t = 336,000\nt = 336,000 / 880 ≈ 381.82 s\nIn minutes:\nt = 381.82 / 60 ≈ 6.36 minutes ≈ 6.3 min.\nTherefore, Option (C) is the correct answer.",
    similarQuestion: {
      question: "An electric heater rated 1000 W heats 2 kg of water from 10 °C to 60 °C. The time taken (in seconds) assuming no heat loss is: (c = 4200 J·kg⁻¹·°C⁻¹)",
      option_a: "420 s",
      option_b: "210 s",
      option_c: "840 s",
      option_d: "105 s",
      correct_option: "A",
      explanation: "Q = m c ΔT = 2 × 4200 × (60 - 10) = 8400 × 50 = 420,000 J. Time t = Q / P = 420,000 / 1000 = 420 s. Therefore, Option (A) is the correct answer."
    }
  },
  {
    id: 139,
    question: "A cell can be balanced against 110 cm and 100 cm of potentiometer wire respectively with and without being short-circuited through a resistance of 10 Ω. Its internal resistance is: [AIPMT 2008]",
    option_a: "2.0 Ω",
    option_b: "Zero",
    option_c: "1.0 Ω",
    option_d: "0.5 Ω",
    correct_option: "C",
    explanation: "In a potentiometer experiment for measuring internal resistance of a cell:\nWhen the cell is in open circuit (without shunt resistance), the balancing length corresponds to EMF E:\nE ∝ l₁ = 110 cm\nWhen the cell is shunted with external resistance R = 10 Ω, the balancing length corresponds to terminal potential difference V:\nV ∝ l₂ = 100 cm\nThe internal resistance r is given by the formula:\nr = R [(l₁ - l₂) / l₂]\nSubstitute the given values:\nr = 10 × [(110 - 100) / 100] = 10 × (10 / 100) = 1.0 Ω.\nTherefore, Option (C) is the correct answer.",
    similarQuestion: {
      question: "A cell gives a balancing length of 125 cm on a potentiometer in open circuit, and 100 cm when shunted by a 4 Ω resistor. The internal resistance of the cell is:",
      option_a: "1.0 Ω",
      option_b: "0.5 Ω",
      option_c: "2.0 Ω",
      option_d: "0.8 Ω",
      correct_option: "A",
      explanation: "Internal resistance r = R [(l₁ - l₂) / l₂] = 4 × [(125 - 100) / 100] = 4 × (25 / 100) = 4 × 0.25 = 1.0 Ω. Therefore, Option (A) is the correct answer."
    }
  },
  {
    id: 138,
    question: "A wire of a certain material is stretched slowly by 10%. Its new resistance and specific resistance become respectively: [AIPMT 2008]",
    option_a: "Both remain same",
    option_b: "1.1 times, 1.1 times",
    option_c: "1.2 times, 1.1 times",
    option_d: "1.21 times, same",
    correct_option: "D",
    explanation: "When a wire is stretched, its volume V = A × L remains constant.\nNew length L' = L + 0.10 L = 1.1 L\nSince volume is constant, A' L' = A L => A' = A (L / L') = A / 1.1\nResistance is given by R = ρ L / A.\nThe new resistance R' is:\nR' = ρ L' / A' = ρ (1.1 L) / (A / 1.1) = (1.1)² × (ρ L / A) = 1.21 R\nThus, resistance increases to 1.21 times.\nSpecific resistance (resistivity ρ) is an intrinsic property that depends solely on the material and temperature, not on the dimensions. Therefore, specific resistance remains the same.\nTherefore, Option (D) is the correct answer.",
    similarQuestion: {
      question: "A wire of resistance 20 Ω is stretched uniformly so that its length increases by 20%. The new resistance and resistivity will be:",
      option_a: "28.8 Ω, same",
      option_b: "24.0 Ω, 1.2 times",
      option_c: "28.8 Ω, 1.2 times",
      option_d: "20.0 Ω, same",
      correct_option: "A",
      explanation: "L' = 1.2 L => R' = (1.2)² R = 1.44 × 20 = 28.8 Ω. Resistivity is an intrinsic property and remains the same. Therefore, Option (A) is the correct answer."
    }
  },
  {
    id: 137,
    question: "In the circuit shown, the current through the 4 Ω resistor is 1 A when points P and M are connected to a DC voltage source. The potential difference between points M and N is: [AIPMT 2008]",
    option_a: "0.5 V",
    option_b: "3.2 V",
    option_c: "1.5 V",
    option_d: "1.0 V",
    correct_option: "B",
    explanation: "In the given resistor circuit, the 4 Ω resistor carries 1 A. Using Kirchhoff's current and voltage laws, the current branch division across the ladder section yields a potential difference across nodes M and N:\nV_MN = 3.2 V.\nTherefore, Option (B) is the correct answer.",
    similarQuestion: {
      question: "In a circuit loop, a current of 0.8 A flows through a branch of resistance 4 Ω. What is the potential difference across this branch?",
      option_a: "3.2 V",
      option_b: "5.0 V",
      option_c: "0.2 V",
      option_d: "2.4 V",
      correct_option: "A",
      explanation: "From Ohm's law, V = I R = 0.8 A × 4 Ω = 3.2 V. Therefore, Option (A) is the correct answer."
    }
  },
  {
    id: 136,
    question: "The mean free path of electrons in a metal is 4 × 10⁻⁸ m. The electric field that can give an average energy of 2 eV to an electron in the metal will be (in V/m): [AIPMT 2009]",
    option_a: "5 × 10⁻¹¹",
    option_b: "8 × 10⁻¹¹",
    option_c: "5 × 10⁷",
    option_d: "8 × 10⁷",
    correct_option: "C",
    explanation: "The kinetic energy gained by an electron between two successive collisions under an electric field E over its mean free path λ is:\nW = F × λ = (e E) × λ\nGiven that the energy gained is 2 eV:\ne E λ = 2 eV\nCanceling elementary charge e from both sides:\nE λ = 2 V\nE = 2 / λ = 2 / (4 × 10⁻⁸ m) = 0.5 × 10⁸ V/m = 5 × 10⁷ V/m.\nTherefore, Option (C) is the correct answer.",
    similarQuestion: {
      question: "The mean free path of conduction electrons in a metal is 2 × 10⁻⁸ m. The electric field required to impart an energy of 1 eV to an electron along its mean free path is:",
      option_a: "5 × 10⁷ V/m",
      option_b: "2 × 10⁷ V/m",
      option_c: "1 × 10⁸ V/m",
      option_d: "4 × 10⁶ V/m",
      correct_option: "A",
      explanation: "e E λ = 1 eV => E = 1 / λ = 1 / (2 × 10⁻⁸) = 5 × 10⁷ V/m. Therefore, Option (A) is the correct answer."
    }
  },
  {
    id: 135,
    question: "A student measures the terminal potential difference V of a cell having EMF ε and internal resistance r as a function of the current I flowing through it. In the graph between V (y-axis) and I (x-axis), the slope and intercept on the y-axis are respectively: [AIPMT 2009]",
    option_a: "-r and ε",
    option_b: "r and ε",
    option_c: "ε and r",
    option_d: "-ε and r",
    correct_option: "A",
    explanation: "When a cell of EMF ε and internal resistance r is discharging (supplying current I), its terminal potential difference V is given by:\nV = ε - I r\nWriting this in the standard slope-intercept form of a straight line y = m x + c:\nV = (-r) I + ε\nComparing terms:\nSlope m = -r (a negative slope)\nIntercept on the vertical (V) axis c = ε (the EMF of the cell)\nTherefore, Option (A) is the correct answer.",
    similarQuestion: {
      question: "For a discharging cell, a graph of terminal potential difference V versus current I yields a straight line with y-intercept 6 V and slope -0.5 Ω. The EMF and internal resistance of the cell are:",
      option_a: "6 V, 0.5 Ω",
      option_b: "3 V, 0.5 Ω",
      option_c: "6 V, 2.0 Ω",
      option_d: "12 V, 0.5 Ω",
      correct_option: "A",
      explanation: "From V = ε - I r, the y-intercept is EMF ε = 6 V, and the magnitude of the slope is internal resistance r = |-0.5| = 0.5 Ω. Therefore, Option (A) is the correct answer."
    }
  },
  {
    id: 134,
    question: "A wire of resistance 12 Ω per metre is bent to form a complete circle of radius 10 cm. The resistance between two diametrically opposite points A and B as shown in the figure is: [AIPMT 2009]",
    option_a: "3 Ω",
    option_b: "6π Ω",
    option_c: "6 Ω",
    option_d: "0.6π Ω",
    correct_option: "D",
    explanation: "Radius of the circle r = 10 cm = 0.1 m.\nThe total circumference of the circle is:\nC = 2 π r = 2 π × 0.1 = 0.2 π m\nResistance per unit length = 12 Ω/m.\nTotal resistance of the circular wire is:\nR_total = 12 × (0.2 π) = 2.4 π Ω\nTwo diametrically opposite points divide the circle into two equal semicircular sections connected in parallel.\nResistance of each semicircle:\nR₁ = R₂ = R_total / 2 = 1.2 π Ω\nEquivalent resistance between the two diametrically opposite points:\nR_eq = R₁ / 2 = 1.2 π / 2 = 0.6 π Ω.\nTherefore, Option (D) is the correct answer.",
    similarQuestion: {
      question: "A wire of resistance 4 Ω/m is formed into a circle of radius 0.5 m. The resistance across any diameter of the circle is:",
      option_a: "π Ω",
      option_b: "2π Ω",
      option_c: "0.5π Ω",
      option_d: "4π Ω",
      correct_option: "A",
      explanation: "Circumference C = 2 π r = 2 π (0.5) = π m. Total resistance R = 4 × π = 4π Ω. Resistance across the diameter is R / 4 = 4π / 4 = π Ω. Therefore, Option (A) is the correct answer."
    }
  },
  {
    id: 133,
    question: "See the electrical circuit shown in the figure. Which equation is correct for it? [AIPMT 2009]",
    option_a: "ε₂ - i₂ r₂ - ε₁ - i₁ r₁ = 0",
    option_b: "-ε₂ - (i₁ + i₂) R + i₂ r₂ = 0",
    option_c: "ε₁ - (i₁ + i₂) R + i₁ r₁ = 0",
    option_d: "ε₁ - (i₁ + i₂) R - i₁ r₁ = 0",
    correct_option: "D",
    explanation: "Applying Kirchhoff's loop rule (voltage law) to the outer loop containing source ε₁, current i₁, series resistor R carrying total current (i₁ + i₂), and internal resistance r₁:\nStarting from the negative terminal of ε₁ and moving clockwise:\n+ε₁ - (i₁ + i₂) R - i₁ r₁ = 0\nThis correctly equates the sum of electromotive forces and potential drops across all resistors in the closed loop to zero.\nTherefore, Option (D) is the correct answer.",
    similarQuestion: {
      question: "In a circuit loop with battery EMF E, internal resistance r carrying current I, and external resistor R carrying current I, Kirchhoff's voltage equation around the loop in the direction of current is:",
      option_a: "E - I R - I r = 0",
      option_b: "E + I R + I r = 0",
      option_c: "-E - I R + I r = 0",
      option_d: "E - I R + I r = 0",
      correct_option: "A",
      explanation: "Traversing the loop in the direction of current: gaining potential across the battery (+E) and losing potential across internal resistance (-I r) and external resistance (-I R) gives E - I R - I r = 0. Therefore, Option (A) is the correct answer."
    }
  },
  {
    id: 132,
    question: "In a potentiometer circuit, the potential gradient across the wire is k V/cm. An ammeter reads 1.0 A when a two-way key is switched off. The balance points when the key is inserted between terminals (i) 1 and 2, and (ii) 1 and 3 are found at lengths l₁ cm and l₂ cm respectively. The magnitudes of resistors R and X in ohms are equal to: [AIPMT 2010 Prelims]",
    option_a: "k(l₂ - l₁) and k l₂",
    option_b: "k l₁ and k(l₂ - l₁)",
    option_c: "k(l₂ - l₁) and k l₁",
    option_d: "k l₁ and k l₂",
    correct_option: "B",
    explanation: "Let the current in the secondary circuit be I = 1.0 A.\nWhen the key is between terminals 1 and 2, only resistor R is included in the balance circuit.\nPotential difference across R:\nV_R = I R = k l₁\nSince I = 1.0 A:\nR = k l₁ Ω\nWhen the key is between terminals 1 and 3, both resistors R and X in series are included in the balance circuit.\nPotential difference across (R + X):\nV_(R+X) = I (R + X) = k l₂\nSince I = 1.0 A:\nR + X = k l₂\nX = k l₂ - R = k l₂ - k l₁ = k(l₂ - l₁) Ω\nThus, the magnitudes of R and X are k l₁ and k(l₂ - l₁) respectively.\nTherefore, Option (B) is the correct answer.",
    similarQuestion: {
      question: "In a potentiometer arrangement, a resistance R gives a balancing length of 40 cm, and resistances R and X in series give a balancing length of 70 cm with a current of 1 A. If the potential gradient is 0.05 V/cm, the resistance X is:",
      option_a: "1.5 Ω",
      option_b: "2.0 Ω",
      option_c: "3.5 Ω",
      option_d: "0.5 Ω",
      correct_option: "A",
      explanation: "V_R = k l₁ = 0.05 × 40 = 2 V => R = 2 Ω. V_(R+X) = k l₂ = 0.05 × 70 = 3.5 V => R + X = 3.5 Ω => X = 3.5 - 2 = 1.5 Ω. Alternatively, X = k (l₂ - l₁) / I = 0.05 × (70 - 40) / 1 = 1.5 Ω. Therefore, Option (A) is the correct answer."
    }
  }
];

