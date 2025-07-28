import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";


const BookedApposContext = createContext()

export default function BookedApposProvider({ children }) {
  const [bookedAppos, setBookedAppos] = useState([]);
  const [draftedAppos, setDraftedAppos] = useState([]);

  useEffect(() => {
      const getBookedAppointments = async () => {
        try {
          const res = await axios.post("http://localhost:4001/appointment/get_appointments")
          // console.log(res.data?.bookedAppointments)
          setBookedAppos(res.data?.bookedAppointments)
          setDraftedAppos(res.data?.draftedAppointments)
        } catch (error) {
          console.log(error)
        }
      }
      getBookedAppointments();
    }, [])

  const contextValue = {
    bookedAppos,
    setBookedAppos,
    draftedAppos,
    setDraftedAppos,
  };

  return (
    <BookedApposContext.Provider value={contextValue}>
      {children}
    </BookedApposContext.Provider>
  );
}


export const useBookedAppos = () => useContext(BookedApposContext);
