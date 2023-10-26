import 'package:community/constants/colors.dart';
import 'package:community/provider/company_details_provider.dart';
import 'package:community/provider/family_detail_service.dart';
import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:flutter_svg/flutter_svg.dart';
import 'package:flutter_overlay_loader/flutter_overlay_loader.dart';
import 'package:intl/intl.dart';
import 'package:provider/provider.dart';

class AddOrEditFamilyMember extends StatefulWidget {
  const AddOrEditFamilyMember(
      {super.key,
      required this.index,
      required this.username,
      required this.memberId,
      required this.name,
      required this.relationWithMainMember,
      required this.education,
      required this.emailAddress,
      required this.phoneNumber,
      required this.birthDate,
      required this.professionalStatus,
      required this.professionalName,
      required this.gender,
      required this.bloodGroup,
      required this.maritialStatus});

  final int? index;
  final String? username;
  final int? memberId;
  final String name;
  final String relationWithMainMember;
  final String education;
  final String emailAddress;
  final String phoneNumber;
  final String birthDate;
  final String professionalStatus;
  final String professionalName;
  final String gender;
  final String bloodGroup;
  final String maritialStatus;

  @override
  State<AddOrEditFamilyMember> createState() => _AddOrEditFamilyMemberState();
}

class _AddOrEditFamilyMemberState extends State<AddOrEditFamilyMember> {
  late int? index;
  late String? username;
  late int? memberId;
  late String name;
  late String relationWithMainMember;
  late String education;
  late String emailAddress;
  late String phoneNumber;
  late String birthDate;
  late String professionalStatus;
  late String professionalName;
  late String gender;
  late String bloodGroup;
  late String maritialStatus;

  @override
  void initState() {
    // TODO: implement initState
    index = widget.index;
    username = widget.username;
    memberId = widget.memberId;
    name = widget.name;
    relationWithMainMember = widget.relationWithMainMember;
    education = widget.education;
    emailAddress = widget.emailAddress;
    phoneNumber = widget.phoneNumber;
    birthDate = widget.birthDate;
    professionalStatus = widget.professionalStatus;
    professionalName = widget.professionalName;
    gender = widget.gender;
    bloodGroup = widget.bloodGroup;
    maritialStatus = widget.maritialStatus;
    birthDateController.text = widget.birthDate;
    super.initState();
  }

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
      contentPadding: const EdgeInsets.fromLTRB(10, 10, 10, 10),
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

  List<String> professionalStatusList = ["NA", "Job", "Business", "Student"];
  List<String> dropdownOptions = [
    'CA',
    'Engineer',
    'Doctor',
    'Architect',
    'Lawyer',
    'Professor/Teacher',
    'Journalist',
    'Banker',
    'Others',
  ];

  TextEditingController birthDateController = TextEditingController();

  final _formKey = GlobalKey<FormState>();
  @override
  Widget build(BuildContext context) {
    final familyDetailService = Provider.of<FamilyDetailProvider>(context);
    return Scaffold(
      backgroundColor: kwhiteColor,
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
            widget.memberId != null ? "Edit Member Details" : "Add Member",
            // textAlign: TextAlign.center,
            style: TextStyle(
              color: kbrownColor,
              fontSize: 22,
              fontWeight: FontWeight.w700,
              fontFamily: "Raleway",
            ),
          ),
        ),

