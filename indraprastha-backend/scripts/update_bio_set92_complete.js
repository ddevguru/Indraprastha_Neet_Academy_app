const API_URL = 'https://api.indraprasthaneetacademy.com/api';

const questions = [
  {
    id: 389,
    similarQuestion: {
      question: "To meet the burgeoning global demand for nutrition and ensure food security, agricultural yields can be enhanced through which of the following recognized farming methodologies?",
      option_a: "Agrochemical-based agriculture utilizing chemical fertilizers and synthetic pesticides",
      option_b: "Genetically engineered crop-based agriculture utilizing recombinant DNA technology",
      option_c: "Organic agriculture utilizing biofertilizers, biopesticides, and crop rotation",
      option_d: "All of the above methodologies",
      correct_option: "D",
      explanation: "According to NCERT Biotechnology, global food production can be augmented primarily through three options: (1) Agrochemical-based conventional agriculture (Green Revolution approach with inorganic fertilizers and pesticides), (2) Organic agriculture (eco-friendly farming without synthetic inputs), and (3) Genetically engineered crop-based agriculture (recombinant crops engineered for pest resistance, abiotic stress tolerance, and enhanced nutritional quality). Therefore, all of these represent viable options. Therefore, Option (D) is the correct answer."
    }
  },
  {
    id: 390,
    similarQuestion: {
      question: "When naked plant cells devoid of cell walls (isolated using pectinase and cellulase enzymes) from two sexually incompatible plant varieties are fused together using polyethylene glycol (PEG), the resulting fusion product and the technique are respectively called:",
      option_a: "Embryoids and Micropropagation",
      option_b: "Cybrids and Anther culture",
      option_c: "Somatic hybrids and Somatic hybridisation",
      option_d: "Transgenic clones and Parthenocarpy",
      correct_option: "C",
      explanation: "The isolation of naked protoplasts by enzymatic digestion of cell walls followed by their fusion mediated by fusogens like polyethylene glycol (PEG) or electrofusion is termed somatic hybridisation. The resulting viable fusion cells containing genomes from two distinct varieties or species are called somatic hybrids (e.g., the 'Pomato' obtained from fusing potato and tomato protoplasts). Therefore, Option (C) is the correct answer."
    }
  },
  {
    id: 391,
    similarQuestion: {
      question: "In humans and other mammals, insulin is synthesized within pancreatic beta-cells as a dormant pro-hormone (pro-insulin). What structural peptide chains are present in this immature pro-insulin precursor?",
      option_a: "Chain A and Chain B linked only by hydrogen bonds",
      option_b: "Chain A and Chain C only",
      option_c: "Chain B and Chain C only",
      option_d: "Chain A, Chain B, and an extra connecting C-peptide",
      correct_option: "D",
      explanation: "Pro-insulin is an inactive precursor protein consisting of three distinct peptide segments: an A-chain (21 amino acids), a B-chain (30 amino acids), and an extra intervening segment known as the C-peptide (connecting peptide, 33 amino acids in humans). During maturation into functional bioactive insulin, the C-peptide is proteolytically cleaved and removed, leaving the A and B chains interconnected by two inter-chain disulfide bridges. Therefore, Option (D) is the correct answer."
    }
  },
  {
    id: 392,
    similarQuestion: {
      question: "In 1997, the first transgenic cow named 'Rosie' was produced to yield human protein-enriched milk (2.4 grams per liter). Which specific human protein was engineered into Rosie's milk, making it nutritionally more balanced for human babies than natural bovine milk?",
      option_a: "Human α-lactalbumin",
      option_b: "Human α-1-antitrypsin",
      option_c: "Human tissue plasminogen activator",
      option_d: "Human erythropoietin",
      correct_option: "A",
      explanation: "The transgenic cow Rosie was genetically modified to express the human gene coding for human α-lactalbumin in her mammary gland secretions. The resulting milk contained 2.4 grams of human protein per liter, featuring human α-lactalbumin, which provides essential amino acids and is much more nutritionally balanced and easily digestible for human infants compared to traditional cow milk. Therefore, Option (A) is the correct answer."
    }
  },
  {
    id: 393,
    similarQuestion: {
      question: "The Indian Parliament cleared an amendment to the Indian Patents Bill to prevent unauthorized exploitation of indigenous bio-resources and traditional medicinal knowledge (biopiracy). This legislative framework incorporates provisions for:",
      option_a: "Patent terms and emergency compulsory licensing provisions",
      option_b: "Safeguards for indigenous research initiatives",
      option_c: "National developmental initiatives and benefit-sharing mechanisms",
      option_d: "All of the above provisions",
      correct_option: "D",
      explanation: "The Indian Patents Bill (Second Amendment) was enacted by the Indian Parliament to address critical issues concerning patent terms, emergency provisions, research exemptions, and developmental initiatives. It empowers the nation to defend its sovereignty over indigenous biological heritage (such as traditional knowledge regarding turmeric, neem, and Basmati rice) against unauthorized foreign patenting (biopiracy). Therefore, all of these aspects are included. Therefore, Option (D) is the correct answer."
    }
  },
  {
    id: 394,
    similarQuestion: {
      question: "In molecular diagnostic techniques like Southern and Northern hybridization, a short single-stranded stretch of DNA or RNA tagged with a radioactive isotope or fluorescent marker that binds specifically to its complementary target sequence to detect genetic mutations or pathogen nucleic acid is known as a:",
      option_a: "Plasmid vector",
      option_b: "Molecular probe",
      option_c: "RNA primer",
      option_d: "Ribozyme",
      correct_option: "B",
      explanation: "A molecular probe is a defined single-stranded DNA or RNA oligonucleotide sequence that is labelled (tagged) with a radioisotope (such as ³²P) or a fluorophore. When exposed to a clone of cells on a nitrocellulose/nylon membrane, the probe hybridizes exclusively to its complementary DNA sequence. In autoradiography, mutated genes that lack complementarity to the probe fail to produce a photographic signal, thereby allowing rapid detection of mutations. Therefore, Option (B) is the correct answer."
    }
  },
  {
    id: 395,
    similarQuestion: {
      question: "Through recombinant DNA technology and plant genetic transformation, which of the following crop plants have been successfully developed as transgenic varieties exhibiting pest resistance, delayed ripening, or enhanced nutritional attributes?",
      option_a: "Golden Rice enriched with β-carotene",
      option_b: "Flavr Savr Tomato with delayed softening",
      option_c: "Bt Potato and Bt Cotton engineered for insect resistance",
      option_d: "All of the above crops",
      correct_option: "D",
      explanation: "Genetically modified (transgenic) varieties have been successfully engineered and commercialized across diverse crops: Golden Rice (transgenic rice producing provitamin A / β-carotene), Flavr Savr Tomato (engineered by antisense RNA technology to inhibit polygalacturonase and retard fruit softening), and Bt crops like Bt cotton, Bt corn, and Bt potato (expressing Bacillus thuringiensis Cry proteins for insect resistance). Therefore, all of these represent transgenic plants. Therefore, Option (D) is the correct answer."
    }
  },
  {
    id: 396,
    similarQuestion: {
      question: "Prior to recombinant DNA technology, therapeutic insulin was extracted from the slaughtered pancreas of cattle and pigs. Why is recombinant human insulin (Humulin) therapeutically superior and safer for diabetic patients?",
      option_a: "Animal insulin cannot be absorbed through subcutaneous injection",
      option_b: "Recombinant insulin is cheaper to synthesize chemically from basic inorganic elements",
      option_c: "Recombinant insulin does not provoke allergic or immune reactions because its amino acid sequence is identical to native human insulin",
      option_d: "Animal insulin lacks disulfide bonds between peptide chains",
      correct_option: "C",
      explanation: "Bovine and porcine insulins differ from human insulin by several amino acid residues (bovine insulin differs by three amino acids; porcine insulin differs by one amino acid in the B-chain). In chronic use, foreign animal proteins frequently trigger immunological sensitization, antibodies, and allergic responses in diabetic individuals. Recombinant human insulin (Humulin, first commercially produced by Eli Lilly in 1983) is identical in primary sequence to native human insulin, effectively eliminating allergic and immune complications. Therefore, Option (C) is the correct answer."
    }
  },
  {
    id: 397,
    similarQuestion: {
      question: "A root-knot nematode, Meloidogyne incognita, infects the roots of tobacco plants causing severe yield reduction. Which novel cellular defense mechanism involving sequence-specific post-transcriptional gene silencing was employed to generate nematode-resistant transgenic tobacco plants?",
      option_a: "DNA fingerprinting",
      option_b: "RNA interference (RNAi)",
      option_c: "Polymerase Chain Reaction (PCR)",
      option_d: "Site-directed mutagenesis",
      correct_option: "B",
      explanation: "RNA interference (RNAi) is a natural eukaryotic gene regulatory and cellular defense mechanism. Using Agrobacterium tumefaciens vectors, nematode-specific genes were introduced into the tobacco host such that both sense and antisense RNA strands were transcribed. These complementary RNAs annealed to form double-stranded RNA (dsRNA), which triggered the host's RNAi machinery (Dicer and RISC) to specifically cleave and silence the vital mRNA of the nematode Meloidogyne incognita upon ingestion, preventing the parasite from surviving. Therefore, Option (B) is the correct answer."
    }
  },
  {
    id: 398,
    similarQuestion: {
      question: "Transgenic animals are engineered to produce biologically active human proteins in their milk or tissues for therapeutic purposes. Which recombinant human protein produced by transgenic animals is clinically utilized to treat pulmonary emphysema?",
      option_a: "Human α-1-antitrypsin",
      option_b: "Human α-lactalbumin",
      option_c: "Human parathyroid hormone",
      option_d: "Human chorionic gonadotropin",
      correct_option: "A",
      explanation: "Emphysema is a chronic lung disease characterized by the breakdown of alveolar walls, often aggravated by the unrestrained enzymatic action of neutrophil elastase. The human protein α-1-antitrypsin inhibits elastase and prevents tissue damage. Transgenic animals (such as transgenic sheep) carrying the human gene for α-1-antitrypsin secrete this protein in their milk, which is harvested and purified for clinical replacement therapy in patients suffering from emphysema. Therefore, Option (A) is the correct answer."
    }
  },
  {
    id: 399,
    similarQuestion: {
      question: "Golden Rice (Oryza sativa) was genetically engineered by Ingo Potrykus and Peter Beyer to alleviate widespread micronutrient malnutrition in developing nations by fortifying the grain with high levels of which essential nutrient?",
      option_a: "Essential amino acid lysine",
      option_b: "Vitamin C (ascorbic acid)",
      option_c: "Iron and zinc chelates",
      option_d: "Provitamin A (β-carotene), a precursor of Vitamin A",
      correct_option: "D",
      explanation: "Golden Rice is a biofortified genetically engineered rice variety created by introducing phytoene synthase (psy) from daffodil/maize and carotene desaturase (crtI) from the bacterium Erwinia uredovora into the rice genome. This directs the biosynthetic pathway in the rice endosperm to produce β-carotene (provitamin A), giving the grains a golden-yellow hue. Consumption of Golden Rice helps overcome Vitamin A deficiency (night blindness and xerophthalmia). Therefore, Option (D) is the correct answer."
    }
  },
  {
    id: 400,
    similarQuestion: {
      question: "Adenosine deaminase (ADA) deficiency causes severe combined immunodeficiency (SCID). While periodic intravenous infusion of genetically modified lymphocytes or enzyme replacement therapy provides temporary relief, which procedure offers a permanent cure for this genetic disorder?",
      option_a: "Daily intramuscular injections of synthetic bovine ADA enzymes",
      option_b: "Lifelong administration of immunosuppressive drugs",
      option_c: "Introducing functional ADA cDNA via retroviral vectors into bone marrow stem cells at early embryonic stages",
      option_d: "Frequent blood transfusions from healthy donors",
      correct_option: "C",
      explanation: "In patients with ADA deficiency, mature lymphocytes have a limited lifespan, so infusions of genetically engineered lymphocytes must be repeated periodically. Enzyme replacement therapy also requires continuous lifelong administration. However, if the functional human ADA gene is introduced into hematopoietic stem cells or bone marrow cells at early embryonic stages, the corrected progenitor cells self-renew and continuously produce ADA throughout life, offering a permanent cure. Therefore, Option (C) is the correct answer."
    }
  },
  {
    id: 401,
    similarQuestion: {
      question: "The insecticidal Cry protein produced by Bacillus thuringiensis is harmless to the bacterium itself and to the transgenic crop plant expressing it, but it proves fatal to susceptible insect larvae. Why does this differential toxicity occur?",
      option_a: "The toxin is destroyed by plant vacuolar enzymes",
      option_b: "The toxin only binds to plant cellulose fibers",
      option_c: "The toxin remains inactive in neutral or acidic plant tissues and only dissolves and activates into toxic form in the alkaline pH of the insect midgut",
      option_d: "The toxin requires high temperature above 50°C to activate",
      correct_option: "C",
      explanation: "Bacillus thuringiensis produces crystal (Cry) proteins in the form of inactive, insoluble crystalline protoxins that do not damage the bacterium or plant tissues (which are neutral to slightly acidic). Once ingested by an insect, the alkaline pH (pH > 9.0) of the insect midgut solubilizes the crystal protein, and midgut proteases cleave it into its active toxic form. The active toxin binds to specific surface receptors on midgut epithelial cells, creating pores that cause cell swelling, lysis, and eventual death of the insect. Therefore, Option (C) is the correct answer."
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
      console.log(`[SUCCESS] Updated Set 92 Question ${q.id} (${success}/${questions.length})`);
    } else {
      const err = await res.text();
      console.error(`[ERROR] Question ${q.id}:`, err);
    }
  }
  console.log(`Set 92 Complete: ${success}/${questions.length} updated successfully.`);
}

main().catch(console.error);
