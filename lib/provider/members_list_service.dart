import 'package:flutter/material.dart';
import 'package:get_storage/get_storage.dart';
import 'package:http/http.dart' as http;
import 'dart:convert';
import 'dart:io';

class MembersListProvider extends ChangeNotifier {
  bool? _female;
  bool? _male;

  bool? _maritalStatusMarried;
  bool? _maritalStatusUnmarried;

  bool _profBusiness = false;
  bool _profJob = false;

  bool? get femaleValue => _female;
  bool? get maleValue => _male;

  void setGenderFemale(bool value) {
    _female = value;
    notifyListeners();
  }

  void setGenderMale(bool value) {
    _male = value;
    notifyListeners();
  }

  bool? get maritalStatusMarriedValue => _maritalStatusMarried;
  bool? get maritalStatusUnmarriedValue => _maritalStatusUnmarried;

  void setMaritalStatusMarried(bool value) {
    _maritalStatusMarried = value;
    notifyListeners();
  }

  void setMaritalStatusUnmarried(bool value) {
    _maritalStatusUnmarried = value;
    notifyListeners();
  }

  bool get profBusinessValue => _profBusiness;
  bool get profJobValue => _profJob;

  void setProfBusiness(bool value) {
    _profBusiness = value;
    notifyListeners();
  }

  void setProfJob(bool value) {
    _profJob = value;
    notifyListeners();
  }

  String membername = '';
  String education = '';
  String phone = '';
  String profession = 'All';
  String gotRej = '';
  String native = '';

  String get getProfession => profession;

  void setMemberName(String value) {
    membername = value;
    notifyListeners();
  }

  void setEducation(String value) {
    education = value;
    notifyListeners();
  }

  void setPhone(String value) {
    phone = value;
    notifyListeners();
  }

  void setProfession(String value) {
    profession = value;
    notifyListeners();
  }

  void setGotRej(String value) {
    gotRej = value;
    notifyListeners();
  }

  void setNative(String value) {
    native = value;
    notifyListeners();
  }

  List _membersList = []; // to display filtered members
  List _originalMembersList = []; // to store all members

  List get membersList => _membersList;
  List get originalMembersList => _originalMembersList;

  void setMembersList(List membersList) {
    _membersList = membersList;
    notifyListeners();
  }

  Future<bool> getMemberList() async {
    String url = 'https://jenilsavla.pythonanywhere.com/api/members/';

    http.Response response = await http.post(
      Uri.parse(url),
      headers: {"Authorization": "Token ${GetStorage().read('token')}"},
      // body: {"name": ""}
    );

    if (response.statusCode == 200) {
      print('sjsjd');
      print(response.body);
      final responseData = json.decode(response.body);
      _membersList = responseData['data'];
      _originalMembersList = responseData['data'];
      notifyListeners();
      return true;
    } else {
      print(response.statusCode);
    }

    notifyListeners();
    return false;
  }

  void filterList() {
    if (_originalMembersList.isEmpty) {
      return;
    }

    print('before filter ');
    print(_originalMembersList.length);

    // _membersList.clear();
    List newlist = [];

    _originalMembersList.forEach((element) {
      bool condition1 = element["name"]
              .toString()
              .toLowerCase()
              .contains(membername.toLowerCase()) &&
          element["education"]
              .toString()
              .toLowerCase()
              .contains(education.toLowerCase()) &&
          // element["phone"]
          //     .toString()
          //     .toLowerCase()
          //     .contains(phone.toLowerCase()) &&
          // element["profession_name"]
          //     .toString()
          //     .toLowerCase()
          //     .contains(profession.toLowerCase()) &&
          element["gotrej"]
              .toString()
              .toLowerCase()
              .contains(gotRej.toLowerCase()) &&
          element["native_village"]
              .toString()
              .toLowerCase()
              .contains(native.toLowerCase());

      bool condition2 = () {
        print('co2');
        print(_female);
        print(_male);

        if (_male != null &&
            _female != null &&
            _male == true &&
            _female == true) return true; // edge case if both are selected

        if (_male != null &&
            _female != null &&
            _male == false &&
            _female == false)
          return true; // if none are selected display both male and female

        if (_female != null) {
          if (!_female! && element["gender"] == "Female") {
            print('p1');
            return false;
          }
        }
        if (_male != null) {
          if (!_male! && element["gender"] == "Male") {
            print('p2');
            return false;
          }
        }

        // if (!_maritalStatusMarried && element["marital_status"] == "Married") {
        //   return false;
        // }
        // if (!_maritalStatusUnmarried &&
        //     element["marital_status"] == "Unmarried") {
        //   return false;
        // }

        return true;
      }();

      bool condition3 = () {
        if (_maritalStatusMarried != null &&
            _maritalStatusUnmarried != null &&
            _maritalStatusMarried == _maritalStatusUnmarried) {
          return true;
        }

        if (_maritalStatusMarried != null) {
          if (_maritalStatusMarried == true &&
              element["marital_status"] != "Single") return false;
        }

        if (_maritalStatusUnmarried != null) {
          if (_maritalStatusUnmarried == true &&
              element["marital_status"] == "Single") return false;
        }

        return true;
      }();

      bool condition4 = () {
        if (profession == "All" || profession == "") {
          return true;
        }

        if (profession == element["profession_name"]) {
          return true;
        }

        return false;
      }();

      print(element["name"]);
      print(condition1);
      print(condition2);
      print(condition4);

      if (condition1 && condition2 && condition3 && condition4) {
        newlist.add(element);
      }
    });

    print('after filter ');
    print(newlist.length);

    _membersList = newlist;

    notifyListeners();

    return;
  }

  void clearMembersList() {
    _membersList.clear();
    notifyListeners();
  }

  void reset() {
    _membersList.clear();
    notifyListeners();
  }
}
