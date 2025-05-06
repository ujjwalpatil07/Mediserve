import express from "express";
import {loginUser, signUpUser} from "../../controllers/AuthController/authUser.js"
import wrapAsync from "../../utils/wrapAsync.js";
const router = express.Router();


router.post("/user/signup", wrapAsync(signUpUser));
router.post("/user/login", wrapAsync(loginUser));

export default router;