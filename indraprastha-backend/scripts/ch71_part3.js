module.exports = [
  {
    id: 295,
    question: "What minimum velocity with which body mass m must enter vertical loop radius R so that it can complete loop? [NEET 2016 Phase 1]",
    optionA: "√(3gR)",
    optionB: "√(5gR)",
    optionC: "√(gR)",
    optionD: "√(2gR)",
    correctOption: "B",
    explanation: "Step 1: Determine the condition to stay on the circular track at the highest point (top):\nAt the top of the vertical circle (height = 2R), the tension T in the string or normal contact force must be at least zero to prevent slackening:\nCentripetal force = mg + T_top\nFor minimum speed at top (T_top = 0):\nm (v_top)² / R = mg\nv_top = √(gR)\n\nStep 2: Apply the Principle of Conservation of Mechanical Energy:\nCompare the lowest point (bottom, height = 0) and highest point (top, height = 2R):\nE_bottom = E_top\n(1/2) m (v_bottom)² = (1/2) m (v_top)² + mg(2R)\n\nStep 3: Substitute v_top = √(gR):\n(1/2) m (v_bottom)² = (1/2) m (gR) + 2mgR\n(1/2) m (v_bottom)² = (5/2) mgR\n(v_bottom)² = 5gR\nv_bottom = √(5gR).\n\nTherefore, Option (B) is the correct answer.",
    similarQuestion: {
      question: "What is the minimum speed required at the highest point of a vertical circle of radius R so that a body tied to a string completes the loop?",
      option_a: "√(gR)",
      option_b: "√(2gR)",
      option_c: "√(3gR)",
      option_d: "√(5gR)",
      correct_option: "A",
      explanation: "Step 1: At the top of the vertical loop, the gravitational force provides the minimum necessary centripetal force when tension T = 0.\n\nStep 2: mg = m v² / R ⇒ v = √(gR).\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 294,
    question: "Body mass 1kg begins to move under action time-dependent force F=2t i+3t² j N where i and j unit vectors along x and y axes. What power will be developed by force at time t? [NEET 2016 Phase 1]",
    optionA: "(2t³+3t⁴)W",
    optionB: "(2t³+3t⁵)W",
    optionC: "(2t²+3t³)W",
    optionD: "(2t²+4t⁴)W",
    correctOption: "B",
    explanation: "Step 1: Find acceleration a(t) from Newton's second law:\nF(t) = 2t î + 3t² ĵ N\nMass m = 1 kg\na(t) = F(t) / m = 2t î + 3t² ĵ m/s²\n\nStep 2: Find velocity v(t) by integrating acceleration from rest (v = 0 at t = 0):\nv(t) = ∫ a(t) dt = ∫ (2t î + 3t² ĵ) dt\nv(t) = t² î + t³ ĵ m/s\n\nStep 3: Calculate the instantaneous power P(t):\nP(t) = F(t) · v(t)\nP(t) = (2t î + 3t² ĵ) · (t² î + t³ ĵ)\nP(t) = (2t × t²) + (3t² × t³)\nP(t) = 2t³ + 3t⁵ W.\n\nTherefore, Option (B) is the correct answer.",
    similarQuestion: {
      question: "A force F = (3t î) N acts on a 1 kg particle initially at rest. The power delivered by the force at t = 2 s is:",
      option_a: "36 W",
      option_b: "18 W",
      option_c: "24 W",
      option_d: "12 W",
      correct_option: "A",
      explanation: "Step 1: Acceleration a = 3t. Velocity v = ∫ 3t dt = 1.5 t².\n\nStep 2: At t = 2 s: F = 3(2) = 6 N, and v = 1.5(4) = 6 m/s.\n\nStep 3: Power P = F × v = 6 × 6 = 36 W.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 293,
    question: "Particle mass 10g moves along circle radius 6.4cm with constant tangential acceleration. What magnitude this acceleration if kinetic energy particle becomes equal 8×10⁻⁴J by end second revolution after beginning motion? [NEET 2016 Phase 1]",
    optionA: "0.18 m/s²",
    optionB: "0.2 m/s²",
    optionC: "0.1 m/s²",
    optionD: "0.15 m/s²",
    correctOption: "C",
    explanation: "Step 1: Convert parameters to SI units:\n- Mass m = 10 g = 10 × 10⁻³ kg = 0.01 kg\n- Radius r = 6.4 cm = 0.064 m\n\nStep 2: Calculate total distance s traveled in 2 complete revolutions:\nDistance in one revolution = 2πr\nFor 2 revolutions: s = 2 × (2πr) = 4πr\ns = 4 × π × 0.064 m = 0.256π m\n\nStep 3: Apply the Work-Energy Theorem:\nWork done by the tangential force F_t equals the change in kinetic energy:\nW = F_t × s = ΔK = K_final − 0 = 8 × 10⁻⁴ J\nSince F_t = m × a_t:\n(m × a_t) × s = 8 × 10⁻⁴\n\nStep 4: Solve for tangential acceleration a_t:\n(0.01 × a_t) × (0.256π) = 8 × 10⁻⁴\na_t × (0.00256π) = 8 × 10⁻⁴\na_t = (8 × 10⁻⁴) / (0.00256 × 3.1416)\na_t = (8 × 10⁻⁴) / (8.0425 × 10⁻³) ≈ 0.0995 m/s² ≈ 0.1 m/s².\n\nTherefore, Option (C) is the correct answer.",
    similarQuestion: {
      question: "A particle of mass 0.1 kg starts from rest on a circle of radius 1 m with constant tangential acceleration 2 m/s². Its kinetic energy after 1 revolution is:",
      option_a: "0.4π J",
      option_b: "0.2π J",
      option_c: "0.8π J",
      option_d: "4π J",
      correct_option: "A",
      explanation: "Step 1: Distance s = 2πr = 2π(1) = 2π m.\n\nStep 2: Tangential force F_t = m a_t = 0.1 × 2 = 0.2 N.\n\nStep 3: Work done = ΔKE = F_t × s = 0.2 × 2π = 0.4π J.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 292,
    question: "Particle moves from point -2i+5j to 4j+3k when force 4i+3j N applied. How much work done by force? [NEET 2016 Phase 2]",
    optionA: "8 J",
    optionB: "11 J",
    optionC: "5 J",
    optionD: "2 J",
    correctOption: "C",
    explanation: "Step 1: Write initial and final position vectors:\nInitial position vector: r₁ = −2î + 5ĵ + 0k̂\nFinal position vector: r₂ = 0î + 4ĵ + 3k̂\n\nStep 2: Find the displacement vector Δr = r₂ − r₁:\nΔr = [0 − (−2)] î + (4 − 5) ĵ + (3 − 0) k̂\nΔr = 2î − 1ĵ + 3k̂\n\nStep 3: State the applied constant force vector F:\nF = 4î + 3ĵ + 0k̂ N\n\nStep 4: Calculate the work done using scalar dot product:\nW = F · Δr = (F_x × Δx) + (F_y × Δy) + (F_z × Δz)\nW = (4 × 2) + (3 × (−1)) + (0 × 3)\nW = 8 − 3 + 0 = 5 J.\n\nTherefore, Option (C) is the correct answer.",
    similarQuestion: {
      question: "A force F = (5î + 2ĵ) N displaces a body from position r₁ = (2î + 3ĵ) m to r₂ = (5î + 6ĵ) m. The work done is:",
      option_a: "21 J",
      option_b: "15 J",
      option_c: "6 J",
      option_d: "27 J",
      correct_option: "A",
      explanation: "Step 1: Displacement is Δr = r₂ − r₁ = (5 − 2)î + (6 − 3)ĵ = 3î + 3ĵ m.\n\nStep 2: Work W = F · Δr = (5 × 3) + (2 × 3) = 15 + 6 = 21 J.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 291,
    question: "Consider drop rainwater mass 1g falling height 1km. It hits ground speed 50 m/s. Take g=10 m/s². Work done by (i) gravitational force and (ii) resistive force air? [NEET 2017]",
    optionA: "(i)1.25J (ii)-8.25J",
    optionB: "(i)100J (ii)8.75J",
    optionC: "(i)10J (ii)-8.75J",
    optionD: "(i)-10J (ii)-8.25J",
    correctOption: "C",
    explanation: "Step 1: Convert parameters to SI units:\n- Mass of raindrop m = 1 g = 10⁻³ kg\n- Height h = 1 km = 1000 m\n- Impact speed v = 50 m/s\n- g = 10 m/s²\n\nStep 2: Calculate work done by the gravitational force:\nW_gravity = mgh = (10⁻³ kg) × (10 m/s²) × (1000 m) = +10 J.\n\nStep 3: Calculate the change in kinetic energy:\nInitial kinetic energy K_initial = 0 (starts from rest)\nFinal kinetic energy K_final = (1/2) m v²\nK_final = (1/2) × 10⁻³ kg × (50 m/s)² = (1/2) × 10⁻³ × 2500 = 1.25 J\nΔK = 1.25 − 0 = 1.25 J.\n\nStep 4: Apply the Work-Energy Theorem to find work done by air resistance:\nW_net = W_gravity + W_air = ΔK\n10 J + W_air = 1.25 J\nW_air = 1.25 − 10 = −8.75 J.\n\nStep 5: Conclude:\n(i) W_gravity = 10 J, (ii) W_air = −8.75 J.\n\nTherefore, Option (C) is the correct answer.",
    similarQuestion: {
      question: "A stone of mass 2 kg is dropped from a height of 20 m. If it hits the ground with a speed of 18 m/s, the work done by air resistance is (g = 10 m/s²):",
      option_a: "−76 J",
      option_b: "−400 J",
      option_c: "+76 J",
      option_d: "−324 J",
      correct_option: "A",
      explanation: "Step 1: Work done by gravity is W_g = mgh = 2 × 10 × 20 = 400 J.\n\nStep 2: Final kinetic energy is K_f = (1/2) m v² = (1/2) × 2 × 18² = 324 J.\n\nStep 3: W_air = K_f − W_g = 324 − 400 = −76 J.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 290,
    question: "Body initially at rest slides along frictionless track from height h and just completes vertical circle diameter AB=D. Height h equal to? [NEET 2018]",
    optionA: "D",
    optionB: "3D/2",
    optionC: "7D/5",
    optionD: "5D/4",
    correctOption: "D",
    explanation: "Step 1: Express circular radius R in terms of diameter D:\nR = D / 2\n\nStep 2: State the condition to just complete the vertical loop:\nTo just complete the vertical circle, the speed at the top of the circle must be:\nv_top = √(gR)\n\nStep 3: Apply the Principle of Conservation of Mechanical Energy:\nThe body starts from rest at height h (initial KE = 0):\nInitial mechanical energy E_initial = mgh\nMechanical energy at the highest point of the loop (height = 2R):\nE_top = mg(2R) + (1/2) m (v_top)²\n\nStep 4: Equate energies and solve for h:\nmgh = 2mgR + (1/2) m (gR) = (5/2) mgR\nh = (5/2) R\nSubstitute R = D / 2:\nh = (5/2) × (D / 2) = 5D / 4.\n\nTherefore, Option (D) is the correct answer.",
    similarQuestion: {
      question: "A toy car rolls down an inclined track into a vertical circular loop of radius R. What is the minimum release height above the bottom of the loop to successfully loop the loop?",
      option_a: "2.5 R (5R / 2)",
      option_b: "2.0 R",
      option_c: "3.0 R",
      option_d: "1.5 R",
      correct_option: "A",
      explanation: "Step 1: Conservation of energy requires mgh = mg(2R) + (1/2) m (gR) = (5/2) mgR.\n\nStep 2: Therefore, h = (5/2) R = 2.5 R.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 289,
    question: "Force F=20+10y acts on particle in y-direction where F newtons and y metres. Work done by this force to move particle from y=0 to y=1m? [NEET 2019]",
    optionA: "5 J",
    optionB: "25 J",
    optionC: "20 J",
    optionD: "30 J",
    correctOption: "B",
    explanation: "Step 1: State the integral formula for work done by a variable force along the y-axis:\nW = ∫ F dy\n\nStep 2: Set the integration limits from y = 0 to y = 1 m:\nW = ∫₀¹ (20 + 10y) dy\n\nStep 3: Integrate term by term:\nW = [20y + 10(y² / 2)]₀¹\nW = [20y + 5y²]₀¹\n\nStep 4: Substitute limits:\nW = [20(1) + 5(1)²] − [0]\nW = 20 + 5 = 25 J.\n\nTherefore, Option (B) is the correct answer.",
    similarQuestion: {
      question: "A force F = (6x² + 2x) N acts on a particle moving along the x-axis. The work done from x = 0 to x = 2 m is:",
      option_a: "20 J",
      option_b: "16 J",
      option_c: "24 J",
      option_d: "12 J",
      correct_option: "A",
      explanation: "Step 1: Integrate force: W = ∫₀² (6x² + 2x) dx = [2x³ + x²]₀².\n\nStep 2: W = 2(8) + 4 = 16 + 4 = 20 J.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 288,
    question: "Water falls from height 60m at rate 15 kg/s to operate turbine. Losses due friction 10% input energy. How much power generated by turbine? g=10 m/s²? [NEET 2021]",
    optionA: "7.0 kW",
    optionB: "10.2 kW",
    optionC: "8.1 kW",
    optionD: "12.3 kW",
    correctOption: "C",
    explanation: "Step 1: Calculate total input power available from falling water:\nP_input = (dm / dt) × g × h\nGiven:\n- Rate of mass flow dm/dt = 15 kg/s\n- Acceleration due to gravity g = 10 m/s²\n- Height h = 60 m\nP_input = 15 × 10 × 60 = 9,000 W = 9.0 kW\n\nStep 2: Account for frictional losses (10%):\nEfficiency of the turbine η = 100% − 10% = 90% = 0.90\n\nStep 3: Calculate the useful power generated by the turbine:\nP_generated = η × P_input\nP_generated = 0.90 × 9.0 kW = 8.1 kW.\n\nTherefore, Option (C) is the correct answer.",
    similarQuestion: {
      question: "Water falls from a height of 50 m at a rate of 20 kg/s to drive a turbine. If 15% of energy is lost, the power delivered is (g = 10 m/s²):",
      option_a: "8.5 kW",
      option_b: "10.0 kW",
      option_c: "1.5 kW",
      option_d: "7.5 kW",
      correct_option: "A",
      explanation: "Step 1: Input power P_in = 20 × 10 × 50 = 10,000 W = 10 kW.\n\nStep 2: Power with 15% loss is P_out = 0.85 × 10 kW = 8.5 kW.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 287,
    question: "Particle released from height S above surface Earth. At certain height kinetic energy three times potential energy. Height from surface Earth and speed particle at that instant respectively? [NEET 2021]",
    optionA: "S/4, √(3gS/2)",
    optionB: "S/2, √(3gS)/2",
    optionC: "S/4, √(3gS)/2",
    optionD: "S/6, √(3gS/2)",
    correctOption: "A",
    explanation: "Step 1: Apply Conservation of Total Mechanical Energy:\nWhen released from rest at height S, the total mechanical energy is:\nE_total = mgS\n\nStep 2: Let h be the height from the Earth's surface where KE = 3 PE:\nE_total = KE + PE\nmgS = 3 PE + PE = 4 PE\nmgS = 4 (mgh)\nh = S / 4\n\nStep 3: Calculate the kinetic energy at this height:\nKE = 3 PE = 3 mg (S / 4) = (3/4) mgS\n\nStep 4: Relate kinetic energy to speed v:\n(1/2) m v² = (3/4) mgS\nv² = (3/2) gS\nv = √(3gS / 2)\n\nStep 5: Conclude:\nHeight = S / 4 and Speed = √(3gS / 2).\n\nTherefore, Option (A) is the correct answer.",
    similarQuestion: {
      question: "A body is dropped from height H. At what height from the ground does its kinetic energy become equal to its potential energy?",
      option_a: "H / 2",
      option_b: "H / 4",
      option_c: "H / 3",
      option_d: "2H / 3",
      correct_option: "A",
      explanation: "Step 1: Total energy is mgH = KE + PE.\n\nStep 2: When KE = PE: mgH = 2 PE = 2 mgh ⇒ h = H / 2.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 286,
    question: "Energy that will be ideally radiated by 100kW transmitter in 1 hour? [NEET 2022 Phase 1]",
    optionA: "36×10⁷ J",
    optionB: "36×10⁴ J",
    optionC: "36×10⁵ J",
    optionD: "1×10⁵ J",
    correctOption: "A",
    explanation: "Step 1: Convert all quantities into SI units:\nPower P = 100 kW = 100 × 10³ W = 10⁵ W (or J/s)\nTime t = 1 hour = 60 × 60 s = 3600 s\n\nStep 2: State the relation between energy and power:\nEnergy E = Power × Time\nE = P × t\n\nStep 3: Calculate the radiated energy:\nE = (10⁵ J/s) × (3600 s)\nE = 3600 × 10⁵ J = 36 × 10⁷ J.\n\nTherefore, Option (A) is the correct answer.",
    similarQuestion: {
      question: "How much electrical energy in joules is consumed by a 500 W heater operating continuously for 2 hours?",
      option_a: "3.6 × 10⁶ J",
      option_b: "1.0 × 10⁶ J",
      option_c: "1.8 × 10⁶ J",
      option_d: "7.2 × 10⁶ J",
      correct_option: "A",
      explanation: "Step 1: Time in seconds is t = 2 × 3600 = 7200 s.\n\nStep 2: Energy E = P × t = 500 × 7200 = 3.6 × 10⁶ J (1 kWh).\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 285,
    question: "Electric lift maximum load 2000kg lift+passengers moving up constant speed 1.5 m/s. Frictional force opposing motion 3000N. Minimum power delivered by motor to lift watts g=10 m/s²? [NEET 2022 Phase 1]",
    optionA: "23000",
    optionB: "20000",
    optionC: "34500",
    optionD: "23500",
    correctOption: "C",
    explanation: "Step 1: Calculate total downward force opposing the upward motion of the lift:\n1. Downward gravitational force: F_gravity = mg = 2000 kg × 10 m/s² = 20,000 N\n2. Downward frictional retarding force: F_friction = 3000 N\nTotal downward force F_total = F_gravity + F_friction = 20,000 + 3000 = 23,000 N\n\nStep 2: Determine upward force required from the motor for constant velocity:\nBecause the lift ascends at constant speed (a = 0), net acceleration is zero.\nUpward tension force F_up must balance total downward force:\nF_up = 23,000 N\n\nStep 3: Calculate minimum power delivered by the motor:\nPower P = F_up × v\nGiven constant speed v = 1.5 m/s:\nP = 23,000 N × 1.5 m/s = 34,500 W.\n\nTherefore, Option (C) is the correct answer.",
    similarQuestion: {
      question: "An elevator of mass 1000 kg moves upward at a constant speed of 2 m/s while experiencing a frictional force of 2000 N. The power supplied by the motor is (g = 10 m/s²):",
      option_a: "24,000 W",
      option_b: "20,000 W",
      option_c: "12,000 W",
      option_d: "4,000 W",
      correct_option: "A",
      explanation: "Step 1: Total force required = mg + F_friction = (1000 × 10) + 2000 = 12,000 N.\n\nStep 2: Power P = F × v = 12,000 × 2 = 24,000 W.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 284,
    question: "Restoring force spring with block attached to its free end represented by? [NEET 2022 Phase 2]",
    optionA: "Straight line passing through origin with negative slope Fx=-kx",
    optionB: "Straight line passing through origin with positive slope Fx=kx",
    optionC: "Upward parabola",
    optionD: "Semicircle above x-axis",
    correctOption: "A",
    explanation: "Step 1: State Hooke's Law for an ideal linear elastic spring:\nThe restoring force F_x exerted by a spring on an attached block is directly proportional to displacement x from equilibrium and opposes displacement:\nF_x = −kx\nwhere k is the positive spring force constant.\n\nStep 2: Analyze the mathematical equation F_x = −kx:\n- This represents a linear relation of the form y = mx + c with intercept c = 0 and slope m = −k.\n- When x = 0 (equilibrium), F_x = 0 (passes through the origin).\n- For positive displacement (x > 0), restoring force is directed in the negative direction (F_x < 0).\n- For negative displacement (x < 0), restoring force is directed in the positive direction (F_x > 0).\n\nStep 3: Conclude the graphical representation:\nThe plot of F_x versus x is a straight line passing through the origin with a negative slope.\n\nTherefore, Option (A) is the correct answer.",
    similarQuestion: {
      question: "How does the elastic potential energy U of an ideal spring depend on elongation x from equilibrium?",
      option_a: "U(x) is an upward-opening parabola centered at origin (U = kx²/2)",
      option_b: "U(x) is a straight line with positive slope",
      option_c: "U(x) is a straight line with negative slope",
      option_d: "U(x) is a downward-opening parabola",
      correct_option: "A",
      explanation: "Step 1: Elastic potential energy is U = (1/2) k x².\n\nStep 2: Since U ∝ x² with k > 0, the graph of U versus x is a symmetric parabola opening upwards with its minimum at x = 0.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 283,
    question: "Potential energy long spring when stretched by 2cm is U. If spring stretched by 8cm potential energy stored will be? [NEET 2023]",
    optionA: "4U",
    optionB: "8U",
    optionC: "16U",
    optionD: "2U",
    correctOption: "C",
    explanation: "Step 1: State the formula for potential energy stored in an elongated spring:\nU = (1/2) k x²\nTherefore, potential energy is proportional to the square of elongation: U ∝ x².\n\nStep 2: Write the ratio of potential energies for extensions x₁ and x₂:\nU₂ / U₁ = (x₂ / x₁)²\n\nStep 3: Substitute x₁ = 2 cm and x₂ = 8 cm:\nU₂ / U = (8 / 2)² = 4² = 16\nU₂ = 16 U.\n\nTherefore, Option (C) is the correct answer.",
    similarQuestion: {
      question: "A spring stretched by 1 cm has potential energy U₀. What is the potential energy when it is compressed by 3 cm?",
      option_a: "9 U₀",
      option_b: "3 U₀",
      option_c: "−9 U₀",
      option_d: "6 U₀",
      correct_option: "A",
      explanation: "Step 1: Potential energy of a spring is U = (1/2) k x² regardless of whether it is stretched or compressed.\n\nStep 2: U = (1/2) k (−3)² = 9 × [(1/2) k (1)²] = 9 U₀.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 282,
    question: "Particle moves velocity 5i-3j+6k m/s under action constant force 10i+10j+20k N. Instantaneous power supplied to particle? [NEET 2023 Manipur]",
    optionA: "200 W",
    optionB: "Zero",
    optionC: "100 W",
    optionD: "140 W",
    correctOption: "D",
    explanation: "Step 1: State the formula for instantaneous power:\nP = F · v\n\nStep 2: Identify components of force F and velocity v:\nF = 10î + 10ĵ + 20k̂ N\nv = 5î − 3ĵ + 6k̂ m/s\n\nStep 3: Compute the dot product:\nP = (F_x × v_x) + (F_y × v_y) + (F_z × v_z)\nP = (10 × 5) + (10 × (−3)) + (20 × 6)\nP = 50 − 30 + 120 = 140 W.\n\nTherefore, Option (D) is the correct answer.",
    similarQuestion: {
      question: "A force F = (2î + 4ĵ − k̂) N acts on a particle moving with velocity v = (3î − 2ĵ + 2k̂) m/s. What is the instantaneous power delivered?",
      option_a: "−4 W",
      option_b: "4 W",
      option_c: "0 W",
      option_d: "12 W",
      correct_option: "A",
      explanation: "Step 1: Calculate dot product: P = F · v = (2 × 3) + (4 × (−2)) + ((−1) × 2).\n\nStep 2: P = 6 − 8 − 2 = −4 W.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 281,
    question: "At any instant time t displacement particle given by x=2t-1 SI units under influence force 5N. Value instantaneous power? [NEET 2024]",
    optionA: "10",
    optionB: "5",
    optionC: "7",
    optionD: "6",
    correctOption: "A",
    explanation: "Step 1: Differentiate displacement x(t) with respect to time to find velocity v:\nx(t) = 2t − 1\nv = dx / dt = (d/dt) (2t − 1) = 2 m/s\n\nStep 2: Calculate instantaneous power:\nPower P = F × v\nGiven force F = 5 N and constant velocity v = 2 m/s:\nP = 5 N × 2 m/s = 10 W.\n\nTherefore, Option (A) is the correct answer.",
    similarQuestion: {
      question: "The position of a particle is given by x = 3t + 4 (in m). If a constant force of 6 N acts in the direction of motion, what is the power supplied?",
      option_a: "18 W",
      option_b: "12 W",
      option_c: "24 W",
      option_d: "9 W",
      correct_option: "A",
      explanation: "Step 1: Velocity is v = dx/dt = 3 m/s.\n\nStep 2: Power P = F × v = 6 × 3 = 18 W.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 280,
    question: "Object falls from height 10m above ground. After striking ground loses 50% kinetic energy. Height up to which object can rebound from ground? [NEET 2024 Re-Examination]",
    optionA: "7.5 m",
    optionB: "10 m",
    optionC: "2.5 m",
    optionD: "5 m",
    correctOption: "D",
    explanation: "Step 1: Calculate kinetic energy just before striking the ground:\nFrom conservation of energy, kinetic energy just before impact equals loss in gravitational potential energy from height H = 10 m:\nK_before = mgH\n\nStep 2: Calculate kinetic energy retained immediately after impact:\nThe object loses 50% of its kinetic energy, so it retains the remaining 50%:\nK_after = 0.50 × K_before = 0.50 × mgH\n\nStep 3: Relate retained kinetic energy to rebound height H':\nAt maximum rebound height H', kinetic energy is fully converted back into gravitational potential energy:\nmgH' = K_after\nmgH' = 0.50 × mgH\nH' = 0.50 × H = 0.50 × 10 m = 5 m.\n\nTherefore, Option (D) is the correct answer.",
    similarQuestion: {
      question: "A ball dropped from height 16 m rebounds to height 4 m. What percentage of its mechanical energy was lost in the collision?",
      option_a: "75%",
      option_b: "25%",
      option_c: "50%",
      option_d: "80%",
      correct_option: "A",
      explanation: "Step 1: Initial energy E₁ = mg(16), final rebound energy E₂ = mg(4).\n\nStep 2: Energy lost = mg(16 − 4) = 12 mg.\n\nStep 3: Fraction lost = 12 / 16 = 3 / 4 = 75%.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 279,
    question: "Object moving along horizontal x-direction with kinetic energy 10J displaced through x=3i m by force F=-2i+3j N. Kinetic energy object at end displacement? [NEET 2024 Re-Examination]",
    optionA: "10 J",
    optionB: "16 J",
    optionC: "4 J",
    optionD: "6 J",
    correctOption: "C",
    explanation: "Step 1: Identify given displacement vector d and force vector F:\nDisplacement vector d = 3î + 0ĵ m\nForce vector F = −2î + 3ĵ N\n\nStep 2: Calculate work done by the force using scalar dot product:\nW = F · d = (F_x × d_x) + (F_y × d_y)\nW = (−2 × 3) + (3 × 0) = −6 J\n\nStep 3: Apply the Work-Energy Theorem:\nWork done by all forces equals change in kinetic energy:\nW = K_final − K_initial\nK_final = K_initial + W\nGiven K_initial = 10 J and W = −6 J:\nK_final = 10 + (−6) = 4 J.\n\nTherefore, Option (C) is the correct answer.",
    similarQuestion: {
      question: "A body of kinetic energy 25 J is displaced by d = 4î m while subjected to a force F = (−3î + 5ĵ) N. Its new kinetic energy is:",
      option_a: "13 J",
      option_b: "37 J",
      option_c: "20 J",
      option_d: "12 J",
      correct_option: "A",
      explanation: "Step 1: Work done W = F · d = (−3 × 4) = −12 J.\n\nStep 2: K_final = K_initial + W = 25 − 12 = 13 J.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 278,
    question: "Bob heavy mass m suspended by light string length l. Bob given horizontal velocity v0 as shown figure. If string gets slack at some point P making angle θ from horizontal ratio speed v bob at point P to its initial speed v0 is? [NEET 2025]",
    optionA: "[cosθ/(2+3 sinθ)]^(1/2)",
    optionB: "[sinθ/(2+3 sinθ)]^(1/2)",
    optionC: "(sinθ)^(1/2)",
    optionD: "[1/(2+3 sinθ)]^(1/2)",
    correctOption: "B",
    explanation: "Step 1: Analyze vertical position and height of point P above the bottom:\nThe string of length l makes an angle θ with the horizontal in the upper semicircle.\nThe vertical height of point P above the horizontal diameter is l sin θ.\nThe height of point P above the bottom (reference level) is:\nh = l + l sin θ = l(1 + sin θ)\n\nStep 2: Apply the condition for the string to go slack at point P:\nThe string goes slack when tension T drops to zero (T = 0).\nThe radial inward component of gravity provides the required centripetal force:\nmg sin θ = m v² / l\ngl sin θ = v²\ngl = v² / sin θ\n\nStep 3: Apply the Principle of Conservation of Mechanical Energy between bottom and point P:\n(1/2) m v₀² = (1/2) m v² + mgh\nv₀² = v² + 2gh = v² + 2gl(1 + sin θ)\n\nStep 4: Substitute gl = v² / sin θ into the energy equation:\nv₀² = v² + 2 (v² / sin θ) (1 + sin θ)\nv₀² = v² [1 + 2(1 + sin θ) / sin θ]\nv₀² = v² [(sin θ + 2 + 2 sin θ) / sin θ]\nv₀² = v² [(2 + 3 sin θ) / sin θ]\n\nStep 5: Solve for the ratio (v / v₀):\nv² / v₀² = sin θ / (2 + 3 sin θ)\nv / v₀ = [sin θ / (2 + 3 sin θ)]¹ᐟ².\n\nTherefore, Option (B) is the correct answer.",
    similarQuestion: {
      question: "In a vertical circular motion of a bob tied to a string of length l, what is the tension at the lowest point if the bob just completes the circle?",
      option_a: "6 mg",
      option_b: "5 mg",
      option_c: "4 mg",
      option_d: "3 mg",
      correct_option: "A",
      explanation: "Step 1: Minimum speed at the bottom to complete the circle is v = √(5gl).\n\nStep 2: Tension at lowest point is T_bottom = mg + m v² / l = mg + m(5gl) / l = 6 mg.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 277,
    question: "Kinetic energies two similar cars A and B are 100J and 225J respectively. On applying brakes car A stops after 1000m and car B stops after 1500m. If FA and FB are forces applied by brakes on cars A and B respectively then ratio FA/FB is? [NEET 2025]",
    optionA: "1/3",
    optionB: "1/2",
    optionC: "3/2",
    optionD: "2/3",
    correctOption: "D",
    explanation: "Step 1: Apply the Work-Energy Theorem for stopping vehicles:\nWork done by the retarding braking force F over stopping distance d equals the initial kinetic energy K of the car:\nF × d = K\nF = K / d\n\nStep 2: Calculate braking force for car A:\nGiven K_A = 100 J and d_A = 1000 m:\nF_A = 100 / 1000 = 0.1 N\n\nStep 3: Calculate braking force for car B:\nGiven K_B = 225 J and d_B = 1500 m:\nF_B = 225 / 1500 = 0.15 N\n\nStep 4: Compute the ratio F_A / F_B:\nF_A / F_B = 0.10 / 0.15 = 10 / 15 = 2 / 3.\n\nTherefore, Option (D) is the correct answer.",
    similarQuestion: {
      question: "Car 1 has twice the kinetic energy of Car 2. If identical braking forces are applied to both, what is the ratio of their stopping distances d₁ : d₂?",
      option_a: "2 : 1",
      option_b: "1 : 2",
      option_c: "4 : 1",
      option_d: "1 : 4",
      correct_option: "A",
      explanation: "Step 1: F × d = K ⇒ d = K / F.\n\nStep 2: For equal braking force F, stopping distance is directly proportional to kinetic energy: d₁ / d₂ = K₁ / K₂ = 2 : 1.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 276,
    question: "Power of crane which lifts mass 1000kg to height 20m in 10s is g=9.8 m/s²? [NEET 2026]",
    optionA: "19.6 kW",
    optionB: "19.6 W",
    optionC: "39.2 W",
    optionD: "39.2 kW",
    correctOption: "A",
    explanation: "Step 1: Calculate the work done in lifting the mass against gravity:\nW = mgh\nGiven:\n- Mass m = 1000 kg\n- Acceleration due to gravity g = 9.8 m/s²\n- Vertical height h = 20 m\nW = 1000 × 9.8 × 20 = 196,000 J\n\nStep 2: Calculate power developed by the crane:\nPower P = Work done / Time taken = W / t\nGiven time t = 10 s:\nP = 196,000 J / 10 s = 19,600 W\n\nStep 3: Convert to kilowatts (1 kW = 1000 W):\nP = 19,600 / 1000 = 19.6 kW.\n\nTherefore, Option (A) is the correct answer.",
    similarQuestion: {
      question: "An electric motor of efficiency 80% lifts a 200 kg load through a height of 10 m in 5 s. What is the electrical power input to the motor? (g = 10 m/s²)",
      option_a: "5.0 kW",
      option_b: "4.0 kW",
      option_c: "3.2 kW",
      option_d: "6.25 kW",
      correct_option: "A",
      explanation: "Step 1: Output work W = mgh = 200 × 10 × 10 = 20,000 J.\n\nStep 2: Output power P_out = 20,000 / 5 = 4000 W = 4 kW.\n\nStep 3: Input power P_in = P_out / 0.8 = 4 / 0.8 = 5.0 kW.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 275,
    question: "A particle mass M moves along horizontal x-axis from x=0 to x=L. Coefficient kinetic friction varies as function x as μk(x)=μ0-αx where μ0 α constants so that μk(L)=0. Total work done by frictional force during motion is n μ0 MgL where g acceleration due to gravity. Value n is? [RE-NEET 2026]",
    optionA: "1/2",
    optionB: "3",
    optionC: "1",
    optionD: "1/3",
    correctOption: "A",
    explanation: "Step 1: Determine the constant α from the boundary condition μ_k(L) = 0:\nμ_k(L) = μ₀ − αL = 0\nα = μ₀ / L\nTherefore, the coefficient of friction is:\nμ_k(x) = μ₀ − (μ₀ / L) x = μ₀ (1 − x / L)\n\nStep 2: Write the expression for the frictional force at position x:\nNormal force on horizontal surface N = Mg\nFrictional force f_k(x) = μ_k(x) N = μ₀ (1 − x / L) Mg\n\nStep 3: Calculate the work done by friction from x = 0 to x = L:\nSince friction opposes displacement, work done is:\n|W_friction| = ∫₀ᴸ f_k(x) dx = Mg ∫₀ᴸ μ₀ (1 − x / L) dx\n|W_friction| = μ₀ Mg [x − x² / (2L)]₀ᴸ\n|W_friction| = μ₀ Mg [L − L² / (2L)] = μ₀ Mg [L − L / 2] = (1/2) μ₀ Mg L\n\nStep 4: Compare with the given expression n μ₀ Mg L:\nn = 1/2.\n\nTherefore, Option (A) is the correct answer.",
    similarQuestion: {
      question: "A block of mass M is pulled on a horizontal surface where the friction coefficient increases linearly as μ(x) = kx. What is the work done against friction from x = 0 to x = d?",
      option_a: "(1/2) kMg d²",
      option_b: "kMg d²",
      option_c: "(1/3) kMg d²",
      option_d: "2 kMg d²",
      correct_option: "A",
      explanation: "Step 1: Friction force is f = μ(x) Mg = kMg x.\n\nStep 2: Work done against friction is W = ∫₀ᵈ kMg x dx = kMg [x² / 2]₀ᵈ = (1/2) kMg d².\n\nTherefore, Option (A) is the correct answer."
    }
  }
];

