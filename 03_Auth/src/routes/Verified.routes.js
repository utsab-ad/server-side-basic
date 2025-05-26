import express from "express";
import { Profile } from "../controllers/Verified.controller.js";
import { requireAuth } from "../middleware/requreAuth.middleware.js";

const VerifiedRoute = express.Router();

VerifiedRoute.get("/",requireAuth, Profile);

export default VerifiedRoute;