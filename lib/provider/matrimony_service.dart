import 'dart:convert';

import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;
import 'package:get_storage/get_storage.dart';

class MatrimonyDetailProvider extends ChangeNotifier {
  bool female = false;
  bool male = false;

  bool get femaleValue => female;
  bool get malevalue => male;

  List _matrimonyData = [];

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

  Future<void> getMatrimonies() async {
    String? gender;

    if (male == true && female == false) {
      gender = 'Female';
    } else if (male == false && female == true) {
      gender = 'Male';
    }

    // TODO

    String url =
        'https://jenilsavla.pythonanywhere.com/api/matrimonies?gender=Male';

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
