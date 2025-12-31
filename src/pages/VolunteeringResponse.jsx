import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Header from "../components/Header";
import toast from "react-hot-toast";

function VolunteeringResponse() {
const { id } = useParams(); // event_id
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEvent = async () => {
      const res = await axios.get(
        `http://localhost:5000/api/volunteer-events/${id}`,
        { withCredentials: true }
      );
      setEvent(res.data);
      setLoading(false);
    };
    fetchEvent();
  }, [id]);

  const enroll = async () => {
    try {
      await axios.post(
        "http://localhost:5000/api/volunteer-response/enroll",
        { eventId: id },
        { withCredentials: true }
      );
      toast.success("Enrolled successfully 🎉");
    } catch (err) {
      toast.error(err.response?.data?.message || "Already enrolled");
    }
  };

  if (loading) return <p className="text-center mt-10">Loading...</p>;

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <div className="max-w-3xl mx-auto mt-10 bg-white p-8 rounded-xl shadow">
        <h2 className="text-2xl font-semibold mb-4">{event.event_name}</h2>

        <p className="text-gray-700 mb-2">
          <b>Category:</b> {event.category}
        </p>
        <p className="text-gray-700 mb-2">
          <b>Date:</b> {event.event_date}
        </p>
        <p className="text-gray-700 mb-2">
          <b>Location:</b> {event.location}
        </p>

        <p className="text-gray-700 mt-4">{event.description}</p>

        <button
          onClick={enroll}
          className="mt-6 w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700"
        >
          Participate
        </button>
      </div>
    </div>
  );
}

export default VolunteeringResponse;
