import express from "express";
import { getService } from "../controllers/services.js";
import wrapAsync from "../utils/wrapAsync.js";
const router = express.Router();

router.get("/s_data", wrapAsync(getService));

router.get("/services/:id", wrapAsync(getService));
export default router;
