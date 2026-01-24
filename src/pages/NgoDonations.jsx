import React, { useEffect, useState } from "react";
import axios from "axios";
import Header from "../components/Header";
import { useNavigate } from "react-router-dom";
function NgoDonations() {
  const [donations, setDonations] = useState([]);
  const [donorsByRequest, setDonorsByRequest] = useState({});
  const navigate = useNavigate();
  useEffect(() => {
    fetchDonations();
  }, []);

  const fetchDonations = async () => {
    try {
      const res = await axios.get(
        "http://localhost:5000/api/ngo/donation-requests",
        { withCredentials: true }
      );
      setDonations(res.data || []);
    } catch (err) {
      setDonations([]);
    }
  };

  const closeRequest = async (id) => {
    const ok = window.confirm(
      "Are you sure you want to close this donation request?"
    );
    if (!ok) return;

    await axios.patch(
      `http://localhost:5000/api/ngo/donation-requests/${id}/close`,
      {},
      { withCredentials: true }
    );

    fetchDonations();
  };

  const viewDonors = async (id) => {
    // Toggle OFF if already visible
    if (donorsByRequest[id]) {
      setDonorsByRequest((prev) => {
        const copy = { ...prev };
        delete copy[id];
        return copy;
      });
      return;
    }
    
    // Fetch donors
    const res = await axios.get(
      `http://localhost:5000/api/ngo/donation-requests/${id}/donors`,
      { withCredentials: true }
    );

    setDonorsByRequest((prev) => ({
      ...prev,
      [id]: res.data || [],
    }));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <div className="max-w-6xl mx-auto px-6 py-10">
        <h2 className="text-2xl font-semibold mb-6">Your Donation Requests</h2>

        {donations.length === 0 && (
          <p className="text-gray-500">No donation requests found.</p>
        )}

        {donations.map((d) => (
          <div key={d.id} className="bg-white p-5 rounded-xl shadow mb-6">
            <h3 className="font-semibold text-lg">{d.for_whom}</h3>

            <p className="text-sm text-gray-600">
              Status: {d.lifecycle_status}
            </p>

            {/* ACTION BUTTONS */}
            <div className="flex gap-3 mt-3">
              {/* Close button */}
              {d.lifecycle_status === "open" && (
                <button
                  onClick={() => closeRequest(d.id)}
                  className="bg-red-500 text-white px-4 py-1 rounded"
                >
                  Close
                </button>
              )}

              {(d.lifecycle_status === "funds_received" ||
                d.lifecycle_status === "awaiting_proof" ||
                (d.lifecycle_status === "rejected" && d.attempt_count < 3)) && (
                <button
                  onClick={() =>
                    navigate(`/ngo/donations/${d.id}/upload-proof`)
                  }
                  className={`px-4 py-1 rounded text-white ${
                    d.lifecycle_status === "rejected"
                      ? "bg-yellow-600"
                      : "bg-green-600"
                  }`}
                >
                  {d.lifecycle_status === "rejected"
                    ? "Re-upload Proof"
                    : "Upload Proof"}
                </button>
              )}

              {/* View / Hide Donors */}
              <button
                onClick={() => viewDonors(d.id)}
                className="bg-blue-500 text-white px-4 py-1 rounded"
              >
                {donorsByRequest[d.id] ? "Hide Donors" : "View Donors"}
              </button>
            </div>

            {/* DONORS SECTION */}
            {donorsByRequest[d.id] && (
              <div className="mt-4 border-t pt-4">
                <h4 className="font-semibold mb-2">Donors</h4>

                {donorsByRequest[d.id].length === 0 ? (
                  <p className="text-sm text-gray-500">No donors yet.</p>
                ) : (
                  donorsByRequest[d.id].map((donor, i) => (
                    <div key={i} className="py-2 border-b text-sm">
                      <p>
                        {donor.full_name} ({donor.email})
                      </p>
                      <p>Amount: ₹{donor.amount}</p>
                      <p>Status: {donor.payment_status}</p>
                    </div>
                  ))
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default NgoDonations;
