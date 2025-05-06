import React, { useEffect, useState } from "react";
import DoctorInfoCard from "../../components/Cards/DoctorInfoCard";
import axios from "axios";
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import { useSetTheme } from "../../context/ThemeProvider";

export default function Doctors() {
  const [doctors, setDoctors] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchBy, setsearchBy] = useState("byName");
  const [loading, setLoading] = useState(true);
  const [currTheme] = useSetTheme();

  useEffect(() => {
    const getDoctor = async () => {
      try {
        const response = await axios.get("http://localhost:4001/d_data");
        console.log("Fetched doctor data:", response.data);  // Check data here
        setDoctors(response.data);
        setLoading(false);
      } catch (error) {
        console.log("Error while fetching doctor data:", error.message);
      }
    };
    getDoctor();
  }, []);

  // Filtering doctors by name or specialization
  const filteredDoctors = doctors.filter((doctor) => {
    const name = doctor?.name?.toLowerCase() || "";
    const specialization = doctor?.speciality?.toLowerCase() || "";
    const search = searchTerm.toLowerCase();

    if (searchBy === "byName") {
      return name.includes(search);
    } else if (searchBy === "bySpeciality") {
      return specialization.includes(search);
    } else {
      // default fallback - search both
      return name.includes(search) || specialization.includes(search);
    }
  });





  const highlightMatch = (text, searchTerm) => {
    if (!searchTerm) return text;

    const regex = new RegExp(`(${searchTerm})`, "gi");
    const parts = text?.split(regex);

    return parts.map((part, index) =>
      part.toLowerCase() === searchTerm.toLowerCase() ? (
        <mark key={index} className="bg-yellow-200 text-black">{part}</mark>
      ) : (
        part
      )
    );
  };


  return (
    <div
      className={`min-h-screen w-full py-8 px-4 bg-gradient-to-b ${currTheme === "light" ?
        " bg-gradient-to-b from-blue-100 via-pink-50 to-purple-100"
        : "bg-gradient-to-t from-[#0f172a] via-gray-600 to-[#0f172a]"
        }`}
    >
      {/* Heading */}
      <div className="mb-8 text-center">
        <h1
          className={`text-4xl font-bold md:text-5xl ${currTheme === "dark" ? "text-slate-100" : "text-slate-800"
            }`}
        >
          🏥 Meet Our Trusted Doctors
        </h1>
        <p
          className={`mt-2 text-lg ${currTheme === "dark" ? "text-slate-300" : "text-slate-700"
            }`}
        >
          Find the right specialist for your health needs
        </p>
      </div>

      {/* Search Bar */}
      <div className="mx-auto mb-10 gap-4 flex max-w-3xl items-center justify-center">
        <input
          type="text"
          placeholder="Search doctors by name or specialization..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className={`w-full rounded-full border p-3 px-5 shadow-sm focus:outline-none focus:ring-2 ${currTheme === "dark"
              ? "bg-slate-900 text-white border-slate-600 focus:ring-slate-600"
              : "bg-white text-gray-800 border-slate-300 focus:ring-slate-200"
            }`}
        />

        <select
          name="searchBy"
          id="searchBy"
          value={searchBy}
          onChange={(e) => setsearchBy(e.target.value)}
          className={`w-auto rounded-full border p-3 px-5 shadow-sm focus:outline-none focus:ring-2 ${currTheme === "dark"
              ? "bg-slate-900 text-white border-slate-600 focus:ring-slate-600"
              : "bg-white text-gray-800 border-slate-300 focus:ring-slate-200"
            }`}
        >
          <option disabled>Search By</option>
          <option value="byName">Search by name</option>
          <option value="bySpeciality">Search by Specialization</option>
        </select>
      </div>

      {loading ? (
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <CircularProgress />
        </Box>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {filteredDoctors.length > 0 ? (
            filteredDoctors.map((doctor, index) =>
              searchBy === "byName" ? (
                <DoctorInfoCard
                  key={index}
                  doctor={{
                    ...doctor,
                    name: highlightMatch(doctor.name, searchTerm),
                  }}
                  currTheme={currTheme}
                />
              ) : (
                <DoctorInfoCard
                  key={index}
                  doctor={{
                    ...doctor,
                    speciality: highlightMatch(doctor.speciality, searchTerm),
                  }}
                  currTheme={currTheme}
                />
              )
            )
          ) : (
            <div
              className={`col-span-full text-center text-lg ${currTheme === "dark" ? "text-slate-300" : "text-slate-700"
                }`}
            >
              No doctors found.
            </div>
          )}
        </div>
      )}
    </div>



  );
}
