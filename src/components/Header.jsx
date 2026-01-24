import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
const Header = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  // Load user from localStorage on mount
  useEffect(() => {
    const storedUser = sessionStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  // Logout function
  const handleLogout = async () => {
    await fetch("http://localhost:5000/api/logout", {
      method: "POST",
      credentials: "include",
    });
    sessionStorage.removeItem("user");

    setUser(null);
    navigate("/");
    toast.success("logout successful");
  };

  return (
    <header className="flex items-center justify-between px-10 py-4 shadow-sm bg-white">
      {/* Logo */}
      <div
        className="flex items-center space-x-2 cursor-pointer"
        onClick={() => navigate("/")}
      >
        <span className="text-blue-500 text-2xl">💙</span>
        <h1 className="text-xl font-semibold text-gray-900">DonateWise</h1>
      </div>

      {/* Navigation Links */}
      <nav className="flex space-x-8 text-gray-600 font-medium">
        <button onClick={() => navigate("/")} className="hover:text-blue-600">
          Home
        </button>
        <Link to="/about" className="hover:text-blue-600">
          About
        </Link>
        <Link to="/ngos" className="hover:text-blue-600">
          NGOs
        </Link>

        <Link to="/donate" className="hover:text-blue-600">
          Donate
        </Link>
        <Link to="/volunteer" className="hover:text-blue-600">
          Volunteer
        </Link>

        {/* NGO EXTRA OPTIONS */}
        {user?.join_type === "NGO" && (
          <>
            <button
              onClick={() => navigate("/add-donation-request")}
              className="hover:text-blue-600"
            >
              Add Donation Request
            </button>

            <button
              onClick={() => navigate("/add-volunteer-event")}
              className="hover:text-blue-600"
            >
              Add Volunteer Event
            </button>
            <button
              onClick={() => navigate("/ngo/donations")}
              className="hover:text-blue-600"
            >
              Manage Donation
            </button>
            <button
      onClick={() => navigate("/ngo/volunteer-events")}
      className="hover:text-blue-600"
    >
      Manage Volunteers
    </button>
          </>
        )}
      </nav>

      {/* Right side buttons */}
      <div className="flex items-center space-x-6">
        {/* If NOT logged in */}
        {!user && (
          <>
            <button
              onClick={() => navigate("/login")}
              className="text-gray-800 hover:text-blue-600"
            >
              Login
            </button>

            <button
              onClick={() => navigate("/join")}
              className="bg-gradient-to-r from-blue-500 to-green-400 text-white px-4 py-2 rounded-lg font-medium hover:opacity-90"
            >
              Join Us
            </button>
          </>
        )}

        {/* If LOGGED IN */}
        {user && (
          <>
            <span className="font-semibold text-gray-800">
              Hi, {user.full_name}
            </span>

            <button
              onClick={handleLogout}
              className="bg-red-500 text-white px-4 py-2 rounded-lg font-medium hover:opacity-90"
            >
              Logout
            </button>
          </>
        )}
      </div>
    </header>
  );
};

export default Header;
