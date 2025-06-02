import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/User.model.js";
import { generateAccessToken } from "../utils/generateTokens.js";
import { htmlLogin, htmlRegister } from "../utils/emailPage.js";
import { tempUserStore } from "../utils/tempUserStore.js";
import sendEmail from "../utils/sendEmail.js";

export const Register = async (req, res, next) => {
  try {
    const { name, email, contact, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "name, email, password are required",
      });
    }

    const existingUser =
      (await User.findOne({ email })) || (await User.findOne({ contact }));

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
    tempUserStore.set(email, {
      name,
      email,
      hashedPassword,
      contact,
      otp,
      otpExpires,
    });

    await sendEmail(email, "OTP Verification", html);

    return res.status(200).json({
      success: true,
      message: "OTP sent to email. Verify to complete registration.",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: ["Internal Server Error", error.message],
    });
  }
};

export const Login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "ALl fields are required",
      });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    const hashedPassword = await user.password;
    const matchPassword = await bcrypt.compare(password, hashedPassword);

    if (!matchPassword) {
      return res.status(401).json({
        success: false,
        message: "Invalid Password",
      });
    }

    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const otpExpires = Date.now() + 5 * 60 * 1000; // 5 min

    const html = htmlLogin(otp);

    tempUserStore.set(email, { otp, otpExpires });

    await sendEmail(email, "Login Verification", html);

    return res.status(200).json({
      success: true,
      message: "OTP sent to email. Verify to Login.",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

export const Logout = async (req, res, next) => {
  try {
    await res.clearCookie("access_token", {
      httpOnly: true,
      secure: true,
      sameSite: "None",
    });
    await res.clearCookie("jwt", {
      httpOnly: true,
      secure: true,
      sameSite: "None",
    });

    return res.status(200).json({
      success: true,
      message: "Logged Out",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: ["Internal Server Error", error.message],
    });
  }
};
