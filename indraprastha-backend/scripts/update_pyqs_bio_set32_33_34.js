const https = require('https');

const loginData = JSON.stringify({
  username: "indraprasthaadmin",
  password: "indraprastha@123"
});

function post(url, data) {
  return new Promise((resolve, reject) => {
    const u = new URL(url);
    const bodyStr = typeof data === 'string' ? data : JSON.stringify(data);
    const req = https.request({
      hostname: u.hostname,
      port: 443,
      path: u.pathname,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(bodyStr),
      }
    }, res => {
      let b = '';
      res.on('data', d => b += d);
      res.on('end', () => resolve(JSON.parse(b)));
    });
    req.on('error', reject);
    req.write(bodyStr);
    req.end();
  });
}

function put(url, data, token) {
  return new Promise((resolve, reject) => {
    const u = new URL(url);
    const bodyStr = typeof data === 'string' ? data : JSON.stringify(data);
    const req = https.request({
      hostname: u.hostname,
      port: 443,
      path: u.pathname,
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(bodyStr),
        'Authorization': `Bearer ${token}`
      }
    }, res => {
      let b = '';
      res.on('data', d => b += d);
      res.on('end', () => {
        try {
          resolve(JSON.parse(b));
        } catch (_) {
          resolve(b);
        }
      });
    });
    req.on('error', reject);
    req.write(bodyStr);
    req.end();
  });
}

// ─────────────────────────────────────────────────────────────────────────────
// CHAPTER 32: Living World (5 PYQs)
// CHAPTER 33: Biological Classification (6 PYQs)
// CHAPTER 34: Plant Kingdom (9 PYQs)
// ─────────────────────────────────────────────────────────────────────────────

