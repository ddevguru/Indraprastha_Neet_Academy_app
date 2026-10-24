const API_URL = 'https://api.indraprasthaneetacademy.com/api';

const questions = [
  {
    id: 107,
    similarQuestion: {
      question: "The physiological terms 'ammonotelic', 'ureotelic', and 'uricotelic' classify animals based primarily on:",
      option_a: "The developmental embryonic origin of the metanephric kidneys",
      option_b: "The principal chemical form of nitrogenous metabolic waste excreted from their bodies",
      option_c: "The total rate of glomerular filtration across renal nephrons",
      option_d: "The hormonal sensitivity of renal collecting ducts to aldosterone",
      correct_option: "B",
      explanation: "Animals are categorized physiologically into ammonotelic, ureotelic, and uricotelic based on the primary nitrogenous waste product they eliminate from protein catabolism: ammonotelic animals excrete toxic ammonia (requiring abundant water, e.g., aquatic invertebrates, bony fishes), ureotelic animals excrete urea (requiring moderate water, e.g., mammals, terrestrial amphibians), and uricotelic animals excrete insoluble uric acid paste/pellets (requiring minimal water, e.g., reptiles, birds, land snails). Therefore, Option (B) is the correct answer."
    }
  },
  {
    id: 108,
    similarQuestion: {
      question: "Arrange the three primary nitrogenous excretory end-products in descending order of their physiological toxicity and relative requirement of water for excretion (from highest toxicity / water requirement to lowest):",
      option_a: "Uric acid > Urea > Ammonia",
      option_b: "Ammonia > Urea > Uric acid",
      option_c: "Urea > Ammonia > Uric acid",
      option_d: "Ammonia > Uric acid > Urea",
      correct_option: "B",
      explanation: "Ammonia is the most toxic nitrogenous excretory product and requires large volumes of water for safe elimination via simple diffusion. Urea is significantly less toxic (about 100,000 times less toxic than ammonia) and requires moderate amounts of water for excretion. Uric acid is the least toxic and almost insoluble in water, allowing it to be excreted as a semi-solid paste or pellet with minimal water loss (an essential adaptation for terrestrial water conservation). Thus, the descending order is Ammonia > Urea > Uric acid. Therefore, Option (B) is the correct answer."
    }
  },
  {
    id: 109,
    similarQuestion: {
      question: "On the medial concave margin of the human bean-shaped kidney, there is a deep longitudinal notch through which the renal artery, renal vein, lymphatic vessels, nerves, and ureter enter or exit. This anatomical gateway is known as the:",
      option_a: "Renal capsule",
      option_b: "Renal hilum (hilus)",
      option_c: "Renal papilla",
      option_d: "Major calyx",
      correct_option: "B",
      explanation: "Towards the center of the inner concave border of each human kidney is a notch called the hilum (or hilus). The hilum serves as the structural entrance and exit gateway for the renal artery, renal vein, nerves, lymphatic vessels, and the expanded funnel-shaped renal pelvis of the ureter. Inner to the hilum is a broad funnel-shaped space called the renal pelvis with projections called calyces. Therefore, Option (B) is the correct answer."
    }
  },
  {
    id: 110,
    similarQuestion: {
      question: "A nephron consists of a renal corpuscle and a long renal tubule. Which of the following nephron segments dips deep into the renal medulla, while the remaining tubular components reside within the renal cortex?",
      option_a: "Bowman's capsule",
      option_b: "Proximal Convoluted Tubule (PCT)",
      option_c: "Henle's loop (hairpin loop)",
      option_d: "Distal Convoluted Tubule (DCT)",
      correct_option: "C",
      explanation: "In both cortical and juxtamedullary nephrons, the Malpighian body (glomerulus and Bowman's capsule), the Proximal Convoluted Tubule (PCT), and the Distal Convoluted Tubule (DCT) are situated in the outer renal cortex. In contrast, the hairpin-shaped Loop of Henle dips down into the inner renal medulla (dipping very deeply in juxtamedullary nephrons to establish the hyperosmotic gradient). Therefore, Option (C) is the correct answer."
    }
  },
  {
    id: 205,
    similarQuestion: {
      question: "Regarding the gross anatomy and topography of the human urinary system, which of the following statements is incorrect?",
      option_a: "The kidneys are retroperitoneal organs located between the levels of the 12th thoracic (T12) and 3rd lumbar (L3) vertebrae",
      option_b: "The right kidney is positioned slightly lower than the left kidney due to the anatomical crowding of the substantial right lobe of the liver",
      option_c: "The right kidney is positioned at a significantly higher anatomical level than the left kidney",
      option_d: "Each kidney is enveloped by an outer fibrous renal capsule and measures roughly 10-12 cm in length and 5-7 cm in width",
      correct_option: "C",
      explanation: "Because the large right lobe of the liver occupies substantial space in the right hypochondriac region of the abdominal cavity, the right kidney is pushed slightly downwards, positioning it slightly lower than the left kidney (not higher). Statements (A), (B), and (D) are all accurate anatomical descriptions based on NCERT. Therefore, Option (C) is the incorrect statement. Therefore, Option (C) is the correct answer."
    }
  },
  {
    id: 206,
    similarQuestion: {
      question: "Which of the following correctly traces the physiological flow of glomerular filtrate/tubular fluid through the sequential segments of a nephron towards the renal pelvis?",
      option_a: "Bowman's capsule → Proximal Convoluted Tubule (PCT) → Descending limb of Henle's loop → Ascending limb of Henle's loop → Distal Convoluted Tubule (DCT) → Collecting duct",
      option_b: "Bowman's capsule → Ascending limb of Henle's loop → Descending limb of Henle's loop → PCT → DCT → Collecting duct",
      option_c: "Bowman's capsule → DCT → Ascending limb of Henle's loop → Descending limb of Henle's loop → PCT → Collecting duct",
      option_d: "PCT → DCT → Descending limb of Henle's loop → Ascending limb of Henle's loop → Bowman's capsule",
      correct_option: "A",
      explanation: "Filtration occurs across the glomerular membrane into the lumen of Bowman's capsule. The tubular fluid then flows through the nephron in the following exact sequence: Bowman's capsule → Proximal Convoluted Tubule (PCT) → Descending limb of Henle's loop → Hairpin bend → Ascending limb of Henle's loop → Distal Convoluted Tubule (DCT) → Collecting duct → Duct of Bellini → Renal papilla → Calyces → Renal pelvis. Therefore, Option (A) is the correct answer."
    }
  },
  {
    id: 207,
    similarQuestion: {
      question: "Ultrafiltration of blood during urine formation occurs across the glomerular filtration barrier. How many histological tissue layers constitute this filtration membrane, and what are they?",
      option_a: "1 layer: single layer of continuous capillary endothelium",
      option_b: "2 layers: capillary endothelium and basement membrane only",
      option_c: "3 layers: capillary endothelium, non-cellular basement membrane, and visceral podocyte epithelium with filtration slits",
      option_d: "4 layers: endothelium, tunica media, elastic lamina, and parietal capsule",
      correct_option: "C",
      explanation: "The glomerular filtration membrane comprises three distinct histological barriers through which blood is filtered under hydrostatic pressure: (1) The fenestrated endothelium of glomerular capillary blood vessels, (2) The acellular basement membrane separating the layers, and (3) The visceral layer of Bowman's capsule formed by specialized cells called podocytes, whose foot processes interdigitate to form minute spaces called filtration slits or slit pores. Therefore, it comprises exactly 3 layers. Therefore, Option (C) is the correct answer."
    }
  },
  {
    id: 208,
    similarQuestion: {
      question: "In the medullary counter-current multiplier and exchanger system of mammalian kidneys, how do the hairpin-shaped vasa recta vessels help preserve the hyperosmotic medullary gradient?",
      option_a: "The descending limb of vasa recta absorbs water and secretes NaCl into the cortex",
      option_b: "The descending limb of vasa recta absorbs NaCl from the medullary interstitium, and the ascending limb returns NaCl back into the medullary interstitium while reabsorbing water",
      option_c: "Vasa recta actively pumps urea into the collecting ducts against a chemical gradient",
      option_d: "Vasa recta prevents blood flow from entering the renal medulla entirely",
      correct_option: "B",
      explanation: "The vasa recta maintains the medullary osmotic gradient via passive counter-current exchange. As blood flows down the descending limb of the vasa recta into the hyperosmotic inner medulla, it loses water by osmosis and gains NaCl and urea by diffusion. As blood ascends back up the ascending limb towards the cortex, it diffuses NaCl and urea back out into the medullary interstitium and reabsorbs water. This ensures that solute is trapped in the medulla and not washed away by the circulation. Therefore, Option (B) is the correct answer."
    }
  },
  {
    id: 209,
    similarQuestion: {
      question: "The homeostatic regulation of kidney function, glomerular filtration rate (GFR), and systemic blood volume is orchestrated by coordinated neuroendocrine feedback loops involving which three anatomical structures?",
      option_a: "Thyroid gland, Pancreas, and Spleen",
      option_b: "Hypothalamus (via ADH), Juxtaglomerular Apparatus (via Renin), and Heart (via ANF)",
      option_c: "Adrenal medulla, Parathyroid gland, and Liver",
      option_d: "Thymus, Pineal gland, and Anterior pituitary",
      correct_option: "B",
      explanation: "According to NCERT, the regulation of kidney function involves three primary feedback systems: (1) The Hypothalamus, which uses osmoreceptors to trigger the release of Antidiuretic Hormone (ADH / vasopressin) from the neurohypophysis to promote water reabsorption; (2) The Juxtaglomerular Apparatus (JGA), which operates the Renin-Angiotensin-Aldosterone System (RAAS) to increase blood pressure and GFR; and (3) The Heart, which releases Atrial Natriuretic Factor (ANF) from atrial walls in response to high blood volume, counteracting RAAS through vasodilation and natriuresis. Therefore, Option (B) is the correct answer."
    }
  },
  {
    id: 210,
    similarQuestion: {
      question: "Regarding the physiological regulation of blood pressure and renal hemodynamics by Atrial Natriuretic Factor (ANF), which of the following statements is incorrect?",
      option_a: "An increase in blood flow and atrial stretch triggers the secretion of ANF from cardiac atrial walls",
      option_b: "ANF causes powerful systemic vasoconstriction, leading to a marked rise in arterial blood pressure",
      option_c: "ANF promotes vasodilation of blood vessels, thereby reducing systemic arterial blood pressure",
      option_d: "ANF functions as an antagonistic natural check on the Renin-Angiotensin-Aldosterone System (RAAS)",
      correct_option: "B",
      explanation: "Atrial Natriuretic Factor (ANF) is a peptide hormone secreted by the atria of the heart when atrial wall tension rises due to elevated venous return/blood volume. ANF acts as a potent vasodilator (not a vasoconstrictor), dilating vascular smooth muscle to reduce systemic vascular resistance and arterial blood pressure. Furthermore, it inhibits renin and aldosterone secretion, facilitating excretion of Na⁺ and water (natriuresis and diuresis). Therefore, statement (B) is incorrect. Therefore, Option (B) is the correct answer."
    }
  },
  {
    id: 211,
    similarQuestion: {
      question: "Arrange the sequential events of the micturition reflex in their correct chronological order:\n(1) Stretch receptors on the distended urinary bladder wall generate afferent nerve impulses to the CNS.\n(2) Urine collects in the urinary bladder, causing progressive stretching of the detrusor wall.\n(3) Release and expulsion of urine through the urethra (micturition).\n(4) CNS sends motor impulses via parasympathetic fibers to initiate contraction of the bladder smooth muscle and simultaneous relaxation of the internal urethral sphincter.",
      option_a: "(1) → (2) → (3) → (4)",
      option_b: "(2) → (1) → (4) → (3)",
      option_c: "(4) → (1) → (2) → (3)",
      option_d: "(2) → (4) → (1) → (3)",
      correct_option: "B",
      explanation: "The micturition reflex proceeds through a defined physiological sequence: (2) Urine produced by nephrons fills the urinary bladder, causing gradual distension; (1) Stretch receptors located in the bladder wall are stimulated and send sensory signals to the central nervous system (sacral spinal cord); (4) The CNS integrates the signals and transmits motor commands via parasympathetic efferents to stimulate coordinated contraction of the detrusor smooth muscle while simultaneously relaxing the urethral sphincters; (3) This culminates in the voiding/expulsion of urine (micturition). Thus, the correct sequence is (2) → (1) → (4) → (3). Therefore, Option (B) is the correct answer."
    }
  },
  {
    id: 212,
    similarQuestion: {
      question: "Which of the following statements correctly describe the operation of the Renin-Angiotensin-Aldosterone System (RAAS)?\n(I) A fall in glomerular blood flow, glomerular blood pressure, or GFR stimulates juxtaglomerular (JG) cells to release renin.\n(II) Renin converts angiotensinogen in plasma into angiotensin I, which is subsequently converted into angiotensin II.\n(III) Angiotensin II is a powerful vasoconstrictor that elevates glomerular blood pressure and activates the adrenal cortex to release aldosterone.\n(IV) High levels of ANF directly trigger and amplify the RAAS cascade.\nChoose the correct option:",
      option_a: "I, II, and III only",
      option_b: "I and IV only",
      option_c: "II, III, and IV only",
      option_d: "All I, II, III, and IV",
      correct_option: "A",
      explanation: "Statements I, II, and III are all correct: a decrease in renal perfusion or GFR stimulates JG cells to secrete the enzyme renin into the bloodstream; renin cleaves hepatic angiotensinogen into angiotensin I, which ACE converts to angiotensin II; angiotensin II causes arteriolar vasoconstriction and triggers aldosterone secretion from the adrenal cortex to stimulate distal Na⁺ and water reabsorption, restoring blood pressure and GFR. Statement IV is incorrect because ANF opposes and inhibits RAAS. Therefore, statements I, II, and III are correct. Therefore, Option (A) is the correct answer."
    }
  },
  {
    id: 213,
    similarQuestion: {
      question: "In patients with acute or chronic uremia due to renal failure, hemodialysis is performed using an artificial kidney. What is the correct chronological sequence of steps during hemodialysis?\n(1) Blood is pumped through coiled cellophane semipermeable tubes immersed in dialyzing fluid.\n(2) Nitrogenous metabolic wastes (urea, creatinine) diffuse down concentration gradients into the dialyzing fluid.\n(3) Anti-heparin is added to the purified blood to restore normal coagulability.\n(4) Blood is drained from a convenient superficial artery.\n(5) Purified blood is returned into the patient's body through a vein.\n(6) Heparin is added to the extracted blood as an anticoagulant.",
      option_a: "(4) → (6) → (1) → (2) → (3) → (5)",
      option_b: "(1) → (4) → (6) → (3) → (2) → (5)",
      option_c: "(4) → (3) → (1) → (2) → (6) → (5)",
      option_d: "(6) → (4) → (1) → (2) → (5) → (3)",
      correct_option: "A",
      explanation: "The standard clinical protocol for hemodialysis is: (4) Blood drained from a convenient artery is cooled and mixed with (6) an anticoagulant (heparin); (1) The blood is then pumped through cellophane dialyzing tubing bathed in isotonic dialyzing fluid; (2) Because the fluid lacks nitrogenous wastes, urea and other toxins diffuse out freely across the semipermeable membrane; (3) The cleared blood is warmed to body temperature and anti-heparin is added to neutralize anticoagulation; (5) The cleansed blood is safely infused back into the patient through a vein. Thus, the sequence is (4) → (6) → (1) → (2) → (3) → (5). Therefore, Option (A) is the correct answer."
    }
  },
  {
    id: 214,
    similarQuestion: {
      question: "Clinical urinalysis of a patient suffering from poorly controlled Diabetes Mellitus typically reveals the abnormal presence of which two diagnostic metabolic markers in the urine?",
      option_a: "Hematuria (RBCs) and Pyuria (pus cells)",
      option_b: "Glycosuria (glucose) and Ketonuria (ketone bodies)",
      option_c: "Albuminuria (protein) and Bilirubinuria (bile pigments)",
      option_d: "Oliguria (low urine output) and Anuria (absence of urine)",
      correct_option: "B",
      explanation: "In Diabetes Mellitus, insulin deficiency or cellular insulin resistance causes persistent hyperglycemia exceeding the renal threshold for glucose (~180 mg/dL). Consequently, excess glucose spills into the urine, causing glycosuria and osmotic diuresis (polyuria). Furthermore, impaired cellular glucose utilization forces accelerated hepatic breakdown of fatty acids, producing excess ketone bodies (acetoacetate, β-hydroxybutyrate, acetone) that appear in the urine as ketonuria. Thus, glycosuria and ketonuria are hallmark signs of Diabetes Mellitus. Therefore, Option (B) is the correct answer."
    }
  },
  {
    id: 215,
    similarQuestion: {
      question: "Which neurohormone synthesized by hypothalamic magnocellular neurons and released into the bloodstream from the neurohypophysis acts on the late distal tubules and collecting ducts of the kidneys to stimulate facultative water reabsorption and prevent diuresis?",
      option_a: "Luteinizing Hormone (LH)",
      option_b: "Adrenocorticotropic Hormone (ACTH)",
      option_c: "Antidiuretic Hormone (ADH / Vasopressin)",
      option_d: "Thyroid-Stimulating Hormone (TSH)",
      correct_option: "C",
      explanation: "Antidiuretic Hormone (ADH), also termed vasopressin, is produced by the supraoptic and paraventricular nuclei of the hypothalamus and stored in the posterior pituitary. In response to hemoconcentration (detected by hypothalamic osmoreceptors) or blood volume loss, ADH is secreted into the blood. It binds to V2 receptors on the basolateral membrane of principal cells in the DCT and collecting ducts, triggering the insertion of aquaporin-2 water channels into the apical membrane. This greatly accelerates water reabsorption back into the hyperosmotic medullary interstitium, concentrating the urine and conserving body water. Therefore, Option (C) is the correct answer."
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
      console.log(`[SUCCESS] Updated Set 47 Question ${q.id} (${success}/${questions.length})`);
    } else {
      const err = await res.text();
      console.error(`[ERROR] Question ${q.id}:`, err);
    }
  }
  console.log(`Set 47 Complete: ${success}/${questions.length} updated successfully.`);
}

main().catch(console.error);
