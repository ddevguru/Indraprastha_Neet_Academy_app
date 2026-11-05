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
    originalNumber: 11,
    question: "Identify the fossil of man who showed the following characteristics.\n(A) Brain capacity of 1400 cc\n(B) Used hides to protect their body\n(C) Buried their dead bodies\nIn the light of above statements, choose the correct answer from the options given below:",
    optionA: "Homo habilis",
    optionB: "Australopithecus",
    optionC: "Homo erectus",
    optionD: "Neanderthal man",
    correctOption: "D",
    yearLabel: "NEET-2023-MANIPUR",
    explanation: "1. Neanderthal man (Homo neanderthalensis) lived near East and Central Asia between 100,000 and 40,000 years ago.\n2. Fossil evidence demonstrates a cranial capacity of approximately 1400 cc.\n3. They were the first hominids documented to have used animal hides for clothing/protection and routinely buried their dead with ceremonial rituals.\n4. In contrast, Homo habilis had 650-800 cc brain capacity and Homo erectus had ~900 cc.\nTherefore, Option (D) is the correct answer.",
    similarQuestion: {
      question: "Which hominid ancestor is characterized by having a cranial capacity of about 900 cc and probably ate meat?",
      option_a: "Homo habilis",
      option_b: "Homo erectus",
      option_c: "Australopithecus",
      option_d: "Dryopithecus",
      correct_option: "B",
      explanation: "1. Homo erectus fossils discovered in Java in 1891 revealed a cranial capacity of about 900 cc.\n2. Archaeological evidence indicates that Homo erectus walked fully erect and was carnivorous (probably ate meat).\n3. Homo habilis had a cranial capacity of 650-800 cc and probably did not eat meat.\nTherefore, Option (B) is the correct answer."
    }
  },
  {
    originalNumber: 12,
    question: "Select the correct group/set of Australian Marsupials exhibiting adaptive radiation.",
    optionA: "Tasmanian wolf, Bobcat, Marsupial mole",
    optionB: "Numbat, Spotted cuscus, Flying phalanger",
    optionC: "Mole, Flying squirrel, Tasmanian tiger cat",
    optionD: "Lemur, Anteater, Wolf",
    correctOption: "B",
    yearLabel: "NEET-2023",
    explanation: "1. Adaptive radiation in Australia led to the diversification of ancestral marsupials into diverse endemic forms.\n2. Numbat (banded anteater), Spotted cuscus, and Flying phalanger are all indigenous Australian marsupials.\n3. Option A contains Bobcat (a placental mammal).\n4. Option C contains Mole and Flying squirrel (both placental mammals).\n5. Option D contains Lemur, Anteater, and Wolf (all placental mammals).\nTherefore, Option (B) is the correct answer.",
    similarQuestion: {
      question: "Which of the following sets contains only placental mammals that parallel Australian marsupials through convergent evolution?",
      option_a: "Anteater, Bobcat, Flying squirrel",
      option_b: "Numbat, Tasmanian wolf, Kangaroo",
      option_c: "Wombat, Koala, Bandicoot",
      option_d: "Spotted cuscus, Lemur, Wolf",
      correct_option: "A",
      explanation: "1. Anteater, Bobcat, and Flying squirrel are all placental mammals that independently evolved analogous ecological adaptations mirroring Australian marsupials (Numbat, Tasmanian tiger cat, and Flying phalanger, respectively).\n2. Options B and C consist of Australian marsupials, while Option D is a mixed set.\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    originalNumber: 13,
    question: "Natural selection where more individuals acquire specific character value other than the mean character value, leads to:",
    optionA: "Directional change",
    optionB: "Disruptive change",
    optionC: "Random change",
    optionD: "Stabilising change",
    correctOption: "A",
    yearLabel: "NEET-2022",
    explanation: "1. Natural selection can lead to stabilization, directional change, or disruption depending on which phenotypes are favored.\n2. When more individuals acquire the mean character value, it results in stabilizing selection (peak gets higher and narrower).\n3. When more individuals acquire a value at one of the extremes (other than the mean character value), the phenotypic distribution peak shifts in that direction, resulting in directional selection.\n4. When individuals at both peripheral extremes are favored over the mean value, it results in disruptive selection (two distinct peaks).\nTherefore, Option (A) is the correct answer.",
    similarQuestion: {
      question: "In a population of snails, selection eliminates intermediate shell colors and favors both extreme light and extreme dark phenotypes. This type of selection is called:",
      option_a: "Stabilizing selection",
      option_b: "Directional selection",
      option_c: "Disruptive selection",
      option_d: "Balancing selection",
      correct_option: "C",
      explanation: "1. When environmental pressures favor phenotypes at both extremes of a trait distribution while selecting against intermediate/mean individuals, the population splits into two sub-populations.\n2. This produces a bimodal curve and is termed disruptive selection, which can eventually lead to speciation.\nTherefore, Option (C) is the correct answer."
    }
  },
  {
    originalNumber: 14,
    question: "Which of the following statements is not true ?",
    optionA: "Sweet potato and potato is an example of analogy",
    optionB: "Homology indicates common ancestry",
    optionC: "Flippers of penguins and dolphins are a pair of homologous organs",
    optionD: "Analogous structures are a result of convergent evolution",
    correctOption: "C",
    yearLabel: "NEET-2022",
    explanation: "1. Sweet potato (root tuber) and potato (stem tuber) are analogous organs with different anatomical origins serving food storage (Statement A is true).\n2. Homology is based on shared embryonic anatomical origins and reflects common descent/ancestry (Statement B is true).\n3. Flippers of penguins (birds) and dolphins (mammals) perform the same function of swimming but evolved independently from distinct structural lineages, making them analogous organs, not homologous organs (Statement C is false/not true).\n4. Analogous structures arise through convergent evolution when unrelated organisms adapt to similar environments (Statement D is true).\nTherefore, Option (C) is the correct answer.",
    similarQuestion: {
      question: "Which of the following statements is INCORRECT regarding homology and analogy?",
      option_a: "Homology indicates common ancestry and divergent evolution.",
      option_b: "Analogy results from convergent evolution in response to similar environmental needs.",
      option_c: "Vertebrate hearts and brains are examples of analogy.",
      option_d: "Sweet potato and potato tubers represent analogous organs.",
      correct_option: "C",
      explanation: "1. Vertebrate hearts and brains share a fundamentally similar developmental plan and anatomical architecture across fishes, amphibians, reptiles, birds, and mammals.\n2. They demonstrate homology and divergent evolution from a common ancestral pattern, not analogy.\n3. Hence, statement C is incorrect.\nTherefore, Option (C) is the correct answer."
    }
  },
  {
    originalNumber: 15,
    question: "Panspermia, an idea that is still a favourite for some astronomers, means :",
    optionA: "Creation of life from dead and decaying matter",
    optionB: "Creation of life from chemicals",
    optionC: "Origin of sperm in human testes",
    optionD: "Transfer of spores as unit of life from other planets of Earth",
    correctOption: "D",
    yearLabel: "Re-NEET-2022",
    explanation: "1. The theory of Panspermia (Cosmozoic theory), favored by early Greek thinkers and some modern astronomers, posits that life did not originate on Earth.\n2. Instead, units of life called spores or microorganisms traveled through cosmic space across celestial bodies and reached Earth from other planets or meteorites.\n3. Creation of life from non-living decaying matter is abiogenesis/spontaneous generation.\n4. Creation of life from chemicals is Oparin-Haldane chemical evolution.\nTherefore, Option (D) is the correct answer.",
    similarQuestion: {
      question: "The hypothesis that life originated spontaneously from non-living decaying matter such as straw, mud, and manure was known as:",
      option_a: "Theory of Biogenesis",
      option_b: "Theory of Spontaneous Generation (Abiogenesis)",
      option_c: "Theory of Panspermia",
      option_d: "Theory of Chemical Evolution",
      correct_option: "B",
      explanation: "1. For a long time, it was believed that life arose from decaying and rotting matter like straw and mud; this was the theory of spontaneous generation (abiogenesis).\n2. Louis Pasteur definitively disproved this hypothesis using swan-necked flask experiments, proving biogenesis (life comes only from pre-existing life).\nTherefore, Option (B) is the correct answer."
    }
  },
  {
    originalNumber: 16,
    question: "Select the correct statement regarding mutation theory of evolution.",
    optionA: "This theory was proposed by Alfred Wallace",
    optionB: "Variations are small directional changes",
    optionC: "Single step large mutation is a cause of speciation",
    optionD: "Large differences due to mutations arise gradually in a population",
    correctOption: "C",
    yearLabel: "Re-NEET-2022",
    explanation: "1. Hugo de Vries proposed the Mutation Theory of evolution based on his work on the evening primrose (Oenothera lamarckiana).\n2. De Vries believed that mutations are discontinuous, sudden, large, random, and directionless.\n3. He postulated that speciation occurs suddenly by saltation (single-step large mutation), unlike Darwin's view of gradual, small, directional variations accumulated over generations.\nTherefore, Option (C) is the correct answer.",
    similarQuestion: {
      question: "Hugo de Vries proposed his mutation theory of evolution based on his experimental observations on which organism?",
      option_a: "Pisum sativum",
      option_b: "Oenothera lamarckiana",
      option_c: "Drosophila melanogaster",
      option_d: "Mirabilis jalapa",
      correct_option: "B",
      explanation: "1. Hugo de Vries conducted breeding experiments on Oenothera lamarckiana (evening primrose).\n2. He observed sudden, heritable phenotypic differences among offspring and formulated the Mutation Theory of Evolution.\nTherefore, Option (B) is the correct answer."
    }
  },
  {
    originalNumber: 17,
    question: "The factor that leads to Founder effect in a population is:",
    optionA: "Natural selection",
    optionB: "Genetic recombination",
    optionC: "Mutation",
    optionD: "Genetic drift",
    correctOption: "D",
    yearLabel: "NEET-2021",
    explanation: "1. The founder effect is a specific form of genetic drift that occurs when a small group of individuals migrates and colonizes a new, isolated geographic area.\n2. The small founding sample carries only a fraction of the original population's genetic variability, and by chance, certain allele frequencies deviate drastically from the parental gene pool.\n3. As the new colony grows, it establishes an altered gene pool, with the original colonizers acting as founders.\n4. Thus, the underlying mechanism driving the founder effect is genetic drift.\nTherefore, Option (D) is the correct answer.",
    similarQuestion: {
      question: "A drastic, non-selective reduction in population size caused by environmental catastrophes (e.g. volcanic eruptions, floods) leading to altered allele frequencies is known as:",
      option_a: "Bottleneck effect",
      option_b: "Gene migration",
      option_c: "Directional selection",
      option_d: "Adaptive radiation",
      correct_option: "A",
      explanation: "1. A population bottleneck occurs when a catastrophic event drastically reduces the size of a population at random.\n2. The surviving individuals may possess allele frequencies significantly different from the ancestral population purely by chance, which is an example of genetic drift.\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    originalNumber: 18,
    question: "Mammals were evolved from",
    optionA: "Sauropsids",
    optionB: "Synapsids",
    optionC: "Thecodonts",
    optionD: "Tyranosaurus",
    correctOption: "B",
    yearLabel: "NEET-2021",
    explanation: "1. Early amniotes diverged into two major evolutionary lineages: Synapsids and Sauropsids.\n2. The Synapsid lineage possessed a single temporal fenestra behind each eye orbit and gave rise to pelycosaurs, therapsids (mammal-like reptiles), and eventually true mammals.\n3. The Sauropsid lineage gave rise to modern reptiles (lizards, snakes, turtles, crocodilians), dinosaurs, and birds.\n4. Thus, mammals evolved directly from the synapsid line of amniote ancestors.\nTherefore, Option (B) is the correct answer.",
    similarQuestion: {
      question: "Modern reptiles, dinosaurs, and birds evolved along which major amniote evolutionary lineage?",
      option_a: "Synapsids",
      option_b: "Sauropsids",
      option_c: "Pelycosaurs",
      option_d: "Therapsids",
      correct_option: "B",
      explanation: "1. The Sauropsida lineage comprises reptiles, dinosaurs, and birds.\n2. Synapsids gave rise to mammals through therapsids, whereas sauropsids diversified into the various reptilian and avian clades.\nTherefore, Option (B) is the correct answer."
    }
  },
  {
    originalNumber: 19,
    question: "Embryological support for evolution was disapproved by :",
    optionA: "Oparin",
    optionB: "Karl Ernst von Baer",
    optionC: "Alfred Wallace",
    optionD: "Charles Darwin",
    correctOption: "B",
    yearLabel: "NEET-2020",
    explanation: "1. Ernst Haeckel proposed embryological support for evolution based on his 'Biogenetic law' (ontogeny recapitulates phylogeny), claiming that vertebrate embryos pass through adult stages of ancestral forms.\n2. Karl Ernst von Baer, after careful comparative embryological observations, definitively disapproved this generalization.\n3. Von Baer noted that embryos never pass through the adult stages of other animals; instead, embryos of different vertebrates share general embryonic features that specialize only later in development.\nTherefore, Option (B) is the correct answer.",
    similarQuestion: {
      question: "The 'Biogenetic law' which proposed that 'Ontogeny recapitulates phylogeny' was formulated by:",
      option_a: "Ernst Haeckel",
      option_b: "Karl Ernst von Baer",
      option_c: "Charles Darwin",
      option_d: "Louis Pasteur",
      correct_option: "A",
      explanation: "1. Ernst Haeckel postulated the Biogenetic law, stating that the developmental stages of an individual embryo (ontogeny) retrace the evolutionary history of its race/ancestors (phylogeny).\n2. This was later refuted by Karl Ernst von Baer.\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    originalNumber: 20,
    question: "Flippers of Penguins and Dolphins are examples of:",
    optionA: "Natural selection",
    optionB: "Adaptive radiation",
    optionC: "Convergent evolution",
    optionD: "Industrial melanism",
    correctOption: "C",
    yearLabel: "NEET-2020",
    explanation: "1. Penguins (birds) and dolphins (aquatic mammals) possess flippers modified for locomotion in an aquatic environment.\n2. Despite belonging to different vertebrate classes with distinct developmental pathways, their flippers serve the identical function of steering and swimming.\n3. Independent evolution of functionally similar structures in unrelated or distantly related lineages under similar selective pressures is termed convergent evolution.\nTherefore, Option (C) is the correct answer.",
    similarQuestion: {
      question: "The wings of a butterfly and the wings of a bat are examples of:",
      option_a: "Homologous organs resulting from divergent evolution",
      option_b: "Analogous organs resulting from convergent evolution",
      option_c: "Vestigial structures",
      option_d: "Atavistic features",
      correct_option: "B",
      explanation: "1. Butterfly wings are folds of integument supported by chitinous veins, whereas bat wings are skin folds (patagia) supported by elongated phalanges of forelimbs.\n2. Both structures perform flight, representing analogous organs that evolved through convergent evolution.\nTherefore, Option (B) is the correct answer."
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
  console.log('Login successful! Processing Part 2 (' + questions.length + ' questions)...');

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
  console.log('Part 2 completed!');
}

run().catch(console.error);

