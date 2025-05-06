import express from "express";
const app = express();
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";

app.use(cors());
app.use(express.json());

import doctorRoute from "./routes/doctorRoute.mjs";
import serviceRoute from "./routes/serviceRoute.mjs";
import hospitalRoute from "./routes/hospitalRoute.mjs";
import profileRoute from "./routes/profileRoute.mjs";
import reviewRoute from "./routes/reviewRoute.mjs";
import appointmentRoute from "./routes/appointmentRoute.mjs";

import authUserRoute from "./routes/AuthRoutes/authUserRoute.mjs";
import authDoctorRoute from "./routes/AuthRoutes/authDoctorRoute.mjs";

dotenv.config();
const port = process.env.PORT || 4000;
const dbUrl = process.env.ATLASDB_URL;

mongoose
  .connect(dbUrl)
  .then((res) => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.error("MongoDB Connection Error: ", err);
  });

app.get("/home", (req, res) => {
  res.send("This is Root route of my backend part");
});

app.use("/", doctorRoute);
app.use("/", serviceRoute);
app.use("/", hospitalRoute);
app.use("/", profileRoute);
app.use("/", reviewRoute);
app.use("/", appointmentRoute)

//Auth Routes
app.use("/", authUserRoute);
app.use("/", authDoctorRoute);

app.use((err, req, res, next) => {

  return res.status(err.status || 500).json({
    success: false,
    message: err.message || "Internal Server Error",
  });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
