# PROJECT MEMORY & AUTOMATED WORKFLOW INSTRUCTIONS

## 1. Active Task: "Solve Similar Questions" for Practice Section (Topic-wise MCQs) & Test Series

### Core Quality & Formatting Standards (NON-NEGOTIABLE):
1. **Plain Text with Scientific Unicode Formatting:** 
   - Absolutely NO LaTeX markup, NO dollar symbols (`$`), NO `\text{...}`, NO `\frac{...}{...}`.
   - Use clean Unicode symbols: `λ`, `π`, `α`, `β`, `γ`, `ν`, `Δ`, `√`, `×`, `→`, `⇌`, `≈`, `ℏ`, `°`, `Å`.
   - Subscripts: `₀, ₁, ₂, ₃, ₄, ₅, ₆, ₇, ₈, ₉, ₙ, ₚ, ₘₐₓ, ₘᵢₙ`
   - Superscripts: `⁰, ¹, ², ³, ⁴, ⁵, ⁶, ⁷, ⁸, ⁹, ⁺, ⁻`
2. **Step-by-Step English Explanations:**
   - Detailed, methodical physics / chemistry derivations.
   - Conclude every explanation with: `Therefore, Option (...) is the correct answer.`
3. **Execution Rule (Per User Instruction):**
   - **Do whole chapters at once** directly committed live (using modular part scripts internally to avoid payload limits), rather than stopping every 6 questions.

---

## 2. API Endpoints & Admin Credentials

- **Base URL:** `https://api.indraprasthaneetacademy.com/api`
- **Admin Login:**
  - `POST /admin/login`
  - Body: `{"username": "indraprasthaadmin", "password": "indraprastha@123"}`
- **Practice Question Update (Topic-wise MCQs):**
  - `PUT /admin/practice-questions/:id`
  - Body: `{"similarQuestion": {"question": "...", "option_a": "...", "option_b": "...", "option_c": "...", "option_d": "...", "correct_option": "A", "explanation": "..."}}`
- **Practice Set Questions Fetch:**
  - `GET /admin/practice-sets/:setId/questions`
- **Test Questions Update (Test Series):**
  - `PUT /admin/test-questions/:id`
- **Test Questions Fetch:**
  - `GET /admin/tests/:testId/questions`

---

## 3. Current Live Status

### A. Class 11 Physics Practice Sets (Current Priority):
| Set ID | Chapter Name | Total Questions | Completed & Live | Status |
| :---: | :--- | :---: | :---: | :---: |
| **2** | **Units & Dimension** | 28 | 28 | **100% COMPLETE** |
| **3** | **Vectors** | 79 | 79 | **100% COMPLETE** |
| **4** | **Motion in a straight line** | 46 | 46 | **100% COMPLETE** |
| **5** | **Motion in a Plane** | 145 | 145 | **100% COMPLETE** |
| **6** | **Laws Of Motion** | 189 | 189 | **100% COMPLETE** |
| **7** | **Work Power Energy** | 206 | 206 | **100% COMPLETE** |
| **8** | **System of Particles & Rotational Motion** | 210 | 210 | **100% COMPLETE** |
| **9** | **Gravitation** | 97 | 97 | **100% COMPLETE** |
| **10** | **Mechanical Properties Of Solid** | 97 | 97 | **100% COMPLETE** |
| **11** | **Mechanical Properties Of Fluids** | 121 | 121 | **100% COMPLETE** |
| **12** | **Thermal Properties of Matter** | 69 | 69 | **100% COMPLETE** |
| **13** | **Thermodynamics** | 0 | 0 | Empty |
| **14** | **Kinetic Theory** | 132 | 132 | **100% COMPLETE** |
| **15** | **Oscillations** | 57 | 57 | **100% COMPLETE** |
| **16** | **Waves** | 25 | 25 | **100% COMPLETE** |

**CLASS 11 PHYSICS STATUS: 1,481 / 1,481 (100% COMPLETE)**

