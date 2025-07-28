import mongoose from "mongoose";

const AppointmentSchema = new mongoose.Schema(
  {
    doctor: {
      type: mongoose.Types.ObjectId,
      ref: "Doctor",
      required: true,
    },
    patient: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: true,
    },
    ticketPrice: { type: Number, required: true },
    appointmentDate: {
      type: String,
      required: true,
    },
    appointmentTime: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ["pending", "approved", "cancelled"],
      default: "pending",
    },
    isPaid: { type: Boolean, default: false },
    paymentReciept: {
      type: mongoose.Types.ObjectId,
      ref: "Payment",
    },
  },
  { timestamps: true }
);

export default mongoose.model("Appointment", AppointmentSchema);
