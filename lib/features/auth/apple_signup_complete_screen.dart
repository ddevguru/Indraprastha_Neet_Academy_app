import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:go_router/go_router.dart';

import '../../theme/app_tokens.dart';
import '../../widgets/app_widgets.dart';
import 'bloc/auth_bloc.dart';

/// Batch selection for new Apple Sign In users after Firebase auth.
class AppleSignupCompleteScreen extends StatefulWidget {
  const AppleSignupCompleteScreen({super.key});

  @override
  State<AppleSignupCompleteScreen> createState() =>
      _AppleSignupCompleteScreenState();
}

class _AppleSignupCompleteScreenState extends State<AppleSignupCompleteScreen> {
  final _name = TextEditingController();
  final String _course = 'Neet Dropper Batch';
  int? _batchId;
  String _board = '';

  static const _boards = ['ISC', 'CBSE', 'State Boards', 'Open School'];

  @override
  void initState() {
    super.initState();
    context.read<AuthBloc>().loadBatches();
  }

  @override
  void dispose() {
    _name.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return BlocConsumer<AuthBloc, AuthState>(
      listener: (context, state) {
        if (state.errorMessage != null) {
          ScaffoldMessenger.of(context).showSnackBar(
            SnackBar(content: Text(state.errorMessage!)),
          );
        }
        if (state.isLoggedIn) context.go('/dashboard/0');
      },
      builder: (context, state) {
        return Scaffold(
          appBar: AppBar(title: const Text('Complete your profile')),
          body: SingleChildScrollView(
            padding: const EdgeInsets.all(AppSpacing.lg),
            child: CenteredContent(
              maxWidth: 480,
              child: SurfaceCard(
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.stretch,
                  children: [
                    Text(
                      'Almost done',
                      style: Theme.of(context).textTheme.headlineSmall,
                    ),
                    const SizedBox(height: AppSpacing.sm),
                    const Text(
                      'Select your batch to finish setting up your Apple account.',
                    ),
                    const SizedBox(height: AppSpacing.lg),
                    TextField(
                      controller: _name,
                      decoration: const InputDecoration(labelText: 'Full name'),
                    ),
                    const SizedBox(height: AppSpacing.md),
                    TextFormField(
                      initialValue: _course,
                      readOnly: true,
                      decoration: const InputDecoration(labelText: 'Course'),
                    ),
                    const SizedBox(height: AppSpacing.md),
                    DropdownButtonFormField<int>(
                      initialValue: _batchId,
                      items: state.availableBatches
                          .map((b) => DropdownMenuItem(
                                value: b.id,
                                child: Text(b.name),
                              ))
                          .toList(),
                      onChanged: (v) => setState(() => _batchId = v),
                      decoration: const InputDecoration(labelText: 'Batch'),
                    ),
                    const SizedBox(height: AppSpacing.md),
                    DropdownButtonFormField<String>(
                      initialValue: _board.isEmpty ? null : _board,
                      items: _boards
                          .map((b) => DropdownMenuItem(value: b, child: Text(b)))
                          .toList(),
                      onChanged: (v) => setState(() => _board = v ?? ''),
                      decoration: const InputDecoration(labelText: 'Board'),
                    ),
                    const SizedBox(height: AppSpacing.xl),
                    PrimaryButton(
                      label: 'Finish signup',
                      expanded: true,
                      onPressed: state.loading
                          ? null
                          : () {
                              if (_name.text.trim().length < 2) {
                                ScaffoldMessenger.of(context).showSnackBar(
                                  const SnackBar(
                                    content: Text('Enter your full name'),
                                  ),
                                );
                                return;
                              }
                              if (_batchId == null) {
                                ScaffoldMessenger.of(context).showSnackBar(
                                  const SnackBar(
                                    content: Text('Please select your batch'),
                                  ),
                                );
                                return;
                              }
                              context.read<AuthBloc>().completeAppleSignup(
                                    fullName: _name.text.trim(),
                                    batchId: _batchId!,
                                    courseCategory:
                                        _board.isNotEmpty ? _board : _course,
                                  );
                            },
                    ),
                  ],
                ),
              ),
            ),
          ),
        );
      },
    );
  }
}
