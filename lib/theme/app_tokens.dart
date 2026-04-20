import 'package:flutter/material.dart';

/// Brand palette: yellowish-orange primary with black/white UI surfaces.
class AppColors {
  static const Color background = Color(0xFFFFF8F2);
  static const Color backgroundAlt = Color(0xFFFFEFDF);
  static const Color surface = Colors.white;
  static const Color surfaceElevated = Color(0xFFFFFBF7);
  static const Color surfaceMuted = Color(0xFFFFF1E6);
  static const Color border = Color(0xFFE8D4C4);
  static const Color borderStrong = Color(0xFFD4B8A4);
  static const Color textPrimary = Color(0xFF141414);
  static const Color textSecondary = Color(0xFF5C5C5C);
  /// Main brand accent — warm orange-amber.
  static const Color primary = Color(0xFFE85A1C);
  static const Color primaryDark = Color(0xFFB8440E);
  static const Color primarySoft = Color(0xFFFFE8D6);
  static const Color accentLight = Color(0xFFFFB86C);
  /// Backwards-compatible aliases (older code uses `indigo`).
  static const Color indigo = primary;
  static const Color indigoDark = primaryDark;
  static const Color indigoSoft = primarySoft;
  static const Color blue = accentLight;
  static const Color gold = Color(0xFFC99A33);
  static const Color goldSoft = Color(0xFFFFF5DB);
  static const Color success = Color(0xFF1F8A54);
  static const Color warning = Color(0xFFF59E0B);
  static const Color danger = Color(0xFFD92D20);
  /// Drawer / hero surfaces — rich orange (reference-style side menu).
  static const Color drawerBackground = Color(0xFFE85A1C);
  static const Color drawerBackgroundEnd = Color(0xFFD14A12);
  static const Color onDrawer = Colors.white;
  static const Color onDrawerMuted = Color(0xE6FFFFFF);
}

class AppSpacing {
  static const double xxs = 4;
  static const double xs = 8;
  static const double sm = 12;
  static const double md = 16;
  static const double lg = 20;
  static const double xl = 24;
  static const double xxl = 32;
  static const double xxxl = 40;
}

class AppRadii {
  static const double sm = 12;
  static const double md = 16;
  static const double lg = 22;
  static const double xl = 28;
}

class AppShadows {
  static const List<BoxShadow> soft = [
    BoxShadow(
      color: Color(0x12000000),
      blurRadius: 32,
      offset: Offset(0, 16),
      spreadRadius: -18,
    ),
    BoxShadow(
      color: Color(0x08000000),
      blurRadius: 12,
      offset: Offset(0, 4),
      spreadRadius: -6,
    ),
  ];
}

class AppGradients {
  static const LinearGradient primary = LinearGradient(
    colors: [AppColors.primaryDark, AppColors.primary, AppColors.accentLight],
    begin: Alignment.topLeft,
    end: Alignment.bottomRight,
  );

  static const LinearGradient softSurface = LinearGradient(
    colors: [Color(0xFFFFFFFF), Color(0xFFFFF5ED)],
    begin: Alignment.topCenter,
    end: Alignment.bottomCenter,
  );

  static const LinearGradient accentGlow = LinearGradient(
    colors: [Color(0x33E85A1C), Color(0x14FFB86C)],
    begin: Alignment.topLeft,
    end: Alignment.bottomRight,
  );

  static const LinearGradient drawer = LinearGradient(
    colors: [AppColors.drawerBackground, AppColors.drawerBackgroundEnd],
    begin: Alignment.topLeft,
    end: Alignment.bottomRight,
  );
}
