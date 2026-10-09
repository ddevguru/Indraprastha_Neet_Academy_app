/**
 * NEET Biology Question Bank
 * Provides authentic, diverse, non-repetitive MCQ generators
 * across all major NEET-UG Botany and Zoology chapters.
 */

function getBiologyGenerators(topicName, conceptName, buildQuestion) {
  const t = (topicName || '').toLowerCase();
  const c = (conceptName || '').toLowerCase();
  const searchStr = `${t} ${c}`;

  // 1. Cell: The Unit of Life
  if (/cell membrane|organelle|ribosome|prokaryote|fluid mosaic|nucleus|lysosome|mitochondria|chloroplast/i.test(searchStr)) {
    return [
      (id, topic, concept) => {
        return buildQuestion(
          id,
          `In eukaryotic cells, 70S ribosomes are characteristically found in which of the following cellular locations?`,
          `Matrix of Mitochondria and Chloroplasts`,
          [`Rough Endoplasmic Reticulum membrane`, `Free floating in cytosol`, `Nucleolus`],
          `While eukaryotic cytoplasm contains 80S ribosomes, semi-autonomous organelles of endosymbiotic origin (mitochondria and plastids) contain prokaryote-like 70S ribosomes.`,
          topic,
          concept
        );
      },
      (id, topic, concept) => {
        return buildQuestion(
          id,
          `According to the Fluid Mosaic Model proposed by Singer and Nicolson (1972), the quasi-fluid nature of lipids enables:`,
          `Lateral movement of proteins within the overall lipid bilayer`,
          [`Flip-flop movement of all proteins across the bilayer`, `Rigid static structural stability`, `Complete impermeability to water`],
          `The quasi-fluid nature of the phospholipid bilayer allows lateral movement of proteins within the overall plane of the membrane, which is essential for functions like cell growth, secretion, and endocytosis.`,
          topic,
          concept
        );
      },
      (id, topic, concept) => {
        return buildQuestion(
          id,
          `Which of the following organelles is NOT considered a component of the eukaryotic endomembrane system?`,
          `Peroxisome and Mitochondria`,
          [`Endoplasmic Reticulum`, `Golgi Apparatus`, `Lysosome and Vacuole`],
          `The endomembrane system includes ER, Golgi apparatus, lysosomes, and vacuoles because their functions are coordinated. Mitochondria, chloroplasts, and peroxisomes are not coordinated with these and are excluded.`,
          topic,
          concept
        );
      },
      (id, topic, concept) => {
        return buildQuestion(
          id,
          `In prokaryotic cells, mesosomes are specialized membranous structures formed by the infoldings of:`,
          `Plasma membrane`,
          [`Cell wall`, `Glycocalyx`, `Nuclear membrane`],
          `Mesosomes are infoldings of the plasma membrane in bacteria. They participate in cell wall synthesis, DNA replication, distribution to daughter cells, respiration, and secretion.`,
          topic,
          concept
        );
      },
    ];
  }

  // 2. Cell Cycle & Cell Division
  if (/cell cycle|mitosis|meiosis|pachytene|zygotene|diplotene|chiasmata|crossing over|metaphase|anaphase/i.test(searchStr)) {
    return [
      (id, topic, concept) => {
        return buildQuestion(
          id,
          `During which specific substage of Prophase I of Meiosis does crossing over (genetic recombination between homologous non-sister chromatids) take place?`,
          `Pachytene stage (mediated by enzyme Recombinase)`,
          [`Zygotene stage`, `Diplotene stage`, `Diakinesis stage`],
          `Crossing over occurs during the Pachytene stage of Prophase I of meiosis. It is an enzyme-mediated process catalyzed by Recombinase, forming recombination nodules.`,
          topic,
          concept
        );
      },
      (id, topic, concept) => {
        return buildQuestion(
          id,
          `The dissolution of the synaptonemal complex and the appearance of X-shaped chiasmata occurs in which substage of Prophase I?`,
          `Diplotene stage`,
          [`Pachytene stage`, `Zygotene stage`, `Leptotene stage`],
          `The beginning of Diplotene is marked by the dissolution of the synaptonemal complex. The homologous chromosomes separate from each other except at the sites of crossovers, where X-shaped chiasmata become visible.`,
          topic,
          concept
        );
      },
      (id, topic, concept) => {
        return buildQuestion(
          id,
          `During the S-phase (Synthesis phase) of the eukaryotic interphase cell cycle, what happens to the DNA content and chromosome number of the cell?`,
          `DNA content doubles (from 2C to 4C), but chromosome number remains unchanged (2n)`,
          [`Both DNA content and chromosome number double`, `Chromosome number doubles but DNA content remains 2C`, `DNA replication does not take place in S-phase`],
          `During S-phase, DNA replication doubles the amount of DNA per cell from 2C to 4C. However, the number of chromosomes remains unchanged (2n). Centriole duplication also occurs in the cytoplasm.`,
          topic,
          concept
        );
      },
      (id, topic, concept) => {
        return buildQuestion(
          id,
          `The stage of mitosis characterized by the alignment of chromosomes at the equatorial spindle plane (metaphase plate) is:`,
          `Metaphase`,
          [`Prophase`, `Anaphase`, `Telophase`],
          `In Metaphase, all chromosomes come to lie at the equator with one chromatid of each chromosome connected by its kinetochore to spindle fibers from one pole and sister chromatid to opposite pole.`,
          topic,
          concept
        );
      },
      (id, topic, concept) => {
        return buildQuestion(
          id,
          `Splitting of the centromere and movement of sister chromatids towards opposite poles is the defining hallmark of:`,
          `Anaphase`,
          [`Metaphase`, `Telophase`, `Prophase`],
          `During Anaphase, the centromere of each chromosome splits simultaneously, and the sister chromatids (now individual daughter chromosomes) migrate toward opposite spindle poles.`,
          topic,
          concept
        );
      },
    ];
  }

  // 3. Photosynthesis in Higher Plants
  if (/photosynth|calvin|rubisco|c4|kranz|light reaction|chemiosmo/i.test(searchStr)) {
    return [
      (id, topic, concept) => {
        return buildQuestion(
          id,
          `In C₄ plants (such as maize and sugarcane), the primary carbon dioxide fixation enzyme located in the mesophyll cells is:`,
          `PEP carboxylase (PEPcase)`,
          [`RuBisCO`, `Carbonic anhydrase`, `Pyruvate dehydrogenase`],
          `In C₄ plants, the primary CO₂ acceptor is phosphoenolpyruvate (PEP), catalyzed by PEP carboxylase in mesophyll cells to form oxaloacetic acid (OAA). RuBisCO operates downstream in bundle sheath cells.`,
          topic,
          concept
        );
      },
      (id, topic, concept) => {
        return buildQuestion(
          id,
          `The characteristic leaf anatomy of C₄ plants having large bundle sheath cells arranged in concentric wreaths around vascular bundles is called:`,
          `Kranz anatomy`,
          [`Mesomorphic anatomy`, `Xerophytic anatomy`, `Velamen anatomy`],
          `Kranz anatomy ('Kranz' meaning wreath) is characteristic of C₄ leaves, featuring specialized agranal chloroplast-rich bundle sheath cells that prevent photorespiration by concentrating CO₂ around RuBisCO.`,
          topic,
          concept
        );
      },
      (id, topic, concept) => {
        return buildQuestion(
          id,
          `Photolysis of water (splitting of water yielding oxygen, protons, and electrons) in the light reaction is associated with:`,
          `Photosystem II (PS II) on the inner side of thylakoid membrane`,
          [`Photosystem I (PS I) on outer stroma membrane`, `Cytochrome b₆f complex`, `ATP synthase CF₁ head`],
          `The water-splitting complex (Oxygen Evolving Complex containing Mn²⁺, Ca²⁺, Cl⁻) is physically located on the inner lumen side of the thylakoid membrane and is associated with Photosystem II (P680).`,
          topic,
          concept
        );
      },
      (id, topic, concept) => {
        return buildQuestion(
          id,
          `How many molecules of ATP and NADPH are consumed to fix one molecule of CO₂ in the Calvin (C₃) cycle?`,
          `3 ATP and 2 NADPH`,
          [`2 ATP and 2 NADPH`, `1 ATP and 1 NADPH`, `5 ATP and 3 NADPH`],
          `For each CO₂ molecule fixed in the Calvin cycle, 2 ATP and 2 NADPH are consumed in reduction, and 1 additional ATP is consumed in regeneration of RuBP, giving a total of 3 ATP and 2 NADPH per CO₂ fixed.`,
          topic,
          concept
        );
      },
    ];
  }

  // 4. Respiration in Plants
  if (/respiration.*plant|glycolysis|krebs|tca|electron transport|ets|respiratory quotient|rq/i.test(searchStr)) {
    return [
      (id, topic, concept) => {
        return buildQuestion(
          id,
          `What is the net gain of ATP molecules produced directly by substrate-level phosphorylation during glycolysis of one molecule of glucose?`,
          `2 ATP`,
          [`4 ATP`, `6 ATP`, `8 ATP`],
          `In glycolysis, 4 ATP molecules are synthesized by substrate-level phosphorylation while 2 ATP are consumed in preparatory phase. Net ATP yield = 4 - 2 = 2 ATP (plus 2 NADH).`,
          topic,
          concept
        );
      },
      (id, topic, concept) => {
        return buildQuestion(
          id,
          `The Respiratory Quotient (RQ = CO₂ evolved / O₂ consumed) for the aerobic respiration of tripalmitin (a typical fat) is:`,
          `0.7`,
          [`1.0`, `0.9`, `1.33`],
          `For fats (e.g. tripalmitin C₅₁H₉₈O₆), respiration requires more oxygen than the carbon dioxide released: 2(C₅₁H₉₈O₆) + 145 O₂ → 102 CO₂ + 98 H₂O. RQ = 102 / 145 ≈ 0.7.`,
          topic,
          concept
        );
      },
      (id, topic, concept) => {
        return buildQuestion(
          id,
          `In the mitochondrial Electron Transport System (ETS), Complex IV is known as:`,
          `Cytochrome c oxidase (contains cytochromes a and a₃ and two copper centers)`,
          [`NADH dehydrogenase`, `Succinate dehydrogenase`, `Cytochrome bc₁ complex`],
          `Complex IV refers to cytochrome c oxidase complex containing cytochromes a and a₃, and two copper centers, transferring electrons to final electron acceptor O₂ to form water.`,
          topic,
          concept
        );
      },
    ];
  }

  // 5. Plant Growth Regulators (Phytohormones)
  if (/auxin|gibberellin|cytokinin|ethylene|abscisic|aba|bolting|apical dominance/i.test(searchStr)) {
    return [
      (id, topic, concept) => {
        return buildQuestion(
          id,
          `Which plant growth regulator is primarily responsible for promoting apical dominance in growing shoot tips and used as a weedicide (2,4-D)?`,
          `Auxin`,
          [`Gibberellin`, `Cytokinin`, `Abscisic acid`],
          `Apical dominance is mediated by auxin synthesized at shoot tips. Synthetic auxin 2,4-D (2,4-dichlorophenoxyacetic acid) is widely used as a selective weedicide to eliminate dicot weeds in cereal lawns.`,
          topic,
          concept
        );
      },
      (id, topic, concept) => {
        return buildQuestion(
          id,
          `The phenomenon of 'bolting' (internode elongation just prior to flowering in rosette plants like beet and cabbage) is induced by application of:`,
          `Gibberellins (GA₃)`,
          [`Auxin`, `Ethylene`, `Cytokinin`],
          `Gibberellins stimulate extensive stem and internode elongation in rosette plants just before flowering, a process known as bolting.`,
          topic,
          concept
        );
      },
      (id, topic, concept) => {
        return buildQuestion(
          id,
          `Which phytohormone is commonly known as the plant 'stress hormone' because it induces rapid stomatal closure during water deficit?`,
          `Abscisic acid (ABA)`,
          [`Ethylene`, `Gibberellin`, `Auxin`],
          `Abscisic acid (ABA) functions as a stress hormone. Under water stress conditions, ABA stimulates rapid closure of stomata in leaves to prevent transpirational water loss.`,
          topic,
          concept
        );
      },
    ];
  }

  // 6. Human Physiology - Breathing, Circulation, Excretion
  if (/breathing|cardiac|ecg|nephron|excret|counter-current|henle|pct|heart|circulation/i.test(searchStr)) {
    return [
      (id, topic, concept) => {
        return buildQuestion(
          id,
          `In the human nephron, nearly 70-80% of electrolytes and water are reabsorbed in which specific tubular segment?`,
          `Proximal Convoluted Tubule (PCT)`,
          [`Loop of Henle (descending limb)`, `Distal Convoluted Tubule (DCT)`, `Collecting Duct`],
          `The Proximal Convoluted Tubule (PCT) is lined by simple cuboidal brush border epithelium that increases surface area, reabsorbing nearly 70-80% of electrolytes and water from the glomerular filtrate.`,
          topic,
          concept
        );
      },
      (id, topic, concept) => {
        return buildQuestion(
          id,
          `In a standard clinical Electrocardiogram (ECG), the QRS complex represents which electrical cardiac event?`,
          `Depolarisation of the ventricles`,
          [`Depolarisation of the atria`, `Repolarisation of the ventricles`, `Repolarisation of the atria`],
          `The P-wave represents atrial depolarisation; the QRS complex represents ventricular depolarisation (which initiates ventricular contraction); the T-wave represents ventricular repolarisation.`,
          topic,
          concept
        );
      },
      (id, topic, concept) => {
        return buildQuestion(
          id,
          `A rightward shift of the oxygen-hemoglobin dissociation curve (facilitating oxygen unloading to tissues) is promoted by:`,
          `High pCO₂, high H⁺ concentration (lower pH), and elevated temperature (Bohr effect)`,
          [`Low pCO₂ and high pH`, `High pO₂ and cold temperature`, `Decreased 2,3-BPG concentration`],
          `The Bohr effect causes a shift of the oxygen dissociation curve to the right when pCO₂ increases, pH decreases (acidosis), or temperature rises, decreasing hemoglobin's affinity for O₂ and promoting release to active tissues.`,
          topic,
          concept
        );
      },
      (id, topic, concept) => {
        return buildQuestion(
          id,
          `The counter-current mechanism responsible for maintaining high osmolarity in the inner medullary interstitium operates between:`,
          `Henle's loop and Vasa recta`,
          [`PCT and DCT`, `Glomerulus and Bowman's capsule`, `Collecting duct and Afferent arteriole`],
          `The proximity between Henle's loop and vasa recta and the counter-current flow of filtrate and blood maintain an increasing medullary interstitial osmolar gradient (from 300 to 1200 mOsm/L).`,
          topic,
          concept
        );
      },
    ];
  }

  // 7. Human Physiology - Locomotion & Neural Control
  if (/sarcomere|muscle|actin|myosin|joint|neuron|synapse|action potential|hormone|pituitary/i.test(searchStr)) {
    return [
      (id, topic, concept) => {
        return buildQuestion(
          id,
          `According to the sliding filament theory of skeletal muscle contraction, which of the following bands/zones shortens or disappears?`,
          `I-band shortens and H-zone disappears`,
          [`A-band shortens`, `Both A-band and I-band lengthen`, `Z-lines move farther apart`],
          `During contraction, thin actin filaments slide into the H-zone towards the M-line. The I-bands shorten, the H-zone disappears, while the A-band retains its constant length.`,
          topic,
          concept
        );
      },
      (id, topic, concept) => {
        return buildQuestion(
          id,
          `The resting axonal membrane is maintained in an electrically polarized state (-70 mV) primarily by the active operation of:`,
          `Sodium-potassium ATPase pump (pumping 3 Na⁺ out for every 2 K⁺ in)`,
          [`Passive diffusion of sodium ions inward`, `Voltage-gated calcium channels`, `Chloride ion influx`],
          `The resting membrane potential is actively maintained by the Na⁺/K⁺ ATPase pump, which transports 3 Na⁺ outward for every 2 K⁺ inward into the cell against concentration gradients.`,
          topic,
          concept
        );
      },
      (id, topic, concept) => {
        return buildQuestion(
          id,
          `Which two hormones are synthesized in the hypothalamic neurosecretory cells and transported axonally to be stored in the posterior pituitary (neurohypophysis)?`,
          `Oxytocin and Vasopressin (ADH)`,
          [`FSH and LH`, `ACTH and TSH`, `Prolactin and Growth hormone`],
          `Oxytocin and Vasopressin (antidiuretic hormone) are synthesized by the hypothalamus and transported via hypothalamic-hypophyseal tract to the posterior pituitary, which stores and releases them.`,
          topic,
          concept
        );
      },
    ];
  }

  // 8. Reproduction in Flowering Plants & Humans
  if (/embryo sac|fertilization|pollination|spermatogenesis|menstrual|ovulation|lh surge|contracept/i.test(searchStr)) {
    return [
      (id, topic, concept) => {
        return buildQuestion(
          id,
          `In typical angiosperms, double fertilization involves which two distinct nuclear fusion events?`,
          `Syngamy (male gamete + egg → 2n zygote) and Triple Fusion (male gamete + 2 polar nuclei → 3n PEN)`,
          [`Fusion of two male gametes with one egg`, `Fusion of two eggs with one synergid`, `Syngamy and Parthenogenesis`],
          `One male gamete fertilizes the egg cell (syngamy) to form diploid zygote; the second male gamete fuses with the diploid secondary nucleus (triple fusion) in the central cell to produce triploid Primary Endosperm Nucleus (PEN).`,
          topic,
          concept
        );
      },
      (id, topic, concept) => {
        return buildQuestion(
          id,
          `Ovulation in human females (release of secondary oocyte from Graafian follicle) is directly triggered around day 14 by a sharp peak in:`,
          `Luteinizing Hormone (LH surge)`,
          [`Progesterone`, `Follicle Stimulating Hormone (FSH) only`, `Human Chorionic Gonadotropin (hCG)`],
          `Rapid secretion of LH leading to its maximum level during the mid-cycle (called LH surge) induces rupture of the mature Graafian follicle and release of the ovum (ovulation).`,
          topic,
          concept
        );
      },
      (id, topic, concept) => {
        return buildQuestion(
          id,
          `The exine layer of a mature pollen grain is extremely resistant to biological and chemical degradation because it is composed of:`,
          `Sporopollenin`,
          [`Cellulose and Pectin`, `Lignin`, `Chitin`],
          `Sporopollenin is one of the most resistant organic biological materials known. It can withstand high temperatures, strong acids, and alkalis, and no known enzyme degrades it.`,
          topic,
          concept
        );
      },
      (id, topic, concept) => {
        return buildQuestion(
          id,
          `What is the primary contraceptive mechanism of copper-releasing Intrauterine Devices (e.g. CuT, Multiload 375)?`,
          `Cu²⁺ ions suppress sperm motility and fertilizing capacity`,
          [`Inhibit ovulation permanently`, `Block fallopian tubes surgically`, `Prevent implantation by destroying uterine endometrium`],
          `Cu²⁺ ions released by copper-bearing IUDs suppress sperm motility and the fertilizing capacity of spermatozoa, while also increasing phagocytosis of sperms within the uterus.`,
          topic,
          concept
        );
      },
    ];
  }

  // 9. Genetics & Molecular Basis of Inheritance
  if (/mendel|dihybrid|genetics|dna replication|meselson|lac operon|genetic code|pedigree/i.test(searchStr)) {
    return [
      (id, topic, concept) => {
        return buildQuestion(
          id,
          `In a Mendelian dihybrid cross between heterozygous round-yellow seeded plants (RrYy × RrYy), what is the expected phenotypic ratio among F₂ offspring?`,
          `9 : 3 : 3 : 1 (Round Yellow : Round Green : Wrinkled Yellow : Wrinkled Green)`,
          [`1 : 2 : 1 : 1`, `3 : 1 : 3 : 1`, `15 : 1`],
          `Independent assortment of two gene pairs in a dihybrid cross yields an F₂ phenotypic ratio of 9:3:3:1 based on the product of two monohybrid crosses (3:1) × (3:1).`,
          topic,
          concept
        );
      },
      (id, topic, concept) => {
        return buildQuestion(
          id,
          `Which classic experiment conclusively proved the semi-conservative replication of DNA using ¹⁵N and ¹⁴N heavy and light nitrogen isotopes in Escherichia coli?`,
          `Meselson and Stahl experiment (1958)`,
          [`Hershey and Chase experiment`, `Griffith transformation experiment`, `Avery, MacLeod, and McCarty experiment`],
          `Matthew Meselson and Franklin Stahl (1958) grew E. coli in ¹⁵NH₄Cl and demonstrated by CsCl density gradient centrifugation that each daughter DNA molecule conserves one parental strand and synthesizes one new strand.`,
          topic,
          concept
        );
      },
      (id, topic, concept) => {
        return buildQuestion(
          id,
          `In the Lac Operon of E. coli, lactose (or allolactose) functions as the:`,
          `Inducer that binds to the repressor protein, inactivating it`,
          [`Corepressor that binds to operator`, `Promoter activator`, `Enzyme inhibitor`],
          `Lactose acts as an inducer. It binds to the lac repressor protein, causing a conformational change that prevents the repressor from binding to the operator, allowing RNA polymerase to transcribe the lacZ, lacY, and lacA genes.`,
          topic,
          concept
        );
      },
      (id, topic, concept) => {
        return buildQuestion(
          id,
          `Which triplet codon acts dual-functionally as both the universal initiation codon for protein translation and codes for the amino acid Methionine?`,
          `AUG`,
          [`UAA`, `UAG`, `UGA`],
          `AUG has dual functions: it codes for Methionine (Met) and acts as the universal initiator codon for protein synthesis on mRNA. (UAA, UAG, and UGA are stop codons).`,
          topic,
          concept
        );
      },
    ];
  }

  // 10. Evolution & Ecology
  if (/evolution|hardy-weinberg|trophic|ecology|ecosystem|biodiversity|homologous/i.test(searchStr)) {
    return [
      (id, topic, concept) => {
        return buildQuestion(
          id,
          `According to the Hardy-Weinberg equilibrium principle, the binomial expansion representing genotype frequencies for a gene with two alleles (p and q) is:`,
          `p² + 2pq + q² = 1`,
          [`p + q = 2`, `p² + q² = 1`, `(p + q)² = 2`],
          `In a large, randomly mating population in the absence of evolutionary forces, allele frequencies remain constant: p + q = 1, and genotype frequencies are p² (homozygous dominant) + 2pq (heterozygous) + q² (homozygous recessive) = 1.`,
          topic,
          concept
        );
      },
      (id, topic, concept) => {
        return buildQuestion(
          id,
          `Thorns of Bougainvillea and tendrils of Cucurbita share the same basic anatomical origin (axillary buds) but perform different functions. They are classic examples of:`,
          `Homologous structures resulting from Divergent Evolution`,
          [`Analogous structures resulting from Convergent Evolution`, `Vestigial organs`, `Atavistic structures`],
          `Homologous organs share common anatomical origin and basic embryonic structure but perform different adaptations (divergent evolution), such as Bougainvillea thorns (defense) and Cucurbita tendrils (climbing support).`,
          topic,
          concept
        );
      },
      (id, topic, concept) => {
        return buildQuestion(
          id,
          `According to Lindeman's 10% law of energy transfer, if 20,000 J of energy is available at the primary producer (trophic level 1) level, how much energy will be transferred to the secondary carnivore (trophic level 4)?`,
          `20 J`,
          [`200 J`, `2 J`, `2,000 J`],
          `T1 (Producers) = 20,000 J → T2 (Herbivores) = 10% = 2,000 J → T3 (Primary carnivores) = 10% = 200 J → T4 (Secondary carnivores) = 10% = 20 J.`,
          topic,
          concept
        );
      },
    ];
  }

  // General Biology Fallback
  return [
    (id, topic, concept) => {
      return buildQuestion(
        id,
        `Which organelle is universally known as the 'Powerhouse of the Cell' because it generates the majority of cellular ATP via oxidative phosphorylation?`,
        `Mitochondria`,
        [`Chloroplast`, `Golgi Apparatus`, `Lysosome`],
        `Mitochondria are double-membraned semi-autonomous organelles where the Krebs cycle and oxidative phosphorylation take place, generating cellular ATP.`,
        topic,
        concept
      );
    },
    (id, topic, concept) => {
      return buildQuestion(
        id,
        `Which of the following nitrogenous bases is present exclusively in RNA and replaces Thymine found in DNA?`,
        `Uracil`,
        [`Cytosine`, `Guanine`, `Adenine`],
        `RNA contains Uracil (U) in place of Thymine (T). Both Uracil and Thymine are pyrimidines that pair with Adenine (A).`,
        topic,
        concept
      );
    },
  ];
}

module.exports = { getBiologyGenerators };
