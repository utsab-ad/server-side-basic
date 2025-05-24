import mongoose from "mongoose";

const profileSchema = new mongoose.Schema({});

const Profile = mongoose.model("Profile", profileSchema, "profiles");

export default Profile;