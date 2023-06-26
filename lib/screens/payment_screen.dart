import 'package:community/constants/paths.dart';
import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:razorpay_flutter/razorpay_flutter.dart';

class PaymentScreen extends StatefulWidget {
  const PaymentScreen({super.key});
  static const String id = '/payment';

  @override
  State<PaymentScreen> createState() => _PaymentScreenState();
}

class _PaymentScreenState extends State<PaymentScreen> {
  late Razorpay _razorpay;
  // String amount = '10200'; // in Paise

  @override
  void initState() {
    _razorpay = Razorpay();
    _razorpay.on(Razorpay.EVENT_PAYMENT_SUCCESS, _handlePaymentSuccess);
    _razorpay.on(Razorpay.EVENT_PAYMENT_ERROR, _handlePaymentError);
    _razorpay.on(Razorpay.EVENT_EXTERNAL_WALLET, _handleExternalWallet);
    super.initState();

    var options = {
      'key': kRazorPayKey,
      // 'callback_url': baseUrl + 'events/v1/participate/payment/verify',
      // key to be added above to ensure transactions
      'amount': 10300,
      //add amount here from the api call
      'name': 'Community',
      'description': 'Donation for Community',
      'timeout': 300, // in seconds
      'prefill': {
        'contact': '8787878787',
        'email': 'community@gmail.com' // email can be changed to one of oculus
      }
    };
    // right now all payments are authorized but not captured automatically
    // for automatic capture backend needs to send an orderId, which needs to be appended in options
    /*
                  *   var options = {
                    'key': "rzp_test_bdduQGHdqKYl9J",
                    'amount':
                    'name': '',
                    'order_id: 'backend',
                    'description': '',
                    'timeout': 300, // in seconds
                    'prefill': {
                      'contact': '',
                      'email': ''
                    }
                  };
                  *
                  * */
    try {
      _razorpay.open(options);
    } on Exception catch (e) {
      ScaffoldMessenger.of(context).showSnackBar(
        const SnackBar(
          content: Text("Payment Failed"),
        ),
      );
    }
  }

//success@razorpay
  _handlePaymentSuccess(PaymentSuccessResponse response) async {
    // Do something when payment succee
    print("Payment success");
    print(response.paymentId);
    ScaffoldMessenger.of(context).showSnackBar(
      const SnackBar(
        content: Text("Payment Success"),
      ),
    );

    // Navigator.of(context).push(
    //   MaterialPageRoute(
    //     builder: (context) => SuccessPage(amount),
    //   ),
    // );
  }

  _handlePaymentError(PaymentFailureResponse response) {
    // Do something when payment fails
    print("Payment Fail");
    print(response.code.toString());
    print(response.message);
    ScaffoldMessenger.of(context).showSnackBar(
      SnackBar(
        content: Text("Payment Fail ${response.message}"),
      ),
    );

    Navigator.of(context).push(
      MaterialPageRoute(
        builder: (context) => FailPage(response.message ?? ''),
      ),
    );
  }

  void _handleExternalWallet(ExternalWalletResponse response) {
    // Do something when an external wallet is selected
  }

  @override
  Widget build(BuildContext context) {
    var size = MediaQuery.of(context).size;
    return Scaffold(
      appBar: AppBar(
        centerTitle: true,
        backgroundColor: Colors.white,
        title: const Text(
          'Payment',
          style: TextStyle(
            color: Colors.black,
          ),
        ),
      ),
      body: Container(
        height: size.height,
        width: size.width,
        child: Column(
          mainAxisAlignment: MainAxisAlignment.start,
          children: [
            SizedBox(
              height: size.height * 0.2,
            ),
            Text(
              "Payment Amount: Rs",
              style: const TextStyle(
                fontSize: 20,
                fontWeight: FontWeight.bold,
              ),
            ),
            SizedBox(
              height: size.height * 0.3,
            ),
            CupertinoButton(
                color: Colors.blue,
                child: const Text("Pay Amount"),
                onPressed: () {
                  ///Make payment
                }),
          ],
        ),
      ),
    );
  }
}

/*
* for UPI testing:
* Use upi id: success@razorpay
* */

class SuccessPage extends StatelessWidget {
  const SuccessPage(this.amount, {super.key});

  final int amount;

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Center(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            // Lottie.asset('assets/lottie/payment-success.json'),
            const Text(
              "Payment Success",
              style: TextStyle(
                fontSize: 20,
              ),
            ),

            const SizedBox(
              height: 120,
            ),

            CupertinoButton(
              color: Colors.blue,
              onPressed: () {
                Navigator.of(context).popUntil((route) => route.isFirst);
              },
              child: const Text(
                "Continue",
                style: TextStyle(
                  fontSize: 20,
                ),
              ),
            ),
          ],
        ),
      ),
    );
  }
}

class FailPage extends StatelessWidget {
  const FailPage(this.reason, {super.key});
  final String reason;

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Center(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            // Lottie.asset('assets/lottie/payment-error.json'),
            const Text(
              "Payment Failed",
              style: TextStyle(
                fontSize: 20,
              ),
            ),
            const SizedBox(
              height: 20,
            ),
            Text(
              reason,
              style: const TextStyle(
                fontSize: 14,
              ),
            ),

            const SizedBox(
              height: 120,
            ),

            CupertinoButton(
              color: Colors.red,
              onPressed: () {
                Navigator.of(context).popUntil((route) => route.isFirst);
              },
              child: const Text(
                "Go back",
                style: TextStyle(
                  fontSize: 20,
                ),
              ),
            ),
          ],
        ),
      ),
    );
  }
}
