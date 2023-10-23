import 'dart:convert';
import 'dart:io';

import 'package:flutter/material.dart';
import 'package:get_storage/get_storage.dart';
import 'package:http/http.dart' as http;
import 'package:http/http.dart';

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
        Uri.parse(
            'https://jenilsavla.pythonanywhere.com/api/family/${GetStorage().read('familyId')}'),
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

  Future<int> addOrEditMember(
    int? index,
    String? username,
    int? memberId,
    String name,
    String relationWithMainMember,
    String education,
    String emailAddress,
    String phoneNumber,
    String birthDate,
    String professionalStatus,
    String professionalName,
    String gender,
    String bloodGroup,
    String maritialStatus,
  ) async {
    try {
      final Response response;
      // final familyId = GetStorage().read('familyId');
      // print(memberId);
      // print(name);
      // print(relationWithMainMember);
      // print(education);
      // print(emailAddress);
      // print(phoneNumber);
      // print(birthDate);
      // print(professionalStatus);
      // print(professionalName);
      // print(gender);
      // print(bloodGroup);
      // print(maritialStatus);
      if (memberId != null) {
        response = await http.put(
          Uri.parse(
              'http://jenilsavla.pythonanywhere.com/api/add-member/${GetStorage().read('familyId')}'),
          headers: {
            "Authorization": "Token ${GetStorage().read('token')}",
            'Content-Type': 'application/json',
          },
          body: json.encode({
            "username": username,
            "phone": int.parse(phoneNumber),
            "name": name,
            "relation": relationWithMainMember,
            "dob": birthDate,
            "education": education,
            "profession_status": professionalStatus,
            "profession_name": professionalName,
            "gender": gender,
            "blood_group": bloodGroup,
            "maritial_status": maritialStatus,
            "email_address": emailAddress
          }),
        );
      } else {
        response = await http.post(
          Uri.parse(
              'http://jenilsavla.pythonanywhere.com/api/add-member/${GetStorage().read('familyId')}'),
          headers: {
            "Authorization": "Token ${GetStorage().read('token')}",
            'Content-Type': 'application/json',
          },
          body: json.encode({
            "phone": int.parse(phoneNumber),
            "name": name,
            "relation": relationWithMainMember,
            "dob": birthDate,
            "education": education,
            "profession_status": professionalStatus,
            "profession_name": professionalName,
            "gender": gender,
            "blood_group": bloodGroup,
            "maritial_status": maritialStatus,
            "email_address": emailAddress
          }),
        );
      }

      print(response.body);
      final responseData = json.decode(response.body);
      if (response.statusCode == 200 && memberId == null) {
        _memberDetails.add(responseData["data"]);
        notifyListeners();
      } else if (response.statusCode == 200 && memberId != null) {
        _memberDetails[index!] = responseData['data'];
        notifyListeners();
      }
      if (responseData['error'] != null) {
        throw HttpException(responseData['error']['message']);
      }
      return response.statusCode;
      // final token = responseData['data']['token'];
      // final familyId = responseData['data']['family'];

      // final companyId = responseData['data']['company'];
      // print(token);
      // return 200;
    } catch (error) {
      rethrow;
    }
  }

  Future<bool> deleteFamilyMember(int memberId, int index) async {
    bool result = false;

    String url =
        "http://jenilsavla.pythonanywhere.com/api/add-member/${memberId}";

    Uri uri = Uri.parse(url);

    try {
      final res = await http.delete(
        uri,
        headers: {"Authorization": "Token ${GetStorage().read('token')}"},
      );

      print(res.body);
      print(res.statusCode);

      if (res.statusCode == 200) {
        result = true;
      }
    } on Exception catch (e) {
      print(e);
    }

    if (result) {
      memberDetails.removeAt(index);
    }
    notifyListeners();

    // String url =
    return result;
  }

  // void addAnotherOccupationAdress() {
  //   // _is
  // }

  void reset() {
    _isHomeAddressEditing = false;
    _isOtherFieldEditing = false;
    _isOccupationAdressEditing = false;
    _homeAddress = "";
    _gotrej = "";
    _occupationAddress = [];
    _memberDetails = [];
    notifyListeners();
  }
}
