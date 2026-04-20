import 'package:flutter/material.dart';

import '../../models/app_models.dart';

class DummyData {
  static const defaultUser = AppUser(
    fullName: 'Aarav Sharma',
    mobileNumber: '9876543210',
    email: 'aarav.neet2027@example.com',
    targetExamYear: 'NEET 2027',
    preferredPlan: 'Rank Pro',
  );

  static const onboarding = [
    OnboardingItem(
      title: 'Read NCERT with structure',
      subtitle: 'Smart reading that keeps core concepts exam-ready.',
      caption:
          'Track chapters, handwritten notes, formula sheets, and important lines without losing momentum.',
      icon: Icons.menu_book_rounded,
    ),
    OnboardingItem(
      title: 'Practice with PYQs and topic drills',
      subtitle: 'Build accuracy through targeted MCQs.',
      caption:
          'Move from concept reinforcement to past NEET questions, bookmarked mistakes, and revision lists.',
      icon: Icons.task_alt_rounded,
    ),
    OnboardingItem(
      title: 'Measure progress with premium insights',
      subtitle: 'Stay accountable with tests and analytics.',
      caption:
          'Monitor weak topics, syllabus coverage, and improvement trends in one clean dashboard.',
      icon: Icons.insights_rounded,
    ),
  ];

  static const subjectProgress = [
    SubjectProgress(
      subject: SubjectType.physics,
      coverage: 0.68,
      accuracy: 0.74,
      pendingTopics: 12,
    ),
    SubjectProgress(
      subject: SubjectType.chemistry,
      coverage: 0.72,
      accuracy: 0.78,
      pendingTopics: 9,
    ),
    SubjectProgress(
      subject: SubjectType.botany,
      coverage: 0.81,
      accuracy: 0.86,
      pendingTopics: 7,
    ),
    SubjectProgress(
      subject: SubjectType.zoology,
      coverage: 0.76,
      accuracy: 0.83,
      pendingTopics: 8,
    ),
  ];

