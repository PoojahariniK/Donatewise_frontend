import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import toast from "react-hot-toast";

const categories = [
  "Education","Healthcare","Environment","Poverty Alleviation",
  "Animal Welfare","Disaster Relief","Youth Development","Elderly Care"
];

const AddDonationRequest = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  const [form, setForm] = useState({
    for_whom: "",
    description: "",
    requirements: "",
    purpose: categories[0],
    status: "Open",
  });

  useEffect(() => {
    const stored = sessionStorage.getItem("user");
    if (stored) setUser(JSON.parse(stored));
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user || user.join_type !== "NGO") {
      toast.error("Only NGO users can post donation requests. Please login as NGO.");
      return;
    }

    const payload = { ...form, ngo_id: user.id };

    try {
      const res = await fetch("http://localhost:5000/api/donation-requests", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!res.ok) {
        toast.error(data.message || "Failed to create donation request");
        return;
      }

      toast.success("Donation request created!");
      navigate("/");
    } catch (err) {
      console.error(err);
      toast.error("Server error");
    }
  };

  return (
    <div>
      <Header />
      <div className="max-w-3xl mx-auto p-6">
        <h2 className="text-2xl font-semibold mb-4">Create Donation Request</h2>

        <form
          onSubmit={handleSubmit}
          className="space-y-4 bg-white p-6 rounded shadow"
        >
          <div>
            <label className="block mb-1">For Whom</label>
            <input
              name="for_whom"
              value={form.for_whom}
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded"
              required
            />
          </div>

          <div>
            <label className="block mb-1">Purpose</label>
            <select
              name="purpose"
              value={form.purpose}
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded"
            >
              {categories.map(c => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block mb-1">Description</label>
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded"
              required
            />
          </div>

          <div>
            <label className="block mb-1">Requirements (items / money)</label>
            <textarea
              name="requirements"
              value={form.requirements}
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded"
              required
            />
          </div>

          <button
            type="submit"
            className="bg-gradient-to-r from-blue-500 to-green-400 text-white px-4 py-2 rounded"
          >
            Create Donation Request
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddDonationRequest;
