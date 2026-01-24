import { useEffect, useState } from "react";
import axios from "axios";
import Header from "../components/Header";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export default function NgoVolunteerEvents() {
  const [events, setEvents] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/volunteer/events", {
        withCredentials: true,
      })
      .then(res => setEvents(res.data))
      .catch(() => toast.error("Failed to load events"));
  }, []);

  const handleClose = async (id) => {
    await axios.put(
      `http://localhost:5000/api/volunteer/events/${id}/close`,
      {},
      { withCredentials: true }
    );
    toast.success("Event closed");
    setEvents(events.map(e =>
      e.id === id ? { ...e, status: "Closed" } : e
    ));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <div className="max-w-5xl mx-auto px-6 py-10">
        <h2 className="text-2xl font-semibold mb-6">
          Your Volunteer Events
        </h2>

        {events.map(event => (
          <div
            key={event.id}
            className="bg-white rounded-xl border shadow-sm p-6 mb-6"
          >
            <h3 className="text-lg font-semibold text-gray-800">
              {event.event_name}
            </h3>

            <p className="text-sm text-gray-600 mt-1">
              Category: {event.category}
            </p>

            <p className="text-sm mt-1">
              Status:{" "}
              <span
                className={
                  event.status === "Open"
                    ? "text-green-600 font-medium"
                    : "text-red-500 font-medium"
                }
              >
                {event.status}
              </span>
            </p>

            <div className="flex gap-3 mt-4">
              <button
                onClick={() =>
                  navigate(`/ngo/volunteer-events/${event.id}/participants`)
                }
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
              >
                View Participants
              </button>

              {event.status === "Open" && (
                <button
                  onClick={() => handleClose(event.id)}
                  className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
                >
                  Close Event
                </button>
              )}
            </div>
          </div>
        ))}

        {events.length === 0 && (
          <p className="text-gray-500 text-center mt-10">
            No volunteer events posted yet.
          </p>
        )}
      </div>
    </div>
  );
}
