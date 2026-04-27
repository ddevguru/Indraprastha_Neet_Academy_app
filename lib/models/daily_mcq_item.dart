class McqOfDay {
  const McqOfDay({
    required this.id,
    required this.question,
    required this.optionA,
    required this.optionB,
    required this.optionC,
    required this.optionD,
    required this.correctOption,
    this.explanation = '',
    this.questionImageLink = '',
    this.subject = '',
    this.topic = '',
    required this.issuedAt,
  });

  final int id;
  final String question;
  final String optionA;
  final String optionB;
  final String optionC;
  final String optionD;
  final String correctOption;
  final String explanation;
  final String questionImageLink;
  final String subject;
  final String topic;
  final DateTime issuedAt;

  DateTime get expiresAt => issuedAt.add(const Duration(hours: 24));
  bool get isActive => DateTime.now().isBefore(expiresAt);

  Map<String, String> get options => {
        'A': optionA,
        'B': optionB,
        'C': optionC,
        'D': optionD,
      };

  factory McqOfDay.fromJson(Map<String, dynamic> j) => McqOfDay(
        id: (j['id'] as num).toInt(),
        question: j['question']?.toString() ?? '',
        optionA: j['option_a']?.toString() ?? '',
        optionB: j['option_b']?.toString() ?? '',
        optionC: j['option_c']?.toString() ?? '',
        optionD: j['option_d']?.toString() ?? '',
        correctOption: (j['correct_option']?.toString() ?? 'A').toUpperCase(),
        explanation: j['explanation']?.toString() ?? '',
        questionImageLink: j['question_image_link']?.toString() ?? '',
        subject: j['subject']?.toString() ?? '',
        topic: j['topic']?.toString() ?? '',
        issuedAt: DateTime.tryParse(j['issued_at']?.toString() ?? '') ??
            DateTime.now(),
      );
}

extension McqListX on List<McqOfDay> {
  List<McqOfDay> get active => where((e) => e.isActive).toList();
  List<McqOfDay> get archived => where((e) => !e.isActive).toList();
}
