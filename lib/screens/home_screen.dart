import 'package:community/constants/colors.dart';
import 'package:community/provider/event_service.dart';
import 'package:community/provider/home_service.dart';
import 'package:community/screens/tabs_screen/account_screen.dart';
import 'package:community/screens/tabs_screen/donation_screen.dart';
import 'package:community/screens/tabs_screen/events.dart';
import 'package:community/screens/tabs_screen/family_details_screen.dart';
import 'package:community/screens/tabs_screen/home.dart';
import 'package:community/screens/tabs_screen/jobs_screen.dart';
import 'package:community/screens/tabs_screen/matrimony.dart';
import 'package:community/screens/tabs_screen/members_list_screen.dart';
import 'package:flutter/material.dart';
import 'package:flutter/cupertino.dart';
import 'package:flutter_svg/flutter_svg.dart';
import 'package:provider/provider.dart';

class HomeScreen extends StatefulWidget {
  static const String id = '/home';
  const HomeScreen({super.key});

  @override
  State<HomeScreen> createState() => _HomeScreenState();
}

class _HomeScreenState extends State<HomeScreen> {
  // int _selectedIndex = 0;
  // final PageController _pageController = PageController(initialPage: 0);
  // void _onItemTapped(int index) {
  //   setState(() {
  //     _selectedIndex = index;
  //   });
  //   _pageController.jumpToPage(index);
  // }

  static final List<Widget> _pages = <Widget>[
    const HomeTabScreen(),
    const EventsScreen(),
    MembersList(),
    const JobsScreen(),
    const Matrimony(),
    const DonationScreen(),
    const FamilyDetailsScreen(),

    // const AccountScreen()
  ];

  @override
  Widget build(BuildContext context) {
    final homeService = Provider.of<HomeProvider>(context);
    return Scaffold(
      backgroundColor: kwhiteColor,
      bottomNavigationBar: BottomNavigationBar(
        elevation: 5,
        backgroundColor: kwhiteColor,
        currentIndex: homeService.selectedIndex,
        selectedFontSize: 0,
        type: BottomNavigationBarType.fixed,
        onTap: homeService.onItemTapped,
        items: <BottomNavigationBarItem>[
          BottomNavigationBarItem(
            icon: homeService.selectedIndex == 0
                ? SvgPicture.asset(
                    "assets/images/home.svg",
                    height: 25.0,
                    width: 25.0,
                    // color: kblackColor,
                  )
                : SvgPicture.asset(
                    "assets/images/home_icon.svg",
                    height: 20.0,
                    width: 20.0,
                    // color: kblackColor,
                  ),
            label: '',
          ),
          BottomNavigationBarItem(
            icon: homeService.selectedIndex == 1
                ? Container(
                    decoration: BoxDecoration(color: Color(0xFFE99B01).withOpacity(0.5), shape: BoxShape.circle),
                    padding: EdgeInsets.all(3.0),
                    child: Icon(
                      Icons.calendar_month,
                      color: kblackColor,
                      size: 25.0,
                    ),
                  )
                : Icon(
                    Icons.calendar_month,
                    color: kblackColor,
                    size: 25.0,
                  ),
            label: '',
          ),
          BottomNavigationBarItem(
            icon: homeService.selectedIndex == 2
                ? Container(
                    decoration: BoxDecoration(color: Color(0xFFE99B01).withOpacity(0.5), shape: BoxShape.circle),
                    padding: EdgeInsets.all(3.0),
                    child: Icon(
                      Icons.person_search_outlined,
                      color: kblackColor,
                      size: 25.0,
                    ),
                  )
                : Icon(
                    Icons.person_search_outlined,
                    color: kblackColor,
                    size: 25.0,
                  ),
            label: '',
          ),
          BottomNavigationBarItem(
            icon: homeService.selectedIndex == 3
                ? Container(
                    decoration: BoxDecoration(color: Color(0xFFE99B01).withOpacity(0.5), shape: BoxShape.circle),
                    padding: EdgeInsets.all(3.0),
                    child: Icon(
                      CupertinoIcons.briefcase,
                      color: kblackColor,
                      size: 25.0,
                    ),
                  )
                : Icon(
                    CupertinoIcons.briefcase,
                    color: kblackColor,
                    size: 25.0,
                  ),
            label: '',
          ),
          BottomNavigationBarItem(
            icon: homeService.selectedIndex == 4
                ? Container(
                    decoration: BoxDecoration(color: Color(0xFFE99B01).withOpacity(0.5), shape: BoxShape.circle),
                    padding: EdgeInsets.all(3.0),
                    child: Icon(
                      Icons.people_alt_outlined,
                      color: kblackColor,
                      size: 25,
                    ),
                  )
                : Icon(
                    Icons.people_alt_outlined,
                    color: kblackColor,
                    size: 25,
                  ),
            label: '',
          ),
          BottomNavigationBarItem(
            icon: homeService.selectedIndex == 5
                ? Container(
                    decoration: BoxDecoration(color: Color(0xFFE99B01).withOpacity(0.5), shape: BoxShape.circle),
                    padding: EdgeInsets.all(3.0),
                    child: Icon(
                      Icons.info_outline,
                      color: kblackColor,
                      size: 25,
                    ),
                  )
                : Icon(
                    Icons.info_outline,
                    color: kblackColor,
                    size: 25,
                  ),
            label: '',
          ),
          BottomNavigationBarItem(
            icon: homeService.selectedIndex == 6
                ? Container(
                    decoration: BoxDecoration(color: Color(0xFFE99B01).withOpacity(0.5), shape: BoxShape.circle),
                    padding: EdgeInsets.all(3.0),
                    child: Icon(
                      CupertinoIcons.person_crop_circle,
                      color: kblackColor,
                      size: 25,
                    ),
                  )
                : Icon(
                    CupertinoIcons.person_crop_circle,
                    color: kblackColor,
                    size: 25,
                  ),
            label: '',
          ),
        ],
      ),
      body: PageView(
        onPageChanged: homeService.onItemTapped,
        // physics: NeverScrollableScrollPhysics(),
        controller: homeService.pageController,
        children: _pages,
      ),
    );
  }
}
