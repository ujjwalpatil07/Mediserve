import React from "react";
import { cardData } from "../assets/data/exploreUsData";
import { useSetTheme } from "../context/ThemeProvider";
// import CountUpNumber from "./Framer Motion/CountUpNumbers";
import CountUpOnScroll from "./Framer Motion/CountUpNumbers";
import TypingText from "./Framer Motion/TypeWriter";
import { Margin } from "@mui/icons-material";


const InfoCard = ({ image, count, subtitle, description, currTheme }) => (
  <div className={`group flex w-full cursor-pointer items-center rounded-3xl  p-3 transition-all duration-300 hover:border md:w-[48%] lg:w-[32%]
  ${currTheme === "light" ? "bg-blue-50" : "bg-slate-700"}`}>
    {/* 👆 Now w-full (mobile), md:w-48% (tablet), lg:w-32% (desktop) */}
    <img
      src={image}
      alt={subtitle}
      className="w-[25%] transform transition duration-300 group-hover:scale-110"
    />
    <div className="ms-4 space-y-3">
      <h2 className="text-lg font-semibold">
        <span className={`text-3xl font-bold 
          ${currTheme === "light" ? "text-blue-600" : "text-amber-400"}`}>
          <CountUpOnScroll to={count} />
        </span> {subtitle}
      </h2>
      <p>{description}</p>
    </div>
  </div>
);

export default function ExploreUs() {
  const [currTheme] = useSetTheme();

  return (
    <div className={`mx-auto my-2 w-[95%] rounded-2xl  p-4 
    ${currTheme === "light" ? "bg-gray-200" : "bg-slate-600 text-slate-200"}`}>
      {/* Header Section */}
      <div>
        <h1 className="text-2xl font-bold sm:text-3xl">
          {/* 👆 font size adjusts slightly on smaller devices */}
          <div className="flex items-center"><span className={` ${currTheme === "light" ? "text-blue-600" : "text-amber-400"}`}>Mediserve</span > <div className="ms-3 mt-2"><TypingText text={"- A new dawn of healthcare, where healing meets innovation"} /></div></div>
        </h1>
        <h4 className="mt-3 text-base sm:text-lg">
          {/* 👆 text size adjusted for small screens */}
          At Mediserve, we bridge the gap between healthcare and innovation,
          offering a seamless platform where healing meets convenience. Our
          mission is to simplify the way you connect with healthcare
          professionals, making appointment booking effortless and accessible.
          Whether you need a consultation, follow-up, or specialized care,
          Mediserve empowers you to find the right doctor at the right time.
          Experience the future of healthcare with just a few clicks – because
          your well-being deserves the best.
        </h4>
      </div>

      {/* Cards Grid */}
      <div className="mt-6 flex flex-wrap justify-between gap-4">
        {cardData.map((card, index) => (
          <InfoCard key={index} {...card} currTheme={currTheme} />
        ))}
      </div>
    </div>
  );
}
