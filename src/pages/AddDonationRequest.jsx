import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";

const categories = [
  "Education","Healthcare","Environment","Poverty Alleviation",
  "Animal Welfare","Disaster Relief","Youth Development","Elderly Care"
];

const AddDonationRequest = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  const donationTypes = ["money", "things", "both"];

const [form, setForm] = useState({
  for_whom: "",
  description: "",
  requirements: "",
  category: categories[0],
  status: "Open",
  donation_type: "things",
  account_number: "",
  ifsc_code: ""
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
      alert("Only NGO users can post donation requests. Please login as NGO.");
      return;
    }

    const payload = { ...form, ngo_id: user.id };

    try {
      const res = await fetch("http://localhost:5000/api/donation-requests", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });

      const data = await res.json();
      if (!res.ok) {
        alert(data.message || "Failed to create donation request");
        return;
      }

      alert("Donation request created!");
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
        <h2 className="text-2xl font-semibold mb-4">Create Donation Request</h2>

        <form onSubmit={handleSubmit} className="space-y-4 bg-white p-6 rounded shadow">
          <div>
            <label className="block mb-1">For Whom</label>
            <input name="for_whom" value={form.for_whom} onChange={handleChange} className="w-full border px-3 py-2 rounded" required />
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

          <div>
            <label className="block mb-1">Requirements (items / money)</label>
            <textarea name="requirements" value={form.requirements} onChange={handleChange} className="w-full border px-3 py-2 rounded" required />
          </div>
          <div>
  <label className="block mb-1">Donation Type</label>
  <select name="donation_type" value={form.donation_type} onChange={handleChange} className="w-full border px-3 py-2 rounded">
    {donationTypes.map(t => <option key={t} value={t}>{t}</option>)}
  </select>
</div>
{(form.donation_type === "money" || form.donation_type === "both") && (
  <>
    <div>
      <label className="block mb-1">Account Number</label>
      <input name="account_number" value={form.account_number} onChange={handleChange} className="w-full border px-3 py-2 rounded" required />
    </div>

    <div>
      <label className="block mb-1">IFSC Code</label>
      <input name="ifsc_code" value={form.ifsc_code} onChange={handleChange} className="w-full border px-3 py-2 rounded" required />
    </div>
  </>
)}



          <button type="submit" className="bg-gradient-to-r from-blue-500 to-green-400 text-white px-4 py-2 rounded">Create Donation Request</button>
        </form>
      </div>
    </div>
  );
};

export default AddDonationRequest;
