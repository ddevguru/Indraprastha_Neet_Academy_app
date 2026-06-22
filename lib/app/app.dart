import 'dart:async';

import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';

import '../core/providers/app_state.dart';
import '../features/auth/bloc/auth_bloc.dart';
import '../theme/app_theme.dart';
import 'router.dart';

class IndraprasthaApp extends ConsumerStatefulWidget {
  const IndraprasthaApp({super.key});

  @override
  ConsumerState<IndraprasthaApp> createState() => _IndraprasthaAppState();
}

class _IndraprasthaAppState extends ConsumerState<IndraprasthaApp> {
  StreamSubscription<AuthState>? _authSub;

  @override
  void initState() {
    super.initState();
    final authBloc = ref.read(authBlocProvider);
    authBloc.bootstrapSession();
    _authSub = authBloc.stream.listen(_syncSubscriptionFromAuth);
    _syncSubscriptionFromAuth(authBloc.state);
  }

  void _syncSubscriptionFromAuth(AuthState auth) {
    final user = auth.user;
    final controller = ref.read(appUiControllerProvider.notifier);
    if (user == null) {
      controller.resetSubscriptionGate();
      return;
    }
    controller.syncSubscriptionStatus(
      user.hasActiveSubscription,
      planName: user.subscriptionPlan,
    );
  }

  @override
  void dispose() {
    _authSub?.cancel();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    final router = ref.watch(goRouterProvider);
    final uiState = ref.watch(appUiControllerProvider);
    final authBloc = ref.watch(authBlocProvider);

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
