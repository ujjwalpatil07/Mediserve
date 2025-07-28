import React from "react";
import { useParams } from "react-router-dom";
import { useLocation } from "react-router-dom";

import Appointment from "./Appointment/Appointment";
import FAQ from "../FAQ";
import Feedback from "./Feedback";
import InfoOptions from "./InfoOptions";
import { doctorsFAQ } from "../../assets/data/faqs";
import D_Reviews from "./Reviews/D_Reviews";
import { useSetTheme } from "../../context/ThemeProvider";

export default function DoctorInfo() {
  const { id } = useParams();
  const location = useLocation();
  const { doctorData } = location.state || {};
  const [currTheme] = useSetTheme()

  const getDoctorById = (id) => {
    return doctorData.find((doctor) => doctor._id === id);
  };

  const doctor = getDoctorById(id);

  if (!doctor) {
    return <h1 className="text-6xl">Doctor not found</h1>;
  }

  return (
    <div
      className={`flex w-full flex-col items-center ${currTheme === "dark" ? "text-slate-200" : ""
        }`}
    >
      {/* Doctor Information Div */}
      <div
        className={`my-7 mx-auto flex w-[90%] flex-col items-center rounded-xl border ${currTheme === "dark"
          ? "border-slate-700 bg-slate-700 shadow-slate-700"
          : "border-gray-200 bg-white shadow-md"
          } md:flex-row md:items-start`}
      >
        {/* Doctor Image */}
        <div className="w-full md:w-1/4 p-4 flex justify-center items-center">
          <img
            src={doctor.photo}
            alt={doctor.name}
            className="max-h-80 w-auto object-contain rounded-lg"
          />
        </div>

        {/* Doctor Info */}
        <div className="w-full p-5 md:w-3/4">
          <h1
            className={`text-2xl font-bold md:text-3xl ${currTheme === "dark" ? "text-slate-100" : "text-gray-900"
              }`}
          >
            {doctor.name}
          </h1>

          <h4
            className={`mt-2 text-lg font-medium ${currTheme === "dark" ? "text-amber-400" : "text-cyan-700"
              }`}
          >
            {doctor.speciality}{" "}
            <span className="text-sm text-inherit">(14+ years experience)</span>
          </h4>

          <p
            className={`mt-3 ${currTheme === "dark" ? "text-slate-300" : "text-gray-700"
              }`}
          >
            MBBS, MD (Internal Medicine) | Internal Medicine Physician
          </p>

          <p
            className={`mt-3 ${currTheme === "dark" ? "text-slate-300" : "text-gray-700"
              }`}
          >
            English | Hindi | Marathi
          </p>

          <h3
            className={`mt-4 flex items-center font-semibold ${currTheme === "dark" ? "text-slate-200" : "text-gray-800"
              }`}
          >
            <i
              className={`fa-solid fa-house-chimney-medical mr-2 ${currTheme === "dark" ? "text-amber-400" : "text-cyan-700"
                }`}
            ></i>
            Apollo Hospitals, Nashik
          </h3>

          <h4
            className={`mt-4 flex items-start ${currTheme === "dark" ? "text-slate-300" : "text-gray-600"
              }`}
          >
            <i
              className={`fa-solid fa-location-dot mr-2 mt-1 text-xl ${currTheme === "dark" ? "text-amber-400" : "text-cyan-700"
                }`}
            ></i>
            <span>
              Swaminarayan Nagar, Near Lunge Mangal Karyalaya, New Adgaon Naka,
              Panchavati, Nashik, MH, 422003
            </span>
          </h4>

          <a href="" className="text-blue-500 underline mt-10"> get hospital directions</a>
        </div>
      </div>

      {/* Appointment Booking Div */}
      <Appointment doctor={doctor}></Appointment>

      <InfoOptions doctor={doctor} />
      <FAQ faq={doctorsFAQ} />
      {/* <Feedback /> */}
      <D_Reviews doctor={doctor} />

    </div>
  );
}
