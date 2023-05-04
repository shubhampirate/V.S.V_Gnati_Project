import 'package:flutter/material.dart';

class ToggleStateProvider extends ChangeNotifier {
  bool _intialState = true;

  bool get state => _intialState;

  void toggle() {
    _intialState = !_intialState;
    notifyListeners();
  }
}