  static const books = [
    BookItem(
      id: 'book_ncert_phy',
      title: 'NCERT Physics XI',
      subject: SubjectType.physics,
      level: 'Class 11',
      chapterCount: 15,
      progress: 0.56,
      lastOpened: 'Today, 7:20 PM',
      category: 'NCERT books',
      chapters: [
        BookChapter(
          id: 'motion_straight',
          title: 'Motion in a Straight Line',
          overview:
              'Focus on displacement, average velocity, graphical interpretation, and relative speed patterns.',
          noteSummary:
              'Short notes cover displacement-time graphs, slope-based velocity, and common sign convention traps.',
          pyqSummary:
              '12 linked PYQs from NEET and AIIMS style motion graph questions.',
          highlight:
              'When acceleration is zero, the velocity-time graph becomes a straight horizontal line.',
          linkedPyqCount: 12,
        ),
        BookChapter(
          id: 'laws_motion',
          title: 'Laws of Motion',
          overview:
              'Newtonian mechanics with friction, pseudo forces, and tension-based multi-body systems.',
          noteSummary:
              'Includes free body diagram checklist and tension shortcut tables.',
          pyqSummary:
              '9 linked PYQs focused on friction and constrained systems.',
          highlight:
              'Always isolate each body before writing force equations in multi-block systems.',
          linkedPyqCount: 9,
        ),
      ],
    ),
    BookItem(
      id: 'book_notes_bio',
      title: 'Cell Structure Notes',
      subject: SubjectType.botany,
      level: 'Core Revision',
      chapterCount: 9,
      progress: 0.84,
      lastOpened: 'Yesterday',
      category: 'Handwritten notes',
      chapters: [
        BookChapter(
          id: 'cell_structure',
          title: 'Cell Structure',
          overview:
              'Membrane systems, organelles, prokaryotic vs eukaryotic comparison, and exam-level diagram memory.',
          noteSummary:
              'Contains high-yield tables for ER, Golgi, lysosomes, and plastids.',
          pyqSummary:
              '8 linked PYQs around organelle function matching and diagram-based recall.',
          highlight:
              'Cristae increase the surface area available for ATP synthesis inside mitochondria.',
          linkedPyqCount: 8,
        ),
        BookChapter(
          id: 'plant_kingdom',
          title: 'Plant Kingdom',
          overview:
              'Algae, bryophytes, pteridophytes, gymnosperms, and angiosperm classification cues.',
          noteSummary:
              'Concise taxonomy ladders and life cycle memory anchors.',
          pyqSummary:
              '14 linked PYQs from classification-heavy NEET papers.',
          highlight:
              'Bryophytes are called amphibians of the plant kingdom because they need water for sexual reproduction.',
          linkedPyqCount: 14,
        ),
      ],
    ),
    BookItem(
      id: 'book_formula_chem',
      title: 'Chemical Bonding Formula Sheets',
      subject: SubjectType.chemistry,
      level: 'Quick Revision',
      chapterCount: 6,
      progress: 0.38,
      lastOpened: '2 days ago',
      category: 'Formula sheets',
      chapters: [
        BookChapter(
          id: 'chemical_bonding',
          title: 'Chemical Bonding',
          overview:
              'VSEPR, hybridization, Fajan rules, MOT, and bond order shortcuts.',
          noteSummary:
              'Compact formula sheet for geometry, lone pair effects, and molecular orbital outcomes.',
          pyqSummary:
              '10 linked PYQs covering bond angle exceptions and paramagnetism.',
          highlight:
              'The presence of lone pairs compresses bond angles due to higher repulsion than bond pairs.',
          linkedPyqCount: 10,
        ),
      ],
    ),
    BookItem(
      id: 'book_diagrams_zoo',
      title: 'Biology Diagram Bank',
      subject: SubjectType.zoology,
      level: 'Visual Revision',
      chapterCount: 11,
      progress: 0.61,
      lastOpened: 'This week',
      category: 'Biology diagrams',
      chapters: [
        BookChapter(
          id: 'human_heart',
          title: 'Human Heart',
          overview:
              'Chamber flow, valves, conducting system, and coronary circulation essentials.',
          noteSummary:
              'Label practice panels and one-page blood flow sequence.',
          pyqSummary:
              '6 linked PYQs with diagram-based direction and valve location questions.',
          highlight:
              'The tricuspid valve prevents backflow from the right ventricle to the right atrium.',
          linkedPyqCount: 6,
        ),
      ],
    ),
  ];

  static const practiceSets = [
    PracticeSet(
      id: 'ps_phy_motion',
      title: 'Motion Mastery Drill',
      topic: 'Motion in a Straight Line',
      questionCount: 30,
      difficulty: 'Moderate',
      estimatedMinutes: 32,
      accuracy: 0.71,
      tag: 'Topic-wise MCQs',
    ),
    PracticeSet(
      id: 'ps_bio_pyq',
      title: 'Cell Structure PYQ Pack',
      topic: 'Cell Structure',
      questionCount: 24,
      difficulty: 'Easy-Moderate',
      estimatedMinutes: 24,
      accuracy: 0.83,
      tag: 'PYQs',
    ),
    PracticeSet(
      id: 'ps_chem_custom',
      title: 'Chemical Bonding Custom Set',
      topic: 'Chemical Bonding',
      questionCount: 20,
      difficulty: 'Moderate-Hard',
      estimatedMinutes: 28,
      accuracy: 0.64,
      tag: 'Custom practice',
    ),
    PracticeSet(
      id: 'ps_incorrect',
      title: 'Incorrect Questions Recovery',
      topic: 'Mixed weak topics',
      questionCount: 18,
      difficulty: 'Adaptive',
      estimatedMinutes: 20,
      accuracy: 0.52,
      tag: 'Incorrect questions',
    ),
  ];