### B. Class 12 Physics Practice Sets:
| Set ID | Chapter Name | Total Questions | Completed & Live | Status |
| :---: | :--- | :---: | :---: | :---: |
| **51** | **Electric Charges & Fields** | 47 | 47 | **100% COMPLETE** |
| **52** | **Electrostatic Potential & Capacitance** | 113 | 113 | **100% COMPLETE** |
| **53** | **Current Electricity** | 45 | 45 | **100% COMPLETE** |
| **54** | **Magnetic Effects of Current** | 88 | 88 | **100% COMPLETE** |
| **55** | **Magnetism** | 43 | 43 | **100% COMPLETE** |
| **56** | **Electromagnetic Induction** | 130 | 130 | **100% COMPLETE** |
| **57** | **Alternating Current** | 45 | 45 | **100% COMPLETE** |
| **58** | **Electromagnetic Waves** | 24 | 24 | **100% COMPLETE** |
| **59** | **Ray Optics** | 120 | 120 | **100% COMPLETE** |
| **60** | **Wave Optics** | 45 | 45 | **100% COMPLETE** |
| **61** | **Dual Nature of Radiation & Matter** | 43 | 43 | **100% COMPLETE** |
| **62** | **Atoms** | 137 | 137 | **100% COMPLETE** |
| **63** | **Nuclei** | 39 | 39 | **100% COMPLETE** |
| **64** | **Semiconductor Electronics** | 45 | 45 | **100% COMPLETE** |

**CLASS 12 PHYSICS STATUS: 964 / 964 (100% COMPLETE & VERIFIED LIVE)**

**OVERALL ENTIRE PHYSICS PRACTICE SECTION (CLASS 11 + CLASS 12): 2,445 / 2,445 (100% COMPLETE & LIVE)**

### C. Class 11 Chemistry Practice Sets (Topic-wise MCQs):
| Set ID | Chapter Name | Total Questions | Completed & Live | Status |
| :---: | :--- | :---: | :---: | :---: |
| **17** | **Some Basic Concepts of Chemistry** | 57 | 57 | **100% COMPLETE** |
| **18** | **Structure Of Atom** | 89 | 89 | **100% COMPLETE** |
| **19** | Classification of Elements & Periodicity | 0 | 0 | Empty |
| **20** | **Chemical Bonding** | 104 | 104 | **100% COMPLETE** |
| **21** | States of Matter | 0 | 0 | Empty |
| **22** | **Thermodynamics** | 117 | 117 | **100% COMPLETE** |
| **23** | Chemical Equilibrium | 0 | 0 | Empty |
| **24** | **Redox Reactions** | 43 | 43 | **100% COMPLETE** |
| **25** | Hydrogen | 0 | 0 | Empty |
| **26** | S-Block Elements | 0 | 0 | Empty |
| **27** | P-Block Elements | 0 | 0 | Empty |
| **28** | Organic Chemistry-Basic Principles | 0 | 0 | Empty |
| **29** | **Hydrocarbons** | 160 | 160 | **100% COMPLETE** |
| **30** | **Ionic Equilibrium** | 65 | 65 | **100% COMPLETE** |

**CLASS 11 CHEMISTRY STATUS: 635 / 635 (100% COMPLETE & VERIFIED LIVE)**

### D. Class 12 Chemistry Practice Sets (Topic-wise MCQs):
| Set ID | Chapter Name | Total Questions | Completed & Live | Status |
| :---: | :--- | :---: | :---: | :---: |
| **65** | **Solid State** | 53 | 53 | **100% COMPLETE** |
| **66** | Solutions | 0 | 0 | Empty |
| **67** | **Electrochemistry** | 108 | 108 | **100% COMPLETE** |
| **68** | **Chemical Kinetics** | 65 | 65 | **100% COMPLETE** |
| **69** | Surface Chemistry | 0 | 0 | Empty |
| **70** | **P-Block Element** | 49 | 49 | **100% COMPLETE** |
| **71** | **D & F Block Elements** | 49 | 49 | **100% COMPLETE** |
| **72** | **Coordination Compounds** | 75 | 75 | **100% COMPLETE** |
| **73** | **Haloalkanes & Haloalkenes** | 41 | 41 | **100% COMPLETE** |
| **74** | **Alcohols Phenols & Ethers** | 60 | 60 | **100% COMPLETE** |
| **75** | **Aldehydes Ketone & Carboxylic Acids** | 66 | 66 | **100% COMPLETE** |
| **76** | Organic Compounds Containing Nitrogen | 0 | 0 | Empty |
| **77** | **Organic Compounds Containing Nitrogen** | 77 | 77 | **100% COMPLETE** |
| **78** | Biomolecules | 0 | 0 | Empty |
| **79** | Polymers | 0 | 0 | Empty |
| **80** | Chemistry In Everyday Life | 0 | 0 | Empty |

**CLASS 12 CHEMISTRY STATUS: 643 / 643 (100% COMPLETE & VERIFIED LIVE)**

**OVERALL ENTIRE CHEMISTRY PRACTICE SECTION (CLASS 11 + CLASS 12): 1,278 / 1,278 (100% COMPLETE & LIVE)**

