const https = require('https');

const loginData = JSON.stringify({
  username: "indraprasthaadmin",
  password: "indraprastha@123"
});

function post(url, data, token = null) {
  return new Promise((resolve, reject) => {
    const u = new URL(url);
    const headers = {
      'Content-Type': 'application/json',
      'Content-Length': Buffer.byteLength(data)
    };
    if (token) headers['Authorization'] = `Bearer ${token}`;

    const req = https.request({
      hostname: u.hostname,
      port: u.port || 443,
      path: u.pathname + u.search,
      method: 'POST',
      headers
    }, (res) => {
      let body = '';
      res.on('data', chunk => body += chunk);
      res.on('end', () => {
        try {
          resolve(JSON.parse(body));
        } catch(e) {
          resolve(body);
        }
      });
    });
    req.on('error', reject);
    req.write(data);
    req.end();
  });
}

function put(url, data, token) {
  return new Promise((resolve, reject) => {
    const u = new URL(url);
    const headers = {
      'Content-Type': 'application/json',
      'Content-Length': Buffer.byteLength(data),
      'Authorization': `Bearer ${token}`
    };

    const req = https.request({
      hostname: u.hostname,
      port: u.port || 443,
      path: u.pathname + u.search,
      method: 'PUT',
      headers
    }, (res) => {
      let body = '';
      res.on('data', chunk => body += chunk);
      res.on('end', () => {
        try {
          resolve(JSON.parse(body));
        } catch(e) {
          resolve(body);
        }
      });
    });
    req.on('error', reject);
    req.write(data);
    req.end();
  });
}

