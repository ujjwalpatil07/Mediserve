import express from "express";
import { getHospital } from "../controllers/hospitals.js";
import wrapAsync from "../utils/wrapAsync.js";

const router = express.Router();

router.get("/h_data", wrapAsync(getHospital));

router.get("/hospitals/:id", wrapAsync(getHospital));

export default router;
