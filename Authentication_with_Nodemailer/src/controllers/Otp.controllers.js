import User from "../models/User.model.js";
import { generateAccessToken } from "../utils/generateTokens.js";
import { tempUserStore } from "../utils/tempUserStore.js";

export const verifyRegister = async (req, res) => {
  const { email, otp } = req.body;
  const data = tempUserStore.get(email);

  if (!data) {
    return res
      .status(404)
      .json({ success: false, message: "No OTP request found" });
  }

  if (data.otp !== otp || Date.now() > data.otpExpires) {
    return res
      .status(400)
      .json({ success: false, message: "Invalid or expired OTP" });
  }

  try {
    const newUser = await User.create({
      name: data.name,
      email: data.email,
      password: data.hashedPassword,
      contact: data.contact,
      verified: true,
    });

    tempUserStore.delete(email);

    const maxAge = 3 * 24 * 60 * 60;

    const accessToken = await generateAccessToken(newUser, maxAge);

    if (!accessToken) {
      return res.status(500).json({
        success: false,
        message: "Token is not created",
      });
    }

    res.cookie("access_token", accessToken, {
      httpOnly: true,
      secure: true,
      sameSite: "None",
      maxAge: maxAge * 1000,
    });

    res.cookie("jwt", accessToken, {
      httpOnly: true,
      secure: true,
      sameSite: "None",
      maxAge: maxAge * 1000,
    });

    res.status(201).json({
      success: true,
      messsage: "Registered Successfuly",
      user: data.name,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: ["Registration failed", error.message],
    });
  }
};

export const verifyLogin = async (req, res) => {
  const { email, otp } = req.body;
  const data = tempUserStore.get(email);

  if (!data) {
    return res
      .status(404)
      .json({ success: false, message: "No OTP request found" });
  }

  if (data.otp !== otp || Date.now() > data.otpExpires) {
    return res
      .status(400)
      .json({ success: false, message: "Invalid or expired OTP" });
  }

  try {
    const maxAge = 3 * 24 * 60 * 60;

    const user = await User.findOne({ email });

    const accessToken = await generateAccessToken(user, maxAge);

    tempUserStore.delete(email);

    if (!accessToken) {
      return res.status(500).json({
        success: false,
        message: "Token is not created",
      });
    }

    res.cookie("access_token", accessToken, {
      httpOnly: true,
      secure: true,
      sameSite: "None",
      maxAge: maxAge * 1000,
    });

    res.cookie("jwt", accessToken, {
      httpOnly: true,
      secure: true,
      sameSite: "None",
      maxAge: maxAge * 1000,
    });

    res.status(201).json({
      success: true,
      messsage: "Logged In Successfuly",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: ["Registration failed", error.message],
    });
  }
};