  static const practiceQuestions = [
    PracticeQuestion(
      id: 'pq1',
      subject: SubjectType.physics,
      chapter: 'Motion in a Straight Line',
      question:
          'A particle travels 10 m east and then 6 m west in 8 seconds. What is the magnitude of its average velocity?',
      options: ['0.5 m/s', '2 m/s', '4 m/s', '16 m/s'],
      correctIndex: 0,
      explanation:
          'Net displacement is 4 m east. Average velocity magnitude = displacement / time = 4 / 8 = 0.5 m/s.',
    ),
    PracticeQuestion(
      id: 'pq2',
      subject: SubjectType.chemistry,
      chapter: 'Chemical Bonding',
      question:
          'Which molecule among the following is paramagnetic according to molecular orbital theory?',
      options: ['N2', 'O2', 'F2', 'CO'],
      correctIndex: 1,
      explanation:
          'O2 has two unpaired electrons in antibonding pi-star orbitals, making it paramagnetic.',
    ),
    PracticeQuestion(
      id: 'pq3',
      subject: SubjectType.botany,
      chapter: 'Cell Structure',
      question:
          'Which organelle is primarily responsible for packaging and secretion of proteins?',
      options: [
        'Mitochondria',
        'Golgi apparatus',
        'Lysosome',
        'Ribosome',
      ],
      correctIndex: 1,
      explanation:
          'The Golgi apparatus modifies, packages, and dispatches proteins and lipids for secretion.',
    ),
  ];

  static const tests = [
    TestItem(
      id: 'test_mock_01',
      title: 'NEET Full Mock 01',
      category: 'Grand test',
      durationMinutes: 200,
      marks: 720,
      questions: 180,
      syllabusCoverage: 'Full syllabus',
      scheduleLabel: 'Tomorrow, 8:00 AM',
      completed: false,
      scoreLabel: '--',
    ),
    TestItem(
      id: 'test_bio_sprint',
      title: 'Biology Sprint Test',
      category: 'Subject test',
      durationMinutes: 45,
      marks: 180,
      questions: 45,
      syllabusCoverage: 'Plant physiology + cell unit',
      scheduleLabel: 'Today, 6:30 PM',
      completed: false,
      scoreLabel: '--',
    ),
    TestItem(
      id: 'test_org_drill',
      title: 'Organic Chemistry Drill',
      category: 'Chapter test',
      durationMinutes: 35,
      marks: 140,
      questions: 35,
      syllabusCoverage: 'General organic chemistry',
      scheduleLabel: 'Completed yesterday',
      completed: true,
      scoreLabel: '112 / 140',
    ),
  ];

  static const plans = [
    SubscriptionPlan(
      name: 'Starter',
      priceLabel: 'Rs 2,499',
      validity: '3 months',
      highlight: 'Core notes, limited practice, and chapter-wise reading.',
      features: [
        'NCERT smart reading',
        'Short notes and bookmarks',
        'Selected PYQ packs',
        'Basic analytics',
      ],
    ),
    SubscriptionPlan(
      name: 'Practice',
      priceLabel: 'Rs 4,999',
      validity: '6 months',
      highlight: 'Strong daily practice system for consistency.',
      features: [
        'Everything in Starter',
        'Unlimited practice modules',
        'Incorrect question review',
        'Custom practice builder',
      ],
    ),
    SubscriptionPlan(
      name: 'Rank Pro',
      priceLabel: 'Rs 7,999',
      validity: '12 months',
      highlight: 'Complete prep workflow with premium analytics.',
      features: [
        'Everything in Practice',
        'Full test series',
        'Advanced performance insights',
        'Revision lists and planner',
      ],
      isRecommended: true,
    ),
    SubscriptionPlan(
      name: 'Test Series Plus',
      priceLabel: 'Rs 3,499',
      validity: '6 months',
      highlight: 'Focused mock tests for timed preparation.',
      features: [
        'Grand tests and subject tests',
        'Result analysis',
        'Mock rank snapshots',
        'Syllabus tracking',
      ],
    ),
  ];

