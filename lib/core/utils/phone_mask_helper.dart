/// Masks phone numbers in community chat/doubts so students and teachers
/// cannot share phone numbers with each other, while preserving normal
/// scientific/mathematical values (e.g. 6.022, 1800, 4.1).
class PhoneMaskHelper {
  static int _countDigits(String str) {
    int count = 0;
    for (int i = 0; i < str.length; i++) {
      final code = str.codeUnitAt(i);
      if (code >= 48 && code <= 57) count++;
    }
    return count;
  }

  static String maskPhoneNumbers(String input) {
    if (input.trim().isEmpty) return input;
    var result = input;

    // 1. Sequences of digits with optional country code and separators
    final sepPattern = RegExp(
      r'(?:\+?\d{1,3}[\s\-._/*()]*)?(?:\(?\d{1,5}\)?[\s\-._/*()]*){2,15}\d{1,5}',
    );
    result = result.replaceAllMapped(sepPattern, (m) {
      final match = m.group(0) ?? '';
      final digits = _countDigits(match);
      if (digits < 7 || digits > 15) return match;

      final singleDotOnly = RegExp(r'^\d+\.\d+$').hasMatch(match.trim());
      if (singleDotOnly && digits < 10) return match;

      return '[Phone Number Hidden]';
    });

    // 2. Plain contiguous 7 to 15 digits
    result = result.replaceAll(
      RegExp(r'\b\+?\d{7,15}\b'),
      '[Phone Number Hidden]',
    );

    // 3. Consecutive number words (7+ words)
    result = result.replaceAll(
      RegExp(
        r'\b(?:zero|one|two|three|four|five|six|seven|eight|nine|oh)(?:[\s,\-]+(?:zero|one|two|three|four|five|six|seven|eight|nine|oh)){6,14}\b',
        caseSensitive: false,
      ),
      '[Phone Number Hidden]',
    );

    return result;
  }

  static bool containsPhoneNumber(String input) {
    if (input.trim().isEmpty) return false;
    return maskPhoneNumbers(input) != input;
  }
}

