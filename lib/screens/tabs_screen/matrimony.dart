import 'package:community/constants/colors.dart';
import 'package:community/constants/paths.dart'; //u
import 'package:community/provider/matrimony_service.dart';
import 'package:community/screens/forms/edit_matrimony_details.dart';
import 'package:flutter/material.dart';
import 'package:flutter_svg/flutter_svg.dart';
import 'package:provider/provider.dart';
import 'package:url_launcher/url_launcher.dart';

class Matrimony extends StatelessWidget {
  const Matrimony({super.key});

  @override
  Widget build(BuildContext context) {
    final matrimonyService = Provider.of<MatrimonyDetailProvider>(context);

    return Scaffold(
      // appBar: AppBar(backgroundColor: kwhiteColor, elevation: 0, actions: [
      //   Padding(
      //     padding: const EdgeInsets.only(right: 15.0, top: 15),
      //     child: SvgPicture.asset("assets/images/forward.svg"),
      //   ),
      // ]),
      body: Container(
        color: kwhiteColor,
        child: ListView(
          children: [
            Column(
              crossAxisAlignment: CrossAxisAlignment.center,
              children: [
                Padding(
                  padding: const EdgeInsets.only(top: 38.0),
                  child: Text(
                    "Matrimonial Search",
                    textAlign: TextAlign.center,
                    style: TextStyle(
                      fontFamily: "Raleway",
                      fontWeight: FontWeight.w700,
                      fontSize: 18,
                      color: kbrownColor,
                    ),
                  ),
                ),
                InkWell(
                  onTap: () {
                    Navigator.push(context,
                        MaterialPageRoute(builder: (context) {
                      return EditMatrimonyDetailsForm();
                    }));
                  },
                  child: Container(
                    margin: EdgeInsets.only(top: 15),
                    padding: EdgeInsets.symmetric(vertical: 8, horizontal: 12),
                    // width: 250,
                    // height: 25,
                    // margin: EdgeInsets.symmetric(horizontal: ),
                    decoration: BoxDecoration(
                      color: kpurpleColor,
                      borderRadius: BorderRadius.circular(5.0),
                    ),
                    child: Text(
                      "Register for Matrimonial",
                      textAlign: TextAlign.center,
                      style: TextStyle(
                          fontFamily: 'Roboto',
                          fontSize: 15,
                          color: kwhiteColor),
                    ),
                  ),
                ),

                FutureBuilder(
                  // self data TODO
                  future: matrimonyService.selfMatrimonyData.isEmpty
                      ? Provider.of<MatrimonyDetailProvider>(context,
                              listen: false)
                          .getSelfMatrimonies()
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
                      print(snapshot.error);
                      print(snapshot.stackTrace);
                      return const Center(
                          child: Text(
                              "An error occurred while fetching matrimony data"));
                    } else {
                      // final eventsData = snapshot.data;
                      return ListView.builder(
                          itemCount: matrimonyService.selfMatrimonyData.length,
                          physics: const NeverScrollableScrollPhysics(),
                          shrinkWrap: true,
                          itemBuilder: (context, index) {
                            return Container(
                              padding: const EdgeInsets.symmetric(
                                  horizontal: 13, vertical: 13),
                              margin: EdgeInsets.symmetric(
                                horizontal: 18,
                                vertical: 20,
                              ),
                              decoration: BoxDecoration(
                                color: kwhiteColor,
                                borderRadius: BorderRadius.circular(10.0),
                                border: Border.all(
                                  color: kpurpleColor,
                                ),
                              ),
                              child: Column(
                                crossAxisAlignment: CrossAxisAlignment.start,
                                children: [
                                  Row(
                                    crossAxisAlignment:
                                        CrossAxisAlignment.start,
                                    children: [
                                      matrimonyService.selfMatrimonyData[index]
                                                  ['picture'] ==
                                              null
                                          ? Image.asset(
                                              'assets/images/profile_icon.png',
                                              width: 65,
                                            )
                                          : CircleAvatar(
                                              radius: 32.5,
                                              backgroundImage: NetworkImage(
                                                  kbaseUrlImage +
                                                      matrimonyService
                                                              .selfMatrimonyData[
                                                          index]['picture']),
                                            ),
                                      SizedBox(
                                        width: 13,
                                      ),
                                      Column(
                                        crossAxisAlignment:
                                            CrossAxisAlignment.start,
                                        children: [
                                          Text(
                                            matrimonyService
                                                    .selfMatrimonyData[index]
                                                ['name'],
                                            style: TextStyle(
                                              fontFamily: 'Roboto',
                                              fontSize: 15,
                                              color: kblackColor,
                                              fontWeight: FontWeight.w400,
                                            ),
                                          ),
                                          SizedBox(
                                            height: 5,
                                          ),
                                          Text(
                                            matrimonyService
                                                .selfMatrimonyData[index]
                                                    ['phone']
                                                .toString(),
                                            style: TextStyle(
                                              fontFamily: 'Roboto',
                                              fontSize: 12,
                                              color: kblackColor,
                                              fontWeight: FontWeight.w400,
                                            ),
                                          ),
                                        ],
                                      ),
                                      const Spacer(),
                                      InkWell(
                                        onTap: () {
                                          Navigator.push(context,
                                              MaterialPageRoute(
                                                  builder: (context) {
                                            return EditMatrimonyDetailsForm(
                                                preFilledData: matrimonyService
                                                    .selfMatrimonyData[index]);
                                          }));
                                        },
                                        child: Container(
                                          padding: const EdgeInsets.symmetric(
                                              horizontal: 18, vertical: 5),
                                          decoration: BoxDecoration(
                                            color: kpurpleColor,
                                            borderRadius:
                                                BorderRadius.circular(5.0),
                                          ),
                                          child: Row(
                                            children: [
                                              Text(
                                                "Edit",
                                                style: TextStyle(
                                                    fontFamily: 'Roboto',
                                                    fontSize: 12,
                                                    color: kwhiteColor),
                                              ),
                                              const SizedBox(
                                                width: 8,
                                              ),
                                              SvgPicture.asset(
                                                "assets/images/edit.svg",
                                                height: 15,
                                                color: kwhiteColor,
                                              )
                                            ],
                                          ),
                                        ),
                                      )
                                    ],
                                  ),
                                  SizedBox(
                                    height: 15,
                                  ),
                                  Row(
                                    children: [
                                      Column(
                                        crossAxisAlignment:
                                            CrossAxisAlignment.start,
                                        children: [
                                          Row(
                                            children: [
                                              Padding(
                                                padding: const EdgeInsets.only(
                                                    top: 0.0),
                                                child: SvgPicture.asset(
                                                  'assets/images/calendar_icon.svg',
                                                  width: 20,
                                                ),
                                              ),
                                              SizedBox(
                                                width: 10,
                                              ),
                                              Text(
                                                matrimonyService
                                                        .selfMatrimonyData[
                                                    index]['dob'],
                                                style: TextStyle(
                                                  fontFamily: 'Roboto',
                                                  fontSize: 12,
                                                  color: kblackColor,
                                                  fontWeight: FontWeight.w400,
                                                ),
                                              ),
                                            ],
                                          ),
                                          SizedBox(
                                            height: 10,
                                          ),
                                          Row(
                                            children: [
                                              Padding(
                                                padding: const EdgeInsets.only(
                                                    top: 0.0),
                                                child: Image.asset(
                                                  'assets/images/phone.png',
                                                  width: 20,
                                                ),
                                              ),
                                              SizedBox(
                                                width: 10,
                                              ),
                                              Text(
                                                matrimonyService
                                                    .selfMatrimonyData[index]
                                                        ['phone']
                                                    .toString(),
                                                style: TextStyle(
                                                  fontFamily: 'Roboto',
                                                  fontSize: 12,
                                                  color: kblackColor,
                                                  fontWeight: FontWeight.w400,
                                                ),
                                              ),
                                            ],
                                          )
                                        ],
                                      ),
                                      SizedBox(
                                        width: 30,
                                      ),
                                      Column(
                                        crossAxisAlignment:
                                            CrossAxisAlignment.start,
                                        children: [
                                          Row(
                                            children: [
                                              Padding(
                                                padding: const EdgeInsets.only(
                                                    top: 2.0),
                                                child: SvgPicture.asset(
                                                  'assets/images/professional_name.svg',
                                                  width: 20,
                                                ),
                                              ),
                                              SizedBox(
                                                width: 10,
                                              ),
                                              Text(
                                                matrimonyService
                                                        .selfMatrimonyData[
                                                    index]['fathers_name'],
                                                style: TextStyle(
                                                  fontFamily: 'Roboto',
                                                  fontSize: 12,
                                                  color: kblackColor,
                                                  fontWeight: FontWeight.w400,
                                                ),
                                              ),
                                            ],
                                          ),
                                          SizedBox(
                                            height: 10,
                                          ),
                                          InkWell(
                                            onTap: () async {
                                              if (matrimonyService
                                                          .selfMatrimonyData[
                                                      index]['biodata'] ==
                                                  null) {
                                                return;
                                              }

                                              Uri _url = Uri.parse(
                                                  kbaseUrlImage +
                                                      matrimonyService
                                                              .selfMatrimonyData[
                                                          index]['biodata']);
                                              print(_url);
                                              bool res = await launchUrl(_url,
                                                  mode: LaunchMode
                                                      .externalApplication);

                                              if (!res) {
                                                ScaffoldMessenger.of(context)
                                                    .showSnackBar(SnackBar(
                                                  content: Text(
                                                      "Couldn\'t open url"),
                                                ));
                                              }
                                            },
                                            child: Row(
                                              children: [
                                                Padding(
                                                  padding:
                                                      const EdgeInsets.only(
                                                          top: 0.0),
                                                  child: SvgPicture.asset(
                                                    'assets/images/briefcase.svg',
                                                    width: 20,
                                                  ),
                                                ),
                                                SizedBox(
                                                  width: 10,
                                                ),
                                                Text(
                                                  matrimonyService.selfMatrimonyData[
                                                                  index]
                                                              ['biodata'] ==
                                                          null
                                                      ? "No Data"
                                                      : "Bio data",
                                                  style: TextStyle(
                                                    fontFamily: 'Roboto',
                                                    fontSize: 12,
                                                    color: kblackColor,
                                                    fontWeight: FontWeight.w400,
                                                    decoration: matrimonyService
                                                                        .selfMatrimonyData[
                                                                    index]
                                                                ['biodata'] ==
                                                            null
                                                        ? TextDecoration.none
                                                        : TextDecoration
                                                            .underline,
                                                  ),
                                                ),
                                              ],
                                            ),
                                          )
                                        ],
                                      )
                                    ],
                                  )
                                ],
                              ),
                            );
                          });
                    }
                  },
                ),

                // FutureBuilder(
                //   future: matrimonyService.myMatrimonyDetails == null
                //       ? Provider.of<MatrimonyDetailProvider>(context,
                //               listen: false)
                //           .getMyMatrimonyDetails()
                //       : null,
                //   builder: (context, snapshot) {
                //     if (snapshot.connectionState == ConnectionState.waiting) {
                //       return Column(
                //         children: [
                //           const SizedBox(height: 60),
                //           Center(
                //               child: CircularProgressIndicator(
                //             color: kpurpleColor,
                //           )),
                //           const SizedBox(height: 60),
                //         ],
                //       );
                //     } else if (snapshot.hasError) {
                //       return const Center(
                //           child: Text(
                //               "An error occurred while fetching matrimony data"));
                //     } else {
                //       return Container(
                //         padding: const EdgeInsets.symmetric(
                //             horizontal: 10, vertical: 10),
                //         margin: EdgeInsets.symmetric(
                //           horizontal: 20,
                //           vertical: 20,
                //         ),
                //         decoration: BoxDecoration(
                //           color: kwhiteColor,
                //           borderRadius: BorderRadius.circular(10.0),
                //           border: Border.all(
                //             color: kpurpleColor,
                //           ),
                //         ),
                //         child: Column(
                //           crossAxisAlignment: CrossAxisAlignment.start,
                //           children: [
                //             Row(
                //               crossAxisAlignment: CrossAxisAlignment.start,
                //               children: [
                //                 Icon(
                //                   Icons.person,
                //                   color: kpurpleColor,
                //                   size: 70,
                //                 ),
                //                 SizedBox(
                //                   width: 10,
                //                 ),
                //                 Column(
                //                   crossAxisAlignment: CrossAxisAlignment.start,
                //                   children: [
                //                     Text(
                //                       matrimonyService
                //                           .myMatrimonyDetails['name'],
                //                       style: TextStyle(
                //                         fontFamily: 'Roboto',
                //                         fontSize: 15,
                //                         color: kblackColor,
                //                         fontWeight: FontWeight.w400,
                //                       ),
                //                     ),
                //                     Text(
                //                       matrimonyService
                //                           .myMatrimonyDetails['phone']
                //                           .toString(),
                //                       style: TextStyle(
                //                         fontFamily: 'Roboto',
                //                         fontSize: 12,
                //                         color: kblackColor,
                //                         fontWeight: FontWeight.w400,
                //                       ),
                //                     ),
                //                   ],
                //                 )
                //               ],
                //             ),
                //             Row(
                //               children: [
                //                 Column(
                //                   crossAxisAlignment: CrossAxisAlignment.start,
                //                   children: [
                //                     Row(
                //                       children: [
                //                         Icon(
                //                           Icons.calendar_today_outlined,
                //                           color: kpurpleColor,
                //                           size: 20,
                //                         ),
                //                         SizedBox(
                //                           width: 10,
                //                         ),
                //                         Text(
                //                           matrimonyService.myMatrimonyDetails[
                //                               'fathers_name'],
                //                           style: TextStyle(
                //                             fontFamily: 'Roboto',
                //                             fontSize: 12,
                //                             color: kblackColor,
                //                             fontWeight: FontWeight.w400,
                //                           ),
                //                         ),
                //                       ],
                //                     ),
                //                     SizedBox(
                //                       height: 10,
                //                     ),
                //                     Row(
                //                       children: [
                //                         Icon(
                //                           Icons.calendar_today_outlined,
                //                           color: kpurpleColor,
                //                           size: 20,
                //                         ),
                //                         SizedBox(
                //                           width: 10,
                //                         ),
                //                         Text(
                //                           matrimonyService.myMatrimonyDetails[
                //                                   'biodata'] ??
                //                               'No data',
                //                           style: TextStyle(
                //                             fontFamily: 'Roboto',
                //                             fontSize: 12,
                //                             color: kblackColor,
                //                             fontWeight: FontWeight.w400,
                //                           ),
                //                         ),
                //                       ],
                //                     )
                //                   ],
                //                 ),
                //                 SizedBox(
                //                   width: 30,
                //                 ),
                //                 Column(
                //                   crossAxisAlignment: CrossAxisAlignment.start,
                //                   children: [
                //                     Row(
                //                       children: [
                //                         Icon(
                //                           Icons.calendar_today_outlined,
                //                           color: kpurpleColor,
                //                           size: 20,
                //                         ),
                //                         SizedBox(
                //                           width: 10,
                //                         ),
                //                         Text(
                //                           'Father Name',
                //                           style: TextStyle(
                //                             fontFamily: 'Roboto',
                //                             fontSize: 12,
                //                             color: kblackColor,
                //                             fontWeight: FontWeight.w400,
                //                           ),
                //                         ),
                //                       ],
                //                     ),
                //                     SizedBox(
                //                       height: 10,
                //                     ),
                //                     Row(
                //                       children: [
                //                         Icon(
                //                           Icons.calendar_today_outlined,
                //                           color: kpurpleColor,
                //                           size: 20,
                //                         ),
                //                         SizedBox(
                //                           width: 10,
                //                         ),
                //                         Text(
                //                           'Bio Data',
                //                           style: TextStyle(
                //                             fontFamily: 'Roboto',
                //                             fontSize: 12,
                //                             color: kblackColor,
                //                             fontWeight: FontWeight.w400,
                //                           ),
                //                         ),
                //                       ],
                //                     )
                //                   ],
                //                 )
                //               ],
                //             )
                //           ],
                //         ),
                //       );
                //     }
                //   },
                // ),

                Theme(
                  data: Theme.of(context)
                      .copyWith(dividerColor: Colors.transparent),
                  child: ExpansionTile(
                    initiallyExpanded: true,
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
                        padding: const EdgeInsets.symmetric(
                            horizontal: 10, vertical: 10),
                        width: MediaQuery.of(context).size.width * 0.8,
                        decoration: BoxDecoration(
                          color: kwhiteColor,
                          borderRadius: BorderRadius.circular(5.0),
                          border: Border.all(
                            color: kpurpleColor,
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
                                      BorderSide(color: kpurpleColor, width: 2),
                                  shape: RoundedRectangleBorder(
                                      borderRadius: BorderRadius.circular(5)),
                                  visualDensity: VisualDensity.compact,
                                  checkColor: kwhiteColor,
                                  activeColor: kpurpleColor,
                                  value: matrimonyService.femaleValue,
                                  onChanged: (bool? value) {
                                    matrimonyService.setValuefirst(value!);
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
                                      BorderSide(color: kpurpleColor, width: 2),
                                  shape: RoundedRectangleBorder(
                                      borderRadius: BorderRadius.circular(5)),
                                  visualDensity: VisualDensity.compact,
                                  value: matrimonyService.malevalue,
                                  checkColor: kwhiteColor,
                                  activeColor: kpurpleColor,
                                  onChanged: (bool? value) {
                                    matrimonyService.setValuesecond(value!);
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
                      )
                    ],
                  ),
                ),
                InkWell(
                  onTap: () {
                    if (matrimonyService.malevalue ==
                        matrimonyService.femaleValue) {
                      ScaffoldMessenger.of(context).showSnackBar(
                        SnackBar(
                          content: Text(
                            "Please select Male or female",
                            style: TextStyle(
                                fontFamily: 'Roboto',
                                fontSize: 16,
                                color: kwhiteColor),
                          ),
                        ),
                      );

                      return;
                    }

                    matrimonyService.clearMatrimonies();
                    matrimonyService.getMatrimonies();
                  },
                  child: Container(
                    margin: EdgeInsets.only(top: 15),
                    padding: EdgeInsets.symmetric(vertical: 8, horizontal: 12),
                    decoration: BoxDecoration(
                      color: kpurpleColor,
                      borderRadius: BorderRadius.circular(5.0),
                    ),
                    child: Text(
                      "Search",
                      textAlign: TextAlign.center,
                      style: TextStyle(
                          fontFamily: 'Roboto',
                          fontSize: 15,
                          color: kwhiteColor),
                    ),
                  ),
                ),
                FutureBuilder(
                  future: matrimonyService.matrimonyData.isEmpty
                      ? Provider.of<MatrimonyDetailProvider>(context,
                              listen: false)
                          .getMatrimonies()
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
                      return ListView.builder(
                          itemCount: matrimonyService.matrimonyData.length,
                          physics: const NeverScrollableScrollPhysics(),
                          shrinkWrap: true,
                          itemBuilder: (context, index) {
                            return Container(
                              padding: const EdgeInsets.symmetric(
                                  horizontal: 13, vertical: 13),
                              margin: EdgeInsets.symmetric(
                                horizontal: 20,
                                vertical: 20,
                              ),
                              decoration: BoxDecoration(
                                color: kwhiteColor,
                                borderRadius: BorderRadius.circular(10.0),
                                border: Border.all(
                                  color: kpurpleColor,
                                ),
                              ),
                              child: Column(
                                crossAxisAlignment: CrossAxisAlignment.start,
                                children: [
                                  Row(
                                    crossAxisAlignment:
                                        CrossAxisAlignment.start,
                                    children: [
                                      matrimonyService.matrimonyData[index]
                                                  ['picture'] ==
                                              null
                                          ? Image.asset(
                                              'assets/images/profile_icon.png',
                                              width: 65,
                                            )
                                          : CircleAvatar(
                                              radius: 32.5,
                                              backgroundImage: NetworkImage(
                                                  kbaseUrlImage +
                                                      matrimonyService
                                                              .matrimonyData[
                                                          index]['picture']),
                                            ),
                                      SizedBox(
                                        width: 13,
                                      ),
                                      Column(
                                        crossAxisAlignment:
                                            CrossAxisAlignment.start,
                                        children: [
                                          Text(
                                            matrimonyService
                                                .matrimonyData[index]['name'],
                                            style: TextStyle(
                                              fontFamily: 'Roboto',
                                              fontSize: 15,
                                              color: kblackColor,
                                              fontWeight: FontWeight.w400,
                                            ),
                                          ),
                                          SizedBox(
                                            height: 5,
                                          ),
                                          Text(
                                            matrimonyService
                                                .matrimonyData[index]['phone']
                                                .toString(),
                                            style: TextStyle(
                                              fontFamily: 'Roboto',
                                              fontSize: 12,
                                              color: kblackColor,
                                              fontWeight: FontWeight.w400,
                                            ),
                                          ),
                                        ],
                                      )
                                    ],
                                  ),
                                  SizedBox(
                                    height: 15,
                                  ),
                                  Row(
                                    children: [
                                      Column(
                                        crossAxisAlignment:
                                            CrossAxisAlignment.start,
                                        children: [
                                          Row(
                                            children: [
                                              Padding(
                                                padding: const EdgeInsets.only(
                                                    top: 0.0),
                                                child: SvgPicture.asset(
                                                  'assets/images/calendar_icon.svg',
                                                  width: 20,
                                                ),
                                              ),
                                              SizedBox(
                                                width: 10,
                                              ),
                                              Text(
                                                matrimonyService
                                                        .matrimonyData[index]
                                                    ['dob'],
                                                style: TextStyle(
                                                  fontFamily: 'Roboto',
                                                  fontSize: 12,
                                                  color: kblackColor,
                                                  fontWeight: FontWeight.w400,
                                                ),
                                              ),
                                            ],
                                          ),
                                          SizedBox(
                                            height: 10,
                                          ),
                                          Row(
                                            children: [
                                              Padding(
                                                padding: const EdgeInsets.only(
                                                    top: 0.0),
                                                child: Image.asset(
                                                  'assets/images/phone.png',
                                                  width: 20,
                                                ),
                                              ),
                                              SizedBox(
                                                width: 10,
                                              ),
                                              Text(
                                                matrimonyService
                                                    .matrimonyData[index]
                                                        ['phone']
                                                    .toString(),
                                                style: TextStyle(
                                                  fontFamily: 'Roboto',
                                                  fontSize: 12,
                                                  color: kblackColor,
                                                  fontWeight: FontWeight.w400,
                                                ),
                                              ),
                                            ],
                                          )
                                        ],
                                      ),
                                      SizedBox(
                                        width: 30,
                                      ),
                                      Column(
                                        crossAxisAlignment:
                                            CrossAxisAlignment.start,
                                        children: [
                                          Row(
                                            children: [
                                              Padding(
                                                padding: const EdgeInsets.only(
                                                    top: 2.0),
                                                child: SvgPicture.asset(
                                                  'assets/images/professional_name.svg',
                                                  width: 20,
                                                ),
                                              ),
                                              SizedBox(
                                                width: 10,
                                              ),
                                              Text(
                                                matrimonyService
                                                        .matrimonyData[index]
                                                    ['fathers_name'],
                                                style: TextStyle(
                                                  fontFamily: 'Roboto',
                                                  fontSize: 12,
                                                  color: kblackColor,
                                                  fontWeight: FontWeight.w400,
                                                ),
                                              ),
                                            ],
                                          ),
                                          SizedBox(
                                            height: 10,
                                          ),
                                          InkWell(
                                            onTap: () async {
                                              if (matrimonyService
                                                          .matrimonyData[index]
                                                      ['biodata'] ==
                                                  null) return;

                                              Uri _url = Uri.parse(
                                                  kbaseUrlImage +
                                                      matrimonyService
                                                              .matrimonyData[
                                                          index]['biodata']);

                                              bool res = await launchUrl(_url,
                                                  mode: LaunchMode
                                                      .externalApplication);

                                              if (!res) {
                                                ScaffoldMessenger.of(context)
                                                    .showSnackBar(SnackBar(
                                                  content: Text(
                                                      "Couldn\'t open url"),
                                                ));
                                              }
                                            },
                                            child: Row(
                                              children: [
                                                Padding(
                                                  padding:
                                                      const EdgeInsets.only(
                                                          top: 0.0),
                                                  child: SvgPicture.asset(
                                                    'assets/images/briefcase.svg',
                                                    width: 20,
                                                  ),
                                                ),
                                                SizedBox(
                                                  width: 10,
                                                ),
                                                Text(
                                                  matrimonyService.matrimonyData[
                                                                  index]
                                                              ['biodata'] ==
                                                          null
                                                      ? "No Data"
                                                      : "Bio data",
                                                  style: TextStyle(
                                                    fontFamily: 'Roboto',
                                                    fontSize: 12,
                                                    color: kblackColor,
                                                    fontWeight: FontWeight.w400,
                                                    decoration: matrimonyService
                                                                        .matrimonyData[
                                                                    index]
                                                                ['biodata'] ==
                                                            null
                                                        ? TextDecoration.none
                                                        : TextDecoration
                                                            .underline,
                                                  ),
                                                ),
                                              ],
                                            ),
                                          )
                                        ],
                                      )
                                    ],
                                  )
                                ],
                              ),
                            );
                          });
                    }
                  },
                ),
              ],
            )
          ],
        ),
      ),
    );
  }
}
