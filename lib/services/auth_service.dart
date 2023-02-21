import 'dart:convert';
import 'dart:io';

import 'package:community/models/user.dart';
import 'package:flutter/widgets.dart';
import 'package:get_storage/get_storage.dart';
import 'package:http/http.dart' as http;

class AuthService with ChangeNotifier {
  User? _user;

  User get user => _user!;

  Future<void> signInWithEmailAndPassword(String email, String password) async {
    try {
      final response = await http.post(
        Uri.parse('https://dev-jtzw7l47kq-el.a.run.app/api/accounts/login'),
        headers: {'Content-Type': 'application/json'},
        body: json.encode({
          'email': email,
          'password': password,
        }),
      );

      final responseData = json.decode(response.body);
      if (responseData['error'] != null) {
        throw HttpException(responseData['error']['message']);
      }

      _user = User.fromJson(responseData['user'], responseData['token']);
      GetStorage().write('token', responseData['token']);
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
    notifyListeners();
  }
}
