import React, { useState } from "react";
import Button from "@mui/material/Button";
import { amber } from "@mui/material/colors";
import { toast } from "react-toastify";
import { useUserAuth } from "../../../context/AuthProvider";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import Summary from "./Summary";
import { styled } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useSetTheme } from "../../../context/ThemeProvider";


const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

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
  doctor,
}) {

  const navigate = useNavigate()

  const [authUser] = useUserAuth();

  const [bookingData, setBookingData] = useState({
    doctor: "",
    patient: "",
    appointmentDate: new Date(),
    ticketPrice: "",
    status: "",
    isPaid: false
  })
  const [currTheme] = useSetTheme();

  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleBooking = () => {
    // console.log(
    //   `You Clicked for booking an Appointment of ${doctor.name} on ${selectedDate} and your appointment time is ${selectedTime} to ${endTime}`
    // );
    // toast.success(
    //   `You Clicked for booking an Appointment of ${doctor.name} on ${selectedDate} and your appointment time is ${selectedTime} to ${endTime}`,
    //   {
    //     position: "top-center",

    //   }
    // );


    setBookingData({
      doctor: doctor._id,
      patient: authUser._id,
      appointmentDate: selectedDate,
      ticketPrice: "300Rs",
      status: "pending",
      isPaid: false
    })

    handleClickOpen();
    
  }

  const confirmBooking = () => {
    navigate("/appointment/payment")
  }

  // const handlePayment = () => {
  //   navigate("/payment")
  // }


  return (
    <div className={`my-3 flex w-full max-w-lg flex-col items-center rounded-2xl border p-5 shadow-lg transition-all md:w-[90%] ${currTheme === "dark"
        ? "border-slate-600 bg-slate-800 text-slate-200"
        : "border-gray-300 bg-white"
      }`}>
      <h2 className={`mb-4 text-xl font-semibold ${currTheme === "dark" ? "text-amber-400" : "text-blue-700"}`}>
        📅 Select Date
      </h2>

      <div className="flex flex-wrap justify-center gap-2">
        <button onClick={handlePrev} className="rounded-full p-2 text-blue-600 hover:bg-blue-100">
          <i className="fa-solid fa-chevron-left"></i>
        </button>

        {dates.map((date, index) => {
          const isSelected = date.toDateString() === selectedDate.toDateString();
          return (
            <button
              key={index}
              onClick={() => fun_setSelectedDate(date)}
              className={`flex flex-col items-center rounded-lg px-3 py-2 text-sm font-medium shadow-sm transition ${isSelected
                  ? "bg-blue-500 text-white"
                  : currTheme === "dark"
                    ? "bg-slate-700 text-slate-200 hover:bg-slate-600"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
            >
              <span>{daysOfWeek[date.getDay()]}</span>
              <span>{date.getDate()}</span>
            </button>
          );
        })}

        <button onClick={handleNext} className="rounded-full p-2 text-blue-600 hover:bg-blue-100">
          <i className="fa-solid fa-chevron-right"></i>
        </button>
      </div>

      <div className="mt-4 w-full text-center">
        <h4 className="mb-2 text-lg font-semibold text-green-700">🕒 Slots Available</h4>
        <div className="flex flex-wrap justify-center gap-3">
          {doctor.timeSlots.map((slot, index) => {
            const isSelected = selectedTime === slot;
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
              >
                {slot}
              </button>
            );
          })}
        </div>
      </div>

      <button
        onClick={handleBooking}
        className="mt-5 w-full max-w-md rounded-full bg-yellow-400 py-3 text-lg font-semibold text-black shadow hover:bg-yellow-500"
      >
        Book an Appointment <i className="fa-solid fa-arrow-right ms-3"></i>
      </button>
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
            padding: "10px",
            rowGap: "7px",
    
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
          confirmBooking={confirmBooking}
        />
        {/* <DialogActions>
            <Button onClick={handleClose}>Disagree</Button>
            <Button onClick={handleClose} autoFocus>
              Agree
            </Button>
          </DialogActions> */}
      </BootstrapDialog>
    </div>

  );
}
