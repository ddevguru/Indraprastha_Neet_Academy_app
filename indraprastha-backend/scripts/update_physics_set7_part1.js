const fs = require('fs');

const set7Part1Updates = [
  {
    id: 4850, // Q1
    similar_question: {
      question: "Two bodies of masses 3 kg and 1 kg are connected by a light inextensible string passing over a smooth fixed pulley. When the system is released from rest, what is the magnitude of the downward acceleration of the centre of mass of the system? (Take g = 10 m/s²)",
      option_a: "2.5 m/s²",
      option_b: "5.0 m/s²",
      option_c: "1.25 m/s²",
      option_d: "10.0 m/s²",
      correct_option: "A",
      explanation: "Step 1: Calculate the common acceleration of the two blocks:\na = [(m₁ − m₂) / (m₁ + m₂)] × g = [(3 − 1) / (3 + 1)] × 10 = (2 / 4) × 10 = 5 m/s².\nHere, m₁ accelerates downward with a, and m₂ accelerates upward with a.\n\nStep 2: Calculate the acceleration of the centre of mass (taking downward as positive):\na_cm = (m₁ a₁ + m₂ a₂) / (m₁ + m₂)\na_cm = [3(+5) + 1(−5)] / (3 + 1) = (15 − 5) / 4 = 10 / 4 = 2.5 m/s².\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 4851, // Q2
    similar_question: {
      question: "A heavy bowling ball of mass M moving with speed 6 m/s collides head-on elastically with a stationary light ping-pong ball of mass m (where m ≪ M). What is the approximate speed of the ping-pong ball immediately after the collision?",
      option_a: "12 m/s",
      option_b: "6 m/s",
      option_c: "3 m/s",
      option_d: "24 m/s",
      correct_option: "A",
      explanation: "Step 1: Formula for velocity of target sphere 2 in a 1D elastic collision:\nv₂' = [(2 m₁) / (m₁ + m₂)] u₁ + [(m₂ − m₁) / (m₁ + m₂)] u₂.\n\nStep 2: Given u₁ = 6 m/s, u₂ = 0, and m₂ ≪ m₁:\nTaking m₂ / m₁ → 0, the coefficient becomes (2 m₁) / m₁ = 2.\nv₂' ≈ 2 u₁ = 2 × 6 m/s = 12 m/s.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 4852, // Q3
    similar_question: {
      question: "An elastic rubber ball of mass 0.2 kg bounces back and forth elastically between two parallel rigid vertical walls separated by a distance of 1.5 m with a constant horizontal speed of 6 m/s. What is the average force exerted by the ball on each wall?",
      option_a: "4.8 N",
      option_b: "2.4 N",
      option_c: "9.6 N",
      option_d: "1.2 N",
      correct_option: "A",
      explanation: "Step 1: Change in momentum of the ball during each collision with one wall:\nΔp = m v − (−m v) = 2 m v.\n\nStep 2: Time elapsed between successive impacts on the same wall:\nΔt = 2 L / v, where L is the separation between walls.\n\nStep 3: Average force on the wall:\nF_avg = Δp / Δt = (2 m v) / (2 L / v) = m v² / L.\nSubstitute m = 0.2 kg, v = 6 m/s, and L = 1.5 m:\nF_avg = (0.2 × 36) / 1.5 = 7.2 / 1.5 = 4.8 N.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 4853, // Q4
    similar_question: {
      question: "A rocket motor produces a thrust of 900 N by ejecting exhaust gases at a constant speed of 300 m/s relative to the rocket. What is the rate of consumption of fuel?",
      option_a: "3.0 kg/s",
      option_b: "1.5 kg/s",
      option_c: "2.0 kg/s",
      option_d: "4.5 kg/s",
      correct_option: "A",
      explanation: "Step 1: Thrust force formula for a rocket:\nF_thrust = v_rel × (dm/dt).\n\nStep 2: Substitute given values:\n900 = 300 × (dm/dt)\ndm/dt = 900 / 300 = 3.0 kg/s.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 4854, // Q5
    similar_question: {
      question: "A smooth semicircular hollow tube of mass M and mean radius R rests in a vertical plane on a frictionless horizontal floor. A small block of identical mass M is released from rest at the left top end of the tube and slides down to the right top end. In the absence of external horizontal forces, what is the magnitude of the horizontal displacement of the tube?",
      option_a: "R",
      option_b: "2R",
      option_c: "R / 2",
      option_d: "4R / π",
      correct_option: "A",
      explanation: "Step 1: Since no external horizontal force acts on the (tube + block) system, the horizontal position of the centre of mass remains unchanged:\nΔX_cm = 0  →  M Δx_tube + M Δx_block = 0.\n\nStep 2: Horizontal displacement of the block relative to the tube:\nΔx_(block, tube) = 2R.\nThus, Δx_block = Δx_tube + 2R.\n\nStep 3: Solve for Δx_tube:\nM Δx_tube + M (Δx_tube + 2R) = 0\n2 M Δx_tube = −2 M R  →  |Δx_tube| = R.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 4856, // Q6
    similar_question: {
      question: "A non-uniform thin rod of length L lies along the x-axis with one end at x = 0. Its linear mass density varies as λ(x) = c x³, where c is a positive constant. What is the distance of its centre of mass from x = 0?",
      option_a: "4L / 5",
      option_b: "3L / 4",
      option_c: "2L / 3",
      option_d: "5L / 6",
      correct_option: "A",
      explanation: "Step 1: Formula for centre of mass of a continuous 1D object:\nx_cm = [∫₀ᴸ x dm] / [∫₀ᴸ dm] = [∫₀ᴸ x λ(x) dx] / [∫₀ᴸ λ(x) dx].\n\nStep 2: Compute numerator:\n∫₀ᴸ x (c x³) dx = c ∫₀ᴸ x⁴ dx = c L⁵ / 5.\n\nStep 3: Compute denominator (total mass M):\n∫₀ᴸ (c x³) dx = c L⁴ / 4.\n\nStep 4: Compute x_cm:\nx_cm = (c L⁵ / 5) / (c L⁴ / 4) = (4 / 5) L = 4L / 5.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 4857, // Q7
    similar_question: {
      question: "A circular hole of radius R/2 is cut out from a uniform circular disc of radius R such that the perimeter of the hole touches the circumference of the disc. What is the distance of the centre of mass of the remaining portion from the centre of the original disc?",
      option_a: "R / 6",
      option_b: "R / 4",
      option_c: "R / 8",
      option_d: "R / 12",
      correct_option: "A",
      explanation: "Step 1: Let the centre of the original disc be at the origin (0, 0).\nArea of original disc: A₁ = π R².\nArea of removed circular hole: A₂ = π (R/2)² = π R² / 4.\nArea of remaining portion: A_rem = A₁ − A₂ = (3/4) π R².\n\nStep 2: Position of centre of removed part:\nx₂ = R / 2.\n\nStep 3: Centre of mass of the remaining part:\nx_cm = (A₁ x₁ − A₂ x₂) / (A₁ − A₂) = [0 − (π R² / 4)(R / 2)] / [(3/4) π R²]\nx_cm = −(R / 8) / (3/4) = −R / 6.\nHence, the distance is R/6 on the side opposite to the hole.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 4858, // Q8
    similar_question: {
      question: "From a uniform square sheet of side 2R, a circular disc of radius R/2 is cut out such that its centre is at a distance R/2 from the centre of the square along the x-axis. What is the magnitude of the shift in the centre of mass of the remaining sheet from the centre of the square?",
      option_a: "πR / (32 − 2π)",
      option_b: "πR / 16",
      option_c: "2R / (8 − π)",
      option_d: "πR / (16 − π)",
      correct_option: "A",
      explanation: "Step 1: Area of the full square sheet: A₁ = (2R)² = 4 R², with centre at x₁ = 0.\nArea of the removed disc: A₂ = π (R/2)² = π R² / 4, with centre at x₂ = R/2.\n\nStep 2: Area of the remaining portion:\nA_rem = A₁ − A₂ = 4 R² − (π R² / 4) = R² (16 − π) / 4.\n\nStep 3: Centre of mass of remaining sheet:\n|x_cm| = (A₂ x₂) / A_rem = [(π R² / 4) × (R / 2)] / [R² (16 − π) / 4]\n|x_cm| = (π R / 8) / [(16 − π) / 4] = π R / [2(16 − π)] = π R / (32 − 2π).\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 4859, // Q9
    similar_question: {
      question: "A particle of mass m initially at rest is acted upon by a time-varying force F(t) for a duration T. The F-t curve forms a semi-circle of radius F₀, where duration T = 2F₀ and peak force is F₀. What is the final speed u of the particle?",
      option_a: "π F₀ T / (4m)",
      option_b: "π F₀ T / (2m)",
      option_c: "F₀ T / (2m)",
      option_d: "2π F₀ T / m",
      correct_option: "A",
      explanation: "Step 1: Impulse J is given by the area under the F-t curve:\nArea of semi-ellipse / semi-circle = (1/2) π × (semi-major axis) × (semi-minor axis)\nArea = (1/2) π × (T / 2) × F₀ = π F₀ T / 4.\n\nStep 2: By impulse-momentum theorem:\nJ = Δp = m u − 0  →  u = J / m = π F₀ T / (4m).\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 4860, // Q10
    similar_question: {
      question: "A block of mass m moving with speed v on a smooth horizontal floor compresses a light spring of force constant k by a maximum distance x₀. What was the magnitude of momentum of the block before it struck the spring?",
      option_a: "x₀ √(m k)",
      option_b: "x₀² √(m k)",
      option_c: "k x₀ / m",
      option_d: "2 x₀ √(m k)",
      correct_option: "A",
      explanation: "Step 1: By conservation of mechanical energy:\n(1/2) m v² = (1/2) k x₀²  →  m v² = k x₀².\n\nStep 2: Relate kinetic energy and momentum p = m v:\np² = (m v)² = m (m v²) = m (k x₀²) = m k x₀².\n\nStep 3: Solve for momentum p:\np = x₀ √(m k).\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 4861, // Q11
    similar_question: {
      question: "Match List-I with List-II regarding work, energy, and force characteristics:\nList-I:\n(A) Work done by all forces on a body\n(B) Work done by internal conservative forces\n(C) Non-conservative forces\n(D) Conservative force relationship\nList-II:\n(1) Potential energy cannot be defined\n(2) Change in kinetic energy (ΔK)\n(3) Negative change in potential energy (−ΔU)\n(4) F = −dU/dx",
      option_a: "A-2, B-3, C-1, D-4",
      option_b: "A-3, B-2, C-1, D-4",
      option_c: "A-2, B-1, C-3, D-4",
      option_d: "A-4, B-3, C-1, D-2",
      correct_option: "A",
      explanation: "Step 1: By the Work-Energy Theorem, work done by all forces equals change in kinetic energy: W_net = ΔK  →  (A) matches (2).\n\nStep 2: By definition of potential energy, work done by internal conservative forces is W_c = −ΔU  →  (B) matches (3).\n\nStep 3: For non-conservative forces (like friction), work is path-dependent and potential energy is not defined  →  (C) matches (1).\n\nStep 4: For a conservative force field in 1D, F = −dU/dx  →  (D) matches (4).\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 4862, // Q12
    similar_question: {
      question: "A block of mass 3 kg is suspended by a light cord inside an elevator that accelerates upwards from rest at 2 m/s². What is the work done by the tension force on the block during the first 2 seconds of motion? (Take g = 10 m/s²)",
      option_a: "144 J",
      option_b: "120 J",
      option_c: "72 J",
      option_d: "288 J",
      correct_option: "A",
      explanation: "Step 1: Calculate tension T in the cord:\nT − m g = m a  →  T = m(g + a) = 3 × (10 + 2) = 36 N.\n\nStep 2: Calculate vertical displacement s during 2 s:\ns = u t + (1/2) a t² = 0 + (1/2) × 2 × (2)² = 4 m.\n\nStep 3: Work done by tension force:\nW = T × s = 36 N × 4 m = 144 J.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 4863, // Q13
    similar_question: {
      question: "A particle starts from rest and moves with uniform acceleration, acquiring a velocity v₁ in time t₁. What is its instantaneous kinetic energy at any time t (t < t₁)?",
      option_a: "Proportional to (v₁ t / t₁)²",
      option_b: "Proportional to (v₁ t / t₁)",
      option_c: "Proportional to v₁² t / t₁",
      option_d: "Proportional to v₁ t² / t₁",
      correct_option: "A",
      explanation: "Step 1: Since acceleration is uniform:\na = v₁ / t₁.\n\nStep 2: Velocity at time t:\nv(t) = a t = (v₁ / t₁) t = (v₁ t / t₁).\n\nStep 3: Instantaneous kinetic energy:\nK(t) = (1/2) m [v(t)]² = (1/2) m (v₁ t / t₁)², which is directly proportional to (v₁ t / t₁)².\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 4864, // Q14
    similar_question: {
      question: "The potential energy function for a two-dimensional conservative force field is given by U(x, y) = 4 cos(x + y) joules. What is the magnitude of the force acting on a particle at coordinates (π/6, π/6)?",
      option_a: "2√6 N",
      option_b: "4√3 N",
      option_c: "2√3 N",
      option_d: "6 N",
      correct_option: "A",
      explanation: "Step 1: Find components of conservative force F⃗ = −∇U:\nF_x = −∂U/∂x = −(−4 sin(x + y)) = 4 sin(x + y)\nF_y = −∂U/∂y = −(−4 sin(x + y)) = 4 sin(x + y).\n\nStep 2: Evaluate at (π/6, π/6):\nx + y = π/6 + π/6 = π/3.\nsin(π/3) = √3 / 2.\nF_x = 4 × (√3 / 2) = 2√3 N.\nF_y = 4 × (√3 / 2) = 2√3 N.\n\nStep 3: Magnitude of force:\n|F| = √[(F_x)² + (F_y)²] = √[(2√3)² + (2√3)²] = √(12 + 12) = √24 = 2√6 N.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 4865, // Q15
    similar_question: {
      question: "Given below are two statements:\nAssertion (A): In an oblique perfectly inelastic collision between two smooth billiard balls, their final velocities immediately after impact are not necessarily equal.\nReason (R): For smooth colliding spheres, only the component of velocity along the common normal (line of impact) becomes equal, while velocity components along the common tangent remain unchanged.",
      option_a: "Both Assertion and Reason are true and Reason is the correct explanation of Assertion",
      option_b: "Both Assertion and Reason are true but Reason is NOT the correct explanation of Assertion",
      option_c: "Assertion is true but Reason is false",
      option_d: "Assertion is false but Reason is true",
      correct_option: "A",
      explanation: "Step 1: In a perfectly inelastic collision, the coefficient of restitution along the line of impact is e = 0, so the velocity components along the common normal become identical.\n\nStep 2: Since the spheres are smooth, no frictional impulse acts tangential to the surface of contact; hence the tangential velocity components remain unaltered.\n\nStep 3: Because the tangential velocities generally differ initially, the total final velocity vectors of the two balls will not be equal. Thus, Assertion is true and Reason correctly explains it.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 4866, // Q16
    similar_question: {
      question: "The potential energy of a particle moving along the x-axis is given by U(x) = 2x² − 8x + 5 (in SI units). The position x = 2 m represents a point of:",
      option_a: "Stable equilibrium",
      option_b: "Unstable equilibrium",
      option_c: "Neutral equilibrium",
      option_d: "Non-equilibrium state",
      correct_option: "A",
      explanation: "Step 1: Find the first derivative of U(x) with respect to x:\ndU/dx = 4x − 8.\nAt x = 2 m, dU/dx = 4(2) − 8 = 0. Therefore, x = 2 m is an equilibrium point.\n\nStep 2: Find the second derivative to determine stability:\nd²U/dx² = 4 > 0.\n\nStep 3: Since d²U/dx² > 0, the potential energy has a local minimum, corresponding to stable equilibrium.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 4867, // Q17
    similar_question: {
      question: "Two ideal springs 1 and 2 have force constants k₁ and k₂ respectively, with k₁ > k₂. If both springs are compressed by the same applied compressive force F, which spring has more elastic potential energy stored in it?",
      option_a: "Spring 2 stores more potential energy than Spring 1",
      option_b: "Spring 1 stores more potential energy than Spring 2",
      option_c: "Both store equal potential energy",
      option_d: "Neither stores potential energy",
      correct_option: "A",
      explanation: "Step 1: Elastic potential energy in terms of restoring force F and spring constant k:\nU = (1/2) k x² = F² / (2k).\n\nStep 2: Compare energies for identical compressive force F:\nU ∝ 1 / k.\nSince k₁ > k₂, it follows that U₂ > U₁.\n\nStep 3: Hence, the softer spring (Spring 2) stores more potential energy.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 4868, // Q18
    similar_question: {
      question: "A particle of mass m moves along a straight line such that its velocity varies with displacement s according to v = k √s, where k is a positive constant. What is the total work done by all forces acting on the particle during the first t seconds of motion?",
      option_a: "m k⁴ t² / 8",
      option_b: "m k² t⁴ / 8",
      option_c: "m k⁴ t² / 4",
      option_d: "m k² t⁴ / 4",
      correct_option: "A",
      explanation: "Step 1: Relate velocity and displacement:\nv = ds/dt = k √s  →  s^(−1/2) ds = k dt.\nIntegrating with s = 0 at t = 0:\n2 s^(1/2) = k t  →  s = k² t² / 4.\n\nStep 2: Differentiate s to find velocity at time t:\nv = ds/dt = 2 k² t / 4 = k² t / 2.\n\nStep 3: Apply the work-energy theorem (W_net = ΔK):\nW = (1/2) m v² − 0 = (1/2) m (k² t / 2)² = m k⁴ t² / 8.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 4869, // Q19
    similar_question: {
      question: "A nail of mass m is dropped from a height H onto a soft wooden block. It penetrates a distance d into the wood before coming to rest. What is the average resistive force exerted by the wood on the nail?",
      option_a: "m g (1 + H / d)",
      option_b: "m g (H / d)",
      option_c: "m g (1 − H / d)",
      option_d: "m g (H + d)",
      correct_option: "A",
      explanation: "Step 1: Apply the work-energy theorem from the release point to the final resting point:\nΔK = 0.\nW_net = W_gravity + W_resistive = 0.\n\nStep 2: Calculate work done by gravity and resistive force:\nTotal vertical descent = H + d.\nW_gravity = m g (H + d).\nW_resistive = −F_avg × d.\n\nStep 3: Equate and solve for F_avg:\nm g (H + d) − F_avg × d = 0\nF_avg = m g (H + d) / d = m g (1 + H / d).\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 4870, // Q20
    similar_question: {
      question: "The potential energy stored in a spring when stretched by 5 cm is U₀. What will be the potential energy stored when it is stretched by 15 cm?",
      option_a: "9 U₀",
      option_b: "3 U₀",
      option_c: "6 U₀",
      option_d: "27 U₀",
      correct_option: "A",
      explanation: "Step 1: Formula for potential energy stored in a spring:\nU = (1/2) k x².\n\nStep 2: Ratio of potential energies:\nU₂ / U₁ = (x₂ / x₁)² = (15 / 5)² = 3² = 9.\n\nStep 3: Compute U₂:\nU₂ = 9 U₁ = 9 U₀.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 4871, // Q21
    similar_question: {
      question: "An electric elevator carrying a total mass of 1500 kg moves upwards at a constant speed of 2.0 m/s. A constant frictional force of 2000 N opposes its motion. What is the minimum power that must be delivered by the motor? (Take g = 10 m/s²)",
      option_a: "34 kW",
      option_b: "30 kW",
      option_c: "17 kW",
      option_d: "40 kW",
      correct_option: "A",
      explanation: "Step 1: Upward force required to move at constant speed:\nF = M g + f_friction = (1500 × 10) + 2000 = 15000 + 2000 = 17000 N.\n\nStep 2: Minimum power delivered by the motor:\nP = F × v = 17000 N × 2.0 m/s = 34000 W = 34 kW.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 4872, // Q22
    similar_question: {
      question: "A radio broadcasting station transmits with an output power of 50 kW. How much total energy is radiated by the transmitter in 2 hours of continuous operation?",
      option_a: "36 × 10⁷ J",
      option_b: "18 × 10⁷ J",
      option_c: "3.6 × 10⁶ J",
      option_d: "1.0 × 10⁸ J",
      correct_option: "A",
      explanation: "Step 1: Power P = 50 kW = 50 × 10³ W.\nTime t = 2 hours = 2 × 3600 s = 7200 s.\n\nStep 2: Energy radiated:\nE = P × t = (50 × 10³ W) × (7200 s) = 360 × 10⁶ J = 36 × 10⁷ J.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 4873, // Q23
    similar_question: {
      question: "A stone is released from rest from a height H above the ground. At a certain point during its descent, its kinetic energy is twice its potential energy (taking the ground as reference PE = 0). What are its height h above the ground and its speed v at this instant?",
      option_a: "H / 3 and 2√(gH / 3)",
      option_b: "H / 2 and √(gH)",
      option_c: "H / 4 and √(3gH / 2)",
      option_d: "2H / 3 and √(2gH / 3)",
      correct_option: "A",
      explanation: "Step 1: Total mechanical energy at release height: E = m g H.\nAt height h, total energy is E = K + U = 2 U + U = 3 U = 3 m g h.\n\nStep 2: Solve for height h:\n3 m g h = m g H  →  h = H / 3.\n\nStep 3: Solve for speed v:\nK = 2 U = 2 m g (H / 3) = (2/3) m g H.\n(1/2) m v² = (2/3) m g H  →  v² = (4/3) g H  →  v = 2√(gH / 3).\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 4874, // Q24
    similar_question: {
      question: "Water falls from a height of 50 m at the rate of 20 kg/s to operate an electric turbine. If 20% of the gravitational potential energy is dissipated due to frictional losses, how much power is generated by the turbine? (Take g = 10 m/s²)",
      option_a: "8.0 kW",
      option_b: "10.0 kW",
      option_c: "6.4 kW",
      option_d: "12.0 kW",
      correct_option: "A",
      explanation: "Step 1: Total input power from falling water:\nP_in = (dm/dt) × g × h = 20 kg/s × 10 m/s² × 50 m = 10000 W = 10 kW.\n\nStep 2: Efficiency of turbine:\nη = 100% − 20% = 80% = 0.80.\n\nStep 3: Power generated:\nP_out = η × P_in = 0.80 × 10 kW = 8.0 kW.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 4875, // Q25
    similar_question: {
      question: "The dissociation energy of a typical hydrogen bond in a biomolecule is approximately 3.2 × 10⁻²⁰ J. What is this energy expressed in electron-volts (eV)? (Take 1 eV = 1.6 × 10⁻¹⁹ J)",
      option_a: "0.20 eV",
      option_b: "0.02 eV",
      option_c: "2.0 eV",
      option_d: "0.05 eV",
      correct_option: "A",
      explanation: "Step 1: Conversion relationship:\n1 eV = 1.6 × 10⁻¹⁹ J.\n\nStep 2: Divide energy in joules by 1.6 × 10⁻¹⁹:\nE = (3.2 × 10⁻²⁰ J) / (1.6 × 10⁻¹⁹ J/eV) = 2 × 10⁻¹ eV = 0.20 eV.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 4876, // Q26
    similar_question: {
      question: "A body of mass m is whirled in a vertical circle of radius R using a light string. If its speed at the lowest point of the circular path is √(6 g R), what is the tension in the string at this lowest point?",
      option_a: "7 m g",
      option_b: "6 m g",
      option_c: "8 m g",
      option_d: "5 m g",
      correct_option: "A",
      explanation: "Step 1: Equation of motion at the lowest point:\nT_lowest − m g = m v² / R.\n\nStep 2: Substitute v = √(6 g R):\nT_lowest − m g = m (6 g R) / R = 6 m g.\n\nStep 3: Solve for T_lowest:\nT_lowest = 6 m g + m g = 7 m g.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 4877, // Q27
    similar_question: {
      question: "A variable force given by F(y) = (15 + 6y) N acts on a particle moving along the y-axis. What is the work done by this force in moving the particle from y = 0 to y = 2 m?",
      option_a: "42 J",
      option_b: "30 J",
      option_c: "21 J",
      option_d: "54 J",
      correct_option: "A",
      explanation: "Step 1: Work done by a position-dependent force:\nW = ∫₀² F(y) dy = ∫₀² (15 + 6y) dy.\n\nStep 2: Evaluate the definite integral:\nW = [15y + 3y²]₀² = 15(2) + 3(2)² = 30 + 12 = 42 J.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 4878, // Q28
    similar_question: {
      question: "An object of mass 1.0 kg starts from rest at x = 0 under the action of a position-dependent net force F(x). The work done by the force up to x = 4 m is 18 J, and the total work done up to x = 8 m is 32 J. What are the speeds of the object at x = 4 m and x = 8 m, respectively?",
      option_a: "6 m/s and 8 m/s",
      option_b: "4 m/s and 6 m/s",
      option_c: "6 m/s and 10 m/s",
      option_d: "8 m/s and 12 m/s",
      correct_option: "A",
      explanation: "Step 1: By the work-energy theorem, W = ΔK = (1/2) m v² − 0.\n\nStep 2: Speed at x = 4 m:\n18 = (1/2) × 1.0 × v₁²  →  v₁² = 36  →  v₁ = 6 m/s.\n\nStep 3: Speed at x = 8 m:\n32 = (1/2) × 1.0 × v₂²  →  v₂² = 64  →  v₂ = 8 m/s.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 4879, // Q29
    similar_question: {
      question: "A small stone attached to a string of breaking strength T_max is whirled in a vertical circle. At which position along the circular trajectory is the string under the greatest mechanical tension and thus most susceptible to breaking?",
      option_a: "At the lowest point of the circular trajectory",
      option_b: "At the highest point of the circular trajectory",
      option_c: "When the string is horizontal",
      option_d: "Tension is identical at all points",
      correct_option: "A",
      explanation: "Step 1: The tension at an angle θ with the downward vertical is:\nT = m g cos θ + m v² / R.\n\nStep 2: At the lowest point (θ = 0°), cos θ = 1 (maximum) and the speed v is also at its maximum value:\nT_max = m g + m v_max² / R.\n\nStep 3: Hence, the string experiences maximum tension at the lowest point, making it most likely to break there.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 4880, // Q30
    similar_question: {
      question: "A small block slides down a frictionless track starting from rest at height h and enters a vertical circular loop of radius R. What is the minimum release height h so that the block just successfully loops the loop without losing contact at the top?",
      option_a: "5R / 2",
      option_b: "2R",
      option_c: "3R",
      option_d: "7R / 2",
      correct_option: "A",
      explanation: "Step 1: Minimum speed at the highest point of the loop to maintain contact:\nv_top = √(g R).\n\nStep 2: Minimum speed at the lowest point of the loop by conservation of energy:\n(1/2) m v_bot² = (1/2) m v_top² + m g (2R) = (1/2) m (g R) + 2 m g R = (5/2) m g R\nv_bot = √(5 g R).\n\nStep 3: Equate initial potential energy at release height h to kinetic energy at bottom:\nm g h = (1/2) m v_bot² = (5/2) m g R  →  h = 5R / 2.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 4881, // Q31
    similar_question: {
      question: "A moving block of mass m collides head-on with a stationary block of mass 2m. If the lighter block comes to rest immediately after the collision, what is the coefficient of restitution e?",
      option_a: "0.50",
      option_b: "0.25",
      option_c: "0.75",
      option_d: "1.00",
      correct_option: "A",
      explanation: "Step 1: Apply conservation of linear momentum:\nm u₁ + 2m (0) = m (0) + 2m v₂\nm u₁ = 2m v₂  →  v₂ = u₁ / 2.\n\nStep 2: Formula for coefficient of restitution e:\ne = (velocity of separation) / (velocity of approach) = (v₂ − v₁) / (u₁ − u₂)\ne = (u₁ / 2 − 0) / (u₁ − 0) = 1 / 2 = 0.50.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 4882, // Q32
    similar_question: {
      question: "A raindrop of mass 2 g falls from a cloud at a height of 500 m and strikes the ground with a terminal speed of 40 m/s. Taking g = 10 m/s², what are the work done by the gravitational force (W_g) and by the air resistance (W_r), respectively?",
      option_a: "+10 J and −8.4 J",
      option_b: "+10 J and −10 J",
      option_c: "+8.4 J and −1.6 J",
      option_d: "−10 J and +8.4 J",
      correct_option: "A",
      explanation: "Step 1: Work done by gravity:\nm = 2 g = 2 × 10⁻³ kg, h = 500 m.\nW_g = m g h = (2 × 10⁻³ kg) × 10 m/s² × 500 m = +10 J.\n\nStep 2: Change in kinetic energy of the drop:\nΔK = (1/2) m v² − 0 = (1/2) × (2 × 10⁻³) × (40)² = 10⁻³ × 1600 = 1.6 J.\n\nStep 3: Apply the work-energy theorem:\nW_g + W_r = ΔK  →  10 + W_r = 1.6  →  W_r = 1.6 − 10 = −8.4 J.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 4883, // Q33
    similar_question: {
      question: "A particle of mass 50 g moves along a circle of radius 2.0 m starting from rest under constant tangential acceleration. If its kinetic energy becomes 1.6 J after covering a path length of 4.0 m, what is the magnitude of its tangential acceleration?",
      option_a: "8.0 m/s²",
      option_b: "4.0 m/s²",
      option_c: "2.0 m/s²",
      option_d: "10.0 m/s²",
      correct_option: "A",
      explanation: "Step 1: Work done by the tangential force equals change in kinetic energy:\nW = F_t × s = ΔK  →  F_t × 4.0 m = 1.6 J  →  F_t = 0.4 N.\n\nStep 2: Tangential acceleration:\na_t = F_t / m = 0.4 N / 0.050 kg = 8.0 m/s².\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 4884, // Q34
    similar_question: {
      question: "A small body of mass m is tied to a string and moves in a circle on a frictionless horizontal table with speed v₀ and radius r₀. The string is slowly pulled through a small hole at the center until the radius of the circle is halved to r₀ / 2. What is the final kinetic energy of the body?",
      option_a: "2 m v₀²",
      option_b: "4 m v₀²",
      option_c: "m v₀²",
      option_d: "(1/2) m v₀²",
      correct_option: "A",
      explanation: "Step 1: The pulling force is central (passes through the hole), so torque τ = 0 and angular momentum is conserved:\nL = m v₀ r₀ = m v_f (r₀ / 2)  →  v_f = 2 v₀.\n\nStep 2: Calculate final kinetic energy:\nK_f = (1/2) m (v_f)² = (1/2) m (2 v₀)² = (1/2) m (4 v₀²) = 2 m v₀².\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 4885, // Q35
    similar_question: {
      question: "A ball is projected vertically downwards from a height of 45 m with an initial speed v₀. It collides with the ground, loses 50% of its kinetic energy on impact, and rebounds back to the original height of 45 m. What was its initial launch speed v₀? (Take g = 10 m/s²)",
      option_a: "30 m/s",
      option_b: "20 m/s",
      option_c: "15 m/s",
      option_d: "45 m/s",
      correct_option: "A",
      explanation: "Step 1: Mechanical energy just before impact with the ground:\nE₁ = m g h + (1/2) m v₀².\n\nStep 2: Energy immediately after rebound:\nE₂ = 0.50 E₁ = 0.50 [m g h + (1/2) m v₀²].\n\nStep 3: To rebound back to the height h, E₂ must equal m g h:\n0.50 [m g h + (1/2) m v₀²] = m g h\nm g h + (1/2) m v₀² = 2 m g h  →  (1/2) m v₀² = m g h\nv₀² = 2 g h = 2 × 10 × 45 = 900  →  v₀ = 30 m/s.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 4886, // Q36
    similar_question: {
      question: "A particle of mass m, initially at rest, is accelerated along a straight line by an engine delivering a constant power P. What is the force acting on the particle as a function of time t?",
      option_a: "√(m P / 2) t⁻¹/²",
      option_b: "√(2 m P) t⁻¹/²",
      option_c: "√(m P) t⁻¹/²",
      option_d: "(1/2) √(m P) t⁻¹/²",
      correct_option: "A",
      explanation: "Step 1: Work done in time t under constant power P is W = P t.\nBy the work-energy theorem: (1/2) m v² = P t  →  v = √(2 P t / m).\n\nStep 2: Force F is related to power by P = F v:\nF = P / v = P / √(2 P t / m) = √(m P² / 2 P t) = √(m P / 2) t⁻¹/².\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 4887, // Q37
    similar_question: {
      question: "A person's heart pumps 4.5 litres of blood per minute against an average blood pressure of 120 mm of Hg. What is the average power generated by the heart? (Density of mercury = 13.6 × 10³ kg/m³, g = 10 m/s²)",
      option_a: "1.22 W",
      option_b: "2.45 W",
      option_c: "0.61 W",
      option_d: "3.67 W",
      correct_option: "A",
      explanation: "Step 1: Pressure P = ρ g h:\nP = (13.6 × 10³ kg/m³) × 10 m/s² × 0.120 m = 16320 N/m².\n\nStep 2: Volume flow rate dV/dt:\ndV/dt = 4.5 L / 60 s = (4.5 × 10⁻³ m³) / 60 s = 7.5 × 10⁻⁵ m³/s.\n\nStep 3: Power output:\nPower = P × (dV/dt) = 16320 × (7.5 × 10⁻⁵) = 1.224 W ≈ 1.22 W.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 4888, // Q38
    similar_question: {
      question: "A particle moves along a straight line under the action of a force F that decreases linearly from F = 10 N at x = 0 to F = 2 N at x = 8 m. What is the total work done by the force in displacing the particle from x = 0 to x = 8 m?",
      option_a: "48 J",
      option_b: "40 J",
      option_c: "32 J",
      option_d: "56 J",
      correct_option: "A",
      explanation: "Step 1: The force-displacement graph forms a trapezoid.\n\nStep 2: Work done equals the area under the F-x curve:\nArea = (1/2) × (parallel sides sum) × height\nArea = (1/2) × (10 + 2) × 8 = 6 × 8 = 48 J.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 4889, // Q39
    similar_question: {
      question: "What is the minimum horizontal velocity that must be imparted to a bob of mass m suspended by a light string of length L at its lowest point so that it can successfully describe a full vertical circle?",
      option_a: "√(5 g L)",
      option_b: "√(3 g L)",
      option_c: "√(2 g L)",
      option_d: "√(g L)",
      correct_option: "A",
      explanation: "Step 1: At the topmost point of the vertical circle, the minimum condition for the string not to slack is T ≥ 0:\nm v_top² / L ≥ m g  →  v_top = √(g L).\n\nStep 2: Apply conservation of mechanical energy between bottom and top points:\n(1/2) m v_bot² = (1/2) m v_top² + m g (2L)\n(1/2) m v_bot² = (1/2) m (g L) + 2 m g L = (5/2) m g L.\n\nStep 3: Solve for v_bot:\nv_bot = √(5 g L).\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 4890, // Q40
    similar_question: {
      question: "A stationary bomb of mass 5m explodes into three fragments. Two fragments, each of mass m, fly off in mutually perpendicular directions with equal speeds v. What is the total kinetic energy released in the explosion?",
      option_a: "(4/3) m v²",
      option_b: "(3/2) m v²",
      option_c: "2 m v²",
      option_d: "(5/3) m v²",
      correct_option: "A",
      explanation: "Step 1: Momentum of the first two fragments:\np⃗₁ = m v î,  p⃗₂ = m v ĵ.\nTotal momentum before explosion was zero, so the third fragment of mass (5m − 2m) = 3m has momentum:\np⃗₃ = −(p⃗₁ + p⃗₂) = −(m v î + m v ĵ).\n|p⃗₃|² = (m v)² + (m v)² = 2 m² v².\n\nStep 2: Kinetic energy of the three pieces:\nK₁ = (1/2) m v²\nK₂ = (1/2) m v²\nK₃ = |p⃗₃|² / (2 × 3m) = (2 m² v²) / (6m) = (1/3) m v².\n\nStep 3: Total kinetic energy:\nK_total = (1/2) m v² + (1/2) m v² + (1/3) m v² = (1 + 1/3) m v² = (4/3) m v².\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 4891, // Q41
    similar_question: {
      question: "The potential energy of an isolated physical system increases when work is done:",
      option_a: "By an external agent against an internal conservative force field",
      option_b: "By the internal conservative force field on the system",
      option_c: "By non-conservative frictional forces on the system",
      option_d: "By an external agent without any opposing forces",
      correct_option: "A",
      explanation: "Step 1: The fundamental relationship between change in potential energy ΔU and work done by conservative forces W_c is:\nΔU = −W_c.\n\nStep 2: When an external agent does work W_ext against conservative forces without changing kinetic energy, W_ext = −W_c = ΔU.\n\nStep 3: Hence, potential energy increases (ΔU > 0) when work is done by an external agent against the conservative force field.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 4892, // Q42
    similar_question: {
      question: "A block of mass m is gently attached to the lower end of an unstretched vertical light spring of stiffness k and then released from rest. What is the maximum extension produced in the spring?",
      option_a: "2 m g / k",
      option_b: "m g / k",
      option_c: "4 m g / k",
      option_d: "m g / (2k)",
      correct_option: "A",
      explanation: "Step 1: Let the maximum extension be x_max. The block is momentarily at rest both at release (x = 0) and at maximum extension (x = x_max), so ΔK = 0.\n\nStep 2: By the work-energy theorem:\nW_gravity + W_spring = 0\nm g x_max − (1/2) k x_max² = 0.\n\nStep 3: Solving for non-zero x_max:\nx_max = 2 m g / k.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 4893, // Q43
    similar_question: {
      question: "An agricultural water pump expels water continuously through a nozzle at a speed of 3 m/s. If the mass of water per unit length of the exiting jet is 40 kg/m, what is the power of the pump?",
      option_a: "540 W",
      option_b: "270 W",
      option_c: "180 W",
      option_d: "360 W",
      correct_option: "A",
      explanation: "Step 1: Mass flow rate dm/dt of the water jet:\ndm/dt = λ × v = (40 kg/m) × (3 m/s) = 120 kg/s.\n\nStep 2: Rate of kinetic energy imparted to the water (power):\nP = (1/2) (dm/dt) v² = (1/2) × 120 kg/s × (3 m/s)² = 60 × 9 = 540 W.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 4894, // Q44
    similar_question: {
      question: "A ball of mass m moving with a speed of 6 m/s collides head-on with a stationary ball of mass 2m. If the coefficient of restitution is e = 0.5, what are the velocities of the two balls immediately after the collision?",
      option_a: "0 m/s and 3 m/s",
      option_b: "1 m/s and 2.5 m/s",
      option_c: "2 m/s and 2 m/s",
      option_d: "−1 m/s and 3.5 m/s",
      correct_option: "A",
      explanation: "Step 1: Apply conservation of linear momentum:\nm(6) + 2m(0) = m v₁ + 2m v₂  →  v₁ + 2 v₂ = 6.\n\nStep 2: Use the coefficient of restitution definition:\ne = (v₂ − v₁) / (u₁ − u₂)  →  0.5 = (v₂ − v₁) / (6 − 0)  →  v₂ − v₁ = 3.\n\nStep 3: Add the two equations:\n(v₁ + 2 v₂) + (v₂ − v₁) = 6 + 3  →  3 v₂ = 9  →  v₂ = 3 m/s.\nSubstitute v₂ = 3 into v₂ − v₁ = 3:  3 − v₁ = 3  →  v₁ = 0 m/s.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 4895, // Q45
    similar_question: {
      question: "A stationary bomb explodes into three pieces. Two pieces fly off at right angles to each other: a 2 kg piece with speed 6 m/s and a 1.6 kg piece with speed 10 m/s. If the third piece flies off with a speed of 5 m/s, what is its mass?",
      option_a: "4.0 kg",
      option_b: "2.0 kg",
      option_c: "6.0 kg",
      option_d: "5.0 kg",
      correct_option: "A",
      explanation: "Step 1: Momenta of the first two perpendicular fragments:\np₁ = 2 kg × 6 m/s = 12 kg·m/s\np₂ = 1.6 kg × 10 m/s = 16 kg·m/s.\n\nStep 2: Resultant momentum of these two pieces:\np_res = √[(p₁)² + (p₂)²] = √[12² + 16²] = √[144 + 256] = √400 = 20 kg·m/s.\n\nStep 3: By momentum conservation, the third piece must have an equal and opposite momentum:\np₃ = 20 kg·m/s.\nMass of third piece m₃ = p₃ / v₃ = 20 / 5 = 4.0 kg.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 4896, // Q46
    similar_question: {
      question: "A particle moves along a straight line such that its position is given by x(t) = (4t + 3) metres under the action of a constant net force of 8 N directed along the motion. What is the instantaneous power delivered to the particle?",
      option_a: "32 W",
      option_b: "24 W",
      option_c: "16 W",
      option_d: "40 W",
      correct_option: "A",
      explanation: "Step 1: Find velocity by differentiating position with respect to time:\nv = dx/dt = d(4t + 3)/dt = 4 m/s.\n\nStep 2: Calculate instantaneous power:\nP = F × v = 8 N × 4 m/s = 32 W.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 4897, // Q47
    similar_question: {
      question: "Given below are two statements:\nAssertion (A): The work done by a force on a moving body can be negative.\nReason (R): Work is the scalar dot product of force and displacement vectors, and the cosine of an obtuse angle is negative.",
      option_a: "Both Assertion and Reason are true and Reason is the correct explanation of Assertion",
      option_b: "Both Assertion and Reason are true but Reason is NOT the correct explanation of Assertion",
      option_c: "Assertion is true but Reason is false",
      option_d: "Assertion is false but Reason is true",
      correct_option: "A",
      explanation: "Step 1: Work is defined as W = F⃗ · d⃗ = F d cos θ, where θ is the angle between force and displacement.\n\nStep 2: When the force opposes motion (such as friction), the angle θ is obtuse (90° < θ ≤ 180°), for which cos θ < 0, resulting in negative work.\n\nStep 3: Hence, both Assertion and Reason are true, and Reason is the correct explanation of Assertion.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 4898, // Q48
    similar_question: {
      question: "A force F⃗ = (4î + 3ĵ − 2k̂) N acts on a particle and displaces it through d⃗ = (3î − 2ĵ + 5k̂) m. What is the total work done by this force?",
      option_a: "−4 J",
      option_b: "+4 J",
      option_c: "+10 J",
      option_d: "−10 J",
      correct_option: "A",
      explanation: "Step 1: Work done is the dot product of force and displacement vectors:\nW = F⃗ · d⃗ = F_x d_x + F_y d_y + F_z d_z.\n\nStep 2: Substitute components:\nW = (4)(3) + (3)(−2) + (−2)(5) = 12 − 6 − 10 = −4 J.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 4899, // Q49
    similar_question: {
      question: "A box of mass 5 kg is pushed horizontally along a rough floor over a distance of 4 m. What is the work done by the normal contact force exerted by the floor on the box?",
      option_a: "0 J",
      option_b: "200 J",
      option_c: "50 J",
      option_d: "−200 J",
      correct_option: "A",
      explanation: "Step 1: The normal force acts perpendicular to the horizontal surface (vertically upward).\n\nStep 2: The displacement of the box is purely horizontal.\nAngle between normal force and displacement is θ = 90°.\n\nStep 3: Work done:\nW = N × s × cos 90° = 0 J.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 4900, // Q50
    similar_question: {
      question: "A constant force of magnitude 20 N displaces an object through 5 m along a straight line. If the work done on the object is 50 J, what is the angle between the force vector and the displacement vector?",
      option_a: "60°",
      option_b: "30°",
      option_c: "45°",
      option_d: "90°",
      correct_option: "A",
      explanation: "Step 1: Formula for work done:\nW = F × s × cos θ.\n\nStep 2: Substitute known values:\n50 = 20 × 5 × cos θ  →  50 = 100 cos θ.\n\nStep 3: Solve for θ:\ncos θ = 50 / 100 = 0.5  →  θ = 60°.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 4901, // Q51
    similar_question: {
      question: "A small ball of mass m attached to a light string of length L is whirled in a horizontal circle with uniform speed v. What is the work done by the tension force in the string during one complete revolution?",
      option_a: "Zero",
      option_b: "2π m v²",
      option_c: "m v² / L",
      option_d: "2π m g L",
      correct_option: "A",
      explanation: "Step 1: In uniform circular motion, the tension force acts radially inward towards the centre of the circular path.\n\nStep 2: The instantaneous displacement is directed tangentially along the circle, making an angle of 90° with the radial tension force at all points.\n\nStep 3: Instantaneous work done dW = T ds cos 90° = 0. Therefore, the total work done over one full revolution is zero.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 4902, // Q52
    similar_question: {
      question: "A crane lowers a crate of mass M vertically downward through a distance h with a constant downward acceleration of g / 3. What is the work done by the supporting cable on the crate?",
      option_a: "−(2/3) M g h",
      option_b: "+(2/3) M g h",
      option_c: "−(1/3) M g h",
      option_d: "−M g h",
      correct_option: "A",
      explanation: "Step 1: Equation of downward motion for the crate:\nM g − T = M a = M (g / 3)  →  T = M g − M g / 3 = (2/3) M g.\n\nStep 2: The tension force T acts vertically upward while the displacement h is vertically downward (θ = 180°).\n\nStep 3: Work done by tension:\nW = T × h × cos 180° = (2/3) M g × h × (−1) = −(2/3) M g h.\n\nTherefore, Option (A) is the correct answer."
    }
  }
];

async function updatePart1() {
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

    console.log(`Starting update of Set 7 Part 1 (${set7Part1Updates.length} questions)...`);
    let successCount = 0;
    for (const item of set7Part1Updates) {
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
        console.log(`[${successCount}/${set7Part1Updates.length}] Updated Question ID ${item.id}: SUCCESS`);
      } else {
        console.error(`Failed Question ID ${item.id}:`, data);
      }
    }
    console.log(`Set 7 Part 1 complete: ${successCount} questions committed.`);
  } catch (err) {
    console.error('Update failed:', err);
  }
}

updatePart1();
