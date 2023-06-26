import 'dart:io';

import 'package:community/constants/colors.dart';
import 'package:community/constants/paths.dart';
import 'package:community/provider/family_detail_service.dart';
import 'package:community/provider/matrimony_service.dart';
import 'package:flutter/material.dart';
import 'package:flutter_svg/flutter_svg.dart';
import 'package:image_picker/image_picker.dart';
import 'package:provider/provider.dart';
import 'package:file_picker/file_picker.dart';

class EditMatrimonyDetailsForm extends StatefulWidget {
  const EditMatrimonyDetailsForm({super.key, this.preFilledData});

  final dynamic preFilledData;

  @override
  State<EditMatrimonyDetailsForm> createState() => _EditMatrimonyDetailsFormState();
}

class _EditMatrimonyDetailsFormState extends State<EditMatrimonyDetailsForm> {
  final _formKey = GlobalKey<FormState>();

  final TextEditingController nameController = TextEditingController();
  final TextEditingController aboutController = TextEditingController();
  final TextEditingController dobController = TextEditingController();
  final TextEditingController phoneController = TextEditingController();
  final TextEditingController fathersNameController = TextEditingController();
  final TextEditingController genderController = TextEditingController();

  // final TextEditingController occupation
  InputDecoration _commonInputDecoration(BuildContext context, {String? hintText}) {
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

  @override
  void initState() {
    if (widget.preFilledData != null) {
      print("id is " + widget.preFilledData['id'].toString());
      nameController.text = widget.preFilledData['name'];
      aboutController.text = widget.preFilledData['about'];
      dobController.text = widget.preFilledData['dob'];
      phoneController.text = widget.preFilledData['phone'].toString();
      fathersNameController.text = widget.preFilledData['fathers_name'];
      genderController.text = widget.preFilledData["gender"];
    } else {
      print("id is null");
      nameController.text = "";
      aboutController.text = "";
      dobController.text = "";
      phoneController.text = "";
      fathersNameController.text = "";
      genderController.text = "";
    }

    super.initState();
  }

  @override
  Widget build(BuildContext context) {
    final matrimonyDetailService = Provider.of<MatrimonyDetailProvider>(context);
    return WillPopScope(
      onWillPop: () async {
        matrimonyDetailService.clearMyMartrimonyData();
        return true;
      },
      child: Scaffold(
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
              style: TextStyle(fontFamily: 'Raleway', fontSize: 18, color: kbrownColor, fontWeight: FontWeight.w700),
            ),
          ),
        ),
        body: Form(
          key: _formKey,
          child: Container(
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
                              style: TextStyle(fontFamily: 'Roboto', fontSize: 15, color: kblackColor),
                            ),
                          ],
                        ),
                      ),
                      InkWell(
                        onTap: () async {
                          final ImagePicker picker = ImagePicker();
                          // Pick an image.
                          final XFile? xFile = await picker.pickImage(source: ImageSource.gallery);
                          if (xFile == null) return;
                          final File file = await xFileToImage(xFile);

                          matrimonyDetailService.setMyProfileImage(file);
                        },
                        child: Container(
                          alignment: Alignment.center,
                          child: matrimonyDetailService.getMyProfileImage != null
                              ? Image.file(
                                  matrimonyDetailService.getMyProfileImage!,
                                )
                              : widget.preFilledData?["picture"] != null
                                  ? Image.network(
                                      kbaseUrlImage + widget.preFilledData["picture"],
                                      width: 100,
                                    )
                                  : Image.asset(
                                      'assets/images/profile_icon.png',
                                      width: 100,
                                    ),
                        ),
                      ),
                      Container(
                        margin: const EdgeInsets.only(top: 15),
                        child: Text(
                          "Name",
                          style: TextStyle(fontFamily: 'Roboto', fontSize: 16, color: kblackColor),
                        ),
                      ),
                      Container(
                        margin: EdgeInsets.only(top: 5),
                        // height: 40,
                        child: TextFormField(
                          // initialValue: matrimonyDetailService.myMatrinomyData["a"],
                          decoration: _commonInputDecoration(context),
                          maxLines: 1,
                          controller: nameController,
                          onChanged: (value) {
                            matrimonyDetailService.setMatrimonyData("name", value);
                          },

                          validator: (value) {
                            print("called");
                            print(value);
                            if (value == null || value.isEmpty) {
                              return 'Please enter your name';
                            }
                            return null;
                          },
                          // onSaved: (value) {
                          //   _password = value!;
                          // },
                        ),
                      ),
                      Container(
                        margin: const EdgeInsets.only(top: 15),
                        child: Text(
                          "About you",
                          style: TextStyle(fontFamily: 'Roboto', fontSize: 16, color: kblackColor),
                        ),
                      ),
                      Container(
                        margin: EdgeInsets.only(top: 5),
                        // height: 40,
                        child: TextFormField(
                          // initialValue: matrimonyDetailService.myMatrinomyData["a"],
                          decoration: _commonInputDecoration(context),
                          maxLines: 1,
                          controller: aboutController,
                          onChanged: (value) {
                            matrimonyDetailService.setMatrimonyData("about", value);
                          },
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
                          style: TextStyle(fontFamily: 'Roboto', fontSize: 16, color: kblackColor),
                        ),
                      ),
                      Container(
                        margin: EdgeInsets.only(top: 5),
                        // height: 40,
                        child: TextFormField(
                          // initialValue: matrimonyDetailService.myMatrinomyData["a"],
                          decoration: _commonInputDecoration(context, hintText: "YYYY-MM-DD"),
                          maxLines: 1,

                          controller: dobController,
                          onChanged: (value) {
                            matrimonyDetailService.setMatrimonyData("dob", value.toString());
                          },
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
                          style: TextStyle(fontFamily: 'Roboto', fontSize: 16, color: kblackColor),
                        ),
                      ),
                      Container(
                        margin: EdgeInsets.only(top: 5),
                        // height: 40,
                        child: TextFormField(
                          // initialValue: matrimonyDetailService.myMatrinomyData["a"],
                          decoration: _commonInputDecoration(context),
                          maxLines: 1,
                          controller: phoneController,
                          onChanged: (value) {
                            matrimonyDetailService.setMatrimonyData("phone", value);
                          },
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
                          style: TextStyle(fontFamily: 'Roboto', fontSize: 16, color: kblackColor),
                        ),
                      ),
                      Container(
                        margin: EdgeInsets.only(top: 5),
                        // height: 40,
                        child: TextFormField(
                          // initialValue: matrimonyDetailService.myMatrinomyData["a"],
                          decoration: _commonInputDecoration(context),
                          maxLines: 1,
                          controller: fathersNameController,
                          onChanged: (value) {
                            matrimonyDetailService.setMatrimonyData("fathers_name", value);
                          },
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
                          style: TextStyle(fontFamily: 'Roboto', fontSize: 16, color: kblackColor),
                        ),
                      ),
                      Container(
                        margin: EdgeInsets.only(top: 5),
                        // height: 40,
                        child: TextFormField(
                          // initialValue: matrimonyDetailService.myMatrinomyData["a"],
                          decoration: _commonInputDecoration(context, hintText: "Male/Female"),
                          maxLines: 1,
                          controller: genderController,
                          onChanged: (value) {
                            String gender = value;
                            if (value == "male") {
                              gender = "Male";
                              genderController.text = "Male";
                            }
                            if (value == "female") {
                              gender = "Female";
                              genderController.text = "Female";
                            }
                            matrimonyDetailService.setMatrimonyData('gender', gender);
                          },
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
                          "Bio Data",
                          style: TextStyle(fontFamily: 'Roboto', fontSize: 16, color: kblackColor),
                        ),
                      ),

                      InkWell(
                        onTap: () async {
                          FilePickerResult? file = await FilePicker.platform.pickFiles(
                            type: FileType.custom,
                            allowedExtensions: ['pdf', 'doc', 'docx', 'png', 'jpg', 'jpeg'],
                          );

                          if (file != null) {
                            File file2 = File(file.files.first.path!);
                            matrimonyDetailService.setMyBioData(file2);
                          }
                        },
                        child: Container(
                          alignment: Alignment.center,
                          padding: EdgeInsets.symmetric(horizontal: 10, vertical: 7),
                          decoration: BoxDecoration(
                            border: Border.all(color: ktextInputBorderColor, width: 2),
                            borderRadius: BorderRadius.circular(10),
                          ),
                          margin: EdgeInsets.only(top: 5),
                          child: Text(matrimonyDetailService.getMyBioData != null
                              ? matrimonyDetailService.getMyBioData!.path.split("/").last
                              : widget.preFilledData?["biodata"] != null
                                  ? widget.preFilledData["biodata"].toString().split("/").last
                                  : "Upload Bio Data"),
                        ),
                      ),
                      SizedBox(
                        height: 20,
                      ),

                      Center(
                        child: InkWell(
                          onTap: () async {
                            // print(_formKey.currentState!.validate());

                            String dob = dobController.text;
                            List<String> dobList = dob.split("-");

                            if (dobList.length != 3) {
                              ScaffoldMessenger.of(context).showSnackBar(
                                SnackBar(
                                  content: Text(
                                    "Please Enter Valid Date of Birth in YYYY-MM-DD format",
                                    style: TextStyle(fontFamily: 'Roboto', fontSize: 16, color: kwhiteColor),
                                  ),
                                  duration: Duration(seconds: 10),
                                ),
                              );
                              return;
                            }

                            for (String a in dobList) {
                              if (int.tryParse(a) == null) {
                                ScaffoldMessenger.of(context).showSnackBar(
                                  SnackBar(
                                    content: Text(
                                      "Please Enter Valid Date of Birth in YYYY-MM-DD in numbers only",
                                      style: TextStyle(fontFamily: 'Roboto', fontSize: 16, color: kwhiteColor),
                                    ),
                                    duration: Duration(seconds: 10),
                                  ),
                                );
                                return;
                              }
                            }

                            if (int.parse(dobList[0]) < 1900) {
                              ScaffoldMessenger.of(context).showSnackBar(
                                SnackBar(
                                  content: Text(
                                    "Please Enter Valid DOB Year",
                                    style: TextStyle(fontFamily: 'Roboto', fontSize: 16, color: kwhiteColor),
                                  ),
                                ),
                              );
                              return;
                            }

                            if (int.parse(dobList[1]) < 1 || int.parse(dobList[1]) > 12) {
                              ScaffoldMessenger.of(context).showSnackBar(
                                SnackBar(
                                  content: Text(
                                    "Please Enter Valid DOB Month",
                                    style: TextStyle(fontFamily: 'Roboto', fontSize: 16, color: kwhiteColor),
                                  ),
                                ),
                              );
                              return;
                            }

                            if (int.parse(dobList[2]) < 1 || int.parse(dobList[2]) > 31) {
                              ScaffoldMessenger.of(context).showSnackBar(
                                SnackBar(
                                  content: Text(
                                    "Please Enter Valid DOB Date",
                                    style: TextStyle(fontFamily: 'Roboto', fontSize: 16, color: kwhiteColor),
                                  ),
                                ),
                              );
                              return;
                            }

                            if (nameController.text.isEmpty) {
                              ScaffoldMessenger.of(context).showSnackBar(
                                SnackBar(
                                  content: Text(
                                    "Please Enter Name",
                                    style: TextStyle(fontFamily: 'Roboto', fontSize: 16, color: kwhiteColor),
                                  ),
                                ),
                              );
                              return;
                            }

                            if (aboutController.text.isEmpty) {
                              ScaffoldMessenger.of(context).showSnackBar(
                                SnackBar(
                                  content: Text(
                                    "Please Enter About You",
                                    style: TextStyle(fontFamily: 'Roboto', fontSize: 16, color: kwhiteColor),
                                  ),
                                ),
                              );
                              return;
                            }

                            if (phoneController.text.isEmpty) {
                              ScaffoldMessenger.of(context).showSnackBar(
                                SnackBar(
                                  content: Text(
                                    "Please Enter Phone Number",
                                    style: TextStyle(fontFamily: 'Roboto', fontSize: 16, color: kwhiteColor),
                                  ),
                                ),
                              );
                              return;
                            }

                            if (phoneController.text.length != 10 || int.tryParse(phoneController.text) == null) {
                              ScaffoldMessenger.of(context).showSnackBar(
                                SnackBar(
                                  content: Text(
                                    "Please Enter Valid Phone Number without +91",
                                    style: TextStyle(fontFamily: 'Roboto', fontSize: 16, color: kwhiteColor),
                                  ),
                                ),
                              );
                              return;
                            }

                            if (fathersNameController.text.isEmpty) {
                              ScaffoldMessenger.of(context).showSnackBar(
                                SnackBar(
                                  content: Text(
                                    "Please Enter Father's Name",
                                    style: TextStyle(fontFamily: 'Roboto', fontSize: 16, color: kwhiteColor),
                                  ),
                                ),
                              );
                              return;
                            }

                            if (genderController.text != "Male" && genderController.text != "Female") {
                              ScaffoldMessenger.of(context).showSnackBar(
                                SnackBar(
                                  content: Text(
                                    "Gender can be \"Male\" or \"Female\" only",
                                    style: TextStyle(fontFamily: 'Roboto', fontSize: 16, color: kwhiteColor),
                                  ),
                                ),
                              );
                              return;
                            }

                            print('validated');
                            return;
                            // print(matrimonyDetailService.myMatrinomyData["name"]);
                            // print(matrimonyDetailService.myMatrinomyData["dob"]);
                            // print(nameController.text);
                            // print(dobController.text);
                            // return;

                            if (widget.preFilledData == null) {
                              bool res = await matrimonyDetailService.addData();
                              if (res) {
                                ScaffoldMessenger.of(context).showSnackBar(
                                  SnackBar(
                                    content: Text(
                                      "Details Added Successfully",
                                      style: TextStyle(fontFamily: 'Roboto', fontSize: 16, color: kwhiteColor),
                                    ),
                                  ),
                                );

                                Navigator.pop(context);
                              } else {
                                ScaffoldMessenger.of(context).showSnackBar(
                                  SnackBar(
                                    content: Text(
                                      "Error Adding Details",
                                      style: TextStyle(fontFamily: 'Roboto', fontSize: 16, color: kwhiteColor),
                                    ),
                                  ),
                                );
                              }
                            } else {
                              matrimonyDetailService.setMatrimonyData("name", nameController.text);
                              matrimonyDetailService.setMatrimonyData("about", aboutController.text);
                              matrimonyDetailService.setMatrimonyData("fathers_name", fathersNameController.text);
                              matrimonyDetailService.setMatrimonyData("phone", phoneController.text);
                              matrimonyDetailService.setMatrimonyData("gender", genderController.text);
                              matrimonyDetailService.setMatrimonyData("dob", dobController.text);

                              // if(nameController.text)

                              int id = widget.preFilledData["id"];

                              bool res = await matrimonyDetailService.editMatrimony(id);

                              if (res) {
                                ScaffoldMessenger.of(context).showSnackBar(
                                  SnackBar(
                                    content: Text(
                                      "Details Edited Successfully",
                                      style: TextStyle(fontFamily: 'Roboto', fontSize: 16, color: kwhiteColor),
                                    ),
                                  ),
                                );

                                Navigator.pop(context);
                              } else {
                                ScaffoldMessenger.of(context).showSnackBar(
                                  SnackBar(
                                    content: Text(
                                      "Error Editing Details",
                                      style: TextStyle(fontFamily: 'Roboto', fontSize: 16, color: kwhiteColor),
                                    ),
                                  ),
                                );
                              }
                            }
                          },
                          child: Container(
                            width: MediaQuery.of(context).size.width - 20,
                            margin: EdgeInsets.only(top: 15),
                            padding: EdgeInsets.symmetric(vertical: 10, horizontal: 12),
                            decoration: BoxDecoration(
                              color: kpurpleColor,
                              borderRadius: BorderRadius.circular(10.0),
                            ),
                            child: Text(
                              "Add Details",
                              textAlign: TextAlign.center,
                              style: TextStyle(fontFamily: 'Roboto', fontSize: 15, color: kwhiteColor),
                            ),
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
              ],
            )),
          ),
        ),
      ),
    );
  }

  Future<File> xFileToImage(XFile xFile) async {
    return File(xFile.path);
  }
}
