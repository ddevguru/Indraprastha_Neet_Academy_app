const fs = require('fs');

const set7Part4Updates = [
  {
    id: 5006, // Q156
    similar_question: {
      question: "A stone of mass 1 kg tied to a light string is whirled in a vertical circle of radius 2 m. If the tension in the string at the highest point of its trajectory is 22 N, what is the speed of the stone at the lowest point of the circle? (Take g = 10 m/s²)",
      option_a: "12 m/s",
      option_b: "10 m/s",
      option_c: "14 m/s",
      option_d: "8 m/s",
      correct_option: "A",
      explanation: "Step 1: Dynamics at the topmost point:\nT_top + m g = m v_top² / R\n22 + (1 × 10) = 1 × v_top² / 2  →  32 = v_top² / 2  →  v_top² = 64  →  v_top = 8 m/s.\n\nStep 2: By conservation of mechanical energy between top and bottom:\n(1/2) m v_bot² = (1/2) m v_top² + m g (2R)\nv_bot² = v_top² + 4 g R = 64 + 4(10)(2) = 64 + 80 = 144.\n\nStep 3: Solve for speed at bottom:\nv_bot = √144 = 12 m/s.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 5007, // Q157
    similar_question: {
      question: "A particle of mass 0.5 kg attached to a light cord of length 1.0 m is whirled in a vertical circle. When the cord makes an angle of 60° with the downward vertical, the speed of the particle is 4.0 m/s. What is the tension in the cord at this position? (Take g = 10 m/s²)",
      option_a: "10.5 N",
      option_b: "8.0 N",
      option_c: "12.5 N",
      option_d: "5.5 N",
      correct_option: "A",
      explanation: "Step 1: Radial equation of motion in vertical circle:\nT − m g cos θ = m v² / R.\n\nStep 2: Substitute m = 0.5 kg, g = 10 m/s², θ = 60° (cos 60° = 0.5), v = 4.0 m/s, R = 1.0 m:\nT − 0.5 × 10 × 0.5 = 0.5 × (4.0)² / 1.0\nT − 2.5 = 8.0.\n\nStep 3: Solve for tension T:\nT = 8.0 + 2.5 = 10.5 N.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 5008, // Q158
    similar_question: {
      question: "A bob of mass 2 kg is suspended from a fixed point by a light inextensible cord of length L. The bob is pulled aside until the cord is horizontal and then released from rest. What is the maximum tension developed in the cord during its subsequent motion? (Take g = 10 m/s²)",
      option_a: "60 N",
      option_b: "40 N",
      option_c: "20 N",
      option_d: "80 N",
      correct_option: "A",
      explanation: "Step 1: Speed at the lowest position by conservation of energy:\n(1/2) m v² = m g L  →  v² = 2 g L.\n\nStep 2: Radial equation of motion at the lowest position:\nT_max − m g = m v² / L = m (2 g L) / L = 2 m g.\n\nStep 3: Calculate maximum tension:\nT_max = 3 m g = 3 × 2 kg × 10 m/s² = 60 N.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 5009, // Q159
    similar_question: {
      question: "A small body of mass 1 kg attached to a 1 m string is whirled in a vertical circle at a constant speed of 5 m/s. If the tension in the string is 15 N at a certain position, where is the body located? (Take g = 10 m/s²)",
      option_a: "At the top of the circle",
      option_b: "At the bottom of the circle",
      option_c: "When the string is horizontal",
      option_d: "At an angle of 45° with the vertical",
      correct_option: "A",
      explanation: "Step 1: General tension formula in circular motion: T = m v² / R + m g cos θ, where θ is measured from the lowest point.\n\nStep 2: Centripetal term: m v² / R = (1)(5)² / 1 = 25 N.\n\nStep 3: Solve for angle θ:\n15 = 25 + (1 × 10) cos θ  →  10 cos θ = −10  →  cos θ = −1  →  θ = 180°.\nAn angle of 180° from the bottom corresponds to the highest point (top) of the circle.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 5010, // Q160
    similar_question: {
      question: "A pendulum bob of mass m is suspended by a string of length L. It is given a horizontal speed v₀ at its lowest position such that it swings up to a maximum angle of 60° with the vertical before momentarily coming to rest. What is the tension in the string at the lowest position?",
      option_a: "2 m g",
      option_b: "3 m g",
      option_c: "m g",
      option_d: "1.5 m g",
      correct_option: "A",
      explanation: "Step 1: Vertical height reached at θ = 60°:\nh = L (1 − cos 60°) = L (1 − 0.5) = L / 2.\n\nStep 2: By energy conservation:\n(1/2) m v₀² = m g h = m g (L / 2)  →  v₀² = g L.\n\nStep 3: Tension at the lowest position:\nT = m g + m v₀² / L = m g + m (g L) / L = m g + m g = 2 m g.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 5011, // Q161
    similar_question: {
      question: "A small body of mass 0.5 kg attached to a string of length 2.5 m is rotated in a vertical circle such that it just completes the loop. What are its speed and the tension in the string at the highest point of the path? (Take g = 10 m/s²)",
      option_a: "5.0 m/s and 0 N",
      option_b: "5.0 m/s and 5.0 N",
      option_c: "7.1 m/s and 0 N",
      option_d: "2.5 m/s and 2.5 N",
      correct_option: "A",
      explanation: "Step 1: Critical condition for looping the loop requires tension to just vanish at the top:\nT_top = 0 N.\n\nStep 2: Speed at the top at the verge of slacking:\nm v_top² / R = m g  →  v_top = √(g R).\n\nStep 3: Substitute values:\nv_top = √(10 × 2.5) = √25 = 5.0 m/s.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 5012, // Q162
    similar_question: {
      question: "A stone tied to a string is rotated in a vertical circle of radius R. If its speed at the lowest point is √(9 g R), what is the ratio of the tension in the string at the highest point to that at the lowest point?",
      option_a: "2 : 5",
      option_b: "1 : 3",
      option_c: "1 : 2",
      option_d: "3 : 5",
      correct_option: "A",
      explanation: "Step 1: Tension at the lowest point:\nT_bot = m g + m v_bot² / R = m g + m (9 g R) / R = 10 m g.\n\nStep 2: Speed at the highest point by energy conservation:\nv_top² = v_bot² − 4 g R = 9 g R − 4 g R = 5 g R.\n\nStep 3: Tension at the highest point:\nT_top = m v_top² / R − m g = m (5 g R) / R − m g = 4 m g.\n\nStep 4: Ratio T_top / T_bot = 4 m g / 10 m g = 2 / 5 = 2 : 5.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 5013, // Q163
    similar_question: {
      question: "A smooth circular tube of radius R is held in a vertical plane. A small bead can slide inside the tube with negligible clearance. If the bead is released from rest at the very top of the tube and displaced slightly, what is the nature of its contact with the tube walls?",
      option_a: "It initially remains in contact with the inner wall and later shifts contact to the outer wall",
      option_b: "It always remains in contact with the inner wall",
      option_c: "It always remains in contact with the outer wall",
      option_d: "It initially contacts the outer wall and later shifts to the inner wall",
      correct_option: "A",
      explanation: "Step 1: At small angular displacement θ from the top, speed is small: v² = 2 g R (1 − cos θ).\n\nStep 2: Required centripetal force is m v² / R = 2 m g (1 − cos θ). The inward radial component of gravity is m g cos θ.\nFor small θ, m g cos θ > 2 m g (1 − cos θ), so the tube must push radially outward to provide equilibrium, meaning the bead presses against the inner wall.\n\nStep 3: When cos θ < 2/3, m v² / R exceeds m g cos θ, requiring an inward normal force from the outer wall. Hence, contact shifts from inner to outer wall.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 5014, // Q164
    similar_question: {
      question: "A small particle slides down the smooth outer spherical surface of a dome of radius R = 30 cm starting from rest at the apex. At what vertical height h above the ground (base of the dome) does the particle lose contact with the surface?",
      option_a: "20 cm",
      option_b: "10 cm",
      option_c: "15 cm",
      option_d: "25 cm",
      correct_option: "A",
      explanation: "Step 1: Normal force on the particle at angle θ from the vertical apex:\nN = m g cos θ − m v² / R.\n\nStep 2: By conservation of energy, v² = 2 g R (1 − cos θ).\nSubstitute v² into the normal force equation:\nN = m g cos θ − 2 m g (1 − cos θ) = m g (3 cos θ − 2).\n\nStep 3: Contact is lost when N = 0:\n3 cos θ − 2 = 0  →  cos θ = 2 / 3.\nHeight above ground: h = R cos θ = (2 / 3) × 30 cm = 20 cm.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 5015, // Q165
    similar_question: {
      question: "A child on a playground swing reaches a maximum height of 2.25 m above the ground at the extremes of the swing and drops to a minimum height of 1.0 m at the lowest point. Neglecting friction, what is the maximum speed of the child? (Take g = 10 m/s²)",
      option_a: "5.0 m/s",
      option_b: "6.0 m/s",
      option_c: "4.0 m/s",
      option_d: "7.5 m/s",
      correct_option: "A",
      explanation: "Step 1: Vertical height difference between the extreme and lowest position:\nΔh = 2.25 m − 1.0 m = 1.25 m.\n\nStep 2: By conservation of mechanical energy:\n(1/2) m v_max² = m g Δh  →  v_max = √(2 g Δh).\n\nStep 3: Substitute values:\nv_max = √(2 × 10 × 1.25) = √25 = 5.0 m/s.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 5016, // Q166
    similar_question: {
      question: "A body of mass m tied to a light string is whirled in a vertical circle at a constant speed v. At what point in the trajectory is the tension in the string at its minimum value?",
      option_a: "At the highest point of the circle",
      option_b: "At the lowest point of the circle",
      option_c: "When the string is horizontal",
      option_d: "The tension remains constant everywhere",
      correct_option: "A",
      explanation: "Step 1: Tension at angle θ from lowest point is T = m v² / R + m g cos θ.\n\nStep 2: At the lowest point (θ = 0°), cos 0° = +1, so T is maximum (T_max = m v² / R + m g).\n\nStep 3: At the highest point (θ = 180°), cos 180° = −1, so T is minimum (T_min = m v² / R − m g).\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 5017, // Q167
    similar_question: {
      question: "Which of the following statements concerning power is INCORRECT?",
      option_a: "One mechanical horsepower (1 hp) is equal to 746 kilowatts (kW)",
      option_b: "Power is defined as the time rate at which work is done or energy is transferred",
      option_c: "Power is a scalar physical quantity whose SI unit is the watt (W)",
      option_d: "Instantaneous power can be expressed as the scalar product of force and velocity (P = F⃗ · v⃗)",
      correct_option: "A",
      explanation: "Step 1: One horsepower (1 hp) is defined as 746 Watts (W) = 0.746 kW, NOT 746 kW.\n\nStep 2: All other definitions of power (rate of energy transfer, scalar quantity, P = F⃗ · v⃗) are scientifically correct.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 5018, // Q168
    similar_question: {
      question: "Worker A takes 40 seconds to lift a 20 kg crate to a height of 3 m, whereas Worker B takes 20 seconds to lift an identical 20 kg crate to the same height. What is the ratio of the average power delivered by Worker A to that delivered by Worker B?",
      option_a: "1 : 2",
      option_b: "2 : 1",
      option_c: "1 : 4",
      option_d: "4 : 1",
      correct_option: "A",
      explanation: "Step 1: Work done by both workers is identical: W = m g h.\n\nStep 2: Average power is P = W / t.\n\nStep 3: Ratio of powers:\nP_A / P_B = (W / t_A) / (W / t_B) = t_B / t_A = 20 s / 40 s = 1 / 2 = 1 : 2.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 5019, // Q169
    similar_question: {
      question: "A constant driving force of 12 N acts on a toy car in the direction of its motion. If the instantaneous velocity of the car is 4 m/s, what is the instantaneous power supplied to the car?",
      option_a: "48 W",
      option_b: "24 W",
      option_c: "96 W",
      option_d: "16 W",
      correct_option: "A",
      explanation: "Step 1: Instantaneous power formula when force and velocity are parallel:\nP = F × v.\n\nStep 2: Substitute given values:\nP = 12 N × 4 m/s = 48 W.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 5020, // Q170
    similar_question: {
      question: "A particle moves with instantaneous velocity v⃗ = (4î − 3ĵ + 2k̂) m/s under the action of a force F⃗ = (3î + 2ĵ + 5k̂) N. What is the instantaneous power delivered to the particle?",
      option_a: "16 W",
      option_b: "28 W",
      option_c: "12 W",
      option_d: "8 W",
      correct_option: "A",
      explanation: "Step 1: Instantaneous power is the scalar dot product of force and velocity:\nP = F⃗ · v⃗ = F_x v_x + F_y v_y + F_z v_z.\n\nStep 2: Calculate product of components:\nP = (3)(4) + (2)(−3) + (5)(2) = 12 − 6 + 10 = 16 W.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 5021, // Q171
    similar_question: {
      question: "A body of mass 1 kg initially at rest is acted upon by a time-varying force F⃗(t) = (4t î + 2t ĵ) N. What is the instantaneous power developed by the force as a function of time t?",
      option_a: "10t³ W",
      option_b: "8t³ W",
      option_c: "12t⁴ W",
      option_d: "5t⁴ W",
      correct_option: "A",
      explanation: "Step 1: Acceleration a⃗(t) = F⃗(t) / m = 4t î + 2t ĵ.\n\nStep 2: Velocity v⃗(t) by integrating acceleration starting from rest:\nv⃗(t) = ∫ (4t î + 2t ĵ) dt = 2t² î + t² ĵ.\n\nStep 3: Instantaneous power P(t) = F⃗ · v⃗:\nP(t) = (4t)(2t²) + (2t)(t²) = 8t³ + 2t³ = 10t³ W.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 5022, // Q172
    similar_question: {
      question: "Given below are two statements:\nAssertion (A): The instantaneous power developed by the tension in the string during vertical circular motion of a bob is always zero.\nReason (R): At every instant, the tension force in the string is perpendicular to the velocity vector of the bob.",
      option_a: "Both Assertion and Reason are true and Reason is the correct explanation of Assertion",
      option_b: "Both Assertion and Reason are true but Reason is NOT the correct explanation of Assertion",
      option_c: "Assertion is true but Reason is false",
      option_d: "Assertion is false but Reason is true",
      correct_option: "A",
      explanation: "Step 1: Tension acts radially along the string towards the center of the circular trajectory.\n\nStep 2: The velocity vector is strictly tangential to the circle at every point, making the angle between T⃗ and v⃗ exactly 90°.\n\nStep 3: Instantaneous power P = T⃗ · v⃗ = T v cos 90° = 0. Both are true and Reason is the correct explanation.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 5023, // Q173
    similar_question: {
      question: "A rock is projected vertically upward from the surface of the Earth, momentarily comes to rest at its peak height, and falls back to Earth. At which point during its round-trip flight is the magnitude of instantaneous power delivered by the gravitational force at its maximum?",
      option_a: "Just before the rock strikes the ground on its descent",
      option_b: "At the highest point of its trajectory",
      option_c: "When the rock is halfway up",
      option_d: "Power is uniform throughout the trajectory",
      correct_option: "A",
      explanation: "Step 1: Instantaneous power delivered by gravity is P = F_g · v = F_g v cos θ.\n\nStep 2: On descent, gravity and velocity are both directed downward (θ = 0°, cos θ = 1).\n\nStep 3: Speed v reaches its maximum value just before impact with the ground. At that same point, distance from Earth's center is minimum so gravitational force F_g is also at its largest. Thus, the power magnitude is maximum just before hitting the ground.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 5024, // Q174
    similar_question: {
      question: "A machine delivers constant power to accelerate a vehicle of mass m from rest along a straight horizontal track. The displacement x of the vehicle as a function of time t is proportional to:",
      option_a: "t^(3/2)",
      option_b: "t^(1/2)",
      option_c: "t²",
      option_d: "t^(5/2)",
      correct_option: "A",
      explanation: "Step 1: Work done under constant power: W = P t = (1/2) m v²  →  v ∝ t^(1/2).\n\nStep 2: Relate velocity and displacement: v = dx/dt ∝ t^(1/2).\n\nStep 3: Integrate with respect to time:\nx = ∫ v dt ∝ ∫ t^(1/2) dt ∝ t^(3/2).\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 5025, // Q175
    similar_question: {
      question: "An electric water pump has a rated power output of 5 kW. How many litres of water can it raise per minute from a well of depth 25 m? (Take g = 10 m/s², density of water = 1000 kg/m³)",
      option_a: "1200 litres",
      option_b: "1000 litres",
      option_c: "1500 litres",
      option_d: "800 litres",
      correct_option: "A",
      explanation: "Step 1: Energy supplied by pump in 1 minute (60 s):\nE = P × t = 5000 W × 60 s = 300000 J.\n\nStep 2: Work done to raise mass m of water to height h:\nW = m g h  →  300000 = m × 10 × 25  →  250 m = 300000.\n\nStep 3: Solve for mass and volume:\nm = 300000 / 250 = 1200 kg.\nSince 1 kg of water corresponds to 1 litre, volume = 1200 litres.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 5026, // Q176
    similar_question: {
      question: "What is the average power required for a motor to pump 600 kg of water to an overhead reservoir located at a height of 50 m in a time interval of 20 seconds? (Take g = 10 m/s²)",
      option_a: "15 kW",
      option_b: "30 kW",
      option_c: "10 kW",
      option_d: "25 kW",
      correct_option: "A",
      explanation: "Step 1: Work done to elevate water: W = m g h = 600 kg × 10 m/s² × 50 m = 300000 J.\n\nStep 2: Average power required: P = W / t = 300000 J / 20 s = 15000 W.\n\nStep 3: Convert to kilowatts: P = 15 kW.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 5027, // Q177
    similar_question: {
      question: "Water cascades from a waterfall of height 80 m at a rate of 25 kg/s to drive an electric generator. If 15% of the mechanical energy is dissipated due to fluid resistance, what is the net electric power generated? (Take g = 10 m/s²)",
      option_a: "17.0 kW",
      option_b: "20.0 kW",
      option_c: "15.5 kW",
      option_d: "18.5 kW",
      correct_option: "A",
      explanation: "Step 1: Total input power from gravitational descent:\nP_in = (dm/dt) × g × h = 25 kg/s × 10 m/s² × 80 m = 20000 W = 20 kW.\n\nStep 2: Efficiency after 15% losses: η = 85% = 0.85.\n\nStep 3: Net generated power:\nP_out = 0.85 × 20 kW = 17.0 kW.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 5028, // Q178
    similar_question: {
      question: "A liquid of density ρ is discharged continuously with speed v through a pipe nozzle of cross-sectional area A. What is the power required to impart kinetic energy to this flowing liquid stream?",
      option_a: "(1/2) ρ A v³",
      option_b: "ρ A v³",
      option_c: "(1/2) ρ A v²",
      option_d: "ρ A v²",
      correct_option: "A",
      explanation: "Step 1: Mass of liquid discharged per unit time:\ndm/dt = ρ × A × v.\n\nStep 2: Kinetic energy imparted per unit time (power):\nP = (1/2) (dm/dt) v² = (1/2) (ρ A v) v² = (1/2) ρ A v³.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 5029, // Q179
    similar_question: {
      question: "A fire hose shoots a continuous horizontal jet of water with velocity v. If μ is the mass per unit length of the water jet, what is the rate at which kinetic energy is imparted to the water?",
      option_a: "(1/2) μ v³",
      option_b: "μ v³",
      option_c: "(1/2) μ v²",
      option_d: "μ v²",
      correct_option: "A",
      explanation: "Step 1: Mass flow rate of the water exiting the hose:\ndm/dt = μ × v.\n\nStep 2: Rate of kinetic energy delivered:\ndK/dt = (1/2) (dm/dt) v² = (1/2) (μ v) v² = (1/2) μ v³.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 5030, // Q180
    similar_question: {
      question: "A fountain nozzle continuously discharges a water jet of linear mass density λ at speed u. What is the mechanical power imparted to the water jet?",
      option_a: "(1/2) λ u³",
      option_b: "λ u³",
      option_c: "(1/2) λ u²",
      option_d: "2 λ u³",
      correct_option: "A",
      explanation: "Step 1: Rate of mass emission: dm/dt = λ u.\n\nStep 2: Power delivered equals the kinetic energy imparted per unit time:\nP = (1/2) (dm/dt) u² = (1/2) (λ u) u² = (1/2) λ u³.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 5031, // Q181
    similar_question: {
      question: "A garden hose ejects water at a speed of 4 m/s. If the mass of water per unit length in the hose is 25 kg/m, what is the rate of kinetic energy delivered by the pump?",
      option_a: "800 W",
      option_b: "400 W",
      option_c: "200 W",
      option_d: "1600 W",
      correct_option: "A",
      explanation: "Step 1: Mass flow rate: dm/dt = λ v = 25 kg/m × 4 m/s = 100 kg/s.\n\nStep 2: Power (rate of kinetic energy):\nP = (1/2) (dm/dt) v² = (1/2) × 100 kg/s × (4 m/s)² = 50 × 16 = 800 W.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 5032, // Q182
    similar_question: {
      question: "The resistive drag force opposing the motion of a speedboat in water is proportional to the square of its speed (F_drag ∝ v²). If maintaining a constant speed of v requires a power output of 6 kW, how much power is required to maintain a constant speed of 2v?",
      option_a: "48 kW",
      option_b: "24 kW",
      option_c: "18 kW",
      option_d: "36 kW",
      correct_option: "A",
      explanation: "Step 1: Power required to overcome drag: P = F_drag × v ∝ (v²) × v = v³.\n\nStep 2: Ratio of required powers:\nP₂ / P₁ = (2v / v)³ = 2³ = 8.\n\nStep 3: Calculate P₂:\nP₂ = 8 × 6 kW = 48 kW.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 5033, // Q183
    similar_question: {
      question: "An electric car of mass m starts from rest and accelerates along a straight road such that the motor delivers constant mechanical power P. The instantaneous speed of the car at time t is proportional to:",
      option_a: "t^(1/2)",
      option_b: "t",
      option_c: "t^(3/2)",
      option_d: "t^(−1/2)",
      correct_option: "A",
      explanation: "Step 1: Work done by constant power in time t: W = P t.\n\nStep 2: By the work-energy theorem: (1/2) m v² = P t.\n\nStep 3: Solve for v:\nv = √(2 P t / m), which is directly proportional to t^(1/2).\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 5034, // Q184
    similar_question: {
      question: "Hydroelectric power is generated as water falls from an effective head of 40 m at a rate of 30 kg/s into a turbine. If mechanical and friction losses account for 20% of the input energy, what is the useful power output? (Take g = 10 m/s²)",
      option_a: "9.6 kW",
      option_b: "12.0 kW",
      option_c: "8.4 kW",
      option_d: "10.8 kW",
      correct_option: "A",
      explanation: "Step 1: Input gravitational power:\nP_in = (dm/dt) × g × h = 30 kg/s × 10 m/s² × 40 m = 12000 W = 12 kW.\n\nStep 2: Efficiency η = 100% − 20% = 80% = 0.80.\n\nStep 3: Output power:\nP_out = η × P_in = 0.80 × 12 kW = 9.6 kW.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 5035, // Q185
    similar_question: {
      question: "A truck of mass 8000 kg ascends an incline rising 1 in 40 at a steady speed of 54 km/h. Neglecting frictional resistance, what is the power output of the engine? (Take g = 10 m/s²)",
      option_a: "30 kW",
      option_b: "20 kW",
      option_c: "40 kW",
      option_d: "15 kW",
      correct_option: "A",
      explanation: "Step 1: Convert speed to SI units:\nv = 54 km/h = 54 × (5 / 18) = 15 m/s.\n\nStep 2: Gravity component along incline (sin θ = 1 / 40):\nF = m g sin θ = 8000 kg × 10 m/s² × (1 / 40) = 2000 N.\n\nStep 3: Power output:\nP = F × v = 2000 N × 15 m/s = 30000 W = 30 kW.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 5036, // Q186
    similar_question: {
      question: "Match the energy units in List-I with their standard equivalent values in Joules in List-II:\nList-I:\n(A) 1 Erg\n(B) 1 Electron-volt (eV)\n(C) 1 Calorie (cal)\n(D) 1 Kilowatt-hour (kWh)\nList-II:\n(1) 1.6 × 10⁻¹⁹ J\n(2) 3.6 × 10⁶ J\n(3) 10⁻⁷ J\n(4) 4.184 J",
      option_a: "A-3, B-1, C-4, D-2",
      option_b: "A-1, B-3, C-2, D-4",
      option_c: "A-3, B-4, C-1, D-2",
      option_d: "A-4, B-1, C-3, D-2",
      correct_option: "A",
      explanation: "Step 1: 1 Erg = 10⁻⁷ J  →  (A) matches (3).\n\nStep 2: 1 eV = 1.6 × 10⁻¹⁹ J  →  (B) matches (1).\n\nStep 3: 1 cal = 4.184 J  →  (C) matches (4).\n\nStep 4: 1 kWh = 1000 W × 3600 s = 3.6 × 10⁶ J  →  (D) matches (2).\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 5037, // Q187
    similar_question: {
      question: "A particle starts from rest and is driven along a straight line by a machine delivering power directly proportional to time (P = c t). How do velocity v, displacement x, and work done W vary with time t?",
      option_a: "v ∝ t, x ∝ t², W ∝ t²",
      option_b: "v ∝ t², x ∝ t³, W ∝ t",
      option_c: "v ∝ t^(1/2), x ∝ t^(3/2), W ∝ t²",
      option_d: "v ∝ t, x ∝ t, W ∝ t³",
      correct_option: "A",
      explanation: "Step 1: Work done: W = ∫ P dt = ∫ c t dt = (1/2) c t² ∝ t².\n\nStep 2: Kinetic energy: (1/2) m v² = W ∝ t²  →  v ∝ t.\n\nStep 3: Displacement: x = ∫ v dt ∝ ∫ t dt = (1/2) t² ∝ t².\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 5038, // Q188
    similar_question: {
      question: "A block of mass 4 kg rests on the floor of an elevator that begins moving vertically upward from rest with a constant acceleration of 3 m/s². What is the instantaneous power delivered by the normal contact force to the block at t = 4 seconds? (Take g = 10 m/s²)",
      option_a: "624 W",
      option_b: "480 W",
      option_c: "144 W",
      option_d: "312 W",
      correct_option: "A",
      explanation: "Step 1: Calculate normal reaction force:\nN − m g = m a  →  N = m(g + a) = 4 kg × (10 + 3) m/s² = 52 N.\n\nStep 2: Calculate instantaneous velocity at t = 4 s:\nv = a t = 3 m/s² × 4 s = 12 m/s.\n\nStep 3: Instantaneous power delivered by normal force:\nP = N × v = 52 N × 12 m/s = 624 W.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 5039, // Q189
    similar_question: {
      question: "A heavy ball is thrown with a speed v₀ from the edge of a cliff of height H. In which direction should the ball be projected so that it strikes the ground below with the greatest possible impact speed? (Neglect air resistance)",
      option_a: "The impact speed will be identical regardless of the initial projection angle",
      option_b: "Vertically downwards",
      option_c: "Vertically upwards",
      option_d: "Horizontally",
      correct_option: "A",
      explanation: "Step 1: Gravitational force is conservative, so total mechanical energy is conserved during free flight.\n\nStep 2: Initial total energy: E = (1/2) m v₀² + m g H.\nFinal kinetic energy on impact: (1/2) m v_impact² = E.\n\nStep 3: Impact speed v_impact = √(v₀² + 2 g H) depends only on the launch speed v₀ and height H, completely independent of the direction of projection.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 6231, // Q190
    similar_question: {
      question: "Which of the following statements regarding mechanical energy and its components is INCORRECT?",
      option_a: "Potential energy must always be strictly positive",
      option_b: "Kinetic energy of a macroscopic particle is always non-negative",
      option_c: "Potential energy is a relative quantity dependent on the chosen reference level",
      option_d: "Mechanical energy is the sum of kinetic energy and potential energy",
      correct_option: "A",
      explanation: "Step 1: Kinetic energy is defined as (1/2) m v², which is always non-negative (K ≥ 0).\n\nStep 2: Potential energy depends on the chosen zero reference and can be positive, negative, or zero (e.g. gravitational PE U = −G M m / r is negative).\n\nStep 3: Hence, the assertion that potential energy must always be strictly positive is incorrect.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 6232, // Q191
    similar_question: {
      question: "A particle of mass 1 kg moves in a circular orbit of radius 2 m under an attractive central force corresponding to a potential energy U(r) = 3 r⁴ joules. What is the total mechanical energy of the particle?",
      option_a: "144 J",
      option_b: "96 J",
      option_c: "48 J",
      option_d: "192 J",
      correct_option: "A",
      explanation: "Step 1: Central force magnitude: F(r) = −dU/dr = −12 r³.\n\nStep 2: For a circular orbit of radius r, centripetal force condition:\nm v² / r = 12 r³  →  m v² = 12 r⁴.\n\nStep 3: Kinetic energy: K = (1/2) m v² = 6 r⁴.\nPotential energy: U = 3 r⁴.\nTotal mechanical energy: E = K + U = 6 r⁴ + 3 r⁴ = 9 r⁴.\n\nStep 4: Evaluate for r = 2 m: E = 9 × (2)⁴ = 9 × 16 = 144 J.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 6233, // Q192
    similar_question: {
      question: "The power supplied to a particle of mass 2 kg starting from rest varies with time according to P(t) = 4 t³ watts. What is the velocity of the particle at t = 2 seconds?",
      option_a: "4 m/s",
      option_b: "2 m/s",
      option_c: "8 m/s",
      option_d: "2√2 m/s",
      correct_option: "A",
      explanation: "Step 1: Work done equals the integral of power over time:\nW = ∫₀² P(t) dt = ∫₀² 4 t³ dt = [t⁴]₀² = 2⁴ = 16 J.\n\nStep 2: Apply the work-energy theorem:\n(1/2) m v² = W  →  (1/2) × 2 kg × v² = 16 J  →  v² = 16.\n\nStep 3: Solve for velocity: v = 4 m/s.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 6234, // Q193
    similar_question: {
      question: "The net force acting on a particle moving along a straight line varies with displacement x according to F ∝ x^(1/2). How does the instantaneous power delivered to the particle vary with displacement x?",
      option_a: "x^(5/4)",
      option_b: "x^(3/4)",
      option_c: "x^(1/4)",
      option_d: "x^(3/2)",
      correct_option: "A",
      explanation: "Step 1: Relate force and acceleration: m v (dv/dx) = F ∝ x^(1/2).\n\nStep 2: Integrate to find velocity as a function of displacement:\nv dv ∝ x^(1/2) dx  →  v² ∝ x^(3/2)  →  v ∝ x^(3/4).\n\nStep 3: Instantaneous power: P = F × v ∝ x^(1/2) × x^(3/4) = x^(5/4).\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 6235, // Q194
    similar_question: {
      question: "A particle of mass 2 kg moves along a circular path of radius 2 m with its speed increasing according to v(t) = 2 t² m/s. What is the instantaneous power delivered to the particle at t = 2 seconds?",
      option_a: "128 W",
      option_b: "64 W",
      option_c: "256 W",
      option_d: "32 W",
      correct_option: "A",
      explanation: "Step 1: Tangential acceleration: a_t = dv/dt = 4t.\nAt t = 2 s: a_t = 4(2) = 8 m/s².\n\nStep 2: Speed at t = 2 s: v = 2(2)² = 8 m/s.\n\nStep 3: Tangential force: F_t = m a_t = 2 kg × 8 m/s² = 16 N.\nCentripetal force is perpendicular to velocity and does zero work.\n\nStep 4: Power delivered: P = F_t × v = 16 N × 8 m/s = 128 W.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 6236, // Q195
    similar_question: {
      question: "A block starting from rest on a smooth horizontal surface is driven by a machine supplying constant power. If the displacement of the block at t = 1 s is 4 m, what will be its displacement at t = 4 s?",
      option_a: "32 m",
      option_b: "16 m",
      option_c: "24 m",
      option_d: "64 m",
      correct_option: "A",
      explanation: "Step 1: Under constant power delivery from rest, displacement varies as s ∝ t^(3/2).\n\nStep 2: Ratio of displacements:\ns₂ / s₁ = (t₂ / t₁)^(3/2) = (4 / 1)^(3/2) = 2³ = 8.\n\nStep 3: Solve for s₂:\ns₂ = 8 × s₁ = 8 × 4 m = 32 m.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 6237, // Q196
    similar_question: {
      question: "If the instantaneous power delivered to a body is positive at all times during an interval (P(t) > 0 for all t), what can be said about the work done on the body as time increases?",
      option_a: "It continuously increases",
      option_b: "It continuously decreases",
      option_c: "It remains constant",
      option_d: "It first increases then decreases",
      correct_option: "A",
      explanation: "Step 1: Work done is related to power by W(t) = ∫₀ᵗ P(t') dt'.\n\nStep 2: The rate of change of work done is dW/dt = P(t).\n\nStep 3: Since P(t) > 0 at all times, the derivative dW/dt is strictly positive, meaning total work done is a strictly increasing function of time.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 6238, // Q197
    similar_question: {
      question: "A force F⃗ acts on a particle with velocity v⃗. At a particular instant, the instantaneous power delivered by the force is zero (P = 0) while both |F⃗| ≠ 0 and |v⃗| ≠ 0. What is the angle between the force and velocity vectors at this instant?",
      option_a: "90°",
      option_b: "0°",
      option_c: "180°",
      option_d: "45°",
      correct_option: "A",
      explanation: "Step 1: Instantaneous power formula: P = F⃗ · v⃗ = F v cos θ.\n\nStep 2: Given P = 0 with F ≠ 0 and v ≠ 0:\ncos θ = 0.\n\nStep 3: Solve for θ:\nθ = 90° (force and velocity are mutually perpendicular).\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 6239, // Q198
    similar_question: {
      question: "A motorboat engine delivers a constant maximum power of 45 kW. The resistive drag force of water on the boat is given by F_drag = b v, where v is the boat's speed and b is a constant. If the terminal maximum speed of the boat is 15 m/s, what is the value of the constant b?",
      option_a: "200 kg/s",
      option_b: "150 kg/s",
      option_c: "300 kg/s",
      option_d: "100 kg/s",
      correct_option: "A",
      explanation: "Step 1: At maximum constant speed, driving force equals drag: F = b v_max.\n\nStep 2: Power delivered: P = F × v_max = b (v_max)².\n\nStep 3: Substitute values:\n45000 W = b × (15 m/s)² = 225 b  →  b = 45000 / 225 = 200 kg/s (or N·s/m).\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 6240, // Q199
    similar_question: {
      question: "An escalator transports 10 people of average mass 70 kg each per minute from the ground floor to the first floor, a vertical height of 6 m. Neglecting friction, what is the minimum power required by the escalator motor? (Take g = 10 m/s²)",
      option_a: "700 W",
      option_b: "1400 W",
      option_c: "350 W",
      option_d: "2100 W",
      correct_option: "A",
      explanation: "Step 1: Total mass elevated in 1 minute (60 s):\nM = 10 × 70 kg = 700 kg.\n\nStep 2: Gravitational potential energy delivered in 1 minute:\nW = M g h = 700 kg × 10 m/s² × 6 m = 42000 J.\n\nStep 3: Average power: P = W / t = 42000 J / 60 s = 700 W.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 6241, // Q200
    similar_question: {
      question: "The net force acting on a particle moving along the x-axis from rest is related to displacement as F ∝ x^n. If the instantaneous power delivered to the particle is independent of position x, what is the value of n?",
      option_a: "−1/3",
      option_b: "+1/3",
      option_c: "−1/2",
      option_d: "+1/2",
      correct_option: "A",
      explanation: "Step 1: By equation of motion: m v (dv/dx) = F ∝ x^n.\nIntegrating: v² ∝ x^(n+1)  →  v ∝ x^((n+1)/2).\n\nStep 2: Power delivered: P = F × v ∝ x^n × x^((n+1)/2) = x^((3n+1)/2).\n\nStep 3: For power to be independent of x (i.e. x⁰):\n(3n + 1) / 2 = 0  →  3n + 1 = 0  →  n = −1/3.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 6242, // Q201
    similar_question: {
      question: "An elevator carrying a total load of 2000 kg moves vertically upward at a constant speed of 3 m/s. If a constant frictional force of 5000 N opposes the upward motion, what is the minimum power required from the electric motor? (Take g = 10 m/s²)",
      option_a: "75 kW",
      option_b: "60 kW",
      option_c: "50 kW",
      option_d: "90 kW",
      correct_option: "A",
      explanation: "Step 1: Total upward force required:\nF = M g + f_friction = (2000 × 10) + 5000 = 25000 N.\n\nStep 2: Power delivered:\nP = F × v = 25000 N × 3 m/s = 75000 W = 75 kW.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 6243, // Q202
    similar_question: {
      question: "A high-performance electric vehicle accelerates from rest to a speed v in time T under constant engine power output. Neglecting mechanical friction and air resistance, how much time is required for the vehicle to accelerate from rest to a speed of 3v?",
      option_a: "9 T",
      option_b: "3 T",
      option_c: "6 T",
      option_d: "27 T",
      correct_option: "A",
      explanation: "Step 1: Under constant power P, energy delivered in time t is W = P t = (1/2) m v².\n\nStep 2: Time required is proportional to the square of final speed: t ∝ v².\n\nStep 3: Ratio: t₂ / t₁ = (3v / v)² = 9  →  t₂ = 9 T.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 6244, // Q203
    similar_question: {
      question: "A particle starting from rest is driven along a straight line by a machine delivering constant mechanical power. The distance s travelled by the particle in time t is proportional to:",
      option_a: "t^(3/2)",
      option_b: "t^(1/2)",
      option_c: "t²",
      option_d: "t^(2/3)",
      correct_option: "A",
      explanation: "Step 1: Constant power delivers kinetic energy K = P t = (1/2) m v²  →  v ∝ t^(1/2).\n\nStep 2: Distance travelled: s = ∫ v dt ∝ ∫ t^(1/2) dt ∝ t^(3/2).\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 6245, // Q204
    similar_question: {
      question: "A body moves from rest along a straight line under the action of a constant power source. Which mathematical relationship correctly represents the curvature of its displacement-time (x versus t) curve?",
      option_a: "x ∝ t^(3/2), so the curve is concave upwards with increasing slope",
      option_b: "x ∝ t^(1/2), so the curve is concave downwards with decreasing slope",
      option_c: "x ∝ t, so the curve is a straight line through the origin",
      option_d: "x ∝ t², so the curve is a standard parabola with constant second derivative",
      correct_option: "A",
      explanation: "Step 1: Kinetic energy (1/2) m v² = P t  →  velocity v = dx/dt ∝ t^(1/2).\n\nStep 2: Integrating yields displacement x ∝ t^(3/2).\n\nStep 3: The slope of the x-t curve is dx/dt = v ∝ t^(1/2), which increases with time, meaning the graph is concave upwards.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 6246, // Q205
    similar_question: {
      question: "A locomotive of total mass 200 metric tons moves uniformly up an incline of 1 in 200. The frictional resistance is 50 N per metric ton. If the engine works at a constant power of 300 kW, what is the steady speed of the train? (Take g = 10 m/s², 1 metric ton = 1000 kg)",
      option_a: "15 m/s",
      option_b: "10 m/s",
      option_c: "20 m/s",
      option_d: "25 m/s",
      correct_option: "A",
      explanation: "Step 1: Total mass M = 200 × 1000 kg = 200000 kg.\n\nStep 2: Resistance due to gravity along incline:\nF_g = M g sin θ = 200000 × 10 × (1 / 200) = 10000 N.\n\nStep 3: Resistance due to friction:\nF_f = 200 metric tons × 50 N/ton = 10000 N.\nTotal resisting force: F_total = 10000 + 10000 = 20000 N.\n\nStep 4: Speed: v = P / F_total = 300000 W / 20000 N = 15 m/s.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 6247, // Q206
    similar_question: {
      question: "A particle of mass m moves in a circular path of radius R. Its centripetal acceleration varies with time according to a_c = c² R t², where c is a positive constant. What is the instantaneous power delivered to the particle?",
      option_a: "m c² R² t",
      option_b: "2 m c² R² t",
      option_c: "(1/2) m c² R² t",
      option_d: "Zero",
      correct_option: "A",
      explanation: "Step 1: Centripetal acceleration is a_c = v² / R = c² R t²  →  v² = c² R² t²  →  v = c R t.\n\nStep 2: Tangential acceleration: a_t = dv/dt = c R.\nTangential force: F_t = m a_t = m c R.\n\nStep 3: Power delivered by the forces (centripetal force does zero work):\nP = F_t × v = (m c R) × (c R t) = m c² R² t.\n\nTherefore, Option (A) is the correct answer."
    }
  }
];

async function updatePart4() {
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

    console.log(`Starting update of Set 7 Part 4 (${set7Part4Updates.length} questions)...`);
    let successCount = 0;
    for (const item of set7Part4Updates) {
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
        console.log(`[${successCount}/${set7Part4Updates.length}] Updated Question ID ${item.id}: SUCCESS`);
      } else {
        console.error(`Failed Question ID ${item.id}:`, data);
      }
    }
    console.log(`Set 7 Part 4 complete: ${successCount} questions committed.`);
  } catch (err) {
    console.error('Update failed:', err);
  }
}

updatePart4();
