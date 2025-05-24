import mongoose from "mongoose";

const todoSchema = new mongoose.Schema({}, {timestamps: true});

const Todo = mongoose.model("Todo", todoSchema, "todos");

export default Todo;