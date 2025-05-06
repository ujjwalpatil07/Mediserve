import React, { Component, useState } from "react";
import Overview from "./InfoContent/Overview";
import Experience from "./InfoContent/Experience";
import SpecialInterests from "./InfoContent/SpecialInterests";
import ResearchAndPub from "./InfoContent/ResearchAndPub";
import Achievements from "./InfoContent/Achievements";
import Treatments from "./InfoContent/Treatments";
import { useSetTheme } from "../../context/ThemeProvider";

export default function InfoOptions({ doctor }) {
  const infoOptns = [
    "overview",
    "specialInterests",
    "experience",
    "researchPublications",
    // "achievements",
    "treatments"
  ];

  const components = [
    { Component: Overview, id: "overview" },
    { Component: Experience, id: "experience" },
    { Component: SpecialInterests, id: "specialInterests" },
    { Component: ResearchAndPub, id: "researchPublications" },
    // { Component: Achievements, id: "achievements" },
    { Component: Treatments, id: "treatments" },
  ];

  const strMaker = (str) => {
    return str
      .replace(/([a-z])([A-Z])/g, "$1 $2") // Add a space before uppercase letters
      .replace(/^./, (char) => char.toUpperCase()); // Capitalize the first letter
  };

  const [selected, setSelected] = useState("overview");
  const [currTheme] = useSetTheme()

  const makeSelected = (e) => {
    console.log(e.target.id);
    setSelected(e.target.id);
  };

  return (
    <div className="mb-3 w-[90%]">
      <div className="doctor-overview mb-5 flex space-x-5 overflow-x-auto md:overflow-hidden">
        {infoOptns.map((option, idx) => {
          const isSelected = selected === option;
          const baseClasses = "h-10 cursor-pointer rounded-4xl border px-3 py-1 transition";
          const selectedClasses = "bg-amber-400 text-black";
          const lightUnselected = "bg-white text-black border-gray-300 hover:bg-gray-100";
          const darkUnselected = "bg-slate-700 text-slate-200 border-slate-500 hover:bg-slate-600";

          return (
            <div key={idx}>
              <button
                id={option}
                className={`${baseClasses} ${isSelected
                    ? selectedClasses
                    : currTheme === "dark"
                      ? darkUnselected
                      : lightUnselected
                  }`}
                onClick={makeSelected}
              >
                {strMaker(option)}
              </button>
            </div>
          );
        })}
      </div>


      <div className="">
        {components.map(({ Component, id }) =>
          id === selected ? (

            <Component id={id} doctor={doctor} currTheme={currTheme}/>

          ) : null
        )}
      </div>

    </div>
  );
}
