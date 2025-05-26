import express from "express";
import { Login, Register, verifyOtp } from "../controllers/Auth.controlers.js";

const AuthRoute = express.Router();

AuthRoute.post("/signup", Register);
AuthRoute.post("/login", Login);
AuthRoute.post("/verify-otp", verifyOtp);


export default AuthRoute;