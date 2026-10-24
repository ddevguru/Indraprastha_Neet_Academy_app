const fs = require('fs');

const set7Part3Updates = [
  {
    id: 4955, // Q105
    similar_question: {
      question: "Given below are two statements:\nAssertion (A): For a conservative system with no change in kinetic energy (ΔK = 0), the increase in potential energy equals the work done by the external force.\nReason (R): The value of potential energy at a point is independent of the reference frame chosen.",
      option_a: "Assertion is true but Reason is false",
      option_b: "Both Assertion and Reason are true and Reason is the correct explanation of Assertion",
      option_c: "Both Assertion and Reason are true but Reason is NOT the correct explanation of Assertion",
      option_d: "Assertion is false but Reason is true",
      correct_option: "A",
      explanation: "Step 1: When ΔK = 0, the work-energy theorem gives W_ext + W_c = 0  →  W_ext = −W_c = ΔU. Thus, Assertion is true.\n\nStep 2: Absolute potential energy depends on the arbitrary choice of reference level (U = 0) and reference frame, making Reason false.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 4956, // Q106
    similar_question: {
      question: "As an air bubble rises through water towards the surface, what happens to the total gravitational potential energy of the (water + air bubble) system?",
      option_a: "Decreases",
      option_b: "Increases",
      option_c: "Remains constant",
      option_d: "First increases then decreases",
      correct_option: "A",
      explanation: "Step 1: As the less dense air bubble moves upward, an equivalent volume of denser water moves downward to occupy the space vacated by the bubble.\n\nStep 2: Since the mass of water moving downward is much greater than the mass of air moving upward, the centre of mass of the combined system shifts downward.\n\nStep 3: A downward shift of the centre of mass results in a decrease in the overall gravitational potential energy.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 4957, // Q107
    similar_question: {
      question: "Given below are two statements:\nAssertion (A): Spontaneous natural physical processes tend to evolve towards states of lower potential energy.\nReason (R): Configurations with lower potential energy correspond to states of greater mechanical stability.",
      option_a: "Both Assertion and Reason are true and Reason is the correct explanation of Assertion",
      option_b: "Both Assertion and Reason are true but Reason is NOT the correct explanation of Assertion",
      option_c: "Assertion is true but Reason is false",
      option_d: "Assertion is false but Reason is true",
      correct_option: "A",
      explanation: "Step 1: Conservative forces naturally drive particles in the direction where potential energy decreases (F = −dU/dx).\n\nStep 2: Stable equilibrium occurs at a local minimum of potential energy, where any small displacement generates a restoring force back towards the equilibrium point.\n\nStep 3: Hence, natural systems evolve towards lower potential energy to achieve greater stability. Both are true and Reason explains Assertion.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 4958, // Q108
    similar_question: {
      question: "When a conservative force does positive work on an object, the potential energy associated with that conservative force:",
      option_a: "Decreases",
      option_b: "Increases",
      option_c: "Remains unchanged",
      option_d: "Becomes zero",
      correct_option: "A",
      explanation: "Step 1: By definition of potential energy in a conservative force field:\nΔU = −W_c.\n\nStep 2: When the conservative force does positive work (W_c > 0):\nΔU < 0, which means U_final < U_initial.\n\nStep 3: Therefore, the potential energy decreases.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 4959, // Q109
    similar_question: {
      question: "The potential energy of a physical system increases when work is done:",
      option_a: "By an external agent against the internal conservative forces of the system",
      option_b: "By the conservative force itself on the system",
      option_c: "By non-conservative friction forces within the system",
      option_d: "By an external force that does not oppose any internal field",
      correct_option: "A",
      explanation: "Step 1: By definition, change in potential energy is ΔU = −W_c.\n\nStep 2: For potential energy to increase (ΔU > 0), the conservative work must be negative (W_c < 0).\n\nStep 3: This occurs precisely when an external agent does positive work against the conservative force field (W_ext = −W_c > 0).\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 4960, // Q110
    similar_question: {
      question: "A uniform thin rod of mass m and length L stands vertically upright on a flat horizontal floor. Taking the floor as the reference level (U = 0), what is the gravitational potential energy of the rod?",
      option_a: "(1/2) m g L",
      option_b: "m g L",
      option_c: "(1/4) m g L",
      option_d: "(1/3) m g L",
      correct_option: "A",
      explanation: "Step 1: For a continuous body in a uniform gravitational field, potential energy is given by U = m g y_cm.\n\nStep 2: For a uniform vertical rod of length L resting on the ground, its centre of mass is at its geometric midpoint: y_cm = L / 2.\n\nStep 3: Calculate potential energy:\nU = m g (L / 2) = (1/2) m g L.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 4961, // Q111
    similar_question: {
      question: "A uniform thin rod of mass M and length L is pivoted at its top end and released from rest from the vertically inverted position (pointing straight up). Taking g as acceleration due to gravity, what is its rotational kinetic energy as it passes through the vertically downward position?",
      option_a: "M g L",
      option_b: "2 M g L",
      option_c: "(1/2) M g L",
      option_d: "4 M g L",
      correct_option: "A",
      explanation: "Step 1: Initial position: rod points vertically upward from the pivot, so its centre of mass is at height h₁ = +L / 2 above the pivot.\n\nStep 2: Final position: rod hangs vertically downward, so its centre of mass is at height h₂ = −L / 2 below the pivot.\n\nStep 3: Vertical descent of the centre of mass:\nΔh = h₁ − h₂ = (L / 2) − (−L / 2) = L.\n\nStep 4: By conservation of mechanical energy:\nK = ΔU_gravity = M g Δh = M g L.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 4962, // Q112
    similar_question: {
      question: "A particle of total mechanical energy E = 10 J moves in a conservative force field with potential energy U(x). At a particular point x₀, the potential energy is U(x₀) = 4 J. What is the kinetic energy of the particle at x₀, and which statement is INCORRECT?",
      option_a: "The kinetic energy at x₀ is negative",
      option_b: "The kinetic energy at x₀ is 6 J",
      option_c: "The speed of the particle is real and non-zero at x₀",
      option_d: "The turning points occur where U(x) = 10 J",
      correct_option: "A",
      explanation: "Step 1: Conservation of mechanical energy: E = K + U.\n\nStep 2: At x₀: K = E − U(x₀) = 10 J − 4 J = 6 J.\n\nStep 3: Since K = 6 J > 0, kinetic energy is strictly positive, making statement (A) incorrect.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 4963, // Q113
    similar_question: {
      question: "The potential energy of a particle moving along the x-axis is given by U(x) = x³ − 6x² + 9x + 10 (in joules). At which position is the particle in stable equilibrium?",
      option_a: "x = 3 m",
      option_b: "x = 1 m",
      option_c: "x = 0 m",
      option_d: "x = 2 m",
      correct_option: "A",
      explanation: "Step 1: Find equilibrium points where dU/dx = 0:\ndU/dx = 3x² − 12x + 9 = 3(x² − 4x + 3) = 3(x − 1)(x − 3) = 0  →  x = 1 m, x = 3 m.\n\nStep 2: Find second derivative:\nd²U/dx² = 6x − 12.\n\nStep 3: Evaluate at x = 1 m:\nd²U/dx² = 6(1) − 12 = −6 < 0 (unstable equilibrium).\nEvaluate at x = 3 m:\nd²U/dx² = 6(3) − 12 = +6 > 0 (stable equilibrium).\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 4964, // Q114
    similar_question: {
      question: "Which of the following statements regarding potential energy and work is fundamentally correct?",
      option_a: "The change in potential energy is equal to the negative of the work done by conservative internal forces (ΔU = −W_c)",
      option_b: "Potential energy can be defined for non-conservative friction forces",
      option_c: "The work done by a spring force is always positive regardless of displacement",
      option_d: "Potential energy is an absolute quantity with a universal absolute zero",
      correct_option: "A",
      explanation: "Step 1: Potential energy is fundamentally defined by ΔU = −W_c for conservative forces.\n\nStep 2: It cannot be defined for non-conservative forces because their work depends on the path.\n\nStep 3: Spring force does negative work during elongation/compression from rest. Hence, only statement (A) is fundamentally correct.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 4965, // Q115
    similar_question: {
      question: "The potential energy function for a particle in 1D motion is U(x) = 2x³ − 9x² + 12x (in joules). What is the coordinate of stable equilibrium?",
      option_a: "x = 2",
      option_b: "x = 1",
      option_c: "x = 3",
      option_d: "x = 0",
      correct_option: "A",
      explanation: "Step 1: Find equilibrium coordinates:\ndU/dx = 6x² − 18x + 12 = 6(x² − 3x + 2) = 6(x − 1)(x − 2) = 0  →  x = 1, x = 2.\n\nStep 2: Check stability using second derivative:\nd²U/dx² = 12x − 18.\nAt x = 1: d²U/dx² = 12(1) − 18 = −6 < 0 (maximum, unstable).\nAt x = 2: d²U/dx² = 12(2) − 18 = +6 > 0 (minimum, stable).\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 4966, // Q116
    similar_question: {
      question: "Given below are two statements:\nAssertion (A): The slope of the work versus displacement graph (dW/dx) gives the magnitude of the net force acting along the direction of displacement.\nReason (R): The area under the force versus displacement curve equals the total work done by that force.",
      option_a: "Both Assertion and Reason are true and Reason is a related correct mathematical statement",
      option_b: "Both Assertion and Reason are true but Reason is NOT the correct explanation of Assertion",
      option_c: "Assertion is true but Reason is false",
      option_d: "Assertion is false but Reason is true",
      correct_option: "A",
      explanation: "Step 1: Work is defined as W = ∫ F dx. By the Fundamental Theorem of Calculus, the derivative of work with respect to displacement is dW/dx = F, which represents the slope of the W-x graph. Thus Assertion is true.\n\nStep 2: By integration, W = ∫ F dx represents the area under the F-x graph. Thus Reason is true.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 4967, // Q117
    similar_question: {
      question: "In a potential energy curve U versus position x, an equilibrium state occurs at points where:",
      option_a: "The slope of the curve dU/dx is zero",
      option_b: "The potential energy U(x) is zero",
      option_c: "The second derivative d²U/dx² is zero",
      option_d: "The potential energy is maximum only",
      correct_option: "A",
      explanation: "Step 1: Conservative force is related to potential energy gradient by F = −dU/dx.\n\nStep 2: Mechanical equilibrium requires net force F = 0.\n\nStep 3: Setting F = 0 requires dU/dx = 0, which corresponds to the stationary points (slope = 0) of the U-x curve.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 4968, // Q118
    similar_question: {
      question: "A particle moves along the x-axis in a conservative potential field given by U(x) = x⁴ − 4x² + 5. At which of the following positions is the particle in mechanical equilibrium?",
      option_a: "x = 0, +√2, and −√2",
      option_b: "x = +2 and −2 only",
      option_c: "x = 0 only",
      option_d: "x = +1 and −1 only",
      correct_option: "A",
      explanation: "Step 1: Force F = −dU/dx = −(4x³ − 8x) = −4x(x² − 2).\n\nStep 2: Equilibrium points require F = 0:\n4x(x² − 2) = 0  →  x = 0  or  x² = 2  →  x = ±√2.\n\nStep 3: Hence, equilibrium positions are x = 0, +√2, and −√2.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 4969, // Q119
    similar_question: {
      question: "Which of the following is a defining property of a conservative force acting on a particle?",
      option_a: "The work done by the force depends only on the initial and final positions and is independent of the path taken",
      option_b: "The work done by the force around any closed path is non-zero",
      option_c: "Potential energy cannot be defined for the force",
      option_d: "The force always acts perpendicular to displacement",
      correct_option: "A",
      explanation: "Step 1: A force is conservative if and only if the work done in moving a particle between two points depends exclusively on the endpoints: W = ∫ F⃗ · dr⃗ = U(r₁) − U(r₂).\n\nStep 2: Consequently, the work done along any closed path is zero (∮ F⃗ · dr⃗ = 0).\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 4970, // Q120
    similar_question: {
      question: "Given below are two statements:\nStatement-I: Kinetic friction is a non-conservative force.\nStatement-II: The total work done by kinetic friction on a body moving over any closed loop is strictly non-zero and always negative.",
      option_a: "Both Statement-I and Statement-II are true and Statement-II correctly explains Statement-I",
      option_b: "Both Statement-I and Statement-II are true but Statement-II is NOT the correct explanation of Statement-I",
      option_c: "Statement-I is true but Statement-II is false",
      option_d: "Statement-I is false but Statement-II is true",
      correct_option: "A",
      explanation: "Step 1: Kinetic friction always opposes relative motion between contacting surfaces (f_k · ds = −f_k ds < 0).\n\nStep 2: Around any closed path, ∮ f_k · ds = −f_k ∮ ds = −f_k (perimeter) < 0 ≠ 0.\n\nStep 3: Because the work over a closed path is non-zero, kinetic friction is non-conservative by definition. Both are true and Statement-II explains Statement-I.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 4971, // Q121
    similar_question: {
      question: "A conservative force does +40 J of work as an object moves from position A to position B. If the potential energy of the system at B is U_B = −15 J, what is the potential energy at A?",
      option_a: "+25 J",
      option_b: "−25 J",
      option_c: "+55 J",
      option_d: "−55 J",
      correct_option: "A",
      explanation: "Step 1: Relationship between work done by conservative forces and potential energy:\nW_c = U_A − U_B.\n\nStep 2: Substitute given values:\n40 = U_A − (−15) = U_A + 15.\n\nStep 3: Solve for U_A:\nU_A = 40 − 15 = +25 J.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 4972, // Q122
    similar_question: {
      question: "A conservative force does −25 J of work on a particle as it moves from state 1 to state 2. If the potential energy in state 1 is U₁ = 40 J, what is the potential energy in state 2?",
      option_a: "65 J",
      option_b: "15 J",
      option_c: "−15 J",
      option_d: "−65 J",
      correct_option: "A",
      explanation: "Step 1: Formula for work done by conservative forces:\nW_c = U₁ − U₂.\n\nStep 2: Substitute values:\n−25 = 40 − U₂.\n\nStep 3: Solve for U₂:\nU₂ = 40 + 25 = 65 J.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 4973, // Q123
    similar_question: {
      question: "Given below are two statements:\nAssertion (A): The work done by a conservative force on a particle moving around any arbitrary closed loop is zero.\nReason (R): For a conservative force, the work done in moving between two points depends only on the initial and final positions, not on the path followed.",
      option_a: "Both Assertion and Reason are true and Reason is the correct explanation of Assertion",
      option_b: "Both Assertion and Reason are true but Reason is NOT the correct explanation of Assertion",
      option_c: "Assertion is true but Reason is false",
      option_d: "Assertion is false but Reason is true",
      correct_option: "A",
      explanation: "Step 1: Since work done by a conservative force is path-independent: W_(1→2) = U(r₁) − U(r₂).\n\nStep 2: For a closed path, initial and final points are identical (r₁ = r₂), so W = U(r₁) − U(r₁) = 0.\n\nStep 3: Hence, both statements are true and Reason is the direct mathematical explanation of Assertion.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 4974, // Q124
    similar_question: {
      question: "Given below are two statements:\nAssertion (A): Absolute potential energy at a point can only be determined if a reference point with an assigned reference potential energy is specified.\nReason (R): The physical quantity directly measured or calculated from the work done by conservative forces is the change in potential energy (ΔU = −W_c), not the absolute value.",
      option_a: "Both Assertion and Reason are true and Reason is the correct explanation of Assertion",
      option_b: "Both Assertion and Reason are true but Reason is NOT the correct explanation of Assertion",
      option_c: "Assertion is true but Reason is false",
      option_d: "Assertion is false but Reason is true",
      correct_option: "A",
      explanation: "Step 1: Work done by conservative forces defines only differences in potential energy: U(r) − U(r_ref) = −W_c.\n\nStep 2: To specify U(r) uniquely, an arbitrary reference value U(r_ref) (typically zero at infinity or ground) must be chosen.\n\nStep 3: Thus, Assertion and Reason are both true, and Reason correctly explains Assertion.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 4975, // Q125
    similar_question: {
      question: "An external agent slowly carries an object from point A to point B against a conservative force field doing 50 J of work (with ΔK = 0). If the potential energy at A is U_A = −20 J, what is the potential energy at B?",
      option_a: "+30 J",
      option_b: "−30 J",
      option_c: "+70 J",
      option_d: "−70 J",
      correct_option: "A",
      explanation: "Step 1: Work done by an external agent without changing kinetic energy:\nW_ext = ΔU = U_B − U_A.\n\nStep 2: Substitute given values:\n50 = U_B − (−20) = U_B + 20.\n\nStep 3: Solve for U_B:\nU_B = 50 − 20 = +30 J.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 4976, // Q126
    similar_question: {
      question: "A uniform chain of mass M and length L lies on a smooth horizontal table with one-fourth (1/4) of its length hanging vertically over the edge. What is the minimum work required to pull the hanging portion back onto the table?",
      option_a: "M g L / 32",
      option_b: "M g L / 16",
      option_c: "M g L / 8",
      option_d: "M g L / 64",
      correct_option: "A",
      explanation: "Step 1: Mass of the hanging portion:\nm' = M / 4.\n\nStep 2: Length of hanging portion is L / 4, so its centre of mass is located at depth:\ny_cm = (L / 4) / 2 = L / 8 below the table edge.\n\nStep 3: Work required to pull it onto the table equals the increase in gravitational potential energy:\nW = m' g y_cm = (M / 4) × g × (L / 8) = M g L / 32.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 4977, // Q127
    similar_question: {
      question: "Two springs 1 and 2 have force constants in the ratio k₁ : k₂ = 4 : 3. If both springs are stretched by the same extension x, and the elastic potential energy stored in spring 1 is 32 J, what is the potential energy stored in spring 2?",
      option_a: "24 J",
      option_b: "32 J",
      option_c: "18 J",
      option_d: "40 J",
      correct_option: "A",
      explanation: "Step 1: Elastic potential energy for extension x:\nU = (1/2) k x².\n\nStep 2: For equal extensions, U ∝ k:\nU₂ / U₁ = k₂ / k₁ = 3 / 4.\n\nStep 3: Solve for U₂:\nU₂ = (3 / 4) × U₁ = (3 / 4) × 32 J = 24 J.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 4978, // Q128
    similar_question: {
      question: "Two springs A and B have force constants in the ratio k_A : k_B = 2 : 5. If equal stretching forces F are applied to both springs, what is the ratio of their elongations x_A / x_B?",
      option_a: "5 : 2",
      option_b: "2 : 5",
      option_c: "4 : 25",
      option_d: "25 : 4",
      correct_option: "A",
      explanation: "Step 1: By Hooke's Law, F = k x  →  x = F / k.\n\nStep 2: For identical tensile force F:\nx_A / x_B = k_B / k_A.\n\nStep 3: Substitute the ratio:\nx_A / x_B = 5 / 2 = 5 : 2.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 4979, // Q129
    similar_question: {
      question: "Two springs A and B have spring constants k_A and k_B related by k_A = 3 k_B. If equal stretching forces are applied to both springs, and the energy stored in spring A is E_A, what is the elastic potential energy stored in spring B?",
      option_a: "3 E_A",
      option_b: "E_A / 3",
      option_c: "9 E_A",
      option_d: "E_A / 9",
      correct_option: "A",
      explanation: "Step 1: Elastic potential energy in terms of tensile force F and spring constant k:\nU = F² / (2k).\n\nStep 2: For equal force F, U is inversely proportional to k:\nE_B / E_A = k_A / k_B = (3 k_B) / k_B = 3.\n\nStep 3: Solve for E_B:\nE_B = 3 E_A.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 4980, // Q130
    similar_question: {
      question: "An ideal spring has potential energy U stored in it when compressed by an initial distance of 2 cm. What is the additional potential energy stored if it is compressed further by another 4 cm (total compression = 6 cm)?",
      option_a: "8 U",
      option_b: "9 U",
      option_c: "4 U",
      option_d: "3 U",
      correct_option: "A",
      explanation: "Step 1: Potential energy for initial compression x₁ = 2 cm:\nU₁ = (1/2) k (2)² = 2k = U.\n\nStep 2: Total potential energy at x₂ = 2 + 4 = 6 cm:\nU_total = (1/2) k (6)² = 18k = 9 × (2k) = 9 U.\n\nStep 3: Additional potential energy stored:\nΔU = U_total − U₁ = 9 U − U = 8 U.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 4981, // Q131
    similar_question: {
      question: "Two springs 1 and 2 have force constants k₁ and k₂ with k₁ > k₂. In case (a), both are stretched by the same elongation x. In case (b), both are stretched by the same tensile force F. Which relations correctly compare the work done W₁ and W₂?",
      option_a: "Case (a): W₁ > W₂ ; Case (b): W₂ > W₁",
      option_b: "Case (a): W₁ < W₂ ; Case (b): W₂ < W₁",
      option_c: "Case (a): W₁ = W₂ ; Case (b): W₁ = W₂",
      option_d: "Case (a): W₁ > W₂ ; Case (b): W₁ > W₂",
      correct_option: "A",
      explanation: "Step 1: For same elongation x: W = (1/2) k x²  →  W ∝ k. Since k₁ > k₂, W₁ > W₂.\n\nStep 2: For same tensile force F: W = F² / (2k)  →  W ∝ 1/k. Since k₁ > k₂, W₁ < W₂ (or W₂ > W₁).\n\nStep 3: Hence, Case (a) has W₁ > W₂ and Case (b) has W₂ > W₁.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 4982, // Q132
    similar_question: {
      question: "Given below are two statements:\nAssertion (A): When two springs with force constants k₁ and k₂ (where k₁ > k₂) are stretched by the same tensile force F, more work is done on the stiffer spring (k₁).\nReason (R): For a given tensile force F, the work done on a spring is inversely proportional to its spring constant: W = F² / (2k).",
      option_a: "Assertion is false but Reason is true",
      option_b: "Both Assertion and Reason are true and Reason is the correct explanation of Assertion",
      option_c: "Both Assertion and Reason are true but Reason is NOT the correct explanation of Assertion",
      option_d: "Assertion is true but Reason is false",
      correct_option: "A",
      explanation: "Step 1: For a constant applied force F, the work done is W = F² / (2k), so W is inversely proportional to k (Reason is true).\n\nStep 2: Since k₁ > k₂, it follows that W₁ < W₂, which means LESS work is done on the stiffer spring. Thus, Assertion is false.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 4983, // Q133
    similar_question: {
      question: "A spring stores potential energy U when stretched by 3 cm. By how much additional distance must the spring be stretched so that the total stored potential energy becomes 25 U?",
      option_a: "12 cm",
      option_b: "15 cm",
      option_c: "9 cm",
      option_d: "6 cm",
      correct_option: "A",
      explanation: "Step 1: Potential energy U ∝ x²:\nU₂ / U₁ = (x₂ / x₁)²  →  25 = (x₂ / 3)²  →  x₂ / 3 = 5  →  x₂ = 15 cm.\n\nStep 2: Additional extension required:\nΔx = x₂ − x₁ = 15 cm − 3 cm = 12 cm.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 4984, // Q134
    similar_question: {
      question: "A uniform chain of total mass M and length L lies on a smooth horizontal table with 1/k of its length hanging vertically over the edge. What is the work required to pull the entire hanging portion back onto the table?",
      option_a: "M g L / (2 k²)",
      option_b: "M g L / k²",
      option_c: "2 M g L / k²",
      option_d: "M g L / (4 k²)",
      correct_option: "A",
      explanation: "Step 1: Mass of the hanging part: m = M / k.\nLength of the hanging part: l = L / k.\n\nStep 2: The centre of mass of the hanging chain is at depth y_cm = l / 2 = L / (2k) below the table.\n\nStep 3: Work required to pull it back up:\nW = m g y_cm = (M / k) × g × [L / (2k)] = M g L / (2 k²).\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 4985, // Q135
    similar_question: {
      question: "A uniform flexible chain of length 4 m and mass 4 kg lies on a frictionless horizontal table with 1 m hanging over the edge. If the chain is released from rest, what is its kinetic energy at the instant its last link just slips off the edge of the table? (Take g = 10 m/s²)",
      option_a: "75 J",
      option_b: "80 J",
      option_c: "60 J",
      option_d: "40 J",
      correct_option: "A",
      explanation: "Step 1: Initial potential energy with 1 m hanging (m₁ = 1 kg, y_cm = 0.5 m below table):\nU₁ = −m₁ g y_cm = −1 × 10 × 0.5 = −5 J.\n\nStep 2: Final potential energy when entire chain of 4 m hangs (M = 4 kg, y_cm = 2.0 m below table):\nU₂ = −M g y_cm = −4 × 10 × 2.0 = −80 J.\n\nStep 3: By conservation of energy, ΔK = U₁ − U₂:\nK_final = −5 − (−80) = 75 J.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 4986, // Q136
    similar_question: {
      question: "A uniform flexible chain of mass M and length L = (π R / 2) is held at rest over the surface of a smooth quarter-cylindrical surface of radius R with one end at the summit. Taking the horizontal base of the cylinder as the reference level (U = 0), what is the gravitational potential energy of the chain?",
      option_a: "2 M g R / π",
      option_b: "M g R / 2",
      option_c: "M g R / π",
      option_d: "4 M g R / π",
      correct_option: "A",
      explanation: "Step 1: Consider an elemental segment subtending angle dθ at angle θ from the vertical summit: dm = (M / (π / 2)) dθ = (2M / π) dθ.\n\nStep 2: The height of this element above the base is y = R cos θ.\n\nStep 3: Integrate potential energy:\nU = ∫₀^(π/2) dm g y = (2 M g R / π) ∫₀^(π/2) cos θ dθ = (2 M g R / π) [sin θ]₀^(π/2) = 2 M g R / π.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 4987, // Q137
    similar_question: {
      question: "Two positively charged alpha particles approach each other head-on. As the distance between them decreases, what happens to the electrostatic potential energy of the two-particle system?",
      option_a: "Increases",
      option_b: "Decreases",
      option_c: "Remains constant",
      option_d: "Becomes negative",
      correct_option: "A",
      explanation: "Step 1: Electrostatic potential energy of two like charges is given by U = (1 / 4πε₀) (q₁ q₂ / r).\n\nStep 2: Since both charges are positive, q₁ q₂ > 0.\n\nStep 3: As separation r decreases, the denominator decreases, causing U to increase.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 4988, // Q138
    similar_question: {
      question: "An electron and a proton, initially far apart and mutually attracted by Coulomb forces, move towards each other from rest. As their separation decreases, how do their kinetic energy and potential energy change?",
      option_a: "Kinetic energy increases and potential energy decreases",
      option_b: "Kinetic energy decreases and potential energy increases",
      option_c: "Both kinetic energy and potential energy increase",
      option_d: "Both kinetic energy and potential energy decrease",
      correct_option: "A",
      explanation: "Step 1: Electrostatic potential energy between opposite charges is U = −k e² / r.\nAs r decreases, U becomes more negative (decreases).\n\nStep 2: By conservation of total mechanical energy (E = K + U = constant), the decrease in potential energy produces an equal increase in kinetic energy (K increases).\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 4989, // Q139
    similar_question: {
      question: "A cart of mass m is released from rest at a height of 100 m on a frictionless roller coaster track. What is its speed when it reaches a dip located 55 m above the ground? (Take g = 10 m/s²)",
      option_a: "30 m/s",
      option_b: "25 m/s",
      option_c: "20 m/s",
      option_d: "35 m/s",
      correct_option: "A",
      explanation: "Step 1: Vertical distance descended by the cart:\nΔh = 100 m − 55 m = 45 m.\n\nStep 2: By conservation of mechanical energy:\n(1/2) m v² = m g Δh  →  v = √(2 g Δh).\n\nStep 3: Substitute values:\nv = √(2 × 10 × 45) = √900 = 30 m/s.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 4990, // Q140
    similar_question: {
      question: "Which of the following conditions causes the potential energy of a physical system to increase?",
      option_a: "Work is done by the system against internal conservative forces",
      option_b: "Work is done by the conservative force on the system",
      option_c: "Work is done by kinetic friction on the system",
      option_d: "Work is done by an external force with no opposing field",
      correct_option: "A",
      explanation: "Step 1: Relationship: ΔU = −W_c.\n\nStep 2: When the system performs work against its internal conservative forces, W_c is negative.\n\nStep 3: Consequently, ΔU = −(−|W_c|) = +|W_c| > 0, which means potential energy increases.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 4991, // Q141
    similar_question: {
      question: "If a conservative force performs positive work on a body during its displacement, what happens to the corresponding potential energy?",
      option_a: "It decreases",
      option_b: "It increases",
      option_c: "It remains constant",
      option_d: "It first increases then decreases",
      correct_option: "A",
      explanation: "Step 1: By fundamental definition: ΔU = −W_c.\n\nStep 2: Given W_c > 0:\nΔU = U_final − U_initial < 0.\n\nStep 3: Hence, potential energy must decrease.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 4992, // Q142
    similar_question: {
      question: "A pile driver of mass M falls from a height H onto a vertical stake and drives it a distance d into the soil before coming to rest. What is the average resistive force exerted by the soil on the stake?",
      option_a: "M g (1 + H / d)",
      option_b: "M g (H / d)",
      option_c: "M g (1 − H / d)",
      option_d: "M g (H + d)",
      correct_option: "A",
      explanation: "Step 1: Total vertical distance descended by the mass is (H + d).\nWork done by gravity: W_g = M g (H + d).\n\nStep 2: Work done by the average resistive force of the soil:\nW_res = −F_avg × d.\n\nStep 3: Total change in kinetic energy is zero (starts and ends at rest):\nW_g + W_res = 0  →  M g (H + d) − F_avg × d = 0\nF_avg = M g (H + d) / d = M g (1 + H / d).\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 4993, // Q143
    similar_question: {
      question: "A block of mass 0.8 kg sliding on a frictionless horizontal floor with speed 2.0 m/s collides with a light horizontal spring of force constant k = 80 N/m. What is the maximum compression of the spring?",
      option_a: "0.20 m",
      option_b: "0.15 m",
      option_c: "0.10 m",
      option_d: "0.25 m",
      correct_option: "A",
      explanation: "Step 1: Initial kinetic energy of the block:\nK = (1/2) m v² = (1/2) × 0.8 kg × (2.0 m/s)² = 0.4 × 4 = 1.6 J.\n\nStep 2: At maximum compression x_max, all kinetic energy is stored as spring potential energy:\n(1/2) k x_max² = 1.6 J.\n\nStep 3: Solve for x_max:\n(1/2) × 80 × x_max² = 1.6  →  40 x_max² = 1.6  →  x_max² = 0.04  →  x_max = 0.20 m.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 4994, // Q144
    similar_question: {
      question: "A vertical light spring with force constant k has its upper end fixed. A body of mass m is attached to its lower end while the spring is at its natural unstretched length, and then released from rest. What is the maximum elongation produced in the spring?",
      option_a: "2 m g / k",
      option_b: "m g / k",
      option_c: "4 m g / k",
      option_d: "m g / (2k)",
      correct_option: "A",
      explanation: "Step 1: Let x_max be the maximum elongation. The body starts from rest at x = 0 and is momentarily at rest at x = x_max, so ΔK = 0.\n\nStep 2: By conservation of mechanical energy:\nLoss in gravitational PE = Gain in elastic PE\nm g x_max = (1/2) k x_max².\n\nStep 3: For x_max ≠ 0:\nx_max = 2 m g / k.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 4995, // Q145
    similar_question: {
      question: "A block of mass m rests on a smooth inclined plane of inclination angle θ and is attached to a relaxed light spring of spring constant k whose other end is fixed at the top of the incline. If the block is released from rest, what is the maximum extension x_max of the spring along the incline?",
      option_a: "2 m g sin θ / k",
      option_b: "m g sin θ / k",
      option_c: "m g cos θ / k",
      option_d: "2 m g / k",
      correct_option: "A",
      explanation: "Step 1: Component of gravity acting down the incline: F_g = m g sin θ.\n\nStep 2: By work-energy theorem between release and maximum extension:\nW_gravity + W_spring = 0\n(m g sin θ) x_max − (1/2) k x_max² = 0.\n\nStep 3: Solve for x_max:\nx_max = 2 m g sin θ / k.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 4996, // Q146
    similar_question: {
      question: "A ball of mass m is suspended from a vertical spring of force constant k. When released from rest from the unstretched position, it descends a maximum distance x_max before momentarily coming to rest. Which of the following statements is correct?\n(1) The maximum descent is x_max = 2 m g / k.\n(2) At the lowest position (x = x_max), the upward acceleration of the ball is equal to g.\n(3) At the midpoint x = m g / k, the speed of the ball is maximum and acceleration is zero.",
      option_a: "All (1), (2), and (3) are correct",
      option_b: "Only (1) and (2) are correct",
      option_c: "Only (1) is correct",
      option_d: "Only (3) is correct",
      correct_option: "A",
      explanation: "Step 1: By energy conservation, m g x_max = (1/2) k x_max²  →  x_max = 2 m g / k  →  (1) is correct.\n\nStep 2: At lowest position, net upward force is F_net = k x_max − m g = k(2mg/k) − mg = mg upward, so acceleration is a = F_net / m = g upward  →  (2) is correct.\n\nStep 3: At x = m g / k, spring force balances gravity (k x = m g), so acceleration is zero and speed is at its maximum  →  (3) is correct.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 4997, // Q147
    similar_question: {
      question: "A block of mass 2 kg is released from rest on a smooth 30° inclined plane and travels a distance s along the incline before striking an uncompressed spring of stiffness k = 200 N/m mounted at the bottom. If the block momentarily compresses the spring by a maximum of 0.5 m, what is the total distance s travelled along the incline before contacting the spring? (Take g = 10 m/s²)",
      option_a: "2.0 m",
      option_b: "2.5 m",
      option_c: "1.5 m",
      option_d: "3.0 m",
      correct_option: "A",
      explanation: "Step 1: Total displacement along the incline is (s + x) = (s + 0.5) m.\nVertical descent: h = (s + 0.5) sin 30° = 0.5 (s + 0.5).\n\nStep 2: By conservation of energy, loss in gravitational PE equals gain in elastic PE:\nm g h = (1/2) k x²\n2 × 10 × [0.5 (s + 0.5)] = (1/2) × 200 × (0.5)².\n\nStep 3: Solve for s:\n10 (s + 0.5) = 100 × 0.25 = 25  →  s + 0.5 = 2.5  →  s = 2.0 m.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 4998, // Q148
    similar_question: {
      question: "A ball of mass 2 kg is released from rest from a height of 10 m down a frictionless curved track and enters a horizontal section where it collides with and compresses a light spring of force constant k = 400 N/m. What is the maximum compression of the spring? (Take g = 10 m/s²)",
      option_a: "1.0 m",
      option_b: "0.5 m",
      option_c: "2.0 m",
      option_d: "1.5 m",
      correct_option: "A",
      explanation: "Step 1: Initial potential energy at release height:\nE = m g h = 2 kg × 10 m/s² × 10 m = 200 J.\n\nStep 2: At maximum compression x_max, all initial potential energy is stored in the compressed spring:\n(1/2) k x_max² = 200 J.\n\nStep 3: Solve for x_max:\n(1/2) × 400 × x_max² = 200  →  200 x_max² = 200  →  x_max = 1.0 m.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 4999, // Q149
    similar_question: {
      question: "A ball of mass 2 kg is released from rest from a height of 10 m down a frictionless curved ramp. At the bottom, it traverses a rough horizontal surface of length 25 m (with coefficient of friction μ = 0.3) and then strikes a spring of force constant k = 100 N/m. What is the maximum compression of the spring? (Take g = 10 m/s²)",
      option_a: "1.0 m",
      option_b: "2.0 m",
      option_c: "0.5 m",
      option_d: "1.5 m",
      correct_option: "A",
      explanation: "Step 1: Initial energy of the ball:\nE_initial = m g h = 2 × 10 × 10 = 200 J.\n\nStep 2: Work done against friction across the rough patch:\nW_f = μ m g d = 0.3 × 2 × 10 × 25 = 150 J.\n\nStep 3: Remaining energy transferred to spring:\nE_spring = E_initial − W_f = 200 − 150 = 50 J.\n(1/2) k x² = 50  →  (1/2)(100) x² = 50  →  50 x² = 50  →  x = 1.0 m.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 5000, // Q150
    similar_question: {
      question: "A small body of mass m is released from rest from a height h = R / 2 on a smooth circular track of radius R. What is the normal reaction force exerted by the track on the body at the lowest point?",
      option_a: "2 m g",
      option_b: "3 m g",
      option_c: "m g",
      option_d: "4 m g",
      correct_option: "A",
      explanation: "Step 1: Speed at the lowest point by conservation of mechanical energy:\n(1/2) m v² = m g h = m g (R / 2)  →  v² = g R.\n\nStep 2: Equation of circular motion at lowest point:\nN − m g = m v² / R.\n\nStep 3: Substitute v² = g R:\nN − m g = m (g R) / R = m g  →  N = m g + m g = 2 m g.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 5001, // Q151
    similar_question: {
      question: "A stone of mass m is dropped from rest from a point A at a height h above a point B. In the absence of air resistance, what is the expression for the kinetic energy of the stone as it passes point B?",
      option_a: "m g h",
      option_b: "(1/2) m g h",
      option_c: "2 m g h",
      option_d: "(1/2) m g h²",
      correct_option: "A",
      explanation: "Step 1: By the work-energy theorem or conservation of mechanical energy:\nΔK = −ΔU = m g h.\n\nStep 2: Since initial speed at point A is zero (K_A = 0):\nK_B − 0 = m g h  →  K_B = m g h.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 5002, // Q152
    similar_question: {
      question: "Given below are two statements:\nAssertion (A): The principle of conservation of mechanical energy is universally valid for all physical processes.\nReason (R): The work-energy theorem (W_total = ΔK) is always valid in any inertial frame of reference.",
      option_a: "Assertion is false but Reason is true",
      option_b: "Both Assertion and Reason are true and Reason is the correct explanation of Assertion",
      option_c: "Both Assertion and Reason are true but Reason is NOT the correct explanation of Assertion",
      option_d: "Assertion is true but Reason is false",
      correct_option: "A",
      explanation: "Step 1: Mechanical energy is conserved ONLY when all forces doing work are conservative. In the presence of friction or other non-conservative forces, mechanical energy is dissipated into thermal or other forms of energy. Thus Assertion is false.\n\nStep 2: The work-energy theorem is directly derived from Newton's second law and is unconditionally true for any force system in an inertial frame. Thus Reason is true.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 5003, // Q153
    similar_question: {
      question: "For a particle moving in a one-dimensional conservative potential U(x) with total mechanical energy E, which of the following statements is INCORRECT?",
      option_a: "The particle can enter regions where potential energy U(x) exceeds total energy E",
      option_b: "Kinetic energy is zero at the turning points where U(x) = E",
      option_c: "The speed of the particle is maximum at positions where U(x) is at a local minimum",
      option_d: "The net force acting on the particle is zero where dU/dx = 0",
      correct_option: "A",
      explanation: "Step 1: Kinetic energy is related to total energy by K = E − U(x).\n\nStep 2: Since kinetic energy K = (1/2) m v² must be non-negative (K ≥ 0), it is classically impossible for the particle to enter regions where U(x) > E (forbidden region).\n\nStep 3: Hence, the statement that the particle can enter regions where U(x) > E is incorrect.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 5004, // Q154
    similar_question: {
      question: "A vertical spring of force constant k supports a block A of mass m at its upper end, while block B of mass M rests on the floor at the lower end. If block A is pulled upwards until the spring is at its natural unstretched length and then released from rest, what is the minimum value of mass m so that block B is lifted off the ground at the highest rebound?",
      option_a: "M / 2",
      option_b: "M",
      option_c: "2 M",
      option_d: "M / 4",
      correct_option: "A",
      explanation: "Step 1: Equilibrium position of mass m occurs when spring is compressed by x_eq = m g / k.\nReleasing from unstretched position (x = 0) initiates oscillations with amplitude A = m g / k.\n\nStep 2: The maximum downward compression is x_max = 2 m g / k.\nBy symmetry of SHM, during upward rebound the spring extends above natural length by x_ext = 2 m g / k.\n\nStep 3: For block B (mass M) to lift off the floor, upward spring force must equal its weight:\nk x_ext ≥ M g  →  k (2 m g / k) ≥ M g  →  2 m g ≥ M g  →  m ≥ M / 2.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 5005, // Q155
    similar_question: {
      question: "Given below are two statements:\nStatement-I: When two particles moving in the same direction undergo a completely inelastic head-on collision, they can never lose 100% of their total kinetic energy.\nStatement-II: The law of conservation of linear momentum is strictly obeyed in all types of collisions in an isolated system.",
      option_a: "Both Statement-I and Statement-II are true, and Statement-II is the correct explanation of Statement-I",
      option_b: "Both Statement-I and Statement-II are true, but Statement-II is NOT the correct explanation of Statement-I",
      option_c: "Statement-I is true but Statement-II is false",
      option_d: "Statement-I is false but Statement-II is true",
      correct_option: "A",
      explanation: "Step 1: Since both particles move in the same direction, initial total momentum P = m₁ u₁ + m₂ u₂ > 0.\n\nStep 2: By conservation of linear momentum (Statement-II), the common velocity after impact must be non-zero: v = P / (m₁ + m₂) > 0.\n\nStep 3: Consequently, the final kinetic energy K_f = (1/2)(m₁ + m₂) v² > 0, which means total kinetic energy cannot be reduced to zero (Statement-I is true, and Statement-II explains it).\n\nTherefore, Option (A) is the correct answer."
    }
  }
];

async function updatePart3() {
  try {
    const loginRes = await fetch('https://api.indraprasthaneetacademy.com/api/admin/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        username: 'indraprasthaadmin',
        password: 'indraprastha@123'
      })
    });
    const { token } = await loginRes.json();
    if (!token) throw new Error('Admin login failed');

    console.log(`Starting update of Set 7 Part 3 (${set7Part3Updates.length} questions)...`);
    let successCount = 0;
    for (const item of set7Part3Updates) {
      const updateRes = await fetch(`https://api.indraprasthaneetacademy.com/api/admin/practice-questions/${item.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          similarQuestion: item.similar_question
        })
      });
      const data = await updateRes.json();
      if (data.success) {
        successCount++;
        console.log(`[${successCount}/${set7Part3Updates.length}] Updated Question ID ${item.id}: SUCCESS`);
      } else {
        console.error(`Failed Question ID ${item.id}:`, data);
      }
    }
    console.log(`Set 7 Part 3 complete: ${successCount} questions committed.`);
  } catch (err) {
    console.error('Update failed:', err);
  }
}

updatePart3();
