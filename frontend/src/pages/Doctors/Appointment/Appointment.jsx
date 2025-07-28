import React from "react";
import Schedule from "./Schedule";
import Summary from "./Summary";
import { useState, useEffect } from "react";

export default function Appointment({
  doctor,
}) {
  if (!doctor) {
    return <h1 className="text-6xl">Doctor not found</h1>;
  }

  const [selectedDate, setSelectedDate] = useState(new Date());
  const fun_setSelectedDate = (date) => {
    setSelectedDate(date);
  };

  const [selectedTime, setSelectedTime] = useState(null);
  const fun_setSelectedTime = (slot) => {
    // console.log(`You selected a time slot ${slot}`)
    setSelectedTime(slot);
  };

  const [startDate, setStartDate] = useState(new Date());

  const getDates = (start, daysToShow = 7) => {
    const dates = [];
    for (let i = 0; i < daysToShow; i++) {
      const current = new Date(start);
      current.setDate(start.getDate() + i);
      dates.push(current);
    }
    return dates;
  };

  const handlePrev = () => {
    const prevDate = new Date(startDate);
    if (new Date(prevDate) <= new Date()) {
      return;
    }
    prevDate.setDate(startDate.getDate() - 7);
    setStartDate(prevDate);
  };

  const handleNext = () => {
    const nextDate = new Date(startDate);
    nextDate.setDate(startDate.getDate() + 7);
    setStartDate(nextDate);
  };

  const dates = getDates(startDate);

  const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return (
    <div className="appoiment mb-6 flex flex-col lg:flex-row  w-[90%] items-center justify-between ">
      <Schedule
        handlePrev={handlePrev}
        handleNext={handleNext}
        dates={dates}
        selectedDate={selectedDate}
        fun_setSelectedDate={fun_setSelectedDate}
        daysOfWeek={daysOfWeek}
        doctor={doctor}
        selectedTime={selectedTime}
        fun_setSelectedTime={fun_setSelectedTime}
        setSelectedTime={setSelectedTime}
      ></Schedule>
      <Summary
        doctor={doctor}
        selectedDate={selectedDate}
        selectedTime={selectedTime}
      />
    </div>
  );
}
