const API_URL = 'https://api.indraprasthaneetacademy.com/api';

const updates = [
  {
    id: 2020,
    similarQuestion: {
      question: "Four uniform thin rods AB, BC, CD, and DA of equal length L have masses m, 2m, 3m, and 4m, respectively, and are joined to form a square frame in the xy-plane with corner A at the origin (0, 0), B at (L, 0), C at (L, L), and D at (0, L). In which quadrant or region does the centre of mass of the frame lie relative to the geometric center (L/2, L/2)?",
      option_a: "In the region where x > L/2 and y > L/2",
      option_b: "In the region where x < L/2 and y > L/2",
      option_c: "In the region where x < L/2 and y < L/2",
      option_d: "In the region where x > L/2 and y < L/2",
      correct_option: "B",
      explanation: "Let the center of mass of each rod be at its midpoint: AB of mass m at (L/2, 0); BC of mass 2m at (L, L/2); CD of mass 3m at (L/2, L); DA of mass 4m at (0, L/2). Total mass M = m + 2m + 3m + 4m = 10m. Then X_cm = [m(L/2) + 2m(L) + 3m(L/2) + 4m(0)] / (10m) = (4mL) / (10m) = 0.4L < 0.5L. And Y_cm = [m(0) + 2m(L/2) + 3m(L) + 4m(L/2)] / (10m) = (6mL) / (10m) = 0.6L > 0.5L. Thus, the center of mass lies in the region with x < L/2 and y > L/2. Therefore, Option (B) is the correct answer."
    }
  },
  {
    id: 2027,
    similarQuestion: {
      question: "The linear mass density of a non-uniform rod of length L = 2 m varies along its length according to the relation λ(x) = k·x, where k is a positive constant and x is the distance from one end (x = 0). The center of mass of the rod is located at a distance X_cm from the end x = 0 equal to:",
      option_a: "0.50 m",
      option_b: "1.00 m",
      option_c: "1.33 m (4/3 m)",
      option_d: "1.50 m",
      correct_option: "C",
      explanation: "The center of mass of a rod with linear density λ(x) is given by X_cm = ∫(x·λ(x) dx) / ∫(λ(x) dx) from 0 to L. Here λ(x) = k·x. The numerator is ∫₀² k·x² dx = k [x³/3]₀² = (8/3)k. The denominator is the total mass M = ∫₀² k·x dx = k [x²/2]₀² = 2k. Dividing gives X_cm = [(8/3)k] / [2k] = 4/3 m ≈ 1.33 m. Therefore, Option (C) is the correct answer."
    }
  },
  {
    id: 2246,
    similarQuestion: {
      question: "A Carnot heat engine operates between temperatures T₁ (source) and T₂ (sink). On a Temperature–Entropy (T–S) indicator diagram, a complete Carnot cycle is represented as a:",
      option_a: "Circle",
      option_b: "Parabola",
      option_c: "Rectangle whose area represents the net work output per cycle",
      option_d: "Single straight diagonal line through origin",
      correct_option: "C",
      explanation: "A Carnot cycle consists of two reversible isothermal processes (horizontal lines at constant temperatures T₁ and T₂) and two reversible adiabatic/isentropic processes (vertical lines at constant entropies S₁ and S₂). Plotted on a T–S plane, these four processes form a perfect rectangle. The area enclosed equals (T₁ – T₂)(S₂ – S₁) = W_net. Therefore, Option (C) is the correct answer."
    }
  },
  {
    id: 2390,
    similarQuestion: {
      question: "A tuning fork A of frequency 256 Hz produces 4 beats per second when sounded with another tuning fork B. When the prongs of tuning fork A are loaded with a small amount of wax, the beat frequency decreases to 2 beats per second. The original frequency of tuning fork B was:",
      option_a: "252 Hz",
      option_b: "260 Hz",
      option_c: "254 Hz",
      option_d: "258 Hz",
      correct_option: "A",
      explanation: "Fork A has frequency f_A = 256 Hz. Fork B has frequency f_B = 256 ± 4, so f_B is either 260 Hz or 252 Hz. When fork A is loaded with wax, its frequency decreases: f_A' < 256 Hz. If f_B were 260 Hz, as f_A decreases, the difference |f_B - f_A'| would INCREASE (> 4 beats/s). If f_B were 252 Hz, as f_A decreases towards 252 Hz, the difference |f_A' - f_B| DECREASES (becomes 2 beats/s). Hence, f_B = 252 Hz. Therefore, Option (A) is the correct answer."
    }
  },
  {
    id: 4869,
    similarQuestion: {
      question: "A body of mass 2 kg moving with an initial velocity of 10 m/s on a horizontal frictionless surface is acted upon by a constant retarding force of 4 N until it comes to rest. What is the total stopping distance traveled by the body?",
      option_a: "15 m",
      option_b: "25 m",
      option_c: "35 m",
      option_d: "50 m",
      correct_option: "B",
      explanation: "By the work-energy theorem, Work done by the retarding force = Change in kinetic energy: F · s = (1/2) m v². Here m = 2 kg, v = 10 m/s, F = 4 N. Initial kinetic energy = (1/2) × 2 × 10² = 100 J. Stopping distance s = (1/2 m v²) / F = 100 / 4 = 25 m. Therefore, Option (B) is the correct answer."
    }
  }
];

async function updateMissing() {
  const loginRes = await fetch(API_URL + '/admin/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username: 'indraprasthaadmin', password: 'indraprastha@123' })
  });
  const { token } = await loginRes.json();
  console.log('Logged in to admin API.');

  for (const item of updates) {
    const res = await fetch(`${API_URL}/admin/test-questions/${item.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({ similarQuestion: item.similarQuestion })
    });
    if (res.ok) {
      console.log(`Successfully updated test question ID ${item.id}`);
    } else {
      console.error(`Failed to update ID ${item.id}:`, res.status, await res.text());
    }
  }
}

updateMissing().catch(console.error);
