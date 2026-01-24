import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import Header from "../components/Header";
import toast from "react-hot-toast";

export default function EventParticipants() {
  const { eventId } = useParams();
  const [list, setList] = useState([]);

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/volunteer/events/${eventId}/participants`,
        { withCredentials: true }
      )
      .then(res => setList(res.data))
      .catch(() => toast.error("Failed to load participants"));
  }, []);
  const markPresent = async (p) => {
    await axios.post(
      "http://localhost:5000/api/volunteer/participants/mark",
      {
        response_id: p.id,
        email: p.email,
        name: p.full_name,
        event_name: "Volunteer Event"
      },
      { withCredentials: true }
    );

    toast.success("Marked as participated & certificate sent");

    setList(list.map(l =>
      l.id === p.id ? { ...l, status: "participated" } : l
    ));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <div className="max-w-4xl mx-auto px-6 py-10">
        <h2 className="text-xl font-semibold mb-6">
          Event Participants
        </h2>

        {list.map(p => (
          <div
            key={p.id}
            className="bg-white p-4 rounded-lg shadow-sm border mb-3 flex justify-between items-center"
          >
            <div>
              <p className="font-medium">{p.full_name}</p>
              <p className="text-sm text-gray-500">{p.email}</p>
              <p className="text-sm mt-1">
                Status: <span className="font-medium">{p.status}</span>
              </p>
            </div>

            {p.status === "enrolled" && (
              <button
                onClick={() => markPresent(p)}
                className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
              >
                Mark Present
              </button>
            )}
          </div>
        ))}

        {list.length === 0 && (
          <p className="text-gray-500 text-center">
            No participants enrolled yet.
          </p>
        )}
      </div>
    </div>
  );
}
