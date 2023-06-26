import 'dart:convert';
import 'dart:io';

import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;
import 'package:get_storage/get_storage.dart';

class MatrimonyDetailProvider extends ChangeNotifier {
  bool female = false;
  bool male = false;

  bool get femaleValue => female;
  bool get malevalue => male;
  dynamic get myMatrimonyDetails => myMatrinomyData;

  List _matrimonyData = [];
  dynamic myMatrinomyData;
  File? myProfileImage;

  File? get getMyProfileImage => myProfileImage;

  void setMyProfileImage(File file) {
    myProfileImage = file;
    notifyListeners();
  }

  List get matrimonyData => _matrimonyData;

  void setValuefirst(bool value) {
    female = value;
    notifyListeners();
  }

  void setValuesecond(bool value) {
    male = value;
    notifyListeners();
  }

  void clearMatrimonies() {
    _matrimonyData.clear();
    notifyListeners();
  }

  Future<void> addData() async {
    String url = 'https://jenilsavla.pythonanywhere.com/api/matrimonies/';

    final response = await http.post(Uri.parse(url),
        headers: {"Authorization": "Token ${GetStorage().read('token')}"},

        // temporary name in body
        body: jsonEncode({
          'name': myMatrinomyData['name'],
          'about': myMatrinomyData['about'],
          'dob': myMatrinomyData['dob'],
          'phone': myMatrinomyData['phone'],
          'fathers_name': myMatrinomyData['fathers_name'],
          'gender': myMatrinomyData['gender'],
        }));
  }

  Future<void> getMyMatrimonyDetails() async {
    print('family id is ${GetStorage().read('familyId')}');
    // return;
    String url = 'https://jenilsavla.pythonanywhere.com/api/matrimony/${GetStorage().read('familyId')}';

    final response = await http.get(
      Uri.parse(url),
      headers: {"Authorization": "Token ${GetStorage().read('token')}"},
    );

    if (response.statusCode == 200) {
      print(response.body);

      final responseData = json.decode(response.body);
      myMatrinomyData = responseData["data"];
      print(myMatrinomyData["name"]);
    } else {
      print(response.statusCode);
    }

    notifyListeners();
  }

  Future<void> getMatrimonies() async {
    return;
    String? gender;

    if (male == true && female == false) {
      gender = 'Female';
    } else if (male == false && female == true) {
      gender = 'Male';
    }

    // TODO

    String url = 'https://jenilsavla.pythonanywhere.com/api/matrimonies?gender=$gender';

    final response = await http.get(
      Uri.parse(url),
      headers: {"Authorization": "Token ${GetStorage().read('token')}"},
    );

    if (response.statusCode == 200) {
      print(response.body);

      final responseData = json.decode(response.body);

      _matrimonyData = responseData["data"]["matrimonies"];
    } else {
      print(response.statusCode);
    }

    notifyListeners();
  }

  void reset() {
    female = false;
    male = false;
    matrimonyData.clear();
    notifyListeners();
  }
}
