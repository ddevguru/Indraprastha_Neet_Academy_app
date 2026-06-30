import 'dart:io' show Platform;

import 'package:flutter/foundation.dart';
import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:go_router/go_router.dart';

import '../bloc/auth_bloc.dart';

/// Sign in with Apple button — shown on iOS only (App Store requirement).
class AppleSignInButton extends StatelessWidget {
  const AppleSignInButton({super.key, this.label = 'Continue with Apple'});

  final String label;

  static bool get isAvailable =>
      !kIsWeb && Platform.isIOS;

  @override
  Widget build(BuildContext context) {
    if (!isAvailable) return const SizedBox.shrink();

    return BlocBuilder<AuthBloc, AuthState>(
      builder: (context, state) {
        return SizedBox(
          width: double.infinity,
          child: OutlinedButton.icon(
            onPressed: state.loading
                ? null
                : () async {
                    final bloc = context.read<AuthBloc>();
                    final loggedIn = await bloc.signInWithApple();
                    if (!context.mounted) return;
                    if (loggedIn) {
                      context.go('/dashboard/0');
                    } else if (bloc.state.firebaseIdToken != null &&
                        bloc.state.isNewUser) {
                      context.go('/signup/apple-complete');
                    }
                  },
            icon: state.loading
                ? const SizedBox(
                    width: 22,
                    height: 22,
                    child: CircularProgressIndicator(strokeWidth: 2),
                  )
                : const Icon(Icons.apple, size: 22),
            label: Text(label),
            style: OutlinedButton.styleFrom(
              minimumSize: const Size.fromHeight(48),
              foregroundColor: Colors.black,
              side: const BorderSide(color: Colors.black87),
            ),
          ),
        );
      },
    );
  }
}
