import React from "react";
import { Toaster } from "react-hot-toast";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import JoinPage from "./pages/JoinPage";
import Login from "./pages/Login";
import AddDonationRequest from "./pages/AddDonationRequest";
import AddVolunteerEvent from "./pages/AddVolunteerEvent";
import Donar from "./pages/Donar";
import Volunteer from "./pages/Volunteer";
import DonationResponse from "./pages/DonationResponse";
import VolunteeringResponse from "./pages/VolunteeringResponse";
import DonationStatus from "./pages/DonationStatus";

function App() {
  return (
    
    <Router>
       <Toaster position="top-center" />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/join" element={<JoinPage />} />
        <Route path="/login" element={<Login/>} />
        <Route path="/add-volunteer-event" element={<AddVolunteerEvent/>} />
        <Route path="/add-donation-request" element={<AddDonationRequest/>} />
        <Route path="/donate" element={<Donar/>} />
        <Route path="/volunteer" element={<Volunteer/>} />
        <Route path="/donateresponse/:donationRequestId" element={<DonationResponse />} />
        <Route path="/volunteerresponse/:id" element={<VolunteeringResponse/>} />
        <Route path="/donation-status/:id" element={<DonationStatus />} />

      </Routes>
    </Router>
  );
}

export default App;
