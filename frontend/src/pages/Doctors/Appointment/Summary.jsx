import React, { useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import {useNavigate} from "react-router-dom";

import { useSetTheme } from "../../../context/ThemeProvider";
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

export default function Summary({
  doctor,
  selectedDate,
  selectedTime,
  endTime,
  open,
  authUser,
  confirmBooking,
  bookingData,
  handleClose
}) {

  // console.log(selectedDate, selectedTime)
  if (!doctor || !selectedDate) {
    return <p>Loading...</p>; // Handle the case where props are not yet available
  }

  const [isAgree, setIsAgree] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [currTheme] = useSetTheme()
  const navigate = useNavigate()

  const saveToDraft = async (data) => {
    setIsLoading(true);
    try {
      const res = await axios.post("http://localhost:4001/appointment/draft_appointment", data);
      console.log(res.data);
      {res.data.message ? toast.success(res.data.message) : null}
      navigate(`/p/doctors/${res.data?.appointment?.doctor?._id}/appointments/${res.data?.appointment?._id}/payment`,
        {state : {appointment : res.data?.appointment}}
      )
      setIsLoading(false)
    } catch (err) {
      console.log(err);
    }
  };
  return (

    <div className={`my-3 md:me-10 flex w-full max-w-3xl flex-col items-center rounded-2xl border p-6 shadow-lg ${currTheme === "dark"
        ? "bg-slate-800 border-slate-600 text-slate-200"
        : "bg-white border-gray-300"
      } ${open ? "md:w-[90%]" : "md:w-[50%]"}`}>
      <h2 className={`mb-4 text-2xl font-bold ${currTheme === "dark" ? "text-amber-400" : "text-blue-700"}`}>
        {open ? "✅ Confirm Your Details" : "📄 Appointment Summary"}
      </h2>


      <div className="w-full space-y-4">
        <div className="flex flex-col gap-3 md:flex-row md:justify-between">
          <div className="flex flex-1 flex-col rounded-xl border border-gray-300 p-3">
            <h4 className="text-yellow-500">Appointment Date</h4>
            <p className={`text-lg font-semibold ${currTheme === "dark" ? "text-slate-100" : "text-gray-700"}`}>
              {selectedDate.toDateString()}
            </p>

          </div>
          <div className="flex flex-1 flex-col rounded-xl border border-gray-300 p-3">
            <h4 className="text-yellow-500">Appointment Time</h4>
            <p className={`text-lg font-semibold ${currTheme === "dark" ? "text-slate-100" : "text-gray-700"}`}>
              {selectedTime}
            </p>

          </div>
        </div>

        {open && (
          <div className="rounded-xl border border-gray-300 p-3">
            <h4 className="text-yellow-500">Appointment Date</h4>
            <p className={`text-lg font-semibold ${currTheme === "dark" ? "text-slate-100" : "text-gray-700"}`}>
              {selectedDate.toDateString()}
            </p>

          </div>
        )}

        <div className="space-y-3">
          <div className="rounded-xl border border-gray-300 p-3">
            <h4 className="text-yellow-500">Doctor</h4>
            <p className={`text-lg font-semibold ${currTheme === "dark" ? "text-slate-100" : "text-gray-700"}`}>
              {doctor.name}
            </p>

          </div>
          <div className="rounded-xl border border-gray-300 p-3">
            <h4 className="text-yellow-500">Location</h4>
            <p className={`text-lg font-semibold ${currTheme === "dark" ? "text-slate-100" : "text-gray-700"}`}>
              Apollo Hospital, Nashik
            </p>

          </div>
        </div>
      </div>



      {open && (

        <div className="mt-2 flex w-full justify-between gap-4">
          <div className="my-4 flex w-full items-center">
            <input type="checkbox" id="terms" onClick={() => setIsAgree(!isAgree)} className="mr-2" />
            <label htmlFor="terms" className={`text-sm ${currTheme === "dark" ? "text-slate-300" : "text-gray-700"}`}>
              I agree to all <a href="#" className="text-blue-600 underline hover:text-blue-800">terms and conditions</a>.
            </label>
          </div>
          <button
            className="w-1/2 rounded-lg border border-red-500 bg-white py-2 font-semibold text-red-500 hover:bg-red-500 hover:text-white"
            onClick={handleClose}
          >
            Cancel
          </button>
          <button
            className="w-1/2 rounded-lg bg-yellow-400 py-2 font-semibold text-black hover:bg-yellow-500"
            onClick={!isAgree ? () => toast.error("Please agree terms and conditions") : () => {
              const draftData = {
                doctor: doctor._id,
                patient: authUser._id,
                appointmentDate: selectedDate.toDateString(),
                appointmentTime: selectedTime,
                ticketPrice: bookingData.ticketPrice,
                status: "pending",
                isPaid: false,
              };
              saveToDraft(draftData);
            }}
          >
            {isLoading ? (
              <Box sx={{ display: "flex", justifyContent: "center" }}>
                <CircularProgress />
              </Box>
            ) : "Proceed to pay"}
          </button>
        </div>
      )}
    </div>

  );
}
