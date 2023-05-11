import 'package:community/constants/colors.dart';
import 'package:community/provider/family_detail_service.dart';
import 'package:flutter/material.dart';
import 'package:flutter_svg/flutter_svg.dart';
import 'package:provider/provider.dart';

class EditMatrimonyDetailsForm extends StatelessWidget {
  EditMatrimonyDetailsForm({super.key});

  final TextEditingController homeAddressController = TextEditingController();
  final TextEditingController gotrejController = TextEditingController();
  // final TextEditingController occupation

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
      body: Container(
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
                      initialValue: familyDetailService.homeAddress,
                      decoration: _commonInputDecoration(context),
                      maxLines: 2,
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
                      "Gotrej: ",
                      style: TextStyle(fontFamily: 'Roboto', fontSize: 16, color: kblackColor),
                    ),
                  ),
                  Container(
                    margin: EdgeInsets.only(top: 5),
                    // height: 40,
                    child: TextFormField(
                      initialValue: familyDetailService.gotrej,
                      decoration: _commonInputDecoration(context),
                      maxLines: 1,
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
                      itemCount: familyDetailService.occupationAddreess.length,
                      physics: const NeverScrollableScrollPhysics(),
                      shrinkWrap: true,
                      itemBuilder: (context, index) {
                        return Container(
                          margin: const EdgeInsets.only(top: 5, bottom: 5),
                          // height: 40,
                          child: TextFormField(
                            // controller: gotrejController,
                            initialValue: familyDetailService.occupationAddreess[index]["occupation_address"],
                            decoration: _commonInputDecoration(context),
                            maxLines: 2,
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
                        );
                      })
                ],
              ),
            ),
            Container(
              child: Text("Save"),
            )
          ],
        )),
      ),
    );
  }
}
