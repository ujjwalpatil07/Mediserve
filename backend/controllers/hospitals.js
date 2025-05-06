import Hospital from "../models/HospitalSchema.js";

export const getHospital = async (req, res) => {
  const hospitalData = await Hospital.find({});
  res.status(200).json(hospitalData);
};
