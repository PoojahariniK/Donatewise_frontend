import React, { useEffect, useState } from "react";
import axios from "axios";
import Header from "../components/Header";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

function Donar() {
  const navigate = useNavigate();
  const [donations, setDonations] = useState([]);
  const user = JSON.parse(sessionStorage.getItem("user"));

  useEffect(() => {
    const fetchDonations = async () => {
      const res = await axios.get("http://localhost:5000/api/donations", {
        withCredentials: true,
      });
      setDonations(res.data);
    };

    fetchDonations();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <div className="max-w-6xl mx-auto px-6 py-10">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6">
          Donation Requests
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {donations.map((d) => (
            <div
              key={d.id}
              className="bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition"
            >
              <div className="p-6 flex flex-col h-full">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {d.for_whom}
                </h3>

                <p className="text-sm text-gray-600 mb-1">
                  <span className="font-medium text-gray-700">Purpose:</span>{" "}
                  {d.purpose}
                </p>

                <p className="text-gray-700 text-sm mb-4">{d.description}</p>

                {/* Spacer pushes button to bottom */}
                <div className="mt-auto">
                  <button
                    className="w-full bg-blue-600 text-white py-2 rounded-lg font-medium
             hover:bg-blue-700 transition"
                    onClick={() => {
                      if (!user) {
                        toast.error("Login to proceed with donation");
                        navigate("/login");
                      } else {
                        navigate(`/donateresponse/${d.id}`);
                      }
                    }}
                  >
                    Donate
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {donations.length === 0 && (
          <p className="text-center text-gray-500 mt-10">
            No donation requests available.
          </p>
        )}
      </div>
    </div>
  );
}

export default Donar;
