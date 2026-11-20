module.exports = [
  {
    id: 848,
    question: "The length of the wire between two ends of a sonometer is 100 cm. What should be the positions of two bridges below the wire so that the three segments of the wire have their fundamental frequencies in the ratio 1 : 3 : 5? [NEET 2013 Karnataka]",
    optionA: "1500/23 cm, 500/23 cm",
    optionB: "1500/23 cm, 300/23 cm",
    optionC: "300/23 cm, 1500/23 cm",
    optionD: "1500/23 cm, 2000/23 cm",
    correctOption: "A",
    explanation: "Step 1: Relate fundamental frequency f of a stretched string to length L:\nf ∝ 1 / L ⇒ L ∝ 1 / f.\n\nStep 2: Determine ratio of segment lengths L₁, L₂, L₃:\nGiven f₁ : f₂ : f₃ = 1 : 3 : 5.\nTherefore, L₁ : L₂ : L₃ = 1/1 : 1/3 : 1/5 = 15 : 5 : 3.\n\nStep 3: Calculate the lengths of the segments:\nTotal parts = 15 + 5 + 3 = 23 parts = 100 cm.\nL₁ = (15 / 23) × 100 = 1500/23 cm.\nL₂ = (5 / 23) × 100 = 500/23 cm.\nL₃ = (3 / 23) × 100 = 300/23 cm.\n\nStep 4: Determine positions of bridges from one end (or segment lengths):\nThe segment lengths are 1500/23 cm and 500/23 cm (with the third being 300/23 cm).\n\nTherefore, Option (A) is the correct answer.",
    similarQuestion: {
      question: "A wire of length 110 cm is divided into two segments whose fundamental frequencies are in the ratio 1 : 2. The lengths of the two segments are:",
      option_a: "73.3 cm and 36.7 cm",
      option_b: "55 cm and 55 cm",
      option_c: "80 cm and 30 cm",
      option_d: "90 cm and 20 cm",
      correct_option: "A",
      explanation: "Step 1: L₁ : L₂ = (1/1) : (1/2) = 2 : 1.\n\nStep 2: L₁ = (2/3) × 110 ≈ 73.3 cm, L₂ = (1/3) × 110 ≈ 36.7 cm.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 847,
    question: "The number of possible natural oscillations of an air column in a pipe closed at one end of length 85 cm whose frequencies lie below 1250 Hz are: (Velocity of sound = 340 m s⁻¹) [AIPMT 2014]",
    optionA: "4",
    optionB: "5",
    optionC: "6",
    optionD: "7",
    correctOption: "C",
    explanation: "Step 1: Calculate the fundamental frequency f₁ for a pipe closed at one end:\nLength L = 85 cm = 0.85 m, sound velocity v = 340 m/s.\nf₁ = v / (4L) = 340 / (4 × 0.85) = 340 / 3.4 = 100 Hz.\n\nStep 2: List the allowed natural frequencies:\nA closed organ pipe produces only odd harmonics:\nf_n = (2n − 1) f₁ = (2n − 1) × 100 Hz for n = 1, 2, 3, ...\nThe allowed frequencies are:\n- n = 1: f₁ = 100 Hz\n- n = 2: f₃ = 300 Hz\n- n = 3: f₅ = 500 Hz\n- n = 4: f₇ = 700 Hz\n- n = 5: f₉ = 900 Hz\n- n = 6: f₁₁ = 1100 Hz\n- n = 7: f₁₃ = 1300 Hz (which is > 1250 Hz, so excluded)\n\nStep 3: Count allowed frequencies below 1250 Hz:\nThere are 6 possible natural frequencies: 100, 300, 500, 700, 900, and 1100 Hz.\n\nTherefore, Option (C) is the correct answer.",
    similarQuestion: {
      question: "How many natural frequencies below 1000 Hz exist for a pipe closed at one end of length 85 cm? (Speed of sound = 340 m/s)",
      option_a: "5",
      option_b: "4",
      option_c: "6",
      option_d: "3",
      correct_option: "A",
      explanation: "Step 1: Fundamental frequency f₁ = v / (4L) = 100 Hz.\n\nStep 2: Odd harmonics below 1000 Hz: 100, 300, 500, 700, 900 Hz (5 frequencies).\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 846,
    question: "If n₁, n₂ and n₃ are the fundamental frequencies of three segments into which a string is divided, then the original fundamental frequency n of the string is given by: [AIPMT 2014]",
    optionA: "1/n = 1/n₁ + 1/n₂ + 1/n₃",
    optionB: "1/√n = 1/√n₁ + 1/√n₂ + 1/√n₃",
    optionC: "√n = √n₁ + √n₂ + √n₃",
    optionD: "n = n₁ + n₂ + n₃",
    correctOption: "A",
    explanation: "Step 1: Relate fundamental frequency n to string length L:\nn = (1 / 2L) √(T / μ) ⇒ L = (1 / 2n) √(T / μ)\nSince tension T and linear mass density μ are uniform across all segments:\nL = C / n, where C is a constant.\n\nStep 2: Relate individual lengths L₁, L₂, L₃ to frequencies n₁, n₂, n₃:\nL₁ = C / n₁\nL₂ = C / n₂\nL₃ = C / n₃\n\nStep 3: Apply conservation of total length:\nL = L₁ + L₂ + L₃\nC / n = (C / n₁) + (C / n₂) + (C / n₃)\nDividing by C:\n1/n = 1/n₁ + 1/n₂ + 1/n₃.\n\nTherefore, Option (A) is the correct answer.",
    similarQuestion: {
      question: "A string of fundamental frequency f is divided into two parts of fundamental frequencies f₁ and f₂. The correct relation is:",
      option_a: "1/f = 1/f₁ + 1/f₂",
      option_b: "f = f₁ + f₂",
      option_c: "f = f₁ f₂ / (f₁ + f₂)",
      option_d: "f² = f₁² + f₂²",
      correct_option: "A",
      explanation: "Step 1: Total length L = L₁ + L₂. Since L ∝ 1/f, C/f = C/f₁ + C/f₂.\n\nStep 2: 1/f = 1/f₁ + 1/f₂.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 845,
    question: "The fundamental frequency of a closed organ pipe of length 20 cm is equal to the second overtone of an organ pipe open at both ends. The length of the organ pipe open at both ends is: [AIPMT 2015]",
    optionA: "120 cm",
    optionB: "140 cm",
    optionC: "80 cm",
    optionD: "100 cm",
    correctOption: "A",
    explanation: "Step 1: Express fundamental frequency of the closed organ pipe:\nLength L_c = 20 cm.\nf_c = v / (4L_c) = v / (4 × 20) = v / 80.\n\nStep 2: Express second overtone of the open organ pipe:\nFor an open organ pipe of length L_o:\nFundamental frequency (1st harmonic) = v / (2L_o)\nFirst overtone (2nd harmonic) = 2v / (2L_o)\nSecond overtone (3rd harmonic) = 3v / (2L_o).\n\nStep 3: Equate the two frequencies:\nv / (4L_c) = 3v / (2L_o)\n1 / (4 × 20) = 3 / (2L_o)\n1 / 80 = 3 / (2L_o)\n2L_o = 3 × 80 = 240\nL_o = 120 cm.\n\nTherefore, Option (A) is the correct answer.",
    similarQuestion: {
      question: "The fundamental frequency of a closed pipe of length 15 cm is equal to the first overtone of an open pipe of length L. What is L?",
      option_a: "60 cm",
      option_b: "30 cm",
      option_c: "45 cm",
      option_d: "90 cm",
      correct_option: "A",
      explanation: "Step 1: f_c = v / (4 × 15) = v / 60.\n\nStep 2: First overtone of open pipe = 2(v / 2L) = v / L.\n\nStep 3: v / 60 = v / L ⇒ L = 60 cm.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 844,
    question: "4.0 g of a gas occupies 22.4 litres at NTP. The specific heat capacity of the gas at constant volume is 5.0 J K⁻¹ mol⁻¹. If the speed of sound in this gas at NTP is 952 m s⁻¹, then the heat capacity at constant pressure is: (Take gas constant R = 8.3 J K⁻¹ mol⁻¹) [AIPMT 2015]",
    optionA: "7.0 J K⁻¹ mol⁻¹",
    optionB: "8.5 J K⁻¹ mol⁻¹",
    optionC: "8.0 J K⁻¹ mol⁻¹",
    optionD: "7.5 J K⁻¹ mol⁻¹",
    correctOption: "C",
    explanation: "Step 1: Determine molar mass M of the gas:\nSince 4.0 g occupies 22.4 L at NTP (standard molar volume = 22.4 L):\nMolar mass M = 4.0 g/mol = 4.0 × 10⁻³ kg/mol.\n\nStep 2: Relate speed of sound to adiabatic index γ:\nv = √(γ R T / M)\nv² = γ R T / M\nγ = M v² / (R T)\nAt NTP, T = 273 K, R = 8.3 J K⁻¹ mol⁻¹, v = 952 m/s:\nγ = (4.0 × 10⁻³ × 952²) / (8.3 × 273)\nγ = (4.0 × 10⁻³ × 906304) / 2265.9 = 3625.2 / 2265.9 ≈ 1.6 = 8/5.\n\nStep 3: Calculate C_p from γ and C_v:\nγ = C_p / C_v\nC_p = γ × C_v = 1.6 × 5.0 = 8.0 J K⁻¹ mol⁻¹.\n\nTherefore, Option (C) is the correct answer.",
    similarQuestion: {
      question: "If a gas has C_v = 12.5 J K⁻¹ mol⁻¹ and adiabatic index γ = 1.4, its molar heat capacity at constant pressure C_p is:",
      option_a: "17.5 J K⁻¹ mol⁻¹",
      option_b: "20.8 J K⁻¹ mol⁻¹",
      option_c: "15.0 J K⁻¹ mol⁻¹",
      option_d: "25.0 J K⁻¹ mol⁻¹",
      correct_option: "A",
      explanation: "Step 1: C_p = γ × C_v = 1.4 × 12.5 = 17.5 J K⁻¹ mol⁻¹.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 843,
    question: "A string is stretched between fixed points separated by 75.0 cm. It is observed to have resonant frequencies of 420 Hz and 315 Hz. There are no other resonant frequencies between these two. The lowest resonant frequency for this string is: [AIPMT 2015]",
    optionA: "10.5 Hz",
    optionB: "105 Hz",
    optionC: "155 Hz",
    optionD: "205 Hz",
    correctOption: "B",
    explanation: "Step 1: Understand resonant frequencies of a string fixed at both ends:\nResonant frequencies are integer multiples of the fundamental frequency f₀:\nf_n = n f₀, where n = 1, 2, 3, ...\n\nStep 2: Relate two consecutive resonant frequencies:\nSince 420 Hz and 315 Hz are consecutive resonant frequencies:\nf_(n+1) − f_n = (n + 1) f₀ − n f₀ = f₀\nf₀ = 420 − 315 = 105 Hz.\n\nStep 3: Verify the mode numbers:\n315 / 105 = 3 (3rd harmonic)\n420 / 105 = 4 (4th harmonic)\nThis confirms that the lowest resonant frequency (fundamental frequency) is 105 Hz.\n\nTherefore, Option (B) is the correct answer.",
    similarQuestion: {
      question: "A wire fixed at both ends resonates at consecutive frequencies of 450 Hz and 600 Hz. Its fundamental frequency is:",
      option_a: "150 Hz",
      option_b: "75 Hz",
      option_c: "300 Hz",
      option_d: "50 Hz",
      correct_option: "A",
      explanation: "Step 1: Difference between consecutive harmonics in a stretched wire = fundamental frequency f₀.\n\nStep 2: f₀ = 600 − 450 = 150 Hz.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 842,
    question: "A uniform rope of length L and mass m₁ hangs vertically from a rigid support. A block of mass m₂ is attached to the free end of the rope. A transverse pulse of wavelength λ₁ is produced at the lower end of the rope. The wavelength of the pulse when it reaches the top of the rope is λ₂. The ratio λ₂/λ₁ is: [NEET 2016 Phase 1]",
    optionA: "√(m₂/m₁)",
    optionB: "√[(m₁ + m₂)/m₁]",
    optionC: "√(m₁/m₂)",
    optionD: "√[(m₁ + m₂)/m₂]",
    correctOption: "D",
    explanation: "Step 1: Determine the tension at the bottom and top of the rope:\n- At the bottom end of the rope, the tension supports only the attached block of mass m₂:\nT₁ = m₂ g\n- At the top of the rope, the tension supports both the block and the entire rope of mass m₁:\nT₂ = (m₁ + m₂) g\n\nStep 2: Relate wave speed to tension:\nTransverse wave speed is v = √(T / μ).\nSince frequency f of the pulse is constant throughout propagation:\nv = f λ ⇒ λ ∝ v ∝ √T.\n\nStep 3: Calculate the ratio of wavelengths λ₂ / λ₁:\nλ₂ / λ₁ = √(T₂ / T₁) = √[((m₁ + m₂) g) / (m₂ g)] = √[(m₁ + m₂) / m₂].\n\nTherefore, Option (D) is the correct answer.",
    similarQuestion: {
      question: "A uniform rope of mass M has a block of mass 3M suspended from its lower end. The ratio of wave speed at the top to that at the bottom is:",
      option_a: "2 / √3",
      option_b: "√3 / 2",
      option_c: "2",
      option_d: "√2",
      correct_option: "A",
      explanation: "Step 1: T_top = (M + 3M)g = 4Mg. T_bottom = 3Mg.\n\nStep 2: v_top / v_bottom = √(T_top / T_bottom) = √(4/3) = 2 / √3.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 841,
    question: "An air column, closed at one end and open at the other, resonates with a tuning fork when the smallest length of the column is 50 cm. The next larger length of the column resonating with the same tuning fork is: [NEET 2016 Phase 1]",
    optionA: "150 cm",
    optionB: "200 cm",
    optionC: "66.7 cm",
    optionD: "100 cm",
    correctOption: "A",
    explanation: "Step 1: Identify resonance conditions for a closed organ pipe:\nResonance occurs when the column length equals an odd number of quarter wavelengths:\nL₁ = λ / 4 (first resonance / fundamental mode)\nL₂ = 3λ / 4 (second resonance / first overtone)\nL₃ = 5λ / 4 (third resonance / second overtone)\n\nStep 2: Relate successive resonating lengths:\nSmallest length L₁ = 50 cm = λ / 4 ⇒ λ = 4 × 50 = 200 cm.\nNext larger resonating length L₂ = 3λ / 4 = 3 × 50 = 150 cm.\n(Alternatively, L₂ = 3L₁ = 3 × 50 = 150 cm).\n\nTherefore, Option (A) is the correct answer.",
    similarQuestion: {
      question: "A resonance tube closed at one end gives its first resonance at 25 cm. Neglecting end correction, the second resonating length is:",
      option_a: "75 cm",
      option_b: "50 cm",
      option_c: "100 cm",
      option_d: "125 cm",
      correct_option: "A",
      explanation: "Step 1: Resonating lengths are in the ratio 1 : 3 : 5.\n\nStep 2: L₂ = 3 × L₁ = 3 × 25 cm = 75 cm.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 840,
    question: "Three sound waves of equal amplitudes have frequencies (n − 1), n and (n + 1). They superimpose to give beats. The number of beats produced per second will be: [NEET 2016 Phase 2]",
    optionA: "1",
    optionB: "4",
    optionC: "3",
    optionD: "2",
    correctOption: "D",
    explanation: "Step 1: Write the wave equations for equal amplitudes A:\ny₁ = A sin[2π(n − 1)t]\ny₂ = A sin[2πnt]\ny₃ = A sin[2π(n + 1)t]\n\nStep 2: Superimpose the waves:\ny = y₁ + y₃ + y₂ = 2A sin(2πnt) cos(2πt) + A sin(2πnt)\n= A sin(2πnt) [1 + 2 cos(2πt)].\n\nStep 3: Analyze amplitude modulation and beat frequency:\nThe resultant amplitude is R(t) = A [1 + 2 cos(2πt)].\nThe intensity is I ∝ R(t)² = A² [1 + 4 cos(2πt) + 4 cos²(2πt)].\nMaximum intensity occurs when cos(2πt) = 1, which has a time period of T = 1 / 1 = 1 s, or between the highest and lowest frequencies (n + 1) − (n − 1) = 2.\nThus, the frequency difference between the extreme frequencies is:\nΔf = (n + 1) − (n − 1) = 2 beats per second.\n\nTherefore, Option (D) is the correct answer.",
    similarQuestion: {
      question: "Three tuning forks of frequencies 254 Hz, 256 Hz, and 258 Hz are sounded together. The maximum number of beats heard per second is:",
      option_a: "4",
      option_b: "2",
      option_c: "1",
      option_d: "3",
      correct_option: "A",
      explanation: "Step 1: Beat frequency between extreme frequencies is f_max − f_min = 258 − 254 = 4 beats/s.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 839,
    question: "The second overtone of an open organ pipe has the same frequency as the first overtone of a closed pipe L metre long. The length of the open pipe will be: [NEET 2016 Phase 2]",
    optionA: "L",
    optionB: "2L",
    optionC: "L/2",
    optionD: "4L",
    correctOption: "B",
    explanation: "Step 1: Express frequencies for an open organ pipe of length L_o:\nFundamental = v / (2L_o)\nFirst overtone = 2v / (2L_o)\nSecond overtone = 3v / (2L_o).\n\nStep 2: Express frequencies for a closed organ pipe of length L:\nFundamental = v / (4L)\nFirst overtone (3rd harmonic) = 3v / (4L).\n\nStep 3: Equate the two given frequencies:\nFrequency of 2nd overtone (open) = Frequency of 1st overtone (closed)\n3v / (2L_o) = 3v / (4L)\n1 / (2L_o) = 1 / (4L)\n2L_o = 4L\nL_o = 2L.\n\nTherefore, Option (B) is the correct answer.",
    similarQuestion: {
      question: "The third overtone of an open organ pipe has the same frequency as the second overtone of a closed pipe of length L. The length of the open pipe is:",
      option_a: "8L / 5",
      option_b: "5L / 8",
      option_c: "2L",
      option_d: "4L",
      correct_option: "A",
      explanation: "Step 1: Open 3rd overtone = 4th harmonic = 4v / (2L_o) = 2v / L_o.\n\nStep 2: Closed 2nd overtone = 5th harmonic = 5v / (4L).\n\nStep 3: 2v / L_o = 5v / (4L) ⇒ L_o = 8L / 5.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 838,
    question: "The two nearest harmonics of a tube closed at one end and open at the other end are 220 Hz and 260 Hz. What is the fundamental frequency of the system? [NEET 2017]",
    optionA: "20 Hz",
    optionB: "30 Hz",
    optionC: "40 Hz",
    optionD: "10 Hz",
    correctOption: "A",
    explanation: "Step 1: Recall the harmonic structure of a closed tube:\nA tube closed at one end supports only odd harmonics of the fundamental frequency f₀:\nf_n = (2n − 1) f₀ for n = 1, 2, 3, ...\n\nStep 2: Relate two successive (nearest) harmonics:\nThe difference between two consecutive odd harmonics is:\nΔf = f_(n+1) − f_n = [2(n + 1) − 1] f₀ − [2n − 1] f₀ = 2 f₀.\n\nStep 3: Calculate the fundamental frequency f₀:\n2 f₀ = 260 − 220 = 40 Hz\nf₀ = 40 / 2 = 20 Hz.\n\nStep 4: Check harmonics:\n220 / 20 = 11 (11th harmonic)\n260 / 20 = 13 (13th harmonic)\nBoth are consecutive odd integers, verifying f₀ = 20 Hz.\n\nTherefore, Option (A) is the correct answer.",
    similarQuestion: {
      question: "Two nearest harmonics of an organ pipe closed at one end are 250 Hz and 350 Hz. The fundamental frequency of the pipe is:",
      option_a: "50 Hz",
      option_b: "100 Hz",
      option_c: "25 Hz",
      option_d: "75 Hz",
      correct_option: "A",
      explanation: "Step 1: In a closed pipe, difference between consecutive harmonics is 2f₀.\n\nStep 2: 2f₀ = 350 − 250 = 100 Hz ⇒ f₀ = 50 Hz.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 837,
    question: "The fundamental frequency in an open organ pipe is equal to the third harmonic of a closed organ pipe. If the length of the closed organ pipe is 20 cm, the length of the open organ pipe is: [NEET 2018]",
    optionA: "13.2 cm",
    optionB: "8 cm",
    optionC: "12.5 cm",
    optionD: "16 cm",
    correctOption: "A",
    explanation: "Step 1: Express fundamental frequency of open pipe (length L_o):\nf_open = v / (2L_o)\n\nStep 2: Express third harmonic of closed pipe (length L_c = 20 cm):\nf_closed,3 = 3v / (4L_c)\n\nStep 3: Equate the two frequencies:\nv / (2L_o) = 3v / (4L_c)\n1 / (2L_o) = 3 / (4 × 20) = 3 / 80\n2L_o = 80 / 3\nL_o = 40 / 3 ≈ 13.33 cm ≈ 13.2 cm.\n\nTherefore, Option (A) is the correct answer.",
    similarQuestion: {
      question: "The fundamental frequency of an open pipe is equal to the fifth harmonic of a closed pipe of length 50 cm. The length of the open pipe is:",
      option_a: "20 cm",
      option_b: "40 cm",
      option_c: "10 cm",
      option_d: "25 cm",
      correct_option: "A",
      explanation: "Step 1: v / (2L_o) = 5v / (4 × 50) = 5v / 200 = v / 40.\n\nStep 2: 2L_o = 40 ⇒ L_o = 20 cm.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 836,
    question: "A tuning fork is used to produce resonance in a glass tube. The length of the air column in this tube can be adjusted by a variable piston. At room temperature of 27°C, two successive resonances are produced at 20 cm and 73 cm of column length. If the frequency of the tuning fork is 320 Hz, the velocity of sound in air at 27°C is: [NEET 2018]",
    optionA: "330 m s⁻¹",
    optionB: "339 m s⁻¹",
    optionC: "350 m s⁻¹",
    optionD: "300 m s⁻¹",
    correctOption: "B",
    explanation: "Step 1: Relate successive resonating column lengths L₁ and L₂ to wavelength λ:\nIn a resonance tube apparatus:\nL₁ + e = λ / 4\nL₂ + e = 3λ / 4\nSubtracting the two equations eliminates end correction e:\nL₂ − L₁ = (3λ / 4) − (λ / 4) = λ / 2\nλ = 2(L₂ − L₁).\n\nStep 2: Substitute given lengths:\nL₁ = 20 cm = 0.20 m\nL₂ = 73 cm = 0.73 m\nλ = 2(0.73 − 0.20) = 2(0.53) = 1.06 m.\n\nStep 3: Calculate the speed of sound v:\nv = f λ = 320 Hz × 1.06 m = 339.2 m/s ≈ 339 m s⁻¹.\n\nTherefore, Option (B) is the correct answer.",
    similarQuestion: {
      question: "In a resonance tube experiment, two successive resonances are obtained at 18 cm and 54 cm with a tuning fork of 480 Hz. The speed of sound in air is:",
      option_a: "345.6 m/s",
      option_b: "330 m/s",
      option_c: "350 m/s",
      option_d: "360 m/s",
      correct_option: "A",
      explanation: "Step 1: λ = 2(L₂ − L₁) = 2(54 − 18) = 72 cm = 0.72 m.\n\nStep 2: v = fλ = 480 × 0.72 = 345.6 m/s.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 835,
    question: "In a guitar, two strings A and B made of the same material are slightly out of tune and produce beats of frequency 6 Hz. When tension in B is slightly decreased, the beat frequency increases. If the frequency of A is 530 Hz, the original frequency of B will be: [NEET 2020 Phase 1]",
    optionA: "524 Hz",
    optionB: "536 Hz",
    optionC: "537 Hz",
    optionD: "523 Hz",
    correctOption: "A",
    explanation: "Step 1: Determine possible original frequencies of string B:\nFrequency of string A is f_A = 530 Hz, and beat frequency is 6 Hz.\n|f_A − f_B| = 6\nThus, f_B can be either:\nf_B = 530 + 6 = 536 Hz, OR\nf_B = 530 − 6 = 524 Hz.\n\nStep 2: Analyze the effect of decreasing tension in string B:\nWave speed on a string is v = √(T / μ), so fundamental frequency is f ∝ √T.\nWhen tension in B is slightly decreased, frequency f_B decreases (f_B ↓).\n- If original f_B = 536 Hz: decreasing f_B causes it to approach 530 Hz (e.g. 535 Hz), which DECREASES the beat frequency |535 − 530| = 5 Hz.\n- If original f_B = 524 Hz: decreasing f_B causes it to move further away from 530 Hz (e.g. 523 Hz), which INCREASES the beat frequency |530 − 523| = 7 Hz.\n\nStep 3: Match with given observation:\nSince decreasing tension in B increases the beat frequency, the original frequency of string B must be 524 Hz.\n\nTherefore, Option (A) is the correct answer.",
    similarQuestion: {
      question: "Two tuning forks A and B produce 4 beats/s. The frequency of A is 256 Hz. When prong of B is filed (increasing its frequency), the beat frequency increases. The initial frequency of B was:",
      option_a: "260 Hz",
      option_b: "252 Hz",
      option_c: "254 Hz",
      option_d: "258 Hz",
      correct_option: "A",
      explanation: "Step 1: Filing increases frequency of B.\n\nStep 2: Since beat frequency increases, f_B must be greater than f_A: f_B = 256 + 4 = 260 Hz.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 834,
    question: "If the initial tension on a stretched string is doubled, then the ratio of the initial and final speeds of a transverse wave along the string is: [NEET 2022 Phase 1]",
    optionA: "1 : 1",
    optionB: "√2 : 1",
    optionC: "1 : √2",
    optionD: "1 : 2",
    correctOption: "C",
    explanation: "Step 1: Relate wave speed v to tension T in a stretched string:\nv = √(T / μ)\nwhere μ is the linear mass density of the string (constant).\n\nStep 2: Calculate ratio of initial speed v₁ to final speed v₂ when tension is doubled (T₂ = 2T₁):\nv₁ / v₂ = √(T₁ / T₂) = √(T₁ / (2T₁)) = 1 / √2 = 1 : √2.\n\nTherefore, Option (C) is the correct answer.",
    similarQuestion: {
      question: "If the tension in a stretched string is increased by four times, the ratio of initial to final wave speed is:",
      option_a: "1 : 2",
      option_b: "2 : 1",
      option_c: "1 : 4",
      option_d: "4 : 1",
      correct_option: "A",
      explanation: "Step 1: v ∝ √T.\n\nStep 2: v₁ / v₂ = √(T₁ / 4T₁) = 1 / 2 = 1 : 2.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 833,
    question: "An organ pipe filled with a gas at 27°C resonates at 400 Hz in its fundamental mode. If it is filled with the same gas at 90°C, the resonance frequency at the same mode will be: [NEET 2022 Phase 2]",
    optionA: "512 Hz",
    optionB: "420 Hz",
    optionC: "440 Hz",
    optionD: "484 Hz",
    correctOption: "C",
    explanation: "Step 1: Relate resonant frequency to temperature:\nFundamental frequency f = v / (2L) or v / (4L), so f ∝ v.\nThe speed of sound in a gas is v = √(γ R T / M) ∝ √T (where T is in Kelvin).\nTherefore, f ∝ √T.\n\nStep 2: Convert temperatures to Kelvin:\nT₁ = 27 + 273 = 300 K\nT₂ = 90 + 273 = 363 K (or 90°C ≈ 363 K; in standard approximation T₂ ≈ 363 K)\n\nStep 3: Calculate the new frequency f₂:\nf₂ / f₁ = √(T₂ / T₁) = √(363 / 300) = √(1.21) = 1.10\nf₂ = 1.10 × f₁ = 1.10 × 400 = 440 Hz.\n\nTherefore, Option (C) is the correct answer.",
    similarQuestion: {
      question: "An organ pipe resonates at 300 Hz at 27°C. At what temperature (in °C) will its frequency be 330 Hz?",
      option_a: "90°C",
      option_b: "60°C",
      option_c: "127°C",
      option_d: "45°C",
      correct_option: "A",
      explanation: "Step 1: f₂ / f₁ = √(T₂ / T₁) ⇒ 330 / 300 = 1.1 = √(T₂ / 300).\n\nStep 2: T₂ / 300 = 1.21 ⇒ T₂ = 363 K = 90°C.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 832,
    question: "The ratio of frequencies of fundamental harmonic produced by an open pipe to that of a closed pipe having the same length is: [NEET 2023]",
    optionA: "2 : 1",
    optionB: "1 : 3",
    optionC: "3 : 1",
    optionD: "1 : 2",
    correctOption: "A",
    explanation: "Step 1: Write formula for fundamental frequency of an open pipe:\nFor an open pipe of length L: f_open = v / (2L).\n\nStep 2: Write formula for fundamental frequency of a closed pipe:\nFor a closed pipe of length L: f_closed = v / (4L).\n\nStep 3: Calculate the ratio:\nf_open / f_closed = [v / (2L)] / [v / (4L)] = 4 / 2 = 2 / 1 = 2 : 1.\n\nTherefore, Option (A) is the correct answer.",
    similarQuestion: {
      question: "The ratio of the fundamental frequency of a closed pipe to that of an open pipe of identical length is:",
      option_a: "1 : 2",
      option_b: "2 : 1",
      option_c: "1 : 4",
      option_d: "4 : 1",
      correct_option: "A",
      explanation: "Step 1: f_closed / f_open = (v / 4L) / (v / 2L) = 1 / 2 = 1 : 2.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 831,
    question: "The 4th overtone of a closed organ pipe is same as that of the 3rd overtone of an open pipe. The ratio of the length of the closed pipe to the length of the open pipe is: [NEET 2023 Manipur]",
    optionA: "8 : 9",
    optionB: "9 : 7",
    optionC: "9 : 8",
    optionD: "7 : 9",
    correctOption: "C",
    explanation: "Step 1: Find frequency of the 4th overtone of a closed organ pipe:\nFor a closed organ pipe, the n-th overtone is the (2n + 1)-th harmonic.\nFor 4th overtone (n = 4): harmonic number = 2(4) + 1 = 9th harmonic.\nf_closed,4 = 9v / (4L_c).\n\nStep 2: Find frequency of the 3rd overtone of an open organ pipe:\nFor an open organ pipe, the m-th overtone is the (m + 1)-th harmonic.\nFor 3rd overtone (m = 3): harmonic number = 3 + 1 = 4th harmonic.\nf_open,3 = 4v / (2L_o) = 2v / L_o.\n\nStep 3: Equate the two frequencies:\n9v / (4L_c) = 2v / L_o\n9 / (4L_c) = 2 / L_o\n9 L_o = 8 L_c\nL_c / L_o = 9 / 8 = 9 : 8.\n\nTherefore, Option (C) is the correct answer.",
    similarQuestion: {
      question: "The 2nd overtone of a closed pipe equals the 1st overtone of an open pipe. The ratio of closed pipe length to open pipe length is:",
      option_a: "5 : 4",
      option_b: "4 : 5",
      option_c: "3 : 2",
      option_d: "2 : 3",
      correct_option: "A",
      explanation: "Step 1: Closed 2nd overtone = 5th harmonic = 5v / (4L_c).\n\nStep 2: Open 1st overtone = 2nd harmonic = 2v / (2L_o) = v / L_o.\n\nStep 3: 5v / (4L_c) = v / L_o ⇒ L_c / L_o = 5 / 4 = 5 : 4.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 830,
    question: "The displacement of a travelling wave is y = C sin [(2π/λ)(at − x)], where t is time, x is distance and λ is the wavelength, all in SI units. Then the frequency of the wave is: [NEET 2024 Re-Examination]",
    optionA: "2πλ/a",
    optionB: "2πa/λ",
    optionC: "λ/a",
    optionD: "a/λ",
    correctOption: "D",
    explanation: "Step 1: Express the given wave equation in standard form:\ny = C sin [(2π/λ)(at − x)] = C sin [(2π a / λ) t − (2π / λ) x].\n\nStep 2: Compare with standard travelling wave equation:\ny = C sin(ωt − kx)\nFrom comparison:\nWave number k = 2π / λ\nAngular frequency ω = 2π a / λ.\n\nStep 3: Relate angular frequency ω to frequency f:\nω = 2π f\n2π f = 2π a / λ\nf = a / λ.\n\nTherefore, Option (D) is the correct answer.",
    similarQuestion: {
      question: "A wave is given by y = A cos [2π (bt − x/L)]. The frequency and wave speed are respectively:",
      option_a: "b, bL",
      option_b: "b/L, b",
      option_c: "2πb, L/b",
      option_d: "b, L/b",
      correct_option: "A",
      explanation: "Step 1: ω = 2πb ⇒ f = ω / (2π) = b.\n\nStep 2: k = 2π / L ⇒ v = ω / k = (2πb) / (2π/L) = bL.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 829,
    question: "A pipe open at both ends has a fundamental frequency f in air. The pipe is now dipped vertically in a water drum to half of its length. The fundamental frequency of the air column is now equal to: [NEET 2025]",
    optionA: "3f/2",
    optionB: "2f",
    optionC: "f/2",
    optionD: "f",
    correctOption: "D",
    explanation: "Step 1: Fundamental frequency of the open pipe in air:\nFor an open organ pipe of length L:\nf = v / (2L).\n\nStep 2: Analyze the configuration when dipped halfway into water:\nWhen the pipe of length L is immersed halfway in water, the bottom half is submerged, so the remaining air column has length L' = L / 2.\nThe water surface acts as a closed boundary, so the pipe now functions as a closed organ pipe of length L' = L / 2.\n\nStep 3: Calculate the fundamental frequency f' of the closed pipe:\nf' = v / (4L') = v / [4(L / 2)] = v / (2L).\n\nStep 4: Compare f' with original frequency f:\nf' = v / (2L) = f.\nThus, the fundamental frequency remains f.\n\nTherefore, Option (D) is the correct answer.",
    similarQuestion: {
      question: "An open organ pipe of fundamental frequency 250 Hz is dipped vertically into water to 1/4th of its length. The fundamental frequency of the remaining air column is:",
      option_a: "166.7 Hz",
      option_b: "250 Hz",
      option_c: "333.3 Hz",
      option_d: "125 Hz",
      correct_option: "A",
      explanation: "Step 1: Initial f = v / (2L) = 250 Hz ⇒ v / L = 500 Hz.\n\nStep 2: Remaining length L' = 3L / 4, closed at bottom.\n\nStep 3: f' = v / (4L') = v / [4(3L/4)] = v / (3L) = (1/3)(500) ≈ 166.7 Hz.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 828,
    question: "For a travelling harmonic wave y(x,t) = 2.0 cos 2π(10t − 0.0080x + 0.35), where x and y are in cm and t in s, the phase difference between oscillatory motion of two points separated by a distance of 0.5 m is: [NEET 2026]",
    optionA: "0.08π rad",
    optionB: "0.8π rad",
    optionC: "8π rad",
    optionD: "0.008 rad",
    correctOption: "B",
    explanation: "Step 1: Identify the wave number k from the wave equation:\ny(x, t) = 2.0 cos [2π(10t − 0.0080x + 0.35)] = 2.0 cos [20πt − (2π × 0.0080)x + 0.70π]\nWave number k = 2π × 0.0080 cm⁻¹ = 0.016π rad/cm.\n\nStep 2: Express the spatial separation Δx in consistent units (cm):\nΔx = 0.5 m = 50 cm.\n\nStep 3: Calculate the phase difference Δφ:\nΔφ = k Δx = (2π × 0.0080 cm⁻¹) × (50 cm)\nΔφ = 2π × (0.0080 × 50) = 2π × 0.40 = 0.8π rad.\n\nTherefore, Option (B) is the correct answer.",
    similarQuestion: {
      question: "For a wave y = 5 sin 2π(50t − 0.02x) with x in cm, the phase difference between two points separated by 25 cm is:",
      option_a: "π rad",
      option_b: "0.5π rad",
      option_c: "2π rad",
      option_d: "0.2π rad",
      correct_option: "A",
      explanation: "Step 1: k = 2π × 0.02 cm⁻¹ = 0.04π cm⁻¹.\n\nStep 2: Δφ = k Δx = 0.04π × 25 = 1.0π rad = π rad.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 827,
    question: "For sound waves, if the number of nodes for the 5th harmonic of an open-ended pipe is n and that for the 9th harmonic of the same pipe with one of its ends closed is m, the ratio n/m is: [RE-NEET 2026]",
    optionA: "3/5",
    optionB: "5/9",
    optionC: "9/5",
    optionD: "1",
    correctOption: "D",
    explanation: "Step 1: Determine number of nodes in an open-ended pipe for the k-th harmonic:\nIn an open pipe, both ends are displacement antinodes.\n- Fundamental (1st harmonic): 1 node, 2 antinodes.\n- 2nd harmonic: 2 nodes, 3 antinodes.\n- In general, the k-th harmonic has exactly k nodes.\nFor the 5th harmonic (k = 5):\nNumber of nodes n = 5.\n\nStep 2: Determine number of nodes in a closed pipe for the 9th harmonic:\nIn a closed pipe (closed at one end, open at the other), only odd harmonics exist:\n- 1st harmonic: 1 node (at closed end).\n- 3rd harmonic (1st overtone): 2 nodes.\n- 5th harmonic (2nd overtone): 3 nodes.\n- 7th harmonic (3rd overtone): 4 nodes.\n- 9th harmonic (4th overtone): 5 nodes.\nFor the 9th harmonic:\nNumber of nodes m = (9 + 1) / 2 = 5.\n\nStep 3: Calculate the ratio n / m:\nRatio n / m = 5 / 5 = 1.\n\nTherefore, Option (D) is the correct answer.",
    similarQuestion: {
      question: "In an open pipe, the 3rd harmonic has n nodes. In a closed pipe of the same length, the 5th harmonic has m nodes. The ratio n/m is:",
      option_a: "1",
      option_b: "3/5",
      option_c: "5/3",
      option_d: "1/2",
      correct_option: "A",
      explanation: "Step 1: Open 3rd harmonic has n = 3 nodes.\n\nStep 2: Closed 5th harmonic has m = (5 + 1) / 2 = 3 nodes.\n\nStep 3: Ratio n / m = 3 / 3 = 1.\n\nTherefore, Option (A) is the correct answer."
    }
  }
];
