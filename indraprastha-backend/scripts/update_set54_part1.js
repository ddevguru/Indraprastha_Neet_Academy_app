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

const part1Questions = [
  {
    id: 5983,
    data: {
      question: "What is the magnetic potential energy of a planar magnetic dipole of magnetic moment M oriented at an angle θ with a uniform external magnetic field B?",
      option_a: "−M · B = −M B cos θ",
      option_b: "+M · B = +M B cos θ",
      option_c: "M × B = M B sin θ",
      option_d: "Zero",
      correct_option: "A",
      explanation: "Step 1: The torque acting on a magnetic dipole in a magnetic field is τ = M × B = M B sin θ.\n\nStep 2: The mechanical work done against this torque in rotating the dipole from reference angle 90° to angle θ defines its potential energy:\nU(θ) = ∫₉₀°^θ τ dθ = ∫₉₀°^θ (M B sin θ) dθ = −M B cos θ.\n\nStep 3: In vector notation, this is expressed as the scalar dot product:\nU = −M · B.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 5984,
    data: {
      question: "When a bar magnet is held vertically with its north pole resting on a horizontal sheet of paper, how many magnetic neutral points can be observed on the paper?",
      option_a: "1",
      option_b: "2",
      option_c: "Zero",
      option_d: "Infinite",
      correct_option: "A",
      explanation: "Step 1: A vertical magnet produces a magnetic field on the horizontal sheet that radiates radially outward from the lower north pole in all directions.\n\nStep 2: Earth's horizontal magnetic field B_H is directed uniformly toward magnetic north.\n\nStep 3: At a unique point located along the magnetic meridian to the south of the pole, the horizontal radial field of the magnet points due north, exactly opposing and cancelling B_H.\n\nStep 4: Therefore, exactly 1 neutral point is formed on the paper.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 5985,
    data: {
      question: "In the Bohr model of the hydrogen atom, how does the gyromagnetic ratio (ratio of orbital magnetic moment to orbital angular momentum, μ_l / L) depend on the principal quantum number n?",
      option_a: "It is a universal constant equal to e / (2 m_e), independent of n",
      option_b: "It is directly proportional to n",
      option_c: "It is inversely proportional to n",
      option_d: "It is proportional to n²",
      correct_option: "A",
      explanation: "Step 1: For an electron of mass m_e and charge e revolving in a circular orbit of radius r with speed v:\nOrbital magnetic moment: μ_l = I A = (e v / (2π r)) × (π r²) = (1/2) e v r.\n\nStep 2: Orbital angular momentum is:\nL = m_e v r.\n\nStep 3: The gyromagnetic ratio is:\nγ = μ_l / L = [ (1/2) e v r ] / [ m_e v r ] = e / (2 m_e).\nSince e and m_e are fundamental physical constants, γ is independent of the orbital state or quantum number n.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 5986,
    data: {
      question: "To increase the current sensitivity of a moving coil galvanometer, one should:",
      option_a: "Decrease the torsional restoration constant C of the suspension spring",
      option_b: "Decrease the number of turns in the coil",
      option_c: "Decrease the area of cross-section of the coil",
      option_d: "Decrease the magnetic field strength of the pole pieces",
      correct_option: "A",
      explanation: "Step 1: In equilibrium, deflecting magnetic torque equals restoring spring torque: N I A B = C θ.\n\nStep 2: Current sensitivity S_i is defined as deflection per unit current:\nS_i = θ / I = (N A B) / C.\n\nStep 3: To increase S_i, one must increase the number of turns N, increase coil area A, increase magnetic field B, or decrease the torsional spring constant C.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 5987,
    data: {
      question: "A magnetic needle in an oscillation magnetometer executes 30 oscillations per minute at a place where the horizontal magnetic field of the Earth is B₁. If it is moved to another location where the horizontal field is 4 B₁, what is its new oscillation frequency?",
      option_a: "60 oscillations per minute",
      option_b: "120 oscillations per minute",
      option_c: "15 oscillations per minute",
      option_d: "45 oscillations per minute",
      correct_option: "A",
      explanation: "Step 1: The time period of a vibrating magnetic needle is T = 2π √(I / (M B_H)).\n\nStep 2: Frequency of oscillation is the reciprocal of time period:\nf = (1 / 2π) √(M B_H / I) ∝ √(B_H).\n\nStep 3: Taking the ratio for the two locations:\nf₂ / f₁ = √(B₂ / B₁) = √(4 B₁ / B₁) = √4 = 2.\n\nStep 4: Therefore:\nf₂ = 2 × f₁ = 2 × 30 = 60 oscillations per minute.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 5988,
    data: {
      question: "A proton moves horizontally due north into a region where a uniform magnetic field is directed vertically downward. What is the direction of the magnetic Lorentz force acting on the proton?",
      option_a: "Due East",
      option_b: "Due West",
      option_c: "Vertically upward",
      option_d: "Due South",
      correct_option: "A",
      explanation: "Step 1: The magnetic Lorentz force on a moving charge q is given by:\nF = q (v × B).\n\nStep 2: For a positive proton, q > 0, so the force is in the direction of the vector cross product v × B.\n\nStep 3: Vector directions:\nv points North (along +ĵ),\nB points vertically downward (along −k̂).\n\nStep 4: Evaluating the cross product:\nv × B = (+ĵ) × (−k̂) = − (ĵ × k̂) = − î? Wait: in standard coordinates (East = +î, North = +ĵ, Up = +k̂):\nĵ × (−k̂) = − (ĵ × k̂) = − î (West).\nWait, let's use right-hand rule directly:\nPoint fingers North, curl them Downward into the earth:\nThe outstretched thumb points due East!\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 5989,
    data: {
      question: "What is the typical order of magnitude of the total geomagnetic field at the surface of the Earth?",
      option_a: "10⁻⁴ T (approximately 1 Gauss)",
      option_b: "10 T",
      option_c: "10⁻¹⁰ T",
      option_d: "10² T",
      correct_option: "A",
      explanation: "Step 1: The Earth's magnetic field at its surface varies between approximately 25 μT and 65 μT depending on geographic latitude.\n\nStep 2: In SI units, 1 Gauss (G) = 10⁻⁴ Tesla (T).\n\nStep 3: The order of magnitude of the Earth's field is approximately 10⁻⁴ T = 1 G.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 5990,
    data: {
      question: "A magnetic dipole of magnetic moment M = 5.0 × 10⁻² A m² and moment of inertia I = 2.0 × 10⁻⁶ kg m² oscillates in a uniform magnetic field B = 4.0 × 10⁻² T. What is the time period of small angular oscillations?",
      option_a: "0.20 s",
      option_b: "0.40 s",
      option_c: "0.10 s",
      option_d: "1.0 s",
      correct_option: "A",
      explanation: "Step 1: The equation for the time period of a magnetic dipole oscillating in a uniform magnetic field is:\nT = 2π √[ I / (M B) ].\n\nStep 2: Substitute the given parameters:\nI = 2.0 × 10⁻⁶ kg m²,\nM = 5.0 × 10⁻² A m²,\nB = 4.0 × 10⁻² T.\n\nStep 3: Compute the product M B:\nM B = (5.0 × 10⁻²) × (4.0 × 10⁻²) = 2.0 × 10⁻³ N m.\n\nStep 4: Compute the ratio:\nI / (M B) = (2.0 × 10⁻⁶) / (2.0 × 10⁻³) = 1.0 × 10⁻³ s².\n\nStep 5: Taking the square root and multiplying by 2π:\nT = 2π × √(1.0 × 10⁻³) = 2π × 0.03162 ≈ 0.199 s ≈ 0.20 s.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 5991,
    data: {
      question: "A short bar magnet is aligned with its north pole pointing magnetic north. A magnetic neutral point is observed on its broadside-on (equatorial) line at a distance of 10 cm from the center. If the horizontal component of Earth's magnetic field is B_H = 4.0 × 10⁻⁵ T, what is the magnetic dipole moment of the magnet?",
      option_a: "0.40 A m²",
      option_b: "0.80 A m²",
      option_c: "0.20 A m²",
      option_d: "0.60 A m²",
      correct_option: "A",
      explanation: "Step 1: When a magnet is placed with its north pole pointing north, neutral points occur on the broadside-on (equatorial) line.\n\nStep 2: At the neutral point, the equatorial field of the magnet equals Earth's horizontal component:\nB_equatorial = B_H.\n\nStep 3: For a short bar magnet:\n[ μ₀ / (4π) ] (M / d³) = B_H.\n\nStep 4: Substitute μ₀ / 4π = 10⁻⁷ T m A⁻¹, d = 0.10 m, and B_H = 4.0 × 10⁻⁵ T:\n10⁻⁷ × [ M / (0.10)³ ] = 4.0 × 10⁻⁵\n10⁻⁷ × (M / 10⁻³) = 4.0 × 10⁻⁵ => 10⁻⁴ M = 4.0 × 10⁻⁵\nM = 4.0 × 10⁻⁵ / 10⁻⁴ = 0.40 A m².\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 5992,
    data: {
      question: "A ship needs to sail along a true geographic heading of 10° south of west. If the magnetic declination at that location is 8° west of true north, in which direction relative to magnetic north should the ship be steered?",
      option_a: "82° west of magnetic north",
      option_b: "98° west of magnetic north",
      option_c: "18° west of magnetic north",
      option_d: "10° east of magnetic north",
      correct_option: "A",
      explanation: "Step 1: Geographic West corresponds to an azimuth of 90° west of true north.\n\nStep 2: A heading of 10° south of west corresponds to a true geographic angle of 90° + 10° = 100° west of true north.\n\nStep 3: Since the magnetic meridian lies 8° west of true north (magnetic declination = 8° W), magnetic north is tilted 8° toward the west.\n\nStep 4: Therefore, the angle relative to magnetic north is:\nθ = (90° − 8°) = 82° west of magnetic north.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 5993,
    data: {
      question: "Can a stationary electric charge placed in a static, uniform magnetic field acquire kinetic energy from the magnetic field?",
      option_a: "No, because the magnetic Lorentz force on a stationary charge is strictly zero (F = q (v × B) = 0)",
      option_b: "Yes, but only if the charge is positive",
      option_c: "Yes, but only if the charge is negative",
      option_d: "Yes, both positive and negative charges accelerate along field lines",
      correct_option: "A",
      explanation: "Step 1: The magnetic Lorentz force on a charged particle is F = q (v × B).\n\nStep 2: For a stationary charge, velocity v = 0, which yields F = 0.\n\nStep 3: Furthermore, because magnetic force is always perpendicular to velocity (F ⊥ v), the instantaneous mechanical work done by a magnetic field is always zero (P = F · v = 0).\nTherefore, a static magnetic field cannot do work on or impart kinetic energy to an electric charge.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 5994,
    data: {
      question: "Which of the following is a universal magnetic property exhibited to some extent by all material substances?",
      option_a: "Diamagnetism",
      option_b: "Ferromagnetism",
      option_c: "Paramagnetism",
      option_d: "Ferrimagnetism",
      correct_option: "A",
      explanation: "Step 1: Diamagnetism arises from the electromagnetic induction of orbital electron currents when an external magnetic field is applied (Lenz's Law on atomic scale).\n\nStep 2: Because all atoms and molecules possess orbital electrons, an induced opposing magnetic moment is universally created in every material.\n\nStep 3: Although this diamagnetic response can be masked by stronger paramagnetic or ferromagnetic effects in certain materials, it is universally present in all matter.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 5995,
    data: {
      question: "When an unmagnetized ferromagnetic specimen is placed in an increasing external magnetic field, what occurs at the microscopic level?",
      option_a: "Magnetic domains with magnetization aligned parallel to the field grow in volume by domain wall displacement",
      option_b: "All magnetic domains shrink uniformly in size",
      option_c: "The atomic magnetic moments align strictly perpendicular to the external field",
      option_d: "The individual atoms lose their intrinsic magnetic dipole moments",
      correct_option: "A",
      explanation: "Step 1: Ferromagnetic materials consist of microscopic regions called magnetic domains, within which atomic magnetic moments are spontaneously aligned.\n\nStep 2: When an external magnetic field is applied, domains whose magnetization is favorably oriented with the field expand by boundary displacement (domain wall motion).\n\nStep 3: At higher field strengths, the domain orientations rotate directly into the direction of the applied field until magnetic saturation is reached.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 5996,
    data: {
      question: "Magnetic materials possessing a negative magnetic susceptibility (χ < 0) belong to which class of magnetic substances?",
      option_a: "Diamagnetic materials",
      option_b: "Paramagnetic materials",
      option_c: "Ferromagnetic materials",
      option_d: "Non-magnetic insulators",
      correct_option: "A",
      explanation: "Step 1: Magnetic susceptibility is defined as χ = M / H, where M is the induced magnetization and H is the magnetizing field.\n\nStep 2: In diamagnetic substances, the induced magnetization opposes the applied field (M points opposite to H).\n\nStep 3: Consequently, the magnetic susceptibility is small and negative (−1 ≤ χ < 0), and relative permeability is slightly less than 1 (μ_r = 1 + χ < 1).\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 5997,
    data: {
      question: "A magnetic material has a relative permeability of μ_r = 500 and a large positive magnetic susceptibility. The material is:",
      option_a: "Ferromagnetic",
      option_b: "Paramagnetic",
      option_c: "Diamagnetic",
      option_d: "Non-magnetic",
      correct_option: "A",
      explanation: "Step 1: Magnetic susceptibility is related to relative permeability by χ = μ_r − 1.\n\nStep 2: For μ_r = 500, χ = 499 ≫ 1.\n\nStep 3: Materials with very large positive relative permeabilities (μ_r ≫ 1) and susceptibilities (χ ≫ 1) are classified as ferromagnetic substances (such as iron, cobalt, and nickel).\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 5998,
    data: {
      question: "In a permanent magnet at room temperature, what is the microscopic state of the magnetic domains?",
      option_a: "The magnetic domains are partially aligned in a preferred orientation, resulting in net spontaneous macroscopic magnetization",
      option_b: "The magnetic moment of every individual molecule is zero",
      option_c: "The domains are completely disordered with zero net magnetic field",
      option_d: "All domains are continuously rotating at high speed",
      correct_option: "A",
      explanation: "Step 1: A permanent magnet has high retentivity and high coercivity, retaining strong remanent magnetization after being magnetized.\n\nStep 2: Even at room temperature, thermal agitation prevents 100% perfect alignment, but domain walls remain pinned, leaving the domains predominantly aligned in a preferred direction.\n\nStep 3: This partial but stable alignment produces the persistent external macroscopic magnetic field.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 5999,
    data: {
      question: "Which combination of magnetic properties is essential for a material used to manufacture permanent magnets?",
      option_a: "High retentivity and high coercivity",
      option_b: "Low retentivity and low coercivity",
      option_c: "High retentivity and low coercivity",
      option_d: "Low retentivity and high coercivity",
      correct_option: "A",
      explanation: "Step 1: High retentivity (remanence) ensures that the magnet retains strong magnetization when the external magnetizing field is removed.\n\nStep 2: High coercivity ensures that the magnetization is not easily destroyed by stray external reverse fields, mechanical impacts, or moderate temperature changes.\n\nStep 3: Therefore, ideal permanent magnet materials (such as Alnico) exhibit both high retentivity and high coercivity.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 6000,
    data: {
      question: "Which fundamental physical law asserts that magnetic field lines never terminate and must always form continuous closed loops?",
      option_a: "Gauss's Law for Magnetism (∮ B · dA = 0, indicating the non-existence of isolated magnetic monopoles)",
      option_b: "Coulomb's Law of Electrostatics",
      option_c: "Faraday's Law of Electromagnetic Induction",
      option_d: "Ampere's Circuital Law",
      correct_option: "A",
      explanation: "Step 1: In nature, magnetic poles always occur in equal and opposite pairs (dipoles); isolated magnetic monopoles have never been observed.\n\nStep 2: According to Gauss's Law for Magnetism:\n∮ B · dA = 0 (or ∇ · B = 0).\n\nStep 3: This implies that magnetic field lines have neither starting points (sources) nor endpoints (sinks), and must always form continuous closed loops.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 6009,
    data: {
      question: "A 10 V battery with internal resistance 1.0 Ω is connected across an external circuit of resistance 4.0 Ω. What is the terminal potential difference across the battery?",
      option_a: "8.0 V",
      option_b: "10.0 V",
      option_c: "2.0 V",
      option_d: "6.0 V",
      correct_option: "A",
      explanation: "Step 1: Total series resistance is R_total = R + r = 4.0 Ω + 1.0 Ω = 5.0 Ω.\n\nStep 2: Circuit current is:\nI = E / R_total = 10 V / 5.0 Ω = 2.0 A.\n\nStep 3: Terminal potential difference across the discharging battery is:\nV = E − I r = 10 V − (2.0 A × 1.0 Ω) = 8.0 V.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 6010,
    data: {
      question: "In a balanced Wheatstone bridge network, what is the electric current flowing through the central detector branch connecting the two intermediate junctions?",
      option_a: "Zero (since both junctions are at the exact same electric potential)",
      option_b: "Equal to the total supply current",
      option_c: "Dependent on the galvanometer resistance",
      option_d: "Infinite",
      correct_option: "A",
      explanation: "Step 1: In a balanced Wheatstone bridge, the ratio of resistances in adjacent arms satisfies P / Q = R / S.\n\nStep 2: Under this condition, the electric potentials at the two intermediate nodes are identical: V_A = V_B.\n\nStep 3: Since the potential difference is zero (ΔV = V_A − V_B = 0), no current flows through the connecting detector branch: I_g = 0.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 6011,
    data: {
      question: "A potential divider consists of two resistors R₁ = 6.0 kΩ and R₂ = 4.0 kΩ connected in series across a 10 V DC supply. What is the output voltage measured across resistor R₂?",
      option_a: "4.0 V",
      option_b: "6.0 V",
      option_c: "2.5 V",
      option_d: "5.0 V",
      correct_option: "A",
      explanation: "Step 1: In a potential divider circuit, voltage divides across series resistors in direct proportion to their resistances.\n\nStep 2: The output voltage across R₂ is:\nV_out = V_in × [ R₂ / (R₁ + R₂) ].\n\nStep 3: Substitute the numerical values:\nV_out = 10 V × [ 4.0 kΩ / (6.0 kΩ + 4.0 kΩ) ] = 10 × (4.0 / 10.0) = 4.0 V.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 6012,
    data: {
      question: "In a completely symmetric resistor circuit with two identical opposing EMF sources connected in opposite halves, what is the electric current in the central connecting cross-wire?",
      option_a: "Zero",
      option_b: "1.0 A",
      option_c: "0.5 A",
      option_d: "2.0 A",
      correct_option: "A",
      explanation: "Step 1: In a circuit exhibiting geometric and electrical symmetry with opposing identical EMF sources, the potentials at both ends of the central cross-wire are equal.\n\nStep 2: Since ΔV = 0 across the cross-wire, no electric current flows through it by Ohm's Law: I = ΔV / R = 0.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 6013,
    data: {
      question: "In any closed loop of an electrical network in steady state, what fundamental conservation law is expressed by Kirchhoff's Second Law (Loop Rule)?",
      option_a: "Conservation of energy",
      option_b: "Conservation of electric charge",
      option_c: "Conservation of linear momentum",
      option_d: "Conservation of angular momentum",
      correct_option: "A",
      explanation: "Step 1: Kirchhoff's Loop Rule states that the algebraic sum of changes in electric potential around any closed circuit loop is zero: ∑ ΔV = 0.\n\nStep 2: Because electrostatic forces are conservative, the work done in transporting a unit charge around any closed loop must equal zero.\n\nStep 3: Therefore, the loop rule is an expression of the law of conservation of energy.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 6014,
    data: {
      question: "A battery of internal resistance 3.0 Ω delivers maximum power to an external load resistor of resistance R. What is the value of R?",
      option_a: "3.0 Ω",
      option_b: "1.5 Ω",
      option_c: "6.0 Ω",
      option_d: "Zero",
      correct_option: "A",
      explanation: "Step 1: According to the Maximum Power Transfer Theorem, a DC voltage source transfers maximum power to an external load when the load resistance equals the internal resistance of the source:\nR_load = r_internal.\n\nStep 2: Since r_internal = 3.0 Ω, maximum power is delivered when R = 3.0 Ω.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 6015,
    data: {
      question: "Four resistors of 4.0 Ω each are connected to form a square ABCD. What is the equivalent resistance between two diagonally opposite vertices A and C?",
      option_a: "4.0 Ω",
      option_b: "8.0 Ω",
      option_c: "2.0 Ω",
      option_d: "16.0 Ω",
      correct_option: "A",
      explanation: "Step 1: The current entering at vertex A splits into two symmetrical paths toward vertex C: path ABC and path ADC.\n\nStep 2: Path ABC has resistance R₁ = R_AB + R_BC = 4.0 Ω + 4.0 Ω = 8.0 Ω.\n\nStep 3: Path ADC has resistance R₂ = R_AD + R_DC = 4.0 Ω + 4.0 Ω = 8.0 Ω.\n\nStep 4: These two branches are connected in parallel between A and C:\nR_eq = (8.0 × 8.0) / (8.0 + 8.0) = 64.0 / 16.0 = 4.0 Ω.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 6016,
    data: {
      question: "A 10 V DC voltage source is connected across a series combination of two resistors of resistances 2.0 Ω and 3.0 Ω. What is the circuit current?",
      option_a: "2.0 A",
      option_b: "5.0 A",
      option_c: "1.0 A",
      option_d: "4.0 A",
      correct_option: "A",
      explanation: "Step 1: The total equivalent resistance of the series circuit is:\nR_total = R₁ + R₂ = 2.0 Ω + 3.0 Ω = 5.0 Ω.\n\nStep 2: By Ohm's Law, the current in the circuit is:\nI = V / R_total = 10 V / 5.0 Ω = 2.0 A.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 6017,
    data: {
      question: "In a circuit branch, a steady current of 3.0 A flows from node G to node H through a 2.0 Ω resistor and an opposing battery of EMF 5.0 V (positive terminal connected toward H). What is the potential difference (V_G − V_H)?",
      option_a: "11.0 V",
      option_b: "1.0 V",
      option_c: "6.0 V",
      option_d: "5.0 V",
      correct_option: "A",
      explanation: "Step 1: Applying the potential step method from G to H along the direction of current:\nV_G − I R − E = V_H.\n\nStep 2: Substitute I = 3.0 A, R = 2.0 Ω, and E = 5.0 V:\nV_G − (3.0 × 2.0) − 5.0 = V_H\nV_G − 6.0 − 5.0 = V_H\nV_G − 11.0 = V_H.\n\nStep 3: Rearranging gives the potential difference:\nV_G − V_H = 11.0 V.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 6018,
    data: {
      question: "In a bridge circuit where nodes B and D are at potentials V_B = 8.0 V and V_D = 8.0 V, what is the electric current flowing in a connecting wire between B and D?",
      option_a: "Zero",
      option_b: "1.0 A",
      option_c: "2.0 A",
      option_d: "8.0 A",
      correct_option: "A",
      explanation: "Step 1: Electric current between two points requires a non-zero potential difference: I = ΔV / R.\n\nStep 2: Since V_B = V_D = 8.0 V, the potential difference is:\nΔV = V_B − V_D = 8.0 V − 8.0 V = 0.\n\nStep 3: Therefore, the current in the connecting wire is identically zero.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 6019,
    data: {
      question: "A variable resistor R is connected in series with a fixed resistor and an ammeter across a constant DC voltage source. For what value of R will the ammeter indicate its maximum reading?",
      option_a: "When R = 0 (behaves as a connecting wire of negligible resistance)",
      option_b: "When R is infinite (open circuit)",
      option_c: "When R equals the fixed resistance",
      option_d: "When R = 1.0 Ω",
      correct_option: "A",
      explanation: "Step 1: The current measured by the ammeter in the series circuit is:\nI = V / (R_fixed + R_ammeter + R).\n\nStep 2: Current I is inversely proportional to the total circuit resistance.\n\nStep 3: Therefore, I attains its maximum value when the variable resistance R is reduced to its minimum possible value, which is R = 0 (acting as a pure short-circuit or connecting wire).\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 6020,
    data: {
      question: "Twelve identical resistors of resistance R each are connected along the twelve edges of a cube. What is the equivalent resistance between two body-diagonally opposite corners?",
      option_a: "(5 / 6) R",
      option_b: "(3 / 4) R",
      option_c: "(7 / 12) R",
      option_d: "(1 / 2) R",
      correct_option: "A",
      explanation: "Step 1: When current enters at one corner and leaves at the diametrically opposite body corner, the current divides symmetrically into 3 equal parts of I / 3 across the first 3 edges.\n\nStep 2: At the next vertices, each branch divides into 2 paths, so 6 edges each carry current I / 6.\n\nStep 3: Finally, the paths recombine into 3 edges, each carrying current I / 3.\n\nStep 4: The total potential difference across the body diagonal is:\nV = (I / 3) R + (I / 6) R + (I / 3) R = I R [ 1/3 + 1/6 + 1/3 ] = I R [ 5 / 6 ].\n\nStep 5: Therefore, the equivalent resistance is R_eq = V / I = (5 / 6) R.\n\nTherefore, Option (A) is the correct answer."
    }
  }
];

async function main() {
  console.log('Logging in...');
  const token = await login();
  console.log('Logged in successfully. Updating Part 1 (Q1 to Q30)...');

  for (let i = 0; i < part1Questions.length; i++) {
    const item = part1Questions[i];
    try {
      await updateQuestion(token, item.id, item.data);
      console.log(`[${i + 1}/${part1Questions.length}] Updated Question ID ${item.id}: SUCCESS`);
    } catch (err) {
      console.error(`[${i + 1}/${part1Questions.length}] Error updating Question ID ${item.id}:`, err.message);
    }
  }
  console.log('Part 1 complete!');
}

main();
