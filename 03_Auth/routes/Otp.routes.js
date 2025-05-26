import express from "express";
import { verifyLoginOtp, verifyRegisterOtp } from "../controllers/Otp.controller.js";

const OtpRoute = express.Router();

OtpRoute.post("/verify-otp-register", verifyRegisterOtp);
OtpRoute.post("/verify-otp-login", verifyLoginOtp);

export default OtpRoute;