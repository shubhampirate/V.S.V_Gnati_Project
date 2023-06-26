import 'dart:convert';
import 'dart:io';

import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;
import 'package:get_storage/get_storage.dart';
import 'package:provider/provider.dart';

class JobDetailProvider extends ChangeNotifier {
  List _jobDetails = [];
  List get jobDetails => _jobDetails;

  Future<void> fetchAvailableJobs() async {
    // print('family id is ${GetStorage().read('familyId')}');
    // return;
    String url = 'https://jenilsavla.pythonanywhere.com/api/jobs';

    final response = await http.get(
      Uri.parse(url),
      headers: {"Authorization": "Token ${GetStorage().read('token')}"},
    );

    if (response.statusCode == 200) {
      print(response.body);

      final responseData = json.decode(response.body);
      _jobDetails = responseData["data"]["jobs"];
    } else {
      print(response.statusCode);
    }

    notifyListeners();
  }
}