const test109Questions = [
  {
    id: 4303,
    similarQuestion: {
      question: "Which of the following organic compounds reacts with aqueous sodium bicarbonate (NaHCO₃) to evolve carbon dioxide (CO₂) gas with brisk effervescence?",
      option_a: "Benzoic acid",
      option_b: "Phenol",
      option_c: "Cyclohexanol",
      option_d: "Acetamide",
      correct_option: "A",
      explanation: "1. Sodium bicarbonate (NaHCO₃) is a weak base that reacts with acids stronger than carbonic acid (H₂CO₃, pKₐ ≈ 6.4) to release CO₂ gas:\n   R–COOH + NaHCO₃ → R–COONa + H₂O + CO₂↑\n2. Benzoic acid (pKₐ ≈ 4.2) is stronger than carbonic acid and readily decomposes NaHCO₃, producing brisk effervescence of CO₂ gas.\n3. Phenol (pKₐ ≈ 10) and aliphatic alcohols like cyclohexanol (pKₐ ≈ 16) are significantly weaker acids than carbonic acid and cannot liberate CO₂ from aqueous NaHCO₃.\n4. Acetamide is a nearly neutral amide.\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 4304,
    similarQuestion: {
      question: "In 2,6-dimethylnitrobenzene, the C–N bond length is significantly longer than the C–N bond length in nitrobenzene because of:",
      option_a: "Steric inhibition of resonance (SIR effect), which forces the –NO₂ group out of the aromatic ring plane and prevents π conjugation.",
      option_b: "Strong +M electron-donating effect exerted by the two ortho-methyl groups.",
      option_c: "Hyperconjugation of the methyl groups that shortens the adjacent ring bonds.",
      option_d: "Strong –I inductive effect of the two ortho-methyl groups.",
      correct_option: "A",
      explanation: "1. In nitrobenzene, the –NO₂ group is planar with the benzene ring, allowing extensive p–π overlap (resonance) which imparts partial double bond character to the C–N bond, making it shorter.\n2. In 2,6-dimethylnitrobenzene, the two bulky methyl groups at the ortho positions exert strong steric repulsion against the oxygen atoms of the –NO₂ group.\n3. This steric repulsion twists the –NO₂ group out of the plane of the benzene ring (Steric Inhibition of Resonance or SIR effect).\n4. Due to the loss of resonance, the C–N bond has pure single bond character and is significantly longer.\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 4305,
    similarQuestion: {
      question: "Which of the following aromatic amines is the weakest base in aqueous medium due to the ortho effect?",
      option_a: "o-Toluidine (2-methylaniline)",
      option_b: "p-Toluidine (4-methylaniline)",
      option_c: "m-Toluidine (3-methylaniline)",
      option_d: "Aniline",
      correct_option: "A",
      explanation: "1. In substituted anilines, an ortho substituent (regardless of whether it is electron-donating or electron-withdrawing) decreases the basic strength relative to aniline.\n2. This phenomenon is known as the ortho effect in anilines: the ortho substituent causes steric hindrance to protonation of the –NH₂ group and inhibits the hydration/solvation of the conjugate anilinium cation, destabilizing it.\n3. Consequently, o-toluidine is a significantly weaker base than aniline, m-toluidine, and p-toluidine.\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 4306,
    similarQuestion: {
      question: "Why is the trichloromethyl carbanion (⁻:CCl₃) more stable than the trifluoromethyl carbanion (⁻:CF₃)?",
      option_a: "The unshared electron pair on carbon in ⁻:CCl₃ is delocalized into the vacant 3d orbitals of chlorine through pπ–dπ back-bonding.",
      option_b: "Fluorine has a weaker –I inductive effect than chlorine.",
      option_c: "Chlorine has greater electronegativity than fluorine.",
      option_d: "⁻:CF₃ is stabilized by hyperconjugation.",
      correct_option: "A",
      explanation: "1. Fluorine is a second-period element with no vacant d orbitals, so ⁻:CF₃ can only be stabilized by inductive effect (–I), but suffers from strong lone pair repulsion between 2p orbitals.\n2. Chlorine is a third-period element possessing energetically accessible empty 3d orbitals.\n3. In ⁻:CCl₃, the lone pair of electrons on the carbanion carbon delocalizes into the vacant 3d orbitals of the three chlorine atoms (pπ–dπ back-bonding / resonance).\n4. This d-orbital delocalization imparts substantial additional stability to ⁻:CCl₃ over ⁻:CF₃.\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 4307,
    similarQuestion: {
      question: "What is the correct decreasing order of the +M (electron-donating resonance) effect among the following groups?",
      option_a: "–NH₂ > –OH > –O–COCH₃",
      option_b: "–OH > –NH₂ > –O–COCH₃",
      option_c: "–O–COCH₃ > –OH > –NH₂",
      option_d: "–NH₂ > –O–COCH₃ > –OH",
      correct_option: "A",
      explanation: "1. The +M effect depends on the electronegativity and availability of the lone pair on the donor atom.\n2. Nitrogen is less electronegative than oxygen (electronegativity: N ≈ 3.0 vs O ≈ 3.5), so nitrogen donates its lone pair more readily; thus, –NH₂ has a stronger +M effect than –OH.\n3. In the ester group –O–COCH₃, the lone pair on the oxygen atom is delocalized internally by resonance into the carbonyl group (–C=O), making it less available for external +M donation.\n4. Therefore, the +M effect order is: –NH₂ > –OH > –O–COCH₃.\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 4308,
    similarQuestion: {
      question: "In acetic acid (CH₃COOH) and acetate ion (CH₃COO⁻), how do the carbon-oxygen bond lengths compare?",
      option_a: "Acetate ion has two equal C–O bond lengths that are intermediate between the C=O double bond and C–O single bond of acetic acid.",
      option_b: "Acetic acid has two equal C–O bond lengths due to resonance.",
      option_c: "Both C–O bonds in acetate ion are shorter than the C=O double bond in acetic acid.",
      option_d: "The C=O bond in acetic acid is longer than the single C–O bond in acetic acid.",
      correct_option: "A",
      explanation: "1. In acetic acid (CH₃COOH), the C=O bond is a localized double bond (length ≈ 1.21 Å), and the C–OH bond is a localized single bond (length ≈ 1.36 Å).\n2. In the acetate anion (CH₃COO⁻), resonance between two identical contributing structures distributes the negative charge equally over both oxygen atoms.\n3. Both carbon-oxygen bonds have an identical bond order of 1.5, resulting in equal bond lengths (≈ 1.27 Å).\n4. These bond lengths are intermediate between the double C=O and single C–O bond lengths of unionized acetic acid.\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 4309,
    similarQuestion: {
      question: "When cyclopentadiene reacts with sodium hydride (NaH), it evolves H₂ gas and forms an anion. What makes this anion extraordinarily stable?",
      option_a: "It has 6 π electrons in a planar, completely conjugated ring, fulfilling Hückel's rule (4n + 2, with n = 1) for aromaticity.",
      option_b: "It is stabilized only by inductive electron withdrawal from sp² carbons.",
      option_c: "It forms an antiaromatic ring system with 4 π electrons.",
      option_d: "It contains an sp³ hybridized carbanion carbon with tetrahedral geometry.",
      correct_option: "A",
      explanation: "1. Cyclopentadiene has unusually acidic methylene protons (pKₐ ≈ 16) for a hydrocarbon.\n2. Deprotonation by a strong base like NaH produces cyclopentadienyl anion (C₅H₅⁻) and liberates H₂ gas.\n3. The anion is planar and completely conjugated, containing two π bonds (4 π electrons) plus the carbanion lone pair (2 π electrons), totaling 6 π electrons.\n4. According to Hückel's rule, a cyclic planar conjugated ring with (4n + 2) π electrons (where n = 1 gives 6 π electrons) is aromatic.\n5. The aromatic resonance stabilization imparts exceptional thermodynamic stability to the cyclopentadienyl anion.\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 4310,
    similarQuestion: {
      question: "What is the correct decreasing order of thermodynamic stability among the isomeric butenes?",
      option_a: "2-Methylpropene > trans-But-2-ene > cis-But-2-ene > But-1-ene",
      option_b: "But-1-ene > cis-But-2-ene > trans-But-2-ene > 2-Methylpropene",
      option_c: "trans-But-2-ene > 2-Methylpropene > cis-But-2-ene > But-1-ene",
      option_d: "cis-But-2-ene > trans-But-2-ene > 2-Methylpropene > But-1-ene",
      correct_option: "A",
      explanation: "1. Alkene stability increases with the number of hyperconjugative α-hydrogens and decreases with steric strain.\n2. 2-Methylpropene ((CH₃)₂C=CH₂) has 6 α-hydrogens attached to the same sp² carbon (geminal dimethyl stability), making it the most stable.\n3. trans-But-2-ene has 6 α-hydrogens and minimal steric repulsion because the two methyl groups are oriented opposite to each other across the double bond.\n4. cis-But-2-ene also has 6 α-hydrogens, but is destabilized by steric repulsion between the adjacent eclipsed methyl groups.\n5. But-1-ene (CH₃–CH₂–CH=CH₂) has only 2 α-hydrogens and is the least stable.\n6. Thus, the stability order is: 2-Methylpropene > trans-But-2-ene > cis-But-2-ene > But-1-ene.\nTherefore, Option (A) is the correct answer."
    }
  }
];

async function run() {
  try {
    const loginRes = await post('https://api.indraprasthaneetacademy.com/api/admin/login', loginData);
    const token = loginRes.token;
    console.log('Logged in successfully, token received.');

    for (const q of test109Questions) {
      const res = await put(
        `https://api.indraprasthaneetacademy.com/api/admin/test-questions/${q.id}`,
        JSON.stringify({ similarQuestion: q.similarQuestion }),
        token
      );
      console.log(`Updated Test Question ID ${q.id}: ${res.success ? 'SUCCESS' : JSON.stringify(res)}`);
    }
    console.log('All 8 questions of Test 109 updated successfully!');
  } catch (err) {
    console.error('Error updating questions:', err);
  }
}

run();
