import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const response = await fetch("http://localhost:5000/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password })
      });
  
      const data = await response.json();
  
      if (!response.ok) {
        alert(data.message || "Login failed");
        return;
      }
  
      alert("Login successful!");
  
      // Save logged-in user
      localStorage.setItem("user", JSON.stringify(data.user));
  
      navigate('/');
  
    } catch (error) {
      console.error("Error:", error);
      alert("Server error");
    }
  };
  
  

  return (
    <div>
        <Header/>
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
        
      <div className="bg-white shadow-md rounded-2xl p-10 w-full max-w-md">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-2">
          Welcome Back
        </h2>
        <p className="text-center text-gray-600 mb-6">
          Sign in to continue making a difference
        </p>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Email */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Email
            </label>
            <input
              type="email"
              placeholder="your@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Password
            </label>
            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>

          {/* Sign In Button */}
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-blue-500 to-green-400 text-white py-2 rounded-lg font-medium hover:opacity-90"
          >
            Sign In
          </button>
        </form>

        {/* Signup link */}
        <p className="text-center text-gray-600 mt-6">
          Don’t have an account?{" "}
          <button
            onClick={() => navigate("/join")}
            className="text-blue-600 font-medium hover:underline"
          >
            Sign up
          </button>
        </p>
      </div>
    </div>
    </div>
    
  );
};

export default Login;
