import 'package:community/constants/colors.dart';
import 'package:community/provider/family_detail_service.dart';
import 'package:flutter/material.dart';
import 'package:flutter_overlay_loader/flutter_overlay_loader.dart';
import 'package:flutter_svg/flutter_svg.dart';
import 'package:provider/provider.dart';

class EditFamilyDetailsForm extends StatefulWidget {
  const EditFamilyDetailsForm({
    super.key,
    required this.editOccupationAddress,
    required this.editHomeAddress,
    required this.editGotrej,
    required this.editAdditionalHomeAddress,
  });

  final List editOccupationAddress;
  final String editHomeAddress;
  final String editGotrej;
  final List editAdditionalHomeAddress;

  @override
  State<EditFamilyDetailsForm> createState() => _EditFamilyDetailsFormState();
}

class _EditFamilyDetailsFormState extends State<EditFamilyDetailsForm> {
  List finalOccupationAddress = [];
  String finalHomeAddress = "";
  String finalGotrej = "";
  List finalAdditionalAddress = [];

  @override
  void initState() {
    // TODO: implement initState
    super.initState();
    finalOccupationAddress = widget.editOccupationAddress;
    finalHomeAddress = widget.editHomeAddress;
    finalGotrej = widget.editGotrej;
    finalAdditionalAddress = widget.editAdditionalHomeAddress;
  }

  final TextEditingController homeAddressController = TextEditingController();
  final TextEditingController gotrejController = TextEditingController();
  // final TextEditingController occupation

  InputDecoration _commonInputDecoration(BuildContext context, [int? index, String? field]) {
    final familyDetailService = Provider.of<FamilyDetailProvider>(context);
    return InputDecoration(
      suffixIcon: index != null && index > 0
          ? InkWell(
              child: Icon(Icons.cancel),
              onTap: () async {
                if (field == "occupationAddress") {
                  Loader.show(context);
                  bool status = await familyDetailService.deleteOccupationAddress(
                      widget.editOccupationAddress[index]["id"], index);
                  if (status == true) {
                    Loader.hide();
                    widget.editOccupationAddress.removeAt(index);
                  } else {
                    ScaffoldMessenger.of(context).showSnackBar(
                      const SnackBar(
                        content: Text("Error occurred while deleting occupation address"),
                      ),
                    );
                    Loader.hide();
                  }
                } else {
                  Loader.show(context);
                  bool status = await familyDetailService.deleteAdditionalAddress(
                      widget.editAdditionalHomeAddress[index]["id"], index);
                  if (status == true) {
                    Loader.hide();
                    widget.editAdditionalHomeAddress.removeAt(index);
                  } else {
                    ScaffoldMessenger.of(context).showSnackBar(
                      const SnackBar(
                        content: Text("Error occurred while deleting additional address"),
                      ),
                    );
                    Loader.hide();
                  }
                }
                // setState(() {
                //   widget.editOccupationAddress.removeAt(index);
                // });
              },
            )
          : null,
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
            "Edit Family Details",
            // textAlign: TextAlign.center,
            style: TextStyle(fontFamily: 'Roboto', fontSize: 18, color: kblackColor),
          ),
        ),
      ),
      body: SingleChildScrollView(
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
                      margin: const EdgeInsets.only(top: 25),
                      child: Text(
                        "Home Address: ",
                        style: TextStyle(fontFamily: 'Roboto', fontSize: 16, color: kblackColor),
                      ),
                    ),
                    Container(
                      margin: EdgeInsets.only(top: 5),
                      // height: 40,
                      child: TextFormField(
                        initialValue: widget.editHomeAddress,
                        decoration: _commonInputDecoration(context),
                        maxLines: 2,
                        onChanged: (val) {
                          setState(() {
                            finalHomeAddress = val;
                          });
                        },
                      ),
                    ),
                    Container(
                      margin: const EdgeInsets.only(top: 25),
                      child: Text(
                        "Additional Home Address: ",
                        style: TextStyle(fontFamily: 'Roboto', fontSize: 16, color: kblackColor),
                      ),
                    ),
                    ListView.builder(
                        itemCount: widget.editAdditionalHomeAddress.length,
                        physics: const NeverScrollableScrollPhysics(),
                        shrinkWrap: true,
                        itemBuilder: (context, index) {
                          return Container(
                            margin: const EdgeInsets.only(top: 5, bottom: 5),
                            // height: 40,
                            child: TextFormField(
                              // controller: gotrejController,
                              initialValue: widget.editAdditionalHomeAddress[index]["additional_address"],
                              decoration: _commonInputDecoration(context, index, "additionalHomeAddress"),
                              maxLines: 2,
                              onChanged: (val) {
                                setState(() {
                                  finalAdditionalAddress[index]["additional_address"] = val;
                                });
                              },
                            ),
                          );
                        }),
                    Container(
                      margin: const EdgeInsets.only(top: 15),
                      child: Text(
                        "Gotrej: ",
                        style: TextStyle(fontFamily: 'Roboto', fontSize: 16, color: kblackColor),
                      ),
                    ),
                    Container(
                      margin: EdgeInsets.only(top: 5),
                      // height: 40,
                      child: TextFormField(
                        initialValue: widget.editGotrej,
                        decoration: _commonInputDecoration(context),
                        maxLines: 1,
                        onChanged: (val) {
                          setState(() {
                            finalGotrej = val;
                          });
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
                        "Occupation Address",
                        style: TextStyle(
                          color: kbrownColor,
                          fontFamily: "Roboto",
                          fontSize: 16,
                        ),
                      ),
                    ),
                    ListView.builder(
                        itemCount: widget.editOccupationAddress.length,
                        physics: const NeverScrollableScrollPhysics(),
                        shrinkWrap: true,
                        itemBuilder: (context, index) {
                          return Container(
                            margin: const EdgeInsets.only(top: 5, bottom: 5),
                            // height: 40,
                            child: TextFormField(
                              // controller: gotrejController,
                              initialValue: widget.editOccupationAddress[index]["occupation_address"],
                              decoration: _commonInputDecoration(context, index, "occupationAddress"),
                              maxLines: 2,
                              onChanged: (val) {
                                setState(() {
                                  finalOccupationAddress[index]["occupation_address"] = val;
                                });
                              },
                            ),
                          );
                        })
                  ],
                ),
              ),
              InkWell(
                onTap: () async {
                  Loader.show(context);
                  bool status = await familyDetailService.editFamilyDetails(
                      finalHomeAddress, finalGotrej, finalOccupationAddress, finalAdditionalAddress);
                  if (status == true) {
                    Loader.hide();
                    Navigator.pop(context);
                  } else {
                    ScaffoldMessenger.of(context).showSnackBar(
                      const SnackBar(
                        content: Text("Error occurred while editing family details"),
                      ),
                    );
                    Loader.hide();
                  }
                },
                child: Container(
                  margin: EdgeInsets.only(top: 30.0),
                  decoration: BoxDecoration(color: kyellowColor, borderRadius: BorderRadius.all(Radius.circular(8.0))),
                  width: MediaQuery.of(context).size.width,
                  height: 35.0,
                  child: Center(
                    child: Text(
                      "Save",
                      textAlign: TextAlign.center,
                      style: TextStyle(
                        color: kblackColor,
                        fontSize: 16.0,
                      ),
                    ),
                  ),
                ),
              )
            ],
          )),
        ),
      ),
    );
  }
}
