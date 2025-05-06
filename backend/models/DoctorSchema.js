import mongoose from "mongoose";

const DoctorSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true},
  name: { type: String, required: true },
  // phone: { type: Number, required : true },
  photo: { type: String },
  clinic : {type : String},
  // ticketPrice: { type: Number, required : true },
  // role: {
  //   type: String,
  // },

  // // Fields for doctors only
  speciality: { type: String },
  // qualifications: {
  //   type: Array,
  //   required : true
  // },

  experiences: {
    type: Array
  },

  researchPublications : {
    type : Array
  },

  achievements : {
    type : Array
  },

  treatments : {
    type : Array
  },

  specialInterests : {
    type : Array
  },

  overview: { type: String},
  // about: { type: String },
  timeSlots: { type: Array },
  reviews: [{ type: mongoose.Types.ObjectId, ref: "Review" }],
  avgeRating: {
    type: Number,
    default: 0,
  },
  // totalRating: {
  //   type: Number,
  //   default: 0,
  // },
  totalPatients : {
    type : Number,
  },
  // isApproved: {
  //   type: String,
  //   enum: ["pending", "approved", "cancelled"],
  //   default: "pending",
  // },
  appointments: [{ type: mongoose.Types.ObjectId, ref: "Appointment" }],



});

export default mongoose.model("Doctor", DoctorSchema);