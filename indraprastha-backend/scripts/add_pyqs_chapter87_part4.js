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
    originalNumber: 32,
    question: "The similarity of bone structure in forelimbs of many vertebrates is an example of",
    optionA: "Homology",
    optionB: "Analogy",
    optionC: "Convergent evolution",
    optionD: "Adaptive radiation",
    correctOption: "A",
    yearLabel: "NEET-2018",
    explanation: "1. The forelimbs of vertebrates such as humans, cheetahs, whales, and bats exhibit an identical basic skeletal plan.\n2. All possess a proximal humerus, followed by radius and ulna, carpals, metacarpals, and phalanges.\n3. Although adapted for different mechanical functions (grasping, running, swimming, flying), their shared developmental origin and bone pattern demonstrate homology.\n4. Homologous structures provide evidence of descent from a common ancestor via divergent evolution.\nTherefore, Option (A) is the correct answer.",
    similarQuestion: {
      question: "Which of the following pairs of vertebrate appendages represents homologous organs?",
      option_a: "Wings of pigeon and wings of honeybee",
      option_b: "Forelimbs of horse and flippers of seal",
      option_c: "Gills of prawn and lungs of cow",
      option_d: "Pectoral fin of shark and flipper of dolphin",
      correct_option: "B",
      explanation: "1. The forelimb of a horse (running) and the flipper of a seal (swimming) share the same underlying pentadactyl vertebrate skeletal architecture.\n2. Having a common embryonic origin and basic structural pattern adapted to distinct lifestyles makes them homologous organs.\nTherefore, Option (B) is the correct answer."
    }
  },
  {
    originalNumber: 33,
    question: "Among the following sets of examples for divergent evolution, select the incorrect option:",
    optionA: "Forelimbs of man, bat and cheetah",
    optionB: "Heart of bat, man and cheetah",
    optionC: "Brain of bat, man and cheetah",
    optionD: "Eye of octopus, bat and man",
    correctOption: "D",
    yearLabel: "NEET-2018",
    explanation: "1. Divergent evolution is based on homology (structures having common ancestral origin that diverged to serve different or specialized functions).\n2. Forelimbs, hearts, and brains of vertebrates (man, bat, cheetah) all share common anatomical origin and basic architecture, representing homology and divergent evolution.\n3. In contrast, the eye of an octopus (mollusc) and the eye of mammals (bat and man) have fundamentally different developmental origins and retinal layouts, but both function in vision.\n4. Thus, octopus and mammalian eyes represent analogy resulting from convergent evolution, not divergent evolution.\nTherefore, Option (D) is the correct answer.",
    similarQuestion: {
      question: "Which of the following pairs is an example of convergent evolution rather than divergent evolution?",
      option_a: "Forelimbs of cheetah and human",
      option_b: "Thorn of Bougainvillea and tendril of Cucurbita",
      option_c: "Flippers of penguin and dolphins",
      option_d: "Vertebrate hearts of bird and reptile",
      correct_option: "C",
      explanation: "1. Penguins (birds) and dolphins (mammals) possess flippers evolved from different vertebrate forelimb modifications to perform the same hydrodynamic function.\n2. This independent convergence on a common functional design in response to similar aquatic selection pressures is convergent evolution.\n3. The other options represent homology and divergent evolution.\nTherefore, Option (C) is the correct answer."
    }
  },
  {
    originalNumber: 34,
    question: "According to Hugo de Vries, the mechanism of evolution is :-",
    optionA: "Multiple step mutations",
    optionB: "Saltation",
    optionC: "Phenotypic variations",
    optionD: "Minor mutations",
    correctOption: "B",
    yearLabel: "NEET-2018",
    explanation: "1. Hugo de Vries proposed the Mutation Theory of Evolution based on his experiments on evening primrose (Oenothera lamarckiana).\n2. De Vries believed that speciation is caused by sudden, discontinuous, single-step large mutations, for which he coined the term 'saltation'.\n3. This contrasted sharply with Charles Darwin's view that evolution proceeds through the slow, gradual accumulation of minor directional variations.\nTherefore, Option (B) is the correct answer.",
    similarQuestion: {
      question: "The term 'saltation' in evolutionary biology specifically refers to:",
      option_a: "Gradual accumulation of continuous micromutations",
      option_b: "Single-step large mutation producing speciation",
      option_c: "Directional migration of individuals across populations",
      option_d: "Selection favoring intermediate phenotypes",
      correct_option: "B",
      explanation: "1. Saltation (from Latin saltare, to leap) refers to a sudden, large, discontinuous genetic mutation occurring in a single step that produces speciation.\n2. It was championed by Hugo de Vries as the primary driver of evolutionary change.\nTherefore, Option (B) is the correct answer."
    }
  },
  {
    originalNumber: 35,
    question: "Artificial selection to obtain cows yielding higher milk output represents :",
    optionA: "Directional as it pushes the mean of the character in one direction",
    optionB: "Disruptive as it splits the population into two, one yielding higher output and the other lower output",
    optionC: "Stabilizing followed by disruptive as it stabilizes population to produce higher yielding cows",
    optionD: "Stabilizing selection as it stabilizes this character in the population",
    correctOption: "A",
    yearLabel: "NEET-2017",
    explanation: "1. In artificial selection for higher milk yield, animal breeders selectively mate individuals producing milk volumes far higher than the population mean.\n2. Over successive generations, alleles contributing to higher milk production increase in frequency, shifting the phenotypic mean toward the favored extreme.\n3. When selection favors individuals at one extreme of a phenotypic distribution, it is termed directional selection.\n4. Therefore, selecting cows yielding higher milk output represents directional selection as it pushes the mean in one direction.\nTherefore, Option (A) is the correct answer.",
    similarQuestion: {
      question: "The rapid emergence of DDT resistance in mosquito populations following extensive chemical spraying is an example of:",
      option_a: "Directional selection",
      option_b: "Stabilizing selection",
      option_c: "Disruptive selection",
      option_d: "Non-adaptive genetic drift",
      correct_option: "A",
      explanation: "1. The widespread application of DDT created strong selective pressure favoring rare resistant genotypes over sensitive ones.\n2. Resistant individuals survived and reproduced, rapidly shifting the population mean toward resistance.\n3. This shift of the phenotypic mean in one direction exemplifies directional selection.\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    originalNumber: 36,
    question: "Which of the following structure is homologus to the wing of a bird ?",
    optionA: "Dorsal fin of a Shark",
    optionB: "Wing of a moth",
    optionC: "Hind limb of rabbit",
    optionD: "Flipper of whale",
    correctOption: "D",
    yearLabel: "NEET- I 2016",
    explanation: "1. The wing of a bird and the flipper of a whale are both modifications of the vertebrate forelimb.\n2. They share the same basic anatomical skeletal plan derived from a common pentadactyl tetrapod ancestor (humerus, radius, ulna, carpals, metacarpals, phalanges).\n3. Structures sharing common embryonic and skeletal origin adapted for different functions (flight in birds vs steering/swimming in whales) are homologous organs.\n4. In contrast, wings of moths are chitinous insect structures (analogous), dorsal fins of sharks are fish fin rays, and rabbit hind limbs are rear appendages.\nTherefore, Option (D) is the correct answer.",
    similarQuestion: {
      question: "The wing of a bat is structurally and developmentally homologous to the:",
      option_a: "Wing of a butterfly",
      option_b: "Wing of a dragonfly",
      option_c: "Arm of a human",
      option_d: "Pectoral fin of a bony fish",
      correct_option: "C",
      explanation: "1. The wing of a bat and the arm of a human are both mammalian forelimbs sharing a common skeletal architecture (humerus, radius, ulna, carpals, metacarpals, phalanges).\n2. They arose from a common mammalian ancestor and diverged for flight and manipulation, demonstrating homology.\nTherefore, Option (C) is the correct answer."
    }
  },
  {
    originalNumber: 37,
    question: "Analogous structures are a result of :-",
    optionA: "Divergent evolution",
    optionB: "Convergent evolution",
    optionC: "Shared ancestry",
    optionD: "Stabilizing selection",
    correctOption: "B",
    yearLabel: "NEET- I 2016",
    explanation: "1. Analogous organs are structures that perform similar biological functions and often look superficially similar, but have completely different developmental origins and basic structural anatomy.\n2. When distantly related or unrelated species inhabit similar ecological niches, similar selective pressures favor comparable phenotypic adaptations.\n3. This independent evolutionary convergence on similar adaptations from different ancestral backgrounds is termed convergent evolution.\nTherefore, Option (B) is the correct answer.",
    similarQuestion: {
      question: "Structures that possess a common basic anatomy and embryonic origin, but are adapted to perform different functions, are called:",
      option_a: "Analogous organs",
      option_b: "Homologous organs",
      option_c: "Vestigial organs",
      option_d: "Atavistic organs",
      correct_option: "B",
      explanation: "1. Homologous organs share a common anatomical origin and basic developmental pattern inherited from a common ancestor, but have diverged to perform different functions suited to diverse environments.\nTherefore, Option (B) is the correct answer."
    }
  },
  {
    originalNumber: 38,
    question: "Following are the two statements regarding the origin of life :-\n(a) The earliest organisms that appeared on the earth were non-green and presumably anaerobes.\n(b) The first autotrophic organisms were the chemoautotrophs that never released oxygen.\nOf the above statements which one of the following options is correct ?",
    optionA: "(a) is correct but (b) is false.",
    optionB: "(b) is correct but (a) is false.",
    optionC: "Both (a) and (b) are correct.",
    optionD: "Both (a) and (b) are false.",
    correctOption: "C",
    yearLabel: "NEET- I 2016",
    explanation: "1. Statement (a) is correct: The primitive prebiotic atmosphere was reducing and devoid of free molecular oxygen (O₂). Therefore, the earliest primitive living cells were anaerobic chemoheterotrophs that absorbed organic molecules from the 'prebiotic soup'.\n2. Statement (b) is correct: When the supply of prebiotic organic molecules dwindled, early autotrophs emerged. The earliest autotrophs were chemoautotrophs (such as sulfur bacteria) utilizing chemical bond energy (e.g. H₂S oxidation) without releasing oxygen (anoxygenic photosynthesis/chemosynthesis).\n3. Oxygenic photoautotrophs (cyanobacteria releasing O₂) evolved much later, which ultimately converted the reducing atmosphere into an oxidizing atmosphere.\n4. Hence, both statements (a) and (b) are correct.\nTherefore, Option (C) is the correct answer.",
    similarQuestion: {
      question: "The primitive reducing atmosphere of prebiotic Earth was transformed into an oxidizing atmosphere primarily due to the evolutionary emergence of which organisms?",
      option_a: "Anaerobic chemoheterotrophs",
      option_b: "Chemoautotrophs utilizing hydrogen sulfide",
      option_c: "Cyanobacteria performing oxygenic photosynthesis",
      option_d: "Methanogenic archaebacteria",
      correct_option: "C",
      explanation: "1. Early autotrophs performed anoxygenic photosynthesis using H₂S as an electron donor.\n2. The evolution of cyanobacteria introduced water-splitting (photolysis of H₂O) photosynthesis, which released free molecular oxygen (O₂) into the atmosphere, causing the 'Great Oxygenation Event'.\nTherefore, Option (C) is the correct answer."
    }
  },
  {
    originalNumber: 39,
    question: "Genetic drift operates in :-",
    optionA: "Non-reproductive population",
    optionB: "Slow reproductive population",
    optionC: "Small isolated population",
    optionD: "Large isolated population",
    correctOption: "C",
    yearLabel: "NEET- II 2016",
    explanation: "1. Genetic drift (Sewall Wright effect) refers to random sampling variations that produce changes in allele frequencies from one generation to the next purely by chance.\n2. In very large populations, statistical sampling fluctuations are negligible and allele frequencies remain steady.\n3. However, in small, isolated populations, random events can disproportionately alter allele frequencies, potentially resulting in the rapid fixation or complete extinction of an allele regardless of its adaptive fitness.\n4. Therefore, genetic drift operates most significantly in small isolated populations.\nTherefore, Option (C) is the correct answer.",
    similarQuestion: {
      question: "In which type of population is the probability of fixation or loss of an allele purely due to chance sampling error the highest?",
      option_a: "Extremely large, randomly mating population",
      option_b: "Infinitely large population with continuous gene flow",
      option_c: "Very small, geographically isolated population",
      option_d: "Rapidly expanding population with zero mortality",
      correct_option: "C",
      explanation: "1. Chance events have a disproportionately large statistical effect when the sample size (breeding population) is small.\n2. In very small isolated populations, alleles can easily be fixed or lost by chance, demonstrating the prominent role of genetic drift.\nTherefore, Option (C) is the correct answer."
    }
  },
  {
    originalNumber: 40,
    question: "In Hardy-Weinberg equation, the frequency of heterozygous individual is represented by :-",
    optionA: "pq",
    optionB: "q2",
    optionC: "p2",
    optionD: "2pq",
    correctOption: "D",
    yearLabel: "NEET- II 2016",
    explanation: "1. The Hardy-Weinberg binomial expansion is expressed as: p² + 2pq + q² = 1, where p and q represent the allele frequencies of dominant (A) and recessive (a) alleles, respectively.\n2. In this equation:\n- p² represents the frequency of homozygous dominant individuals (AA).\n- q² represents the frequency of homozygous recessive individuals (aa).\n- 2pq represents the frequency of heterozygous individuals (Aa).\n3. Therefore, the frequency of heterozygous individuals is represented by 2pq.\nTherefore, Option (D) is the correct answer.",
    similarQuestion: {
      question: "In a diploid population at Hardy-Weinberg equilibrium, if the frequency of a recessive allele (a) is 0.4, what is the frequency of heterozygous individuals (Aa)?",
      option_a: "0.16",
      option_b: "0.36",
      option_c: "0.48",
      option_d: "0.24",
      correct_option: "C",
      explanation: "1. Given the frequency of recessive allele q = 0.4.\n2. Since p + q = 1, dominant allele frequency p = 1 - 0.4 = 0.6.\n3. The frequency of heterozygous individuals (Aa) is given by 2pq = 2 × (0.6) × (0.4) = 0.48 (or 48%).\nTherefore, Option (C) is the correct answer."
    }
  },
  {
    originalNumber: 41,
    question: "The chronological order of human evolution from early to the recent is :-",
    optionA: "Ramapithecus → Homo habilis → Australopithecus → Homo erectus",
    optionB: "Australopithecus → Homo habilis → Ramapithecus → Homo erectus",
    optionC: "Australopithecus → Ramapithecus → Homo habilis → Homo erectus",
    optionD: "Ramapithecus → Australopithecus → Homo habilis → Homo erectus",
    correctOption: "D",
    yearLabel: "NEET- II 2016",
    explanation: "1. Ramapithecus lived about 15 million years ago (mya) and was hairy, walking more erectly and man-like.\n2. Australopithecines lived in East African grasslands around 2 to 3 mya and used stone weapons.\n3. Homo habilis (handy man, first human-like hominid) lived around 2 mya with a brain capacity of 650-800 cc.\n4. Homo erectus appeared around 1.5 mya with a cranial capacity of about 900 cc.\n5. Therefore, the chronological order from earliest to most recent is: Ramapithecus → Australopithecus → Homo habilis → Homo erectus.\nTherefore, Option (D) is the correct answer.",
    similarQuestion: {
      question: "Which of the following hominid ancestors lived around 1.5 million years ago and walked with an erect posture?",
      option_a: "Ramapithecus",
      option_b: "Australopithecus",
      option_c: "Homo habilis",
      option_d: "Homo erectus",
      correct_option: "D",
      explanation: "1. Fossils of Homo erectus discovered in Java date back to about 1.5 million years ago.\n2. Homo erectus had a cranial capacity of approximately 900 cc, walked erectly, and probably ate meat.\nTherefore, Option (D) is the correct answer."
    }
  },
  {
    originalNumber: 42,
    question: "Which of the following is the correct sequence of events in the origin of life ?\nI. Formation of protobionts\nII. Synthesis of organic monomers\nIII. Synthesis of organic polymers\nIV. Formation of DNA-based genetic systems\nChoose the correct option:",
    optionA: "II, III, I, IV",
    optionB: "II, III, IV, I",
    optionC: "I, II, III, IV",
    optionD: "I, III, II, IV",
    correctOption: "A",
    yearLabel: "NEET- II 2016",
    explanation: "1. The chemical evolution of life (Oparin-Haldane theory) proceeded in definite sequential phases:\n- First: Synthesis of simple organic monomers (amino acids, sugars, purines, pyrimidines, fatty acids) from inorganic compounds (II).\n- Second: Polymerization of monomers into complex organic polymers (proteins, polysaccharides, nucleic acids) (III).\n- Third: Aggregation of polymers into prebiotic membrane-bound molecular aggregates called protobionts (coacervates/microspheres) (I).\n- Fourth: Evolution of self-replicating catalytic systems and DNA-based genetic transmission systems (IV).\n2. Therefore, the correct chronological sequence is II → III → I → IV.\nTherefore, Option (A) is the correct answer.",
    similarQuestion: {
      question: "According to the chemical theory of the origin of life, what was the correct sequence of prebiotic evolution?",
      option_a: "Inorganic gases → Simple organic monomers → Complex organic polymers → Protobionts",
      option_b: "Protobionts → Inorganic gases → Monomers → Polymers",
      option_c: "Polymers → Monomers → Protobionts → Inorganic gases",
      option_d: "Inorganic gases → Protobionts → Monomers → Polymers",
      correct_option: "A",
      explanation: "1. Prebiotic chemical evolution proceeded from inorganic atmospheric gases (CH₄, NH₃, H₂O, H₂) forming simple organic monomers (amino acids, sugars), which polymerized into complex macromolecules (proteins, RNA), eventually aggregating into protobionts.\nTherefore, Option (A) is the correct answer."
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
  console.log('Login successful! Processing Part 4 (' + questions.length + ' questions)...');

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
  console.log('Part 4 completed!');
}

run().catch(console.error);

