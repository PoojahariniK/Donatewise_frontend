import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";

const categories = [
  "Education","Healthcare","Environment","Poverty Alleviation",
  "Animal Welfare","Disaster Relief","Youth Development","Elderly Care"
];

const AddVolunteerEvent = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  const [form, setForm] = useState({
    event_name: "",
    category: categories[0],
    description: "",
    total_volunteers: 1,
    event_date: "",
    location: "",
    status: "Open"
  });

  useEffect(() => {
    const stored = localStorage.getItem("user");
    if (stored) setUser(JSON.parse(stored));
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user || user.join_type !== "NGO") {
      alert("Only NGO users can post volunteer events. Please login as NGO.");
      return;
    }

    const payload = { ...form, ngo_id: user.id };

    try {
      const res = await fetch("http://localhost:5000/api/volunteer-events", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });

      const data = await res.json();
      if (!res.ok) {
        alert(data.message || "Failed to create event");
        return;
      }

      alert("Volunteer event created!");
      navigate("/"); // or wherever
    } catch (err) {
      console.error(err);
      alert("Server error");
    }
  };

  return (
    <div>
      <Header />
      <div className="max-w-3xl mx-auto p-6">
        <h2 className="text-2xl font-semibold mb-4">Create Volunteer Event</h2>

        <form onSubmit={handleSubmit} className="space-y-4 bg-white p-6 rounded shadow">
          <div>
            <label className="block mb-1">Event Name</label>
            <input name="event_name" value={form.event_name} onChange={handleChange}
              className="w-full border px-3 py-2 rounded" required />
          </div>

          <div>
            <label className="block mb-1">Category</label>
            <select name="category" value={form.category} onChange={handleChange} className="w-full border px-3 py-2 rounded">
              {categories.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>

          <div>
            <label className="block mb-1">Description</label>
            <textarea name="description" value={form.description} onChange={handleChange} className="w-full border px-3 py-2 rounded" required />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block mb-1">Total Volunteers</label>
              <input name="total_volunteers" type="number" min="1" value={form.total_volunteers} onChange={handleChange} className="w-full border px-3 py-2 rounded" required />
            </div>

            <div>
              <label className="block mb-1">Event Date</label>
              <input name="event_date" type="date" value={form.event_date} onChange={handleChange} className="w-full border px-3 py-2 rounded" required />
            </div>
          </div>

          <div>
            <label className="block mb-1">Location</label>
            <input name="location" value={form.location} onChange={handleChange} className="w-full border px-3 py-2 rounded" required />
          </div>

          <button type="submit" className="bg-gradient-to-r from-blue-500 to-green-400 text-white px-4 py-2 rounded">Create Event</button>
        </form>
      </div>
    </div>
  );
};

export default AddVolunteerEvent;
