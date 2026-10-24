const https = require('https');

const loginData = JSON.stringify({
  username: 'indraprasthaadmin',
  password: 'indraprastha@123'
});

function postRequest(url, data, token = null) {
  return new Promise((resolve, reject) => {
    const urlObj = new URL(url);
    const options = {
      hostname: urlObj.hostname,
      port: 443,
      path: urlObj.pathname,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(data)
      }
    };
    if (token) options.headers['Authorization'] = `Bearer ${token}`;

    const req = https.request(options, (res) => {
      let body = '';
      res.on('data', chunk => body += chunk);
      res.on('end', () => {
        try {
          resolve({ status: res.statusCode, data: JSON.parse(body) });
        } catch (e) {
          resolve({ status: res.statusCode, data: body });
        }
      });
    });
    req.on('error', reject);
    req.write(data);
    req.end();
  });
}

function putRequest(url, data, token) {
  return new Promise((resolve, reject) => {
    const urlObj = new URL(url);
    const options = {
      hostname: urlObj.hostname,
      port: 443,
      path: urlObj.pathname,
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(data),
        'Authorization': `Bearer ${token}`
      }
    };

    const req = https.request(options, (res) => {
      let body = '';
      res.on('data', chunk => body += chunk);
      res.on('end', () => {
        try {
          resolve({ status: res.statusCode, data: JSON.parse(body) });
        } catch (e) {
          resolve({ status: res.statusCode, data: body });
        }
      });
    });
    req.on('error', reject);
    req.write(data);
    req.end();
  });
}

