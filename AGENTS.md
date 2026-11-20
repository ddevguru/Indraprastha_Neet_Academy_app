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
| **32** | **Biological Classification** | Class 11 | 151 | 151 | **100% COMPLETE** |
| **33** | **Plant Kingdom** | Class 11 | 140 | 140 | **100% COMPLETE** |
| **38** | **Biomolecules** | Class 11 | 152 | 152 | **100% COMPLETE** |
| **39** | **Cell Cycle & Cell Division** | Class 11 | 125 | 125 | **100% COMPLETE** |
| **42** | **Photosynthesis in Higher Plants** | Class 11 | 96 | 96 | **100% COMPLETE** |
| **43** | **Respiration in Plants** | Class 11 | 89 | 89 | **100% COMPLETE** |
| **45** | **Breathing & Exchange of Gases** | Class 11 | 2 | 2 | **100% COMPLETE** |
| **46** | **Body Fluids & Circulation** | Class 11 | 160 | 160 | **100% COMPLETE** |
| **47** | **Excretory Products & Elimination** | Class 11 | 15 | 15 | **100% COMPLETE** |
| **48** | **Locomotion & Movement** | Class 11 | 11 | 11 | **100% COMPLETE** |
| **49** | **Neural Control & Coordination** | Class 11 | 175 | 175 | **100% COMPLETE** |
| **50** | **Chemical Coordination & Integration** | Class 11 | 2 | 2 | **100% COMPLETE** |
| **81** | **Reproduction In Organisms** | Class 12 | 1 | 1 | **100% COMPLETE** |
| **82** | **Sexual Reproduction in Flowering Plants** | Class 12 | 163 | 163 | **100% COMPLETE** |
| **83** | **Human Reproduction** | Class 12 | 12 | 12 | **100% COMPLETE** |
| **84** | **Reproductive Health** | Class 12 | 15 | 15 | **100% COMPLETE** |
| **85** | **Principles of Inheritance & Variation** | Class 12 | 149 | 149 | **100% COMPLETE** |
| **86** | **Molecular Basis of Inheritance** | Class 12 | 155 | 155 | **100% COMPLETE** |
| **87** | **Evolution** | Class 12 | 91 | 91 | **100% COMPLETE** |
| **92** | **Biotechnology & its Applications** | Class 12 | 13 | 13 | **100% COMPLETE** |
| **94** | **Ecosystem** | Class 12 | 10 | 10 | **100% COMPLETE** |
| **96** | **Environmental Issues** | Class 12 | 3 | 3 | **100% COMPLETE** |

**BIOLOGY PRACTICE TOTAL: 1,739 / 1,739 across ALL 23 CHAPTERS (100% COMPLETE & LIVE ON PRODUCTION)**

---

### H. GLOBAL SYSTEM-WIDE COMPLETION SUMMARY:
| Section / Module | Total Questions | Completed & Live | Status |
| :--- | :---: | :---: | :---: |
| **Chapter-wise PYQs (All 43 Chapters)** | 2,765 | 2,765 | **100.0% COMPLETE** |
| **Physics Practice Sets (Class 11 + Class 12)** | 2,445 | 2,445 | **100.0% COMPLETE** |
| **Chemistry Practice Sets (Class 11 + Class 12)** | 1,278 | 1,278 | **100.0% COMPLETE** |
| **Biology Practice Sets (Class 11 + Class 12)** | 1,739 | 1,739 | **100.0% COMPLETE** |
| **Chemistry Test Series (All 20 Tests)** | 626 | 626 | **100.0% COMPLETE** |
| **GRAND TOTAL PLATFORM-WIDE** | **8,853** | **8,853** | **100.0% COMPLETE & LIVE** |

