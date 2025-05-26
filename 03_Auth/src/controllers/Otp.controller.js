import { tempUserStore } from "../utils/tempUserStore.js";
import User from "../models/User.model.js";
import { CreateToken } from "./Token.controller.js";

export const verifyRegisterOtp = async (req, res) => {
  const { email, otp } = req.body;
  const data = tempUserStore.get(email);

  if (!data) {
    return res.status(404).json({ success: false, message: "No OTP request found" });
  }

  if (data.otp !== otp || Date.now() > data.otpExpires) {
    return res.status(400).json({ success: false, message: "Invalid or expired OTP" });
  }

  try {
    const newUser = await User.create({
      username: data.username,
      email: data.email,
      password: data.hashedPassword,
      verified: true,
    });

    tempUserStore.delete(email); // clear after successful verification

    return res.status(201).json({
      success: true,
      message: "User verified and registered successfully",
      user: newUser.username,
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Registration failed" });
  }
};

export const verifyLoginOtp = async (req, res) => {
  const { email, otp } = req.body;
  const data = tempUserStore.get(email);

  if (!data) {
    return res.status(404).json({ success: false, message: "No OTP request found" });
  }

  if (data.otp !== otp || Date.now() > data.otpExpires) {
    return res.status(400).json({ success: false, message: "Invalid or expired OTP" });
  }

  try {
   const maxAge = 3 * 24 * 60 * 60;

   const user = await User.findOne({ email });

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
    return res.status(500).json({ success: false, message: "Login Failed" });
  }
};
