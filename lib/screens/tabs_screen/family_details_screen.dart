import 'package:community/constants/colors.dart';
import 'package:community/constants/paths.dart';
import 'package:community/provider/family_detail_service.dart';
import 'package:community/screens/forms/edit_family_details.dart';
import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:flutter_svg/flutter_svg.dart';
import 'package:provider/provider.dart';
import 'package:pull_to_refresh/pull_to_refresh.dart';

class FamilyDetailsScreen extends StatefulWidget {
  const FamilyDetailsScreen({super.key});

  @override
  State<FamilyDetailsScreen> createState() => _FamilyDetailsScreenState();
}

class _FamilyDetailsScreenState extends State<FamilyDetailsScreen> {
  InputDecoration _commonInputDecoration() {
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
    final familyDetailService = Provider.of<FamilyDetailProvider>(context);
    return Scaffold(
      backgroundColor: kwhiteColor,
      appBar: AppBar(
        backgroundColor: kwhiteColor,
        elevation: 0,
        actions: [
          Padding(
            padding: const EdgeInsets.only(right: 15.0, top: 15),
            child: SvgPicture.asset(
              "assets/images/forward.svg",
            ),
          ),
        ],
      ),
      body: ListView(
          // shrinkWrap: true,
          physics: BouncingScrollPhysics(parent: AlwaysScrollableScrollPhysics()),
          children: [
            Container(
              child: Text(
                "Family Details",
                textAlign: TextAlign.center,
                style: TextStyle(
                  color: kbrownColor,
                  fontSize: 24,
                  fontWeight: FontWeight.w700,
                  fontFamily: "Raleway",
                ),
              ),
            ),
            FutureBuilder(
                future: familyDetailService.memberDetails.isEmpty
                    ? Provider.of<FamilyDetailProvider>(context, listen: false).fetchFamilyDetails()
                    : null,
                builder: (context, snapshot) {
                  if (snapshot.connectionState == ConnectionState.waiting) {
                    return Container(
                        margin: const EdgeInsets.only(top: 20),
                        child: const Center(child: CircularProgressIndicator()));
                  } else if (snapshot.hasError) {
                    return Center(
                        child: Text(
                      "An error occurred while fetching family details.",
                      textAlign: TextAlign.center,
                      style: TextStyle(color: kblackColor),
                    ));
                  } else {
                    return ListView(
                      physics: NeverScrollableScrollPhysics(),
                      shrinkWrap: true,
                      children: [
                        Container(
                          margin: EdgeInsets.only(right: 20, left: 20, top: 20),
                          child: Column(
                            crossAxisAlignment: CrossAxisAlignment.start,
                            children: [
                              Text(
                                "Home Address",
                                style: TextStyle(
                                  color: kbrownColor,
                                  fontFamily: "Roboto",
                                  fontSize: 16,
                                ),
                              ),
                              Container(
                                margin: const EdgeInsets.only(top: 5),
                                child: Text(
                                  familyDetailService.homeAddress,
                                  style: TextStyle(
                                    color: kblackColor,
                                    fontFamily: "Roboto",
                                    fontSize: 14,
                                  ),
                                ),
                              )
                            ],
                          ),
                        ),
                        Container(
                          margin: EdgeInsets.only(right: 20, left: 20, top: 20),
                          child: Column(
                            crossAxisAlignment: CrossAxisAlignment.start,
                            children: [
                              Text(
                                "Gotrej",
                                style: TextStyle(
                                  color: kbrownColor,
                                  fontFamily: "Roboto",
                                  fontSize: 16,
                                ),
                              ),
                              Container(
                                margin: const EdgeInsets.only(top: 5),
                                child: Text(
                                  familyDetailService.gotrej,
                                  style: TextStyle(
                                    color: kblackColor,
                                    fontFamily: "Roboto",
                                    fontSize: 14,
                                  ),
                                ),
                              )
                            ],
                          ),
                        ),
                        Container(
                          margin: EdgeInsets.only(right: 20, left: 20, top: 20),
                          child: Column(
                            crossAxisAlignment: CrossAxisAlignment.start,
                            children: [
                              Text(
                                "Occupation Address",
                                style: TextStyle(
                                  color: kbrownColor,
                                  fontFamily: "Roboto",
                                  fontSize: 16,
                                ),
                              ),
                              ListView.builder(
                                  itemCount: familyDetailService.occupationAddreess.length,
                                  physics: const NeverScrollableScrollPhysics(),
                                  shrinkWrap: true,
                                  itemBuilder: (context, index) {
                                    return Container(
                                      margin: const EdgeInsets.only(top: 5),
                                      child: Text(
                                        familyDetailService.occupationAddreess[index]["occupation_address"],
                                        style: TextStyle(
                                          color: kblackColor,
                                          fontFamily: "Roboto",
                                          fontSize: 14,
                                        ),
                                      ),
                                    );
                                  })
                            ],
                          ),
                        ),
                        InkWell(
                          onTap: () {
                            Navigator.push(context, MaterialPageRoute(builder: (context) {
                              return EditFamilyDetailsForm();
                            }));
                          },
                          child: Container(
                            margin: EdgeInsets.only(top: 15, right: MediaQuery.of(context).size.width * 0.5, left: 20),
                            padding: EdgeInsets.symmetric(vertical: 8),
                            // width: 250,
                            // height: 25,
                            // margin: EdgeInsets.symmetric(horizontal: ),
                            decoration: BoxDecoration(
                              color: kyellowColor,
                              borderRadius: BorderRadius.circular(5.0),
                            ),
                            child: Text(
                              "Edit Family Details",
                              textAlign: TextAlign.center,
                              style: TextStyle(fontFamily: 'Roboto', fontSize: 13, color: kblackColor),
                            ),
                          ),
                        ),
                        Container(
                          margin: const EdgeInsets.only(top: 15),
                          child: Row(
                            mainAxisAlignment: MainAxisAlignment.spaceBetween,
                            children: [
                              Container(
                                  margin: const EdgeInsets.only(left: 20),
                                  child: Text(
                                    "List of members",
                                    textAlign: TextAlign.center,
                                    style: TextStyle(
                                      fontFamily: 'Roboto',
                                      fontSize: 15,
                                      color: kblackColor,
                                      fontWeight: FontWeight.w700,
                                    ),
                                  )),
                              InkWell(
                                child: Container(
                                  margin: const EdgeInsets.only(right: 20),
                                  padding: const EdgeInsets.symmetric(horizontal: 15, vertical: 8),
                                  decoration: BoxDecoration(
                                    color: kyellowColor,
                                    borderRadius: BorderRadius.circular(5.0),
                                  ),
                                  child: Text(
                                    "Add member + ",
                                    textAlign: TextAlign.center,
                                    style: TextStyle(
                                      fontFamily: 'Roboto',
                                      fontSize: 12,
                                      color: kblackColor,
                                    ),
                                  ),
                                ),
                              ),
                            ],
                          ),
                        ),
                        Container(
                          margin: EdgeInsets.symmetric(horizontal: 20, vertical: 20),
                          child: ListView.builder(
                            itemCount: familyDetailService.memberDetails.length,
                            shrinkWrap: true,
                            physics: const NeverScrollableScrollPhysics(),
                            itemBuilder: (context, index) {
                              return Container(
                                padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 10),
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
                                      crossAxisAlignment: CrossAxisAlignment.start,
                                      mainAxisAlignment: MainAxisAlignment.spaceBetween,
                                      children: [
                                        Column(
                                          crossAxisAlignment: CrossAxisAlignment.start,
                                          // mainAxisAlignment: MainAxisAlignment.start,
                                          children: [
                                            Text(
                                              familyDetailService.memberDetails[index]["username"],
                                              style: TextStyle(fontFamily: 'Roboto', fontSize: 15, color: kblackColor),
                                            ),
                                            const SizedBox(
                                              height: 3,
                                            ),
                                            Text(
                                              "Relation : ${familyDetailService.memberDetails[index]["relation"]}",
                                              style: TextStyle(fontFamily: 'Roboto', fontSize: 12, color: kblackColor),
                                            ),
                                          ],
                                        ),
                                        Container(
                                          padding: const EdgeInsets.symmetric(horizontal: 20, vertical: 4),
                                          decoration: BoxDecoration(
                                            color: kyellowColor,
                                            borderRadius: BorderRadius.circular(5.0),
                                          ),
                                          child: Row(
                                            children: [
                                              Text(
                                                "Edit",
                                                style:
                                                    TextStyle(fontFamily: 'Roboto', fontSize: 12, color: kblackColor),
                                              ),
                                              const SizedBox(
                                                width: 5,
                                              ),
                                              SvgPicture.asset(
                                                "assets/images/edit.svg",
                                                height: 15,
                                              )
                                            ],
                                          ),
                                        )
                                      ],
                                    ),
                                    Container(
                                      margin: EdgeInsets.only(
                                          right: MediaQuery.of(context).size.width * 0.10, top: 12, bottom: 3),
                                      child: Row(
                                        // mainAxisAlignment: MainAxisAlignment.start,
                                        children: [
                                          Container(
                                            width: 220,
                                            // padding: EdgeInsets.only(right),
                                            child: Row(
                                              children: [
                                                Image.asset("assets/images/phone.png"),
                                                const SizedBox(
                                                  width: 5,
                                                ),
                                                Text(
                                                  familyDetailService.memberDetails[index]["phone"].toString(),
                                                  style:
                                                      TextStyle(fontFamily: 'Roboto', fontSize: 14, color: kblackColor),
                                                )
                                              ],
                                            ),
                                          ),
                                          // SizedBox(
                                          //   width: MediaQuery.of(context).size.width * 0.27,
                                          // ),
                                          Row(
                                            children: [
                                              Image.asset("assets/images/blood_group.png"),
                                              const SizedBox(
                                                width: 5,
                                              ),
                                              Text(
                                                familyDetailService.memberDetails[index]["blood_group"] ?? "NA",
                                                style:
                                                    TextStyle(fontFamily: 'Roboto', fontSize: 14, color: kblackColor),
                                              )
                                            ],
                                          ),
                                        ],
                                      ),
                                    ),
                                    Container(
                                      margin: EdgeInsets.only(
                                          right: MediaQuery.of(context).size.width * 0.10, top: 8, bottom: 3),
                                      child: Row(
                                        // mainAxisAlignment: MainAxisAlignment.spaceBetween,
                                        children: [
                                          Container(
                                            width: 218,
                                            child: Row(
                                              children: [
                                                SvgPicture.asset("assets/images/calendar_icon.svg"),
                                                const SizedBox(
                                                  width: 5,
                                                ),
                                                Text(
                                                  familyDetailService.memberDetails[index]["dob"] ?? "NA",
                                                  style:
                                                      TextStyle(fontFamily: 'Roboto', fontSize: 14, color: kblackColor),
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
                                            mainAxisAlignment: MainAxisAlignment.start,
                                            children: [
                                              SvgPicture.asset("assets/images/gender.svg"),
                                              const SizedBox(
                                                width: 3,
                                              ),
                                              Text(
                                                familyDetailService.memberDetails[index]["gender"] ?? "NA",
                                                style:
                                                    TextStyle(fontFamily: 'Roboto', fontSize: 14, color: kblackColor),
                                              ),
                                            ],
                                          ),
                                        ],
                                      ),
                                    ),
                                    Container(
                                      margin: EdgeInsets.only(
                                          right: MediaQuery.of(context).size.width * 0.10, top: 8, bottom: 3),
                                      child: Row(
                                        // mainAxisAlignment: MainAxisAlignment.spaceBetween,
                                        children: [
                                          Container(
                                            width: 220,
                                            child: Row(
                                              children: [
                                                Image.asset("assets/images/maritial_status.png"),
                                                const SizedBox(
                                                  width: 5,
                                                ),
                                                Text(
                                                  familyDetailService.memberDetails[index]["maritial_status"] ?? "NA",
                                                  style:
                                                      TextStyle(fontFamily: 'Roboto', fontSize: 14, color: kblackColor),
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
                                            mainAxisAlignment: MainAxisAlignment.start,
                                            children: [
                                              Image.asset("assets/images/village.png"),
                                              const SizedBox(
                                                width: 5,
                                              ),
                                              Text(
                                                familyDetailService.memberDetails[index]["native_village"] ?? "NA",
                                                style:
                                                    TextStyle(fontFamily: 'Roboto', fontSize: 14, color: kblackColor),
                                              ),
                                            ],
                                          ),
                                        ],
                                      ),
                                    ),
                                    Container(
                                      margin: EdgeInsets.only(
                                          right: MediaQuery.of(context).size.width * 0.10, top: 8, bottom: 3),
                                      child: Row(
                                        children: [
                                          SvgPicture.asset("assets/images/education.svg"),
                                          const SizedBox(
                                            width: 5,
                                          ),
                                          Text(
                                            familyDetailService.memberDetails[index]["education"] ?? "NA",
                                            style: TextStyle(fontFamily: 'Roboto', fontSize: 14, color: kblackColor),
                                          )
                                        ],
                                      ),
                                    ),
                                    Container(
                                      margin: EdgeInsets.only(
                                          right: MediaQuery.of(context).size.width * 0.10, top: 8, bottom: 3),
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
                                            familyDetailService.memberDetails[index]["profession_status"] ?? "NA",
                                            style: TextStyle(fontFamily: 'Roboto', fontSize: 14, color: kblackColor),
                                          )
                                        ],
                                      ),
                                    ),
                                    Container(
                                      margin: EdgeInsets.only(right: MediaQuery.of(context).size.width * 0.10, top: 8),
                                      child: Row(
                                        children: [
                                          SvgPicture.asset("assets/images/professional_name.svg"),
                                          const SizedBox(
                                            width: 5,
                                          ),
                                          Text(
                                            familyDetailService.memberDetails[index]["profession_name"] ?? "NA",
                                            style: TextStyle(fontFamily: 'Roboto', fontSize: 14, color: kblackColor),
                                          )
                                        ],
                                      ),
                                    ),
                                  ],
                                ),
                              );
                            },
                          ),
                        ),
                      ],
                    );
                  }
                })
          ]),
    );
  }
}
