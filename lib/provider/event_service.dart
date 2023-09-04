import 'dart:convert';
import 'dart:io';

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

  Future<bool> addEvent({
    required String name,
    required String about,
    required String date,
    required String startTime,
    required String endTime,
    required String venue,
    required File? picture,
    required String photosDrive,
  }) async {
    try {
      final uri = Uri.parse('https://jenilsavla.pythonanywhere.com/api/events/');

      final request = http.MultipartRequest('POST', uri);

      request.headers['Authorization'] = "Token ${GetStorage().read('token')}";

      request.fields['name'] = name;
      request.fields['about'] = about;
      request.fields['date'] = date;
      request.fields['start_time'] = startTime;
      request.fields['end_time'] = endTime;
      request.fields['venue'] = venue;
      request.fields['photos_drive'] = photosDrive;

      if (picture != null) {
        request.files.add(
          http.MultipartFile.fromBytes('picture', picture.readAsBytesSync(), filename: picture.path.split('/').last),
        );
      }

      var response = await request.send();

      var response1 = await http.Response.fromStream(response);

      print(response1.body);
      print(response1.statusCode);

      if (response1.statusCode == 200 || response1.statusCode == 201) {
        final responseData = json.decode(response1.body);
        _eventData.add(responseData["data"]);
        notifyListeners();
      } else {
        print('failed');
        return false;
      }
    } catch (e) {
      print("error is " + e.toString());

      return false;
    }

    return true;
  }

  void reset() {
    _eventData.clear();
    notifyListeners();
  }

  // Future<void> getEventData() async {
  //   await fetchEventData();
  // }
}
