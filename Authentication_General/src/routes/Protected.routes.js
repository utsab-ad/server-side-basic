import express from "express";
import { userDetails } from "../controllers/User.controllers.js";
import { requireAuth } from "../middlewares/requireAuth.js";

const ProtectedRoute = express.Router();

ProtectedRoute.get("/user", requireAuth, userDetails);

export default ProtectedRoute;