### G. Chapter-wise PYQs Section (Completed with "Same Concept Q" & Derivations):
| Chapter ID | Subject | Class | Chapter Title | Total PYQs | Completed & Live | Status |
| :---: | :--- | :---: | :--- | :---: | :---: | :---: |
| **32** | Biology | Class 11 | Living World | 5 | 5 | **100% COMPLETE** |
| **33** | Biology | Class 11 | Biological Classification | 6 | 6 | **100% COMPLETE** |
| **34** | Biology | Class 11 | Plant Kingdom | 9 | 9 | **100% COMPLETE** |
| **87** | Biology | Class 12 | Evolution | 42 | 42 | **100% COMPLETE** |
| **58** | Chemistry | Class 11 | Redox Reactions | 22 | 22 | **100% COMPLETE** |
| **57** | Chemistry | Class 11 | Chemical Equilibrium | 40 | 40 | **100% COMPLETE** |
| **105** | Chemistry | Class 12 | Haloalkanes & Haloalkenes | 37 | 37 | **100% COMPLETE** |
| **115** | Physics | Class 12 | Electromagnetic Induction | 31 | 31 | **100% COMPLETE** |
| **118** | Physics | Class 12 | Electromagnetic Waves | 39 | 39 | **100% COMPLETE** |
| **68** | Physics | Class 11 | Motion in a Straight Line | 42 | 42 | **100% COMPLETE** |
| **53** | Chemistry | Class 11 | Classification of Elements & Periodicity | 44 | 44 | **100% COMPLETE** |
| **99** | Chemistry | Class 12 | Solutions | 48 | 48 | **100% COMPLETE** |
| **69** | Physics | Class 11 | Motion in a Plane | 51 | 51 | **100% COMPLETE** |
| **106** | Chemistry | Class 12 | Alcohol Phenol & Ethers | 52 | 52 | **100% COMPLETE** |
| **70** | Physics | Class 11 | Laws Of Motion | 53 | 53 | **100% COMPLETE** |
| **66** | Physics | Class 11 | Unit & Dimension | 55 | 55 | **100% COMPLETE** |
| **51** | Chemistry | Class 11 | Some Basic Concepts of Chemistry | 55 | 55 | **100% COMPLETE** |
| **79** | Physics | Class 11 | Oscillations | 56 | 56 | **100% COMPLETE** |
| **108** | Chemistry | Class 12 | Organic Compounds Containing Nitrogen | 58 | 58 | **100% COMPLETE** |
| **52** | Chemistry | Class 11 | Structure of Atom | 60 | 60 | **100% COMPLETE** |
| **71** | Physics | Class 11 | Work Power Energy | 61 | 61 | **100% COMPLETE** |
| **80** | Physics | Class 11 | Waves | 62 | 62 | **100% COMPLETE** |
| **109** | Chemistry | Class 12 | Biomolecules | 63 | 63 | **100% COMPLETE** |
| **116** | Physics | Class 12 | Alternating Current | 64 | 64 | **100% COMPLETE** |
| **64** | Chemistry | Class 11 | Ionic Equilibrium | 64 | 64 | **100% COMPLETE** |
| **63** | Chemistry | Class 11 | Hydrocarbons | 70 | 70 | **100% COMPLETE** |
| **101** | Chemistry | Class 12 | Chemical Kinetics | 71 | 71 | **100% COMPLETE** |
| **100** | Chemistry | Class 12 | Electrochemistry | 73 | 73 | **100% COMPLETE** |
| **111** | Physics | Class 12 | Electrostatics Potential & Capacitance | 74 | 74 | **100% COMPLETE** |
| **114** | Physics | Class 12 | Magnetism | 79 | 79 | **100% COMPLETE** |
| **76** | Physics | Class 11 | Thermal Properties of Matter | 81 | 81 | **100% COMPLETE** |
| **103** | Chemistry | Class 12 | D & F Block Elements | 82 | 82 | **100% COMPLETE** |
| **55** | Chemistry | Class 11 | Thermodynamics | 85 | 85 | **100% COMPLETE** |
| **121** | Physics | Class 12 | Dual Nature of Radiation & Matter | 87 | 87 | **100% COMPLETE** |
| **72** | Physics | Class 11 | System of Particles & Rotational Motion | 90 | 90 | **100% COMPLETE** |
| **77** | Physics | Class 11 | Thermodynamics | 92 | 92 | **100% COMPLETE** |
| **61** | Chemistry | Class 11 | P-Block Elements | 95 | 95 | **100% COMPLETE** |
| **62** | Chemistry | Class 11 | Organic Chemistry Basic Principles | 100 | 100 | **100% COMPLETE** |
| **104** | Chemistry | Class 12 | Co-ordination Compounds | 106 | 106 | **100% COMPLETE** |
| **124** | Physics | Class 12 | Semiconductor Electronics | 114 | 114 | **100% COMPLETE** |
| **37** | Biology | Class 11 | Animal Kingdom | 114 | 114 | **100% COMPLETE** |
| **112** | Physics | Class 12 | Current Electricity | 116 | 116 | **100% COMPLETE** |
| **54** | Chemistry | Class 11 | Chemical Bonding | 117 | 117 | **100% COMPLETE** |

