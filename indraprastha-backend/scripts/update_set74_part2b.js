const https = require('https');

function login() {
  return new Promise((resolve, reject) => {
    const postData = JSON.stringify({
      username: 'indraprasthaadmin',
      password: 'indraprastha@123'
    });

    const req = https.request({
      hostname: 'api.indraprasthaneetacademy.com',
      path: '/api/admin/login',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(postData)
      }
    }, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try {
          const parsed = JSON.parse(data);
          resolve(parsed.token || parsed.jwt);
        } catch (e) {
          reject(e);
        }
      });
    });
    req.on('error', reject);
    req.write(postData);
    req.end();
  });
}

function updateQuestion(id, similarData, token) {
  return new Promise((resolve, reject) => {
    const postData = JSON.stringify({
      similarQuestion: similarData
    });

    const req = https.request({
      hostname: 'api.indraprasthaneetacademy.com',
      path: `/api/admin/practice-questions/${id}`,
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
        'Content-Length': Buffer.byteLength(postData)
      }
    }, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        if (res.statusCode >= 200 && res.statusCode < 300) {
          resolve(data);
        } else {
          reject(new Error(`Failed with status ${res.statusCode}: ${data}`));
        }
      });
    });
    req.on('error', reject);
    req.write(postData);
    req.end();
  });
}

const questions = [
  {
    id: 4111,
    data: {
      question: "When two moles of phenol are heated with one mole of phthalic anhydride in the presence of concentrated sulfuric acid as a dehydrating condensing agent, what classic acid-base indicator (P) is produced?",
      option_a: "Methyl orange",
      option_b: "Fluorescein",
      option_c: "Alizarin",
      option_d: "Phenolphthalein",
      "correct_option": "D",
      explanation: "Step 1: Condensation reaction:\nPhthalic anhydride + 2 C₆H₅OH —(conc. H₂SO₄, heat)→ Phenolphthalein + H₂O\n\nStep 2: Electrophilic attack on phenol:\nThe carbonyl group of phthalic anhydride is protonated by conc. H₂SO₄, attacking two molecules of phenol at their para positions with the elimination of one molecule of water.\n\nStep 3: Nature of product:\nThe resulting phthalein dye is phenolphthalein, widely utilized as an acid-base indicator that is colorless in acidic solution and intense pink/fuchsia in basic solution (pH 8.3–10.0).\n\nStep 4: Therefore, product (P) is phenolphthalein.\nTherefore, Option (D) is the correct answer."
    }
  },
  {
    id: 4112,
    data: {
      question: "Which of the following organic reactions produces a KETONE as the major product?",
      option_a: "Oxidation of butan-1-ol with PCC in CH₂Cl₂",
      option_b: "Hydroboration-oxidation of prop-1-ene",
      option_c: "Catalytic hydration of propyne in the presence of dilute H₂SO₄ and HgSO₄ at 333 K",
      option_d: "Ozonolysis of ethene followed by reductive cleavage with Zn/H₂O",
      "correct_option": "C",
      explanation: "Step 1: Catalytic hydration of propyne (Kucherov reaction):\nPropyne reacts with water in the presence of 1% mercuric sulfate (HgSO₄) and 40% dilute sulfuric acid at 333 K:\nCH₃–C≡CH + H₂O —(Hg²⁺, H⁺)→ [CH₃–C(OH)=CH₂] (enol intermediate)\n\nStep 2: Keto-enol tautomerism:\nThe enol tautomer rapidly isomerizes via keto-enol tautomerism into the thermodynamically much more stable ketone, acetone (propan-2-one):\nCH₃–C(OH)=CH₂ ⇌ CH₃–CO–CH₃\n\nStep 3: Other reactions:\n- Oxidation of butan-1-ol with PCC yields butanal (aldehyde).\n- Hydroboration-oxidation of propene yields propan-1-ol (primary alcohol).\n- Ozonolysis of ethene yields formaldehyde (aldehyde).\n\nStep 4: Therefore, hydration of propyne produces a ketone.\nTherefore, Option (C) is the correct answer."
    }
  },
  {
    id: 4113,
    data: {
      question: "When cyclohexanol is heated with concentrated sulfuric acid (conc. H₂SO₄) at 440 K, which organic product is formed?",
      option_a: "Cyclohexanone",
      option_b: "Cyclohexane",
      option_c: "1,2-Dicyclohexylethane",
      option_d: "Cyclohexene",
      "correct_option": "D",
      explanation: "Step 1: Acid-catalyzed dehydration:\nCyclohexanol (C₆H₁₁OH) is heated with concentrated H₂SO₄ at ~440 K (170 °C).\n\nStep 2: Mechanism:\n- Protonation: The hydroxyl group is protonated to form an alkyloxonium ion: C₆H₁₁–OH₂⁺.\n- Carbocation generation: Water departs to generate a secondary cyclohexyl carbocation (C₆H₁₁⁺).\n- Deprotonation: A base (HSO₄⁻ or H₂O) abstracts an adjacent β-proton to create a ring carbon-carbon double bond:\nC₆H₁₁OH —(conc. H₂SO₄, heat)→ Cyclohexene (C₆H₁₀) + H₂O\n\nStep 3: Therefore, cyclohexene is formed.\nTherefore, Option (D) is the correct answer."
    }
  },
  {
    id: 4114,
    data: {
      question: "What is the rate-determining step in the acid-catalyzed dehydration of secondary and tertiary alcohols to alkenes via the E1 elimination pathway?",
      option_a: "Protonation of the alcoholic oxygen atom by acid",
      option_b: "Deprotonation of the β-carbon by conjugate base",
      option_c: "Heterolytic cleavage of the C–O bond with loss of a water molecule to form a carbocation intermediate",
      option_d: "Rearrangement of the double bond",
      "correct_option": "C",
      explanation: "Step 1: Steps in acid-catalyzed E1 dehydration:\n- Step 1 (Rapid acid-base equilibrium): Protonation of alcohol to form alkyloxonium ion:\nR–OH + H⁺ ⇌ R–OH₂⁺ (Fast).\n- Step 2 (Slow, rate-determining step): Heterolytic dissociation of the C–O bond with departure of water to generate a planar carbocation:\nR–OH₂⁺ —(slow, r.d.s.)→ R⁺ + H₂O.\n- Step 3 (Rapid elimination): Removal of a β-proton by a weak base to form the alkene:\nR⁺ —(fast)→ Alkene + H⁺.\n\nStep 2: Therefore, the formation of the carbocation by loss of water is the rate-determining step.\nTherefore, Option (C) is the correct answer."
    }
  }
];

async function run() {
  try {
    console.log('Logging in...');
    const token = await login();
    console.log('Logged in successfully. Updating Set 74 Part 2b questions...');

    for (const q of questions) {
      console.log(`Updating Question ID: ${q.id}...`);
      await updateQuestion(q.id, q.data, token);
      console.log(`Updated ID: ${q.id} successfully.`);
    }

    console.log('All Set 74 Part 2b questions updated successfully!');
  } catch (err) {
    console.error('Error:', err);
  }
}

run();
