import 'dart:developer';

import 'package:community/constants/constants.dart';
import 'package:community/screens/home_screen.dart';
import 'package:flutter/material.dart';
import 'package:flutter_svg/flutter_svg.dart';

class LoginScreen extends StatefulWidget {
  static const String id = '/login';
  const LoginScreen({super.key});

  @override
  State<LoginScreen> createState() => _LoginScreenState();
}

class _LoginScreenState extends State<LoginScreen> {
  TextEditingController userNameController = TextEditingController();
  TextEditingController passwordController = TextEditingController();
  bool obscureText = false;
  InputDecoration _commonInputDecoration([String? inputText]) => InputDecoration(
        suffixIcon: inputText == "password"
            ? InkWell(
                child: Icon(obscureText ? Icons.visibility_off : Icons.visibility),
                onTap: () {
                  setState(() {
                    obscureText = !obscureText;
                  });
                },
              )
            : null,

        // isDense: true,
        contentPadding: const EdgeInsets.fromLTRB(10, 8, 10, 8),
        enabledBorder: OutlineInputBorder(
          borderRadius: const BorderRadius.all(Radius.circular(10.0)),
          borderSide: BorderSide(color: ktextInputBorderColor, width: 2.0),
        ),
        focusedErrorBorder: const OutlineInputBorder(
          borderRadius: BorderRadius.all(Radius.circular(10.0)),
          borderSide: BorderSide(color: Colors.red, width: 2.0),
        ),
        errorBorder: OutlineInputBorder(
          borderRadius: const BorderRadius.all(Radius.circular(10.0)),
          borderSide: BorderSide(color: ktextInputBorderColor, width: 2.0),
        ),
        focusedBorder: OutlineInputBorder(
          borderRadius: const BorderRadius.all(Radius.circular(10.0)),
          borderSide: BorderSide(color: ktextInputBorderColor, width: 2.0),
        ),
      );

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: ListView(
        children: [
          Image.asset(
            "assets/images/header.png",
            width: MediaQuery.of(context).size.width,
          ),
          Padding(
            padding: const EdgeInsets.only(top: 50.0),
            child: Image.asset(
              "assets/images/profile_icon.png",
              height: 125,
              width: 125,
            ),
          ),
          Padding(
            padding: const EdgeInsets.only(top: 20.0),
            child: Center(
              child: Text(
                "Login",
                style: TextStyle(
                  fontFamily: "Inter",
                  fontSize: 20,
                  fontWeight: FontWeight.w500,
                  color: ktextColor,
                ),
              ),
            ),
          ),
          Padding(
            padding: const EdgeInsets.only(top: 22.0, left: 25),
            child: Row(
              children: [
                SvgPicture.asset(
                  "assets/images/account.svg",
                  height: 25,
                  width: 25,
                ),
                Padding(
                  padding: const EdgeInsets.only(left: 14.0),
                  child: Text(
                    "Username",
                    style: TextStyle(
                      fontFamily: "Inter",
                      fontSize: 15,
                      fontWeight: FontWeight.w400,
                      color: ktextColor,
                    ),
                  ),
                ),
              ],
            ),
          ),
          Padding(
            padding: const EdgeInsets.only(left: 25.0, right: 25, top: 10),
            child: Container(
              height: 40,
              child: TextField(
                controller: passwordController,
                decoration: _commonInputDecoration(),
              ),
            ),
          ),
          Padding(
            padding: const EdgeInsets.only(top: 22.0, left: 25),
            child: Row(
              children: [
                SvgPicture.asset(
                  "assets/images/lock.svg",
                  height: 25,
                  width: 25,
                ),
                Padding(
                  padding: const EdgeInsets.only(left: 14.0),
                  child: Text(
                    "Password",
                    style: TextStyle(
                      fontFamily: "Inter",
                      fontSize: 15,
                      fontWeight: FontWeight.w400,
                      color: ktextColor,
                    ),
                  ),
                ),
              ],
            ),
          ),
          Padding(
            padding: const EdgeInsets.only(left: 25.0, right: 25, top: 10),
            child: Container(
              height: 40,
              child: TextField(
                obscureText: obscureText,
                controller: userNameController,
                decoration: _commonInputDecoration("password"),
              ),
            ),
          ),
          Container(
            height: 30,
            margin: const EdgeInsets.only(left: 25, right: 25, top: 30, bottom: 20),
            decoration: BoxDecoration(
              color: kbuttonColor,
              borderRadius: const BorderRadius.all(Radius.circular(5.0)),
            ),
            child: InkWell(
              onTap: () {
                Navigator.push(context, MaterialPageRoute(builder: (context) {
                  return HomeScreen();
                }));
              },
              child: Center(
                child: Text(
                  "Login",
                  style: TextStyle(
                    fontFamily: "Roboto",
                    fontSize: 15,
                    fontWeight: FontWeight.w400,
                    color: ktextColor,
                  ),
                ),
              ),
            ),
          ),
          Padding(
            padding: const EdgeInsets.only(top: 8.0, bottom: 20),
            child: Center(
              child: InkWell(
                onTap: () {
                  log("forgot password");
                },
                child: Text(
                  "Forgot Password",
                  style: TextStyle(
                    fontFamily: "Roboto",
                    fontSize: 15,
                    fontWeight: FontWeight.w400,
                    color: kblueColor,
                  ),
                ),
              ),
            ),
          )
        ],
      ),
    );
  }
}
