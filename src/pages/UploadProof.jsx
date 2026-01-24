import React, { useEffect, useState } from "react";
import axios from "axios";
import Header from "../components/Header";
import toast from "react-hot-toast";
import { useParams, useNavigate } from "react-router-dom";
import getDistanceKm from '../utils/getDistanceKm'
function UploadProof() {
  const { donationRequestId } = useParams();
  const navigate = useNavigate();
  
  const [image, setImage] = useState(null);
  const [receipt, setReceipt] = useState(null);
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState(null);
  const [constraint, setConstraint] = useState(null);
  const [distanceKm, setDistanceKm] = useState(null);
  useEffect(() => {
    const fetchConstraint = async () => {
      const res = await axios.get(
        `http://localhost:5000/api/donation-requests/${donationRequestId}`,
        { withCredentials: true }
      );
  
      setConstraint(res.data);
    };
  
    fetchConstraint();
  }, [donationRequestId]);
  
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setLocation({
          lat: pos.coords.latitude,
          lng: pos.coords.longitude
        });
      },
      () => toast.error("Location permission required")
    );
  }, []);

  const submitProof = async () => {
    if (!image || !location || !constraint) {
      toast.error("Image, location, and request data required");
      return;
    }
  
    const dist = getDistanceKm(
      location.lat,
      location.lng,
      constraint.expected_latitude,
      constraint.expected_longitude
    );
  
    setDistanceKm(dist);
  
    if (dist > constraint.allowed_radius_km) {
      toast.error(
        `You are ${dist.toFixed(2)} km away. Allowed radius is ${constraint.allowed_radius_km} km`
      );
      return;
    }
  
    const form = new FormData();
    form.append("donation_request_id", donationRequestId);
    form.append("description", description);
    form.append("latitude", location.lat);
    form.append("longitude", location.lng);
    form.append("image", image);
    if (receipt) form.append("receipt", receipt);
  
    await axios.post(
      "http://localhost:5000/api/ngo/upload-proof",
      form,
      { withCredentials: true }
    );
  
    toast.success("Proof submitted");
    navigate("/ngo/donations");
  };
  

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="max-w-xl mx-auto mt-10 bg-white p-6 rounded shadow">
        <h2 className="text-xl font-semibold mb-4">
          Upload Usage Proof
        </h2>

        <input
          type="file"
          accept="image/*"
          onChange={(e) => setImage(e.target.files[0])}
          className="mb-3"
        />

        <input
          type="file"
          accept="image/*,application/pdf"
          onChange={(e) => setReceipt(e.target.files[0])}
          className="mb-3"
        />

        <textarea
          placeholder="Description of usage"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full border p-2 mb-3"
        />

        {location && (
          <p className="text-sm text-gray-600">
            Location captured: {location.lat}, {location.lng}
          </p>
        )}
        {distanceKm !== null && (
  <p className="text-sm text-gray-600">
    Distance from target: {distanceKm.toFixed(2)} km
  </p>
)}
        <button
          onClick={submitProof}
          className="bg-green-600 text-white px-4 py-2 rounded"
        >
          Submit Proof
        </button>
      </div>
    </div>
  );
}

export default UploadProof;
