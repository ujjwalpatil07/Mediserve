import express from "express"
import {getDoctor} from "../controllers/doctors.js"
import wrapAsync from "../utils/wrapAsync.js";
const router = express.Router();

router.get("/d_data", wrapAsync(getDoctor))

router.get("/doctors/:id", wrapAsync(getDoctor));

export default router;