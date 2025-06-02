import express from "express";
import { userDelete, userDetails } from "../controllers/User.controllers.js";
import { requireAuth } from "../middlewares/requireAuth.js";

const ProtectedRoute = express.Router();

ProtectedRoute.get("/user", requireAuth, userDetails);
ProtectedRoute.get("/delete/:email", requireAuth, userDelete);

export default ProtectedRoute;