        actions: [
          widget.memberId != null
              ? InkWell(
                  onTap: () async {
                    Loader.show(context);
                    // final res =
                    //     await companyDetailService.deleteJob(widget.jobId!);

                    final res =
                        await familyDetailService.deleteFamilyMember(widget.memberId!, widget.index!, widget.username!);

                    Loader.hide();

                    if (!res) {
                      ScaffoldMessenger.of(context).showSnackBar(
                        SnackBar(
                          content: Text(
                            "Member not deleted",
                            style: TextStyle(
                              fontFamily: "Inter",
                              fontSize: 15,
                              fontWeight: FontWeight.w400,
                              color: kwhiteColor,
                            ),
                          ),
                        ),
                      );
                    } else {
                      ScaffoldMessenger.of(context).showSnackBar(
                        SnackBar(
                          content: Text(
                            "Member Deleted Successfully",
                            style: TextStyle(
                              fontFamily: "Inter",
                              fontSize: 15,
                              fontWeight: FontWeight.w400,
                              color: kwhiteColor,
                            ),
                          ),
                        ),
                      );
                      Navigator.pop(context);
                    }
                  },
                  child: Padding(
                    padding: const EdgeInsets.only(top: 15.0, right: 15),
                    child: Icon(
                      Icons.delete_outline_rounded,
                      color: Colors.red,
                    ),
                  ),
                )
              : Container(),
        ],
      ),
      body: SingleChildScrollView(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.spaceBetween,
          children: [
            Container(
              margin: const EdgeInsets.only(top: 20),
              child: Form(
                key: _formKey,
                child: Column(
                  mainAxisAlignment: MainAxisAlignment.start,
                  children: <Widget>[
                    Padding(
                      padding: const EdgeInsets.only(top: 22.0, left: 20),
                      child: Row(
                        children: [
                          SvgPicture.asset(
                            "assets/images/account.svg",
                            height: 25,
                            width: 25,
                            color: kblackColor,
                          ),
                          Padding(
                            padding: const EdgeInsets.only(left: 14.0),
                            child: Text(
                              "Name",
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
                      padding: const EdgeInsets.only(left: 20.0, right: 20, top: 10),
                      child: Container(
                        // height: 40,
                        child: TextFormField(
                          initialValue: name,
                          decoration: _commonInputDecoration(context),
                          validator: (value) {
                            if (value == null || value.isEmpty) {
                              return 'Please enter a name';
                            }
                            return null;
                          },
                          onChanged: (value) {
                            setState(() {
                              name = value;
                            });
                          },
                          // onSaved: (value) {
                          //   _password = value!;
                          // },
                        ),
                      ),
                    ),
                    Padding(
                      padding: const EdgeInsets.only(top: 25.0, left: 20),
                      child: Row(
                        children: [
                          SvgPicture.asset(
                            "assets/images/professional_name.svg",
                            height: 25,
                            width: 25,
                            color: kblackColor,
                          ),
                          Padding(
                            padding: const EdgeInsets.only(left: 14.0),
                            child: Text(
                              "Relation with main member",
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
                      padding: const EdgeInsets.only(left: 20.0, right: 20, top: 10),
                      child: Container(
                        // height: 40,
                        child: TextFormField(
                          // maxLines: 4,
                          initialValue: relationWithMainMember,
                          decoration: _commonInputDecoration(context),
                          validator: (value) {
                            if (value == null || value.isEmpty) {
                              return 'Please enter a relation';
                            }
                            return null;
                          },
                          onChanged: (value) {
                            setState(() {
                              relationWithMainMember = value;
                            });
                          },
                          // onSaved: (value) {
                          //   _password = value!;
                          // },
                        ),
                      ),
                    ),
                    Padding(
                      padding: const EdgeInsets.only(top: 28.0, left: 20),
                      child: Row(
                        children: [
                          SvgPicture.asset(
                            "assets/images/education.svg",
                            height: 25,
                            width: 25,
                            color: kblackColor,
                          ),
                          Padding(
                            padding: const EdgeInsets.only(left: 14.0),
                            child: Text(
                              "Education",
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
                      padding: const EdgeInsets.only(left: 20.0, right: 20, top: 10),
                      child: Container(
                        // height: 40,
                        child: TextFormField(
                          initialValue: education,
                          decoration: _commonInputDecoration(context),
                          validator: (value) {
                            if (value == null || value.isEmpty) {
                              return 'Please enter education details';
                            }
                            return null;
                          },
                          onChanged: (value) {
                            setState(() {
                              education = value;
                            });
                          },
                        ),
                      ),
                    ),
                    Padding(
                      padding: const EdgeInsets.only(top: 28.0, left: 20),
                      child: Row(
                        children: [
                          Icon(
                            Icons.email_outlined,
                            size: 25,
                            color: kblackColor,
                          ),
                          Padding(
                            padding: const EdgeInsets.only(left: 14.0),
                            child: Text(
                              "Email Address",
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
                      padding: const EdgeInsets.only(left: 20.0, right: 20, top: 10),
                      child: Container(
                        // height: 40,
                        child: TextFormField(
                          initialValue: emailAddress,
                          decoration: _commonInputDecoration(context),
                          validator: (value) {
                            if (value == null || value.isEmpty) {
                              return 'Please enter email address';
                            }
                            return null;
                          },
                          onChanged: (value) {
                            setState(() {
                              emailAddress = value;
                            });
                          },
                        ),
                      ),
                    ),
                    Padding(
                      padding: const EdgeInsets.only(top: 28.0, left: 20),
                      child: Row(
                        children: [
                          Icon(
                            CupertinoIcons.phone,
                            color: kblackColor,
                            size: 25.0,
                          ),
                          Padding(
                            padding: const EdgeInsets.only(left: 14.0),
                            child: Text(
                              "Phone Number",
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
                      padding: const EdgeInsets.only(left: 20.0, right: 20, top: 10),
                      child: Container(
                        // height: 40,
                        child: TextFormField(
                          initialValue: phoneNumber,
                          keyboardType: TextInputType.number,
                          decoration: _commonInputDecoration(context),
                          validator: (value) {
                            if (value == null || value.isEmpty) {
                              return 'Please enter phone number';
                            }
                            return null;
                          },
                          onChanged: (value) {
                            setState(() {
                              phoneNumber = value;
                            });
                          },
                        ),
                      ),
                    ),
                    Padding(
                      padding: const EdgeInsets.only(top: 28.0, left: 20),
                      child: Row(
                        children: [
                          SvgPicture.asset(
                            "assets/images/calendar.svg",
                            height: 20,
                            width: 20,
                            color: kblackColor,
                          ),
                          Padding(
                            padding: const EdgeInsets.only(left: 14.0),
                            child: Text(
                              "Birthdate",
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
                      padding: const EdgeInsets.only(left: 20.0, right: 20, top: 10),
                      child: Container(
                        // height: 40,
                        child: TextFormField(
                          controller: birthDateController,
                          decoration: _commonInputDecoration(context),
                          readOnly: true,
                          onTap: () async {
                            DateTime? pickedDate = await showDatePicker(
                                context: context,
                                initialDate: DateTime.now(),
                                firstDate: DateTime(1950),
                                //DateTime.now() - not to allow to choose before today.
                                lastDate: DateTime(2100));

                            if (pickedDate != null) {
                              // print(pickedDate); //pickedDate output format => 2021-03-10 00:00:00.000
                              String formattedDate = DateFormat('yyyy-MM-dd').format(pickedDate);
                              print(formattedDate); //formatted date output using intl package =>  2021-03-16
                              setState(() {
                                birthDate = formattedDate; //set output date to TextField value.
                                birthDateController.text = formattedDate;
                              });
                            } else {}
                          },
                        ),
                      ),
                    ),
                    Padding(
                      padding: const EdgeInsets.only(top: 25.0, left: 20),
                      child: Row(
                        crossAxisAlignment: CrossAxisAlignment.center,
                        children: [
                          SvgPicture.asset(
                            "assets/images/professional_name.svg",
                            height: 25,
                            width: 25,
                            color: kblackColor,
                          ),
                          Padding(
                            padding: const EdgeInsets.only(left: 14.0),
                            child: Text(
                              "Professional Status",
                              style: TextStyle(
                                fontFamily: "Inter",
                                fontSize: 15,
                                fontWeight: FontWeight.w400,
                                color: ktextColor,
                              ),
                            ),
                          ),
                          SizedBox(
                            width: 20.0,
                          ),
                          Container(
                            margin: const EdgeInsets.only(right: 20.0),
                            child: DropdownButton<String>(
                              value: professionalStatus,
                              onChanged: (String? value) {
                                setState(() {
                                  professionalStatus = value!;
                                });
                              },
                              items: professionalStatusList.map<DropdownMenuItem<String>>((String value) {
                                return DropdownMenuItem<String>(
                                  value: value,
                                  child: Text(value),
                                );
                              }).toList(),
                            ),
                          ),
                        ],
                      ),
                    ),
                    Padding(
                      padding: const EdgeInsets.only(top: 25.0, left: 20),
                      child: Row(
                        crossAxisAlignment: CrossAxisAlignment.center,
                        children: [
                          Icon(
                            CupertinoIcons.briefcase,
                            color: kblackColor,
                            size: 25.0,
                          ),
                          Padding(
                            padding: const EdgeInsets.only(left: 14.0),
                            child: Text(
                              "Profession Name",
                              style: TextStyle(
                                fontFamily: "Inter",
                                fontSize: 15,
                                fontWeight: FontWeight.w400,
                                color: ktextColor,
                              ),
                            ),
                          ),
                          SizedBox(
                            width: 20.0,
                          ),
                          Container(
                            margin: const EdgeInsets.only(right: 20.0),
                            child: DropdownButton<String>(
                              value: professionalName,
                              onChanged: (String? value) {
                                setState(() {
                                  professionalName = value!;
                                });
                              },
                              items: dropdownOptions.map<DropdownMenuItem<String>>((String value) {
                                return DropdownMenuItem<String>(
                                  value: value,
                                  child: Text(value),
                                );
                              }).toList(),
                            ),
                          ),
                        ],
                      ),
                    ),
                    Padding(
                      padding: const EdgeInsets.only(top: 28.0, left: 20),
                      child: Row(
                        children: [
                          SvgPicture.asset(
                            "assets/images/gender.svg",
                            height: 25,
                            width: 25,
                            color: kblackColor,
                          ),
                          Padding(
                            padding: const EdgeInsets.only(left: 14.0),
                            child: Text(
                              "Gender",
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
                      padding: const EdgeInsets.only(left: 20.0, right: 20, top: 10),
                      child: Container(
                        // height: 40,
                        child: TextFormField(
                          initialValue: gender,
                          decoration: _commonInputDecoration(context),
                          validator: (value) {
                            if (value == null || value.isEmpty) {
                              return 'Please enter gender';
                            }
                            return null;
                          },
                          onChanged: (value) {
                            setState(() {
                              gender = value;
                            });
                          },
                        ),
                      ),
                    ),
                    Padding(
                      padding: const EdgeInsets.only(top: 28.0, left: 20),
                      child: Row(
                        children: [
                          Icon(
                            CupertinoIcons.drop,
                            color: kblackColor,
                            size: 25.0,
                          ),
                          Padding(
                            padding: const EdgeInsets.only(left: 14.0),
                            child: Text(
                              "Blood Group",
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
                      padding: const EdgeInsets.only(left: 20.0, right: 20, top: 10),
                      child: Container(
                        // height: 40,
                        child: TextFormField(
                          initialValue: bloodGroup,
                          decoration: _commonInputDecoration(context),
                          validator: (value) {
                            if (value == null || value.isEmpty) {
                              return 'Please enter blood group';
                            }
                            return null;
                          },
                          onChanged: (value) {
                            setState(() {
                              bloodGroup = value;
                            });
                          },
                        ),
                      ),
                    ),
                    Padding(
                      padding: const EdgeInsets.only(top: 28.0, left: 20),
                      child: Row(
                        children: [
                          Image.asset("assets/images/maritial_status.png"),
                          Padding(
                            padding: const EdgeInsets.only(left: 14.0),
                            child: Text(
                              "Maritial Status",
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
                      padding: const EdgeInsets.only(left: 20.0, right: 20, top: 10),
                      child: Container(
                        // height: 40,
                        child: TextFormField(
                          initialValue: maritialStatus,
                          decoration: _commonInputDecoration(context),
                          validator: (value) {
                            if (value == null || value.isEmpty) {
                              return 'Please enter maritial status';
                            }
                            return null;
                          },
                          onChanged: (value) {
                            setState(() {
                              maritialStatus = value;
                            });
                          },
                        ),
                      ),
                    ),
                  ],
                ),
              ),
            ),
            Container(
              height: 40,
              padding: const EdgeInsets.only(top: 10, bottom: 10),
              margin: const EdgeInsets.only(left: 20, right: 20, top: 30, bottom: 40),
              decoration: BoxDecoration(
                color: kyellowColor,
                borderRadius: const BorderRadius.all(Radius.circular(5.0)),
              ),
              child: InkWell(
                onTap: () async {
                  if (_formKey.currentState!.validate()) {
                    _formKey.currentState!.save();
                    try {
                      // print(memberId);
                      Loader.show(context);
                      int statusCode = await familyDetailService.addOrEditMember(
                        index,
                        username,
                        memberId,
                        name,
                        relationWithMainMember,
                        education,
                        emailAddress,
                        phoneNumber,
                        birthDate,
                        professionalStatus,
                        professionalName,
                        gender,
                        bloodGroup,
                        maritialStatus,
                      );
                      Loader.hide();

                      if (statusCode == 200) {
                        Navigator.pop(context);
                      }

                      // await authService.signInWithEmailAndPassword(userNameController.text, passwordController.text);
                      // navigate to home page
                      // Navigator.push(context, MaterialPageRoute(builder: (context) {
                      //   return HomeScreen();
                      // }));
                    } catch (error) {
                      // display error message
                    }
                  }
                },
                child: Center(
                  child: Text(
                    widget.memberId != null ? "Edit Member Details" : "Add Member",
                    // widget.jobId != null ? "Edit Job" : "Add Job",
                    style: TextStyle(
                      fontFamily: "Roboto",
                      fontSize: 15,
                      fontWeight: FontWeight.w400,
                      color: kblackColor,
                    ),
                  ),
                ),
              ),
            ),
          ],
        ),
      ),
    );
  }
}
