import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import JoinPage from "./pages/JoinPage";
import Login from "./pages/Login";
import AddDonationRequest from "./pages/AddDonationRequest";
import AddVolunteerEvent from "./pages/AddVolunteerEvent";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/join" element={<JoinPage />} />
        <Route path="/login" element={<Login/>} />
        <Route path="/add-volunteer-event" element={<AddVolunteerEvent/>} />
        <Route path="/add-donation-request" element={<AddDonationRequest/>} />
      </Routes>
    </Router>
  );
}

export default App;
