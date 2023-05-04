import 'package:community/constants/colors.dart';
import 'package:community/provider/auth_service.dart';
import 'package:community/provider/event_service.dart';
import 'package:community/provider/family_detail_service.dart';
import 'package:community/provider/home_service.dart';
import 'package:flutter/material.dart';
import 'package:flutter/src/widgets/framework.dart';
import 'package:flutter/src/widgets/placeholder.dart';
import 'package:provider/provider.dart';

class AccountScreen extends StatefulWidget {
  const AccountScreen({super.key});

  @override
  State<AccountScreen> createState() => _AccountScreenState();
}

class _AccountScreenState extends State<AccountScreen> {
  @override
  Widget build(BuildContext context) {
    return Container(
      color: Colors.lightGreenAccent,
      child: Center(
          child: InkWell(
        onTap: () async {
          final authService = Provider.of<AuthServiceProvider>(context, listen: false);
          final homeService = Provider.of<HomeProvider>(context, listen: false);
          final eventService = Provider.of<EventProvider>(context, listen: false);
          final familyDetailService = Provider.of<FamilyDetailProvider>(context, listen: false);
          // context.read<HomeProvider>().dispose();
          homeService.reset();
          eventService.reset();
          familyDetailService.reset();
          authService.signOut();
        },
        child: Text(
          'Logout',
          style: TextStyle(
            color: kwhiteColor,
          ),
        ),
      )),
    );
  }
}
