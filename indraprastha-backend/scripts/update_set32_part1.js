const API_URL = 'https://api.indraprasthaneetacademy.com/api';

const questions = [
  {
    id: 31,
    similarQuestion: {
      question: "Which of the following statements most accurately reflects the vast metabolic diversity of nutritional modes observed in Kingdom Monera?",
      option_a: "Monerans are exclusively chemoheterotrophic decomposers lacking any photosynthetic capability",
      option_b: "Monerans exhibit both autotrophic (photoautotrophic, chemoautotrophic) and heterotrophic (saprophytic, parasitic, symbiotic) modes of nutrition",
      option_c: "All monerans synthesize organic nutrients through oxygenic photosynthesis identical to higher land plants",
      option_d: "Monerans obtain nutrition strictly by phagotrophic engulfment of particulate matter",
      correct_option: "B",
      explanation: "Kingdom Monera shows the most extensive metabolic diversity among all living kingdoms. Although the vast majority of bacteria are heterotrophs (functioning as saprophytes, parasites, or mutualistic symbionts), some monerans are autotrophic, synthesizing their own organic food from inorganic substrates. These autotrophs may be photoautotrophic (using light energy, e.g., cyanobacteria and purple/green sulfur bacteria) or chemoautotrophic (oxidizing inorganic substances like nitrates, nitrites, and ammonia, e.g., Nitrosomonas and Nitrobacter). Therefore, Option (B) is the correct answer."
    }
  },
  {
    id: 32,
    similarQuestion: {
      question: "Which of the following characteristics is not applicable to organisms belonging to Kingdom Monera?",
      option_a: "Presence of 70S ribosomes in the cytoplasm",
      option_b: "Absence of a nuclear membrane and membrane-bound organelles",
      option_c: "Possession of membrane-delimited mitochondria and endomembrane systems",
      option_d: "Presence of circular double-stranded DNA lacking histone proteins",
      correct_option: "C",
      explanation: "Members of Kingdom Monera are prokaryotes. A hallmark of prokaryotic organization is the total absence of a membrane-enclosed nucleus and membrane-bound cytoplasmic organelles such as mitochondria, endoplasmic reticulum, Golgi apparatus, chloroplasts, and lysosomes. They possess 70S ribosomes, naked circular DNA in a nucleoid, and a peptidoglycan or pseudomurein cell envelope. Therefore, Option (C) is the correct answer."
    }
  },
  {
    id: 33,
    similarQuestion: {
      question: "Which of the following prokaryotes carries out oxygenic photosynthesis using water as an electron donor?",
      option_a: "Chlorobium (Green sulfur bacterium)",
      option_b: "Chromatium (Purple sulfur bacterium)",
      option_c: "Anabaena (Cyanobacterium)",
      option_d: "Rhodospirillum (Purple non-sulfur bacterium)",
      correct_option: "C",
      explanation: "Cyanobacteria (such as Anabaena, Nostoc, and Spirulina) possess chlorophyll a identical to higher plants and perform oxygenic photosynthesis. They use water (H₂O) as the electron and hydrogen donor, photolyzing water via Photosystem II and releasing molecular oxygen (O₂) into the atmosphere. In contrast, green and purple photosynthetic bacteria use H₂S or organic compounds as electron donors and do not evolve oxygen (anoxygenic photosynthesis). Therefore, Option (C) is the correct answer."
    }
  },
  {
    id: 34,
    similarQuestion: {
      question: "Evaluate the following two statements regarding Kingdom Monera:\nStatement 1: Bacteria are the sole and exclusive living members classified under Kingdom Monera.\nStatement 2: All organisms classified in Kingdom Monera possess prokaryotic cellular organization.",
      option_a: "Both Statement 1 and Statement 2 are correct",
      option_b: "Both Statement 1 and Statement 2 are incorrect",
      option_c: "Statement 1 is correct but Statement 2 is incorrect",
      option_d: "Statement 1 is incorrect but Statement 2 is correct",
      correct_option: "A",
      explanation: "According to NCERT Biological Classification: 'Bacteria are the sole members of the Kingdom Monera.' Furthermore, Kingdom Monera is defined specifically by prokaryotic cellular organization, meaning every member lacks a true membrane-bound nucleus and membrane-bound organelles. Thus, both statements are entirely correct. Therefore, Option (A) is the correct answer."
    }
  },
  {
    id: 35,
    similarQuestion: {
      question: "Consider the following statements:\nStatement 1: Kingdom Monera exhibits both autotrophic and heterotrophic nutritional lifestyles.\nStatement 2: Cyanobacteria (blue-green algae) are photosynthetic autotrophs that release molecular oxygen.",
      option_a: "Statement 1 is incorrect, but Statement 2 is correct",
      option_b: "Statement 1 is correct, but Statement 2 is incorrect",
      option_c: "Both Statement 1 and Statement 2 are correct",
      option_d: "Both Statement 1 and Statement 2 are incorrect",
      correct_option: "C",
      explanation: "Statement 1 is correct because bacteria show the most diverse nutritional mechanisms, including photoautotrophy, chemoautotrophy, saprophytism, and parasitism. Statement 2 is also correct because cyanobacteria possess chlorophyll a and carry out oxygenic photosynthesis where water is split and O₂ is evolved. Thus, both statements are correct. Therefore, Option (C) is the correct answer."
    }
  },
  {
    id: 36,
    similarQuestion: {
      question: "Consider the following statements regarding photosynthetic prokaryotes:\nStatement 1: Nostoc possesses chlorophyll a and both Photosystem I and Photosystem II.\nStatement 2: Green sulfur bacteria use hydrogen sulfide (H₂S) as an electron donor and do not produce oxygen during photosynthesis.",
      option_a: "Only Statement 1 is correct",
      option_b: "Only Statement 2 is correct",
      option_c: "Both Statement 1 and Statement 2 are correct",
      option_d: "Both Statement 1 and Statement 2 are incorrect",
      correct_option: "C",
      explanation: "Statement 1 is correct because Nostoc is a cyanobacterium with chlorophyll a, utilizing both PS I and PS II for non-cyclic photophosphorylation and oxygen evolution. Statement 2 is correct because green sulfur bacteria (e.g., Chlorobium) carry out anoxygenic photosynthesis using bacteriochlorophyll; they use H₂S rather than H₂O as the reducing agent, depositing elemental sulfur instead of evolving oxygen. Therefore, Option (C) is the correct answer."
    }
  },
  {
    id: 37,
    similarQuestion: {
      question: "Read the statements carefully:\nStatement 1: 'Oxygenic' and 'aerobic' describe identical biological processes.\nStatement 2: All cyanobacteria carry out oxygenic photosynthesis.",
      option_a: "Both Statement 1 and Statement 2 are correct",
      option_b: "Statement 1 is incorrect, but Statement 2 is correct",
      option_c: "Statement 1 is correct, but Statement 2 is incorrect",
      option_d: "Both Statement 1 and Statement 2 are incorrect",
      correct_option: "B",
      explanation: "Statement 1 is incorrect because 'oxygenic' refers specifically to a type of photosynthesis that splits water and evolves molecular oxygen as a byproduct, whereas 'aerobic' refers to cellular respiration that utilizes molecular oxygen as the terminal electron acceptor in the electron transport chain. Statement 2 is correct because all cyanobacteria possess chlorophyll a and Photosystem II, carrying out oxygenic photosynthesis. Therefore, Option (B) is the correct answer."
    }
  },
  {
    id: 38,
    similarQuestion: {
      question: "Consider the following statements about chemoautotrophic bacteria:\nStatement 1: Chemoautotrophic bacteria obtain energy by oxidizing complex organic compounds such as glucose.\nStatement 2: Chemoautotrophic bacteria play an essential role in recycling biogeochemical nutrients like nitrogen, phosphorus, iron, and sulfur.",
      option_a: "Both Statement 1 and Statement 2 are correct",
      option_b: "Statement 1 is incorrect, but Statement 2 is correct",
      option_c: "Statement 1 is correct, but Statement 2 is incorrect",
      option_d: "Both Statement 1 and Statement 2 are incorrect",
      correct_option: "B",
      explanation: "Statement 1 is incorrect because chemoautotrophs synthesize organic biomass by oxidizing inorganic substances (such as ammonia, nitrites, nitrates, ferrous iron, and hydrogen sulfide), not organic compounds (oxidizing organic compounds is done by heterotrophs). Statement 2 is correct because nitrifying bacteria (Nitrosomonas, Nitrobacter), iron bacteria, and sulfur bacteria convert inorganic elements into plant-accessible forms, playing a pivotal role in nutrient cycling of N, P, Fe, and S. Therefore, Option (B) is the correct answer."
    }
  },
  {
    id: 5375,
    similarQuestion: {
      question: "Which of the following best accounts for the nutritional modes seen in Kingdom Monera?",
      option_a: "They are restricted entirely to saprophytic absorption of decayed plant matter",
      option_b: "They rely exclusively on photosynthetic pigments for carbon assimilation",
      option_c: "They exhibit diverse nutritional strategies, including photoautotrophy, chemoautotrophy, and heterotrophy",
      option_d: "They are all intracellular obligate parasites of eukaryotic hosts",
      correct_option: "C",
      explanation: "Bacteria show the greatest metabolic diversity among all living organisms. While many are heterotrophs (saprophytic decomposers, parasites, or mutualists), others are photoautotrophs (using light with bacteriochlorophyll or chlorophyll a) or chemoautotrophs (deriving chemical energy from the oxidation of inorganic substrates). Therefore, Option (C) is the correct answer."
    }
  },
  {
    id: 5376,
    similarQuestion: {
      question: "Which of the following statements is false regarding Kingdom Monera?",
      option_a: "Kingdom Monera contains both Archaebacteria and Eubacteria",
      option_b: "Monerans are found in diverse and extreme ecological habitats",
      option_c: "Kingdom Monera is composed exclusively of Eubacteria and excludes Archaebacteria",
      option_d: "All monerans have prokaryotic cellular organization without membrane-enclosed organelles",
      correct_option: "C",
      explanation: "In Whittaker's five-kingdom classification, Kingdom Monera includes all prokaryotic organisms, comprising both Archaebacteria (methanogens, halophiles, thermoacidophiles) and Eubacteria (true bacteria, cyanobacteria, mycoplasmas). Thus, asserting that Monera contains only Eubacteria is completely false. Therefore, Option (C) is the correct answer."
    }
  },
  {
    id: 5377,
    similarQuestion: {
      question: "Which of the following characteristics is not universal to all organisms classified in Kingdom Monera?",
      option_a: "Dependence on preformed organic substances as an energy source",
      option_b: "Unicellular prokaryotic organization",
      option_c: "Lack of a nuclear membrane enclosing the genetic material",
      option_d: "Presence of 70S ribosomes in the cytoplasm",
      correct_option: "A",
      explanation: "Not all monerans depend on preformed organic food because several groups of bacteria (cyanobacteria, purple sulfur bacteria, green sulfur bacteria, and chemoautotrophs like Nitrosomonas) are autotrophic, synthesizing their own organic molecules from carbon dioxide and inorganic sources. In contrast, unicellularity, absence of a nuclear membrane, and 70S ribosomes are universal prokaryotic features. Therefore, Option (A) is the correct answer."
    }
  },
  {
    id: 5378,
    similarQuestion: {
      question: "Which pair of organisms contains chlorophyll a and produces molecular oxygen during carbon fixation?",
      option_a: "Nitrobacter and Thiobacillus",
      option_b: "Spirulina and Nostoc",
      option_c: "Lactobacillus and Escherichia coli",
      option_d: "Rhizobium and Rhodospirillum",
      correct_option: "B",
      explanation: "Spirulina and Nostoc are both cyanobacteria (blue-green algae). They contain chlorophyll a and perform oxygenic photosynthesis by photolyzing water via PS II, generating ATP, NADPH, and evolving molecular oxygen (O₂). The other organisms listed are chemoautotrophs or chemoheterotrophs that do not perform oxygenic photosynthesis. Therefore, Option (B) is the correct answer."
    }
  },
  {
    id: 5379,
    similarQuestion: {
      question: "Photosynthetic pigments are completely absent in which of the following prokaryotes?",
      option_a: "Anabaena",
      option_b: "Nitrosomonas",
      option_c: "Nostoc",
      option_d: "Chlorobium",
      correct_option: "B",
      explanation: "Nitrosomonas is a chemoautotrophic bacterium that obtains energy by oxidizing ammonia to nitrite (2NH₃ + 3O₂ → 2NO₂⁻ + 2H⁺ + 2H₂O + Energy). It lacks photosynthetic pigments completely and does not use light. In contrast, Anabaena and Nostoc have chlorophyll a and phycobilins, and Chlorobium has bacteriochlorophyll. Therefore, Option (B) is the correct answer."
    }
  },
  {
    id: 5380,
    similarQuestion: {
      question: "Evaluate the taxonomic relationship between bacteria and Kingdom Monera:\nStatement 1: All bacteria are members of Kingdom Monera.\nStatement 2: All members of Kingdom Monera are bacteria.",
      option_a: "Both Statement 1 and Statement 2 are correct",
      option_b: "Statement 1 is correct, but Statement 2 is incorrect",
      option_c: "Statement 1 is incorrect, but Statement 2 is correct",
      option_d: "Both Statement 1 and Statement 2 are incorrect",
      correct_option: "A",
      explanation: "In biological classification (Whittaker's 5-kingdom system), Kingdom Monera comprises all prokaryotic organisms, and the NCERT textbook explicitly states: 'Bacteria are the sole members of the Kingdom Monera.' Thus, every bacterium belongs to Monera, and all monerans are bacteria (broadly encompassing eubacteria, archaebacteria, cyanobacteria, and mycoplasma). Both statements are correct. Therefore, Option (A) is the correct answer."
    }
  },
  {
    id: 5381,
    similarQuestion: {
      question: "Consider the following statements:\nStatement 1: Organisms within Kingdom Monera demonstrate both autotrophic and heterotrophic nutrition.\nStatement 2: Cyanobacteria carry out oxygenic photosynthesis releasing molecular oxygen.",
      option_a: "Only Statement 1 is correct",
      option_b: "Only Statement 2 is correct",
      option_c: "Both Statement 1 and Statement 2 are correct",
      option_d: "Both Statement 1 and Statement 2 are incorrect",
      correct_option: "C",
      explanation: "Statement 1 is correct because monerans exhibit both autotrophy (photosynthetic and chemosynthetic) and heterotrophy (saprophytes and parasites). Statement 2 is also correct because cyanobacteria possess chlorophyll a and split water photolytically, releasing molecular oxygen (O₂). Therefore, Option (C) is the correct answer."
    }
  },
  {
    id: 5382,
    similarQuestion: {
      question: "Consider the following statements regarding photosynthetic bacteria:\nStatement 1: Nostoc has chlorophyll a and operates Photosystem I and Photosystem II.\nStatement 2: Green sulfur bacteria do not evolve oxygen during photosynthesis.",
      option_a: "Only Statement 1 is correct",
      option_b: "Only Statement 2 is correct",
      option_c: "Both Statement 1 and Statement 2 are correct",
      option_d: "Both Statement 1 and Statement 2 are incorrect",
      correct_option: "C",
      explanation: "Statement 1 is correct because Nostoc is a photosynthetic cyanobacterium with chlorophyll a and functional photosystems. Statement 2 is correct because green sulfur bacteria (Chlorobiaceae) perform anoxygenic photosynthesis using bacteriochlorophyll and H₂S as an electron donor, releasing sulfur rather than oxygen. Therefore, Option (C) is the correct answer."
    }
  },
  {
    id: 5383,
    similarQuestion: {
      question: "Examine the following two statements:\nStatement 1: The terms 'oxygenic' and 'aerobic' describe the same biological mechanism.\nStatement 2: All cyanobacteria perform oxygenic photosynthesis.",
      option_a: "Both Statement 1 and Statement 2 are correct",
      option_b: "Statement 1 is incorrect, but Statement 2 is correct",
      option_c: "Statement 1 is correct, but Statement 2 is incorrect",
      option_d: "Both Statement 1 and Statement 2 are incorrect",
      correct_option: "B",
      explanation: "Statement 1 is incorrect because oxygenic refers to photosynthetic oxygen evolution from water photolysis, whereas aerobic refers to cellular respiration consuming oxygen. Statement 2 is correct because cyanobacteria are characterized by chlorophyll a-mediated oxygenic photosynthesis. Therefore, Option (B) is the correct answer."
    }
  },
  {
    id: 5384,
    similarQuestion: {
      question: "Consider the biochemical processes of bacteria:\nStatement 1: Chemoautotrophic bacteria oxidize organic substances like glucose to produce cellular ATP.\nStatement 2: Chemoautotrophs play an indispensable ecological role in recycling nitrogen, phosphorus, iron, and sulfur.",
      option_a: "Both Statement 1 and Statement 2 are correct",
      option_b: "Statement 1 is incorrect, but Statement 2 is correct",
      option_c: "Statement 1 is correct, but Statement 2 is incorrect",
      option_d: "Both Statement 1 and Statement 2 are incorrect",
      correct_option: "B",
      explanation: "Statement 1 is false because chemoautotrophs synthesize ATP by oxidizing inorganic substances such as nitrates, nitrites, ammonia, and iron compounds, not organic substances. Statement 2 is true because their chemical transformations drive the biogeochemical cycles of nitrogen, phosphorus, sulfur, and iron. Therefore, Option (B) is the correct answer."
    }
  },
  {
    id: 5385,
    similarQuestion: {
      question: "Which of the following cellular structures is completely absent in all organisms of Kingdom Monera?",
      option_a: "Fimbriae",
      option_b: "Pili",
      option_c: "Nucleoid",
      option_d: "Membrane-bound plastids",
      correct_option: "D",
      explanation: "Monerans are prokaryotes and lack membrane-delimited organelles, including plastids (chloroplasts, chromoplasts, leucoplasts) and mitochondria. Pili, fimbriae, and nucleoids (naked double-stranded circular DNA) are well-known prokaryotic structures. Photosynthetic prokaryotes carry pigments in thylakoid lamellae or chromatophores rather than bounded plastids. Therefore, Option (D) is the correct answer."
    }
  },
  {
    id: 5386,
    similarQuestion: {
      question: "Which of the following statements does not apply to Kingdom Monera?",
      option_a: "They can multiply rapidly under favorable environmental conditions",
      option_b: "Some members synthesize organic food from inorganic compounds",
      option_c: "They exhibit true multicellularity with tissue-level organization",
      option_d: "They represent the most abundant microorganisms on Earth",
      correct_option: "C",
      explanation: "Monerans are strictly unicellular prokaryotes. Even when they form colonies or filamentous aggregates (like Nostoc filaments), each cell functions as an independent physiological unit, without true multicellularity, tissue differentiation, or organ development. Therefore, Option (C) is the correct answer."
    }
  },
  {
    id: 5387,
    similarQuestion: {
      question: "Which of the following features is not a characteristic of typical monerans?",
      option_a: "Some species can cause parasitic infections in animals and plants",
      option_b: "Genetic material organized into multiple linear chromosomes with histones",
      option_c: "Cytoplasm containing 70S ribosomes",
      option_d: "Plasma membrane infoldings known as mesosomes",
      correct_option: "B",
      explanation: "Prokaryotes (Monera) possess a single, circular, double-stranded DNA molecule localized in the nucleoid region, which is not packaged by true histone proteins. Multiple linear chromosomes associated with basic histone octamers are an exclusive feature of eukaryotic nuclei. Therefore, Option (B) is the correct answer."
    }
  },
  {
    id: 5388,
    similarQuestion: {
      question: "Chemosynthetic autotrophic bacteria produce cellular energy (ATP) by:",
      option_a: "Absorbing radiant photons through light-harvesting antenna pigments",
      option_b: "Fermenting complex carbohydrates into lactic acid under anaerobic conditions",
      option_c: "Enzymatically oxidizing various inorganic chemical substances",
      option_d: "Directly hydrolyzing atmospheric molecular nitrogen without oxidants",
      correct_option: "C",
      explanation: "Chemosynthetic autotrophs oxidize inorganic substances such as ammonia (NH₃), nitrite (NO₂⁻), nitrate (NO₃⁻), hydrogen sulfide (H₂S), or ferrous iron (Fe²⁺) using intracellular enzymatic pathways. The energy released during these oxidation reactions is harnessed to synthesize ATP, which is then used to fix CO₂ into biomass. Therefore, Option (C) is the correct answer."
    }
  },
  {
    id: 5389,
    similarQuestion: {
      question: "Which of the following photosynthetic organisms performs anoxygenic photosynthesis and does not evolve oxygen?",
      option_a: "Spirulina",
      option_b: "Purple sulfur bacterium (Chromatium)",
      option_c: "Nostoc",
      option_d: "Anabaena",
      correct_option: "B",
      explanation: "Purple sulfur bacteria (e.g., Chromatium) utilize bacteriochlorophyll and carry out anoxygenic photosynthesis. Instead of photolyzing H₂O, they use hydrogen sulfide (H₂S) or thiosulfate as an electron donor, releasing sulfur granules instead of oxygen. Spirulina, Nostoc, and Anabaena are cyanobacteria that split water and perform oxygenic photosynthesis. Therefore, Option (B) is the correct answer."
    }
  },
  {
    id: 5390,
    similarQuestion: {
      question: "In nature, which nutritional group of bacteria is the most widespread, abundant, and acts as the primary decomposer?",
      option_a: "Photosynthetic autotrophs",
      option_b: "Chemosynthetic autotrophs",
      option_c: "Heterotrophic decomposers (saprophytes)",
      option_d: "Obligate symbiotic nitrogen fixers",
      correct_option: "C",
      explanation: "According to NCERT: 'The vast majority of bacteria are heterotrophs... The majority are important decomposers (saprophytes).' Heterotrophic saprophytic bacteria break down dead organic matter in soil and aquatic environments, making them quantitatively the most abundant bacterial group on Earth. Therefore, Option (C) is the correct answer."
    }
  },
  {
    id: 5391,
    similarQuestion: {
      question: "Identify the correctly matched pair regarding bacterial groups and their physiological characteristics:",
      option_a: "Rhizobium — Obligate oxygenic photosynthetic autotroph",
      option_b: "Nostoc — Filamentous cyanobacterium performing oxygenic photosynthesis",
      option_c: "Salmonella — Photoautotrophic bacterium containing bacteriochlorophyll",
      option_d: "Nitrosomonas — Anoxygenic photoautotroph utilizing sunlight",
      correct_option: "B",
      explanation: "Nostoc is a filamentous blue-green alga (cyanobacterium) containing chlorophyll a that carries out oxygenic photosynthesis and fixes nitrogen in specialized heterocysts. Rhizobium is a symbiotic chemoheterotroph, Salmonella is a pathogenic chemoheterotroph, and Nitrosomonas is a chemoautotroph (not photoautotroph). Therefore, Option (B) is the correct answer."
    }
  },
  {
    id: 5392,
    similarQuestion: {
      question: "Most medically significant antibiotic-producing bacteria, such as species of Streptomyces, belong nutritionally to which category?",
      option_a: "Obligate photoautotrophs",
      option_b: "Oxygenic photoautotrophs",
      option_c: "Anoxygenic chemoautotrophs",
      option_d: "Heterotrophic saprophytes",
      correct_option: "D",
      explanation: "Streptomyces and many other antibiotic-producing actinomycetes and bacteria are soil-dwelling heterotrophs (specifically saprophytes). They feed on decaying organic debris in the soil and synthesize secondary metabolites, including antibiotics like streptomycin, tetracycline, and erythromycin, to compete against other microorganisms. Therefore, Option (D) is the correct answer."
    }
  },
  {
    id: 5393,
    similarQuestion: {
      question: "Which of the following organisms relies strictly on chemoheterotrophic nutrition?",
      option_a: "Nostoc",
      option_b: "Nitrobacter",
      option_c: "Lactobacillus",
      option_d: "Spirulina",
      correct_option: "C",
      explanation: "Lactobacillus is a lactic acid bacterium that is strictly heterotrophic, fermenting lactose and other sugars into lactic acid. In contrast, Nostoc and Spirulina are oxygenic photoautotrophs, and Nitrobacter is a chemoautotrophic nitrifying bacterium that oxidizes nitrite to nitrate. Therefore, Option (C) is the correct answer."
    }
  },
  {
    id: 5394,
    similarQuestion: {
      question: "What is quantitatively the most common mode of nutrition found among members of Kingdom Monera?",
      option_a: "Oxygenic photoautotrophy",
      option_b: "Heterotrophy",
      option_c: "Chemoautotrophy",
      option_d: "Anoxygenic photoautotrophy",
      correct_option: "B",
      explanation: "NCERT states: 'The vast majority of bacteria are heterotrophs, i.e., they depend on other organisms or on dead organic matter for food.' Although bacteria display unmatched metabolic variety, the vast majority are heterotrophs (saprophytes and parasites). Therefore, Option (B) is the correct answer."
    }
  },
  {
    id: 5395,
    similarQuestion: {
      question: "Which of the following economically destructive plant diseases is caused by a bacterial pathogen?",
      option_a: "Late blight of potato",
      option_b: "Black rust of wheat",
      option_c: "Citrus canker",
      option_d: "Loose smut of wheat",
      correct_option: "C",
      explanation: "Citrus canker is a devastating bacterial plant disease caused by the bacterium Xanthomonas citri. In contrast, late blight of potato is caused by the oomycete fungus-like protist Phytophthora infestans, black rust of wheat is caused by the basidiomycete fungus Puccinia graminis, and loose smut of wheat is caused by the fungus Ustilago nuda. Therefore, Option (C) is the correct answer."
    }
  },
  {
    id: 5396,
    similarQuestion: {
      question: "Which of the following human diseases is caused by a fungal pathogen rather than a bacterium?",
      option_a: "Cholera",
      option_b: "Typhoid",
      option_c: "Tetanus",
      option_d: "Ringworm",
      correct_option: "D",
      explanation: "Ringworm (tinea) is a fungal infection of the skin, nails, or scalp caused by dermatophyte fungi such as Microsporum, Trichophyton, and Epidermophyton. Cholera (Vibrio cholerae), typhoid (Salmonella typhi), and tetanus (Clostridium tetani) are all well-known bacterial diseases. Therefore, Option (D) is the correct answer."
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
  console.log(`Set 32 Part 1 Complete: ${success}/${questions.length} updated successfully.`);
}

main().catch(console.error);
