import mongoose from "mongoose";

const userSchema = new mongoose.Schema({

    username: {
        type: String,
        required: [true, "Username is Required"],
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
        minLength: [6, "password must be 6 character long"]
    }

}, {timestamps: true});

const User = mongoose.model("User", userSchema, "users");

export default User;