const updates = [
  // ── CHAPTER 32: Living World ──────────────────────────────────────────────
  {
    id: 7,
    explanation: "1. According to the binomial system of nomenclature proposed by Carolus Linnaeus, each scientific name consists of two parts.\n2. The first part 'X' represents the Generic name (genus) and starts with a capital letter.\n3. The second part 'Y' represents the Specific epithet (species) and starts with a small letter.\n4. Both names are Latinized and italicized in print or separately underlined when handwritten.\nTherefore, Option (C) is the correct answer.",
    similarQuestion: {
      question: "According to the rules of binomial nomenclature, which of the following is written correctly for the scientific name of mango?",
      option_a: "Mangifera indica Linn.",
      option_b: "mangifera Indica Linn.",
      option_c: "Mangifera Indica",
      option_d: "Mangifera indica",
      correct_option: "A",
      explanation: "1. According to the International Code of Botanical Nomenclature (ICBN), binomial nomenclature consists of two components: the genus name and the specific epithet.\n2. The genus name starts with a capital letter (Mangifera), while the specific epithet starts with a small letter (indica).\n3. When printed, scientific names are italicised or separately underlined when handwritten, followed by the abbreviated name of the author in Roman script (Linn. for Carolus Linnaeus).\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 8,
    explanation: "1. The housefly (Musca domestica) belongs to the phylum Arthropoda, subphylum Hexapoda, class Insecta, order Diptera, family Muscidae, genus Musca, and species domestica.\n2. Hominidae is the family of humans (Homo sapiens), Calliphoridae is the family of blowflies, and Cyprinidae is a family of freshwater fish (carp).\nTherefore, Option (B) is the correct answer.",
    similarQuestion: {
      question: "To which order and class does the housefly (Musca domestica) belong respectively?",
      option_a: "Diptera and Insecta",
      option_b: "Insecta and Diptera",
      option_c: "Coleoptera and Arthropoda",
      option_d: "Diptera and Arthropoda",
      correct_option: "A",
      explanation: "1. Musca domestica (housefly) belongs to the phylum Arthropoda, subphylum Hexapoda, and class Insecta.\n2. In class Insecta, it is classified under the order Diptera (true flies with a single pair of flight wings and halteres).\n3. It belongs to the family Muscidae, genus Musca, and species domestica.\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 9,
    explanation: "1. The Linnaean taxonomic hierarchy consists of seven obligate categories arranged in a descending sequence: Kingdom → Phylum → Class → Order → Family → Genus → Species.\n2. In animals, Phylum is used instead of Division (which is used for plants).\n3. In Option (D), Kingdom is the highest category, followed progressively by Phylum, Class, Order, Family, Genus, and Species as the lowest fundamental unit.\nTherefore, Option (D) is the correct answer.",
    similarQuestion: {
      question: "Which of the following represents the correct ascending order of obligate taxonomic categories from lowest to highest rank?",
      option_a: "Species → Genus → Family → Order → Class → Phylum / Division → Kingdom",
      option_b: "Kingdom → Division → Class → Order → Family → Genus → Species",
      option_c: "Species → Family → Genus → Order → Class → Division → Kingdom",
      option_d: "Species → Genus → Order → Family → Class → Phylum → Kingdom",
      correct_option: "A",
      explanation: "1. The Linnaean taxonomic hierarchy consists of seven obligate categories arranged in a definitive hierarchy.\n2. Ascending order means starting from the lowest and most specific category (Species) and progressing upwards to the highest and most comprehensive category (Kingdom).\n3. The exact ascending hierarchy is: Species → Genus → Family → Order → Class → Phylum (for animals) or Division (for plants) → Kingdom.\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 10,
    explanation: "1. Taxonomic keys are analytical aids used for identification of plants and animals based on similarities and dissimilarities (statement a is true, statement b is true).\n2. Keys are based on contrasting characters generally in a pair called couplet (statement c is true).\n3. Each statement in a taxonomic key is called a lead (statement e is true).\n4. Statement (d) is false because separate taxonomic keys are required for each taxonomic category such as family, genus, and species for identification purposes.\nTherefore, statements (a), (b), (c), and (e) are correct.\nTherefore, Option (B) is the correct answer.",
    similarQuestion: {
      question: "Which of the following statements regarding taxonomic keys is incorrect?",
      option_a: "Separate taxonomic keys are required for each taxonomic category such as family, genus and species.",
      option_b: "Keys are analytical in nature and based on contrasting characters in a pair called couplet.",
      option_c: "Each statement in a taxonomic key is referred to as a lead.",
      option_d: "A single taxonomic key can be uniformly used to identify organisms across all taxonomic categories.",
      correct_option: "D",
      explanation: "1. Taxonomic keys are artificial analytical aids used for identification of organisms based on similarities and dissimilarities.\n2. They are based on contrasting characters generally in a pair known as a couplet, where each individual statement is called a lead.\n3. Importantly, a single key cannot be used across all ranks; separate taxonomic keys are strictly required for each distinct taxonomic category (family, genus, and species) for identification purposes.\n4. Hence, statement (D) is incorrect.\nTherefore, Option (D) is the correct answer."
    }
  },
  {
    id: 11,
    question: "Match List-I with List-II regarding taxonomical aids:\nList-I:\nA. Herbarium\nB. Manual\nC. Museum\nD. Monograph\nList-II:\nI. Information on any one taxon\nII. Preserved plant and animal specimens\nIII. Storehouse of dried and pressed plant specimens on sheets\nIV. Information for identification of names of species in an area\nChoose the correct answer from the options given below:",
    optionA: "A-III, B-IV, C-II, D-I",
    optionB: "A-III, B-II, C-IV, D-I",
    optionC: "A-I, B-IV, C-II, D-III",
    optionD: "A-IV, B-III, C-II, D-I",
    correctOption: "A",
    explanation: "1. Herbarium: A repository of plant specimens that are dried, pressed, and preserved on sheets with systematic labels (A matches III).\n2. Manual: Provides useful information for the identification of names of species found in a particular geographical area (B matches IV).\n3. Museum: Houses collections of preserved plant and animal specimens for study, reference, and education (C matches II).\n4. Monograph: Contains comprehensive information on any one specific taxon only (D matches I).\nTherefore, Option (A) is the correct answer.",
    similarQuestion: {
      question: "Which taxonomical aid contains actual account of habitat and distribution of plants of a given area and provides the index to the plant species?",
      option_a: "Flora",
      option_b: "Manual",
      option_c: "Monograph",
      option_d: "Catalogue",
      correct_option: "A",
      explanation: "1. Flora contains the actual account of habitat and distribution of plants of a given area, providing the definitive index to the plant species found in that region.\n2. Manuals provide information for identification of names of species found in an area.\n3. Monographs contain information on any one taxon.\n4. Catalogues provide alphabetical listings of species with brief descriptions.\nTherefore, Option (A) is the correct answer."
    }
  },

  // ── CHAPTER 33: Biological Classification ──────────────────────────────────
  {
    id: 2530,
    explanation: "1. Whittaker proposed Five Kingdoms based on increasing complexity of body organization:\n- C. Monera: Prokaryotes with peptidoglycan / polysaccharide-amino acid cell wall.\n- E. Protista: Eukaryotes with unicellular cellular body organization.\n- A. Fungi: Multicellular heterotrophs with chitinous cell walls.\n- D. Plantae: Eukaryotic multicellular autotrophs with tissue/organ level of body organization.\n- B. Animalia: Heterotrophs with complex tissue/organ/organ system level of body organization.\n2. Increasing order of complexity: C → E → A → D → B.\nTherefore, Option (C) is the correct answer.",
    similarQuestion: {
      question: "In Whittaker's Five Kingdom Classification, which of the following criteria was not considered as one of the primary basis for classification?",
      option_a: "Thallus organization and cell structure",
      option_b: "Mode of nutrition and reproduction",
      option_c: "Phylogenetic relationships",
      option_d: "Presence or absence of respiratory pigments in blood",
      correct_option: "D",
      explanation: "1. R.H. Whittaker (1969) proposed the Five Kingdom Classification: Monera, Protista, Fungi, Plantae, and Animalia.\n2. The main criteria used for this classification system include cell structure (prokaryotic vs eukaryotic), thallus / body organization (unicellular vs multicellular), mode of nutrition (autotrophic vs heterotrophic, absorptive vs ingestive), reproduction, and phylogenetic relationships.\n3. Presence or absence of respiratory pigments was never a criterion in Whittaker's system.\nTherefore, Option (D) is the correct answer."
    }
  },
  {
    id: 2531,
    explanation: "1. Kingdom Fungi is divided into four main classes (Phycomycetes, Ascomycetes, Basidiomycetes, and Deuteromycetes).\n2. The primary criteria used for this division are:\n   (a) Morphology of mycelium (septate vs coenocytic),\n   (b) Mode of spore formation (endogenous vs exogenous),\n   (c) Nature of fruiting bodies (ascocarp, basidiocarp, etc.).\n3. Mode of nutrition is absorptive heterotrophy across all fungi and is therefore NOT a criterion used to divide the kingdom into classes.\nTherefore, Option (B) is the correct answer.",
    similarQuestion: {
      question: "The classification of Kingdom Fungi into Phycomycetes, Ascomycetes, Basidiomycetes, and Deuteromycetes is primarily based on which combination of characters?",
      option_a: "Morphology of mycelium, mode of spore formation, and nature of fruiting bodies",
      option_b: "Mode of nutrition, presence of cell wall, and nature of reserve food",
      option_c: "Habitat, pigmentation, and presence of flagella",
      option_d: "Body size, parasitic nature, and temperature preference",
      correct_option: "A",
      explanation: "1. The morphology of the mycelium (aseptate/coenocytic vs septate and branched), the mode of spore formation (endogenous vs exogenous, motile vs non-motile), and the types of fruiting bodies (e.g., ascocarp, basidiocarp) form the primary basis for dividing Kingdom Fungi into distinct classes.\n2. Mode of nutrition is absorptive heterotrophic across almost all fungi and is not used to subdivide fungi into classes.\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 2532,
    explanation: "1. Statement A is correct: In Phaeophyceae (brown algae), asexual reproduction occurs by biflagellate zoospores that are pear-shaped and have two unequal laterally attached flagella.\n2. Statement B is incorrect: Sexual reproduction in Phaeophyceae may be isogamous, anisogamous, or oogamous (not oogamous only).\n3. Statement C is correct: Food is stored as complex carbohydrates, which may be in the form of laminarin or mannitol.\n4. Statement D is correct: The major pigments are chlorophyll a, c, carotenoids, and xanthophylls (principally fucoxanthin).\n5. Statement E is correct: The vegetative cells have a cellulosic wall usually covered on the outside by a gelatinous coating of algin.\nTherefore, statements A, C, D, and E are correct.\nTherefore, Option (C) is the correct answer.",
    similarQuestion: {
      question: "Which of the following statements is incorrect regarding Rhodophyceae (red algae)?",
      option_a: "Major pigments are chlorophyll a, chlorophyll d, and r-phycoerythrin.",
      option_b: "Food is stored as floridean starch, which is structurally very similar to amylopectin and glycogen.",
      option_c: "Asexual reproduction occurs predominantly through flagellated, motile biflagellate zoospores.",
      option_d: "Sexual reproduction is oogamous and accompanied by complex post-fertilisation developments.",
      correct_option: "C",
      explanation: "1. In Rhodophyceae (red algae), both asexual spores and sexual gametes are completely non-motile (flagella are completely absent at all stages of the life cycle).\n2. Asexual reproduction takes place by non-motile spores, and sexual reproduction is oogamous by non-motile male gametes (spermatia).\n3. Major pigments are chlorophyll a, d, and r-phycoerythrin, and food is stored as floridean starch.\n4. Therefore, statement (C) is incorrect.\nTherefore, Option (C) is the correct answer."
    }
  },
  {
    id: 2533,
    explanation: "1. Statement I is correct: Mycoplasma are the smallest living prokaryotic cells (about 0.1 to 0.3 μm) and can pass through bacterial filters with a pore size of less than 1 micron.\n2. Statement II is incorrect: Mycoplasma completely lack a cell wall, which makes them pleomorphic and naturally resistant to penicillin and other cell-wall active antibiotics.\n3. Hence, Statement I is correct but Statement II is incorrect.\nTherefore, Option (B) is the correct answer.",
    similarQuestion: {
      question: "Which of the following statements about Mycoplasma (PPLO) is incorrect?",
      option_a: "They are the smallest known living cells capable of surviving without oxygen.",
      option_b: "They are completely resistant to cell wall-targeting antibiotics like penicillin.",
      option_c: "They possess a rigid, thick cell wall composed of peptidoglycan.",
      option_d: "They are pleomorphic in nature and can be pathogenic in both animals and plants.",
      correct_option: "C",
      explanation: "1. Mycoplasma are organisms that completely lack a cell wall, which makes them pleomorphic (variable in shape).\n2. Because they have no peptidoglycan cell wall, they are naturally insensitive to beta-lactam antibiotics like penicillin that inhibit cell wall synthesis.\n3. They are the smallest known living cells (about 0.1 to 0.3 μm) and can survive anaerobically.\n4. Therefore, statement (C) is incorrect.\nTherefore, Option (C) is the correct answer."
    }
  },
  {
    id: 2534,
    explanation: "1. Option A is incorrect: Bacteria are not exclusively heterotrophic; many are photosynthetic autotrophs (e.g. cyanobacteria) or chemosynthetic autotrophs (e.g. Nitrosomonas).\n2. Option B is incorrect: Mycoplasma completely lack a cell wall.\n3. Option C is incorrect: Slime moulds are saprophytic protists classified under Kingdom Protista, not Monera.\n4. Option D is correct: Cyanobacteria (blue-green algae) are photosynthetic autotrophs possessing chlorophyll a and are true members of Kingdom Monera (Eubacteria).\nTherefore, Option (D) is the correct answer.",
    similarQuestion: {
      question: "Which of the following statements regarding organisms of Kingdom Monera is correct?",
      option_a: "Cyanobacteria possess chlorophyll a similar to green plants and are photosynthetic autotrophs.",
      option_b: "All bacteria are obligate heterotrophs lacking any photosynthetic capabilities.",
      option_c: "Archaebacteria have the same cell wall structure and lipid bilayer as Eubacteria.",
      option_d: "Slime moulds are multicellular photosynthetic organisms belonging to Monera.",
      correct_option: "A",
      explanation: "1. Cyanobacteria (blue-green algae) are photosynthetic autotrophs possessing chlorophyll a, similar to green plants, and played a historic role in oxygenating Earth's atmosphere.\n2. Although the vast majority of bacteria are heterotrophs, significant groups are photosynthetic or chemosynthetic autotrophs.\n3. Archaebacteria differ from eubacteria in having a distinctive cell wall composition (lacking peptidoglycan) and branched ether lipids, enabling survival in extreme conditions.\n4. Slime moulds belong to Kingdom Protista.\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 2535,
    explanation: "1. Prions are proteinaceous infectious agents composed solely of abnormally folded proteins without any nucleic acid.\n2. In cattle, they cause bovine spongiform encephalopathy (BSE), commonly known as mad cow disease.\n3. In humans, their analogous variant disease is known as Creutzfeldt-Jakob disease (CJD).\n4. Viroids contain free low-molecular-weight RNA without a protein coat, whereas viruses have both nucleic acid and protein.\nTherefore, Option (D) is the correct answer.",
    similarQuestion: {
      question: "Which of the following infectious agents is composed exclusively of abnormally folded protein lacking any genetic material (nucleic acid)?",
      option_a: "Prion",
      option_b: "Viroid",
      option_c: "Virus",
      option_d: "Bacteriophage",
      correct_option: "A",
      explanation: "1. Prions are infectious agents composed solely of abnormally folded, proteinaceous infectious particles and contain no nucleic acid (neither DNA nor RNA).\n2. They cause neurodegenerative disorders such as bovine spongiform encephalopathy (BSE / mad cow disease) in cattle and Creutzfeldt-Jakob disease (CJD) in humans.\n3. Viroids consist only of free, low molecular weight RNA lacking a protein capsid (discovered by T.O. Diener).\n4. Viruses contain both a nucleic acid core and a protective protein capsid.\nTherefore, Option (A) is the correct answer."
    }
  },

  // ── CHAPTER 34: Plant Kingdom ──────────────────────────────────────────────
  {
    id: 2709,
    explanation: "1. Gymnosperms (gymnos = naked, sperma = seed) are plants in which the ovules are not enclosed by any ovary wall and remain exposed both before and after fertilisation.\n2. Because gymnosperms lack an ovary, true fruits are not formed; the seeds are borne naked on the surface of megasporophylls or cones.\n3. Flowers are unique reproductive structures of angiosperms and are absent in gymnosperms.\nTherefore, Option (C) is the correct answer.",
    similarQuestion: {
      question: "Why are gymnosperms referred to as 'naked seeded' plants?",
      option_a: "Their ovules are not enclosed by any ovary wall and remain exposed both before and after fertilisation.",
      option_b: "Their seeds lack an embryo and endosperm.",
      option_c: "Their seeds do not have a protective seed coat.",
      option_d: "Their reproductive structures develop completely below the soil surface.",
      correct_option: "A",
      explanation: "1. The term gymnosperm is derived from Greek 'gymnos' meaning naked and 'sperma' meaning seed.\n2. Unlike angiosperms, gymnosperms do not possess an ovary; their ovules are borne naked on the surface of megasporophylls.\n3. Consequently, the seeds that develop post-fertilisation are not enclosed within a fruit wall and remain directly exposed.\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 2710,
    correctOption: "D",
    explanation: "1. In pteridophytes, spore mother cells in sporangia undergo meiosis (B) to produce haploid spores.\n2. Spores germinate to form a multicellular, free-living thalloid gametophyte called prothallus (A).\n3. The prothallus bears multicellular sex organs: archegonia and antheridia (D).\n4. Antherozoids are released and transferred to archegonia in the presence of water (E).\n5. Fusion of antherozoid with egg cell leads to fertilisation (C) and formation of the zygote that grows into a sporophyte.\n6. The correct chronological sequence is: B → A → D → E → C.\nTherefore, Option (D) is the correct answer.",
    similarQuestion: {
      question: "In the life cycle of a homosporous pteridophyte (such as Dryopteris), what is the correct chronological sequence of events?",
      option_a: "Spore germination → Formation of cordate prothallus → Development of antheridia and archegonia → Water-mediated fertilisation → Development of diploid sporophyte",
      option_b: "Formation of protonema → Fertilisation → Spore germination → Sporophyte formation",
      option_c: "Fertilisation → Prothallus development → Spore formation → Embryo formation",
      option_d: "Development of gametophyte → Meiosis in gametophyte → Fertilisation → Spore germination",
      correct_option: "A",
      explanation: "1. In homosporous pteridophytes, haploid spores germinate to produce a small, inconspicuous, multicellular, free-living, mostly photosynthetic thalloid gametophyte called a prothallus.\n2. The prothallus bears multicellular sex organs: male antheridia and female archegonia.\n3. Flagellated male gametes (antherozoids) require a film of water to swim to the open neck of the archegonium for fertilisation.\n4. Syngamy results in a diploid zygote that develops into a multicellular, well-differentiated dominant sporophyte.\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 2711,
    explanation: "1. Gemmae are specialised vegetative structures found in liverworts (bryophytes) such as Marchantia.\n2. They are green, multicellular, asexual buds that develop in small receptacles called gemma cups situated on the thalli.\n3. Upon maturity, gemmae detach from the parent plant and germinate directly into new individual gametophytic thalli (asexual reproduction).\nTherefore, Option (B) is the correct answer.",
    similarQuestion: {
      question: "In liverworts such as Marchantia, which of the following statements accurately describes gemmae?",
      option_a: "Green, multicellular, asexual buds produced in small receptacles called gemma cups on the thallus.",
      option_b: "Unicellular, non-photosynthetic sexual gametes produced inside the antheridium.",
      option_c: "Diploid structures produced by the sporophyte for water absorption.",
      option_d: "Specialised subterranean root-like hairs that anchor the thallus to the substratum.",
      correct_option: "A",
      explanation: "1. In liverworts like Marchantia polymorpha, asexual reproduction occurs by fragmentation or via specialised structures called gemmae.\n2. Gemmae are green, multicellular, asexual vegetative buds that develop in small cup-shaped receptacles called gemma cups situated on the dorsal surface of the thallus.\n3. Upon detachment from the parent body, each gemma germinates directly to establish a new independent haploid thallus.\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 2712,
    correctOption: "B",
    explanation: "1. The life cycle of bryophytes proceeds through the following sequential stages:\n- B: Attachment of gametophyte to substratum via rhizoids.\n- E: Release of motile flagellated antherozoids into water film.\n- A: Fusion of antherozoid with egg in the archegonium (fertilisation).\n- D: Development of the zygote into a multicellular diploid sporophyte.\n- C: Spore mother cells in capsule undergo reduction division (meiosis) to produce haploid spores.\n2. The correct chronological sequence is: B → E → A → D → C.\nTherefore, Option (B) is the correct answer.",
    similarQuestion: {
      question: "In the life cycle of Funaria (moss), which of the following sequences accurately depicts the post-fertilisation developmental pathway?",
      option_a: "Zygote → Multicellular sporophyte (foot, seta, capsule) → Meiosis in spore mother cells → Spores → Filamentous protonema",
      option_b: "Zygote → Filamentous protonema → Capsule formation → Spores → Leafy gametophyte",
      option_c: "Zygote → Meiosis → Sporophyte → Protonema → Antheridium",
      option_d: "Protonema → Zygote → Meiosis → Sporophyte → Spores",
      correct_option: "A",
      explanation: "1. Following fertilisation, the diploid zygote inside the archegonium undergoes mitosis to develop into a dependent sporophyte consisting of a foot, seta, and capsule.\n2. Inside the capsule, spore mother cells undergo reduction division (meiosis) to produce haploid spores.\n3. When liberated, a spore germinates into a creeping, green, branched, and frequently filamentous first stage called the primary protonema, which subsequently produces the upright leafy gametophyte.\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 2713,
    explanation: "1. In gymnosperms, the xylem consists mainly of tracheids for water conduction; true xylem vessels are completely absent (with the sole exception of order Gnetales: Gnetum, Welwitschia, Ephedra).\n2. Sieve cells and albuminous cells (Strasburger cells) are present in gymnosperm phloem, whereas true companion cells and sieve tubes are absent.\n3. Therefore, true vessels are not found in typical gymnosperms.\nTherefore, Option (A) is the correct answer.",
    similarQuestion: {
      question: "Phloem of gymnosperms differs from that of angiosperms because gymnosperms possess:",
      option_a: "Albuminous cells and sieve cells, but lack companion cells and sieve tubes",
      option_b: "Companion cells and sieve tubes, but lack albuminous cells",
      option_c: "Vessels and sieve tubes, but lack tracheids",
      option_d: "Neither sieve cells nor companion cells",
      correct_option: "A",
      explanation: "1. In gymnosperms, the xylem conducts water primarily through tracheids; true xylem vessels are absent (except in the advanced order Gnetales).\n2. In the phloem of gymnosperms, food translocation takes place via sieve cells associated with Strasburger cells (albuminous cells).\n3. Sieve tubes and specialised companion cells characteristic of angiosperms are absent in gymnosperms.\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 2714,
    explanation: "1. Phaeophyceae (brown algae) possess chlorophyll a, chlorophyll c, and large amounts of the carotenoid xanthophyll fucoxanthin, giving them their characteristic olive-brown color.\n2. Rhodophyceae (red algae) possess chlorophyll a, chlorophyll d, and the accessory photosynthetic pigment r-phycoerythrin, giving them their distinctive red color.\n3. Chlorophyceae (green algae) contain chlorophyll a and chlorophyll b.\nTherefore, Option (A) is the correct answer.",
    similarQuestion: {
      question: "Match List-I with List-II regarding algal classes and their major photosynthetic pigments:\nList-I:\nA. Chlorophyceae\nB. Phaeophyceae\nC. Rhodophyceae\nList-II:\nI. Chlorophyll a, c, and Fucoxanthin\nII. Chlorophyll a, d, and r-Phycoerythrin\nIII. Chlorophyll a and b\nChoose the correct answer from the options given below:",
      option_a: "A-III, B-I, C-II",
      option_b: "A-I, B-III, C-II",
      option_c: "A-II, B-I, C-III",
      option_d: "A-III, B-II, C-I",
      correct_option: "A",
      explanation: "1. Chlorophyceae (green algae): Major pigments are chlorophyll a and chlorophyll b, giving them a bright grass-green appearance (A matches III).\n2. Phaeophyceae (brown algae): Major pigments are chlorophyll a, chlorophyll c, carotenoids, and the xanthophyll pigment fucoxanthin, which gives the olive green to brown colour (B matches I).\n3. Rhodophyceae (red algae): Major pigments are chlorophyll a, chlorophyll d, and the red accessory pigment r-phycoerythrin (C matches II).\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 2715,
    explanation: "1. In the life cycle of mosses (bryophytes), the first stage of the gametophyte is the juvenile filamentous protonema stage (Assertion A is true).\n2. The protonema develops directly from haploid spores produced inside the capsule of the sporophyte (Reason R is true).\n3. Because the protonema originates directly from spore germination, Reason R is the correct biological explanation of Assertion A.\nTherefore, Option (A) is the correct answer.",
    similarQuestion: {
      question: "Given below are two statements regarding the life cycle of mosses:\nStatement I: The secondary protonema develops from the primary protonema as a lateral bud and bears rhizoids.\nStatement II: Vegetative reproduction in mosses takes place by fragmentation and budding in the secondary protonema.\nIn the light of the above statements, choose the correct answer from the options given below:",
      option_a: "Both Statement I and Statement II are correct",
      option_b: "Both Statement I and Statement II are incorrect",
      option_c: "Statement I is correct but Statement II is incorrect",
      option_d: "Statement I is incorrect but Statement II is correct",
      correct_option: "A",
      explanation: "1. Statement I is correct: The protonema develops from spores; from this primary protonema, a leafy secondary stage develops from a lateral bud bearing multi-cellular branched rhizoids.\n2. Statement II is correct: In mosses, vegetative reproduction takes place readily by fragmentation and budding in the secondary protonema.\n3. Therefore, both Statement I and Statement II are correct statements according to NCERT Biology.\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 2716,
    explanation: "1. Assertion A is true: In gymnosperms, microspores develop into pollen grains inside microsporangia and are carried by wind currents (anemophily) to the ovules.\n2. Reason R is false: Pollen grains do not enter the mouth of the archegonium directly without a pollen tube; instead, gymnosperms form a pollen tube (siphonogamy) that grows through the nucellar tissue to carry the non-motile or flagellated male gametes to the archegonium.\n3. Therefore, Assertion A is correct but Reason R is incorrect.\nTherefore, Option (C) is the correct answer.",
    correctOption: "C",
    similarQuestion: {
      question: "Which of the following statements regarding pollination and fertilisation in gymnosperms (e.g., Pinus) is correct?",
      option_a: "Pollination is anemophilous (by wind), and pollen tube growth (siphonogamy) delivers male gametes to the archegonia.",
      option_b: "Water is indispensable for the transfer of flagellated male gametes to the ovule.",
      option_c: "Pollination is mediated exclusively by insects, and no pollen tube is formed.",
      option_d: "The female gametophyte is discharged out of the ovule prior to fertilisation.",
      correct_option: "A",
      explanation: "1. In gymnosperms such as Pinus and Cycas, microspores (pollen grains) are discharged from microsporangia and transferred by air currents (wind pollination / anemophily) to the micropyle of the ovule.\n2. The pollen grain germinates on the nucellus, developing a pollen tube that grows through the tissue of the nucellus towards the archegonia (siphonogamous fertilisation).\n3. Near the mouth of the archegonium, the pollen tube releases its contents, discharging male gametes for syngamy with the egg cell.\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 2717,
    explanation: "1. The alga illustrated is Chara, an advanced green alga placed under class Chlorophyceae (character a is true).\n2. As a green alga, reserve food is stored as starch (character b is true; characters d and e describe Phaeophyceae and are false).\n3. Chara is typically monoecious, bearing macroscopic jacketed sex organs on the nodes: upper oval nucule (oogonium) and lower spherical globule (antheridium) (character c is true).\n4. Therefore, characters (a), (b), and (c) correctly describe Chara.\nTherefore, Option (C) is the correct answer.",
    similarQuestion: {
      question: "In Chara (a green alga), which of the following descriptions regarding its sex organs is correct?",
      option_a: "Upper female sex organ called nucule (oogonium) and lower male sex organ called globule (antheridium).",
      option_b: "Upper male sex organ called globule and lower female sex organ called nucule.",
      option_c: "Male and female sex organs are always borne on separate dioecious plants.",
      option_d: "Sex organs are unicellular and lack any sterile jacket layer.",
      correct_option: "A",
      explanation: "1. Chara is a freshwater green alga (Chlorophyceae) characterised by multicellular, highly evolved, and jacketed sex organs.\n2. In monoecious species of Chara, the female sex organ is the upper oval structure called the nucule (oogonium).\n3. The male sex organ is the lower spherical yellow-to-orange structure called the globule (antheridium).\n4. Food is stored as typical starch, and major pigments are chlorophyll a and b.\nTherefore, Option (A) is the correct answer."
    }
  }
];

async function run() {
  console.log('Logging in to live API...');
  const login = await post('https://api.indraprasthaneetacademy.com/api/admin/login', loginData);
  if (!login.token) {
    console.error('Login failed:', login);
    return;
  }
  const token = login.token;
  console.log('Login successful! Updating ' + updates.length + ' PYQs across Chapters 32, 33, and 34...');

  let successCount = 0;
  for (let i = 0; i < updates.length; i++) {
    const item = updates[i];
    console.log(`[${i + 1}/${updates.length}] Updating PYQ ID ${item.id}...`);

    const payload = {};
    if (item.question !== undefined) payload.question = item.question;
    if (item.optionA !== undefined) payload.optionA = item.optionA;
    if (item.optionB !== undefined) payload.optionB = item.optionB;
    if (item.optionC !== undefined) payload.optionC = item.optionC;
    if (item.optionD !== undefined) payload.optionD = item.optionD;
    if (item.correctOption !== undefined) payload.correctOption = item.correctOption;
    if (item.explanation !== undefined) payload.explanation = item.explanation;
    if (item.similarQuestion !== undefined) payload.similarQuestion = item.similarQuestion;

    const res = await put(`https://api.indraprasthaneetacademy.com/api/admin/pyqs/${item.id}`, payload, token);
    if (res.success || res.id || res.pyq) {
      console.log(`  -> PYQ ${item.id} updated successfully with high-yield Similar Question!`);
      successCount++;
    } else {
      console.error(`  -> Failed to update PYQ ${item.id}:`, res);
    }
  }

  console.log(`\n🎉 COMPLETED: ${successCount}/${updates.length} PYQs updated live!`);
}

run().catch(console.error);
