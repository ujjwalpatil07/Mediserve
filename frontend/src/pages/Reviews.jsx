import React from 'react';

import Marquee from "react-fast-marquee";
import patientReviews from '../assets/data/reviews';
import { useSetTheme } from '../context/ThemeProvider';

export default function Reviews() {

  const [currTheme] = useSetTheme();
  return (
    <>
      <h1 className={`mb-4 text-center font-serif text-3xl font-semibold text-gray-800 md:text-4xl 
        ${currTheme === "light" ? "text-gray-800" : "text-slate-200"}`}>
      &#127894;Our Faithful Patients Voice &#127894;
    </h1>
    <Marquee pauseOnHover speed={100} gradient gradientColor='gray' gradientWidth={100} className='mb-3 h-full'>

        {patientReviews.slice(0, 11).map((patient, index) => (
        <div key={index} className={`flex items-center ${currTheme === "light" ? "bg-white " : "bg-slate-800"} rounded-xl shadow-md p-4 mx-3 min-w-[300px] max-w-[450px]`}>
          <img
            src={patient.photo}
            alt={patient.name}
            className="w-15 h-15 rounded-full mr-4 object-cover"
          />
          <div>
            <p className={`font-semibold ${currTheme === "light" ? "text-gray-900" : "text-amber-400"}`}>{patient.name}</p>
              <p className={`text-sm ${currTheme === "light" ? "text-gray-700" : "text-slate-200"}`}>{patient.review}</p>
          </div>
        </div>
      ))}

    </Marquee>
    <Marquee pauseOnHover speed={100} direction='right' gradient gradientColor='gray' gradientWidth={100} className='mb-3 '>

        {patientReviews.slice(11).map((patient, index) => (
          <div key={index} className={`flex items-center ${currTheme === "light" ? "bg-white " : "bg-slate-800"} rounded-xl shadow-md p-4 mx-3 min-w-[300px] max-w-[450px]`}>
            <img
              src={patient.photo}
              alt={patient.name}
              className="w-15 h-15 rounded-full mr-4 object-cover"
            />
            <div>
              <p className={`font-semibold ${currTheme === "light" ? "text-gray-900" : "text-amber-400"}`}>{patient.name}</p>
              <p className={`text-sm ${currTheme === "light" ? "text-gray-700" : "text-slate-200"}`}>{patient.review}</p>
            </div>
          </div>
      ))}

    </Marquee>
    </>
  );
}
