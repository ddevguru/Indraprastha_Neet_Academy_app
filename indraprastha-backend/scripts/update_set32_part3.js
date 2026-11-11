const API_URL = 'https://api.indraprasthaneetacademy.com/api';

const questions = [
  {
    id: 5427,
    similarQuestion: {
      question: "Which of the following organisms is correctly matched with its biological status?",
      option_a: "Mycoplasma – Pathogenic parasite of plants and animals lacking a cell wall",
      option_b: "Streptococcus pneumoniae – Obligate photoautotroph",
      option_c: "PPLO – Largest known prokaryotic cell",
      option_d: "Escherichia coli – Contains 80S eukaryotic ribosomes",
      correct_option: "A",
      explanation: "Mycoplasmas (including PPLOs) are pathogenic parasites in both animals (causing atypical pneumonia) and plants (causing witch's broom and aster yellows), and they completely lack a cell wall. Streptococcus is a chemoheterotroph, PPLOs are the smallest known living cells (approx. 0.1 to 0.3 μm), and E. coli possesses 70S prokaryotic ribosomes. Therefore, Option (A) is the correct answer."
    }
  },
  {
    id: 5428,
    similarQuestion: {
      question: "Evaluate the following statements regarding monerans:\nStatement 1: Mycoplasmas are facultative anaerobes that can survive and reproduce in the total absence of molecular oxygen.\nStatement 2: Cyanobacteria carry out oxygenic photosynthesis and contain membranous pigment-bearing lamellae called chromatophores.\nChoose the correct option:",
      option_a: "Statement 1 is correct but Statement 2 is incorrect",
      option_b: "Statement 1 is incorrect but Statement 2 is correct",
      option_c: "Both Statement 1 and Statement 2 are correct",
      option_d: "Both Statement 1 and Statement 2 are incorrect",
      correct_option: "C",
      explanation: "Statement 1 is correct because Mycoplasma can survive without oxygen as a facultative anaerobe. Statement 2 is also correct because cyanobacteria carry out oxygenic photosynthesis using chlorophyll a located on specialized internal thylakoid membranes (chromatophores). Therefore, Option (C) is the correct answer."
    }
  },
  {
    id: 5429,
    similarQuestion: {
      question: "Consider the following statements regarding Archaebacteria:\nStatement 1: Methanogens are strict (obligate) anaerobes commonly found in oxygen-depleted marshy areas and the rumen of cattle.\nStatement 2: Archaebacteria differ from true bacteria (eubacteria) in possessing a unique cell wall structure lacking peptidoglycan, which enables survival in extreme environments.\nChoose the correct evaluation:",
      option_a: "Statement 1 is correct but Statement 2 is incorrect",
      option_b: "Statement 1 is incorrect but Statement 2 is correct",
      option_c: "Both Statement 1 and Statement 2 are correct",
      option_d: "Both Statement 1 and Statement 2 are incorrect",
      correct_option: "C",
      explanation: "According to NCERT Biological Classification: 'Archaebacteria differ from other bacteria in having a different cell wall structure and this feature is responsible for their survival in extreme conditions.' Methanogens are obligate anaerobes present in the gut of several ruminant animals and marshy habitats where they convert formic acid and CO₂ into methane gas (CH₄). Thus, both statements are correct. Therefore, Option (C) is the correct answer."
    }
  },
  {
    id: 5430,
    similarQuestion: {
      question: "Assess the accuracy of the following statements regarding bacterial genetics:\nStatement 1: Bacterial transformation results exclusively in transient phenotypic modification without any alteration in the recipient cell's genotype.\nStatement 2: Bacteria undergo true sexual reproduction with gametic syngamy and meiotic reduction division.\nChoose the correct option:",
      option_a: "Statement 1 is correct but Statement 2 is incorrect",
      option_b: "Statement 1 is incorrect but Statement 2 is correct",
      option_c: "Both Statement 1 and Statement 2 are correct",
      option_d: "Both Statement 1 and Statement 2 are incorrect",
      correct_option: "D",
      explanation: "Statement 1 is incorrect because during transformation, exogenous DNA taken up from the medium recombines homologously into the recipient bacterium's chromosome, permanently altering both its genotype and phenotype (as proven by Avery, MacLeod, and McCarty). Statement 2 is also incorrect because true sexual reproduction involving meiosis, gametogenesis, and syngamy is entirely absent in bacteria. Therefore, Option (D) is the correct answer."
    }
  },
  {
    id: 5431,
    similarQuestion: {
      question: "Read the following statements:\nStatement 1: Many mycoplasmas are pathogenic parasites causing diseases in both animals and plants.\nStatement 2: Nostoc is a non-motile filamentous cyanobacterium that possesses chlorophyll a and carries out oxygenic photosynthesis.\nChoose the correct option:",
      option_a: "Both Statement 1 and Statement 2 are incorrect",
      option_b: "Statement 1 is correct but Statement 2 is incorrect",
      option_c: "Both Statement 1 and Statement 2 are correct",
      option_d: "Statement 1 is incorrect but Statement 2 is correct",
      correct_option: "C",
      explanation: "Statement 1 is correct because NCERT states: 'Many mycoplasma are pathogenic in animals and plants.' Statement 2 is correct because Nostoc lacks flagella (non-motile) and possesses chlorophyll a similar to green plants to perform oxygenic photosynthesis. Therefore, Option (C) is the correct answer."
    }
  },
  {
    id: 5432,
    similarQuestion: {
      question: "Analyze the following statements regarding the cyanobacterium Anabaena:\nStatement 1: Photosynthetic lamellae (chromatophores) and buoyancy-providing gas vacuoles can be present in planktonic Anabaena cells.\nStatement 2: Anabaena forms a mutualistic symbiotic nitrogen-fixing association within the leaf cavities of the water fern Azolla.\nChoose the correct option:",
      option_a: "Statement 1 is correct but Statement 2 is incorrect",
      option_b: "Statement 1 is incorrect but Statement 2 is correct",
      option_c: "Both Statement 1 and Statement 2 are correct",
      option_d: "Both Statement 1 and Statement 2 are incorrect",
      correct_option: "C",
      explanation: "Statement 1 is correct because cyanobacteria possess chromatophores (thylakoids containing photosynthetic pigments) and gas vacuoles that provide buoyancy in aquatic environments. Statement 2 is correct because Anabaena azollae lives symbiotically inside the dorsal leaf lobes of the aquatic fern Azolla, fixing atmospheric N₂ and serving as a vital biofertilizer in rice paddy fields. Therefore, Option (C) is the correct answer."
    }
  },
  {
    id: 5433,
    similarQuestion: {
      question: "Consider the following two statements regarding cyanobacterial physiology:\nStatement 1: In filamentous cyanobacteria like Nostoc, both chlorophyll a and the oxygen-sensitive enzyme nitrogenase are present within the same organism, but partitioned into different specialized cells.\nStatement 2: All species of cyanobacteria possess differentiated thick-walled heterocysts to carry out biological nitrogen fixation.\nChoose the correct option:",
      option_a: "Statement 1 is correct but Statement 2 is incorrect",
      option_b: "Statement 1 is incorrect but Statement 2 is correct",
      option_c: "Both Statement 1 and Statement 2 are correct",
      option_d: "Both Statement 1 and Statement 2 are incorrect",
      correct_option: "A",
      explanation: "Statement 1 is correct because in Nostoc, vegetative cells contain chlorophyll a and perform oxygenic photosynthesis, while specialized thick-walled heterocysts lack Photosystem II and contain nitrogenase in an anaerobic microenvironment to fix atmospheric N₂. Statement 2 is incorrect because not all cyanobacteria form heterocysts; non-heterocystous cyanobacteria (e.g., Oscillatoria, Gloeothece) can also exist, and some unicellular cyanobacteria fix N₂ only during darkness without heterocysts. Therefore, Option (A) is the correct answer."
    }
  },
  {
    id: 5434,
    similarQuestion: {
      question: "Which of the following cellular components is invariably present in BOTH Mycoplasma (PPLO) and the cyanobacterium Nostoc?",
      option_a: "A rigid peptidoglycan cell wall",
      option_b: "Chlorophyll a reaction centers",
      option_c: "A selectively permeable phospholipid bilayer cell membrane",
      option_d: "Membrane-bound chloroplasts and mitochondria",
      correct_option: "C",
      explanation: "Both Mycoplasma and Nostoc are prokaryotic organisms. Consequently, both possess a selectively permeable plasma membrane enclosing their cytoplasm and 70S ribosomes. Mycoplasma completely lacks a cell wall and has no photosynthetic pigments, whereas Nostoc possesses a peptidoglycan cell wall and chlorophyll a. Membrane-bound organelles are absent in both. Therefore, Option (C) is the correct answer."
    }
  },
  {
    id: 5435,
    similarQuestion: {
      question: "Which of the following organisms possesses BOTH chlorophyll a and 70S ribosomes within its cell structure?",
      option_a: "Methanobacterium (Methanogenic archaebacterium)",
      option_b: "Anabaena (Cyanobacterium)",
      option_c: "Escherichia coli (Enteric bacterium)",
      option_d: "Saccharomyces cerevisiae (Baker's yeast)",
      correct_option: "B",
      explanation: "Anabaena is a cyanobacterium (prokaryote) and therefore possesses 70S ribosomes in its cytoplasm. Being an oxygenic photosynthetic autotroph, it also contains chlorophyll a. Methanobacterium and E. coli are non-photosynthetic prokaryotes with 70S ribosomes lacking chlorophyll a. Yeast is a eukaryote containing 80S ribosomes in its cytoplasm and lacks photosynthetic pigments. Therefore, Option (B) is the correct answer."
    }
  },
  {
    id: 5436,
    similarQuestion: {
      question: "What fundamental structural characteristic is shared by both Halobacterium (an extreme halophilic archaebacterium) and Nostoc (a cyanobacterium)?",
      option_a: "Branched ether-linked lipid monolayers in the plasma membrane",
      option_b: "Prokaryotic 70S ribosomes distributed in the cytoplasm",
      option_c: "Presence of chlorophyll a and oxygenic photosynthesis",
      option_d: "Complete absence of any cell wall envelope",
      correct_option: "B",
      explanation: "Both Halobacterium (Archaebacteria) and Nostoc (Eubacteria) belong to Kingdom Monera and possess prokaryotic cellular organization. A universal characteristic of all prokaryotic cells is the presence of 70S ribosomes (composed of 50S and 30S subunits). Branched ether lipids are unique to Archaebacteria, while chlorophyll a is present only in photosynthetic eubacteria like Nostoc. Therefore, Option (B) is the correct answer."
    }
  },
  {
    id: 5437,
    similarQuestion: {
      question: "Mycoplasma differs fundamentally from methanogenic archaebacteria in:",
      option_a: "Having 70S ribosomes rather than 80S ribosomes",
      option_b: "The complete absence of a rigid cell wall",
      option_c: "The capacity to survive in anaerobic conditions",
      option_d: "Having prokaryotic cellular organization",
      correct_option: "B",
      explanation: "Both Mycoplasma and methanogens are prokaryotes with 70S ribosomes, naked circular DNA, and the ability to survive under anaerobic conditions. However, methanogens possess a distinctive cell wall (composed of pseudomurein and non-cellulosic polysaccharides), whereas Mycoplasma is completely devoid of a cell wall. Therefore, Option (B) is the correct answer."
    }
  },
  {
    id: 5438,
    similarQuestion: {
      question: "Which of the following features is found in Kingdom Protista but is completely ABSENT in Kingdom Monera?",
      option_a: "Synthesis of organic nutrients via autotrophy",
      option_b: "Chemoheterotrophic saprophytic nutrition",
      option_c: "A true membrane-bound nucleus and linear chromosomes associated with histone proteins",
      option_d: "Unicellular body organization",
      correct_option: "C",
      explanation: "Members of Kingdom Monera are prokaryotes and lack a membrane-enclosed nucleus, nucleolus, and histones; their genetic material is a naked circular chromosome in a nucleoid. In contrast, members of Kingdom Protista are single-celled eukaryotes with a true double-membrane nuclear envelope, nucleolus, and histone-bound linear chromosomes. Both kingdoms include unicellular autotrophic and heterotrophic species. Therefore, Option (C) is the correct answer."
    }
  },
  {
    id: 5439,
    similarQuestion: {
      question: "Consider the following living organisms:\n1. Lactobacillus (Bacterium)\n2. Euglena (Protist)\n3. Rhizopus (Fungus)\n4. Cycas (Gymnosperm)\n5. Periplaneta (Arthropod)\nHow many of the above organisms possess a cellular level of structural organization (composed of one or more cells)?",
      option_a: "Only two",
      option_b: "Only three",
      option_c: "Only four",
      option_d: "All five",
      correct_option: "D",
      explanation: "Cellular organization is a defining characteristic of all living organisms. Monerans (Lactobacillus), protists (Euglena), fungi (Rhizopus), plants (Cycas), and animals (Periplaneta) all exhibit cellular organization (either unicellular or multicellular). Only acellular biological entities like viruses, viroids, and prions lack cellular organization. Therefore, Option (D) is the correct answer."
    }
  },
  {
    id: 5440,
    similarQuestion: {
      question: "Members belonging to which of the following taxonomic groups are found inhabiting BOTH freshwater and marine aquatic ecosystems?",
      option_a: "Chrysophytes (Diatoms and Golden algae)",
      option_b: "Cyanobacteria (Blue-green algae)",
      option_c: "Dinoflagellates",
      option_d: "Both (A) and (B)",
      correct_option: "D",
      explanation: "According to NCERT: Chrysophytes are found in fresh water as well as in marine environments. Similarly, cyanobacteria are ubiquitous and inhabit both freshwater lakes/ponds and marine oceanic habitats. In contrast, dinoflagellates are mostly marine. Therefore, Option (D) is the correct answer."
    }
  },
  {
    id: 5441,
    similarQuestion: {
      question: "Chlorophyll a serves as the essential photosynthetic pigment in which of the following groups of organisms?",
      option_a: "Cyanobacteria (e.g., Nostoc)",
      option_b: "Chrysophytes (e.g., Diatoms)",
      option_c: "Euglenoids (e.g., Euglena)",
      option_d: "All of the above",
      correct_option: "D",
      explanation: "Chlorophyll a is the universal primary photosynthetic pigment present in all oxygenic photosynthetic organisms. This includes photosynthetic prokaryotes like cyanobacteria (Nostoc) as well as photosynthetic protists such as diatoms (Chrysophytes), dinoflagellates, and euglenoids. Therefore, Option (D) is the correct answer."
    }
  },
  {
    id: 5442,
    similarQuestion: {
      question: "Which of the following photosynthetic or non-photosynthetic protists is characterized by a saprophytic mode of nutrition, moving along decaying twigs and leaves to engulf organic material?",
      option_a: "Gonyaulax (Dinoflagellate)",
      option_b: "Navicula (Diatom)",
      option_c: "Physarum (Slime mould)",
      option_d: "Noctiluca (Dinoflagellate)",
      correct_option: "C",
      explanation: "Slime moulds are saprophytic protists. The vegetative body moves along decaying twigs and leaves, engulfing organic material. Under suitable conditions, they form an aggregation called plasmodium which may grow and spread over several feet. In contrast, diatoms and dinoflagellates are primarily photosynthetic autotrophs. Therefore, Option (C) is the correct answer."
    }
  },
  {
    id: 5443,
    similarQuestion: {
      question: "True syngamy (fusion of gametic nuclei) and the formation of a diploid zygote first evolved in which of the following biological kingdoms?",
      option_a: "Kingdom Protista",
      option_b: "Kingdom Monera (Archaebacteria)",
      option_c: "Kingdom Monera (Eubacteria)",
      option_d: "Acellular viroids",
      correct_option: "A",
      explanation: "Kingdom Protista marks the evolutionary transition to eukaryotic organization. Protists reproduce asexually and also sexually by a process involving cell fusion and zygote formation. In contrast, members of Kingdom Monera (both archaebacteria and eubacteria) are prokaryotes that lack true sexual reproduction, syngamy, and zygote formation. Therefore, Option (A) is the correct answer."
    }
  },
  {
    id: 5444,
    similarQuestion: {
      question: "A rigid cellulosic or non-cellulosic cell wall is completely ABSENT in which of the following groups of Kingdom Protista?",
      option_a: "Chrysophytes (Diatoms)",
      option_b: "Dinoflagellates",
      option_c: "Protozoans (e.g., Amoeba and Paramecium)",
      option_d: "Spores of slime moulds",
      correct_option: "C",
      explanation: "Protozoans are heterotrophic protists that live as predators or parasites and are considered primitive animal relatives; they lack a cell wall completely. In contrast, diatoms possess overlapping silica-impregnated cellulosic walls, dinoflagellates have stiff cellulose plates on the outer surface, and the spores of slime moulds possess true cellulosic walls. Therefore, Option (C) is the correct answer."
    }
  },
  {
    id: 5445,
    similarQuestion: {
      question: "The rapid population explosion ('blooms') of certain red-pigmented dinoflagellates like Gonyaulax causes the sea surface to appear red, a phenomenon known as:",
      option_a: "Red tide",
      option_b: "Eutrophication scum",
      option_c: "Red rust of tea",
      option_d: "Diatomaceous earth",
      correct_option: "A",
      explanation: "Red dinoflagellates (such as Gonyaulax) undergo such rapid multiplication that they make the sea appear red, termed 'red tides'. Toxins released by such large numbers of organisms may even kill other marine animals such as fishes. Red rust of tea is caused by Cephaleuros (a parasitic green alga), and diatomaceous earth is formed by silica frustules of diatoms. Therefore, Option (A) is the correct answer."
    }
  },
  {
    id: 5446,
    similarQuestion: {
      question: "Unlike photosynthetic bacteria (e.g., purple and green sulfur bacteria), ALL photosynthetic members of Kingdom Protista (Diatoms, Dinoflagellates, Euglenoids):",
      option_a: "Utilize hydrogen sulfide (H₂S) as an electron donor",
      option_b: "Lack membrane-bound chloroplasts",
      option_c: "Perform oxygenic photosynthesis involving photolysis of water and evolution of O₂",
      option_d: "Carry out anoxygenic photosynthesis lacking Photosystem II",
      correct_option: "C",
      explanation: "Photosynthetic protists are eukaryotic autotrophs that possess Photosystem I, Photosystem II, and chlorophyll a. Like higher plants, they use water (H₂O) as the electron donor, releasing molecular oxygen (O₂) into the atmosphere (oxygenic photosynthesis). In contrast, photosynthetic eubacteria carry out anoxygenic photosynthesis and do not evolve O₂. Therefore, Option (C) is the correct answer."
    }
  },
  {
    id: 5447,
    similarQuestion: {
      question: "Which of the following organisms obtains its nutritional sustenance exclusively by secreting extracellular digestive enzymes onto dead organic matter and absorbing soluble products (saprophytic nutrition)?",
      option_a: "Rhizopus (Bread mould)",
      option_b: "Ascaris (Roundworm)",
      option_c: "Cuscuta (Dodder plant)",
      option_d: "Plasmodium (Malarial parasite)",
      correct_option: "A",
      explanation: "Rhizopus (bread mould) is a saprophytic fungus. Fungi absorb soluble organic matter from dead substrates and are hence termed saprophytes. Ascaris and Plasmodium are endoparasites, and Cuscuta is a parasitic angiosperm. Therefore, Option (A) is the correct answer."
    }
  },
  {
    id: 5448,
    similarQuestion: {
      question: "During favorable environmental conditions, slime moulds aggregate to form a creeping vegetative structure called a plasmodium. Which of the following statements about the plasmodium is INCORRECT?",
      option_a: "It is a multinucleate, diploid protoplasmic mass",
      option_b: "It lacks a cell wall and is enveloped only by a plasma membrane",
      option_c: "It possesses a rigid cellulosic cell wall surrounding the entire vegetative mass",
      option_d: "It can grow and spread over several feet along decaying vegetation",
      correct_option: "C",
      explanation: "The vegetative plasmodium of slime moulds is a free-living, wall-less multinucleate mass of protoplasm enclosed only by a plasma membrane; it completely lacks a cell wall. Only under unfavorable conditions does the plasmodium differentiate into fruiting bodies that bear spores possessing true, extremely resistant cellulosic walls. Therefore, Option (C) is the correct answer."
    }
  },
  {
    id: 5449,
    similarQuestion: {
      question: "Which of the following characteristics distinguishes Kingdom Fungi from the vegetative plasmodial phase of slime moulds?",
      option_a: "Presence of eukaryotic nuclei",
      option_b: "Heterotrophic mode of nutrition",
      option_c: "Possession of a defined chitinous cell wall in the vegetative feeding stage",
      option_d: "Formation of reproductive spores",
      correct_option: "C",
      explanation: "In Kingdom Fungi, the vegetative fungal hyphae are invariably bounded by a rigid cell wall composed of chitin and polysaccharides. In contrast, the vegetative feeding stage of slime moulds (the plasmodium) is completely naked and devoid of a cell wall. Both are eukaryotic heterotrophs that produce spores. Therefore, Option (C) is the correct answer."
    }
  },
  {
    id: 5450,
    similarQuestion: {
      question: "In Phycomycetes (such as Mucor and Albugo), the fungal mycelium is described as coenocytic because it:",
      option_a: "Possesses septa with central dolipore perforations",
      option_b: "Contains uninucleate cells separated by transverse cross-walls",
      option_c: "Lacks cross-walls (septa), consisting of a continuous multinucleated cytoplasm",
      option_d: "Is strictly composed of non-motile unicellular round cells",
      correct_option: "C",
      explanation: "According to NCERT: 'The mycelium is aseptate and coenocytic' in Phycomycetes. Coenocytic hyphae are continuous tubular filaments without transverse partitions or septa (aseptate), containing numerous free nuclei suspended within a common cytoplasmic mass. Hyphae with septa are found in Ascomycetes and Basidiomycetes. Therefore, Option (C) is the correct answer."
    }
  },
  {
    id: 5451,
    similarQuestion: {
      question: "Both lichens and mycorrhizae represent outstanding ecological examples of:",
      option_a: "Obligate mutualistic symbiotic associations involving fungal partners",
      option_b: "Parasitic destructive infections causing host leaf abscission",
      option_c: "Unicellular autotrophic phytoplankton blooms",
      option_d: "Deuteromycete asexual vegetative structures",
      correct_option: "A",
      explanation: "Lichens and mycorrhizae are classic mutualistic symbiotic associations involving fungi. Lichens are symbiotic associations between algae (phycobiont) and fungi (mycobiont). Mycorrhizae are symbiotic associations between fungi and the roots of higher plants (e.g., Glomus with Pinus roots). In both cases, both partners derive mutual physiological benefits. Therefore, Option (A) is the correct answer."
    }
  },
  {
    id: 5452,
    similarQuestion: {
      question: "Among protozoans, which of the following groups possesses intricate protective silica shells on their cell surface in marine habitats?",
      option_a: "Marine amoeboid protozoans (e.g., Radiolarians)",
      option_b: "Ciliated protozoans (e.g., Paramecium)",
      option_c: "Flagellated parasitic protozoans (e.g., Trypanosoma)",
      option_d: "Sporozoans (e.g., Plasmodium)",
      correct_option: "A",
      explanation: "According to NCERT: 'Marine forms [of amoeboid protozoans] have silica shells on their surface.' Radiolarians and foraminiferans are examples of marine amoeboids with siliceous tests. Ciliated, flagellated, and sporozoan protozoans lack silica shells. (Note: Diatoms also have silica shells, but they belong to Chrysophytes, not Protozoa). Therefore, Option (A) is the correct answer."
    }
  },
  {
    id: 5453,
    similarQuestion: {
      question: "Ciliated protozoans (e.g., Paramecium) and flagellated protozoans (e.g., Trypanosoma) share which of the following ultrastructural features in their locomotory organelles?",
      option_a: "Presence of solid flagellin protein fibrils lacking microtubules",
      option_b: "A classic eukaryotic 9 + 2 axonemal arrangement of microtubules",
      option_c: "A thick outer shell composed of calcium carbonate",
      option_d: "Total absence of a plasma membrane",
      correct_option: "B",
      explanation: "Both cilia and flagella in eukaryotic organisms (including protozoans like Paramecium and Trypanosoma) share the same fundamental internal ultrastructure, known as the axoneme, which consists of 9 peripheral doublet microtubules surrounding 2 central singlet microtubules (a 9 + 2 arrangement), enclosed within the plasma membrane. Bacterial flagella, by contrast, consist of flagellin protein. Therefore, Option (B) is the correct answer."
    }
  },
  {
    id: 5454,
    similarQuestion: {
      question: "Parasitic heterotrophic nutrition is observed in all of the following protozoans EXCEPT:",
      option_a: "Entamoeba histolytica",
      option_b: "Trypanosoma gambiense",
      option_c: "Plasmodium vivax",
      option_d: "Amoeba proteus",
      correct_option: "D",
      explanation: "Amoeba proteus is a free-living, holozoic freshwater amoeboid protozoan that captures food particles (bacteria, algae) using pseudopodia and phagocytosis; it is not a parasite. In contrast, Entamoeba histolytica is an endoparasite of the human large intestine (causing amoebiasis), Trypanosoma is a blood parasite (causing sleeping sickness), and Plasmodium is an intracellular parasite (causing malaria). Therefore, Option (D) is the correct answer."
    }
  },
  {
    id: 5455,
    similarQuestion: {
      question: "White rust of crucifers, an economically significant plant disease affecting mustard leaves, is caused by:",
      option_a: "Puccinia graminis (Basidiomycete)",
      option_b: "Albugo candida (Phycomycete / Oomycete)",
      option_c: "Ustilago maydis (Basidiomycete)",
      option_d: "Alternaria solani (Deuteromycete)",
      correct_option: "B",
      explanation: "White rust of crucifers (characterized by white blister-like pustules on mustard and radish leaves) is caused by the obligate parasitic fungus Albugo candida, which belongs to Phycomycetes. Puccinia causes rust of wheat, Ustilago causes smut, and Alternaria solani causes early blight of potato. Therefore, Option (B) is the correct answer."
    }
  },
  {
    id: 5456,
    similarQuestion: {
      question: "While the vast majority of fungi are filamentous with bodies consisting of long, slender hyphae, which of the following fungi is uniquely unicellular and non-filamentous?",
      option_a: "Penicillium notatum",
      option_b: "Aspergillus niger",
      option_c: "Saccharomyces cerevisiae (Yeast)",
      option_d: "Agaricus bisporus",
      correct_option: "C",
      explanation: "According to NCERT Biological Classification: 'With the exception of yeasts which are unicellular, fungi are filamentous.' Yeast (Saccharomyces cerevisiae) is a single-celled, non-filamentous ascomycete fungus used widely in baking and brewing. Penicillium, Aspergillus, and Agaricus all possess multicellular filamentous mycelia. Therefore, Option (C) is the correct answer."
    }
  }
];

async function main() {
  const loginRes = await fetch(`${API_URL}/admin/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username: 'indraprasthaadmin', password: 'indraprastha@123' })
  });
  const { token } = await loginRes.json();
  console.log('Logged in successfully.');

  let success = 0;
  for (const q of questions) {
    const res = await fetch(`${API_URL}/admin/practice-questions/${q.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({ similarQuestion: q.similarQuestion })
    });
    if (res.ok) {
      success++;
      console.log(`[SUCCESS] Updated Set 32 Question ${q.id} (${success}/${questions.length})`);
    } else {
      const err = await res.text();
      console.error(`[ERROR] Question ${q.id}:`, err);
    }
  }
  console.log(`Set 32 Part 3 Complete: ${success}/${questions.length} updated successfully.`);
}

main().catch(console.error);
