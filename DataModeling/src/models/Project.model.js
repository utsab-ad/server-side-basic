import mongoose from "mongoose";

const projectSchema = new mongoose.Schema({});

const Project = mongoose.model("Project", projectSchema, "projects");

export default Project;