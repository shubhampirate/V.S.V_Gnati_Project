import 'package:community/constants/colors.dart';
import 'package:community/constants/paths.dart';
import 'package:community/screens/payment_screen.dart';
import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:razorpay_flutter/razorpay_flutter.dart';

class DonationScreen extends StatefulWidget {
  const DonationScreen({super.key});

  @override
  State<DonationScreen> createState() => _DonationScreenState();
}

class _DonationScreenState extends State<DonationScreen> {
  TextEditingController _amountController = TextEditingController();
  @override
  Widget build(BuildContext context) {
    // Two Texts in a listView
    return SafeArea(
      child: Scaffold(
        body: ListView(
          children: [
            Column(
              children: [
                const SizedBox(
                  height: 60,
                ),
                Text(
                  'Let\'s make a difference',
                  style:
                      TextStyle(fontSize: 18, fontWeight: FontWeight.bold, fontFamily: 'Raleway', color: kbrownColor),
                ),
                const SizedBox(
                  height: 15,
                ),
                const Text(
                  'Donate Today',
                  style: TextStyle(
                    fontSize: 22,
                    fontFamily: 'Raleway',
                    fontWeight: FontWeight.bold,
                  ),
                ),
                // SizedBox(
                //   height: 20,
                // ),
                const Padding(
                  padding: EdgeInsets.symmetric(horizontal: 25, vertical: 20),
                  child: Text(
                    'Your donation to our society is greatly appreciated. It enables us to make a meaningful impact on our community by supporting education, healthcare, poverty alleviation, and environmental conservation. Your contribution helps uplift the underprivileged, empower marginalized groups, and foster unity. We ensure transparency and accountability in handling your donation, and every amount, no matter how small, makes a difference. With your support, we can create a better future and bring hope to many lives.',
                    style: TextStyle(
                      fontSize: 15,
                      fontFamily: 'Roboto',
                    ),
                    textAlign: TextAlign.center,
                  ),
                ),
                const SizedBox(
                  height: 20,
                ),

                InkWell(
                  onTap: () async {
                    showDialog(
                      context: context,
                      barrierDismissible: true,
                      builder: (_) => AlertDialog(
                        shape: const RoundedRectangleBorder(
                          borderRadius: BorderRadius.all(
                            Radius.circular(8),
                          ),
                        ),
                        title: const Text(
                          "Enter the amount (in ₹)",
                          textAlign: TextAlign.center,
                          style: TextStyle(
                              // fontSize: getHeight(20),
                              ),
                        ),
                        content: Column(
                          mainAxisAlignment: MainAxisAlignment.start,
                          mainAxisSize: MainAxisSize.min,
                          children: [
                            TextField(
                                keyboardType: TextInputType.number,
                                controller: _amountController,
                                decoration: InputDecoration(
                                  isDense: true,
                                  contentPadding: const EdgeInsets.fromLTRB(10, 8, 10, 8),
                                  enabledBorder: OutlineInputBorder(
                                    borderRadius: const BorderRadius.all(Radius.circular(10.0)),
                                    borderSide: BorderSide(color: ktextInputBorderColor, width: 2.0),
                                  ),
                                  focusedErrorBorder: const OutlineInputBorder(
                                    borderRadius: BorderRadius.all(Radius.circular(10.0)),
                                    borderSide: BorderSide(color: Colors.red, width: 2.0),
                                  ),
                                  errorBorder: OutlineInputBorder(
                                    borderRadius: const BorderRadius.all(Radius.circular(10.0)),
                                    borderSide: BorderSide(color: ktextInputBorderColor, width: 2.0),
                                  ),
                                  focusedBorder: OutlineInputBorder(
                                    borderRadius: const BorderRadius.all(Radius.circular(10.0)),
                                    borderSide: BorderSide(color: ktextInputBorderColor, width: 2.0),
                                  ),
                                )),
                            const SizedBox(
                              height: 25,
                            ),
                            CupertinoButton(
                              child: const Text(
                                'Pay',
                                style: TextStyle(color: Colors.white, fontSize: 16, fontWeight: FontWeight.bold),
                              ),
                              color: kyellowColor,
                              onPressed: () {
                                // Navigator.pushNamed(context, PaymentScreen.id);
                                Navigator.of(context).pop();

                                int? amount = int.tryParse(_amountController.text);
                                if (amount != null) {
                                  payAmount(amount * 100); // to convert rupees to paise
                                }
                              },
                            ),
                          ],
                        ),
                        backgroundColor: Colors.white,
                      ),
                    );
                  },
                  child: Container(
                    width: MediaQuery.of(context).size.width * 0.8,
                    margin: const EdgeInsets.only(top: 15),
                    padding: const EdgeInsets.symmetric(vertical: 10, horizontal: 12),
                    decoration: BoxDecoration(
                      color: kyellowColor,
                      borderRadius: BorderRadius.circular(5.0),
                    ),
                    child: Text(
                      "Donate Now",
                      textAlign: TextAlign.center,
                      style: TextStyle(
                        fontFamily: 'Roboto',
                        fontSize: 15,
                        color: ktextColor,
                      ),
                    ),
                  ),
                ),
              ],
            )
          ],
        ),
      ),
    );
  }

  payAmount(int amount) {
    print(amount);

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

      Navigator.of(context).push(
        MaterialPageRoute(
          builder: (context) => SuccessPage(amount),
        ),
      );
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

    Razorpay razorpay = Razorpay();
    razorpay.on(Razorpay.EVENT_PAYMENT_SUCCESS, _handlePaymentSuccess);
    razorpay.on(Razorpay.EVENT_PAYMENT_ERROR, _handlePaymentError);
    razorpay.on(Razorpay.EVENT_EXTERNAL_WALLET, _handleExternalWallet);

    var options = {
      'key': kRazorPayKey,
      // 'callback_url': baseUrl + 'events/v1/participate/payment/verify',
      // key to be added above to ensure transactions
      'amount': amount,
      'theme.color': '#E99B01',
      //add amount here from the api call
      'name': 'Community',
      'description': 'Donation for Community',
      'timeout': 300, // in seconds
      'prefill': {
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
      razorpay.open(options);
    } on Exception catch (e) {
      ScaffoldMessenger.of(context).showSnackBar(
        const SnackBar(
          content: Text("Payment Failed"),
        ),
      );
    }
  }
}
