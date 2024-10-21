import 'package:flutter/material.dart';

class ClassicMode extends StatelessWidget {
  const ClassicMode({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Classic Mode'),
        centerTitle: true,
      ),
    );
  }
}
