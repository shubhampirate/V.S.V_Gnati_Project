import 'package:community/constants/colors.dart';
import 'package:community/constants/paths.dart';
import 'package:flutter/material.dart';
import 'package:flutter_svg/flutter_svg.dart';
import 'package:intl/intl.dart';
import 'package:url_launcher/url_launcher.dart';

class EventDetailsScreen extends StatefulWidget {
  const EventDetailsScreen(
      {super.key,
      required this.eventName,
      required this.eventAbout,
      required this.eventDate,
      required this.eventVenue,
      required this.eventStartTime,
      required this.eventEndTime,
      required this.eventPhotos,
      required this.eventPicture});

  final String eventName;
  final String eventAbout;
  final String eventDate;
  final String eventVenue;
  final String eventStartTime;
  final String eventEndTime;
  final String eventPhotos;
  final String? eventPicture;

  @override
  State<EventDetailsScreen> createState() => _EventDetailsScreenState();
}

class _EventDetailsScreenState extends State<EventDetailsScreen> {
  @override
  Widget build(BuildContext context) {
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
      ),
      body: Container(
        margin: const EdgeInsets.only(left: 25, right: 25.0),
        child: ListView(
          children: [
            Container(
              child: Text(
                widget.eventName,
                textAlign: TextAlign.center,
                style: TextStyle(
                  color: kbrownColor,
                  fontSize: 24,
                  fontWeight: FontWeight.w700,
                  fontFamily: "Raleway",
                ),
              ),
            ),
            Container(
              margin: const EdgeInsets.only(top: 8),
              child: Text(
                widget.eventDate,
                textAlign: TextAlign.center,
                style: TextStyle(
                  color: kblackColor,
                  fontSize: 16,
                  // fontWeight: FontWeight.w700,
                  fontFamily: "Roboto",
                ),
              ),
            ),
            Container(
              margin: EdgeInsets.only(top: 30.0),
              height: 172,
              width: 350,
              decoration: BoxDecoration(borderRadius: BorderRadius.circular(10.0)),
              // margin: E,
              // color: Color(0xFFC4C4C4),
              child: widget.eventPicture == null
                  ? ClipRRect(
                      borderRadius: BorderRadius.circular(10.0),
                      child: Image.asset(
                        kaboutUsImage,
                        fit: BoxFit.fill,
                      ),
                    )
                  : ClipRRect(
                      borderRadius: BorderRadius.circular(10.0),
                      child: Image.network(
                        kbaseUrlImage + widget.eventPicture!,
                        fit: BoxFit.fill,
                        loadingBuilder: (BuildContext context, Widget child, ImageChunkEvent? loadingProgress) {
                          if (loadingProgress == null) return child;
                          return Center(
                            child: CircularProgressIndicator(),
                          );
                        },
                      ),
                    ),
            ),
            Container(
              margin: const EdgeInsets.only(top: 30.0),
              child: Row(
                children: [
                  SvgPicture.asset(
                    "assets/images/location.svg",
                    height: 30,
                    width: 30,
                  ),
                  const SizedBox(
                    width: 10,
                  ),
                  Text(
                    widget.eventVenue,
                    textAlign: TextAlign.start,
                    style: TextStyle(
                      color: kblackColor,
                      fontFamily: "Roboto",
                      fontWeight: FontWeight.w400,
                      fontSize: 18,
                    ),
                  ),
                ],
              ),
            ),
            Container(
              margin: const EdgeInsets.only(top: 20.0),
              child: Row(
                children: [
                  SvgPicture.asset(
                    "assets/images/calendar.svg",
                    height: 26,
                    width: 26,
                  ),
                  const SizedBox(
                    width: 10,
                  ),
                  Text(
                    "${DateFormat.jm().format(DateTime.parse(widget.eventStartTime).toLocal()).toLowerCase()} - ${DateFormat.jm().format(DateTime.parse(widget.eventEndTime).toLocal()).toLowerCase()}",
                    textAlign: TextAlign.start,
                    style: TextStyle(
                      color: kblackColor,
                      fontFamily: "Roboto",
                      fontWeight: FontWeight.w400,
                      fontSize: 18,
                    ),
                  ),
                ],
              ),
            ),
            Container(
              margin: const EdgeInsets.only(top: 20.0),
              child: InkWell(
                onTap: () async {
                  if (!await launchUrl(Uri.parse(widget.eventPhotos))) {
                    throw Exception('Could not launch "${widget.eventPhotos}"');
                  }
                },
                child: Row(
                  children: [
                    SvgPicture.asset(
                      "assets/images/device-camera.svg",
                      height: 30,
                      width: 30,
                    ),
                    const SizedBox(
                      width: 10.0,
                    ),
                    Text(
                      "View Event Photos",
                      textAlign: TextAlign.start,
                      style: TextStyle(
                        color: kblackColor,
                        fontFamily: "Roboto",
                        fontWeight: FontWeight.w400,
                        fontSize: 18,
                      ),
                    ),
                  ],
                ),
              ),
            ),
            Container(
              margin: const EdgeInsets.only(top: 30.0),
              child: Text(
                "About",
                // textAlign: TextAlign.center,
                style: TextStyle(
                  color: kbrownColor,
                  fontSize: 20,
                  fontWeight: FontWeight.w700,
                  fontFamily: "Raleway",
                ),
              ),
            ),
            Container(
              margin: const EdgeInsets.only(top: 15.0),
              child: Text(
                widget.eventAbout,
                // textAlign: TextAlign.center,
                style: TextStyle(
                  color: kblackColor,
                  fontSize: 15,
                  // fontWeight: FontWeight.w700,
                  fontFamily: "Roboto",
                ),
              ),
            ),
          ],
        ),
      ),
    );
  }
}
