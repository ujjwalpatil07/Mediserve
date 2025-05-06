import express from "express";
import {
  loginDoctor,
  signUpDoctor
} from "../../controllers/AuthController/authDoctor.js";
import wrapAsync from "../../utils/wrapAsync.js";
const router = express.Router();

// router.post("/doctor/signup", wrapAsync(signUpDoctor));
router.post("/doctor/login", wrapAsync(loginDoctor));
router.post("/doctor/signup", wrapAsync(signUpDoctor));

export default router;
