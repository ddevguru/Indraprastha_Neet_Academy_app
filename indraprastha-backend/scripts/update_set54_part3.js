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

const part3Questions = [
  {
    id: 6051,
    data: {
      question: "In a single-loop circuit, a 24 V battery is connected across two resistors of resistances 4.0 Ω and 8.0 Ω in series. What is the electric current flowing through the circuit?",
      option_a: "2.0 A",
      option_b: "3.0 A",
      option_c: "6.0 A",
      option_d: "1.0 A",
      correct_option: "A",
      explanation: "Step 1: Total resistance in series is R_total = R₁ + R₂ = 4.0 Ω + 8.0 Ω = 12.0 Ω.\n\nStep 2: By Ohm's Law, the current is:\nI = V / R_total = 24 V / 12.0 Ω = 2.0 A.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 6052,
    data: {
      question: "Three resistors of resistances 2.0 Ω, 3.0 Ω, and 6.0 Ω are connected in parallel. What is their equivalent resistance?",
      option_a: "1.0 Ω",
      option_b: "11.0 Ω",
      option_c: "0.5 Ω",
      option_d: "2.0 Ω",
      correct_option: "A",
      explanation: "Step 1: In a parallel combination:\n1 / R_eq = 1 / 2.0 + 1 / 3.0 + 1 / 6.0.\n\nStep 2: Finding the common denominator (6.0):\n1 / R_eq = (3 + 2 + 1) / 6.0 = 6 / 6.0 = 1.0 Ω⁻¹.\n\nStep 3: Inverting gives:\nR_eq = 1.0 Ω.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 6053,
    data: {
      question: "If the electric current passing through a uniform copper wire at constant temperature is doubled, which of the following physical quantities remains strictly UNCHANGED?",
      option_a: "Conduction electron number density n",
      option_b: "Current density J",
      option_c: "Drift velocity of electrons v_d",
      option_d: "Electric field inside the wire E",
      correct_option: "A",
      explanation: "Step 1: Current density J = I / A doubles when current doubles at constant area A.\n\nStep 2: Drift speed v_d = J / (n e) and electric field E = ρ J also double proportionally.\n\nStep 3: However, conduction electron number density n is an intrinsic property of the metal determined by its atomic density and valency, and does not depend on the current flowing through it.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 6054,
    data: {
      question: "An electric heater rated at 120 V, 1200 W is accidentally connected to a 240 V AC supply line that is protected by a 15 A fuse. What will happen to the circuit?",
      option_a: "The fuse will blow (circuit will break) because the current drawn exceeds 15 A",
      option_b: "The heater will operate safely and deliver 1200 W",
      option_c: "The heater will deliver 600 W of heat",
      option_d: "The fuse will remain intact while current stays below 10 A",
      correct_option: "A",
      explanation: "Step 1: The electrical resistance of the heater is:\nR = V_rated² / P_rated = (120 V)² / 1200 W = 14,400 / 1200 = 12.0 Ω.\n\nStep 2: When connected across 240 V, the current drawn is:\nI = V / R = 240 V / 12.0 Ω = 20.0 A.\n\nStep 3: Because the drawn current (20.0 A) exceeds the fuse rating (15 A), the fuse will blow immediately.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 6055,
    data: {
      question: "A balanced Wheatstone bridge has arm resistances P = 10 Ω, Q = 50 Ω, R = 20 Ω, and S = 100 Ω. If resistance P is increased to 12 Ω, which of the following adjustments will restore the bridge balance?",
      option_a: "Increasing R by 4.0 Ω",
      option_b: "Decreasing R by 4.0 Ω",
      option_c: "Increasing S by 50 Ω",
      option_d: "Decreasing Q by 10 Ω",
      correct_option: "A",
      explanation: "Step 1: Balance condition is P' / Q = R' / S.\n\nStep 2: With P' = 12 Ω, Q = 50 Ω, and S = 100 Ω:\n12 / 50 = R' / 100 => R' = 100 × (12 / 50) = 24.0 Ω.\n\nStep 3: Since original resistance R was 20.0 Ω, R must be increased by:\nΔR = 24.0 Ω − 20.0 Ω = 4.0 Ω.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 6056,
    data: {
      question: "In a potentiometer circuit, a uniform wire AB of length 100 cm and resistance 3.0 Ω is connected in series with a 2.0 Ω resistor and a 5.0 V driver battery of negligible internal resistance. If a test cell is balanced at a wire length of 60 cm, what is the EMF of the test cell?",
      option_a: "1.80 V",
      option_b: "2.40 V",
      option_c: "3.00 V",
      option_d: "1.20 V",
      correct_option: "A",
      explanation: "Step 1: The total resistance in the driver circuit is R_total = 3.0 Ω + 2.0 Ω = 5.0 Ω.\n\nStep 2: Current through the potentiometer wire is:\nI = V / R_total = 5.0 V / 5.0 Ω = 1.0 A.\n\nStep 3: Potential difference across the 100 cm wire is:\nV_wire = I × R_wire = 1.0 A × 3.0 Ω = 3.0 V.\n\nStep 4: Potential gradient along the wire is:\nk = V_wire / L = 3.0 V / 100 cm = 0.030 V cm⁻¹.\n\nStep 5: The EMF of the cell balanced at l = 60 cm is:\nE = k × l = 0.030 V cm⁻¹ × 60 cm = 1.80 V.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 6057,
    data: {
      question: "In a potentiometer arrangement, two secondary cells of EMFs E₁ and E₂ produce null balance lengths of 45 cm and 75 cm, respectively, along the uniform potentiometer wire. What is the ratio E₁ : E₂?",
      option_a: "3 : 5",
      option_b: "5 : 3",
      option_c: "9 : 25",
      option_d: "1 : 2",
      correct_option: "A",
      explanation: "Step 1: In a potentiometer, the EMF of a cell is directly proportional to its null balancing length on the wire:\nE ∝ l.\n\nStep 2: Taking the ratio for the two cells:\nE₁ / E₂ = l₁ / l₂ = 45 cm / 75 cm = 3 / 5 = 3 : 5.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 6058,
    data: {
      question: "In a potentiometer experiment, a standard cell of EMF 1.2 V is balanced against 60 cm length of the potentiometer wire. An unknown cell is balanced against 75 cm of the same wire. What is the EMF of the unknown cell?",
      option_a: "1.50 V",
      option_b: "1.25 V",
      option_c: "1.80 V",
      option_d: "0.96 V",
      correct_option: "A",
      explanation: "Step 1: The ratio of EMFs equals the ratio of balancing lengths:\nE_unknown / E_standard = l_unknown / l_standard.\n\nStep 2: Substitute given values:\nE_unknown / 1.2 V = 75 cm / 60 cm = 5 / 4 = 1.25.\n\nStep 3: Solving for E_unknown:\nE_unknown = 1.2 V × 1.25 = 1.50 V.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 6059,
    data: {
      question: "If the heating filament wire of an electric room heater is cut short by 20% of its original length, by what percentage will the heating power increase when connected to the same voltage supply?",
      option_a: "Increases by 25%",
      option_b: "Increases by 20%",
      option_c: "Decreases by 20%",
      option_d: "Increases by 44%",
      correct_option: "A",
      explanation: "Step 1: Resistance is directly proportional to length: R ∝ L. When length is reduced by 20%, new resistance is R' = 0.80 R.\n\nStep 2: Power delivered at constant voltage V is P = V² / R.\n\nStep 3: New power is:\nP' = V² / (0.80 R) = (1 / 0.80) (V² / R) = 1.25 P.\n\nStep 4: Percentage increase in power is:\n% increase = [ (P' − P) / P ] × 100% = (1.25 − 1) × 100% = 25%.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 6060,
    data: {
      question: "In a potentiometer circuit, the balance point of a cell is obtained at a length of 80 cm when its circuit is open. When a 12 Ω resistor is connected across the terminals of the cell, the balance point shifts to 64 cm. What is the internal resistance of the cell?",
      option_a: "3.0 Ω",
      option_b: "2.4 Ω",
      option_c: "4.0 Ω",
      option_d: "1.5 Ω",
      correct_option: "A",
      explanation: "Step 1: The formula for internal resistance measured by a potentiometer is:\nr = R [ (l₁ / l₂) − 1 ].\n\nStep 2: Substitute R = 12 Ω, l₁ = 80 cm, and l₂ = 64 cm:\nr = 12 Ω × [ (80 / 64) − 1 ] = 12 × [ (5 / 4) − 1 ] = 12 × (1 / 4) = 3.0 Ω.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 6061,
    data: {
      question: "Three light bulbs rated 25 W, 60 W, and 100 W (all designed for 220 V) are connected in series across a 220 V supply. Which bulb will glow with the greatest brightness?",
      option_a: "The 25 W bulb",
      option_b: "The 100 W bulb",
      option_c: "The 60 W bulb",
      option_d: "All three bulbs glow with equal brightness",
      correct_option: "A",
      explanation: "Step 1: Resistance of a bulb rated for voltage V is R = V² / P_rated. Thus, the 25 W bulb has the highest electrical resistance.\n\nStep 2: In a series circuit, all bulbs carry the exact same electric current I.\n\nStep 3: The actual power dissipated is P_actual = I² R.\nSince the 25 W bulb has the largest resistance R, it dissipates the most electrical power and glows brightest.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 6062,
    data: {
      question: "Three identical cells, each of internal resistance r = 6.0 Ω, are connected in series across an external resistor R. What value of R ensures maximum power dissipation in the resistor?",
      option_a: "18.0 Ω",
      option_b: "6.0 Ω",
      option_c: "2.0 Ω",
      option_d: "9.0 Ω",
      correct_option: "A",
      explanation: "Step 1: Total internal resistance of three cells connected in series is:\nr_total = r + r + r = 3 r = 3 × 6.0 Ω = 18.0 Ω.\n\nStep 2: By the Maximum Power Transfer Theorem, power dissipated in an external load resistor R is maximized when R equals the total internal resistance of the power source:\nR = r_total = 18.0 Ω.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 6063,
    data: {
      question: "A lightning strike between a storm cloud at electric potential 3.0 × 10⁷ V and the ground delivers an average current of 2.0 × 10⁴ A for a duration of 0.10 ms (1.0 × 10⁻⁴ s). What is the total electrical energy released in the discharge?",
      option_a: "6.0 × 10⁷ J",
      option_b: "3.0 × 10⁷ J",
      option_c: "1.2 × 10⁸ J",
      option_d: "6.0 × 10⁹ J",
      correct_option: "A",
      explanation: "Step 1: Electrical energy dissipated is given by the product of potential, current, and time:\nE = V × I × Δt.\n\nStep 2: Substitute the numerical values:\nE = (3.0 × 10⁷ V) × (2.0 × 10⁴ A) × (1.0 × 10⁻⁴ s)\nE = (3.0 × 2.0) × 10^(7 + 4 − 4) = 6.0 × 10⁷ J.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 6064,
    data: {
      question: "In a circuit branch where current I divides into two parallel resistors R₁ = 4.0 Ω and R₂ = 8.0 Ω, which resistor dissipates more heat per second?",
      option_a: "The 4.0 Ω resistor dissipates twice as much heat as the 8.0 Ω resistor",
      option_b: "The 8.0 Ω resistor dissipates twice as much heat as the 4.0 Ω resistor",
      option_c: "Both resistors dissipate the exact same amount of heat",
      option_d: "The 8.0 Ω resistor dissipates four times as much heat",
      correct_option: "A",
      explanation: "Step 1: Resistors in parallel experience the exact same potential difference V across their terminals.\n\nStep 2: Rate of heat generation (power dissipation) is given by P = V² / R.\n\nStep 3: Power is inversely proportional to resistance: P₁ / P₂ = R₂ / R₁ = 8.0 / 4.0 = 2.\nTherefore, the 4.0 Ω resistor dissipates twice as much power.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 6065,
    data: {
      question: "Two identical light bulbs A and B are connected in parallel with each other, and this combination is connected in series with a third identical bulb C across an ideal DC source. If bulb B burns out (opens), what happens to the brightness of bulb C?",
      option_a: "The brightness of bulb C decreases",
      option_b: "The brightness of bulb C increases",
      option_c: "The brightness of bulb C remains completely unchanged",
      option_d: "Bulb C burns out immediately",
      correct_option: "A",
      explanation: "Step 1: Initially, the parallel combination of A and B has equivalent resistance R / 2, giving total circuit resistance R_total = R / 2 + R = 1.5 R.\nInitial current through bulb C is I₁ = V / (1.5 R) = 2V / (3R).\n\nStep 2: When bulb B burns out, only bulb A remains in the branch. Total circuit resistance becomes R_total' = R + R = 2 R.\n\nStep 3: The new current through bulb C is I₂ = V / (2R).\n\nStep 4: Since I₂ < I₁, the power P_C = I² R dissipated in bulb C decreases, so its brightness decreases.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 6066,
    data: {
      question: "Two electric light bulbs rated 40 W, 220 V and 60 W, 220 V are connected in series across a 220 V supply. What is the power consumed by the 40 W bulb in this circuit?",
      option_a: "14.4 W",
      option_b: "9.6 W",
      option_c: "24.0 W",
      option_d: "40.0 W",
      correct_option: "A",
      explanation: "Step 1: Resistances of the bulbs are:\nR₁ = (220)² / 40 and R₂ = (220)² / 60.\n\nStep 2: The ratio of resistances is R₁ / R₂ = 60 / 40 = 3 / 2.\n\nStep 3: When connected in series across 220 V, the voltage across the 40 W bulb is:\nV₁ = 220 V × [ R₁ / (R₁ + R₂) ] = 220 × (3 / 5) = 132 V.\n\nStep 4: The power dissipated in the 40 W bulb is:\nP₁ = V₁² / R₁ = (132)² / [ (220)² / 40 ] = 40 × (132 / 220)² = 40 × (0.6)² = 40 × 0.36 = 14.4 W.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 6067,
    data: {
      question: "In a potentiometer experiment powered by a 2.0 V driver accumulator across a 100 cm wire, which of the following balancing lengths recorded by a student is physically IMPOSSIBLE for a secondary cell of EMF 1.5 V?",
      option_a: "A balancing length greater than 100 cm (e.g., 110 cm)",
      option_b: "A balancing length of 75 cm",
      option_c: "A balancing length of 80 cm",
      option_d: "A balancing length of 60 cm",
      correct_option: "A",
      explanation: "Step 1: The potentiometer wire has a physical length of 100 cm.\n\nStep 2: Any valid null deflection point must lie on the actual wire within the range 0 ≤ l ≤ 100 cm.\n\nStep 3: A balancing length exceeding 100 cm (such as 110 cm) cannot physically exist on a 100 cm wire, immediately revealing an erroneous or fabricated observation.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 6068,
    data: {
      question: "In a series-parallel network of light bulbs connected to a constant voltage source, removing one bulb from a parallel branch causes the total electric current drawn from the voltage source to:",
      option_a: "Decrease",
      option_b: "Increase",
      option_c: "Remain unchanged",
      option_d: "Drop to zero",
      correct_option: "A",
      explanation: "Step 1: Removing a parallel branch increases the equivalent resistance of that parallel section.\n\nStep 2: Consequently, the total equivalent resistance of the entire network increases: R_total' > R_total.\n\nStep 3: By Ohm's Law (I = V / R_total), an increase in total resistance results in a decrease in total current drawn from the source.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 6069,
    data: {
      question: "Two identical electric heating elements B and C connected in parallel are placed in series with a third identical heating element A across a constant voltage supply. What is the total heat produced by B and C combined compared to the heat produced by A alone?",
      option_a: "Half as much",
      option_b: "Twice as much",
      option_c: "The same",
      option_d: "A quarter as much",
      correct_option: "A",
      explanation: "Step 1: Let the steady current entering resistor A be I. The power dissipated in A is P_A = I² R.\n\nStep 2: By symmetry, the current I divides equally between the two identical parallel resistors B and C, so each carries current I / 2.\n\nStep 3: Power dissipated in resistor B is P_B = (I / 2)² R = (1/4) I² R, and similarly P_C = (1/4) I² R.\n\nStep 4: Total heat produced by B and C combined is:\nP_(B+C) = P_B + P_C = (1/4) I² R + (1/4) I² R = (1/2) I² R = (1/2) P_A (half as much).\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 6070,
    data: {
      question: "A cylindrical copper wire is stretched so that its radius decreases uniformly by 0.02%. What is the approximate percentage increase in its electrical resistance?",
      option_a: "0.08%",
      option_b: "0.04%",
      option_c: "0.02%",
      option_d: "0.16%",
      correct_option: "A",
      explanation: "Step 1: During stretching, the volume V = A L = (π r²) L remains strictly constant.\n\nStep 2: Resistance is R = ρ L / A = ρ (V / A) / A = ρ V / A² = ρ V / [ π r² ]² ∝ 1 / r⁴.\n\nStep 3: For small percentage changes, fractional change in resistance is related to radius by:\nΔR / R ≈ − 4 (Δr / r).\n\nStep 4: Substitute Δr / r = −0.02%:\nΔR / R ≈ − 4 × (−0.02%) = +0.08%.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 6071,
    data: {
      question: "A steady electric current flows through a metallic conductor of non-uniform cross-section. Which of the following physical quantities remains strictly CONSTANT at all cross-sections of the conductor?",
      option_a: "Electric current I",
      option_b: "Current density J",
      option_c: "Drift velocity v_d",
      option_d: "Electric field strength E",
      correct_option: "A",
      explanation: "Step 1: Under steady-state conditions, electric charge cannot continuously accumulate or deplete at any point within the conductor (equation of continuity ∇ · J = 0).\n\nStep 2: Therefore, the total charge crossing any complete cross-section per second—the electric current I—is strictly constant throughout the length of the conductor.\n\nStep 3: In contrast, current density J = I / A, drift speed v_d = J / (n e), and electric field E = ρ J all vary inversely with the cross-sectional area A.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 6072,
    data: {
      question: "A galvanometer has a coil resistance of 50 Ω and shows a full-scale deflection for a current of 10 mA. What series resistance is needed to convert it into a voltmeter of range 0 to 50 V?",
      option_a: "4950 Ω",
      option_b: "5000 Ω",
      option_c: "4900 Ω",
      option_d: "2500 Ω",
      correct_option: "A",
      explanation: "Step 1: For a voltmeter of range V with galvanometer resistance G and full-scale deflection current i_g:\nV = i_g (G + R).\n\nStep 2: Rearranging to solve for the series multiplier resistance R:\nR = (V / i_g) − G.\n\nStep 3: Substitute V = 50 V, i_g = 10 mA = 0.010 A, and G = 50 Ω:\nR = (50 / 0.010) − 50 = 5000 − 50 = 4950 Ω.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 6073,
    data: {
      question: "Electric power is transmitted over long distances through transmission lines at extremely high voltages because the Joulean power loss in the lines is:",
      option_a: "Inversely proportional to the square of transmission voltage (P_loss ∝ V⁻²)",
      option_b: "Directly proportional to transmission voltage",
      option_c: "Directly proportional to the square of voltage",
      option_d: "Completely independent of transmission voltage",
      correct_option: "A",
      explanation: "Step 1: To transmit electrical power P at voltage V, the transmission line current is I = P / V.\n\nStep 2: The power dissipated as Joule heat in the transmission lines of resistance R_line is:\nP_loss = I² R_line = (P / V)² R_line = (P² R_line) / V² ∝ V⁻².\n\nStep 3: Thus, stepping up the voltage by a factor of 10 reduces transmission power loss by a factor of 100.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 6074,
    data: {
      question: "Three incandescent electric bulbs are rated 200 W, 100 W, and 50 W for operation at 220 V. What is the correct order of their cold filament resistances measured at room temperature?",
      option_a: "R_50 > R_100 > R_200",
      option_b: "R_200 > R_100 > R_50",
      option_c: "R_100 > R_50 > R_200",
      option_d: "R_50 = R_100 = R_200",
      correct_option: "A",
      explanation: "Step 1: The electrical resistance of a bulb filament is inversely proportional to its rated power:\nR = V_rated² / P_rated ∝ 1 / P_rated.\n\nStep 2: The 50 W bulb has the highest resistance, followed by the 100 W bulb, and the 200 W bulb has the lowest resistance.\n\nStep 3: Therefore, the correct ranking is R_50 > R_100 > R_200.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 6075,
    data: {
      question: "In a DC circuit, a 9.0 V battery powers two resistors of resistances 3.0 Ω and 6.0 Ω connected in series. What is the potential difference across the 6.0 Ω resistor?",
      option_a: "6.0 V",
      option_b: "3.0 V",
      option_c: "9.0 V",
      option_d: "4.5 V",
      correct_option: "A",
      explanation: "Step 1: Total series resistance is R_total = 3.0 Ω + 6.0 Ω = 9.0 Ω.\n\nStep 2: Circuit current is:\nI = V / R_total = 9.0 V / 9.0 Ω = 1.0 A.\n\nStep 3: Potential difference across the 6.0 Ω resistor is:\nV₂ = I × R₂ = 1.0 A × 6.0 Ω = 6.0 V.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 6076,
    data: {
      question: "An electric circuit connected to a 12.0 V DC source dissipates a total power of 36.0 W. The circuit consists of an 8.0 Ω resistor in parallel with an unknown resistor R. What is the value of R?",
      option_a: "8.0 Ω",
      option_b: "4.0 Ω",
      option_c: "16.0 Ω",
      option_d: "2.0 Ω",
      correct_option: "A",
      explanation: "Step 1: Total equivalent resistance of the circuit is:\nR_eq = V² / P = (12.0 V)² / 36.0 W = 144.0 / 36.0 = 4.0 Ω.\n\nStep 2: For two parallel resistors (8.0 Ω and R):\n1 / R_eq = 1 / 8.0 + 1 / R => 1 / 4.0 = 1 / 8.0 + 1 / R.\n\nStep 3: Solving for 1 / R:\n1 / R = 1 / 4.0 − 1 / 8.0 = 2 / 8.0 − 1 / 8.0 = 1 / 8.0.\n\nStep 4: Inverting gives:\nR = 8.0 Ω.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 6077,
    data: {
      question: "In a circuit branch carrying a steady current of 2.0 A from node A to node B, there are two series resistors of 4.0 Ω and 6.0 Ω, and a 10 V battery with its positive terminal pointing toward B. What is the potential difference (V_A − V_B)?",
      option_a: "30.0 V",
      option_b: "10.0 V",
      option_c: "20.0 V",
      option_d: "15.0 V",
      correct_option: "A",
      explanation: "Step 1: Applying Kirchhoff's potential method from node A to node B:\nV_A − I R₁ − E − I R₂ = V_B.\n\nStep 2: Substitute I = 2.0 A, R₁ = 4.0 Ω, E = 10 V, and R₂ = 6.0 Ω:\nV_A − (2.0 × 4.0) − 10 − (2.0 × 6.0) = V_B\nV_A − 8.0 − 10 − 12.0 = V_B\nV_A − 30.0 = V_B.\n\nStep 3: Rearranging gives:\nV_A − V_B = 30.0 V.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 6078,
    data: {
      question: "In a two-loop circuit, two identical 6.0 V batteries with internal resistances of 2.0 Ω are connected in parallel across a central load resistor of 4.0 Ω. What is the electric current flowing through the load resistor?",
      option_a: "1.2 A",
      option_b: "2.4 A",
      option_c: "0.6 A",
      option_d: "1.5 A",
      correct_option: "A",
      explanation: "Step 1: The two identical 6.0 V batteries in parallel have an equivalent EMF equal to 6.0 V:\nE_eq = 6.0 V.\n\nStep 2: Their equivalent internal resistance is:\nr_eq = 2.0 Ω / 2 = 1.0 Ω.\n\nStep 3: The current through the 4.0 Ω load resistor is:\nI = E_eq / (R_load + r_eq) = 6.0 V / (4.0 Ω + 1.0 Ω) = 6.0 / 5.0 = 1.2 A.\n\nTherefore, Option (A) is the correct answer."
    }
  }
];

async function main() {
  console.log('Logging in...');
  const token = await login();
  console.log('Logged in successfully. Updating Part 3 (Q61 to Q88)...');

  for (let i = 0; i < part3Questions.length; i++) {
    const item = part3Questions[i];
    try {
      await updateQuestion(token, item.id, item.data);
      console.log(`[${i + 1}/${part3Questions.length}] Updated Question ID ${item.id}: SUCCESS`);
    } catch (err) {
      console.error(`[${i + 1}/${part3Questions.length}] Error updating Question ID ${item.id}:`, err.message);
    }
  }
  console.log('Part 3 complete!');
}

main();
