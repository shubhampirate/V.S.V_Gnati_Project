import 'package:community/screens/home_screen.dart';
import 'package:community/screens/login_screen.dart';
import 'package:community/screens/signup_screen.dart';
import 'package:community/services/auth_service.dart';
import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:provider/provider.dart';
import 'package:get_storage/get_storage.dart';

void main() async {
  await GetStorage.init();
  SystemChrome.setEnabledSystemUIMode(SystemUiMode.manual, overlays: [SystemUiOverlay.bottom]);

  runApp(const MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  // This widget is the root of your application.
  @override
  Widget build(BuildContext context) {
    return MultiProvider(
      providers: [
        ChangeNotifierProvider(create: ((context) => AuthService())),
      ],
      child: MaterialApp(
        debugShowCheckedModeBanner: false,
        initialRoute: getIntialRoute() ? HomeScreen.id : LoginScreen.id,
        routes: {
          LoginScreen.id: (context) => const LoginScreen(),
          SignupScreen.id: (context) => const SignupScreen(),
          HomeScreen.id: (context) => const HomeScreen(),
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
