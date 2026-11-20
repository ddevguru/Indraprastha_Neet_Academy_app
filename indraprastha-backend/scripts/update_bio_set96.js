const API_URL = 'https://api.indraprasthaneetacademy.com/api';

const questions = [
  {
    id: 13,
    similarQuestion: {
      question: "In an aquatic food chain, which phenomenon describes the progressive increase in the concentration of non-biodegradable toxic substances such as DDT at successive trophic levels?",
      option_a: "Eutrophication",
      option_b: "Biomagnification",
      option_c: "Bioleaching",
      option_d: "Bioremediation",
      correct_option: "B",
      explanation: "Biomagnification refers to the phenomenon of progressive increase in concentration of a toxicant (such as DDT or mercury) at successive trophic levels in an aquatic ecosystem food chain. Because the organism cannot metabolize or excrete the toxicant, it accumulates and gets passed on to the higher trophic level in increasing concentrations, reaching the highest level in apex predators like fish-eating birds. Eutrophication is the natural or accelerated nutrient enrichment of a water body leading to algal bloom. Therefore, Option (B) is the correct answer."
    }
  },
  {
    id: 56,
    similarQuestion: {
      question: "Which of the following devices is most widely used in thermal power plants to remove over 99% of particulate matter present in the exhaust gas?",
      option_a: "Catalytic converter",
      option_b: "Electrostatic precipitator",
      option_c: "Scrubber",
      option_d: "Incinerator",
      correct_option: "B",
      explanation: "According to NCERT, an electrostatic precipitator (ESP) is the most widely utilized device in thermal power plants, capable of removing over 99 percent of particulate matter present in the exhaust from industrial stacks. It operates by maintaining electrode wires at thousands of volts, which produce a corona that releases electrons. These attach to dust particles, giving them a net negative charge, and the collection plates attract and precipitate the charged particles. A scrubber removes gases like SO₂, while catalytic converters reduce emissions of CO, NOₓ, and unburnt hydrocarbons in automobiles. Therefore, Option (B) is the correct answer."
    }
  },
  {
    id: 130,
    similarQuestion: {
      question: "Given below are two statements: one is labelled as Assertion (A) and the other is labelled as Reason (R).\nAssertion (A): Louis Pasteur conclusively disproved the theory of spontaneous generation (abiogenesis).\nReason (R): In pre-sterilized swan-neck flasks, life did not come from killed yeast, while in flasks open to air, living organisms arose from killed yeast.\nIn light of the above statements, choose the most appropriate answer from the options given below:",
      option_a: "Both (A) and (R) are true and (R) is the correct explanation of (A)",
      option_b: "Both (A) and (R) are true but (R) is not the correct explanation of (A)",
      option_c: "(A) is true but (R) is false",
      option_d: "Both (A) and (R) are false",
      correct_option: "A",
      explanation: "Louis Pasteur conclusively dismissed the theory of spontaneous generation once and for all by meticulous experimentation using swan-neck flasks. He showed that in flasks pre-sterilized by boiling broth and sealed against dust, life did not arise from killed yeast. However, in another flask left open to air, microorganisms entered and developed new colonies. Thus, he proved that living organisms arise only from pre-existing life (omne vivum ex vivo). Therefore, Assertion (A) is true, Reason (R) is true, and Reason (R) is the correct scientific explanation of Assertion (A). Therefore, Option (A) is the correct answer."
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
  console.log(`Set 96 Complete: ${success}/${questions.length} updated successfully.`);
}

main().catch(console.error);

