import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';

class MainMenu extends StatelessWidget {
  const MainMenu({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
        appBar: AppBar(
          title: const Text('Main Menu'),
          centerTitle: true,
        ),
        body: Center(
          child: Column(
            mainAxisAlignment: MainAxisAlignment.center,
            children: <Widget>[
              ElevatedButton(
                onPressed: () {
                  GoRouter.of(context).go('/classicmode');
                },
                child: const Text('Classic Mode'),
              ),
              ElevatedButton(
                onPressed: () {
                  GoRouter.of(context).go('/eternitymode');
                },
                child: const Text('Eternity Mode'),
              ),
              ElevatedButton(
                onPressed: () {
                  GoRouter.of(context).go('/mastermode');
                },
                child: const Text('Master Mode'),
              ),
              ElevatedButton(
                onPressed: () {
                  GoRouter.of(context).go('/achievements');
                },
                child: const Text('Achievements'),
              ),
              ElevatedButton(
                onPressed: () {
                  GoRouter.of(context).go('/highscores');
                },
                child: const Text('High Scores'),
              ),
              ElevatedButton(
                onPressed: () {
                  GoRouter.of(context).go('/settings');
                },
                child: const Text('Settings'),
              ),
            ],
          ),
        ));
  }
}
