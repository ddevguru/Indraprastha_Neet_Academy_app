const fs = require('fs');

const physicsSet2Batch2Updates = [
  {
    id: 2969, // Q7
    similar_question: {
      question: "The magnitude of any physical quantity Q is expressed as Q = n × u, where n is the numerical value and u is the unit of measurement. If the unit of measurement is made 5 times larger, what happens to the numerical value n?",
      option_a: "It becomes 1/5 of its original value",
      option_b: "It becomes 5 times its original value",
      option_c: "It becomes 25 times its original value",
      option_d: "It remains unchanged",
      correct_option: "A",
      explanation: "Step 1: Fundamental principle of physical measurement:\nThe actual magnitude of any physical quantity Q is invariant and independent of the chosen system of units:\nQ = n × u = constant\nwhere n is the numerical value and u is the size of the chosen unit.\n\nStep 2: Inverse relationship between n and u:\nSince n × u = constant:\nn ∝ 1 / u   or   n₁ u₁ = n₂ u₂.\n\nStep 3: Calculate the change when the unit is increased:\nGiven the new unit u₂ = 5 u₁:\nn₂ = n₁ × (u₁ / u₂)\nn₂ = n₁ × (u₁ / 5u₁) = n₁ / 5.\n\nTherefore, the numerical value becomes 1/5 of its original value.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 2970, // Q8
    similar_question: {
      question: "A screw gauge has a pitch of 0.5 mm and 50 divisions on its circular scale. When used to measure the thickness of a glass slab, the main scale reading is 2.5 mm and the 36th division of the circular scale coincides with the reference line. If the instrument has no zero error, what is the thickness of the glass slab?",
      option_a: "2.86 mm",
      option_b: "2.68 mm",
      option_c: "3.22 mm",
      option_d: "2.536 mm",
      correct_option: "A",
      explanation: "Step 1: Determine the Least Count (LC) of the screw gauge:\nLC = Pitch / Total number of circular scale divisions\nLC = 0.5 mm / 50 = 0.01 mm.\n\nStep 2: Formula for total reading:\nTotal Reading = Main Scale Reading (MSR) + [Circular Scale Reading (CSR) × LC]\n\nStep 3: Substitute the measured values:\nMSR = 2.5 mm\nCSR = 36\nLC = 0.01 mm\nCircular scale contribution = 36 × 0.01 mm = 0.36 mm\n\nStep 4: Compute the thickness:\nThickness = 2.5 mm + 0.36 mm = 2.86 mm.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 2971, // Q9
    similar_question: {
      question: "In the van der Waals equation for 1 mole of a real gas:\n(P + a/V²)(V − b) = RT\nwhere P is pressure, V is molar volume, and T is temperature, what is the dimensional formula of the constant ratio (a / b)?",
      option_a: "[ML²T⁻²]",
      option_b: "[ML⁵T⁻²]",
      option_c: "[ML⁻¹T⁻²]",
      option_d: "[M⁰L³T⁰]",
      correct_option: "A",
      explanation: "Step 1: Principle of Homogeneity:\nQuantities added or subtracted must share the same dimensions.\n\nStep 2: Determine dimensions of constant a:\nIn the term (P + a/V²):\n[a / V²] = [P]\n[a] = [P] × [V]²\nDimensional formula of pressure [P] = [Force / Area] = [ML⁻¹T⁻²]\nDimensional formula of volume [V] = [L³]  →  [V]² = [L⁶]\n[a] = [ML⁻¹T⁻²] × [L⁶] = [ML⁵T⁻²].\n\nStep 3: Determine dimensions of constant b:\nIn the term (V − b):\n[b] = [V] = [L³].\n\nStep 4: Compute dimensions of (a / b):\n[a / b] = [a] / [b] = [ML⁵T⁻²] / [L³] = [ML²T⁻²].\nNotice that [ML²T⁻²] corresponds to the dimensions of Work or Energy (identical to [PV]).\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 2972, // Q10
    similar_question: {
      question: "In the relation P = (A / B) ln(A x² / (k_B T)), where P is pressure, x is distance, k_B is Boltzmann constant, and T is absolute temperature, what is the dimensional formula of the constant B?",
      option_a: "[M⁰LT⁰]",
      option_b: "[M⁰L²T⁰]",
      option_c: "[MLT⁻²]",
      option_d: "[M⁰L⁰T⁰]",
      correct_option: "A",
      explanation: "Step 1: Dimensional rule for logarithmic functions:\nThe argument inside a logarithmic function must be dimensionless:\n[A x² / (k_B T)] = [M⁰L⁰T⁰] = 1.\n\nStep 2: Determine dimensions of constant A:\nThe product (k_B × T) has dimensions of thermal energy: [k_B T] = [ML²T⁻²]\nDisplacement squared: [x²] = [L²]\n[A] = [k_B T] / [x²] = [ML²T⁻²] / [L²] = [M¹L⁰T⁻²].\n\nStep 3: Relate pressure P and constant B:\nSince the logarithmic factor is dimensionless:\n[P] = [A / B]  →  [B] = [A] / [P]\n\nStep 4: Compute dimensions of B:\nDimensional formula of pressure [P] = [ML⁻¹T⁻²]\n[B] = [M¹L⁰T⁻²] / [M¹L⁻¹T⁻²] = [M⁰L¹T⁰].\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 2973, // Q11
    similar_question: {
      question: "The length, width, and height of a rectangular glass block are measured as:\nl = (20.0 ± 0.1) cm,\nw = (10.0 ± 0.1) cm,\nh = (5.0 ± 0.1) cm.\nWhat is the maximum percentage error in the measurement of the volume of the glass block?",
      option_a: "3.5%",
      option_b: "2.5%",
      option_c: "1.5%",
      option_d: "4.0%",
      correct_option: "A",
      explanation: "Step 1: Formula for volume of a rectangular block:\nV = l × w × h.\n\nStep 2: Error propagation for a product of independent measurements:\nRelative errors are additive:\nΔV / V = (Δl / l) + (Δw / w) + (Δh / h)\nPercentage error in V = [(Δl / l) + (Δw / w) + (Δh / h)] × 100%.\n\nStep 3: Calculate percentage error in each dimension:\nPercentage error in length = (0.1 / 20.0) × 100% = 0.5%\nPercentage error in width = (0.1 / 10.0) × 100% = 1.0%\nPercentage error in height = (0.1 / 5.0) × 100% = 2.0%\n\nStep 4: Sum the percentage errors:\nTotal maximum percentage error = 0.5% + 1.0% + 2.0% = 3.5%.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 2974, // Q12
    similar_question: {
      question: "The mass and volume of an alloy sample are measured to be (400 ± 4) g and (50.0 ± 1.0) cm³ respectively. What is the maximum percentage error in the calculated density?",
      option_a: "3.0%",
      option_b: "1.0%",
      option_c: "2.0%",
      option_d: "5.0%",
      correct_option: "A",
      explanation: "Step 1: Formula for density:\nDensity (ρ) = Mass (m) / Volume (V).\n\nStep 2: Error propagation for a quotient:\nFor a quotient, the relative errors add up to determine the maximum relative error:\nΔρ / ρ = (Δm / m) + (ΔV / V)\nMaximum percentage error = [(Δm / m) + (ΔV / V)] × 100%.\n\nStep 3: Calculate the individual percentage errors:\nPercentage error in mass = (4 / 400) × 100% = 1.0%\nPercentage error in volume = (1.0 / 50.0) × 100% = 2.0%\n\nStep 4: Sum the percentage errors:\nMaximum percentage error in density = 1.0% + 2.0% = 3.0%.\n\nTherefore, Option (A) is the correct answer."
    }
  }
];

async function updateBatch() {
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

    console.log(`Starting update of ${physicsSet2Batch2Updates.length} practice questions...`);

    for (const item of physicsSet2Batch2Updates) {
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
      console.log(`Updated Question ID ${item.id}:`, data.success ? 'SUCCESS' : data);
    }
    console.log('Batch 2 update completed successfully!');
  } catch (err) {
    console.error('Update failed:', err);
  }
}

if (process.argv[2] === '--commit') {
  updateBatch();
} else {
  console.log('Draft ready. Run with --commit to apply to live database.');
}
