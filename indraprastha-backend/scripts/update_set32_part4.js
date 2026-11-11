const API_URL = 'https://api.indraprasthaneetacademy.com/api';

const questions = [
  {
    id: 5457,
    similarQuestion: {
      question: "Which of the following eukaryotic protists possesses chlorophyll a as a primary photosynthetic pigment?",
      option_a: "Gonyaulax (Dinoflagellate)",
      option_b: "Euglena (Euglenoid)",
      option_c: "Cosmarium (Desmid / Green alga)",
      option_d: "All of the above",
      correct_option: "D",
      explanation: "Chlorophyll a is the universal primary photosynthetic reaction center pigment present in all oxygenic photosynthetic organisms. In Kingdom Protista, this includes dinoflagellates (e.g., Gonyaulax), euglenoids (e.g., Euglena), and chrysophytes/desmids (e.g., Cosmarium). Therefore, Option (D) is the correct answer."
    }
  },
  {
    id: 5458,
    similarQuestion: {
      question: "Under prolonged darkness in the absence of sunlight, which of the following photosynthetic protists switches to a predatory heterotrophic mode by engulfing smaller microorganisms (mixotrophy)?",
      option_a: "Pinnularia (Diatom)",
      option_b: "Gonyaulax (Dinoflagellate)",
      option_c: "Euglena viridis",
      option_d: "Gelidium",
      correct_option: "C",
      explanation: "According to NCERT: 'Though they are photosynthetic in the presence of sunlight, when deprived of sunlight they behave like heterotrophs by predating on other smaller organisms.' This flexible dual nutritional mode (termed mixotrophic nutrition) is a hallmark of euglenoids such as Euglena. Therefore, Option (C) is the correct answer."
    }
  },
  {
    id: 5459,
    similarQuestion: {
      question: "All of the following are typical characteristics of Dinoflagellates EXCEPT:",
      option_a: "Possession of two distinct flagella, one longitudinal and one transverse lying in a furrow",
      option_b: "Being predominantly found in freshwater habitats rather than marine environments",
      option_c: "Presence of stiff, armored cellulose plates on the outer cell wall surface",
      option_d: "Possession of eukaryotic membrane-delimited nucleus and chloroplasts",
      correct_option: "B",
      explanation: "According to NCERT Biological Classification: 'These organisms are mostly marine and photosynthetic.' Only a negligible minority occur in freshwater. Their cell wall is armored with stiff cellulose plates, and they bear two flagella in distinct furrows. Therefore, Option (B) is the correct answer."
    }
  },
  {
    id: 5460,
    similarQuestion: {
      question: "The destructive phenomenon of 'red tide', which produces toxic saxitoxins that kill marine fauna, is triggered by rapid blooms of which group of organisms?",
      option_a: "Brown algae (Phaeophyceae)",
      option_b: "Red algae (Rhodophyceae)",
      option_c: "Certain dinoflagellate protists (e.g., Gonyaulax)",
      option_d: "Free-living ciliates (e.g., Paramecium)",
      correct_option: "C",
      explanation: "Red tides are caused by explosive population blooms of certain marine dinoflagellates, notably Gonyaulax and Gymnodinium. Their reddish photosynthetic pigments impart a visible red tint to the sea water, and they release potent neurotoxins (saxitoxin) that cause mass mortality among fish and shellfish. Therefore, Option (C) is the correct answer."
    }
  },
  {
    id: 5461,
    similarQuestion: {
      question: "Which of the following taxonomic groups of Kingdom Protista is exclusively characterized by a saprophytic nutritional strategy?",
      option_a: "Chrysophytes",
      option_b: "Slime moulds",
      option_c: "Dinoflagellates",
      option_d: "Euglenoids",
      correct_option: "B",
      explanation: "According to NCERT: 'Slime moulds are saprophytic protists.' They glide over decaying twigs and leaf litter, engulfing bacteria, fungi, and decaying organic debris. In contrast, chrysophytes and dinoflagellates are photosynthetic autotrophs, and euglenoids are mixotrophic. Therefore, Option (B) is the correct answer."
    }
  },
  {
    id: 5462,
    similarQuestion: {
      question: "In the five-kingdom classification system, how many of the five major sub-groups of Kingdom Protista (Chrysophytes, Dinoflagellates, Euglenoids, Slime moulds, Protozoans) perform oxygen-evolving photosynthesis?",
      option_a: "Two",
      option_b: "Three",
      option_c: "Four",
      option_d: "All five",
      correct_option: "B",
      explanation: "Among the five major groups of Kingdom Protista: 1. Chrysophytes (diatoms and golden algae), 2. Dinoflagellates, and 3. Euglenoids contain photosynthetic pigments and carry out oxygenic photosynthesis. Slime moulds are saprophytic, and Protozoans are heterotrophs (predators/parasites). Thus, exactly three groups are photosynthetic. Therefore, Option (B) is the correct answer."
    }
  },
  {
    id: 5463,
    similarQuestion: {
      question: "Which of the following statements regarding the reproductive spores of slime moulds is INCORRECT?",
      option_a: "They are completely naked and lack any protective cell wall",
      option_b: "They possess true, rigid cell walls composed of cellulose",
      option_c: "They are extremely resistant and can survive adverse conditions for years",
      option_d: "They are dispersed through ambient air currents",
      correct_option: "A",
      explanation: "According to NCERT: 'The spores possess true walls. They are extremely resistant and survive for many years, even under adverse conditions. The spores are dispersed by air currents.' The statement that they lack a cell wall is false (only the vegetative plasmodial stage lacks a cell wall). Therefore, Option (A) is the correct answer."
    }
  },
  {
    id: 5464,
    similarQuestion: {
      question: "Which of the following pairs represents an INCORRECT match between a protistan group and its characteristic?",
      option_a: "Diatoms – Silica frustules forming indestructible diatomaceous earth",
      option_b: "Dinoflagellates – Possess two flagella with 9 + 2 microtubule axonemes",
      option_c: "Euglenoids – Protein-rich flexible outer pellicle lacking a cell wall",
      option_d: "Slime moulds – Obligate intracellular parasites of vascular plants",
      correct_option: "D",
      explanation: "Slime moulds are free-living saprophytic protists that feed on decaying organic debris; they are not obligate intracellular parasites. Diatoms produce siliceous cell walls (diatomaceous earth), dinoflagellates bear two flagella, and euglenoids possess an elastic proteinaceous pellicle instead of a cell wall. Therefore, Option (D) is the correct answer."
    }
  },
  {
    id: 5465,
    similarQuestion: {
      question: "Identify the INCORRECT match among the following protists and their diagnostic structural features:",
      option_a: "Diatoms – Chief photosynthetic producers in the ocean with overlapping silica shells",
      option_b: "Dinoflagellates – Cell wall impregnated with amorphous hydrated silica",
      option_c: "Euglena – Proteinaceous pellicle providing flexibility to the cell",
      option_d: "Slime moulds – Aggregation under favorable conditions called plasmodium",
      correct_option: "B",
      explanation: "The cell wall of dinoflagellates is made of stiff cellulose plates on the outer surface, NOT silica. Impregnation with indestructible silica is the diagnostic hallmark of diatoms (Chrysophytes), which fits into a soap-box-like frustule. Therefore, Option (B) is the correct answer."
    }
  },
  {
    id: 5466,
    similarQuestion: {
      question: "Which of the following associations between a biological phenomenon and its causal protistan group is INCORRECT?",
      option_a: "Diatomaceous earth – Accumulation of billions of years of diatom cell wall deposits",
      option_b: "Mixotrophic nutrition – Euglena",
      option_c: "Red tides in coastal oceans – Diatoms",
      option_d: "Resistant spores with true walls – Slime moulds",
      correct_option: "C",
      explanation: "Red tides are caused by rapid multiplication of red dinoflagellates such as Gonyaulax, NOT diatoms. Diatoms form diatomaceous earth used in filtration and polishing. Mixotrophy is exhibited by Euglena, and slime mould spores possess true cellulosic walls. Therefore, Option (C) is the correct answer."
    }
  },
  {
    id: 5467,
    similarQuestion: {
      question: "A prolonged dikaryotic phase (n + n condition, where two nuclei per cell persist before karyogamy) is a diagnostic feature observed during the life cycle of:",
      option_a: "Albugo (Phycomycetes)",
      option_b: "Rhizopus (Phycomycetes)",
      option_c: "Puccinia (Basidiomycetes)",
      option_d: "Mucor (Phycomycetes)",
      correct_option: "C",
      explanation: "In Ascomycetes and Basidiomycetes (such as the rust fungus Puccinia and Agaricus), plasmogamy is not immediately followed by karyogamy. Instead, an intervening dikaryotic stage (n + n, two haploid nuclei per cell) occurs; such cells are called dikaryons. In contrast, in Phycomycetes (Albugo, Rhizopus, Mucor), the fusion of haploid cells immediately yields a diploid zygote without a dikaryotic phase. Therefore, Option (C) is the correct answer."
    }
  },
  {
    id: 5468,
    similarQuestion: {
      question: "Septate and branched mycelium with cross-walls dividing the fungal hyphae is characteristic of which of the following groups of fungi?",
      option_a: "Phycomycetes",
      option_b: "Oomycetes",
      option_c: "Basidiomycetes",
      option_d: "Zygomycetes",
      correct_option: "C",
      explanation: "According to NCERT: 'The mycelium is branched and septate' in Ascomycetes, Basidiomycetes, and Deuteromycetes. In contrast, in Phycomycetes (which includes oomycetes and zygomycetes like Mucor, Rhizopus, and Albugo), the mycelium is aseptate and coenocytic (lacking septa). Therefore, Option (C) is the correct answer."
    }
  },
  {
    id: 5469,
    similarQuestion: {
      question: "All of the following statements regarding conidiospores (conidia) in Ascomycetes (such as Penicillium) are correct EXCEPT:",
      option_a: "They are non-motile asexual spores",
      option_b: "They are diploid structures produced after meiotic reduction",
      option_c: "They are produced exogenously at the tips of specialized hyphae called conidiophores",
      option_d: "They germinate to give rise to a new fungal mycelium",
      correct_option: "B",
      explanation: "Conidia are haploid asexual spores produced mitotically; they are never diploid. They are produced exogenously on specialized fungal stalks called conidiophores in ascomycetes like Penicillium and Aspergillus, and germinate into a new haploid mycelium. Therefore, Option (B) is the correct answer."
    }
  },
  {
    id: 5470,
    similarQuestion: {
      question: "In Kingdom Fungi, a basidiospore is biologically classified as a:",
      option_a: "Diploid mitospore produced inside an ascus",
      option_b: "Flagellated zoospore produced within a sporangium",
      option_c: "Haploid sexual meiospore produced exogenously on a basidium",
      option_d: "Endogenous asexual spore formed during adverse conditions",
      correct_option: "C",
      explanation: "In Basidiomycetes, karyogamy and meiosis take place inside a club-shaped structure called a basidium. Meiosis yields four haploid sexual spores called basidiospores, which are borne exogenously on the basidium (meiospores). Therefore, Option (C) is the correct answer."
    }
  },
  {
    id: 5471,
    similarQuestion: {
      question: "Evaluate the following statements regarding Ascomycetes:\nStatement 1: Ascospores are haploid sexual spores produced endogenously within sac-like structures called asci.\nStatement 2: A mature ascus is permanently a diploid structure throughout the fungal life cycle.\nChoose the correct option:",
      option_a: "Statement 1 is correct but Statement 2 is incorrect",
      option_b: "Statement 1 is incorrect but Statement 2 is correct",
      option_c: "Both Statement 1 and Statement 2 are correct",
      option_d: "Both Statement 1 and Statement 2 are incorrect",
      correct_option: "A",
      explanation: "Statement 1 is correct because in Ascomycetes, sexual spores are ascospores which are produced endogenously in sac-like asci. Statement 2 is incorrect because the diploid condition in an ascus is strictly transient; the diploid zygote immediately undergoes meiosis followed by mitosis to form eight haploid ascospores. Therefore, Option (A) is the correct answer."
    }
  },
  {
    id: 5472,
    similarQuestion: {
      question: "Consider the following statements:\nStatement 1: Ascocarps and basidiocarps are complex multicellular fruiting bodies that bear sexual spores in Ascomycetes and Basidiomycetes, respectively.\nStatement 2: In Aspergillus, sexual ascospores are borne exogenously on the outer tips of sterigmata.\nChoose the correct option:",
      option_a: "Statement 1 is correct but Statement 2 is incorrect",
      option_b: "Statement 1 is incorrect but Statement 2 is correct",
      option_c: "Both Statement 1 and Statement 2 are correct",
      option_d: "Both Statement 1 and Statement 2 are incorrect",
      correct_option: "A",
      explanation: "Statement 1 is correct because asci and basidia are arranged into distinctive fruiting bodies called ascocarps and basidiocarps. Statement 2 is incorrect because in Aspergillus (an ascomycete), sexual ascospores are formed endogenously inside sac-like asci; only asexual conidia are borne exogenously. Therefore, Option (A) is the correct answer."
    }
  },
  {
    id: 5473,
    similarQuestion: {
      question: "Assess the following two statements regarding fungal reproduction:\nStatement 1: Alternaria reproduces asexually by forming multicellular, beaked conidiospores.\nStatement 2: Puccinia relies primarily on conidia for propagating wheat rust infection.\nChoose the correct evaluation:",
      option_a: "Statement 1 is correct but Statement 2 is incorrect",
      option_b: "Statement 1 is incorrect but Statement 2 is correct",
      option_c: "Both Statement 1 and Statement 2 are correct",
      option_d: "Both Statement 1 and Statement 2 are incorrect",
      correct_option: "A",
      explanation: "Statement 1 is correct because Alternaria (Deuteromycetes) reproduces exclusively by asexual conidia. Statement 2 is incorrect because Puccinia (Basidiomycetes) does not produce conidia; its complex macrocyclic life cycle involves five distinct spore stages: urediniospores, teliospores, basidiospores, pycniospores, and aeciospores. Therefore, Option (A) is the correct answer."
    }
  },
  {
    id: 5474,
    similarQuestion: {
      question: "Read the following statements regarding fungi:\nStatement 1: Ustilago (smut fungus) and Alternaria (early blight pathogen) are destructive parasitic fungi of crop plants.\nStatement 2: Morels and truffles are gourmet edible ascomycetes considered delicacies around the world.\nChoose the correct option:",
      option_a: "Statement 1 is correct but Statement 2 is incorrect",
      option_b: "Statement 1 is incorrect but Statement 2 is correct",
      option_c: "Both Statement 1 and Statement 2 are correct",
      option_d: "Both Statement 1 and Statement 2 are incorrect",
      correct_option: "C",
      explanation: "Statement 1 is correct because Ustilago causes smut disease in cereals and Alternaria solani causes early blight of potato, acting as plant parasites. Statement 2 is also correct because NCERT states: 'Morels and truffles are edible and are considered delicacies; they belong to Ascomycetes.' Therefore, Option (C) is the correct answer."
    }
  },
  {
    id: 5475,
    similarQuestion: {
      question: "Evaluate the following statements:\nStatement 1: Red rot of sugarcane is caused by Aspergillus niger.\nStatement 2: Neurospora crassa produces asexual conidia and is extensively used in biochemical and genetic research.\nChoose the correct option:",
      option_a: "Statement 1 is correct but Statement 2 is incorrect",
      option_b: "Statement 1 is incorrect but Statement 2 is correct",
      option_c: "Both Statement 1 and Statement 2 are correct",
      option_d: "Both Statement 1 and Statement 2 are incorrect",
      correct_option: "B",
      explanation: "Statement 1 is incorrect because red rot of sugarcane is caused by Colletotrichum falcatum (Deuteromycetes), not Aspergillus. Statement 2 is correct because Neurospora reproduces asexually via conidia and is famous as the 'Drosophila of the plant kingdom' for genetic and biochemical research. Therefore, Option (B) is the correct answer."
    }
  },
  {
    id: 5476,
    similarQuestion: {
      question: "Which of the following pairs correctly matches a fungus with its associated disease or characteristic?",
      option_a: "Puccinia – Smut disease of wheat",
      option_b: "Ustilago – Smut disease of cereals",
      option_c: "Saccharomyces – Multicellular septate mycelium",
      option_d: "Agaricus – Rust disease of mustard",
      correct_option: "B",
      explanation: "Ustilago causes smut diseases (producing masses of black sooty spores in infected floral organs). Puccinia causes rust diseases, Saccharomyces is a unicellular non-filamentous yeast, and Agaricus is an edible mushroom, not a rust pathogen. Therefore, Option (B) is the correct answer."
    }
  },
  {
    id: 5477,
    similarQuestion: {
      question: "Which of the following fungal pairs is INCORRECTLY matched with its typical sexual spore?",
      option_a: "Albugo – Zygospore",
      option_b: "Aspergillus – Ascospore",
      option_c: "Agaricus – Basidiospore",
      option_d: "Mucor – Zygospore",
      correct_option: "A",
      explanation: "Albugo belongs to Oomycetes within Phycomycetes, where sexual reproduction is oogamous and results in an oospore, not a zygospore. Zygospores are produced by Zygomycetes like Mucor and Rhizopus through isogamous conjugation. Aspergillus produces ascospores, and Agaricus produces basidiospores. Therefore, Option (A) is the correct answer."
    }
  },
  {
    id: 5478,
    similarQuestion: {
      question: "Identify the correctly matched pair regarding fungal taxonomy:",
      option_a: "Toadstool (Amanita) – Basidiomycetes",
      option_b: "Mucor – Branched and septate hyphae",
      option_c: "Morchella (Morels) – Aseptate coenocytic hyphae",
      option_d: "Claviceps – Basidiomycetes",
      correct_option: "A",
      explanation: "Toadstools (poisonous mushrooms like Amanita) belong to Basidiomycetes. Mucor has aseptate, coenocytic hyphae. Morchella (morels) and Claviceps belong to Ascomycetes and have septate, branched hyphae. Therefore, Option (A) is the correct answer."
    }
  },
  {
    id: 5479,
    similarQuestion: {
      question: "Which of the following pairs represents an INCORRECT association between a fungus and its pathological effect or structure?",
      option_a: "Claviceps purpurea – Ergot of rye",
      option_b: "Agaricus campestris – Basidiocarp fruiting body",
      option_c: "Trichoderma – Deuteromycetes producing asexual conidia",
      option_d: "Puccinia graminis – White rust of crucifers",
      correct_option: "D",
      explanation: "Puccinia graminis causes black stem rust of wheat (a true rust, Basidiomycetes). White rust of crucifers is caused by Albugo candida (Phycomycetes). Claviceps causes ergot of rye, Agaricus produces edible basidiocarps, and Trichoderma is a deuteromycete. Therefore, Option (D) is the correct answer."
    }
  },
  {
    id: 5480,
    similarQuestion: {
      question: "Which of the following taxonomic groups of fungi is predominantly found in aquatic habitats and on decaying wood in moist, damp places?",
      option_a: "Basidiomycetes",
      option_b: "Deuteromycetes",
      option_c: "Ascomycetes",
      option_d: "Phycomycetes",
      correct_option: "D",
      explanation: "According to NCERT: 'Members of phycomycetes are found in aquatic habitats and on decaying wood in moist and damp places or as obligate parasites on plants.' Ascomycetes and Basidiomycetes are predominantly terrestrial. Therefore, Option (D) is the correct answer."
    }
  },
  {
    id: 5481,
    similarQuestion: {
      question: "Consider the following statements regarding Saccharomyces cerevisiae (Yeast):\nStatement 1: Yeast is a unicellular, non-filamentous ascomycete fungus.\nStatement 2: Yeast reproduces asexually primarily by filamentous thallus fragmentation.\nChoose the correct option:",
      option_a: "Statement 1 is correct but Statement 2 is incorrect",
      option_b: "Statement 1 is incorrect but Statement 2 is correct",
      option_c: "Both Statement 1 and Statement 2 are correct",
      option_d: "Both Statement 1 and Statement 2 are incorrect",
      correct_option: "A",
      explanation: "Statement 1 is correct because yeast is exceptionally unicellular and non-filamentous among fungi. Statement 2 is incorrect because fragmentation requires a multicellular filamentous mycelium; yeast reproduces asexually through asymmetrical budding (or transverse fission in Schizosaccharomyces). Therefore, Option (A) is the correct answer."
    }
  },
  {
    id: 5482,
    similarQuestion: {
      question: "Assess the validity of the following statements:\nStatement 1: Zygospores are thick-walled sexual resting spores characteristic of Ascomycetes.\nStatement 2: Ascospores are mitotic asexual spores produced in large numbers during favorable conditions.\nChoose the correct evaluation:",
      option_a: "Statement 1 is correct but Statement 2 is incorrect",
      option_b: "Statement 1 is incorrect but Statement 2 is correct",
      option_c: "Both Statement 1 and Statement 2 are correct",
      option_d: "Both Statement 1 and Statement 2 are incorrect",
      correct_option: "D",
      explanation: "Statement 1 is incorrect because zygospores are formed in Zygomycetes (Phycomycetes, e.g., Rhizopus), not Ascomycetes. Statement 2 is also incorrect because ascospores are sexual spores produced after karyogamy and meiosis within an ascus; the asexual spores of Ascomycetes are conidia. Therefore, Option (D) is the correct answer."
    }
  },
  {
    id: 5483,
    similarQuestion: {
      question: "Among the following biological entities, which one represents a cellular living organism possessing double-stranded DNA as its hereditary genetic material?",
      option_a: "Mycoplasma (PPLO)",
      option_b: "Tobacco Mosaic Virus (TMV)",
      option_c: "Bacteriophage T4",
      option_d: "Influenza virus",
      correct_option: "A",
      explanation: "Mycoplasma (PPLO) is a free-living cellular organism (Kingdom Monera) with cellular metabolic machinery and double-stranded DNA as its genetic material. TMV, Bacteriophage T4, and Influenza virus are acellular obligate parasites (viruses) that are inert outside host cells and lack cellular organization. Therefore, Option (A) is the correct answer."
    }
  },
  {
    id: 5484,
    similarQuestion: {
      question: "All of the following characteristics are true for viruses EXCEPT:",
      option_a: "They are obligate intracellular parasites dependent on host metabolic enzymes",
      option_b: "They replicate actively in intercellular tissue spaces without entering host cells",
      option_c: "They contain a protective protein coat (capsid) enclosing genetic material",
      option_d: "They are acellular structures lacking cellular organelles and cytoplasm",
      correct_option: "B",
      explanation: "Viruses are strictly obligate intracellular parasites. Outside a host cell, they are completely inert non-living nucleoprotein complexes (virions). They cannot replicate in intercellular fluid or spaces; they must penetrate inside host cells to commandeer host ribosomes and enzymes. Therefore, Option (B) is the correct answer."
    }
  },
  {
    id: 5485,
    similarQuestion: {
      question: "Which of the following statements regarding viral nucleic acid composition is INCORRECT?",
      option_a: "A virus contains either RNA or DNA as its genome, never both simultaneously",
      option_b: "Bacterial viruses (bacteriophages) usually possess double-stranded DNA genomes",
      option_c: "A single mature virus contains both double-stranded DNA and messenger RNA as hereditary genomic molecules",
      option_d: "Plant viruses commonly possess single-stranded RNA genomes",
      correct_option: "C",
      explanation: "According to NCERT Biological Classification: 'No virus contains both RNA and DNA.' A virus possesses either a DNA genome or an RNA genome enclosed within a protein coat, but never both simultaneously. Therefore, Option (C) is the correct answer."
    }
  },
  {
    id: 5486,
    similarQuestion: {
      question: "Evaluate the following statements regarding the history of virology:\nStatement 1: Dmitri Ivanovsky (1892) demonstrated that the causal agent of tobacco mosaic disease was smaller than bacteria because it could pass through bacteria-proof filters.\nStatement 2: W. M. Stanley (1935) crystallized Tobacco Mosaic Virus (TMV) and showed that the crystals consist largely of proteins.\nChoose the correct option:",
      option_a: "Both Statement 1 and Statement 2 are correct",
      option_b: "Statement 1 is correct but Statement 2 is incorrect",
      option_c: "Statement 1 is incorrect but Statement 2 is correct",
      option_d: "Both Statement 1 and Statement 2 are incorrect",
      correct_option: "A",
      explanation: "Both statements are historical facts from NCERT: In 1892, D. J. Ivanovsky recognized certain microbes smaller than bacteria that passed through bacteria-proof filters. In 1935, W. M. Stanley first crystallized TMV and showed that viral crystals consist largely of proteins. Thus, both statements are correct. Therefore, Option (A) is the correct answer."
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
  console.log(`Set 32 Part 4 Complete: ${success}/${questions.length} updated successfully.`);
}

main().catch(console.error);

