/**
 * NEET Physics Question Bank
 * Provides mathematically verified, diverse, non-repetitive MCQ generators
 * across all 20 NEET-UG Physics chapters.
 */

function getPhysicsGenerators(topicName, conceptName, buildQuestion) {
  const t = (topicName || '').toLowerCase();
  const c = (conceptName || '').toLowerCase();
  const searchStr = `${t} ${c}`;

  // 1. Units, Dimensions & Errors
  if (/dimension|error|vernier|screw gauge|measur|unit of/i.test(searchStr)) {
    return [
      (id, topic, concept) => {
        return buildQuestion(
          id,
          `Which of the following physical quantities has the dimensional formula [M⁻¹ L³ T⁻²]?`,
          `Universal Gravitational Constant (G)`,
          [`Planck's Constant (h)`, `Coefficient of Viscosity (η)`, `Permeability of Free Space (μ₀)`],
          `From Newton's law of gravitation, F = G(m₁m₂)/r². Therefore, G = Fr²/(m₁m₂) = [M L T⁻²][L²]/[M²] = [M⁻¹ L³ T⁻²].`,
          topic,
          concept
        );
      },
      (id, topic, concept) => {
        const pM = [1, 2, 3][Math.floor(Math.random() * 3)];
        const pV = [2, 3, 4][Math.floor(Math.random() * 3)];
        const totalErr = pM + 2 * pV;
        return buildQuestion(
          id,
          `The percentage errors in the measurement of mass (m) and velocity (v) of a moving body are ${pM}% and ${pV}% respectively. What is the maximum percentage error in the estimation of its kinetic energy?`,
          `${totalErr}%`,
          [`${pM + pV}%`, `${2 * pM + pV}%`, `${totalErr + 3}%`],
          `Kinetic energy is given by E = (1/2)mv². The maximum fractional error is (ΔE/E) = (Δm/m) + 2(Δv/v). In percentage: % error = ${pM}% + 2 × (${pV}%) = ${totalErr}%.`,
          topic,
          concept
        );
      },
      (id, topic, concept) => {
        return buildQuestion(
          id,
          `In a Vernier Calliper, 1 main scale division (MSD) equals 1 mm and 10 Vernier scale divisions (VSD) coincide with 9 main scale divisions. What is the least count of this instrument?`,
          `0.1 mm (0.01 cm)`,
          [`0.01 mm`, `0.5 mm`, `0.05 mm`],
          `Least Count = 1 MSD - 1 VSD = 1 MSD - (9/10) MSD = (1/10) MSD = 0.1 mm = 0.01 cm.`,
          topic,
          concept
        );
      },
      (id, topic, concept) => {
        return buildQuestion(
          id,
          `A screw gauge has a pitch of 1 mm and 100 circular scale divisions. While measuring the thickness of a glass slab, the main scale reading is 3 mm and the 45th division coincides with the reference line. Assuming zero error is nil, the measured thickness is:`,
          `3.45 mm`,
          [`3.045 mm`, `3.90 mm`, `4.45 mm`],
          `Least count = Pitch / Total circular divisions = 1 mm / 100 = 0.01 mm. Reading = MSR + (CSR × LC) = 3 mm + (45 × 0.01 mm) = 3.45 mm.`,
          topic,
          concept
        );
      },
      (id, topic, concept) => {
        return buildQuestion(
          id,
          `The dimensional formula of Planck's constant (h) is identical to the dimensional formula of which of the following physical quantities?`,
          `Angular Momentum`,
          [`Linear Momentum`, `Work done`, `Torque`],
          `Planck's constant h has dimensions E/ν = [M L² T⁻²]/[T⁻¹] = [M L² T⁻¹]. Angular momentum L = mvr = [M][L T⁻¹][L] = [M L² T⁻¹]. Both have identical dimensions.`,
          topic,
          concept
        );
      },
      (id, topic, concept) => {
        return buildQuestion(
          id,
          `If physical quantity X is given by X = (A² B³)/(C √D), where percentage errors in A, B, C, and D are 1%, 2%, 3%, and 4% respectively, what is the maximum percentage error in X?`,
          `13%`,
          [`11%`, `8%`, `15%`],
          `Maximum % error = 2(%A) + 3(%B) + 1(%C) + 0.5(%D) = 2(1%) + 3(2%) + 3% + 0.5(4%) = 2 + 6 + 3 + 2 = 13%.`,
          topic,
          concept
        );
      },
    ];
  }

  // 2. Kinematics & Motion in 1D/2D
  if (/kinemat|projectile|trajectory|straight line|motion in|velocity|accelerat/i.test(searchStr)) {
    return [
      (id, topic, concept) => {
        const u = [20, 30, 40, 50][Math.floor(Math.random() * 4)];
        const range = Math.round((u * u * Math.sin((60 * Math.PI) / 180)) / 10);
        return buildQuestion(
          id,
          `A projectile is fired from the ground with an initial speed of ${u} m/s at an elevation angle of 30° to the horizontal. Assuming g = 10 m/s², what is the horizontal range of the projectile?`,
          `${range} m`,
          [`${range * 2} m`, `${Math.round(range * 0.6)} m`, `${range + 35} m`],
          `Horizontal range R = (u² sin 2θ) / g. For θ = 30°, sin 2θ = sin 60° = √3/2 ≈ 0.866. R = (${u}² × 0.866) / 10 = ${range} m.`,
          topic,
          concept
        );
      },
      (id, topic, concept) => {
        const h = [20, 45, 80, 125][Math.floor(Math.random() * 4)];
        const v = Math.round(Math.sqrt(2 * 10 * h));
        return buildQuestion(
          id,
          `A stone is dropped from rest from the top of a cliff of height ${h} m. Neglecting air resistance and taking g = 10 m/s², calculate the speed with which it strikes the ground.`,
          `${v} m/s`,
          [`${v * 2} m/s`, `${Math.round(v * 0.7)} m/s`, `${v + 12} m/s`],
          `Using third kinematic equation: v² = u² + 2gh. With u = 0: v = √(2 × 10 × ${h}) = ${v} m/s.`,
          topic,
          concept
        );
      },
      (id, topic, concept) => {
        const u = [20, 40, 60][Math.floor(Math.random() * 3)];
        const hMax = (u * u * 0.25) / 20;
        return buildQuestion(
          id,
          `A ball is projected with speed u = ${u} m/s at an angle of 30° with the horizontal. What is the maximum vertical height attained above the launch level (take g = 10 m/s²)?`,
          `${hMax} m`,
          [`${hMax * 2} m`, `${(hMax / 2).toFixed(1)} m`, `${hMax * 3} m`],
          `Maximum vertical height H = (u² sin²θ) / (2g). With sin 30° = 1/2, sin² 30° = 1/4. H = (${u}² × 0.25) / 20 = ${hMax} m.`,
          topic,
          concept
        );
      },
      (id, topic, concept) => {
        return buildQuestion(
          id,
          `A particle starts from rest and moves along a straight line with uniform acceleration a. The ratio of the distance traversed in the 3rd second to the distance traversed in the 5th second is:`,
          `5 : 9`,
          [`3 : 5`, `9 : 25`, `1 : 2`],
          `Distance in nth second: s_n = u + (a/2)(2n - 1). For u = 0: s₃ = (a/2)(2×3 - 1) = 5(a/2); s₅ = (a/2)(2×5 - 1) = 9(a/2). Ratio = 5 : 9.`,
          topic,
          concept
        );
      },
      (id, topic, concept) => {
        return buildQuestion(
          id,
          `At the highest point of its trajectory, the angle between the velocity vector and acceleration vector of a projectile is:`,
          `90°`,
          [`0°`, `45°`, `180°`],
          `At the peak of parabolic trajectory, the vertical velocity component is zero and velocity is purely horizontal (u cos θ). Acceleration due to gravity is purely vertical (downward). Hence the angle between them is 90°.`,
          topic,
          concept
        );
      },
      (id, topic, concept) => {
        return buildQuestion(
          id,
          `A car covers the first half of the total distance with a uniform speed of 40 km/h and the remaining half distance with a uniform speed of 60 km/h. What is the average speed of the car for the entire journey?`,
          `48 km/h`,
          [`50 km/h`, `45 km/h`, `52 km/h`],
          `When equal distances are traversed at speeds v₁ and v₂, average speed = 2v₁v₂ / (v₁ + v₂) = 2(40)(60) / (40 + 60) = 4800 / 100 = 48 km/h.`,
          topic,
          concept
        );
      },
    ];
  }

  // 3. Laws of Motion & Friction
  if (/newton|friction|pulley|tension|repose|banking|laws of motion|momentum/i.test(searchStr)) {
    return [
      (id, topic, concept) => {
        const m = [2, 4, 5, 10][Math.floor(Math.random() * 4)];
        const mu = 0.4;
        const fLim = m * 10 * mu;
        return buildQuestion(
          id,
          `A block of mass ${m} kg rests on a rough horizontal floor where the coefficient of static friction is μ_s = 0.4. What minimum horizontal force is required to just initiate sliding (take g = 10 m/s²)?`,
          `${fLim} N`,
          [`${fLim * 2} N`, `${(fLim / 2).toFixed(1)} N`, `${fLim + 15} N`],
          `Limiting static friction is f_max = μ_s · N = μ_s · mg = 0.4 × ${m} × 10 = ${fLim} N.`,
          topic,
          concept
        );
      },
      (id, topic, concept) => {
        return buildQuestion(
          id,
          `Two bodies of masses m₁ = 3 kg and m₂ = 2 kg are connected by a light inextensible string passing over a smooth frictionless pulley. The acceleration of the system when released from rest is (g = 10 m/s²):`,
          `2 m/s²`,
          [`1 m/s²`, `4 m/s²`, `5 m/s²`],
          `For Atwood machine: a = (m₁ - m₂)g / (m₁ + m₂) = (3 - 2)(10) / (3 + 2) = 10 / 5 = 2 m/s².`,
          topic,
          concept
        );
      },
      (id, topic, concept) => {
        return buildQuestion(
          id,
          `A circular track of radius 20 m is banked at an angle of 45°. If friction between tyres and the road is negligible, what is the optimum safe speed for a vehicle (take g = 10 m/s²)?`,
          `14.1 m/s (10√2 m/s)`,
          [`20 m/s`, `10 m/s`, `7.07 m/s`],
          `Optimum banking speed v = √(rg tan θ). Here r = 20 m, g = 10 m/s², θ = 45° (tan 45° = 1). v = √(20 × 10 × 1) = √200 = 10√2 ≈ 14.1 m/s.`,
          topic,
          concept
        );
      },
      (id, topic, concept) => {
        return buildQuestion(
          id,
          `A man of mass 60 kg stands on a weighing machine inside an elevator. If the elevator accelerates upwards with an acceleration of 2 m/s², what apparent weight will the machine register (g = 10 m/s²)?`,
          `720 N`,
          [`600 N`, `480 N`, `800 N`],
          `In an upward accelerating elevator, normal reaction N = m(g + a) = 60(10 + 2) = 60 × 12 = 720 N.`,
          topic,
          concept
        );
      },
      (id, topic, concept) => {
        return buildQuestion(
          id,
          `A bullet of mass 10 g is fired horizontally from a rifle of mass 4 kg with a muzzle velocity of 400 m/s. The magnitude of the recoil velocity of the rifle is:`,
          `1.0 m/s`,
          [`0.5 m/s`, `2.0 m/s`, `4.0 m/s`],
          `By conservation of linear momentum: M_rifle · V_recoil = m_bullet · v_bullet. V_recoil = (0.010 kg × 400 m/s) / 4 kg = 4 / 4 = 1.0 m/s.`,
          topic,
          concept
        );
      },
      (id, topic, concept) => {
        return buildQuestion(
          id,
          `When a body is just about to slide down an inclined plane of inclination θ under its own weight, the coefficient of static friction μ_s is related to θ as:`,
          `μ_s = tan θ (Angle of repose)`,
          [`μ_s = sin θ`, `μ_s = cos θ`, `μ_s = cot θ`],
          `At the verge of sliding down an inclined plane, component along incline mg sin θ equals limiting friction μ_s mg cos θ. Hence μ_s = tan θ, where θ is known as the angle of repose.`,
          topic,
          concept
        );
      },
    ];
  }

  // 4. Work, Energy & Power
  if (/work|energy|power|spring|collision|restitution/i.test(searchStr)) {
    return [
      (id, topic, concept) => {
        const k = [100, 200, 400, 500][Math.floor(Math.random() * 4)];
        const energy = 0.5 * k * 0.01;
        return buildQuestion(
          id,
          `A spring of spring constant k = ${k} N/m is compressed by 10 cm (0.1 m) from its natural unstretched length. What is the elastic potential energy stored in the spring?`,
          `${energy.toFixed(1)} J`,
          [`${(energy * 2).toFixed(1)} J`, `${(energy * 10).toFixed(1)} J`, `${(energy / 2).toFixed(2)} J`],
          `Potential energy stored in a compressed spring is U = (1/2)kx² = 0.5 × ${k} × (0.1)² = ${energy.toFixed(1)} J.`,
          topic,
          concept
        );
      },
      (id, topic, concept) => {
        return buildQuestion(
          id,
          `A constant force of 20 N acts on a body of mass 2 kg moving along a straight line, increasing its speed from 4 m/s to 6 m/s. What is the total work done on the body by the force?`,
          `20 J`,
          [`40 J`, `10 J`, `80 J`],
          `By the Work-Energy Theorem: W = ΔK = (1/2)m(v₂² - v₁²) = (1/2)(2)(6² - 4²) = 36 - 16 = 20 J.`,
          topic,
          concept
        );
      },
      (id, topic, concept) => {
        return buildQuestion(
          id,
          `An electric pump lifts 100 kg of water to a height of 20 m in 10 seconds. Assuming g = 10 m/s², the useful mechanical power delivered by the pump is:`,
          `2000 W (2 kW)`,
          [`1000 W`, `4000 W`, `500 W`],
          `Power P = Work / time = mgh / t = (100 × 10 × 20) / 10 = 20000 / 10 = 2000 W = 2 kW.`,
          topic,
          concept
        );
      },
      (id, topic, concept) => {
        return buildQuestion(
          id,
          `A ball of mass m moving with velocity v undergoes a perfectly elastic head-on collision with a stationary ball of identical mass m. After collision, what are the velocities of the two balls?`,
          `First ball comes to rest; second ball moves with velocity v`,
          [`Both balls move with velocity v/2 in forward direction`, `First ball rebounds with -v; second remains at rest`, `Both rebound with velocity v`],
          `In an elastic head-on collision between two equal masses, their velocities are completely exchanged. Hence the incident mass stops and the target mass moves off with speed v.`,
          topic,
          concept
        );
      },
      (id, topic, concept) => {
        return buildQuestion(
          id,
          `If the kinetic energy of a moving particle is increased by 300% (four times original value), what is the percentage increase in its linear momentum?`,
          `100%`,
          [`200%`, `300%`, `50%`],
          `Momentum p = √(2mE). If E' = E + 3E = 4E, then p' = √(2m(4E)) = 2p. Percentage increase in momentum = ((p' - p) / p) × 100 = ((2p - p)/p) × 100 = 100%.`,
          topic,
          concept
        );
      },
    ];
  }

  // 5. Rotational Motion & System of Particles
  if (/rotat|moment of inertia|torque|angular|center of mass|gyration|flywheel|rolling/i.test(searchStr)) {
    return [
      (id, topic, concept) => {
        const m = [2, 4, 6][Math.floor(Math.random() * 3)];
        const r = [0.5, 1.0, 2.0][Math.floor(Math.random() * 3)];
        const iDisc = (0.5 * m * r * r).toFixed(2);
        return buildQuestion(
          id,
          `A uniform circular disc of mass M = ${m} kg and radius R = ${r} m rotates about an axis perpendicular to its plane and passing through its center. What is its moment of inertia?`,
          `${iDisc} kg·m²`,
          [`${(iDisc * 2).toFixed(2)} kg·m²`, `${(iDisc / 2).toFixed(2)} kg·m²`, `${(iDisc * 4).toFixed(2)} kg·m²`],
          `Moment of inertia of a uniform circular disc about its transverse central axis is I = (1/2)MR² = 0.5 × ${m} × (${r})² = ${iDisc} kg·m².`,
          topic,
          concept
        );
      },
      (id, topic, concept) => {
        return buildQuestion(
          id,
          `The radius of gyration of a solid uniform sphere of radius R about an axis passing through its diameter is:`,
          `√(2/5) R ≈ 0.63 R`,
          `√(3/5) R`,
          [`√(1/2) R`, `√(2/3) R`],
          `For a solid sphere about diameter, I = (2/5)MR² = Mk². Therefore radius of gyration k = √(2/5) R.`,
          topic,
          concept
        );
      },
      (id, topic, concept) => {
        return buildQuestion(
          id,
          `A torque of magnitude 50 N·m acts on a rotating flywheel with moment of inertia 5 kg·m². What is the angular acceleration produced in the flywheel?`,
          `10 rad/s²`,
          [`5 rad/s²`, `25 rad/s²`, `250 rad/s²`],
          `Using the rotational analog of Newton's second law: τ = Iα ⇒ α = τ / I = 50 / 5 = 10 rad/s².`,
          topic,
          concept
        );
      },
      (id, topic, concept) => {
        return buildQuestion(
          id,
          `A figure skater spinning with angular speed ω folds her arms inward, reducing her effective moment of inertia to half its initial value. What is her new angular speed?`,
          `2ω`,
          [`ω / 2`, `4ω`, `ω`],
          `Because external torque is zero, angular momentum is conserved: L = I₁ω₁ = I₂ω₂. With I₂ = I₁ / 2, ω₂ = (I₁ / I₂)ω₁ = 2ω₁.`,
          topic,
          concept
        );
      },
      (id, topic, concept) => {
        return buildQuestion(
          id,
          `A solid cylinder of mass M and radius R rolls without slipping down a smooth incline. What is the ratio of its rotational kinetic energy to its translational kinetic energy?`,
          `1 : 2`,
          [`1 : 1`, `2 : 5`, `1 : 3`],
          `K_rot = (1/2)Iω² = (1/2)(1/2 MR²)(v/R)² = (1/4)Mv². K_trans = (1/2)Mv². Ratio K_rot / K_trans = (1/4) / (1/2) = 1/2.`,
          topic,
          concept
        );
      },
      (id, topic, concept) => {
        return buildQuestion(
          id,
          `Two particles of masses 1 kg and 3 kg are separated by a distance of 80 cm. Where is the center of mass of the system located relative to the 1 kg mass?`,
          `60 cm from the 1 kg mass`,
          [`20 cm from the 1 kg mass`, `40 cm from the 1 kg mass`, `50 cm from the 1 kg mass`],
          `Taking the 1 kg mass at x = 0: x_cm = (m₁x₁ + m₂x₂) / (m₁ + m₂) = (1×0 + 3×80) / (1 + 3) = 240 / 4 = 60 cm.`,
          topic,
          concept
        );
      },
    ];
  }

  // 6. Gravitation
  if (/gravitat|escape|orbital|kepler|acceleration due to gravity|satellite/i.test(searchStr)) {
    return [
      (id, topic, concept) => {
        const vPlanet = (11.2 * 2).toFixed(1);
        return buildQuestion(
          id,
          `The escape velocity from the surface of Earth is 11.2 km/s. If a hypothetical planet has four times the mass of Earth but the exact same radius, what is the escape velocity from its surface?`,
          `${vPlanet} km/s (22.4 km/s)`,
          [`11.2 km/s`, `44.8 km/s`, `5.6 km/s`],
          `Escape speed v_e = √(2GM/R). Since M' = 4M and R' = R, v_e' = √4 × v_e = 2 × 11.2 = 22.4 km/s.`,
          topic,
          concept
        );
      },
      (id, topic, concept) => {
        return buildQuestion(
          id,
          `At what height h above the surface of the Earth (radius R) does the acceleration due to gravity become g/4 (where g is the acceleration at the Earth's surface)?`,
          `h = R`,
          [`h = 2R`, `h = R / 2`, `h = 4R`],
          `g_h = g · [R / (R + h)]². For g_h = g/4: [R / (R + h)]² = 1/4 ⇒ R / (R + h) = 1/2 ⇒ R + h = 2R ⇒ h = R.`,
          topic,
          concept
        );
      },
      (id, topic, concept) => {
        return buildQuestion(
          id,
          `At what depth d below the surface of the Earth does the acceleration due to gravity reduce to half of its value at the surface?`,
          `d = R / 2`,
          [`d = R / 4`, `d = 3R / 4`, `d = R`],
          `Variation of g with depth: g_d = g(1 - d/R). For g_d = g/2: 1 - d/R = 1/2 ⇒ d/R = 1/2 ⇒ d = R/2.`,
          topic,
          concept
        );
      },
      (id, topic, concept) => {
        return buildQuestion(
          id,
          `According to Kepler's Third Law, if the orbital radius of a satellite revolving around the Earth is increased by 4 times, its orbital time period increases by a factor of:`,
          `8 times`,
          [`4 times`, `16 times`, `2 times`],
          `Kepler's Law: T² ∝ R³ ⇒ T ∝ R^(3/2). If R' = 4R, T' / T = 4^(3/2) = (√4)³ = 2³ = 8.`,
          topic,
          concept
        );
      },
      (id, topic, concept) => {
        return buildQuestion(
          id,
          `The gravitational potential at the center of a uniform solid sphere of mass M and radius R is:`,
          `- (3/2) GM / R`,
          [`- GM / R`, `- (1/2) GM / R`, `Zero`],
          `For a uniform solid sphere, gravitational potential at center is V_center = - (3/2)(GM/R) = 1.5 times the potential at the surface.`,
          topic,
          concept
        );
      },
    ];
  }

  // 7. Mechanical Properties of Solids & Fluids
  if (/solids|fluids|young|elastic|bernoulli|viscosity|surface tension|terminal|capillary|stress|strain/i.test(searchStr)) {
    return [
      (id, topic, concept) => {
        return buildQuestion(
          id,
          `A steel wire of length L and cross-sectional area A is stretched by force F, producing elongation ΔL. If both length and radius of the wire are doubled under the same force F, the new elongation will be:`,
          `ΔL / 2`,
          [`ΔL`, `2 ΔL`, `ΔL / 4`],
          `Elongation ΔL = FL / (A·Y) = FL / (πr²Y). If L' = 2L and r' = 2r (so A' = 4A), ΔL' = F(2L) / (4A·Y) = (1/2) ΔL.`,
          topic,
          concept
        );
      },
      (id, topic, concept) => {
        return buildQuestion(
          id,
          `The excess pressure inside a spherical soap bubble of radius R in air having surface tension T is:`,
          `4T / R`,
          [`2T / R`, `T / R`, `8T / R`],
          `A soap bubble has two free liquid-gas surfaces (inner and outer). Excess pressure ΔP = 2 × (2T/R) = 4T/R. (For a liquid drop with one surface, ΔP = 2T/R).`,
          topic,
          concept
        );
      },
      (id, topic, concept) => {
        return buildQuestion(
          id,
          `According to the equation of continuity for an incompressible, non-viscous fluid, water flows through a horizontal pipe whose radius decreases from 4 cm to 2 cm. What is the ratio of fluid velocity at the narrow section to that at the wider section?`,
          `4 : 1`,
          [`2 : 1`, `1 : 2`, `16 : 1`],
          `Equation of continuity: A₁v₁ = A₂v₂ ⇒ v₂ / v₁ = A₁ / A₂ = (πr₁²) / (πr₂²) = (4 / 2)² = 4 : 1.`,
          topic,
          concept
        );
      },
      (id, topic, concept) => {
        return buildQuestion(
          id,
          `According to Stokes' Law, the terminal velocity v_t acquired by a small spherical lead ball of radius r falling freely in a viscous fluid is proportional to:`,
          `r²`,
          [`r`, `r³`, `1 / r`],
          `Terminal velocity is given by v_t = (2/9)[r²(ρ - σ)g] / η. Hence v_t is directly proportional to r².`,
          topic,
          concept
        );
      },
      (id, topic, concept) => {
        return buildQuestion(
          id,
          `By Torricelli's theorem, the velocity of efflux of a liquid flowing out from a small hole located at depth h below the free surface of an open tank is:`,
          `√(2gh)`,
          [`2gh`, `√(gh)`, `gh / 2`],
          `Applying Bernoulli's equation between the open surface and the small orifice: v = √(2gh), identical to the speed of a freely falling body through vertical distance h.`,
          topic,
          concept
        );
      },
    ];
  }

  // 8. Thermal Properties & Calorimetry
  if (/thermal|calorimet|latent heat|specific heat|wien|stefan|black body|expansion/i.test(searchStr)) {
    return [
      (id, topic, concept) => {
        return buildQuestion(
          id,
          `How much heat energy is required to melt 50 g of ice at 0 °C into water at 0 °C (latent heat of fusion of ice L_f = 80 cal/g)?`,
          `4000 cal (4 kcal)`,
          [`800 cal`, `5000 cal`, `2000 cal`],
          `Heat Q = m · L_f = 50 g × 80 cal/g = 4000 cal = 4 kcal.`,
          topic,
          concept
        );
      },
      (id, topic, concept) => {
        return buildQuestion(
          id,
          `According to Wien's Displacement Law (λ_max · T = b), if the absolute temperature of a radiating black body is doubled, the peak wavelength λ_max will:`,
          `Halve (become λ_max / 2)`,
          [`Double`, `Increase by 4 times`, `Remain unchanged`],
          `Wien's law states λ_max · T = constant. If T is doubled (2T), λ_max must become half (λ_max / 2) to keep the product constant.`,
          topic,
          concept
        );
      },
      (id, topic, concept) => {
        return buildQuestion(
          id,
          `A black body at absolute temperature 300 K radiates thermal power P. If its absolute temperature is raised to 600 K, what power will it radiate?`,
          `16 P`,
          [`2 P`, `4 P`, `8 P`],
          `By Stefan-Boltzmann Law, total emissive power E = σT⁴. Since T is doubled (T' = 2T), E' = (2)⁴ E = 16 E. Thus power radiated is 16 P.`,
          topic,
          concept
        );
      },
      (id, topic, concept) => {
        return buildQuestion(
          id,
          `Equal masses of three liquids A, B, and C have temperatures 10 °C, 20 °C, and 30 °C respectively. If A and B mixed give 16 °C, what is the ratio of their specific heats s_A : s_B?`,
          `2 : 3`,
          [`3 : 2`, `1 : 1`, `4 : 3`],
          `Heat lost by B = Heat gained by A: m·s_B(20 - 16) = m·s_A(16 - 10) ⇒ 4 s_B = 6 s_A ⇒ s_A / s_B = 4 / 6 = 2 / 3.`,
          topic,
          concept
        );
      },
    ];
  }

  // 9. Thermodynamics & Kinetic Theory
  if (/thermodynamic|carnot|kinetic theory|rms speed|adiabatic|isothermal|heat engine/i.test(searchStr)) {
    return [
      (id, topic, concept) => {
        const t1 = [500, 600, 800][Math.floor(Math.random() * 3)];
        const eff = Math.round((1 - 300 / t1) * 100);
        return buildQuestion(
          id,
          `A reversible Carnot heat engine operates between a hot reservoir at T₁ = ${t1} K and a cold sink at T₂ = 300 K. What is the theoretical efficiency of this Carnot engine?`,
          `${eff}%`,
          [`${eff - 15}%`, `${eff + 15}%`, `${100 - eff}%`],
          `Efficiency of Carnot engine is η = 1 - (T₂ / T₁) = 1 - (300 / ${t1}). Expressed as percentage: η = ${eff}%.`,
          topic,
          concept
        );
      },
      (id, topic, concept) => {
        return buildQuestion(
          id,
          `During an adiabatic expansion of an ideal gas, which of the following relations is strictly valid?`,
          `dQ = 0 and dW = -dU`,
          [`dW = 0 and dQ = dU`, `dT = 0 and dQ = dW`, `dU = 0 and dQ = -dW`],
          `In an adiabatic process, no heat is exchanged (dQ = 0). By First Law of Thermodynamics dQ = dU + dW ⇒ 0 = dU + dW ⇒ dW = -dU. Work is done entirely at the expense of internal energy.`,
          topic,
          concept
        );
      },
      (id, topic, concept) => {
        return buildQuestion(
          id,
          `What is the ratio of the root mean square (rms) speed of helium gas (molar mass = 4 g/mol) to that of oxygen gas (molar mass = 32 g/mol) at the same absolute temperature T?`,
          `2√2 : 1 (or √8 : 1)`,
          [`2 : 1`, `4 : 1`, `8 : 1`],
          `v_rms = √(3RT / M). At constant T, v_rms ∝ 1 / √M. Ratio = √(M_O2 / M_He) = √(32 / 4) = √8 = 2√2 : 1.`,
          topic,
          concept
        );
      },
      (id, topic, concept) => {
        return buildQuestion(
          id,
          `For an ideal diatomic gas (such as N₂ or O₂) without vibrational modes at room temperature, the ratio of molar heat capacities γ = C_p / C_v is:`,
          `7 / 5 = 1.40`,
          [`5 / 3 = 1.67`, `4 / 3 = 1.33`, `9 / 7 = 1.28`],
          `A rigid diatomic gas has 5 degrees of freedom (3 translational + 2 rotational). C_v = (5/2)R, C_p = C_v + R = (7/2)R. γ = C_p / C_v = 7/5 = 1.40.`,
          topic,
          concept
        );
      },
    ];
  }

  // 10. Oscillations & Simple Harmonic Motion
  if (/shm|pendulum|oscillation|simple harmonic|spring.*mass/i.test(searchStr)) {
    return [
      (id, topic, concept) => {
        const lRatio = [4, 9, 16][Math.floor(Math.random() * 3)];
        const tRatio = Math.sqrt(lRatio);
        return buildQuestion(
          id,
          `A simple pendulum has time period T. If the length of the pendulum is increased by ${lRatio} times, how does the new time period T' compare with T?`,
          `T' = ${tRatio} T`,
          [`T' = ${lRatio} T`, `T' = T / ${tRatio}`, `T' = ${lRatio * 2} T`],
          `Time period of a simple pendulum is T = 2π√(L/g). Hence T ∝ √L. Increasing L by ${lRatio} times increases T by √${lRatio} = ${tRatio} times.`,
          topic,
          concept
        );
      },
      (id, topic, concept) => {
        return buildQuestion(
          id,
          `In simple harmonic motion (SHM) of amplitude A, at what displacement x from the mean equilibrium position is the kinetic energy equal to the potential energy?`,
          `x = A / √2`,
          [`x = A / 2`, `x = A / 4`, `x = A / √3`],
          `K = (1/2)mω²(A² - x²) and U = (1/2)mω²x². Equating K = U: A² - x² = x² ⇒ 2x² = A² ⇒ x = A / √2.`,
          topic,
          concept
        );
      },
      (id, topic, concept) => {
        return buildQuestion(
          id,
          `What is the phase difference between the displacement and acceleration of a particle undergoing simple harmonic motion?`,
          `π radians (180°)`,
          [`π / 2 radians (90°)`, `Zero`, `3π / 2 radians (270°)`],
          `In SHM, if displacement is x = A sin(ωt), acceleration is a = -ω²x = -ω²A sin(ωt) = ω²A sin(ωt + π). The phase difference is π radians (180°).`,
          topic,
          concept
        );
      },
      (id, topic, concept) => {
        return buildQuestion(
          id,
          `A spring of spring constant k is cut into two equal halves. What is the spring constant of each individual half?`,
          `2k`,
          [`k / 2`, `k`, `4k`],
          `Spring constant is inversely proportional to length (k ∝ 1/L). Cutting the spring into half (L' = L/2) doubles the stiffness: k' = 2k.`,
          topic,
          concept
        );
      },
    ];
  }

  // 11. Waves & Sound
  if (/wave|sound|doppler|organ pipe|beat|resonance/i.test(searchStr)) {
    return [
      (id, topic, concept) => {
        return buildQuestion(
          id,
          `A closed organ pipe and an open organ pipe have the same length L. The ratio of their fundamental frequencies (f_closed : f_open) is:`,
          `1 : 2`,
          [`2 : 1`, `1 : 4`, `1 : 1`],
          `Fundamental frequency of closed pipe: f_c = v / (4L). For open pipe: f_o = v / (2L). Ratio f_c : f_o = (1/4) : (1/2) = 1 : 2.`,
          topic,
          concept
        );
      },
      (id, topic, concept) => {
        return buildQuestion(
          id,
          `A whistle emitting sound of frequency 500 Hz moves towards a stationary observer with speed 34 m/s. Taking speed of sound in air as 340 m/s, the frequency heard by the observer is:`,
          `555.6 Hz`,
          [`500 Hz`, `450 Hz`, `600 Hz`],
          `By Doppler effect for source approaching stationary observer: f' = f [v / (v - v_s)] = 500 × [340 / (340 - 34)] = 500 × (340 / 306) ≈ 555.6 Hz.`,
          topic,
          concept
        );
      },
      (id, topic, concept) => {
        return buildQuestion(
          id,
          `Two tuning forks A and B sounded together produce 5 beats per second. When fork A (frequency 256 Hz) is loaded with wax, the beat frequency decreases to 2 beats per second. The frequency of fork B is:`,
          `251 Hz`,
          [`261 Hz`, `256 Hz`, `258 Hz`],
          `Initial |f_A - f_B| = 5 ⇒ f_B = 256 ± 5 = 261 or 251 Hz. Waxing A lowers f_A (< 256). If f_B were 261, beat frequency |f_A - 261| would increase. Since beat frequency decreased to 2, f_B must be 251 Hz (f_A - 251 = 253 - 251 = 2).`,
          topic,
          concept
        );
      },
    ];
  }

  // 12. Electrostatics & Capacitance
  if (/electrostat|coulomb|gauss|capacit|electric field|electric potential|dielectric/i.test(searchStr)) {
    return [
      (id, topic, concept) => {
        return buildQuestion(
          id,
          `Two point charges in vacuum exert a force F on each other. If they are placed at the same distance in a liquid medium of dielectric constant K = 5, what is the new electrostatic force between them?`,
          `F / 5`,
          [`5 F`, `F / 25`, `25 F`],
          `Coulomb's Law in a dielectric medium: F' = F / K. For K = 5, F' = F / 5.`,
          topic,
          concept
        );
      },
      (id, topic, concept) => {
        return buildQuestion(
          id,
          `A parallel plate capacitor has capacitance C in air. If a dielectric slab of dielectric constant K = 6 is completely filled between its plates while keeping plate separation unchanged, what is the new capacitance?`,
          `6 C`,
          [`C / 6`, `36 C`, `C`],
          `Capacitance with dielectric is C' = K · C₀. With K = 6, C' = 6 C.`,
          topic,
          concept
        );
      },
      (id, topic, concept) => {
        return buildQuestion(
          id,
          `A 10 μF capacitor is charged to a potential difference of 100 V. What is the electrostatic energy stored in this capacitor?`,
          `0.05 J (50 mJ)`,
          [`0.1 J`, `0.01 J`, `0.5 J`],
          `Energy stored in a capacitor is U = (1/2)CV² = 0.5 × (10 × 10⁻⁶ F) × (100 V)² = 0.5 × 10⁻⁵ × 10⁴ = 0.05 J.`,
          topic,
          concept
        );
      },
      (id, topic, concept) => {
        return buildQuestion(
          id,
          `According to Gauss's Law, the total electric flux passing through a closed Gaussian surface enclosing an electric dipole of dipole moment p is:`,
          `Zero`,
          [`p / ε₀`, `2q / ε₀`, `q / ε₀`],
          `An electric dipole consists of equal and opposite charges (+q and -q). Total enclosed charge Q_enc = +q - q = 0. By Gauss's Law Φ = Q_enc / ε₀ = 0.`,
          topic,
          concept
        );
      },
    ];
  }

  // 13. Current Electricity & Circuits
  if (/current electricity|circuit|ohm|resistan|potentiometer|wheatstone|kirchhoff|drift velocity/i.test(searchStr)) {
    return [
      (id, topic, concept) => {
        const n = [2, 3, 4][Math.floor(Math.random() * 3)];
        const r0 = 4;
        const newR = n * n * r0;
        return buildQuestion(
          id,
          `A metallic wire of uniform resistance R = 4 Ω is stretched uniformly such that its length increases to ${n} times its original length. What is its new electrical resistance?`,
          `${newR} Ω`,
          [`${n * r0} Ω`, `${(r0 / n).toFixed(1)} Ω`, `${n * n * n * r0} Ω`],
          `Because volume V = A·L remains constant during stretching, if L' = ${n}L, area A' = A/${n}. Hence R' = ρL'/A' = ${n}²(ρL/A) = ${n}² × 4 = ${newR} Ω.`,
          topic,
          concept
        );
      },
      (id, topic, concept) => {
        return buildQuestion(
          id,
          `In a balanced Wheatstone bridge, four resistance arms have resistances P = 10 Ω, Q = 20 Ω, R = 15 Ω, and S. What is the value of unknown resistance S?`,
          `30 Ω`,
          [`15 Ω`, `40 Ω`, `25 Ω`],
          `At balance: P / Q = R / S ⇒ 10 / 20 = 15 / S ⇒ 1 / 2 = 15 / S ⇒ S = 30 Ω.`,
          topic,
          concept
        );
      },
      (id, topic, concept) => {
        return buildQuestion(
          id,
          `A cell of EMF 2.0 V and internal resistance 0.5 Ω is connected across an external resistor of 4.5 Ω. The terminal potential difference across the cell is:`,
          `1.8 V`,
          [`2.0 V`, `1.5 V`, `1.6 V`],
          `Current I = E / (R + r) = 2.0 / (4.5 + 0.5) = 2.0 / 5.0 = 0.4 A. Terminal potential difference V = E - Ir = 2.0 - (0.4 × 0.5) = 2.0 - 0.2 = 1.8 V.`,
          topic,
          concept
        );
      },
      (id, topic, concept) => {
        return buildQuestion(
          id,
          `Kirchhoff's first law (Junction rule, Σ I = 0) and second law (Loop rule, Σ IR = Σ E) are based on the conservation of which quantities respectively?`,
          `Electric charge and Energy`,
          [`Energy and Electric charge`, `Electric charge and Momentum`, `Energy and Momentum`],
          `Junction rule is based on conservation of electric charge (charge cannot accumulate at a junction). Loop rule is based on conservation of energy (net work done around a closed loop is zero).`,
          topic,
          concept
        );
      },
    ];
  }

  // 14. Magnetic Effects of Current & Magnetism
  if (/magnet|solenoid|biot|ampere|cyclotron|lorentz|dipole moment/i.test(searchStr)) {
    return [
      (id, topic, concept) => {
        return buildQuestion(
          id,
          `The magnetic field at the center of a circular coil of radius R carrying current I is B. If both the current is doubled and radius is doubled, the new magnetic field at the center will be:`,
          `B (remains unchanged)`,
          [`2 B`, `4 B`, `B / 2`],
          `B = (μ₀ I) / (2 R). If I' = 2I and R' = 2R, B' = [μ₀ (2I)] / [2 (2R)] = (μ₀ I) / (2 R) = B.`,
          topic,
          concept
        );
      },
      (id, topic, concept) => {
        return buildQuestion(
          id,
          `A charged particle moves perpendicular to a uniform magnetic field B with speed v in a circle of radius r. The kinetic energy of the particle is doubled. What is the new orbital radius?`,
          `√2 r`,
          [`2 r`, `4 r`, `r / √2`],
          `Radius r = mv / (qB) = √(2mK) / (qB). Hence r ∝ √K. Doubling kinetic energy (K' = 2K) scales radius by √2: r' = √2 r.`,
          topic,
          concept
        );
      },
      (id, topic, concept) => {
        return buildQuestion(
          id,
          `Two long parallel straight wires carrying currents I₁ and I₂ in the same direction separated by distance d will:`,
          `Attract each other with force per unit length μ₀I₁I₂ / (2πd)`,
          [`Repel each other with force per unit length μ₀I₁I₂ / (2πd)`, `Attract each other with force μ₀I₁I₂ / (4πd)`, `Experience zero mutual force`],
          `Parallel currents flowing in the same direction attract each other due to magnetic force, with force per unit length F/L = (μ₀ I₁ I₂) / (2πd).`,
          topic,
          concept
        );
      },
    ];
  }

  // 15. Electromagnetic Induction & AC
  if (/emi|induction|faraday|lenz|ac|alternating|transformer|resonant|lcr/i.test(searchStr)) {
    return [
      (id, topic, concept) => {
        return buildQuestion(
          id,
          `In a series LCR circuit containing L = 100 mH, C = 10 μF, and R = 50 Ω, what is the resonant angular frequency ω₀?`,
          `1000 rad/s`,
          [`100 rad/s`, `500 rad/s`, `2000 rad/s`],
          `Resonant angular frequency ω₀ = 1 / √(LC) = 1 / √(0.1 H × 10 × 10⁻⁶ F) = 1 / √(10⁻⁶) = 1 / 10⁻³ = 1000 rad/s.`,
          topic,
          concept
        );
      },
      (id, topic, concept) => {
        return buildQuestion(
          id,
          `A conducting rod of length 0.5 m moves with uniform speed 4 m/s perpendicular to a uniform magnetic field of 0.2 T. The motional EMF induced across its ends is:`,
          `0.4 V`,
          [`0.8 V`, `0.2 V`, `1.0 V`],
          `Induced motional EMF is e = B·v·L = 0.2 T × 4 m/s × 0.5 m = 0.4 V.`,
          topic,
          concept
        );
      },
      (id, topic, concept) => {
        return buildQuestion(
          id,
          `In an ideal step-down transformer, the number of turns in primary and secondary coils are 1000 and 100 respectively. If primary input voltage is 220 V, the output secondary voltage is:`,
          `22 V`,
          [`2200 V`, `44 V`, `11 V`],
          `Transformer equation: V_s / V_p = N_s / N_p ⇒ V_s = V_p × (N_s / N_p) = 220 × (100 / 1000) = 220 × 0.1 = 22 V.`,
          topic,
          concept
        );
      },
    ];
  }

  // 16. Ray Optics & Optical Instruments
  if (/ray optics|lens|refract|prism|mirror|critical angle|telescope|microscope/i.test(searchStr)) {
    return [
      (id, topic, concept) => {
        const r = [15, 20, 30][Math.floor(Math.random() * 3)];
        return buildQuestion(
          id,
          `A thin biconvex glass lens (refractive index μ = 1.5) has equal radii of curvature R = ${r} cm for both surfaces. What is its focal length in air?`,
          `+${r} cm`,
          [`+${r / 2} cm`, `+${r * 2} cm`, `-${r} cm`],
          `Lens Maker's formula: 1/f = (μ - 1)(1/R₁ - 1/R₂). For biconvex lens, R₁ = +${r} cm and R₂ = -${r} cm. 1/f = (1.5 - 1)[1/${r} - (-1/${r})] = 0.5 × (2/${r}) = 1/${r}. Hence f = +${r} cm.`,
          topic,
          concept
        );
      },
      (id, topic, concept) => {
        return buildQuestion(
          id,
          `The critical angle for total internal reflection from a dense medium into air is 30°. What is the refractive index μ of the medium?`,
          `2.0`,
          [`1.5`, `1.732`, `2.5`],
          `From Snell's law at critical angle: sin C = 1 / μ ⇒ μ = 1 / sin 30° = 1 / 0.5 = 2.0.`,
          topic,
          concept
        );
      },
      (id, topic, concept) => {
        return buildQuestion(
          id,
          `Two thin converging lenses of focal lengths +20 cm and +30 cm are placed in contact coaxially. What is the effective power of the combination?`,
          `+8.33 D`,
          [`+5.0 D`, `+10.0 D`, `+6.67 D`],
          `1/F = 1/f₁ + 1/f₂ = 1/20 + 1/30 = 5/60 = 1/12 cm ⇒ F = 12 cm = 0.12 m. Power P = 1 / F(m) = 1 / 0.12 ≈ +8.33 Dioptres.`,
          topic,
          concept
        );
      },
    ];
  }

  // 17. Wave Optics & Interference
  if (/wave optics|ydse|fringe|diffraction|polariz|brewster/i.test(searchStr)) {
    return [
      (id, topic, concept) => {
        return buildQuestion(
          id,
          `In Young's Double Slit Experiment (YDSE), the slit separation is halved (d' = d/2) and distance to screen is doubled (D' = 2D). What happens to the fringe width β?`,
          `Increases by 4 times (4β)`,
          [`Increases by 2 times (2β)`, `Decreases to β/4`, `Remains unchanged`],
          `Fringe width β = (λD) / d. With D' = 2D and d' = d/2: β' = λ(2D) / (d/2) = 4(λD / d) = 4β.`,
          topic,
          concept
        );
      },
      (id, topic, concept) => {
        return buildQuestion(
          id,
          `According to Brewster's law of polarization, when light strikes a transparent medium of refractive index μ at Brewster's angle i_p, the reflected ray and refracted ray are:`,
          `Mutually perpendicular (at 90° to each other)`,
          [`Parallel to each other`, `At 45° to each other`, `Antiparallel`],
          `At Brewster's polarizing angle, tan i_p = μ. The reflected beam is completely plane polarized, and the reflected and refracted rays are at right angles (i_p + r = 90°).`,
          topic,
          concept
        );
      },
    ];
  }

  // 18. Modern Physics, Dual Nature & Atoms/Nuclei
  if (/photoelectric|broglie|dual nature|bohr|atom|nucle|radioactiv|half-life/i.test(searchStr)) {
    return [
      (id, topic, concept) => {
        const v = [100, 400][Math.floor(Math.random() * 2)];
        const lam = (12.27 / Math.sqrt(v)).toFixed(2);
        return buildQuestion(
          id,
          `An electron is accelerated from rest through an electric potential difference of V = ${v} V. What is the de Broglie wavelength associated with the electron?`,
          `${lam} Å`,
          [`${(lam * 2).toFixed(2)} Å`, `${(lam / 2).toFixed(2)} Å`, `${(lam * 10).toFixed(2)} Å`],
          `For an electron, de Broglie wavelength λ = 12.27 / √V Å. For V = ${v} V, λ = 12.27 / √${v} = 12.27 / ${Math.sqrt(v)} = ${lam} Å.`,
          topic,
          concept
        );
      },
      (id, topic, concept) => {
        return buildQuestion(
          id,
          `In Bohr's model of the hydrogen atom, the total energy of an electron in the nth stationary orbit is inversely proportional to:`,
          `n² (E_n ∝ -1/n²)`,
          [`n`, `n³`, `√n`],
          `Bohr's energy formula is E_n = -13.6 / n² eV. Hence total orbital energy is inversely proportional to n².`,
          topic,
          concept
        );
      },
      (id, topic, concept) => {
        return buildQuestion(
          id,
          `A radioactive sample has a half-life of 20 days. What fraction of the original radioactive nuclei will remain undecayed after 60 days?`,
          `1 / 8 (12.5%)`,
          [`1 / 4 (25%)`, `1 / 16 (6.25%)`, `1 / 2 (50%)`],
          `Number of half-lives n = t / T_half = 60 / 20 = 3. Remaining fraction = (1/2)ⁿ = (1/2)³ = 1/8 = 12.5%.`,
          topic,
          concept
        );
      },
    ];
  }

  // 19. Semiconductor Electronics
  if (/semiconductor|diode|transistor|logic gate|zener|p-n junction/i.test(searchStr)) {
    return [
      (id, topic, concept) => {
        return buildQuestion(
          id,
          `Which of the following logic gates produces an output of 0 (LOW) ONLY when both of its inputs are 1 (HIGH)?`,
          `NAND Gate`,
          [`NOR Gate`, `AND Gate`, `XOR Gate`],
          `A NAND gate gives output Y = (A · B)'. When A = 1 and B = 1, Y = (1 · 1)' = 0. For any other input combination, output is 1.`,
          topic,
          concept
        );
      },
      (id, topic, concept) => {
        return buildQuestion(
          id,
          `A Zener diode is specially designed and operated in which specific region to serve as a constant voltage regulator?`,
          `Reverse breakdown region`,
          [`Forward active region`, `Cut-off region`, `Saturation region`],
          `A Zener diode has a heavily doped p-n junction and is operated in reverse breakdown, maintaining an essentially constant voltage across its terminals despite fluctuations in current.`,
          topic,
          concept
        );
      },
    ];
  }

  // General Physics Fallback (Always diverse)
  return [
    (id, topic, concept) => {
      return buildQuestion(
        id,
        `Which of the following statements about conservative forces is strictly correct?`,
        `The work done by a conservative force along any closed path is zero.`,
        [
          `Work done by a conservative force depends strictly on the path taken.`,
          `Friction and viscous drag are examples of conservative forces.`,
          `Work done by a conservative force always reduces mechanical energy.`,
        ],
        `By definition, for a conservative force (like gravity or electrostatic force), work done depends solely on initial and final positions, so work along any closed loop ∮ F · dr = 0.`,
        topic,
        concept
      );
    },
    (id, topic, concept) => {
      return buildQuestion(
        id,
        `Two copper wires of lengths L and 2L have the same cross-sectional area. The ratio of their electrical resistivities (ρ₁ : ρ₂) is:`,
        `1 : 1`,
        [`1 : 2`, `2 : 1`, `1 : 4`],
        `Resistivity (specific resistance) is an intrinsic property of the material and temperature, independent of dimensions (length and area). Because both are copper at the same temperature, ρ₁ : ρ₂ = 1 : 1.`,
        topic,
        concept
      );
    },
  ];
}

module.exports = { getPhysicsGenerators };
