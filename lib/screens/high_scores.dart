import 'package:flutter/material.dart';

class HighScores extends StatelessWidget {
  const HighScores({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('High Scores'),
        centerTitle: true,
      ),
    );
  }
}
