const API_URL = 'https://api.indraprasthaneetacademy.com/api';

const questions = [
  {
    id: 5487,
    similarQuestion: {
      question: "Evaluate the following statements regarding sub-viral agents:\nStatement 1: Prions are infectious nucleic acid molecules completely devoid of any associated protein coat.\nStatement 2: Viroids were discovered by T.O. Diener as the causal agents of potato spindle tuber disease.\nChoose the correct option:",
      option_a: "Both Statement 1 and Statement 2 are correct",
      option_b: "Statement 1 is incorrect but Statement 2 is correct",
      option_c: "Statement 1 is correct but Statement 2 is incorrect",
      option_d: "Both Statement 1 and Statement 2 are incorrect",
      correct_option: "B",
      explanation: "Statement 1 is incorrect because prions consist exclusively of abnormally folded infectious proteins and completely lack any nucleic acid genome. Statement 2 is correct because in 1971, T.O. Diener discovered viroids as free, naked low-molecular-weight RNA molecules that cause potato spindle tuber disease. Therefore, Option (B) is the correct answer."
    }
  },
  {
    id: 5488,
    similarQuestion: {
      question: "Which of the following viruses is INCORRECTLY matched with its typical genomic nucleic acid structure?",
      option_a: "Tobacco Mosaic Virus (TMV) – Single-stranded RNA (ssRNA)",
      option_b: "Human Immunodeficiency Virus (HIV) – Single-stranded RNA (ssRNA)",
      option_c: "Bacteriophage T4 – Single-stranded DNA (ssDNA)",
      option_d: "Hepatitis B virus – Double-stranded DNA (dsDNA)",
      correct_option: "C",
      explanation: "According to NCERT Biological Classification: 'Bacterial viruses or bacteriophages (viruses that infect bacteria) are usually double-stranded DNA viruses.' TMV and HIV are single-stranded RNA viruses, and Hepatitis B is a double-stranded DNA virus. Therefore, Option (C) is the correct answer."
    }
  },
  {
    id: 5489,
    similarQuestion: {
      question: "Assess the following two statements regarding historical and structural virology:\nStatement 1: Viroids are smaller and structurally simpler than viruses such as Tobacco Mosaic Virus (TMV).\nStatement 2: The discovery and crystallization of viruses by W.M. Stanley occurred chronologically after the discovery of viroids by T.O. Diener.\nChoose the correct option:",
      option_a: "Statement 1 is correct but Statement 2 is incorrect",
      option_b: "Statement 1 is incorrect but Statement 2 is correct",
      option_c: "Both Statement 1 and Statement 2 are correct",
      option_d: "Both Statement 1 and Statement 2 are incorrect",
      correct_option: "A",
      explanation: "Statement 1 is correct because viroids consist only of a short, free circular ssRNA of low molecular weight and lack the protective protein capsid found in viruses like TMV, making them significantly smaller. Statement 2 is incorrect because W.M. Stanley crystallized TMV in 1935, which occurred decades BEFORE T.O. Diener discovered viroids in 1971. Therefore, Option (A) is the correct answer."
    }
  },
  {
    id: 5490,
    similarQuestion: {
      question: "Consider the following historical milestones in biology:\nStatement 1: In 1892, D.J. Ivanovsky demonstrated that viruses could pass through porcelain filters designed to retain bacteria.\nStatement 2: W.M. Stanley isolated and crystallized Tobacco Mosaic Virus for the first time in the year 1835.\nChoose the correct option:",
      option_a: "Statement 1 is correct but Statement 2 is incorrect",
      option_b: "Statement 1 is incorrect but Statement 2 is correct",
      option_c: "Both Statement 1 and Statement 2 are correct",
      option_d: "Both Statement 1 and Statement 2 are incorrect",
      correct_option: "A",
      explanation: "Statement 1 is correct because Ivanovsky showed that the tobacco mosaic disease pathogen passed through Chamberland bacteria-proof filters. Statement 2 is incorrect because W.M. Stanley crystallized viruses in 1935, not 1835. Therefore, Option (A) is the correct answer."
    }
  },
  {
    id: 5491,
    similarQuestion: {
      question: "Evaluate the following statements regarding lichens:\nStatement 1: In a lichen, the fungal partner (mycobiont) provides structural anchorage, shelter, and absorbs water and mineral nutrients for the photosynthetic partner.\nStatement 2: Lichens thrive and grow luxuriantly in industrial urban environments with high sulfur dioxide (SO₂) atmospheric pollution.\nChoose the correct evaluation:",
      option_a: "Statement 1 is correct but Statement 2 is incorrect",
      option_b: "Statement 1 is incorrect but Statement 2 is correct",
      option_c: "Both Statement 1 and Statement 2 are correct",
      option_d: "Both Statement 1 and Statement 2 are incorrect",
      correct_option: "A",
      explanation: "Statement 1 is correct because the mycobiont (fungal component) absorbs water and minerals and provides shelter, while the phycobiont prepares food by photosynthesis. Statement 2 is completely incorrect because lichens are extremely sensitive to SO₂ air pollution and do not grow in polluted areas; hence, they serve as excellent bioindicators of atmospheric pollution. Therefore, Option (A) is the correct answer."
    }
  },
  {
    id: 5492,
    similarQuestion: {
      question: "Which of the following fungal genera extensively forms endomycorrhizal associations with plant roots, assisting significantly in the absorption of phosphorus from the soil?",
      option_a: "Aspergillus",
      option_b: "Glomus",
      option_c: "Neurospora",
      option_d: "Rhizopus",
      correct_option: "B",
      explanation: "Many members of the genus Glomus form endomycorrhizae (vesicular-arbuscular mycorrhizae, VAM) with the roots of higher plants. The fungal hyphae absorb phosphorus and other minerals from the soil and pass them to the plant, while providing resistance to root-borne pathogens and drought tolerance. Therefore, Option (B) is the correct answer."
    }
  },
  {
    id: 5493,
    similarQuestion: {
      question: "Which of the following biological features is shared by BOTH a T-even bacteriophage and Mycoplasma (PPLO)?",
      option_a: "Possession of a defined cell wall composed of peptidoglycan",
      option_b: "Possession of double-stranded DNA as hereditary genetic material",
      option_c: "Presence of 70S ribosomes in the cytoplasm",
      option_d: "Independent metabolic replication in cell-free synthetic broth",
      correct_option: "B",
      explanation: "Both T-even bacteriophages (viruses) and Mycoplasma (PPLO, a prokaryote) possess double-stranded DNA as their genetic material. Bacteriophages lack a cytoplasm, ribosomes, and cell wall, and cannot replicate outside host cells. Mycoplasma is a cellular prokaryote with ribosomes and plasma membrane, but lacks a cell wall. Therefore, Option (B) is the correct answer."
    }
  },
  {
    id: 5494,
    similarQuestion: {
      question: "Tobacco Mosaic Virus (TMV) and potato spindle tuber viroid share all of the following characteristics EXCEPT:",
      option_a: "Both are acellular obligate intracellular pathogens",
      option_b: "Both cause infectious diseases in higher plants",
      option_c: "Both possess single-stranded RNA as their genomic molecule",
      option_d: "Both possess a protective outer protein coat (capsid) enclosing the RNA",
      correct_option: "D",
      explanation: "Both TMV and viroids are acellular plant pathogens containing single-stranded RNA genomes. However, TMV possesses a protective capsid composed of 2,130 protein capsomeres, whereas viroids are completely naked RNA molecules that entirely lack a protein coat. Therefore, Option (D) is the correct answer."
    }
  },
  {
    id: 5495,
    similarQuestion: {
      question: "Which of the following pairs of infectious agents are both sub-viral particles characterized by the smallest relative dimensions (around 10 to 20 nm or smaller)?",
      option_a: "Mitochondria and bacterial cells",
      option_b: "Tobacco Mosaic Virus and Paramecium",
      option_c: "Prions and Viroids",
      option_d: "Amoeba and yeast cells",
      correct_option: "C",
      explanation: "Prions (infectious protein fibrils of ~10 nm) and viroids (short naked circular RNA fragments of ~250–400 nucleotides) are sub-viral infectious entities that are significantly smaller than intact viruses, bacteria, and eukaryotic cells. Therefore, Option (C) is the correct answer."
    }
  },
  {
    id: 5496,
    similarQuestion: {
      question: "Bovine spongiform encephalopathy (BSE, commonly known as mad cow disease) in cattle and its human analogue, Creutzfeldt-Jakob disease (CJD), are caused by:",
      option_a: "Viroids",
      option_b: "Prions (abnormally folded infectious proteins)",
      option_c: "Double-stranded RNA bacteriophages",
      option_d: "Mycoplasmas",
      correct_option: "B",
      explanation: "According to NCERT Biological Classification: 'In modern medicine certain infectious neurological diseases were found to be transmitted by an agent consisting of abnormally folded protein. The agent was similar in size to viruses. These agents were called prions. The most notable diseases caused by prions are bovine spongiform encephalopathy (BSE) commonly called mad cow disease in cattle and its analogous variant Cr-Jacob disease (CJD) in humans.' Therefore, Option (B) is the correct answer."
    }
  },
  {
    id: 5497,
    similarQuestion: {
      question: "Read the following statements regarding mycorrhizae:\nStatement 1: Pinus seeds cannot germinate and establish without the presence of a mycorrhizal fungal symbiont.\nStatement 2: The fungal partner in a mycorrhizal association primarily absorbs phosphorus from the soil and transfers it to the host root.\nChoose the correct option:",
      option_a: "Statement 1 is correct but Statement 2 is incorrect",
      option_b: "Statement 1 is incorrect but Statement 2 is correct",
      option_c: "Both Statement 1 and Statement 2 are correct",
      option_d: "Both Statement 1 and Statement 2 are incorrect",
      correct_option: "C",
      explanation: "Statement 1 is correct because Pinus has an obligate symbiotic association with ectomycorrhizae; its seeds fail to germinate and establish seedlings without the fungus. Statement 2 is also correct because mycorrhizae greatly enhance surface area for nutrient absorption, especially for poorly mobile ions like phosphorus. Therefore, Option (C) is the correct answer."
    }
  },
  {
    id: 5498,
    similarQuestion: {
      question: "Archaebacteria that flourish in hypersaline environments such as salt pans and the Great Salt Lake are classified as:",
      option_a: "Methanogens",
      option_b: "Thermoacidophiles",
      option_c: "Cyanobacteria",
      option_d: "Halophiles",
      correct_option: "D",
      explanation: "Halophiles are specialized archaebacteria that inhabit extremely saline habitats (such as salt flats and hypersaline lakes). Methanogens live in anaerobic marshy environments and gut of ruminants, while thermoacidophiles thrive in hot sulfur springs. Therefore, Option (D) is the correct answer."
    }
  },
  {
    id: 5499,
    similarQuestion: {
      question: "Viroids differ from plant viruses like Tobacco Mosaic Virus (TMV) because viroids consist exclusively of:",
      option_a: "Single-stranded DNA enclosed within a protein coat",
      option_b: "Double-stranded DNA lacking a protein capsid",
      option_c: "Low-molecular-weight RNA without any protein coat",
      option_d: "High-molecular-weight RNA with an envelope",
      correct_option: "C",
      explanation: "In 1971, T.O. Diener discovered viroids and found that they are smaller than viruses. Unlike TMV (which possesses a protein coat surrounding its RNA genome), viroids consist of free, naked RNA of low molecular weight and lack any protein capsid. Therefore, Option (C) is the correct answer."
    }
  },
  {
    id: 5500,
    similarQuestion: {
      question: "An organism is identified that is the smallest known living prokaryote, completely devoid of a rigid cell wall, capable of passing through 0.2 μm microbiological filters, and able to survive in anaerobic conditions. This organism is:",
      option_a: "Bacillus thuringiensis",
      option_b: "Mycoplasma (PPLO)",
      option_c: "Nostoc muscorum",
      option_d: "Pseudomonas putida",
      correct_option: "B",
      explanation: "Mycoplasmas are the smallest living cells known, lack a definite cell wall (making them resistant to beta-lactam antibiotics like penicillin), are pathogenic in animals and plants, and are facultative anaerobes that can survive in the absence of oxygen. Therefore, Option (B) is the correct answer."
    }
  },
  {
    id: 5501,
    similarQuestion: {
      question: "Consider the following two statements:\nStatement 1: Fungi are cosmopolitan in distribution, occurring in air, water, soil, and as parasites on plants and animals.\nStatement 2: Fungi synthesize organic nutrients through photosynthesis using chlorophyll a, fucoxanthin, and phycoerythrin.\nChoose the correct evaluation:",
      option_a: "Both Statement 1 and Statement 2 are true",
      option_b: "Both Statement 1 and Statement 2 are false",
      option_c: "Statement 1 is true but Statement 2 is false",
      option_d: "Statement 1 is false but Statement 2 is true",
      correct_option: "C",
      explanation: "Statement 1 is true because fungi are cosmopolitan organisms found in diverse habitats across the globe. Statement 2 is false because fungi are strictly achlorophyllous heterotrophs (saprophytes or parasites) and totally lack photosynthetic pigments such as chlorophyll, fucoxanthin, and phycoerythrin. Therefore, Option (C) is the correct answer."
    }
  },
  {
    id: 5502,
    similarQuestion: {
      question: "Evaluate the following statements regarding Euglena:\nStatement 1: Euglena is definitively classified as a true land plant (Kingdom Plantae) solely because it contains chlorophyll pigments.\nStatement 2: Euglena posed a significant classification dilemma for the traditional two-kingdom system because it exhibits both plant-like (photosynthesis) and animal-like (motility, pellicle, absence of cell wall) traits.\nChoose the correct option:",
      option_a: "Both Statement 1 and Statement 2 are true",
      option_b: "Both Statement 1 and Statement 2 are false",
      option_c: "Statement 1 is true but Statement 2 is false",
      option_d: "Statement 1 is false but Statement 2 is true",
      correct_option: "D",
      explanation: "Statement 1 is false because Euglena is not a plant; it is a single-celled eukaryotic protist belonging to Kingdom Protista. Statement 2 is true because the two-kingdom system (Plantae vs Animalia) failed to accommodate organisms like Euglena that share both photosynthetic capability (plant trait) and flagellated motility with a flexible pellicle and lack of a cell wall (animal traits). Therefore, Option (D) is the correct answer."
    }
  },
  {
    id: 5503,
    similarQuestion: {
      question: "Read the following statements regarding the Gram staining of bacteria:\nStatement 1: Gram-negative bacteria become decolorized and lose the crystal violet-iodine complex when washed with alcohol or acetone.\nStatement 2: The outer envelope of Gram-negative bacteria possesses an outer membrane containing lipopolysaccharides and a relatively thin peptidoglycan layer.\nChoose the correct option:",
      option_a: "Statement 1 is true, Statement 2 is true, and Statement 2 is the direct causal explanation of Statement 1",
      option_b: "Statement 1 is true and Statement 2 is true, but Statement 2 is not the complete causal explanation of Statement 1",
      option_c: "Statement 1 is true but Statement 2 is false",
      option_d: "Statement 1 is false but Statement 2 is true",
      correct_option: "B",
      explanation: "Both statements are correct. Gram-negative bacteria lose crystal violet because the alcohol dissolves the lipid-rich outer membrane and increases permeability through their thin (2–7 nm) peptidoglycan layer, allowing the crystal violet-iodine complex to wash out. Lipopolysaccharides are present in the outer membrane, but the thinness of the peptidoglycan and high lipid extraction are the physical reasons for stain loss. Therefore, Option (B) is the correct answer."
    }
  },
  {
    id: 5504,
    similarQuestion: {
      question: "Analyze the following statements regarding prokaryotic genetic organization:\nStatement 1: A true membrane-delimited nucleus is completely absent in Escherichia coli and other prokaryotes.\nStatement 2: The genetic material in prokaryotic cells consists of a naked, unorganized circular DNA molecule localized in a region called the nucleoid without a surrounding nuclear envelope.\nChoose the correct evaluation:",
      option_a: "Statement 1 is true, Statement 2 is true; Statement 2 is the correct explanation for Statement 1",
      option_b: "Statement 1 is true, Statement 2 is true; Statement 2 is NOT the correct explanation for Statement 1",
      option_c: "Statement 1 is true but Statement 2 is false",
      option_d: "Statement 1 is false but Statement 2 is true",
      correct_option: "A",
      explanation: "Statement 1 is true because prokaryotes do not possess a membrane-bound nucleus. Statement 2 is also true and directly explains Statement 1: their genetic material is naked circular DNA suspended directly in the cytoplasm within an undefined region called the nucleoid, without a nuclear membrane, nucleolus, or histones. Therefore, Option (A) is the correct answer."
    }
  },
  {
    id: 5505,
    similarQuestion: {
      question: "Consider the following comparative biological statements:\nStatement 1: In Kingdom Fungi, specialized sex organs and differentiated sexual apparatus progressively simplify and disappear from lower forms (Phycomycetes) to higher forms (Basidiomycetes).\nStatement 2: In algae, morphological and physiological differentiation of sex organs increases in complexity from primitive forms to advanced stoneworts and red algae.\nChoose the correct option:",
      option_a: "Statement 1 is true, Statement 2 is true; Statement 2 is the correct explanation for Statement 1",
      option_b: "Statement 1 is true, Statement 2 is true; Statement 2 is NOT the correct explanation for Statement 1",
      option_c: "Statement 1 is true but Statement 2 is false",
      option_d: "Statement 1 is false but Statement 2 is true",
      correct_option: "B",
      explanation: "Both statements are correct independent biological observations. In fungi, lower forms (e.g., Albugo) have well-defined antheridia and oogonia, whereas higher forms (e.g., Basidiomycetes) lose differentiated sex organs entirely and reproduce sexually by somatogamy of vegetative hyphae. In algae, sexual reproduction progresses from simple isogamy in unicellular forms to complex oogamy with elaborate multicellular protective structures (e.g., nucule and globule in Chara). They represent separate evolutionary trends. Therefore, Option (B) is the correct answer."
    }
  },
  {
    id: 5506,
    similarQuestion: {
      question: "Evaluate the following statements regarding viruses:\nStatement 1: Viruses replicate actively and synthesize progeny virions only after infecting and penetrating a specific host cell.\nStatement 2: Outside a living host cell, viruses carry out active cellular respiration and maintain an independent living metabolic state.\nChoose the correct evaluation:",
      option_a: "Both Statement 1 and Statement 2 are true",
      option_b: "Both Statement 1 and Statement 2 are false",
      option_c: "Statement 1 is true but Statement 2 is false",
      option_d: "Statement 1 is false but Statement 2 is true",
      correct_option: "C",
      explanation: "Statement 1 is true because viruses are obligate intracellular parasites that require host cellular enzymes, ribosomes, and ATP to replicate. Statement 2 is completely false because outside host cells, viruses are inert, non-living macromolecular particles (virions) that lack metabolism, respiration, and cellular homeostasis. Therefore, Option (C) is the correct answer."
    }
  },
  {
    id: 5507,
    similarQuestion: {
      question: "Assess the validity of the following assertions:\nStatement 1: Euglena is assigned to Kingdom Plantae because it possesses a rigid cellulosic cell wall.\nStatement 2: Organisms exhibiting mixotrophic nutrition and flagellated movement could not be comfortably accommodated in Linnaeus's two-kingdom classification.\nChoose the correct option:",
      option_a: "Both Statement 1 and Statement 2 are true",
      option_b: "Both Statement 1 and Statement 2 are false",
      option_c: "Statement 1 is true but Statement 2 is false",
      option_d: "Statement 1 is false but Statement 2 is true",
      correct_option: "D",
      explanation: "Statement 1 is false because Euglena lacks a cell wall completely; its body is bounded by an elastic proteinaceous pellicle, and it belongs to Kingdom Protista. Statement 2 is true because Linnaeus's two-kingdom system (Plantae and Animalia) failed to classify borderline organisms with overlapping features like Euglena, slime moulds, and bacteria. Therefore, Option (D) is the correct answer."
    }
  },
  {
    id: 5508,
    similarQuestion: {
      question: "Analyze the following statements regarding the historical development of biological classification:\nStatement 1: The two-kingdom classification proposed by Linnaeus failed to distinguish between prokaryotes and eukaryotes, unicellular and multicellular organisms, and photosynthetic algae and heterotrophic fungi.\nStatement 2: The criteria of cell structure, thallus organization, mode of nutrition, reproduction, and phylogenetic relationships necessitated modern five-kingdom classification.\nChoose the correct option:",
      option_a: "Statement 1 is true but Statement 2 is false",
      option_b: "Statement 1 is false but Statement 2 is true",
      option_c: "Both Statement 1 and Statement 2 are true",
      option_d: "Both Statement 1 and Statement 2 are false",
      correct_option: "C",
      explanation: "According to NCERT: Two-kingdom classification used for a long time was found inadequate because a large number of organisms did not fall into either category. It did not distinguish between eukaryotes and prokaryotes, unicellular and multicellular organisms, or green algae and fungi. R.H. Whittaker (1969) proposed the Five Kingdom Classification based on cell structure, body organization, mode of nutrition, reproduction, and phylogenetic relationships. Therefore, Option (C) is the correct answer."
    }
  },
  {
    id: 5509,
    similarQuestion: {
      question: "In true plasmodial slime moulds (Myxomycetes), the haploid spores with true cellulosic walls germinate under moist conditions to release:",
      option_a: "Filamentous dikaryotic hyphae",
      option_b: "Naked, biflagellated swarm cells or uninucleate myxamoebae",
      option_c: "Multicellular ascocarps",
      option_d: "Encapsidated viral particles",
      correct_option: "B",
      explanation: "When the resistant spores of plasmodial slime moulds germinate in water, their wall ruptures to release one to four naked, uninucleate, haploid amoeboid cells (myxamoebae) or biflagellated swarm cells. These cells feed, divide, and eventually fuse in pairs to form a diploid zygote that develops into a plasmodium. Therefore, Option (B) is the correct answer."
    }
  },
  {
    id: 5510,
    similarQuestion: {
      question: "The protective outer proteinaceous envelope surrounding the genomic viral nucleic acid is called the:",
      option_a: "Capsomere",
      option_b: "Capsid",
      option_c: "Pellicle",
      option_d: "Nucleoid",
      correct_option: "B",
      explanation: "According to NCERT Biological Classification: 'The protein coat called capsid made of small subunits called capsomeres, protects the nucleic acid.' These capsomeres are arranged in helical or polyhedral geometric forms. Therefore, Option (B) is the correct answer."
    }
  },
  {
    id: 5511,
    similarQuestion: {
      question: "In freshwater amoeboid protozoans such as Amoeba proteus, which of the following organelles is primarily responsible for osmoregulation and excretion of excess water?",
      option_a: "Mitochondrion",
      option_b: "Food vacuole",
      option_c: "Nucleolus",
      option_d: "Contractile vacuole",
      correct_option: "D",
      explanation: "Freshwater amoeboid protozoans live in a hypotonic medium, causing continuous osmotic influx of water into their cytoplasm. The contractile vacuole acts as a specialized osmoregulatory organelle, collecting excess intracellular water and periodically pumping it out across the plasma membrane (systole). Therefore, Option (D) is the correct answer."
    }
  },
  {
    id: 5512,
    similarQuestion: {
      question: "Which of the following fungi is naturally unicellular and completely devoid of a true filamentous mycelium?",
      option_a: "Rhizopus stolonifer",
      option_b: "Penicillium chrysogenum",
      option_c: "Puccinia graminis",
      option_d: "Saccharomyces cerevisiae",
      correct_option: "D",
      explanation: "While the vast majority of fungi produce a vegetative body composed of a network of filamentous hyphae (mycelium), Saccharomyces cerevisiae (yeast) is exceptionally unicellular and non-mycelial, reproducing vegetatively by budding. Therefore, Option (D) is the correct answer."
    }
  },
  {
    id: 5513,
    similarQuestion: {
      question: "Which of the following organisms is INCORRECTLY assigned to its taxonomic group?",
      option_a: "Plasmodium falciparum – Sporozoan protozoan causing malignant tertian malaria",
      option_b: "Trypanosoma gambiense – Flagellated protozoan causing African sleeping sickness",
      option_c: "Noctiluca scintillans – Chrysophyte that produces diatomaceous earth",
      option_d: "Entamoeba histolytica – Amoeboid protozoan causing amoebic dysentery",
      correct_option: "C",
      explanation: "Noctiluca scintillans is a marine, bioluminescent dinoflagellate ('sea sparkle'), NOT a chrysophyte. Diatomaceous earth is produced by diatoms (Chrysophytes). Plasmodium is a sporozoan, Trypanosoma is a flagellate, and Entamoeba is an amoeboid protozoan. Therefore, Option (C) is the correct answer."
    }
  },
  {
    id: 5514,
    similarQuestion: {
      question: "A haplontic life cycle, in which the free-living multicellular vegetative phase is haploid (or dikaryotic) and the diploid condition is represented only by the zygote, is characteristic of:",
      option_a: "Funaria (Bryophyte)",
      option_b: "Cycas (Gymnosperm)",
      option_c: "Ustilago (Fungus)",
      option_d: "Mangifera (Angiosperm)",
      correct_option: "C",
      explanation: "Most fungi, including Ustilago (smut fungus), possess a predominantly haplontic life cycle. The vegetative phase is haploid (or dikaryotic), and the only diploid stage is the transient zygote, which immediately undergoes meiosis to restore the haploid condition. In contrast, Funaria has a haplo-diplontic life cycle, and seed plants (Cycas, Mangifera) have diplontic life cycles. Therefore, Option (C) is the correct answer."
    }
  },
  {
    id: 5515,
    similarQuestion: {
      question: "Consider the following biological statements regarding the fungal class Ascomycetes:\nI. The vegetative mycelium is branched and septate.\nII. The asexual spores are conidia produced exogenously on specialized conidiophores.\nIII. The sexual spores are ascospores produced endogenously in sac-like asci arranged in ascocarps.\nWhich of the above statements are correct?",
      option_a: "I and II only",
      option_b: "I and III only",
      option_c: "II and III only",
      option_d: "I, II, and III",
      correct_option: "D",
      explanation: "According to NCERT Biological Classification: In Ascomycetes, 'The mycelium is branched and septate. The asexual spores are conidia produced exogenously on the special mycelium called conidiophores... The sexual spores are called ascospores which are produced endogenously in sac-like asci. These asci are arranged in different types of fruiting bodies called ascocarps.' Hence, all three statements are correct. Therefore, Option (D) is the correct answer."
    }
  },
  {
    id: 5516,
    similarQuestion: {
      question: "In plants exhibiting alternation of generations, the gametophytic generation is defined as the:",
      option_a: "Haploid phase that produces male and female gametes by mitotic division",
      option_b: "Diploid phase that produces haploid spores via meiotic reduction",
      option_c: "Non-photosynthetic parasitic phase lacking chloroplasts",
      option_d: "Vascular phase possessing xylem vessels and phloem sieve tubes",
      correct_option: "A",
      explanation: "In the life cycle of plants showing alternation of generations, the gametophyte is the multicellular haploid (n) generation that develops from a spore and produces gametes through mitosis. The fusion of gametes forms a diploid zygote, which develops into the sporophyte (the spore-producing diploid generation). Therefore, Option (A) is the correct answer."
    }
  },
  {
    id: 5517,
    similarQuestion: {
      question: "Which of the following taxonomic groups does NOT belong to Kingdom Protista in Whittaker's five-kingdom classification system?",
      option_a: "Chrysophytes (Diatoms and Desmids)",
      option_b: "Dinoflagellates",
      option_c: "Ascomycetes (Sac fungi)",
      option_d: "Euglenoids",
      correct_option: "C",
      explanation: "Ascomycetes (sac fungi, such as Penicillium, Aspergillus, and Neurospora) are multicellular/eukaryotic heterotrophs with chitinous cell walls that belong to Kingdom Fungi. Chrysophytes, Dinoflagellates, Euglenoids, Slime moulds, and Protozoans constitute Kingdom Protista. Therefore, Option (C) is the correct answer."
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
  console.log(`Set 32 Part 5 Complete: ${success}/${questions.length} updated successfully.`);
}

main().catch(console.error);