  static const notifications = [
    AppNotification(
      title: 'Biology Sprint Test reminder',
      message: 'Your subject test starts today at 6:30 PM. Revise cell unit once.',
      timeLabel: '10 min ago',
      icon: Icons.alarm_rounded,
      isUnread: true,
    ),
    AppNotification(
      title: 'New short notes added',
      message: 'Fresh quick revision sheets are now available for Plant Kingdom.',
      timeLabel: 'Today',
      icon: Icons.note_add_rounded,
      isUnread: true,
    ),
    AppNotification(
      title: 'Plan expiry update',
      message: 'Rank Pro is active for 214 more days. Renewal offers will appear closer to expiry.',
      timeLabel: 'Yesterday',
      icon: Icons.workspace_premium_rounded,
    ),
    AppNotification(
      title: 'Daily study target pending',
      message: 'You still have 24 MCQs and one revision list pending for today.',
      timeLabel: 'Yesterday',
      icon: Icons.track_changes_rounded,
    ),
  ];

  static const neetVideos = [
    NeetVideoItem(
      id: 'vid_phy_1',
      title: 'Motion graphs: slope and area meaning',
      subject: SubjectType.physics,
      durationLabel: '18 min',
      chapterHint: 'Motion in a Straight Line',
      sectionLabel: 'Concept explainers',
    ),
    NeetVideoItem(
      id: 'vid_phy_2',
      title: 'Projectile motion: range and time of flight tricks',
      subject: SubjectType.physics,
      durationLabel: '22 min',
      chapterHint: 'Motion in a Plane',
      sectionLabel: 'Concept explainers',
    ),
    NeetVideoItem(
      id: 'vid_chem_1',
      title: 'Chemical bonding: VSEPR quick table',
      subject: SubjectType.chemistry,
      durationLabel: '16 min',
      chapterHint: 'Chemical Bonding',
      sectionLabel: 'Concept explainers',
    ),
    NeetVideoItem(
      id: 'vid_chem_2',
      title: 'Organic: GOC — inductive vs resonance',
      subject: SubjectType.chemistry,
      durationLabel: '24 min',
      chapterHint: 'General Organic Chemistry',
      sectionLabel: 'PYQ walkthroughs',
    ),
    NeetVideoItem(
      id: 'vid_bio_1',
      title: 'Plant Kingdom: life cycle patterns',
      subject: SubjectType.botany,
      durationLabel: '19 min',
      chapterHint: 'Plant Kingdom',
      sectionLabel: 'Concept explainers',
    ),
    NeetVideoItem(
      id: 'vid_bio_2',
      title: 'Cell cycle checkpoints NEET-style',
      subject: SubjectType.botany,
      durationLabel: '14 min',
      chapterHint: 'Cell Structure',
      sectionLabel: 'Revision capsules',
    ),
    NeetVideoItem(
      id: 'vid_zoo_1',
      title: 'Human heart: one-way flow walkthrough',
      subject: SubjectType.zoology,
      durationLabel: '20 min',
      chapterHint: 'Human Heart',
      sectionLabel: 'Concept explainers',
    ),
    NeetVideoItem(
      id: 'vid_zoo_2',
      title: 'Neural control: synapse and reflex arc',
      subject: SubjectType.zoology,
      durationLabel: '17 min',
      chapterHint: 'Neural Control',
      sectionLabel: 'Revision capsules',
    ),
  ];

  static const revisionItems = [
    RevisionItem(
      title: 'Plant Kingdom rapid revision',
      subtitle: 'Short notes + 14 linked PYQs',
      type: 'Revision list',
    ),
    RevisionItem(
      title: 'Chemical Bonding mistakes',
      subtitle: '9 bookmarked explanations from previous practice',
      type: 'Incorrect set',
    ),
    RevisionItem(
      title: 'Cell Structure diagrams',
      subtitle: 'Important labels and organelle comparison cards',
      type: 'Saved notes',
    ),
  ];

  static BookItem findBook(String id) =>
      books.firstWhere((book) => book.id == id, orElse: () => books.first);

  static BookChapter findChapter(String id) {
    for (final book in books) {
      for (final chapter in book.chapters) {
        if (chapter.id == id) {
          return chapter;
        }
      }
    }
    return books.first.chapters.first;
  }

  static PracticeSet findPracticeSet(String id) => practiceSets.firstWhere(
        (set) => set.id == id,
        orElse: () => practiceSets.first,
      );

  static TestItem findTest(String id) =>
      tests.firstWhere((test) => test.id == id, orElse: () => tests.first);
}
