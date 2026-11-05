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
    originalNumber: 1,
    question: "Sweet potato and potato represent a certain type of evolution. Select the correct combination of terms to explain the evolution.",
    optionA: "Analogy, convergent",
    optionB: "Homology, divergent",
    optionC: "Homology, convergent",
    optionD: "Analogy, divergent",
    correctOption: "A",
    yearLabel: "NEET-2025",
    explanation: "1. Sweet potato (Ipomoea batatas) is an adventitious root modification, whereas potato (Solanum tuberosum) is an underground stem modification (tuber).\n2. Both structures have completely different anatomical and morphological origins, but they perform the same primary physiological function of food storage.\n3. Structures having different evolutionary origins that perform similar functions are termed analogous structures.\n4. Analogous organs develop as an evolutionary adaptation to similar functional requirements in the environment, which is the hallmark of convergent evolution.\nTherefore, Option (A) is the correct answer.",
    similarQuestion: {
      question: "Thorns of Bougainvillea and tendrils of Cucurbita represent which type of organs and pattern of evolution?",
      option_a: "Analogous organs, convergent evolution",
      option_b: "Homologous organs, divergent evolution",
      option_c: "Analogous organs, divergent evolution",
      option_d: "Homologous organs, convergent evolution",
      correct_option: "B",
      explanation: "1. Both the thorns of Bougainvillea and the tendrils of Cucurbita arise in the axillary position and represent modifications of axillary buds (stem modification).\n2. Because they share a common embryonic and anatomical origin but have diverged to perform different functions (defense in Bougainvillea vs climbing support in Cucurbita), they are homologous organs.\n3. Homologous structures arise due to adaptation to different ecological niches, illustrating divergent evolution.\nTherefore, Option (B) is the correct answer."
    }
  },
  {
    originalNumber: 2,
    question: "Match List-I with List-II:\nList-I:\nA. Gene pool\nB. Genetic drift\nC. Gene flow\nD. Gene frequency\nList-II:\nI. Stable within a generation\nII. Change in gene frequency by chance\nIII. Transfer of genes into or out of population\nIV. Total number of genes and their alleles\nChoose the correct answer from the options given below:",
    optionA: "A-III, B-II, C-I, D-IV",
    optionB: "A-IV, B-II, C-III, D-I",
    optionC: "A-I, B-II, C-III, D-IV",
    optionD: "A-II, B-III, C-IV, D-I",
    correctOption: "B",
    yearLabel: "Re-NEET-2024",
    explanation: "1. Gene pool refers to the total collection of genes and their respective alleles present in all individuals of an interbreeding population (A matches IV).\n2. Genetic drift refers to random fluctuations in allele frequencies in a population that occur by chance rather than natural selection, particularly in small populations (B matches II).\n3. Gene flow (gene migration) occurs when individuals migrate into or out of a population, adding or removing alleles and thereby transferring genes (C matches III).\n4. Gene frequency represents the proportion of an allele in a population, which remains stable within a generation under ideal Hardy-Weinberg conditions (D matches I).\nTherefore, Option (B) is the correct answer.",
    similarQuestion: {
      question: "Match List-I with List-II regarding evolutionary concepts:\nList-I:\nA. Founder effect\nB. Saltation\nC. Darwinian fitness\nD. Natural selection\nList-II:\nI. Differential reproductive success\nII. Single step large mutation\nIII. Genetic drift in a small colonizing group\nIV. Relative reproductive success\nChoose the correct answer from the options given below:",
      option_a: "A-III, B-II, C-IV, D-I",
      option_b: "A-II, B-III, C-I, D-IV",
      option_c: "A-III, B-I, C-IV, D-II",
      option_d: "A-IV, B-II, C-III, D-I",
      correct_option: "A",
      explanation: "1. Founder effect: When a small group separates from a parental population and establishes a new colony, random genetic drift alters allele frequencies dramatically in the new colony, matching III.\n2. Saltation: Proposed by Hugo de Vries, meaning single-step large mutations leading to speciation, matching II.\n3. Darwinian fitness refers strictly to relative reproductive success in a given environment, matching IV.\n4. Natural selection operates through differential reproductive success among varying phenotypes, matching I.\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    originalNumber: 4,
    question: "Match List-I with List-II with respect to convergent evolution:\nList-I:\nA. Lemur\nB. Bobcat\nC. Anteater\nD. Flying squirrels\nList-II:\nI. Flying phalanger\nII. Numbat\nIII. Spotted cuscus\nIV. Tasmanian tiger cat\nChoose the correct answer from the options given below:",
    optionA: "A-III, B-IV, C-II, D-I",
    optionB: "A-III, B-II, C-IV, D-I",
    optionC: "A-IV, B-III, C-II, D-I",
    optionD: "A-IV, B-II, C-III, D-I",
    correctOption: "A",
    yearLabel: "Re-NEET-2024",
    explanation: "1. In Australia, marsupials underwent adaptive radiation to occupy diverse ecological niches, evolving into forms that closely mirror placental mammals living in similar habitats elsewhere (convergent evolution).\n2. Lemur (placental) converges with Spotted cuscus (marsupial) (A matches III).\n3. Bobcat (placental) converges with Tasmanian tiger cat (marsupial) (B matches IV).\n4. Anteater (placental) converges with Numbat or banded anteater (marsupial) (C matches II).\n5. Flying squirrel (placental) converges with Flying phalanger (marsupial) (D matches I).\nTherefore, Option (A) is the correct answer.",
    similarQuestion: {
      question: "Which of the following pairs correctly represents convergent evolution between a placental mammal and an Australian marsupial?",
      option_a: "Wolf and Tasmanian wolf",
      option_b: "Lemur and Tasmanian tiger cat",
      option_c: "Bobcat and Spotted cuscus",
      option_d: "Anteater and Flying phalanger",
      correct_option: "A",
      explanation: "1. Placental wolf and Australian marsupial Tasmanian wolf share remarkably similar predatory body plans, skull shapes, and hunting behaviors despite having evolved from distinct lineages.\n2. This independent evolution of similar traits in response to comparable ecological niches is convergent evolution.\n3. Lemur converges with Spotted cuscus, Bobcat with Tasmanian tiger cat, and Anteater with Numbat.\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    originalNumber: 5,
    question: "Match List-I with List-II:\nList-I:\nA. Living Fossil\nB. Connecting Link\nC. Vestigial Organ\nD. Atavism\nList-II:\nI. Elongated canine teeth\nII. Vermiform appendix\nIII. Echidna\nIV. Latimeria\nChoose the correct answer from the options given below:",
    optionA: "A-IV, B-III, C-II, D-I",
    optionB: "A-IV, B-II, C-III, D-I",
    optionC: "A-IV, B-III, C-I, D-II",
    optionD: "A-III, B-IV, C-I, D-II",
    correctOption: "A",
    yearLabel: "Re-NEET-2024",
    explanation: "1. Living fossils are surviving organisms that have retained ancestral characteristics almost unchanged over geological eras; Latimeria (coelacanth lobe-finned fish) is a living fossil (A matches IV).\n2. Connecting links are living organisms exhibiting intermediate characteristics between two distinct taxonomic groups; Echidna (spiny anteater) lays reptilian cleidoic eggs while possessing mammalian mammary glands and hair, acting as a link between reptiles and mammals (B matches III).\n3. Vestigial organs are rudimentary, non-functional remnants of organs that were functional in ancestors; the human vermiform appendix is a classic vestigial organ (C matches II).\n4. Atavism is the sudden reappearance of ancestral characteristics that were lost in recent evolutionary history; abnormally elongated canine teeth in humans represent atavism (D matches I).\nTherefore, Option (A) is the correct answer.",
    similarQuestion: {
      question: "Peripatus is an important evolutionary connecting link between which two phyla?",
      option_a: "Annelida and Arthropoda",
      option_b: "Mollusca and Echinodermata",
      option_c: "Annelida and Mollusca",
      option_d: "Arthropoda and Chordata",
      correct_option: "A",
      explanation: "1. Peripatus exhibits characteristics of Annelida (such as unjointed parapodia-like legs, nephridia for excretion, and worm-like body segmentation).\n2. It also exhibits characteristics of Arthropoda (such as claws, tracheal respiratory system, and open circulatory system with hemocoel).\n3. Thus, Peripatus serves as a living connecting link between Annelida and Arthropoda.\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    originalNumber: 6,
    question: "What is the correct order (old to recent) of periods in Paleozoic era?",
    optionA: "Silurian, Devonian, Permian, Carboniferous",
    optionB: "Silurian, Devonian, Carboniferous, Permian",
    optionC: "Permian, Devonian, Silurian, Carboniferous",
    optionD: "Silurian, Carboniferous, Permian, Devonian",
    correctOption: "B",
    yearLabel: "Re-NEET-2024",
    explanation: "1. The Paleozoic era comprises six geological periods arranged from oldest to most recent: Cambrian → Ordovician → Silurian → Devonian → Carboniferous → Permian.\n2. Looking at the options starting with Silurian: Silurian (~444-419 mya) was followed by Devonian (age of fishes, ~419-359 mya), followed by Carboniferous (age of amphibians and coal-forming forests, ~359-299 mya), followed by Permian (~299-252 mya).\n3. Therefore, the sequence from oldest to most recent is Silurian, Devonian, Carboniferous, Permian.\nTherefore, Option (B) is the correct answer.",
    similarQuestion: {
      question: "Which of the following represents the correct chronological sequence (old to recent) of periods within the Mesozoic era?",
      option_a: "Triassic → Jurassic → Cretaceous",
      option_b: "Jurassic → Triassic → Cretaceous",
      option_c: "Cretaceous → Jurassic → Triassic",
      option_d: "Triassic → Cretaceous → Jurassic",
      correct_option: "A",
      explanation: "1. The Mesozoic era (known as the Age of Reptiles) is subdivided into three periods:\n- Triassic (oldest period, ~251 to 201 million years ago, origin of dinosaurs and early mammals)\n- Jurassic (middle period, ~201 to 145 million years ago, dominance of dinosaurs and origin of birds)\n- Cretaceous (youngest period, ~145 to 66 million years ago, extinction of dinosaurs).\n2. Thus, the sequence from old to recent is Triassic → Jurassic → Cretaceous.\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    originalNumber: 7,
    question: "Given below are some stages of human evolution. Arrange them in correct sequence. (Past to Recent)\nA. Homo habilis\nB. Homo sapiens\nC. Homo neanderthalensis\nD. Homo erectus\nChoose the correct sequence of human evolution from the options given below:",
    optionA: "D-A-C-B",
    optionB: "B-A-D-C",
    optionC: "C-B-D-A",
    optionD: "A-D-C-B",
    correctOption: "D",
    yearLabel: "NEET-2024",
    explanation: "1. According to fossil records of hominid evolution:\n- Homo habilis (cranial capacity 650-800 cc) appeared around 2.0 million years ago (mya).\n- Homo erectus (cranial capacity ~900 cc) arose around 1.5 mya.\n- Homo neanderthalensis (cranial capacity ~1400 cc) inhabited near East and Central Asia between 100,000 and 40,000 years ago.\n- Homo sapiens (modern humans) evolved in Africa and spread across the globe between 75,000 and 10,000 years ago.\n2. Therefore, the chronological sequence from past to recent is: A → D → C → B.\nTherefore, Option (D) is the correct answer.",
    similarQuestion: {
      question: "Arrange the following hominid ancestors in correct chronological order from earliest to most recent:\n(i) Ramapithecus\n(ii) Australopithecus\n(iii) Homo habilis\n(iv) Homo erectus",
      option_a: "(i) → (ii) → (iii) → (iv)",
      option_b: "(ii) → (i) → (iii) → (iv)",
      option_c: "(i) → (iii) → (ii) → (iv)",
      option_d: "(iv) → (iii) → (ii) → (i)",
      correct_option: "A",
      explanation: "1. Ramapithecus lived about 15 million years ago and was hairy and walked more man-like.\n2. Australopithecines lived in East African grasslands about 2-3 million years ago.\n3. Homo habilis was the first tool-making hominid (cranial capacity 650-800 cc, ~2 mya).\n4. Homo erectus fossils appeared about 1.5 million years ago (cranial capacity ~900 cc).\n5. Thus, the correct sequence is (i) → (ii) → (iii) → (iv).\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    originalNumber: 8,
    question: "Which one of the following factors will not affect the Hardy-Weinberg equilibrium?",
    optionA: "Genetic recombination",
    optionB: "Genetic drift",
    optionC: "Gene migration",
    optionD: "Constant gene pool",
    correctOption: "D",
    yearLabel: "NEET-2024",
    explanation: "1. The Hardy-Weinberg principle states that allele frequencies in a population remain constant and stable across generations in the absence of evolutionary disturbances.\n2. Five specific factors disturb Hardy-Weinberg equilibrium: gene migration (gene flow), genetic drift, mutation, genetic recombination, and natural selection.\n3. A constant gene pool reflects genetic stability where allele frequencies do not change over time, which maintains equilibrium rather than disrupting it.\nTherefore, Option (D) is the correct answer.",
    similarQuestion: {
      question: "Which of the following evolutionary forces causes sudden, non-directional changes in allele frequencies exclusively by chance in small populations?",
      option_a: "Natural selection",
      option_b: "Genetic drift",
      option_c: "Gene flow",
      option_d: "Directional selection",
      correct_option: "B",
      explanation: "1. Genetic drift (Sewall Wright effect) refers to random fluctuations in allele frequencies between generations resulting from chance sampling events.\n2. It operates most significantly in small, isolated populations and can lead to the fixation or elimination of alleles regardless of their adaptive value.\nTherefore, Option (B) is the correct answer."
    }
  },
  {
    originalNumber: 9,
    question: "The flippers of the Penguins and Dolphins are the example of the",
    optionA: "Adaptive radiation",
    optionB: "Natural selection",
    optionC: "Convergent evolution",
    optionD: "Divergent evolution",
    correctOption: "C",
    yearLabel: "NEET-2024",
    explanation: "1. Penguins are birds (Class Aves) and dolphins are mammals (Class Mammalia).\n2. The flippers in both organisms perform the same function of swimming/propulsion in an aquatic habitat.\n3. However, their internal anatomical structural design and evolutionary origins are distinct.\n4. Such structures possessing different developmental origins but performing analogous functions due to similar habitat pressures represent convergent evolution.\nTherefore, Option (C) is the correct answer.",
    similarQuestion: {
      question: "The eyes of an octopus and the eyes of a cat show similar function of vision but differ in structural details and embryonic origin. This exemplifies:",
      option_a: "Divergent evolution based on homology",
      option_b: "Convergent evolution based on analogy",
      option_c: "Homology based on convergent evolution",
      option_d: "Adaptive radiation from a common ancestor",
      correct_option: "B",
      explanation: "1. Octopus (mollusc) and cat (mammal) belong to distantly related evolutionary lineages.\n2. Although both possess camera-style eyes evolved for vision, their retinal organization and embryonic tissue origins are fundamentally different.\n3. Different structures evolving independently to carry out the same function due to adaptation to similar ecological needs is analogy, which reflects convergent evolution.\nTherefore, Option (B) is the correct answer."
    }
  },
  {
    originalNumber: 10,
    question: "Match List I with List II:\nList I:\nA. Mesozoic Era\nB. Proterozoic Era\nC. Cenozoic Era\nD. Paleozoic Era\nList II:\nI. Lower invertebrates\nII. Fish & Amphibia\nIII. Birds & Reptiles\nIV. Mammals\nChoose the correct answer from the options given below:",
    optionA: "A-II, B-I, C-III, D-IV",
    optionB: "A-III, B-I, C-II, D-IV",
    optionC: "A-I, B-II, C-IV, D-III",
    optionD: "A-III, B-I, C-IV, D-II",
    correctOption: "D",
    yearLabel: "NEET-2024",
    explanation: "1. Mesozoic Era is widely known as the Age of Reptiles, characterized by the dominance and diversification of reptiles and the emergence of early birds (A matches III).\n2. Proterozoic Era preceded the Cambrian explosion and was characterized by primitive aquatic life including lower invertebrates and algae (B matches I).\n3. Cenozoic Era is the ongoing geological era known as the Age of Mammals and Angiosperms (C matches IV).\n4. Paleozoic Era was marked by the emergence and dominance of early aquatic vertebrates, notably fishes and amphibians (D matches II).\n5. Hence, the correct matching is A-III, B-I, C-IV, D-II.\nTherefore, Option (D) is the correct answer.",
    similarQuestion: {
      question: "The Cenozoic era is popularly designated as the age of:",
      option_a: "Reptiles and Gymnosperms",
      option_b: "Fishes and Amphibians",
      option_c: "Mammals and Angiosperms",
      option_d: "Trilobites and Algae",
      correct_option: "C",
      explanation: "1. The Cenozoic era spans from ~66 million years ago to the present.\n2. Following the mass extinction of dominant Mesozoic reptiles, mammals underwent rapid adaptive radiation to occupy vacant terrestrial and aquatic niches.\n3. Concurrently, angiosperms (flowering plants) diversified and became the dominant terrestrial vegetation.\n4. Hence, Cenozoic is designated as the Age of Mammals and Angiosperms.\nTherefore, Option (C) is the correct answer."
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
  console.log('Login successful! Processing Part 1 (' + questions.length + ' questions)...');

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
  console.log('Part 1 completed!');
}

run().catch(console.error);

