const https = require('https');

async function request(url, options = {}, body = null) {
  return new Promise((resolve, reject) => {
    const req = https.request(url, options, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try {
          resolve({ status: res.statusCode, data: JSON.parse(data) });
        } catch (e) {
          resolve({ status: res.statusCode, data });
        }
      });
    });
    req.on('error', reject);
    if (body) req.write(JSON.stringify(body));
    req.end();
  });
}

const pyqsData = [
  {
    id: 54,
    question: "The motion of a particle is given by the equation s = (3t³ + 7t² + 14t + 8) m. The value of acceleration of the particle at t = 1 s is: [AIPMT 2000]",
    optionA: "10 m/s²",
    optionB: "32 m/s²",
    optionC: "23 m/s²",
    optionD: "16 m/s²",
    correctOption: "B",
    explanation: "Given position s = 3t³ + 7t² + 14t + 8.\n1. Velocity is the first time-derivative of displacement:\nv = ds/dt = d/dt(3t³ + 7t² + 14t + 8) = 9t² + 14t + 14 m/s.\n2. Acceleration is the first time-derivative of velocity:\na = dv/dt = d/dt(9t² + 14t + 14) = 18t + 14 m/s².\nAt time t = 1 s:\na = 18(1) + 14 = 32 m/s².\nTherefore, Option (B) is the correct answer.",
    similarQuestion: {
      question: "The displacement x of a particle varies with time as x = 2t³ − 3t² + 5t + 2. The acceleration of the particle at t = 2 s is:",
      option_a: "18 m/s²",
      option_b: "12 m/s²",
      option_c: "24 m/s²",
      option_d: "6 m/s²",
      correct_option: "A",
      explanation: "v = dx/dt = 6t² − 6t + 5. a = dv/dt = 12t − 6. At t = 2 s, a = 12(2) − 6 = 18 m/s².\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 53,
    question: "A particle is thrown vertically upward. Its velocity at half of the maximum height is 10 m/s. The maximum height attained (taking g = 10 m/s²) is: [AIPMT 2001]",
    optionA: "8 m",
    optionB: "20 m",
    optionC: "10 m",
    optionD: "16 m",
    correctOption: "C",
    explanation: "Let the initial velocity be u and maximum height attained be H.\nAt the maximum height (s = H), the final velocity is zero (v = 0):\nv² = u² − 2gH ⇒ 0 = u² − 2gH ⇒ u² = 2gH.\nAt half the maximum height, s = H/2, and velocity v = 10 m/s:\nv² = u² − 2g(H/2) = u² − gH.\nSubstitute u² = 2gH:\n(10)² = 2gH − gH = gH\n100 = 10 × H\nH = 10 m.\nTherefore, Option (C) is the correct answer.",
    similarQuestion: {
      question: "A ball thrown vertically upward has a speed of 14 m/s at half of its maximum height. What is the maximum height reached? (g = 9.8 m/s²)",
      option_a: "20 m",
      option_b: "10 m",
      option_c: "14 m",
      option_d: "28 m",
      correct_option: "A",
      explanation: "v² = gH ⇒ (14)² = 9.8 × H ⇒ 196 = 9.8 H ⇒ H = 20 m.\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 52,
    question: "If a ball is thrown vertically upwards with speed u, the distance covered during the last t seconds of its ascent is: [AIPMT 2003]",
    optionA: "ut",
    optionB: "(1/2)gt²",
    optionC: "ut − (1/2)gt²",
    optionD: "(u + gt)t",
    correctOption: "B",
    explanation: "By time-symmetry of vertical motion under gravity:\nThe distance covered by a body during the last t seconds of its ascent (upward flight) to the highest point where it momentarily comes to rest (v = 0) is identically equal to the distance covered by the body in the first t seconds of its descent (downward flight) starting from rest (u = 0).\nFor the first t seconds of descent starting from rest:\ns = u t + (1/2) g t² = 0 + (1/2) g t² = (1/2) g t².\nTherefore, Option (B) is the correct answer.",
    similarQuestion: {
      question: "A stone thrown vertically upwards reaches its maximum height in time T. The distance travelled in the last 1 second of ascent is (g = 9.8 m/s²):",
      option_a: "4.9 m",
      option_b: "9.8 m",
      option_c: "19.6 m",
      option_d: "2.45 m",
      correct_option: "A",
      explanation: "Distance in last t seconds of ascent is (1/2)gt². For t = 1 s, s = (1/2)(9.8)(1)² = 4.9 m.\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 51,
    question: "A man throws balls with the same speed vertically upwards one after the other at intervals of 2 seconds. What should be the speed of throw so that more than two balls are in the sky at any time? (Given g = 9.8 m/s²) [AIPMT 2003]",
    optionA: "More than 19.6 m/s",
    optionB: "At least 9.8 m/s",
    optionC: "Any speed less than 19.6 m/s",
    optionD: "Only with speed 19.6 m/s",
    correctOption: "A",
    explanation: "For more than two balls to remain in the sky simultaneously, the total time of flight (T) of each ball must exceed the time interval required to throw two balls.\nSince balls are thrown every 2 seconds, the second ball is thrown at t = 2 s, and the third ball is thrown at t = 4 s.\nFor more than two balls to be in the air simultaneously when the third ball is projected, the first ball must not have returned to the ground before t = 4 s:\nT > 4 s.\nThe time of flight for vertical projection is:\nT = 2u / g > 4 s\nu > (4 × g) / 2 = 2g = 2 × 9.8 = 19.6 m/s.\nTherefore, the speed of throw must be more than 19.6 m/s.\nTherefore, Option (A) is the correct answer.",
    similarQuestion: {
      question: "A juggler maintains 4 balls in the air, throwing each ball vertically with equal speed at regular intervals of 1 second. What is the minimum velocity of projection? (g = 10 m/s²)",
      option_a: "20 m/s",
      option_b: "10 m/s",
      option_c: "15 m/s",
      option_d: "40 m/s",
      correct_option: "A",
      explanation: "To keep 4 balls in the air, time of flight T must be at least 4 × 1 = 4 s. T = 2u/g ⇒ 4 = 2u/10 ⇒ u = 20 m/s.\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 50,
    question: "The displacement x of a particle varies with time t as x = a e^(−αt) + b e^(βt), where a, b, α, β are positive constants. The velocity of the particle will: [AIPMT 2005]",
    optionA: "Be independent of α",
    optionB: "Drop to zero when α = β",
    optionC: "Go on decreasing with time",
    optionD: "Go on increasing with time",
    correctOption: "D",
    explanation: "Given position x = a e^(−αt) + b e^(βt).\n1. Velocity is the time-derivative of displacement:\nv = dx/dt = −a α e^(−αt) + b β e^(βt).\n2. Acceleration is the time-derivative of velocity:\na_acc = dv/dt = a α² e^(−αt) + b β² e^(βt).\nSince a, b, α, β are all positive constants, and the exponential functions e^(−αt) and e^(βt) are strictly positive for all real t:\na_acc = dv/dt > 0 for all t ≥ 0.\nBecause acceleration (dv/dt) is always positive, the velocity of the particle goes on increasing with time.\nTherefore, Option (D) is the correct answer.",
    similarQuestion: {
      question: "If displacement x varies as x = A e^(ωt) + B e^(−ωt) with A, B, ω > 0, the acceleration is proportional to:",
      option_a: "x",
      option_b: "x²",
      option_c: "1/x",
      option_d: "√x",
      correct_option: "A",
      explanation: "v = dx/dt = Aω e^(ωt) − Bω e^(−ωt). a = d²x/dt² = Aω² e^(ωt) + Bω² e^(−ωt) = ω² x. Hence a ∝ x.\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 49,
    question: "A ball thrown vertically upward has a speed of 10 m/s when it reaches one-half of its maximum height. How high does the ball rise? (Take g = 10 m/s²) [AIPMT 2005]",
    optionA: "10 m",
    optionB: "5 m",
    optionC: "15 m",
    optionD: "20 m",
    correctOption: "A",
    explanation: "Let the maximum height reached be H and initial velocity be u.\nAt the top (s = H), v = 0 ⇒ u² = 2gH.\nAt half-height (s = H/2), speed v = 10 m/s.\nUsing v² = u² − 2g(H/2) = u² − gH:\n(10)² = 2gH − gH = gH\n100 = 10 × H ⇒ H = 10 m.\nTherefore, Option (A) is the correct answer.",
    similarQuestion: {
      question: "A particle thrown vertically up reaches half of its maximum height with a speed of 20 m/s. What is the maximum height reached? (g = 10 m/s²)",
      option_a: "40 m",
      option_b: "20 m",
      option_c: "80 m",
      option_d: "10 m",
      correct_option: "A",
      explanation: "v² = gH ⇒ (20)² = 10 H ⇒ 400 = 10 H ⇒ H = 40 m.\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 48,
    question: "A particle moves along a straight line OX. At time t seconds, the distance x metres of the particle from O is given by x = 40 + 12t − t³. How long would the particle travel before coming to rest? [AIPMT 2006]",
    optionA: "16 m",
    optionB: "24 m",
    optionC: "40 m",
    optionD: "56 m",
    correctOption: "A",
    explanation: "Given position x(t) = 40 + 12t − t³.\n1. Velocity: v = dx/dt = 12 − 3t².\nThe particle comes to rest when its instantaneous velocity is zero (v = 0):\n12 − 3t² = 0 ⇒ 3t² = 12 ⇒ t² = 4 ⇒ t = 2 s.\n2. Position at t = 0 s (starting point):\nx(0) = 40 + 12(0) − (0)³ = 40 m.\n3. Position at t = 2 s (at rest):\nx(2) = 40 + 12(2) − (2)³ = 40 + 24 − 8 = 56 m.\n4. Distance travelled before coming to rest:\nDistance = x(2) − x(0) = 56 m − 40 m = 16 m.\n(Note: 56 m is the position coordinate from origin O; the distance travelled from the initial position is 16 m).\nTherefore, Option (A) is the correct answer.",
    similarQuestion: {
      question: "The position of a particle is given by x = 20 + 6t − t². What is the distance travelled by the particle before coming to rest?",
      option_a: "9 m",
      option_b: "29 m",
      option_c: "20 m",
      option_d: "6 m",
      correct_option: "A",
      explanation: "v = dx/dt = 6 − 2t = 0 ⇒ t = 3 s. x(0) = 20 m. x(3) = 20 + 6(3) − 3² = 20 + 18 − 9 = 29 m. Distance = 29 − 20 = 9 m.\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 47,
    question: "A car runs at a constant speed on a circular track of radius 100 m, taking 62.8 seconds for every circular lap. The average velocity and average speed for each circular lap respectively are: [AIPMT 2006]",
    optionA: "10 m/s, 0",
    optionB: "0, 0",
    optionC: "0, 10 m/s",
    optionD: "10 m/s, 10 m/s",
    correctOption: "C",
    explanation: "1. For each complete circular lap, the car starts and ends at the identical point, so its net displacement is zero (Δr = 0).\nAverage velocity = (Total displacement) / (Total time) = 0 / 62.8 = 0 m/s.\n2. Total distance travelled in one lap equals the circumference of the circle:\nDistance = 2πr = 2 × 3.14 × 100 m = 628 m.\nAverage speed = (Total distance) / (Total time) = 628 m / 62.8 s = 10 m/s.\nThus, average velocity and average speed are 0 and 10 m/s respectively.\nTherefore, Option (C) is the correct answer.",
    similarQuestion: {
      question: "An athlete completes one round of a circular track of diameter 200 m in 40 s. What is his average velocity after 40 s?",
      option_a: "0 m/s",
      option_b: "5π m/s",
      option_c: "10 m/s",
      option_d: "2.5 m/s",
      correct_option: "A",
      explanation: "After 1 complete round (40 s), displacement is zero, so average velocity is 0 m/s.\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 46,
    question: "Two bodies A of mass 1 kg and B of mass 3 kg are dropped from heights 16 m and 25 m respectively. The ratio of time taken to reach the ground is: [AIPMT 2006]",
    optionA: "4/5",
    optionB: "5/4",
    optionC: "12/5",
    optionD: "5/12",
    correctOption: "A",
    explanation: "For a body dropped from rest (u = 0) under free fall, the distance fallen in time t is:\nh = (1/2) g t² ⇒ t = √(2h / g).\nNotice that the time of fall is completely independent of the mass of the body.\nTaking the ratio of times taken by bodies A and B:\nt_A / t_B = √(h_A / h_B) = √(16 / 25) = 4/5.\nTherefore, Option (A) is the correct answer.",
    similarQuestion: {
      question: "Two objects of masses m₁ and m₂ are dropped from heights h₁ and h₂ respectively. The ratio of their velocities just before touching the ground is:",
      option_a: "√(h₁ / h₂)",
      option_b: "h₁ / h₂",
      option_c: "m₁ / m₂",
      option_d: "√(m₁h₁ / m₂h₂)",
      correct_option: "A",
      explanation: "v = √(2gh). Thus v₁ / v₂ = √(h₁ / h₂), independent of mass.\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 45,
    question: "The position x of a particle with respect to time t along x-axis is given by x = 9t² − t³, where x is in metres and t in seconds. What will be its position when it achieves maximum speed along the +x direction? [AIPMT 2007]",
    optionA: "54 m",
    optionB: "81 m",
    optionC: "24 m",
    optionD: "32 m",
    correctOption: "A",
    explanation: "1. Velocity: v = dx/dt = d/dt(9t² − t³) = 18t − 3t².\n2. For speed to be maximum, the time-derivative of velocity (acceleration) must be zero:\na = dv/dt = 18 − 6t = 0 ⇒ 6t = 18 ⇒ t = 3 s.\n(At t = 3 s, d²v/dt² = −6 < 0, confirming a maximum).\n3. Position at t = 3 s:\nx(3) = 9(3)² − (3)³ = 9(9) − 27 = 81 − 27 = 54 m.\nTherefore, Option (A) is the correct answer.",
    similarQuestion: {
      question: "A particle moves along x-axis such that x = 6t² − t³. The maximum velocity attained by the particle is:",
      option_a: "12 m/s",
      option_b: "16 m/s",
      option_c: "8 m/s",
      option_d: "24 m/s",
      correct_option: "A",
      explanation: "v = 12t − 3t². a = 12 − 6t = 0 ⇒ t = 2 s. v_max = 12(2) − 3(2)² = 24 − 12 = 12 m/s.\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 44,
    question: "A car moves from X to Y with a uniform speed v_u and returns to X with a uniform speed v_d. The average speed for this round trip is: [AIPMT 2007]",
    optionA: "√(v_u v_d)",
    optionB: "(v_d v_u) / (v_d + v_u)",
    optionC: "(v_u + v_d) / 2",
    optionD: "(2 v_d v_u) / (v_d + v_u)",
    correctOption: "D",
    explanation: "Let the distance between X and Y be d.\nTotal distance for the round trip = d + d = 2d.\nTime taken from X to Y: t₁ = d / v_u.\nTime taken from Y to X: t₂ = d / v_d.\nTotal time taken = t₁ + t₂ = d / v_u + d / v_d = d (v_d + v_u) / (v_u v_d).\nAverage speed = (Total distance) / (Total time) = 2d / [ d (v_d + v_u) / (v_u v_d) ] = (2 v_u v_d) / (v_u + v_d).\nTherefore, Option (D) is the correct answer.",
    similarQuestion: {
      question: "A vehicle covers a distance d at 40 km/h and returns the same distance d at 60 km/h. The average speed of the vehicle is:",
      option_a: "48 km/h",
      option_b: "50 km/h",
      option_c: "45 km/h",
      option_d: "52 km/h",
      correct_option: "A",
      explanation: "v_avg = 2 v₁ v₂ / (v₁ + v₂) = 2(40)(60) / (40 + 60) = 4800 / 100 = 48 km/h.\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 43,
    question: "A particle moving along the x-axis has acceleration f at time t given by f = f₀(1 − t/T), where f₀ and T are constants. The particle at t = 0 has zero velocity. In the time interval between t = 0 and the instant when f = 0, the particle's velocity v_x is: [AIPMT 2007]",
    optionA: "(1/2)f₀T²",
    optionB: "f₀T²",
    optionC: "(1/2)f₀T",
    optionD: "f₀T",
    correctOption: "C",
    explanation: "Given acceleration f = dv_x / dt = f₀ (1 − t/T).\nAcceleration becomes zero (f = 0) when:\nf₀ (1 − t/T) = 0 ⇒ 1 − t/T = 0 ⇒ t = T.\nIntegrating acceleration from t = 0 to t = T:\nv_x = ∫₀ᵀ f dt = ∫₀ᵀ f₀ (1 − t/T) dt\nv_x = f₀ [ t − t² / (2T) ]₀ᵀ = f₀ [ T − T² / (2T) ] = f₀ [ T − T/2 ] = (1/2) f₀ T.\nTherefore, Option (C) is the correct answer.",
    similarQuestion: {
      question: "The acceleration of a particle is given by a = a₀(1 − t/2). If the particle starts from rest at t = 0, its velocity when acceleration becomes zero is:",
      option_a: "a₀",
      option_b: "2a₀",
      option_c: "a₀ / 2",
      option_d: "4a₀",
      correct_option: "A",
      explanation: "a = 0 at t = 2. v = ∫₀² a₀(1 − t/2) dt = a₀ [t − t²/4]₀² = a₀ [2 − 1] = a₀.\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 42,
    question: "The distance travelled by a particle starting from rest and moving with an acceleration of 4/3 m/s² in the third second is: [AIPMT 2008]",
    optionA: "10/3 m",
    optionB: "19/3 m",
    optionC: "6 m",
    optionD: "4 m",
    correctOption: "A",
    explanation: "The distance covered by an object with uniform acceleration in the n-th second is given by:\ns_n = u + (a/2)(2n − 1).\nGiven:\nInitial velocity u = 0 (starting from rest)\nAcceleration a = 4/3 m/s²\nTime n = 3 (third second)\ns₃ = 0 + [(4/3) / 2] [2(3) − 1] = (2/3) × (6 − 1) = (2/3) × 5 = 10/3 m.\nTherefore, Option (A) is the correct answer.",
    similarQuestion: {
      question: "A body starting from rest moves with a uniform acceleration of 2 m/s². The distance covered by it in the 5th second is:",
      option_a: "9 m",
      option_b: "10 m",
      option_c: "25 m",
      option_d: "16 m",
      correct_option: "A",
      explanation: "s₅ = u + (a/2)(2n − 1) = 0 + (2/2)(2 × 5 − 1) = 1 × 9 = 9 m.\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 41,
    question: "A particle moves in a straight line with constant acceleration. It changes its velocity from 10 m/s to 20 m/s while passing through a distance of 135 m in t seconds. The value of t is: [AIPMT 2008]",
    optionA: "12",
    optionB: "9",
    optionC: "10",
    optionD: "1.8",
    correctOption: "B",
    explanation: "For motion with uniform acceleration, the displacement s over a time interval t is related to initial velocity u and final velocity v by:\ns = [ (u + v) / 2 ] × t.\nGiven:\nu = 10 m/s\nv = 20 m/s\ns = 135 m\nSubstituting the values:\n135 = [ (10 + 20) / 2 ] × t\n135 = (30 / 2) × t = 15 × t\nt = 135 / 15 = 9 s.\nTherefore, Option (B) is the correct answer.",
    similarQuestion: {
      question: "A car accelerates uniformly from 15 m/s to 25 m/s while covering a distance of 200 m. The time taken is:",
      option_a: "10 s",
      option_b: "8 s",
      option_c: "12 s",
      option_d: "15 s",
      correct_option: "A",
      explanation: "s = [(u + v)/2] t ⇒ 200 = [(15 + 25)/2] t = 20 t ⇒ t = 10 s.\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 40,
    question: "A bus is moving with a speed of 10 m/s on a straight road. A scooterist wishes to overtake the bus in 100 s. If the bus is at a distance of 1 km from the scooterist, with what speed should the scooterist chase the bus? [AIPMT 2009]",
    optionA: "40 m/s",
    optionB: "25 m/s",
    optionC: "10 m/s",
    optionD: "20 m/s",
    correctOption: "D",
    explanation: "Let the speed of the scooterist be v_s.\nSpeed of bus v_b = 10 m/s.\nRelative speed of scooterist with respect to bus = v_s − v_b = v_s − 10.\nInitial separation between scooterist and bus = 1 km = 1000 m.\nTime taken to overtake t = 100 s.\nRelative distance = (Relative speed) × time\n1000 = (v_s − 10) × 100\nv_s − 10 = 1000 / 100 = 10\nv_s = 10 + 10 = 20 m/s.\nTherefore, Option (D) is the correct answer.",
    similarQuestion: {
      question: "A thief's car is moving at 15 m/s on a straight road. A police jeep 300 m behind chases the thief and overtakes him in 30 s. The speed of the police jeep is:",
      option_a: "25 m/s",
      option_b: "20 m/s",
      option_c: "30 m/s",
      option_d: "35 m/s",
      correct_option: "A",
      explanation: "d_rel = (v_p − v_t) t ⇒ 300 = (v_p − 15) × 30 ⇒ v_p − 15 = 10 ⇒ v_p = 25 m/s.\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 39,
    question: "A particle starts its motion from rest under the action of a constant force. If the distance covered in the first 10 seconds is S₁ and that covered in the first 20 seconds is S₂, then: [AIPMT 2009]",
    optionA: "S₂ = 3S₁",
    optionB: "S₂ = 4S₁",
    optionC: "S₂ = S₁",
    optionD: "S₂ = 2S₁",
    correctOption: "B",
    explanation: "Under a constant force, acceleration a is constant.\nStarting from rest (u = 0), distance covered in time t is:\nS = (1/2) a t².\nFor t₁ = 10 s:\nS₁ = (1/2) a (10)² = 50 a.\nFor t₂ = 20 s:\nS₂ = (1/2) a (20)² = 200 a.\nDividing S₂ by S₁:\nS₂ / S₁ = (200 a) / (50 a) = 4 ⇒ S₂ = 4S₁.\nTherefore, Option (B) is the correct answer.",
    similarQuestion: {
      question: "A body starts from rest with uniform acceleration. If it covers distance x in the first t seconds, what distance does it cover in the first 3t seconds?",
      option_a: "9x",
      option_b: "3x",
      option_c: "6x",
      option_d: "8x",
      correct_option: "A",
      explanation: "s ∝ t². S(3t) = (3)² S(t) = 9x.\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 38,
    question: "A ball is dropped from a high-rise platform at t = 0 from rest. After 6 seconds, another ball is thrown downwards from the same platform with a speed v. The two balls meet at t = 18 s. What is the value of v? (Take g = 10 m/s²) [AIPMT 2010 Prelims]",
    optionA: "75 m/s",
    optionB: "55 m/s",
    optionC: "40 m/s",
    optionD: "60 m/s",
    correctOption: "A",
    explanation: "1. For the first ball (dropped from rest at t = 0, total time in flight until meeting at t = 18 s is t₁ = 18 s):\nh₁ = (1/2) g t₁² = (1/2) × 10 × (18)² = 5 × 324 = 1620 m.\n2. For the second ball (thrown downward at t = 6 s with speed v, time in flight until t = 18 s is t₂ = 18 − 6 = 12 s):\nh₂ = v t₂ + (1/2) g t₂² = 12 v + (1/2) × 10 × (12)² = 12 v + 5 × 144 = 12 v + 720 m.\n3. Since they meet at the same vertical height, h₁ = h₂:\n1620 = 12 v + 720\n12 v = 1620 − 720 = 900\nv = 900 / 12 = 75 m/s.\nTherefore, Option (A) is the correct answer.",
    similarQuestion: {
      question: "A stone is dropped from a cliff. 2 seconds later, a second stone is thrown vertically downwards with speed v. They hit the water together at t = 4 s. What is v? (g = 10 m/s²)",
      option_a: "30 m/s",
      option_b: "20 m/s",
      option_c: "25 m/s",
      option_d: "15 m/s",
      correct_option: "A",
      explanation: "h₁ = (1/2)(10)(4)² = 80 m. For stone 2, t = 2 s: h₂ = 2v + (1/2)(10)(2)² = 2v + 20. 80 = 2v + 20 ⇒ 2v = 60 ⇒ v = 30 m/s.\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 37,
    question: "A particle moves a distance x in time t according to the equation x = (t + 5)⁻¹. The acceleration of the particle is proportional to: [AIPMT 2010 Prelims]",
    optionA: "(velocity)³/²",
    optionB: "(distance)²",
    optionC: "(distance)⁻²",
    optionD: "(velocity)²/³",
    correctOption: "A",
    explanation: "Given position x = (t + 5)⁻¹.\n1. Velocity: v = dx/dt = −1 (t + 5)⁻² = −(t + 5)⁻².\nMagnitude of velocity: v ∝ (t + 5)⁻² ⇒ (t + 5)⁻¹ ∝ v¹ᐟ².\n2. Acceleration: a = dv/dt = d/dt[−(t + 5)⁻²] = 2 (t + 5)⁻³.\nExpressing acceleration in terms of velocity:\na ∝ [ (t + 5)⁻¹ ]³ ∝ [ v¹ᐟ² ]³ = v³/².\nThus, acceleration is proportional to (velocity)³/².\nTherefore, Option (A) is the correct answer.",
    similarQuestion: {
      question: "If displacement varies with time as x = (t + 2)⁻², the acceleration of the particle is proportional to:",
      option_a: "(velocity)⁴/³",
      option_b: "(velocity)²",
      option_c: "(velocity)³",
      option_d: "(velocity)¹/²",
      correct_option: "A",
      explanation: "v = −2(t + 2)⁻³ ⇒ (t + 2)⁻¹ ∝ v¹ᐟ³. a = 6(t + 2)⁻⁴ ∝ (v¹ᐟ³)⁴ = v⁴/³.\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 36,
    question: "A boy standing at the top of a tower of 20 m height drops a stone. Assuming g = 10 m/s², the velocity with which it hits the ground is: [AIPMT 2011 Prelims]",
    optionA: "10.0 m/s",
    optionB: "20.0 m/s",
    optionC: "40.0 m/s",
    optionD: "5.0 m/s",
    correctOption: "B",
    explanation: "For a body dropped from rest (u = 0) from a height h under acceleration due to gravity g:\nv² = u² + 2gh\nv² = 0 + 2gh = 2gh\nv = √(2gh).\nGiven h = 20 m and g = 10 m/s²:\nv = √(2 × 10 × 20) = √400 = 20.0 m/s.\nTherefore, Option (B) is the correct answer.",
    similarQuestion: {
      question: "A stone is dropped from a height of 45 m. With what velocity does it strike the ground? (g = 10 m/s²)",
      option_a: "30 m/s",
      option_b: "25 m/s",
      option_c: "20 m/s",
      option_d: "45 m/s",
      correct_option: "A",
      explanation: "v = √(2gh) = √(2 × 10 × 45) = √900 = 30 m/s.\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 35,
    question: "A particle covers half of its total distance with speed v₁ and the rest half distance with speed v₂. Its average speed during the complete journey is: [AIPMT 2011 Mains]",
    optionA: "(v₁ + v₂) / 2",
    optionB: "(v₁ v₂) / (v₁ + v₂)",
    optionC: "(2 v₁ v₂) / (v₁ + v₂)",
    optionD: "(v₁² v₂²) / (v₁² + v₂²)",
    correctOption: "C",
    explanation: "Let the total distance be 2d.\nTime to cover the first half distance (d): t₁ = d / v₁.\nTime to cover the second half distance (d): t₂ = d / v₂.\nTotal time taken T = t₁ + t₂ = d(1/v₁ + 1/v₂) = d(v₁ + v₂) / (v₁ v₂).\nAverage speed = (Total distance) / (Total time) = 2d / [ d(v₁ + v₂) / (v₁ v₂) ] = (2 v₁ v₂) / (v₁ + v₂).\nTherefore, Option (C) is the correct answer.",
    similarQuestion: {
      question: "A car covers the first half of a journey at 30 m/s and the second half at 60 m/s. What is the average speed of the car?",
      option_a: "40 m/s",
      option_b: "45 m/s",
      option_c: "50 m/s",
      option_d: "36 m/s",
      correct_option: "A",
      explanation: "v_avg = 2 v₁ v₂ / (v₁ + v₂) = 2(30)(60) / (30 + 60) = 3600 / 90 = 40 m/s.\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 34,
    question: "The motion of a particle along a straight line is described by the equation x = 8 + 12t − t³, where x is in metre and t in second. The retardation of the particle when its velocity becomes zero is: [AIPMT 2012 Prelims]",
    optionA: "24 m/s²",
    optionB: "Zero",
    optionC: "6 m/s²",
    optionD: "12 m/s²",
    correctOption: "D",
    explanation: "Given position x = 8 + 12t − t³.\n1. Velocity: v = dx/dt = 12 − 3t².\nThe velocity becomes zero when:\n12 − 3t² = 0 ⇒ 3t² = 12 ⇒ t² = 4 ⇒ t = 2 s.\n2. Acceleration: a = dv/dt = d/dt(12 − 3t²) = −6t.\nAt t = 2 s:\na = −6(2) = −12 m/s².\nRetardation is defined as negative acceleration:\nRetardation = −a = 12 m/s².\nTherefore, Option (D) is the correct answer.",
    similarQuestion: {
      question: "For a particle moving in a straight line with x = 40 + 24t − 2t³, the retardation when its velocity becomes zero is:",
      option_a: "24 m/s²",
      option_b: "12 m/s²",
      option_c: "16 m/s²",
      option_d: "6 m/s²",
      correct_option: "A",
      explanation: "v = 24 − 6t² = 0 ⇒ t = 2 s. a = −12t. At t = 2 s, a = −24 m/s² ⇒ Retardation = 24 m/s².\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 33,
    question: "A stone falls freely under gravity. It covers distances h₁, h₂, and h₃ in the first 5 seconds, the next 5 seconds and the next 5 seconds respectively. The relation between h₁, h₂ and h₃ is: [NEET 2013]",
    optionA: "h₂ = 3h₁ and h₃ = 3h₂",
    optionB: "h₁ = h₂ = h₃",
    optionC: "h₁ = 2h₂ = 3h₃",
    optionD: "h₁ = h₂/3 = h₃/5",
    correctOption: "D",
    explanation: "According to Galileo's law of odd numbers, for a body falling freely from rest under uniform acceleration:\nThe distances traversed in equal successive intervals of time are in the ratio of odd integers: 1 : 3 : 5 : 7 : ...\nLet t = 5 s:\nDistance in first 5 s: h₁ = (1/2) g (5)² = (25/2) g.\nDistance in next 5 s (from t = 5 to 10 s): h₂ = (1/2) g (10)² − h₁ = (100/2) g − (25/2) g = (75/2) g = 3 h₁.\nDistance in next 5 s (from t = 10 to 15 s): h₃ = (1/2) g (15)² − (h₁ + h₂) = (225/2) g − (100/2) g = (125/2) g = 5 h₁.\nTherefore: h₁ : h₂ : h₃ = 1 : 3 : 5, which can be written as:\nh₁ = h₂ / 3 = h₃ / 5.\nTherefore, Option (D) is the correct answer.",
    similarQuestion: {
      question: "A body dropped from a tower falls distances x, y, z in the first 2 s, next 2 s, and next 2 s respectively. What is the ratio x : y : z?",
      option_a: "1 : 3 : 5",
      option_b: "1 : 2 : 3",
      option_c: "1 : 4 : 9",
      option_d: "1 : 1 : 1",
      correct_option: "A",
      explanation: "By Galileo's law of odd numbers, for equal time intervals starting from rest, the ratio is 1 : 3 : 5.\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 32,
    question: "The displacement x (in metre) of a particle of mass m moving in one dimension under the action of a force is related to time t by t = √x + 3. The displacement of the particle when its velocity is zero will be: [NEET 2013 Karnataka]",
    optionA: "4 m",
    optionB: "0 m (zero)",
    optionC: "6 m",
    optionD: "2 m",
    correctOption: "B",
    explanation: "Given relation: t = √x + 3.\nRearranging for x:\n√x = t − 3 ⇒ x = (t − 3)² = t² − 6t + 9.\nVelocity is the derivative of position:\nv = dx/dt = 2(t − 3) = 2t − 6.\nThe velocity becomes zero when:\n2t − 6 = 0 ⇒ 2t = 6 ⇒ t = 3 s.\nNow, substituting t = 3 s into the displacement expression:\nx = (3 − 3)² = 0 m.\nTherefore, the displacement when the velocity is zero is 0 m.\nTherefore, Option (B) is the correct answer.",
    similarQuestion: {
      question: "If t = √x + 4, find the displacement of the particle when its velocity is zero.",
      option_a: "0 m",
      option_b: "4 m",
      option_c: "16 m",
      option_d: "8 m",
      correct_option: "A",
      explanation: "√x = t − 4 ⇒ x = (t − 4)². v = 2(t − 4) = 0 ⇒ t = 4 s. x(4) = (4 − 4)² = 0 m.\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 31,
    question: "A particle of unit mass undergoes one-dimensional motion such that its velocity varies according to v(x) = β x^(−2n), where β and n are constants and x is the position. The acceleration of the particle as a function of x is: [AIPMT 2015 Cancelled Paper]",
    optionA: "−2β² x^(−2n+1)",
    optionB: "−2nβ² e^(−4n+1)",
    optionC: "−2nβ² x^(−2n−1)",
    optionD: "−2nβ² x^(−4n−1)",
    correctOption: "D",
    explanation: "When velocity is given as a function of position x, acceleration is given by:\na = v (dv / dx).\nGiven v(x) = β x^(−2n).\n1. Differentiating v with respect to x:\ndv/dx = d/dx [ β x^(−2n) ] = β (−2n) x^(−2n − 1) = −2nβ x^(−2n − 1).\n2. Substituting v and dv/dx into the acceleration formula:\na = [ β x^(−2n) ] × [ −2nβ x^(−2n − 1) ]\na = −2nβ² x^[ (−2n) + (−2n − 1) ] = −2nβ² x^(−4n − 1).\nTherefore, Option (D) is the correct answer.",
    similarQuestion: {
      question: "If velocity varies with position as v = k x^(−n), where k and n are constants, the acceleration of the particle is:",
      option_a: "−n k² x^(−2n − 1)",
      option_b: "−n k x^(−n − 1)",
      option_c: "k² x^(−2n)",
      option_d: "−n k² x^(−2n)",
      correct_option: "A",
      explanation: "a = v(dv/dx) = [k x^(−n)] [−n k x^(−n − 1)] = −n k² x^(−2n − 1).\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 30,
    question: "If the velocity of a particle is v = At + Bt², where A and B are constants, then the distance travelled by it between 1 s and 2 s is: [NEET 2016 Phase 1]",
    optionA: "(3/2)A + (7/3)B",
    optionB: "A/2 + B/3",
    optionC: "(3/2)A + 4B",
    optionD: "3A + 7B",
    correctOption: "A",
    explanation: "Velocity is the rate of change of displacement: v = ds/dt.\nThe distance travelled between t = 1 s and t = 2 s is:\ns = ∫₁² v dt = ∫₁² (At + Bt²) dt\ns = [ (A t² / 2) + (B t³ / 3) ]₁²\ns = [ (A/2)(2² − 1²) + (B/3)(2³ − 1³) ]\ns = [ (A/2)(4 − 1) + (B/3)(8 − 1) ] = (3/2)A + (7/3)B.\nTherefore, Option (A) is the correct answer.",
    similarQuestion: {
      question: "The velocity of a particle is v = 2t + 3t². The distance covered by it between t = 0 and t = 2 s is:",
      option_a: "12 m",
      option_b: "10 m",
      option_c: "8 m",
      option_d: "14 m",
      correct_option: "A",
      explanation: "s = ∫₀² (2t + 3t²) dt = [t² + t³]₀² = (2² + 2³) − 0 = 4 + 8 = 12 m.\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 29,
    question: "Two cars P and Q start from a point at the same time in a straight line and their positions are represented by x_P(t) = at + bt² and x_Q(t) = ft − t². At what time do the cars have the same velocity? [NEET 2016 Phase 2]",
    optionA: "(a − f) / (1 + b)",
    optionB: "(a + f) / [2(b − 1)]",
    optionC: "(a + f) / [2(1 + b)]",
    optionD: "(f − a) / [2(1 + b)]",
    correctOption: "D",
    explanation: "1. Velocity of car P: v_P = dx_P/dt = d/dt(at + bt²) = a + 2bt.\n2. Velocity of car Q: v_Q = dx_Q/dt = d/dt(ft − t²) = f − 2t.\nWhen the two cars have the same velocity:\nv_P = v_Q\na + 2bt = f − 2t\n2bt + 2t = f − a\n2t (b + 1) = f − a\nt = (f − a) / [ 2(1 + b) ].\nTherefore, Option (D) is the correct answer.",
    similarQuestion: {
      question: "Two particles A and B have positions x_A = 2t + 3t² and x_B = 10t − t². At what time will both particles have the same velocity?",
      option_a: "1 s",
      option_b: "2 s",
      option_c: "0.5 s",
      option_d: "1.5 s",
      correct_option: "A",
      explanation: "v_A = 2 + 6t, v_B = 10 − 2t. 2 + 6t = 10 − 2t ⇒ 8t = 8 ⇒ t = 1 s.\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 28,
    question: "Preeti reached the metro station and found that the escalator was not working. She walked up the stationary escalator in time t₁. On other days, if she remains stationary on the moving escalator, the escalator takes her up in time t₂. The time taken by her to walk up on the moving escalator will be: [NEET 2017]",
    optionA: "(t₁ t₂) / (t₂ − t₁)",
    optionB: "(t₁ t₂) / (t₂ + t₁)",
    optionC: "t₁ − t₂",
    optionD: "(t₁ + t₂) / 2",
    correctOption: "B",
    explanation: "Let the length of the escalator be L.\n1. Velocity of Preeti walking on stationary escalator: v₁ = L / t₁.\n2. Velocity of the moving escalator: v₂ = L / t₂.\n3. When Preeti walks up the moving escalator, both velocities add up:\nv_net = v₁ + v₂ = (L / t₁) + (L / t₂) = L [ (t₁ + t₂) / (t₁ t₂) ].\nTherefore, the time t taken by her to walk up on the moving escalator is:\nt = L / v_net = L / [ L (t₁ + t₂) / (t₁ t₂) ] = (t₁ t₂) / (t₁ + t₂).\nTherefore, Option (B) is the correct answer.",
    similarQuestion: {
      question: "A passenger walks up a stalled escalator in 90 s. When standing on the moving escalator, it takes 60 s to reach the top. How long will it take for the passenger to walk up the moving escalator?",
      option_a: "36 s",
      option_b: "30 s",
      option_c: "45 s",
      option_d: "75 s",
      correct_option: "A",
      explanation: "t = (t₁ t₂) / (t₁ + t₂) = (90 × 60) / (90 + 60) = 5400 / 150 = 36 s.\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 27,
    question: "A toy car with charge q moves on a frictionless horizontal plane under the action of a uniform electric field E. Due to the force qE, its velocity increases from 0 to 6 m/s in one second. At that instant, the direction of the field is reversed. The car continues to move for two more seconds under this field. The average velocity and average speed between 0 to 3 seconds are respectively: [NEET 2018]",
    optionA: "2 m/s, 4 m/s",
    optionB: "1 m/s, 3 m/s",
    optionC: "1 m/s, 3.5 m/s",
    optionD: "1.5 m/s, 3 m/s",
    correctOption: "B",
    explanation: "1. In the first interval (t = 0 to 1 s):\nInitial velocity u = 0, final velocity v = 6 m/s.\nAcceleration a₁ = (6 − 0) / 1 = +6 m/s².\nDisplacement s₁ = (1/2) a₁ t² = (1/2) × 6 × (1)² = +3 m.\nDistance d₁ = 3 m.\n2. At t = 1 s, field is reversed, so acceleration becomes a₂ = −6 m/s².\n- The car decelerates from 6 m/s to 0 m/s in time Δt = (0 − 6) / (−6) = 1 s (i.e. at t = 2 s).\nDisplacement in this second: s₂ = [ (6 + 0) / 2 ] × 1 = +3 m.\nDistance d₂ = 3 m.\n- From t = 2 s to t = 3 s (duration 1 s), the car moves backward from rest with acceleration −6 m/s²:\nDisplacement s₃ = (1/2)(−6)(1)² = −3 m.\nDistance d₃ = |−3| = 3 m.\n3. Net totals from t = 0 to 3 s:\nTotal displacement = s₁ + s₂ + s₃ = 3 + 3 − 3 = +3 m.\nTotal distance = d₁ + d₂ + d₃ = 3 + 3 + 3 = 9 m.\nTotal time = 3 s.\nAverage velocity = (Total displacement) / (Total time) = 3 m / 3 s = 1 m/s.\nAverage speed = (Total distance) / (Total time) = 9 m / 3 s = 3 m/s.\nTherefore, Option (B) is the correct answer.",
    similarQuestion: {
      question: "A particle moves with constant acceleration 2 m/s² for 2 s, then with −2 m/s² for the next 2 s. The ratio of average speed to the magnitude of average velocity over the 4 s interval is:",
      option_a: "1 : 1",
      option_b: "2 : 1",
      option_c: "4 : 1",
      option_d: "1 : 2",
      correct_option: "A",
      explanation: "From t = 0 to 2: v increases from 0 to 4 m/s, s = 4 m. From t = 2 to 4: v decreases from 4 to 0 m/s, s = 4 m. No reversal occurs during this time. Total distance = 8 m, displacement = 8 m. Ratio = 1 : 1.\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 26,
    question: "A ball thrown vertically downward with a velocity of 20 m/s from the top of a tower hits the ground after some time with a velocity of 80 m/s. The height of the tower is: (Take g = 10 m/s²) [NEET 2020 Phase 1]",
    optionA: "340 m",
    optionB: "320 m",
    optionC: "300 m",
    optionD: "360 m",
    correctOption: "C",
    explanation: "For vertically downward motion under gravity:\nInitial velocity u = 20 m/s\nFinal velocity v = 80 m/s\nAcceleration a = g = 10 m/s²\nUsing the third kinematic equation:\nv² = u² + 2gh\n(80)² = (20)² + 2(10)h\n6400 = 400 + 20h\n20h = 6400 − 400 = 6000\nh = 6000 / 20 = 300 m.\nTherefore, Option (C) is the correct answer.",
    similarQuestion: {
      question: "A ball is thrown downwards from a tower of height 100 m with initial speed 10 m/s. Its speed when it hits the ground is (g = 10 m/s²):",
      option_a: "45.8 m/s",
      option_b: "40 m/s",
      option_c: "50 m/s",
      option_d: "30 m/s",
      correct_option: "A",
      explanation: "v = √(u² + 2gh) = √(100 + 2000) = √2100 ≈ 45.8 m/s.\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 25,
    question: "A small block slides down a smooth inclined plane starting from rest at time t = 0. Let S_n be the distance travelled in the interval t = n − 1 to t = n. Then the ratio S_n / S_(n+1) is: [NEET 2021]",
    optionA: "2n / (2n − 1)",
    optionB: "(2n − 1) / 2n",
    optionC: "(2n − 1) / (2n + 1)",
    optionD: "(2n + 1) / (2n − 1)",
    correctOption: "C",
    explanation: "For motion starting from rest (u = 0) down a smooth incline with constant acceleration a = g sin θ:\nThe distance travelled in the n-th second (interval from t = n − 1 to t = n) is:\nS_n = u + (a/2)(2n − 1) = (a/2)(2n − 1).\nThe distance travelled in the (n + 1)-th second (interval from t = n to t = n + 1) is:\nS_(n+1) = u + (a/2)[2(n + 1) − 1] = (a/2)(2n + 2 − 1) = (a/2)(2n + 1).\nTaking the ratio:\nS_n / S_(n+1) = [ (a/2)(2n − 1) ] / [ (a/2)(2n + 1) ] = (2n − 1) / (2n + 1).\nTherefore, Option (C) is the correct answer.",
    similarQuestion: {
      question: "A body sliding down a smooth inclined plane starts from rest. The ratio of the distance travelled in the 4th second to that in the 5th second is:",
      option_a: "7 / 9",
      option_b: "4 / 5",
      option_c: "9 / 7",
      option_d: "16 / 25",
      correct_option: "A",
      explanation: "S_n / S_(n+1) = (2n − 1)/(2n + 1). For n = 4: S₄ / S₅ = (2 × 4 − 1)/(2 × 4 + 1) = 7/9.\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 24,
    question: "The displacement-time graphs of two moving particles make angles 30° and 45° with the time axis (x-axis). The ratio of their respective velocities is: [NEET 2022 Phase 1]",
    optionA: "√3 : 1",
    optionB: "1 : 1",
    optionC: "1 : 2",
    optionD: "1 : √3",
    correctOption: "D",
    explanation: "In a displacement-time (s-t) graph, the velocity v is equal to the slope of the tangent to the curve:\nv = ds / dt = tan θ,\nwhere θ is the angle made by the line with the time axis.\nGiven:\nθ₁ = 30° ⇒ v₁ = tan 30° = 1 / √3.\nθ₂ = 45° ⇒ v₂ = tan 45° = 1.\nThe ratio of their velocities is:\nv₁ / v₂ = (tan 30°) / (tan 45°) = (1 / √3) / 1 = 1 / √3 = 1 : √3.\nTherefore, Option (D) is the correct answer.",
    similarQuestion: {
      question: "The position-time graphs of two particles A and B make angles of 45° and 60° with the time axis respectively. The ratio of velocity of A to that of B is:",
      option_a: "1 : √3",
      option_b: "√3 : 1",
      option_c: "1 : 3",
      option_d: "3 : 1",
      correct_option: "A",
      explanation: "v_A / v_B = tan 45° / tan 60° = 1 / √3.\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 23,
    question: "The ratio of distances travelled by a freely falling body in 1st, 2nd, 3rd and 4th second is: [NEET 2022 Phase 1]",
    optionA: "1 : 2 : 3 : 4",
    optionB: "1 : 4 : 9 : 16",
    optionC: "1 : 3 : 5 : 7",
    optionD: "1 : 1 : 1 : 1",
    correctOption: "C",
    explanation: "For a body falling freely from rest (u = 0), the distance travelled in the n-th second is given by:\ns_n = u + (g/2)(2n − 1) = (g/2)(2n − 1).\nSubstituting n = 1, 2, 3, 4:\n- For n = 1: s₁ = (g/2)(2(1) − 1) = 1 × (g/2)\n- For n = 2: s₂ = (g/2)(2(2) − 1) = 3 × (g/2)\n- For n = 3: s₃ = (g/2)(2(3) − 1) = 5 × (g/2)\n- For n = 4: s₄ = (g/2)(2(4) − 1) = 7 × (g/2)\nTaking the ratio:\ns₁ : s₂ : s₃ : s₄ = 1 : 3 : 5 : 7.\nThis is Galileo's law of odd numbers.\nTherefore, Option (C) is the correct answer.",
    similarQuestion: {
      question: "A ball dropped from rest covers distances s₁, s₂, s₃ in the 1st, 3rd, and 5th seconds of its fall. The ratio s₁ : s₂ : s₃ is:",
      option_a: "1 : 5 : 9",
      option_b: "1 : 3 : 5",
      option_c: "1 : 9 : 25",
      option_d: "1 : 2 : 3",
      correct_option: "A",
      explanation: "s_n ∝ (2n − 1). For n = 1, 3, 5: (2 × 1 − 1) : (2 × 3 − 1) : (2 × 5 − 1) = 1 : 5 : 9.\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 22,
    question: "The position-time (x-t) graph for positive acceleration is: [NEET 2022 Phase 2]",
    optionA: "A straight line inclined to the time axis",
    optionB: "A parabolic curve opening upwards (concave upwards)",
    optionC: "A parabolic curve opening downwards (concave downwards)",
    optionD: "A straight line parallel to the time axis",
    correctOption: "B",
    explanation: "For motion in one dimension, velocity is v = dx/dt (slope of x-t curve) and acceleration is a = d²x/dt² (curvature of x-t curve).\n- If acceleration is positive (a > 0), the second derivative d²x/dt² > 0.\nThis mathematically corresponds to a curve that is concave upwards (opening upwards like a cup or upward parabola).\n- If a < 0, the curve is concave downwards.\n- If a = 0, the graph is a straight line.\nTherefore, a parabolic curve opening upwards represents positive acceleration.\nTherefore, Option (B) is the correct answer.",
    similarQuestion: {
      question: "Which feature of a position-time (x-t) graph indicates that the particle is undergoing negative acceleration (retardation)?",
      option_a: "The slope is constantly decreasing (concave downwards curve)",
      option_b: "The curve is a straight line",
      option_c: "The curve is concave upwards",
      option_d: "The graph is parallel to the displacement axis",
      correct_option: "A",
      explanation: "For negative acceleration, d²x/dt² < 0, which means the slope (velocity) is continuously decreasing and the graph curves concave downwards.\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 21,
    question: "A vehicle travels half of the distance with speed v and the remaining distance with speed 2v. Its average speed is: [NEET 2023]",
    optionA: "2v / 3",
    optionB: "4v / 3",
    optionC: "3v / 4",
    optionD: "v / 3",
    correctOption: "B",
    explanation: "Let the total distance be 2d.\nTime for the first half distance d at speed v: t₁ = d / v.\nTime for the remaining distance d at speed 2v: t₂ = d / (2v).\nTotal time taken T = t₁ + t₂ = d/v + d/(2v) = (3d) / (2v).\nAverage speed = (Total distance) / (Total time) = 2d / [ (3d) / (2v) ] = 2d × [ 2v / (3d) ] = 4v / 3.\nTherefore, Option (B) is the correct answer.",
    similarQuestion: {
      question: "A cyclist travels one-third of a distance at speed v and the remaining two-thirds at speed 2v. The average speed of the cyclist is:",
      option_a: "3v / 2",
      option_b: "4v / 3",
      option_c: "5v / 3",
      option_d: "6v / 5",
      correct_option: "A",
      explanation: "Let total distance be 3d. t₁ = d/v, t₂ = 2d/(2v) = d/v. Total time = 2d/v. Average speed = 3d / (2d/v) = 3v / 2.\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 20,
    question: "The position of a particle is given by r(t) = 4t î + 2t² ĵ + 5 k̂, where t is in seconds and r in metres. Find the magnitude and direction of the velocity v(t) at t = 1 s with respect to the x-axis. [NEET 2023 Manipur]",
    optionA: "4√2 m/s, 45°",
    optionB: "4√2 m/s, 60°",
    optionC: "3√2 m/s, 30°",
    optionD: "3√2 m/s, 45°",
    correctOption: "A",
    explanation: "Given position vector r(t) = 4t î + 2t² ĵ + 5 k̂.\nVelocity vector is the time-derivative of position:\nv(t) = dr/dt = (d/dt(4t)) î + (d/dt(2t²)) ĵ + (d/dt(5)) k̂ = 4 î + 4t ĵ + 0 k̂.\nAt t = 1 s:\nv(1) = 4 î + 4(1) ĵ = 4 î + 4 ĵ m/s.\n1. Magnitude of velocity:\n|v| = √(4² + 4²) = √(16 + 16) = √32 = 4√2 m/s.\n2. Direction with respect to the x-axis:\ntan θ = v_y / v_x = 4 / 4 = 1 ⇒ θ = 45°.\nThus, the velocity has magnitude 4√2 m/s and is directed at 45° to the x-axis.\nTherefore, Option (A) is the correct answer.",
    similarQuestion: {
      question: "The position of a body is r = 3t î + 3t² ĵ m. The magnitude and angle of its velocity with the x-axis at t = 1 s are:",
      option_a: "3√5 m/s, tan⁻¹(2)",
      option_b: "6 m/s, 45°",
      option_c: "3√2 m/s, 45°",
      option_d: "5 m/s, tan⁻¹(4/3)",
      correct_option: "A",
      explanation: "v = 3 î + 6t ĵ. At t = 1, v = 3 î + 6 ĵ. |v| = √(9 + 36) = √45 = 3√5 m/s. tan θ = 6/3 = 2 ⇒ θ = tan⁻¹(2).\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 19,
    question: "The velocity (v)-time (t) plot of motion of a body is shown. The acceleration (a)-time (t) graph that best suits this motion is: [NEET 2024]",
    optionA: "Line with continuously increasing acceleration",
    optionB: "Continuous non-zero positive acceleration",
    optionC: "Constant positive acceleration, followed by zero acceleration, followed by constant negative acceleration",
    optionD: "Zero acceleration throughout",
    correctOption: "C",
    explanation: "Acceleration is the derivative (slope) of the velocity-time graph: a = dv/dt.\n1. During the initial phase where velocity increases linearly with time, the slope dv/dt is positive and constant, corresponding to a horizontal line at a constant positive acceleration.\n2. During the middle phase where velocity remains uniform (horizontal line on v-t graph), the slope dv/dt = 0, so acceleration is zero.\n3. During the final phase where velocity decreases linearly with time, the slope dv/dt is negative and constant, corresponding to a horizontal line at a constant negative acceleration.\nThus, the matching a-t plot shows positive constant acceleration, followed by zero, followed by negative constant acceleration.\nTherefore, Option (C) is the correct answer.",
    similarQuestion: {
      question: "If the velocity of a particle increases linearly from 0 to 10 m/s in 2 s, remains at 10 m/s for 3 s, and drops linearly to 0 in 2 s, the acceleration during the middle 3 s interval is:",
      option_a: "Zero",
      option_b: "5 m/s²",
      option_c: "−5 m/s²",
      option_d: "10 m/s²",
      correct_option: "A",
      explanation: "When velocity is constant, dv/dt = 0, so acceleration is zero.\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 18,
    question: "A particle is moving along the x-axis with position x = αt⁴ + βt² + γt + δ. The ratio of initial velocity to initial acceleration respectively is: [NEET 2024 Re-Examination]",
    optionA: "2α : δ",
    optionB: "γ : 2δ",
    optionC: "4α : β",
    optionD: "γ : 2β",
    correctOption: "D",
    explanation: "Given position x(t) = αt⁴ + βt² + γt + δ.\n1. Velocity: v(t) = dx/dt = 4αt³ + 2βt + γ.\nInitial velocity (at t = 0): v₀ = 4α(0)³ + 2β(0) + γ = γ.\n2. Acceleration: a(t) = dv/dt = 12αt² + 2β.\nInitial acceleration (at t = 0): a₀ = 12α(0)² + 2β = 2β.\n3. Ratio of initial velocity to initial acceleration:\nv₀ / a₀ = γ / 2β = γ : 2β.\nTherefore, Option (D) is the correct answer.",
    similarQuestion: {
      question: "The position of a particle moving in a straight line is x = at³ + bt² + ct + d. The ratio of its initial velocity to initial acceleration is:",
      option_a: "c : 2b",
      option_b: "c : b",
      option_c: "2c : b",
      option_d: "3a : 2b",
      correct_option: "A",
      explanation: "v = 3at² + 2bt + c ⇒ v₀ = c. a = 6at + 2b ⇒ a₀ = 2b. Ratio = c : 2b.\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 17,
    question: "Two cities X and Y are connected by a regular bus service with a bus leaving in either direction every T min. A girl driving a scooty at 60 km/h from X to Y notices that a bus goes past her every 30 min in the direction of her motion and every 10 min in the opposite direction. Choose the correct option for the period T and speed of the buses. [NEET 2025]",
    optionA: "10 min, 90 km/h",
    optionB: "15 min, 120 km/h",
    optionC: "9 min, 40 km/h",
    optionD: "25 min, 100 km/h",
    correctOption: "B",
    explanation: "Let the speed of each bus be V km/h and speed of scooty be v = 60 km/h.\nThe distance between consecutive buses in either direction is d = V × (T / 60) km.\n1. For buses moving in the direction of the girl:\nRelative speed = V − v = V − 60.\nTime interval t₁ = 30 min = 30/60 h = 1/2 h.\nDistance: d = (V − 60) × (1/2).\n2. For buses moving in the opposite direction:\nRelative speed = V + v = V + 60.\nTime interval t₂ = 10 min = 10/60 h = 1/6 h.\nDistance: d = (V + 60) × (1/6).\n3. Equating both expressions for d:\n(V − 60) / 2 = (V + 60) / 6\n3(V − 60) = V + 60\n3V − 180 = V + 60\n2V = 240 ⇒ V = 120 km/h.\n4. Substituting V into the expression for d:\nd = (120 − 60) / 2 = 60 / 2 = 30 km.\nAlso d = V × (T / 60) = 120 × (T / 60) = 2T.\n2T = 30 ⇒ T = 15 min.\nThus, T = 15 min and speed of buses = 120 km/h.\nTherefore, Option (B) is the correct answer.",
    similarQuestion: {
      question: "A bus leaves a station every T minutes. A cyclist moving at 20 km/h in the same direction is passed by a bus every 20 minutes, and a bus passes him in the opposite direction every 10 minutes. The speed of the bus is:",
      option_a: "60 km/h",
      option_b: "40 km/h",
      option_c: "80 km/h",
      option_d: "50 km/h",
      correct_option: "A",
      explanation: "(V − 20)(20) = (V + 20)(10) ⇒ 2(V − 20) = V + 20 ⇒ 2V − 40 = V + 20 ⇒ V = 60 km/h.\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 16,
    question: "In some appropriate units, the time (t) and position (x) relation of a moving particle is given by t = x² + x. The acceleration of the particle is: [NEET 2025]",
    optionA: "+2/(x+1)³",
    optionB: "+2/(2x+1)",
    optionC: "−2/(x+2)³",
    optionD: "−2/(2x+1)³",
    correctOption: "D",
    explanation: "Given relation: t = x² + x.\nDifferentiating both sides with respect to time t:\nd/dt(t) = d/dt(x² + x)\n1 = (2x + 1) (dx/dt) = (2x + 1) v.\nTherefore, velocity v is:\nv = 1 / (2x + 1) = (2x + 1)⁻¹.\nNow acceleration a is given by a = v (dv/dx):\ndv/dx = d/dx [ (2x + 1)⁻¹ ] = −1 (2x + 1)⁻² × (2) = −2 / (2x + 1)².\nTherefore:\na = v (dv/dx) = [ 1 / (2x + 1) ] × [ −2 / (2x + 1)² ] = −2 / (2x + 1)³.\nTherefore, Option (D) is the correct answer.",
    similarQuestion: {
      question: "If t = α x² + β x, the acceleration of the particle in terms of velocity v is:",
      option_a: "−2α v³",
      option_b: "−2α v²",
      option_c: "2α v³",
      option_d: "−α v²",
      correct_option: "A",
      explanation: "dt/dx = 2αx + β = 1/v ⇒ v = (2αx + β)⁻¹. dv/dx = −2α(2αx + β)⁻² = −2α v². a = v(dv/dx) = −2α v³.\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 15,
    question: "When a ruler falls vertically, 5 different persons catch it with different reaction times (g = 9.8 m/s²): Person A 0.20 s, B 0.22 s, C 0.18 s, D 0.19 s, E 0.21 s. What is the correct order of distance travelled by the ruler? [NEET 2026]",
    optionA: "B > E > A > C > D",
    optionB: "C > D > A > B > E",
    optionC: "B > E > A > D > C",
    optionD: "C > D > A > E > B",
    correctOption: "C",
    explanation: "When a ruler is dropped from rest, the distance it falls vertically before being caught in reaction time t is:\nd = (1/2) g t².\nSince g is constant, distance fallen is directly proportional to the square of the reaction time: d ∝ t².\nA larger reaction time means the ruler falls through a strictly greater distance.\nOrdering the reaction times from largest to smallest:\nt_B (0.22 s) > t_E (0.21 s) > t_A (0.20 s) > t_D (0.19 s) > t_C (0.18 s).\nTherefore, the distances fallen follow the identical order:\nB > E > A > D > C.\nTherefore, Option (C) is the correct answer.",
    similarQuestion: {
      question: "In a reaction time test, a student catches a dropped ruler after it falls 19.6 cm. What is the student's reaction time? (g = 9.8 m/s²)",
      option_a: "0.20 s",
      option_b: "0.10 s",
      option_c: "0.40 s",
      option_d: "0.02 s",
      correct_option: "A",
      explanation: "d = 0.196 m. d = (1/2)gt² ⇒ 0.196 = (1/2)(9.8)t² = 4.9 t² ⇒ t² = 0.196 / 4.9 = 0.04 ⇒ t = 0.20 s.\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 14,
    question: "The following plots show variation of velocity (v) with time (t) of a ball thrown vertically upward, and falling back. Which of the following plots is/are correct? [NEET 2026]",
    optionA: "D only",
    optionB: "C only",
    optionC: "B only",
    optionD: "A and E only",
    correctOption: "B",
    explanation: "For a ball thrown vertically upward with initial velocity +u under uniform downward gravitational acceleration (−g):\n1. The equation of velocity as a function of time is:\nv(t) = u − gt.\n2. This represents a straight line with:\n- Initial positive velocity (+u) at t = 0.\n- Constant negative slope equal to −g.\n- Velocity passing through zero (v = 0) at the peak height t = u/g.\n- Velocity becoming continuously negative during descent, reaching −u upon returning to the launch point.\nPlot C correctly depicts this single continuous straight line with constant negative slope.\nTherefore, Option (B) is the correct answer.",
    similarQuestion: {
      question: "Which of the following graphs represents the speed-time graph of a ball thrown vertically upward and caught at the same level?",
      option_a: "A V-shaped curve touching zero at peak time",
      option_b: "A straight horizontal line",
      option_c: "A straight line crossing the time axis",
      option_d: "A circle",
      correct_option: "A",
      explanation: "Speed is the scalar magnitude |v| = |u − gt|. It decreases linearly to zero at the peak, then increases linearly back to u, forming a V-shaped curve.\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 13,
    question: "Consider a particle moving along a straight line, whose position as a function of time is given by s(t) = αt² − βt + γ, where α = 1 m s⁻², β = 6 m s⁻¹ and γ = 5 m. The average speed of the particle, in m s⁻¹, from t = 0 to t = 6 s is: [RE-NEET 2026]",
    optionA: "0",
    optionB: "12",
    optionC: "6",
    optionD: "3",
    correctOption: "D",
    explanation: "Given position s(t) = t² − 6t + 5.\n1. Velocity: v(t) = ds/dt = 2t − 6.\nThe particle reverses direction when v(t) = 0:\n2t − 6 = 0 ⇒ t = 3 s.\n2. Position coordinates at t = 0, 3, and 6 s:\n- At t = 0: s(0) = 0² − 6(0) + 5 = 5 m.\n- At t = 3: s(3) = 3² − 6(3) + 5 = 9 − 18 + 5 = −4 m.\n- At t = 6: s(6) = 6² − 6(6) + 5 = 36 − 36 + 5 = 5 m.\n3. Total distance travelled:\n- From t = 0 to 3 s: d₁ = |s(3) − s(0)| = |−4 − 5| = 9 m.\n- From t = 3 to 6 s: d₂ = |s(6) − s(3)| = |5 − (−4)| = 9 m.\nTotal distance = d₁ + d₂ = 9 + 9 = 18 m.\n4. Average speed = (Total distance) / (Total time) = 18 m / 6 s = 3 m s⁻¹.\nTherefore, Option (D) is the correct answer.",
    similarQuestion: {
      question: "A particle moves along a straight line with position x = t² − 4t. The average speed between t = 0 and t = 4 s is:",
      option_a: "2 m/s",
      option_b: "0 m/s",
      option_c: "4 m/s",
      option_d: "1 m/s",
      correct_option: "A",
      explanation: "v = 2t − 4 = 0 at t = 2 s. x(0) = 0, x(2) = −4, x(4) = 0. Distance = |−4 − 0| + |0 − (−4)| = 4 + 4 = 8 m. Average speed = 8/4 = 2 m/s.\nTherefore, Option (A) is the correct answer."
    }
  }
];

async function run() {
  console.log('Logging in to live API...');
  const loginRes = await request('https://api.indraprasthaneetacademy.com/api/admin/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' }
  }, { username: 'indraprasthaadmin', password: 'indraprastha@123' });

  if (!loginRes.data || !loginRes.data.token) {
    console.error('Login failed:', loginRes);
    process.exit(1);
  }

  const token = loginRes.data.token;
  console.log(`Login successful! Updating ${pyqsData.length} PYQs in Chapter 68 (Motion in a Straight Line)...`);

  for (let i = 0; i < pyqsData.length; i++) {
    const item = pyqsData[i];
    console.log(`[${i + 1}/${pyqsData.length}] Updating PYQ ID ${item.id}...`);

    const updatePayload = {
      question: item.question,
      optionA: item.optionA,
      optionB: item.optionB,
      optionC: item.optionC,
      optionD: item.optionD,
      correctOption: item.correctOption,
      explanation: item.explanation,
      similarQuestion: item.similarQuestion
    };

    const res = await request(`https://api.indraprasthaneetacademy.com/api/admin/pyqs/${item.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    }, updatePayload);

    if (res.data && res.data.success) {
      console.log(`  -> PYQ ${item.id} updated successfully with high-yield Similar Question!`);
    } else {
      console.error(`  -> Failed to update PYQ ${item.id}:`, res);
      process.exit(1);
    }
  }

  console.log(`\n🎉 COMPLETED: ${pyqsData.length}/${pyqsData.length} PYQs in Chapter 68 (Motion in a Straight Line) updated live!`);
}

run().catch(console.error);

