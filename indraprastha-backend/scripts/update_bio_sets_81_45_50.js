const API_URL = 'https://api.indraprasthaneetacademy.com/api';

const updates = [
  // Set 81 (Reproduction In Organisms)
  {
    setId: 81,
    id: 5777,
    similarQuestion: {
      question: "In plants bearing cleistogamous flowers (such as Commelina and Oxalis), which of the following pollination mechanisms is invariably assured and why?",
      option_a: "Autogamy, because the flowers remain permanently closed and anthers dehisce directly over the receptive stigma",
      option_b: "Geitonogamy, because pollen grains from another flower on the same plant are transferred by wind",
      option_c: "Xenogamy, because cross-pollination is favored to increase genetic diversity",
      option_d: "Allogamy, because external insect pollinators easily enter the closed floral buds",
      correct_option: "A",
      explanation: "Cleistogamous flowers (e.g., in Commelina, Viola, and Oxalis) do not open at all, even at maturity. Since the anthers and stigma lie in close proximity within the closed floral bud, when the anthers dehisce, the pollen grains fall directly onto the stigma of the same flower. Consequently, cleistogamous flowers are strictly autogamous with no chance of cross-pollination (geitonogamy or xenogamy), ensuring assured seed-set even in the total absence of pollinators. Therefore, Option (A) is the correct answer."
    }
  },
  // Set 45 (Breathing & Exchange of Gases)
  {
    setId: 45,
    id: 99,
    similarQuestion: {
      question: "Which of the following represents the correct anatomical route traversed by inspired atmospheric air from the outside environment to the primary respiratory exchange surfaces in the human respiratory system?",
      option_a: "External nostrils → Nasal chamber → Internal nares → Pharynx → Larynx → Trachea → Primary bronchi → Secondary/tertiary bronchi → Terminal bronchioles → Alveoli",
      option_b: "External nostrils → Larynx → Pharynx → Trachea → Bronchioles → Alveoli",
      option_c: "Nasal chamber → Pharynx → Trachea → Larynx → Bronchi → Alveolar sacs",
      option_d: "External nostrils → Pharynx → Bronchi → Larynx → Trachea → Alveoli",
      correct_option: "A",
      explanation: "In the human respiratory tract, inhaled atmospheric air enters through a pair of external nostrils, moves through the nasal passage into the nasal chamber, passes through the internal nares into the nasopharynx (pharynx), goes across the glottis into the larynx (sound box), descends down the trachea, divides into primary bronchi (right and left), further subdivides into secondary and tertiary bronchi, passes through terminal bronchioles, and terminates in the vascularized thin-walled alveoli (the primary sites of gaseous exchange). Therefore, Option (A) is the correct answer."
    }
  },
  {
    setId: 45,
    id: 100,
    similarQuestion: {
      question: "In humans, the trachea is a straight tube extending down the mid-thoracic cavity that bifurcates into the right and left primary bronchi at the anatomical level of the:",
      option_a: "3rd thoracic vertebra",
      option_b: "5th thoracic vertebra",
      option_c: "7th thoracic vertebra",
      option_d: "12th thoracic vertebra",
      correct_option: "B",
      explanation: "According to NCERT human physiology, the trachea is a straight fibrocartilaginous tube extending through the neck into the mid-thoracic cavity. At the level of the 5th thoracic vertebra (T5), it bifurcates into the right and left primary bronchi, which enter the right and left lungs respectively. Therefore, Option (B) is the correct answer."
    }
  },
  // Set 50 (Chemical Coordination & Integration)
  {
    setId: 50,
    id: 111,
    similarQuestion: {
      question: "Which organ system in the human body is specialized to provide chemical integration and regulate cellular metabolism, growth, and physiological homeostasis by releasing non-nutrient chemical messengers directly into the bloodstream?",
      option_a: "Integumentary system",
      option_b: "Endocrine system",
      option_c: "Excretory system",
      option_d: "Musculoskeletal system",
      correct_option: "B",
      explanation: "The endocrine system consists of ductless endocrine glands and specialized tissues that synthesize and secrete hormones—intercellular chemical messengers produced in trace amounts that are released directly into the bloodstream to reach target tissues. The endocrine system coordinates with the nervous system to regulate long-term metabolic activities, developmental processes, and internal homeostasis. Therefore, Option (B) is the correct answer."
    }
  },
  {
    setId: 50,
    id: 112,
    similarQuestion: {
      question: "The neural system provides point-to-point rapid electrical coordination, whereas the endocrine system provides widespread and sustained chemical integration. Together, the neuroendocrine system functions synergistically to maintain which vital physiological state?",
      option_a: "Homeostasis (stable internal dynamic equilibrium)",
      option_b: "Continuous muscle tetanus",
      option_c: "Irreversible metabolic fatigue",
      option_d: "Permanent positive feedback state",
      correct_option: "A",
      explanation: "The neural system and endocrine system jointly form the neuroendocrine control system of the body. While the nervous system provides rapid, point-to-point electrical coordination of bodily responses, the endocrine system provides widespread, prolonged chemical regulation via hormones. Working collaboratively, they continuously regulate bodily fluid volume, temperature, pH, ion concentrations, and glucose levels to preserve homeostasis—the steady, balanced internal physiological state of the organism. Therefore, Option (A) is the correct answer."
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
  for (const item of updates) {
    const res = await fetch(`${API_URL}/admin/practice-questions/${item.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({ similarQuestion: item.similarQuestion })
    });
    if (res.ok) {
      success++;
      console.log(`[SUCCESS] Updated Set ${item.setId} Question ${item.id} (${success}/${updates.length})`);
    } else {
      const err = await res.text();
      console.error(`[ERROR] Question ${item.id}:`, err);
    }
  }
  console.log(`Completed ${success}/${updates.length} updates for Sets 81, 45, and 50.`);
}

main().catch(console.error);
