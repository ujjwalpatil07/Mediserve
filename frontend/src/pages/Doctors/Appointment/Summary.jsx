import React, { useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { useSetTheme } from "../../../context/ThemeProvider";

export default function Summary({
  doctor,
  selectedDate,
  selectedTime,
  endTime,
  open,
  authUser,
  confirmBooking,
  handleClose
}) {
  if (!doctor || !selectedDate) {
    return <p>Loading...</p>; // Handle the case where props are not yet available
  }

  const [isAgree, setIsAgree] = useState(false)
  const [currTheme] = useSetTheme()

  const saveToDraft = async (data) => {
    try {
      const res = await axios.post("http://localhost:4001/draft_appointment", data);
      console.log(res.data);
      {res.data.message ? toast.error(res.data.message) : null}
    } catch (err) {
      console.log(err);
    }
  };
  return (

    <div className={`my-3 flex w-full max-w-3xl flex-col items-center rounded-2xl border p-6 shadow-lg ${currTheme === "dark"
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
            <h4 className="text-yellow-500">Appointment Date</h4>
            <p className={`text-lg font-semibold ${currTheme === "dark" ? "text-slate-100" : "text-gray-700"}`}>
              {selectedDate.toDateString()}
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
            <h4 className="text-yellow-500">Appointment Date</h4>
            <p className={`text-lg font-semibold ${currTheme === "dark" ? "text-slate-100" : "text-gray-700"}`}>
              {selectedDate.toDateString()}
            </p>

          </div>
          <div className="rounded-xl border border-gray-300 p-3">
            <h4 className="text-yellow-500">Appointment Date</h4>
            <p className={`text-lg font-semibold ${currTheme === "dark" ? "text-slate-100" : "text-gray-700"}`}>
              {selectedDate.toDateString()}
            </p>

          </div>
        </div>
      </div>

      <div className="my-4 flex w-full items-center">
        <input type="checkbox" id="terms" onClick={() => setIsAgree(!isAgree)} className="mr-2" />
        <label htmlFor="terms" className={`text-sm ${currTheme === "dark" ? "text-slate-300" : "text-gray-700"}`}>
          I agree to all <a href="#" className="text-blue-600 underline hover:text-blue-800">terms and conditions</a>.
        </label>
      </div>

      {open && (
        <div className="mt-2 flex w-full justify-between gap-4">
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
                appointmentDate: selectedDate,
                ticketPrice: "300Rs",
                status: "pending",
                isPaid: false,
              };
              saveToDraft(draftData);
              confirmBooking();
            }}
          >
            Proceed to Pay
          </button>
        </div>
      )}
    </div>

  );
}
