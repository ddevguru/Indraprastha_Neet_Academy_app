const https = require('https');

async function request(url, options = {}, body = null) {
  return new Promise((resolve, reject) => {
    const req = https.request(url, options, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try {
          resolve({ status: res.statusCode, data: JSON.parse(data) });
        } catch (e) {
          resolve({ status: res.statusCode, data });
        }
      });
    });
    req.on('error', reject);
    if (body) req.write(JSON.stringify(body));
    req.end();
  });
}

const pyqsData = [
  {
    id: 1654,
    question: "The equilibrium constant Kp for the following reaction: MgCO₃(s) ⇌ MgO(s) + CO₂(g) [AIPMT 2000]",
    optionA: "Kp = P_CO₂",
    optionB: "Kp = P_CO₂ × (P_CO₂ × P_MgO)/P_MgCO₃",
    optionC: "Kp = (P_CO₂ + P_MgO)/P_MgCO₃",
    optionD: "Kp = P_MgCO₃/(P_CO₂ + P_MgO)",
    correctOption: "A",
    explanation: "In heterogeneous equilibria involving pure solids and gases, the active mass (molar concentration or activity) of pure solid substances is constant and taken as unity (activity = 1).\nIn the given decomposition reaction:\nMgCO₃(s) ⇌ MgO(s) + CO₂(g)\nMgCO₃ and MgO are pure solids, so [MgCO₃(s)] = 1 and [MgO(s)] = 1.\nTherefore, the equilibrium constant in terms of partial pressures is solely governed by the gaseous species:\nKp = P_CO₂.\nTherefore, Option (A) is the correct answer.",
    similarQuestion: {
      question: "For the heterogeneous decomposition reaction CaCO₃(s) ⇌ CaO(s) + CO₂(g), the equilibrium constant expression in terms of partial pressures is:",
      option_a: "Kp = P_CO₂",
      option_b: "Kp = (P_CaO × P_CO₂) / P_CaCO₃",
      option_c: "Kp = P_CaCO₃ / P_CO₂",
      option_d: "Kp = 1 / P_CO₂",
      correct_option: "A",
      explanation: "Because CaCO₃(s) and CaO(s) are pure solids with activities equal to 1, the equilibrium constant expression simplifies to Kp = P_CO₂.\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 1653,
    question: "For any reversible reaction, if we increase the concentration of the reactants, then the effect on the equilibrium constant is: [AIPMT 2000]",
    optionA: "Depends on the amount of concentration",
    optionB: "Unchanged",
    optionC: "Decreases",
    optionD: "Increases",
    correctOption: "B",
    explanation: "The equilibrium constant (Kc or Kp) for a given chemical reaction is a thermodynamic constant that depends solely on temperature and the stoichiometry of the balanced chemical equation.\nAccording to Le Chatelier's principle, increasing the concentration of reactants increases the rate of the forward reaction, temporarily making the reaction quotient Q < K.\nThe system shifts in the forward direction to consume reactants and produce more products until Q equals K again.\nHowever, the equilibrium constant itself remains completely unchanged as long as temperature remains constant.\nTherefore, Option (B) is the correct answer.",
    similarQuestion: {
      question: "Which of the following factors changes the numerical value of the equilibrium constant of a chemical reaction?",
      option_a: "Temperature",
      option_b: "Pressure",
      option_c: "Concentration of reactants",
      option_d: "Addition of a catalyst",
      correct_option: "A",
      explanation: "The equilibrium constant of a reaction is an intrinsic thermodynamic quantity dependent only on temperature (according to the van 't Hoff equation: d(ln K)/dT = ΔH° / (RT²)). Pressure, concentration, and catalysts do not alter the equilibrium constant.\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 1652,
    question: "Reaction BaO₂(s) ⇌ BaO(s) + O₂(g), ΔH = positive. In equilibrium condition, the pressure of O₂ depends on: [AIPMT 2002]",
    optionA: "Increase in mass of BaO₂",
    optionB: "Increase in mass of BaO",
    optionC: "Increase in temperature at equilibrium",
    optionD: "Increase in mass of BaO₂ and BaO both",
    correctOption: "C",
    explanation: "For the reaction BaO₂(s) ⇌ BaO(s) + O₂(g):\nBecause BaO₂(s) and BaO(s) are pure solids, the equilibrium constant is:\nKp = P_O₂.\nThus, the partial pressure of O₂ at equilibrium is directly equal to Kp.\nAdding or removing pure solids (changing the mass of BaO₂ or BaO) does not change their active mass and therefore has no effect on Kp or P_O₂.\nBecause the reaction is endothermic (ΔH > 0), an increase in temperature increases Kp according to van 't Hoff's equation:\nln(Kp₂ / Kp₁) = (ΔH° / R) × (1/T₁ − 1/T₂).\nConsequently, an increase in temperature increases Kp and thus increases the equilibrium pressure of O₂.\nTherefore, Option (C) is the correct answer.",
    similarQuestion: {
      question: "For the endothermic decomposition reaction NH₄HS(s) ⇌ NH₃(g) + H₂S(g), the equilibrium partial pressures of the gases will increase upon:",
      option_a: "Increasing the temperature",
      option_b: "Adding more solid NH₄HS",
      option_c: "Decreasing the volume of the vessel",
      option_d: "Adding an inert gas at constant volume",
      correct_option: "A",
      explanation: "For an endothermic reaction (ΔH > 0), increasing temperature shifts the equilibrium forward, increasing the equilibrium constant Kp and therefore increasing the equilibrium partial pressures of NH₃ and H₂S.\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 1651,
    question: "The reaction quotient (Q) for the reaction N₂(g) + 3H₂(g) ⇌ 2NH₃(g) is given by: Q = [NH₃]²/([N₂][H₂]³). The reaction will proceed from right to left if: [AIPMT 2003]",
    optionA: "Q = Kc",
    optionB: "Q < Kc",
    optionC: "Q > Kc",
    optionD: "Q = 0",
    correctOption: "C",
    explanation: "The direction in which a chemical reaction proceeds to establish equilibrium is determined by comparing the reaction quotient Q with the equilibrium constant Kc:\n1. If Q = Kc: The system is already at chemical equilibrium, and no net reaction occurs.\n2. If Q < Kc: The concentration of products is lower than at equilibrium; the reaction proceeds in the forward direction (left to right) to generate more products.\n3. If Q > Kc: The concentration of products is higher than at equilibrium; the reaction proceeds in the reverse/backward direction (right to left) to consume products and generate reactants.\nTherefore, the reaction proceeds from right to left when Q > Kc.\nTherefore, Option (C) is the correct answer.",
    similarQuestion: {
      question: "For a reaction A(g) + B(g) ⇌ C(g) + D(g), Kc = 100. If at a certain instant [A] = [B] = 0.1 M and [C] = [D] = 2.0 M, in which direction will the reaction proceed?",
      option_a: "In the reverse direction (right to left)",
      option_b: "In the forward direction (left to right)",
      option_c: "The system is already at equilibrium",
      option_d: "The reaction ceases entirely",
      correct_option: "A",
      explanation: "Qc = ([C][D]) / ([A][B]) = (2.0 × 2.0) / (0.1 × 0.1) = 4.0 / 0.01 = 400.\nSince Qc (400) > Kc (100), the reaction must shift backward (from right to left) to re-establish equilibrium.\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 1650,
    question: "The equilibrium constants of the following reactions are: N₂ + 3H₂ ⇌ 2NH₃; K₁ N₂ + O₂ ⇌ 2NO; K₂ H₂ + (1/2)O₂ ⇌ H₂O; K₃ The equilibrium constant (K) of the reaction 2NH₃ + (5/2)O₂ ⇌ 2NO + 3H₂O will be: [AIPMT 2003]",
    optionA: "K₂K₃³/K₁",
    optionB: "K₂K₃/K₁",
    optionC: "K₂³K₃/K₁",
    optionD: "K₁K₃³/K₂",
    correctOption: "A",
    explanation: "Let us express the target reaction as a linear combination of the given reactions:\nTarget reaction: 2NH₃ + (5/2)O₂ ⇌ 2NO + 3H₂O\n1. Reverse reaction 1: 2NH₃ ⇌ N₂ + 3H₂ → Equilibrium constant = 1 / K₁\n2. Reaction 2: N₂ + O₂ ⇌ 2NO → Equilibrium constant = K₂\n3. Multiply reaction 3 by 3: 3H₂ + (3/2)O₂ ⇌ 3H₂O → Equilibrium constant = K₃³\nAdding these three equations:\n2NH₃ + N₂ + O₂ + 3H₂ + (3/2)O₂ ⇌ N₂ + 3H₂ + 2NO + 3H₂O\nCancelling common terms (N₂ and 3H₂) from both sides:\n2NH₃ + (5/2)O₂ ⇌ 2NO + 3H₂O\nWhen reactions are added, their equilibrium constants are multiplied:\nK = (1 / K₁) × K₂ × K₃³ = (K₂ K₃³) / K₁.\nTherefore, Option (A) is the correct answer.",
    similarQuestion: {
      question: "Given the equilibrium constants: C(s) + O₂(g) ⇌ CO₂(g), K₁; 2CO(g) + O₂(g) ⇌ 2CO₂(g), K₂. The equilibrium constant for C(s) + (1/2)O₂(g) ⇌ CO(g) is:",
      option_a: "K₁ / √K₂",
      option_b: "K₁ × √K₂",
      option_c: "√K₂ / K₁",
      option_d: "K₁² / K₂",
      correct_option: "A",
      explanation: "Target: C(s) + (1/2)O₂(g) ⇌ CO(g).\nEquation 1: C + O₂ ⇌ CO₂, K = K₁.\nReverse Equation 2 and multiply by 1/2: CO₂ ⇌ CO + (1/2)O₂, K = 1 / √K₂.\nAdding both equations yields the target equation: K = K₁ / √K₂.\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 1649,
    question: "Equilibrium constants K₁ and K₂ for the following equilibria: NO(g) + (1/2)O₂(g) ⇌ NO₂(g), K₁ 2NO₂(g) ⇌ 2NO(g) + O₂(g), K₂ are related as: [AIPMT 2005]",
    optionA: "K₂ = 1/K₁²",
    optionB: "K₂ = K₁²",
    optionC: "K₂ = 1/K₁",
    optionD: "K₂ = K₁/2",
    correctOption: "A",
    explanation: "Given reaction (1):\nNO(g) + (1/2)O₂(g) ⇌ NO₂(g), equilibrium constant K₁ = [NO₂] / ([NO] [O₂]¹ᐟ²).\nGiven reaction (2):\n2NO₂(g) ⇌ 2NO(g) + O₂(g), equilibrium constant K₂ = ([NO]² [O₂]) / [NO₂]².\nNotice that reaction (2) is obtained by:\n1. Reversing reaction (1): NO₂(g) ⇌ NO(g) + (1/2)O₂(g) → K' = 1 / K₁\n2. Multiplying the stoichiometric coefficients by 2: 2NO₂(g) ⇌ 2NO(g) + O₂(g) → K₂ = (K')² = (1 / K₁)² = 1 / K₁².\nTherefore, K₂ = 1 / K₁².\nTherefore, Option (A) is the correct answer.",
    similarQuestion: {
      question: "If the equilibrium constant for N₂(g) + 3H₂(g) ⇌ 2NH₃(g) is K, what is the equilibrium constant for the reaction NH₃(g) ⇌ (1/2)N₂(g) + (3/2)H₂(g)?",
      option_a: "1 / √K",
      option_b: "1 / K²",
      option_c: "√K",
      option_d: "2 / K",
      correct_option: "A",
      explanation: "The second reaction is obtained by reversing the first reaction and multiplying by 1/2. Hence, its equilibrium constant is (1 / K)¹ᐟ² = 1 / √K.\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 1648,
    question: "For the reaction CH₄(g) + 2O₂(g) ⇌ CO₂(g) + 2H₂O(l), ΔrH = −170.8 kJ mol⁻¹. Which of the following statements is not true? [AIPMT 2006]",
    optionA: "The reaction is exothermic.",
    optionB: "At equilibrium, the concentrations of CO₂(g) and H₂O(l) are not equal.",
    optionC: "The equilibrium constant for the reaction is given by Kp = [CO₂]/([CH₄][O₂]).",
    optionD: "Addition of CH₄(g) or O₂(g) at equilibrium will cause a shift to the right.",
    correctOption: "C",
    explanation: "Let us inspect the options:\n- Option A: ΔrH = −170.8 kJ mol⁻¹ is negative, meaning the reaction is exothermic. (True)\n- Option B: H₂O is a pure liquid, so its active mass is unity, whereas CO₂ is a gas. (True)\n- Option D: Increasing the concentration of reactants (CH₄ or O₂) shifts the equilibrium to the right (forward) by Le Chatelier's principle. (True)\n- Option C: For the reaction CH₄(g) + 2O₂(g) ⇌ CO₂(g) + 2H₂O(l), H₂O(l) is excluded as its activity is 1. The equilibrium constant in terms of partial pressures is:\nKp = P_CO₂ / (P_CH₄ × P_O₂²).\nOption C incorrectly omits the power of 2 for O₂ (due to its stoichiometric coefficient 2) and writes concentrations instead of partial pressures for Kp.\nTherefore, statement C is not true.\nTherefore, Option (C) is the correct answer.",
    similarQuestion: {
      question: "For the equilibrium 2SO₂(g) + O₂(g) ⇌ 2SO₃(g), which of the following is the correct expression for Kp?",
      option_a: "Kp = (P_SO₃)² / [ (P_SO₂)² × P_O₂ ]",
      option_b: "Kp = P_SO₃ / [ P_SO₂ × P_O₂ ]",
      option_c: "Kp = [ (P_SO₂)² × P_O₂ ] / (P_SO₃)²",
      option_d: "Kp = (P_SO₃)² / [ P_SO₂ × (P_O₂)² ]",
      correct_option: "A",
      explanation: "According to the law of mass action, Kp = (P_SO₃)² / [ (P_SO₂)² × P_O₂ ].\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 1647,
    question: "The equilibrium constants of the following reactions are: N₂ + 3H₂ ⇌ 2NH₃; K₁ N₂ + O₂ ⇌ 2NO; K₂ H₂ + (1/2)O₂ ⇌ H₂O; K₃ The equilibrium constant (K) of the reaction 2NH₃ + (5/2)O₂ ⇌ 2NO + 3H₂O will be: [AIPMT 2007]",
    optionA: "K₂K₃³/K₁",
    optionB: "K₂K₃/K₁",
    optionC: "K₂³K₃/K₁",
    optionD: "K₁K₃³/K₂",
    correctOption: "A",
    explanation: "To obtain the target reaction:\n2NH₃ + (5/2)O₂ ⇌ 2NO + 3H₂O\nWe combine the given reactions as follows:\n1. Reverse Reaction 1: 2NH₃ ⇌ N₂ + 3H₂, with K' = 1 / K₁\n2. Retain Reaction 2: N₂ + O₂ ⇌ 2NO, with K'' = K₂\n3. Multiply Reaction 3 by 3: 3H₂ + (3/2)O₂ ⇌ 3H₂O, with K''' = K₃³\nAdding these three reactions:\n2NH₃ + (5/2)O₂ ⇌ 2NO + 3H₂O\nThe resulting equilibrium constant is the product of the individual constants:\nK = K' × K'' × K''' = (1 / K₁) × K₂ × K₃³ = (K₂ K₃³) / K₁.\nTherefore, Option (A) is the correct answer.",
    similarQuestion: {
      question: "If K₁ and K₂ are the equilibrium constants for the reactions SO₂(g) + (1/2)O₂(g) ⇌ SO₃(g) and 2SO₃(g) ⇌ 2SO₂(g) + O₂(g) respectively, then:",
      option_a: "K₂ = 1 / K₁²",
      option_b: "K₂ = K₁²",
      option_c: "K₂ = 1 / K₁",
      option_d: "K₂ = √K₁",
      correct_option: "A",
      explanation: "Reversing the first reaction and squaring both sides yields the second reaction. Hence, K₂ = 1 / K₁².\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 1646,
    question: "The values of Kp for the reactions: X ⇌ Y + Z ...(i) A ⇌ 2B ...(ii) are in the ratio 9 : 1. If the degree of dissociation of X and A is equal, then the total pressures at equilibrium (i) and (ii) are in the ratio: [AIPMT 2008]",
    optionA: "36 : 1",
    optionB: "1 : 1",
    optionC: "3 : 1",
    optionD: "1 : 9",
    correctOption: "A",
    explanation: "Let the initial moles of X and A each be 1, and degree of dissociation be α for both.\nFor reaction (i): X ⇌ Y + Z\nMoles at equilibrium: X = 1 − α, Y = α, Z = α. Total moles = 1 + α.\nPartial pressures: P_X = [(1 − α)/(1 + α)] P₁, P_Y = [α/(1 + α)] P₁, P_Z = [α/(1 + α)] P₁.\nKp₁ = (P_Y × P_Z) / P_X = [α² / (1 − α²)] P₁.\nFor reaction (ii): A ⇌ 2B\nMoles at equilibrium: A = 1 − α, B = 2α. Total moles = 1 + α.\nPartial pressures: P_A = [(1 − α)/(1 + α)] P₂, P_B = [2α/(1 + α)] P₂.\nKp₂ = (P_B)² / P_A = [4α² / (1 − α²)] P₂.\nTaking the ratio:\nKp₁ / Kp₂ = { [α² / (1 − α²)] P₁ } / { [4α² / (1 − α²)] P₂ } = P₁ / (4 P₂).\nGiven Kp₁ / Kp₂ = 9 / 1:\nP₁ / (4 P₂) = 9 / 1\nP₁ / P₂ = 36 / 1.\nTherefore, the total pressures are in the ratio 36 : 1.\nTherefore, Option (A) is the correct answer.",
    similarQuestion: {
      question: "For the equilibria PCl₅(g) ⇌ PCl₃(g) + Cl₂(g) and N₂O₄(g) ⇌ 2NO₂(g), if both have the same degree of dissociation α and the equilibrium constants are equal (Kp₁ = Kp₂), what is the ratio of their total pressures P₁ / P₂?",
      option_a: "4 : 1",
      option_b: "1 : 4",
      option_c: "1 : 1",
      option_d: "2 : 1",
      correct_option: "A",
      explanation: "For PCl₅ ⇌ PCl₃ + Cl₂, Kp₁ = [α² / (1 − α²)] P₁.\nFor N₂O₄ ⇌ 2NO₂, Kp₂ = [4α² / (1 − α²)] P₂.\nGiven Kp₁ = Kp₂:\n[α² / (1 − α²)] P₁ = [4α² / (1 − α²)] P₂ ⇒ P₁ = 4 P₂ ⇒ P₁ / P₂ = 4 : 1.\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 1645,
    question: "The value of the equilibrium constant of the reaction HI(g) ⇌ (1/2)H₂(g) + (1/2)I₂(g) is 8.0. The equilibrium constant of the reaction H₂(g) + I₂(g) ⇌ 2HI(g) will be: [AIPMT 2008]",
    optionA: "16",
    optionB: "1/8",
    optionC: "1/16",
    optionD: "1/64",
    correctOption: "D",
    explanation: "Given reaction (1):\nHI(g) ⇌ (1/2)H₂(g) + (1/2)I₂(g), K₁ = 8.0.\nTarget reaction:\nH₂(g) + I₂(g) ⇌ 2HI(g), K = ?\nTo obtain the target reaction from reaction (1):\n1. Reverse the reaction: (1/2)H₂(g) + (1/2)I₂(g) ⇌ HI(g), with K' = 1 / K₁ = 1 / 8.0.\n2. Multiply the reaction by 2: H₂(g) + I₂(g) ⇌ 2HI(g), with K = (K')² = (1 / 8.0)² = 1 / 64.\nTherefore, Option (D) is the correct answer.",
    similarQuestion: {
      question: "The equilibrium constant for the reaction N₂(g) + O₂(g) ⇌ 2NO(g) is 4 × 10⁻⁴. What is the equilibrium constant for NO(g) ⇌ (1/2)N₂(g) + (1/2)O₂(g)?",
      option_a: "50",
      option_b: "25",
      option_c: "2 × 10⁻²",
      option_d: "100",
      correct_option: "A",
      explanation: "K' = 1 / √K = 1 / √(4 × 10⁻⁴) = 1 / (2 × 10⁻²) = 100 / 2 = 50.\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 1644,
    question: "If the concentration of OH⁻ ions in the reaction Fe(OH)₃(s) ⇌ Fe³⁺(aq) + 3OH⁻(aq) is decreased by 1/4 times, then equilibrium concentration of Fe³⁺ will increase by: [AIPMT 2008]",
    optionA: "64 times",
    optionB: "4 times",
    optionC: "8 times",
    optionD: "16 times",
    correctOption: "A",
    explanation: "For the dissolution equilibrium:\nFe(OH)₃(s) ⇌ Fe³⁺(aq) + 3OH⁻(aq)\nThe solubility product Ksp is given by:\nKsp = [Fe³⁺] [OH⁻]³ = constant (at constant temperature).\nLet the initial concentrations be [Fe³⁺]₁ and [OH⁻]₁.\nWhen [OH⁻]₂ = (1/4) [OH⁻]₁:\nKsp = [Fe³⁺]₂ [OH⁻]₂³ = [Fe³⁺]₂ × ((1/4) [OH⁻]₁)³ = [Fe³⁺]₂ × (1/64) [OH⁻]₁³.\nEquating to the initial expression:\n[Fe³⁺]₁ [OH⁻]₁³ = [Fe³⁺]₂ × (1/64) [OH⁻]₁³\n[Fe³⁺]₂ = 64 [Fe³⁺]₁.\nTherefore, the concentration of Fe³⁺ will increase by 64 times.\nTherefore, Option (A) is the correct answer.",
    similarQuestion: {
      question: "For the sparingly soluble salt Al(OH)₃(s) ⇌ Al³⁺(aq) + 3OH⁻(aq), if the pH of the solution is decreased by 1 unit, the equilibrium concentration of Al³⁺ will:",
      option_a: "Increase by 1000 times",
      option_b: "Increase by 100 times",
      option_c: "Decrease by 1000 times",
      option_d: "Increase by 3 times",
      correct_option: "A",
      explanation: "Decreasing pH by 1 unit increases [H⁺] by 10 times and decreases [OH⁻] by 10 times (to 0.1 of its value).\nSince Ksp = [Al³⁺] [OH⁻]³, [Al³⁺] must increase by (10)³ = 1000 times to maintain constant Ksp.\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 1643,
    question: "The dissociation equilibrium of a gas AB₂ can be represented as: 2AB₂(g) ⇌ 2AB(g) + B₂(g). The degree of dissociation is x and is small compared to 1. The expression relating the degree of dissociation (x) with equilibrium constant Kp and total pressure P is: [AIPMT 2008]",
    optionA: "(2Kp/P)¹ᐟ²",
    optionB: "Kp/P",
    optionC: "2Kp/P",
    optionD: "(2Kp/P)¹ᐟ³",
    correctOption: "D",
    explanation: "Initial moles of AB₂ = 1.\nAt equilibrium:\nAB₂ = 1 − x\nAB = x\nB₂ = x / 2\nTotal moles at equilibrium = (1 − x) + x + x/2 = 1 + x/2 ≈ 1 (since x << 1).\nPartial pressures at total pressure P:\nP_AB₂ ≈ (1 − x) P ≈ P\nP_AB = x P\nP_B₂ = (x/2) P\nEquilibrium constant expression:\nKp = (P_AB)² (P_B₂) / (P_AB₂)²\nKp = (x P)² ((x/2) P) / P² = (x² P² × x P) / (2 P²) = (x³ P) / 2.\nRearranging for x:\nx³ = 2 Kp / P\nx = (2 Kp / P)¹ᐟ³.\nTherefore, Option (D) is the correct answer.",
    similarQuestion: {
      question: "For the dissociation reaction 2A(g) ⇌ 2B(g) + C(g), if the degree of dissociation α is very small compared to 1, α is proportional to:",
      option_a: "P⁻¹ᐟ³",
      option_b: "P⁻¹ᐟ²",
      option_c: "P⁻¹",
      option_d: "P¹ᐟ³",
      correct_option: "A",
      explanation: "Since α³ ∝ (1/P), taking the cube root yields α ∝ P⁻¹ᐟ³.\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 1642,
    question: "The dissociation constants for acetic acid and HCN at 25°C are 1.5 × 10⁻⁵ and 4.5 × 10⁻¹⁰, respectively. The equilibrium constant for the equilibrium CN⁻ + CH₃COOH ⇌ HCN + CH₃COO⁻ would be: [AIPMT 2009]",
    optionA: "3.0 × 10⁻⁵",
    optionB: "3.0 × 10⁻⁴",
    optionC: "3.0 × 10⁴",
    optionD: "3.0 × 10⁵",
    correctOption: "C",
    explanation: "Given equilibria and their dissociation constants:\n1. CH₃COOH ⇌ CH₃COO⁻ + H⁺, Ka₁ = 1.5 × 10⁻⁵ = ([CH₃COO⁻][H⁺]) / [CH₃COOH]\n2. HCN ⇌ H⁺ + CN⁻, Ka₂ = 4.5 × 10⁻¹⁰ = ([H⁺][CN⁻]) / [HCN]\nFor the target equilibrium:\nCN⁻ + CH₃COOH ⇌ HCN + CH₃COO⁻\nThe equilibrium constant K is:\nK = ([HCN][CH₃COO⁻]) / ([CN⁻][CH₃COOH])\nMultiplying numerator and denominator by [H⁺]:\nK = { ([CH₃COO⁻][H⁺]) / [CH₃COOH] } / { ([H⁺][CN⁻]) / [HCN] } = Ka₁ / Ka₂.\nSubstituting the given values:\nK = (1.5 × 10⁻⁵) / (4.5 × 10⁻¹⁰) = (1.5 / 4.5) × 10⁵ = (1/3) × 10⁵ ≈ 0.333 × 10⁵ = 3.33 × 10⁴ ≈ 3.0 × 10⁴.\nTherefore, Option (C) is the correct answer.",
    similarQuestion: {
      question: "The ionization constants of two weak acids HA and HB are 2.0 × 10⁻⁴ and 5.0 × 10⁻⁸ respectively. The equilibrium constant for HA + B⁻ ⇌ A⁻ + HB is:",
      option_a: "4.0 × 10³",
      option_b: "2.5 × 10⁻⁴",
      option_c: "1.0 × 10⁻¹¹",
      option_d: "4.0 × 10⁻³",
      correct_option: "A",
      explanation: "K = Ka(HA) / Ka(HB) = (2.0 × 10⁻⁴) / (5.0 × 10⁻⁸) = 0.4 × 10⁴ = 4.0 × 10³.\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 1641,
    question: "In which of the following equilibria are Kc and Kp not equal? [AIPMT 2010 Prelims]",
    optionA: "2NO(g) ⇌ N₂(g) + O₂(g)",
    optionB: "SO₂(g) + NO₂(g) ⇌ SO₃(g) + NO(g)",
    optionC: "H₂(g) + I₂(g) ⇌ 2HI(g)",
    optionD: "2C(s) + O₂(g) ⇌ 2CO₂(g)",
    correctOption: "D",
    explanation: "The relation between Kp and Kc is given by:\nKp = Kc (RT)^(Δn_g),\nwhere Δn_g = (moles of gaseous products) − (moles of gaseous reactants).\nKp = Kc only when Δn_g = 0.\nLet us evaluate Δn_g for each reaction:\n- Option A: 2NO(g) ⇌ N₂(g) + O₂(g) → Δn_g = (1 + 1) − 2 = 0. (Kp = Kc)\n- Option B: SO₂(g) + NO₂(g) ⇌ SO₃(g) + NO(g) → Δn_g = (1 + 1) − (1 + 1) = 0. (Kp = Kc)\n- Option C: H₂(g) + I₂(g) ⇌ 2HI(g) → Δn_g = 2 − (1 + 1) = 0. (Kp = Kc)\n- Option D: 2C(s) + O₂(g) ⇌ 2CO₂(g) → Δn_g = 2 (CO₂) − 1 (O₂) = +1 ≠ 0 (C is solid). (Kp ≠ Kc)\nTherefore, Kp and Kc are not equal for reaction D.\nTherefore, Option (D) is the correct answer.",
    similarQuestion: {
      question: "For which of the following reactions is Kp equal to Kc?",
      option_a: "H₂(g) + I₂(g) ⇌ 2HI(g)",
      option_b: "PCl₅(g) ⇌ PCl₃(g) + Cl₂(g)",
      option_c: "N₂(g) + 3H₂(g) ⇌ 2NH₃(g)",
      option_d: "2SO₂(g) + O₂(g) ⇌ 2SO₃(g)",
      correct_option: "A",
      explanation: "Kp = Kc when Δn_g = 0. For H₂(g) + I₂(g) ⇌ 2HI(g), Δn_g = 2 − (1 + 1) = 0, so Kp = Kc.\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 1640,
    question: "The reaction 2A(g) + B(g) ⇌ 3C(g) + D(g) is begun with the concentrations of A and B both at an initial value of 1.00 M. When equilibrium is reached, the concentration of D is measured and found to be 0.25 M. The value for the equilibrium constant for this reaction is given by the expression: [AIPMT 2010 Mains]",
    optionA: "[(0.75)³(0.25)]/[(1.00)²(1.00)]",
    optionB: "[(0.75)³(0.25)]/[(0.50)²(0.75)]",
    optionC: "[(0.75)³(0.25)]/[(0.50)²(0.25)]",
    optionD: "[(0.75)³(0.25)]/[(0.75)²(0.25)]",
    correctOption: "B",
    explanation: "Let the reaction be:\n2A(g) + B(g) ⇌ 3C(g) + D(g)\nInitial concentrations:\n[A]₀ = 1.00 M, [B]₀ = 1.00 M, [C]₀ = 0, [D]₀ = 0.\nAt equilibrium, let x be the concentration of D formed.\nGiven [D]_eq = x = 0.25 M.\nAccording to stoichiometry:\n- [C]_eq = 3x = 3 × 0.25 = 0.75 M\n- [B]_eq = [B]₀ − x = 1.00 − 0.25 = 0.75 M\n- [A]_eq = [A]₀ − 2x = 1.00 − 2(0.25) = 1.00 − 0.50 = 0.50 M\nThe equilibrium constant expression is:\nKc = ([C]³ [D]) / ([A]² [B]) = [ (0.75)³ (0.25) ] / [ (0.50)² (0.75) ].\nTherefore, Option (B) is the correct answer.",
    similarQuestion: {
      question: "For A(g) + 2B(g) ⇌ 2C(g), starting with [A] = 1.0 M and [B] = 2.0 M, if [C] at equilibrium is 1.0 M, the equilibrium constant Kc is:",
      option_a: "2.0",
      option_b: "1.0",
      option_c: "0.5",
      option_d: "4.0",
      correct_option: "A",
      explanation: "[C] = 1.0 M ⇒ 2x = 1.0 ⇒ x = 0.5 M.\n[A] = 1.0 − 0.5 = 0.5 M.\n[B] = 2.0 − 2(0.5) = 1.0 M.\nKc = [C]² / ([A][B]²) = (1.0)² / (0.5 × 1.0²) = 1 / 0.5 = 2.0.\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 1639,
    question: "For the reaction N₂(g) + O₂(g) ⇌ 2NO(g), the equilibrium constant is K₁. The equilibrium constant is K₂ for the reaction: 2NO(g) + O₂(g) ⇌ 2NO₂(g). What is K for the reaction NO₂(g) ⇌ (1/2)N₂(g) + O₂(g)? [AIPMT 2011 Prelims]",
    optionA: "1/(2K₁K₂)",
    optionB: "1/(4K₁K₂)",
    optionC: "[1/(K₁K₂)]¹ᐟ²",
    optionD: "1/(K₁K₂)",
    correctOption: "C",
    explanation: "Given reactions:\n1. N₂(g) + O₂(g) ⇌ 2NO(g), equilibrium constant = K₁\n2. 2NO(g) + O₂(g) ⇌ 2NO₂(g), equilibrium constant = K₂\nAdding reactions (1) and (2):\nN₂(g) + 2O₂(g) ⇌ 2NO₂(g), K₃ = K₁ × K₂.\nTarget reaction:\nNO₂(g) ⇌ (1/2)N₂(g) + O₂(g)\nNotice that the target reaction is obtained by:\n1. Reversing the combined reaction: 2NO₂(g) ⇌ N₂(g) + 2O₂(g) → K' = 1 / K₃ = 1 / (K₁ K₂)\n2. Multiplying by 1/2: NO₂(g) ⇌ (1/2)N₂(g) + O₂(g) → K = (K')¹ᐟ² = [ 1 / (K₁ K₂) ]¹ᐟ².\nTherefore, Option (C) is the correct answer.",
    similarQuestion: {
      question: "If A + B ⇌ C has equilibrium constant K₁ and C + D ⇌ E has equilibrium constant K₂, what is the equilibrium constant for E ⇌ A + B + D?",
      option_a: "1 / (K₁ K₂)",
      option_b: "K₁ / K₂",
      option_c: "K₁ K₂",
      option_d: "√(K₁ K₂)",
      correct_option: "A",
      explanation: "Adding the two reactions gives A + B + D ⇌ E with K = K₁ K₂. Reversing this gives K' = 1 / (K₁ K₂).\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 1638,
    question: "The value of ΔH for the reaction X₂(g) + 4Y₂(g) ⇌ 2XY₄(g) is less than zero. Formation of XY₄(g) will be favoured at: [AIPMT 2011 Prelims]",
    optionA: "High temperature and high pressure",
    optionB: "Low pressure and low temperature",
    optionC: "High temperature and low pressure",
    optionD: "High pressure and low temperature",
    correctOption: "D",
    explanation: "For the reaction X₂(g) + 4Y₂(g) ⇌ 2XY₄(g):\n1. Effect of temperature: ΔH < 0 means the forward reaction is exothermic. According to Le Chatelier's principle, lowering the temperature shifts the equilibrium in the exothermic (forward) direction. Thus, low temperature favours the formation of XY₄.\n2. Effect of pressure: Calculate change in gaseous moles:\nΔn_g = 2 − (1 + 4) = 2 − 5 = −3 moles.\nThe forward reaction proceeds with a decrease in the number of gaseous moles (from 5 moles to 2 moles). Increasing the pressure shifts the equilibrium towards the side with fewer gas moles (forward direction). Thus, high pressure favours the formation of XY₄.\nHence, formation of XY₄(g) is favoured by high pressure and low temperature.\nTherefore, Option (D) is the correct answer.",
    similarQuestion: {
      question: "The synthesis of ammonia by Haber's process: N₂(g) + 3H₂(g) ⇌ 2NH₃(g), ΔH = −92.4 kJ mol⁻¹, is favoured by:",
      option_a: "High pressure and low temperature",
      option_b: "Low pressure and high temperature",
      option_c: "High pressure and high temperature",
      option_d: "Low pressure and low temperature",
      correct_option: "A",
      explanation: "Since ΔH < 0 (exothermic) and Δn_g = 2 − 4 = −2 (decrease in gaseous moles), high pressure and low temperature favour the forward yield of NH₃.\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 1637,
    question: "Given the reaction between two gases represented by A₂ and B₂ to give the compound AB(g): A₂(g) + B₂(g) ⇌ 2AB(g). At equilibrium, the concentration of A₂ = 3.0 × 10⁻³ M, B₂ = 4.2 × 10⁻³ M and AB = 2.8 × 10⁻³ M. If the reaction takes place in a sealed vessel at 527°C, then the value of Kc will be: [AIPMT 2012 Mains]",
    optionA: "2.0",
    optionB: "1.9",
    optionC: "0.62",
    optionD: "4.5",
    correctOption: "C",
    explanation: "For the reaction:\nA₂(g) + B₂(g) ⇌ 2AB(g)\nThe equilibrium constant expression is:\nKc = [AB]² / ([A₂] [B₂])\nGiven equilibrium concentrations:\n[A₂] = 3.0 × 10⁻³ M\n[B₂] = 4.2 × 10⁻³ M\n[AB] = 2.8 × 10⁻³ M\nSubstituting these values into the expression:\nKc = (2.8 × 10⁻³)² / [ (3.0 × 10⁻³) × (4.2 × 10⁻³) ]\nKc = (7.84 × 10⁻⁶) / (12.6 × 10⁻⁶) = 7.84 / 12.6 ≈ 0.622 ≈ 0.62.\nTherefore, Option (C) is the correct answer.",
    similarQuestion: {
      question: "For the reaction H₂(g) + I₂(g) ⇌ 2HI(g), equilibrium concentrations are [H₂] = 0.1 M, [I₂] = 0.2 M, and [HI] = 0.4 M. What is Kc?",
      option_a: "8.0",
      option_b: "4.0",
      option_c: "16.0",
      option_d: "2.0",
      correct_option: "A",
      explanation: "Kc = [HI]² / ([H₂][I₂]) = (0.4)² / (0.1 × 0.2) = 0.16 / 0.02 = 8.0.\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 1636,
    question: "Given that the equilibrium constant for the reaction 2SO₂(g) + O₂(g) ⇌ 2SO₃(g) has a value of 278 at a particular temperature. What is the value of the equilibrium constant for the following reaction at the same temperature? SO₃(g) ⇌ SO₂(g) + (1/2)O₂(g) [AIPMT 2012 Mains]",
    optionA: "1.8 × 10⁻³",
    optionB: "3.6 × 10⁻³",
    optionC: "6.0 × 10⁻²",
    optionD: "1.3 × 10⁻⁵",
    correctOption: "C",
    explanation: "Given reaction (1):\n2SO₂(g) + O₂(g) ⇌ 2SO₃(g), K₁ = 278.\nTarget reaction:\nSO₃(g) ⇌ SO₂(g) + (1/2)O₂(g), K = ?\nTo obtain the target reaction from reaction (1):\n1. Reverse the reaction: 2SO₃(g) ⇌ 2SO₂(g) + O₂(g) → K' = 1 / K₁ = 1 / 278.\n2. Multiply the stoichiometric coefficients by 1/2:\nSO₃(g) ⇌ SO₂(g) + (1/2)O₂(g) → K = (K')¹ᐟ² = √(1 / 278) = 1 / √278.\nSince √278 ≈ 16.673:\nK = 1 / 16.673 ≈ 0.05997 ≈ 6.0 × 10⁻².\nTherefore, Option (C) is the correct answer.",
    similarQuestion: {
      question: "If Kc for 2NO₂(g) ⇌ 2NO(g) + O₂(g) is 100, what is Kc for NO(g) + (1/2)O₂(g) ⇌ NO₂(g)?",
      option_a: "0.1",
      option_b: "0.01",
      option_c: "10",
      option_d: "0.05",
      correct_option: "A",
      explanation: "K' = 1 / √K = 1 / √100 = 1 / 10 = 0.1.\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 1635,
    question: "For a given exothermic reaction, Kp and Kp′ are the equilibrium constants at temperatures T₁ and T₂, respectively. Assuming that the heat of reaction is constant in the temperature range between T₁ and T₂, it is readily observed that: [AIPMT 2014]",
    optionA: "Kp > Kp′ (assuming T₁ < T₂)",
    optionB: "Kp < Kp′",
    optionC: "Kp = Kp′",
    optionD: "Kp = 1/Kp′",
    correctOption: "A",
    explanation: "According to the van 't Hoff equation:\nln(Kp′ / Kp) = (ΔH° / R) × (1/T₁ − 1/T₂).\nFor an exothermic reaction, ΔH° < 0 (negative).\nWhen temperature is increased from T₁ to T₂ (such that T₂ > T₁):\n(1/T₁ − 1/T₂) > 0.\nBecause ΔH° is negative:\nln(Kp′ / Kp) < 0 ⇒ Kp′ / Kp < 1 ⇒ Kp′ < Kp (or Kp > Kp′).\nAccording to Le Chatelier's principle, an increase in temperature shifts an exothermic reaction in the reverse direction, decreasing the equilibrium constant.\nHence, at the lower temperature T₁, the equilibrium constant Kp is greater than Kp′ at T₂.\nTherefore, Option (A) is the correct answer.",
    similarQuestion: {
      question: "For an endothermic reaction (ΔH > 0), how does the equilibrium constant K change with an increase in temperature?",
      option_a: "K increases",
      option_b: "K decreases",
      option_c: "K remains constant",
      option_d: "K first decreases then increases",
      correct_option: "A",
      explanation: "For an endothermic reaction, heat is consumed in the forward direction. Raising the temperature shifts the equilibrium forward, thereby increasing K.\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 1634,
    question: "For the reversible reaction: N₂(g) + 3H₂(g) ⇌ 2NH₃(g) + heat. The equilibrium shifts in the forward direction: [AIPMT 2014]",
    optionA: "By increasing the concentration of NH₃(g)",
    optionB: "By decreasing the pressure",
    optionC: "By decreasing the concentrations of N₂(g) and H₂(g)",
    optionD: "By increasing pressure and decreasing temperature",
    correctOption: "D",
    explanation: "Applying Le Chatelier's principle to the exothermic equilibrium:\nN₂(g) + 3H₂(g) ⇌ 2NH₃(g) + heat\n1. Pressure effect: Gaseous moles of reactants = 1 + 3 = 4 mol, gaseous moles of products = 2 mol. Δn_g = 2 − 4 = −2 < 0. Increasing total pressure shifts the equilibrium towards fewer gas moles, i.e., in the forward direction.\n2. Temperature effect: The forward reaction releases heat (exothermic). Decreasing the temperature shifts the equilibrium in the direction that releases heat, i.e., in the forward direction.\n3. Concentration effect: Increasing [N₂] or [H₂], or continuously removing [NH₃], shifts equilibrium forward.\nTherefore, increasing pressure and decreasing temperature shifts the equilibrium in the forward direction.\nTherefore, Option (D) is the correct answer.",
    similarQuestion: {
      question: "Which set of conditions shifts the equilibrium 2SO₂(g) + O₂(g) ⇌ 2SO₃(g) + heat towards the product side?",
      option_a: "High pressure and low temperature",
      option_b: "Low pressure and high temperature",
      option_c: "Low pressure and low temperature",
      option_d: "High pressure and high temperature",
      correct_option: "A",
      explanation: "The forward reaction is exothermic and results in a decrease in gaseous moles (3 → 2). Hence, high pressure and low temperature shift equilibrium towards SO₃.\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 1633,
    question: "Using the Gibbs energy change, ΔG° = +63.3 kJ, for the following reaction: Ag₂CO₃(s) ⇌ 2Ag⁺(aq) + CO₃²⁻(aq). The Ksp of Ag₂CO₃(s) in water at 25°C is: Given: R = 8.314 J K⁻¹ mol⁻¹ [AIPMT 2014]",
    optionA: "3.2 × 10⁻²⁶",
    optionB: "8.0 × 10⁻¹²",
    optionC: "2.9 × 10⁻³",
    optionD: "7.9 × 10⁻²",
    correctOption: "B",
    explanation: "The relationship between standard Gibbs free energy change (ΔG°) and the equilibrium constant (Ksp) is given by:\nΔG° = −2.303 RT log₁₀ Ksp\nGiven:\nΔG° = +63.3 kJ = 63,300 J mol⁻¹\nT = 25 °C = 298.15 K ≈ 298 K\nR = 8.314 J K⁻¹ mol⁻¹\nRearranging for log₁₀ Ksp:\nlog₁₀ Ksp = −ΔG° / (2.303 RT)\n2.303 RT = 2.303 × 8.314 × 298 ≈ 5705.8 J mol⁻¹.\nlog₁₀ Ksp = −63300 / 5705.8 ≈ −11.094.\nTaking antilog:\nKsp = 10^(−11.094) = 10^(0.906 − 12) = 10^(0.906) × 10⁻¹² ≈ 8.05 × 10⁻¹² ≈ 8.0 × 10⁻¹².\nTherefore, Option (B) is the correct answer.",
    similarQuestion: {
      question: "If ΔG° for a reaction at 300 K is −11.5 kJ mol⁻¹, the equilibrium constant K is approximately (R = 8.314 J K⁻¹ mol⁻¹):",
      option_a: "100",
      option_b: "10",
      option_c: "1000",
      option_d: "0.01",
      correct_option: "A",
      explanation: "log₁₀ K = −(−11500) / (2.303 × 8.314 × 300) = 11500 / 5744 ≈ 2.0. Antilog(2.0) = 100.\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 1632,
    question: "If the value of the equilibrium constant for a particular reaction is 1.6 × 10¹², then at equilibrium the system will contain: [AIPMT 2015 Cancelled]",
    optionA: "Mostly products",
    optionB: "Similar amounts of reactants and products",
    optionC: "All reactants",
    optionD: "Mostly reactants",
    correctOption: "A",
    explanation: "The magnitude of the equilibrium constant K indicates the extent to which a reaction proceeds before reaching equilibrium:\n1. If K > 10³: The forward reaction is overwhelmingly favoured; products predominate heavily over reactants, meaning the equilibrium mixture contains mostly products.\n2. If K < 10⁻³: The reaction barely proceeds in the forward direction; the equilibrium mixture contains mostly reactants.\n3. If 10⁻³ < K < 10³: Appreciable concentrations of both reactants and products are present.\nHere, K = 1.6 × 10¹² >> 10³, which is extraordinarily large. Thus, the reaction goes almost to completion, and at equilibrium the system contains mostly products.\nTherefore, Option (A) is the correct answer.",
    similarQuestion: {
      question: "For a chemical reaction at equilibrium, K = 2.5 × 10⁻⁸. At equilibrium, the reaction mixture will consist of:",
      option_a: "Predominantly reactants",
      option_b: "Predominantly products",
      option_c: "Equal amounts of reactants and products",
      option_d: "No reactants at all",
      correct_option: "A",
      explanation: "A very small equilibrium constant (K << 10⁻³) indicates that reactants remain mostly unreacted, so the system contains predominantly reactants.\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 1631,
    question: "Which of the following statements is correct for a reversible process in a state of equilibrium? [AIPMT 2015 Cancelled]",
    optionA: "ΔG° = −2.30 RT log K",
    optionB: "ΔG° = 2.30 RT log K",
    optionC: "ΔG = −2.30 RT log K",
    optionD: "ΔG = 2.30 RT log K",
    correctOption: "A",
    explanation: "At any point during a reaction, the Gibbs free energy change is given by:\nΔG = ΔG° + RT ln Q.\nWhen the reversible process reaches a state of dynamic chemical equilibrium:\n1. The reaction quotient Q becomes equal to the equilibrium constant K (Q = K).\n2. The Gibbs free energy change ΔG equals zero (ΔG = 0).\nSubstituting these into the equation:\n0 = ΔG° + RT ln K\nΔG° = −RT ln K = −2.303 RT log₁₀ K.\nTherefore, Option (A) is the correct answer.",
    similarQuestion: {
      question: "At chemical equilibrium, which of the following is true regarding Gibbs free energy?",
      option_a: "ΔG = 0",
      option_b: "ΔG° = 0",
      option_c: "ΔG > 0",
      option_d: "ΔG° < 0 always",
      correct_option: "A",
      explanation: "At equilibrium, the system is at the minimum of its Gibbs free energy curve, so the net driving force ΔG is zero (ΔG = 0).\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 1630,
    question: "If the equilibrium constant for N₂(g) + O₂(g) ⇌ 2NO(g) is K, the equilibrium constant for (1/2)N₂(g) + (1/2)O₂(g) ⇌ NO(g) will be: [AIPMT 2015]",
    optionA: "K/2",
    optionB: "K",
    optionC: "K²",
    optionD: "K¹ᐟ²",
    correctOption: "D",
    explanation: "Given reaction (1):\nN₂(g) + O₂(g) ⇌ 2NO(g), with K = [NO]² / ([N₂][O₂]).\nTarget reaction:\n(1/2)N₂(g) + (1/2)O₂(g) ⇌ NO(g), with K' = [NO] / ([N₂]¹ᐟ² [O₂]¹ᐟ²).\nNotice that the stoichiometric coefficients of reaction (1) are multiplied by 1/2.\nWhen a reaction is multiplied by a factor n, its equilibrium constant is raised to the power n:\nK' = (K)ⁿ = K¹ᐟ² = √K.\nTherefore, Option (D) is the correct answer.",
    similarQuestion: {
      question: "The equilibrium constant for 2SO₂(g) + O₂(g) ⇌ 2SO₃(g) is K. The equilibrium constant for SO₂(g) + (1/2)O₂(g) ⇌ SO₃(g) is:",
      option_a: "√K",
      option_b: "K / 2",
      option_c: "K²",
      option_d: "1 / √K",
      correct_option: "A",
      explanation: "Multiplying stoichiometric coefficients by 1/2 raises the equilibrium constant to the power 1/2: K' = √K.\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 1629,
    question: "Consider the following liquid-vapour equilibrium: Liquid ⇌ Vapour. Which of the following relations is correct? [NEET 2016 Phase 1]",
    optionA: "d(ln P)/d(T²) = −ΔHᵥ/T²",
    optionB: "d(ln P)/dT = ΔHᵥ/(RT²)",
    optionC: "d(ln G)/d(T²) = ΔHᵥ/(RT²)",
    optionD: "d(ln P)/dT = −ΔHᵥ/(RT)",
    correctOption: "B",
    explanation: "For the phase transition equilibrium: Liquid ⇌ Vapour, the equilibrium vapour pressure P is related to temperature T by the Clausius-Clapeyron equation.\nFrom the van 't Hoff isochore:\nd(ln Kp)/dT = ΔH° / (RT²).\nSince the active mass of the pure liquid is unity, Kp = P_vapour = P.\nSubstituting Kp = P and ΔH° = ΔHᵥ (enthalpy of vaporization):\nd(ln P) / dT = ΔHᵥ / (RT²).\nTherefore, Option (B) is the correct answer.",
    similarQuestion: {
      question: "The integrated form of the Clausius-Clapeyron equation for vapour pressure P as a function of temperature T is:",
      option_a: "ln(P₂ / P₁) = −(ΔHᵥ / R) [1/T₂ − 1/T₁]",
      option_b: "ln(P₂ / P₁) = (ΔHᵥ / R) [1/T₂ − 1/T₁]",
      option_c: "ln(P₂ / P₁) = −(ΔHᵥ / RT) [T₂ − T₁]",
      option_d: "P₂ / P₁ = (ΔHᵥ / R) (T₂ / T₁)",
      correct_option: "A",
      explanation: "Integrating d(ln P) = (ΔHᵥ / R) (dT / T²) yields ln(P₂ / P₁) = −(ΔHᵥ / R) [1/T₂ − 1/T₁] = (ΔHᵥ / R) [1/T₁ − 1/T₂].\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 1628,
    question: "A 20 litre container at 400 K contains CO₂(g) at a pressure of 0.4 atm and an excess of SrO (neglect the volume of solid SrO). The volume of the container is now decreased by moving the movable piston fitted in the container. The maximum volume of the container, when the pressure of CO₂ attains its maximum value, will be: Given: SrCO₃(s) ⇌ SrO(s) + CO₂(g), Kp = 1.6 atm [NEET 2017]",
    optionA: "10 litre",
    optionB: "4 litre",
    optionC: "2 litre",
    optionD: "5 litre",
    correctOption: "D",
    explanation: "For the decomposition equilibrium:\nSrCO₃(s) ⇌ SrO(s) + CO₂(g)\nThe equilibrium constant is Kp = P_CO₂ = 1.6 atm.\nThis means that the maximum possible partial pressure that CO₂ can attain at 400 K in the presence of excess SrO and SrCO₃ is 1.6 atm.\nInitially:\nV₁ = 20 L, P₁ = 0.4 atm.\nAs the volume is decreased isothermally (at constant T = 400 K), the gas undergoes compression according to Boyle's law until its pressure reaches the equilibrium decomposition pressure P₂ = 1.6 atm:\nP₁ V₁ = P₂ V₂\n(0.4 atm) × (20 L) = (1.6 atm) × V₂\nV₂ = (0.4 × 20) / 1.6 = 8 / 1.6 = 5 L.\nWhen the volume is reduced below 5 L, the pressure cannot exceed 1.6 atm because the excess CO₂ reacts with SrO to form SrCO₃(s), maintaining P_CO₂ = 1.6 atm.\nThus, the maximum volume at which the pressure attains its maximum value of 1.6 atm is 5 litres.\nTherefore, Option (D) is the correct answer.",
    similarQuestion: {
      question: "A 10 L vessel at 500 K contains CO₂(g) at 0.5 atm over excess CaO. If CaCO₃(s) ⇌ CaO(s) + CO₂(g) has Kp = 2.0 atm, what is the maximum volume to which the vessel must be compressed for P_CO₂ to reach 2.0 atm?",
      option_a: "2.5 L",
      option_b: "5.0 L",
      option_c: "1.25 L",
      option_d: "4.0 L",
      correct_option: "A",
      explanation: "By Boyle's law: P₁ V₁ = P₂ V₂ ⇒ (0.5 atm)(10 L) = (2.0 atm) V₂ ⇒ V₂ = 5 / 2.0 = 2.5 L.\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 1627,
    question: "The equilibrium constants of the following reactions are: N₂ + 3H₂ ⇌ 2NH₃; K₁ N₂ + O₂ ⇌ 2NO; K₂ H₂ + (1/2)O₂ ⇌ H₂O; K₃ The equilibrium constant (K) of the reaction 2NH₃ + (5/2)O₂ ⇌ 2NO + 3H₂O will be: [NEET 2017]",
    optionA: "K₂K₃³/K₁",
    optionB: "K₂K₃/K₁",
    optionC: "K₂³K₃/K₁",
    optionD: "K₁K₃³/K₂",
    correctOption: "A",
    explanation: "Let us assemble the target reaction:\n2NH₃ + (5/2)O₂ ⇌ 2NO + 3H₂O\n1. Reverse reaction 1: 2NH₃ ⇌ N₂ + 3H₂ → Equilibrium constant = 1 / K₁\n2. Retain reaction 2: N₂ + O₂ ⇌ 2NO → Equilibrium constant = K₂\n3. Multiply reaction 3 by 3: 3H₂ + (3/2)O₂ ⇌ 3H₂O → Equilibrium constant = K₃³\nSumming these reactions cancels N₂ and 3H₂:\n2NH₃ + (5/2)O₂ ⇌ 2NO + 3H₂O\nMultiplying their equilibrium constants:\nK = (1 / K₁) × K₂ × K₃³ = (K₂ K₃³) / K₁.\nTherefore, Option (A) is the correct answer.",
    similarQuestion: {
      question: "Given: (1) H₂(g) + (1/2)O₂(g) ⇌ H₂O(g), K₁; (2) CO₂(g) ⇌ CO(g) + (1/2)O₂(g), K₂. The equilibrium constant for CO₂(g) + H₂(g) ⇌ CO(g) + H₂O(g) is:",
      option_a: "K₁ K₂",
      option_b: "K₁ / K₂",
      option_c: "K₂ / K₁",
      option_d: "√(K₁ K₂)",
      correct_option: "A",
      explanation: "Adding reactions (1) and (2) directly produces CO₂ + H₂ ⇌ CO + H₂O. Therefore, K = K₁ K₂.\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 1626,
    question: "Which one of the following conditions will favour maximum formation of the product in the reaction A₂(g) + B₂(g) ⇌ X₂(g), ΔrH = −X kJ? [NEET 2018]",
    optionA: "Low temperature and high pressure",
    optionB: "Low temperature and low pressure",
    optionC: "High temperature and high pressure",
    optionD: "High temperature and low pressure",
    correctOption: "A",
    explanation: "For the reaction A₂(g) + B₂(g) ⇌ X₂(g):\n1. Temperature effect: The enthalpy of reaction ΔrH = −X kJ is negative (exothermic). Decreasing the temperature shifts the equilibrium in the forward (exothermic) direction according to Le Chatelier's principle.\n2. Pressure effect: Gaseous moles of reactants = 1 + 1 = 2 moles; gaseous moles of product = 1 mole.\nΔn_g = 1 − 2 = −1 mole. The forward reaction proceeds with a decrease in the number of gaseous moles. Increasing pressure shifts the equilibrium towards fewer gas moles (the product side).\nTherefore, low temperature and high pressure will favour maximum formation of product X₂.\nTherefore, Option (A) is the correct answer.",
    similarQuestion: {
      question: "For the exothermic reaction 2A(g) + B(g) ⇌ C(g), the maximum yield of C is obtained at:",
      option_a: "Low temperature and high pressure",
      option_b: "High temperature and low pressure",
      option_c: "High temperature and high pressure",
      option_d: "Low temperature and low pressure",
      correct_option: "A",
      explanation: "Since the reaction is exothermic (favoured by low T) and Δn_g = 1 − 3 = −2 (favoured by high P), low temperature and high pressure maximize the yield.\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 1625,
    question: "3O₂(g) ⇌ 2O₃(g) For the above reaction at 298 K, Kc is found to be 3.0 × 10⁻⁵⁹. If the concentration of O₂ at equilibrium is 0.040 M, then the concentration of O₃ in M is: [NEET 2022 Phase 1]",
    optionA: "4.38 × 10⁻³²",
    optionB: "1.9 × 10⁻⁶³",
    optionC: "2.4 × 10³¹",
    optionD: "1.2 × 10²¹",
    correctOption: "A",
    explanation: "For the reaction 3O₂(g) ⇌ 2O₃(g):\nThe equilibrium constant expression is:\nKc = [O₃]² / [O₂]³\nGiven:\nKc = 3.0 × 10⁻⁵⁹\n[O₂] = 0.040 M = 4.0 × 10⁻² M\n[O₂]³ = (4.0 × 10⁻²)³ = 64 × 10⁻⁶ = 6.4 × 10⁻⁵ M³\nRearranging for [O₃]²:\n[O₃]² = Kc × [O₂]³ = (3.0 × 10⁻⁵⁹) × (6.4 × 10⁻⁵) = 19.2 × 10⁻⁶⁴ = 1.92 × 10⁻⁶³\nTaking square root:\n[O₃] = √(19.2 × 10⁻⁶⁴) = √19.2 × 10⁻³² ≈ 4.38 × 10⁻³² M.\nTherefore, Option (A) is the correct answer.",
    similarQuestion: {
      question: "For 2A(g) ⇌ B(g), Kc = 2.0 × 10⁻⁵. If [A] = 0.01 M at equilibrium, what is [B] in M?",
      option_a: "2.0 × 10⁻⁹",
      option_b: "2.0 × 10⁻⁷",
      option_c: "4.0 × 10⁻⁹",
      option_d: "1.0 × 10⁻⁵",
      correct_option: "A",
      explanation: "[B] = Kc × [A]² = (2.0 × 10⁻⁵) × (0.01)² = (2.0 × 10⁻⁵) × (10⁻⁴) = 2.0 × 10⁻⁹ M.\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 1624,
    question: "Kp for the following reaction is 3.0 at 1000 K: CO₂(g) + C(s) ⇌ 2CO(g). What will be the value of Kc for the reaction at the same temperature? Given: R = 0.083 L bar K⁻¹ mol⁻¹ [NEET 2022 Phase 2]",
    optionA: "3.6",
    optionB: "0.36",
    optionC: "3.6 × 10⁻²",
    optionD: "3.6 × 10⁻³",
    correctOption: "C",
    explanation: "For the reaction CO₂(g) + C(s) ⇌ 2CO(g):\nCarbon C(s) is in the solid state, so it does not contribute to Δn_g.\nΔn_g = (moles of gaseous products) − (moles of gaseous reactants) = 2 − 1 = +1.\nThe relationship between Kp and Kc is:\nKp = Kc (RT)^(Δn_g) = Kc (RT)¹\nRearranging for Kc:\nKc = Kp / (RT)\nGiven:\nKp = 3.0\nT = 1000 K\nR = 0.083 L bar K⁻¹ mol⁻¹\nRT = 0.083 × 1000 = 83 L bar mol⁻¹\nKc = 3.0 / 83 ≈ 0.03614 = 3.614 × 10⁻² ≈ 3.6 × 10⁻².\nTherefore, Option (C) is the correct answer.",
    similarQuestion: {
      question: "For the reaction N₂O₄(g) ⇌ 2NO₂(g), Kp = 0.492 atm at 300 K. What is Kc (in mol L⁻¹) given R = 0.082 L atm K⁻¹ mol⁻¹?",
      option_a: "0.02",
      option_b: "0.04",
      option_c: "0.2",
      option_d: "12.1",
      correct_option: "A",
      explanation: "Δn_g = 2 − 1 = 1. Kc = Kp / (RT) = 0.492 / (0.082 × 300) = 0.492 / 24.6 = 0.02 mol L⁻¹.\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 1623,
    question: "For a weak acid HA, the percentage of dissociation is nearly 1% at equilibrium. If the concentration of acid is 0.1 mol L⁻¹, then the correct option for its Ka at the same temperature is: [NEET 2023 Manipur]",
    optionA: "1 × 10⁻⁴",
    optionB: "1 × 10⁻⁶",
    optionC: "1 × 10⁻⁵",
    optionD: "1 × 10⁻³",
    correctOption: "C",
    explanation: "Given:\nPercentage dissociation = 1% ⇒ Degree of dissociation α = 1 / 100 = 0.01 = 10⁻².\nConcentration of weak acid C = 0.1 mol L⁻¹ = 10⁻¹ mol L⁻¹.\nAccording to Ostwald's dilution law for a weak monoprotic acid HA ⇌ H⁺ + A⁻:\nKa = (C α²) / (1 − α)\nSince α = 0.01 << 1, (1 − α) ≈ 1.\nKa ≈ C α² = (0.1) × (0.01)² = 10⁻¹ × (10⁻²)² = 10⁻¹ × 10⁻⁴ = 10⁻⁵ = 1 × 10⁻⁵.\nTherefore, Option (C) is the correct answer.",
    similarQuestion: {
      question: "A weak monobasic acid is 2% dissociated in its 0.05 M aqueous solution. Its acid dissociation constant Ka is:",
      option_a: "2.0 × 10⁻⁵",
      option_b: "1.0 × 10⁻⁴",
      option_c: "4.0 × 10⁻⁵",
      option_d: "2.0 × 10⁻⁴",
      correct_option: "A",
      explanation: "α = 2 / 100 = 0.02. Ka ≈ C α² = 0.05 × (0.02)² = 0.05 × 0.0004 = 2.0 × 10⁻⁵.\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 1622,
    question: "Consider the following reaction in a sealed vessel at equilibrium with concentrations of N₂ = 3.0 × 10⁻³ M, O₂ = 4.2 × 10⁻³ M and NO = 2.8 × 10⁻³ M: 2NO(g) ⇌ N₂(g) + O₂(g). If 0.1 mol L⁻¹ of NO(g) is taken in a closed vessel, what will be the degree of dissociation (α) of NO(g) at equilibrium? [NEET 2024]",
    optionA: "0.00889",
    optionB: "0.0889",
    optionC: "0.8889",
    optionD: "0.717",
    correctOption: "D",
    explanation: "Step 1: Determine the equilibrium constant Kc from the given equilibrium concentrations:\nFor 2NO(g) ⇌ N₂(g) + O₂(g):\nKc = ([N₂][O₂]) / [NO]²\nKc = ((3.0 × 10⁻³) × (4.2 × 10⁻³)) / (2.8 × 10⁻³)²\nKc = (12.6 × 10⁻⁶) / (7.84 × 10⁻⁶) = 12.6 / 7.84 ≈ 1.607.\nStep 2: Start with initial concentration [NO]₀ = C = 0.1 mol L⁻¹:\nAt equilibrium:\n[NO] = C(1 − α)\n[N₂] = Cα / 2\n[O₂] = Cα / 2\nKc = ([N₂][O₂]) / [NO]² = (Cα / 2)² / [C(1 − α)]² = α² / [4(1 − α)²].\nTaking square root on both sides:\n√Kc = α / [2(1 − α)]\nSince √1.607 ≈ 1.2677:\n1.2677 = α / [2(1 − α)]\n2.5354 (1 − α) = α\n2.5354 − 2.5354 α = α\n3.5354 α = 2.5354\nα = 2.5354 / 3.5354 ≈ 0.7171 ≈ 0.717.\nTherefore, Option (D) is the correct answer.",
    similarQuestion: {
      question: "For the reaction 2HI(g) ⇌ H₂(g) + I₂(g), Kc = 0.25. If pure HI is heated in a closed vessel, the degree of dissociation α of HI is:",
      option_a: "0.50",
      option_b: "0.25",
      option_c: "0.33",
      option_d: "0.67",
      correct_option: "A",
      explanation: "Kc = α² / [4(1 − α)²] = 0.25 ⇒ α / [2(1 − α)] = √0.25 = 0.5 ⇒ α = 1 − α ⇒ 2α = 1 ⇒ α = 0.50.\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 1621,
    question: "For the reaction 2A ⇌ B + C, Kc = 4 × 10⁻³. At a given time, the composition of the reaction mixture is [A] = [B] = [C] = 2 × 10⁻³ M. Then, which of the following is correct? [NEET 2024]",
    optionA: "Reaction is at equilibrium.",
    optionB: "Reaction has a tendency to go in the forward direction.",
    optionC: "Reaction has a tendency to go in the backward direction.",
    optionD: "Reaction has gone to completion in the forward direction.",
    correctOption: "C",
    explanation: "For the reaction 2A ⇌ B + C:\nThe reaction quotient Qc is given by:\nQc = ([B][C]) / [A]²\nGiven concentrations:\n[A] = [B] = [C] = 2 × 10⁻³ M\nQc = ((2 × 10⁻³) × (2 × 10⁻³)) / (2 × 10⁻³)² = 1.\nGiven equilibrium constant Kc = 4 × 10⁻³ = 0.004.\nComparing Qc and Kc:\nQc = 1 > Kc = 0.004.\nBecause Qc > Kc, the concentration of products is higher than at equilibrium.\nTo achieve equilibrium, the reaction must consume products and generate reactants, which means it proceeds in the backward (reverse) direction.\nTherefore, Option (C) is the correct answer.",
    similarQuestion: {
      question: "For A + B ⇌ C + D, Kc = 16. If at a given moment [A] = [B] = [C] = [D] = 1 M, in which direction will the reaction proceed?",
      option_a: "Forward direction",
      option_b: "Backward direction",
      option_c: "At equilibrium",
      option_d: "Will not proceed",
      correct_option: "A",
      explanation: "Qc = ([C][D])/([A][B]) = 1. Since Qc (1) < Kc (16), the reaction proceeds in the forward direction.\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 1620,
    question: "In which of the following equilibria are Kp and Kc NOT equal? [NEET 2024]",
    optionA: "PCl₅(g) ⇌ PCl₃(g) + Cl₂(g)",
    optionB: "H₂(g) + I₂(g) ⇌ 2HI(g)",
    optionC: "CO(g) + H₂O(g) ⇌ CO₂(g) + H₂(g)",
    optionD: "2BrCl(g) ⇌ Br₂(g) + Cl₂(g)",
    correctOption: "A",
    explanation: "Kp and Kc are related by:\nKp = Kc (RT)^(Δn_g),\nwhere Δn_g = n_products(g) − n_reactants(g).\nKp = Kc only when Δn_g = 0.\nLet us calculate Δn_g for each option:\n- Option A: PCl₅(g) ⇌ PCl₃(g) + Cl₂(g) → Δn_g = (1 + 1) − 1 = +1 ≠ 0. Hence, Kp ≠ Kc.\n- Option B: H₂(g) + I₂(g) ⇌ 2HI(g) → Δn_g = 2 − (1 + 1) = 0. (Kp = Kc)\n- Option C: CO(g) + H₂O(g) ⇌ CO₂(g) + H₂(g) → Δn_g = (1 + 1) − (1 + 1) = 0. (Kp = Kc)\n- Option D: 2BrCl(g) ⇌ Br₂(g) + Cl₂(g) → Δn_g = (1 + 1) − 2 = 0. (Kp = Kc)\nTherefore, in PCl₅(g) ⇌ PCl₃(g) + Cl₂(g), Kp and Kc are not equal.\nTherefore, Option (A) is the correct answer.",
    similarQuestion: {
      question: "In which of the following gaseous equilibria is Kp > Kc at room temperature (T = 300 K)?",
      option_a: "PCl₅(g) ⇌ PCl₃(g) + Cl₂(g)",
      option_b: "N₂(g) + 3H₂(g) ⇌ 2NH₃(g)",
      option_c: "2SO₂(g) + O₂(g) ⇌ 2SO₃(g)",
      option_d: "H₂(g) + I₂(g) ⇌ 2HI(g)",
      correct_option: "A",
      explanation: "Kp = Kc(RT)^(Δn_g). When Δn_g > 0 and RT > 1, Kp > Kc. For PCl₅ ⇌ PCl₃ + Cl₂, Δn_g = +1, so Kp > Kc.\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 1619,
    question: "For the reaction in equilibrium: N₂(g) + 3H₂(g) ⇌ 2NH₃(g), ΔH = −Q. Reaction is favoured in the forward direction by: [NEET 2024 Re-Examination]",
    optionA: "Use of catalyst",
    optionB: "Decreasing concentration of N₂",
    optionC: "Low pressure, high temperature and high concentration of ammonia",
    optionD: "High pressure, low temperature and higher concentration of H₂",
    correctOption: "D",
    explanation: "For the Haber process synthesis of ammonia:\nN₂(g) + 3H₂(g) ⇌ 2NH₃(g), ΔH = −Q (exothermic).\nApplying Le Chatelier's principle:\n1. Pressure: Δn_g = 2 − (1 + 3) = −2 < 0. Increasing pressure shifts equilibrium towards fewer moles of gas (forward direction).\n2. Temperature: The forward reaction is exothermic (ΔH < 0). Lowering the temperature favours the forward reaction.\n3. Concentration: Increasing the concentration of reactants (N₂ or H₂) or decreasing the concentration of product (NH₃) drives the equilibrium forward.\n4. Catalyst: A catalyst accelerates both forward and reverse reaction rates equally and has no effect on the equilibrium position.\nHence, high pressure, low temperature, and higher concentration of H₂ favour the forward reaction.\nTherefore, Option (D) is the correct answer.",
    similarQuestion: {
      question: "Which conditions favour the forward reaction for 2SO₂(g) + O₂(g) ⇌ 2SO₃(g), ΔH = −198 kJ?",
      option_a: "Increasing pressure and lowering temperature",
      option_b: "Decreasing pressure and raising temperature",
      option_c: "Increasing concentration of SO₃",
      option_d: "Adding an inert gas at constant pressure",
      correct_option: "A",
      explanation: "The reaction is exothermic and involves a decrease in gaseous moles (3 → 2). Increasing pressure and lowering temperature both shift equilibrium forward.\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 1618,
    question: "At a given temperature and pressure, the equilibrium constant values for the equilibria are given below: 3A₂ + B₂ ⇌ 2A₃B, K₁ A₃B ⇌ (3/2)A₂ + (1/2)B₂, K₂ The relation between K₁ and K₂ is: [NEET 2024 Re-Examination]",
    optionA: "K₁² = 2K₂",
    optionB: "K₂ = K₁/2",
    optionC: "K₁ = 1/√K₂",
    optionD: "K₂ = 1/√K₁",
    correctOption: "D",
    explanation: "Given reaction (1):\n3A₂ + B₂ ⇌ 2A₃B, equilibrium constant = K₁.\nGiven reaction (2):\nA₃B ⇌ (3/2)A₂ + (1/2)B₂, equilibrium constant = K₂.\nObserve the relation between the two reactions:\n1. Reversing reaction (1): 2A₃B ⇌ 3A₂ + B₂ → equilibrium constant = 1 / K₁.\n2. Multiplying the reversed reaction by 1/2: A₃B ⇌ (3/2)A₂ + (1/2)B₂ → equilibrium constant = (1 / K₁)¹ᐟ² = 1 / √K₁.\nTherefore, K₂ = 1 / √K₁.\nTherefore, Option (D) is the correct answer.",
    similarQuestion: {
      question: "If 2X + Y ⇌ 2Z has equilibrium constant K, what is the equilibrium constant for Z ⇌ X + (1/2)Y?",
      option_a: "1 / √K",
      option_b: "1 / K²",
      option_c: "√K",
      option_d: "2 / K",
      correct_option: "A",
      explanation: "Reversing the reaction and halving its coefficients yields an equilibrium constant of (1 / K)¹ᐟ² = 1 / √K.\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 1617,
    question: "Higher yield of NO in N₂(g) + O₂(g) ⇌ 2NO(g), ΔH = +180.7 kJ mol⁻¹, can be obtained at: A. Higher temperature B. Lower temperature C. Higher concentration of N₂ D. Higher concentration of O₂ [NEET 2025]",
    optionA: "B, C, D only",
    optionB: "A, C, D only",
    optionC: "A, D only",
    optionD: "B, C only",
    correctOption: "B",
    explanation: "For the reaction N₂(g) + O₂(g) ⇌ 2NO(g), ΔH = +180.7 kJ mol⁻¹:\n1. Temperature effect: The reaction is endothermic (ΔH > 0). According to Le Chatelier's principle, increasing the temperature shifts the equilibrium in the endothermic direction (forward), producing a higher yield of NO. (Condition A is correct; B is incorrect)\n2. Concentration effect: Increasing the concentration of reactants (N₂ or O₂) causes the reaction quotient Q to drop below K, shifting the equilibrium forward to yield more NO. (Conditions C and D are correct)\n3. Pressure effect: Δn_g = 2 − (1 + 1) = 0, so pressure has no effect on the equilibrium position.\nThus, higher temperature, higher [N₂], and higher [O₂] (A, C, D only) favour a higher yield of NO.\nTherefore, Option (B) is the correct answer.",
    similarQuestion: {
      question: "For the endothermic reaction C(s) + H₂O(g) ⇌ CO(g) + H₂(g), which changes will increase the equilibrium yield of CO and H₂?",
      option_a: "Increasing temperature and decreasing pressure",
      option_b: "Decreasing temperature and increasing pressure",
      option_c: "Adding more solid carbon",
      option_d: "Decreasing temperature and increasing steam concentration",
      correct_option: "A",
      explanation: "Since the reaction is endothermic (ΔH > 0), higher temperature shifts it forward. Since Δn_g = (1 + 1) − 1 = +1 > 0, lower pressure shifts it forward.\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 1616,
    question: "For the reaction A(g) ⇌ 2B(g), the backward reaction rate constant is higher than the forward reaction rate constant by a factor of 2500, at 1000 K. Given: R = 0.0831 L atm mol⁻¹ K⁻¹ Kp for the reaction at 1000 K is: [NEET 2025]",
    optionA: "0.033",
    optionB: "0.021",
    optionC: "83.1",
    optionD: "2.077 × 10⁵",
    correctOption: "A",
    explanation: "Step 1: Relate the rate constants to the equilibrium constant Kc:\nAt equilibrium, Rate_forward = Rate_backward\nk_f [A] = k_b [B]²\nKc = k_f / k_b.\nGiven that the backward rate constant (k_b) is higher than the forward rate constant (k_f) by a factor of 2500:\nk_b / k_f = 2500 ⇒ Kc = 1 / 2500 = 4 × 10⁻⁴ mol L⁻¹.\nStep 2: Relate Kc to Kp:\nΔn_g = (moles of gaseous products) − (moles of gaseous reactants) = 2 − 1 = +1.\nKp = Kc (RT)^(Δn_g) = Kc (RT)¹.\nGiven:\nT = 1000 K\nR = 0.0831 L atm mol⁻¹ K⁻¹\nRT = 0.0831 × 1000 = 83.1 L atm mol⁻¹.\nStep 3: Calculate Kp:\nKp = (4 × 10⁻⁴) × 83.1 = 0.03324 ≈ 0.033.\nTherefore, Option (A) is the correct answer.",
    similarQuestion: {
      question: "For A(g) ⇌ 2B(g), at 500 K, k_f = 2.0 × 10⁻³ s⁻¹ and k_b = 8.0 × 10⁻¹ L mol⁻¹ s⁻¹. What is Kp given R = 0.082 L atm K⁻¹ mol⁻¹?",
      option_a: "0.1025",
      option_b: "0.025",
      option_c: "0.41",
      option_d: "2.5",
      correct_option: "A",
      explanation: "Kc = k_f / k_b = (2.0 × 10⁻³) / (8.0 × 10⁻¹) = 2.5 × 10⁻³ mol L⁻¹.\nΔn_g = 2 − 1 = 1. Kp = Kc (RT) = (2.5 × 10⁻³) × (0.082 × 500) = (2.5 × 10⁻³) × 41 = 0.1025 atm.\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 1615,
    question: "Given below are certain reactions. Identify the reaction for which Kp ≠ Kc. [NEET 2026]",
    optionA: "H₂O(g) + CO(g) ⇌ H₂(g) + CO₂(g)",
    optionB: "N₂(g) + 3H₂(g) ⇌ 2NH₃(g)",
    optionC: "H₂(g) + I₂(g) ⇌ 2HI(g)",
    optionD: "N₂(g) + O₂(g) ⇌ 2NO(g)",
    correctOption: "B",
    explanation: "Kp and Kc are related by the formula:\nKp = Kc (RT)^(Δn_g),\nwhere Δn_g is the difference in the number of moles of gaseous products and gaseous reactants.\n- If Δn_g = 0, then (RT)⁰ = 1, so Kp = Kc.\n- If Δn_g ≠ 0, then Kp ≠ Kc.\nLet us determine Δn_g for each reaction:\n- Option A: H₂O(g) + CO(g) ⇌ H₂(g) + CO₂(g) → Δn_g = (1 + 1) − (1 + 1) = 0. (Kp = Kc)\n- Option C: H₂(g) + I₂(g) ⇌ 2HI(g) → Δn_g = 2 − (1 + 1) = 0. (Kp = Kc)\n- Option D: N₂(g) + O₂(g) ⇌ 2NO(g) → Δn_g = 2 − (1 + 1) = 0. (Kp = Kc)\n- Option B: N₂(g) + 3H₂(g) ⇌ 2NH₃(g) → Δn_g = 2 − (1 + 3) = 2 − 4 = −2 ≠ 0. (Kp ≠ Kc)\nTherefore, in reaction B, Kp ≠ Kc.\nTherefore, Option (B) is the correct answer.",
    similarQuestion: {
      question: "For which of the following reactions is Kp = Kc / (RT)²?",
      option_a: "N₂(g) + 3H₂(g) ⇌ 2NH₃(g)",
      option_b: "2SO₃(g) ⇌ 2SO₂(g) + O₂(g)",
      option_c: "PCl₅(g) ⇌ PCl₃(g) + Cl₂(g)",
      option_d: "H₂(g) + Br₂(g) ⇌ 2HBr(g)",
      correct_option: "A",
      explanation: "Kp = Kc (RT)^(Δn_g). If Δn_g = −2, Kp = Kc (RT)⁻² = Kc / (RT)². For N₂ + 3H₂ ⇌ 2NH₃, Δn_g = 2 − 4 = −2.\nTherefore, Option (A) is the correct answer."
    }
  }
];

async function run() {
  console.log('Logging in to live API...');
  const loginRes = await request('https://api.indraprasthaneetacademy.com/api/admin/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' }
  }, { username: 'indraprasthaadmin', password: 'indraprastha@123' });

  if (!loginRes.data || !loginRes.data.token) {
    console.error('Login failed:', loginRes);
    process.exit(1);
  }

  const token = loginRes.data.token;
  console.log(`Login successful! Updating ${pyqsData.length} PYQs in Chapter 57 (Chemical Equilibrium)...`);

  for (let i = 0; i < pyqsData.length; i++) {
    const item = pyqsData[i];
    console.log(`[${i + 1}/${pyqsData.length}] Updating PYQ ID ${item.id}...`);

    const updatePayload = {
      question: item.question,
      optionA: item.optionA,
      optionB: item.optionB,
      optionC: item.optionC,
      optionD: item.optionD,
      correctOption: item.correctOption,
      explanation: item.explanation,
      similarQuestion: item.similarQuestion
    };

    const res = await request(`https://api.indraprasthaneetacademy.com/api/admin/pyqs/${item.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    }, updatePayload);

    if (res.data && res.data.success) {
      console.log(`  -> PYQ ${item.id} updated successfully with high-yield Similar Question!`);
    } else {
      console.error(`  -> Failed to update PYQ ${item.id}:`, res);
      process.exit(1);
    }
  }

  console.log(`\n🎉 COMPLETED: ${pyqsData.length}/${pyqsData.length} PYQs in Chapter 57 (Chemical Equilibrium) updated live!`);
}

run().catch(console.error);
