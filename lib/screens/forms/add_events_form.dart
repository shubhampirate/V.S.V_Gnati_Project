import 'dart:io';

import 'package:community/constants/colors.dart';
import 'package:community/provider/event_service.dart';
import 'package:flutter/material.dart';
import 'package:flutter_svg/flutter_svg.dart';
import 'package:image_picker/image_picker.dart';
import 'package:intl/intl.dart';
import 'package:provider/provider.dart';

class AddEventForm extends StatefulWidget {
  const AddEventForm({super.key, this.preFilledData});

  final dynamic preFilledData;
  static const String id = '/addEventForm';

  @override
  State<AddEventForm> createState() => _AddEventFormState();
}

class _AddEventFormState extends State<AddEventForm> {
  InputDecoration _commonInputDecoration(BuildContext context,
      {String? hintText}) {
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

  late TextEditingController nameController,
      aboutController,
      dateController,
      startTimeController,
      venueController,
      photosDriveController,
      endTimeController;

  File? picture;

  @override
  void initState() {
    nameController = TextEditingController();
    aboutController = TextEditingController();
    dateController = TextEditingController();
    startTimeController = TextEditingController();
    endTimeController = TextEditingController();
    venueController = TextEditingController();
    photosDriveController = TextEditingController();

    if (widget.preFilledData != null) {
      nameController =
          TextEditingController(text: widget.preFilledData['name']);
      aboutController =
          TextEditingController(text: widget.preFilledData['about']);
      dateController =
          TextEditingController(text: widget.preFilledData['date']);
      startTimeController =
          TextEditingController(text: widget.preFilledData['startTime']);
      endTimeController =
          TextEditingController(text: widget.preFilledData['endTime']);
      venueController =
          TextEditingController(text: widget.preFilledData['venue']);
      photosDriveController =
          TextEditingController(text: widget.preFilledData['photosDrive']);
    }
    super.initState();
  }

  @override
  Widget build(BuildContext context) {
    final eventService = Provider.of<EventProvider>(context);

    return Scaffold(
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
            "Edit Company Details",
            style: TextStyle(
              color: kbrownColor,
              fontSize: 24,
              fontWeight: FontWeight.w700,
              fontFamily: "Raleway",
            ),
          ),
        ),
      ),
      body: Form(
        child: ListView(
          children: [
            Container(
              margin: const EdgeInsets.symmetric(horizontal: 15, vertical: 10),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Container(
                    margin: const EdgeInsets.only(top: 25, bottom: 6),
                    child: Row(
                      children: [
                        Text(
                          "Company Logo",
                          style: TextStyle(
                              fontFamily: 'Roboto',
                              fontSize: 16,
                              color: kblackColor),
                        ),
                      ],
                    ),
                  ),
                  InkWell(
                    onTap: () async {
                      final ImagePicker picker = ImagePicker();
                      // Pick an image.
                      final XFile? xFile =
                          await picker.pickImage(source: ImageSource.gallery);
                      if (xFile == null) return;
                      final File file = await xFileToImage(xFile);

                      setState(() {
                        picture = file;
                      });
                    },
                    // child: Container(),
                    child: Container(
                      alignment: Alignment.center,
                      child: picture != null
                          ? Image.file(
                              picture!,
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
                      "Event Name",
                      style: TextStyle(
                          fontFamily: 'Roboto',
                          fontSize: 16,
                          color: kblackColor),
                    ),
                  ),
                  Container(
                    margin: EdgeInsets.only(top: 5),
                    child: TextFormField(
                      decoration: _commonInputDecoration(context),
                      maxLines: 1,
                      controller: nameController,
                    ),
                  ),
                  Container(
                    margin: const EdgeInsets.only(top: 15),
                    child: Text(
                      "Enter about the event",
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
                      decoration: _commonInputDecoration(context),
                      controller: aboutController,
                    ),
                  ),
                  Container(
                    margin: const EdgeInsets.only(top: 15),
                    child: Text(
                      "Enter the date of event",
                      style: TextStyle(
                          fontFamily: 'Roboto',
                          fontSize: 16,
                          color: kblackColor),
                    ),
                  ),
                  InkWell(
                    onTap: () async {
                      print('clicked');
                      DateTime? pickedDate = await showDatePicker(
                          context: context,
                          initialDate: DateTime.now(),
                          firstDate: DateTime(1950),
                          //DateTime.now() - not to allow to choose before today.
                          lastDate: DateTime(2100));

                      if (pickedDate != null) {
                        // print(pickedDate); //pickedDate output format => 2021-03-10 00:00:00.000
                        String formattedDate =
                            DateFormat('yyyy-MM-dd').format(pickedDate);
                        print(
                            formattedDate); //formatted date output using intl package =>  2021-03-16
                        setState(() {
                          dateController.text = formattedDate;
                        });
                      } else {}
                    },
                    child: AbsorbPointer(
                      child: Container(
                        margin: EdgeInsets.only(top: 5),
                        child: TextFormField(
                          decoration: _commonInputDecoration(context),
                          maxLines: 1,
                          controller: dateController,
                          readOnly: true,
                          onChanged: (value) {},
                        ),
                      ),
                    ),
                  ),
                  Container(
                    margin: const EdgeInsets.only(top: 15),
                    child: Text(
                      "Enter the start time of event",
                      style: TextStyle(
                          fontFamily: 'Roboto',
                          fontSize: 16,
                          color: kblackColor),
                    ),
                  ),
                  InkWell(
                    onTap: () async {
                      TimeOfDay? pickedTime = await showTimePicker(
                        initialTime: TimeOfDay.now(),
                        context: context,
                      );

                      if (pickedTime != null) {
                        setState(() {
                          print(pickedTime);

                          startTimeController.text =
                              "${pickedTime.hour}:${pickedTime.minute}:00";
                        });
                      } else {
                        print("Time is not selected");
                      }
                    },
                    child: AbsorbPointer(
                      child: Container(
                        margin: EdgeInsets.only(top: 5),
                        child: TextFormField(
                          decoration: _commonInputDecoration(context),
                          maxLines: 1,
                          controller: startTimeController,
                          readOnly: true,
                          onChanged: (value) {},
                        ),
                      ),
                    ),
                  ),
                  Container(
                    margin: const EdgeInsets.only(top: 15),
                    child: Text(
                      "Enter the end time of event",
                      style: TextStyle(
                          fontFamily: 'Roboto',
                          fontSize: 16,
                          color: kblackColor),
                    ),
                  ),
                  InkWell(
                    onTap: () async {
                      TimeOfDay? pickedTime = await showTimePicker(
                        initialTime: TimeOfDay.now(),
                        context: context,
                      );

                      if (pickedTime != null) {
                        setState(() {
                          print(pickedTime);

                          endTimeController.text =
                              "${pickedTime.hour}:${pickedTime.minute}:00";
                        });
                      } else {
                        print("Time is not selected");
                      }
                    },
                    child: AbsorbPointer(
                      child: Container(
                        margin: EdgeInsets.only(top: 5),
                        child: TextFormField(
                          decoration: _commonInputDecoration(context),
                          maxLines: 1,
                          controller: endTimeController,
                          readOnly: true,
                          onChanged: (value) {},
                        ),
                      ),
                    ),
                  ),
                  Container(
                    margin: const EdgeInsets.only(top: 15),
                    child: Text(
                      "Enter the venue of event",
                      style: TextStyle(
                          fontFamily: 'Roboto',
                          fontSize: 16,
                          color: kblackColor),
                    ),
                  ),
                  Container(
                    margin: EdgeInsets.only(top: 5),
                    child: TextFormField(
                      decoration: _commonInputDecoration(context),
                      controller: venueController,
                      onChanged: (value) {},
                    ),
                  ),
                  Container(
                    margin: const EdgeInsets.only(top: 15),
                    child: Text(
                      "Enter the photos link of event",
                      style: TextStyle(
                          fontFamily: 'Roboto',
                          fontSize: 16,
                          color: kblackColor),
                    ),
                  ),
                  Container(
                    margin: EdgeInsets.only(top: 5),
                    child: TextFormField(
                      decoration: _commonInputDecoration(context),
                      maxLines: 1,
                      controller: photosDriveController,
                      onChanged: (value) {},
                    ),
                  ),
                  SizedBox(
                    height: 20,
                  ),
                  Center(
                    child: InkWell(
                      onTap: () async {
                        if (nameController.text.isEmpty) {
                          ScaffoldMessenger.of(context).showSnackBar(
                            SnackBar(
                              content: Text("Please enter event name"),
                            ),
                          );
                          return;
                        }

                        if (aboutController.text.isEmpty) {
                          ScaffoldMessenger.of(context).showSnackBar(
                            SnackBar(
                              content: Text("Please enter about event"),
                            ),
                          );
                          return;
                        }

                        if (dateController.text.isEmpty) {
                          ScaffoldMessenger.of(context).showSnackBar(
                            SnackBar(
                              content: Text("Please enter date of event"),
                            ),
                          );
                          return;
                        }

                        if (startTimeController.text.isEmpty) {
                          ScaffoldMessenger.of(context).showSnackBar(
                            SnackBar(
                              content: Text("Please enter start time of event"),
                            ),
                          );
                          return;
                        }

                        if (endTimeController.text.isEmpty) {
                          ScaffoldMessenger.of(context).showSnackBar(
                            SnackBar(
                              content: Text("Please enter end time of event"),
                            ),
                          );
                          return;
                        }

                        if (venueController.text.isEmpty) {
                          ScaffoldMessenger.of(context).showSnackBar(
                            SnackBar(
                              content: Text("Please enter venue of event"),
                            ),
                          );
                          return;
                        }

                        var res = await eventService.addEvent(
                          name: nameController.text,
                          about: aboutController.text,
                          date: dateController.text,
                          startTime: startTimeController.text,
                          endTime: endTimeController.text,
                          venue: venueController.text,
                          photosDrive: photosDriveController.text,
                          picture: picture,
                        );

                        print("res" + res.toString());

                        if (res) {
                          ScaffoldMessenger.of(context).showSnackBar(
                            SnackBar(
                              content: Text("Event added successfully"),
                            ),
                          );
                          Navigator.pop(context);
                        } else {
                          ScaffoldMessenger.of(context).showSnackBar(
                            SnackBar(
                              content: Text("Couldn't add event"),
                            ),
                          );
                        }
                      },
                      child: Container(
                        width: MediaQuery.of(context).size.width - 20,
                        margin: EdgeInsets.only(top: 15),
                        padding:
                            EdgeInsets.symmetric(vertical: 10, horizontal: 12),
                        decoration: BoxDecoration(
                          color: kpurpleColor,
                          borderRadius: BorderRadius.circular(10.0),
                        ),
                        child: Text(
                          "Edit Details",
                          textAlign: TextAlign.center,
                          style: TextStyle(
                              fontFamily: 'Roboto',
                              fontSize: 15,
                              color: kwhiteColor),
                        ),
                      ),
                    ),
                  ),
                ],
              ),
            ),
          ],
        ),
      ),
    );
  }

  Future<File> xFileToImage(XFile xFile) async {
    return File(xFile.path);
  }
}
