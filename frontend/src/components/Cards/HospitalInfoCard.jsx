import React, { useEffect, useState } from "react";
import axios from "axios";
import Rating from "@mui/material/Rating";
import "./cards.css"

import { useLocation, useNavigate } from "react-router-dom";
import { useSetTheme } from "../../context/ThemeProvider";

export default function HospitalInfoCard({ hospital }) {
  const pos = hospital.hospitalId % 2 === 0;
  const navigate = useNavigate();
  const [currTheme] = useSetTheme();
  const [flipped, setFlipped] = useState(true);
  // console.log(hospital)

  const visitHospital = async () => {
    try {
      const response = await axios.get(
        `http://localhost:4001/hospitals/${hospital._id}`
      );

      console.log(response.data[0]);

      navigate(`/p/hospitals/${hospital._id}`, {
        state: { hospitalData: response.data },
      });
    } catch (error) {
      console.log("Error while fetching hospital : ", error);
    }
  };

  const handleFlip = () => {
    setFlipped(!flipped);
  }

  const HospitalDetails = ({ hospital }) => (
    <div className={`right-part h-[95%] w-[100%] md:w-[50%] rounded-xl shadow-md  p-4 relative
    ${currTheme === "light" ? "bg-slate-200 text-gray-800" : "text-slate-300 bg-slate-700"}`}>
      <div className="my-2 w-[90%] h-[8%] flex items-center relative">
        <h1
          className={`ms-3 cursor-pointer font-serif text-2xl font-semibold  
            ${currTheme === "light" ? "text-gray-900" : "text-slate-50"}`}
          onClick={visitHospital}
        >
          {hospital.name}
        </h1>
        <p className="ms-3 mt-2 text-sm font-semibold">
          - Since {hospital.since}
        </p>
      </div>
      <h3>
        Owned by <b className={`${currTheme === "light" ? "text-emerald-950" : "text-amber-400 !font-semibold"}`}>{hospital.ownedBy}</b>{" "}
      </h3>
      <ul className="ms-4">
        {hospital.services.map((service, index) => (
          <li key={index} className="list-disc">
            {service}
          </li>
        ))}
      </ul>
      <h4>
        <i class="fa-solid fa-location-dot text-l mr-2"></i>
        {hospital.location}
      </h4>
      <Rating name="read-only" value={hospital.rating} readOnly />
      <div
        id="map"
        className="h-[190px] w-[95%] border border-gray-300 shadow-md shadow-gray-400"
      >
        <iframe
          src={hospital.link}
          allowfullscreen=""
          loading="lazy"
          referrerpolicy="no-referrer-when-downgrade"
          className="h-full w-full"
        ></iframe>
      </div>
      <img
        src={hospital.image}
        alt={hospital.name}
        className="md:opacity-0 shadow-lg rounded-2xl cursor-pointer size-30 absolute top-5 right-5"
        onClick={handleFlip}
      />

    </div>
  );

  const HospitalImage = ({ hospital }) => (

    <div className="left-part h-[90%] w-[50%] max-md:h-[450px] max-md:w-[90vw] my-3">
      <div className="relative h-full w-full cursor-pointer rounded-xl shadow-lg border-b-gray-800 group overflow-hidden">
        <img
          src={hospital.image}
          alt={hospital.name}
          className="h-full w-full rounded-xl object-cover"
        />
        <i
          className="hidden max-md:block fa-solid fa-xmark absolute right-3 top-3 text-white text-xl hover:text-red-500 cursor-pointer z-10 opacity-0 max-md:group-hover:opacity-100 transition-opacity duration-300"
          onClick={handleFlip}
        />
        <h3
          className={`hidden max-md:block absolute top-2 left-3 font-serif text-2xl font-semibold hover:underline
            ${currTheme === "light" ?
              "text-gray-900" :
              "text-slate-50"} cursor-pointer z-10 opacity-0 max-md:group-hover:opacity-100 transition-opacity duration-300`}
          onClick={visitHospital}
        >{hospital.name}</h3>
      </div>
    </div>

  );

  return (
    <div>
      <div className="hidden my-3 ms-10 md:flex h-[500px] w-full gap-3 rounded-tl-xl rounded-br-xl  p-4">
        {pos ? (
          <div className="flex w-[90%] justify-center gap-3">
            <HospitalImage hospital={hospital} />
            <HospitalDetails hospital={hospital} />
          </div>
        ) : (
          <div className="flex w-[90%] justify-center gap-3">
            <HospitalDetails hospital={hospital} />
            <HospitalImage hospital={hospital} />
          </div>
        )}
      </div>

      <div className="md:hidden w-full flex justify-center">
        <div
          className="relative w-[90vw] h-[500px] [perspective:1000px]"
          onClick={handleFlip}
        >
          <div
            className={`relative h-full w-full transition-transform duration-700 transform-style-preserve-3d ${flipped ? "rotate-y-180" : ""
              }`}
          >
            {/* Front: Hospital Image */}
            <div className="absolute w-full inset-0 backface-hidden">
              <HospitalImage hospital={hospital} />
            </div>

            {/* Back: Hospital Details */}
            <div className="absolute inset-0 backface-hidden rotate-y-180">
              <HospitalDetails hospital={hospital} />
            </div>
          </div>
        </div>
      </div>

    </div>

  );
}
