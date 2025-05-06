import express from "express"
import { getUser, editUser } from "../controllers/profile.js";
import wrapAsync from "../utils/wrapAsync.js";

const router = express.Router();

router.post("/profile", wrapAsync(getUser));
router.put("/profile/edit", wrapAsync(editUser))

export default router;