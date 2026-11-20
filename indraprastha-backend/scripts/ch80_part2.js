module.exports = [
  {
    id: 868,
    question: "A transverse wave propagating along the x-axis is represented by y(x,t) = 8.0 sin(0.5πx − 4πt − π/4), where x is in metres and t is in seconds. The speed of the wave is: [AIPMT 2006]",
    optionA: "8 m/s",
    optionB: "4π m/s",
    optionC: "0.5π m/s",
    optionD: "π/4 m/s",
    correctOption: "A",
    explanation: "Step 1: Compare the given wave equation with standard travelling wave form:\ny(x, t) = A sin(kx − ωt + φ)\nFrom y(x, t) = 8.0 sin(0.5πx − 4πt − π/4):\nk = 0.5π rad/m\nω = 4π rad/s\n\nStep 2: Calculate wave propagation speed v:\nv = ω / k = (4π rad/s) / (0.5π rad/m) = 8 m/s.\n\nTherefore, Option (A) is the correct answer.",
    similarQuestion: {
      question: "A wave is represented by y = 5 sin(0.2πx − 6πt), where x is in metres and t is in seconds. The speed of the wave is:",
      option_a: "30 m/s",
      option_b: "60 m/s",
      option_c: "15 m/s",
      option_d: "1.2 m/s",
      correct_option: "A",
      explanation: "Step 1: Identify wave parameters: k = 0.2π m⁻¹, ω = 6π rad/s.\n\nStep 2: Speed of wave v = ω / k = (6π) / (0.2π) = 30 m/s.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 867,
    question: "The time of reverberation of a room A is one second. What will be the time (in seconds) of reverberation of a room having all the dimensions double those of room A? [AIPMT 2006]",
    optionA: "1",
    optionB: "2",
    optionC: "4",
    optionD: "1/2",
    correctOption: "B",
    explanation: "Step 1: Recall Sabine's formula for reverberation time:\nT = 0.161 V / A_eff\nwhere V is the room volume and A_eff = ∑ α S is the total absorption (proportional to total surface area S).\n\nStep 2: Determine scaling with linear dimensions L:\nV ∝ L³\nS ∝ L²\nThus, T ∝ V / S ∝ L³ / L² = L.\n\nStep 3: Calculate new reverberation time when all dimensions are doubled (L' = 2L):\nT' / T = L' / L = 2\nT' = 2 × 1 s = 2 seconds.\n\nTherefore, Option (B) is the correct answer.",
    similarQuestion: {
      question: "If all linear dimensions of a hall are tripled without changing the absorption coefficient of its surfaces, its reverberation time will:",
      option_a: "Increase by 3 times",
      option_b: "Increase by 9 times",
      option_c: "Decrease by 3 times",
      option_d: "Remain unchanged",
      correct_option: "A",
      explanation: "Step 1: Reverberation time T ∝ Volume / Surface area ∝ L³ / L² = L.\n\nStep 2: Tripling linear dimensions (L' = 3L) increases reverberation time by 3 times.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 866,
    question: "Two sound waves with wavelengths 5.0 m and 5.5 m respectively, each propagate in a gas with velocity 330 m/s. We expect the following number of beats per second: [AIPMT 2006]",
    optionA: "6",
    optionB: "12",
    optionC: "0",
    optionD: "1",
    correctOption: "A",
    explanation: "Step 1: Calculate the frequency of the first sound wave:\nf₁ = v / λ₁ = 330 / 5.0 = 66 Hz\n\nStep 2: Calculate the frequency of the second sound wave:\nf₂ = v / λ₂ = 330 / 5.5 = 60 Hz\n\nStep 3: Calculate the number of beats per second (beat frequency):\nBeat frequency = |f₁ − f₂| = |66 − 60| = 6 beats/s.\n\nTherefore, Option (A) is the correct answer.",
    similarQuestion: {
      question: "Two sound waves of wavelengths 1.0 m and 1.02 m produce beats in a medium where the speed of sound is 340 m/s. The beat frequency is approximately:",
      option_a: "6.7 Hz",
      option_b: "3.4 Hz",
      option_c: "10 Hz",
      option_d: "1.5 Hz",
      correct_option: "A",
      explanation: "Step 1: f₁ = 340 / 1.0 = 340 Hz.\n\nStep 2: f₂ = 340 / 1.02 ≈ 333.33 Hz.\n\nStep 3: Beat frequency = |f₁ − f₂| = 340 − 333.33 ≈ 6.67 Hz ≈ 6.7 Hz.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 865,
    question: "Two vibrating tuning forks produce waves given by y₁ = 4 sin 500πt and y₂ = 2 sin 506πt. The number of beats produced per minute is: [AIPMT 2006]",
    optionA: "360",
    optionB: "180",
    optionC: "60",
    optionD: "3",
    correctOption: "B",
    explanation: "Step 1: Find angular frequencies and frequencies of the two waves:\nω₁ = 500π rad/s ⇒ f₁ = ω₁ / (2π) = 500π / 2π = 250 Hz\nω₂ = 506π rad/s ⇒ f₂ = ω₂ / (2π) = 506π / 2π = 253 Hz\n\nStep 2: Calculate beats per second:\nBeat frequency = |f₂ − f₁| = 253 − 250 = 3 beats/s.\n\nStep 3: Convert to beats per minute:\nBeats per minute = 3 × 60 = 180 beats/min.\n\nTherefore, Option (B) is the correct answer.",
    similarQuestion: {
      question: "Two sound sources produce waves y₁ = A sin(400πt) and y₂ = A sin(408πt). The number of beats heard in 30 seconds is:",
      option_a: "120",
      option_b: "240",
      option_c: "60",
      option_d: "4",
      correct_option: "A",
      explanation: "Step 1: f₁ = 400π / (2π) = 200 Hz, f₂ = 408π / (2π) = 204 Hz.\n\nStep 2: Beat frequency = 204 − 200 = 4 beats/s.\n\nStep 3: In 30 seconds, number of beats = 4 × 30 = 120.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 864,
    question: "The wave described by y = 0.25 sin(10πx − 2πt), where x and y are in metres and t is in seconds, is a wave travelling along the: [AIPMT 2008]",
    optionA: "+x direction with frequency 1 Hz and wavelength λ = 0.2 m.",
    optionB: "−x direction with amplitude 0.25 m and wavelength λ = 0.2 m.",
    optionC: "−x direction with frequency 1 Hz.",
    optionD: "+x direction with frequency π Hz and wavelength λ = 0.2 m.",
    correctOption: "A",
    explanation: "Step 1: Compare with standard travelling wave equation:\ny = A sin(kx − ωt)\nThe minus sign between kx and ωt indicates propagation along the positive x-direction (+x direction).\n\nStep 2: Extract wave parameters:\nk = 10π rad/m ⇒ λ = 2π / k = 2π / (10π) = 0.2 m\nω = 2π rad/s ⇒ f = ω / (2π) = 2π / (2π) = 1 Hz\nAmplitude A = 0.25 m.\n\nStep 3: Match with given options:\nThe wave travels along the +x direction with frequency 1 Hz and wavelength λ = 0.2 m.\n\nTherefore, Option (A) is the correct answer.",
    similarQuestion: {
      question: "A wave is given by y = 0.1 sin(4πx − 8πt). Its direction of propagation, frequency, and wavelength are:",
      option_a: "+x direction, 4 Hz, 0.5 m",
      option_b: "−x direction, 4 Hz, 0.5 m",
      option_c: "+x direction, 8 Hz, 0.25 m",
      option_d: "−x direction, 8 Hz, 0.25 m",
      correct_option: "A",
      explanation: "Step 1: Form (kx − ωt) signifies +x direction.\n\nStep 2: k = 4π ⇒ λ = 2π / (4π) = 0.5 m. ω = 8π ⇒ f = 8π / (2π) = 4 Hz.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 863,
    question: "Two periodic waves of intensities I₁ and I₂ pass through a region at the same time in the same direction. The sum of the maximum and minimum intensities is: [AIPMT 2008]",
    optionA: "(√I₁ − √I₂)²",
    optionB: "2(I₁ + I₂)",
    optionC: "I₁ + I₂",
    optionD: "(√I₁ + √I₂)²",
    correctOption: "B",
    explanation: "Step 1: Write expressions for maximum and minimum resultant intensities in interference:\nI_max = (√I₁ + √I₂)² = I₁ + I₂ + 2√(I₁I₂)\nI_min = (√I₁ − √I₂)² = I₁ + I₂ − 2√(I₁I₂)\n\nStep 2: Add the two intensities:\nI_max + I_min = [I₁ + I₂ + 2√(I₁I₂)] + [I₁ + I₂ − 2√(I₁I₂)]\n= 2I₁ + 2I₂ = 2(I₁ + I₂).\n\nTherefore, Option (B) is the correct answer.",
    similarQuestion: {
      question: "Two interfering waves have equal intensity I₀ each. The sum of their maximum and minimum intensities is:",
      option_a: "4I₀",
      option_b: "2I₀",
      option_c: "I₀",
      option_d: "8I₀",
      correct_option: "A",
      explanation: "Step 1: I_max + I_min = 2(I₁ + I₂).\n\nStep 2: For I₁ = I₂ = I₀, sum = 2(I₀ + I₀) = 4I₀.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 862,
    question: "A point performs simple harmonic oscillation of period T and the equation of motion is given by x = a sin(ωt + π/6). After the elapse of what fraction of the time period will the velocity of the point be equal to half of its maximum velocity? [AIPMT 2008]",
    optionA: "T/3",
    optionB: "T/12",
    optionC: "T/8",
    optionD: "T/6",
    correctOption: "B",
    explanation: "Step 1: Differentiate displacement to find velocity:\nx = a sin(ωt + π/6)\nv = dx/dt = aω cos(ωt + π/6)\nMaximum velocity is v_max = aω.\n\nStep 2: Set condition v = v_max / 2:\naω cos(ωt + π/6) = aω / 2\ncos(ωt + π/6) = 1/2\n\nStep 3: Solve for ωt:\nSince cos(π/3) = 1/2:\nωt + π/6 = π/3\nωt = π/3 − π/6 = π/6\n\nStep 4: Express t in terms of time period T:\n(2π / T) t = π/6\nt = (π/6) × (T / 2π) = T / 12.\n\nTherefore, Option (B) is the correct answer.",
    similarQuestion: {
      question: "A particle executes SHM with equation x = A cos(ωt). After what minimum time from t = 0 is its velocity equal to half of maximum velocity?",
      option_a: "T / 12",
      option_b: "T / 6",
      option_c: "T / 8",
      option_d: "T / 4",
      correct_option: "A",
      explanation: "Step 1: v = −Aω sin(ωt). Magnitude is |v| = Aω sin(ωt).\n\nStep 2: Set |v| = v_max / 2 ⇒ sin(ωt) = 1/2 ⇒ ωt = π/6.\n\nStep 3: (2π / T) t = π/6 ⇒ t = T / 12.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 861,
    question: "A wave in a string has an amplitude of 2 cm. The wave travels in the +x direction with a speed of 128 m/s and it is noted that 5 complete waves fit in 4 m length of the string. The equation describing the wave is: [AIPMT 2009]",
    optionA: "y = (0.02 m) sin(15.7x − 2010t)",
    optionB: "y = (0.02 m) sin(15.7x + 2010t)",
    optionC: "y = (0.02 m) sin(7.85x − 1005t)",
    optionD: "y = (0.02 m) sin(7.85x + 1005t)",
    correctOption: "C",
    explanation: "Step 1: Calculate wavelength λ from the given spatial information:\n5 complete waves fit in 4 m:\n5λ = 4 m ⇒ λ = 4 / 5 = 0.8 m.\n\nStep 2: Determine wave number k:\nk = 2π / λ = 2π / 0.8 = 2.5π ≈ 2.5 × 3.1416 ≈ 7.85 m⁻¹.\n\nStep 3: Calculate angular frequency ω from wave speed v:\nω = k × v = 7.85 m⁻¹ × 128 m/s ≈ 1005 rad/s.\n\nStep 4: Form the travelling wave equation in the +x direction:\nAmplitude A = 2 cm = 0.02 m.\nWave traveling in +x direction has form (kx − ωt):\ny = (0.02 m) sin(7.85x − 1005t).\n\nTherefore, Option (C) is the correct answer.",
    similarQuestion: {
      question: "A transverse wave of amplitude 0.05 m travels in the +x direction at 200 m/s. If 4 complete waves fit in 2 m, the wave equation is:",
      option_a: "y = (0.05 m) sin(12.57x − 2513t)",
      option_b: "y = (0.05 m) sin(12.57x + 2513t)",
      option_c: "y = (0.05 m) sin(6.28x − 1256t)",
      option_d: "y = (0.05 m) sin(6.28x + 1256t)",
      correct_option: "A",
      explanation: "Step 1: λ = 2 / 4 = 0.5 m ⇒ k = 2π / 0.5 = 4π ≈ 12.57 m⁻¹.\n\nStep 2: ω = kv = 4π × 200 = 800π ≈ 2513 rad/s.\n\nStep 3: Travelling in +x direction: y = (0.05 m) sin(12.57x − 2513t).\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 860,
    question: "Each of the two strings of length 51.6 cm and 49.1 cm are tensioned separately by a 20 N force. The mass per unit length of both strings is the same and equal to 1 g/m. When both strings vibrate simultaneously, the number of beats is: [AIPMT 2009]",
    optionA: "7",
    optionB: "8",
    optionC: "3",
    optionD: "5",
    correctOption: "A",
    explanation: "Step 1: Calculate the wave speed on the strings:\nT = 20 N\nμ = 1 g/m = 10⁻³ kg/m\nv = √(T / μ) = √(20 / 10⁻³) = √(20000) ≈ 141.42 m/s.\n\nStep 2: Calculate fundamental frequency of each string:\nf₁ = v / (2L₁) = 141.42 / (2 × 0.516) = 141.42 / 1.032 ≈ 137.03 Hz\nf₂ = v / (2L₂) = 141.42 / (2 × 0.491) = 141.42 / 0.982 ≈ 144.01 Hz\n\nStep 3: Calculate the beat frequency:\nBeat frequency = |f₂ − f₁| = 144.01 − 137.03 = 6.98 ≈ 7 beats/s.\n\nTherefore, Option (A) is the correct answer.",
    similarQuestion: {
      question: "Two stretched strings of lengths 50 cm and 51 cm have the same tension and linear mass density. If the speed of the transverse wave is 100 m/s, the beat frequency produced in fundamental mode is approximately:",
      option_a: "2 Hz",
      option_b: "4 Hz",
      option_c: "6 Hz",
      option_d: "1 Hz",
      correct_option: "A",
      explanation: "Step 1: f₁ = v / (2L₁) = 100 / (2 × 0.50) = 100 Hz.\n\nStep 2: f₂ = v / (2L₂) = 100 / (2 × 0.51) ≈ 98.04 Hz.\n\nStep 3: Beat frequency = |f₁ − f₂| ≈ 100 − 98.04 ≈ 2 Hz.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 859,
    question: "A tuning fork of frequency 512 Hz makes 4 beats per second with the vibrating string of a piano. The beat frequency decreases to 2 beats per second when the tension in the piano string is slightly increased. The frequency of the piano string before increasing the tension was: [AIPMT 2010 Prelims]",
    optionA: "510 Hz",
    optionB: "514 Hz",
    optionC: "516 Hz",
    optionD: "508 Hz",
    correctOption: "D",
    explanation: "Step 1: Determine possible initial frequencies of the piano string:\nTuning fork frequency f_fork = 512 Hz.\nBeat frequency = 4 beats/s.\nTherefore, the initial piano string frequency f_piano could be:\nf_piano = 512 + 4 = 516 Hz, OR\nf_piano = 512 − 4 = 508 Hz.\n\nStep 2: Analyze effect of increasing tension:\nWave speed on a string is v = √(T / μ), so fundamental frequency f ∝ √T.\nWhen tension T increases, f_piano increases.\n- If initial f_piano were 516 Hz, increasing tension would make f_piano > 516 Hz, causing the beat frequency |f_piano − 512| to INCREASE (> 4 beats/s).\n- If initial f_piano were 508 Hz, increasing tension causes f_piano to increase towards 512 Hz (to 510 Hz), so the beat frequency |512 − f_piano| DECREASES to 2 beats/s.\n\nStep 3: Conclude original frequency:\nThe original frequency before increasing tension was 508 Hz.\n\nTherefore, Option (D) is the correct answer.",
    similarQuestion: {
      question: "A tuning fork of 256 Hz gives 3 beats/s with an organ pipe. When the temperature of the air in the pipe increases slightly, the beat frequency becomes 1 beat/s. The original frequency of the organ pipe was:",
      option_a: "253 Hz",
      option_b: "259 Hz",
      option_c: "250 Hz",
      option_d: "260 Hz",
      correct_option: "A",
      explanation: "Step 1: Sound speed v ∝ √T. Higher temperature increases frequency of organ pipe.\n\nStep 2: Since beat frequency decreases, the pipe frequency must have been below 256 Hz: f = 256 − 3 = 253 Hz.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 858,
    question: "A transverse wave is represented by y = A sin(ωt − kx). For what value of the wavelength is the wave velocity equal to the maximum particle velocity? [AIPMT 2010 Prelims]",
    optionA: "πA/2",
    optionB: "πA",
    optionC: "2πA",
    optionD: "A",
    correctOption: "C",
    explanation: "Step 1: Write expressions for wave velocity and maximum particle velocity:\nWave velocity v_wave = ω / k = fλ.\nParticle velocity v_particle = dy/dt = Aω cos(ωt − kx).\nMaximum particle velocity v_particle,max = Aω.\n\nStep 2: Equate the two velocities:\nv_wave = v_particle,max\nω / k = Aω\n1 / k = A ⇒ k = 1 / A.\n\nStep 3: Relate k to wavelength λ:\nk = 2π / λ\n2π / λ = 1 / A\nλ = 2πA.\n\nTherefore, Option (C) is the correct answer.",
    similarQuestion: {
      question: "If maximum particle acceleration in a wave y = A sin(ωt − kx) is equal to wave velocity multiplied by ω², then the wavelength is:",
      option_a: "2πA",
      option_b: "πA",
      option_c: "A / 2π",
      option_d: "2π / A",
      correct_option: "A",
      explanation: "Step 1: Maximum particle acceleration = Aω². Wave velocity = ω / k.\n\nStep 2: Aω² = (ω / k) ω² = ω³ / k ⇒ A = ω / k = v_wave. Since v_wave = fλ = (ω/2π)λ, k = 1/A ⇒ λ = 2πA.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 857,
    question: "Sound waves travel at 350 m/s through warm air and at 3500 m/s through brass. The wavelength of a 700 Hz acoustic wave as it enters brass from warm air: [AIPMT 2011 Prelims]",
    optionA: "Decreases by a factor of 10",
    optionB: "Increases by a factor of 20",
    optionC: "Increases by a factor of 10",
    optionD: "Decreases by a factor of 20",
    correctOption: "C",
    explanation: "Step 1: Understand how frequency and wavelength behave across media:\nWhen a wave travels from one medium to another, its frequency f remains constant (determined by the source).\n\nStep 2: Relate wave speed to wavelength:\nv = fλ ⇒ λ = v / f.\nSince f is constant, wavelength is directly proportional to speed: λ ∝ v.\n\nStep 3: Calculate the change factor:\nλ_brass / λ_air = v_brass / v_air = 3500 / 350 = 10.\nTherefore, the wavelength increases by a factor of 10.\n\nTherefore, Option (C) is the correct answer.",
    similarQuestion: {
      question: "A sound wave travels from water (v = 1500 m/s) into steel (v = 5000 m/s). What happens to its wavelength?",
      option_a: "Increases by a factor of 10/3",
      option_b: "Decreases by a factor of 10/3",
      option_c: "Increases by a factor of 2",
      option_d: "Remains the same",
      correct_option: "A",
      explanation: "Step 1: Frequency remains invariant across different media.\n\nStep 2: λ_steel / λ_water = v_steel / v_water = 5000 / 1500 = 10/3.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 856,
    question: "Two waves are represented by the equations y₁ = a sin(ωt + kx + 0.57) m and y₂ = a cos(ωt + kx) m, where x is in metres and t in seconds. The phase difference between them is: [AIPMT 2011 Prelims]",
    optionA: "1.0 radian",
    optionB: "1.25 radian",
    optionC: "1.57 radian",
    optionD: "0.57 radian",
    correctOption: "A",
    explanation: "Step 1: Convert both wave equations into the same trigonometric form:\ny₁ = a sin(ωt + kx + 0.57)\ny₂ = a cos(ωt + kx) = a sin(ωt + kx + π/2)\n\nStep 2: Calculate the phase of each wave:\nPhase of wave 1: φ₁ = ωt + kx + 0.57\nPhase of wave 2: φ₂ = ωt + kx + π/2\n\nStep 3: Calculate the phase difference Δφ:\nΔφ = φ₂ − φ₁ = (π/2) − 0.57\nUsing π/2 ≈ 3.1416 / 2 ≈ 1.5708 rad:\nΔφ = 1.5708 − 0.57 = 1.0008 rad ≈ 1.0 radian.\n\nTherefore, Option (A) is the correct answer.",
    similarQuestion: {
      question: "The phase difference between two waves y₁ = A sin(ωt + 0.35) and y₂ = A cos(ωt) is approximately:",
      option_a: "1.22 rad",
      option_b: "1.57 rad",
      option_c: "0.35 rad",
      option_d: "1.92 rad",
      correct_option: "A",
      explanation: "Step 1: y₂ = A sin(ωt + π/2) with π/2 ≈ 1.57 rad.\n\nStep 2: Phase difference Δφ = 1.57 − 0.35 = 1.22 rad.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 855,
    question: "Two identical piano wires, kept under the same tension T, have a fundamental frequency of 600 Hz. The fractional increase in the tension of one of the wires which will lead to occurrence of 6 beats/s when both the wires oscillate together would be: [AIPMT 2011 Mains]",
    optionA: "0.01",
    optionB: "0.02",
    optionC: "0.03",
    optionD: "0.04",
    correctOption: "B",
    explanation: "Step 1: Relate fundamental frequency of a stretched wire to its tension:\nf = (1 / 2L) √(T / μ) ⇒ f ∝ √T.\n\nStep 2: Take logarithmic differentiation for small changes:\nln f = ln(constant) + (1/2) ln T\nΔf / f = (1/2) (ΔT / T)\nΔT / T = 2 (Δf / f).\n\nStep 3: Substitute the given values:\nOriginal frequency f = 600 Hz\nBeat frequency Δf = 6 Hz\nΔT / T = 2 × (6 / 600) = 2 × 0.01 = 0.02.\n\nTherefore, Option (B) is the correct answer.",
    similarQuestion: {
      question: "A string has a fundamental frequency of 500 Hz under tension T. To produce 5 beats/s with an identical unmodified string, the fractional increase in tension should be:",
      option_a: "0.02",
      option_b: "0.01",
      option_c: "0.04",
      option_d: "0.005",
      correct_option: "A",
      explanation: "Step 1: ΔT / T = 2 (Δf / f).\n\nStep 2: ΔT / T = 2 × (5 / 500) = 2 × 0.01 = 0.02.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 854,
    question: "Two sources of sound placed close to each other are emitting progressive waves given by y₁ = 4 sin 600πt and y₂ = 5 sin 608πt. An observer located near these two sources of sound will hear: [AIPMT 2012 Prelims]",
    optionA: "4 beats per second with intensity ratio 25 : 16 between waxing and waning.",
    optionB: "8 beats per second with intensity ratio 25 : 16 between waxing and waning.",
    optionC: "8 beats per second with intensity ratio 81 : 1 between waxing and waning.",
    optionD: "4 beats per second with intensity ratio 81 : 1 between waxing and waning.",
    correctOption: "D",
    explanation: "Step 1: Determine frequencies of both sources:\nω₁ = 600π rad/s ⇒ f₁ = ω₁ / (2π) = 300 Hz\nω₂ = 608π rad/s ⇒ f₂ = ω₂ / (2π) = 304 Hz\n\nStep 2: Calculate the beat frequency:\nBeat frequency = |f₂ − f₁| = 304 − 300 = 4 beats per second.\n\nStep 3: Calculate the intensity ratio between waxing (maximum) and waning (minimum):\nAmplitudes are A₁ = 4 and A₂ = 5.\nA_max = A₁ + A₂ = 4 + 5 = 9\nA_min = |A₂ − A₁| = |5 − 4| = 1\nIntensity ratio I_max / I_min = (A_max / A_min)² = (9 / 1)² = 81 : 1.\n\nStep 4: Combine conclusions:\nAn observer hears 4 beats per second with an intensity ratio of 81 : 1 between waxing and waning.\n\nTherefore, Option (D) is the correct answer.",
    similarQuestion: {
      question: "Two sound waves y₁ = 3 sin(500πt) and y₂ = 5 sin(504πt) interfere. The beat frequency and ratio of maximum to minimum intensity are:",
      option_a: "2 beats/s, 16 : 1",
      option_b: "4 beats/s, 16 : 1",
      option_c: "2 beats/s, 25 : 9",
      option_d: "4 beats/s, 25 : 9",
      correct_option: "A",
      explanation: "Step 1: f₁ = 250 Hz, f₂ = 252 Hz ⇒ Beat frequency = 2 Hz.\n\nStep 2: A_max = 5 + 3 = 8, A_min = 5 − 3 = 2.\nI_max / I_min = (8 / 2)² = 4² = 16 : 1.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 853,
    question: "When a string is divided into three segments of length l₁, l₂ and l₃, the fundamental frequencies of these three segments are v₁, v₂ and v₃ respectively. The original fundamental frequency v of the string is: [AIPMT 2012 Prelims]",
    optionA: "√v = √v₁ + √v₂ + √v₃",
    optionB: "v = v₁ + v₂ + v₃",
    optionC: "1/v = 1/v₁ + 1/v₂ + 1/v₃",
    optionD: "1/√v = 1/√v₁ + 1/√v₂ + 1/√v₃",
    correctOption: "C",
    explanation: "Step 1: Relate fundamental frequency v of a vibrating string of length l:\nv = (1 / 2l) √(T / μ) ⇒ l = (1 / 2v) √(T / μ)\nSince tension T and mass per unit length μ are uniform along the string:\nl ∝ 1 / v, or l = k / v (where k is a constant).\n\nStep 2: Relate individual segment lengths to their fundamental frequencies:\nl₁ = k / v₁\nl₂ = k / v₂\nl₃ = k / v₃\n\nStep 3: Use the total length of the string:\nl = l₁ + l₂ + l₃\nk / v = (k / v₁) + (k / v₂) + (k / v₃)\nDividing through by k gives:\n1/v = 1/v₁ + 1/v₂ + 1/v₃.\n\nTherefore, Option (C) is the correct answer.",
    similarQuestion: {
      question: "A wire of fundamental frequency f is divided into two segments by a movable bridge. If the fundamental frequencies of the segments are f₁ and f₂, then:",
      option_a: "1/f = 1/f₁ + 1/f₂",
      option_b: "f = f₁ + f₂",
      option_c: "f = √(f₁ f₂)",
      option_d: "1/√f = 1/√f₁ + 1/√f₂",
      correct_option: "A",
      explanation: "Step 1: Length is inversely proportional to fundamental frequency: L = k / f.\n\nStep 2: Since L = L₁ + L₂, we have k/f = k/f₁ + k/f₂ ⇒ 1/f = 1/f₁ + 1/f₂.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 852,
    question: "The equation of a simple harmonic wave is given by y = 3 sin [(π/2)(50t − x)], where x and y are in metres and t is in seconds. The ratio of maximum particle velocity to the wave velocity is: [AIPMT 2012 Mains]",
    optionA: "2π",
    optionB: "3π/2",
    optionC: "3π",
    optionD: "2π/3",
    correctOption: "B",
    explanation: "Step 1: Rewrite the given wave equation to find angular parameters:\ny = 3 sin(25πt − 0.5πx)\nAmplitude A = 3 m\nAngular frequency ω = 25π rad/s\nWave number k = 0.5π rad/m\n\nStep 2: Find maximum particle velocity v_p,max:\nv_p,max = Aω = 3 × 25π = 75π m/s.\n\nStep 3: Find wave velocity v_wave:\nv_wave = ω / k = (25π) / (0.5π) = 50 m/s.\n\nStep 4: Calculate the ratio of maximum particle velocity to wave velocity:\nRatio = v_p,max / v_wave = 75π / 50 = 3π / 2.\n\nTherefore, Option (B) is the correct answer.",
    similarQuestion: {
      question: "A wave is described by y = 2 sin(100πt − 2πx) in SI units. The ratio of maximum particle speed to wave speed is:",
      option_a: "4π",
      option_b: "2π",
      option_c: "π",
      option_d: "8π",
      correct_option: "A",
      explanation: "Step 1: A = 2 m, ω = 100π rad/s, k = 2π rad/m.\n\nStep 2: v_p,max = Aω = 200π m/s. Wave speed v = ω / k = 50 m/s.\n\nStep 3: Ratio = 200π / 50 = 4π.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 851,
    question: "A source of unknown frequency gives 4 beats/s when sounded with a source of known frequency 250 Hz. The second harmonic of the source of unknown frequency gives five beats per second when sounded with a source of frequency 513 Hz. The unknown frequency is: [NEET 2013]",
    optionA: "240 Hz",
    optionB: "260 Hz",
    optionC: "254 Hz",
    optionD: "246 Hz",
    correctOption: "C",
    explanation: "Step 1: Identify possible values for the unknown fundamental frequency f:\nKnown frequency f₁ = 250 Hz, beat frequency = 4 beats/s.\nf = 250 + 4 = 254 Hz, OR\nf = 250 − 4 = 246 Hz.\n\nStep 2: Test the second harmonic (2f) for each case:\nCase 1: If f = 254 Hz, then 2f = 2 × 254 = 508 Hz.\nWhen sounded with 513 Hz, beats = |513 − 508| = 5 beats/s. This matches the given condition.\n\nCase 2: If f = 246 Hz, then 2f = 2 × 246 = 492 Hz.\nWhen sounded with 513 Hz, beats = |513 − 492| = 21 beats/s ≠ 5 beats/s.\n\nStep 3: Conclude the unknown frequency:\nThe unknown frequency is 254 Hz.\n\nTherefore, Option (C) is the correct answer.",
    similarQuestion: {
      question: "A source gives 5 beats/s with a 200 Hz source. Its second harmonic gives 6 beats/s with a 416 Hz source. The unknown frequency is:",
      option_a: "205 Hz",
      option_b: "195 Hz",
      option_c: "210 Hz",
      option_d: "190 Hz",
      correct_option: "A",
      explanation: "Step 1: Possible f = 205 Hz or 195 Hz.\n\nStep 2: If f = 205 Hz, 2f = 410 Hz ⇒ |416 − 410| = 6 beats/s (matches!). If f = 195 Hz, 2f = 390 Hz ⇒ |416 − 390| = 26 beats/s.\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 850,
    question: "A wave travelling in the +x-direction having displacement along the y-direction as 1 m, wavelength 2π m and frequency 1/π Hz is represented by: [NEET 2013]",
    optionA: "y = sin(10πx − 20πt)",
    optionB: "y = sin(2πx + 2πt)",
    optionC: "y = sin(x − 2t)",
    optionD: "y = sin(2πx − 2πt)",
    correctOption: "C",
    explanation: "Step 1: Extract wave parameters from the question:\nAmplitude A = 1 m\nWavelength λ = 2π m ⇒ Wave number k = 2π / λ = 2π / (2π) = 1 m⁻¹\nFrequency f = 1/π Hz ⇒ Angular frequency ω = 2πf = 2π(1/π) = 2 rad/s\n\nStep 2: Write wave equation for propagation in +x-direction:\ny = A sin(kx − ωt) = 1 sin(1x − 2t) = sin(x − 2t) m.\n\nTherefore, Option (C) is the correct answer.",
    similarQuestion: {
      question: "A harmonic wave propagating along +x direction has amplitude 2 m, wavelength π m, and frequency 2/π Hz. Its equation is:",
      option_a: "y = 2 sin(2x − 4t)",
      option_b: "y = 2 sin(x − 2t)",
      option_c: "y = 2 sin(2x + 4t)",
      option_d: "y = 2 sin(4x − 2t)",
      correct_option: "A",
      explanation: "Step 1: k = 2π / π = 2 m⁻¹. ω = 2π × (2/π) = 4 rad/s.\n\nStep 2: In +x direction: y = 2 sin(2x − 4t).\n\nTherefore, Option (A) is the correct answer."
    }
  },
  {
    id: 849,
    question: "If we study the vibration of a pipe open at both ends, then the following statement is NOT true: [NEET 2013]",
    optionA: "All harmonics of the fundamental frequency will be generated.",
    optionB: "Pressure change will be maximum at both ends.",
    optionC: "Open end will be antinode.",
    optionD: "Odd harmonics of the fundamental frequency will be generated.",
    correctOption: "B",
    explanation: "Step 1: Analyze boundary conditions of an open pipe:\nAt open ends of an organ pipe, air particles are completely free to vibrate, so displacement antinodes exist at both open ends.\n\nStep 2: Relate displacement and pressure nodes/antinodes:\nA displacement antinode corresponds to a pressure node (where pressure is fixed at atmospheric pressure, so pressure change is zero / minimum, not maximum).\n\nStep 3: Evaluate each statement:\n- Option A: True (open pipe produces both even and odd harmonics).\n- Option B: False / NOT true (pressure change is zero at the open ends because open ends are pressure nodes).\n- Option C: True (displacement antinode at open end).\n- Option D: True (odd harmonics are generated, along with even harmonics).\n\nTherefore, statement (B) is the incorrect statement.\n\nTherefore, Option (B) is the correct answer.",
    similarQuestion: {
      question: "In an organ pipe open at both ends, at the ends of the pipe there exist:",
      option_a: "Displacement antinodes and pressure nodes",
      option_b: "Displacement nodes and pressure antinodes",
      option_c: "Displacement antinodes and pressure antinodes",
      option_d: "Displacement nodes and pressure nodes",
      correct_option: "A",
      explanation: "Step 1: Particles oscillate freely at open boundaries, forming displacement antinodes.\n\nStep 2: Pressure at open boundary is atmospheric, so pressure variation is zero, forming pressure nodes.\n\nTherefore, Option (A) is the correct answer."
    }
  }
];
