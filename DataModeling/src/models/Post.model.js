import mongoose from "mongoose";

const postSchema = new mongoose.Schema({});

const Post = mongoose.model("Post", postSchema, "posts");

export default Post;