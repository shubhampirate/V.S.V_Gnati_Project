import 'package:flutter/material.dart';

class HomeProvider extends ChangeNotifier {
  int _selectedIndex = 0;
  final PageController _pageController = PageController(initialPage: 0);

  int get selectedIndex => _selectedIndex;
  PageController get pageController => _pageController;

  void onItemTapped(int index) {
    _selectedIndex = index;
    _pageController.jumpToPage(index);
    notifyListeners();
  }

  void reset() {
    _selectedIndex = 0;
    _pageController.jumpToPage(0);
    notifyListeners();
  }
}
