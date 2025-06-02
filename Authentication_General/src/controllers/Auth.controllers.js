import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/User.model.js";
import { generateAccessToken } from "../utils/generateTokens.js";

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

    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
      contact,
    });

    if (!newUser) {
      return res.status(500).json({
        success: false,
        message: ["User not created", error],
      });
    }

    const maxAge = 3 * 24 * 60 * 60;

    const accessToken = generateAccessToken(newUser, maxAge);

    res.cookie("access_token", accessToken, {
      httpOnly: true,
      secure: true,
      sameSite: "Strict",
      maxAge: maxAge * 1000,
    });

    res.status(201).json({
      success: true,
      message: "User created Successfully",
      user: newUser.name,
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

    const maxAge = 3 * 24 * 60 * 60;

    const accessToken = await generateAccessToken(user, maxAge);

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
