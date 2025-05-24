import express from "express";
import { Login, Logout, Register } from "../conttrollers/Auth.controller.js";

const AuthRoute = express.Router();

AuthRoute.post("/register", Register);
AuthRoute.post("/login", Login);
AuthRoute.get("/logout", Logout);

export default AuthRoute;