const https = require('https');

const loginData = JSON.stringify({
  username: "indraprasthaadmin",
  password: "indraprastha@123"
});

function login() {
  return new Promise((resolve, reject) => {
    const req = https.request({
      hostname: 'api.indraprasthaneetacademy.com',
      path: '/api/admin/login',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(loginData)
      }
    }, (res) => {
      let body = '';
      res.on('data', chunk => body += chunk);
      res.on('end', () => {
        try {
          const parsed = JSON.parse(body);
          if (parsed.token) resolve(parsed.token);
          else reject(new Error('Login failed: ' + body));
        } catch (e) {
          reject(e);
        }
      });
    });
    req.on('error', reject);
    req.write(loginData);
    req.end();
  });
}

function updateTestQuestion(token, id, similarQuestion) {
  const data = JSON.stringify({ similarQuestion });
  return new Promise((resolve, reject) => {
    const req = https.request({
      hostname: 'api.indraprasthaneetacademy.com',
      path: `/api/admin/test-questions/${id}`,
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
        'Content-Length': Buffer.byteLength(data)
      }
    }, (res) => {
      let body = '';
      res.on('data', chunk => body += chunk);
      res.on('end', () => {
        try {
          const parsed = JSON.parse(body);
          resolve(parsed);
        } catch (e) {
          resolve(body);
        }
      });
    });
    req.on('error', reject);
    req.write(data);
    req.end();
  });
}

