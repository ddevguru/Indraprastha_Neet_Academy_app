import 'package:flutter_test/flutter_test.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';

import 'package:indraprastha/app/app.dart';

void main() {
  testWidgets('renders branded splash screen', (WidgetTester tester) async {
    await tester.pumpWidget(
      const ProviderScope(
        child: IndraprasthaApp(),
      ),
    );

    expect(find.text('Indraprastha NEET Academy'), findsOneWidget);
    await tester.pump(const Duration(seconds: 2));
    await tester.pumpAndSettle();
  });
}
