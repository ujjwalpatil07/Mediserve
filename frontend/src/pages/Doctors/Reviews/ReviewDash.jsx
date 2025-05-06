import React from "react";
import Box from '@mui/material/Box';
import LinearProgress from '@mui/material/LinearProgress';
import { Rating, Typography } from "@mui/material";
import { useSetTheme } from "../../../context/ThemeProvider";


export default function ReviewDash() {
  const [currTheme] = useSetTheme()

  const rating = [5.0, 4.0, 3.0, 2.0, 1.0];
  return (
    <div className={`main-dash w-full mt-6 px-4 md:px-8 py-6 rounded-2xl border shadow-lg 
  ${currTheme === "dark"
        ? "border-slate-700 bg-gradient-to-br from-slate-800 to-slate-900"
        : "border-gray-300 bg-gradient-to-br from-yellow-50 to-amber-100"}`}>

      {/* Progress Bar Overview */}
      <div className="flex flex-col md:flex-row md:space-x-6 space-y-6 md:space-y-0 w-full">

        {/* Average Rating */}
        <div className={`flex flex-col items-center justify-center rounded-xl p-4 w-full md:w-[15%] shadow-sm 
      ${currTheme === "dark"
            ? "bg-slate-800 border border-amber-400"
            : "bg-white border border-red-500"}`}>
          <h2 className={`text-5xl font-bold mb-2 
        ${currTheme === "dark" ? "text-amber-400" : "text-red-600"}`}>
            4.5
          </h2>
          <Rating value={4.5} readOnly />
          <h5 className={`${currTheme === "dark" ? "text-slate-400" : "text-gray-600"} font-medium mt-2`}>
            35k ratings
          </h5>
        </div>

        {/* Progress Bars */}
        <div className={`flex flex-col justify-center w-full gap-3 rounded-xl p-4 shadow-inner 
      ${currTheme === "dark" ? "bg-slate-800" : "bg-white"}`}>
          {rating.map((ratingValue, idx) => (
            <Box sx={{ width: '100%' }} key={idx}>
              <LinearProgress
                variant="determinate"
                value={(ratingValue / 5) * 100}
                sx={{
                  height: 12,
                  borderRadius: 6,
                  backgroundColor: currTheme === "dark" ? "#1e293b" : "#f1f5f9",
                  '& .MuiLinearProgress-bar': {
                    borderRadius: 6,
                    backgroundColor: "#d97706",
                  },
                }}
              />
            </Box>
          ))}
        </div>

        {/* Rating Breakdown */}
        <div className={`w-full md:w-[25%] rounded-xl p-5 shadow-md 
      ${currTheme === "dark" ? "bg-slate-800 text-slate-200" : "bg-gray-700 text-white"}`}>
          <p className="mb-1"><span className="font-semibold me-2">5.0</span>25k ratings</p>
          <p className="mb-1"><span className="font-semibold me-2">4.0</span>5k ratings</p>
          <p className="mb-1"><span className="font-semibold me-2">3.0</span>1.2k ratings</p>
          <p className="mb-1"><span className="font-semibold me-2">2.0</span>3.4k ratings</p>
          <p><span className="font-semibold me-2">1.0</span>2.2k ratings</p>
        </div>
      </div>

      {/* Category Ratings */}
      <div className="category-rating flex flex-wrap gap-3 justify-center md:justify-start px-4 mt-6">
        {[
          { score: '4.0', label: 'Humanity' },
          { score: '4.5', label: 'Treatment' },
          { score: '3.5', label: 'Cleverness' },
          { score: '4.0', label: 'Medical' },
          { score: '3.0', label: 'Environment' },
        ].map((item, idx) => (
          <div
            key={idx}
            className={`flex items-center space-x-2 border rounded-lg px-3 py-2 transition
          ${currTheme === "dark"
                ? "bg-slate-800 border-slate-600 hover:shadow-md"
                : "bg-white border-gray-400 hover:shadow-md"}`}
          >
            <h5 className={`${currTheme === "dark" ? "text-amber-400" : "text-yellow-700"} font-semibold`}>
              {item.score}
            </h5>
            <p className={`${currTheme === "dark" ? "text-slate-200" : "text-gray-700"}`}>
              {item.label}
            </p>
          </div>
        ))}
      </div>
    </div>


  );
}
