import mongoose from "mongoose";

const PaymentSchema = new mongoose.Schema({
  appointment: { type: mongoose.Types.ObjectId, ref: "Appointment" },
  paymentAmount: { type: Number, required: true },
  paymentId: { type: String, required: true },
  orderId: { type: String, required: true },
  orderSignature: { type: String, required: true },
});

export default mongoose.model("Payment", PaymentSchema);
