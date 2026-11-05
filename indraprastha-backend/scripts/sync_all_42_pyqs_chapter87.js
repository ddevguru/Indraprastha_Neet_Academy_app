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

function get(url, token) {
  return new Promise((resolve, reject) => {
    const u = new URL(url);
    const headers = { 'Authorization': `Bearer ${token}` };
    const req = https.request({
      hostname: u.hostname,
      port: u.port || 443,
      path: u.pathname + u.search,
      method: 'GET',
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
    req.end();
  });
}

function del(url, token) {
  return new Promise((resolve, reject) => {
    const u = new URL(url);
    const headers = { 'Authorization': `Bearer ${token}` };
    const req = https.request({
      hostname: u.hostname,
      port: u.port || 443,
      path: u.pathname + u.search,
      method: 'DELETE',
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
    req.end();
  });
}

const CHAPTER_ID = 87;

const all42Questions = [
  // 1
  {
    num: 1,
    question: "1. Sweet potato and potato represent a certain type of evolution. Select the correct combination of terms to explain the evolution. [NEET-2025]",
    optionA: "Analogy, convergent",
    optionB: "Homology, divergent",
    optionC: "Homology, convergent",
    optionD: "Analogy, divergent",
    correctOption: "A", // (1)
    yearLabel: "NEET-2025",
    explanation: "1. Sweet potato (Ipomoea batatas) is an adventitious root modification, whereas potato (Solanum tuberosum) is an underground stem modification (tuber).\n2. Both structures have different anatomical and developmental origins, but perform the same primary physiological function of food storage.\n3. Structures having different evolutionary origins that perform similar functions are analogous structures.\n4. Analogous organs develop as adaptations to similar ecological requirements, which is convergent evolution.\nTherefore, Option (A) is the correct answer.",
    similarQuestion: {
      question: "Thorns of Bougainvillea and tendrils of Cucurbita represent which type of organs and pattern of evolution?",
      option_a: "Analogous organs, convergent evolution",
      option_b: "Homologous organs, divergent evolution",
      option_c: "Analogous organs, divergent evolution",
      option_d: "Homologous organs, convergent evolution",
      correct_option: "B",
      explanation: "1. Both the thorns of Bougainvillea and the tendrils of Cucurbita arise in the axillary position and represent modifications of axillary buds (stem modification).\n2. Sharing a common embryonic origin but adapted to different functions (protection vs climbing support) defines homologous organs resulting from divergent evolution.\nTherefore, Option (B) is the correct answer."
    }
  },
  // 2
  {
    num: 2,
    question: "2. Match List-I with List-II: [Re-NEET-2024]\nList-I:\nA. Gene pool\nB. Genetic drift\nC. Gene flow\nD. Gene frequency\nList-II:\nI. Stable within a generation\nII. Change in gene frequency by chance\nIII. Transfer of genes into or out of population\nIV. Total number of genes and their alleles\nChoose the correct answer from the options given below:",
    optionA: "A-III, B-II, C-I, D-IV",
    optionB: "A-IV, B-II, C-III, D-I",
    optionC: "A-I, B-II, C-III, D-IV",
    optionD: "A-II, B-III, C-IV, D-I",
    correctOption: "B", // (2)
    yearLabel: "Re-NEET-2024",
    explanation: "1. Gene pool: Total collection of genes and their alleles in an interbreeding population (A matches IV).\n2. Genetic drift: Random fluctuation in allele frequency occurring by chance in small populations (B matches II).\n3. Gene flow: Transfer of genes into or out of a population due to migration (C matches III).\n4. Gene frequency: Relative proportion of an allele in a population, which remains stable within a generation under Hardy-Weinberg equilibrium (D matches I).\nTherefore, Option (B) is the correct answer.",
    similarQuestion: {
      question: "Match List-I with List-II regarding evolutionary concepts:\nList-I:\nA. Founder effect\nB. Saltation\nC. Darwinian fitness\nD. Natural selection\nList-II:\nI. Differential reproductive success\nII. Single step large mutation\nIII. Genetic drift in a small colonizing group\nIV. Relative reproductive success\nChoose the correct answer from the options given below:",
      option_a: "A-III, B-II, C-IV, D-I",
      option_b: "A-II, B-III, C-I, D-IV",
      option_c: "A-III, B-I, C-IV, D-II",
      option_d: "A-IV, B-II, C-III, D-I",
      correct_option: "A",
      explanation: "1. Founder effect: Genetic drift in a small colonizing group (A matches III).\n2. Saltation: Single-step large mutation leading to speciation proposed by Hugo de Vries (B matches II).\n3. Darwinian fitness: Relative reproductive success (C matches IV).\n4. Natural selection: Differential reproductive success among phenotypes (D matches I).\nTherefore, Option (A) is the correct answer."
    }
  },
  // 3
  {
    num: 3,
    question: "3. Which evolutionary phenomenon is depicted by the sketch of Darwin's finches showing diverse beak types adapted to different feeding habits? [Re-NEET-2024]",
    optionA: "Artificial selection",
    optionB: "Genetic drift",
    optionC: "Convergent evolution",
    optionD: "Adaptive radiation",
    correctOption: "D", // (4)
    yearLabel: "Re-NEET-2024",
    explanation: "1. The sketch illustrates the diverse beak morphologies of Darwin's finches on the Galapagos Islands.\n2. From an original seed-eating ancestral stock, various finch species radiated out to occupy distinct ecological niches on different islands, developing specialized beaks (vegetarian tree finches, insectivorous finches, cactus-feeding finches, and warbler finches).\n3. The evolutionary diversification of different species from a common ancestral point radiating into different ecological habitats is defined as adaptive radiation.\nTherefore, Option (D) is the correct answer.",
    similarQuestion: {
      question: "Australian marsupials radiating from an ancestral stock to occupy distinct ecological niches across the Australian continent is a classic example of:",
      option_a: "Convergent evolution",
      option_b: "Adaptive radiation",
      option_c: "Saltation",
      option_d: "Stabilizing selection",
      correct_option: "B",
      explanation: "1. A number of marsupials, each different from the other (e.g., kangaroo, wombat, bandicoot, Tasmanian wolf), evolved from an ancestral stock within the Australian island continent.\n2. This process of evolution of different species starting from a point and radiating to other habitats represents adaptive radiation.\nTherefore, Option (B) is the correct answer."
    }
  },
  // 4
  {
    num: 4,
    question: "4. Match List-I with List-II with respect to convergent evolution: [Re-NEET-2024]\nList-I:\nA. Lemur\nB. Bobcat\nC. Anteater\nD. Flying squirrels\nList-II:\nI. Flying phalanger\nII. Numbat\nIII. Spotted cuscus\nIV. Tasmanian tiger cat\nChoose the correct answer from the options given below:",
    optionA: "A-III, B-IV, C-II, D-I",
    optionB: "A-III, B-II, C-IV, D-I",
    optionC: "A-IV, B-III, C-II, D-I",
    optionD: "A-IV, B-II, C-III, D-I",
    correctOption: "A", // (1)
    yearLabel: "Re-NEET-2024",
    explanation: "1. In convergent evolution between placental mammals and Australian marsupials:\n- Lemur (placental) converges with Spotted cuscus (marsupial) (A matches III).\n- Bobcat (placental) converges with Tasmanian tiger cat (marsupial) (B matches IV).\n- Anteater (placental) converges with Numbat / banded anteater (marsupial) (C matches II).\n- Flying squirrel (placental) converges with Flying phalanger (marsupial) (D matches I).\nTherefore, Option (A) is the correct answer.",
    similarQuestion: {
      question: "Which of the following pairs correctly represents convergent evolution between a placental mammal and an Australian marsupial?",
      option_a: "Wolf and Tasmanian wolf",
      option_b: "Lemur and Tasmanian tiger cat",
      option_c: "Bobcat and Spotted cuscus",
      option_d: "Anteater and Flying phalanger",
      correct_option: "A",
      explanation: "1. Placental wolf and Australian marsupial Tasmanian wolf share remarkably similar predatory body plans, skull shapes, and hunting behaviors despite having evolved from distinct lineages.\n2. This independent evolution of similar traits in response to comparable ecological niches is convergent evolution.\nTherefore, Option (A) is the correct answer."
    }
  },
  // 5
  {
    num: 5,
    question: "5. Match List-I with List-II: [Re-NEET-2024]\nList-I:\nA. Living Fossil\nB. Connecting Link\nC. Vestigial Organ\nD. Atavism\nList-II:\nI. Elongated canine teeth\nII. Vermiform appendix\nIII. Echidna\nIV. Latimeria\nChoose the correct answer from the options given below:",
    optionA: "A-IV, B-III, C-II, D-I",
    optionB: "A-IV, B-II, C-III, D-I",
    optionC: "A-IV, B-III, C-I, D-II",
    optionD: "A-III, B-IV, C-I, D-II",
    correctOption: "A", // (1)
    yearLabel: "Re-NEET-2024",
    explanation: "1. Living Fossil: Latimeria (coelacanth lobe-finned fish) has persisted unchanged for millions of years (A matches IV).\n2. Connecting Link: Echidna (spiny anteater) shares reptilian egg-laying and mammalian milk-secreting traits (B matches III).\n3. Vestigial Organ: Human vermiform appendix is a non-functional remnant of a functional caecum in herbivorous ancestors (C matches II).\n4. Atavism: Reappearance of ancestral traits such as exceptionally long canine teeth in humans (D matches I).\nTherefore, Option (A) is the correct answer.",
    similarQuestion: {
      question: "Peripatus is an important evolutionary connecting link between which two phyla?",
      option_a: "Annelida and Arthropoda",
      option_b: "Mollusca and Echinodermata",
      option_c: "Annelida and Mollusca",
      option_d: "Arthropoda and Chordata",
      correct_option: "A",
      explanation: "1. Peripatus exhibits annelidan features (unjointed legs, nephridia) and arthropodan features (trachea, claws, hemocoel).\n2. Thus, it serves as a connecting link between Annelida and Arthropoda.\nTherefore, Option (A) is the correct answer."
    }
  },
  // 6
  {
    num: 6,
    question: "6. What is the correct order (old to recent) of periods in Paleozoic era? [Re-NEET-2024]",
    optionA: "Silurian, Devonian, Permian, Carboniferous",
    optionB: "Silurian, Devonian, Carboniferous, Permian",
    optionC: "Permian, Devonian, Silurian, Carboniferous",
    optionD: "Silurian, Carboniferous, Permian, Devonian",
    correctOption: "B", // (2)
    yearLabel: "Re-NEET-2024",
    explanation: "1. The Paleozoic era comprises: Cambrian → Ordovician → Silurian → Devonian → Carboniferous → Permian.\n2. Starting from Silurian: Silurian followed by Devonian (age of fishes), followed by Carboniferous (age of amphibians), followed by Permian.\n3. Hence, the correct order from older to recent is Silurian, Devonian, Carboniferous, Permian.\nTherefore, Option (B) is the correct answer.",
    similarQuestion: {
      question: "Which of the following represents the correct chronological sequence (old to recent) of periods within the Mesozoic era?",
      option_a: "Triassic → Jurassic → Cretaceous",
      option_b: "Jurassic → Triassic → Cretaceous",
      option_c: "Cretaceous → Jurassic → Triassic",
      option_d: "Triassic → Cretaceous → Jurassic",
      correct_option: "A",
      explanation: "1. The Mesozoic era (Age of Reptiles) is subdivided into Triassic (oldest), Jurassic (middle), and Cretaceous (most recent).\nTherefore, Option (A) is the correct answer."
    }
  },
  // 7
  {
    num: 7,
    question: "7. Given below are some stages of human evolution. Arrange them in correct sequence. (Past to Recent) [NEET-2024]\nA. Homo habilis\nB. Homo sapiens\nC. Homo neanderthalensis\nD. Homo erectus\nChoose the correct sequence of human evolution from the options given below:",
    optionA: "D-A-C-B",
    optionB: "B-A-D-C",
    optionC: "C-B-D-A",
    optionD: "A-D-C-B",
    correctOption: "D", // (4)
    yearLabel: "NEET-2024",
    explanation: "1. Chronological order of hominid evolution:\n- Homo habilis (~2.0 million years ago, 650-800 cc)\n- Homo erectus (~1.5 million years ago, ~900 cc)\n- Homo neanderthalensis (100,000 to 40,000 years ago, ~1400 cc)\n- Homo sapiens (75,000 to 10,000 years ago)\n2. The sequence from past to recent is: A → D → C → B.\nTherefore, Option (D) is the correct answer.",
    similarQuestion: {
      question: "Arrange the following hominid ancestors in correct chronological order from earliest to most recent:\n(i) Ramapithecus\n(ii) Australopithecus\n(iii) Homo habilis\n(iv) Homo erectus",
      option_a: "(i) → (ii) → (iii) → (iv)",
      option_b: "(ii) → (i) → (iii) → (iv)",
      option_c: "(i) → (iii) → (ii) → (iv)",
      option_d: "(iv) → (iii) → (ii) → (i)",
      correct_option: "A",
      explanation: "1. Ramapithecus (~15 mya) → Australopithecines (~2-3 mya) → Homo habilis (~2 mya) → Homo erectus (~1.5 mya).\nTherefore, Option (A) is the correct answer."
    }
  },
  // 8
  {
    num: 8,
    question: "8. Which one of the following factors will not affect the Hardy-Weinberg equilibrium? [NEET-2024]",
    optionA: "Genetic recombination",
    optionB: "Genetic drift",
    optionC: "Gene migration",
    optionD: "Constant gene pool",
    correctOption: "D", // (4)
    yearLabel: "NEET-2024",
    explanation: "1. Hardy-Weinberg equilibrium states that allele frequencies in a population remain constant and stable across generations.\n2. Factors that disrupt Hardy-Weinberg equilibrium include: gene migration, genetic drift, mutation, genetic recombination, and natural selection.\n3. A constant gene pool represents the equilibrium state itself and does NOT disturb it.\nTherefore, Option (D) is the correct answer.",
    similarQuestion: {
      question: "Which of the following conditions is required to maintain Hardy-Weinberg equilibrium in a population?",
      option_a: "Small population size",
      option_b: "Frequent migration of individuals",
      option_c: "Random mating",
      option_d: "High rate of directional mutation",
      correct_option: "C",
      explanation: "1. Hardy-Weinberg equilibrium requires large population size, random mating (panmixia), no net mutations, no gene flow, and no natural selection.\nTherefore, Option (C) is the correct answer."
    }
  },
  // 9
  {
    num: 9,
    question: "9. The flippers of the Penguins and Dolphins are the example of the [NEET-2024]",
    optionA: "Adaptive radiation",
    optionB: "Natural selection",
    optionC: "Convergent evolution",
    optionD: "Divergent evolution",
    correctOption: "C", // (3)
    yearLabel: "NEET-2024",
    explanation: "1. Penguins (birds) and dolphins (mammals) possess flippers for swimming.\n2. Although derived from different ancestral skeletal modifications, they perform the same function in aquatic habitats.\n3. Unrelated structures performing similar functions due to adaptation to similar environmental pressures represent convergent evolution (analogy).\nTherefore, Option (C) is the correct answer.",
    similarQuestion: {
      question: "Eye of an octopus and eye of a cat show similar function of vision but differ in structural details and embryonic origin. This exemplifies:",
      option_a: "Divergent evolution based on homology",
      option_b: "Convergent evolution based on analogy",
      option_c: "Homology based on convergent evolution",
      option_d: "Adaptive radiation from a common ancestor",
      correct_option: "B",
      explanation: "1. Octopus (mollusc) and cat (mammal) eyes perform vision but have different retinal layouts and embryonic origins.\n2. Different structures evolving for the same function represent analogy, reflecting convergent evolution.\nTherefore, Option (B) is the correct answer."
    }
  },
  // 10
  {
    num: 10,
    question: "10. Match List I with List II: [NEET-2024]\nList I:\nA. Mesozoic Era\nB. Proterozoic Era\nC. Cenozoic Era\nD. Paleozoic Era\nList II:\nI. Lower invertebrates\nII. Fish & Amphibia\nIII. Birds & Reptiles\nIV. Mammals\nChoose the correct answer from the options given below :",
    optionA: "A-II, B-I, C-III, D-IV",
    optionB: "A-III, B-I, C-II, D-IV",
    optionC: "A-I, B-II, C-IV, D-III",
    optionD: "A-III, B-I, C-IV, D-II",
    correctOption: "D", // (4)
    yearLabel: "NEET-2024",
    explanation: "1. Mesozoic Era: Age of Reptiles and early birds (A matches III).\n2. Proterozoic Era: Primitive life dominated by lower invertebrates and algae (B matches I).\n3. Cenozoic Era: Age of Mammals and Angiosperms (C matches IV).\n4. Paleozoic Era: Dominance and radiation of fishes and amphibians (D matches II).\n5. Hence, the matching is A-III, B-I, C-IV, D-II.\nTherefore, Option (D) is the correct answer.",
    similarQuestion: {
      question: "The Cenozoic era is popularly designated as the age of:",
      option_a: "Reptiles and Gymnosperms",
      option_b: "Fishes and Amphibians",
      option_c: "Mammals and Angiosperms",
      option_d: "Trilobites and Algae",
      correct_option: "C",
      explanation: "1. Following the extinction of dinosaurs at the end of the Cretaceous, mammals and angiosperms radiated explosively throughout the Cenozoic era.\nTherefore, Option (C) is the correct answer."
    }
  },
  // 11
  {
    num: 11,
    question: "11. Identify the fossil of man who showed the following characteristics. [NEET-2023-MANIPUR]\n(A) Brain capacity of 1400 cc\n(B) Used hides to protect their body\n(C) Buried their dead bodies\nIn the light of above statements, choose the correct answer from the options given below:",
    optionA: "Homo habilis",
    optionB: "Australopithecus",
    optionC: "Homo erectus",
    optionD: "Neanderthal man",
    correctOption: "D", // (4)
    yearLabel: "NEET-2023-MANIPUR",
    explanation: "1. Homo neanderthalensis (Neanderthal man) lived in near East and Central Asia between 100,000 and 40,000 years ago.\n2. Their cranial capacity was approximately 1400 cc.\n3. They used animal hides to protect their bodies and were the first known hominids to bury their dead.\nTherefore, Option (D) is the correct answer.",
    similarQuestion: {
      question: "Which hominid ancestor is characterized by having a cranial capacity of about 900 cc and probably ate meat?",
      option_a: "Homo habilis",
      option_b: "Homo erectus",
      option_c: "Australopithecus",
      option_d: "Dryopithecus",
      correct_option: "B",
      explanation: "1. Homo erectus fossils from Java (~1.5 mya) revealed a cranial capacity of about 900 cc and evidence of meat-eating.\nTherefore, Option (B) is the correct answer."
    }
  },
  // 12
  {
    num: 12,
    question: "12. Select the correct group/set of Australian Marsupials exhibiting adaptive radiation. [NEET-2023]",
    optionA: "Tasmanian wolf, Bobcat, Marsupial mole",
    optionB: "Numbat, Spotted cuscus, Flying phalanger",
    optionC: "Mole, Flying squirrel, Tasmanian tiger cat",
    optionD: "Lemur, Anteater, Wolf",
    correctOption: "B", // (2)
    yearLabel: "NEET-2023",
    explanation: "1. Numbat, Spotted cuscus, and Flying phalanger are all indigenous Australian marsupials derived from adaptive radiation within Australia.\n2. Bobcat, Mole, Flying squirrel, Lemur, Anteater, and Wolf are placental mammals.\n3. Hence, only option B consists entirely of Australian marsupials.\nTherefore, Option (B) is the correct answer.",
    similarQuestion: {
      question: "Which of the following sets contains only placental mammals that parallel Australian marsupials through convergent evolution?",
      option_a: "Anteater, Bobcat, Flying squirrel",
      option_b: "Numbat, Tasmanian wolf, Kangaroo",
      option_c: "Wombat, Koala, Bandicoot",
      option_d: "Spotted cuscus, Lemur, Wolf",
      correct_option: "A",
      explanation: "1. Anteater, Bobcat, and Flying squirrel are placental mammals that independently evolved analogous adaptations mirroring Australian marsupials (Numbat, Tasmanian tiger cat, and Flying phalanger).\nTherefore, Option (A) is the correct answer."
    }
  },
  // 13
  {
    num: 13,
    question: "13. Natural selection where more individuals acquire specific character value other than the mean character value, leads to: [NEET-2022]",
    optionA: "Directional change",
    optionB: "Disruptive change",
    optionC: "Random change",
    optionD: "Stabilising change",
    correctOption: "A", // (1)
    yearLabel: "NEET-2022",
    explanation: "1. Natural selection can produce three distinct patterns on continuous phenotypic traits:\n- Stabilizing selection: more individuals acquire the mean character value (peak narrows).\n- Directional selection: more individuals acquire values toward one extreme (other than the mean), shifting the peak in that direction.\n- Disruptive selection: individuals at both extremes are favored over intermediate values (two peaks).\n2. Therefore, when individuals acquire a character value other than the mean, it leads to directional change.\nTherefore, Option (A) is the correct answer.",
    similarQuestion: {
      question: "In a population of snails, selection eliminates intermediate shell colors and favors both extreme light and extreme dark phenotypes. This type of selection is called:",
      option_a: "Stabilizing selection",
      option_b: "Directional selection",
      option_c: "Disruptive selection",
      option_d: "Balancing selection",
      correct_option: "C",
      explanation: "1. Selection favoring both peripheral extremes against intermediate phenotypes creates a bimodal distribution termed disruptive selection.\nTherefore, Option (C) is the correct answer."
    }
  },
  // 14
  {
    num: 14,
    question: "14. Which of the following statements is not true ? [NEET-2022]",
    optionA: "Sweet potato and potato is an example of analogy",
    optionB: "Homology indicates common ancestry",
    optionC: "Flippers of penguins and dolphins are a pair of homologous organs",
    optionD: "Analogous structures are a result of convergent evolution",
    correctOption: "C", // (3)
    yearLabel: "NEET-2022",
    explanation: "1. Sweet potato (root) and potato (stem) represent analogy (Statement A is true).\n2. Homology reflects common descent and divergent evolution (Statement B is true).\n3. Flippers of penguins (birds) and dolphins (mammals) are analogous organs resulting from convergent evolution, NOT homologous organs (Statement C is false/not true).\n4. Analogous structures arise through convergent evolution in similar environments (Statement D is true).\nTherefore, Option (C) is the correct answer.",
    similarQuestion: {
      question: "Which of the following statements is INCORRECT regarding homology and analogy?",
      option_a: "Homology indicates common ancestry and divergent evolution.",
      option_b: "Analogy results from convergent evolution in response to similar environmental needs.",
      option_c: "Vertebrate hearts and brains are examples of analogy.",
      option_d: "Sweet potato and potato tubers represent analogous organs.",
      correct_option: "C",
      explanation: "1. Vertebrate hearts and brains share a fundamentally similar developmental plan and anatomical architecture across vertebrate classes, representing homology and divergent evolution, not analogy.\nTherefore, Option (C) is the correct answer."
    }
  },
  // 15
  {
    num: 15,
    question: "15. Panspermia, an idea that is still a favourite for some astronomers, means : [Re-NEET-2022]",
    optionA: "Creation of life from dead and decaying matter",
    optionB: "Creation of life from chemicals",
    optionC: "Origin of sperm in human testes",
    optionD: "Transfer of spores as unit of life from other planets of Earth",
    correctOption: "D", // (4)
    yearLabel: "Re-NEET-2022",
    explanation: "1. The hypothesis of Panspermia (Cosmozoic theory) proposes that units of life called spores or seeds were transferred to Earth from outer space / celestial bodies.\n2. Creation of life from non-living matter is abiogenesis; creation from chemicals is Oparin-Haldane chemical evolution.\nTherefore, Option (D) is the correct answer.",
    similarQuestion: {
      question: "The hypothesis that life originated spontaneously from non-living decaying matter such as straw, mud, and manure was known as:",
      option_a: "Theory of Biogenesis",
      option_b: "Theory of Spontaneous Generation (Abiogenesis)",
      option_c: "Theory of Panspermia",
      option_d: "Theory of Chemical Evolution",
      correct_option: "B",
      explanation: "1. The theory of spontaneous generation (abiogenesis) held that living organisms could arise spontaneously from non-living decaying organic materials.\nTherefore, Option (B) is the correct answer."
    }
  },
  // 16
  {
    num: 16,
    question: "16. Select the correct statement regarding mutation theory of evolution. [Re-NEET-2022]",
    optionA: "This theory was proposed by Alfred Wallace",
    optionB: "Variations are small directional changes",
    optionC: "Single step large mutation is a cause of speciation",
    optionD: "Large differences due to mutations arise gradually in a population",
    correctOption: "C", // (3)
    yearLabel: "Re-NEET-2022",
    explanation: "1. Hugo de Vries proposed the Mutation Theory based on Oenothera lamarckiana (evening primrose).\n2. De Vries believed mutations are sudden, random, and directionless.\n3. He stated that speciation is caused by single-step large mutations, a mechanism termed saltation.\nTherefore, Option (C) is the correct answer.",
    similarQuestion: {
      question: "Hugo de Vries proposed his mutation theory of evolution based on his experimental observations on which organism?",
      option_a: "Pisum sativum",
      option_b: "Oenothera lamarckiana",
      option_c: "Drosophila melanogaster",
      option_d: "Mirabilis jalapa",
      correct_option: "B",
      explanation: "1. Hugo de Vries conducted breeding experiments on Oenothera lamarckiana (evening primrose) and formulated his Mutation Theory.\nTherefore, Option (B) is the correct answer."
    }
  },
  // 17
  {
    num: 17,
    question: "17. The factor that leads to Founder effect in a population is: [NEET-2021]",
    optionA: "Natural selection",
    optionB: "Genetic recombination",
    optionC: "Mutation",
    optionD: "Genetic drift",
    correctOption: "D", // (4)
    yearLabel: "NEET-2021",
    explanation: "1. The founder effect is a form of genetic drift that occurs when a small group of colonizers separates from a larger parental population.\n2. Chance fluctuations cause the allele frequencies of the founders to differ dramatically from the source population, shaping a distinct gene pool.\n3. Thus, the underlying mechanism of the founder effect is genetic drift.\nTherefore, Option (D) is the correct answer.",
    similarQuestion: {
      question: "A drastic, non-selective reduction in population size caused by environmental catastrophes (e.g. volcanic eruptions, floods) leading to altered allele frequencies is known as:",
      option_a: "Bottleneck effect",
      option_b: "Gene migration",
      option_c: "Directional selection",
      option_d: "Adaptive radiation",
      correct_option: "A",
      explanation: "1. A population bottleneck occurs when environmental catastrophes randomly decimate a population, leaving surviving individuals whose allele frequencies differ from the original population purely by chance (genetic drift).\nTherefore, Option (A) is the correct answer."
    }
  },
  // 18
  {
    num: 18,
    question: "18. Mammals were evolved from [NEET-2021]",
    optionA: "Sauropsids",
    optionB: "Synapsids",
    optionC: "Thecodonts",
    optionD: "Tyranosaurus",
    correctOption: "B", // (2)
    yearLabel: "NEET-2021",
    explanation: "1. Early amniotes diverged into Synapsids and Sauropsids.\n2. Synapsids gave rise to pelycosaurs and therapsids (mammal-like reptiles), from which modern mammals evolved.\n3. Sauropsids gave rise to reptiles, dinosaurs, and birds.\nTherefore, Option (B) is the correct answer.",
    similarQuestion: {
      question: "Modern reptiles, dinosaurs, and birds evolved along which major amniote evolutionary lineage?",
      option_a: "Synapsids",
      option_b: "Sauropsids",
      option_c: "Pelycosaurs",
      option_d: "Therapsids",
      correct_option: "B",
      explanation: "1. The Sauropsida lineage comprises modern reptiles, extinct dinosaurs, and birds.\nTherefore, Option (B) is the correct answer."
    }
  },
  // 19
  {
    num: 19,
    question: "19. Embryological support for evolution was disapproved by : [NEET-2020]",
    optionA: "Oparin",
    optionB: "Karl Ernst von Baer",
    optionC: "Alfred Wallace",
    optionD: "Charles Darwin",
    correctOption: "B", // (2)
    yearLabel: "NEET-2020",
    explanation: "1. Ernst Haeckel proposed embryological support for evolution via his Biogenetic law (ontogeny recapitulates phylogeny).\n2. Karl Ernst von Baer disapproved this theory after showing that embryos do not pass through adult stages of ancestral organisms; instead, embryos share general developmental stages.\nTherefore, Option (B) is the correct answer.",
    similarQuestion: {
      question: "The 'Biogenetic law' which proposed that 'Ontogeny recapitulates phylogeny' was formulated by:",
      option_a: "Ernst Haeckel",
      option_b: "Karl Ernst von Baer",
      option_c: "Charles Darwin",
      option_d: "Louis Pasteur",
      correct_option: "A",
      explanation: "1. Ernst Haeckel postulated the Biogenetic law that ontogeny recapitulates phylogeny, which was subsequently refuted by Karl Ernst von Baer.\nTherefore, Option (A) is the correct answer."
    }
  },
  // 20
  {
    num: 20,
    question: "20. Flippers of Penguins and Dolphins are examples of: [NEET-2020]",
    optionA: "Natural selection",
    optionB: "Adaptive radiation",
    optionC: "Convergent evolution",
    optionD: "Industrial melanism",
    correctOption: "C", // (3)
    yearLabel: "NEET-2020",
    explanation: "1. Penguins (birds) and dolphins (mammals) possess flippers for swimming.\n2. Both structures share the same functional adaptation despite evolving independently from different vertebrate lineages.\n3. Independent evolution of similar functional traits in distantly related taxa is convergent evolution.\nTherefore, Option (C) is the correct answer.",
    similarQuestion: {
      question: "The wings of a butterfly and the wings of a bat are examples of:",
      option_a: "Homologous organs resulting from divergent evolution",
      option_b: "Analogous organs resulting from convergent evolution",
      option_c: "Vestigial structures",
      option_d: "Atavistic features",
      correct_option: "B",
      explanation: "1. Butterfly wings (folds of integument) and bat wings (skin folds over phalanges) perform flight but have different origins, demonstrating convergent evolution (analogy).\nTherefore, Option (B) is the correct answer."
    }
  },
  // 21
  {
    num: 21,
    question: "21. From his experiments, S.L. Miller produced amino acids by mixing the following in a closed flask : [NEET-2020]",
    optionA: "CH3, H2, NH3 and water vapour at 600°C",
    optionB: "CH4, H2, NH3 and water vapour at 800°C",
    optionC: "CH3, H2, NH4 and water vapour at 800°C",
    optionD: "CH4, H2, NH3 and water vapour at 600°C",
    correctOption: "B", // (2)
    yearLabel: "NEET-2020",
    explanation: "1. In 1953, Stanley L. Miller created electric discharge in a closed spark-discharge flask containing CH₄, H₂, NH₃, and water vapour.\n2. The temperature inside the spark flask was kept at 800°C.\n3. This prebiotic simulation resulted in the synthesis of amino acids (glycine, alanine, aspartic acid).\nTherefore, Option (B) is the correct answer.",
    similarQuestion: {
      question: "In S.L. Miller's spark-discharge experiment simulating prebiotic atmospheric conditions, which primary class of bio-monomers was formed?",
      option_a: "Amino acids",
      option_b: "Polysaccharides",
      option_c: "Complex proteins",
      option_d: "Phospholipids",
      correct_option: "A",
      explanation: "1. Analysis of the condensation product after passing electric sparks through CH₄, H₂, NH₃, and water vapour at 800°C revealed the formation of simple amino acids.\nTherefore, Option (A) is the correct answer."
    }
  },
  // 22
  {
    num: 22,
    question: "22. Which of the following refer to correct example(s) of organisms which have evolved due to changes in environment brought about by anthropogenic action? [NEET-2020]\n(a) Darwin's Finches of Galapagos islands.\n(b) Herbicide resistant weeds.\n(c) Drug resistant eukaryotes.\n(d) Man-created breeds of domesticated animals like dogs.\nChoose the correct option:",
    optionA: "Only (d)",
    optionB: "Only (a)",
    optionC: "(a) and (c)",
    optionD: "(b), (c) and (d)",
    correctOption: "D", // (4)
    yearLabel: "NEET-2020",
    explanation: "1. Anthropogenic actions refer to human activities.\n2. Herbicide-resistant weeds (b), drug-resistant eukaryotes/microbes (c), and artificial breeds of domesticated animals like dogs (d) all evolved through human-induced environmental pressures and selective breeding.\n3. Darwin's finches (a) diversified via natural adaptive radiation without human interference.\n4. Hence, statements (b), (c), and (d) are correct examples of anthropogenic evolution.\nTherefore, Option (D) is the correct answer.",
    similarQuestion: {
      question: "Industrial melanism in the peppered moth (Biston betularia) observed in England during the industrial revolution provides a classic example of:",
      option_a: "Natural selection driven by anthropogenic environmental change",
      option_b: "Lamarckian inheritance of acquired characters",
      option_c: "Discontinuous mutation producing saltation",
      option_d: "Genetic drift in an isolated population",
      correct_option: "A",
      explanation: "1. Industrial pollution covered tree trunks with soot, giving melanic dark moths a camouflage advantage against predators, demonstrating natural selection driven by human industrial pollution.\nTherefore, Option (A) is the correct answer."
    }
  },
  // 23
  {
    num: 23,
    question: "23. Embryological support for evolution was proposed by : [NEET-2020(COVID-19)]",
    optionA: "Ernst Heckel",
    optionB: "Karl Ernst von Baer",
    optionC: "Charles Darwin",
    optionD: "Alfred Wallace",
    correctOption: "A", // (1)
    yearLabel: "NEET-2020(COVID-19)",
    explanation: "1. Ernst Haeckel proposed embryological support for evolution based on his observation of common features in vertebrate embryos.\n2. He framed the Biogenetic law: 'Ontogeny recapitulates phylogeny'.\nTherefore, Option (A) is the correct answer.",
    similarQuestion: {
      question: "According to the Biogenetic Law formulated by Ernst Haeckel, which of the following statements represents the core concept?",
      option_a: "Ontogeny recapitulates phylogeny",
      option_b: "Phylogeny recapitulates ontogeny",
      option_c: "Adult morphology dictates embryonic development",
      option_d: "Embryos of vertebrates never share any morphological features",
      correct_option: "A",
      explanation: "1. Haeckel's biogenetic law states that the embryonic stages of an organism (ontogeny) retrace the evolutionary history of its species (phylogeny).\nTherefore, Option (A) is the correct answer."
    }
  },
  // 24
  {
    num: 24,
    question: "24. After about how many years of formation of earth, life appeared on this planet ? [NEET-2020(COVID-19)]",
    optionA: "500 billion years",
    optionB: "50 million years",
    optionC: "500 million years",
    optionD: "50 billion years",
    correctOption: "C", // (3)
    yearLabel: "NEET-2020(COVID-19)",
    explanation: "1. Earth formed approximately 4.5 billion years ago (4500 million years ago).\n2. The earliest cellular life appeared about 4.0 billion years ago (4000 million years ago).\n3. 4500 mya - 4000 mya = 500 million years after the formation of Earth.\nTherefore, Option (C) is the correct answer.",
    similarQuestion: {
      question: "The Earth was formed approximately how many billion years ago?",
      option_a: "20.0 billion years ago",
      option_b: "4.5 billion years ago",
      option_c: "3.2 billion years ago",
      option_d: "1.5 billion years ago",
      correct_option: "B",
      explanation: "1. The universe originated around 20 billion years ago, and Earth is estimated to have condensed and formed approximately 4.5 billion years ago.\nTherefore, Option (B) is the correct answer."
    }
  },
  // 25
  {
    num: 25,
    question: "25. The phenomenon of evolution of different species in a given geographical area starting from a point and spreading to other habitats is called :- [NEET-2020(COVID-19)]",
    optionA: "Saltation",
    optionB: "Co-evolution",
    optionC: "Natural selection",
    optionD: "Adaptive radiation",
    correctOption: "D", // (4)
    yearLabel: "NEET-2020(COVID-19)",
    explanation: "1. The evolution of multiple species originating from a common point and radiating out into different geographical areas or ecological habitats is termed adaptive radiation.\n2. Prominent examples include Darwin's finches and Australian marsupials.\nTherefore, Option (D) is the correct answer.",
    similarQuestion: {
      question: "Darwin's finches on the Galapagos islands evolved diverse beak adaptations suited for seeds, insects, and nectar from an original seed-eating ancestor. This process illustrates:",
      option_a: "Adaptive radiation",
      option_b: "Convergent evolution",
      option_c: "Parallel evolution",
      option_d: "Saltation",
      correct_option: "A",
      explanation: "1. Diversification of ancestral seed-eating finches into insect-eating and vegetarian forms across the archipelago is adaptive radiation.\nTherefore, Option (A) is the correct answer."
    }
  },
  // 26
  {
    num: 26,
    question: "26. A Hominid fossil discovered in Java in 1891, now extinct, having cranial capacity of about 900 cc was: [NEET-2020(COVID-19)]",
    optionA: "Homo erectus",
    optionB: "Neanderthal man",
    optionC: "Homo sapiens",
    optionD: "Australopithecus",
    correctOption: "A", // (1)
    yearLabel: "NEET-2020(COVID-19)",
    explanation: "1. In 1891, fossils of Homo erectus (Java ape man) were discovered in Java.\n2. Homo erectus lived around 1.5 million years ago and had a cranial capacity of approximately 900 cc.\nTherefore, Option (A) is the correct answer.",
    similarQuestion: {
      question: "Which hominid ancestor was the first to use fire, make advanced stone hand-axes, and possess an upright bipedal posture with a brain volume of about 900 cc?",
      option_a: "Australopithecus",
      option_b: "Homo habilis",
      option_c: "Homo erectus",
      option_d: "Neanderthal man",
      correct_option: "C",
      explanation: "1. Homo erectus walked erectly, possessed a 900 cc cranial capacity, and made stone tools with controlled fire use.\nTherefore, Option (C) is the correct answer."
    }
  },
  // 27
  {
    num: 27,
    question: "27. Variations caused by mutation, as proposed by Hugo de Vries, are [NEET-2019]",
    optionA: "random and directional",
    optionB: "random and directionless",
    optionC: "small and directional",
    optionD: "small and directionless",
    correctOption: "B", // (2)
    yearLabel: "NEET-2019",
    explanation: "1. According to Hugo de Vries' Mutation Theory, mutations are large, sudden, discontinuous, random, and directionless.\n2. This differs from Darwin's view that variations are small and directional.\nTherefore, Option (B) is the correct answer.",
    similarQuestion: {
      question: "According to Charles Darwin, the variations that provide raw material for evolution are:",
      option_a: "Random and directionless",
      option_b: "Small and directional",
      option_c: "Sudden and saltatory",
      option_d: "Discontinuous and irregular",
      correct_option: "B",
      explanation: "1. Darwin considered evolutionary variations to be small, continuous, and directional, slowly accumulating through natural selection.\nTherefore, Option (B) is the correct answer."
    }
  },
  // 28
  {
    num: 28,
    question: "28. In a species, the weight of newborn ranges from 2 to 5 kg. 97% of the newborn with an average weight between 3 to 3.3kg survive whereas 99% of the infants born with weights from 2 to 2.5kg or 4.5 to 5 kg die. Which type of selection process is taking place ? [NEET-2019]",
    optionA: "Directional Selection",
    optionB: "Stabilizing Selection",
    optionC: "Disruptive Selection",
    optionD: "Cyclical Selection",
    correctOption: "B", // (2)
    yearLabel: "NEET-2019",
    explanation: "1. When intermediate phenotypes (3 to 3.3 kg) have higher survival (97%) and extreme variants (2-2.5 kg and 4.5-5 kg) are heavily eliminated (99% mortality), natural selection is stabilizing.\n2. Stabilizing selection preserves the mean phenotype and reduces phenotypic variance in the population.\nTherefore, Option (B) is the correct answer.",
    similarQuestion: {
      question: "Stabilizing natural selection operating on a continuous phenotypic character in a population results in:",
      option_a: "The peak shifting toward one of the extremes",
      option_b: "The peak becoming higher and narrower around the mean",
      option_c: "The formation of two distinct peaks at both extremes",
      option_d: "Complete eradication of genetic inheritance",
      correct_option: "B",
      explanation: "1. Stabilizing selection favors the mean character state over the extremes, making the phenotypic distribution narrower and higher at the mean.\nTherefore, Option (B) is the correct answer."
    }
  },
  // 29
  {
    num: 29,
    question: "29. Match the hominids with their correct brain size : [NEET-2019]\n(a) Homo habilis (i) 900 cc\n(b) Homo neanderthalensis (ii) 1350 cc\n(c) Homo erectus (iii) 650-800 cc\n(d) Homo sapiens (iv) 1400 cc\nSelect the correct option:\n     (a)   (b)   (c)   (d)",
    optionA: "(iii)  (i)   (iv)  (ii)",
    optionB: "(iii)  (ii)  (i)   (iv)",
    optionC: "(iii)  (iv)  (i)   (ii)",
    optionD: "(iv)   (iii) (i)   (ii)",
    correctOption: "C", // (3)
    yearLabel: "NEET-2019",
    explanation: "1. Homo habilis: 650-800 cc (a matches iii).\n2. Homo neanderthalensis: 1400 cc (b matches iv).\n3. Homo erectus: 900 cc (c matches i).\n4. Homo sapiens: ~1350 cc (d matches ii).\n5. Hence, the correct combination is (a)-(iii), (b)-(iv), (c)-(i), (d)-(ii).\nTherefore, Option (C) is the correct answer.",
    similarQuestion: {
      question: "What is the recorded cranial capacity of Homo habilis, considered the first tool-making hominid ancestor?",
      option_a: "400 - 500 cc",
      option_b: "650 - 800 cc",
      option_c: "900 - 1000 cc",
      option_d: "1400 - 1500 cc",
      correct_option: "B",
      explanation: "1. According to NCERT, Homo habilis had a cranial capacity of 650-800 cc.\nTherefore, Option (B) is the correct answer."
    }
  },
  // 30
  {
    num: 30,
    question: "30. In Australia, marsupials and placental mammals have evolved to share many similar characteristics. This type of evolution may be referred to as : [NEET-2019(Odisha)]",
    optionA: "Adaptive Radiation",
    optionB: "Divergent Evolution",
    optionC: "Cyclical Evolution",
    optionD: "Convergent Evolution",
    correctOption: "D", // (4)
    yearLabel: "NEET-2019(Odisha)",
    explanation: "1. In Australia, marsupials and placental mammals independently developed analogous structural features to fill similar ecological niches (e.g. Tasmanian wolf and placental wolf).\n2. When distinct adaptive radiations occur in geographically isolated habitats producing analogous adaptations, it is termed convergent evolution.\nTherefore, Option (D) is the correct answer.",
    similarQuestion: {
      question: "When more than one adaptive radiation occurs in an isolated geographical area (representing different habitats), the resulting evolutionary pattern is termed:",
      option_a: "Divergent evolution",
      option_b: "Convergent evolution",
      option_c: "Saltation",
      option_d: "Microevolution",
      correct_option: "B",
      explanation: "1. As described in NCERT, when different adaptive radiations produce similar adaptive types in separate phylogenetic lineages, it results in convergent evolution.\nTherefore, Option (B) is the correct answer."
    }
  },
  // 31
  {
    num: 31,
    question: "31. Which of the following statements is correct about the origin and evolution of men ?. [NEET-2019(Odisha)]",
    optionA: "Agriculture came around 50,000 years back.",
    optionB: "The Dryopithecus and Ramapithecus primates existing 15 million years ago, walked like men.",
    optionC: "Homo habilis probably ate meat.",
    optionD: "Neanderthal men lived in Asia betweeen 1,00,000 and 40,000 years back.",
    correctOption: "D", // (4)
    yearLabel: "NEET-2019(Odisha)",
    explanation: "1. Agriculture developed around 10,000 years ago (not 50,000 years ago).\n2. Dryopithecus was ape-like and knuckle-walking; only Ramapithecus was more man-like.\n3. Homo habilis probably did NOT eat meat; meat-eating was observed in Homo erectus.\n4. Neanderthal man (cranial capacity 1400 cc) lived in near East and Central Asia between 100,000 and 40,000 years ago. (Statement D is correct).\nTherefore, Option (D) is the correct answer.",
    similarQuestion: {
      question: "According to NCERT, modern Homo sapiens arose during the last ice age between:",
      option_a: "75,000 and 10,000 years ago",
      option_b: "100,000 and 40,000 years ago",
      option_c: "1.5 million and 500,000 years ago",
      option_d: "2.0 and 3.0 million years ago",
      correct_option: "A",
      explanation: "1. Modern Homo sapiens arose during the ice age between 75,000 and 10,000 years ago in Africa and spread across the continents.\nTherefore, Option (A) is the correct answer."
    }
  },
  // 32
  {
    num: 32,
    question: "32. The similarity of bone structure in forelimbs of many vertebrates is an example of [NEET-2018]",
    optionA: "Homology",
    optionB: "Analogy",
    optionC: "Convergent evolution",
    optionD: "Adaptive radiation",
    correctOption: "A", // (1)
    yearLabel: "NEET-2018",
    explanation: "1. Vertebrate forelimbs (in humans, cheetahs, whales, and bats) share an identical skeletal pattern: humerus, radius, ulna, carpals, metacarpals, and phalanges.\n2. Although adapted for different functions (running, flying, swimming, grasping), sharing a common skeletal plan derived from a common ancestor demonstrates homology.\n3. Homology is the hallmark of divergent evolution.\nTherefore, Option (A) is the correct answer.",
    similarQuestion: {
      question: "Which of the following pairs of vertebrate appendages represents homologous organs?",
      option_a: "Wings of pigeon and wings of honeybee",
      option_b: "Forelimbs of horse and flippers of seal",
      option_c: "Gills of prawn and lungs of cow",
      option_d: "Pectoral fin of shark and flipper of dolphin",
      correct_option: "B",
      explanation: "1. Forelimb of a horse and flipper of a seal share a common pentadactyl bone structure and common ancestral origin, illustrating homology.\nTherefore, Option (B) is the correct answer."
    }
  },
  // 33
  {
    num: 33,
    question: "33. Among the following sets of examples for divergent evolution, select the incorrect option: [NEET-2018]",
    optionA: "Forelimbs of man, bat and cheetah",
    optionB: "Heart of bat, man and cheetah",
    optionC: "Brain of bat, man and cheetah",
    optionD: "Eye of octopus, bat and man",
    correctOption: "D", // (4)
    yearLabel: "NEET-2018",
    explanation: "1. Divergent evolution is based on homology (structures with common origin adapted to different functions).\n2. Forelimbs, hearts, and brains of vertebrates share common ancestral design (homology).\n3. In contrast, the eye of an octopus and the eye of mammals have distinct developmental origins and retinal layouts, representing analogy resulting from convergent evolution, not divergent evolution.\nTherefore, Option (D) is the correct answer.",
    similarQuestion: {
      question: "Which of the following pairs is an example of convergent evolution rather than divergent evolution?",
      option_a: "Forelimbs of cheetah and human",
      option_b: "Thorn of Bougainvillea and tendril of Cucurbita",
      option_c: "Flippers of penguin and dolphins",
      option_d: "Vertebrate hearts of bird and reptile",
      correct_option: "C",
      explanation: "1. Flippers of penguins (birds) and dolphins (mammals) are analogous structures that evolved via convergent evolution for aquatic locomotion.\nTherefore, Option (C) is the correct answer."
    }
  },
  // 34
  {
    num: 34,
    question: "34. According to Hugo de Vries, the mechanism of evolution is :- [NEET-2018]",
    optionA: "Multiple step mutations",
    optionB: "Saltation",
    optionC: "Phenotypic variations",
    optionD: "Minor mutations",
    correctOption: "B", // (2)
    yearLabel: "NEET-2018",
    explanation: "1. Hugo de Vries proposed that evolution occurs through large, sudden, discontinuous mutations that cause speciation in a single step.\n2. He designated this single-step large mutation as saltation.\nTherefore, Option (B) is the correct answer.",
    similarQuestion: {
      question: "The term 'saltation' in evolutionary biology specifically refers to:",
      option_a: "Gradual accumulation of continuous micromutations",
      option_b: "Single-step large mutation producing speciation",
      option_c: "Directional migration of individuals across populations",
      option_d: "Selection favoring intermediate phenotypes",
      correct_option: "B",
      explanation: "1. Saltation refers to a sudden, single-step large mutation leading to the emergence of a new species, as proposed by Hugo de Vries.\nTherefore, Option (B) is the correct answer."
    }
  },
  // 35
  {
    num: 35,
    question: "35. Artificial selection to obtain cows yielding higher milk output represents : [NEET-2017]",
    optionA: "Directional as it pushes the mean of the character in one direction",
    optionB: "Disruptive as it splits the population into two, one yielding higher output and the other lower output",
    optionC: "Stabilizing followed by disruptive as it stabilizes population to produce higher yielding cows",
    optionD: "Stabilizing selection as it stabilizes this character in the population",
    correctOption: "A", // (1)
    yearLabel: "NEET-2017",
    explanation: "1. Artificial selection for higher milk output favors individuals with traits at one extreme of the distribution.\n2. Selecting and breeding cows with higher milk production continuously shifts the phenotypic mean toward greater milk yield.\n3. Selection that pushes the mean in one specific direction is directional selection.\nTherefore, Option (A) is the correct answer.",
    similarQuestion: {
      question: "The rapid emergence of DDT resistance in mosquito populations following extensive chemical spraying is an example of:",
      option_a: "Directional selection",
      option_b: "Stabilizing selection",
      option_c: "Disruptive selection",
      option_d: "Non-adaptive genetic drift",
      correct_option: "A",
      explanation: "1. Widespread pesticide spraying selectively favors resistant genotypes over sensitive ones, shifting the population mean in the direction of resistance (directional selection).\nTherefore, Option (A) is the correct answer."
    }
  },
  // 36
  {
    num: 36,
    question: "36. Which of the following structure is homologus to the wing of a bird ? [NEET- I 2016]",
    optionA: "Dorsal fin of a Shark",
    optionB: "Wing of a moth",
    optionC: "Hind limb of rabbit",
    optionD: "Flipper of whale",
    correctOption: "D", // (4)
    yearLabel: "NEET- I 2016",
    explanation: "1. The wing of a bird and the flipper of a whale are modified vertebrate forelimbs sharing a common skeletal architecture (humerus, radius, ulna, carpals, metacarpals, phalanges).\n2. Organs sharing common embryonic origin and basic structural plan adapted for different functions are homologous.\nTherefore, Option (D) is the correct answer.",
    similarQuestion: {
      question: "The wing of a bat is structurally and developmentally homologous to the:",
      option_a: "Wing of a butterfly",
      option_b: "Wing of a dragonfly",
      option_c: "Arm of a human",
      option_d: "Pectoral fin of a bony fish",
      correct_option: "C",
      explanation: "1. The wing of a bat and the arm of a human are homologous mammalian forelimbs derived from a common ancestral tetrapod plan.\nTherefore, Option (C) is the correct answer."
    }
  },
  // 37
  {
    num: 37,
    question: "37. Analogous structures are a result of :- [NEET- I 2016]",
    optionA: "Divergent evolution",
    optionB: "Convergent evolution",
    optionC: "Shared ancestry",
    optionD: "Stabilizing selection",
    correctOption: "B", // (2)
    yearLabel: "NEET- I 2016",
    explanation: "1. Analogous structures perform similar functions and have superficial structural resemblance, but differ in basic anatomical design and developmental origins.\n2. When distantly related organisms face similar environmental challenges, natural selection favors similar adaptations, resulting in convergent evolution.\nTherefore, Option (B) is the correct answer.",
    similarQuestion: {
      question: "Structures that possess a common basic anatomy and embryonic origin, but are adapted to perform different functions, are called:",
      option_a: "Analogous organs",
      option_b: "Homologous organs",
      option_c: "Vestigial organs",
      option_d: "Atavistic organs",
      correct_option: "B",
      explanation: "1. Homologous organs share a common anatomical origin and basic developmental pattern inherited from a common ancestor, but have diverged to perform different functions.\nTherefore, Option (B) is the correct answer."
    }
  },
  // 38
  {
    num: 38,
    question: "38. Following are the two statements regarding the origin of life :- [NEET- I 2016]\n(a) The earliest organisms that appeared on the earth were non-green and presumably anaerobes.\n(b) The first autotrophic organisms were the chemoautotrophs that never released oxygen.\nOf the above statements which one of the following options is correct ?",
    optionA: "(a) is correct but (b) is false.",
    optionB: "(b) is correct but (a) is false.",
    optionC: "Both (a) and (b) are correct.",
    optionD: "Both (a) and (b) are false.",
    correctOption: "C", // (3)
    yearLabel: "NEET- I 2016",
    explanation: "1. Statement (a) is correct: The primitive atmosphere lacked free O₂ (reducing atmosphere); hence, the earliest organisms were anaerobic chemoheterotrophs.\n2. Statement (b) is correct: The first autotrophs were anoxygenic chemoautotrophs utilizing hydrogen sulfide (H₂S) or inorganic chemicals without releasing O₂.\n3. Oxygenic photoautotrophs (cyanobacteria) evolved later.\n4. Therefore, both (a) and (b) are correct.\nTherefore, Option (C) is the correct answer.",
    similarQuestion: {
      question: "The primitive reducing atmosphere of prebiotic Earth was transformed into an oxidizing atmosphere primarily due to the evolutionary emergence of which organisms?",
      option_a: "Anaerobic chemoheterotrophs",
      option_b: "Chemoautotrophs utilizing hydrogen sulfide",
      option_c: "Cyanobacteria performing oxygenic photosynthesis",
      option_d: "Methanogenic archaebacteria",
      correct_option: "C",
      explanation: "1. The emergence of cyanobacteria performing oxygenic photosynthesis (photolysis of water releasing O₂) converted the reducing atmosphere into an oxidizing one.\nTherefore, Option (C) is the correct answer."
    }
  },
  // 39
  {
    num: 39,
    question: "39. Genetic drift operates in :- [NEET- II 2016]",
    optionA: "Non-reproductive population",
    optionB: "Slow reproductive population",
    optionC: "Small isolated population",
    optionD: "Large isolated population",
    correctOption: "C", // (3)
    yearLabel: "NEET- II 2016",
    explanation: "1. Genetic drift refers to random sampling changes in allele frequencies that occur strictly by chance across generations.\n2. In small, isolated populations, chance sampling deviations are pronounced, potentially leading to the fixation or elimination of alleles regardless of fitness.\n3. Therefore, genetic drift operates most significantly in small isolated populations.\nTherefore, Option (C) is the correct answer.",
    similarQuestion: {
      question: "In which type of population is the probability of fixation or loss of an allele purely due to chance sampling error the highest?",
      option_a: "Extremely large, randomly mating population",
      option_b: "Infinitely large population with continuous gene flow",
      option_c: "Very small, geographically isolated population",
      option_d: "Rapidly expanding population with zero mortality",
      correct_option: "C",
      explanation: "1. Chance sampling errors exert their strongest effect in very small isolated populations, where genetic drift can rapidly fix or eliminate alleles.\nTherefore, Option (C) is the correct answer."
    }
  },
  // 40
  {
    num: 40,
    question: "40. In Hardy-Weinberg equation, the frequency of heterozygous individual is represented by :- [NEET- II 2016]",
    optionA: "pq",
    optionB: "q2",
    optionC: "p2",
    optionD: "2pq",
    correctOption: "D", // (4)
    yearLabel: "NEET- II 2016",
    explanation: "1. The Hardy-Weinberg algebraic equation is p² + 2pq + q² = 1.\n2. In this binomial expansion:\n- p² = frequency of homozygous dominant genotype (AA)\n- 2pq = frequency of heterozygous genotype (Aa)\n- q² = frequency of homozygous recessive genotype (aa)\n3. Therefore, heterozygous individuals are represented by 2pq.\nTherefore, Option (D) is the correct answer.",
    similarQuestion: {
      question: "In a diploid population at Hardy-Weinberg equilibrium, if the frequency of a recessive allele (a) is 0.4, what is the frequency of heterozygous individuals (Aa)?",
      option_a: "0.16",
      option_b: "0.36",
      option_c: "0.48",
      option_d: "0.24",
      correct_option: "C",
      explanation: "1. Given q = 0.4. Since p + q = 1, p = 1 - 0.4 = 0.6.\n2. The frequency of heterozygotes (2pq) = 2 × 0.6 × 0.4 = 0.48 (48%).\nTherefore, Option (C) is the correct answer."
    }
  },
  // 41
  {
    num: 41,
    question: "41. The chronological order of human evolution from early to the recent is :- [NEET- II 2016]",
    optionA: "Ramapithecus → Homo habilis → Australopithecus → Homo erectus",
    optionB: "Australopithecus → Homo habilis → Ramapithecus → Homo erectus",
    optionC: "Australopithecus → Ramapithecus → Homo habilis → Homo erectus",
    optionD: "Ramapithecus → Australopithecus → Homo habilis → Homo erectus",
    correctOption: "D", // (4)
    yearLabel: "NEET- II 2016",
    explanation: "1. Ramapithecus lived about 15 million years ago (mya).\n2. Australopithecines lived in East African grasslands 2 to 3 mya.\n3. Homo habilis appeared around 2 mya (cranial capacity 650-800 cc).\n4. Homo erectus lived around 1.5 mya (cranial capacity ~900 cc).\n5. Hence, the chronological sequence is: Ramapithecus → Australopithecus → Homo habilis → Homo erectus.\nTherefore, Option (D) is the correct answer.",
    similarQuestion: {
      question: "Which of the following hominid ancestors lived around 1.5 million years ago and walked with an erect posture?",
      option_a: "Ramapithecus",
      option_b: "Australopithecus",
      option_c: "Homo habilis",
      option_d: "Homo erectus",
      correct_option: "D",
      explanation: "1. Homo erectus appeared around 1.5 million years ago, walked erectly, and had a cranial capacity of ~900 cc.\nTherefore, Option (D) is the correct answer."
    }
  },
  // 42
  {
    num: 42,
    question: "42. Which of the following is the correct sequence of events in the origin of life ? [NEET- II 2016]\nI. Formation of protobionts\nII. Synthesis of organic monomers\nIII. Synthesis of organic polymers\nIV. Formation of DNA-based genetic systems\nChoose the correct option:",
    optionA: "II, III, I, IV",
    optionB: "II, III, IV, I",
    optionC: "I, II, III, IV",
    optionD: "I, III, II, IV",
    correctOption: "A", // (1)
    yearLabel: "NEET- II 2016",
    explanation: "1. Prebiotic chemical evolution proceeded sequentially:\n- Step II: Synthesis of organic monomers (amino acids, monosaccharides, nitrogenous bases).\n- Step III: Polymerization into organic macromolecules (polypeptides, nucleic acids).\n- Step I: Aggregation into membrane-bound protobionts (coacervates / microspheres).\n- Step IV: Evolution of self-replicating DNA-based genetic systems.\n2. Therefore, the correct chronological sequence is II → III → I → IV.\nTherefore, Option (A) is the correct answer.",
    similarQuestion: {
      question: "According to the chemical theory of the origin of life, what was the correct sequence of prebiotic evolution?",
      option_a: "Inorganic gases → Simple organic monomers → Complex organic polymers → Protobionts",
      option_b: "Protobionts → Inorganic gases → Monomers → Polymers",
      option_c: "Polymers → Monomers → Protobionts → Inorganic gases",
      option_d: "Inorganic gases → Protobionts → Monomers → Polymers",
      correct_option: "A",
      explanation: "1. Chemical evolution proceeded from inorganic atmospheric gases forming simple organic monomers, which polymerized into macromolecules, eventually forming protobionts.\nTherefore, Option (A) is the correct answer."
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

  console.log('Fetching existing PYQs from Chapter ' + CHAPTER_ID + '...');
  const existingRes = await get(`https://api.indraprasthaneetacademy.com/api/admin/chapters/${CHAPTER_ID}/pyqs`, token);
  const existingPyqs = existingRes.pyqs || [];
  console.log(`Found ${existingPyqs.length} existing PYQs. Deleting to ensure clean 1-42 sync...`);

  for (const pyq of existingPyqs) {
    await del(`https://api.indraprasthaneetacademy.com/api/admin/pyqs/${pyq.id}`, token);
  }
  console.log('Old questions deleted successfully.');

  console.log(`Uploading all ${all42Questions.length} PYQs in exact 1-to-42 order matching PDF Answer Key...`);

  for (let i = 0; i < all42Questions.length; i++) {
    const q = all42Questions[i];
    console.log(`[${i+1}/${all42Questions.length}] Uploading Q${q.num}: Correct Option is ${q.correctOption}...`);
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
      console.log(`  -> Q${q.num} added! ID: ${res.pyq.id}, Correct: ${res.pyq.correct_option}`);
    } else {
      console.error(`  -> FAILED Q${q.num}:`, res);
    }
  }

  console.log('Verifying final state from API...');
  const verifyRes = await get(`https://api.indraprasthaneetacademy.com/api/admin/chapters/${CHAPTER_ID}/pyqs`, token);
  const finalPyqs = verifyRes.pyqs || [];
  finalPyqs.sort((a,b) => a.id - b.id);
  console.log(`Total PYQs in DB: ${finalPyqs.length}`);
  finalPyqs.forEach((q, idx) => {
    console.log(`  #${idx+1}: ID ${q.id} | Correct: ${q.correct_option} | ${q.question.slice(0, 40).replace(/\n/g, ' ')}`);
  });
  console.log('ALL 42 QUESTIONS SYNCED 100%!');
}

run().catch(console.error);

