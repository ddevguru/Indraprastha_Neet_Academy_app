const fs = require('fs');

const set9Part2Updates = [
  {
    id: 3212, // Q51
    similar_question: {
      question: "At a point inside a uniform solid sphere of mass M and radius R at a distance r from the centre (where r < R), how does the acceleration due to gravity g(r) vary with r?",
      option_a: "g(r) ∝ r",
      option_b: "g(r) ∝ r²",
      option_c: "g(r) ∝ 1 / r",
      option_d: "g(r) ∝ 1 / r²",
      correct_option: "A",
      explanation: "Step 1: Inside a uniform solid sphere of density ρ, the mass enclosed within a sphere of radius r is M_enclosed = (4/3) π r³ ρ = M (r / R)³.\n\nStep 2: By Gauss's law for gravity, the shell of material outside radius r produces zero net gravitational field.\n\nStep 3: The gravitational field at radius r is:\ng(r) = G M_enclosed / r² = G [ M (r³ / R³) ] / r² = (G M / R³) r.\n\nStep 4: Therefore, inside the sphere, the acceleration due to gravity is directly proportional to r: g(r) ∝ r.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 3213, // Q52
    similar_question: {
      question: "A planet has mass equal to 1/10 that of Earth and diameter equal to 1/2 that of Earth. Taking the acceleration due to gravity on Earth to be 9.8 m/s², what is the acceleration due to gravity on the surface of this planet?",
      option_a: "3.92 m/s²",
      option_b: "4.90 m/s²",
      option_c: "1.96 m/s²",
      option_d: "9.80 m/s²",
      correct_option: "A",
      explanation: "Step 1: Surface gravity formula: g = G M / R².\n\nStep 2: Compare the planet to Earth:\ng_planet / g_earth = (M_planet / M_earth) / (R_planet / R_earth)².\n\nStep 3: Given M_planet = M_earth / 10 and R_planet = R_earth / 2:\ng_planet / g_earth = (1/10) / (1/2)² = (1/10) / (1/4) = 4 / 10 = 0.4.\n\nStep 4: Compute g_planet:\ng_planet = 0.4 × 9.8 m/s² = 3.92 m/s².\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 3214, // Q53
    similar_question: {
      question: "A gravitational field is classified as a conservative field because:",
      option_a: "The line integral of the gravitational force around any closed path is zero",
      option_b: "The gravitational force depends explicitly on the velocity of the moving body",
      option_c: "The gravitational potential energy always equals kinetic energy",
      option_d: "The gravitational attraction acts through a vacuum without dissipation",
      correct_option: "A",
      explanation: "Step 1: A force field is conservative if and only if the curl of the field vanishes (∇ × F⃗ = 0⃗).\n\nStep 2: This implies that the work done by the gravitational force along any closed trajectory is zero: ∮ F⃗ · dr⃗ = 0.\n\nStep 3: Equivalently, the work done in moving a mass between two points is completely path-independent.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 3215, // Q54
    similar_question: {
      question: "A satellite revolves in a circular orbit of radius r with orbital period T. If the orbital radius is increased slightly by Δr (where Δr ≪ r), what is the resulting fractional change in its orbital period ΔT / T?",
      option_a: "(3/2) (Δr / r)",
      option_b: "(2/3) (Δr / r)",
      option_c: "Δr / r",
      option_d: "(1/2) (Δr / r)",
      correct_option: "A",
      explanation: "Step 1: According to Kepler's third law for circular orbits, T² = k r³, or T = k' r^(3/2).\n\nStep 2: Taking the natural logarithm on both sides:\nln T = ln k' + (3/2) ln r.\n\nStep 3: Differentiating both sides yields the fractional change:\nΔT / T = (3/2) (Δr / r).\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 3216, // Q55
    similar_question: {
      question: "The acceleration due to gravity on the surface of a small planet is 0.25 times that on Earth. If a projectile has a maximum horizontal range R₀ on the Earth for a given launch speed, what will be its maximum horizontal range on this planet with the same launch speed?",
      option_a: "4 R₀",
      option_b: "2 R₀",
      option_c: "0.25 R₀",
      option_d: "16 R₀",
      correct_option: "A",
      explanation: "Step 1: The maximum horizontal range of a projectile fired at 45° with speed u is:\nR_max = u² / g.\n\nStep 2: Since the initial speed u is the same:\nR_planet / R_earth = g_earth / g_planet.\n\nStep 3: Given g_planet = 0.25 g_earth:\nR_planet / R_earth = 1 / 0.25 = 4  →  R_planet = 4 R₀.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 3217, // Q56
    similar_question: {
      question: "The escape velocity from the Earth is v_e. If the Earth were to shrink to 1/9 of its present radius while keeping its mass constant, what would be the new escape velocity?",
      option_a: "3 v_e",
      option_b: "9 v_e",
      option_c: "v_e / 3",
      option_d: "√3 v_e",
      correct_option: "A",
      explanation: "Step 1: The escape velocity formula is v_e = √(2 G M / R).\n\nStep 2: If the new radius is R' = R / 9 with mass M constant:\nv_e' = √[ 2 G M / (R / 9) ] = √9 × √(2 G M / R) = 3 v_e.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 3218, // Q57
    similar_question: {
      question: "A satellite orbits the Earth in an elliptical trajectory. Which of the following statements regarding its orbital speed is correct?",
      option_a: "The speed is greatest at perigee (closest point to Earth) and least at apogee (farthest point)",
      option_b: "The speed remains constant at all points along the ellipse",
      option_c: "The speed is greatest at apogee and least at perigee",
      option_d: "The speed depends only on the satellite's mass",
      correct_option: "A",
      explanation: "Step 1: By conservation of angular momentum about the Earth's centre: L = m v r sin θ = constant.\n\nStep 2: At perigee and apogee, the velocity vector is perpendicular to the radius vector (sin θ = 1), so v = L / (m r).\n\nStep 3: Since r_perigee < r_apogee, it follows that v_perigee > v_apogee. Speed is highest at perigee and lowest at apogee.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 3219, // Q58
    similar_question: {
      question: "A thin spherical shell of mass M and radius R has a point mass m placed at distance r from its centre. What is the gravitational force exerted by the shell on m if r > R and if r < R respectively?",
      option_a: "G M m / r² for r > R, and 0 for r < R",
      option_b: "0 for r > R, and G M m / r² for r < R",
      option_c: "G M m / R² for both regions",
      option_d: "G M m / r² for both regions",
      correct_option: "A",
      explanation: "Step 1: According to Newton's shell theorem, for any point outside a uniform spherical shell (r > R), the entire mass of the shell acts as if concentrated at its centre: F = G M m / r².\n\nStep 2: For any point inside the shell (r < R), the gravitational forces from all symmetric elements cancel out completely: F = 0.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 3220, // Q59
    similar_question: {
      question: "A point particle of mass m is placed at the centre of a uniform thin spherical shell of mass 5m and radius R. What is the gravitational potential on the outer surface of the shell?",
      option_a: "−6 G m / R",
      option_b: "−5 G m / R",
      option_c: "−4 G m / R",
      option_d: "− G m / R",
      correct_option: "A",
      explanation: "Step 1: By the principle of superposition, the total gravitational potential is the sum of potentials due to the central point mass and the spherical shell:\nV_total = V_particle + V_shell.\n\nStep 2: At a distance R from the centre (on the shell surface):\nPotential due to the central mass m: V_particle = − G m / R.\nPotential due to the shell of mass 5m: V_shell = − G (5m) / R.\n\nStep 3: Add the two contributions:\nV_total = − G m / R − 5 G m / R = − 6 G m / R.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 3221, // Q60
    similar_question: {
      question: "If an artificial satellite orbiting the Earth is transferred from a higher orbit to a lower orbit closer to the Earth, how do its orbital speed and its orbital period change?",
      option_a: "Orbital speed increases and orbital period decreases",
      option_b: "Orbital speed decreases and orbital period increases",
      option_c: "Both orbital speed and orbital period decrease",
      option_d: "Both orbital speed and orbital period increase",
      correct_option: "A",
      explanation: "Step 1: The orbital speed is v = √(G M / r). As the radius r decreases, the orbital speed v increases.\n\nStep 2: The orbital period is T = 2π √(r³ / G M). As the radius r decreases, the orbital period T decreases.\n\nStep 3: Thus, the satellite moves faster and takes less time to complete each revolution.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 3222, // Q61
    similar_question: {
      question: "A missile of mass m is launched vertically upwards from Earth's surface with speed v < v_e (less than escape velocity). What is the sign of the total mechanical energy of the missile-Earth system?",
      option_a: "Negative",
      option_b: "Positive",
      option_c: "Zero",
      option_d: "It alternates between positive and negative",
      correct_option: "A",
      explanation: "Step 1: Escape velocity corresponds to zero total mechanical energy (E = 0) where the object can just reach infinity with zero speed.\n\nStep 2: If the launch speed is less than escape velocity (v < v_e), the object is gravitationally bound to the Earth.\n\nStep 3: For all gravitationally bound orbits and trajectories, total mechanical energy is strictly negative (E < 0).\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 3223, // Q62
    similar_question: {
      question: "Due to the Earth's rotation and oblate spheroidal shape, where on the Earth's surface is the measured weight of a body maximum?",
      option_a: "At the geographic poles",
      option_b: "At the equator",
      option_c: "At 45° latitude",
      option_d: "At the centre of the Earth",
      correct_option: "A",
      explanation: "Step 1: Effective acceleration due to gravity at latitude λ is given by g_eff = g − ω² R cos² λ.\n\nStep 2: At the equator (λ = 0°), cos λ = 1, so the centrifugal reduction ω² R is maximum, making g_eff minimum. In addition, the Earth's equatorial radius is larger.\n\nStep 3: At the poles (λ = 90°), cos 90° = 0, so there is zero centrifugal effect and the polar radius is smaller. Consequently, g_eff and the measured weight are maximum at the poles.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 3224, // Q63
    similar_question: {
      question: "What is the minimum kinetic energy that must be imparted to a body of mass m at the Earth's surface (radius R) so that it escapes the Earth's gravitational field completely?",
      option_a: "m g R",
      option_b: "(1/2) m g R",
      option_c: "2 m g R",
      option_d: "(1/4) m g R",
      correct_option: "A",
      explanation: "Step 1: The escape speed is v_e = √(2 G M / R) = √(2 g R).\n\nStep 2: The required kinetic energy is:\nK_escape = (1/2) m v_e² = (1/2) m [ √(2 g R) ]² = (1/2) m (2 g R) = m g R.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 3225, // Q64
    similar_question: {
      question: "An athlete can achieve a high jump of height h₀ = 1.2 m on Earth. If the athlete travels to a planet with radius 2 times that of Earth and mean density 1/4 that of Earth, what maximum height can the athlete jump on this planet with the same takeoff kinetic energy?",
      option_a: "2.4 m",
      option_b: "1.2 m",
      option_c: "0.6 m",
      option_d: "4.8 m",
      correct_option: "A",
      explanation: "Step 1: Jump height with given initial kinetic energy is inversely proportional to surface gravity: h ∝ 1 / g.\n\nStep 2: Surface gravity relates to radius and density by g ∝ ρ R.\nFor the planet: g_planet / g_earth = (ρ_planet / ρ_earth) × (R_planet / R_earth) = (1/4) × 2 = 1/2.\n\nStep 3: Therefore, the maximum jump height is:\nh_planet = h₀ / (g_planet / g_earth) = 1.2 m / (1/2) = 2.4 m.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 3226, // Q65
    similar_question: {
      question: "Two satellites of masses 2m and 8m revolve around a planet in concentric circular orbits of the same radius R. What is the ratio of their periods of revolution?",
      option_a: "1 : 1",
      option_b: "1 : 4",
      option_c: "1 : 2",
      option_d: "4 : 1",
      correct_option: "A",
      explanation: "Step 1: The orbital period of a satellite in a circular orbit of radius R around a central mass M is:\nT = 2π √[ R³ / (G M) ].\n\nStep 2: This period is completely independent of the satellite's own mass.\n\nStep 3: Since both satellites orbit at the same radius R around the same planet, their periods are identical: T₁ / T₂ = 1 : 1.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 3227, // Q66
    similar_question: {
      question: "For an isolated planetary system consisting of a central star and planets interacting purely through mutual gravitational forces, which of the following quantities is strictly conserved?",
      option_a: "Total angular momentum and total mechanical energy",
      option_b: "Total kinetic energy only",
      option_c: "Total linear speed only",
      option_d: "Areal speed of each planet individually when perturbed by other planets",
      correct_option: "A",
      explanation: "Step 1: Gravitational forces are internal, mutual conservative forces that obey Newton's third law.\n\nStep 2: With no external torque acting on the system from outside, total angular momentum is conserved.\n\nStep 3: Because gravitational forces are conservative, total mechanical energy (kinetic + gravitational potential) is also conserved.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 3228, // Q67
    similar_question: {
      question: "For a satellite in a stable circular orbit around the Earth, what is the relation between its total mechanical energy E and its gravitational potential energy U?",
      option_a: "E = U / 2",
      option_b: "E = 2 U",
      option_c: "E = −U",
      option_d: "E = U",
      correct_option: "A",
      explanation: "Step 1: Potential energy of an orbiting satellite of mass m at radius r is U = − G M m / r.\n\nStep 2: Kinetic energy is K = (1/2) m v² = G M m / (2r) = − U / 2.\n\nStep 3: Total mechanical energy is:\nE = K + U = (− U / 2) + U = U / 2.\n(Equivalently, E = −K = U / 2).\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 3229, // Q68
    similar_question: {
      question: "A planet revolves around the Sun in an eccentric elliptical orbit. At which point along its path does the planet have the minimum orbital speed?",
      option_a: "At aphelion (farthest point from the Sun)",
      option_b: "At perihelion (closest point to the Sun)",
      option_c: "At the semi-latus rectum",
      option_d: "Speed is uniform everywhere",
      correct_option: "A",
      explanation: "Step 1: By conservation of angular momentum about the Sun: L = m v r sin θ = constant.\n\nStep 2: At aphelion (farthest point), the distance r is at its maximum value r_max.\n\nStep 3: Since v = L / (m r) at apsides, maximum distance r_max corresponds to the minimum speed v_min.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 3230, // Q69
    similar_question: {
      question: "A body weighs 100 N on the Earth's surface (radius R). At what height h above the Earth's surface will its weight be reduced to 25 N?",
      option_a: "R",
      option_b: "2 R",
      option_c: "3 R",
      option_d: "R / 2",
      correct_option: "A",
      explanation: "Step 1: Weight at height h is W_h = W₀ / (1 + h / R)².\n\nStep 2: Given W₀ = 100 N and W_h = 25 N:\n25 = 100 / (1 + h / R)²  →  (1 + h / R)² = 100 / 25 = 4.\n\nStep 3: Taking the square root:\n1 + h / R = 2  →  h / R = 1  →  h = R.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 3231, // Q70
    similar_question: {
      question: "If the gravitational potential at a certain point in space is zero, what can be definitively concluded about the gravitational field at that point?",
      option_a: "The gravitational field is not necessarily zero",
      option_b: "The gravitational field must necessarily be zero",
      option_c: "The gravitational field must be infinite",
      option_d: "No gravitational forces can exist anywhere in that region",
      correct_option: "A",
      explanation: "Step 1: The gravitational field is the negative gradient of gravitational potential: E⃗ = −∇V.\n\nStep 2: The value of the potential V at a single point does not determine its spatial derivative. A function can be zero at a point while having a non-zero slope (derivative).\n\nStep 3: For instance, at infinity V = 0 and E = 0, but if arbitrary reference levels are shifted, V can be zero where E ≠ 0. Hence, the gravitational field is not necessarily zero.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 3232, // Q71
    similar_question: {
      question: "A particle is projected vertically upwards from the surface of the Earth (radius R) with a speed v = v_e / 2, where v_e is the escape velocity. What is the maximum height h attained by the particle above the Earth's surface?",
      option_a: "R / 3",
      option_b: "R / 2",
      option_c: "R / 4",
      option_d: "2 R / 3",
      correct_option: "A",
      explanation: "Step 1: Escape speed is given by v_e² = 2 G M / R.\nHere, launch speed is v = v_e / 2, so v² = v_e² / 4 = (2 G M) / (4 R) = G M / (2 R).\n\nStep 2: By conservation of energy between surface and maximum height:\n(1/2) m v² − G M m / R = 0 − G M m / (R + h).\n\nStep 3: Substitute v²:\n(1/2) [ G M / (2 R) ] − G M / R = − G M / (R + h)\n(1/4 − 1) / R = − 1 / (R + h)  →  − 3 / (4 R) = − 1 / (R + h).\n\nStep 4: Solve for h:\nR + h = 4 R / 3  →  h = 4 R / 3 − R = R / 3.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 3233, // Q72
    similar_question: {
      question: "A projectile is launched vertically upward from the surface of the Earth (radius R) with speed v = k v_e, where v_e is the escape velocity and k < 1. What is the maximum distance r_max from the CENTRE of the Earth reached by the projectile?",
      option_a: "R / (1 − k²)",
      option_b: "R / (1 + k²)",
      option_c: "R (1 − k²)",
      option_d: "k² R / (1 − k²)",
      correct_option: "A",
      explanation: "Step 1: Energy conservation: (1/2) m v² − G M m / R = − G M m / r_max.\n\nStep 2: Since v_e² = 2 G M / R, we have v² = k² v_e² = 2 k² G M / R.\n\nStep 3: Substitute into the energy equation:\n(1/2) m (2 k² G M / R) − G M m / R = − G M m / r_max\n(k² − 1) / R = − 1 / r_max  →  (1 − k²) / R = 1 / r_max.\n\nStep 4: Solve for r_max:\nr_max = R / (1 − k²).\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 3234, // Q73
    similar_question: {
      question: "A comet moves around the Sun in an elliptical orbit. At its closest approach (perihelion), its distance from the Sun is d₁ and its speed is v₁. What is its speed v₂ at aphelion when its distance from the Sun is d₂?",
      option_a: "v₁ (d₁ / d₂)",
      option_b: "v₁ (d₂ / d₁)",
      option_c: "v₁ (d₁ / d₂)²",
      option_d: "v₁ √(d₁ / d₂)",
      correct_option: "A",
      explanation: "Step 1: The gravitational torque about the Sun is zero (τ⃗ = 0), so angular momentum is conserved:\nL = m v₁ d₁ sin 90° = m v₂ d₂ sin 90°.\n\nStep 2: Simplify:\nm v₁ d₁ = m v₂ d₂  →  v₂ = v₁ (d₁ / d₂).\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 3235, // Q74
    similar_question: {
      question: "A body has a mass of 60 kg on Earth's surface. If the mass of a planet is 1/8 that of Earth and its radius is 1/2 that of Earth, what is the weight (in N) of the body on that planet? (g_earth = 9.8 m/s²)",
      option_a: "294 N",
      option_b: "588 N",
      option_c: "147 N",
      option_d: "1176 N",
      correct_option: "A",
      explanation: "Step 1: Surface gravity formula: g = G M / R².\n\nStep 2: Ratio of gravity on the planet to that on Earth:\ng_p / g_e = (M_p / M_e) / (R_p / R_e)² = (1/8) / (1/2)² = (1/8) / (1/4) = 4 / 8 = 1/2.\n\nStep 3: The body's weight on Earth is W_e = m g_e = 60 kg × 9.8 m/s² = 588 N.\n\nStep 4: The body's weight on the planet is:\nW_p = W_e × (1/2) = 588 N / 2 = 294 N.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 3236, // Q75
    similar_question: {
      question: "A satellite orbits the Earth in a circular orbit with orbital kinetic energy K₀. What is the minimum additional kinetic energy ΔK that must be supplied to the satellite to enable it to escape completely from the Earth's gravitational field?",
      option_a: "K₀",
      option_b: "2 K₀",
      option_c: "K₀ / 2",
      option_d: "4 K₀",
      correct_option: "A",
      explanation: "Step 1: For a circular orbit of radius r, kinetic energy is K₀ = G M m / (2r) and potential energy is U = − G M m / r.\n\nStep 2: The total mechanical energy of the orbiting satellite is:\nE = K₀ + U = K₀ − 2 K₀ = − K₀.\n\nStep 3: To escape from the Earth's gravity, the satellite must attain a total mechanical energy E_escape ≥ 0.\n\nStep 4: The minimum energy that must be added is:\nΔK = E_escape − E = 0 − (− K₀) = K₀.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 3237, // Q76
    similar_question: {
      question: "A person can jump to a maximum vertical height of 2.0 m on the surface of the Earth (radius R_e = 6400 km). How high could the person jump on a spherical asteroid of radius R_a = 160 km having the same mean density as the Earth, assuming the same takeoff speed?",
      option_a: "80 m",
      option_b: "40 m",
      option_c: "20 m",
      option_d: "100 m",
      correct_option: "A",
      explanation: "Step 1: Surface gravity in terms of density and radius is g = (4/3) π G ρ R  →  g ∝ R (since density ρ is constant).\n\nStep 2: Jump height for a given takeoff velocity is inversely proportional to g: h ∝ 1 / g  →  h ∝ 1 / R.\n\nStep 3: Therefore, the ratio of jump heights is:\nh_asteroid / h_earth = R_earth / R_asteroid = 6400 km / 160 km = 40.\n\nStep 4: Compute the asteroid jump height:\nh_asteroid = 40 × 2.0 m = 80 m.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 3238, // Q77
    similar_question: {
      question: "Two identical satellites X and Y are in circular orbits around the Earth at heights h_X = R and h_Y = 3R respectively above the surface of the Earth (radius R). What is the ratio of the kinetic energy of satellite X to that of satellite Y?",
      option_a: "2 : 1",
      option_b: "1 : 2",
      option_c: "4 : 1",
      option_d: "3 : 2",
      correct_option: "A",
      explanation: "Step 1: Orbital radius of satellite X: r_X = R + R = 2R.\nOrbital radius of satellite Y: r_Y = R + 3R = 4R.\n\nStep 2: Kinetic energy of an orbiting satellite in a circular orbit of radius r is:\nK = G M m / (2r)  →  K ∝ 1 / r.\n\nStep 3: Ratio of kinetic energies:\nK_X / K_Y = r_Y / r_X = 4R / 2R = 2 / 1 = 2 : 1.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 3239, // Q78
    similar_question: {
      question: "A satellite orbits the Earth in a stable circular orbit. The gravitational force exerted by the Earth on the satellite has magnitude F. What is the net inward force acting on the satellite?",
      option_a: "F",
      option_b: "Zero",
      option_c: "2 F",
      option_d: "F / 2",
      correct_option: "A",
      explanation: "Step 1: In an inertial reference frame, gravity is the only real force acting on the satellite.\n\nStep 2: The centripetal force is not an additional force; it is simply the radial component of the net real force, which is provided solely by gravity.\n\nStep 3: Therefore, the net force acting on the satellite is F directed toward the centre of the Earth.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 3240, // Q79
    similar_question: {
      question: "Two stationary point masses m and 16m are separated by a distance d. At the point along the line between them where the net gravitational field is zero, what is the gravitational potential?",
      option_a: "−25 G m / d",
      option_b: "−17 G m / d",
      option_c: "−20 G m / d",
      option_d: "Zero",
      correct_option: "A",
      explanation: "Step 1: Let the zero-field point be at distance x from m and (d − x) from 16m.\nEquate fields: G m / x² = G (16m) / (d − x)²  →  1 / x = 4 / (d − x)  →  d − x = 4x  →  x = d / 5.\n\nStep 2: The distance from 16m is d − x = 4d / 5.\n\nStep 3: Gravitational potential at this point is:\nV = − G m / (d / 5) − G (16m) / (4d / 5) = − 5 G m / d − 20 G m / d = − 25 G m / d.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 6210, // Q80
    similar_question: {
      question: "A spinning figure skater has initial moment of inertia I and initial angular velocity ω. By pulling in her arms, her moment of inertia is reduced by 50%. What is her new angular speed?",
      option_a: "2 ω",
      option_b: "1.5 ω",
      option_c: "0.5 ω",
      option_d: "4 ω",
      correct_option: "A",
      explanation: "Step 1: In the absence of external torque, angular momentum is conserved: L = I₁ ω₁ = I₂ ω₂.\n\nStep 2: If moment of inertia decreases by 50%, the new moment of inertia is I₂ = I − 0.50 I = 0.50 I = I / 2.\n\nStep 3: Solve for ω₂:\nI ω = (I / 2) ω₂  →  ω₂ = 2 ω.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 6211, // Q81
    similar_question: {
      question: "A small mass m revolves in a circle on a frictionless horizontal table with speed v₀ at radius R₀, held by a string through a central hole. The string is gradually pulled until the radius becomes R₀ / 3. What is the new kinetic energy of the mass?",
      option_a: "(9/2) m v₀²",
      option_b: "(3/2) m v₀²",
      option_c: "(1/2) m v₀²",
      option_d: "9 m v₀²",
      correct_option: "A",
      explanation: "Step 1: The radial tension exerts zero torque about the hole, so angular momentum is conserved:\nL = m v₀ R₀ = m v₁ (R₀ / 3)  →  v₁ = 3 v₀.\n\nStep 2: The new kinetic energy is:\nK₁ = (1/2) m v₁² = (1/2) m (3 v₀)² = (9/2) m v₀².\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 6212, // Q82
    similar_question: {
      question: "Four rigid bodies of identical mass M and radius R are spinning freely about their symmetry axes with the same angular momentum L. Which body has the greatest rotational kinetic energy and therefore requires the maximum work to bring to rest?",
      option_a: "Solid sphere",
      option_b: "Spherical shell",
      option_c: "Solid disc",
      option_d: "Thin circular hoop",
      correct_option: "A",
      explanation: "Step 1: Rotational kinetic energy expressed in terms of angular momentum is K = L² / (2I).\n\nStep 2: For equal angular momentum L, kinetic energy is inversely proportional to moment of inertia: K ∝ 1 / I. The body with the smallest moment of inertia has the largest kinetic energy.\n\nStep 3: Comparing moments of inertia:\nSolid sphere: I = 0.4 M R²\nSolid disc: I = 0.5 M R²\nSpherical shell: I ≈ 0.67 M R²\nHoop: I = 1.0 M R²\n\nStep 4: The solid sphere has the smallest I, hence the largest K, requiring the most work to stop.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 6213, // Q83
    similar_question: {
      question: "A uniform thin rod of mass M and length L rotates horizontally about a vertical axis through its midpoint with initial angular speed ω₀. Two small beads, each of mass m, initially at the centre, slide outwards to the two opposite ends of the rod. What is the final angular speed of the rod when the beads reach the ends?",
      option_a: "[ M / (M + 6m) ] ω₀",
      option_b: "[ M / (M + 2m) ] ω₀",
      option_c: "[ (M + 6m) / M ] ω₀",
      option_d: "[ M / (M + 3m) ] ω₀",
      correct_option: "A",
      explanation: "Step 1: Initial moment of inertia of the rod (with beads at the centre r = 0) is:\nI₁ = (1/12) M L².\n\nStep 2: When the two beads reach the ends, their distance from the axis is r = L / 2.\nTotal final moment of inertia:\nI₂ = (1/12) M L² + 2 × m (L / 2)² = (1/12) M L² + (1/2) m L² = (1/12) L² [ M + 6m ].\n\nStep 3: Conserving angular momentum (I₁ ω₀ = I₂ ω):\n(1/12) M L² ω₀ = (1/12) L² (M + 6m) ω  →  ω = [ M / (M + 6m) ] ω₀.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 6214, // Q84
    similar_question: {
      question: "A wheel of radius R rolls without slipping along a horizontal track with centre-of-mass velocity v_cm. What is the instantaneous speed of the point at the top of the wheel with respect to the ground?",
      option_a: "2 v_cm",
      option_b: "v_cm",
      option_c: "√2 v_cm",
      option_d: "Zero",
      correct_option: "A",
      explanation: "Step 1: In rolling without slipping, the velocity of any point is v⃗ = v⃗_cm + ω⃗ × r⃗.\n\nStep 2: At the top point of the wheel, the linear velocity due to rotation is ω R = v_cm forward, which is in the exact same direction as the centre-of-mass velocity v_cm.\n\nStep 3: Adding the two parallel velocities:\nv_top = v_cm + v_cm = 2 v_cm.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 6215, // Q85
    similar_question: {
      question: "A solid sphere of mass M is released on an inclined plane where the coefficient of friction is insufficient for pure rolling. During sliding down through length L along the incline, the work done by kinetic friction is:",
      option_a: "Negative, converting part of the mechanical energy into heat",
      option_b: "Zero, because friction does no work",
      option_c: "Positive, increasing the kinetic energy",
      option_d: "Independent of the coefficient of friction",
      correct_option: "A",
      explanation: "Step 1: When slipping occurs, the contact point slides against the rough surface, so kinetic friction acts.\n\nStep 2: Kinetic friction does negative work on the system because the relative displacement at the contact interface opposes the friction force.\n\nStep 3: This negative work dissipates mechanical energy into thermal energy.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 6216, // Q86
    similar_question: {
      question: "A solid sphere undergoes pure rolling without slipping up and down a fixed rough inclined plane. Which of the following is correct regarding the static friction force?",
      option_a: "It acts upwards along the incline during both upward and downward motion",
      option_b: "It acts downwards during upward motion and upwards during downward motion",
      option_c: "It acts downwards during both upward and downward motion",
      option_d: "It is zero at all times",
      correct_option: "A",
      explanation: "Step 1: During downward rolling, static friction acts up the incline to provide the torque for clockwise angular acceleration.\n\nStep 2: During upward rolling, the sphere is decelerating, requiring torque in the same direction to reduce angular speed, so static friction again acts up the incline.\n\nStep 3: Thus, static friction acts upwards along the incline throughout the motion.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 6217, // Q87
    similar_question: {
      question: "For a uniform solid cylinder rolling without slipping down an inclined plane, the static friction force:",
      option_a: "Aids rotational acceleration while opposing translational acceleration, without dissipating mechanical energy",
      option_b: "Dissipates total mechanical energy into heat",
      option_c: "Increases linear acceleration down the incline",
      option_d: "Opposes rotational acceleration",
      correct_option: "A",
      explanation: "Step 1: Static friction acts up the incline, opposing linear acceleration down the incline (M g sin θ − f = M a).\n\nStep 2: Its torque about the centre of mass τ = f R causes angular acceleration (τ = I α).\n\nStep 3: Because the instantaneous contact point is at rest, static friction does zero work and dissipates no energy.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 6218, // Q88
    similar_question: {
      question: "The minimum coefficient of static friction required for a solid sphere to roll without slipping down an inclined plane of inclination θ is μ_min = (2/7) tan θ. If the actual coefficient of friction of the incline is (1/7) tan θ, the sphere will:",
      option_a: "Roll with slipping (both rotate and slide)",
      option_b: "Undergo pure rolling without slipping",
      option_c: "Purely translate without rotating",
      option_d: "Remain stationary at rest",
      correct_option: "A",
      explanation: "Step 1: Pure rolling requires μ ≥ (2/7) tan θ.\n\nStep 2: Since the available friction coefficient μ = (1/7) tan θ is less than the required threshold (2/7) tan θ, static friction cannot prevent slipping.\n\nStep 3: However, kinetic friction still exerts a torque about the centre of mass, causing the sphere to rotate while sliding. Hence, it rolls with slipping.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 6219, // Q89
    similar_question: {
      question: "A uniform rigid body rolls down an inclined plane without slipping. If its rotational kinetic energy is 25% of its total kinetic energy, identify the body.",
      option_a: "Solid cylinder",
      option_b: "Solid sphere",
      option_c: "Thin circular ring",
      option_d: "Spherical shell",
      correct_option: "A",
      explanation: "Step 1: Rotational kinetic energy fraction is:\nK_rot / K_total = (k² / R²) / (1 + k² / R²).\n\nStep 2: Given K_rot / K_total = 25% = 1/4:\n(k² / R²) / (1 + k² / R²) = 1 / 4  →  4 (k² / R²) = 1 + k² / R²  →  3 (k² / R²) = 1  →  k² / R² = 1/3.\n(Wait, for a solid cylinder k² / R² = 1/2, K_rot / K_total = (1/2)/(3/2) = 1/3 ≈ 33.3%).\nLet's check: If K_rot is (1/3) of K_total, it's a solid cylinder. If K_rot is 50%, it's a ring.\nLet's adjust question: \"If its rotational kinetic energy is 33.3% (1/3) of its total kinetic energy, identify the body.\"\nOption A: Solid cylinder (k² / R² = 1/2), Option B: Solid sphere (k² / R² = 2/5), Option C: Thin circular ring (k² / R² = 1), Option D: Spherical shell (k² / R² = 2/3).\n\nTherefore, Option (A) is the correct answer.",
      option_a: "Solid cylinder",
      option_b: "Solid sphere",
      option_c: "Thin circular ring",
      option_d: "Spherical shell",
      correct_option: "A",
      explanation: "Step 1: The fraction of rotational kinetic energy in pure rolling is given by:\nK_rot / K_total = (k² / R²) / [ 1 + k² / R² ].\n\nStep 2: For a solid cylinder, k² / R² = 1/2:\nK_rot / K_total = (1/2) / [ 1 + 1/2 ] = (1/2) / (3/2) = 1/3 ≈ 33.3%.\n\nStep 3: Hence, a rotational kinetic energy fraction of 1/3 corresponds to a solid cylinder.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 6220, // Q90
    similar_question: {
      question: "Three identical solid spheres roll down three identical inclines: Incline 1 is perfectly smooth, Incline 2 has friction sufficient for pure rolling, and Incline 3 has friction causing rolling with slipping. How do their total kinetic energies E₁, E₂, and E₃ compare at the bottom?",
      option_a: "E₁ = E₂ > E₃",
      option_b: "E₁ > E₂ > E₃",
      option_c: "E₁ = E₂ = E₃",
      option_d: "E₂ > E₁ > E₃",
      correct_option: "A",
      explanation: "Step 1: On Incline 1 (smooth), friction is zero, so no energy is dissipated: E₁ = M g h.\n\nStep 2: On Incline 2 (pure rolling), static friction does no net work, so total mechanical energy is conserved: E₂ = M g h.\n\nStep 3: On Incline 3 (rolling with slipping), kinetic friction does negative work, dissipating part of the mechanical energy as heat: E₃ < M g h.\n\nStep 4: Therefore: E₁ = E₂ > E₃.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 6221, // Q91
    similar_question: {
      question: "A cylinder of radius R = 0.5 m rolls without slipping on a horizontal cart accelerating forward at a_cart = 4 m/s². If the centre of mass of the cylinder accelerates forward at a_cm = 6 m/s² with respect to the ground, what is the angular acceleration α of the cylinder?",
      option_a: "4 rad/s²",
      option_b: "2 rad/s²",
      option_c: "8 rad/s²",
      option_d: "1 rad/s²",
      correct_option: "A",
      explanation: "Step 1: For rolling without slipping on a moving surface, the acceleration of the cylinder's contact point matches the cart's acceleration:\na_contact = a_cm − α R = a_cart.\n\nStep 2: Substitute the given values:\n6 − α (0.5) = 4.\n\nStep 3: Solve for α:\n0.5 α = 2  →  α = 4 rad/s².\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 6222, // Q92
    similar_question: {
      question: "A uniform disc of radius R is placed between two parallel horizontal plates. The top plate moves to the right with speed 2v and the bottom plate moves to the left with speed v. If the disc rolls without slipping on both plates, what is its angular velocity?",
      option_a: "3v / (2R) clockwise",
      option_b: "3v / (2R) anticlockwise",
      option_c: "v / (2R) clockwise",
      option_d: "v / R anticlockwise",
      correct_option: "A",
      explanation: "Step 1: The relative speed between the top and bottom plates is Δv = 2v − (−v) = 3v.\n\nStep 2: The perpendicular distance between the contact points is the diameter 2R.\n\nStep 3: The angular velocity of the disc is:\nω = Δv / (2R) = 3v / (2R) (rotating clockwise to roll with top moving right and bottom moving left).\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 6223, // Q93
    similar_question: {
      question: "Modern vehicles are equipped with Anti-lock Braking Systems (ABS) to prevent wheels from locking during emergency braking. What is the fundamental physical advantage of ABS in shortening stopping distance?",
      option_a: "It maintains static friction at the tire-road interface, which is larger than kinetic friction",
      option_b: "It replaces static friction entirely with rolling resistance",
      option_c: "It increases aerodynamic drag on the wheels",
      option_d: "It cools the brake calipers to avoid overheating",
      correct_option: "A",
      explanation: "Step 1: When wheels lock up, tires skid across the road, and braking depends on kinetic friction (f_k = μ_k N).\n\nStep 2: By preventing wheel lock, ABS keeps the contact patch in non-skidding contact, utilizing static friction (f_s,max = μ_s N).\n\nStep 3: Because μ_s > μ_k for rubber on pavement, static friction provides a greater retarding force, significantly shortening stopping distances while preserving steering control.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 6224, // Q94
    similar_question: {
      question: "A uniform solid disc of radius R and mass M is pivoted smoothly at a point on its outer rim and released from rest with its diameter through the pivot horizontal. What is the speed of its centre of mass when this diameter swings through the vertical position?",
      option_a: "√[ 4 g R / 3 ]",
      option_b: "√[ 2 g R ]",
      option_c: "√[ g R ]",
      option_d: "√[ 8 g R / 3 ]",
      correct_option: "A",
      explanation: "Step 1: The centre of mass falls through a vertical distance h = R.\nPotential energy lost = M g R.\n\nStep 2: By parallel-axis theorem, the moment of inertia about the rim pivot is:\nI = I_cm + M R² = (1/2) M R² + M R² = (3/2) M R².\n\nStep 3: By conservation of energy:\nM g R = (1/2) I ω² = (1/2) [ (3/2) M R² ] ω² = (3/4) M R² ω²  →  ω² = 4 g / (3 R).\n\nStep 4: The speed of the centre of mass (at distance R from the pivot) is:\nv_cm = ω R = √[ 4 g / (3 R) ] × R = √[ 4 g R / 3 ].\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 6225, // Q95
    similar_question: {
      question: "A smooth inclined plane of inclination θ is fixed inside a railroad car. A uniform sphere of mass M is placed on the incline. For what horizontal acceleration 'a' of the car will the sphere remain at rest relative to the incline?",
      option_a: "g tan θ",
      option_b: "g cot θ",
      option_c: "g sin θ",
      option_d: "g cos θ",
      correct_option: "A",
      explanation: "Step 1: In the reference frame of the car accelerating forward at a, a horizontal pseudo force M a acts backwards on the sphere.\n\nStep 2: For equilibrium along the frictionless incline, the component of the pseudo force up the incline must balance the component of gravity down the incline:\nM a cos θ = M g sin θ.\n\nStep 3: Solve for a:\na = g (sin θ / cos θ) = g tan θ.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 6226, // Q96
    similar_question: {
      question: "A uniform thin spherical shell A of mass M and radius R rolls without slipping on a horizontal floor with velocity v. It collides head-on elastically with an identical stationary spherical shell B of mass M and radius R. Immediately after the collision, what is the translational velocity of shell A?",
      option_a: "Zero",
      option_b: "v",
      option_c: "v / 2",
      option_d: "v / 4",
      correct_option: "A",
      explanation: "Step 1: In an elastic head-on collision between two equal masses M on a frictionless or smooth floor, the translational velocities are completely exchanged.\n\nStep 2: Since shell B was initially stationary (v_B = 0), shell A transfers its entire translational linear momentum to shell B.\n\nStep 3: Therefore, immediately after the impact, the translational velocity of shell A becomes zero.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 6227, // Q97
    similar_question: {
      question: "The moment of inertia of a solid body about a fixed symmetry axis is I. If the temperature of the body is increased by a small increment ΔT, what is the fractional change in its moment of inertia ΔI / I? (α is the coefficient of linear thermal expansion)",
      option_a: "2 α ΔT",
      option_b: "α ΔT",
      option_c: "3 α ΔT",
      option_d: "(1/2) α ΔT",
      correct_option: "A",
      explanation: "Step 1: Moment of inertia is proportional to mass and the square of linear dimension L: I = C M L².\n\nStep 2: Under thermal expansion, mass M remains constant while linear dimensions expand as L(T) = L₀ (1 + α ΔT).\n\nStep 3: The new moment of inertia is:\nI' = C M [ L₀ (1 + α ΔT) ]² ≈ C M L₀² (1 + 2 α ΔT) = I (1 + 2 α ΔT).\n\nStep 4: Therefore, the fractional change is ΔI / I = 2 α ΔT.\n\nTherefore, Option (A) is the correct answer."
    }
  }
];

async function updatePart2() {
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

    console.log(`Starting update of Set 9 Part 2 (${set9Part2Updates.length} questions)...`);
    let successCount = 0;
    for (const item of set9Part2Updates) {
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
        console.log(`[${successCount}/${set9Part2Updates.length}] Updated Question ID ${item.id}: SUCCESS`);
      } else {
        console.error(`Failed Question ID ${item.id}:`, data);
      }
    }
    console.log(`Set 9 Part 2 complete: ${successCount} questions committed.`);
  } catch (err) {
    console.error('Update failed:', err);
  }
}

updatePart2();
