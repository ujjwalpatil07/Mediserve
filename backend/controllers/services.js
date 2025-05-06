import Service from "../models/ServiceSchema.js";

export const getService = async (req, res) => {
  const serviceData = await Service.find({});
  res.status(200).json(serviceData);
};
