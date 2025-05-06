import Doctor from "../models/DoctorSchema.js";

export const getDoctor = async (req, res) => {
  const doctorData = await Doctor.find({});
  res.status(200).json(doctorData);
};
