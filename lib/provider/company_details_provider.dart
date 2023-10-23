import 'dart:convert';
import 'dart:io';

import 'package:community/provider/job_service.dart';
import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;
import 'package:get_storage/get_storage.dart';
import 'package:http/http.dart';
import 'package:provider/provider.dart';

class CompanyDetailsProvider extends ChangeNotifier {
  List _companyJobs = [];
  String _companyName = "";
  String _companyEmail = "";
  String _companyAddress = "";
  String _companyPhoto = "";

  List get companyJobs => _companyJobs;
  String get companyName => _companyName;
  String get companyEmail => _companyEmail;
  String get companyAddress => _companyAddress;
  String get companyPhoto => _companyPhoto;

  void setCompanyName(String companyName) {
    _companyName = companyName;
    notifyListeners();
  }

  void setCompanyEmail(String companyEmail) {
    _companyEmail = companyEmail;
    notifyListeners();
  }

  void setCompanyAddress(String companyAddress) {
    _companyAddress = companyAddress;
    notifyListeners();
  }

  void setCompanyPhoto(String companyPhoto) {
    _companyPhoto = companyPhoto;
    notifyListeners();
  }

  Future<void> fetchCompanyDetails() async {
    // print('family id is ${GetStorage().read('familyId')}');
    // return;
    final companyId = GetStorage().read('companyId');
    String url =
        'http://jenilsavla.pythonanywhere.com/api/company/${companyId}';

    final response = await http.get(
      Uri.parse(url),
      headers: {"Authorization": "Token ${GetStorage().read('token')}"},
    );

    if (response.statusCode == 200) {
      print(response.body);

      final responseData = json.decode(response.body);
      _companyJobs = responseData["data"]["jobs"];
      _companyName = responseData["data"]["name"];
      _companyEmail = responseData["data"]["email"];
      _companyAddress = responseData["data"]["address"];
      if (responseData["data"]["picture"] != null) {
        _companyPhoto = responseData["data"]["picture"];
      }
    } else {
      print(response.statusCode);
    }

    notifyListeners();
  }

  Future<dynamic> addOrEditJob(
      BuildContext context,
      String jobTitle,
      String jobType,
      String jobDetails,
      int phoneNumber,
      int? jobId,
      int? index) async {
    try {
      final Response response;
      print(jobTitle);
      print(jobType);
      print(jobDetails);
      print("h");

      if (jobId != null) {
        response = await http.put(
          Uri.parse('http://jenilsavla.pythonanywhere.com/api/job/${jobId}'),
          headers: {
            "Authorization": "Token ${GetStorage().read('token')}",
            'Content-Type': 'application/json',
          },
          body: json.encode({
            'title': jobTitle,
            'type': jobType,
            'details': jobDetails,
            'phone': phoneNumber,
          }),
        );
        //TODO: local changes
      } else {
        response = await http.post(
          Uri.parse('http://jenilsavla.pythonanywhere.com/api/jobs/'),
          headers: {
            "Authorization": "Token ${GetStorage().read('token')}",
            'Content-Type': 'application/json',
          },
          body: json.encode({
            'title': jobTitle,
            'type': jobType,
            'details': jobDetails,
            'phone': phoneNumber,
          }),
        );
      }

      print(response.body);
      print(response.statusCode);
      print(jobId);
      final responseData = json.decode(response.body);
      if (response.statusCode == 200 && jobId == null) {
        _companyJobs.add(responseData["data"]);

        //
        // JobDetailProvider job =
        //     Provider.of<JobDetailProvider>(context, listen: false);

        // JobDetailProvider job =
        //     Provider.of<JobDetailProvider>(context, listen: false);
        // print(job.jobDetails!.length);
        // job.jobDetails!.add(responseData["data"]);
        // print(job.jobDetails!.length.toString() + " new");
        notifyListeners();
      }

      if (response.statusCode == 200 && jobId != null) {
        _companyJobs[index!] = responseData["data"];
        notifyListeners();
      }

      if (responseData['error'] != null) {
        throw HttpException(responseData['error']['message']);
      }

      return responseData['data'];
      // return response.statusCode;

      // final token = responseData['data']['token'];
      // final familyId = responseData['data']['family'];

      // final companyId = responseData['data']['company'];
      // print(token);
    } catch (error) {
      rethrow;
    }
  }

