import User from "../models/User.model.js";
import bcrypt, { hash } from "bcrypt";

export const Register = async (req, res) => {
  try {
    const {username, email, password} = req.body;

    if(!username || !email || !password) {
        return res.status(400).json({
            success: false,
            message: "All fields are Required"
        })
    }

    const existingUser = await User.findOne({ email });

    if(existingUser) {
        return res.status(409).json({
            success: false,
            message: "User already exists"
        })
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
        username,
        email,
        password: hashedPassword
    });

    await newUser.save();
    res.status(201).json({
        success: true,
        message: "User created succefully",
        userId: newUser._id
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: ["Internal server error: ", error.message],
    });
  }
};

export const Login = async (req, res) => {
  try {
    const {email, password} = req.body;

    const user = await User.findOne({ email });

    if(!user) {
        return res.status(404).json({
            success: false,
            message: "User Not Found"
        });
    }

    const hashedPassword = await user.password;

    const matchPassword = await bcrypt.compare(password, hashedPassword);

    if(!matchPassword) {
        return res.status(401).json({
            success: false,
            message: "Incorrect Password"
        });
    }

    res.status(200).json({
        success: true,
        message: "Logged in Successfully",
        user: user.username
    })

  } catch (error) {
    res.status(500).json({
      success: false,
      message: ["Internal server error: ", error.message],
    });
  }
};

export const Logout = async (req, res) => {
  try {
    res.status(200).json({
        success: true,
        message: "Logout Successfully"
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: ["Internal server error: ", error.message],
    });
  }
};
