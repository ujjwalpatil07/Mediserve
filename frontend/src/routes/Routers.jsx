import React from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";

// Authentication and Context
import { useUserAuth, useDoctorAuth } from "../context/AuthProvider.jsx";

// Pages
import Home from "../pages/Home";
import AboutUs from "../pages/AboutUs";
import Contact from "../pages/Contact";

// Authentication Pages
import Login from "../pages/Auth/Login";
import SignUp from "../pages/Auth/Signup";
import Forget from "../pages/Auth/Forget";

// Services Pages
import Services from "../pages/Services/Services.jsx";
import ServiceInfo from "../pages/Services/ServiceInfo.jsx";

// Doctors Pages
import Doctors from "../pages/Doctors/Doctors";
import DoctorInfo from "../pages/Doctors/DoctorInfo.jsx";

// Hospitals Pages
import HospitalInfo from "../pages/Hospitals/HospitalInfo.jsx";

// Profile Pages
import Edit from "../pages/Profile/Edit.jsx";

// Dashboard Pages
import AppointmentDash from "../d_pages/Dashboard/AppointmentDash.jsx";
import D_Profile from "../d_pages/Profile/D_Profile.jsx";
import MyPatients from "../d_pages/MyPatients.jsx";
import Notifications from "../d_pages/Notifications.jsx";
import Reports from "../d_pages/Reports.jsx";
import Payment from "../pages/Doctors/Appointment/Payment.jsx";
import Landing from "../Landing.jsx";


// import { DoctorDetails } from "../components/DetailedInfo/DoctorDetails.jsx";

export default function Routers() {
  const [authUser] = useUserAuth();
  const [authDoctor] = useDoctorAuth();

  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/p/home" element={authUser ? <Home /> : <Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/forget" element={<Forget />} />
        <Route path="/explore" element={(!authUser || !authDoctor) ? <Landing /> : null} />

        {/* Patient Routes */}
        <Route
          path="/contact"
          element={<Contact />}
        />
        <Route
          path="/about"
          element={<AboutUs />}
        />
        <Route
          path="/p/services"
          element={authUser ? <Services /> : <Navigate to="/login" />}
        />
        <Route
          path="/p/doctors"
          element={authUser ? <Doctors /> : <Navigate to="/login" />}
        />
        <Route
          path="/p/doctors/:id"
          element={authUser ? <DoctorInfo /> : <Navigate to="/login" />}
        />
        <Route
          path="/p/services/:id"
          element={authUser ? <ServiceInfo /> : <Navigate to="/login" />}
        />
        <Route
          path="/p/hospitals/:id"
          element={authUser ? <HospitalInfo /> : <Navigate to="/login" />}
        />
        <Route path="/profile" element={<Edit />} />

        <Route path="appointment/payment" element={authUser ? <Payment /> : <Navigate to="/login" />} />

        {/* Doctor Routes  */}
        <Route
          path="/d/appointments"
          element={authDoctor ? <AppointmentDash /> : <Navigate to="/login" />}
        />
        <Route
          path="/d/profile"
          element={authDoctor ? <D_Profile /> : <Navigate to="/login" />}
        />
        <Route
          path="/d/patients"
          element={authDoctor ? <MyPatients /> : <Navigate to="/login" />}
        />
        <Route
          path="/d/reports"
          element={authDoctor ? <Reports /> : <Navigate to="/login" />}
        />
        <Route
          path="/d/notifications"
          element={authDoctor ? <Notifications /> : <Navigate to="/login" />}
        />
      </Routes>
      <ToastContainer />
    </>
  );
}
