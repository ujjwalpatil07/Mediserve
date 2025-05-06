import React from "react";
import Schedule from "./Schedule";
import Summary from "./Summary";

export default function Appointment({
  handleNext,
  handlePrev,
  daysOfWeek,
  dates,
  fun_setSelectedDate,
  selectedDate,
  selectedTime,
  fun_setSelectedTime,
  doctor,
}) {
  if (!doctor) {
    return <h1 className="text-6xl">Doctor not found</h1>;
  }

  const endTime =
    selectedTime.length === 7
      ? selectedTime.replace("0", "3")
      : selectedTime.replace("00", "30");
  return (
    <div className="appoiment mb-6 flex flex-col md:flex-row  w-[90%] items-center justify-between ">
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
        endTime={endTime}
      ></Schedule>
      <Summary
        doctor={doctor}
        selectedDate={selectedDate}
        selectedTime={selectedTime}
        endTime={endTime}
      />
    </div>
  );
}
