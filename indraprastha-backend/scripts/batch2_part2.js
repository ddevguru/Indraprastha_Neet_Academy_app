// Batch 2 Part 2: Test 73 (Respiration in Plants, 13 Qs) and Test 74 (Breathing and Exchange of Gases, 33 Qs)
// Total questions: 46

module.exports = [
  // --- TEST 73: Respiration in Plants (13 Questions: IDs 4317, 4423 to 4430, 4839 to 4842) ---
  {
    id: 4317,
    similarQuestion: {
      question: "The electron transport system (ETS) and ATP synthase (F₀-F₁ complexes) of aerobic cellular respiration are embedded in which specific mitochondrial compartment?",
      option_a: "Outer mitochondrial membrane",
      option_b: "Inner mitochondrial membrane (cristae)",
      option_c: "Intermembrane space",
      option_d: "Mitochondrial matrix",
      correct_option: "B",
      explanation: "Step 1: The mitochondrial electron transport chain (Complexes I to IV) and the ATP synthase (Complex V) are located within the inner mitochondrial membrane.\nStep 2: The infoldings of this membrane (cristae) provide a large surface area for these respiratory complexes.\nStep 3: Protons are pumped into the intermembrane space, creating a gradient across the inner membrane.\nTherefore, Option (B) is the correct answer."
    }
  },
  {
    id: 4423,
    similarQuestion: {
      question: "Which of the following respiratory enzyme complexes located in the inner mitochondrial membrane is NOT an electron carrier in the ETS?",
      option_a: "Complex I (NADH dehydrogenase)",
      option_b: "Complex III (Cytochrome bc₁ complex)",
      option_c: "Complex IV (Cytochrome c oxidase)",
      option_d: "Complex V (ATP synthase)",
      correct_option: "D",
      explanation: "Step 1: Complexes I, II, III, and IV of the mitochondrial inner membrane are electron transport complexes that transfer electrons to molecular oxygen.\nStep 2: Complex V is ATP synthase, which couples the dissipation of the proton electrochemical gradient to the phosphorylation of ADP to ATP.\nStep 3: Complex V does not transport electrons.\nTherefore, Option (D) is the correct answer."
    }
  },
  {
    id: 4424,
    similarQuestion: {
      question: "Which of the following statements regarding anaerobic respiration and fermentation is correct?",
      option_a: "Less than 7% of the total energy in glucose is released during fermentation",
      option_b: "Yeast cells tolerate alcohol concentrations up to 50% without toxicity",
      option_c: "Alcoholic fermentation produces 4 net ATP molecules per glucose molecule",
      option_d: "Lactic acid fermentation releases CO₂ gas",
      correct_option: "A",
      explanation: "Step 1: In fermentation (both alcoholic and lactic acid), glucose undergoes incomplete oxidation, releasing less than 7% of its total chemical energy.\nStep 2: Only 2 net ATP molecules are produced via substrate-level phosphorylation in glycolysis.\nStep 3: Yeast cells poison themselves to death when alcohol concentration reaches about 13%.\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 4425,
    similarQuestion: {
      question: "In mitochondrial aerobic respiration, the terminal electron acceptor that combines with protons to form metabolic water is:",
      option_a: "Cytochrome c",
      option_b: "Ubiquinone",
      option_c: "Molecular oxygen (O₂)",
      option_d: "NAD⁺",
      correct_option: "C",
      explanation: "Step 1: In the mitochondrial electron transport chain, electrons flow sequentially through Complexes I-IV.\nStep 2: Complex IV (cytochrome c oxidase) transfers electrons to the terminal electron acceptor, molecular oxygen (O₂).\nStep 3: Oxygen is reduced and binds with protons from the matrix to produce metabolic water: 1/2 O₂ + 2H⁺ + 2e⁻ → H₂O.\nTherefore, Option (C) is the correct answer."
    }
  },
  {
    id: 4426,
    similarQuestion: {
      question: "For every single turn of the Krebs cycle (citric acid cycle) oxidizing one molecule of Acetyl-CoA, the products formed include:",
      option_a: "3 NADH, 1 FADH₂, 1 GTP/ATP, and 2 CO₂",
      option_b: "2 NADH, 2 FADH₂, 2 ATP, and 1 CO₂",
      option_c: "1 NADH, 3 FADH₂, 2 GTP, and 4 CO₂",
      option_d: "4 NADH, 0 FADH₂, 1 ATP, and 3 CO₂",
      correct_option: "A",
      explanation: "Step 1: One molecule of Acetyl-CoA (2C) combines with Oxaloacetate (4C) to initiate the citric acid cycle.\nStep 2: During one complete turn, two decarboxylation steps release 2 CO₂.\nStep 3: Three oxidation steps reduce NAD⁺ to 3 NADH + 3H⁺, one oxidation step reduces FAD to 1 FADH₂, and one substrate-level phosphorylation produces 1 GTP (or ATP).\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 4427,
    similarQuestion: {
      question: "Complex IV of the mitochondrial electron transport chain is commonly known as cytochrome c oxidase. It contains:",
      option_a: "Cytochrome b and c₁ with one iron-sulfur center",
      option_b: "Cytochromes a and a₃, along with two copper centers (Cu_A and Cu_B)",
      option_c: "FMN and Fe-S complexes only",
      option_d: "FAD and succinate dehydrogenase",
      correct_option: "B",
      explanation: "Step 1: Complex IV (cytochrome c oxidase) catalyzes the transfer of electrons from reduced cytochrome c to molecular oxygen.\nStep 2: Its prosthetic groups comprise two heme moieties (cytochrome a and cytochrome a₃) and two copper centers.\nStep 3: This allows simultaneous multi-electron reduction of O₂ to H₂O.\nTherefore, Option (B) is the correct answer."
    }
  },
  {
    id: 4428,
    similarQuestion: {
      question: "In mitochondrial ATP synthase (Complex V), the catalytic headpiece that protrudes into the matrix and synthesizes ATP from ADP and inorganic phosphate is the:",
      option_a: "F₀ subunit",
      option_b: "F₁ headpiece",
      option_c: "Stator stalk",
      option_d: "Rotor ring",
      correct_option: "B",
      explanation: "Step 1: Complex V consists of two functional domains: F₀ and F₁.\nStep 2: F₀ is an integral membrane protein channel through which protons translocate across the inner mitochondrial membrane.\nStep 3: F₁ is a peripheral membrane protein complex projecting into the mitochondrial matrix that contains the catalytic sites for ATP synthesis from ADP and Pi.\nTherefore, Option (B) is the correct answer."
    }
  },
  {
    id: 4429,
    similarQuestion: {
      question: "Which divalent metal cation acts as an essential cofactor/activator for hexokinase, phosphofructokinase, and pyruvate kinase in glycolysis?",
      option_a: "Fe²⁺",
      option_b: "Mg²⁺",
      option_c: "Zn²⁺",
      option_d: "Cu²⁺",
      correct_option: "B",
      explanation: "Step 1: All kinase enzymes in glycolysis that involve ATP hydrolysis or ATP synthesis require magnesium ions (Mg²⁺) as an obligatory cofactor.\nStep 2: Mg²⁺ binds to ATP and ADP (forming Mg-ATP²⁻ complexes) to stabilize negative charges and facilitate nucleophilic attack by phosphate groups.\nTherefore, Option (B) is the correct answer."
    }
  },
  {
    id: 4430,
    similarQuestion: {
      question: "A small, soluble, mobile peripheral protein attached to the outer surface of the inner mitochondrial membrane that shuttles electrons between Complex III and Complex IV is:",
      option_a: "Plastoquinone",
      option_b: "Cytochrome c",
      option_c: "Ubiquinone",
      option_d: "Ferredoxin",
      correct_option: "B",
      explanation: "Step 1: Cytochrome c is a small, water-soluble peripheral hemeprotein attached loosely to the outer surface of the inner mitochondrial membrane.\nStep 2: It functions as a mobile electron carrier, accepting electrons one at a time from Complex III (cytochrome bc₁ complex) and transferring them to Complex IV (cytochrome c oxidase).\nTherefore, Option (B) is the correct answer."
    }
  },
  {
    id: 4839,
    similarQuestion: {
      question: "In the citric acid cycle (Krebs cycle), substrate-level phosphorylation occurs during the conversion of:",
      option_a: "Citric acid to Isocitric acid",
      option_b: "α-Ketoglutaric acid to Succinyl-CoA",
      option_c: "Succinyl-CoA to Succinic acid",
      option_d: "Fumaric acid to Malic acid",
      correct_option: "C",
      explanation: "Step 1: The cleavage of the high-energy thioester bond in succinyl-CoA is catalyzed by the enzyme succinyl-CoA synthetase.\nStep 2: This exergonic reaction is coupled with the direct phosphorylation of GDP to GTP (or ADP to ATP in plants).\nStep 3: This is the only substrate-level phosphorylation step in the citric acid cycle.\nTherefore, Option (C) is the correct answer."
    }
  },
  {
    id: 4840,
    similarQuestion: {
      question: "Which intermediate of the Krebs cycle acts as a crucial starting precursor for the biosynthesis of chlorophyll, heme, and cytochromes in living cells?",
      option_a: "Acetyl-CoA",
      option_b: "Succinyl-CoA",
      option_c: "Oxaloacetic acid",
      option_d: "Citric acid",
      correct_option: "B",
      explanation: "Step 1: Succinyl-CoA is an intermediate of the citric acid cycle that condenses with glycine to form δ-aminolevulinic acid (ALA).\nStep 2: ALA is the fundamental committed precursor for porphyrin ring synthesis, which forms the core of hemoglobin, myoglobin, cytochromes, and the chlorin ring of chlorophyll.\nStep 3: This exemplifies the amphibolic nature of the TCA cycle.\nTherefore, Option (B) is the correct answer."
    }
  },
  {
    id: 4841,
    similarQuestion: {
      question: "Cyanide (CN⁻) and carbon monoxide (CO) act as potent metabolic poisons by selectively binding to and inhibiting:",
      option_a: "Hexokinase in glycolysis",
      option_b: "Cytochrome c oxidase (Complex IV) in mitochondrial ETS",
      option_c: "Citrate synthase in Krebs cycle",
      option_d: "ATP synthase (Complex V)",
      correct_option: "B",
      explanation: "Step 1: Cyanide binds tightly to the ferric (Fe³⁺) ion within the heme of cytochrome a₃ in Complex IV (cytochrome c oxidase).\nStep 2: This halts the transfer of electrons from cytochrome a₃ to molecular oxygen, completely arresting cellular respiration and ATP synthesis.\nTherefore, Option (B) is the correct answer."
    }
  },
  {
    id: 4842,
    similarQuestion: {
      question: "Which enzyme of the Krebs cycle is unique because it is an integral membrane protein bound to the inner mitochondrial membrane rather than soluble in the matrix?",
      option_a: "Citrate synthase",
      option_b: "Isocitrate dehydrogenase",
      option_c: "Succinate dehydrogenase",
      option_d: "Malate dehydrogenase",
      correct_option: "C",
      explanation: "Step 1: All enzymes of the TCA cycle are dissolved in the mitochondrial matrix, with one notable exception.\nStep 2: Succinate dehydrogenase is an integral protein embedded in the inner mitochondrial membrane, where it functions simultaneously as Complex II of the electron transport chain.\nTherefore, Option (C) is the correct answer."
    }
  },

  // --- TEST 74: Breathing and Exchange of Gases (33 Questions: IDs 3680 to 3696, 4112 to 4118, 4315, 4367 to 4374) ---
  {
    id: 3680,
    similarQuestion: {
      question: "The maximum volume of air a person can breathe out after a forced inspiration is called:",
      option_a: "Tidal Volume (TV)",
      option_b: "Inspiratory Capacity (IC)",
      option_c: "Vital Capacity (VC)",
      option_d: "Functional Residual Capacity (FRC)",
      correct_option: "C",
      explanation: "Step 1: Vital Capacity (VC) is the maximum volume of air an individual can exhale after a maximum inspiratory effort.\nStep 2: It includes Inspiratory Reserve Volume (IRV), Tidal Volume (TV), and Expiratory Reserve Volume (ERV): VC = IRV + TV + ERV.\nStep 3: In a healthy adult, VC is roughly 4000 to 4600 mL.\nTherefore, Option (C) is the correct answer."
    }
  },
  {
    id: 3681,
    similarQuestion: {
      question: "In an accident, if a person's thoracic wall and pleural cavity are punctured without direct injury to any internal organ, the person dies quickly because:",
      option_a: "Blood coagulates in the aorta",
      option_b: "Negative intrapleural pressure is lost, causing lung collapse and cessation of breathing",
      option_c: "Heart valves rupture instantly",
      option_d: "Stomach enzymes enter the circulation",
      correct_option: "B",
      explanation: "Step 1: Normal pulmonary ventilation depends on subatmospheric (negative) intrapleural pressure between the parietal and visceral pleura.\nStep 2: If the thoracic cage or pleura is punctured, atmospheric air rushes into the pleural cavity (pneumothorax).\nStep 3: The loss of intrapleural suction causes the elastic lung to completely collapse (atelectasis), rendering respiration impossible.\nTherefore, Option (B) is the correct answer."
    }
  },
  {
    id: 3682,
    similarQuestion: {
      question: "What physiological adaptations occur in individuals permanently residing at high altitudes (e.g., above 3,500 meters)?",
      option_a: "Decreased erythrocyte count and decreased breathing rate",
      option_b: "Increased RBC production (polycythemia), increased breathing rate, and decreased binding affinity of hemoglobin",
      option_c: "Complete cessation of erythropoietin secretion",
      option_d: "Shift of oxygen dissociation curve to the left with decreased ventilation",
      correct_option: "B",
      explanation: "Step 1: At high altitudes, low atmospheric pO₂ induces hypoxemia, stimulating the kidneys to secrete erythropoietin (EPO).\nStep 2: This stimulates bone marrow to produce more red blood cells (polycythemia) and increases hemoglobin concentration.\nStep 3: Ventilation rate increases and higher levels of 2,3-BPG shift the oxygen dissociation curve to the right, facilitating O₂ delivery to tissues.\nTherefore, Option (B) is the correct answer."
    }
  },
  {
    id: 3683,
    similarQuestion: {
      question: "Which of the following statements correctly describes the transport of respiratory gases in human blood?",
      option_a: "RBCs transport only oxygen, whereas plasma transports only CO₂",
      option_b: "Both RBCs (hemoglobin) and blood plasma transport both O₂ and CO₂",
      option_c: "WBCs transport 97% of oxygen",
      option_d: "Platelets actively transport bicarbonate ions",
      correct_option: "B",
      explanation: "Step 1: Oxygen is transported by RBCs (approx. 97% as oxyhemoglobin) and dissolved in plasma (approx. 3%).\nStep 2: Carbon dioxide is transported dissolved in plasma (~7%), bound to RBC hemoglobin as carbaminohemoglobin (~20-25%), and as bicarbonate ions facilitated by RBC carbonic anhydrase (~70%).\nStep 3: Hence, both RBCs and plasma carry both gases.\nTherefore, Option (B) is the correct answer."
    }
  },
  {
    id: 3684,
    similarQuestion: {
      question: "How does pulmonary respiration in adult humans differ fundamentally from pulmonary respiration in adult frogs?",
      option_a: "Humans utilize negative pressure breathing driven by diaphragm and ribs, whereas frogs utilize positive pressure buccal pumping",
      option_b: "Frogs possess alveoli with extensive branching, whereas humans have sac-like lungs",
      option_c: "Humans breathe exclusively through skin",
      option_d: "Frogs possess a muscular diaphragm below their lungs",
      correct_option: "A",
      explanation: "Step 1: Humans employ negative pressure ventilation: contraction of the diaphragm and external intercostals expands thoracic volume, dropping alveolar pressure below atmospheric pressure to draw air in.\nStep 2: Frogs lack a diaphragm and ribs; they use positive pressure buccal pumping to force air down into the lungs.\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 3685,
    similarQuestion: {
      question: "Asphyxia is a life-threatening physiological condition resulting primarily from:",
      option_a: "Excessive oxygen saturation of arterial blood",
      option_b: "Simultaneous severe oxygen deficiency (hypoxia) and carbon dioxide retention (hypercapnia) in tissues",
      option_c: "Sudden drop in blood urea concentration",
      option_d: "Extreme increase in alveolar ventilation",
      correct_option: "B",
      explanation: "Step 1: Asphyxia occurs when pulmonary ventilation is obstructed or halted.\nStep 2: This leads simultaneously to lack of oxygen supply to the body tissues (hypoxia) and buildup of toxic levels of carbon dioxide (hypercapnia).\nStep 3: The accumulation of CO₂ and acidosis severely impairs brainstem respiratory centers.\nTherefore, Option (B) is the correct answer."
    }
  },
  {
    id: 3686,
    similarQuestion: {
      question: "Emphysema is a chronic respiratory disorder commonly caused by cigarette smoking. Its primary pathological feature is:",
      option_a: "Spasm of smooth muscles of bronchioles due to allergic release of histamine",
      option_b: "Permanent breakdown and destruction of alveolar septa, leading to reduced surface area for gas exchange",
      option_c: "Excessive accumulation of fluid in the pleural cavity",
      option_d: "Bacterial ulceration of tracheal cartilages",
      correct_option: "B",
      explanation: "Step 1: Emphysema is a chronic pulmonary disorder primarily induced by long-term cigarette smoking.\nStep 2: Proteolytic enzymes destroy the alveolar walls, leading to enlargement and loss of elasticity of air spaces.\nStep 3: This causes a dramatic reduction in the functional respiratory surface area available for gas exchange.\nTherefore, Option (B) is the correct answer."
    }
  },
  {
    id: 3687,
    similarQuestion: {
      question: "In the pulmonary capillaries, the association of oxygen with hemoglobin to form oxyhemoglobin is promoted by which set of conditions?",
      option_a: "High pO₂, low pCO₂, low H⁺ concentration (higher pH), and lower temperature",
      option_b: "Low pO₂, high pCO₂, high H⁺ concentration, and higher temperature",
      option_c: "High pCO₂, low pO₂, and high 2,3-BPG",
      option_d: "High temperature, low pH, and high pCO₂",
      correct_option: "A",
      explanation: "Step 1: In the alveoli, the incoming fresh air establishes high pO₂, low pCO₂, lower H⁺ concentration (alkaline pH), and relatively lower temperature.\nStep 2: These physiological parameters favor the binding of oxygen to deoxyhemoglobin to form oxyhemoglobin.\nStep 3: Opposite conditions in systemic tissues favor oxyhemoglobin dissociation.\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 3688,
    similarQuestion: {
      question: "A temporary restriction or reduction of oxygenated blood supply to a tissue or organ that weakens the cells without causing immediate cellular necrosis is called:",
      option_a: "Myocardial infarction",
      option_b: "Ischemia",
      option_c: "Embolism",
      option_d: "Aneurysm",
      correct_option: "B",
      explanation: "Step 1: Ischemia refers to an inadequate blood flow and oxygen delivery to a tissue due to mechanical obstruction or narrowing of arterial blood vessels.\nStep 2: If ischemia is brief and transient, cell function is impaired (hypoxia) without irreversible necrosis.\nStep 3: If severe and prolonged, ischemia leads to infarction (cell death).\nTherefore, Option (B) is the correct answer."
    }
  },
  {
    id: 3689,
    similarQuestion: {
      question: "Bohr's effect describes the physiological phenomenon where:",
      option_a: "An increase in pCO₂ or decrease in pH decreases hemoglobin's affinity for oxygen, shifting the dissociation curve to the right",
      option_b: "An increase in pO₂ shifts the CO₂ dissociation curve to the right",
      option_c: "Lower temperature decreases the P50 value of hemoglobin",
      option_d: "Chloride ions diffuse out of erythrocytes in systemic capillaries",
      correct_option: "A",
      explanation: "Step 1: Christian Bohr demonstrated that an elevation in blood pCO₂ and H⁺ ion concentration (acidity) stabilizes the T (tense) deoxygenated state of hemoglobin.\nStep 2: This lowers hemoglobin's affinity for oxygen and raises the P50, shifting the oxygen-hemoglobin dissociation curve to the right.\nStep 3: This promotes the unloading of oxygen in metabolically active, CO₂-producing tissues.\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 3690,
    similarQuestion: {
      question: "If the partial pressure of oxygen (pO₂) in systemic tissues was experimentally maintained as high as that in pulmonary alveoli (~104 mm Hg), what would happen?",
      option_a: "Hemoglobin would release more oxygen to the tissues",
      option_b: "Oxyhemoglobin would fail to dissociate, severely depriving tissues of unloaded oxygen",
      option_c: "Blood would completely cease to flow through systemic capillaries",
      option_d: "Carbonic anhydrase would become permanently inactivated",
      correct_option: "B",
      explanation: "Step 1: Oxyhemoglobin dissociation in tissues is driven by the steep partial pressure gradient (pO₂ is ~104 mm Hg in arterial blood vs ~40 mm Hg in tissues).\nStep 2: If tissue pO₂ equaled alveolar pO₂, no oxygen concentration gradient would exist to facilitate dissociation of O₂ from hemoglobin.\nStep 3: Hence, oxyhemoglobin would remain fully saturated and fail to deliver oxygen.\nTherefore, Option (B) is the correct answer."
    }
  },
  {
    id: 3691,
    similarQuestion: {
      question: "Human lungs contain approximately 300 million microscopic alveoli. This specialized structural arrangement primarily serves to:",
      option_a: "Store residual air to prevent lung collapse",
      option_b: "Provide an enormous total surface area (~70 to 100 m²) for rapid gaseous diffusion",
      option_c: "Humidify inspired air through mucociliary clearance",
      option_d: "Warm the incoming atmospheric air to body temperature",
      correct_option: "B",
      explanation: "Step 1: The presence of hundreds of millions of thin-walled, spherical alveoli vastly increases the surface-area-to-volume ratio of the lungs.\nStep 2: The total alveolar surface area available for diffusion of O₂ and CO₂ reaches roughly 70 to 100 square meters (equivalent to the size of a tennis court).\nTherefore, Option (B) is the correct answer."
    }
  },
  {
    id: 3692,
    similarQuestion: {
      question: "Assertion (A): Carbon dioxide transport occurs much faster through erythrocytes than through plasma.\nReason (R): Erythrocytes contain a high concentration of the zinc-containing enzyme carbonic anhydrase.",
      option_a: "Both A and R are true and R is the correct explanation of A",
      option_b: "Both A and R are true but R is not the correct explanation of A",
      option_c: "A is true but R is false",
      option_d: "Both A and R are false",
      correct_option: "A",
      explanation: "Step 1: Erythrocytes contain high concentrations of carbonic anhydrase, which accelerates the reversible hydration of CO₂ into carbonic acid (H₂CO₃) by roughly 5,000 times.\nStep 2: Plasma contains only minute traces of this enzyme.\nStep 3: As a result, the formation and breakdown of bicarbonate ions proceed with immense rapidity inside RBCs.\nStep 4: Both A and R are true, and R correctly explains A.\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 3693,
    similarQuestion: {
      question: "Asthma is characterized by bouts of coughing, chest tightness, and wheezing sounds during expiration, which are directly caused by:",
      option_a: "Destruction of alveolar walls by elastase",
      option_b: "Allergic inflammation and spastic contraction of bronchial and bronchiolar smooth muscles",
      option_c: "Accumulation of fibrous tissue in the upper respiratory tract",
      option_d: "Bacterial infection of pleural membranes",
      correct_option: "B",
      explanation: "Step 1: Asthma is an allergic inflammatory disorder of the lower respiratory tract.\nStep 2: Allergen exposure triggers mast cell degranulation, releasing histamine and leukotrienes.\nStep 3: This causes intense bronchospasm (spasm of smooth muscles around bronchioles) and mucosal edema, narrowing the airway lumens and producing characteristic wheezing.\nTherefore, Option (B) is the correct answer."
    }
  },
  {
    id: 3694,
    similarQuestion: {
      question: "Match the following pulmonary volumes with their typical resting adult values:\n(1) Tidal Volume (TV) - (i) 1100 to 1200 mL\n(2) Inspiratory Reserve Volume (IRV) - (ii) 500 mL\n(3) Residual Volume (RV) - (iii) 2500 to 3000 mL",
      option_a: "1-ii, 2-iii, 3-i",
      option_b: "1-i, 2-ii, 3-iii",
      option_c: "1-iii, 2-i, 3-ii",
      option_d: "1-ii, 2-i, 3-iii",
      correct_option: "A",
      explanation: "Step 1: Tidal Volume (TV) is approximately 500 mL under normal resting quiet respiration.\nStep 2: Inspiratory Reserve Volume (IRV) is the extra volume inspired forcefully, averaging 2500 to 3000 mL.\nStep 3: Residual Volume (RV) is the air remaining in lungs even after maximal expiration, averaging 1100 to 1200 mL.\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 3695,
    similarQuestion: {
      question: "In a healthy adult breathing at 12 breaths/minute with a tidal volume of 500 mL and an anatomical dead space of 150 mL, the alveolar ventilation is:",
      option_a: "6000 mL/min",
      option_b: "4200 mL/min",
      option_c: "1800 mL/min",
      option_d: "5000 mL/min",
      correct_option: "B",
      explanation: "Step 1: Total pulmonary ventilation = Tidal Volume × Respiratory Rate = 500 mL × 12 = 6000 mL/min.\nStep 2: Only air reaching the alveoli participates in gas exchange. Alveolar ventilation = (Tidal Volume - Anatomical Dead Space) × Respiratory Rate.\nStep 3: Alveolar ventilation = (500 mL - 150 mL) × 12 = 350 mL × 12 = 4200 mL/min.\nStep 4: Therefore, alveolar ventilation is always less than total pulmonary ventilation.\nTherefore, Option (B) is the correct answer."
    }
  },
  {
    id: 3696,
    similarQuestion: {
      question: "Blue baby syndrome (infantile methemoglobinemia) occurs when infants ingest drinking water contaminated with high levels of:",
      option_a: "Lead",
      option_b: "Nitrates (NO₃⁻)",
      option_c: "Fluorides",
      option_d: "Sulfates",
      correct_option: "B",
      explanation: "Step 1: High concentrations of nitrates in well drinking water are reduced by gut bacteria into nitrites (NO₂⁻).\nStep 2: Nitrites oxidize the ferrous (Fe²⁺) iron of hemoglobin into ferric (Fe³⁺) iron, forming methemoglobin.\nStep 3: Methemoglobin cannot bind oxygen, leading to tissue hypoxia, cyanosis, and the characteristic blue baby syndrome.\nTherefore, Option (B) is the correct answer."
    }
  },
  {
    id: 4112,
    similarQuestion: {
      question: "Which of the following occupational respiratory disorders results from prolonged inhalation of silica or asbestos dust in grinding and stone-breaking industries?",
      option_a: "Silicosis and asbestosis, characterized by chronic lung fibrosis and proliferation of fibrous connective tissue",
      option_b: "Emphysema with destruction of alveolar walls",
      option_c: "Allergic asthma with reversible bronchospasm",
      option_d: "Acute viral pneumonia",
      correct_option: "A",
      explanation: "Step 1: Occupational lung disorders arise in workers engaged in mining, stone grinding, and stone-crushing operations.\nStep 2: Chronic inhalation of crystalline silica or asbestos fibers cannot be fully cleared by macrophages.\nStep 3: This causes persistent inflammatory reactions leading to extensive fibrosis (fibrous tissue proliferation) and irreversible lung damage.\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 4113,
    similarQuestion: {
      question: "Which of the following represents the correct sequential pathway of inhaled air entering the human respiratory system?",
      option_a: "External nostrils → Nasal cavity → Pharynx → Larynx → Trachea → Bronchi → Bronchioles → Alveoli",
      option_b: "Nostrils → Larynx → Pharynx → Trachea → Alveoli → Bronchi",
      option_c: "External nostrils → Pharynx → Trachea → Larynx → Bronchioles → Alveoli",
      option_d: "Nasal cavity → Bronchi → Larynx → Trachea → Alveoli",
      correct_option: "A",
      explanation: "Step 1: Atmospheric air enters via external nostrils into the nasal chamber/cavity.\nStep 2: It passes through the pharynx (common passage for food and air) and glottis into the larynx (sound box).\nStep 3: From larynx it descends through the trachea, which bifurcates into primary bronchi, secondary/tertiary bronchi, terminal bronchioles, and terminates in alveolar sacs.\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 4114,
    similarQuestion: {
      question: "Consider the following statements regarding the mechanism of breathing:\nStatement I: Inspiration is initiated by relaxation of the diaphragm and external intercostal muscles.\nStatement II: Normal expiration is an active process requiring forceful contraction of abdominal muscles.",
      option_a: "Both Statement I and Statement II are incorrect",
      option_b: "Statement I is correct but Statement II is incorrect",
      option_c: "Statement I is incorrect but Statement II is correct",
      option_d: "Both Statement I and Statement II are correct",
      correct_option: "A",
      explanation: "Step 1: Inspiration is initiated by the contraction (not relaxation) of the diaphragm and external intercostal muscles.\nStep 2: Normal quiet expiration is a passive process resulting from the elastic recoil of the lungs and relaxation of inspiratory muscles.\nStep 3: Hence, both Statement I and Statement II are completely incorrect.\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 4115,
    similarQuestion: {
      question: "During normal quiet inspiration in humans, contraction of the external intercostal muscles causes:",
      option_a: "Inward and downward movement of the ribcage",
      option_b: "Lifting up of the ribs and sternum, increasing thoracic volume in the dorso-ventral axis",
      option_c: "Downward flattening of the diaphragm",
      option_d: "A decrease in intrapleural volume",
      correct_option: "B",
      explanation: "Step 1: Contraction of the external intercostal muscles elevates the ribs and sternum upward and outward.\nStep 2: This expands the thoracic cage in the dorso-ventral axis.\nStep 3: Simultaneously, contraction of the diaphragm flattens it, increasing the thoracic volume in the antero-posterior axis.\nTherefore, Option (B) is the correct answer."
    }
  },
  {
    id: 4116,
    similarQuestion: {
      question: "The human trachea is a straight tube extending down the mid-thoracic cavity that divides at the level of which thoracic vertebra?",
      option_a: "3rd thoracic vertebra",
      option_b: "5th thoracic vertebra",
      option_c: "7th thoracic vertebra",
      option_d: "12th thoracic vertebra",
      correct_option: "B",
      explanation: "Step 1: The trachea is supported by incomplete C-shaped cartilaginous rings.\nStep 2: It extends down to the mid-thoracic cavity and divides at the level of the 5th thoracic vertebra (T5) into right and left primary bronchi.\nTherefore, Option (B) is the correct answer."
    }
  },
  {
    id: 4117,
    similarQuestion: {
      question: "The respiratory rhythm center in the medulla oblongata is primarily modulated by the pneumotaxic center located in the:",
      option_a: "Cerebellum",
      option_b: "Pons region of the brainstem",
      option_c: "Corpus callosum",
      option_d: "Spinal cord",
      correct_option: "B",
      explanation: "Step 1: The primary respiratory rhythm center is located in the medulla oblongata.\nStep 2: Another specialized center called the pneumotaxic center is present in the pons region of the hindbrain.\nStep 3: Neural signals from the pneumotaxic center reduce the duration of inspiration, thereby altering the respiratory rate.\nTherefore, Option (B) is the correct answer."
    }
  },
  {
    id: 4118,
    similarQuestion: {
      question: "Arrange the following pulmonary lung volumes in increasing order of magnitude:\n(1) Tidal Volume (TV)\n(2) Expiratory Reserve Volume (ERV)\n(3) Residual Volume (RV)\n(4) Vital Capacity (VC)",
      option_a: "TV < ERV < RV < VC",
      option_b: "TV < RV < ERV < VC",
      option_c: "ERV < TV < RV < VC",
      option_d: "VC < RV < ERV < TV",
      correct_option: "A",
      explanation: "Step 1: Typical values for these lung volumes in a healthy adult are:\n- Tidal Volume (TV) ≈ 500 mL\n- Expiratory Reserve Volume (ERV) ≈ 1000 to 1100 mL\n- Residual Volume (RV) ≈ 1100 to 1200 mL\n- Vital Capacity (VC) ≈ 4000 to 4600 mL\nStep 2: Therefore, the correct ascending order is TV < ERV < RV < VC.\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 4315,
    similarQuestion: {
      question: "Arrange the chronological sequence of events occurring during expiration:\n(1) Relaxation of diaphragm and external intercostal muscles\n(2) Reduction in thoracic and pulmonary volume\n(3) Intrapulmonary pressure rises slightly above atmospheric pressure\n(4) Expulsion of air from lungs to exterior",
      option_a: "1 → 2 → 3 → 4",
      option_b: "2 → 1 → 3 → 4",
      option_c: "3 → 2 → 1 → 4",
      option_d: "1 → 3 → 2 → 4",
      correct_option: "A",
      explanation: "Step 1: Expiration begins when the diaphragm and external intercostal muscles relax, returning the diaphragm to its dome shape and the sternum to its resting position.\nStep 2: This reduces thoracic cavity and pulmonary volume.\nStep 3: According to Boyle's law, decreased lung volume increases intrapulmonary pressure above atmospheric level.\nStep 4: Air flows down this pressure gradient out of the lungs.\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 4367,
    similarQuestion: {
      question: "During inspiration, the contraction and flattening of the diaphragm increases the volume of the thoracic cavity in the:",
      option_a: "Dorso-ventral axis",
      option_b: "Antero-posterior axis",
      option_c: "Lateral axis only",
      option_d: "Horizontal transverse axis only",
      correct_option: "B",
      explanation: "Step 1: At rest, the relaxed diaphragm is dome-shaped, bulging upward into the thoracic cage.\nStep 2: Upon contraction, the muscle fibers pull the central tendon downward, flattening the diaphragm toward the abdomen.\nStep 3: This expands the vertical height of the thoracic cavity, increasing thoracic volume in the antero-posterior axis.\nTherefore, Option (B) is the correct answer."
    }
  },
  {
    id: 4368,
    similarQuestion: {
      question: "Consider the following statements regarding respiratory disorders:\nStatement I: Cigarette smoking is the most significant predisposing factor for emphysema.\nStatement II: Wheezing sound in bronchial asthma is produced by inflammation and narrowing of bronchi and bronchioles.",
      option_a: "Both Statement I and Statement II are true",
      option_b: "Both Statement I and Statement II are false",
      option_c: "Statement I is true but Statement II is false",
      option_d: "Statement I is false but Statement II is true",
      correct_option: "A",
      explanation: "Step 1: Statement I is true: Chronic cigarette smoking damages alveolar septa and elastic fibers, serving as the leading cause of emphysema.\nStep 2: Statement II is true: Asthma is characterized by allergic inflammation and spasms of bronchi and bronchioles, causing characteristic whistling or wheezing sounds during breathing.\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 4369,
    similarQuestion: {
      question: "The oxygen-hemoglobin dissociation curve exhibits a characteristic sigmoid (S-shaped) shape because of:",
      option_a: "Invariable affinity of hemoglobin for oxygen at all partial pressures",
      option_b: "Positive cooperativity in oxygen binding to the four heme subunits of hemoglobin",
      option_c: "Competitive inhibition by blood nitrogen",
      option_d: "Direct covalent bonding of CO₂ to heme iron",
      correct_option: "B",
      explanation: "Step 1: Hemoglobin is a tetramer of four globin subunits, each containing a heme group.\nStep 2: Binding of the first O₂ molecule induces a conformational change (from T to R state) that enhances the affinity of remaining subunits for oxygen (positive cooperativity).\nStep 3: This cooperative binding generates the classic sigmoid oxygen dissociation curve.\nTherefore, Option (B) is the correct answer."
    }
  },
  {
    id: 4370,
    similarQuestion: {
      question: "Assertion (A): Approximately 20 to 25 percent of carbon dioxide is transported bound to hemoglobin as carbaminohemoglobin.\nReason (R): This binding is favored in tissues where pCO₂ is high and pO₂ is relatively low.",
      option_a: "Both A and R are true and R is the correct explanation of A",
      option_b: "Both A and R are true but R is not the correct explanation of A",
      option_c: "A is true but R is false",
      option_d: "Both A and R are false",
      correct_option: "A",
      explanation: "Step 1: Carbon dioxide combines directly with free amino groups of globin polypeptide chains to form carbaminohemoglobin (HbCO₂).\nStep 2: In systemic tissues, high pCO₂ and low pO₂ promote the binding of CO₂ to hemoglobin.\nStep 3: In alveoli, where pO₂ is high and pCO₂ is low, CO₂ dissociates from carbaminohemoglobin.\nStep 4: Both A and R are true, and R correctly explains A.\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 4371,
    similarQuestion: {
      question: "Which of the following represents the correct logical sequence of respiratory steps in human physiology?",
      option_a: "Pulmonary ventilation → Alveolar gas diffusion → Blood gas transport → Tissue gas diffusion → Cellular O₂ utilization",
      option_b: "Tissue diffusion → Pulmonary ventilation → Cellular respiration → Alveolar diffusion",
      option_c: "Blood gas transport → Cellular respiration → Alveolar diffusion → Pulmonary ventilation",
      option_d: "Cellular O₂ utilization → Tissue gas diffusion → Pulmonary ventilation → Blood gas transport",
      correct_option: "A",
      explanation: "Step 1: Pulmonary ventilation draws atmospheric air into alveoli and expels CO₂.\nStep 2: O₂ and CO₂ diffuse across the alveolar-capillary membrane.\nStep 3: Gases are transported throughout the body via systemic blood circulation.\nStep 4: Diffusion occurs between systemic capillaries and metabolically active tissues.\nStep 5: O₂ is utilized by cells for catabolic energy production with concomitant CO₂ generation.\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 4372,
    similarQuestion: {
      question: "The thin cartilaginous flap that folds down over the glottis during swallowing to prevent food and liquids from entering the larynx is the:",
      option_a: "Thyroid cartilage",
      option_b: "Epiglottis",
      option_c: "Cricoid cartilage",
      option_d: "Vocal cord",
      correct_option: "B",
      explanation: "Step 1: The glottis is the opening of the larynx.\nStep 2: It is guarded by a thin, flexible, leaf-shaped elastic cartilaginous flap termed the epiglottis.\nStep 3: During deglutition (swallowing), the larynx elevates and the epiglottis covers the glottis to prevent food from entering the trachea.\nTherefore, Option (B) is the correct answer."
    }
  },
  {
    id: 4373,
    similarQuestion: {
      question: "The partial pressure of oxygen (pO₂) in human systemic arterial blood and systemic venous (deoxygenated) blood is approximately:",
      option_a: "95 mm Hg and 40 mm Hg respectively",
      option_b: "104 mm Hg and 159 mm Hg respectively",
      option_c: "40 mm Hg and 45 mm Hg respectively",
      option_d: "45 mm Hg and 95 mm Hg respectively",
      correct_option: "A",
      explanation: "Step 1: According to NCERT respiratory partial pressures table:\n- Alveolar pO₂ = 104 mm Hg\n- Oxygenated (arterial) blood pO₂ = 95 mm Hg\n- Deoxygenated (venous) blood pO₂ = 40 mm Hg\n- Tissue pO₂ = 40 mm Hg\nStep 2: Therefore, arterial blood has pO₂ of 95 mm Hg and venous blood has pO₂ of 40 mm Hg.\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 4374,
    similarQuestion: {
      question: "The diffusion membrane through which respiratory gases exchange between alveoli and pulmonary blood consists of three microscopic layers. These are:",
      option_a: "Squamous epithelium of alveoli, endothelium of alveolar capillaries, and intervening basement substance",
      option_b: "Ciliated columnar epithelium, goblet cells, and submucosa",
      option_c: "Pleural membrane, perichondrium, and alveolar lamina",
      option_d: "Cuboidal epithelium, muscularis mucosae, and serosa",
      correct_option: "A",
      explanation: "Step 1: The respiratory diffusion membrane is extremely thin (total thickness less than 1 mm, roughly 0.2 to 0.5 μm).\nStep 2: It consists of: (1) thin simple squamous epithelium of the alveoli, (2) single-cell layered endothelium of the pulmonary capillaries, and (3) the thin intervening basement substance between them.\nTherefore, Option (A) is the correct answer."
    }
  }
];
