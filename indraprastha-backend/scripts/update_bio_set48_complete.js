const API_URL = 'https://api.indraprasthaneetacademy.com/api';

const questions = [
  {
    id: 80,
    similarQuestion: {
      question: "Cytoplasmic streaming (cyclosis), which drives the formation of pseudopodia for amoeboid locomotion, is characteristically exhibited by which of the following cells?",
      option_a: "Amoeba proteus as well as human phagocytic leukocytes and macrophages",
      option_b: "Mature non-nucleated mammalian erythrocytes",
      option_c: "Stratified squamous keratinised epithelial cells",
      option_d: "Ciliated ependymal cells of brain ventricles",
      correct_option: "A",
      explanation: "Amoeboid movement is effected by pseudopodia produced through cytoplasmic streaming (cyclosis), coordinated by microfilaments (cytoskeletal actin filaments). This type of movement is characteristically exhibited by unicellular protozoans like Amoeba as well as specialized human immune cells like macrophages and neutrophilic leukocytes crawling through tissues during diapedesis. Therefore, Option (A) is the correct answer."
    }
  },
  {
    id: 81,
    similarQuestion: {
      question: "Read the following statements regarding locomotion and movement in organisms:\n(I) Paramecium uses cilia for both driving food particles through the cytostome into the cytopharynx and for locomotion.\n(II) Hydra uses its tentacles to capture prey as well as for somersaulting locomotion.\n(III) All locomotions are movements, but all movements are not locomotions.\n(IV) Ciliated epithelium is found lining the inner surfaces of hollow organs like the fallopian tubes and bronchioles.\nWhich of the above statements are correct?",
      option_a: "I, II, III, and IV",
      option_b: "I and II only",
      option_c: "III and IV only",
      option_d: "II and III only",
      correct_option: "A",
      explanation: "All four statements are scientifically accurate according to NCERT: (I) In Paramecium, ciliary coordinated movement steers food into the cytopharynx and propels the organism; (II) Hydra utilizes tentacles for capturing prey and for looper/somersault locomotion; (III) Locomotion entails a change in place/location, making all locomotions movements, whereas movements like blinking or heartbeat are not locomotions; (IV) Ciliated epithelium lines hollow organs like bronchioles and oviducts to sweep mucus and ova in a specific direction. Therefore, all statements (I, II, III, and IV) are correct. Therefore, Option (A) is the correct answer."
    }
  },
  {
    id: 82,
    similarQuestion: {
      question: "Which of the following statements regarding human muscular tissue is incorrect?",
      option_a: "Muscles are specialized tissues originating embryonically from the mesoderm",
      option_b: "Muscles contribute approximately 40% to 50% of the total body weight of an adult human",
      option_c: "Skeletal muscles originate embryonically from the endoderm and lack contractility",
      option_d: "Muscular tissue exhibits special physiological properties such as excitability, contractility, extensibility, and elasticity",
      correct_option: "C",
      explanation: "Muscular tissue is specialized tissue of mesodermal embryonic origin (not endodermal). It accounts for approximately 40% to 50% of adult body weight and possesses unique physiological properties including excitability, contractility, extensibility, and elasticity. Therefore, statement (C) is factually incorrect. Therefore, Option (C) is the correct answer."
    }
  },
  {
    id: 264,
    similarQuestion: {
      question: "Arrange the following structural hierarchy of skeletal muscle in ascending order of size (from smallest microscopic entity to largest macro-structure):\n(1) Sarcomere\n(2) G-actin monomer\n(3) Muscle fascicle\n(4) Myofibril\n(5) Muscle fibre (myocyte)",
      option_a: "(2) → (1) → (4) → (5) → (3)",
      option_b: "(1) → (2) → (4) → (5) → (3)",
      option_c: "(5) → (4) → (3) → (1) → (2)",
      option_d: "(2) → (4) → (1) → (3) → (5)",
      correct_option: "A",
      explanation: "In the anatomical hierarchy of skeletal muscle: G-actin monomer (~5.5 nm) is the smallest sub-filamentous protein subunit; multiple actins form thin filaments within a sarcomere (functional contractile unit, ~2 to 2.5 μm long); sarcomeres arranged in series constitute a myofibril (~1 to 2 μm diameter); bundles of myofibrils are housed within a muscle fibre/cell (10 to 100 μm diameter); and bundles of muscle fibres form a fascicle enclosed by perimysium. Thus, the ascending order is (2) → (1) → (4) → (5) → (3). Therefore, Option (A) is the correct answer."
    }
  },
  {
    id: 265,
    similarQuestion: {
      question: "In a striated skeletal muscle myofibril, the fundamental anatomical and functional unit of contraction, known as a sarcomere, is precisely defined as the segment bounded between two successive:",
      option_a: "M-lines",
      option_b: "H-zones",
      option_c: "Z-discs (Z-lines)",
      option_d: "A-bands",
      correct_option: "C",
      explanation: "In skeletal muscle myofibrils, an elastic membrane called the Z-line (Z-disc or Krause's membrane) bisects each I-band. The portion of a myofibril situated between two successive Z-lines is defined as a sarcomere. The sarcomere represents the basic functional unit of muscle contraction, containing a central dark A-band and portions of light I-bands on either side. Therefore, Option (C) is the correct answer."
    }
  },
  {
    id: 266,
    similarQuestion: {
      question: "In a striated muscle myofibril, the light isotropic bands (I-bands) are primarily composed of which filamentous protein complex, and which line bisects them?",
      option_a: "Thick myosin filaments, bisected by the M-line",
      option_b: "Thin actin filaments, bisected by the Z-line",
      option_c: "Tropomyosin polymers, bisected by the H-zone",
      option_d: "Cross-linked collagen fibres, bisected by the sarcolemma",
      correct_option: "B",
      explanation: "Myofibrils feature alternating dark and light bands. The light bands are termed isotropic bands or I-bands because they are isotropic to polarized light; they contain thin filaments composed primarily of F-actin along with regulatory proteins troponin and tropomyosin. Each I-band is centrally bisected by an elastic transverse fibrous partition called the Z-line. In contrast, dark anisotropic (A) bands contain thick myosin filaments. Therefore, Option (B) is the correct answer."
    }
  },
  {
    id: 267,
    similarQuestion: {
      question: "During the sliding filament mechanism of skeletal muscle contraction, cross-bridges that project outward from thick filaments to physically engage thin actin filaments are formed by which structural component of myosin?",
      option_a: "Light meromyosin (LMM) tail",
      option_b: "Heavy meromyosin (HMM) globular head and short arm (cross-arm)",
      option_c: "Troponin-C subunit",
      option_d: "Linear tropomyosin polymer",
      correct_option: "B",
      explanation: "Each myosin filament is a polymer composed of many monomeric proteins called meromyosins. A meromyosin molecule has two parts: a globular head with a short arm called heavy meromyosin (HMM) and a tail called light meromyosin (LMM). The HMM component (head and neck/arm) projects outward at regular intervals and angles from the thick filament surface and is referred to as the cross-arm/cross-bridge. The globular head functions as an active ATPase enzyme and binds to actin. Therefore, Option (B) is the correct answer."
    }
  },
  {
    id: 268,
    similarQuestion: {
      question: "In a resting, non-stimulated skeletal muscle fiber, which protein physically runs along the grooves of the F-actin helix and covers the active binding sites for myosin heads, preventing cross-bridge formation?",
      option_a: "Troponin-I",
      option_b: "Actinin",
      option_c: "Tropomyosin",
      option_d: "Myoglobin",
      correct_option: "C",
      explanation: "Tropomyosin is a filamentous protein consisting of two alpha-helical strands that run along the entire length of the F-actin groove. In a resting muscle, tropomyosin is held by troponin in a position where it physically shields/masks the myosin-binding sites on the G-actin subunits, thereby acting as a regulatory relaxing protein that prevents premature actin-myosin interaction and contraction. Therefore, Option (C) is the correct answer."
    }
  },
  {
    id: 269,
    similarQuestion: {
      question: "Upon arrival of a depolarizing neural impulse at the neuromuscular junction, calcium ions (Ca²⁺) released from the sarcoplasmic reticulum bind specifically to __________, causing a conformational shift in __________ that uncovers the active binding sites for __________ on thin actin filaments.",
      option_a: "Troponin-C; tropomyosin; myosin",
      option_b: "Tropomyosin; troponin; actin",
      option_c: "Myosin head; actin; calcium ATPase",
      option_d: "Calmodulin; myoglobin; acetylcholine",
      correct_option: "A",
      explanation: "When an action potential depolarizes the sarcolemma and travels into T-tubules, Ca²⁺ ions are released from the cisternae of the sarcoplasmic reticulum into the sarcoplasm. Ca²⁺ binds to the Troponin-C subunit on the thin filament. This triggers a conformational change in the troponin complex, pulling the attached tropomyosin molecule away from the active sites on F-actin. This unmasks the myosin-binding sites on actin, enabling myosin heads to bind and form cross-bridges. Therefore, Option (A) is the correct answer."
    }
  },
  {
    id: 270,
    similarQuestion: {
      question: "The rapid propagation of an electrical action potential from the outer sarcolemma deep into the interior of a bulky skeletal muscle fiber to simultaneously trigger all myofibrils is mediated by:",
      option_a: "Intercalated discs",
      option_b: "Transverse tubules (T-tubules)",
      option_c: "Fascia adherens",
      option_d: "Tight junctions",
      correct_option: "B",
      explanation: "T-tubules (transverse tubules) are deep invaginations of the muscle cell membrane (sarcolemma) that penetrate radially into the interior of the muscle fiber, running in close contact with the terminal cisternae of the sarcoplasmic reticulum (forming triads). When an action potential spreads across the sarcolemma, it travels deep down the T-tubules, ensuring that the depolarizing signal rapidly reaches internal sarcoplasmic reticulum stores throughout the entire thickness of the fiber to release Ca²⁺ synchronously. Therefore, Option (B) is the correct answer."
    }
  },
  {
    id: 271,
    similarQuestion: {
      question: "During the cross-bridge cycle of skeletal muscle contraction, what immediate event occurs when a fresh molecule of ATP binds to the nucleotide-binding pocket on the myosin head?",
      option_a: "The myosin head immediately detaches from the actin filament",
      option_b: "The myosin head permanently locks onto actin (rigor mortis)",
      option_c: "Calcium ions are pumped out of the muscle fiber",
      option_d: "Tropomyosin permanently dissociates from the actin helix",
      correct_option: "A",
      explanation: "In the cross-bridge cycle, after the power stroke has pulled the actin filament toward the M-line, ADP and inorganic phosphate (Pi) are released, leaving the myosin head tightly bound to actin in the low-energy rigor state. When a new molecule of ATP binds to the myosin head, it induces an allosteric conformational change that drastically reduces myosin's affinity for actin, causing the cross-bridge to detach immediately. Subsequent hydrolysis of ATP to ADP and Pi re-cocks the myosin head into its energized high-affinity conformation for the next cycle. In death, absence of ATP prevents detachment, resulting in rigor mortis. Therefore, Option (A) is the correct answer."
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
      console.log(`[SUCCESS] Updated Set 48 Question ${q.id} (${success}/${questions.length})`);
    } else {
      const err = await res.text();
      console.error(`[ERROR] Question ${q.id}:`, err);
    }
  }
  console.log(`Set 48 Complete: ${success}/${questions.length} updated successfully.`);
}

main().catch(console.error);
