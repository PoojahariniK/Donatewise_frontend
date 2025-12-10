import React, { useState } from "react";
import Header from "../components/Header";
import toast from "react-hot-toast";

const JoinPage = () => {
  const [fullName, setFullName] = useState("");
  
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");

  const [address, setAddress] = useState("");

  const [role, setRole] = useState("Donor");
  const [interests, setInterests] = useState([]);
  const [ngoVerified, setNgoVerified] = useState(false);
  const [ngoDetails, setNgoDetails] = useState({
    name: "",
    regNumber: "",
    website: "",
  });

  const handleInterestChange = (e) => {
    const { value, checked } = e.target;
    if (checked) setInterests([...interests, value]);
    else setInterests(interests.filter((i) => i !== value));
  };

  const handleNgoDetailChange = (e) => {
    const { name, value } = e.target;
    setNgoDetails((prev) => ({ ...prev, [name]: value }));
  };

  const handleVerifyNgo = async () => {
    if (!ngoDetails.name || !ngoDetails.regNumber) {
      toast.error("Please fill NGO details before verification.");
      return;
    }
  
    try {
      const res = await fetch("http://localhost:5000/api/verify-ngo", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ngo_name: ngoDetails.name,
          registration_number: ngoDetails.regNumber
        }),
      });
  
      const data = await res.json();
  
      if (res.ok) {
        setNgoVerified(true);
        toast.success("✅ NGO verified successfully!");
      } else {
        setNgoVerified(false);
        toast.error("❌ " + data.message);
      }
    } catch (err) {
      setNgoVerified(false);
      toast.error("Server error while verifying NGO");
    }
  };
  

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      full_name: fullName,
      email: email,
      phone_number: phone,
      address: address,
      city_state: address,
      join_type: role,
      contribution_type:
        role !== "NGO"
          ? role === "Donor"
            ? "Contribute items & resources"
            : "Donate your time & skills"
          : null,
      ngo_name: role === "NGO" ? ngoDetails.name : null,
      registration_number: role === "NGO" ? ngoDetails.regNumber : null,
      website: role === "NGO" ? ngoDetails.website : null,
      is_verified: role === "NGO" ? ngoVerified : false,
      areas_of_interest: interests.length > 0 ? interests.join(",") : null,
      password: password,
    };

    try {
      const res = await fetch("http://localhost:5000/api/join", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (res.ok) {
        toast.success("🎉 Account created successfully!");
    
        // CLEAR ALL FIELDS
        setFullName("");
        setEmail("");
        setPhone("");
        setPassword("");
        setAddress("");
        setRole("Donor");
        setInterests([]);
        setNgoVerified(false);
        setNgoDetails({ name: "", regNumber: "", website: "" });
    }
    else {
        toast.error("❌ Error: " + data.message);
      }
    } catch (err) {
      console.error(err);
      toast.error("Server error. Try again.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="flex justify-center py-10 px-4">
        <div className="bg-white shadow-md rounded-2xl p-10 w-full max-w-3xl">
          <h1 className="text-3xl font-bold text-center text-gray-800">
            Join DonateWise
          </h1>
          <p className="text-gray-500 text-center mt-2 mb-8">
            Start your journey of making a positive impact 🌍
          </p>

          <form className="space-y-6" onSubmit={handleSubmit}>
            {/* Name + Email */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-gray-700 mb-1">Full Name</label>
                <input
                  type="text"
                  placeholder="John Doe"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-400"
                  required
                />
              </div>
              <div>
                <label className="block text-gray-700 mb-1">Email</label>
                <input
                  type="email"
                  placeholder="john@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-400"
                  required
                />
              </div>
            </div>
            <div>
  <label className="block text-gray-700 mb-1">Password</label>
  <input
    type="password"
    placeholder="Create a strong password"
    value={password}
    onChange={(e) => setPassword(e.target.value)}
    className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-400"
    required
  />
</div>


            {/* Phone + Address */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-gray-700 mb-1">Phone Number</label>
                <input
                  type="tel"
                  placeholder="+1 555 123-4567"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-400"
                  required
                />
              </div>
              <div>
                <label className="block text-gray-700 mb-1">Address</label>
                <input
                  type="text"
                  placeholder="City, State"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-400"
                  required
                />
              </div>
            </div>

            {/* Role Selection */}
            <div>
              <p className="font-medium text-gray-700 mb-2">
                I want to join as:
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {["Donor", "Volunteer", "NGO"].map((r) => (
                  <label
                    key={r}
                    className={`flex flex-col items-center border rounded-lg p-4 cursor-pointer ${
                      role === r
                        ? "border-blue-500 bg-blue-50"
                        : "border-gray-300 hover:bg-gray-50"
                    }`}
                  >
                    <input
                      type="radio"
                      name="role"
                      value={r}
                      checked={role === r}
                      onChange={() => {
                        setRole(r);
                        setNgoVerified(false);
                      }}
                      className="hidden"
                    />
                    <span className="font-semibold text-gray-800">{r}</span>
                    <span className="text-sm text-gray-500 mt-1">
                      {r === "Donor"
                        ? "Contribute items & resources"
                        : r === "Volunteer"
                        ? "Donate your time & skills"
                        : "Register your organization"}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            {/* NGO extra fields */}
            {role === "NGO" && (
              <div className="space-y-4 border p-4 rounded-lg bg-gray-50">
                <p className="font-semibold text-gray-700 mb-2">
                  NGO Verification Details
                </p>

                <div>
                  <label className="block text-gray-700 mb-1">NGO Name</label>
                  <input
                    type="text"
                    name="name"
                    placeholder="Helping Hands Foundation"
                    value={ngoDetails.name}
                    onChange={handleNgoDetailChange}
                    className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-400"
                    required
                  />
                </div>

                <div>
                  <label className="block text-gray-700 mb-1">
                    Registration Number
                  </label>
                  <input
                    type="text"
                    name="regNumber"
                    placeholder="NGO123456"
                    value={ngoDetails.regNumber}
                    onChange={handleNgoDetailChange}
                    className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-400"
                    required
                  />
                </div>

                <div>
                  <label className="block text-gray-700 mb-1">
                    Website (optional)
                  </label>
                  <input
                    type="url"
                    name="website"
                    placeholder="https://example.org"
                    value={ngoDetails.website}
                    onChange={handleNgoDetailChange}
                    className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-400"
                  />
                </div>

                <button
                  type="button"
                  onClick={handleVerifyNgo}
                  className="bg-blue-500 text-white py-2 px-4 rounded-lg font-medium hover:bg-blue-600 transition"
                >
                  Verify NGO
                </button>

                {ngoVerified && (
                  <p className="text-green-600 font-medium mt-2">
                    ✅ NGO verified successfully!
                  </p>
                )}
              </div>
            )}

            {/* Areas of Interest */}
            <div>
              <p className="font-medium text-gray-700 mb-2">
                Areas of Interest (select all that apply):
              </p>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {[
                  "Education",
                  "Healthcare",
                  "Environment",
                  "Poverty Alleviation",
                  "Animal Welfare",
                  "Disaster Relief",
                  "Youth Development",
                  "Elderly Care",
                ].map((interest) => (
                  <label key={interest} className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      value={interest}
                      onChange={handleInterestChange}
                      className="accent-blue-500"
                    />
                    <span className="text-gray-700">{interest}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={role === "NGO" && !ngoVerified}
              className={`w-full mt-4 py-3 rounded-lg font-medium transition ${
                role === "NGO" && !ngoVerified
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-gradient-to-r from-blue-500 to-green-400 text-white hover:opacity-90"
              }`}
            >
              Create Account
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default JoinPage;
