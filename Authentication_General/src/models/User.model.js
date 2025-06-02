import mongoose from "mongoose";

const userSchema = new mongoose.Schema({

    role: {
        type: String,
        enum: ["admin", "user"],
        default: "user",
    },
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
        minLength: [6, "The password should be 6 character long"]
    },
    contact: {
        type: Number,
        unique: true
    },
    avatar: {
        type: String,
    }

},{timestamps: true});

const User = mongoose.model("User", userSchema, "users");

export default User;