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

const CHAPTER_ID = 87;

const questions = [
  {
    originalNumber: 21,
    question: "From his experiments, S.L. Miller produced amino acids by mixing the following in a closed flask :",
    optionA: "CH3, H2, NH3 and water vapour at 600°C",
    optionB: "CH4, H2, NH3 and water vapour at 800°C",
    optionC: "CH3, H2, NH4 and water vapour at 800°C",
    optionD: "CH4, H2, NH3 and water vapour at 600°C",
    correctOption: "B",
    yearLabel: "NEET-2020",
    explanation: "1. In 1953, Stanley L. Miller, an American scientist, created conditions similar to those on primitive Earth in a laboratory setup.\n2. He generated an electric discharge in a closed spark-discharge flask containing methane (CH₄), molecular hydrogen (H₂), ammonia (NH₃), and water vapour.\n3. The temperature maintained in the spark chamber was 800°C.\n4. Analysis of the condensed fluid after a week revealed the spontaneous synthesis of simple organic compounds, specifically amino acids (such as glycine, alanine, and aspartic acid).\nTherefore, Option (B) is the correct answer.",
    similarQuestion: {
      question: "In S.L. Miller's spark-discharge experiment simulating prebiotic atmospheric conditions, which primary class of bio-monomers was formed?",
      option_a: "Amino acids",
      option_b: "Polysaccharides",
      option_c: "Complex proteins",
      option_d: "Phospholipids",
      correct_option: "A",
      explanation: "1. Miller passed electric sparks through a mixture of CH₄, H₂, NH₃, and water vapour at 800°C.\n2. Chemical analysis of the condensation product demonstrated the synthesis of various amino acids (such as glycine, alanine, and aspartic acid), supporting the Oparin-Haldane hypothesis of chemical evolution.\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    originalNumber: 22,
    question: "Which of the following refer to correct example(s) of organisms which have evolved due to changes in environment brought about by anthropogenic action?\n(a) Darwin's Finches of Galapagos islands.\n(b) Herbicide resistant weeds.\n(c) Drug resistant eukaryotes.\n(d) Man-created breeds of domesticated animals like dogs.\nChoose the correct option:",
    optionA: "Only (d)",
    optionB: "Only (a)",
    optionC: "(a) and (c)",
    optionD: "(b), (c) and (d)",
    correctOption: "D",
    yearLabel: "NEET-2020",
    explanation: "1. Anthropogenic actions refer to human-induced alterations in the environment.\n2. Herbicide-resistant weeds evolved due to extensive human use of agricultural weedicides (b).\n3. Drug-resistant microbes/eukaryotes (e.g. antibiotic or antimalarial resistance) evolved as a result of human misuse of pharmaceuticals (c).\n4. Artificial selection through selective breeding by humans produced diverse domesticated dog breeds (d).\n5. In contrast, Darwin's finches diversified on the Galapagos islands through natural adaptive radiation without human interference (a).\n6. Therefore, statements (b), (c), and (d) represent evolution by anthropogenic action.\nTherefore, Option (D) is the correct answer.",
    similarQuestion: {
      question: "Industrial melanism in the peppered moth (Biston betularia) observed in England during the industrial revolution provides a classic example of:",
      option_a: "Natural selection driven by anthropogenic environmental change",
      option_b: "Lamarckian inheritance of acquired characters",
      option_c: "Discontinuous mutation producing saltation",
      option_d: "Genetic drift in an isolated population",
      correct_option: "A",
      explanation: "1. Industrial pollution covered tree trunks with soot, darkening the background.\n2. Dark melanic moths had a camouflaged survival advantage over light-colored moths against predators.\n3. This rapid shift in moth morph frequencies is a classic demonstration of natural selection responding to anthropogenic environmental pollution.\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    originalNumber: 23,
    question: "Embryological support for evolution was proposed by :",
    optionA: "Ernst Heckel",
    optionB: "Karl Ernst von Baer",
    optionC: "Charles Darwin",
    optionD: "Alfred Wallace",
    correctOption: "A",
    yearLabel: "NEET-2020(COVID-19)",
    explanation: "1. Ernst Haeckel proposed embryological support for evolution based on his observation of certain developmental similarities across vertebrate embryos.\n2. He formulated the 'Biogenetic law', popularly stated as 'Ontogeny recapitulates phylogeny' (the development of an embryo repeats the evolutionary history of the adult ancestors).\n3. This proposal was later scrutinized and refuted by Karl Ernst von Baer.\nTherefore, Option (A) is the correct answer.",
    similarQuestion: {
      question: "According to the Biogenetic Law formulated by Ernst Haeckel, which of the following statements represents the core concept?",
      option_a: "Ontogeny recapitulates phylogeny",
      option_b: "Phylogeny recapitulates ontogeny",
      option_c: "Adult morphology dictates embryonic development",
      option_d: "Embryos of vertebrates never share any morphological features",
      correct_option: "A",
      explanation: "1. Ernst Haeckel's biogenetic law states that 'Ontogeny recapitulates phylogeny'.\n2. 'Ontogeny' refers to the life history or embryonic development of an individual, while 'phylogeny' refers to the evolutionary history of its species.\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    originalNumber: 24,
    question: "After about how many years of formation of earth, life appeared on this planet ?",
    optionA: "500 billion years",
    optionB: "50 million years",
    optionC: "500 million years",
    optionD: "50 billion years",
    correctOption: "C",
    yearLabel: "NEET-2020(COVID-19)",
    explanation: "1. According to cosmologists, the Earth was formed approximately 4.5 billion years ago (4500 million years ago).\n2. Fossil and chemical evidence shows that the earliest living organisms (cellular forms of life) appeared around 4.0 billion years ago (4000 million years ago).\n3. Calculating the difference: 4500 mya - 4000 mya = 500 million years.\n4. Hence, life appeared on Earth roughly 500 million years after the formation of the planet.\nTherefore, Option (C) is the correct answer.",
    similarQuestion: {
      question: "The Earth was formed approximately how many billion years ago?",
      option_a: "20.0 billion years ago",
      option_b: "4.5 billion years ago",
      option_c: "3.2 billion years ago",
      option_d: "1.5 billion years ago",
      correct_option: "B",
      explanation: "1. The universe originated around 20 billion years ago via the Big Bang.\n2. In the solar system of the Milky Way galaxy, planet Earth is estimated to have condensed and formed approximately 4.5 billion years ago.\nTherefore, Option (B) is the correct answer."
    }
  },
  {
    originalNumber: 25,
    question: "The phenomenon of evolution of different species in a given geographical area starting from a point and spreading to other habitats is called :-",
    optionA: "Saltation",
    optionB: "Co-evolution",
    optionC: "Natural selection",
    optionD: "Adaptive radiation",
    correctOption: "D",
    yearLabel: "NEET-2020(COVID-19)",
    explanation: "1. The process of evolution of different species in a given geographical area starting from a common ancestral point and radiating outwards to occupy distinct geographical niches or ecological habitats is defined as adaptive radiation.\n2. Classic textbook examples include Darwin's finches of the Galapagos archipelago and Australian marsupials radiating from an ancestral stock.\nTherefore, Option (D) is the correct answer.",
    similarQuestion: {
      question: "Darwin's finches on the Galapagos islands evolved diverse beak adaptations suited for seeds, insects, and nectar from an original seed-eating ancestor. This process illustrates:",
      option_a: "Adaptive radiation",
      option_b: "Convergent evolution",
      option_c: "Parallel evolution",
      option_d: "Saltation",
      correct_option: "A",
      explanation: "1. From an original ancestral seed-eating stock, finches colonized diverse islands in the archipelago.\n2. They evolved varied beak shapes enabling them to exploit distinct available food resources, demonstrating adaptive radiation.\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    originalNumber: 26,
    question: "A Hominid fossil discovered in Java in 1891, now extinct, having cranial capacity of about 900 cc was:",
    optionA: "Homo erectus",
    optionB: "Neanderthal man",
    optionC: "Homo sapiens",
    optionD: "Australopithecus",
    correctOption: "A",
    yearLabel: "NEET-2020(COVID-19)",
    explanation: "1. In 1891, Eugène Dubois discovered hominid fossils in Java (known historically as Pithecanthropus erectus or Java man).\n2. These fossils represent Homo erectus, which lived about 1.5 million years ago.\n3. Homo erectus had a cranial capacity of approximately 900 cc and walked erect on two legs.\nTherefore, Option (A) is the correct answer.",
    similarQuestion: {
      question: "Which hominid ancestor was the first to use fire, make advanced stone hand-axes, and possess an upright bipedal posture with a brain volume of about 900 cc?",
      option_a: "Australopithecus",
      option_b: "Homo habilis",
      option_c: "Homo erectus",
      option_d: "Neanderthal man",
      correct_option: "C",
      explanation: "1. Homo erectus is well recognized in paleoanthropology for demonstrating upright posture, cranial volume of ~900 cc, hunting proficiency, and the controlled use of fire.\nTherefore, Option (C) is the correct answer."
    }
  },
  {
    originalNumber: 27,
    question: "Variations caused by mutation, as proposed by Hugo de Vries, are",
    optionA: "random and directional",
    optionB: "random and directionless",
    optionC: "small and directional",
    optionD: "small and directionless",
    correctOption: "B",
    yearLabel: "NEET-2019",
    explanation: "1. Hugo de Vries formulated the Mutation Theory based on his work with evening primrose (Oenothera lamarckiana).\n2. According to de Vries, mutations are sudden, discontinuous, random, and directionless.\n3. In contrast, Charles Darwin emphasized that evolutionary variations are small and directional, accumulating gradually through natural selection.\nTherefore, Option (B) is the correct answer.",
    similarQuestion: {
      question: "According to Charles Darwin, the variations that provide raw material for evolution are:",
      option_a: "Random and directionless",
      option_b: "Small and directional",
      option_c: "Sudden and saltatory",
      option_d: "Discontinuous and irregular",
      correct_option: "B",
      explanation: "1. Darwin considered that evolution occurred by the gradual accumulation of small, continuous, and directional variations that enhance reproductive fitness in a specific environment.\nTherefore, Option (B) is the correct answer."
    }
  },
  {
    originalNumber: 28,
    question: "In a species, the weight of newborn ranges from 2 to 5 kg. 97% of the newborn with an average weight between 3 to 3.3kg survive whereas 99% of the infants born with weights from 2 to 2.5kg or 4.5 to 5 kg die. Which type of selection process is taking place ?",
    optionA: "Directional Selection",
    optionB: "Stabilizing Selection",
    optionC: "Disruptive Selection",
    optionD: "Cyclical Selection",
    correctOption: "B",
    yearLabel: "NEET-2019",
    explanation: "1. The data shows that newborns with intermediate/mean birth weight (3 to 3.3 kg) have high survival (97%), whereas newborns at both the lower extreme (2-2.5 kg) and upper extreme (4.5-5 kg) have extremely high mortality (99% die).\n2. When natural selection favors the intermediate phenotype and eliminates extreme variants at both tails of the distribution, it is termed stabilizing selection.\n3. Over time, stabilizing selection narrows the variation around the mean value and increases the height of the central peak.\nTherefore, Option (B) is the correct answer.",
    similarQuestion: {
      question: "Stabilizing natural selection operating on a continuous phenotypic character in a population results in:",
      option_a: "The peak shifting toward one of the extremes",
      option_b: "The peak becoming higher and narrower around the mean",
      option_c: "The formation of two distinct peaks at both extremes",
      option_d: "Complete eradication of genetic inheritance",
      correct_option: "B",
      explanation: "1. In stabilizing selection, individuals possessing the mean phenotype have higher fitness than individuals with extreme phenotypes.\n2. Consequently, natural selection eliminates the phenotypic extremes, causing the distribution curve to become taller and narrower around the mean.\nTherefore, Option (B) is the correct answer."
    }
  },
  {
    originalNumber: 29,
    question: "Match the hominids with their correct brain size :\n(a) Homo habilis (i) 900 cc\n(b) Homo neanderthalensis (ii) 1350 cc\n(c) Homo erectus (iii) 650-800 cc\n(d) Homo sapiens (iv) 1400 cc\nSelect the correct option:\n     (a)   (b)   (c)   (d)",
    optionA: "(iii)  (i)   (iv)  (ii)",
    optionB: "(iii)  (ii)  (i)   (iv)",
    optionC: "(iii)  (iv)  (i)   (ii)",
    optionD: "(iv)   (iii) (i)   (ii)",
    correctOption: "C",
    yearLabel: "NEET-2019",
    explanation: "1. Homo habilis had a cranial capacity between 650 and 800 cc (a matches iii).\n2. Homo neanderthalensis possessed a large brain with a capacity of approximately 1400 cc (b matches iv).\n3. Homo erectus had a brain capacity of about 900 cc (c matches i).\n4. Homo sapiens (modern human) has an average cranial capacity of approximately 1350 cc (d matches ii).\n5. Thus, the matching corresponds to (a)-(iii), (b)-(iv), (c)-(i), (d)-(ii).\nTherefore, Option (C) is the correct answer.",
    similarQuestion: {
      question: "What is the recorded cranial capacity of Homo habilis, considered the first tool-making hominid ancestor?",
      option_a: "400 - 500 cc",
      option_b: "650 - 800 cc",
      option_c: "900 - 1000 cc",
      option_d: "1400 - 1500 cc",
      correct_option: "B",
      explanation: "1. Homo habilis was the first hominid that created simple stone tools.\n2. According to NCERT, their cranial capacity was measured between 650 and 800 cc.\nTherefore, Option (B) is the correct answer."
    }
  },
  {
    originalNumber: 30,
    question: "In Australia, marsupials and placental mammals have evolved to share many similar characteristics. This type of evolution may be referred to as :",
    optionA: "Adaptive Radiation",
    optionB: "Divergent Evolution",
    optionC: "Cyclical Evolution",
    optionD: "Convergent Evolution",
    correctOption: "D",
    yearLabel: "NEET-2019(Odisha)",
    explanation: "1. In Australia, marsupials and placental mammals evolved independently in similar habitats and environmental conditions.\n2. Each marsupial evolved morphological traits that mirror a corresponding placental mammal (e.g. Tasmanian wolf and placental wolf, flying phalanger and flying squirrel, numbat and anteater).\n3. When more than one adaptive radiation occurs in an isolated geographical area representing different ecological habitats, the result is convergent evolution.\nTherefore, Option (D) is the correct answer.",
    similarQuestion: {
      question: "When more than one adaptive radiation occurs in an isolated geographical area (representing different habitats), the resulting evolutionary pattern is termed:",
      option_a: "Divergent evolution",
      option_b: "Convergent evolution",
      option_c: "Saltation",
      option_d: "Microevolution",
      correct_option: "B",
      explanation: "1. As described in NCERT, when different adaptive radiations occur in geographically isolated habitats and produce analogous phenotypes in unrelated lineages, it exemplifies convergent evolution.\nTherefore, Option (B) is the correct answer."
    }
  },
  {
    originalNumber: 31,
    question: "Which of the following statements is correct about the origin and evolution of men ?.",
    optionA: "Agriculture came around 50,000 years back.",
    optionB: "The Dryopithecus and Ramapithecus primates existing 15 million years ago, walked like men.",
    optionC: "Homo habilis probably ate meat.",
    optionD: "Neanderthal men lived in Asia betweeen 1,00,000 and 40,000 years back.",
    correctOption: "D",
    yearLabel: "NEET-2019(Odisha)",
    explanation: "1. Statement A is incorrect: Agriculture came around 10,000 years back, not 50,000 years back.\n2. Statement B is incorrect: Dryopithecus was more ape-like and walked on knuckles; only Ramapithecus was more man-like.\n3. Statement C is incorrect: Homo habilis probably did NOT eat meat (they were herbivores/frugivores); meat-eating appeared with Homo erectus.\n4. Statement D is correct: The Neanderthal man with a brain size of 1400 cc lived in near East and Central Asia between 100,000 and 40,000 years ago.\nTherefore, Option (D) is the correct answer.",
    similarQuestion: {
      question: "According to NCERT, modern Homo sapiens arose during the last ice age between:",
      option_a: "75,000 and 10,000 years ago",
      option_b: "100,000 and 40,000 years ago",
      option_c: "1.5 million and 500,000 years ago",
      option_d: "2.0 and 3.0 million years ago",
      correct_option: "A",
      explanation: "1. Homo sapiens arose in Africa and migrated across continents between 75,000 and 10,000 years ago during the ice age.\n2. Pre-historic cave art developed around 18,000 years ago, and agriculture started around 10,000 years ago.\nTherefore, Option (A) is the correct answer."
    }
  }
];

async function run() {
  console.log('Logging in as admin...');
  const loginRes = await post('https://api.indraprasthaneetacademy.com/api/admin/login', loginData);
  if (!loginRes.token) {
    console.error('Login failed:', loginRes);
    return;
  }
  const token = loginRes.token;
  console.log('Login successful! Processing Part 3 (' + questions.length + ' questions)...');

  for (let i = 0; i < questions.length; i++) {
    const q = questions[i];
    console.log(`[${i+1}/${questions.length}] Adding Q${q.originalNumber}...`);
    const payload = JSON.stringify({
      question: q.question,
      optionA: q.optionA,
      optionB: q.optionB,
      optionC: q.optionC,
      optionD: q.optionD,
      correctOption: q.correctOption,
      explanation: q.explanation,
      yearLabel: q.yearLabel,
      similarQuestion: q.similarQuestion
    });

    const res = await post(`https://api.indraprasthaneetacademy.com/api/admin/chapters/${CHAPTER_ID}/pyqs`, payload, token);
    if (res.success) {
      console.log(`  -> Q${q.originalNumber} added successfully! PYQ ID: ${res.pyq.id}`);
    } else {
      console.error(`  -> Failed to add Q${q.originalNumber}:`, res);
    }
  }
  console.log('Part 3 completed!');
}

run().catch(console.error);

