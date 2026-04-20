import '../../models/daily_mcq_item.dart';
import '../../models/app_models.dart';

/// Session-scoped seed: [issuedAt] is fixed when the provider first builds.
class DailyMcqsData {
  DailyMcqsData._();

  static List<DailyMcqItem> seedSession() {
    final now = DateTime.now();
    return [
      DailyMcqItem(
        id: 'dmq_phy_1',
        subject: SubjectType.physics,
        chapterId: 'motion_straight',
        chapterTitle: 'Motion in a Straight Line',
        standardLabel: 'Class 11',
        preview:
            'Average velocity vs instantaneous velocity — which graph shows a smooth curve through a point?',
        issuedAt: now.subtract(const Duration(hours: 3)),
      ),
      DailyMcqItem(
        id: 'dmq_bio_1',
        subject: SubjectType.botany,
        chapterId: 'plant_kingdom',
        chapterTitle: 'Plant Kingdom',
        standardLabel: 'Class 11',
        preview:
            'Alternation of generations: where does meiosis occur in the typical plant life cycle?',
        issuedAt: now.subtract(const Duration(hours: 1)),
      ),
      DailyMcqItem(
        id: 'dmq_chem_1',
        subject: SubjectType.chemistry,
        chapterId: 'chemical_bonding',
        chapterTitle: 'Chemical Bonding',
        standardLabel: 'Class 11',
        preview:
            'Hybridisation in XeF₄: how many lone pairs sit on the central atom?',
        issuedAt: now.subtract(const Duration(hours: 30)),
      ),
      DailyMcqItem(
        id: 'dmq_zoo_1',
        subject: SubjectType.zoology,
        chapterId: 'human_heart',
        chapterTitle: 'Human Heart',
        standardLabel: 'Class 11',
        preview:
            'Cardiac cycle: which phase immediately precedes ventricular ejection?',
        issuedAt: now.subtract(const Duration(hours: 28)),
      ),
    ];
  }
}
