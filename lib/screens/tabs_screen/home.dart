import 'package:community/constants/colors.dart';
import 'package:community/constants/paths.dart';
import 'package:flutter/material.dart';
import 'package:flutter/src/widgets/framework.dart';
import 'package:flutter/src/widgets/placeholder.dart';
import 'package:flutter_svg/flutter_svg.dart';

class HomeTabScreen extends StatefulWidget {
  const HomeTabScreen({super.key});

  @override
  State<HomeTabScreen> createState() => _HomeTabScreenState();
}

class _HomeTabScreenState extends State<HomeTabScreen> {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        backgroundColor: kwhiteColor,
        elevation: 0,
      ),
      body: Container(
        color: kwhiteColor,
        child: ListView(
          children: [
            Padding(
              padding: const EdgeInsets.only(top: 0.0),
              child: Text(
                "Committee",
                textAlign: TextAlign.center,
                style: TextStyle(
                  fontFamily: "Raleway",
                  fontWeight: FontWeight.w700,
                  fontSize: 18,
                  color: kbrownColor,
                ),
              ),
            ),
            Padding(
              padding: const EdgeInsets.only(left: 20, right: 20, top: 10),
              child: Container(
                height: 200,
                width: 318,
                // margin: E,
                // color: Color(0xFFC4C4C4),
                child: Image.asset(
                  kaboutUsImage,
                  fit: BoxFit.fill,
                ),
              ),
            ),
            Padding(
              padding: const EdgeInsets.only(top: 25.0),
              child: Text(
                "About V.S.V Gnati Samasta",
                textAlign: TextAlign.center,
                style: TextStyle(
                  fontFamily: "Raleway",
                  fontWeight: FontWeight.w700,
                  fontSize: 20,
                  color: kbrownColor,
                ),
              ),
            ),
            const Padding(
              padding: EdgeInsets.only(top: 20.0, left: 20, right: 20),
              child: Text(
                "Shree Mumbai Visa Sorathiya Vanik Gnati Samast has in all around 20 mandals. The core and main Mandal is Shree Mumbai Visa Sorathiya Vanik Gnati Samast (Varishth Mandal) which was established in 1940. The other mandals are Srvodaya Madal, Mahila Mandal, Porbandar Boarding Mandal, Pragati Mitra Mandal, Kandivli Yuvak Mandal, Navchetan Mandal, Navyug Mandal, Goregaon Mandal. All mandals carry out different activities of religious functions like Kuldevi Shree Samudrimata Bhana, Bhagwat Saptah, Mala Pehramani, picnics, Rahat by way of Vidhva Sahay, Rehtahan Sahay, Rahta Haptah, Sikhsan Sahay, Note Book Distributions, get-together and social gathering, cultural and traditional program.",
                textAlign: TextAlign.center,
                style: TextStyle(
                  fontFamily: "Roboto",
                  fontWeight: FontWeight.w400,
                  fontSize: 13,
                ),
              ),
            ),
            Padding(
              padding: const EdgeInsets.only(top: 25.0),
              child: Text(
                "HISTORY",
                textAlign: TextAlign.center,
                style: TextStyle(
                  fontFamily: "Raleway",
                  fontWeight: FontWeight.w700,
                  fontSize: 20,
                  color: kbrownColor,
                ),
              ),
            ),
            const Padding(
              padding: EdgeInsets.only(top: 20.0, left: 20, right: 20),
              child: Text(
                "Visa Sorthiya Vanik is a Ganti of people from “Sorath” part in Gujrat. The main origin of the gnati is from Sorath and being parted from Pancha, Dasha and then become Visa. The Gantijan are following mainly the “Vaishnav” Religion. The Gnati was originated in Gujrat and spread into two geographical areas over there viz., “Ghed” & “Naghed”.  The Gnatijan moved to cities and abroad in search of job, education and better opportunities. And now the gnati is spread across the globe. The VSV Gnati has overall 2500 plus families all over the world. The maximum gnatijans are now living in Mumbai and in Gujrat/Saurashtra. Over 1650 families of gnatijans are living in Mumbai and majority of them are staying in Kandivali. Shree Mumbai Visa Sorathiya Vanik Gnati Samast (Varishth Mandal) was established in 1940.",
                textAlign: TextAlign.center,
                style: TextStyle(
                  fontFamily: "Roboto",
                  fontWeight: FontWeight.w400,
                  fontSize: 13,
                ),
              ),
            ),
            Padding(
              padding: const EdgeInsets.only(top: 25.0),
              child: Text(
                "ACTIVITY",
                textAlign: TextAlign.center,
                style: TextStyle(
                  fontFamily: "Raleway",
                  fontWeight: FontWeight.w700,
                  fontSize: 20,
                  color: kbrownColor,
                ),
              ),
            ),
            const Padding(
              padding: EdgeInsets.only(top: 20.0, left: 20, right: 20),
              child: Text(
                "Shree Mumbai Visa Sorathiya Vanik Gnati Samast (Varishth Mandal) is the core mandal of Gnati with sole intention of welfare and upliftment of the gnati. The Varishth mandal has main activity of giving Rahat hapta to the needy members of the gnati, Vidhva Sahay, Rehthan Sahay, bought up harmony amongst the ganti members by organising picnic and social gatherings, cultural and traditional program, carry out the Kudevi Shree Samudri Mata Bhana and Patotsav on behalf of the whole gnati for the blessing of Shree Samudri Mata on the whole Gnati, Maintaining Property of Gnati at Kalbadevi & Nathdwara.The present committee has added one more program of Atam Nirbahr VSV with the sole intention of making the gnati self-reliant a step of transformation from “Rahat” to “Rah to earn”. Visa Sorthiya Vanik has leaped for the first ever major transformation in 2019 when Shree Mumbai Visa Sorathiya Vanik Gnati Samast (Varishth Mandal) has decided to form a committee by way of election giving away the old tradition of selection. The Present Committee elected in 2019 is the first ever elected committee of the GNATI beside that this committee has first ever women members in the committee.",
                textAlign: TextAlign.center,
                style: TextStyle(
                  fontFamily: "Roboto",
                  fontWeight: FontWeight.w400,
                  fontSize: 13,
                ),
              ),
            ),
            Padding(
              padding: const EdgeInsets.only(top: 25.0),
              child: Text(
                "VISION",
                textAlign: TextAlign.center,
                style: TextStyle(
                  fontFamily: "Raleway",
                  fontWeight: FontWeight.w700,
                  fontSize: 20,
                  color: kbrownColor,
                ),
              ),
            ),
            const Padding(
              padding: EdgeInsets.only(top: 20.0, left: 20, right: 20),
              child: Text(
                "Being the Varishth Mandal it is prime duty to bring transparency in the functioning of Gnati. The upliftment of Gnati and take the gnati to the next level by participation of more and more gnatijan and bring them in the main stream of the gnati. Further, it is our duty to align the youth of the gnati to the mainstream and participate in the ganti activiely.  The Committee has been formed with main focus on 3T •	Transformation •	Technology •	Transparency. Transformation thorough Technology and Transparency. The process begins with election, women members in the committee, use of technology by way of you tube live of Shree Samaudri Mataji (Kuldevi) Bhana, Digital Presentation, Atma Nirbhar VSV Yojana, and latest is this digital app. This Digital App and Website which will not only be a Vasti Patrak but also a self-supported portal which can be used as a marriage bureau, job portal, donation collector, communication of activities to gnati at large by all mandals and many more.",
                textAlign: TextAlign.center,
                style: TextStyle(
                  fontFamily: "Roboto",
                  fontWeight: FontWeight.w400,
                  fontSize: 13,
                ),
              ),
            ),
          ],
        ),
      ),
    );
  }
}
