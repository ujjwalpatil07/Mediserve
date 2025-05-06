import * as React from "react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { useSetTheme } from "../../context/ThemeProvider";


export default function DoctorInfoCard({ doctor }) {
  const navigate = useNavigate();
  // const[response, setResponse] = useState([]);
  const [currTheme] = useSetTheme();

  const visitDoctor = async () => {
    // console.log(doctor._id);
    try {
      const response = await axios.get(
        `http://localhost:4001/doctors/${doctor._id}`
      );
      // setResponse(response.data);
      navigate(`/p/doctors/${doctor._id}`, { state: { doctorData: response.data } });
      console.log(response.data);
    } catch (error) {
      console.error("Error while fetching doctor details :", error)
    }
  };

  return (
    <div className={`mt-3 mb-3 mx-2 h-[95%] rounded-xl hover:border p-4 
    ${currTheme === "light" ? " border-gray-500 bg-gradient-to-b from-gray-200 via-gray-300 to-gray-400" : "text-slate-100 bg-gradient-to-t from-slate-500 via-slate-600 to-slate-800 "}`}>
      {/* Doctor Name & Specialty */}
      <div className="mx-auto mb-2">
        <b
          className="cursor-pointer text-xl hover:underline"
          onClick={visitDoctor}
        >
          {doctor.name}
        </b>
        <br />
        <span className={`font-semibold  ${currTheme === "light" ? " text-amber-900" : "text-amber-400"}`}>
          {doctor.speciality}
        </span>
      </div>

      {/* Doctor Image */}
      <div className="flex w-[220px] justify-center mx-auto">
        <img
          src={doctor.photo}
          alt={doctor.name}
          className="h-[250px] w-[200px] cursor-pointer rounded-xl border border-gray-700 bg-cover hover:border-2 hover:border-gray-500"
          onClick={visitDoctor}
        />
      </div>

      {/* Hospital Name */}
      <div className="mt-2 text-center">
        <p className="font-medium">{doctor.clinic}</p>
      </div>
    </div>
  );
}
