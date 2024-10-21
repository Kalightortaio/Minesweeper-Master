import 'package:flutter/foundation.dart';
import 'package:go_router/go_router.dart';

import 'screens/main_menu.dart';
import 'screens/classic_mode.dart';
import 'screens/eternity_mode.dart';
import 'screens/master_mode.dart';
import 'screens/achievements.dart';
import 'screens/high_scores.dart';
import 'screens/settings.dart';

final router = GoRouter(routes: [
  GoRoute(
      path: '/',
      builder: (context, state) => const MainMenu(key: Key('Main Menu')),
      routes: [
        GoRoute(
          path: 'classicmode',
          builder: (context, state) =>
              const ClassicMode(key: Key('Classic Mode')),
        ),
        GoRoute(
          path: 'eternitymode',
          builder: (context, state) =>
              const EternityMode(key: Key('Eternity Mode')),
        ),
        GoRoute(
          path: 'mastermode',
          builder: (context, state) =>
              const MasterMode(key: Key('Master Mode')),
        ),
        GoRoute(
          path: 'achievements',
          builder: (context, state) =>
              const Achievements(key: Key('Achievements')),
        ),
        GoRoute(
          path: 'highscores',
          builder: (context, state) =>
              const HighScores(key: Key('High Scores')),
        ),
        GoRoute(
          path: 'settings',
          builder: (context, state) => const Settings(key: Key('Settings')),
        )
      ]),
]);
