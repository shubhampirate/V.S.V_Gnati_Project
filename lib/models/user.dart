class User {
  final String username;
  final String token;

  User({required this.username, required this.token});

  factory User.fromJson(Map<String, dynamic> json, String token) {
    return User(
      username: json['username'],
      token: token,
    );
  }

  Map<String, dynamic> toJson() {
    return {
      'username': username,
      'token': token,
    };
  }
}
