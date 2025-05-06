import Appointment from "../../models/AppointmentSchema.js";
import User from "../../models/UserSchema.js";
import Doctor from "../../models/DoctorSchema.js";

export const getAppointments = async (req, res) => {
  try {

    // Fetch and populate appointments by IDs
    const appoData = await Doctor.findById(req.body._id).populate({
      path: "appointments",
      populate: {
        path: "patient",
      },
    });

    // console.log(appoData);

    return res
      .status(200)
      .json({
        success: true,
        appointments: appoData.appointments
      });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: "Server Error" });
  }
};

export const draftAppointment = async (req, res) => {
  let appoData = req.body;
  //   console.log(appoData)

  const appointment = await Appointment.findOne({
    doctor: appoData.doctor,
    patient: appoData.patient,
    appointmentDate: appoData.appointmentDate,
    status: "pending",
    isPaid: false,
  });

  if (appointment) {
    return res.status(200).json({
      message:
        "You ara trying to book appointment on same day and also you have a pending appointment today",
    });
  }

  const newAppointment = new Appointment({
    doctor: appoData.doctor,
    patient: appoData.patient,
    ticketPrice: appoData.ticketPrice,
    appointmentDate: appoData.appointmentDate,
    isPaid: appoData.isPaid,
    status: appoData.status,
  });

  newAppointment.save();

  const doctor = await Doctor.findByIdAndUpdate(
    appoData.doctor,
    {
      $push: { appointments: newAppointment._id },
    },
    { new: true }
  );

  const patient = await User.findByIdAndUpdate(
    appoData.patient,
    {
      $push: { appointments: newAppointment._id },
    },
    { new: true }
  );

  console.log(patient, doctor);

  res.status(200).json({ success: true, appointment: newAppointment });
};

export const bookAppointment = () => {};
