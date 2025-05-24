import mongoose from "mongoose";

const blogSchema = new mongoose.Schema({});

const Blog = mongoose.model("Blog", blogSchema, "blogs");

export default Blog;