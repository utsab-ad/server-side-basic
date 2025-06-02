import express from "express";
import { verifyLogin, verifyRegister } from "../controllers/Otp.controllers.js";

const OtpRoute = express.Router();

OtpRoute.post("/register", verifyRegister);
OtpRoute.post("/login", verifyLogin);

export default OtpRoute;