const updates = [
  {
    id: 3831,
    similarQuestion: {
      question: "Which of the following species has the highest electron affinity (maximum energy released upon adding an electron)?",
      option_a: "Cl(g)",
      option_b: "F(g)",
      option_c: "Na⁺(g)",
      option_d: "O⁻(g)",
      correct_option: "C",
      explanation: "1. The process Na⁺(g) + e⁻ → Na(g) is the reverse of the first ionization of sodium. The energy released equals the first ionization energy of sodium (~5.14 eV = 496 kJ mol⁻¹).\n2. For neutral halogens, electron gain enthalpy releases 349 kJ mol⁻¹ (Cl) and 328 kJ mol⁻¹ (F).\n3. Adding an electron to an anion like O⁻(g) is endothermic (+780 kJ mol⁻¹) because of strong electron-electron repulsion.\n4. Therefore, among the choices, Na⁺(g) possesses the highest electron affinity.\nTherefore, Option (C) is the correct answer."
    }
  },
  {
    id: 3832,
    similarQuestion: {
      question: "Which of the following statements regarding the modern periodic table and electronic configurations is INCORRECT?",
      option_a: "Physical and chemical properties of elements are periodic functions of their atomic numbers.",
      option_b: "Metallic elements significantly outnumber non-metallic elements in the periodic table.",
      option_c: "In inner transition elements (lanthanoids and actinoids), the differentiating electron enters the penultimate (n-1)d subshell.",
      option_d: "First ionization enthalpies across a period do not increase completely monotonically due to stability of half-filled and fully-filled subshells.",
      correct_option: "C",
      explanation: "Let us examine the statements:\n1. Modern periodic law states that physical and chemical properties depend on atomic number (Z). (Statement A is correct)\n2. More than 78% of known elements are metals. (Statement B is correct)\n3. In inner transition elements (lanthanoids and actinoids), the differentiating electron enters the antepenultimate (n-2)f subshell, not the (n-1)d subshell. Transition elements fill the (n-1)d subshell. Thus, statement (C) is INCORRECT.\n4. Anomalies in ionization enthalpy (e.g., Be > B and N > O) occur because of fully-filled 2s and half-filled 2p subshells. (Statement D is correct)\nTherefore, Option (C) is the correct answer."
    }
  },
  {
    id: 3833,
    similarQuestion: {
      question: "Among the following elements, which one possesses the highest metallic (electropositive) character?",
      option_a: "Cs",
      option_b: "Na",
      option_c: "Mg",
      option_d: "Al",
      correct_option: "A",
      explanation: "Metallic character is determined by the ease with which an atom loses its valence electrons (electropositivity):\n1. Down a group, atomic size increases and effective nuclear charge decreases, lowering the ionization enthalpy and increasing metallic character.\n2. Across a period from left to right, metallic character decreases due to increasing nuclear charge.\n3. Among the given options, Cesium (Cs) is located at the lower region of Group 1 (alkali metals) and has the lowest ionization enthalpy, allowing it to lose its outer electron most readily.\nTherefore, Cs has the highest metallic character.\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 3834,
    similarQuestion: {
      question: "Which of the following represents the correct order of increasing first ionization enthalpy (IE₁) for the second-period elements?",
      option_a: "Li < Be < B < C < N < O < F < Ne",
      option_b: "Li < B < Be < C < O < N < F < Ne",
      option_c: "Li < B < Be < C < N < O < F < Ne",
      option_d: "B < Li < Be < C < O < N < F < Ne",
      correct_option: "B",
      explanation: "Generally, first ionization enthalpy increases across a period from left to right due to increasing effective nuclear charge. However, two notable exceptions occur:\n1. Be (1s² 2s²) has a fully-filled 2s subshell with higher penetration and stability compared to B (1s² 2s² 2p¹), where the lone 2p electron is more easily removed. Hence, IE₁(Be) > IE₁(B).\n2. N (1s² 2s² 2p³) has an extra-stable half-filled 2p subshell compared to O (1s² 2s² 2p⁴), where electron-electron pairing in one 2p orbital increases repulsion. Hence, IE₁(N) > IE₁(O).\nTherefore, the correct increasing order of IE₁ is:\nLi < B < Be < C < O < N < F < Ne\nTherefore, Option (B) is the correct answer."
    }
  },
  {
    id: 3835,
    similarQuestion: {
      question: "An element has an ionization energy of IE = x eV/atom and an electron affinity of EA = y eV/atom. The electronegativity of the element on the Pauling scale is 2.1. Which of the following expressions correctly represents its electronegativity on the Mulliken scale?\n(A) (x + y) / 2\n(B) 2.1 × 2.8\n(C) (x + y) / 5.6\n(D) 2.1 / 2.8",
      option_a: "A and B",
      option_b: "B and C",
      option_c: "A and D",
      option_d: "C and D",
      correct_option: "A",
      explanation: "1. According to Mulliken, electronegativity (χ_M) is the arithmetic average of ionization energy and electron affinity:\nχ_M = (IE + EA) / 2 = (x + y) / 2 (when energies are in eV/atom). Thus, expression (A) is correct.\n2. The relationship connecting the Pauling scale (χ_P) and the Mulliken scale (χ_M) is:\nχ_P = χ_M / 2.8  ⇒  χ_M = χ_P × 2.8\nGiven χ_P = 2.1, it follows that χ_M = 2.1 × 2.8. Thus, expression (B) is also correct.\nTherefore, expressions (A) and (B) correctly represent the Mulliken electronegativity.\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 3836,
    similarQuestion: {
      question: "Which of the following orders of ionic mobility in aqueous solution is/are correct?\n(A) Li⁺(aq) < Na⁺(aq) < K⁺(aq) < Rb⁺(aq) < Cs⁺(aq)\n(B) Be²⁺(aq) < Mg²⁺(aq) < Ca²⁺(aq) < Ba²⁺(aq)\n(C) F⁻(aq) < Cl⁻(aq) < Br⁻(aq) < I⁻(aq)\n(D) Cs⁺(aq) < Li⁺(aq)",
      option_a: "A and B only",
      option_b: "B and C only",
      option_c: "A, B, and C",
      option_d: "All of the above",
      correct_option: "C",
      explanation: "In aqueous solution:\n1. Smaller gaseous ions have higher charge densities and therefore undergo extensive hydration.\n2. Li⁺ has the largest hydrated radius among alkali metals, while Cs⁺ has the smallest hydrated radius.\n3. Ionic mobility is inversely proportional to the hydrated radius because larger hydrated species experience greater hydrodynamic frictional drag.\n4. Therefore, ionic mobility increases down the group as hydration decreases:\nLi⁺ < Na⁺ < K⁺ < Rb⁺ < Cs⁺ (Statement A is correct)\nBe²⁺ < Mg²⁺ < Ca²⁺ < Ba²⁺ (Statement B is correct)\nF⁻ < Cl⁻ < Br⁻ < I⁻ (Statement C is correct)\nStatement (D) is incorrect.\nTherefore, statements (A), (B), and (C) are correct.\nTherefore, Option (C) is the correct answer."
    }
  },
  {
    id: 3837,
    similarQuestion: {
      question: "Which of the following statements regarding electron gain enthalpy (Δ_eg H) is/are correct?\n(A) The first electron gain enthalpy (Δ_eg H₁) for non-metals like halogens and chalcogens is negative (exothermic).\n(B) The second electron gain enthalpy (Δ_eg H₂) for any atom is always positive (endothermic).\n(C) Addition of an electron to a noble gas atom requires energy (Δ_eg H > 0).\n(D) The second electron gain enthalpy of oxygen (O⁻ + e⁻ → O²⁻) is exothermic.",
      option_a: "A, B, C",
      option_b: "A, D",
      option_c: "B, D",
      option_d: "C, D",
      correct_option: "A",
      explanation: "Let us evaluate the statements:\n1. Adding the first electron to neutral non-metal atoms usually releases energy due to nuclear attraction, so Δ_eg H₁ is negative (exothermic). Statement (A) is correct.\n2. Adding an electron to an already negatively charged anion (e.g. O⁻ + e⁻ → O²⁻) experiences strong electrostatic repulsion; overcoming this requires input of energy, so Δ_eg H₂ is always positive (endothermic) for all elements. Statement (B) is correct and (D) is incorrect.\n3. Noble gases have completely filled stable valence octets (ns² np⁶); adding an electron forces it into the next higher principal quantum shell, requiring significant energy (Δ_eg H > 0). Statement (C) is correct.\nTherefore, statements (A), (B), and (C) are correct.\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 3838,
    similarQuestion: {
      question: "The electron gain enthalpy of chlorine is -349 kJ mol⁻¹. What is the approximate value of the electron gain enthalpy of fluorine?",
      option_a: "-355 kJ mol⁻¹",
      option_b: "-328 kJ mol⁻¹",
      option_c: "-300 kJ mol⁻¹",
      option_d: "-200 kJ mol⁻¹",
      correct_option: "B",
      explanation: "The electron gain enthalpy of fluorine (-328 kJ mol⁻¹) is unexpectedly less negative than that of chlorine (-349 kJ mol⁻¹).\nThis is attributed to the extremely compact size of the 2p subshell in fluorine, where the incoming electron experiences strong interelectronic repulsions from the existing valence electrons. In chlorine, the added electron occupies the larger, more diffuse 3p subshell with significantly lower mutual repulsion.\nTherefore, Option (B) is the correct answer."
    }
  },
  {
    id: 3839,
    similarQuestion: {
      question: "The successive ionization enthalpies (in kJ mol⁻¹) of two elements X and Y are given below:\nElement X: IE₁ = 738, IE₂ = 1450, IE₃ = 7730\nElement Y: IE₁ = 590, IE₂ = 1145, IE₃ = 4912\nWhich of the following deductions is correct?",
      option_a: "Both X and Y belong to Group 1, with X placed below Y.",
      option_b: "Both X and Y belong to Group 2, with X placed below Y.",
      option_c: "Both X and Y belong to Group 1, with Y placed below X.",
      option_d: "Both X and Y belong to Group 2, with Y placed below X.",
      correct_option: "D",
      explanation: "1. For both elements X and Y, the difference between IE₁ and IE₂ is modest, while there is a massive jump from IE₂ to IE₃ (a 5-fold increase). This reveals that both elements have two valence electrons, after which the third electron must be extracted from a stable noble-gas core. Hence, both X and Y belong to Group 2 (alkaline earth metals).\n2. Down a group, ionization enthalpy decreases due to increasing atomic radius and increased screening.\nSince element Y has lower values (IE₁ = 590 kJ mol⁻¹) than element X (IE₁ = 738 kJ mol⁻¹), element Y has a larger atomic size and is located below element X in Group 2 (X is Mg and Y is Ca).\nTherefore, Option (D) is the correct answer."
    }
  },
  {
    id: 4659,
    similarQuestion: {
      question: "The elements occupying groups 3 to 12 in the modern periodic table, which serve as a bridge between the electropositive s-block metals and the more electronegative p-block elements, are known as:",
      option_a: "Representative elements",
      option_b: "Transition elements",
      option_c: "Inner transition elements",
      option_d: "Typical elements",
      correct_option: "B",
      explanation: "The d-block elements (groups 3 to 12) are termed 'transition elements' because they occupy the middle of the periodic table, bridging the highly electropositive, active metals of the s-block with the non-metals and metalloids of the p-block.\nTherefore, Option (B) is the correct answer."
    }
  },
  {
    id: 4660,
    similarQuestion: {
      question: "The chemistry of actinoids is significantly more complex and difficult to study than that of lanthanoids because:\n(A) Actinoids exhibit a wider range of oxidation states due to comparable energies of 5f, 6d, and 7s subshells.\n(B) All actinoids are radioactive and many synthetic transuranic members have very short half-lives.\n(C) Several actinoids can only be prepared in microgram or nanogram quantities.\n(D) All of the above factors.",
      option_a: "A and B only",
      option_b: "A and C only",
      option_c: "B and C only",
      option_d: "All of the above factors",
      correct_option: "D",
      explanation: "The study of actinoids is far more complicated than lanthanoids due to multiple reasons:\n1. The 5f, 6d, and 7s orbitals are of comparable energy, allowing participation of electrons in bonding and giving rise to a wide variety of oxidation states (+3 to +7).\n2. All actinoids are radioactive; beyond uranium, they are man-made synthetic elements with short half-lives.\n3. Many synthetic actinoids are available only in nanogram or microgram amounts.\nTherefore, all the listed factors contribute to the complexity of actinoid chemistry.\nTherefore, Option (D) is the correct answer."
    }
  },
  {
    id: 4661,
    similarQuestion: {
      question: "Across a period from left to right in the periodic table, the chemical reactivity of elements generally:",
      option_a: "Decreases monotonically.",
      option_b: "Increases monotonically.",
      option_c: "First decreases towards the middle and then increases towards the halogens.",
      option_d: "Remains constant throughout the period.",
      correct_option: "C",
      explanation: "Across a period from left to right:\n1. Group 1 elements (alkali metals) are extremely reactive due to low ionization energy and high tendency to lose electrons.\n2. Elements in the middle of the period (such as Group 14) have intermediate electronegativity and form strong covalent networks, showing minimum chemical reactivity.\n3. Towards Group 17 (halogens), high electronegativity and electron affinity make the elements highly reactive non-metallic oxidizing agents.\nTherefore, chemical reactivity first decreases and then increases across a period.\nTherefore, Option (C) is the correct answer."
    }
  },
  {
    id: 4662,
    similarQuestion: {
      question: "While the chemical reactivity of alkali metals increases on moving down Group 1, the chemical reactivity of halogens on moving down Group 17:",
      option_a: "Increases down the group.",
      option_b: "Decreases down the group.",
      option_c: "First increases and then decreases.",
      option_d: "Remains unchanged down the group.",
      correct_option: "B",
      explanation: "1. For alkali metals (Group 1), reactivity depends on the ease of electron loss (oxidation). Down the group, ionization energy decreases, so electron loss becomes easier and reactivity increases.\n2. For halogens (Group 17), reactivity depends on the ability to gain an electron (reduction). Down the group, atomic size increases and the effective nuclear pull on outer electrons diminishes, lowering electronegativity and standard reduction potential.\n3. Therefore, halogen reactivity decreases down the group in the order: F₂ > Cl₂ > Br₂ > I₂.\nTherefore, Option (B) is the correct answer."
    }
  },
  {
    id: 4663,
    similarQuestion: {
      question: "In the historical development of the periodic table, Lothar Meyer plotted physical properties of elements against their atomic weights and observed periodic behavior. Which physical property was primarily plotted against atomic weight in Lothar Meyer's famous curve?",
      option_a: "Electronegativity",
      option_b: "Atomic volume",
      option_c: "Ionization enthalpy",
      option_d: "Standard reduction potential",
      correct_option: "B",
      explanation: "In 1869, Lothar Meyer plotted the atomic volumes of elements against their atomic weights. He observed that elements with similar properties occupied corresponding positions on the periodic curve:\n- Strongly electropositive alkali metals occupied the peaks of the curve.\n- Alkaline earth metals occupied positions on the descending slopes.\n- Halogens occupied positions on the ascending slopes.\n- Transition metals occupied the troughs.\nTherefore, Option (B) is the correct answer."
    }
  }
];

async function run() {
  try {
    const loginRes = await postRequest('https://api.indraprasthaneetacademy.com/api/admin/login', loginData);
    const token = loginRes.data.token;
    console.log('Logged in successfully.');

    let count = 0;
    for (const item of updates) {
      count++;
      const res = await putRequest(
        `https://api.indraprasthaneetacademy.com/api/admin/test-questions/${item.id}`,
        JSON.stringify({ similarQuestion: item.similarQuestion }),
        token
      );
      if (res.status === 200) {
        console.log(`[SUCCESS] Updated Test 102 Question ${item.id} (${count}/${updates.length})`);
      } else {
        console.error(`[FAILED] Question ${item.id}:`, res.data);
      }
    }
    console.log(`Test 102 Part 1 Complete: ${count}/${updates.length} updated successfully.`);
  } catch (err) {
    console.error('Error in runner:', err);
  }
}

run();
