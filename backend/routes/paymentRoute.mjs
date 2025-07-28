import { Router } from "express";
const router = Router();

import wrapAsync from "../utils/wrapAsync.js";
import { handlePayment, makePaymentReciept } from "../controllers/payment.js";

router.post("/appointment/payment", wrapAsync(handlePayment));
router.post("/appointment/makeReciept", wrapAsync(makePaymentReciept))

export default router;
