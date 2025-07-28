import { instance } from "../index.js";
import axios from "axios";
import Payment from "../models/PaymentSchema.js";
import Appointment from "../models/AppointmentSchema.js";

export const handlePayment = async (req, res) => {
  try {
    const { ticketPrice} = req.body;

    
    if (!ticketPrice) {
      return res
        .status(400)
        .json({ success: false, message: "Ticket price is missing" });
    }

    const options = {
      amount: ticketPrice * 100, // amount in paise
      currency: "INR",
      receipt: `receipt_order_${Date.now()}`,
    };

    const order = await instance.orders.create(options);

    res.status(200).json({ success: true, order });
  } catch (err) {
    res.status(500).json({ success: false, message: "Error creating order" });
  }

};

export const makePaymentReciept = async (req, res) => {
  try {

    let {response, appointment} = req.body;
    // console.log(response)
    // console.log(appointment)

    const newPayment = new Payment({
      appointment: appointment._id,
      paymentAmount: appointment.ticketPrice,
      paymentId: response.razorpay_payment_id,
      orderId: response.razorpay_order_id,
      orderSignature: response.razorpay_signature,
    });

    await newPayment.save()

    const updatedAppointment = await Appointment.findByIdAndUpdate(appointment._id, {
      isPaid : true,
      paymentReciept : newPayment._id,
      status : "approved"
    }, {new : true})

    // console.log(updatedAppointment);
    
    res.status(200).json({success : true, newPayment, updatedAppointment})

  } catch (error) {
    console.log(error)
  }
}
