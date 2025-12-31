import React, { useEffect, useState } from "react";
import axios from "axios";
import Header from "../components/Header";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
function Volunteer() {
  const [events, setEvents] = useState([]);
  const user = JSON.parse(sessionStorage.getItem("user"));
  const navigate = useNavigate();
  useEffect(() => {
    const fetchEvents = async () => {
      const res = await axios.get(
        "http://localhost:5000/api/volunteer-events",
        { withCredentials: true }
      );
      setEvents(res.data);
    };

    fetchEvents();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <div className="max-w-6xl mx-auto px-6 py-10">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6">
          Volunteer Opportunities
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {events.map(event => (
            <div
              key={event.id}
              className="bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition"
            >
              <div className="p-6 flex flex-col h-full">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {event.event_name}
                </h3>

                <p className="text-sm text-gray-600 mb-1">
                  <span className="font-medium text-gray-700">Category:</span>{" "}
                  {event.category}
                </p>

                <p className="text-sm text-gray-600 mb-1">
                  <span className="font-medium text-gray-700">Date:</span>{" "}
                  {event.event_date}
                </p>

                <p className="text-sm text-gray-600 mb-3">
                  <span className="font-medium text-gray-700">Location:</span>{" "}
                  {event.location}
                </p>

                <p className="text-gray-700 text-sm mb-4">
                  {event.description}
                </p>

                {/* Push button to bottom */}
                <div className="mt-auto">
                <button
  className="w-full bg-green-600 text-white py-2 rounded-lg font-medium
             hover:bg-green-700 transition"
  onClick={() => {
    if (!user) {
      toast.error("Please login to continue");
      navigate("/login");
      return;
    }
    navigate(`/volunteerresponse/${event.id}`);
  }}
>
  Enroll as Volunteer
</button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {events.length === 0 && (
          <p className="text-center text-gray-500 mt-10">
            No volunteer events available.
          </p>
        )}
      </div>
    </div>
  );
}

export default Volunteer;
