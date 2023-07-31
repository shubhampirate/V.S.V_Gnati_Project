import 'package:community/constants/colors.dart';
import 'package:community/constants/paths.dart';
import 'package:community/provider/company_details_provider.dart';
import 'package:community/screens/forms/add_job_form.dart';
import 'package:community/screens/forms/edit_company_details.dart';
import 'package:community/screens/forms/edit_family_details.dart';
import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:flutter_svg/flutter_svg.dart';
import 'package:provider/provider.dart';

class CompanyDetails extends StatefulWidget {
  const CompanyDetails({super.key});

  @override
  State<CompanyDetails> createState() => _CompanyDetailsState();
}

class _CompanyDetailsState extends State<CompanyDetails> {
  @override
  Widget build(BuildContext context) {
    final companyDetailService = Provider.of<CompanyDetailsProvider>(context);
    return Scaffold(
      backgroundColor: kwhiteColor,
      appBar: AppBar(
        backgroundColor: kwhiteColor,
        elevation: 0,
        centerTitle: true,
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
            "Company Details",
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
      body: FutureBuilder(
          future: companyDetailService.companyJobs.isEmpty
              ? Provider.of<CompanyDetailsProvider>(context, listen: false)
                  .fetchCompanyDetails()
              : null,
          builder: (context, snapshot) {
            if (snapshot.connectionState == ConnectionState.waiting) {
              return Container(
                  margin: const EdgeInsets.only(top: 20),
                  child: const Center(child: CircularProgressIndicator()));
            } else if (snapshot.hasError) {
              return Center(
                  child: Text(
                "An error occurred while fetching company details.",
                textAlign: TextAlign.center,
                style: TextStyle(color: kblackColor),
              ));
            } else {
              return Container(
                margin: EdgeInsets.symmetric(horizontal: 20.0, vertical: 20.0),
                child: ListView(
                  shrinkWrap: true,
                  physics: BouncingScrollPhysics(
                      parent: AlwaysScrollableScrollPhysics()),
                  children: [
                    Row(
                      children: [
                        SvgPicture.asset(
                          "assets/images/device-camera.svg",
                          color: kblackColor,
                          height: 25,
                          width: 25,
                        ),
                        SizedBox(
                          width: 5.0,
                        ),
                        Text(
                          "Photo",
                          style: TextStyle(
                            color: kblackColor,
                            fontFamily: "Roboto",
                            fontSize: 15.0,
                          ),
                        )
                      ],
                    ),
                    companyDetailService.companyPhoto != "" ||
                            companyDetailService.companyPhoto != null
                        ? Image.network(
                            "${kbaseUrlImage}${companyDetailService.companyPhoto}",
                            height: 100,
                            width: 100,
                          )
                        : Image.asset(
                            "assets/images/profile_icon.png",
                            height: 100,
                            width: 100,
                          ),
                    Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        Container(
                          margin: EdgeInsets.only(left: 3, top: 20.0),
                          child: Text(
                            "Company Name",
                            style: TextStyle(
                                color: kbrownColor,
                                fontFamily: "Roboto",
                                fontSize: 15.0),
                          ),
                        ),
                        Container(
                          margin: EdgeInsets.only(left: 3, top: 8.0),
                          child: Text(
                            companyDetailService.companyName,
                            style: TextStyle(
                              color: kblackColor,
                              fontFamily: "Roboto",
                              fontSize: 14.0,
                            ),
                          ),
                        )
                      ],
                    ),
                    Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        Container(
                          margin: EdgeInsets.only(left: 3, top: 30.0),
                          child: Text(
                            "Company Email Address",
                            style: TextStyle(
                                color: kbrownColor,
                                fontFamily: "Roboto",
                                fontSize: 15.0),
                          ),
                        ),
                        Container(
                          margin: EdgeInsets.only(left: 3, top: 8.0),
                          child: Text(
                            companyDetailService.companyEmail,
                            style: TextStyle(
                              color: kblackColor,
                              fontFamily: "Roboto",
                              fontSize: 14.0,
                            ),
                          ),
                        )
                      ],
                    ),
                    Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        Container(
                          margin: EdgeInsets.only(left: 3, top: 30.0),
                          child: Text(
                            "Company Address",
                            style: TextStyle(
                                color: kbrownColor,
                                fontFamily: "Roboto",
                                fontSize: 15.0),
                          ),
                        ),
                        Container(
                          margin: EdgeInsets.only(left: 3, top: 8.0),
                          child: Text(
                            companyDetailService.companyAddress,
                            style: TextStyle(
                              color: kblackColor,
                              fontFamily: "Roboto",
                              fontSize: 14.0,
                            ),
                          ),
                        )
                      ],
                    ),
                    InkWell(
                      onTap: () {
                        Navigator.push(context,
                            MaterialPageRoute(builder: (context) {
                          return EditCompanyDetails(preFilledData: {
                            'name': companyDetailService.companyName,
                            'email': companyDetailService.companyEmail,
                            'address': companyDetailService.companyAddress,
                            'companyPhoto': companyDetailService.companyPhoto,
                          });
                        }));
                      },
                      child: Container(
                        margin: EdgeInsets.only(
                          top: 30,
                          right: MediaQuery.of(context).size.width * 0.5,
                        ),
                        padding: EdgeInsets.symmetric(vertical: 8),
                        // width: 250,
                        // height: 25,
                        // margin: EdgeInsets.symmetric(horizontal: ),
                        decoration: BoxDecoration(
                          color: kblueButtonColor,
                          borderRadius: BorderRadius.circular(5.0),
                        ),
                        child: Text(
                          "Edit Company Details",
                          textAlign: TextAlign.center,
                          style: TextStyle(
                            fontFamily: 'Roboto',
                            fontSize: 13,
                            color: kwhiteColor,
                          ),
                        ),
                      ),
                    ),
                    Container(
                      margin: const EdgeInsets.only(top: 15),
                      child: Row(
                        mainAxisAlignment: MainAxisAlignment.spaceBetween,
                        children: [
                          Container(
                              // margin: const EdgeInsets.only(left: 10),
                              child: Text(
                            "List of Jobs",
                            textAlign: TextAlign.center,
                            style: TextStyle(
                              fontFamily: 'Raleway',
                              fontSize: 18,
                              color: kblackColor,
                              fontWeight: FontWeight.w700,
                            ),
                          )),
                          InkWell(
                            onTap: () {
                              Navigator.push(context,
                                  MaterialPageRoute(builder: (context) {
                                return const AddJobsForm(
                                  jobTitle: "",
                                  jobDetails: "",
                                  jobType: "Full-time",
                                  phoneNumber: "",
                                  jobId: null,
                                );
                              }));
                            },
                            child: Container(
                              // margin: const EdgeInsets.only(right: 20),
                              padding: const EdgeInsets.symmetric(
                                  horizontal: 15, vertical: 10),
                              decoration: BoxDecoration(
                                color: kblueButtonColor,
                                borderRadius: BorderRadius.circular(5.0),
                              ),
                              child: Text(
                                "Add Jobs + ",
                                textAlign: TextAlign.center,
                                style: TextStyle(
                                  fontFamily: 'Roboto',
                                  fontSize: 12,
                                  color: kwhiteColor,
                                ),
                              ),
                            ),
                          ),
                        ],
                      ),
                    ),
                    SizedBox(
                      height: 20,
                    ),
                    ListView.builder(
                      itemCount: companyDetailService.companyJobs.length,
                      shrinkWrap: true,
                      // physics: AlwaysScrollableScrollPhysics(),
                      physics: NeverScrollableScrollPhysics(),
                      itemBuilder: (context, index) {
                        return Container(
                          padding: const EdgeInsets.symmetric(
                              horizontal: 10, vertical: 10),
                          margin: EdgeInsets.only(bottom: 20),
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
                                mainAxisAlignment:
                                    MainAxisAlignment.spaceBetween,
                                children: [
                                  Row(
                                    children: [
                                      companyDetailService.companyPhoto != "" ||
                                              companyDetailService
                                                      .companyPhoto !=
                                                  null
                                          ? Image.network(
                                              "${kbaseUrlImage}${companyDetailService.companyPhoto}",
                                              height: 45.0,
                                              width: 45.0,
                                            )
                                          : Image.asset(
                                              "assets/images/profile_icon.png",
                                              height: 45.0,
                                              width: 45.0,
                                            ),
                                      Container(
                                        margin: EdgeInsets.only(left: 20.0),
                                        child: Column(
                                          crossAxisAlignment:
                                              CrossAxisAlignment.start,
                                          // mainAxisAlignment: MainAxisAlignment.center,
                                          children: [
                                            Container(
                                              margin:
                                                  EdgeInsets.only(bottom: 5.0),
                                              child: Text(
                                                companyDetailService
                                                        .companyJobs[index]
                                                    ["title"],
                                                style: TextStyle(
                                                  fontFamily: "Roboto",
                                                  color: kblackColor,
                                                  fontSize: 15.0,
                                                ),
                                                // textAlign: TextAlign.start,
                                              ),
                                            ),
                                            Text(
                                              companyDetailService
                                                      .companyName ??
                                                  "Company Name",
                                              style: TextStyle(
                                                fontFamily: "Roboto",
                                                color: kblackColor,
                                                fontSize: 14.0,
                                              ),
                                            ),
                                          ],
                                        ),
                                      ),
                                    ],
                                  ),
                                  InkWell(
                                    onTap: () {
                                      Navigator.push(context,
                                          MaterialPageRoute(builder: (context) {
                                        return AddJobsForm(
                                          jobTitle: companyDetailService
                                              .companyJobs[index]["title"],
                                          jobDetails: companyDetailService
                                              .companyJobs[index]["details"],
                                          jobType: companyDetailService
                                              .companyJobs[index]["type"],
                                          phoneNumber: companyDetailService
                                              .companyJobs[index]["phone"]
                                              .toString(),
                                          jobId: companyDetailService
                                              .companyJobs[index]["id"],
                                        );
                                      }));
                                    },
                                    child: Container(
                                      padding: const EdgeInsets.symmetric(
                                          horizontal: 20, vertical: 4),
                                      decoration: BoxDecoration(
                                        color: kblueButtonColor,
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
                                            width: 5,
                                          ),
                                          SvgPicture.asset(
                                            "assets/images/edit.svg",
                                            height: 15,
                                            color: kwhiteColor,
                                          )
                                        ],
                                      ),
                                    ),
                                  ),
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
                                        SvgPicture.asset(
                                            "assets/images/professional_name.svg"),
                                        Container(
                                          margin: EdgeInsets.only(left: 5),
                                          child: Text(
                                            companyDetailService
                                                        .companyJobs[index]
                                                    ["type"] ??
                                                "Job Type",
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
                                            companyDetailService
                                                        .companyJobs[index]
                                                    ["details"] ??
                                                "Details",
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
                                            companyDetailService
                                                    .companyJobs[index]["phone"]
                                                    .toString() ??
                                                "Phone Number",
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
                                ],
                              )
                            ],
                          ),
                        );
                      },
                    ),
                  ],
                ),
              );
            }
          }),
    );
  }
}
