import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  username: { type: String, required: true },
  fullName: { type: String},
  address : {type : String},
  bio: { type: String, length: { min: 50, max: 200 } },
  phone: { type: Number, length : {min : 5, max : 10} },
  photo: { type: String},
  gender: { type: String, enum: ["Male", "Female", "Other"] },
  bloodGroup: { type: String, enum : ["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"] },
  appointments: [{ type: mongoose.Types.ObjectId, ref: "Appointment" }],
});

export default mongoose.model("User", UserSchema);