  Future<bool> editMyCompany({
    required File? profilePic,
    required String companyName,
    required String companyEmail,
    required String companyAddress,
  }) async {
    try {
      int? companyId = GetStorage().read('companyId');
      if (companyId == null) return false;

      String url =
          "http://jenilsavla.pythonanywhere.com/api/company/${companyId}";

      Uri uri = Uri.parse(url);

      var request = http.MultipartRequest('PUT', uri);

      request.fields['name'] = companyName;
      request.fields['email'] = companyEmail;
      request.fields['address'] = companyAddress;

      request.headers['Authorization'] = "Token ${GetStorage().read('token')}";

      if (profilePic != null) {
        request.files.add(http.MultipartFile.fromBytes(
          'picture',
          profilePic.readAsBytesSync(),
          filename: profilePic.path.split('/').last,
        ));
      }

      var response = await request.send();

      var response1 = await http.Response.fromStream(response);

      print(response1.body);
      print(response1.statusCode);

      if (response1.statusCode == 200 || response1.statusCode == 201) {
        print("success");

        var responseData = json.decode(response1.body);

        _companyName = responseData["data"]["name"];
        _companyEmail = responseData["data"]["email"];
        _companyAddress = responseData["data"]["address"];
        _companyPhoto = responseData["data"]["picture"];

        notifyListeners();
        return true;
      } else {
        print("failed");
        return false;
      }
    } catch (e) {
      print("error is " + e.toString());
      return false;
    }
  }

  Future<bool> createMyCompany(
      {required File? profilePic,
      required String companyName,
      required String companyEmail,
      required String companyAddress}) async {
    try {
      String url = "http://jenilsavla.pythonanywhere.com/api/companies/";

      Uri uri = Uri.parse(url);

      var request = http.MultipartRequest('POST', uri);

      request.fields['name'] = companyName;
      request.fields['email'] = companyEmail;
      request.fields['address'] = companyAddress;

      request.headers['Authorization'] = "Token ${GetStorage().read('token')}";

      if (profilePic != null) {
        request.files.add(http.MultipartFile.fromBytes(
          'picture',
          profilePic.readAsBytesSync(),
          filename: profilePic.path.split('/').last,
        ));
      }

      var response = await request.send();

      var response1 = await http.Response.fromStream(response);

      print(response1.body);
      print(response1.statusCode);

      if (response1.statusCode == 200 || response1.statusCode == 201) {
        print("success");
        print(response1.body);

        var responseData = json.decode(response1.body);
        print(responseData);

        GetStorage().write('companyId', responseData["data"]["id"]);

        _companyName = responseData["data"]["name"];
        _companyEmail = responseData["data"]["email"];
        _companyAddress = responseData["data"]["address"];

        if (responseData["data"]["picture"] != null) {
          _companyPhoto = responseData["data"]["picture"];
        }

        notifyListeners();
        return true;
      } else {
        print("failed");
        return false;
      }
    } catch (e) {
      print("error is " + e.toString());
      return false;
    }
  }

  Future<bool> deleteJob(int id) async {
    notifyListeners();

    String url = "http://jenilsavla.pythonanywhere.com/api/job/${id}";

    try {
      final res = await http.delete(
        Uri.parse(url),
        headers: {"Authorization": "Token ${GetStorage().read('token')}"},
      );

      print(res.statusCode);

      if (res.statusCode == 200) {
        _companyJobs.removeWhere((element) => element["id"] == id);
        notifyListeners();
        return true;
      } else {
        return false;
      }
    } catch (e) {
      return false;
    }
  }
}
