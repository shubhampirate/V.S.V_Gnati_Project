import 'dart:convert';

import 'package:flutter/material.dart';
import 'package:flutter/material.dart';
import 'package:get_storage/get_storage.dart';
import 'package:http/http.dart' as http;

class FamilyDetailProvider extends ChangeNotifier {
  bool _isHomeAddressEditing = false;
  bool _isOtherFieldEditing = false;
  bool _isOccupationAdressEditing = false;
  String _homeAddress = "";
  String _gotrej = "";
  List _occupationAddress = [];
  List _memberDetails = [];

  // bool _editfamilyDetails

  bool get isHomeAddressEditing => _isHomeAddressEditing;
  bool get isOtherFieldEditing => _isOtherFieldEditing;
  bool get isOccupationAdressEditing => _isOccupationAdressEditing;
  String get homeAddress => _homeAddress;
  String get gotrej => _gotrej;
  List get occupationAddreess => _occupationAddress;
  List get memberDetails => _memberDetails;

  void editHomeAddress() {
    _isHomeAddressEditing = !_isHomeAddressEditing;
    notifyListeners();
  }

  void editOtherField() {
    _isOtherFieldEditing = !_isOtherFieldEditing;
    notifyListeners();
  }

  void editOccupationAdress() {
    _isOccupationAdressEditing = !_isOccupationAdressEditing;
    notifyListeners();
  }

  void onSaveHomeAddress() {
    _isHomeAddressEditing = false;
    notifyListeners();
  }

  void onSaveOtherField() {
    _isOtherFieldEditing = false;
    notifyListeners();
  }

  void onSaveOccupationAddress() {
    _isOccupationAdressEditing = false;
    notifyListeners();
  }

  // bool get loading => _loading;

  Future<void> fetchFamilyDetails() async {
    // _loading = true;
    // notifyListeners();
    // print("hello");
    try {
      final response = await http.get(
        Uri.parse('https://jenilsavla.pythonanywhere.com/api/family/${GetStorage().read('familyId')}'),
        headers: {"Authorization": "Token ${GetStorage().read('token')}"},
      );
      if (response.statusCode == 200) {
        print(response.body);
        final responseData = json.decode(response.body);
        _homeAddress = responseData["data"]["home_address"];
        _gotrej = responseData["data"]["gotrej"];
        _occupationAddress = responseData["data"]["occupations"];
        _memberDetails = responseData["data"]["members"];
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

  // void addAnotherOccupationAdress() {
  //   // _is
  // }

  void reset() {
    _isHomeAddressEditing = false;
    _isOtherFieldEditing = false;
    _isOccupationAdressEditing = false;
    notifyListeners();
  }
}
