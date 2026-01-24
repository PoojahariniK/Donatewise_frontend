import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Header from "../components/Header";

function DonationStatus() {
  const { id } = useParams();
  const [paymentStatus, setPaymentStatus] = useState("pending");

  useEffect(() => {
    if (!id) return;

    const interval = setInterval(async () => {
      try {
        const res = await axios.get(
          `http://localhost:5000/api/payments/status/${id}`,
          { withCredentials: true }
        );

        const status = res.data.payment_status;
        setPaymentStatus(status);

        //  STOP POLLING once resolved
        if (status !== "pending") {
          clearInterval(interval);
        }
      } catch (err) {
        console.error("Status fetch error", err);
        clearInterval(interval);
      }
    }, 3000);

    return () => clearInterval(interval);
  }, [id]);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <div className="max-w-md mx-auto mt-16 bg-white p-6 rounded-xl shadow text-center">
        <h2 className="text-xl font-semibold mb-4">Payment Status</h2>

        {paymentStatus === "pending" && (
          <p className="text-yellow-500">Processing payment...</p>
        )}

        {paymentStatus === "success" && (
          <p className="text-green-600 font-semibold">
            Payment Successful 🎉
          </p>
        )}

        {paymentStatus === "failed" && (
          <p className="text-red-500 font-semibold">
            Payment Failed ❌
          </p>
        )}

        {paymentStatus === "cancelled" && (
          <p className="text-red-500 font-semibold">
            Payment Cancelled
          </p>
        )}
      </div>
    </div>
  );
}

export default DonationStatus;
