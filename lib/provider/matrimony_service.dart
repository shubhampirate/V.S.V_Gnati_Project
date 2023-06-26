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
  List _selfMatrimonyData = []; // self applied matrimonies
  dynamic myMatrinomyData = {}; // for form data
  File? myProfileImage;
  File? myBioData;

  File? get getMyProfileImage => myProfileImage;
  File? get getMyBioData => myBioData;

  void setMyProfileImage(File file) {
    myProfileImage = file;
    notifyListeners();
  }

  void setMyBioData(File file) {
    myBioData = file;
    notifyListeners();
  }

  List get matrimonyData => _matrimonyData;
  List get selfMatrimonyData => _selfMatrimonyData;

  void setMatrimonyData(String key, String value) {
    myMatrinomyData[key] = value;
    notifyListeners();
  }

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

  void clearMyMartrimonyData() {
    myMatrinomyData = {};
    myProfileImage = null;
    myBioData = null;
    notifyListeners();
  }

  Future<bool> addData() async {
    try {
      String url = 'https://jenilsavla.pythonanywhere.com/api/matrimonies/';

      http.MultipartRequest request = http.MultipartRequest('POST', Uri.parse(url));

      request.headers.addAll({"Authorization": "Token ${GetStorage().read('token')}"});

      if (myProfileImage != null) {
        request.files.add(await http.MultipartFile.fromPath('picture', myProfileImage!.path));
      }

      if (myBioData != null) {
        request.files.add(await http.MultipartFile.fromPath('biodata', myBioData!.path));
      }

      request.fields['name'] = myMatrinomyData['name'];
      request.fields['about'] = myMatrinomyData['about'];
      request.fields['dob'] = myMatrinomyData['dob'];
      request.fields['phone'] = myMatrinomyData['phone'];
      request.fields['fathers_name'] = myMatrinomyData['fathers_name'];
      request.fields['gender'] = myMatrinomyData['gender'];

      print("A request Update profile : ${request.toString()}");
      print("A request : ${request.fields.toString()}");
      print("A request : ${request.files.toString()}");
      print("A request : ${request.headers.toString()}");

      http.StreamedResponse response = await request.send();

      print("A response Update profile 2: ${response.statusCode}");
      print("A response Update profile 2: ${response.headers.toString()}");
      print("A response Update profile 2: ${response.request.toString()}");
      print("A response Update profile 2: ${response.reasonPhrase}");

      http.Response response1 = await http.Response.fromStream(response);

      print("A response Update profile3 : ${response1.body}");
      print("A response Update profile : ${response1.statusCode}");
      print("A response Update profile : ${response1.headers.toString()}");
      print("A response Update profile : ${response1.request.toString()}");
      print("A response Update profile : ${response1.body}");
      print("A response Update profile : ${response1.toString()}");

      if (response1.statusCode == 200) {
        print(response1.body);

        final responseData = json.decode(response1.body);

        myMatrinomyData = responseData["data"];
        print(myMatrinomyData["name"]);

        _selfMatrimonyData.add(myMatrinomyData);

        print('matrimony ids are ${GetStorage().read('matrimonyIds')}');

        List list = GetStorage().read('matrimonyIds') ?? [];

        list.add(myMatrinomyData['id']);

        GetStorage().write('matrimonyIds', list);

        print('matrimony ids new are ${GetStorage().read('matrimonyIds')}');
        myMatrinomyData = {};
        myProfileImage = null;
        myBioData = null;

        notifyListeners();
      } else {
        print(response1.statusCode);
        return false;
      }

      return true;
    } catch (e) {
      return false;
    }

    // final response = await http.post(
    //   Uri.parse(url),
    //   headers: {"Authorization": "Token ${GetStorage().read('token')}"},

    //   // temporary name in body
    //   body: jsonEncode({
    //     'name': myMatrinomyData['name'],
    //     'about': myMatrinomyData['about'],
    //     'dob': myMatrinomyData['dob'],
    //     'phone': myMatrinomyData['phone'],
    //     'fathers_name': myMatrinomyData['fathers_name'],
    //     'gender': myMatrinomyData['gender'],
    //   }),

    //   // add myProfileImage as a multipart
    // );
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

  Future<void> getSelfMatrimonies() async {
    if (GetStorage().read('matrimonyIds') == null) {
      return;
    }
    print('matrimony ids are ${GetStorage().read('matrimonyIds')}');
    List matrimonyIds = GetStorage().read('matrimonyIds')!;

    print('family ids are ${GetStorage().read('matrimonyIds')}');

    String url = 'https://jenilsavla.pythonanywhere.com/api/matrimony/';

    // List<Response> response = [];

    // append family id to string

    for (int matrimonyId in matrimonyIds) {
      final response = await http.get(
        Uri.parse(url + matrimonyId.toString()),
        headers: {"Authorization": "Token ${GetStorage().read('token')}"},
      );

      if (response.statusCode == 200) {
        print("my data: ");
        print(response.body);

        final responseData = json.decode(response.body);
        _selfMatrimonyData.add(responseData["data"]);
      } else {
        print(response.statusCode);
      }
    }

    notifyListeners();
  }

  Future<void> getMatrimonies() async {
    // return;
    String gender = malevalue == true ? "Male" : "Female";

    // if (male == true && female == false) {
    //   gender = 'Female';
    // } else if (male == false && female == true) {
    //   gender = 'Male';
    // }

    // // TODO

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

  Future<bool> editMatrimony(int id) async {
    String url = "https://jenilsavla.pythonanywhere.com/api/matrimony/$id";

    Uri uri = Uri.parse(url);

    http.MultipartRequest request = http.MultipartRequest('PUT', uri);

    request.fields['name'] = myMatrinomyData['name'];
    request.fields['about'] = myMatrinomyData['about'];
    request.fields['dob'] = myMatrinomyData['dob'];
    request.fields['phone'] = myMatrinomyData['phone'];
    request.fields['fathers_name'] = myMatrinomyData['fathers_name'];

    request.headers['Authorization'] = "Token ${GetStorage().read('token')}";

    if (myProfileImage != null) {
      request.files.add(await http.MultipartFile.fromPath('picture', myProfileImage!.path));
    }

    if (myBioData != null) {
      request.files.add(await http.MultipartFile.fromPath('biodata', myBioData!.path));
    }

    final response1 = await request.send();

    http.Response response = await http.Response.fromStream(response1);
    var responseData;

    if (response.statusCode == 200) {
      print("sjs");
      print(response.body);

      responseData = json.decode(response.body);

      // _matrimonyData = responseData["data"]["matrimonies"];
    } else {
      print(response.statusCode);
      return false;
    }

    for (var i in _selfMatrimonyData) {
      print("found at name: ${i['name']}");
      if (i['id'] == id) {
        i['name'] = myMatrinomyData['name'];
        i['about'] = myMatrinomyData['about'];
        i['dob'] = myMatrinomyData['dob'];
        i['phone'] = myMatrinomyData['phone'];
        i['fathers_name'] = myMatrinomyData['fathers_name'];
        i["picture"] = responseData["data"]["picture"];
        i["biodata"] = responseData["data"]["biodata"];
        break;
      }
    }

    myMatrinomyData = {};

    myProfileImage = null;
    myBioData = null;

    notifyListeners();

    return true;
  }

  void reset() {
    female = false;
    male = false;
    matrimonyData.clear();
    selfMatrimonyData.clear();

    notifyListeners();
  }
}
