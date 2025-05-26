import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import User from "../models/User.model.js";
import { CreateToken } from "./Token.controller.js";
import { htmlLogin, htmlRegister } from "../utils/emailPage.js";
import { tempUserStore } from "../utils/tempUserStore.js";
import sendEmail from "../utils/sendEmail.js";

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

    const otp = Math.floor(100000 + Math.random() * 900000).toString();
        const otpExpires = Date.now() + 5 * 60 * 1000; // 5 min
    
        const html = htmlLogin(otp);
    
        tempUserStore.set(email, { otp, otpExpires });
    
        await sendEmail(email, "OTP Verification", html);
    
        return res.status(200).json({
          success: true,
          message: "OTP sent to email. Verify to Login.",
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
