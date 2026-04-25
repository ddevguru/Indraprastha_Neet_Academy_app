import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';

import '../core/providers/app_state.dart';
import '../features/admin/admin_screens.dart';
import '../theme/app_theme.dart';

class IndraprasthaAdminApp extends ConsumerWidget {
  const IndraprasthaAdminApp({super.key});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final uiState = ref.watch(appUiControllerProvider);
    return MaterialApp(
      title: 'Indraprastha Admin',
      debugShowCheckedModeBanner: false,
      theme: AppTheme.light(),
      darkTheme: AppTheme.dark(),
      themeMode: uiState.themeMode,
      home: const AdminPanelScreen(),
    );
  }
}