const test96Part3Updates = [
  {
    id: 4584,
    similar: {
      question: "What is the concentration of ammonium ions [NH₄⁺] in an aqueous solution containing a mixture of 0.040 M aqueous ammonia (NH₃) and 0.020 M potassium hydroxide (KOH) at 25 °C? (Given: K_b for NH₃ = 1.8 × 10⁻⁵)",
      option_a: "(A) 3.6 × 10⁻⁵ M",
      option_b: "(B) 1.8 × 10⁻⁵ M",
      option_c: "(C) 7.2 × 10⁻⁵ M",
      option_d: "(D) 0.9 × 10⁻⁵ M",
      correct_option: "A",
      explanation: "Step 1: Potassium hydroxide (KOH) is a strong base that completely ionizes in solution:\nKOH → K⁺ + OH⁻.\nThus, [OH⁻] from KOH = 0.020 M.\nStep 2: Ammonia is a weak base that ionizes according to the equilibrium:\nNH₃ + H₂O ⇌ NH₄⁺ + OH⁻\nStep 3: Due to the common ion effect from the strong base, the ionization of NH₃ is heavily suppressed. Therefore, the total hydroxide concentration is predominantly from KOH: [OH⁻] ≈ 0.020 M, and [NH₃] ≈ 0.040 M.\nStep 4: Using the base dissociation constant expression:\nK_b = ([NH₄⁺] × [OH⁻]) / [NH₃]\n1.8 × 10⁻⁵ = ([NH₄⁺] × 0.020) / 0.040\n[NH₄⁺] = (1.8 × 10⁻⁵ × 0.040) / 0.020 = 1.8 × 10⁻⁵ × 2 = 3.6 × 10⁻⁵ M.\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 4585,
    similar: {
      question: "According to the Bronsted-Lowry concept, what is the chemical formula of the conjugate base of the amide ion (NH₂⁻)?",
      option_a: "(A) Ammonia (NH₃)",
      option_b: "(B) Ammonium ion (NH₄⁺)",
      option_c: "(C) Imide ion (NH²⁻)",
      option_d: "(D) Hydrazine (N₂H₄)",
      correct_option: "C",
      explanation: "Step 1: According to the Bronsted-Lowry acid-base theory, a conjugate base is formed when an acid donates (loses) one proton (H⁺):\nConjugate Base = Acid - H⁺.\nStep 2: Removing a proton (H⁺) from the amide ion (NH₂⁻):\nNH₂⁻ - H⁺ → NH²⁻ (the imide dianion).\nStep 3: Conversely, adding a proton to NH₂⁻ gives its conjugate acid, NH₃.\nStep 4: Therefore, the conjugate base of NH₂⁻ is NH²⁻.\nTherefore, Option (C) is the correct answer."
    }
  },
  {
    id: 4586,
    similar: {
      question: "If the pK_b value of a weak organic base (B) is 5.00 at 25 °C, what is the ionization constant (K_a) of its conjugate acid (BH⁺)?",
      option_a: "(A) 1.0 × 10⁻⁵",
      option_b: "(B) 1.0 × 10⁻⁹",
      option_c: "(C) 1.0 × 10⁻¹⁴",
      option_d: "(D) 1.0 × 10⁻¹⁰",
      correct_option: "B",
      explanation: "Step 1: For any conjugate acid-base pair in aqueous solution at 25 °C, the product of their ionization constants equals the ionic product of water:\nK_a × K_b = K_w = 1.0 × 10⁻¹⁴.\nStep 2: Taking negative logarithms on both sides:\npK_a + pK_b = pK_w = 14.00.\nStep 3: Substitute the given pK_b = 5.00:\npK_a = 14.00 - 5.00 = 9.00.\nStep 4: Calculate K_a:\nK_a = 10^(-pK_a) = 10^(-9.00) = 1.0 × 10⁻⁹.\nTherefore, Option (B) is the correct answer."
    }
  },
  {
    id: 4587,
    similar: {
      question: "For the stepwise dissociation of a polyprotic weak acid such as carbonic acid (H₂CO₃):\n(1) H₂CO₃ ⇌ H⁺ + HCO₃⁻   (K_a1)\n(2) HCO₃⁻ ⇌ H⁺ + CO₃²⁻   (K_a2)\nWhich of the following relationships is ALWAYS correct?",
      option_a: "(A) K_a1 < K_a2",
      option_b: "(B) K_a1 = K_a2",
      option_c: "(C) K_a1 > K_a2",
      option_d: "(D) K_a1 × K_a2 = 1",
      correct_option: "C",
      explanation: "Step 1: In polyprotic acids, the first proton is removed from a neutral parent molecule (H₂CO₃).\nStep 2: The second proton must be pulled away from a negatively charged anion (HCO₃⁻), which exerts a strong electrostatic attraction holding onto the positively charged proton (H⁺).\nStep 3: Consequently, significantly more energy is required to remove the second proton, making the second dissociation constant orders of magnitude smaller than the first.\nStep 4: Therefore, for all polyprotic acids, K_a1 > K_a2 is always valid.\nTherefore, Option (C) is the correct answer."
    }
  },
  {
    id: 4588,
    similar: {
      question: "An aqueous solution of aluminium sulphate, Al₂(SO₄)₃, is acidic in nature primarily due to:",
      option_a: "(A) Anionic hydrolysis of sulphate ions",
      option_b: "(B) Cationic hydrolysis of hydrated aluminium ions, [Al(H₂O)₆]³⁺",
      option_c: "(C) Complete dissociation into free sulphuric acid",
      option_d: "(D) Precipitation of insoluble aluminium oxide",
      correct_option: "B",
      explanation: "Step 1: Aluminium sulphate is a salt derived from a weak base (Al(OH)₃) and a strong acid (H₂SO₄).\nStep 2: In aqueous solution, aluminium ions exist as hexaaqua complexes: [Al(H₂O)₆]³⁺.\nStep 3: Because of the high charge density of the small Al³⁺ cation, it polarizes the coordinated water O-H bonds, facilitating proton transfer to bulk water molecules (cationic hydrolysis):\n[Al(H₂O)₆]³⁺ + H₂O ⇌ [Al(H₂O)₅(OH)]²⁺ + H₃O⁺\nStep 4: This produces an excess of hydronium ions (H₃O⁺), giving the solution an acidic character (pH < 7).\nTherefore, Option (B) is the correct answer."
    }
  },
  {
    id: 4589,
    similar: {
      question: "Which of the following chemical species has the LEAST tendency to function as a Lewis acid?",
      option_a: "(A) Cyanide ion (CN⁻)",
      option_b: "(B) Boron trifluoride (BF₃)",
      option_c: "(C) Aluminium chloride (AlCl₃)",
      option_d: "(D) Hydronium ion / Proton (H⁺)",
      correct_option: "A",
      explanation: "Step 1: A Lewis acid is defined as an electron pair acceptor.\nStep 2: BF₃ and AlCl₃ possess incomplete valence octets (sextet of electrons) and readily accept electron pairs.\nStep 3: H⁺ has an empty 1s orbital and is a classic electron pair acceptor.\nStep 4: The cyanide ion (:C≡N:⁻) is a negatively charged anion possessing non-bonding lone pairs on both carbon and nitrogen, making it a strong electron-pair donor (Lewis base and nucleophile), not an electron acceptor.\nStep 5: Thus, CN⁻ has the least possibility to be a Lewis acid.\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 4590,
    similar: {
      question: "Which of the following 1.0 M aqueous solutions has the MAXIMUM pH at 25 °C?",
      option_a: "(A) 1.0 M H₂S",
      option_b: "(B) Pure H₂O (neutral water)",
      option_c: "(C) 1.0 M H₂Se",
      option_d: "(D) 1.0 M H₂Te",
      correct_option: "B",
      explanation: "Step 1: The hydrides of Group 16 elements (H₂S, H₂Se, H₂Te) are all weak diprotic acids in aqueous solution.\nStep 2: Their acidic strength increases down the group as the H-E bond weakens: H₂S < H₂Se < H₂Te.\nStep 3: Because they ionize to produce hydronium ions, 1.0 M solutions of H₂S, H₂Se, and H₂Te all have pH values significantly lower than 7 (acidic, pH < 7).\nStep 4: Pure water (H₂O) is neutral and has [H⁺] = 1.0 × 10⁻⁷ M, corresponding to pH = 7.00.\nStep 5: Therefore, pure water has the maximum pH among the choices.\nTherefore, Option (B) is the correct answer."
    }
  },
  {
    id: 4591,
    similar: {
      question: "Which of the following alkali metal hydroxides is the STRONGEST base in aqueous solution?",
      option_a: "(A) NaOH",
      option_b: "(B) KOH",
      option_c: "(C) RbOH",
      option_d: "(D) CsOH",
      correct_option: "D",
      explanation: "Step 1: Down Group 1 (Li to Na to K to Rb to Cs), the ionic radius of the alkali metal cation increases substantially: Na⁺ < K⁺ < Rb⁺ < Cs⁺.\nStep 2: As cation size increases, the electrostatic attraction between the metal cation and hydroxide anion (OH⁻) weakens, resulting in a marked decrease in lattice enthalpy.\nStep 3: Consequently, caesium hydroxide (CsOH) dissociates most completely in water to release free OH⁻ ions, making it the strongest base among the alkali metal hydroxides.\nTherefore, Option (D) is the correct answer."
    }
  },
  {
    id: 4592,
    similar: {
      question: "When solid potassium fluoride (KF) is added to an aqueous solution of hydrofluoric acid (HF), which of the following changes is observed?",
      option_a: "(A) The degree of dissociation of HF increases.",
      option_b: "(B) The concentration of H⁺ ions increases.",
      option_c: "(C) The concentration of H⁺ ions decreases (pH increases).",
      option_d: "(D) The concentration of F⁻ ions decreases.",
      correct_option: "C",
      explanation: "Step 1: Hydrofluoric acid is a weak acid that partially dissociates: HF ⇌ H⁺ + F⁻.\nStep 2: Potassium fluoride (KF) is a strong electrolyte that dissociates completely into K⁺ and F⁻ ions.\nStep 3: The addition of KF introduces a high concentration of the common ion, F⁻.\nStep 4: By Le Chatelier's principle, the excess F⁻ shifts the dissociation equilibrium of HF backwards (to the left).\nStep 5: This common ion effect suppresses the ionization of HF, leading to a decrease in [H⁺] and a corresponding increase in pH.\nTherefore, Option (C) is the correct answer."
    }
  },
  {
    id: 4593,
    similar: {
      question: "An aqueous solution of ferric chloride (FeCl₃) turns blue litmus paper red because:",
      option_a: "(A) Fe³⁺ ions undergo cationic hydrolysis to release H⁺ ions into solution.",
      option_b: "(B) Cl⁻ ions react with water to release OH⁻ ions.",
      option_c: "(C) FeCl₃ is a non-electrolyte.",
      option_d: "(D) Iron metal precipitates out.",
      correct_option: "A",
      explanation: "Step 1: FeCl₃ is the salt of a weak base (Fe(OH)₃) and a strong acid (HCl).\nStep 2: In aqueous solution, chloride ions (Cl⁻) are the conjugate base of a strong acid and do not hydrolyze.\nStep 3: The highly charged ferric cation (Fe³⁺) coordinates with water to form [Fe(H₂O)₆]³⁺, which undergoes pronounced cationic hydrolysis:\n[Fe(H₂O)₆]³⁺ + H₂O ⇌ [Fe(H₂O)₅(OH)]²⁺ + H₃O⁺\nStep 4: The liberation of excess hydronium ions (H₃O⁺) makes the solution distinctly acidic, turning blue litmus red.\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 4594,
    similar: {
      question: "Which of the following salt solutions in water is nearly neutral (pH ≈ 7) and simultaneously acts as an effective buffer solution against both added acid and base?",
      option_a: "(A) Sodium chloride (NaCl)",
      option_b: "(B) Ammonium acetate (CH₃COONH₄)",
      option_c: "(C) Ammonium chloride (NH₄Cl)",
      option_d: "(D) Sodium acetate (CH₃COONa)",
      correct_option: "B",
      explanation: "Step 1: Ammonium acetate (CH₃COONH₄) is a salt of a weak acid (CH₃COOH, pK_a ≈ 4.76) and a weak base (NH₃, pK_b ≈ 4.75).\nStep 2: Its pH is given by: pH = 7 + (1/2)(pK_a - pK_b) = 7 + (1/2)(4.76 - 4.75) ≈ 7.00 (practically neutral).\nStep 3: Because both CH₃COO⁻ (capable of neutralizing added H⁺) and NH₄⁺ (capable of neutralizing added OH⁻) are present in high concentrations, it resists changes in pH and acts as a buffer solution.\nStep 4: NaCl is neutral but has no buffer capacity.\nTherefore, Option (B) is the correct answer."
    }
  },
  {
    id: 4595,
    similar: {
      question: "The solubility product (K_sp) of nickel hydroxide, Ni(OH)₂, is 2.0 × 10⁻¹⁵ at 25 °C. What is its molar solubility in a 0.10 M aqueous NaOH solution?",
      option_a: "(A) 1.41 × 10⁻⁸ M",
      option_b: "(B) 2.0 × 10⁻¹³ M",
      option_c: "(C) 2.0 × 10⁻¹⁴ M",
      option_d: "(D) 1.41 × 10⁻⁶ M",
      correct_option: "B",
      explanation: "Step 1: Sodium hydroxide (NaOH) is a strong base: [OH⁻] = 0.10 M.\nStep 2: Let S be the molar solubility of Ni(OH)₂ in 0.10 M NaOH:\nNi(OH)₂ (s) ⇌ Ni²⁺ (aq) + 2 OH⁻ (aq)\n[Ni²⁺] = S\n[OH⁻] = 0.10 + 2S ≈ 0.10 M (since K_sp is extremely small, 2S << 0.10 M).\nStep 3: Substitute into the solubility product expression:\nK_sp = [Ni²⁺] × [OH⁻]²\n2.0 × 10⁻¹⁵ = S × (0.10)²\n2.0 × 10⁻¹⁵ = S × 1.0 × 10⁻²\nS = (2.0 × 10⁻¹⁵) / (1.0 × 10⁻²) = 2.0 × 10⁻¹³ M.\nTherefore, Option (B) is the correct answer."
    }
  },
  {
    id: 4596,
    similar: {
      question: "Which of the following 0.1 M aqueous solutions exhibits the MAXIMUM electrical conductivity?",
      option_a: "(A) Hydrofluoric acid (HF)",
      option_b: "(B) Formic acid (HCOOH)",
      option_c: "(C) Hydrobromic acid (HBr)",
      option_d: "(D) Hydrocyanic acid (HCN)",
      correct_option: "C",
      explanation: "Step 1: Electrical conductivity of an electrolytic solution is directly proportional to the total concentration of ions present.\nStep 2: HF, HCOOH, and HCN are weak acids that dissociate to an extent of less than 1-5% in 0.1 M solution, producing a very low ion concentration.\nStep 3: Hydrobromic acid (HBr) is a strong mineral acid that ionizes completely (100% dissociation) in water:\nHBr + H₂O → H₃O⁺ + Br⁻.\nStep 4: As a strong electrolyte furnishing the maximum concentration of mobile ions, 0.1 M HBr exhibits the highest conductivity.\nTherefore, Option (C) is the correct answer."
    }
  },
  {
    id: 4597,
    similar: {
      question: "Which of the following chemical species can act as a Bronsted-Lowry acid but NOT as an Arrhenius acid?",
      option_a: "(A) Hydrochloric acid (HCl)",
      option_b: "(B) Nitrous acid (HNO₂)",
      option_c: "(C) Acetic acid (CH₃COOH)",
      option_d: "(D) Ammonium ion (NH₄⁺)",
      correct_option: "D",
      explanation: "Step 1: An Arrhenius acid is traditionally defined as a neutral compound that dissociates in water to produce H⁺ ions (e.g., HCl, HNO₂, CH₃COOH).\nStep 2: A Bronsted-Lowry acid is defined more broadly as any species (neutral or ionic) capable of donating a proton (H⁺) to an acceptor base.\nStep 3: The ammonium ion (NH₄⁺) is a cationic species that donates a proton to a base (NH₄⁺ + B ⇌ NH₃ + BH⁺), functioning as a Bronsted-Lowry acid, but it is not classified as an Arrhenius acid compound.\nStep 4: Therefore, NH₄⁺ (and similar ionic species like H₃O⁺) fits this description.\nTherefore, Option (D) is the correct answer."
    }
  },
  {
    id: 4598,
    similar: {
      question: "The pH of a 0.0040 M aqueous hydrazine (N₂H₄) solution is 9.70 at 25 °C. What is the base dissociation constant (K_b) of hydrazine?",
      option_a: "(A) 6.25 × 10⁻⁷",
      option_b: "(B) 1.25 × 10⁻⁸",
      option_c: "(C) 2.50 × 10⁻⁶",
      option_d: "(D) 5.00 × 10⁻⁷",
      correct_option: "A",
      explanation: "Step 1: Calculate pOH of the solution at 25 °C:\npOH = 14.00 - pH = 14.00 - 9.70 = 4.30.\nStep 2: Calculate the hydroxide ion concentration [OH⁻]:\n[OH⁻] = 10^(-4.30) = 10^(0.70 - 5.00) = 5.0 × 10⁻⁵ M.\nStep 3: For the weak base equilibrium: N₂H₄ + H₂O ⇌ N₂H₅⁺ + OH⁻:\n[OH⁻] = √(K_b × C)\n[OH⁻]² = K_b × C\nStep 4: Solve for K_b using C = 0.0040 M:\nK_b = [OH⁻]² / C = (5.0 × 10⁻⁵)² / 0.0040\nK_b = (2.5 × 10⁻⁹) / (4.0 × 10⁻³) = 0.625 × 10⁻⁶ = 6.25 × 10⁻⁷.\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 4599,
    similar: {
      question: "The fundamental relationship pK_a + pK_b = pK_w (or K_a × K_b = K_w) is valid strictly for which of the following pairs?",
      option_a: "(A) Any conjugate acid-base pair (e.g., NH₄⁺ and NH₃)",
      option_b: "(B) Any strong acid and strong base",
      option_c: "(C) Any mixture of two weak acids",
      option_d: "(D) Any acid and arbitrary salt",
      correct_option: "A",
      explanation: "Step 1: Consider a weak acid HA and its conjugate base A⁻:\n(1) HA + H₂O ⇌ H₃O⁺ + A⁻   (K_a = [H₃O⁺][A⁻] / [HA])\n(2) A⁻ + H₂O ⇌ HA + OH⁻   (K_b = [HA][OH⁻] / [A⁻])\nStep 2: Multiplying K_a and K_b:\nK_a × K_b = ([H₃O⁺][A⁻] / [HA]) × ([HA][OH⁻] / [A⁻]) = [H₃O⁺][OH⁻] = K_w.\nStep 3: Taking negative logarithms on both sides:\npK_a + pK_b = pK_w = 14 (at 25 °C).\nStep 4: This relationship applies strictly and exclusively to a conjugate acid-base pair.\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 4600,
    similar: {
      question: "According to the Bronsted-Lowry concept, what is the conjugate acid of acetic acid (CH₃COOH)?",
      option_a: "(A) Acetate ion (CH₃COO⁻)",
      option_b: "(B) Protonated acetic acid (CH₃COOH₂⁺)",
      option_c: "(C) Acetyl cation (CH₃CO⁺)",
      option_d: "(D) Hydronium ion (H₃O⁺)",
      correct_option: "B",
      explanation: "Step 1: By definition, the conjugate acid of any species is obtained by adding a proton (H⁺) to that species:\nConjugate Acid = Base + H⁺.\nStep 2: When acetic acid (CH₃COOH) acts as a base and accepts a proton (e.g., in superacid media):\nCH₃COOH + H⁺ → CH₃COOH₂⁺.\nStep 3: The resulting species is protonated acetic acid (CH₃COOH₂⁺).\nStep 4: Note that CH₃COO⁻ is the conjugate base (formed by losing H⁺), not the conjugate acid.\nTherefore, Option (B) is the correct answer."
    }
  },
  {
    id: 4601,
    similar: {
      question: "What is the pH of a 0.0030 M aqueous hydrobromic acid (HBr) solution at 25 °C? (Given: log 3 = 0.477)",
      option_a: "(A) 3.00",
      option_b: "(B) 3.52",
      option_c: "(C) 2.52",
      option_d: "(D) 2.00",
      correct_option: "C",
      explanation: "Step 1: Hydrobromic acid (HBr) is a strong monoprotic mineral acid that ionizes completely in water:\nHBr → H⁺ + Br⁻.\nStep 2: Therefore, the hydronium ion concentration is:\n[H⁺] = 0.0030 M = 3.0 × 10⁻³ M.\nStep 3: Calculate pH:\npH = -log[H⁺] = -log(3.0 × 10⁻³)\npH = -[log(3.0) + log(10⁻³)] = -[0.477 - 3] = 3 - 0.477 = 2.523 ≈ 2.52.\nTherefore, Option (C) is the correct answer."
    }
  },
  {
    id: 4602,
    similar: {
      question: "What is the pH of a solution prepared by dissolving 0.56 g of potassium hydroxide (KOH) in distilled water to give 200 mL of solution at 25 °C? (Molar mass of KOH = 56 g/mol)",
      option_a: "(A) 1.30",
      option_b: "(B) 12.70",
      option_c: "(C) 11.70",
      option_d: "(D) 2.30",
      correct_option: "B",
      explanation: "Step 1: Calculate moles of KOH:\nMoles of KOH = Mass / Molar mass = 0.56 g / 56 g/mol = 0.010 mol.\nStep 2: Calculate molarity of the KOH solution:\nMolarity = Moles / Volume in liters = 0.010 mol / 0.200 L = 0.050 M.\nStep 3: KOH is a strong base that completely dissociates:\n[OH⁻] = 0.050 M = 5.0 × 10⁻² M.\nStep 4: Calculate pOH:\npOH = -log[OH⁻] = -log(5.0 × 10⁻²) = 2 - log(5.0) = 2 - 0.70 = 1.30.\nStep 5: At 25 °C, pH = 14.00 - pOH = 14.00 - 1.30 = 12.70.\nTherefore, Option (B) is the correct answer."
    }
  },
  {
    id: 4603,
    similar: {
      question: "The pH of a 0.10 M aqueous solution of cyanic acid (HCNO) is 2.30 at 25 °C. What is the dissociation constant (K_a) of this acid? (Given: 10^(0.70) ≈ 5.0)",
      option_a: "(A) 5.0 × 10⁻⁵",
      option_b: "(B) 2.5 × 10⁻⁴",
      option_c: "(C) 1.25 × 10⁻³",
      option_d: "(D) 2.5 × 10⁻⁶",
      correct_option: "B",
      explanation: "Step 1: Calculate hydronium ion concentration from pH = 2.30:\n[H⁺] = 10^(-pH) = 10^(-2.30) = 10^(0.70 - 3.00) = 5.0 × 10⁻³ M.\nStep 2: For a weak monoprotic acid HCNO ⇌ H⁺ + CNO⁻:\nAt equilibrium: [H⁺] = [CNO⁻] = 5.0 × 10⁻³ M.\n[HCNO] = C - [H⁺] = 0.10 - 0.0050 = 0.095 M ≈ 0.10 M.\nStep 3: Calculate dissociation constant K_a:\nK_a = ([H⁺] × [CNO⁻]) / [HCNO] = (5.0 × 10⁻³)² / 0.10\nK_a = (2.5 × 10⁻⁵) / 0.10 = 2.5 × 10⁻⁴.\nTherefore, Option (B) is the correct answer."
    }
  }
];

async function run() {
  try {
    console.log('Logging in...');
    const token = await login();
    console.log('Logged in successfully. Updating Test 96 Part 3 questions (20 questions)...');
    
    for (const item of test96Part3Updates) {
      console.log(`Updating Question ID: ${item.id}...`);
      await updateTestQuestion(token, item.id, item.similar);
      console.log(`Updated ID: ${item.id} successfully.`);
    }
    console.log('All Test 96 Part 3 questions updated successfully!');
  } catch (err) {
    console.error('Error in Test 96 Part 3 update:', err);
  }
}

run();
