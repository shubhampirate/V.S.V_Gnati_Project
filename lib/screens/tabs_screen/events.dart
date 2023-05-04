import 'package:carousel_slider/carousel_slider.dart';
import 'package:community/constants/colors.dart';
import 'package:community/constants/paths.dart';
import 'package:community/provider/event_service.dart';
import 'package:flutter/material.dart';
import 'package:flutter_svg/flutter_svg.dart';
import 'package:provider/provider.dart';
import 'package:intl/intl.dart';

class EventsScreen extends StatefulWidget {
  const EventsScreen({Key? key}) : super(key: key);

  @override
  State<EventsScreen> createState() => _EventsScreenState();
}

class _EventsScreenState extends State<EventsScreen> {
  @override
  Widget build(BuildContext context) {
    final eventService = Provider.of<EventProvider>(context);
    return Scaffold(
      backgroundColor: kwhiteColor,
      appBar: AppBar(backgroundColor: kwhiteColor, elevation: 0, actions: [
        Padding(
          padding: const EdgeInsets.only(right: 15.0, top: 15),
          child: SvgPicture.asset(
            "assets/images/forward.svg",
          ),
        ),
      ]),
      body: ListView(
        shrinkWrap: true,
        physics: const BouncingScrollPhysics(parent: AlwaysScrollableScrollPhysics()),
        children: [
          Text(
            "Events",
            textAlign: TextAlign.center,
            style: TextStyle(
              color: kbrownColor,
              fontFamily: "Raleway",
              fontWeight: FontWeight.w700,
              fontSize: 24,
            ),
          ),
          Container(
            margin: const EdgeInsets.only(top: 30, left: 20, bottom: 20),
            child: Text(
              "Upcoming Events",
              textAlign: TextAlign.start,
              style: TextStyle(
                color: kbrownColor,
                fontFamily: "Raleway",
                fontWeight: FontWeight.w700,
                fontSize: 15,
              ),
            ),
          ),
          FutureBuilder(
            future: eventService.eventData.isEmpty
                ? Provider.of<EventProvider>(context, listen: false).fetchEventData()
                : null,
            builder: (context, snapshot) {
              if (snapshot.connectionState == ConnectionState.waiting) {
                return const Center(child: CircularProgressIndicator());
              } else if (snapshot.hasError) {
                return const Center(child: Text("An error occurred while fetching events data."));
              } else {
                // final eventsData = snapshot.data;
                return Container(
                  padding: const EdgeInsets.symmetric(horizontal: 20, vertical: 0),
                  child: ListView.builder(
                      itemCount: eventService.eventData.length,
                      physics: const NeverScrollableScrollPhysics(),
                      shrinkWrap: true,
                      itemBuilder: (context, index) {
                        return Container(
                          margin: const EdgeInsets.only(right: 10, left: 10, bottom: 15),
                          child: Column(
                            // mainAxisAlignment: MainAxisAlignment.start,
                            crossAxisAlignment: CrossAxisAlignment.start,
                            children: [
                              Center(
                                child: Container(
                                  height: 172,
                                  width: 350,
                                  decoration: BoxDecoration(borderRadius: BorderRadius.circular(10.0)),
                                  // margin: E,
                                  // color: Color(0xFFC4C4C4),
                                  child: eventService.eventData[index]["picture"] == null
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
                                            kbaseUrlImage + eventService.eventData[index]["picture"],
                                            fit: BoxFit.fill,
                                            loadingBuilder:
                                                (BuildContext context, Widget child, ImageChunkEvent? loadingProgress) {
                                              if (loadingProgress == null) return child;
                                              return Center(
                                                child: CircularProgressIndicator(),
                                              );
                                            },
                                          ),
                                        ),
                                ),
                              ),
                              Container(
                                margin: const EdgeInsets.only(top: 10),
                                child: Text(
                                  "${eventService.eventData[index]["name"]} , ${eventService.eventData[index]["date"]}",
                                  textAlign: TextAlign.start,
                                  style: TextStyle(
                                    // fontStyle: FontStyle.italic,
                                    color: kblackColor,
                                    fontFamily: "Roboto",
                                    fontWeight: FontWeight.w600,
                                    fontSize: 15,
                                  ),
                                ),
                              ),
                              Container(
                                margin: const EdgeInsets.only(top: 10, bottom: 10),
                                child: Row(
                                  mainAxisAlignment: MainAxisAlignment.spaceBetween,
                                  children: [
                                    Container(
                                      child: Row(
                                        children: [
                                          SvgPicture.asset(
                                            "assets/images/location.svg",
                                            height: 25,
                                            width: 25,
                                          ),
                                          const SizedBox(
                                            width: 10,
                                          ),
                                          Text(
                                            "${eventService.eventData[index]["venue"]}",
                                            textAlign: TextAlign.start,
                                            style: TextStyle(
                                              color: kblackColor,
                                              fontFamily: "Roboto",
                                              fontWeight: FontWeight.w400,
                                              fontSize: 15,
                                            ),
                                          ),
                                        ],
                                      ),
                                    ),
                                    Container(
                                      child: InkWell(
                                        onTap: () {},
                                        child: Row(
                                          children: [
                                            SvgPicture.asset(
                                              "assets/images/device-camera.svg",
                                              height: 25,
                                              width: 25,
                                            ),
                                            const SizedBox(
                                              width: 10.0,
                                            ),
                                            Text(
                                              "View Photos",
                                              textAlign: TextAlign.start,
                                              style: TextStyle(
                                                color: kblackColor,
                                                fontFamily: "Roboto",
                                                fontWeight: FontWeight.w400,
                                                fontSize: 15,
                                              ),
                                            ),
                                          ],
                                        ),
                                      ),
                                    ),
                                  ],
                                ),
                              ),
                              Container(
                                margin: const EdgeInsets.only(bottom: 15),
                                child: Row(
                                  mainAxisAlignment: MainAxisAlignment.spaceBetween,
                                  children: [
                                    Container(
                                      child: Row(
                                        children: [
                                          SvgPicture.asset(
                                            "assets/images/calendar.svg",
                                            height: 25,
                                            width: 25,
                                          ),
                                          const SizedBox(
                                            width: 10,
                                          ),
                                          Text(
                                            "${DateFormat.jm().format(DateTime.parse(eventService.eventData[index]["start_time"]).toLocal()).toLowerCase()} - ${DateFormat.jm().format(DateTime.parse(eventService.eventData[index]["end_time"]).toLocal()).toLowerCase()}",
                                            textAlign: TextAlign.start,
                                            style: TextStyle(
                                              color: kblackColor,
                                              fontFamily: "Roboto",
                                              fontWeight: FontWeight.w400,
                                              fontSize: 15,
                                            ),
                                          ),
                                        ],
                                      ),
                                    ),
                                    Container(
                                      padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 2),
                                      decoration: BoxDecoration(
                                        color: kyellowColor,
                                        borderRadius: BorderRadius.circular(10.0),
                                      ),
                                      child: Row(
                                        children: [
                                          Text(
                                            "Know More",
                                            textAlign: TextAlign.start,
                                            style: TextStyle(
                                              color: kblackColor,
                                              fontFamily: "Roboto",
                                              fontWeight: FontWeight.w400,
                                              fontSize: 15,
                                            ),
                                          ),
                                          SvgPicture.asset(
                                            "assets/images/export.svg",
                                            height: 25,
                                            width: 25,
                                          ),
                                        ],
                                      ),
                                    ),
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
          ),
        ],
      ),
    );
  }
}
