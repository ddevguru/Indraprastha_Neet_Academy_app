const API_URL = 'https://api.indraprasthaneetacademy.com/api';

const questions = [
  {
    id: 3,
    similarQuestion: {
      question: "In marine ecosystems, despite the abundance of water and sunlight in the euphotic zone, the annual net primary productivity is significantly lower per unit area than in terrestrial systems. What is the primary limiting factor responsible for this?",
      option_a: "Availability of carbon dioxide",
      option_b: "Dissolved oxygen concentration",
      option_c: "Availability of mineral nutrients (such as nitrogen and phosphorus)",
      option_d: "Salinity variations in surface waters",
      correct_option: "C",
      explanation: "In open oceans, light can penetrate the upper photic zone, but the concentration of essential mineral nutrients—particularly nitrogen, phosphorus, and iron—is extremely low because they sink to the deeper, colder abyssal layers. Consequently, nutrient scarcity acts as the principal limiting factor for oceanic primary productivity. Terrestrial systems, by contrast, have nutrient-rich soils. Therefore, Option (C) is the correct answer."
    }
  },
  {
    id: 4,
    similarQuestion: {
      question: "Given below are two statements regarding ecosystem structure and function:\nStatement I: The biotic and abiotic components of an ecosystem operate independently and cannot be regarded as functioning as a cohesive unit during energy flow.\nStatement II: A pond, being a shallow freshwater body, is incapable of exhibiting the four basic functional aspects (productivity, decomposition, energy flow, and nutrient cycling) of an ecosystem.\nIn light of the above statements, choose the correct answer from the options given below:",
      option_a: "Statement I is correct but Statement II is incorrect",
      option_b: "Statement I is incorrect but Statement II is correct",
      option_c: "Both Statement I and Statement II are correct",
      option_d: "Both Statement I and Statement II are incorrect",
      correct_option: "D",
      explanation: "According to NCERT Ecology, all structural components (abiotic and biotic) of an ecosystem function as a cohesive, integrated unit when analyzing productivity, decomposition, energy flow, and nutrient cycling. Furthermore, a pond is a classic, self-sustainable freshwater ecosystem that comprehensively demonstrates all four functional attributes and complex aquatic interactions. Therefore, both Statement I and Statement II are incorrect. Therefore, Option (D) is the correct answer."
    }
  },
  {
    id: 5,
    similarQuestion: {
      question: "Match the ecological succession terms in Column I with their corresponding descriptions in Column II:\n\nColumn I:\n(A) Crustose lichens on bare rock\n(B) Mesic forest community\n(C) Seral communities\n\nColumn II:\n(1) Pioneer community in primary xerarch succession\n(2) Stable climax community in equilibrium with climate\n(3) Transitional intermediate communities in a sere",
      option_a: "(A) - (2), (B) - (3), (C) - (1)",
      option_b: "(A) - (1), (B) - (2), (C) - (3)",
      option_c: "(A) - (3), (B) - (2), (C) - (1)",
      option_d: "(A) - (1), (B) - (3), (C) - (2)",
      correct_option: "B",
      explanation: "In primary xerarch succession on bare rock: (A) Crustose lichens act as the pioneer species by secreting acids to weather rocks into soil; (B) A mesic forest represents the climax community, which remains stable and in long-term equilibrium with the regional climate; (C) Seral communities represent the entire sequence of transitional, developmental stages (the sere) leading to the climax. Thus, the correct match is (A) - (1), (B) - (2), (C) - (3). Therefore, Option (B) is the correct answer."
    }
  },
  {
    id: 6,
    similarQuestion: {
      question: "In which of the following ecosystems is the pyramid of biomass typically inverted (spindle-shaped or inverted triangle), where the standing crop of primary producers is significantly smaller than that of primary consumers?",
      option_a: "Pyramid of biomass in an open ocean / sea ecosystem",
      option_b: "Pyramid of biomass in a temperate deciduous forest",
      option_c: "Pyramid of biomass in a tropical grassland ecosystem",
      option_d: "Pyramid of numbers in an agricultural cropland",
      correct_option: "A",
      explanation: "In aquatic ecosystems (such as a sea or deep lake), the pyramid of biomass is inverted because the primary producers are microscopic phytoplankton with a very small standing crop biomass at any given time, but they possess exceptionally high turnover rates and rapid reproductive capacity. In contrast, the primary consumers (zooplankton and small fishes) live longer and accumulate a much larger total biomass. Therefore, Option (A) is the correct answer."
    }
  },
  {
    id: 7,
    similarQuestion: {
      question: "In a terrestrial grassland food web, which of the following sets of animals exclusively occupies the primary consumer (herbivore, T₂ trophic level) position feeding directly on autotrophic vegetation?",
      option_a: "Deer, Rabbit, Grasshopper, and Field Mouse",
      option_b: "Frog, Snake, Hawk, and Wolf",
      option_c: "Lizard, Crow, Vulture, and Fox",
      option_d: "Tiger, Leopard, Eagle, and Hyena",
      correct_option: "A",
      explanation: "In terrestrial food webs, primary consumers (second trophic level, T₂) are herbivores that consume living autotrophic green plants (primary producers, T₁). Deer, rabbits, grasshoppers, and seed-eating rodents/field mice all feed directly on grasses, herbs, and shrub foliage, making them strict herbivores / primary consumers. Frogs, lizards, snakes, hawks, and large carnivores occupy higher trophic levels (T₃, T₄, or apex predators). Therefore, Option (A) is the correct answer."
    }
  },
  {
    id: 8,
    similarQuestion: {
      question: "In a food chain following Lindeman's 10% law of energy transfer across trophic levels (Producers → Primary consumers → Secondary consumers → Tertiary consumers), if the net energy fixed at the primary consumer level is 100 kcal/m²/yr, what is the net primary production at the producer level?",
      option_a: "1,000 kcal/m²/yr",
      option_b: "100 kcal/m²/yr",
      option_c: "10 kcal/m²/yr",
      option_d: "10,000 kcal/m²/yr",
      correct_option: "A",
      explanation: "According to Lindeman's 10% law, only about 10% of the energy entering a trophic level is converted into biomass and made available to the next higher trophic level, while 90% is dissipated as metabolic heat and respiration. Therefore, if primary consumers (herbivores) receive 100 kcal/m²/yr, the net primary production (NPP) at the primary producer (autotroph) level is 100 / 0.10 = 1,000 kcal/m²/yr. Therefore, Option (A) is the correct answer."
    }
  },
  {
    id: 9,
    similarQuestion: {
      question: "Given below are two statements regarding decomposition in an ecosystem:\nStatement I: Decomposers (bacteria and fungi) secrete extracellular enzymes to break down complex organic remains into simple inorganic substances such as carbon dioxide, water, and mineral nutrients.\nStatement II: Detritus refers to the end product formed after the complete mineralization of humus.\nIn light of the above statements, choose the correct answer from the options given below:",
      option_a: "Statement I is correct but Statement II is incorrect",
      option_b: "Statement I is incorrect but Statement II is correct",
      option_c: "Both Statement I and Statement II are correct",
      option_d: "Both Statement I and Statement II are incorrect",
      correct_option: "A",
      explanation: "Statement I is correct: decomposers (heterotrophic saprotrophs like bacteria and fungi) break down complex organic macromolecules into simpler inorganic minerals, CO₂, and H₂O through fragmentation, leaching, catabolism, humification, and mineralization. Statement II is incorrect: detritus is the raw starting material for decomposition (consisting of dead plant parts like leaves, bark, flowers, and dead animal remains including fecal matter), not the final product. Humus is the dark amorphous intermediate product, and mineral ions are the end products of mineralization. Therefore, Option (A) is the correct answer."
    }
  },
  {
    id: 10,
    similarQuestion: {
      question: "An ecosystem is considered a functional ecological unit comprising biotic and abiotic components. Which of the following sets constitutes the four essential functional attributes of an ecosystem?",
      option_a: "Species composition, stratification, standing state, and standing crop",
      option_b: "Productivity, decomposition, energy flow, and nutrient cycling",
      option_c: "Biomass, population density, birth rate, and mortality",
      option_d: "Atmospheric precipitation, temperature, humidity, and soil texture",
      correct_option: "B",
      explanation: "According to NCERT Ecology, when analyzing an ecosystem as a functional unit, four key functional aspects are recognized: (1) Productivity (rate of biomass synthesis), (2) Decomposition (breakdown of detritus into minerals), (3) Energy flow (unidirectional movement of energy through trophic tiers), and (4) Nutrient cycling (biogeochemical circulation of nutrients). Stratification and species diversity represent structural attributes. Therefore, Option (B) is the correct answer."
    }
  },
  {
    id: 11,
    similarQuestion: {
      question: "Organisms that feed on dead and decaying organic matter by releasing extracellular digestive enzymes to chemically break down complex compounds and absorb soluble nutrients are scientifically referred to as:",
      option_a: "Saprotrophs (saprophytes)",
      option_b: "Decomposers (micro-consumers)",
      option_c: "Both Saprotrophs and Decomposers",
      option_d: "Holotropic carnivores",
      correct_option: "C",
      explanation: "Decomposers, predominantly bacteria and fungi, are also known as saprotrophs (from Greek sapros = rotten, trophe = nutrition) or osmotrophs. They obtain nutrition by secreting extracellular hydrolytic enzymes onto dead plant and animal remains, digesting insoluble organic polymers into simple soluble inorganic and organic molecules, and then absorbing them across their cell membranes. Therefore, the terms decomposers and saprotrophs refer to the same group of organisms. Therefore, Option (C) is the correct answer."
    }
  },
  {
    id: 12,
    similarQuestion: {
      question: "In an ecosystem, the biotic component collectively comprises:",
      option_a: "All autotrophic photosynthetic producers only",
      option_b: "Microscopic decomposers and detritivores only",
      option_c: "All living organisms (producers, consumers, and decomposers) interacting within the biological community",
      option_d: "Edaphic and climatic factors including soil, moisture, and sunlight",
      correct_option: "C",
      explanation: "An ecosystem consists of two interrelated components: the abiotic component (non-living physical and chemical factors like light, temperature, water, soil, and minerals) and the biotic component. The biotic component encompasses all living organisms inhabiting the ecosystem, categorised functionally into producers (autotrophs), consumers (heterotrophic herbivores and carnivores), and decomposers (saprotrophic fungi and bacteria). Therefore, Option (C) is the correct answer."
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
      console.log(`[SUCCESS] Updated Set 94 Question ${q.id} (${success}/${questions.length})`);
    } else {
      const err = await res.text();
      console.error(`[ERROR] Question ${q.id}:`, err);
    }
  }
  console.log(`Set 94 Complete: ${success}/${questions.length} updated successfully.`);
}

main().catch(console.error);
