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
import NgoDonations from "./pages/NgoDonations";
import UploadProof from "./pages/UploadProof";
import EventParticipants from "./pages/EventParticipants";
import NgoVolunteerEvents from "./pages/NgoVolunteerEvents";
import About from "./pages/About";
import NgoPage from "./pages/NgoPage";

function App() {
  return (
    
    <Router>
       <Toaster position="top-center" />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/join" element={<JoinPage />} />
        <Route path="/login" element={<Login/>} />
        <Route path="/about" element={<About/>} />
        <Route path="/ngo" element={<NgoPage/>} />
        <Route path="/add-volunteer-event" element={<AddVolunteerEvent/>} />
        <Route path="/add-donation-request" element={<AddDonationRequest/>} />
        <Route path="/donate" element={<Donar/>} />
        <Route path="/volunteer" element={<Volunteer/>} />
        <Route path="/donateresponse/:donationRequestId" element={<DonationResponse />} />
        <Route path="/volunteerresponse/:id" element={<VolunteeringResponse/>} />
        <Route path="/donation-status/:id" element={<DonationStatus />} />
        <Route path="/ngo/donations" element={<NgoDonations />} />
        <Route path="/ngo/donations/:donationRequestId/upload-proof" element={<UploadProof />}/>
        <Route path="/ngo/volunteer-events" element={<NgoVolunteerEvents />} />
        <Route path="/ngo/volunteer-events/:eventId/participants" element={<EventParticipants />} />
      </Routes>
    </Router>
  );
}

export default App;
