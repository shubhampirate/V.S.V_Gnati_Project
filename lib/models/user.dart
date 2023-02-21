class User {
  final String id;
  final String email;
  final String token;

  User({required this.id, required this.email, required this.token});

  factory User.fromJson(Map<String, dynamic> json, Map<String, dynamic> token) {
    return User(
      id: json['id'],
      email: json['email'],
      token: token['token'],
    );
  }

  Map<String, dynamic> toJson() {
    return {
      'id': id,
      'email': email,
      'token': token,
    };
  }
}
