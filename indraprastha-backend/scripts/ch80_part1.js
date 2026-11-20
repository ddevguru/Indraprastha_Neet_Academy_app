module.exports = [
  {
    id: 888,
    question: "Two stationary sources each emitting waves of wavelength λ, an observer moves from one source to another with velocity u. Then the number of beats heard by him is: [AIPMT 2000 Out of Syllabus]",
    optionA: "2u/λ",
    optionB: "u/λ",
    optionC: "√(uλ)",
    optionD: "u/(2λ)",
    correctOption: "A",
    explanation: "Step 1: Set up the Doppler effect for the moving observer:\nLet v be the speed of sound in air, and λ be the emitted wavelength from both stationary sources (S₁ and S₂).\nThe natural source frequency is f = v / λ.\n\nStep 2: Calculate apparent frequency heard from the source approached:\nThe observer moves towards source S₂ with speed u:\nf₂ = (v + u) / λ\n\nStep 3: Calculate apparent frequency heard from the source receded from:\nThe observer moves away from source S₁ with speed u:\nf₁ = (v − u) / λ\n\nStep 4: Calculate the number of beats heard per second (beat frequency):\nBeats per second = f₂ − f₁\nBeat frequency = [(v + u) / λ] − [(v − u) / λ]\n= (v + u − v + u) / λ = 2u / λ.\n\nTherefore, Option (A) is the correct answer.",
    similarQuestion: {
      question: "An observer moves towards a stationary sound source of wavelength λ with speed u. The apparent frequency heard by the observer differs from the natural frequency by:",
      option_a: "u / λ",
      option_b: "2u / λ",
      option_c: "v / λ",
      option_d: "uλ",
      correct_option: "A",
      explanation: "Step 1: Apparent frequency is f' = (v + u) / λ = (v / λ) + (u / λ) = f + (u / λ).\n\nStep 2: The frequency shift is Δf = f' − f = u / λ.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 887,
    question: "A whistle revolves in a circle with angular speed ω = 20 rad/s using a string of length 50 cm. If the frequency of sound from the whistle is 385 Hz, then what is the minimum frequency heard by an observer who is far away from the centre? (Velocity of sound = 340 m/s) [AIPMT 2002 Out of Syllabus]",
    optionA: "385 Hz",
    optionB: "374 Hz",
    optionC: "394 Hz",
    optionD: "333 Hz",
    correctOption: "B",
    explanation: "Step 1: Calculate the linear speed of the revolving whistle:\nString length r = 50 cm = 0.5 m\nAngular speed ω = 20 rad/s\nLinear speed of source v_s = r × ω = 0.5 m × 20 rad/s = 10 m/s.\n\nStep 2: Identify the condition for minimum observed frequency:\nThe observed frequency is minimum when the source is moving directly away from the distant observer:\nf_min = f × [v / (v + v_s)]\n\nStep 3: Substitute the given parameters:\n- Frequency of whistle f = 385 Hz\n- Speed of sound v = 340 m/s\n- Speed of source v_s = 10 m/s\n\nf_min = 385 × [340 / (340 + 10)]\nf_min = 385 × [340 / 350] = 385 × (34 / 35)\nf_min = 11 × 34 = 374 Hz.\n\nTherefore, Option (B) is the correct answer.",
    similarQuestion: {
      question: "What is the maximum frequency heard by the distant observer when the whistle in the above problem is moving directly towards the observer?",
      option_a: "396.7 Hz",
      option_b: "385 Hz",
      option_c: "374 Hz",
      option_d: "410 Hz",
      correct_option: "A",
      explanation: "Step 1: Maximum frequency occurs when the source moves directly towards the observer:\nf_max = f × [v / (v − v_s)].\n\nStep 2: Substitute values:\nf_max = 385 × [340 / (340 − 10)] = 385 × (340 / 330) ≈ 396.67 Hz.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 886,
    question: "An observer moves towards a stationary source of sound with a speed 1/5th of the speed of sound. The wavelength and frequency emitted by the source are λ and f respectively. The apparent frequency and wavelength recorded by the observer are respectively: [AIPMT 2003 Out of Syllabus]",
    optionA: "1.2f, 1.2λ",
    optionB: "1.2f, λ",
    optionC: "f, 1.2λ",
    optionD: "0.8f, 0.8λ",
    correctOption: "B",
    explanation: "Step 1: Analyze the observed wavelength:\nWavelength in a medium is determined exclusively by the source's motion relative to the medium:\nλ' = (v ± v_s) / f\nSince the source is stationary (v_s = 0), the physical spacing between wavefronts in the medium is completely unaffected by the observer's motion.\nTherefore, the recorded wavelength remains λ' = λ.\n\nStep 2: Calculate the apparent frequency heard by the moving observer:\nThe observer moves towards the stationary source with speed v_o = v / 5:\nf' = f × [(v + v_o) / v]\nf' = f × [(v + v/5) / v] = f × (6 / 5) = 1.2 f.\n\nStep 3: Combine both results:\nApparent frequency = 1.2f, and apparent wavelength = λ.\n\nTherefore, Option (B) is the correct answer.",
    similarQuestion: {
      question: "When a sound source moves towards a stationary observer, which of the wave properties in the medium changes?",
      option_a: "Wavelength",
      option_b: "Speed of sound",
      option_c: "Both speed of sound and frequency",
      option_d: "Neither speed nor wavelength",
      correct_option: "A",
      explanation: "Step 1: When the source moves through the medium, wavefronts are compressed in front of it, shortening the wavelength: λ' = (v − v_s) / f.\n\nStep 2: The speed of sound depends only on the properties of the medium and remains constant.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 885,
    question: "A car is moving towards a high cliff. The driver sounds a horn of frequency f. The reflected sound heard by the driver has frequency 2f. If v is the velocity of sound, then the velocity of the car, in the same velocity units, will be: [AIPMT 2004 Out of Syllabus]",
    optionA: "v/√2",
    optionB: "v/3",
    optionC: "v/4",
    optionD: "v/2",
    correctOption: "B",
    explanation: "Step 1: Calculate the frequency of sound reaching the cliff:\nThe car (source) moves towards the stationary cliff with speed v_c:\nf_cliff = f × [v / (v − v_c)]\n\nStep 2: Calculate the frequency of the reflected echo heard by the driver:\nThe cliff acts as a stationary source re-emitting frequency f_cliff. The driver (observer) is moving towards the cliff with speed v_c:\nf_heard = f_cliff × [(v + v_c) / v]\nSubstitute f_cliff:\nf_heard = f × [(v + v_c) / (v − v_c)]\n\nStep 3: Set f_heard = 2f and solve for v_c:\n2f = f × [(v + v_c) / (v − v_c)]\n2 (v − v_c) = v + v_c\n2v − 2v_c = v + v_c\n3v_c = v\nv_c = v / 3.\n\nTherefore, Option (B) is the correct answer.",
    similarQuestion: {
      question: "A car approaches a wall at a speed of v / 5, where v is the speed of sound. If the car horn has frequency f, the frequency of the echo heard by the driver is:",
      option_a: "1.5 f",
      option_b: "1.2 f",
      option_c: "2.0 f",
      option_d: "1.25 f",
      correct_option: "A",
      explanation: "Step 1: Using f_echo = f (v + v_c) / (v − v_c):\nSubstitute v_c = v / 5:\nf_echo = f × (v + v/5) / (v − v/5) = f × (6/5) / (4/5) = f × (6 / 4) = 1.5 f.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 884,
    question: "The driver of a car travelling with speed 30 m/s towards a hill sounds a horn of frequency 600 Hz. If the velocity of sound in air is 330 m/s, the frequency of reflected sound as heard by the driver is: [AIPMT 2009 Out of Syllabus]",
    optionA: "555.5 Hz",
    optionB: "720 Hz",
    optionC: "500 Hz",
    optionD: "550 Hz",
    correctOption: "B",
    explanation: "Step 1: State the formula for echo frequency heard by a moving observer from a stationary reflector:\nf_heard = f × [(v + v_c) / (v − v_c)]\nwhere:\n- f = 600 Hz (original horn frequency)\n- v_c = 30 m/s (speed of car approaching hill)\n- v = 330 m/s (speed of sound in air)\n\nStep 2: Substitute values into the Doppler echo equation:\nf_heard = 600 × [(330 + 30) / (330 − 30)]\nf_heard = 600 × [360 / 300]\nf_heard = 600 × 1.2 = 720 Hz.\n\nTherefore, Option (B) is the correct answer.",
    similarQuestion: {
      question: "A locomotive moves towards a tunnel wall at 20 m/s sounding its whistle at 400 Hz. If the speed of sound is 340 m/s, what frequency is heard in the reflected whistle by the driver?",
      option_a: "450 Hz",
      option_b: "425 Hz",
      option_c: "480 Hz",
      option_d: "400 Hz",
      correct_option: "A",
      explanation: "Step 1: f_echo = f (v + v_s) / (v − v_s) = 400 × (340 + 20) / (340 − 20).\n\nStep 2: f_echo = 400 × (360 / 320) = 400 × (9 / 8) = 450 Hz.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 883,
    question: "A train moving at a speed of 220 m s⁻¹ towards a stationary object emits a sound of frequency 1000 Hz. Some of the sound reaching the object gets reflected back to the train as an echo. The frequency of the echo as detected by the driver of the train is (speed of sound in air is 330 m s⁻¹): [AIPMT 2012 Mains Out of Syllabus]",
    optionA: "3500 Hz",
    optionB: "4000 Hz",
    optionC: "5000 Hz",
    optionD: "3000 Hz",
    correctOption: "C",
    explanation: "Step 1: Use the echo Doppler relation for a source moving towards a stationary reflector:\nf_echo = f × [(v + v_train) / (v − v_train)]\n\nStep 2: Substitute the given parameters:\n- Frequency emitted f = 1000 Hz\n- Speed of train v_train = 220 m/s\n- Speed of sound v = 330 m/s\n\nf_echo = 1000 × [(330 + 220) / (330 − 220)]\nf_echo = 1000 × [550 / 110]\nf_echo = 1000 × 5 = 5000 Hz.\n\nTherefore, Option (C) is the correct answer.",
    similarQuestion: {
      question: "A submarine moving at 10 m/s towards a stationary underwater obstacle emits a sonar signal of frequency 40 kHz. What is the frequency of the echo received by the submarine? (Speed of sound in water = 1500 m/s)",
      option_a: "40.54 kHz",
      option_b: "42.10 kHz",
      option_c: "39.46 kHz",
      option_d: "41.00 kHz",
      correct_option: "A",
      explanation: "Step 1: f' = f (v + v_sub) / (v − v_sub) = 40 × (1500 + 10) / (1500 − 10).\n\nStep 2: f' = 40 × (1510 / 1490) ≈ 40.537 kHz ≈ 40.54 kHz.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 882,
    question: "Two sources P and Q produce notes of frequency 660 Hz each. A listener moves from P to Q with a speed of 1 m s⁻¹. If the speed of sound is 330 m/s, then the number of beats heard by the listener per second will be: [NEET 2013 Karnataka Out of Syllabus]",
    optionA: "4",
    optionB: "8",
    optionC: "2",
    optionD: "Zero",
    correctOption: "A",
    explanation: "Step 1: Identify source and listener motion:\nSource P and Source Q each emit frequency f = 660 Hz and are stationary.\nThe listener moves away from P and towards Q with speed u = 1 m/s.\nSpeed of sound v = 330 m/s.\n\nStep 2: Calculate frequency received from source P (listener moving away):\nf_P = f × [(v − u) / v]\nf_P = 660 × [(330 − 1) / 330] = 660 × (329 / 330) = 2 × 329 = 658 Hz\n\nStep 3: Calculate frequency received from source Q (listener moving towards):\nf_Q = f × [(v + u) / v]\nf_Q = 660 × [(330 + 1) / 330] = 660 × (331 / 330) = 2 × 331 = 662 Hz\n\nStep 4: Compute number of beats per second:\nBeat frequency = f_Q − f_P = 662 − 658 = 4 beats per second.\n\nTherefore, Option (A) is the correct answer.",
    similarQuestion: {
      question: "Two identical tuning forks of frequency 500 Hz are placed some distance apart. An observer walks from one fork towards the other at 2 m/s. The beat frequency heard is (v_sound = 340 m/s):",
      option_a: "5.88 Hz",
      option_b: "2.94 Hz",
      option_c: "8.82 Hz",
      option_d: "1.47 Hz",
      correct_option: "A",
      explanation: "Step 1: Beat frequency = 2 u f / v.\n\nStep 2: Substitute values: Δf = 2 × 2 × 500 / 340 = 2000 / 340 ≈ 5.88 Hz.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 881,
    question: "A speeding motorcyclist sees a traffic jam ahead of him. He slows down to 36 km/hour. He finds that traffic has eased and a car moving ahead of him at 18 km/hour is honking at a frequency of 1392 Hz. If the speed of sound is 343 m/s, the frequency of the honk as heard by him will be: [AIPMT 2014 Out of Syllabus]",
    optionA: "1332 Hz",
    optionB: "1372 Hz",
    optionC: "1412 Hz",
    optionD: "1454 Hz",
    correctOption: "C",
    explanation: "Step 1: Convert speeds into m/s:\n- Speed of motorcyclist (observer, v_o): 36 km/h = 36 × (5 / 18) = 10 m/s\n- Speed of car ahead (source, v_s): 18 km/h = 18 × (5 / 18) = 5 m/s\n\nStep 2: Establish the direction of sound propagation:\nThe car is ahead and honks; sound travels from front to back (towards the motorcyclist behind).\nTaking the direction of sound propagation (from car to motorcyclist) as reference:\n- Motorcyclist moves against sound direction towards the source: v_eff,observer = v + v_o\n- Car moves in the direction opposite to sound propagation (away from observer): v_eff,source = v + v_s\n\nStep 3: Write the Doppler equation for this configuration:\nf' = f × [(v + v_o) / (v + v_s)]\n\nStep 4: Substitute the given parameters:\n- f = 1392 Hz\n- v = 343 m/s\n- v_o = 10 m/s\n- v_s = 5 m/s\n\nf' = 1392 × [(343 + 10) / (343 + 5)]\nf' = 1392 × [353 / 348]\nNotice that 1392 / 348 = 4 exactly:\nf' = 4 × 353 = 1412 Hz.\n\nTherefore, Option (C) is the correct answer.",
    similarQuestion: {
      question: "A police siren (frequency 1000 Hz) moves at 20 m/s towards a car ahead moving at 10 m/s in the same direction. What frequency does the driver of the car hear? (v_sound = 340 m/s)",
      option_a: "1031 Hz",
      option_b: "970 Hz",
      option_c: "1000 Hz",
      option_d: "1062 Hz",
      correct_option: "A",
      explanation: "Step 1: Sound travels from police car to front car: source approaches (v − v_s), observer recedes (v − v_o).\n\nStep 2: f' = 1000 × (340 − 10) / (340 − 20) = 1000 × (330 / 320) ≈ 1031.25 Hz.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 880,
    question: "A source of sound S emitting waves of frequency 100 Hz and an observer O are located at some distance from each other. The source is moving with a speed of 19.4 m s⁻¹ at an angle of 60° with the source-observer line as shown in the figure. The observer is at rest. The apparent frequency observed by the observer (velocity of sound in air = 330 m s⁻¹) is: [AIPMT 2015 Out of Syllabus]",
    optionA: "106 Hz",
    optionB: "97 Hz",
    optionC: "100 Hz",
    optionD: "103 Hz",
    correctOption: "D",
    explanation: "Step 1: Determine the component of the source's velocity along the line joining the source and observer:\nOnly the velocity component directly directed along the line of sight contributes to the Doppler shift:\nv_s,eff = v_s cos θ\nGiven v_s = 19.4 m/s and θ = 60°:\nv_s,eff = 19.4 × cos 60° = 19.4 × 0.5 = 9.7 m/s (directed towards observer).\n\nStep 2: Apply Doppler's formula for a source moving towards a stationary observer:\nf' = f × [v / (v − v_s,eff)]\n\nStep 3: Substitute the known values:\n- f = 100 Hz\n- v = 330 m/s\n- v_s,eff = 9.7 m/s\n\nf' = 100 × [330 / (330 − 9.7)]\nf' = 100 × [330 / 320.3]\nf' = 33,000 / 320.3 ≈ 103.028 Hz ≈ 103 Hz.\n\nTherefore, Option (D) is the correct answer.",
    similarQuestion: {
      question: "A sound source of frequency 500 Hz moves at 30 m/s at an angle of 45° to the line connecting it to a stationary observer. What is its effective Doppler approach velocity?",
      option_a: "15√2 m/s (≈ 21.2 m/s)",
      option_b: "30 m/s",
      option_c: "15 m/s",
      option_d: "10√2 m/s",
      correct_option: "A",
      explanation: "Step 1: Effective velocity component along line of sight is v_s cos 45°.\n\nStep 2: v_s,eff = 30 × (1 / √2) = 15√2 m/s ≈ 21.21 m/s.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 879,
    question: "A siren emitting a sound of frequency 800 Hz moves away from an observer towards a cliff at a speed of 15 m s⁻¹. Then, the frequency of sound that the observer hears in the echo reflected from the cliff is (take velocity of sound in air = 330 m s⁻¹): [NEET 2016 Phase 1 Out of Syllabus]",
    optionA: "838 Hz",
    optionB: "885 Hz",
    optionC: "765 Hz",
    optionD: "800 Hz",
    correctOption: "A",
    explanation: "Step 1: Calculate the frequency of sound waves incident on the cliff:\nThe siren (source) moves towards the stationary cliff with speed v_s = 15 m/s:\nf_cliff = f × [v / (v − v_s)]\n\nStep 2: Substitute given values:\n- Emitted frequency f = 800 Hz\n- Speed of sound v = 330 m/s\n- Speed of siren v_s = 15 m/s\n\nf_cliff = 800 × [330 / (330 − 15)]\nf_cliff = 800 × [330 / 315] = 800 × (22 / 21) ≈ 838.1 Hz\n\nStep 3: Analyze the reflection heard by the observer:\nThe cliff reflects this sound without changing frequency. Since both the cliff and observer are stationary relative to each other, the frequency of the echo heard by the observer equals f_cliff:\nf_echo = 838.1 Hz ≈ 838 Hz.\n\nTherefore, Option (A) is the correct answer.",
    similarQuestion: {
      question: "In the above problem, what is the frequency of sound heard by the observer directly from the receding siren (without reflection)?",
      option_a: "765 Hz",
      option_b: "838 Hz",
      option_c: "800 Hz",
      option_d: "780 Hz",
      correct_option: "A",
      explanation: "Step 1: For the direct sound, source moves away from stationary observer:\nf_direct = f × [v / (v + v_s)].\n\nStep 2: f_direct = 800 × [330 / (330 + 15)] = 800 × (330 / 345) ≈ 765.2 Hz.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 878,
    question: "Two cars moving in opposite directions approach each other with speeds of 22 m s⁻¹ and 16.5 m s⁻¹ respectively. The driver of the first car blows a horn having a frequency of 400 Hz. The frequency heard by the driver of the second car is (velocity of sound is 340 m s⁻¹): [NEET 2017 Out of Syllabus]",
    optionA: "361 Hz",
    optionB: "411 Hz",
    optionC: "448 Hz",
    optionD: "350 Hz",
    correctOption: "C",
    explanation: "Step 1: State the Doppler formula when both source and observer approach each other:\nf' = f × [(v + v_o) / (v − v_s)]\nwhere:\n- f = 400 Hz (horn frequency)\n- v = 340 m/s (speed of sound)\n- v_s = 22 m/s (speed of source car)\n- v_o = 16.5 m/s (speed of observer car)\n\nStep 2: Substitute the known values:\nf' = 400 × [(340 + 16.5) / (340 − 22)]\nf' = 400 × [356.5 / 318]\nf' = 142,600 / 318 ≈ 448.43 Hz ≈ 448 Hz.\n\nTherefore, Option (C) is the correct answer.",
    similarQuestion: {
      question: "If two trains approach each other with equal speeds of 20 m/s and one blows a 500 Hz whistle, what frequency does the other hear? (v_sound = 340 m/s)",
      option_a: "562.5 Hz",
      option_b: "500 Hz",
      option_c: "444.4 Hz",
      option_d: "530 Hz",
      correct_option: "A",
      explanation: "Step 1: f' = 500 × (340 + 20) / (340 − 20) = 500 × (360 / 320) = 500 × (9 / 8) = 562.5 Hz.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 877,
    question: "A string is cut into three parts, having fundamental frequencies n₁, n₂ and n₃ respectively. Then the original fundamental frequency n is related by the expression: [AIPMT 2000]",
    optionA: "1/n = 1/n₁ + 1/n₂ + 1/n₃",
    optionB: "n = n₁ × n₂ × n₃",
    optionC: "n = n₁ + n₂ + n₃",
    optionD: "n = (n₁ + n₂ + n₃)/3",
    correctOption: "A",
    explanation: "Step 1: State the formula for the fundamental frequency of a vibrating string under constant tension T:\nn = v / (2L) = (1 / 2L) √(T / μ)\nwhere L is length, T is tension, and μ is mass per unit length.\nFor identical tension and string material:\nn ∝ 1 / L ⇒ L = k / n (where k = v / 2 is constant).\n\nStep 2: Relate the lengths of the parts to the total string length:\nTotal length L is the sum of the lengths of the three parts:\nL = L₁ + L₂ + L₃\n\nStep 3: Express each length in terms of its respective fundamental frequency:\nL = k / n, L₁ = k / n₁, L₂ = k / n₂, L₃ = k / n₃\nk / n = (k / n₁) + (k / n₂) + (k / n₃)\n\nStep 4: Divide both sides by k:\n1 / n = 1 / n₁ + 1 / n₂ + 1 / n₃.\n\nTherefore, Option (A) is the correct answer.",
    similarQuestion: {
      question: "A sonometer wire of length L has fundamental frequency n. If it is divided into two parts of lengths l₁ and l₂ having fundamental frequencies n₁ and n₂, then:",
      option_a: "1 / n = 1 / n₁ + 1 / n₂",
      option_b: "n = n₁ + n₂",
      option_c: "n = √(n₁ n₂)",
      option_d: "1 / n² = 1 / n₁² + 1 / n₂²",
      correct_option: "A",
      explanation: "Step 1: L = l₁ + l₂.\n\nStep 2: Since l ∝ 1/n, substituting gives 1/n = 1/n₁ + 1/n₂.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 876,
    question: "The equations of two waves acting in perpendicular directions are given as x = a cos(ωt + δ) and y = a cos(ωt + α), where δ = α + π/2. The resultant wave represents: [AIPMT 2000]",
    optionA: "A parabola",
    optionB: "A circle",
    optionC: "An ellipse",
    optionD: "A straight line",
    correctOption: "B",
    explanation: "Step 1: Analyze the given wave equations:\nx = a cos(ωt + δ)\ny = a cos(ωt + α)\nGiven δ = α + π/2:\nx = a cos[ωt + α + π/2] = −a sin(ωt + α)\n\nStep 2: Eliminate time t to find the trajectory of the resultant motion:\nFrom x = −a sin(ωt + α) ⇒ x / a = −sin(ωt + α)\nFrom y = a cos(ωt + α) ⇒ y / a = cos(ωt + α)\n\nStep 3: Square and add the two equations:\n(x / a)² + (y / a)² = [−sin(ωt + α)]² + [cos(ωt + α)]²\n(x² / a²) + (y² / a²) = sin²(ωt + α) + cos²(ωt + α) = 1\nx² + y² = a²\n\nStep 4: Identify the geometric curve:\nx² + y² = a² represents a circle of radius a centered at the origin.\n\nTherefore, Option (B) is the correct answer.",
    similarQuestion: {
      question: "If two perpendicular harmonic motions of equal amplitude a have a phase difference of π (180°), the resultant path is:",
      option_a: "A straight line",
      option_b: "A circle",
      option_c: "An ellipse",
      option_d: "A parabola",
      correct_option: "A",
      explanation: "Step 1: x = a sin(ωt) and y = a sin(ωt + π) = −a sin(ωt).\n\nStep 2: Thus, y = −x, which is the equation of a straight line inclined at 135° to the x-axis.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 875,
    question: "If the tension and diameter of a sonometer wire of fundamental frequency n are doubled and density is halved, then its fundamental frequency will become: [AIPMT 2001]",
    optionA: "n/4",
    optionB: "√2 n",
    optionC: "n",
    optionD: "n/√2",
    correctOption: "C",
    explanation: "Step 1: State the formula for fundamental frequency of a stretched wire:\nn = (1 / 2L) √(T / μ)\nwhere mass per unit length μ = mass / length = (volume × density) / length = (π r² L ρ) / L = π r² ρ.\nIn terms of diameter d = 2r:\nμ = π (d / 2)² ρ = (π d² ρ) / 4\n\nStep 2: Substitute μ into frequency formula:\nn = (1 / 2L) √[T / (π d² ρ / 4)] = (1 / L d) √[T / (π ρ)]\nTherefore, n ∝ (1 / d) √(T / ρ).\n\nStep 3: Apply the changes:\n- Tension is doubled: T' = 2T\n- Diameter is doubled: d' = 2d\n- Density is halved: ρ' = ρ / 2\n\nn' / n = (d / d') × √[(T' / T) × (ρ / ρ')]\nn' / n = (1 / 2) × √[(2) × (1 / (1/2))]\nn' / n = (1 / 2) × √[2 × 2] = (1 / 2) × √4 = (1 / 2) × 2 = 1\nn' = n.\n\nTherefore, Option (C) is the correct answer.",
    similarQuestion: {
      question: "If the tension in a sonometer wire is quadrupled (4 times) while keeping all other parameters constant, its fundamental frequency becomes:",
      option_a: "2n",
      option_b: "4n",
      option_c: "n / 2",
      option_d: "n",
      correct_option: "A",
      explanation: "Step 1: Fundamental frequency n ∝ √T.\n\nStep 2: When T' = 4T, n' = √4 n = 2n.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 874,
    question: "Two waves have equations x₁ = a sin(ωt − kx + φ₁) and x₂ = a sin(ωt − kx + φ₂). If in the resultant wave the frequency and amplitude remain equal to the amplitude of the superimposing waves, the phase difference between them is: [AIPMT 2001]",
    optionA: "π/6",
    optionB: "2π/3",
    optionC: "π/4",
    optionD: "π/3",
    correctOption: "B",
    explanation: "Step 1: State the formula for the resultant amplitude of two interfering harmonic waves of equal amplitude a:\nA_R = 2a cos(Δφ / 2)\nwhere Δφ = |φ₁ − φ₂| is the phase difference between the waves.\n\nStep 2: Set resultant amplitude equal to original wave amplitude a:\nA_R = a\n2a cos(Δφ / 2) = a\ncos(Δφ / 2) = a / (2a) = 1 / 2\n\nStep 3: Solve for phase difference Δφ:\nΔφ / 2 = π / 3 (or 60°)\nΔφ = 2 × (π / 3) = 2π / 3 (or 120°).\n\nTherefore, Option (B) is the correct answer.",
    similarQuestion: {
      question: "What must be the phase difference between two waves of equal amplitude a so that destructive interference produces a resultant amplitude of zero?",
      option_a: "π (180°)",
      option_b: "π / 2",
      option_c: "2π",
      option_d: "π / 3",
      correct_option: "A",
      explanation: "Step 1: A_R = 2a cos(Δφ / 2) = 0.\n\nStep 2: cos(Δφ / 2) = 0 ⇒ Δφ / 2 = π / 2 ⇒ Δφ = π radians.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 873,
    question: "The equation of a wave is represented by y = 10⁻⁴ sin(100t − x/10) m. The velocity of the wave will be: [AIPMT 2001]",
    optionA: "100 m/s",
    optionB: "4 m/s",
    optionC: "1000 m/s",
    optionD: "10 m/s",
    correctOption: "C",
    explanation: "Step 1: Compare the given wave equation with the standard equation of a travelling wave:\nGiven: y = 10⁻⁴ sin[100t − (1/10) x]\nStandard form: y = A sin(ωt − kx)\n\nStep 2: Extract angular frequency ω and propagation constant (wavenumber) k:\n- Angular frequency ω = 100 rad/s\n- Wavenumber k = 1 / 10 m⁻¹ = 0.1 m⁻¹\n\nStep 3: Calculate wave propagation velocity v:\nv = ω / k\nv = 100 / (1 / 10) = 100 × 10 = 1000 m/s.\n\nTherefore, Option (C) is the correct answer.",
    similarQuestion: {
      question: "For a travelling wave y = 0.05 sin(200t − 2x) m, what is the propagation speed of the wave?",
      option_a: "100 m/s",
      option_b: "200 m/s",
      option_c: "400 m/s",
      option_d: "50 m/s",
      correct_option: "A",
      explanation: "Step 1: Here ω = 200 rad/s and k = 2 m⁻¹.\n\nStep 2: v = ω / k = 200 / 2 = 100 m/s.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 872,
    question: "A wave travelling in the positive X-direction has amplitude a = 0.2 m, velocity = 360 m s⁻¹ and wavelength λ = 60 m. The correct expression for the wave is: [AIPMT 2002]",
    optionA: "y = 0.2 sin[2π(6t + x/60)]",
    optionB: "y = 0.2 sin[π(6t + x/60)]",
    optionC: "y = 0.2 sin[2π(6t − x/60)]",
    optionD: "y = 0.2 sin[π(6t − x/60)]",
    correctOption: "C",
    explanation: "Step 1: Find the frequency f of the wave:\nv = f × λ\nf = v / λ = 360 m s⁻¹ / 60 m = 6 Hz (s⁻¹)\n\nStep 2: Write the general equation of a harmonic wave travelling in the positive X-direction:\ny = a sin[2π(ft − x/λ)]\n(The minus sign inside the phase indicates propagation along the positive X-direction).\n\nStep 3: Substitute the known values:\n- Amplitude a = 0.2 m\n- Frequency f = 6 s⁻¹\n- Wavelength λ = 60 m\n\ny = 0.2 sin[2π(6t − x/60)].\n\nTherefore, Option (C) is the correct answer.",
    similarQuestion: {
      question: "Which of the following equations represents a wave of amplitude 0.1 m and frequency 10 Hz travelling in the negative X-direction with wavelength 20 m?",
      option_a: "y = 0.1 sin[2π(10t + x/20)]",
      option_b: "y = 0.1 sin[2π(10t − x/20)]",
      option_c: "y = 0.1 sin[π(10t + x/20)]",
      option_d: "y = 0.1 cos[2π(10t − x/20)]",
      correct_option: "A",
      explanation: "Step 1: A wave propagating in the negative X-direction has a positive relative sign between the time and space arguments: 2π(ft + x/λ).\n\nStep 2: Substituting a = 0.1 m, f = 10 Hz, and λ = 20 m gives y = 0.1 sin[2π(10t + x/20)].\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 871,
    question: "The phase difference between two waves, represented by y₁ = 10⁻⁶ sin[100t + (x/50) + 0.5] m and y₂ = 10⁻⁶ cos[100t + (x/50)] m, where x is expressed in metres and t in seconds, is approximately: [AIPMT 2004]",
    optionA: "1.07 radians",
    optionB: "2.07 radians",
    optionC: "0.5 radians",
    optionD: "1.5 radians",
    correctOption: "A",
    explanation: "Step 1: Express both wave functions in the same trigonometric sine form:\nGiven:\ny₁ = 10⁻⁶ sin[100t + (x/50) + 0.5]\ny₂ = 10⁻⁶ cos[100t + (x/50)]\nUsing the identity cos θ = sin(θ + π/2):\ny₂ = 10⁻⁶ sin[100t + (x/50) + π/2]\n\nStep 2: Extract the phase of each wave:\nPhase of wave 1: φ₁ = 100t + (x/50) + 0.5\nPhase of wave 2: φ₂ = 100t + (x/50) + π/2\n\nStep 3: Calculate the phase difference Δφ = |φ₂ − φ₁|:\nΔφ = (π / 2) − 0.5\nSubstitute π ≈ 3.1416:\nΔφ = (3.1416 / 2) − 0.5 = 1.5708 − 0.5 = 1.0708 radians ≈ 1.07 radians.\n\nTherefore, Option (A) is the correct answer.",
    similarQuestion: {
      question: "What is the phase difference between y₁ = A sin(ωt + kx) and y₂ = A cos(ωt + kx)?",
      option_a: "π / 2 radians",
      option_b: "π radians",
      option_c: "2π radians",
      option_d: "π / 4 radians",
      correct_option: "A",
      explanation: "Step 1: Convert cos(θ) to sin(θ + π/2).\n\nStep 2: The phase difference between sin(θ) and sin(θ + π/2) is exactly π/2 radians (90°).\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 870,
    question: "A point source emits sound equally in all directions in a non-absorbing medium. Two points P and Q are at distances of 2 m and 3 m respectively from the source. The ratio of the intensities of the waves at P and Q is: [AIPMT 2005]",
    optionA: "3 : 2",
    optionB: "2 : 3",
    optionC: "9 : 4",
    optionD: "4 : 9",
    correctOption: "C",
    explanation: "Step 1: State the Inverse-Square Law for spherical sound waves from a point source:\nIn an isotropic, non-absorbing medium, sound power P_source is distributed uniformly over a spherical wavefront of radius r:\nIntensity I = P_source / (4π r²)\nTherefore, intensity is inversely proportional to the square of the distance from the source:\nI ∝ 1 / r²\n\nStep 2: Set up the ratio of intensities at points P and Q:\nI_P / I_Q = (r_Q / r_P)²\n\nStep 3: Substitute r_P = 2 m and r_Q = 3 m:\nI_P / I_Q = (3 / 2)² = 9 / 4 = 9 : 4.\n\nTherefore, Option (C) is the correct answer.",
    similarQuestion: {
      question: "If the distance from a point source of sound is doubled, the sound intensity becomes:",
      option_a: "One-fourth (1/4) of initial value",
      option_b: "Half of initial value",
      option_c: "One-sixteenth of initial value",
      option_d: "Four times the initial value",
      correct_option: "A",
      explanation: "Step 1: According to the inverse square law, I ∝ 1 / r².\n\nStep 2: When r' = 2r, I' = I / 2² = I / 4.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 869,
    question: "Which one of the following statements is true? [AIPMT 2006]",
    optionA: "Both light and sound waves can travel in vacuum.",
    optionB: "Both light and sound waves in air are transverse.",
    optionC: "The sound waves in air are longitudinal while the light waves are transverse.",
    optionD: "Both light and sound waves in air are longitudinal.",
    correctOption: "C",
    explanation: "Step 1: Classify sound waves in air:\nSound waves in air are mechanical waves consisting of alternating compressions and rarefactions of air particles parallel to the direction of wave propagation. Therefore, sound waves in air are longitudinal waves and strictly require a material medium (they cannot propagate through vacuum).\n\nStep 2: Classify light waves:\nLight waves are electromagnetic waves consisting of mutually perpendicular, oscillating electric and magnetic fields that vibrate perpendicular to the direction of wave propagation. Therefore, light waves are transverse waves and can travel through both matter and vacuum.\n\nStep 3: Conclude:\nSound waves in air are longitudinal while light waves are transverse.\n\nTherefore, Option (C) is the correct answer.",
    similarQuestion: {
      question: "Which wave phenomenon can be exhibited by light waves (transverse) but NOT by sound waves in air (longitudinal)?",
      option_a: "Polarization",
      option_b: "Interference",
      option_c: "Diffraction",
      option_d: "Refraction",
      correct_option: "A",
      explanation: "Step 1: Polarization is a property unique to transverse waves where the vibrations are restricted to a single plane perpendicular to the direction of propagation.\n\nStep 2: Longitudinal waves oscillate strictly along the direction of propagation and therefore cannot be polarized.\n\nTherefore, Option (A) is the correct answer."
    }
  }
];

