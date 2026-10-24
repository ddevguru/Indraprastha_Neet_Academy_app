const https = require('https');

const ADMIN_CREDENTIALS = {
  username: 'indraprasthaadmin',
  password: 'indraprastha@123'
};

const BASE_URL = 'api.indraprasthaneetacademy.com';

function login() {
  return new Promise((resolve, reject) => {
    const data = JSON.stringify(ADMIN_CREDENTIALS);
    const req = https.request({
      hostname: BASE_URL,
      path: '/api/admin/login',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(data)
      }
    }, res => {
      let body = '';
      res.on('data', chunk => body += chunk);
      res.on('end', () => {
        try {
          const json = JSON.parse(body);
          if (json.token) resolve(json.token);
          else reject(new Error('Login failed: ' + body));
        } catch (e) { reject(e); }
      });
    });
    req.on('error', reject);
    req.write(data);
    req.end();
  });
}

function updateQuestion(token, id, similarData) {
  return new Promise((resolve, reject) => {
    const data = JSON.stringify({ similarQuestion: similarData });
    const req = https.request({
      hostname: BASE_URL,
      path: `/api/admin/practice-questions/${id}`,
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
        'Content-Length': Buffer.byteLength(data)
      }
    }, res => {
      let body = '';
      res.on('data', chunk => body += chunk);
      res.on('end', () => {
        if (res.statusCode >= 200 && res.statusCode < 300) resolve(body);
        else reject(new Error(`Failed to update ${id} [${res.statusCode}]: ${body}`));
      });
    });
    req.on('error', reject);
    req.write(data);
    req.end();
  });
}

