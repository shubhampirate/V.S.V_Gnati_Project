import 'package:community/constants/constants.dart';
import 'package:flutter/material.dart';
import 'package:flutter/cupertino.dart';

class HomeScreen extends StatefulWidget {
  static const String id = '/home';
  const HomeScreen({super.key});

  @override
  State<HomeScreen> createState() => _HomeScreenState();
}

class _HomeScreenState extends State<HomeScreen> {
  int _selectedIndex = 0;
  void _onItemTapped(int index) {
    setState(() {
      _selectedIndex = index;
    });
  }

  static final List<Widget> _pages = <Widget>[
    Container(
      color: kwhiteColor,
    ),
    Container(
      color: kblueColor,
    ),
    Container(
      color: Colors.red,
    ),
    Container(
      color: Colors.yellow,
    ),
    Container(
      color: Colors.lightGreenAccent,
    ),
    Container(
      color: Colors.lightGreenAccent,
    ),
    Container(
      color: Colors.lightGreenAccent,
    ),
    // Camera page
    // Chats page
  ];

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: kwhiteColor,
      bottomNavigationBar: BottomNavigationBar(
        elevation: 0,
        backgroundColor: kwhiteColor,
        currentIndex: _selectedIndex,
        selectedFontSize: 0,
        type: BottomNavigationBarType.fixed,
        onTap: _onItemTapped,
        items: <BottomNavigationBarItem>[
          BottomNavigationBarItem(
            icon: Icon(
              Icons.home,
              color: kblackColor,
            ),
            label: '',
          ),
          BottomNavigationBarItem(
            icon: Icon(
              Icons.calendar_month,
              color: kblackColor,
            ),
            label: '',
          ),
          BottomNavigationBarItem(
            icon: Icon(
              Icons.person_search_outlined,
              color: kblackColor,
            ),
            label: '',
          ),
          BottomNavigationBarItem(
            icon: Icon(
              CupertinoIcons.briefcase,
              color: kblackColor,
            ),
            label: '',
          ),
          BottomNavigationBarItem(
            icon: Icon(
              Icons.people_alt_outlined,
              color: kblackColor,
            ),
            label: '',
          ),
          BottomNavigationBarItem(
            icon: Icon(
              Icons.info_outline,
              color: kblackColor,
            ),
            label: '',
          ),
          BottomNavigationBarItem(
            icon: Icon(
              CupertinoIcons.person_crop_circle,
              color: kblackColor,
            ),
            label: '',
          ),
        ],
      ),
      body: IndexedStack(
        index: _selectedIndex,
        children: _pages,
      ),
    );
  }
}
