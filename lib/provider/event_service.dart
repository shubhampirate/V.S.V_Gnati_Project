import 'dart:convert';

import 'package:flutter/material.dart';
import 'package:get_storage/get_storage.dart';
import 'package:http/http.dart' as http;

class EventProvider extends ChangeNotifier {
  // bool _loading = false;
  List _eventData = [];

  // bool get loading => _loading;
  List get eventData => _eventData;

  Future<void> fetchEventData() async {
    // _loading = true;
    // notifyListeners();
    // print("hello");
    try {
      final response = await http.get(
        Uri.parse('https://jenilsavla.pythonanywhere.com/api/events'),
        headers: {"Authorization": "Token ${GetStorage().read('token')}"},
      );
      if (response.statusCode == 200) {
        print(response.body);
        final responseData = json.decode(response.body);
        _eventData = responseData["data"]["events"];
      } else {
        print(response.statusCode);
      }
    } catch (e) {
      print(e);
      rethrow;
      // _userData = 'Error fetching user data';
    }
    // _loading = false;
    notifyListeners();
  }

  void reset() {
    _eventData.clear();
    notifyListeners();
  }

  // Future<void> getEventData() async {
  //   await fetchEventData();
  // }
}
