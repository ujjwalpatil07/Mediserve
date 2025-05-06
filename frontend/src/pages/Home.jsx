import React, { useState, useEffect } from "react";
import DoctorInfoCard from "../components/Cards/DoctorInfoCard";
import ServicesInfoCard from "../components/Cards/ServicesInfoCard";
import HospitalInfoCard from "../components/Cards/HospitalInfoCard";
import FAQ from "./FAQ"
import { mediserveFAQ, doctorsFAQ } from "../assets/data/faqs";

import axios from "axios";
import ExploreUs from "../components/ExploreUs";

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Reviews from "./Reviews";
import { useSetTheme } from "../context/ThemeProvider";
import TypingText from "../components/Framer Motion/TypeWriter";

export default function Home() {
  const [doctor, setDoctor] = useState([]);
  const [hospital, setHospital] = useState([]);
  const [service, setService] = useState([]);
  const [currHospitalIndex, setCurrentHospitalIndex] = useState(0);
  const [currTheme] = useSetTheme()

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    autoplay: true,
    autoplaySpeed: 3000,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  const NextArrow = ({ onClick }) => {
    return (
      <div
        className="absolute right-5 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full bg-blue-600 text-white shadow-md hover:bg-blue-700"
        onClick={onClick}
      >
        <i className="fa-solid fa-chevron-right"></i>
      </div>
    );
  };

  const PrevArrow = ({ onClick }) => {
    return (
      <div
        className="absolute left-5 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full bg-blue-600 text-white shadow-md hover:bg-blue-700"
        onClick={onClick}
      >
        <i className="fa-solid fa-chevron-left"></i>
      </div>
    );
  };

  const settings2 = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 4, // show 3 doctors on large screens
    slidesToScroll: 1,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    responsive: [
      {
        breakpoint: 1024, // tablets
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 768, // mobile
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 550,// mobile
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  useEffect(() => {
    const getDoctor = async () => {
      try {
        const d_data = await axios.get("http://localhost:4001/d_data");
        setDoctor(d_data.data);
      } catch (error) {
        console.log(error);
      }
    };

    const getHospital = async () => {
      try {
        const h_data = await axios.get("http://localhost:4001/h_data");
        setHospital(h_data.data);
      } catch (error) {
        console.log(error);
      }
    };

    const getService = async () => {
      try {
        const s_data = await axios.get("http://localhost:4001/s_data");
        setService(s_data.data);
      } catch (error) {
        console.log(error);
      }
    };

    getDoctor();
    getHospital();
    getService();
  }, []);

  

  return (
    <div
      className={`z-0 w-full flex flex-col items-center 
      ${currTheme === "light" ?
          " bg-gradient-to-b from-blue-100 via-pink-50 to-purple-100"
          : "bg-gradient-to-t from-[#0f172a] via-gray-600 to-[#0f172a]"
        }`}>

      {/* Hero Section */}
      <div className="relative z-0 flex h-[500px] w-full items-center justify-center border-b bg-[url('https://res.cloudinary.com/dyahibuzy/image/upload/v1740479416/Medi-Serve/Other%20Image/gyb9sj5fp6ufuoznesep.jpg')] bg-cover bg-center p-6">
        <h1 className="absolute left-3 bottom-2">
          <TypingText text={
            `A new dawn of healthcare, where healing meets innovation`
          } hero={true}/>
        </h1>
      </div>


      {/* Doctors Section */}

      <section className="my-6 w-full px-4 relative">
        <h1 className={`mb-4 text-center font-serif text-3xl font-semibold  md:text-4xl
          ${currTheme === "light" ? "text-gray-800" : "text-slate-200"}`}>
          &#127894; Our Trusted Doctors &#127894;
        </h1>

        <div className="">
          <Slider {...settings2}>
            {doctor.map((doctor, index) => (
              <DoctorInfoCard key={index} doctor={doctor} />
            ))}
          </Slider>
        </div>
      </section>

      <ExploreUs />

      {/* Equipments Section */}
      <section className="my-6">
        <h1 className={`mb-4 text-center font-serif text-3xl font-semibold md:text-4xl 
          ${currTheme === "light" ? "text-gray-800" : "text-slate-200"}`} >
          &#127894; Our Equipments &#127894;
        </h1>
        <div className="max-md:mx-auto grid grid-cols-1 gap-6 px-4 md:grid-cols-2 lg:grid-cols-3">
          {service.map((service, index) => (
            <ServicesInfoCard key={index} service={service} />
          ))}
        </div>
      </section>



      {/* Hospitals Section */}
      <h1 className={`mb-4 text-center font-serif text-3xl font-semibold text-gray-800 md:text-4xl
        ${currTheme === "light" ? "text-gray-800" : "text-slate-200"}`}>
        &#127894; Our Hospitals &#127894;
      </h1>


      <div className="w-full  overflow-hidden">
        <Slider {...settings}>
          {hospital.map((hospital, id) => (
            <HospitalInfoCard key={id} hospital={hospital} />
          ))}
        </Slider>
      </div>

      <Reviews />

      <FAQ faq={mediserveFAQ} />


    </div>
  );
}