const part2Questions = [
  {
    id: 3104,
    data: {
      question: "In a circuit network, two parallel branches are connected across a 12 V battery. Branch 1 contains two 4 Ω resistors in series with midpoint X. Branch 2 contains an 8 Ω resistor and a 4 Ω resistor in series with midpoint Y (with the 8 Ω resistor connected to the positive terminal). What is the potential difference (V_X − V_Y)?",
      option_a: "2.0 V",
      option_b: "4.0 V",
      option_c: "6.0 V",
      option_d: "Zero",
      correct_option: "A",
      explanation: "Step 1: Set the negative terminal of the 12 V battery at 0 V and the positive terminal at +12 V.\n\nStep 2: In Branch 1, two identical 4 Ω resistors divide the voltage equally:\nV_X = 12 V × [ 4 / (4 + 4) ] = 12 × (1 / 2) = 6.0 V.\n\nStep 3: In Branch 2, current is I₂ = 12 V / (8 + 4) = 1.0 A. The potential at midpoint Y above the negative terminal is:\nV_Y = I₂ × 4 Ω = 1.0 A × 4 Ω = 4.0 V.\n\nStep 4: The potential difference between X and Y is:\nV_X − V_Y = 6.0 V − 4.0 V = 2.0 V.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 3105,
    data: {
      question: "A 24 V battery is connected across an 11 Ω external load resistor, resulting in a current of 2.0 A in the circuit. What is the internal resistance of the battery?",
      option_a: "1.0 Ω",
      option_b: "0.5 Ω",
      option_c: "2.0 Ω",
      option_d: "1.5 Ω",
      correct_option: "A",
      explanation: "Step 1: The circuit equation relating EMF, total resistance, and current is:\nI = E / (R + r).\n\nStep 2: Rearranging to solve for internal resistance r:\nR + r = E / I => r = (E / I) − R.\n\nStep 3: Substitute the given values:\nE = 24 V, I = 2.0 A, and R = 11 Ω:\nr = (24 / 2.0) − 11 = 12 − 11 = 1.0 Ω.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 3106,
    data: {
      question: "Which of the following factors affects the internal resistance of an electrochemical cell?",
      option_a: "All of these (electrode separation, surface area of electrodes immersed, electrolyte concentration and temperature)",
      option_b: "Only the distance of separation between the electrodes",
      option_c: "Only the cross-sectional area of the immersed electrodes",
      option_d: "Only the chemical EMF of the cell",
      correct_option: "A",
      explanation: "Step 1: Internal resistance r arises from the resistance offered by the electrolytic solution to the migration of ions between the two electrodes.\n\nStep 2: By the resistance law r = ρ (d / A), internal resistance is directly proportional to electrode separation d and inversely proportional to immersed electrode area A.\n\nStep 3: Furthermore, the resistivity ρ of the electrolyte depends directly on ionic concentration and decreases with increasing temperature.\nThus, all these factors determine the internal resistance.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 3107,
    data: {
      question: "Two identical cells, each of EMF E and internal resistance r, send the exact same current through an external load resistor of 5 Ω whether connected in series or in parallel. What is the internal resistance r of each cell?",
      option_a: "5 Ω",
      option_b: "2.5 Ω",
      option_c: "10 Ω",
      option_d: "1 Ω",
      correct_option: "A",
      explanation: "Step 1: Current through load R when two cells are in series:\nI_series = (2E) / (R + 2r).\n\nStep 2: Current through load R when two cells are in parallel:\nI_parallel = E / [ R + r / 2 ] = (2E) / (2R + r).\n\nStep 3: Equating I_series = I_parallel:\n(2E) / (R + 2r) = (2E) / (2R + r) => R + 2r = 2R + r.\n\nStep 4: Simplifying:\n2r − r = 2R − R => r = R.\nSince external resistance R = 5 Ω, the internal resistance is r = 5 Ω.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 3108,
    data: {
      question: "At an electrical junction in a DC circuit, three currents of 4.0 A, 3.0 A, and 2.5 A flow toward the junction, while two branches leave the junction, one carrying 5.0 A and the other carrying current i. What is the value of current i?",
      option_a: "4.5 A",
      option_b: "9.5 A",
      option_c: "3.5 A",
      option_d: "2.0 A",
      correct_option: "A",
      explanation: "Step 1: Kirchhoff's First Law (Junction Rule) states that the sum of currents entering a junction equals the sum of currents leaving it:\n∑ I_in = ∑ I_out.\n\nStep 2: Currents entering the junction:\n∑ I_in = 4.0 A + 3.0 A + 2.5 A = 9.5 A.\n\nStep 3: Currents leaving the junction:\n∑ I_out = 5.0 A + i.\n\nStep 4: Equating:\n9.5 A = 5.0 A + i => i = 9.5 − 5.0 = 4.5 A.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 3109,
    data: {
      question: "When an external resistor of 4 Ω is connected across a cell, the circuit current is 1.0 A. When the external resistance is increased to 9 Ω, the current drops to 0.5 A. What is the EMF of the cell?",
      option_a: "5.0 V",
      option_b: "4.0 V",
      option_c: "6.0 V",
      option_d: "3.0 V",
      correct_option: "A",
      explanation: "Step 1: The EMF equation of a cell with internal resistance r is E = I (R + r).\n\nStep 2: Case 1 (R₁ = 4 Ω, I₁ = 1.0 A):\nE = 1.0 × (4 + r) = 4 + r.\n\nStep 3: Case 2 (R₂ = 9 Ω, I₂ = 0.5 A):\nE = 0.5 × (9 + r) = 4.5 + 0.5r.\n\nStep 4: Equating both expressions for E:\n4 + r = 4.5 + 0.5r => 0.5r = 0.5 => r = 1.0 Ω.\n\nStep 5: Compute EMF E:\nE = 4 + 1.0 = 5.0 V.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 3110,
    data: {
      question: "A battery of EMF 12 V and internal resistance 0.4 Ω is accidentally short-circuited by a connecting wire of negligible resistance. What is the short-circuit current flowing through the battery?",
      option_a: "30 A",
      option_b: "4.8 A",
      option_c: "12 A",
      option_d: "48 A",
      correct_option: "A",
      explanation: "Step 1: Under a short-circuit condition, the external load resistance is zero (R_ext = 0).\n\nStep 2: The entire resistance limiting the current is the internal resistance r of the battery:\nI_sc = E / r.\n\nStep 3: Substitute the given values:\nI_sc = 12 V / 0.4 Ω = 120 / 4 = 30 A.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 3111,
    data: {
      question: "A DC source has an EMF of 6.0 V and an internal resistance of 1.5 Ω. What is the maximum electrical power that this source can deliver to an external load resistor?",
      option_a: "6.0 W",
      option_b: "12.0 W",
      option_c: "4.0 W",
      option_d: "24.0 W",
      correct_option: "A",
      explanation: "Step 1: By the Maximum Power Transfer Theorem, maximum power is delivered to an external load when the load resistance equals the internal resistance: R_load = r.\n\nStep 2: The current under this matched condition is:\nI = E / (2r).\n\nStep 3: The maximum delivered power is:\nP_max = I² R_load = [ E / (2r) ]² × r = E² / (4r).\n\nStep 4: Substitute E = 6.0 V and r = 1.5 Ω:\nP_max = (6.0)² / [ 4 × 1.5 ] = 36 / 6.0 = 6.0 W.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 3112,
    data: {
      question: "In a single-loop circuit, two batteries of EMFs 12 V and 6 V are connected with opposing polarities across a total loop resistance of 3.0 Ω. What is the magnitude of the electric current flowing through the loop?",
      option_a: "2.0 A",
      option_b: "6.0 A",
      option_c: "1.0 A",
      option_d: "4.0 A",
      correct_option: "A",
      explanation: "Step 1: When two batteries are connected in opposition, their net EMF is the difference between their values:\nE_net = E₁ − E₂ = 12 V − 6 V = 6 V.\n\nStep 2: By Ohm's Law, the loop current is:\nI = E_net / R_total = 6 V / 3.0 Ω = 2.0 A.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 3113,
    data: {
      question: "A circuit branch has node potentials V_A = 20 V and V_B = 8 V with a 4.0 Ω resistor connected between them. What is the magnitude of the electric current flowing through the resistor?",
      option_a: "3.0 A",
      option_b: "5.0 A",
      option_c: "2.0 A",
      option_d: "7.0 A",
      correct_option: "A",
      explanation: "Step 1: The potential difference across the resistor is:\nΔV = V_A − V_B = 20 V − 8 V = 12 V.\n\nStep 2: By Ohm's Law, the current flowing from high potential to low potential is:\nI = ΔV / R = 12 V / 4.0 Ω = 3.0 A.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 3114,
    data: {
      question: "In a potentiometer experiment to determine the internal resistance of a cell, the balance point with open circuit is obtained at a wire length of 150 cm. When the cell is shunted with a 3.0 Ω resistance, the balance point shifts to 120 cm. What is the internal resistance of the cell?",
      option_a: "0.75 Ω",
      option_b: "0.50 Ω",
      option_c: "1.25 Ω",
      option_d: "1.50 Ω",
      correct_option: "A",
      explanation: "Step 1: In a potentiometer, the open-circuit balancing length l₁ is proportional to the cell EMF E:\nE ∝ l₁.\n\nStep 2: The closed-circuit balancing length l₂ when shunted by resistance R is proportional to the terminal voltage V:\nV ∝ l₂.\n\nStep 3: The internal resistance formula is:\nr = R [ (E / V) − 1 ] = R [ (l₁ / l₂) − 1 ].\n\nStep 4: Substitute R = 3.0 Ω, l₁ = 150 cm, and l₂ = 120 cm:\nr = 3.0 Ω × [ (150 / 120) − 1 ] = 3.0 × [ 1.25 − 1 ] = 3.0 × 0.25 = 0.75 Ω.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 3115,
    data: {
      question: "In a potentiometer experiment, the null balance points for two primary cells of EMFs E₁ and E₂ are obtained at wire lengths of 40 cm and 60 cm, respectively. What is the ratio E₁ : E₂?",
      option_a: "2 : 3",
      option_b: "3 : 2",
      option_c: "1 : 2",
      option_d: "4 : 9",
      correct_option: "A",
      explanation: "Step 1: In a potentiometer with a uniform potential gradient k = V / L, the EMF of a cell is balanced directly against the wire length:\nE = k × l.\n\nStep 2: For two cells balanced at lengths l₁ and l₂:\nE₁ = k l₁\nE₂ = k l₂.\n\nStep 3: Taking the ratio:\nE₁ / E₂ = l₁ / l₂ = 40 cm / 60 cm = 2 / 3 = 2 : 3.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 3116,
    data: {
      question: "In a meter bridge experiment, resistances of 20 Ω and 80 Ω are placed in the left and right gaps, respectively. If the resistances are interchanged between the two gaps, by how much does the balance point shift along the 100 cm bridge wire?",
      option_a: "60 cm",
      option_b: "40 cm",
      option_c: "50 cm",
      option_d: "20 cm",
      correct_option: "A",
      explanation: "Step 1: Balance condition for a meter bridge of wire length 100 cm:\nP / Q = l / (100 − l).\n\nStep 2: Case 1 (P = 20 Ω, Q = 80 Ω):\n20 / 80 = l₁ / (100 − l₁) => 1 / 4 = l₁ / (100 − l₁)\n100 − l₁ = 4 l₁ => 5 l₁ = 100 => l₁ = 20 cm.\n\nStep 3: Case 2 (resistors interchanged, P' = 80 Ω, Q' = 20 Ω):\n80 / 20 = l₂ / (100 − l₂) => 4 = l₂ / (100 − l₂)\n4 (100 − l₂) = l₂ => 400 − 4 l₂ = l₂ => 5 l₂ = 400 => l₂ = 80 cm.\n\nStep 4: Shift of the balance point is:\nΔl = l₂ − l₁ = 80 cm − 20 cm = 60 cm.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 3117,
    data: {
      question: "An ideal voltmeter is connected across the terminals of a 9.0 V battery that is delivering a 1.5 A current through a 5.0 Ω external resistor. If the battery has an internal resistance of 1.0 Ω, what is the terminal voltage reading on the voltmeter?",
      option_a: "7.5 V",
      option_b: "9.0 V",
      option_c: "6.0 V",
      option_d: "1.5 V",
      correct_option: "A",
      explanation: "Step 1: When a battery is discharging through a load, the terminal potential difference V is given by:\nV = E − I r.\n\nStep 2: Substitute E = 9.0 V, I = 1.5 A, and r = 1.0 Ω:\nV = 9.0 V − (1.5 A × 1.0 Ω) = 9.0 − 1.5 = 7.5 V.\n\nStep 3: Alternatively, by Ohm's Law across the load: V = I R_ext = 1.5 A × 5.0 Ω = 7.5 V.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 3118,
    data: {
      question: "A potentiometer wire of length 10 m and resistance 8.0 Ω is connected in series with a 2.0 Ω series resistor and a 4.0 V driver battery of negligible internal resistance. What is the balancing length on this wire for an EMF of 0.8 V?",
      option_a: "2.5 m",
      option_b: "4.0 m",
      option_c: "1.25 m",
      option_d: "5.0 m",
      correct_option: "A",
      explanation: "Step 1: Total primary circuit resistance is R_total = R_wire + R_series = 8.0 Ω + 2.0 Ω = 10.0 Ω.\n\nStep 2: Current through the potentiometer wire is:\nI = V_battery / R_total = 4.0 V / 10.0 Ω = 0.4 A.\n\nStep 3: Potential difference across the 10 m wire is:\nV_wire = I × R_wire = 0.4 A × 8.0 Ω = 3.2 V.\n\nStep 4: Potential gradient along the wire:\nk = V_wire / L = 3.2 V / 10 m = 0.32 V m⁻¹.\n\nStep 5: Balancing length for EMF E = 0.8 V is:\nl = E / k = 0.8 V / 0.32 V m⁻¹ = 2.5 m.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 3119,
    data: {
      question: "Two resistors of 6.0 Ω and 12.0 Ω are connected in parallel across a 12.0 V DC power supply. What is the current flowing through the 6.0 Ω resistor?",
      option_a: "2.0 A",
      option_b: "1.0 A",
      option_c: "3.0 A",
      option_d: "0.5 A",
      correct_option: "A",
      explanation: "Step 1: In a parallel circuit, the voltage across each parallel branch is identical and equals the source voltage:\nV₁ = V₂ = 12.0 V.\n\nStep 2: By Ohm's Law, the current through the 6.0 Ω resistor is:\nI₁ = V / R₁ = 12.0 V / 6.0 Ω = 2.0 A.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 3120,
    data: {
      question: "Three resistors of 6.0 Ω each are connected in a delta (triangle) configuration ABC. What is the equivalent resistance measured between any two vertices, such as A and B?",
      option_a: "4.0 Ω",
      option_b: "6.0 Ω",
      option_c: "18.0 Ω",
      option_d: "2.0 Ω",
      correct_option: "A",
      explanation: "Step 1: Between terminals A and B, resistor R_AB = 6.0 Ω is directly connected in parallel with the series combination of the other two resistors (R_AC + R_CB).\n\nStep 2: The series branch resistance is:\nR_series = 6.0 Ω + 6.0 Ω = 12.0 Ω.\n\nStep 3: The equivalent resistance between A and B is the parallel combination of 6.0 Ω and 12.0 Ω:\nR_eq = (6.0 × 12.0) / (6.0 + 12.0) = 72.0 / 18.0 = 4.0 Ω.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 3121,
    data: {
      question: "In a circuit branch containing nodes A, B, and C, node B is grounded (V_B = 0 V). Going from B to A passes through a 6 V battery (with positive terminal toward A). Going from B to C passes through a 3 Ω resistor carrying 2 A current directed toward C. What are the electric potentials V_A and V_C?",
      option_a: "V_A = +6 V and V_C = −6 V",
      option_b: "V_A = −6 V and V_C = +6 V",
      option_c: "V_A = +6 V and V_C = +6 V",
      option_d: "V_A = 0 V and V_C = −6 V",
      correct_option: "A",
      explanation: "Step 1: Going from B to A moves across the battery from negative to positive terminal, increasing potential:\nV_A = V_B + E = 0 + 6 V = +6 V.\n\nStep 2: Going from B to C follows the direction of current through the resistor, dropping potential by I R:\nV_C = V_B − I R = 0 − (2 A × 3 Ω) = −6 V.\n\nStep 3: Therefore, V_A = +6 V and V_C = −6 V.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 3122,
    data: {
      question: "Dynamic (differential) electrical resistance r_d = dV / dI is negative in which of the following devices and operational regions?",
      option_a: "In the negative-resistance operating region of a tunnel diode or Gunn diode",
      option_b: "In a standard metallic ohmic wire at constant temperature",
      option_c: "In a carbon resistor at room temperature",
      option_d: "Across a reverse-biased ideal PN junction diode",
      correct_option: "A",
      explanation: "Step 1: Dynamic resistance is defined as the slope of the voltage-current characteristic: r_d = dV / dI.\n\nStep 2: In conventional ohmic and non-ohmic conductors, an increase in voltage causes an increase in current (dV / dI > 0).\n\nStep 3: However, in specialized quantum tunneling devices like tunnel diodes and Gunn diodes, quantum effects lead to a region where current decreases as voltage increases (dI / dV < 0), giving a negative dynamic resistance (r_d < 0).\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 3123,
    data: {
      question: "For an ohmic metallic conductor of constant resistance R obeying Ohm's Law (V = I R), what is the shape and slope of a graph plotted between log(V) on the vertical axis and log(I) on the horizontal axis?",
      option_a: "A straight line with slope equal to 1",
      option_b: "A straight line with slope equal to R",
      option_c: "A parabola opening upwards",
      option_d: "An exponential curve",
      correct_option: "A",
      explanation: "Step 1: According to Ohm's Law:\nV = I × R.\n\nStep 2: Taking the natural or common logarithm on both sides:\nlog(V) = log(I × R) = log(I) + log(R).\n\nStep 3: Comparing this with the standard linear equation y = m x + c:\ny = log(V)\nx = log(I)\nm (slope) = 1\nc (intercept) = log(R).\nThus, the graph is a straight line with a constant slope of 1.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 3124,
    data: {
      question: "A steady current of 0.5 A flows through a resistor X, producing a potential difference of 6.0 V across its terminals. What is the electrical resistance of X?",
      option_a: "12 Ω",
      option_b: "3 Ω",
      option_c: "6 Ω",
      option_d: "24 Ω",
      correct_option: "A",
      explanation: "Step 1: By Ohm's Law, the resistance of a circuit element is the ratio of potential difference to electric current:\nR = V / I.\n\nStep 2: Substitute V = 6.0 V and I = 0.5 A:\nX = 6.0 V / 0.5 A = 12 Ω.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 3125,
    data: {
      question: "Two resistors of 3.0 Ω and 6.0 Ω are connected in parallel. If the electric current through the 3.0 Ω resistor is 2.0 A, what is the potential difference across the parallel combination?",
      option_a: "6.0 V",
      option_b: "12.0 V",
      option_c: "3.0 V",
      option_d: "9.0 V",
      correct_option: "A",
      explanation: "Step 1: In a parallel circuit, both resistors share the exact same potential difference across their terminals:\nV_parallel = V₁ = V₂.\n\nStep 2: By Ohm's Law across the first resistor (R₁ = 3.0 Ω, I₁ = 2.0 A):\nV_parallel = I₁ × R₁ = 2.0 A × 3.0 Ω = 6.0 V.\n\nTherefore, Option (A) is the correct answer."
    }
  }
];

async function main() {
  console.log('Logging in...');
  const token = await login();
  console.log('Logged in successfully. Updating Part 2 (Q24 to Q45)...');

  for (let i = 0; i < part2Questions.length; i++) {
    const item = part2Questions[i];
    try {
      await updateQuestion(token, item.id, item.data);
      console.log(`[${i + 1}/${part2Questions.length}] Updated Question ID ${item.id}: SUCCESS`);
    } catch (err) {
      console.error(`[${i + 1}/${part2Questions.length}] Error updating Question ID ${item.id}:`, err.message);
    }
  }
  console.log('Part 2 complete!');
}

main();
