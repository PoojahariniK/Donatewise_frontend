import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Header from "../components/Header";
import toast from "react-hot-toast";

function DonationResponse() {
  const { donationRequestId } = useParams();
  const navigate = useNavigate();
  const [amount, setAmount] = useState("");

  const handlePayment = async () => {
    if (!amount || amount <= 0) {
      toast.error("Enter a valid amount");
      return;
    }

    const res = await axios.post(
      "http://localhost:5000/api/payments/create-order",
      {
        donationRequestId,
        amount
      },
      { withCredentials: true }
    );

    const { orderId, donationResponseId } = res.data;
    console.log(orderId,donationResponseId);
    if(! donationResponseId){
      toast.error("Payment Initialization Failed");
      return ;
    }
    const options = {
      key: process.env.REACT_APP_RAZORPAY_KEY,
      amount: amount * 100,
      currency: "INR",
      name: "DonateWise",
      description: "Donation Payment",
      order_id: orderId,

      handler: function () {
        toast.success("Payment initiated");

        // 🔥 NAVIGATE TO STATUS PAGE
        navigate(`/donation-status/${donationResponseId}`);
      },

      modal: {
        ondismiss: function () {
          toast("Payment cancelled");
          navigate(`/donation-status/${donationResponseId}`);
        }
      }
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <div className="max-w-md mx-auto mt-16 bg-white p-6 rounded-xl shadow">
        <h2 className="text-xl font-semibold mb-4">Donate Amount</h2>

        <input
          type="number"
          placeholder="Enter amount"
          className="w-full border rounded-lg px-3 py-2 mb-4"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />

        <button
          onClick={handlePayment}
          className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
        >
          Proceed to Pay
        </button>
      </div>
    </div>
  );
}

export default DonationResponse;
