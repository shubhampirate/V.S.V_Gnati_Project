import 'package:community/constants/colors.dart';
import 'package:community/constants/paths.dart';
import 'package:flutter/material.dart';
import 'package:flutter/src/widgets/framework.dart';
import 'package:flutter/src/widgets/placeholder.dart';
import 'package:flutter_svg/flutter_svg.dart';

class HomeTabScreen extends StatefulWidget {
  const HomeTabScreen({super.key});

  @override
  State<HomeTabScreen> createState() => _HomeTabScreenState();
}

class _HomeTabScreenState extends State<HomeTabScreen> {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(backgroundColor: kwhiteColor, elevation: 0, actions: [
        Padding(
          padding: const EdgeInsets.only(right: 15.0, top: 15),
          child: SvgPicture.asset("assets/images/forward.svg"),
        ),
      ]),
      body: Container(
        color: kwhiteColor,
        child: ListView(
          children: [
            Padding(
              padding: const EdgeInsets.only(top: 38.0),
              child: Text(
                "About V.S.V Gnati Samasta",
                textAlign: TextAlign.center,
                style: TextStyle(
                  fontFamily: "Raleway",
                  fontWeight: FontWeight.w700,
                  fontSize: 20,
                  color: kbrownColor,
                ),
              ),
            ),
            const Padding(
              padding: EdgeInsets.only(top: 20.0, left: 20, right: 20),
              child: Text(
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
                textAlign: TextAlign.center,
                style: TextStyle(
                  fontFamily: "Roboto",
                  fontWeight: FontWeight.w400,
                  fontSize: 13,
                ),
              ),
            ),
            const Padding(
              padding: EdgeInsets.only(top: 20.0, left: 20, right: 20),
              child: Text(
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
                textAlign: TextAlign.center,
                style: TextStyle(
                  fontFamily: "Roboto",
                  fontWeight: FontWeight.w400,
                  fontSize: 13,
                ),
              ),
            ),
            Padding(
              padding: const EdgeInsets.only(top: 35.0),
              child: Text(
                "Committee",
                textAlign: TextAlign.center,
                style: TextStyle(
                  fontFamily: "Raleway",
                  fontWeight: FontWeight.w700,
                  fontSize: 18,
                  color: kbrownColor,
                ),
              ),
            ),
            Padding(
              padding: const EdgeInsets.symmetric(horizontal: 20, vertical: 20),
              child: Container(
                height: 200,
                width: 318,
                // margin: E,
                // color: Color(0xFFC4C4C4),
                child: Image.asset(
                  kaboutUsImage,
                  fit: BoxFit.fill,
                ),
              ),
            ),
          ],
        ),
      ),
    );
  }
}
