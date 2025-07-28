import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import { styled } from "@mui/material/styles";
import { toast } from "react-toastify";
import axios from "axios";

import Summary from "./Summary";
import { useUserAuth } from "../../../context/AuthProvider";
import { useSetTheme } from "../../../context/ThemeProvider";
import { useBookedAppos } from "../../../context/BookedApposProvider";

// Styled MUI Dialog
const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

// ==========================
// Schedule Component
// ==========================
export default function Schedule({
  handleNext,
  handlePrev,
  daysOfWeek,
  dates,
  fun_setSelectedDate,
  selectedDate,
  selectedTime,
  endTime,
  fun_setSelectedTime,
  setSelectedTime,
  doctor,
}) {
  // ==========================
  // Hooks & States
  // ==========================
  const [authUser] = useUserAuth();
  const [currTheme] = useSetTheme();
  const [open, setOpen] = useState(false);
  const { bookedAppos, setBookedAppos, draftedAppos, setDraftedAppos} = useBookedAppos()

  const [bookingData, setBookingData] = useState({
    doctor: "",
    patient: "",
    appointmentDate: new Date().toDateString(),
    appointmentTime: new Date().toTimeString(),
    ticketPrice: null,
    status: "",
    isPaid: false,
  });

  // ==========================
  // Dialog Handlers
  // ==========================
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  // ==========================
  // Booking Handler
  // ==========================
  const handleBooking = () => {

    if (selectedDate === null) {
      return toast.error("Please select date")
    }

    if (selectedTime === null) {
      return toast.error("Please select time slot")
    }
    setBookingData({
      doctor: doctor._id,
      patient: authUser._id,
      appointmentDate: selectedDate,
      appointmentTime: selectedTime,
      ticketPrice: 500,
      status: "pending",
      isPaid: false,
    });
    handleClickOpen();
  };

  const bookedSlots = [];
  const draftedSlots = [];

  const [isVacant, setIsVacant] = useState(false);

  useEffect(() => {
    const getBookedAppointments = async () => {
      try {
        const res = await axios.post("http://localhost:4001/appointment/get_appointments")
        // console.log(res.data?.bookedAppointments)
        setBookedAppos(res.data?.bookedAppointments)
        setDraftedAppos(res.data?.draftedAppointments)
      } catch (error) {
        console.log(error)
      }
    }
    getBookedAppointments();
  }, [])

  useEffect(() => {
    console.log("changed")
    setSelectedTime(null)
  }, [selectedDate])

  
  if(bookedAppos) {
    bookedAppos.map((appo) => (
      bookedSlots.push({
        date : appo.appointmentDate,
        time : appo.appointmentTime
      })
    ))
  }

  if(draftedAppos) {
    draftedAppos.map((appo) => {
      draftedSlots.push({
        date : appo.appointmentDate,
        time : appo.appointmentTime
      })
    })
  }

 

  // console.log(bookedAppos)

  // console.log(bookedSlots)
  // console.log(draftedSlots)



  // ==========================
  // Render Component
  // ==========================
  return (
    <div
      className={`my-3 flex w-full max-w-lg flex-col items-center rounded-2xl border p-5 shadow-lg transition-all md:w-[90%] ${currTheme === "dark"
          ? "border-slate-600 bg-slate-800 text-slate-200"
          : "border-gray-300 bg-white"
        }`}
    >
      {/* ==========================
          Header: Select Date
      ========================== */}
      <h2
        className={`mb-4 text-xl font-semibold ${currTheme === "dark" ? "text-amber-400" : "text-blue-700"
          }`}
      >
        📅 Select Date
      </h2>

      {/* ==========================
          Date Selection Buttons
      ========================== */}
      <div className="flex flex-wrap justify-center gap-2">
        <button
          onClick={handlePrev}
          className="rounded-full p-2 text-blue-600 hover:bg-blue-100"
        >
          <i className="fa-solid fa-chevron-left"></i>
        </button>

        {dates.map((date, index) => {
          const isSelected =
            date.toDateString() === selectedDate?.toDateString();

          // fun_setSelectedTime("12:00 PM")

          return (
            <button
              key={index}
              onClick={() => fun_setSelectedDate(date)}
              className={`flex flex-col items-center rounded-lg px-3 py-2 text-sm font-medium shadow-sm transition ${isSelected
                  ? "bg-blue-500 text -white"
                  : currTheme === "dark"
                    ? "bg-slate-700 text-slate-200 hover:bg-slate-600"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              // disabled={date.toDateString() === "Thu May 08 2025"}
            >
              <span>{daysOfWeek[date.getDay()]}</span>
              <span>{date.getDate()}</span>
            </button>
          );
        })}

        <button
          onClick={handleNext}
          className="rounded-full p-2 text-blue-600 hover:bg-blue-100"
        >
          <i className="fa-solid fa-chevron-right"></i>
        </button>
      </div>

      {/* ==========================
          Time Slot Selection
      ========================== */}
      <div className="mt-4 w-full text-center">
        <h4 className="mb-2 text-lg font-semibold text-green-700">
          🕒 Slots Available
        </h4>
        <div className="flex flex-wrap justify-center gap-3">
          {doctor.timeSlots.map((slot, index) => {
            const isSelected = selectedTime === slot;

            const isDisabled =  bookedSlots.some(appt => (appt.time === slot) && (selectedDate.toDateString() === appt.date));
            if (isDisabled) {
              return (
                <button
                  key={index}
                  className={`h-10 w-24 rounded-full px-2 py-1 text-sm bg-red-500 text-white font-semibold`}
                  disabled
                >
                 (Booked)
                </button>
              );
            }
            return (
              
              <button
                key={index}
                onClick={() => fun_setSelectedTime(slot)}
                className={`h-10 w-24 rounded-full px-2 py-1 text-sm ${isSelected
                    ? "bg-yellow-400 font-semibold text-black"
                    : currTheme === "dark"
                      ? "bg-slate-700 text-slate-200 border border-slate-500 hover:bg-slate-600"
                      : "bg-white text-gray-800 border border-gray-300 hover:bg-gray-100"
                  }`}
                  disabled={isDisabled}
              >
                {slot}
              </button>
              
            );
          })}
        </div>
      </div>

      {/* ==========================
          Book Button
      ========================== */}
      <button
        onClick={handleBooking}
        className="mt-5 w-full max-w-md rounded-full bg-yellow-400 py-3 text-lg font-semibold text-black shadow hover:bg-yellow-500"
      >
        Book an Appointment <i className="fa-solid fa-arrow-right ms-3"></i>
      </button>

      {/* ==========================
          Booking Summary Dialog
      ========================== */}
      <BootstrapDialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        maxWidth="lg"
        fullWidth
        sx={{
          "& .MuiDialog-paper": {
            width: "800px",
            maxWidth: "90%",
            border: "2px solid black",
            borderRadius: "10px",
            boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.6)",
            bgcolor: "transparent",
            display: "flex",
            justifyContent: "center",
          },
        }}
      >
        <Summary
          bookingData={bookingData}
          doctor={doctor}
          selectedDate={selectedDate}
          selectedTime={selectedTime}
          endTime={endTime}
          open={open}
          authUser={authUser}
          handleClose={handleClose}
        />
      </BootstrapDialog>
    </div>
  );
}
