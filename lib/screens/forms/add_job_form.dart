import 'package:community/constants/colors.dart';
import 'package:community/provider/company_details_provider.dart';
import 'package:community/provider/job_service.dart';
import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:flutter_svg/flutter_svg.dart';
import 'package:flutter_overlay_loader/flutter_overlay_loader.dart';
import 'package:provider/provider.dart';

class AddJobsForm extends StatefulWidget {
  const AddJobsForm(
      {super.key,
      required this.jobTitle,
      required this.jobType,
      required this.jobDetails,
      required this.phoneNumber,
      required this.jobId});

  final String jobTitle;
  final String jobType;
  final String jobDetails;
  final String phoneNumber;
  final int? jobId;

  @override
  State<AddJobsForm> createState() => _AddJobsFormState();
}

class _AddJobsFormState extends State<AddJobsForm> {
  late String jobTitle;
  late String jobDetails;
  late String phoneNumber;
  late int? jobId;

  late String selectedJobType;

  @override
  void initState() {
    // TODO: implement initState
    selectedJobType = widget.jobType;
    jobTitle = widget.jobTitle;
    jobDetails = widget.jobDetails;
    jobId = widget.jobId;
    phoneNumber = widget.phoneNumber;
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

  List<String> jobType = ["Full-time", "Part-time", "Internship", "Job"];

  final _formKey = GlobalKey<FormState>();
  @override
  Widget build(BuildContext context) {
    final companyDetailService = Provider.of<CompanyDetailsProvider>(context);
    final jobDetailService = Provider.of<JobDetailProvider>(context);
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
            widget.jobId != null ? "Edit Job" : "Add Job",
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
                              "Job Title",
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
                      padding:
                          const EdgeInsets.only(left: 20.0, right: 20, top: 10),
                      child: Container(
                        // height: 40,
                        child: TextFormField(
                          initialValue: jobTitle,
                          decoration: _commonInputDecoration(context),
                          validator: (value) {
                            if (value == null || value.isEmpty) {
                              return 'Please enter a job title';
                            }
                            return null;
                          },
                          onChanged: (value) {
                            setState(() {
                              jobTitle = value;
                            });
                          },
                          // onSaved: (value) {
                          //   _password = value!;
                          // },
                        ),
                      ),
                    ),
                    Row(
                      // mainAxisAlignment: MainAxisAlignment.spaceBetween,
                      children: [
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
                                  "Job Type: ",
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
                        const SizedBox(
                          width: 30.0,
                        ),
                        Container(
                          margin: const EdgeInsets.only(right: 20.0, top: 20),
                          child: DropdownButton<String>(
                            value: selectedJobType,
                            onChanged: (String? value) {
                              setState(() {
                                selectedJobType = value!;
                              });
                            },
                            items: jobType
                                .map<DropdownMenuItem<String>>((String value) {
                              return DropdownMenuItem<String>(
                                value: value,
                                child: Text(value),
                              );
                            }).toList(),
                          ),
                        ),
                      ],
                    ),
                    Padding(
                      padding: const EdgeInsets.only(top: 25.0, left: 20),
                      child: Row(
                        children: [
                          Icon(
                            CupertinoIcons.briefcase,
                            color: kblackColor,
                            size: 25.0,
                          ),
                          Padding(
                            padding: const EdgeInsets.only(left: 14.0),
                            child: Text(
                              "Job Details",
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
                      padding:
                          const EdgeInsets.only(left: 20.0, right: 20, top: 10),
                      child: Container(
                        // height: 40,
                        child: TextFormField(
                          maxLines: 4,
                          initialValue: jobDetails,
                          decoration: _commonInputDecoration(context),
                          validator: (value) {
                            if (value == null || value.isEmpty) {
                              return 'Please enter job details';
                            }
                            return null;
                          },
                          onChanged: (value) {
                            setState(() {
                              jobDetails = value;
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
                      padding:
                          const EdgeInsets.only(left: 20.0, right: 20, top: 10),
                      child: Container(
                        // height: 40,
                        child: TextFormField(
                          initialValue: phoneNumber,
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
                  ],
                ),
              ),
            ),
            Container(
              height: 40,
              padding: const EdgeInsets.only(top: 10, bottom: 10),
              margin: const EdgeInsets.only(
                  left: 20, right: 20, top: 30, bottom: 40),
              decoration: BoxDecoration(
                color: kblueButtonColor,
                borderRadius: const BorderRadius.all(Radius.circular(5.0)),
              ),
              child: InkWell(
                onTap: () async {
                  if (_formKey.currentState!.validate()) {
                    _formKey.currentState!.save();
                    try {
                      print("hello");
                      Loader.show(context);
                      final job = await companyDetailService.addOrEditJob(
                          context,
                          jobTitle,
                          selectedJobType,
                          jobDetails,
                          int.parse(phoneNumber),
                          jobId);
                      Loader.hide();

                      if (job != null) {
                        jobDetailService.addJob(job);

                        Navigator.pop(context);
                      } else {
                        ScaffoldMessenger.of(context).showSnackBar(
                          SnackBar(
                            content: Text("Error adding job"),
                          ),
                        );
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
                    widget.jobId != null ? "Edit Job" : "Add Job",
                    style: TextStyle(
                      fontFamily: "Roboto",
                      fontSize: 15,
                      fontWeight: FontWeight.w400,
                      color: kwhiteColor,
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
