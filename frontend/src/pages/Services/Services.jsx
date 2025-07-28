import React, { useState, useEffect } from "react";
import axios from "axios";
import ServiceList from "../../assets/data/services";
import ServicesInfoCard from "../../components/Cards/ServicesInfoCard";
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import { useSetTheme } from "../../context/ThemeProvider";

export default function Services() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [currTheme] = useSetTheme()

  useEffect(() => {
    const getService = async () => {
      try {
        const response = await axios.get("http://localhost:4001/s_data");
        setServices(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error while fetching service data:", error.message);
        setError("Failed to load services. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    getService();
  }, []);

  const filteredServices = services.filter((service) => {
    return service.name.toLowerCase().includes(searchQuery.toLowerCase())
  }
  );

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
    <section className={`py-7 min-h-screen px-6 md:px-16 ${currTheme === "light" ?
      " bg-gradient-to-b from-blue-100 via-pink-50 to-purple-100"
      : "bg-gradient-to-t from-[#0f172a] via-gray-600 to-[#0f172a]"
      } `}>
      <div className="text-center mb-10">
        <h1 className={`text-4xl md:text-5xl font-bold ${currTheme === "light" ? "text-indigo-800" : "text-slate-200"} mb-4 font-serif`}>
          🏥 Our Equipments & Services 🏥
        </h1>
        <p className={`${currTheme === "light " ? "text-gray-600" : "text-slate-400"} text-lg md:text-xl`}>
          Discover the top equipment and services we proudly offer to make your life easier and healthier!
        </p>

        {/* Search Bar */}
        <div className="mt-6 flex justify-center">
          <input
            type="text"
            placeholder="Search Equipments..."
            className={`w-full max-w-md rounded-xl border-2 ${currTheme === "light" ? "border-indigo-400" : "border-amber-300 placeholder:text-slate-100"} px-4 py-2 text-lg focus:outline-none focus:ring-2 focus:ring-indigo-600`}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {/* Loading */}
      {loading && (
        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
          <CircularProgress />
        </Box>
      )}

      {/* Error */}
      {error && (
        <div className="text-center text-red-600 text-xl mb-4">{error}</div>
      )}

      {/* Services Grid */}
      <div className="grid gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {!loading && filteredServices.length > 0 ? (
          filteredServices.map((service, index) => (
            <div key={index} className="hover:scale-105 transition-transform duration-300">
              <ServicesInfoCard service={{
                ...service,
                name: highlightMatch(service.name, searchQuery)
              }} />
            </div>
          ))
        ) : (
          !loading && (
            <div className="col-span-full text-center text-xl text-gray-500">
              No services found!
            </div>
          )
        )}
      </div>
    </section>
  );
}
