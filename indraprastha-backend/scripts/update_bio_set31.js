const API_URL = 'https://api.indraprasthaneetacademy.com/api';

const questions = [
  {
    id: 22,
    similarQuestion: {
      question: "Carl Linnaeus is widely recognized as the Father of Modern Taxonomy primarily for introducing which standardized system of classification and nomenclature?",
      option_a: "The five-kingdom classification system",
      option_b: "The binomial system of nomenclature",
      option_c: "The three-domain classification system",
      option_d: "The artificial phylogenetic classification",
      correct_option: "B",
      explanation: "Carl Linnaeus is renowned as the Father of Modern Taxonomy. He established the binomial system of nomenclature in his book 'Species Plantarum' (1753) and 'Systema Naturae' (1758), where each scientific name consists of two parts: the generic name (Genus) and the specific epithet (Species). R.H. Whittaker introduced the five-kingdom system, and Carl Woese proposed the three-domain system. Therefore, Option (B) is the correct answer."
    }
  },
  {
    id: 23,
    similarQuestion: {
      question: "Given below are two statements:\nStatement I: The taxonomic category 'Order' Carnivora includes families like Felidae and Canidae.\nStatement II: The class Mammalia includes orders like Primata and Carnivora.\nIn light of the above statements, choose the most appropriate answer from the options given below:",
      option_a: "Statement I is correct but Statement II is incorrect",
      option_b: "Statement I is incorrect but Statement II is correct",
      option_c: "Both Statement I and Statement II are correct",
      option_d: "Both Statement I and Statement II are incorrect",
      correct_option: "C",
      explanation: "According to NCERT taxonomy, Order Carnivora includes mammalian carnivore families such as Felidae (cat family) and Canidae (dog family). Furthermore, Class Mammalia is a higher taxonomic category comprising multiple orders, including Primata (monkeys, apes, humans) and Carnivora (cats, dogs, tigers). Hence, both statements are factually correct. Therefore, Option (C) is the correct answer."
    }
  },
  {
    id: 24,
    similarQuestion: {
      question: "According to the universal rules of binomial nomenclature, where is the author's name placed and how is it written?",
      option_a: "Before the generic name in italics",
      option_b: "After the specific epithet in an abbreviated Roman script",
      option_c: "Between the genus and species in brackets",
      option_d: "After the family name in bold uppercase letters",
      correct_option: "B",
      explanation: "Under the International Code of Botanical Nomenclature (ICBN) and Zoological Nomenclature (ICZN), the name of the author who first published the valid description appears after the specific epithet (species name) and is written in Roman script in abbreviated form without italics (e.g., Mangifera indica Linn.). Therefore, Option (B) is the correct answer."
    }
  },
  {
    id: 25,
    similarQuestion: {
      question: "Places where wild animals are kept in protected environments under human care, which enable us to learn about their food habits and behavior, are known as:",
      option_a: "Botanical gardens",
      option_b: "Herbaria",
      option_c: "Museums",
      option_d: "Zoological parks",
      correct_option: "D",
      explanation: "According to NCERT, zoological parks (zoos) are places where wild animals are kept in protected environments under human care, enabling the study of their food habits, breeding habits, and behavior. Herbaria and botanical gardens preserve plant specimens, while museums preserve dead animal and plant specimens. Therefore, Option (D) is the correct answer."
    }
  },
  {
    id: 26,
    similarQuestion: {
      question: "Read the following statements regarding the characteristics of living organisms:\n(I) Cellular organization of the body is a defining feature of life forms.\n(II) Consciousness and response to external stimuli is a defining property of all living organisms.\n(III) Growth cannot be taken as an all-inclusive defining property because non-living objects also grow by accumulation of material on the surface.\nWhich of the above statements are correct?",
      option_a: "I and II only",
      option_b: "II and III only",
      option_c: "I and III only",
      option_d: "I, II, and III",
      correct_option: "D",
      explanation: "In living organisms, cellular organization and consciousness (ability to sense and respond to environmental stimuli) are defining features with no exceptions. Growth is not an all-inclusive defining property of life because extrinsic growth occurs in non-living objects like mountains, boulders, and sand mounds through surface accumulation of matter, whereas living beings grow intrinsically (from inside). Thus, statements (I), (II), and (III) are all correct. Therefore, Option (D) is the correct answer."
    }
  },
  {
    id: 27,
    similarQuestion: {
      question: "Given below are two statements: one is labelled as Assertion (A) and the other is labelled as Reason (R).\nAssertion (A): Living organisms are considered open thermodynamic systems.\nReason (R): Living organisms continuously exchange both energy and matter with their surrounding environment.\nIn light of the above statements, choose the correct answer from the options given below:",
      option_a: "Both (A) and (R) are true and (R) is the correct explanation of (A)",
      option_b: "Both (A) and (R) are true but (R) is not the correct explanation of (A)",
      option_c: "(A) is true but (R) is false",
      option_d: "Both (A) and (R) are false",
      correct_option: "A",
      explanation: "An open system is defined as a system that exchanges both energy and matter across its boundaries with the environment. Living organisms take in nutrients, gases, and water (matter) and absorb or radiate heat and chemical energy (energy) continuously to maintain homeostatic non-equilibrium steady state. Thus, Assertion (A) is true and Reason (R) is the correct explanation of (A). Therefore, Option (A) is the correct answer."
    }
  },
  {
    id: 28,
    similarQuestion: {
      question: "Which of the following represents the correct ascending taxonomic hierarchy from lowest category to highest category?",
      option_a: "Species → Genus → Order → Family → Class → Phylum → Kingdom",
      option_b: "Species → Genus → Family → Order → Class → Phylum/Division → Kingdom",
      option_c: "Species → Family → Genus → Order → Class → Division → Kingdom",
      option_d: "Kingdom → Division → Class → Order → Family → Genus → Species",
      correct_option: "B",
      explanation: "The obligatory taxonomic categories in ascending order (from smallest/lowest unit to largest/highest unit) are: Species → Genus → Family → Order → Class → Phylum (for animals) or Division (for plants) → Kingdom. Option (D) represents descending order. Therefore, the correct ascending hierarchy is given in Option (B). Therefore, Option (B) is the correct answer."
    }
  },
  {
    id: 29,
    similarQuestion: {
      question: "Mangifera indica (Mango) and Triticum aestivum (Wheat) belong to the same highest common taxonomic group below Kingdom Plantae, which is:",
      option_a: "Order Sapindales",
      option_b: "Class Monocotyledonae",
      option_c: "Division Angiospermae",
      option_d: "Family Anacardiaceae",
      correct_option: "C",
      explanation: "Mangifera indica is a dicotyledonous plant (Division: Angiospermae, Class: Dicotyledonae, Order: Sapindales, Family: Anacardiaceae). Triticum aestivum is a monocotyledonous plant (Division: Angiospermae, Class: Monocotyledonae, Order: Poales, Family: Poaceae). Both share the same Division, Angiospermae, because both are flowering, seed-enclosing vascular plants, but they diverge at the Class level. Therefore, Option (C) is the correct answer."
    }
  },
  {
    id: 30,
    similarQuestion: {
      question: "True regeneration, where a fragmented organism regenerates the lost part of its body and develops into a complete new individual, is characteristically exhibited by:",
      option_a: "Planaria (flatworm)",
      option_b: "Amoeba",
      option_c: "Mucor",
      option_d: "Spirogyra",
      correct_option: "A",
      explanation: "Planaria (a flatworm belonging to Phylum Platyhelminthes) possesses specialized adult stem cells (neoblasts) that confer high regenerative capacity, enabling it to exhibit true regeneration: any cut fragment can regenerate the lost organs and reconstruct a complete, fully functional individual. Sponges, hydra, and starfishes also show regeneration, but Planaria is the classic NCERT example of true morphallactic regeneration. Therefore, Option (A) is the correct answer."
    }
  }
];

async function main() {
  const loginRes = await fetch(`${API_URL}/admin/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username: 'indraprasthaadmin', password: 'indraprastha@123' })
  });
  const loginData = await loginRes.json();
  const token = loginData.token;
  console.log('Logged in successfully, token received.');

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
      console.log(`[SUCCESS] Updated question ${q.id} (${success}/${questions.length})`);
    } else {
      const err = await res.text();
      console.error(`[ERROR] Question ${q.id}: ${err}`);
    }
  }
  console.log(`Set 31 Complete: ${success}/${questions.length} updated successfully.`);
}

main().catch(console.error);
