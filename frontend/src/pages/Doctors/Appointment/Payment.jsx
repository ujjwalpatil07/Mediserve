import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  User,
  Droplet,
  CalendarDays,
  Clock,
  MapPin,
  Stethoscope,
  IndianRupee,
  CreditCard,
} from "lucide-react";
import { Button } from "@mui/material";
import axios from "axios";
import { toast } from "react-toastify";

import { useSetTheme } from "../../../context/ThemeProvider";
import { useUserAuth } from "../../../context/AuthProvider";
import { loadRazorpayScript } from "../../../utils/loadRazorpay";

// Reusable Info Display Component
const InfoItem = ({ icon, label, iconColor }) => (
  <div className="flex items-center gap-2">
    <span className={iconColor}>
      {React.cloneElement(icon, { className: `w-5 h-5 ${iconColor}` })}
    </span>
    <span>{label}</span>
  </div>
);

export default function Payment() {
  const location = useLocation();
  const navigate = useNavigate();
  const { appointment } = location.state || {};
  const { patient, doctor, appointmentDate, appointmentTime, ticketPrice, status } = appointment;

  const [authUser] = useUserAuth();
  const [currTheme] = useSetTheme();
  const [loading, setLoading] = useState(false);
  const [paidAppointment, setPaidAppointment] = useState({});
  const isBooked = paidAppointment?.isPaid || false;

  const isDark = currTheme === "dark";
  const cardBg = isDark
    ? "bg-gradient-to-t from-slate-800 to-slate-900 text-white border-gray-700"
    : "bg-white text-gray-800 border-gray-300";

  const handlePayment = async () => {
    setLoading(true);
    const scriptLoaded = await loadRazorpayScript();

    if (!scriptLoaded) {
      toast.error("Please check your connection");
      setLoading(false);
      return;
    }

    try {
      const { data } = await axios.post("http://localhost:4001/appointment/payment", {
        ticketPrice,
        appointment,
      });

      const { order } = data;

      const options = {
        key: "rzp_test_CTLwMMrrR6wsR5",
        amount: order.amount,
        currency: "INR",
        name: "Mediserve pvt.ltd",
        description: "Test Transaction",
        order_id: order.id,
        handler: async function (response) {
          alert("Payment successful");
          try {
            const { data: receiptData } = await axios.post("http://localhost:4001/appointment/makeReciept", {
              response,
              appointment,
            });

            if (receiptData?.updatedAppointment?.isPaid) {
              setPaidAppointment(receiptData.updatedAppointment);
              navigate("/p/appointments");
            }
          } catch (error) {
            console.error("Error creating receipt:", error);
          }
        },
        prefill: {
          name: authUser.fullName,
          email: authUser.email,
          contact: authUser.phone,
        },
        theme: {
          color: "#3399cc",
        },
      };

      const razorpayInstance = new window.Razorpay(options);
      razorpayInstance.open();
    } catch (error) {
      console.error("Payment error:", error);
      toast.error("Payment failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className={`relative w-full max-w-2xl mx-auto my-6 p-6 rounded-2xl shadow-xl border transition-all ${cardBg}`}
    >
      <span
        className={`absolute top-4 right-4 ${isBooked ? "bg-cyan-600" : "bg-red-600"
          } text-white text-xs font-semibold px-3 py-1 rounded-full shadow-md`}
      >
        {isBooked ? "Approved" : "Pending"}
      </span>

      <h2 className="text-2xl font-bold mb-4 flex items-center gap-2 text-cyan-600 dark:text-cyan-300">
        <CreditCard className="w-6 h-6" />
        Appointment Summary
      </h2>

      {/* Patient Info */}
      <Section title="Patient Details" titleClass="text-blue-600">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <InfoItem icon={<User />} label={patient?.fullName} iconColor="text-blue-500 dark:text-amber-400" />
          <InfoItem icon={<Droplet />} label={patient?.bloodGroup} iconColor="text-red-500 dark:text-pink-400" />
          <InfoItem icon={<User />} label={patient?.gender} iconColor="text-blue-500 dark:text-amber-400" />
        </div>
      </Section>

      {/* Doctor Info */}
      <Section title="Doctor Details" titleClass="text-indigo-600">
        <div className="flex items-center gap-4">
          <img
            src={doctor?.photo}
            alt={doctor?.name}
            className="w-16 h-16 rounded-full object-cover border"
          />
          <div>
            <p className="font-medium flex items-center gap-2 text-indigo-600 dark:text-indigo-300">
              <Stethoscope className="w-5 h-5" />
              {doctor?.name}
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-400">{doctor?.speciality}</p>
          </div>
        </div>
      </Section>

      {/* Appointment Info */}
      <Section title="Appointment Info" titleClass="text-purple-600">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <InfoItem icon={<CalendarDays />} label={appointmentDate} iconColor="text-purple-500 dark:text-purple-300" />
          <InfoItem icon={<Clock />} label={appointmentTime} iconColor="text-purple-500 dark:text-purple-300" />
          <InfoItem icon={<MapPin />} label={doctor?.clinic} iconColor="text-green-600 dark:text-green-400" />
          <InfoItem icon={<IndianRupee />} label={ticketPrice} iconColor="text-yellow-600 dark:text-yellow-400" />
          <InfoItem icon={<CreditCard />} label={status} iconColor="text-cyan-600 dark:text-cyan-300" />
        </div>
      </Section>

      {/* Pay Now Button */}
      <div className="text-center mt-6">
        {isBooked ? (
          <button
            className={`px-6 py-2 rounded-full font-semibold shadow-md transition-colors ${isDark ? "bg-amber-500 hover:bg-amber-600 text-black" : "bg-blue-600 hover:bg-blue-700 text-white"
              }`}
          >
            View Payment Receipt
          </button>
        ) : (
          <Button
            onClick={handlePayment}
            disabled={loading}
            className={`!px-4 !py-2 !rounded-full font-semibold !shadow-md !transition-colors ${isDark ? "!bg-amber-500 !hover:bg-amber-600 !text-black" : "!bg-blue-600 !hover:bg-blue-700 !text-white"
              }`}
          >
            {loading ? "Processing..." : "Pay Now"}
          </Button>
        )}
      </div>
    </div>
  );
}

// Reusable Section Wrapper
const Section = ({ title, titleClass, children }) => (
  <div className="mb-6">
    <h3 className={`text-lg font-semibold mb-2 dark:text-amber-400 ${titleClass}`}>{title}</h3>
    {children}
  </div>
);
