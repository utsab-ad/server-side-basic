import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import User from "../models/User.model.js";
import { CreateToken } from "./Token.controller.js";
import { htmlRegister } from "../../../03_Auth/src/utils/emailPage.js";

export const Register = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: "User already exists",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const otpExpires = Date.now() + 5 * 60 * 1000; // 5 min

    const html = htmlRegister(otp);

    // Save to temporary store
    tempUserStore.set(email, { username, email, hashedPassword, otp, otpExpires });

    await sendEmail(email, "OTP Verification", html);

    return res.status(200).json({
      success: true,
      message: "OTP sent to email. Verify to complete registration.",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal Server Error ",
    });
    console.log(error);
  }
};

export const Login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User Not found",
      });
    }

    const hashedPassword = await user.password;

    const matchPassword = await bcrypt.compare(password, hashedPassword);

    if (!matchPassword) {
      return res.status(401).json({
        success: false,
        message: "Incorrect Password",
      });
    }

    const maxAge = 3 * 24 * 60 * 60;

    const token = CreateToken(user, maxAge);

    if (!token) {
      return res.status(500).json({
        success: false,
        message: "Token is not created",
      });
    }

    res.cookie("jwt", token, {
      httpsOnly: true,
      secure: true,
      sameSite: "None",
      maxAge: maxAge * 1000,
    });

    res.status(201).json({
      success: true,
      message: "Logged in successfully",
      user: user.username,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal Server Error ",
    });
    console.log(error);
  }
};

export const Logout = (req, res) => {
  try {
    res.clearCookie("jwt", {
      httpsOnly: true,
      secure: true,
      sameSite: "None",
    });
    res.status(200).json({
      success: true,
      message: "Logged Out successfully"
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal Server Error ",
    });
    console.log(error);
  }
};
