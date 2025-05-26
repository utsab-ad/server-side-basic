import User from "../models/User.model.js";

export const Profile = (req, res) => {
  try {
    res.status(200).json({
      success: true,
      message: "Authorized User",
      user: req.user.username,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: ["Cookies Error from middleware", error.message],
    });
  }
};

export const getAllUser = async (req, res, next) => {
  try {
    const user = await User.find().sort({ createdAt: -1 });
    res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    console.error("Get Users Error:", error);
    res.status(500).json({
      success: false,
      message: ["Cookies Error from middleware", error.message],
    });
  }
};
