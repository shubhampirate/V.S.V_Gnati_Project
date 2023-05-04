import 'dart:convert';
import 'dart:io';

import 'package:community/models/user.dart';
import 'package:flutter/widgets.dart';
import 'package:get_storage/get_storage.dart';
import 'package:http/http.dart' as http;

class AuthServiceProvider with ChangeNotifier {
  User? _user;
  bool _loading = false;
  bool get loading => _loading;
  User? get user => _user;

  Future<void> signInWithEmailAndPassword(String username, String password) async {
    _loading = true;
    notifyListeners();
    try {
      final response = await http.post(
        Uri.parse('https://jenilsavla.pythonanywhere.com/api/login/'),
        headers: {'Content-Type': 'application/json'},
        body: json.encode({
          'username': username,
          'password': password,
        }),
      );
      print(response.body);
      final responseData = json.decode(response.body);
      if (responseData['error'] != null) {
        throw HttpException(responseData['error']['message']);
      }
      final token = responseData['data']['token'];
      final familyId = responseData['data']['family'];
      print(token);
      _user = User.fromJson(responseData['data'], token);
      GetStorage().write('token', token);
      GetStorage().write('familyId', familyId);

      _loading = false;
      notifyListeners();
    } catch (error) {
      rethrow;
    }
  }

  // Future<void> signUpWithEmailAndPassword(String email, String password) async {
  //   try {
  //     final response = await http.post(
  //       'https://your-api.com/signup',
  //       headers: {'Content-Type': 'application/json'},
  //       body: json.encode({
  //         'email': email,
  //         'password': password,
  //       }),
  //     );

  //     final responseData = json.decode(response.body);
  //     if (responseData['error'] != null) {
  //       throw HttpException(responseData['error']['message']);
  //     }

  //     _user = User.fromJson(responseData['user']);
  //     notifyListeners();
  //   } catch (error) {
  //     throw error;
  //   }
  // }

  void signOut() {
    _user = null;
    GetStorage().erase();
    notifyListeners();
  }
}
