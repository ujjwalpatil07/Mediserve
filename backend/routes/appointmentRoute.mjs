import express from "express"
import wrapAsync from "../utils/wrapAsync.js";
import { bookAppointment, draftAppointment, getAppointments } from "../controllers/Appointment/booking.js";
const router = express.Router();

router.post("/appointment/book_appointment", wrapAsync(bookAppointment))
router.post("/appointment/get_appointments", wrapAsync(getAppointments))
router.post("/draft_appointment", wrapAsync(draftAppointment))

export default router;