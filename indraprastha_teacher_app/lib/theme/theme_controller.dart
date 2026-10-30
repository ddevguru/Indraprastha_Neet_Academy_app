import 'package:flutter/material.dart';
import 'package:shared_preferences/shared_preferences.dart';

class ThemeController {
  static const String _prefKey = 'teacher_theme_mode';
  static final ValueNotifier<ThemeMode> themeModeNotifier =
      ValueNotifier<ThemeMode>(ThemeMode.system);

  static Future<void> init() async {
    final prefs = await SharedPreferences.getInstance();
    final saved = prefs.getString(_prefKey);
    if (saved == 'dark') {
      themeModeNotifier.value = ThemeMode.dark;
    } else if (saved == 'light') {
      themeModeNotifier.value = ThemeMode.light;
    } else {
      themeModeNotifier.value = ThemeMode.system;
    }
  }

  static Future<void> setThemeMode(ThemeMode mode) async {
    themeModeNotifier.value = mode;
    final prefs = await SharedPreferences.getInstance();
    if (mode == ThemeMode.dark) {
      await prefs.setString(_prefKey, 'dark');
    } else if (mode == ThemeMode.light) {
      await prefs.setString(_prefKey, 'light');
    } else {
      await prefs.remove(_prefKey);
    }
  }

  static Future<void> toggleTheme(BuildContext context) async {
    final isDarkNow = themeModeNotifier.value == ThemeMode.dark ||
        (themeModeNotifier.value == ThemeMode.system &&
            MediaQuery.of(context).platformBrightness == Brightness.dark);
    await setThemeMode(isDarkNow ? ThemeMode.light : ThemeMode.dark);
  }
}
