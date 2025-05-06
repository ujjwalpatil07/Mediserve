import React from "react";

export default function Treatments({ doctor, currTheme }) {
  return (
    <div
      className={`my-4 rounded-2xl border p-6 shadow-md ${currTheme === "light"
          ? "border-gray-200 bg-gradient-to-br from-white via-amber-50 to-yellow-100"
          : "border-slate-700 bg-gradient-to-br from-slate-800 via-slate-700 to-slate-800"
        }`}
    >
      <h2
        className={`mb-4 text-2xl font-serif font-semibold ${currTheme === "light" ? "text-gray-800" : "text-amber-400"
          }`}
      >
        🩺 Treatments Offered
      </h2>
      <ul
        className={`ms-5 list-disc space-y-3 text-lg ${currTheme === "light"
            ? "text-gray-700 marker:text-yellow-500"
            : "text-slate-200 marker:text-yellow-400"
          }`}
      >
        {doctor.treatments.map((treatment, index) => (
          <li key={index}>{treatment}</li>
        ))}
      </ul>
    </div>


  );
}
