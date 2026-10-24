const fs = require('fs');

const physicsSet2Batch1Updates = [
  {
    id: 2963, // Q1
    similar_question: {
      question: "In a Vernier callipers, 1 main scale division is equal to a mm and m divisions of the Vernier scale coincide with (m − 2) divisions of the main scale. The least count (in mm) of the callipers is:",
      option_a: "2a / m",
      option_b: "a / m",
      option_c: "(m − 2)a / m",
      option_d: "2a / (m − 2)",
      correct_option: "A",
      explanation: "Step 1: Formula for Least Count of Vernier Callipers:\nLeast Count (LC) = 1 MSD − 1 VSD\nwhere MSD is Main Scale Division and VSD is Vernier Scale Division.\n\nStep 2: Relate VSD to MSD:\nGiven that m Vernier scale divisions coincide with (m − 2) main scale divisions:\nm VSD = (m − 2) MSD\n1 VSD = [(m − 2) / m] MSD\n\nStep 3: Calculate Least Count:\nLC = 1 MSD − [(m − 2) / m] MSD\nLC = [1 − (m − 2) / m] MSD\nLC = [(m − m + 2) / m] MSD\nLC = (2 / m) MSD\n\nStep 4: Substitute the value of 1 MSD:\nGiven 1 MSD = a mm:\nLC = (2a / m) mm.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 2964, // Q2
    similar_question: {
      question: "If velocity of light (c), acceleration due to gravity (g), and density (d) are taken as fundamental quantities, then the dimensional formula of universal gravitational constant (G) is:",
      option_a: "c⁻² g² d⁻¹",
      option_b: "c² g⁻² d⁻¹",
      option_c: "c⁻¹ g² d⁻²",
      option_d: "c⁰ g² d⁻¹",
      correct_option: "A",
      explanation: "Step 1: Dimensional formulas of the given quantities:\nSpeed of light (c) = [M⁰L¹T⁻¹]\nAcceleration due to gravity (g) = [M⁰L¹T⁻²]\nDensity (d) = [M¹L⁻³T⁰]\nUniversal gravitational constant (G) = [M⁻¹L³T⁻²]\n\nStep 2: Express G in terms of powers of c, g, and d:\nLet G = cˣ gʸ dᶻ\n[M⁻¹L³T⁻²] = [LT⁻¹]ˣ [LT⁻²]ʸ [ML⁻³]ᶻ\n[M⁻¹L³T⁻²] = [Mᶻ L^(x + y − 3z) T^(−x − 2y)]\n\nStep 3: Equate exponents of M, L, and T on both sides:\nFor M: z = −1\nFor T: −x − 2y = −2  →  x + 2y = 2  ...(eq. 1)\nFor L: x + y − 3z = 3  →  x + y − 3(−1) = 3  →  x + y = 0  →  y = −x  ...(eq. 2)\n\nStep 4: Solve for x and y:\nSubstitute y = −x into eq. 1:\nx + 2(−x) = 2\n−x = 2  →  x = −2\nThen y = −(−2) = 2.\n\nStep 5: Write the final dimensional formula:\nG = c⁻² g² d⁻¹.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 2965, // Q3
    similar_question: {
      question: "The velocity v of a particle depends upon time t according to the equation:\nv = a t + b t² + c / (d + t)\nWhat are the dimensional formulas of b and d respectively?",
      option_a: "[M⁰LT⁻³] and [M⁰L⁰T]",
      option_b: "[M⁰LT⁻²] and [M⁰L⁰T]",
      option_c: "[M⁰LT⁻¹] and [M⁰L⁰T⁻¹]",
      option_d: "[M⁰L²T⁻³] and [M⁰L⁰T²]",
      correct_option: "A",
      explanation: "Step 1: State the Principle of Homogeneity of dimensions:\nAccording to the principle of homogeneity, only physical quantities having identical dimensions can be added, subtracted, or equated in any physical equation.\n\nStep 2: Determine dimensions of d:\nIn the term c / (d + t), the quantity d is added directly to time t:\n[d] = [t] = [T] = [M⁰L⁰T¹].\n\nStep 3: Determine dimensions of b:\nEach term contributing to velocity v must possess the dimensions of velocity [LT⁻¹]:\n[b t²] = [v]\n[b] × [T]² = [L T⁻¹]\n[b] = [L T⁻¹] / [T]² = [L T⁻³] = [M⁰L¹T⁻³].\n\nStep 4: Combine the results:\nThe dimensional formulas are:\nb = [M⁰LT⁻³]\nd = [M⁰L⁰T].\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 2966, // Q4
    similar_question: {
      question: "The dimensional formula for the universal gas constant (R) is:",
      option_a: "[ML²T⁻²θ⁻¹mol⁻¹]",
      option_b: "[ML²T⁻¹θ⁻¹mol⁻¹]",
      option_c: "[ML³T⁻²θ⁻¹mol⁻¹]",
      option_d: "[ML⁰T⁻²θ⁻¹mol⁻¹]",
      correct_option: "A",
      explanation: "Step 1: Relate universal gas constant using ideal gas equation:\nP V = n R T\nwhere:\nP = Pressure\nV = Volume\nn = Number of moles [mol]\nR = Universal gas constant\nT = Absolute temperature [θ or K]\n\nStep 2: Rearrange for R:\nR = (P × V) / (n × T)\n\nStep 3: Determine dimensions of numerator and denominator:\nP × V = Work done or Energy = [ML²T⁻²]\nn = [mol]\nT = [θ]\n\nStep 4: Compute dimensions of R:\n[R] = [ML²T⁻²] / ([mol] × [θ])\n[R] = [ML²T⁻²θ⁻¹mol⁻¹].\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 2967, // Q5
    similar_question: {
      question: "A square metal plate has an area measured to be (25.0 ± 0.10) cm². What is the length of one side of the plate with its error limit?",
      option_a: "(5.0 ± 0.01) cm",
      option_b: "(5.0 ± 0.05) cm",
      option_c: "(5.0 ± 0.10) cm",
      option_d: "(5.0 ± 0.02) cm",
      correct_option: "A",
      explanation: "Step 1: Relate side length s to area A of a square:\nA = s²  →  s = √A\nNominal side length s = √(25.0) = 5.0 cm.\n\nStep 2: Apply fractional error formula for powers:\nFor A = sⁿ (here n = 2):\nΔA / A = 2 × (Δs / s)\n\nStep 3: Solve for absolute error in side length (Δs):\nΔs = (s / 2) × (ΔA / A)\nSubstitute s = 5.0 cm, A = 25.0 cm², and ΔA = 0.10 cm²:\nΔs = (5.0 / 2) × (0.10 / 25.0)\nΔs = 2.5 × 0.004 = 0.01 cm.\n\nStep 4: State final measured side length:\nSide length = (s ± Δs) = (5.0 ± 0.01) cm.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 2968, // Q6
    similar_question: {
      question: "The force acting on a particle is given by F = F₀ (1 − e⁻ᵏᵛᵗ), where v is velocity and t is time. The SI unit of the constant k is:",
      option_a: "m⁻¹",
      option_b: "m⁻¹ s⁻¹",
      option_c: "m s⁻¹",
      option_d: "m⁻² s",
      correct_option: "A",
      explanation: "Step 1: Principle of dimensional analysis for exponents:\nThe argument of an exponential function must be dimensionless (pure number):\n[k × v × t] = [M⁰L⁰T⁰] = 1.\n\nStep 2: Determine dimensions of velocity and time:\nVelocity v has SI unit m s⁻¹ ([L T⁻¹])\nTime t has SI unit s ([T])\nProduct (v × t) has SI unit (m s⁻¹ × s) = m.\n\nStep 3: Determine SI unit of k:\nUnit of k = 1 / (Unit of v × Unit of t)\nUnit of k = 1 / m = m⁻¹.\n\nTherefore, Option (A) is the correct answer."
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

    console.log(`Starting update of ${physicsSet2Batch1Updates.length} practice questions...`);

    for (const item of physicsSet2Batch1Updates) {
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
    console.log('Batch update completed successfully!');
  } catch (err) {
    console.error('Update failed:', err);
  }
}

if (process.argv[2] === '--commit') {
  updateBatch();
} else {
  console.log('Draft ready. Run with --commit to apply to live database.');
}
