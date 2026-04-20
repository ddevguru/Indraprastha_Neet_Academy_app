import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';

import '../core/providers/app_state.dart';
import '../theme/app_theme.dart';
import 'router.dart';

class IndraprasthaApp extends ConsumerWidget {
  const IndraprasthaApp({super.key});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final router = ref.watch(goRouterProvider);
    final uiState = ref.watch(appUiControllerProvider);
    final authBloc = ref.watch(authBlocProvider);
    authBloc.bootstrapSession();

    return BlocProvider.value(
      value: authBloc,
      child: MaterialApp.router(
        title: 'Indraprastha NEET Academy',
        debugShowCheckedModeBanner: false,
        theme: AppTheme.light(),
        darkTheme: AppTheme.dark(),
        themeMode: uiState.themeMode,
        routerConfig: router,
      ),
    );
  }
}
