import React, { useEffect } from 'react';
import { Modal } from '@mui/material';

const RazorpayModal = ({ setShowRazorpay, donationamount }) => {
    useEffect(() => {
        const options = {
            key: 'rzp_test_waIi4wtc88B0tM',
            amount: donationamount * 100, // Amount in paise (e.g., 10000 = ₹100)
            currency: 'INR',
            name: 'VSV Gnati Samsta',
            description: 'Donation',
            handler: () => {
                // Handle success payment
                alert('Payment successful!');
                setShowRazorpay(false);
            },
            prefill: {
                email: 'donor@example.com',
                contact: '9876543210',
            },
            theme: {
                color: '#F37254',
            },
        };

        const script = document.createElement('script');
        script.src = 'https://checkout.razorpay.com/v1/checkout.js';
        script.async = true;
        script.onload = () => {
            window.Razorpay && window.Razorpay.open(options);
        };

        document.body.appendChild(script);

        return () => {
            document.body.removeChild(script);
        };
    }, [setShowRazorpay]);

    return (
        <Modal open={true} onClose={() => setShowRazorpay(false)}>
            <div>
                <h2 style={{ backgroundColor: "lightgray" }}>Processing Payment...</h2>
            </div>
        </Modal>
    );
};

export default RazorpayModal;