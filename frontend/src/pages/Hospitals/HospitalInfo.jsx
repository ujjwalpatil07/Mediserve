import React from "react";
import { useLocation, useParams } from "react-router-dom";
import Rating from "@mui/material/Rating";
import { hospitalsFaqs } from "../../assets/data/faqs";
import FAQ from "../../pages/FAQ"

export default function HospitalInfo() {

    const { id } = useParams();
    const location = useLocation();
    const { hospitalData } = location.state || {};

    const getHospitalById = (id) => {
        return hospitalData.find((hospital) => hospital._id === id);
    }

    const hospital = getHospitalById(id);
    // console.log(hospital);
;  return (
<div className="flex flex-col w-screen">
  <div className="my-4 flex h-[500px] w-full p-4 px-10">
    <div className="left-part h-[95%] w-[50%]">
      <h1 className="ms-4 mb-4 cursor-pointer font-serif text-3xl font-semibold text-gray-900">
        {hospital.name}
      </h1>
      <img
        src={hospital.image}
        alt={hospital.name}
        className="ms-3 h-[90%] w-[95%] cursor-pointer rounded-xl border border-gray-700"
      />
    </div>
    <div className="right-part h-[95%] w-[50%] rounded-xl border border-gray-800 bg-blue-200 p-4">
      <div className="my-2 flex items-center">
        <h1 className="ms-3 cursor-pointer font-serif text-2xl font-semibold text-gray-900">
          {hospital.name}
        </h1>
        <p className="ms-3 mt-2 text-sm font-semibold">
          - Since {hospital.since}
        </p>
      </div>
      <h3>
        Owned by <b className="text-lime-950">{hospital.ownedBy}</b>{" "}
      </h3>

      <h4>
        <i class="fa-duotone fa-solid fa-location-dot"></i> {" "}
        {hospital.location}
      </h4>
      <h4 className="contact">
        <i class="fa-duotone fa-solid fa-phone"></i> {hospital.contact}
      </h4>
      <h4 className="email">
        <i class="fa-duotone fa-solid fa-envelope"></i> {hospital.email}
      </h4>
      <ul className="ms-4 flex space-x-6">
        {hospital.services.map((service, index) => (
          <li key={index} className="list-disc">
            {service}
          </li>
        ))}
      </ul>
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
    </div>

    
  </div>
  <FAQ faq={hospitalsFaqs}/>
</div>
);
}
