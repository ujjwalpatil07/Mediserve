import React from "react";
import { Link } from "react-router-dom";
import { useSetTheme } from "../../context/ThemeProvider";

export default function Footer() {
  const [currTheme] = useSetTheme();
  return (
    <footer
      className={`w-full border-t px-6 py-10 ${currTheme === "light"
          ? "border-gray-300 bg-gradient-to-b from-blue-50 via-blue-100 to-blue-200"
          : "border-slate-700 bg-gradient-to-t from-slate-900 via-slate-800 to-slate-700"
        }`}
    >
      {/* Container */}
      <div className="mx-auto flex flex-col items-center justify-between gap-8 md:flex-row md:items-start">
        {/* Brand Info */}
        <div className="flex w-full flex-col items-center md:w-1/4 md:items-start">
          <div className="flex items-center gap-2">
            <i className="fa-solid fa-stethoscope text-2xl text-emerald-600 dark:text-emerald-400"></i>
            <h1
              className={`text-2xl font-bold ${currTheme === "light" ? "text-lime-800" : "text-lime-300"
                }`}
            >
              Mediserve
            </h1>
          </div>
          <p
            className={`mt-3 text-center text-sm md:text-left ${currTheme === "light" ? "text-gray-800" : "text-slate-300"
              }`}
          >
            Copyright <b>&#169;</b> 2025 developed by Mr.Ujjwal Patil
            <br />
            All rights reserved.
          </p>
          <div className="mt-4 flex gap-4">
            <i className="fa-brands fa-facebook text-2xl text-blue-900 hover:scale-110 cursor-pointer"></i>
            <i className="fa-brands fa-youtube text-2xl text-red-600 hover:scale-110 cursor-pointer"></i>
            <i className="fa-brands fa-instagram text-2xl text-pink-600 hover:scale-110 cursor-pointer"></i>
            <i className="fa-brands fa-linkedin text-2xl text-blue-600 hover:scale-110 cursor-pointer"></i>
          </div>
        </div>

        {/* Reusable Footer Link Block */}
        {[
          {
            title: "Quick Links",
            links: [
              { label: "Home", to: "/home" },
              { label: "About us", to: "/about" },
              { label: "Services", to: "/services" },
              { label: "Blog", to: "/" },
            ],
          },
          {
            title: "I want to:",
            links: [
              { label: "Find a Doctor", to: "/doctors" },
              { label: "Book an appointment", to: "/" },
              { label: "Find a Location", to: "/" },
              { label: "Get an opinion", to: "/" },
            ],
          },
          {
            title: "Support",
            links: [
              { label: "Donate", to: "/" },
              { label: "Contact us", to: "/contact" },
              { label: "Give feedback", to: "/" },
            ],
          },
        ].map((section, idx) => (
          <div
            key={idx}
            className="flex w-full flex-col items-center gap-2 md:w-1/6 md:items-start"
          >
            <h1
              className={`mb-2 text-lg font-semibold ${currTheme === "light" ? "text-gray-900" : "text-amber-400"
                }`}
            >
              {section.title}
            </h1>
            {section.links.map((link, i) => (
              <Link
                key={i}
                to={link.to}
                className={` ${currTheme === "light" ? "text-gray-700 hover:text-blue-700" : "text-slate-300 hover:text-blue-400"
                  }`}
              >
                {link.label}
              </Link>
            ))}
          </div>
        ))}
      </div>
    </footer>
  );
}
