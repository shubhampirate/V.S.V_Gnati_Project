import 'package:community/constants/colors.dart';
import 'package:community/provider/members_list_service.dart';
import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:flutter_svg/flutter_svg.dart';
import 'package:provider/provider.dart';

class MembersList extends StatelessWidget {
  MembersList({super.key});

  List<String> dropdownOptions = [
    'All',
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

  InputDecoration _commonInputDecoration(BuildContext context) =>
      InputDecoration(
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

  @override
  Widget build(BuildContext context) {
    final membersService = Provider.of<MembersListProvider>(context);

    return SafeArea(
      child: Scaffold(
          body: ListView(
        children: [
          Container(
            color: kwhiteColor,
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.center,
              children: [
                Padding(
                  padding: const EdgeInsets.only(top: 38.0, bottom: 20),
                  child: Text(
                    "List of Members",
                    textAlign: TextAlign.center,
                    style: TextStyle(
                      fontFamily: "Raleway",
                      fontWeight: FontWeight.w700,
                      fontSize: 18,
                      color: kbrownColor,
                    ),
                  ),
                ),
                Theme(
                  data: Theme.of(context)
                      .copyWith(dividerColor: Colors.transparent),
                  child: ExpansionTile(
                    initiallyExpanded: true,
                    backgroundColor: kwhiteColor,
                    iconColor: kborderColor,
                    collapsedIconColor: kborderColor,
                    title: Text(
                      "Filter",
                      style: TextStyle(
                        fontFamily: "Raleway",
                        fontWeight: FontWeight.w700,
                        fontSize: 18,
                        color: kbrownColor,
                      ),
                    ),
                    children: [
                      Container(
                        margin: const EdgeInsets.symmetric(vertical: 5),
                        padding: const EdgeInsets.symmetric(
                            horizontal: 10, vertical: 10),
                        width: MediaQuery.of(context).size.width * 0.88,
                        decoration: BoxDecoration(
                          color: kwhiteColor,
                          borderRadius: BorderRadius.circular(5.0),
                          border: Border.all(
                            color: kborderColor,
                          ),
                        ),
                        child: Column(
                          crossAxisAlignment: CrossAxisAlignment.start,
                          children: [
                            Padding(
                              padding: const EdgeInsets.only(
                                  left: 11.0, top: 3, bottom: 3),
                              child: Text('Gender',
                                  style: TextStyle(
                                    fontFamily: 'Inter',
                                    fontSize: 13,
                                    color: kblackColor,
                                    fontWeight: FontWeight.w600,
                                  )),
                            ),
                            Row(
                              children: [
                                Checkbox(
                                  side:
                                      BorderSide(color: kborderColor, width: 2),
                                  shape: RoundedRectangleBorder(
                                      borderRadius: BorderRadius.circular(5)),
                                  visualDensity: VisualDensity.compact,
                                  checkColor: kwhiteColor,
                                  activeColor: kborderColor,
                                  value: membersService.femaleValue,
                                  onChanged: (bool? value) {
                                    membersService.setGenderFemale(value!);
                                  },
                                ),
                                Text(
                                  'Female',
                                  style: TextStyle(
                                    fontFamily: 'Inter',
                                    fontSize: 13,
                                    color: kblackColor,
                                    fontWeight: FontWeight.w400,
                                  ),
                                )
                              ],
                            ),
                            Row(
                              children: [
                                Checkbox(
                                  side:
                                      BorderSide(color: kborderColor, width: 2),
                                  shape: RoundedRectangleBorder(
                                      borderRadius: BorderRadius.circular(5)),
                                  visualDensity: VisualDensity.compact,
                                  value: membersService.maleValue,
                                  checkColor: kwhiteColor,
                                  activeColor: kborderColor,
                                  onChanged: (bool? value) {
                                    membersService.setGenderMale(value!);
                                  },
                                ),
                                Text(
                                  'Male',
                                  style: TextStyle(
                                    fontFamily: 'Inter',
                                    fontSize: 13,
                                    color: kblackColor,
                                    fontWeight: FontWeight.w400,
                                  ),
                                )
                              ],
                            ),
                          ],
                        ),
                      ),
                      Container(
                        margin: const EdgeInsets.symmetric(vertical: 5),
                        padding: const EdgeInsets.symmetric(
                            horizontal: 10, vertical: 10),
                        width: MediaQuery.of(context).size.width * 0.88,
                        decoration: BoxDecoration(
                          color: kwhiteColor,
                          borderRadius: BorderRadius.circular(5.0),
                          border: Border.all(
                            color: kborderColor,
                          ),
                        ),
                        child: Column(
                          crossAxisAlignment: CrossAxisAlignment.start,
                          children: [
                            Padding(
                              padding: const EdgeInsets.only(
                                  left: 11.0, top: 3, bottom: 3),
                              child: Text('Marital Status',
                                  style: TextStyle(
                                    fontFamily: 'Inter',
                                    fontSize: 13,
                                    color: kblackColor,
                                    fontWeight: FontWeight.w600,
                                  )),
                            ),
                            Row(
                              children: [
                                Checkbox(
                                  side:
                                      BorderSide(color: kborderColor, width: 2),
                                  shape: RoundedRectangleBorder(
                                      borderRadius: BorderRadius.circular(5)),
                                  visualDensity: VisualDensity.compact,
                                  checkColor: kwhiteColor,
                                  activeColor: kborderColor,
                                  value:
                                      membersService.maritalStatusMarriedValue,
                                  onChanged: (bool? value) {
                                    membersService
                                        .setMaritalStatusMarried(value!);
                                  },
                                ),
                                Text(
                                  'Married',
                                  style: TextStyle(
                                    fontFamily: 'Inter',
                                    fontSize: 13,
                                    color: kblackColor,
                                    fontWeight: FontWeight.w400,
                                  ),
                                )
                              ],
                            ),
                            Row(
                              children: [
                                Checkbox(
                                  side:
                                      BorderSide(color: kborderColor, width: 2),
                                  shape: RoundedRectangleBorder(
                                      borderRadius: BorderRadius.circular(5)),
                                  visualDensity: VisualDensity.compact,
                                  value: membersService
                                      .maritalStatusUnmarriedValue,
                                  checkColor: kwhiteColor,
                                  activeColor: kborderColor,
                                  onChanged: (bool? value) {
                                    membersService
                                        .setMaritalStatusUnmarried(value!);
                                  },
                                ),
                                Text(
                                  'Unmarried',
                                  style: TextStyle(
                                    fontFamily: 'Inter',
                                    fontSize: 13,
                                    color: kblackColor,
                                    fontWeight: FontWeight.w400,
                                  ),
                                )
                              ],
                            ),
                          ],
                        ),
                      ),
                      // Container(
                      //   margin: const EdgeInsets.symmetric(vertical: 5),
                      //   padding: const EdgeInsets.symmetric(
                      //       horizontal: 10, vertical: 10),
                      //   width: MediaQuery.of(context).size.width * 0.88,
                      //   decoration: BoxDecoration(
                      //     color: kwhiteColor,
                      //     borderRadius: BorderRadius.circular(5.0),
                      //     border: Border.all(
                      //       color: kborderColor,
                      //     ),
                      //   ),
                      //   child: Column(
                      //     crossAxisAlignment: CrossAxisAlignment.start,
                      //     children: [
                      //       Padding(
                      //         padding: const EdgeInsets.only(
                      //             left: 11.0, top: 3, bottom: 3),
                      //         child: Text('Profession and Job',
                      //             style: TextStyle(
                      //               fontFamily: 'Inter',
                      //               fontSize: 13,
                      //               color: kblackColor,
                      //               fontWeight: FontWeight.w600,
                      //             )),
                      //       ),
                      //       Row(
                      //         children: [
                      //           Checkbox(
                      //             side:
                      //                 BorderSide(color: kborderColor, width: 2),
                      //             shape: RoundedRectangleBorder(
                      //                 borderRadius: BorderRadius.circular(5)),
                      //             visualDensity: VisualDensity.compact,
                      //             checkColor: kwhiteColor,
                      //             activeColor: kborderColor,
                      //             value: membersService.profBusinessValue,
                      //             onChanged: (bool? value) {
                      //               membersService.setProfBusiness(value!);
                      //             },
                      //           ),
                      //           Text(
                      //             'Business',
                      //             style: TextStyle(
                      //               fontFamily: 'Inter',
                      //               fontSize: 13,
                      //               color: kblackColor,
                      //               fontWeight: FontWeight.w400,
                      //             ),
                      //           )
                      //         ],
                      //       ),
                      //       Row(
                      //         children: [
                      //           Checkbox(
                      //             side:
                      //                 BorderSide(color: kborderColor, width: 2),
                      //             shape: RoundedRectangleBorder(
                      //                 borderRadius: BorderRadius.circular(5)),
                      //             visualDensity: VisualDensity.compact,
                      //             value: membersService.profJobValue,
                      //             checkColor: kwhiteColor,
                      //             activeColor: kborderColor,
                      //             onChanged: (bool? value) {
                      //               membersService.setProfJob(value!);
                      //             },
                      //           ),
                      //           Text(
                      //             'Job',
                      //             style: TextStyle(
                      //               fontFamily: 'Inter',
                      //               fontSize: 13,
                      //               color: kblackColor,
                      //               fontWeight: FontWeight.w400,
                      //             ),
                      //           )
                      //         ],
                      //       ),
                      //     ],
                      //   ),
                      // )
                    ],
                  ),
                ),
                Container(
                  margin: const EdgeInsets.only(top: 15, left: 20, right: 20),
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    mainAxisSize: MainAxisSize.min,
                    mainAxisAlignment: MainAxisAlignment.start,
                    children: [
                      Container(
                        margin: const EdgeInsets.only(top: 15),
                        child: Text(
                          "Member Name",
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
                          onChanged: (value) {
                            membersService.setMemberName(value);
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
                          "Education",
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
                          onChanged: (value) {
                            membersService.setEducation(value);
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
                      // Container(
                      //   margin: const EdgeInsets.only(top: 15),
                      //   child: Text(
                      //     "Phone Number",
                      //     style: TextStyle(
                      //         fontFamily: 'Roboto',
                      //         fontSize: 16,
                      //         color: kblackColor),
                      //   ),
                      // ),
                      // Container(
                      //   margin: EdgeInsets.only(top: 5),
                      //   // height: 40,
                      //   child: TextFormField(
                      //     // initialValue: matrimonyDetailService.myMatrinomyData["a"],
                      //     decoration: _commonInputDecoration(context),
                      //     maxLines: 1,
                      //     onChanged: (value) {
                      //       membersService.setPhone(value);
                      //     },
                      //     // validator: (value) {
                      //     //   if (value == null || value.isEmpty) {
                      //     //     return 'Please enter your password';
                      //     //   }
                      //     //   return null;
                      //     // },
                      //     // onSaved: (value) {
                      //     //   _password = value!;
                      //     // },
                      //   ),
                      // ),

                      Container(
                        margin: const EdgeInsets.only(top: 15),
                        child: Text(
                          "Profession Name",
                          style: TextStyle(
                              fontFamily: 'Roboto',
                              fontSize: 16,
                              color: kblackColor),
                        ),
                      ),

                      Container(
                        // margin: const EdgeInsets.all(1.0),
                        padding:
                            EdgeInsets.symmetric(horizontal: 10, vertical: 6),
                        decoration: BoxDecoration(
                          borderRadius: BorderRadius.circular(10),
                          border: Border.all(
                            color: ktextInputBorderColor,
                            width: 2,
                          ),
                        ),
                        child: DropdownButtonHideUnderline(
                          child: DropdownButton<String>(
                            isExpanded: true,
                            isDense: true,
                            borderRadius: BorderRadius.circular(10),
                            value: membersService.getProfession,
                            onChanged: (String? newValue) {
                              membersService.setProfession(newValue ?? "");
                            },
                            items: dropdownOptions.map((String option) {
                              return DropdownMenuItem<String>(
                                value: option,
                                child: Text(option),
                              );
                            }).toList(),
                          ),
                        ),
                      ),
                      Container(
                        margin: const EdgeInsets.only(top: 15),
                        child: Text(
                          "Gotrej",
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
                          onChanged: (value) {
                            membersService.setGotRej(value);
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
                          "District",
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
                          onChanged: (value) {
                            membersService.setNative(value);
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
                    ],
                  ),
                ),
                InkWell(
                  onTap: () {
                    membersService.filterList();
                  },
                  child: Container(
                    height: 35,
                    margin: const EdgeInsets.only(
                        left: 25, right: 25, top: 50, bottom: 20),
                    decoration: BoxDecoration(
                      color: kyellowColor,
                      borderRadius:
                          const BorderRadius.all(Radius.circular(5.0)),
                    ),
                    child: Center(
                      child: Text(
                        "Search",
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
                FutureBuilder(
                  future: membersService.membersList.isEmpty
                      ? Provider.of<MembersListProvider>(context, listen: false)
                          .getMemberList()
                      : null,
                  builder: (context, snapshot) {
                    if (snapshot.connectionState == ConnectionState.waiting) {
                      return Column(
                        children: [
                          const SizedBox(height: 60),
                          Center(
                              child: CircularProgressIndicator(
                            color: kpurpleColor,
                          )),
                          const SizedBox(height: 60),
                        ],
                      );
                    } else if (snapshot.hasError) {
                      return const Center(
                          child: Text(
                              "An error occurred while fetching matrimony data"));
                    } else {
                      // final eventsData = snapshot.data;
                      print('snapshot.data is');
                      print(snapshot.data);
                      return Padding(
                        padding: const EdgeInsets.only(left: 8, right: 8),
                        child: ListView.builder(
                            itemCount: membersService.membersList.length,
                            physics: const NeverScrollableScrollPhysics(),
                            shrinkWrap: true,
                            itemBuilder: (context, index) {
                              return Container(
                                padding: const EdgeInsets.symmetric(
                                    horizontal: 10, vertical: 10),
                                margin: EdgeInsets.only(bottom: 15),
                                // height: 500,
                                decoration: BoxDecoration(
                                  color: kwhiteColor,
                                  borderRadius: BorderRadius.circular(5.0),
                                  border: Border.all(
                                    color: kborderColor,
                                  ),
                                ),
                                child: Column(
                                  // mainAxisAlignment: MainAxisAlignment.start,
                                  children: [
                                    Row(
                                      crossAxisAlignment:
                                          CrossAxisAlignment.start,
                                      mainAxisAlignment:
                                          MainAxisAlignment.spaceBetween,
                                      children: [
                                        Column(
                                          crossAxisAlignment:
                                              CrossAxisAlignment.start,
                                          // mainAxisAlignment: MainAxisAlignment.start,
                                          children: [
                                            Text(
                                              membersService.membersList[index]
                                                      ["name"] ??
                                                  'Name',
                                              style: TextStyle(
                                                  fontFamily: 'Roboto',
                                                  fontSize: 15,
                                                  color: kblackColor),
                                            ),
                                            const SizedBox(
                                              height: 3,
                                            ),
                                            Text(
                                              "Relation : ${membersService.membersList[index]["relation"]}",
                                              style: TextStyle(
                                                  fontFamily: 'Roboto',
                                                  fontSize: 12,
                                                  color: kblackColor),
                                            ),
                                          ],
                                        ),
                                        // Container(
                                        //   padding: const EdgeInsets.symmetric(
                                        //       horizontal: 20, vertical: 4),
                                        //   decoration: BoxDecoration(
                                        //     color: kyellowColor,
                                        //     borderRadius:
                                        //         BorderRadius.circular(5.0),
                                        //   ),
                                        //   child: Row(
                                        //     children: [
                                        //       Text(
                                        //         "Edit",
                                        //         style: TextStyle(
                                        //             fontFamily: 'Roboto',
                                        //             fontSize: 12,
                                        //             color: kblackColor),
                                        //       ),
                                        //       const SizedBox(
                                        //         width: 5,
                                        //       ),
                                        //       SvgPicture.asset(
                                        //         "assets/images/edit.svg",
                                        //         height: 15,
                                        //       )
                                        //     ],
                                        //   ),
                                        // )
                                      ],
                                    ),
                                    Container(
                                      margin: EdgeInsets.only(
                                          right: MediaQuery.of(context)
                                                  .size
                                                  .width *
                                              0.10,
                                          top: 12,
                                          bottom: 3),
                                      child: Row(
                                        // mainAxisAlignment: MainAxisAlignment.start,
                                        children: [
                                          Container(
                                            width: 220,
                                            // padding: EdgeInsets.only(right),
                                            child: Row(
                                              children: [
                                                Image.asset(
                                                    "assets/images/phone.png"),
                                                const SizedBox(
                                                  width: 5,
                                                ),
                                                Text(
                                                  membersService
                                                      .membersList[index]
                                                          ["phone"]
                                                      .toString(),
                                                  style: TextStyle(
                                                      fontFamily: 'Roboto',
                                                      fontSize: 14,
                                                      color: kblackColor),
                                                )
                                              ],
                                            ),
                                          ),
                                          // SizedBox(
                                          //   width: MediaQuery.of(context).size.width * 0.27,
                                          // ),
                                          Row(
                                            children: [
                                              Image.asset(
                                                  "assets/images/blood_group.png"),
                                              const SizedBox(
                                                width: 5,
                                              ),
                                              Text(
                                                membersService
                                                            .membersList[index]
                                                        ["blood_group"] ??
                                                    "NA",
                                                style: TextStyle(
                                                    fontFamily: 'Roboto',
                                                    fontSize: 14,
                                                    color: kblackColor),
                                              )
                                            ],
                                          ),
                                        ],
                                      ),
                                    ),
                                    Container(
                                      margin: EdgeInsets.only(
                                          right: MediaQuery.of(context)
                                                  .size
                                                  .width *
                                              0.10,
                                          top: 8,
                                          bottom: 3),
                                      child: Row(
                                        // mainAxisAlignment: MainAxisAlignment.spaceBetween,
                                        children: [
                                          Container(
                                            width: 218,
                                            child: Row(
                                              children: [
                                                SvgPicture.asset(
                                                    "assets/images/calendar_icon.svg"),
                                                const SizedBox(
                                                  width: 5,
                                                ),
                                                Text(
                                                  membersService.membersList[
                                                          index]["dob"] ??
                                                      "NA",
                                                  style: TextStyle(
                                                      fontFamily: 'Roboto',
                                                      fontSize: 14,
                                                      color: kblackColor),
                                                )
                                              ],
                                            ),
                                          ),
                                          // SizedBox(
                                          //   width: MediaQuery.of(context).size.width * 0.28,
                                          // ),
                                          Row(
                                            mainAxisSize: MainAxisSize.max,
                                            // crossAxisAlignment: CrossAxisAlignment.start,
                                            mainAxisAlignment:
                                                MainAxisAlignment.start,
                                            children: [
                                              SvgPicture.asset(
                                                  "assets/images/gender.svg"),
                                              const SizedBox(
                                                width: 3,
                                              ),
                                              Text(
                                                membersService
                                                            .membersList[index]
                                                        ["gender"] ??
                                                    "NA",
                                                style: TextStyle(
                                                    fontFamily: 'Roboto',
                                                    fontSize: 14,
                                                    color: kblackColor),
                                              ),
                                            ],
                                          ),
                                        ],
                                      ),
                                    ),
                                    Container(
                                      margin: EdgeInsets.only(
                                          // right: MediaQuery.of(context)
                                          //         .size
                                          //         .width *
                                          //     0.10,
                                          top: 8,
                                          bottom: 3),
                                      child: Row(
                                        // mainAxisAlignment: MainAxisAlignment.spaceBetween,
                                        children: [
                                          Container(
                                            width: 220,
                                            child: Row(
                                              children: [
                                                Image.asset(
                                                    "assets/images/maritial_status.png"),
                                                const SizedBox(
                                                  width: 5,
                                                ),
                                                Text(
                                                  membersService.membersList[
                                                              index]
                                                          ["maritial_status"] ??
                                                      "NA",
                                                  style: TextStyle(
                                                      fontFamily: 'Roboto',
                                                      fontSize: 14,
                                                      color: kblackColor),
                                                )
                                              ],
                                            ),
                                          ),
                                          // SizedBox(
                                          //   width: MediaQuery.of(context).size.width * 0.28,
                                          // ),
                                          Row(
                                            mainAxisSize: MainAxisSize.max,
                                            // crossAxisAlignment: CrossAxisAlignment.start,
                                            mainAxisAlignment:
                                                MainAxisAlignment.start,
                                            children: [
                                              Image.asset(
                                                  "assets/images/village.png"),
                                              const SizedBox(
                                                width: 5,
                                              ),
                                              Text(
                                                membersService
                                                            .membersList[index]
                                                        ["native_village"] ??
                                                    "NA",
                                                style: TextStyle(
                                                    fontFamily: 'Roboto',
                                                    fontSize: 14,
                                                    color: kblackColor),
                                              ),
                                            ],
                                          ),
                                        ],
                                      ),
                                    ),
                                    Container(
                                      margin: EdgeInsets.only(
                                          // right: MediaQuery.of(context)
                                          //         .size
                                          //         .width *
                                          //     0.10,
                                          top: 8,
                                          bottom: 3),
                                      child: Row(
                                        children: [
                                          Container(
                                            width: 218,
                                            child: Row(
                                              children: [
                                                SvgPicture.asset(
                                                    "assets/images/education.svg"),
                                                const SizedBox(
                                                  width: 5,
                                                ),
                                                Text(
                                                  membersService.membersList[
                                                          index]["education"] ??
                                                      "NA",
                                                  style: TextStyle(
                                                      fontFamily: 'Roboto',
                                                      fontSize: 14,
                                                      color: kblackColor),
                                                )
                                              ],
                                            ),
                                          ),
                                          Row(
                                            mainAxisSize: MainAxisSize.max,
                                            // crossAxisAlignment: CrossAxisAlignment.start,
                                            mainAxisAlignment:
                                                MainAxisAlignment.start,
                                            children: [
                                              SizedBox(
                                                width: 2,
                                              ),
                                              Image.asset(
                                                  "assets/images/village.png"),
                                              const SizedBox(
                                                width: 5,
                                              ),
                                              Text(
                                                membersService
                                                            .membersList[index]
                                                        ["gotrej"] ??
                                                    "NA",
                                                style: TextStyle(
                                                    fontFamily: 'Roboto',
                                                    fontSize: 14,
                                                    color: kblackColor),
                                              ),
                                            ],
                                          ),
                                        ],
                                      ),
                                    ),
                                    Container(
                                      margin: EdgeInsets.only(
                                          right: MediaQuery.of(context)
                                                  .size
                                                  .width *
                                              0.10,
                                          top: 8,
                                          bottom: 3),
                                      child: Row(
                                        children: [
                                          Icon(
                                            CupertinoIcons.briefcase,
                                            color: kblackColor,
                                            size: 18.0,
                                          ),
                                          const SizedBox(
                                            width: 5,
                                          ),
                                          Text(
                                            membersService.membersList[index]
                                                    ["profession_status"] ??
                                                "NA",
                                            style: TextStyle(
                                                fontFamily: 'Roboto',
                                                fontSize: 14,
                                                color: kblackColor),
                                          )
                                        ],
                                      ),
                                    ),
                                    Container(
                                      margin: EdgeInsets.only(
                                          right: MediaQuery.of(context)
                                                  .size
                                                  .width *
                                              0.10,
                                          top: 8),
                                      child: Row(
                                        children: [
                                          SvgPicture.asset(
                                              "assets/images/professional_name.svg"),
                                          const SizedBox(
                                            width: 5,
                                          ),
                                          Text(
                                            membersService.membersList[index]
                                                    ["profession_name"] ??
                                                "NA",
                                            style: TextStyle(
                                                fontFamily: 'Roboto',
                                                fontSize: 14,
                                                color: kblackColor),
                                          )
                                        ],
                                      ),
                                    ),
                                  ],
                                ),
                              );
                            }),
                      );
                    }
                  },
                )
              ],
            ),
          ),
        ],
      )),
    );
  }
}
