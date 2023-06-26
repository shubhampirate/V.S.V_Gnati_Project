import 'package:community/constants/colors.dart';
import 'package:flutter/material.dart';
import 'package:flutter_svg/flutter_svg.dart';

class EditCompanyDetails extends StatefulWidget {
  const EditCompanyDetails({super.key});

  @override
  State<EditCompanyDetails> createState() => _EditCompanyDetailsState();
}

class _EditCompanyDetailsState extends State<EditCompanyDetails> {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        backgroundColor: kwhiteColor,
        elevation: 0,
        // centerTitle: true,
        leading: InkWell(
          onTap: () {
            Navigator.pop(context);
          },
          child: Padding(
            padding: const EdgeInsets.only(left: 15.0, top: 15),
            child: SvgPicture.asset(
              "assets/images/backward_arrow.svg",
            ),
          ),
        ),
        title: Padding(
          padding: const EdgeInsets.only(top: 15.0),
          child: Text(
            "Edit Company Details",
            // textAlign: TextAlign.center,
            style: TextStyle(
              color: kbrownColor,
              fontSize: 24,
              fontWeight: FontWeight.w700,
              fontFamily: "Raleway",
            ),
          ),
        ),
      ),
    );
  }
}