### E. Chemistry Test Series Status:
- **Test 93 (Mole Concept):** 45/45 — **100% COMPLETE**
- **Test 94 (Atomic Structure):** 45/45 — **100% COMPLETE**
- **Test 95 (Chemical Equilibrium):** 45/45 — **100% COMPLETE**
- **Test 96 (Ionic Equilibrium):** 45/45 — **100% COMPLETE**
- **Test 97 (Redox Reaction):** 21/21 — **100% COMPLETE**
- **Test 98 (Thermodynamics):** 34/34 — **100% COMPLETE**
- **Test 99 (Solution & Concentration Terms):** 16/16 — **100% COMPLETE**
- **Test 100 (Chemical Kinetics):** 45/45 — **100% COMPLETE**
- **Test 101 (Electrochemistry):** 41/41 — **100% COMPLETE**
- **Test 102 (Periodic Table & Periodic Properties):** 28/28 — **100% COMPLETE**
- **Test 103 (Chemical Bonding):** 44/44 — **100% COMPLETE**
- **Test 104 (P-Block Elements):** 45/45 — **100% COMPLETE**
- **Test 105 (d & f Block):** 45/45 — **100% COMPLETE**
- **Test 106 (Coordination Compounds):** 49/49 — **100% COMPLETE**
- **Test 108 (Isomerism):** 29/29 — **100% COMPLETE**
- **Test 109 (GOC):** 8/8 — **100% COMPLETE**
- **Test 110 (Hydrocarbons):** 39/39 — **100% COMPLETE**
- **Test 111 (Alcohol & Ether):** 15/15 — **100% COMPLETE**
- **Test 113 (Carboxylic Acid):** 25/25 — **100% COMPLETE**
- **Test 149 (Practice Paper Organic Chemistry):** 11/11 — **100% COMPLETE**

**CHEMISTRY TEST SERIES TOTAL: 626 / 626 (100% COMPLETE & LIVE)**

### F. Biology Practice Sets (Topic-wise MCQs):
| Set ID | Chapter Name | Class | Total Questions | Completed & Live | Status |
| :---: | :--- | :---: | :---: | :---: | :---: |
| **31** | **Diversity of Living Organisms** | Class 11 | 9 | 9 | **100% COMPLETE** |
| **45** | **Breathing & Exchange of Gases** | Class 11 | 2 | 2 | **100% COMPLETE** |
| **47** | **Excretory Products & Elimination** | Class 11 | 15 | 15 | **100% COMPLETE** |
| **48** | **Locomotion & Movement** | Class 11 | 11 | 11 | **100% COMPLETE** |
| **50** | **Chemical Coordination & Integration** | Class 11 | 2 | 2 | **100% COMPLETE** |
| **81** | **Reproduction In Organisms** | Class 12 | 1 | 1 | **100% COMPLETE** |
| **83** | **Human Reproduction** | Class 12 | 12 | 12 | **100% COMPLETE** |
| **84** | **Reproductive Health** | Class 12 | 15 | 15 | **100% COMPLETE** |
| **92** | **Biotechnology & its Applications** | Class 12 | 13 | 13 | **100% COMPLETE** |
| **94** | **Ecosystem** | Class 12 | 10 | 10 | **100% COMPLETE** |

**ALL SHORT BIOLOGY PRACTICE CHAPTERS COMPLETED: 90 / 90 (100% COMPLETE & LIVE)**

---

## 4. Next In Queue When Resuming
- **Class 11 Biology Remaining Chapters:**
  - Set 32: Biological Classification (151 Qs)
  - Set 33: Plant Kingdom (140 Qs)
  - Set 38: Biomolecules (152 Qs)
  - Set 39: Cell Cycle & Cell Division (125 Qs)
  - Set 42: Photosynthesis in Higher Plants (96 Qs)
  - Set 43: Respiration in Plants (89 Qs)
  - Set 46: Body Fluids & Circulation (160 Qs)
  - Set 49: Neural Control & Coordination (175 Qs)
- **Class 12 Biology Remaining Chapters:**
  - Set 82: Sexual Reproduction in Flowering Plants (163 Qs)
  - Set 85: Principles of Inheritance & Variation (149 Qs)
  - Set 86: Molecular Basis of Inheritance (155 Qs)
  - Set 87: Evolution (91 Qs)
- **Chemistry Test Series:**
  - **ALL 20 NON-EMPTY CHEMISTRY TESTS COMPLETED (626 / 626 Qs — 100% COMPLETE & LIVE)**



