import 'dart:io';

import 'package:community/constants/colors.dart';
import 'package:community/provider/company_details_provider.dart';
import 'package:flutter/material.dart';
import 'package:flutter_svg/flutter_svg.dart';
import 'package:image_picker/image_picker.dart';
import 'package:provider/provider.dart';

class RegisterCompany extends StatefulWidget {
  const RegisterCompany({super.key});

  @override
  State<RegisterCompany> createState() => _RegisterCompanyState();
}

class _RegisterCompanyState extends State<RegisterCompany> {
  final TextEditingController _companyNameController = TextEditingController();
  final TextEditingController _companyAddressController =
      TextEditingController();
  final TextEditingController _companyEmailController = TextEditingController();
  InputDecoration _commonInputDecoration(BuildContext context,
      {String? hintText}) {
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
      hintText: hintText,
      hintStyle: TextStyle(
        fontSize: 16,
        color: ktextInputBorderColor,
      ),
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

  File? profilePic;
  Future<File> xFileToImage(XFile xFile) async {
    return File(xFile.path);
  }

  @override
  Widget build(BuildContext context) {
    //  final companyDetailsService = Provider.of<CompanyDetailsProvider>(context);

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
      body: Form(
        child: ListView(
          children: [
            Container(
              margin: const EdgeInsets.symmetric(horizontal: 15, vertical: 10),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Container(
                    margin: const EdgeInsets.only(top: 25, bottom: 6),
                    child: Row(
                      children: [
                        Text(
                          "Company Logo",
                          style: TextStyle(
                              fontFamily: 'Roboto',
                              fontSize: 16,
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

                      setState(() {
                        profilePic = file;
                      });
                    },
                    // child: Container(),
                    child: Container(
                      alignment: Alignment.center,
                      child: profilePic != null
                          ? Image.file(profilePic!)
                          : Image.asset(
                              'assets/images/profile_icon.png',
                              width: 100,
                            ),

                      // matrimonyDetailService.getMyProfileImage != null
                      //     ? Image.file(
                      //         matrimonyDetailService.getMyProfileImage!,
                      //       )
                      //     : widget.preFilledData?["picture"] != null
                      //         ? Image.network(
                      //             kbaseUrlImage +
                      //                 widget.preFilledData["picture"],
                      //             width: 100,
                      //           )
                      //         : Image.asset(
                      //             'assets/images/profile_icon.png',
                      //             width: 100,
                      //           ),
                    ),
                  ),
                  Container(
                    margin: const EdgeInsets.only(top: 15),
                    child: Text(
                      "Company Name",
                      style: TextStyle(
                          fontFamily: 'Roboto',
                          fontSize: 16,
                          color: kblackColor),
                    ),
                  ),
                  Container(
                    margin: EdgeInsets.only(top: 5),
                    child: TextFormField(
                      decoration: _commonInputDecoration(context),
                      maxLines: 1,
                      controller: _companyNameController,
                      validator: (value) {
                        print("called");
                        print(value);
                        if (value == null || value.isEmpty) {
                          return 'Please enter Company name';
                        }
                        return null;
                      },
                    ),
                  ),
                  Container(
                    margin: const EdgeInsets.only(top: 15),
                    child: Text(
                      "Email Address",
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
                      decoration: _commonInputDecoration(context),
                      maxLines: 1,
                      controller: _companyEmailController,
                      onChanged: (value) {},
                    ),
                  ),
                  Container(
                    margin: const EdgeInsets.only(top: 15),
                    child: Text(
                      "Company Address",
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
                      controller: _companyAddressController,
                      onChanged: (value) {},
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

                  // Container(
                  //   margin: const EdgeInsets.only(top: 15),
                  //   child: Text(
                  //     "Bio Data",
                  //     style: TextStyle(
                  //         fontFamily: 'Roboto',
                  //         fontSize: 16,
                  //         color: kblackColor),
                  //   ),
                  // ),

                  // InkWell(
                  //   onTap: () async {
                  //     FilePickerResult? file =
                  //         await FilePicker.platform.pickFiles(
                  //       type: FileType.custom,
                  //       allowedExtensions: [
                  //         'pdf',
                  //         'doc',
                  //         'docx',
                  //         'png',
                  //         'jpg',
                  //         'jpeg'
                  //       ],
                  //     );

                  //     if (file != null) {
                  //       File file2 = File(file.files.first.path!);
                  //       matrimonyDetailService.setMyBioData(file2);
                  //     }
                  //   },
                  //   child: Container(
                  //     alignment: Alignment.center,
                  //     padding:
                  //         EdgeInsets.symmetric(horizontal: 10, vertical: 7),
                  //     decoration: BoxDecoration(
                  //       border: Border.all(
                  //           color: ktextInputBorderColor, width: 2),
                  //       borderRadius: BorderRadius.circular(10),
                  //     ),
                  //     margin: EdgeInsets.only(top: 5),
                  //     child: Text(
                  //         matrimonyDetailService.getMyBioData != null
                  //             ? matrimonyDetailService.getMyBioData!.path
                  //                 .split("/")
                  //                 .last
                  //             : widget.preFilledData?["biodata"] != null
                  //                 ? widget.preFilledData["biodata"]
                  //                     .toString()
                  //                     .split("/")
                  //                     .last
                  //                 : "Upload Bio Data"),
                  //   ),
                  // ),
                  SizedBox(
                    height: 20,
                  ),

                  Center(
                    child: InkWell(
                      onTap: () async {
                        print('validated');
                        return;
                      },
                      child: Container(
                        width: MediaQuery.of(context).size.width - 20,
                        margin: EdgeInsets.only(top: 15),
                        padding:
                            EdgeInsets.symmetric(vertical: 10, horizontal: 12),
                        decoration: BoxDecoration(
                          color: kpurpleColor,
                          borderRadius: BorderRadius.circular(10.0),
                        ),
                        child: Text(
                          "Edit Details",
                          textAlign: TextAlign.center,
                          style: TextStyle(
                              fontFamily: 'Roboto',
                              fontSize: 15,
                              color: kwhiteColor),
                        ),
                      ),
                    ),
                  ),
                ],
              ),
            ),
          ],
        ),
      ),
    );
  }
}
