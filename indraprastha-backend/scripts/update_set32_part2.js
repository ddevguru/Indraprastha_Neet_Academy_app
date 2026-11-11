const API_URL = 'https://api.indraprasthaneetacademy.com/api';

const questions = [
  {
    id: 5397,
    similarQuestion: {
      question: "Which of the following processes or structures is completely absent during genetic recombination in bacteria?",
      option_a: "Conjugation tube mediated pilus contact",
      option_b: "Formation of haploid gametes and diploid zygote",
      option_c: "Transfer of unidirectional naked DNA fragment",
      option_d: "Homologous integration of donor DNA into recipient genome",
      correct_option: "B",
      explanation: "Sexual reproduction in bacteria is primitive and does not involve true sexual reproduction. Processes such as alternation of generations, gametogenesis through meiosis, syngamy (fusion of gametes), and zygote formation are completely absent. Instead, bacteria exchange genetic material via parasexual mechanisms such as conjugation, transformation, and transduction. Therefore, Option (B) is the correct answer."
    }
  },
  {
    id: 5398,
    similarQuestion: {
      question: "In bacterial conjugation, the unidirectional transfer of genetic material occurs from a donor bacterium to a recipient bacterium through which of the following mechanisms?",
      option_a: "Uptake of naked exogenous DNA from the surrounding nutrient medium",
      option_b: "Direct physical contact established by a specialized sex pilus",
      option_c: "Bacteriophage-mediated encapsidation and injection",
      option_d: "Endospore fusion during unfavorable conditions",
      correct_option: "B",
      explanation: "In bacterial conjugation, horizontal gene transfer takes place between two living bacterial cells. The donor cell (F⁺) produces a specialized hair-like appendage termed a sex pilus that establishes a cytoplasmic bridge with the recipient cell (F⁻), allowing the unidirectional transfer of a strand of plasmid or chromosomal DNA. Uptake of naked DNA is transformation, and bacteriophage transfer is transduction. Therefore, Option (B) is the correct answer."
    }
  },
  {
    id: 5399,
    similarQuestion: {
      question: "Under favorable environmental and nutritional conditions, the predominant and most rapid mode of reproduction in bacteria is:",
      option_a: "Endospore formation",
      option_b: "Transduction",
      option_c: "Binary fission",
      option_d: "Conjugation",
      correct_option: "C",
      explanation: "Under favorable conditions, bacteria reproduce predominantly and almost exclusively by an asexual process called binary fission. In this process, the circular bacterial chromosome replicates, and the cell divides amitotically into two genetically identical daughter cells. Endospores are produced only under unfavorable conditions, while conjugation and transduction are parasexual recombination mechanisms rather than modes of numerical multiplication. Therefore, Option (C) is the correct answer."
    }
  },
  {
    id: 5400,
    similarQuestion: {
      question: "Which of the following photosynthetic organisms does NOT release molecular oxygen (O₂) during photosynthesis because it utilizes hydrogen sulfide (H₂S) instead of water (H₂O) as an electron donor?",
      option_a: "Anabaena (Cyanobacteria)",
      option_b: "Chara (Green alga)",
      option_c: "Chlorobium (Green sulfur bacterium)",
      option_d: "Funaria (Bryophyte)",
      correct_option: "C",
      explanation: "Green sulfur bacteria such as Chlorobium and purple sulfur bacteria perform anoxygenic photosynthesis. They lack Photosystem II and do not photolyze water (H₂O); instead, they utilize hydrogen sulfide (H₂S) or thiosulfate as hydrogen/electron donors, producing elemental sulfur or sulfate instead of oxygen (O₂). In contrast, Anabaena, Chara, and Funaria perform oxygenic photosynthesis using water and evolve O₂. Therefore, Option (C) is the correct answer."
    }
  },
  {
    id: 5401,
    similarQuestion: {
      question: "Chlorophyll a is the universal primary photosynthetic reaction center pigment present in all of the following organisms EXCEPT:",
      option_a: "Spirulina (Cyanobacteria)",
      option_b: "Volvox (Green alga)",
      option_c: "Riccia (Bryophyte)",
      option_d: "Rhodospirillum (Purple non-sulfur bacterium)",
      correct_option: "D",
      explanation: "Chlorophyll a is the universal essential photosynthetic pigment found in all oxygen-evolving photosynthetic organisms, including cyanobacteria (e.g., Spirulina, Nostoc), algae (e.g., Volvox), bryophytes (e.g., Riccia), pteridophytes, gymnosperms, and angiosperms. Purple non-sulfur photosynthetic bacteria such as Rhodospirillum do not contain chlorophyll a; instead, they possess bacteriochlorophyll a or b and carotenoids, carrying out anoxygenic photosynthesis. Therefore, Option (D) is the correct answer."
    }
  },
  {
    id: 5402,
    similarQuestion: {
      question: "Which of the following organisms completely lacks a rigid cell wall, is highly pleomorphic, and can survive in the total absence of oxygen?",
      option_a: "Methanococcus",
      option_b: "Mycoplasma (PPLO)",
      option_c: "Bacillus subtilis",
      option_d: "Nostoc punctiforme",
      correct_option: "B",
      explanation: "Mycoplasmas (including PPLOs - Pleuropneumonia-like organisms) are the smallest known living cells and are unique among monerans because they completely lack a cell wall. Because of the absence of a rigid cell wall, they are highly pleomorphic ('jokers of the plant kingdom') and insensitive to penicillin (which targets peptidoglycan synthesis). They are also facultative anaerobes that can survive without oxygen. Therefore, Option (B) is the correct answer."
    }
  },
  {
    id: 5403,
    similarQuestion: {
      question: "A culture flask is inoculated with 2 bacterial cells having a generation time (doubling time) of 15 minutes. Assuming continuous exponential growth under ideal conditions, what will be the total number of bacterial cells after 1 hour (60 minutes)?",
      option_a: "16",
      option_b: "32",
      option_c: "64",
      option_d: "128",
      correct_option: "B",
      explanation: "The number of bacterial generations (n) is given by: Total time / Generation time = 60 min / 15 min = 4 generations. The final population size (N) after n generations from an initial population (N₀) is calculated as: N = N₀ × 2ⁿ. Here, N₀ = 2 and n = 4, so N = 2 × 2⁴ = 2 × 16 = 32 bacterial cells. Therefore, Option (B) is the correct answer."
    }
  },
  {
    id: 5404,
    similarQuestion: {
      question: "Which of the following biochemical or structural features is NOT associated with the filamentous cyanobacterium Nostoc?",
      option_a: "Presence of specialized non-dividing thick-walled cells called heterocysts for biological N₂ fixation",
      option_b: "Presence of mucilaginous sheath surrounding the unbranched filament",
      option_c: "Performance of oxygenic photosynthesis using Photosystem I and Photosystem II",
      option_d: "Use of hydrogen sulfide (H₂S) as an electron donor in anoxygenic photosynthesis",
      correct_option: "D",
      explanation: "Nostoc is a photosynthetic cyanobacterium that possesses chlorophyll a and carries out oxygenic photosynthesis using water (H₂O) as the electron donor, evolving O₂. It also possesses specialized cells called heterocysts containing the enzyme nitrogenase for atmospheric nitrogen fixation. Anoxygenic photosynthesis utilizing H₂S is a characteristic of purple and green sulfur bacteria, not Nostoc. Therefore, Option (D) is the correct answer."
    }
  },
  {
    id: 5405,
    similarQuestion: {
      question: "Consider the following two statements regarding bacterial genetic exchange:\nStatement 1: True sexual reproduction involving regular meiosis, gamete formation, and zygotic syngamy is present in bacteria.\nStatement 2: Bacteria can undergo genetic recombination via horizontal gene transfer mechanisms such as conjugation and transformation.\nChoose the correct option:",
      option_a: "Both Statement 1 and Statement 2 are correct",
      option_b: "Both Statement 1 and Statement 2 are incorrect",
      option_c: "Statement 1 is correct but Statement 2 is incorrect",
      option_d: "Statement 1 is incorrect but Statement 2 is correct",
      correct_option: "D",
      explanation: "Statement 1 is incorrect because true sexual reproduction involving meiosis, gametogenesis, and syngamy is completely absent in bacteria and all members of Kingdom Monera. Statement 2 is correct because bacteria achieve genetic variation and recombination through parasexual mechanisms such as conjugation, transformation, and transduction. Therefore, Option (D) is the correct answer."
    }
  },
  {
    id: 5406,
    similarQuestion: {
      question: "Evaluate the following statements:\nStatement 1: Prokaryotic cell division does not involve spindle fiber formation or mitotic phases.\nStatement 2: Flagellated haploid gametes are formed during bacterial endospore germination.\nChoose the correct evaluation:",
      option_a: "Statement 1 is correct but Statement 2 is incorrect",
      option_b: "Statement 1 is incorrect but Statement 2 is correct",
      option_c: "Both Statement 1 and Statement 2 are correct",
      option_d: "Both Statement 1 and Statement 2 are incorrect",
      correct_option: "A",
      explanation: "Statement 1 is correct because prokaryotes divide by binary fission, which lacks chromatin condensation into distinct chromosomes, nuclear envelope breakdown, and microtubular mitotic spindle apparatus formation. Statement 2 is completely incorrect because bacteria never produce gametes; endospores are perennating, resistant asexual resting structures that germinate to produce a single vegetative bacterial cell, not gametes. Therefore, Option (A) is the correct answer."
    }
  },
  {
    id: 5407,
    similarQuestion: {
      question: "Read the following statements regarding Kingdom Monera:\nStatement 1: Binary fission is the most widespread and standard mode of reproduction among monerans.\nStatement 2: The vast majority of bacteria are heterotrophs, predominantly acting as decomposers and saprophytes in ecosystems.\nChoose the correct evaluation:",
      option_a: "Both Statement 1 and Statement 2 are incorrect",
      option_b: "Statement 1 is correct but Statement 2 is incorrect",
      option_c: "Both Statement 1 and Statement 2 are correct",
      option_d: "Statement 1 is incorrect but Statement 2 is correct",
      correct_option: "C",
      explanation: "According to NCERT Biological Classification: 'The vast majority of bacteria are heterotrophs, i.e., they depend on other organisms or on dead organic matter for food' (acting primarily as decomposers/saprophytes). Furthermore, 'Bacteria reproduce mainly by fission.' Thus, both statements are factually correct. Therefore, Option (C) is the correct answer."
    }
  },
  {
    id: 5408,
    similarQuestion: {
      question: "Anoxygenic phototrophic nutrition, where light is captured without releasing oxygen gas, is a characteristic feature of:",
      option_a: "Nitrobacter",
      option_b: "Anabaena",
      option_c: "Rhodospirillum",
      option_d: "Ulothrix",
      correct_option: "C",
      explanation: "Rhodospirillum is a purple non-sulfur photosynthetic bacterium that performs anoxygenic phototrophy. It utilizes bacteriochlorophyll pigments to trap light energy, using organic compounds or H₂ as reducing agents rather than photolyzing water, thus never evolving O₂. Nitrobacter is a chemoautotroph (not phototrophic), while Anabaena and Ulothrix perform oxygenic photosynthesis. Therefore, Option (C) is the correct answer."
    }
  },
  {
    id: 5409,
    similarQuestion: {
      question: "Which of the following features distinguishes chemoautotrophic bacteria from photoautotrophic bacteria?",
      option_a: "Ability to fix carbon dioxide (CO₂) into organic carbohydrates",
      option_b: "Deriving metabolic energy by oxidizing inorganic compounds such as ammonia, nitrite, or ferrous iron",
      option_c: "Independent synthesis of organic food from inorganic raw materials",
      option_d: "Total absence of heterotrophic dependence on host organisms",
      correct_option: "B",
      explanation: "Both chemoautotrophs and photoautotrophs are autotrophic, meaning they synthesize their own food from inorganic carbon (CO₂). However, photoautotrophs utilize solar light energy absorbed by photosynthetic pigments, whereas chemoautotrophs obtain energy by oxidizing inorganic substrates (such as NH₃ to NO₂⁻, NO₂⁻ to NO₃⁻, or Fe²⁺ to Fe³⁺) and channel this released chemical energy into ATP synthesis. Therefore, Option (B) is the correct answer."
    }
  },
  {
    id: 5410,
    similarQuestion: {
      question: "Nostoc, Chroococcus, and Nitrobacter share which of the following metabolic classifications in common?",
      option_a: "All three are obligate photoautotrophs carrying out oxygenic photolysis",
      option_b: "All three are chemoheterotrophs living as saprophytic decomposers",
      option_c: "All three are autotrophs capable of synthesizing their own organic food from inorganic carbon",
      option_d: "All three are obligate intracellular parasites causing plant diseases",
      correct_option: "C",
      explanation: "Nostoc and Chroococcus are cyanobacteria that synthesize organic compounds using light energy via oxygenic photosynthesis (photoautotrophs). Nitrobacter oxidizes nitrite to nitrate to drive carbon fixation (chemoautotroph). Despite utilizing different energy sources (light versus chemical oxidation), all three organisms are autotrophs because they synthesize organic food from inorganic raw materials. Therefore, Option (C) is the correct answer."
    }
  },
  {
    id: 5411,
    similarQuestion: {
      question: "Which of the following nutritional modes is observed among certain members of Kingdom Monera, but is completely absent in Kingdom Fungi?",
      option_a: "Saprophytic absorption of decayed organic substrates",
      option_b: "Parasitic dependence on living animal or plant hosts",
      option_c: "Chemoautotrophic oxidation of inorganic substances",
      option_d: "Symbiotic association with photosynthetic partners",
      correct_option: "C",
      explanation: "Chemoautotrophic nutrition is restricted entirely to prokaryotes (Kingdom Monera, e.g., nitrifying, sulfur, and iron bacteria). Kingdom Fungi consists exclusively of heterotrophs that absorb organic nutrients; they can be saprophytes, parasites, or mutualistic symbionts (lichens, mycorrhizae), but never autotrophs (neither photoautotrophs nor chemoautotrophs). Therefore, Option (C) is the correct answer."
    }
  },
  {
    id: 5412,
    similarQuestion: {
      question: "Anoxygenic photosynthetic bacteria (such as purple sulfur bacteria) possess all of the following characteristics EXCEPT:",
      option_a: "Utilization of bacteriochlorophyll as a light-harvesting pigment",
      option_b: "Performance of light-driven cyclic photophosphorylation",
      option_c: "Presence of Photosystem II and photolysis of water releasing molecular oxygen",
      option_d: "Utilization of reduced sulfur compounds (e.g., H₂S) as reducing power for CO₂ reduction",
      correct_option: "C",
      explanation: "Anoxygenic photosynthetic bacteria lack Photosystem II (PS II) and the oxygen-evolving complex (OEC). Consequently, they cannot split water (H₂O) and do not produce molecular oxygen. They possess bacteriochlorophylls and rely on non-water electron donors like H₂S or H₂. Therefore, Option (C) is the correct answer."
    }
  },
  {
    id: 5413,
    similarQuestion: {
      question: "Streptomyces, a prominent filamentous actinobacterium found in soil, plays an essential ecological role as a:",
      option_a: "Chemoautotrophic iron-oxidizing autotroph",
      option_b: "Photoautotrophic nitrogen-fixing producer",
      option_c: "Saprophytic heterotrophic decomposer producing an array of clinical antibiotics",
      option_d: "Obligate intracellular viral endosymbiont",
      correct_option: "C",
      explanation: "Streptomyces is a genus of Gram-positive, filamentous, spore-forming soil actinobacteria. They are heterotrophic saprophytes that decompose complex organic matter (such as chitin, cellulose, and proteins) in soil and are renowned for synthesizing a vast majority of naturally occurring medical antibiotics (e.g., streptomycin, tetracycline, chloramphenicol). Therefore, Option (C) is the correct answer."
    }
  },
  {
    id: 5414,
    similarQuestion: {
      question: "What fundamental physiological characteristic is shared by both Nitrosomonas (a chemoautotroph) and Chlorobium (a photoautotroph)?",
      option_a: "Both synthesize organic carbohydrates from inorganic carbon dioxide (CO₂)",
      option_b: "Both capture solar photon energy using bacteriochlorophyll",
      option_c: "Both photolyze water molecules with the evolution of oxygen gas",
      option_d: "Both rely on exogenous organic amino acids as respiratory substrates",
      correct_option: "A",
      explanation: "Both Nitrosomonas and Chlorobium are autotrophs. Although Nitrosomonas harnesses chemical bond energy from ammonia oxidation and Chlorobium harnesses radiant energy from sunlight, both organisms use their respective generated ATP and reducing equivalents to fix inorganic CO₂ and produce organic molecules (carbohydrates/glucose). Neither produces O₂, and neither is heterotrophic. Therefore, Option (A) is the correct answer."
    }
  },
  {
    id: 5415,
    similarQuestion: {
      question: "Under optimal environmental temperature and abundant nutrient availability, a single bacterial cell divides every 20 minutes primarily by:",
      option_a: "Multiple fission within a thick-walled cyst",
      option_b: "Amitotic binary transverse fission",
      option_c: "Unidirectional conjugative tube transfer",
      option_d: "Meiotic nuclear division followed by cytokinesis",
      correct_option: "B",
      explanation: "The standard and most prolific mode of bacterial reproduction is amitotic binary fission. During this process, the circular DNA undergoes semi-conservative replication, the two copies segregate to opposite poles as the cell elongates, and a transverse septum synthesizes inward across the middle of the cell to yield two identical daughter cells. Therefore, Option (B) is the correct answer."
    }
  },
  {
    id: 5416,
    similarQuestion: {
      question: "Evaluate the following two statements regarding Kingdom Protista:\nStatement 1: Chemoautotrophic nutrition is completely absent among all members of Kingdom Protista.\nStatement 2: All protists are strictly photosynthetic organisms that perform oxygenic carbon fixation.\nChoose the correct option:",
      option_a: "Statement 1 is correct but Statement 2 is incorrect",
      option_b: "Statement 1 is incorrect but Statement 2 is correct",
      option_c: "Both Statement 1 and Statement 2 are correct",
      option_d: "Both Statement 1 and Statement 2 are incorrect",
      correct_option: "A",
      explanation: "Statement 1 is correct because chemoautotrophy is exclusive to prokaryotes (Kingdom Monera); no eukaryote, including protists, can perform chemoautotrophic nutrition. Statement 2 is incorrect because Kingdom Protista encompasses an immense nutritional diversity, including heterotrophic protozoans (amoebae, paramecia), saprophytic slime moulds, mixotrophic euglenoids, and photosynthetic dinoflagellates/diatoms. Therefore, Option (A) is the correct answer."
    }
  },
  {
    id: 5417,
    similarQuestion: {
      question: "Read the following statements:\nStatement 1: Chemoautotrophic bacteria can synthesize organic food from CO₂ without possessing any photosynthetic pigments.\nStatement 2: All oxygen-evolving photosynthetic organisms invariably possess chlorophyll a.\nChoose the correct option:",
      option_a: "Statement 1 is incorrect but Statement 2 is correct",
      option_b: "Both Statement 1 and Statement 2 are correct",
      option_c: "Both Statement 1 and Statement 2 are incorrect",
      option_d: "Statement 1 is correct but Statement 2 is incorrect",
      correct_option: "B",
      explanation: "Statement 1 is correct because chemoautotrophs (e.g., Nitrosomonas, Nitrobacter) synthesize organic nutrients by oxidizing inorganic chemicals rather than trapping light; hence, they do not require or possess photosynthetic pigments. Statement 2 is also correct because chlorophyll a is the universal primary reaction center pigment in all oxygenic photosynthetic organisms (cyanobacteria, algae, and higher plants). Therefore, Option (B) is the correct answer."
    }
  },
  {
    id: 5418,
    similarQuestion: {
      question: "Consider the following two statements:\nStatement 1: Chemoautotrophic bacteria require photosynthetic pigments to capture chemical oxidation energy.\nStatement 2: All green photosynthetic autotrophic plants contain chlorophyll pigments to absorb radiant solar energy.\nChoose the correct assessment:",
      option_a: "Both Statement 1 and Statement 2 are correct",
      option_b: "Both Statement 1 and Statement 2 are incorrect",
      option_c: "Statement 1 is incorrect but Statement 2 is correct",
      option_d: "Statement 1 is correct but Statement 2 is incorrect",
      correct_option: "C",
      explanation: "Statement 1 is incorrect because chemoautotrophic bacteria do not possess photosynthetic pigments; they extract energy from chemical oxidation of inorganic molecules like ammonia, nitrites, and sulfides using respiratory enzymes. Statement 2 is correct because all autotrophic plants rely on chlorophyll pigments (such as chlorophyll a and b) to absorb solar light for photosynthesis. Therefore, Option (C) is the correct answer."
    }
  },
  {
    id: 5419,
    similarQuestion: {
      question: "Evaluate the following statements regarding nutritional biology:\nStatement 1: Chlorophyll a is present in both blue-green algae (cyanobacteria) and eukaryotic green algae.\nStatement 2: Nitrococcus is a chemoautotrophic bacterium that derives metabolic energy by oxidizing nitrite into nitrate.\nChoose the correct evaluation:",
      option_a: "Statement 1 is correct but Statement 2 is incorrect",
      option_b: "Statement 1 is incorrect but Statement 2 is correct",
      option_c: "Both Statement 1 and Statement 2 are correct",
      option_d: "Both Statement 1 and Statement 2 are incorrect",
      correct_option: "C",
      explanation: "Statement 1 is correct because cyanobacteria (blue-green algae) possess chlorophyll a identical to green algae and higher land plants, carrying out oxygenic photosynthesis. Statement 2 is also correct because Nitrococcus is a nitrifying chemoautotrophic bacterium that oxidizes nitrite (NO₂⁻) to nitrate (NO₃⁻) to obtain energy for carbon fixation. Thus, both statements are correct. Therefore, Option (C) is the correct answer."
    }
  },
  {
    id: 5420,
    similarQuestion: {
      question: "Analyze the following two statements:\nStatement 1: Lactobacillus is a heterotrophic bacterium that absorbs organic nutrients from its surrounding dairy or mucosal environment.\nStatement 2: The most common and predominant mode of reproduction in Kingdom Monera is true sexual reproduction via meiosis.\nChoose the correct option:",
      option_a: "Statement 1 is correct but Statement 2 is incorrect",
      option_b: "Statement 1 is incorrect but Statement 2 is correct",
      option_c: "Both Statement 1 and Statement 2 are correct",
      option_d: "Both Statement 1 and Statement 2 are incorrect",
      correct_option: "A",
      explanation: "Statement 1 is correct because Lactobacillus is a chemoheterotrophic bacterium that ferments lactose to lactic acid, absorbing organic compounds from its substrate. Statement 2 is completely incorrect because true sexual reproduction involving meiosis and fertilization is entirely absent in Kingdom Monera; bacteria reproduce primarily through asexual binary fission. Therefore, Option (A) is the correct answer."
    }
  },
  {
    id: 5421,
    similarQuestion: {
      question: "Consider the following two statements:\nStatement 1: Cyanobacteria often multiply excessively in nutrient-polluted freshwater bodies to form visible algal blooms.\nStatement 2: Rhizobium forms symbiotic root nodules in leguminous plants to fix atmospheric nitrogen into ammonia.\nChoose the correct option:",
      option_a: "Statement 1 is correct but Statement 2 is incorrect",
      option_b: "Statement 1 is incorrect but Statement 2 is correct",
      option_c: "Both Statement 1 and Statement 2 are correct",
      option_d: "Both Statement 1 and Statement 2 are incorrect",
      correct_option: "C",
      explanation: "Statement 1 is correct because in polluted water bodies rich in phosphates and nitrates (eutrophication), cyanobacteria such as Microcystis and Anabaena proliferate rapidly, creating dense surface water blooms that secrete toxins and deplete oxygen. Statement 2 is correct because Rhizobium infects legume root hairs to form specialized root nodules where nitrogenase fixes atmospheric N₂ into bioavailable ammonia. Therefore, Option (C) is the correct answer."
    }
  },
  {
    id: 5422,
    similarQuestion: {
      question: "Assess the validity of the following statements:\nStatement 1: Transduction is a specialized mode of horizontal DNA transfer that naturally occurs during eukaryotic gametogenesis.\nStatement 2: Sexual reproduction involving plasmogamy, karyogamy, and meiotic zygotic division is completely absent in Kingdom Fungi.\nChoose the correct option:",
      option_a: "Statement 1 is correct but Statement 2 is incorrect",
      option_b: "Statement 1 is incorrect but Statement 2 is correct",
      option_c: "Both Statement 1 and Statement 2 are correct",
      option_d: "Both Statement 1 and Statement 2 are incorrect",
      correct_option: "D",
      explanation: "Statement 1 is incorrect because transduction is a parasexual mechanism specific to prokaryotes (bacteria), in which a bacteriophage virus transfers bacterial host DNA from one bacterium to another. Statement 2 is also incorrect because sexual reproduction is well-developed in fungi (Ascomycetes, Basidiomycetes, etc.) and involves three distinct steps: plasmogamy (fusion of protoplasts), karyogamy (fusion of two haploid nuclei), and meiosis in the zygote producing haploid spores. Therefore, Option (D) is the correct answer."
    }
  },
  {
    id: 5423,
    similarQuestion: {
      question: "Which of the following pairs correctly matches a bacterium with its primary mode of nutrition?",
      option_a: "Nitrosomonas – Chemoautotroph",
      option_b: "Spirulina – Anoxygenic photoautotroph",
      option_c: "Rhizobium – Photoheterotroph",
      option_d: "Streptococcus – Obligate chemoautotroph",
      correct_option: "A",
      explanation: "Nitrosomonas is a nitrifying chemoautotrophic bacterium that oxidizes ammonia into nitrite, using the liberated chemical energy to fix CO₂. Spirulina is an oxygenic photoautotroph possessing chlorophyll a. Rhizobium is a chemoheterotroph that establishes a symbiotic nitrogen-fixing mutualism with leguminous roots. Streptococcus is a chemoheterotrophic fermentative bacterium. Therefore, Option (A) is the correct answer."
    }
  },
  {
    id: 5424,
    similarQuestion: {
      question: "Identify the correctly matched pair regarding bacterial structure or reproduction:",
      option_a: "Mycoplasma (PPLO) – Rigid peptidoglycan cell wall",
      option_b: "Pili – Present ubiquitously on all Gram-positive and Gram-negative cocci",
      option_c: "Nostoc – Performs anoxygenic photosynthesis lacking heterocysts",
      option_d: "Escherichia coli – Divides asexually by transverse binary fission",
      correct_option: "D",
      explanation: "Escherichia coli is a Gram-negative bacillus that multiplies rapidly by asexual binary fission. Mycoplasma completely lacks a cell wall. Pili are specialized tubular appendages found primarily in Gram-negative bacteria for conjugation and adherence, not ubiquitously on all bacteria. Nostoc carries out oxygenic photosynthesis and produces specialized heterocysts for nitrogen fixation. Therefore, Option (D) is the correct answer."
    }
  },
  {
    id: 5425,
    similarQuestion: {
      question: "Which of the following pairs correctly matches the pathogenic organism with its biological characteristic or nature of disease?",
      option_a: "Mycobacterium tuberculosis – Pathogenic parasitic bacterium",
      option_b: "Xanthomonas citri (Citrus canker) – Pathogenic fungal mold",
      option_c: "Salmonella typhi – Oxygenic photoautotroph",
      option_d: "Clostridium tetani – Obligate aerobic eukaryote",
      correct_option: "A",
      explanation: "Mycobacterium tuberculosis is a pathogenic parasitic bacterium that infects human lung tissues, causing tuberculosis. Xanthomonas citri (which causes citrus canker) is a bacterium, not a fungus. Salmonella typhi is a heterotrophic pathogenic bacterium. Clostridium tetani is an obligate anaerobic prokaryote (bacterium), not an aerobe or eukaryote. Therefore, Option (A) is the correct answer."
    }
  },
  {
    id: 5426,
    similarQuestion: {
      question: "Select the correctly matched pair among the following bacterial characteristics:",
      option_a: "Vibrio – Spherical coccoid bacterial cells",
      option_b: "Anabaena – Flagellated motile filamentous bacterium",
      option_c: "Nitrosomonas – Oxygen-evolving photoautotroph",
      option_d: "Chlorobium (Green sulfur bacterium) – Bacteriochlorophyll pigment present",
      correct_option: "D",
      explanation: "Chlorobium (green sulfur bacterium) possesses bacteriochlorophyll and chlorosomes, carrying out anoxygenic photosynthesis. Vibrio bacteria are comma-shaped, not spherical. Anabaena is a filamentous non-motile cyanobacterium lacking flagella. Nitrosomonas is a chemoautotroph that oxidizes ammonia and does not utilize light or evolve oxygen. Therefore, Option (D) is the correct answer."
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
  console.log(`Set 32 Part 2 Complete: ${success}/${questions.length} updated successfully.`);
}

main().catch(console.error);
