import React, { useEffect, useState } from "react";
import axios from "axios";
import { useDoctorAuth } from "../../context/AuthProvider";

export default function AppointmentDash() {

  const [authDoctor] = useDoctorAuth();
  const [appointments, setAppointments] = useState([])

  useEffect(() => {
    const getAppointments = async () => {
      await axios
        .post("http://localhost:4001/appointment/get_appointments", authDoctor)
        .then((res) => {
          const response = res.data.appointments;
          // console.log(response);
          setTimeout(() => {
            setAppointments(response)
          }, 1000)
        })
        .catch((err) => {
          console.log(err)
        })
    }
    getAppointments()
  },[])

    console.log(appointments)


  return (
    <div className="flex flex-col border mx-auto p-4 gap-y-4">
      {appointments.map((appointment) => {
        const patient = appointment.patient

        return(
          <div className="border ">
            <h1>{patient.fullName}</h1>
            {/* <h3>{appointment.appointmentDate}</h3> */}
          </div>
        )
      })}
    </div>
  );
}
