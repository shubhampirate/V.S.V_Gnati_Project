import 'package:community/constants/colors.dart';
import 'package:community/provider/job_service.dart';
import 'package:community/screens/forms/register_company_form.dart';
import 'package:community/screens/tabs_screen/company_details.dart';
import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:flutter_svg/flutter_svg.dart';
import 'package:provider/provider.dart';

class JobsScreen extends StatefulWidget {
  const JobsScreen({super.key});

  @override
  State<JobsScreen> createState() => _JobsScreenState();
}

class _JobsScreenState extends State<JobsScreen> {
  @override
  Widget build(BuildContext context) {
    final jobDetailService = Provider.of<JobDetailProvider>(context);
    return Scaffold(
      backgroundColor: kwhiteColor,
      body: ListView(
          shrinkWrap: true,
          physics: BouncingScrollPhysics(parent: AlwaysScrollableScrollPhysics()),
          children: [
            Container(
              margin: const EdgeInsets.only(top: 30.0),
              child: Text(
                "Jobs Available",
                textAlign: TextAlign.center,
                style: TextStyle(
                  color: kbrownColor,
                  fontSize: 24,
                  fontWeight: FontWeight.w700,
                  fontFamily: "Raleway",
                ),
              ),
            ),
            Row(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: [
                Container(
                  margin: const EdgeInsets.only(top: 30, left: 20.0),
                  padding: EdgeInsets.only(top: 5, bottom: 5),
                  // padding: EdgeInsets.symmetric(horizontal: MediaQuery.of(context).size.width * 0.3),
                  height: 50,
                  width: MediaQuery.of(context).size.width * 0.4,
                  decoration: BoxDecoration(
                    color: kblueButtonColor,
                    borderRadius: const BorderRadius.all(
                      Radius.circular(8.0),
                    ),
                  ),
                  child: InkWell(
                    onTap: () {
                      Navigator.push(context, MaterialPageRoute(builder: (context) {
                        return RegisterCompany();
                      }));
                    },
                    child: Center(
                      child: Text(
                        "Register your Company",
                        textAlign: TextAlign.center,
                        style: TextStyle(
                          color: kwhiteColor,
                          fontSize: 16,
                        ),
                      ),
                    ),
                  ),
                ),
                Container(
                  margin: const EdgeInsets.only(top: 30, right: 20.0),
                  padding: EdgeInsets.only(top: 5, bottom: 5),
                  // padding: EdgeInsets.symmetric(horizontal: MediaQuery.of(context).size.width * 0.3),
                  height: 50,
                  width: MediaQuery.of(context).size.width * 0.4,
                  decoration: BoxDecoration(
                    color: kblueButtonColor,
                    borderRadius: const BorderRadius.all(
                      Radius.circular(8.0),
                    ),
                  ),
                  child: InkWell(
                    onTap: () {
                      Navigator.push(context, MaterialPageRoute(builder: (context) {
                        return CompanyDetails();
                      }));
                    },
                    child: Center(
                      child: Text(
                        "See your Company",
                        textAlign: TextAlign.center,
                        style: TextStyle(
                          color: kwhiteColor,
                          fontSize: 16,
                        ),
                      ),
                    ),
                  ),
                ),
              ],
            ),
            SizedBox(
              height: 30,
            ),
            FutureBuilder(
                future: jobDetailService.jobDetails.isEmpty
                    ? Provider.of<JobDetailProvider>(context, listen: false).fetchAvailableJobs()
                    : null,
                builder: (context, snapshot) {
                  if (snapshot.connectionState == ConnectionState.waiting) {
                    return Container(
                        margin: const EdgeInsets.only(top: 20),
                        child: const Center(child: CircularProgressIndicator()));
                  } else if (snapshot.hasError) {
                    return Center(
                        child: Text(
                      "An error occurred while fetching available job details.",
                      textAlign: TextAlign.center,
                      style: TextStyle(color: kblackColor),
                    ));
                  } else {
                    return ListView.builder(
                      itemCount: jobDetailService.jobDetails.length,
                      shrinkWrap: true,
                      // physics: AlwaysScrollableScrollPhysics(),
                      physics: NeverScrollableScrollPhysics(),
                      itemBuilder: (context, index) {
                        return Container(
                          padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 10),
                          margin: EdgeInsets.only(left: 20, right: 20, bottom: 20),
                          // height: 500,
                          decoration: BoxDecoration(
                            color: kwhiteColor,
                            borderRadius: BorderRadius.circular(5.0),
                            border: Border.all(
                              color: kblueButtonColor,
                            ),
                          ),
                          child: Column(
                            crossAxisAlignment: CrossAxisAlignment.start,
                            children: [
                              Row(
                                // mainAxisAlignment: MainAxisAlignment.start,
                                crossAxisAlignment: CrossAxisAlignment.start,
                                children: [
                                  Image.asset(
                                    "assets/images/profile_icon.png",
                                    height: 45.0,
                                  ),
                                  Container(
                                    margin: EdgeInsets.only(left: 20.0),
                                    child: Column(
                                      crossAxisAlignment: CrossAxisAlignment.start,
                                      // mainAxisAlignment: MainAxisAlignment.center,
                                      children: [
                                        Container(
                                          margin: EdgeInsets.only(bottom: 5.0),
                                          child: Text(
                                            jobDetailService.jobDetails[index]["title"],
                                            style: TextStyle(
                                              fontFamily: "Roboto",
                                              color: kblackColor,
                                              fontSize: 15.0,
                                            ),
                                            // textAlign: TextAlign.start,
                                          ),
                                        ),
                                        Text(
                                          jobDetailService.jobDetails[index]["company_name"] ?? "Company Name",
                                          style: TextStyle(
                                            fontFamily: "Roboto",
                                            color: kblackColor,
                                            fontSize: 14.0,
                                          ),
                                        ),
                                      ],
                                    ),
                                  ),
                                  // Container(
                                  //   child: Column(
                                  //     children: [

                                  //     ],
                                  //   ),
                                  // ),
                                ],
                              ),
                              SizedBox(
                                height: 10.0,
                              ),
                              Column(
                                crossAxisAlignment: CrossAxisAlignment.start,
                                // mainAxisAlignment: MainAxisAlignment.start,
                                children: [
                                  Container(
                                    margin: EdgeInsets.only(bottom: 8.0),
                                    child: Row(
                                      children: [
                                        SvgPicture.asset("assets/images/professional_name.svg"),
                                        Container(
                                          margin: EdgeInsets.only(left: 5),
                                          child: Text(
                                            jobDetailService.jobDetails[index]["type"] ?? "Job Type",
                                            style: TextStyle(
                                              fontFamily: "Roboto",
                                              color: kblackColor,
                                              fontSize: 14.0,
                                            ),
                                          ),
                                        ),
                                      ],
                                    ),
                                  ),
                                  Container(
                                    margin: EdgeInsets.only(bottom: 8.0),
                                    child: Row(
                                      children: [
                                        Icon(
                                          CupertinoIcons.briefcase,
                                          color: kblackColor,
                                          size: 18.0,
                                        ),
                                        Container(
                                          margin: EdgeInsets.only(left: 5),
                                          child: Text(
                                            jobDetailService.jobDetails[index]["details"] ?? "Details",
                                            style: TextStyle(
                                              fontFamily: "Roboto",
                                              color: kblackColor,
                                              fontSize: 14.0,
                                            ),
                                          ),
                                        ),
                                      ],
                                    ),
                                  ),
                                  Container(
                                    margin: EdgeInsets.only(bottom: 8.0),
                                    child: Row(
                                      children: [
                                        Image.asset("assets/images/phone.png"),
                                        Container(
                                          margin: EdgeInsets.only(left: 5),
                                          child: Text(
                                            jobDetailService.jobDetails[index]["phone"].toString() ?? "Phone Number",
                                            style: TextStyle(
                                              fontFamily: "Roboto",
                                              color: kblackColor,
                                              fontSize: 14.0,
                                            ),
                                          ),
                                        ),
                                      ],
                                    ),
                                  ),
                                  // Container(
                                  //   margin: EdgeInsets.only(bottom: 8.0),
                                  //   child: Row(
                                  //     children: [
                                  //       Icon(
                                  //         Icons.mail_outline,
                                  //         color: kblackColor,
                                  //         size: 18.0,
                                  //       ),
                                  //       Container(
                                  //         margin: EdgeInsets.only(left: 5),
                                  //         child: Text(
                                  //           jobDetailService.jobDetails[index]["email"] ?? "Email id",
                                  //           style: TextStyle(
                                  //             fontFamily: "Roboto",
                                  //             color: kblackColor,
                                  //             fontSize: 14.0,
                                  //           ),
                                  //         ),
                                  //       ),
                                  //     ],
                                  //   ),
                                  // ),
                                  // Container(
                                  //   margin: EdgeInsets.only(bottom: 8.0),
                                  //   child: Row(
                                  //     // mainAxisAlignment: MainAxisAlignment.start,
                                  //     crossAxisAlignment: CrossAxisAlignment.start,
                                  //     // direction: Axis.horizontal,
                                  //     // alignment: WrapAlignment.start,
                                  //     // alignment: WrapAlignment.start,
                                  //     // crossAxisAlignment: WrapCrossAlignment.start,
                                  //     children: [
                                  //       Icon(
                                  //         CupertinoIcons.briefcase,
                                  //         color: kblackColor,
                                  //         size: 18.0,
                                  //       ),
                                  //       SizedBox(
                                  //         width: 5.0,
                                  //       ),
                                  //       Expanded(
                                  //         // margin: EdgeInsets.only(left: 5),
                                  //         child: Text(
                                  //           jobDetailService.jobDetails[index]["company_address"] ?? "Company Address",
                                  //           // softWrap: true,
                                  //           style: TextStyle(
                                  //             fontFamily: "Roboto",
                                  //             color: kblackColor,
                                  //             fontSize: 14.0,
                                  //           ),
                                  //         ),
                                  //       ),
                                  //     ],
                                  //   ),
                                  // ),
                                ],
                              )
                            ],
                          ),
                        );
                      },
                    );
                  }
                })
          ]),
      // body: ListView(
      //   shrinkWrap: true,
      //   // mainAxisSize: MainAxisSize.min,
      //   // shrinkWrap: false,
      //   physics: NeverScrollableScrollPhysics(),
      //   // crossAxisAlignment: CrossAxisAlignment.center,
      //   children: [
      // Container(
      //   margin: const EdgeInsets.only(top: 30.0),
      //   child: Text(
      //     "Jobs Available",
      //     textAlign: TextAlign.center,
      //     style: TextStyle(
      //       color: kbrownColor,
      //       fontSize: 24,
      //       fontWeight: FontWeight.w700,
      //       fontFamily: "Raleway",
      //     ),
      //   ),
      // ),
      // Center(
      //   child: Container(
      //     margin: const EdgeInsets.only(top: 30),
      //     // padding: EdgeInsets.symmetric(horizontal: MediaQuery.of(context).size.width * 0.3),
      //     height: 35,
      //     width: MediaQuery.of(context).size.width * 0.7,
      //     decoration: BoxDecoration(
      //       color: kblueButtonColor,
      //       borderRadius: const BorderRadius.all(
      //         Radius.circular(8.0),
      //       ),
      //     ),
      //     child: Center(
      //       child: Text(
      //         "Register your Company",
      //         // textAlign: TextAlign.center,
      //         style: TextStyle(
      //           color: kwhiteColor,
      //           fontSize: 16,
      //         ),
      //       ),
      //     ),
      //   ),
      // ),
      // FutureBuilder(
      //     future: jobDetailService.jobDetails.isEmpty
      //         ? Provider.of<JobDetailProvider>(context, listen: false).fetchAvailableJobs()
      //         : null,
      //     builder: (context, snapshot) {
      //       if (snapshot.connectionState == ConnectionState.waiting) {
      //         return Container(
      //             margin: const EdgeInsets.only(top: 20), child: const Center(child: CircularProgressIndicator()));
      //       } else if (snapshot.hasError) {
      //         return Center(
      //             child: Text(
      //           "An error occurred while fetching available job details.",
      //           textAlign: TextAlign.center,
      //           style: TextStyle(color: kblackColor),
      //         ));
      //       }

      //   return ListView.builder(
      //     itemBuilder: (context, index) {
      //       return Container(
      //         height: 20.0,
      //       );
      //     },
      //   );
      // })
      //   ],
      // ),
    );
  }
}