**PYQs CHAPTERS COMPLETED: 2,765 / 2,765 across ALL 43 chapters (100.0% OF ENTIRE DATABASE COMPLETE & VERIFIED LIVE)**

*(All PYQs are formatted with clean scientific Unicode symbols only (no LaTeX, no $), step-by-step explanations ending with "Therefore, Option (...) is the correct answer.", and high-yield "Same Concept Q" with 4 options and complete explanations).*

---

## 4. Dual eBook & Interactive Highlight Feature
- **Dual eBook Upload (Admin):**
  - Regular eBook PDF (`material_drive_link`) via `POST /admin/chapters/:chapterId/regular-pdf`
  - Highlighted eBook PDF (`highlight_drive_link`) via `POST /admin/chapters/:chapterId/highlight-pdf`
  - Table `book_chapters` updated with `highlight_drive_link`, `highlight_drive_file_id`, `highlight_drive_folder_id`.
  - **Enhanced Admin UI:**
    - Prominent outlined "Select PDF (Pick PDF)" action buttons for both Regular and Highlighted eBooks.
    - Selected File Preview card with PDF icon, bold filename, file size in MB, and immediate instant feedback SnackBar.
    - Full-width, high-contrast "Upload eBook Now" primary buttons with clear progress spinners and Google Drive upload state.
    - Active status badges with clickable "Open PDF" direct drive preview links when already uploaded.
- **Interactive Highlight Questions (Admin & Student):**
  - Table: `chapter_highlight_questions` (columns: `id, chapter_id, highlight_text, page_number, question, option_a, option_b, option_c, option_d, correct_option, explanation, created_at`).
  - Admin Endpoints:
    - `GET /admin/chapters/:chapterId/highlight-questions`
    - `POST /admin/chapters/:chapterId/highlight-questions`
    - `PUT /admin/highlight-questions/:id`
    - `DELETE /admin/highlight-questions/:id`
  - Student Endpoints:
    - `GET /content/chapters/:chapterId/highlight-questions`
  - Student App Experience:
    - Tab 1 ("Book & Notes"): Displays regular eBook PDF / notes.
    - Tab 2 ("Highlights"): Displays highlighted eBook PDF with an interactive strip and bottom drawer of highlighted quotes.
    - Tapping any highlighted text excerpt triggers `_HighlightQuestionSolvePopup`: student solves the related MCQ on the spot with instant visual feedback (green/red) and step-by-step NCERT explanation.

---

## 5. Next In Queue When Resuming
- **PLATFORM-WIDE STATUS: 100.0% OF ALL PRACTICE, PYQ & TEST SERIES COMPLETED (8,853 / 8,853 QUESTIONS LIVE ON PRODUCTION)**
  - **Biology Practice Sets:** ALL 23 Chapters Completed (1,739 / 1,739 Qs — 100% COMPLETE & LIVE)
    - Set 82: Sexual Reproduction in Flowering Plants (163 / 163 Qs — 100% COMPLETE & LIVE)
    - Set 46: Body Fluids & Circulation (160 / 160 Qs — 100% COMPLETE & LIVE)
    - Set 49: Neural Control & Coordination (175 / 175 Qs — 100% COMPLETE & LIVE)
    - Sets 31, 32, 33, 38, 39, 42, 43, 45, 47, 48, 50, 81, 83, 84, 85, 86, 87, 92, 94, 96 (ALL 100% COMPLETE & LIVE)
  - **Physics Practice Sets:** ALL Class 11 & Class 12 Chapters Completed (2,445 / 2,445 Qs — 100% COMPLETE & LIVE)
  - **Chemistry Practice Sets:** ALL Class 11 & Class 12 Chapters Completed (1,278 / 1,278 Qs — 100% COMPLETE & LIVE)
  - **Chemistry Test Series:** ALL 20 Tests Completed (626 / 626 Qs — 100% COMPLETE & LIVE)
  - **Chapter-wise PYQs Section:** ALL 43 Chapters Completed (2,765 / 2,765 Qs — 100% COMPLETE & LIVE)
- **Formatting Quality Maintained Across All 8,853 Questions:**
  - Strictly scientific Unicode symbols only (NO LaTeX, NO `$`, NO `\frac`, NO `\text`).
  - Clear, methodical, step-by-step derivations and conceptual explanations.
  - Every explanation strictly concludes with: `Therefore, Option (...) is the correct answer.`
  - 4 distinct options with valid `correct_option`.



