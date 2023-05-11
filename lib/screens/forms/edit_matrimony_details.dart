import 'dart:io';

import 'package:community/constants/colors.dart';
import 'package:community/provider/family_detail_service.dart';
import 'package:community/provider/matrimony_service.dart';
import 'package:flutter/material.dart';
import 'package:flutter_svg/flutter_svg.dart';
import 'package:image_picker/image_picker.dart';
import 'package:provider/provider.dart';

class EditMatrimonyDetailsForm extends StatelessWidget {
  EditMatrimonyDetailsForm({super.key});

  final TextEditingController homeAddressController = TextEditingController();
  final TextEditingController gotrejController = TextEditingController();
  // final TextEditingController occupation

  InputDecoration _commonInputDecoration(BuildContext context) {
    // final toggleStateService = Provider.of<ToggleStateProvider>(context);
    return InputDecoration(
      // suffixIcon: inputText == "password"
      //     ? InkWell(
      //         child: Icon(toggleStateService.state ? Icons.visibility_off : Icons.visibility),
      //         onTap: () {
      //           toggleStateService.toggle();
      //         },
      //       )
      //     : null,

      isDense: true,
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
  }

  @override
  Widget build(BuildContext context) {
    final matrimonyDetailService =
        Provider.of<MatrimonyDetailProvider>(context);
    return Scaffold(
      backgroundColor: kwhiteColor,
      appBar: AppBar(
        backgroundColor: kwhiteColor,
        elevation: 0,
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
            "Matrimony Details",
            style: TextStyle(
                fontFamily: 'Raleway',
                fontSize: 18,
                color: kbrownColor,
                fontWeight: FontWeight.w700),
          ),
        ),
      ),
      body: Container(
        padding: const EdgeInsets.symmetric(vertical: 10, horizontal: 20),
        child: SingleChildScrollView(
            child: Column(
          // mainAxisSize: MainAxisSize.max,
          mainAxisAlignment: MainAxisAlignment.spaceBetween,
          // crossAxisAlignment: CrossAxisAlignment.stretch,
          children: [
            Form(
              child: Column(
                // mainAxisAlignment: MainAxisAlignment.start,
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Container(
                    margin: const EdgeInsets.only(top: 25, bottom: 6),
                    child: Row(
                      children: [
                        Text(
                          "Photo",
                          style: TextStyle(
                              fontFamily: 'Roboto',
                              fontSize: 15,
                              color: kblackColor),
                        ),
                      ],
                    ),
                  ),
                  InkWell(
                    onTap: () async {
                      final ImagePicker picker = ImagePicker();
// Pick an image.
                      final XFile? xFile =
                          await picker.pickImage(source: ImageSource.gallery);
                      if (xFile == null) return;
                      final File file = await xFileToImage(xFile);

                      matrimonyDetailService.setMyProfileImage(file);
                    },
                    child: Container(
                      alignment: Alignment.center,
                      child: matrimonyDetailService.getMyProfileImage == null
                          ? Image.asset(
                              'assets/images/profile_icon.png',
                              width: 100,
                            )
                          : Image.file(
                              matrimonyDetailService.getMyProfileImage!,
                            ),
                    ),
                  ),
                  Container(
                    margin: const EdgeInsets.only(top: 15),
                    child: Text(
                      "Name",
                      style: TextStyle(
                          fontFamily: 'Roboto',
                          fontSize: 16,
                          color: kblackColor),
                    ),
                  ),
                  Container(
                    margin: EdgeInsets.only(top: 5),
                    // height: 40,
                    child: TextFormField(
                      // initialValue: matrimonyDetailService.myMatrinomyData["a"],
                      decoration: _commonInputDecoration(context),
                      maxLines: 1,
                      // validator: (value) {
                      //   if (value == null || value.isEmpty) {
                      //     return 'Please enter your password';
                      //   }
                      //   return null;
                      // },
                      // onSaved: (value) {
                      //   _password = value!;
                      // },
                    ),
                  ),
                  Container(
                    margin: const EdgeInsets.only(top: 15),
                    child: Text(
                      "About you",
                      style: TextStyle(
                          fontFamily: 'Roboto',
                          fontSize: 16,
                          color: kblackColor),
                    ),
                  ),
                  Container(
                    margin: EdgeInsets.only(top: 5),
                    // height: 40,
                    child: TextFormField(
                      // initialValue: matrimonyDetailService.myMatrinomyData["a"],
                      decoration: _commonInputDecoration(context),
                      maxLines: 1,
                      // validator: (value) {
                      //   if (value == null || value.isEmpty) {
                      //     return 'Please enter your password';
                      //   }
                      //   return null;
                      // },
                      // onSaved: (value) {
                      //   _password = value!;
                      // },
                    ),
                  ),
                  Container(
                    margin: const EdgeInsets.only(top: 15),
                    child: Text(
                      "Birth date",
                      style: TextStyle(
                          fontFamily: 'Roboto',
                          fontSize: 16,
                          color: kblackColor),
                    ),
                  ),
                  Container(
                    margin: EdgeInsets.only(top: 5),
                    // height: 40,
                    child: TextFormField(
                      // initialValue: matrimonyDetailService.myMatrinomyData["a"],
                      decoration: _commonInputDecoration(context),
                      maxLines: 1,
                      // validator: (value) {
                      //   if (value == null || value.isEmpty) {
                      //     return 'Please enter your password';
                      //   }
                      //   return null;
                      // },
                      // onSaved: (value) {
                      //   _password = value!;
                      // },
                    ),
                  ),
                  Container(
                    margin: const EdgeInsets.only(top: 15),
                    child: Text(
                      "Phone Number",
                      style: TextStyle(
                          fontFamily: 'Roboto',
                          fontSize: 16,
                          color: kblackColor),
                    ),
                  ),
                  Container(
                    margin: EdgeInsets.only(top: 5),
                    // height: 40,
                    child: TextFormField(
                      // initialValue: matrimonyDetailService.myMatrinomyData["a"],
                      decoration: _commonInputDecoration(context),
                      maxLines: 1,
                      // validator: (value) {
                      //   if (value == null || value.isEmpty) {
                      //     return 'Please enter your password';
                      //   }
                      //   return null;
                      // },
                      // onSaved: (value) {
                      //   _password = value!;
                      // },
                    ),
                  ),
                  Container(
                    margin: const EdgeInsets.only(top: 15),
                    child: Text(
                      "Fathers Name",
                      style: TextStyle(
                          fontFamily: 'Roboto',
                          fontSize: 16,
                          color: kblackColor),
                    ),
                  ),
                  Container(
                    margin: EdgeInsets.only(top: 5),
                    // height: 40,
                    child: TextFormField(
                      // initialValue: matrimonyDetailService.myMatrinomyData["a"],
                      decoration: _commonInputDecoration(context),
                      maxLines: 1,
                      // validator: (value) {
                      //   if (value == null || value.isEmpty) {
                      //     return 'Please enter your password';
                      //   }
                      //   return null;
                      // },
                      // onSaved: (value) {
                      //   _password = value!;
                      // },
                    ),
                  ),
                  Container(
                    margin: const EdgeInsets.only(top: 15),
                    child: Text(
                      "Gender",
                      style: TextStyle(
                          fontFamily: 'Roboto',
                          fontSize: 16,
                          color: kblackColor),
                    ),
                  ),
                  Container(
                    margin: EdgeInsets.only(top: 5),
                    // height: 40,
                    child: TextFormField(
                      // initialValue: matrimonyDetailService.myMatrinomyData["a"],
                      decoration: _commonInputDecoration(context),
                      maxLines: 1,
                      // validator: (value) {
                      //   if (value == null || value.isEmpty) {
                      //     return 'Please enter your password';
                      //   }
                      //   return null;
                      // },
                      // onSaved: (value) {
                      //   _password = value!;
                      // },
                    ),
                  ),

                  InkWell(
                    onTap: () {
                      matrimonyDetailService.addData();
                    },
                    child: Container(
                      margin: EdgeInsets.only(top: 15),
                      padding:
                          EdgeInsets.symmetric(vertical: 8, horizontal: 12),
                      decoration: BoxDecoration(
                        color: kpurpleColor,
                        borderRadius: BorderRadius.circular(5.0),
                      ),
                      child: Text(
                        "Add Details",
                        textAlign: TextAlign.center,
                        style: TextStyle(
                            fontFamily: 'Roboto',
                            fontSize: 15,
                            color: kwhiteColor),
                      ),
                    ),
                  ),

                  // ListView.builder(
                  //     itemCount:
                  //         matrimonyDetailService.occupationAddreess.length,
                  //     physics: const NeverScrollableScrollPhysics(),
                  //     shrinkWrap: true,
                  //     itemBuilder: (context, index) {
                  //       return Container(
                  //         margin: const EdgeInsets.only(top: 5, bottom: 5),
                  //         // height: 40,
                  //         child: TextFormField(
                  //           // controller: gotrejController,
                  //           initialValue:
                  //               matrimonyDetailService.occupationAddreess[index]
                  //                   ["occupation_address"],
                  //           decoration: _commonInputDecoration(context),
                  //           maxLines: 2,
                  //           // validator: (value) {
                  //           //   if (value == null || value.isEmpty) {
                  //           //     return 'Please enter your password';
                  //           //   }
                  //           //   return null;
                  //           // },
                  //           // onSaved: (value) {
                  //           //   _password = value!;
                  //           // },
                  //         ),
                  //       );
                  //     })
                ],
              ),
            ),
            Container(
              child: Text("Save"),
            )
          ],
        )),
      ),
    );
  }

  Future<File> xFileToImage(XFile xFile) async {
    // return Image.file(File(xFile.path));
    return File(xFile.path);
  }
}
