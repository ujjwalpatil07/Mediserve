import mongoose from "mongoose";
import Doctor from "../models/DoctorSchema.js";
import Hospital from "../models/HospitalSchema.js";
import User from "../models/UserSchema.js";
import bcryptjs from "bcryptjs";
import hospitals from "../../frontend/src/assets/data/hospitals.js";
import { demoUsers } from "../../frontend/src/assets/data/demoPatients.js";

const dbUrl =
  "mongodb+srv://ujjwalpatil001155:iam9vk3S26Q58pSD@cluster-mediserve.n4mk7.mongodb.net/?retryWrites=true&w=majority&appName=Cluster-Mediserve";

mongoose
  .connect(dbUrl)
  .then(() => {
    console.log("Connected to MongoDB");
    initDB(); // only run after successful connection
  })
  .catch((err) => {
    console.error("MongoDB Connection Error: ", err);
  });

const initDB = async () => {
  try {
    const hashedPass = await bcryptjs.hash("user", 10);

    const updatedDemoUsers = demoUsers.map((user) => ({
      ...user,
      password: hashedPass,
    }));

    await User.deleteMany({});
    await User.insertMany(updatedDemoUsers);

    console.log("Users inserted successfully:");
    console.log(await User.find({}));
  } catch (error) {
    console.error("Error during DB initialization:", error);
  } finally {
    mongoose.disconnect();
  }
};
