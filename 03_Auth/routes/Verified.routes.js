import express from "express";
import { getAllUser, Profile } from "../controllers/Verified.controller.js";
import { requireAuth } from "../middleware/requreAuth.middleware.js";

const VerifiedRoute = express.Router();

VerifiedRoute.get("/",requireAuth, getAllUser);
VerifiedRoute.get("/profile",requireAuth, Profile);

export default VerifiedRoute;