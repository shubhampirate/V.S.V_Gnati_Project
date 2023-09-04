import 'package:community/provider/company_details_provider.dart';
import 'package:community/provider/event_service.dart';
import 'package:community/provider/family_detail_service.dart';
import 'package:community/provider/home_service.dart';
import 'package:community/provider/job_service.dart';
import 'package:community/provider/matrimony_service.dart';
import 'package:community/provider/members_list_service.dart';
import 'package:community/provider/toggle_state_provider.dart';
import 'package:community/screens/home_screen.dart';
import 'package:community/screens/login_screen.dart';
import 'package:community/screens/payment_screen.dart';
import 'package:community/screens/signup_screen.dart';
import 'package:community/provider/auth_service.dart';
import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:provider/provider.dart';
import 'package:get_storage/get_storage.dart';

import 'screens/forms/add_events_form.dart';

void main() async {
  await GetStorage.init();
  SystemChrome.setEnabledSystemUIMode(SystemUiMode.manual,
      overlays: [SystemUiOverlay.bottom]);
  print('token is ${GetStorage().read('token')}');
  print('Family Id is ${GetStorage().read('familyId')}');
  print('Matrimony Ids are ${GetStorage().read('matrimonyIds')}');

  runApp(const MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  // This widget is the root of your application.
  @override
  Widget build(BuildContext context) {
    return MultiProvider(
      providers: [
        ChangeNotifierProvider(create: ((context) => ToggleStateProvider())),
        ChangeNotifierProvider(create: ((context) => AuthServiceProvider())),
        ChangeNotifierProvider(create: ((context) => HomeProvider())),
        ChangeNotifierProvider(create: ((context) => EventProvider())),
        ChangeNotifierProvider(create: ((context) => FamilyDetailProvider())),
        ChangeNotifierProvider(
            create: ((context) => MatrimonyDetailProvider())),
        ChangeNotifierProvider(create: ((context) => JobDetailProvider())),
        ChangeNotifierProvider(create: ((context) => CompanyDetailsProvider())),
        ChangeNotifierProvider(
            create: ((context) => MatrimonyDetailProvider())),
        ChangeNotifierProvider(create: ((context) => MembersListProvider())),
      ],
      child: MaterialApp(
        debugShowCheckedModeBanner: false,
        home: Consumer<AuthServiceProvider>(
          builder: (context, authService, child) {
            if (authService.user == null) {
              if (GetStorage().read('token') != null) {
                return const HomeScreen();
              } else {
                return const LoginScreen();
              }
              // return const LoginScreen();
            } else {
              return const HomeScreen();
            }
          },
        ),
        // initialRoute: Provider.of<AuthServiceProvider>(context).user != null ? HomeScreen.id : LoginScreen.id,
        routes: {
          LoginScreen.id: (context) => const LoginScreen(),
          SignupScreen.id: (context) => const SignupScreen(),
          HomeScreen.id: (context) => const HomeScreen(),
          PaymentScreen.id: (context) => const PaymentScreen(),
          AddEventForm.id: (context) => const AddEventForm(),
        },
      ),
    );
  }
}

bool getIntialRoute() {
  if (GetStorage().read('token') != null) {
    return true;
  } else {
    return false;
  }
}
