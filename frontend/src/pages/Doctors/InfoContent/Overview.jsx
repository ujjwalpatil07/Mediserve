import React from "react";

export default function Overview({ doctor, currTheme }) {
  return (
    <div
      className={`my-4 rounded-2xl border p-6 shadow-md ${currTheme === "light"
          ? "border-gray-200 bg-gradient-to-br from-white via-yellow-50 to-amber-100"
          : "border-slate-700 bg-gradient-to-br from-slate-800 via-slate-700 to-slate-800"
        }`}
    >
      <h2
        className={`mb-4 text-2xl font-serif font-semibold ${currTheme === "light" ? "text-gray-800" : "text-amber-400"
          }`}
      >
        🩺 Overview
      </h2>
      <p
        className={`text-lg leading-relaxed ${currTheme === "light" ? "text-gray-700" : "text-slate-200"
          }`}
      >
        {doctor.overview}
      </p>
    </div>


  );
}
