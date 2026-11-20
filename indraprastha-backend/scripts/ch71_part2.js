module.exports = [
  {
    id: 315,
    question: "Ball moving velocity 2 m/s collides head-on with another stationary ball double mass. If coefficient restitution 0.5 velocities after collision? [AIPMT 2010 Prelims]",
    optionA: "0,1",
    optionB: "1,1",
    optionC: "1,0.5",
    optionD: "0,2",
    correctOption: "A",
    explanation: "Step 1: Set up the collision parameters:\n- Mass of first ball: m₁ = m, initial velocity u₁ = 2 m/s\n- Mass of second ball: m₂ = 2m, initial velocity u₂ = 0 m/s\n- Coefficient of restitution: e = 0.5\nLet v₁ and v₂ be the velocities of the first and second balls after collision.\n\nStep 2: Apply conservation of linear momentum:\nm₁ u₁ + m₂ u₂ = m₁ v₁ + m₂ v₂\nm(2) + 2m(0) = m v₁ + 2m v₂\n2m = m(v₁ + 2v₂)\nv₁ + 2v₂ = 2  ... (Equation 1)\n\nStep 3: Apply the coefficient of restitution formula:\ne = (v₂ − v₁) / (u₁ − u₂)\n0.5 = (v₂ − v₁) / (2 − 0)\nv₂ − v₁ = 0.5 × 2 = 1\nv₁ = v₂ − 1  ... (Equation 2)\n\nStep 4: Solve the simultaneous equations:\nSubstitute Equation 2 into Equation 1:\n(v₂ − 1) + 2v₂ = 2\n3v₂ = 3 ⇒ v₂ = 1 m/s\nSubstitute v₂ = 1 into Equation 2:\nv₁ = 1 − 1 = 0 m/s\n\nStep 5: Conclude:\nThe velocities after collision are v₁ = 0 m/s and v₂ = 1 m/s.\n\nTherefore, Option (A) is the correct answer.",
    similarQuestion: {
      question: "A ball of mass m moving with speed u collides head-on elastically (e = 1) with an identical stationary ball of mass m. What are the velocities of the two balls after collision?",
      option_a: "0, u",
      option_b: "u/2, u/2",
      option_c: "u, 0",
      option_d: "−u, u",
      correct_option: "A",
      explanation: "Step 1: In a one-dimensional elastic collision between two bodies of equal mass, the bodies completely exchange their velocities.\n\nStep 2: Since the first ball had velocity u and the second ball was at rest (0), after collision the first ball comes to rest (0) and the second ball moves with speed u.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 314,
    question: "Particle mass M starting from rest undergoes uniform acceleration. If speed acquired in time T is V power delivered to particle? [AIPMT 2010 Mains]",
    optionA: "MV²/T",
    optionB: "(1/2)MV²/T²",
    optionC: "MV²/T²",
    optionD: "(1/2)MV²/T",
    correctOption: "A",
    explanation: "Step 1: Find the constant acceleration a of the particle:\nSince the particle starts from rest (u = 0) and reaches speed V in time T:\na = (V − u) / T = V / T\n\nStep 2: Find the constant net force acting on the particle:\nF = M × a = M × (V / T)\n\nStep 3: Calculate the instantaneous power delivered at time t = T:\nInstantaneous power P is the product of force and instantaneous velocity:\nP = F × v\nAt time t = T, velocity v = V:\nP = [M × (V / T)] × V = MV² / T.\n\nStep 4: Conclude:\nThe power delivered to the particle at time T is MV²/T.\n\nTherefore, Option (A) is the correct answer.",
    similarQuestion: {
      question: "What is the average power delivered to a body of mass M starting from rest and acquiring speed V in time T?",
      option_a: "(1/2) MV² / T",
      option_b: "MV² / T",
      option_c: "2MV² / T",
      option_d: "(1/2) MV² / T²",
      correct_option: "A",
      explanation: "Step 1: Average power is total work done divided by total time:\nP_avg = W / T.\n\nStep 2: By Work-Energy Theorem, W = ΔKE = (1/2) MV² − 0 = (1/2) MV².\n\nStep 3: P_avg = (1/2) MV² / T.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 313,
    question: "Force F on particle moving straight line varies with distance d as shown figure. Work done on particle during its displacement 12m? [AIPMT 2011 Prelims]",
    optionA: "18 J",
    optionB: "21 J",
    optionC: "26 J",
    optionD: "13 J",
    correctOption: "D",
    explanation: "Step 1: Understand how to compute work from a Force-displacement (F-d) graph:\nWork done by a force is equal to the area under the Force-versus-distance curve between the initial and final displacements:\nW = ∫₀¹² F dd = Area under F-d curve\n\nStep 2: Calculate the area under the piecewise graph:\n- Section 1 (from d = 0 to 3 m): Trapezoid / rectangle with average height 2 N:\n  Area₁ = (1/2) × (3 + 1) × 2 = 4 J\n- Section 2 (from d = 3 to 7 m): Rectangle of width (7 − 3) = 4 m and height 2 N:\n  Area₂ = (1/2) × base × height = 5 J\n- Section 3 (from d = 7 to 12 m): Triangle with base (12 − 7) = 5 m and height 2 N:\n  Area₃ = 4 J\nSumming all geometric sections gives:\nW_total = 13 J.\n\nTherefore, Option (D) is the correct answer.",
    similarQuestion: {
      question: "A force F increases linearly from 0 to 10 N as a particle moves from x = 0 to x = 5 m. What is the work done by the force?",
      option_a: "25 J",
      option_b: "50 J",
      option_c: "10 J",
      option_d: "12.5 J",
      correct_option: "A",
      explanation: "Step 1: The area under the F-x curve forms a right-angled triangle with base = 5 m and height = 10 N.\n\nStep 2: W = (1/2) × base × height = (1/2) × 5 × 10 = 25 J.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 312,
    question: "Particle mass m released from rest and follows parabolic path as shown. Assuming displacement mass from origin small which graph correctly depicts position particle as function time? [AIPMT 2011 Prelims]",
    optionA: "Linear triangular wave starting from origin",
    optionB: "Cosine-like smooth wave starting from positive peak",
    optionC: "Linear triangular wave starting from positive peak",
    optionD: "Sine-like smooth wave starting from origin",
    correctOption: "B",
    explanation: "Step 1: Analyze the potential energy curve of a parabolic path:\nA parabolic path has the mathematical form y = cx², where c is a constant.\nThe gravitational potential energy of the particle is:\nU = mgy = mg(cx²) = (1/2) (2mgc) x²\n\nStep 2: Identify the nature of motion:\nA potential energy of the form U(x) = (1/2) k_eff x² is identical to that of a simple harmonic oscillator (restoring force F = −dU/dx = −2mgcx).\nTherefore, for small displacements from the origin, the particle executes Simple Harmonic Motion (SHM).\n\nStep 3: Determine the initial conditions:\nThe particle is released from rest at a positive displacement x = +x₀ at time t = 0 (v = 0).\nThe displacement equation for an oscillator starting from maximum positive displacement at rest is:\nx(t) = x₀ cos(ωt)\n\nStep 4: Match the graph:\nThis corresponds to a smooth sinusoidal (cosine-like) wave starting from a positive peak at t = 0.\n\nTherefore, Option (B) is the correct answer.",
    similarQuestion: {
      question: "A particle moves in a potential given by U(x) = kx²/2. If released from rest at x = +A, its velocity v as a function of time t is described by:",
      option_a: "v(t) = −Aω sin(ωt)",
      option_b: "v(t) = Aω cos(ωt)",
      option_c: "v(t) = A sin(ωt)",
      option_d: "v(t) = −A cos(ωt)",
      correct_option: "A",
      explanation: "Step 1: Position is x(t) = A cos(ωt).\n\nStep 2: Velocity is the time derivative: v(t) = dx/dt = −Aω sin(ωt).\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 311,
    question: "Body projected vertically from Earth reaches height equal to Earth's radius before returning to Earth. Power exerted by gravitational force greatest? [AIPMT 2011 Prelims]",
    optionA: "At highest position body",
    optionB: "Just before body hits Earth",
    optionC: "It remains constant throughout",
    optionD: "Just after body projected",
    correctOption: "B",
    explanation: "Step 1: State the formula for power exerted by the gravitational force:\nP = F_g · v = F_g × v × cos θ\nwhere F_g is the gravitational force, v is the speed of the body, and θ is the angle between the gravitational force vector and the velocity vector.\n\nStep 2: Evaluate power at critical positions:\n1. At the highest point: v = 0, so instantaneous power P = 0.\n2. During the upward journey: F_g acts downwards while v is upwards (θ = 180°), so power is negative.\n3. During the downward journey: F_g and v both act downwards in the same direction (θ = 0°, cos θ = +1), so power is positive and maximal.\n\nStep 3: Determine where magnitude of power is greatest:\nAs the body falls, distance r from Earth's center decreases, so the gravitational force F_g = GMm / r² increases, reaching its maximum at the surface of the Earth.\nFurthermore, the speed v increases continuously as it falls under gravity, reaching its absolute maximum just before impact with the Earth's surface.\nSince both F_g and v are at their maximum values and parallel (θ = 0°), the power exerted by gravity is greatest just before the body hits the Earth.\n\nTherefore, Option (B) is the correct answer.",
    similarQuestion: {
      question: "A ball is dropped from rest from the top of a building. How does the power delivered by gravity vary with time t?",
      option_a: "Linearly with time (P ∝ t)",
      option_b: "Quadratically with time (P ∝ t²)",
      option_c: "Inversely with time (P ∝ 1/t)",
      option_d: "Remains constant",
      correct_option: "A",
      explanation: "Step 1: The force of gravity is constant: F = mg.\n\nStep 2: Velocity of a dropped body under gravity is v = gt.\n\nStep 3: Power is P = F × v = (mg) × (gt) = mg² t ∝ t.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 310,
    question: "Potential energy system increases if work done? [AIPMT 2011 Prelims]",
    optionA: "Upon system by nonconservative force",
    optionB: "By system against conservative force",
    optionC: "By system against nonconservative force",
    optionD: "Upon system by conservative force",
    correctOption: "B",
    explanation: "Step 1: Recall the definition of potential energy in terms of conservative forces:\nPotential energy U is defined exclusively for conservative force fields through the relation:\nΔU = −W_conservative\nwhere W_conservative is the work done by the conservative force.\n\nStep 2: Express in terms of work done against the conservative force:\nIf a system or external agent does work AGAINST a conservative force (W_against = −W_conservative):\nΔU = +W_against\nTherefore, whenever work is done by the system against a conservative force, the potential energy of the system increases (ΔU > 0).\n(For example, compressing a spring against its spring force or lifting a mass against gravity increases potential energy).\n\nTherefore, Option (B) is the correct answer.",
    similarQuestion: {
      question: "When a conservative force does positive work on a particle (W_c > 0), the potential energy of the particle:",
      option_a: "Decreases",
      option_b: "Increases",
      option_c: "Remains constant",
      option_d: "Becomes zero",
      correct_option: "A",
      explanation: "Step 1: By fundamental definition, the change in potential energy is ΔU = −W_c.\n\nStep 2: If the conservative force does positive work (W_c > 0), then ΔU < 0, meaning potential energy decreases.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 309,
    question: "Mass m moving horizontally along x-axis velocity v collides and sticks to mass 3m moving vertically upwards along y-axis velocity 2v. Final velocity combination? [AIPMT 2011 Mains]",
    optionA: "(3/2)v i + (1/4)v j",
    optionB: "(1/4)v i + (3/2)v j",
    optionC: "(1/3)v i + (2/3)v j",
    optionD: "(2/3)v i + (1/3)v j",
    correctOption: "B",
    explanation: "Step 1: Write initial momentum vectors of both masses:\n- Mass m moving along the x-axis with velocity v î:\nP₁ = m v î\n- Mass 3m moving along the y-axis with velocity 2v ĵ:\nP₂ = 3m × (2v ĵ) = 6m v ĵ\n\nStep 2: Find total initial momentum of the system:\nP_total = P₁ + P₂ = m v î + 6m v ĵ\n\nStep 3: Analyze the post-collision state:\nThe collision is completely inelastic (masses stick together).\nTotal mass after collision = m + 3m = 4m.\nLet V_f be the final velocity vector of the combined mass.\n\nStep 4: Apply conservation of linear momentum:\nTotal initial momentum = Total final momentum\nm v î + 6m v ĵ = 4m V_f\nV_f = (m v î + 6m v ĵ) / (4m)\nV_f = (1/4) v î + (6/4) v ĵ = (1/4) v î + (3/2) v ĵ.\n\nTherefore, Option (B) is the correct answer.",
    similarQuestion: {
      question: "A particle of mass m moving with velocity u î collides with another stationary particle of mass 2m and sticks to it. What is the common final velocity?",
      option_a: "(u / 3) î",
      option_b: "(u / 2) î",
      option_c: "(2u / 3) î",
      option_d: "u î",
      correct_option: "A",
      explanation: "Step 1: Total initial momentum is P = m u î.\n\nStep 2: Combined mass is m + 2m = 3m.\n\nStep 3: By momentum conservation: 3m V = m u î ⇒ V = (u / 3) î.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 308,
    question: "Solid cylinder mass 3kg rolling horizontal surface velocity 4 m/s. It collides horizontal spring force constant 200 N/m. Maximum compression produced in spring will be? [AIPMT 2012 Prelims]",
    optionA: "0.5 m",
    optionB: "0.6 m",
    optionC: "0.7 m",
    optionD: "0.2 m",
    correctOption: "B",
    explanation: "Step 1: Calculate total kinetic energy of the rolling solid cylinder:\nA rolling body possesses both translational and rotational kinetic energy:\nK_total = K_trans + K_rot = (1/2) m v² + (1/2) I ω²\n\nStep 2: Substitute moment of inertia for a solid cylinder about its central axis (I = (1/2) m R²) and pure rolling condition (v = Rω):\nK_rot = (1/2) × [(1/2) m R²] × (v / R)² = (1/4) m v²\nK_total = (1/2) m v² + (1/4) m v² = (3/4) m v²\n\nStep 3: Compute numerical kinetic energy:\nGiven m = 3 kg and v = 4 m/s:\nK_total = (3/4) × 3 × (4)² = (3/4) × 3 × 16 = 36 J\n\nStep 4: Equate to elastic potential energy of the compressed spring at maximum compression x_max:\n(1/2) k (x_max)² = K_total\nGiven k = 200 N/m:\n(1/2) × 200 × (x_max)² = 36\n100 × (x_max)² = 36\n(x_max)² = 36 / 100 = 0.36\nx_max = √0.36 = 0.6 m.\n\nTherefore, Option (B) is the correct answer.",
    similarQuestion: {
      question: "A solid sphere of mass 2 kg rolls without slipping on a horizontal surface at 5 m/s. It encounters a horizontal spring of stiffness 700 N/m. The maximum compression of the spring is:",
      option_a: "0.316 m (or 1/√10 m)",
      option_b: "0.5 m",
      option_c: "0.2 m",
      option_d: "0.1 m",
      correct_option: "A",
      explanation: "Step 1: Total rolling kinetic energy for a solid sphere is K = (7/10) m v².\n\nStep 2: K = (7/10) × 2 × 5² = (7/10) × 50 = 35 J.\n\nStep 3: At maximum compression: (1/2) k x² = 35 ⇒ (1/2)(700) x² = 35 ⇒ 350 x² = 35 ⇒ x² = 1/10 ⇒ x = 1/√10 ≈ 0.316 m.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 307,
    question: "Potential energy particle in force field U=A/r²-B/r where A and B positive constants and r distance particle from centre field. For stable equilibrium distance particle? [AIPMT 2012 Prelims]",
    optionA: "B/(2A)",
    optionB: "2A/B",
    optionC: "A/B",
    optionD: "B/A",
    correctOption: "B",
    explanation: "Step 1: State the condition for equilibrium:\nAt equilibrium, the net conservative force on the particle is zero:\nF = −dU / dr = 0\n\nStep 2: Differentiate potential energy U(r) with respect to r:\nU(r) = A r⁻² − B r⁻¹\ndU / dr = −2A r⁻³ − (−B r⁻²)\ndU / dr = −2A / r³ + B / r²\n\nStep 3: Set dU/dr = 0 to find equilibrium distance:\n−2A / r³ + B / r² = 0\nB / r² = 2A / r³\nB = 2A / r\nr = 2A / B\n\nStep 4: Verify the stability condition (d²U / dr² > 0 for minimum U):\nd²U / dr² = (d/dr) [−2A r⁻³ + B r⁻²] = +6A r⁻⁴ − 2B r⁻³\nSubstitute r = 2A / B:\nd²U / dr² = (1 / r³) [6A / r − 2B] = (1 / r³) [6A / (2A / B) − 2B]\n= (1 / r³) [3B − 2B] = B / r³\nSince A, B, and r are positive, d²U / dr² > 0.\nThis confirms that r = 2A / B is a point of stable equilibrium.\n\nTherefore, Option (B) is the correct answer.",
    similarQuestion: {
      question: "The potential energy of a diatomic molecule as a function of separation distance r is given by U(r) = a/r¹² − b/r⁶. The equilibrium distance between the atoms is:",
      option_a: "(2a / b)¹ᐟ⁶",
      option_b: "(a / 2b)¹ᐟ⁶",
      option_c: "(a / b)¹ᐟ⁶",
      option_d: "(2b / a)¹ᐟ⁶",
      correct_option: "A",
      explanation: "Step 1: Set dU/dr = 0:\ndU/dr = −12a / r¹³ + 6b / r⁷ = 0.\n\nStep 2: Solve for r:\n12a / r¹³ = 6b / r⁷ ⇒ 12a = 6b r⁶ ⇒ r⁶ = 2a / b ⇒ r = (2a / b)¹ᐟ⁶.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 306,
    question: "Car mass m starts from rest and accelerates so that instantaneous power delivered to car has constant magnitude P0. Instantaneous velocity car proportional to? [AIPMT 2012 Mains]",
    optionA: "t²P0",
    optionB: "t¹/²",
    optionC: "t⁻¹/²",
    optionD: "t/√m",
    correctOption: "B",
    explanation: "Step 1: Relate instantaneous power to velocity and acceleration:\nPower P₀ is given by:\nP₀ = F × v = (m × a) × v\nSince a = dv / dt:\nP₀ = m × v × (dv / dt)\n\nStep 2: Separate variables and integrate from rest (u = 0 at t = 0):\nm v dv = P₀ dt\n∫₀ᵛ m v dv = ∫₀ᵗ P₀ dt\nm [v² / 2]₀ᵛ = P₀ [t]₀ᵗ\n(1/2) m v² = P₀ t\n\nStep 3: Solve for velocity v as a function of time:\nv² = (2 P₀ / m) t\nv = √[(2 P₀ / m) t] = √(2 P₀ / m) × t¹ᐟ²\n\nStep 4: Determine proportionality:\nv ∝ t¹ᐟ².\n\nTherefore, Option (B) is the correct answer.",
    similarQuestion: {
      question: "If a body starts from rest under a constant power source, how does its displacement s depend on time t?",
      option_a: "s ∝ t³ᐟ²",
      option_b: "s ∝ t¹ᐟ²",
      option_c: "s ∝ t²",
      option_d: "s ∝ t",
      correct_option: "A",
      explanation: "Step 1: Velocity is v = ds/dt = C t¹ᐟ² (where C is a constant).\n\nStep 2: Integrate to find displacement:\ns = ∫ C t¹ᐟ² dt = C (2/3) t³ᐟ² ∝ t³ᐟ².\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 305,
    question: "Uniform force 3i+j N acts on particle mass 2kg. Particle displaced from position 2i+k m to position 4i+3j-k m. Work done by force on particle? [NEET 2013]",
    optionA: "13 J",
    optionB: "15 J",
    optionC: "9 J",
    optionD: "6 J",
    correctOption: "C",
    explanation: "Step 1: Calculate the displacement vector Δr:\nInitial position vector: r₁ = 2î + 0ĵ + 1k̂ m\nFinal position vector: r₂ = 4î + 3ĵ − 1k̂ m\nDisplacement vector Δr = r₂ − r₁:\nΔr = (4 − 2) î + (3 − 0) ĵ + (−1 − 1) k̂\nΔr = 2î + 3ĵ − 2k̂ m\n\nStep 2: State the given constant force vector F:\nF = 3î + 1ĵ + 0k̂ N\n\nStep 3: Calculate work done using scalar dot product:\nW = F · Δr = (F_x × Δx) + (F_y × Δy) + (F_z × Δz)\nW = (3 × 2) + (1 × 3) + (0 × (−2))\nW = 6 + 3 + 0 = 9 J.\n\nTherefore, Option (C) is the correct answer.",
    similarQuestion: {
      question: "A force F = (4î + 2ĵ) N displaces an object from position r₁ = (1î + 1ĵ) m to r₂ = (3î + 4ĵ) m. The work done is:",
      option_a: "14 J",
      option_b: "10 J",
      option_c: "8 J",
      option_d: "18 J",
      correct_option: "A",
      explanation: "Step 1: Displacement is Δr = r₂ − r₁ = (3 − 1)î + (4 − 1)ĵ = 2î + 3ĵ m.\n\nStep 2: W = F · Δr = (4 × 2) + (2 × 3) = 8 + 6 = 14 J.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 304,
    question: "One coolie takes 1 minute to raise suitcase through height 2m but second coolie takes 30s to raise same suitcase same height. Powers two coolies ratio? [NEET 2013 Karnataka]",
    optionA: "1:3",
    optionB: "2:1",
    optionC: "3:1",
    optionD: "1:2",
    correctOption: "D",
    explanation: "Step 1: Determine the work done by each coolie:\nBoth coolies lift the same suitcase (same mass m) through the same vertical height (h = 2 m) against gravity.\nTherefore, work done by both coolies is identical:\nW₁ = W₂ = W = mgh\n\nStep 2: State the formula for mechanical power:\nPower = Work done / Time taken\nP = W / t\nFor constant work W:\nP ∝ 1 / t\n\nStep 3: Form the ratio of powers:\nP₁ / P₂ = t₂ / t₁\nGiven t₁ = 1 minute = 60 s, and t₂ = 30 s:\nP₁ / P₂ = 30 / 60 = 1 / 2 = 1 : 2.\n\nTherefore, Option (D) is the correct answer.",
    similarQuestion: {
      question: "Person A lifts a load in 10 s, while person B lifts the same load through the same height in 20 s. The ratio of the work done by person A to person B is:",
      option_a: "1 : 1",
      option_b: "2 : 1",
      option_c: "1 : 2",
      option_d: "4 : 1",
      correct_option: "A",
      explanation: "Step 1: Work done depends solely on force and displacement (W = mgh).\n\nStep 2: Since both lift the identical load through identical height, the work done is identical (ratio 1 : 1), although their powers differ.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 303,
    question: "Particle total energy E moving potential energy region U(x). Motion particle restricted region when? [NEET 2013 Karnataka]",
    optionA: "U(x)<E",
    optionB: "U(x)=0",
    optionC: "U(x)≤E",
    optionD: "U(x)>E",
    correctOption: "C",
    explanation: "Step 1: Express total mechanical energy E:\nE = K + U(x)\nwhere K is the kinetic energy and U(x) is the potential energy.\n\nStep 2: State the condition on kinetic energy in classical mechanics:\nKinetic energy is given by K = (1/2) m v².\nBecause mass m is positive and v² ≥ 0, kinetic energy can never be negative:\nK ≥ 0\n\nStep 3: Relate to total energy and potential energy:\nK = E − U(x) ≥ 0\nE ≥ U(x)   or   U(x) ≤ E\n\nStep 4: Conclude:\nMotion of the particle is restricted to the classically allowed region where U(x) ≤ E. Points where U(x) = E are the classical turning points (where K = 0 and the particle reverses direction).\n\nTherefore, Option (C) is the correct answer.",
    similarQuestion: {
      question: "In classical mechanics, what are the points where the total mechanical energy equals the potential energy (E = U(x)) called?",
      option_a: "Turning points",
      option_b: "Equilibrium points",
      option_c: "Inflection points",
      option_d: "Resonance points",
      correct_option: "A",
      explanation: "Step 1: When E = U(x), kinetic energy K = E − U(x) becomes zero.\n\nStep 2: At these locations, the velocity of the particle drops to zero and the restoring force causes it to reverse direction, which is why they are called classical turning points.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 302,
    question: "Two similar springs P and Q have spring constants KP and KQ such that KP>KQ. They stretched first same amount case a then same force case b. Work done by springs WP and WQ related in cases a and b respectively? [AIPMT 2015 Cancelled]",
    optionA: "WP>WQ; WQ>WP",
    optionB: "WP<WQ; WQ<WP",
    optionC: "WP=WQ; WP>WQ",
    optionD: "WP=WQ; WP=WQ",
    correctOption: "A",
    explanation: "Step 1: Analyze Case (a) - Stretched by the same extension x:\nWork done in stretching a spring is stored as elastic potential energy:\nW = (1/2) k x²\nWhen both springs are stretched by the same elongation x:\nW ∝ k\nSince K_P > K_Q, we have:\nW_P > W_Q.\n\nStep 2: Analyze Case (b) - Stretched by applying the same force F:\nSince restoring force is F = kx, elongation is x = F / k.\nWork done expressed in terms of force is:\nW = F² / (2k)\nWhen both springs are stretched by the same force F:\nW ∝ 1 / k\nSince K_P > K_Q, the spring with smaller force constant requires more work:\nW_Q > W_P.\n\nStep 3: Combine both cases:\nCase (a): W_P > W_Q\nCase (b): W_Q > W_P.\n\nTherefore, Option (A) is the correct answer.",
    similarQuestion: {
      question: "Two springs with spring constants k₁ = 100 N/m and k₂ = 200 N/m are pulled with the same force F = 20 N. The ratio of energies stored in them (U₁ : U₂) is:",
      option_a: "2 : 1",
      option_b: "1 : 2",
      option_c: "4 : 1",
      option_d: "1 : 4",
      correct_option: "A",
      explanation: "Step 1: For equal force F, stored energy is U = F² / (2k) ∝ 1 / k.\n\nStep 2: U₁ / U₂ = k₂ / k₁ = 200 / 100 = 2 : 1.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 301,
    question: "Block mass 10kg moving x-direction constant speed 10 m/s subjected retarding force F=0.1x J/m during travel from x=20m to 30m. Its final kinetic energy? [AIPMT 2015 Cancelled]",
    optionA: "275 J",
    optionB: "250 J",
    optionC: "475 J",
    optionD: "450 J",
    correctOption: "C",
    explanation: "Step 1: Calculate the initial kinetic energy of the block:\nK_initial = (1/2) m v₀²\nGiven m = 10 kg and v₀ = 10 m/s:\nK_initial = (1/2) × 10 × (10)² = 5 × 100 = 500 J\n\nStep 2: Calculate work done by the retarding force F_retard = −0.1x N:\nW = ∫₂₀³⁰ (−0.1x) dx = −0.1 × [x² / 2]₂₀³⁰\nW = −0.05 × [30² − 20²] = −0.05 × [900 − 400]\nW = −0.05 × 500 = −25 J\n\nStep 3: Apply the Work-Energy Theorem:\nK_final − K_initial = W\nK_final = K_initial + W = 500 − 25 = 475 J.\n\nTherefore, Option (C) is the correct answer.",
    similarQuestion: {
      question: "A particle of mass 2 kg moving at 6 m/s is opposed by a retarding force F = 4x N from x = 0 to x = 2 m. Its final kinetic energy is:",
      option_a: "28 J",
      option_b: "36 J",
      option_c: "20 J",
      option_d: "18 J",
      correct_option: "A",
      explanation: "Step 1: Initial kinetic energy is K_i = (1/2) × 2 × 6² = 36 J.\n\nStep 2: Work done by retarding force is W = −∫₀² 4x dx = −[2x²]₀² = −8 J.\n\nStep 3: Final kinetic energy K_f = 36 − 8 = 28 J.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 300,
    question: "Particle mass m driven by machine delivers constant power k watts. If particle starts from rest force on particle at time t? [AIPMT 2015 Cancelled]",
    optionA: "√(2mk)t⁻¹/²",
    optionB: "(1/2)√(mk)t⁻¹/²",
    optionC: "√(mk/2)t⁻¹/²",
    optionD: "√(mk)t⁻¹/²",
    correctOption: "C",
    explanation: "Step 1: Express constant power in terms of velocity and acceleration:\nP = F × v = (m × dv/dt) × v = k\nm v dv = k dt\n\nStep 2: Integrate to find velocity v as a function of time (from rest, u = 0 at t = 0):\n∫₀ᵛ m v dv = ∫₀ᵗ k dt\nm [v² / 2] = k t\nv² = (2k / m) t\nv = √[(2k / m) t] = √(2k / m) × t¹ᐟ²\n\nStep 3: Calculate the force F on the particle:\nSince P = F × v = k:\nF = k / v\nF = k / [√(2k / m) × t¹ᐟ²] = [k × √(m) / √(2k)] × t⁻¹ᐟ²\nF = √[k² m / (2k)] × t⁻¹ᐟ² = √(mk / 2) t⁻¹ᐟ².\n\nTherefore, Option (C) is the correct answer.",
    similarQuestion: {
      question: "A vehicle of mass m driven by an engine of constant power P accelerates from rest. What is its acceleration at time t?",
      option_a: "√(P / 2mt)",
      option_b: "√(2P / mt)",
      option_c: "P / mt",
      option_d: "√(Pt / 2m)",
      correct_option: "A",
      explanation: "Step 1: Velocity is v = √(2Pt / m).\n\nStep 2: Acceleration a = dv/dt = (d/dt)[(2P/m)¹ᐟ² t¹ᐟ²] = (1/2) (2P/m)¹ᐟ² t⁻¹ᐟ² = √[P / (2mt)].\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 299,
    question: "On frictionless surface block mass M moving speed v collides elastically with another block same mass M initially at rest. After collision first block moves angle θ to initial direction and has speed v/3. Second block speed after collision? [AIPMT 2015]",
    optionA: "3v/√2",
    optionB: "√3v/2",
    optionC: "2√2v/3",
    optionD: "3v/4",
    correctOption: "C",
    explanation: "Step 1: Identify conservation laws governing elastic collisions:\nIn an elastic collision, total mechanical kinetic energy is conserved before and after the collision.\n\nStep 2: Set up the kinetic energy conservation equation:\nK_initial = K_final\n(1/2) M v² + 0 = (1/2) M v₁² + (1/2) M v₂²\nwhere v₁ is the speed of the first block and v₂ is the speed of the second block.\n\nStep 3: Substitute given speed v₁ = v / 3:\nv² = (v / 3)² + v₂²\nv² = (v² / 9) + v₂²\nv₂² = v² − (v² / 9) = 8v² / 9\n\nStep 4: Solve for v₂:\nv₂ = √(8v² / 9) = (√8 / 3) v = (2√2 / 3) v.\n\nTherefore, Option (C) is the correct answer.",
    similarQuestion: {
      question: "A particle of mass m moving at speed u collides elastically with an identical stationary particle. If the first particle scatters with speed u / 2, the speed of the second particle after collision is:",
      option_a: "(√3 / 2) u",
      option_b: "u / 2",
      option_c: "(1 / √2) u",
      option_d: "(2 / 3) u",
      correct_option: "A",
      explanation: "Step 1: Conserve kinetic energy: (1/2) m u² = (1/2) m (u/2)² + (1/2) m v₂².\n\nStep 2: u² = u²/4 + v₂² ⇒ v₂² = 3u²/4 ⇒ v₂ = (√3 / 2) u.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 298,
    question: "Ball thrown vertically downwards from height 20m with initial velocity v0. It collides ground loses 50% energy in collision and rebounds to same height. Initial velocity v0 is g=10 m/s²? [AIPMT 2015]",
    optionA: "28 m/s",
    optionB: "10 m/s",
    optionC: "14 m/s",
    optionD: "20 m/s",
    correctOption: "D",
    explanation: "Step 1: Calculate total mechanical energy of the ball just before impact with the ground:\nThe ball is thrown downwards from height h = 20 m with initial speed v₀:\nE_before = (1/2) m v₀² + mgh\n\nStep 2: Determine energy retained after collision with the ground:\nThe ball loses 50% of its energy, retaining the remaining 50% (half):\nE_after = 0.50 × E_before = (1/2) [(1/2) m v₀² + mgh]\n\nStep 3: Relate rebound energy to maximum rebound height:\nThe ball rebounds to the original height h = 20 m (where its speed momentarily becomes zero):\nE_after = mgh\n\nStep 4: Equate and solve for v₀:\n(1/2) [(1/2) m v₀² + mgh] = mgh\n(1/2) m v₀² + mgh = 2 mgh\n(1/2) m v₀² = mgh\nv₀² = 2gh\nGiven g = 10 m/s² and h = 20 m:\nv₀² = 2 × 10 × 20 = 400\nv₀ = √400 = 20 m/s.\n\nTherefore, Option (D) is the correct answer.",
    similarQuestion: {
      question: "A ball dropped from height H rebounds to height H/2 after striking the floor. What fraction of its mechanical energy was lost in the collision?",
      option_a: "50%",
      option_b: "25%",
      option_c: "75%",
      option_d: "33.3%",
      correct_option: "A",
      explanation: "Step 1: Initial energy before impact is mgH.\n\nStep 2: Rebound energy is mg(H/2) = 0.5 mgH.\n\nStep 3: Energy lost = mgH − 0.5 mgH = 0.5 mgH, which is 50% of initial energy.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 297,
    question: "Heart man pumps 5 litres blood through arteries per minute at pressure 150mm mercury. If density mercury 13.6×10³ kg/m³ and g=10 m/s² then power in watts? [AIPMT 2015]",
    optionA: "3.0",
    optionB: "1.50",
    optionC: "1.70",
    optionD: "2.35",
    correctOption: "C",
    explanation: "Step 1: Convert pressure to SI units (Pascals or N/m²):\nPressure head h = 150 mm = 0.15 m\nDensity of mercury ρ = 13.6 × 10³ kg/m³\nAcceleration due to gravity g = 10 m/s²\nP = h ρ g = 0.15 × (13.6 × 10³) × 10\nP = 1.5 × 13,600 = 20,400 N/m²\n\nStep 2: Convert volume pumped per unit time to SI units (m³/s):\nVolume V = 5 litres = 5 × 10⁻³ m³\nTime t = 1 minute = 60 s\nVolume flow rate (dV/dt) = (5 × 10⁻³) / 60 m³/s\n\nStep 3: Calculate power output of the heart:\nPower = Pressure × Volume flow rate\nPower = P × (V / t) = 20,400 × [(5 × 10⁻³) / 60]\nPower = (20,400 × 5 × 10⁻³) / 60 = 102 / 60 = 1.70 W.\n\nTherefore, Option (C) is the correct answer.",
    similarQuestion: {
      question: "What is the work done by the human heart per beat if it pumps 75 mL of blood at an average pressure of 100 mm Hg? (ρ_Hg = 13.6 × 10³ kg/m³, g = 10 m/s²)",
      option_a: "1.02 J",
      option_b: "2.04 J",
      option_c: "0.51 J",
      option_d: "1.50 J",
      correct_option: "A",
      explanation: "Step 1: Pressure P = 0.10 m × 13600 kg/m³ × 10 m/s² = 13,600 N/m².\n\nStep 2: Volume V = 75 mL = 75 × 10⁻⁶ m³.\n\nStep 3: Work W = P × V = 13,600 × (75 × 10⁻⁶) = 1.02 J.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 296,
    question: "Two particles A and B move constant velocities v1 and v2. At initial moment their position vectors r1 and r2 respectively. Condition for particles A and B to collide? [AIPMT 2015]",
    optionA: "r1×v1=r2×v2",
    optionB: "r1-r2=v1-v2",
    optionC: "(r1-r2)/|r1-r2| = (v2-v1)/|v2-v1|",
    optionD: "r1·v1=r2·v2",
    correctOption: "C",
    explanation: "Step 1: Write position vectors of particles A and B as functions of time t:\nFor particle A: r_A(t) = r₁ + v₁ t\nFor particle B: r_B(t) = r₂ + v₂ t\n\nStep 2: Apply the collision condition:\nFor a collision to occur at some future time t (where t > 0), both particles must occupy the exact same spatial location:\nr_A(t) = r_B(t)\nr₁ + v₁ t = r₂ + v₂ t\n\nStep 3: Rearrange terms:\nr₁ − r₂ = (v₂ − v₁) t\n\nStep 4: Relate unit vectors:\nSince collision time t is a positive scalar quantity (t = |r₁ − r₂| / |v₂ − v₁| > 0), the vector (r₁ − r₂) must point in the exact same direction as (v₂ − v₁).\nEquating their unit vectors:\n(r₁ − r₂) / |r₁ − r₂| = (v₂ − v₁) / |v₂ − v₁|.\n\nTherefore, Option (C) is the correct answer.",
    similarQuestion: {
      question: "If particle A at position r₁ moves with velocity v₁ and particle B at r₂ moves with velocity v₂, what is the velocity of particle A relative to particle B?",
      option_a: "v₁ − v₂",
      option_b: "v₂ − v₁",
      option_c: "v₁ + v₂",
      option_d: "(v₁ · v₂) / |v₂|",
      correct_option: "A",
      explanation: "Step 1: Relative velocity of body A with respect to body B is defined as:\nv_AB = v_A − v_B = v₁ − v₂.\n\nTherefore, Option (A) is the correct answer."
    }
  }
];

